#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// VÉRIFICATEUR DE TOKENS — packages/react/src (chantier cohérence 2026-07-29).
//
// Détecte :
//   1. var(--x) INCONNUE (absente du CSS généré ET non définie localement) ;
//   2. fallback var(--x, valeur) qui masque un mauvais nom (inconnue) ou duplique
//      la valeur d'un token (connue) ;
//   3. classes Tailwind de la palette PAR DÉFAUT (bg-neutral-200…) — mortes depuis
//      que theme.colors est remplacé, ou trahissant une intention non tokenisée ;
//   4. valeurs en dur dans les .css (hex, rgba) hors exceptions classées ;
//   5. valeurs arbitraires Tailwind ([13px], p-[3px]…) dans les .tsx ;
//   6. rounded-full là où rounded-pill (token) existe.
//
// Les exceptions vivent dans tools/verifie-tokens.exceptions.json — chacune est
// NOMMÉE et CLASSÉE (mécanique interne, repli progressif, géométrie, var locale).
// Mode par défaut : rapport (exit 0). `--strict` : exit 1 si un écart NON excepté
// touche le périmètre strict (tranche pilote + lib + tokens).
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "packages/react/src");
const TOKENS_CSS = join(ROOT, "packages/tokens/dist/tokens.css");
const EXC_PATH = join(ROOT, "tools/verifie-tokens.exceptions.json");
const STRICT = process.argv.includes("--strict");

// Périmètre strict = la tranche pilote + la couche partagée + tout nouveau fichier.
const STRICT_SCOPE = [
  "components/button/", "components/compact-button/", "components/input/",
  "components/card/", "components/skeleton/", "lib/", "styles.css",
];

const exceptions = existsSync(EXC_PATH) ? JSON.parse(readFileSync(EXC_PATH, "utf8")) : [];
const excepted = (file, motif) =>
  exceptions.find((e) => file.includes(e.file) && motif.includes(e.motif));

// ── 1. Variables connues : CSS généré + définitions locales ──────────────────
const known = new Set();
for (const m of readFileSync(TOKENS_CSS, "utf8").matchAll(/--([\w-]+)\s*:/g)) known.add(m[1]);

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(e)) files.push(p);
  }
})(SRC);

const sources = files.map((p) => [relative(SRC, p), readFileSync(p, "utf8")]);
// Une var DÉFINIE quelque part dans le package (mécanique locale --rl-*, --tt-*…) est connue.
for (const [, src] of sources)
  for (const m of src.matchAll(/(--[\w-]+)\s*:/g)) known.add(m[1].slice(2));

// ── 2. Balayage ──────────────────────────────────────────────────────────────
const findings = []; // {file, line, type, motif, detail}
const push = (file, line, type, motif, detail = "") => {
  const exc = excepted(file, motif);
  findings.push({ file, line, type, motif, detail, exc: exc?.classe });
};

const PALETTE =
  /(?:^|[\s"'`:])((?:bg|text|border|ring|outline|divide|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})(?![\w-])/g;

for (const [file, src] of sources) {
  const lines = src.split("\n");
  lines.forEach((l, i) => {
    const n = i + 1;
    // var(--x) et fallbacks
    for (const m of l.matchAll(/var\(\s*--([\w-]+)\s*(?:,\s*([^)]+))?\)/g)) {
      const [_, name, fb] = m;
      if (!known.has(name)) push(file, n, "var-inconnue", `--${name}`, fb ? `fallback « ${fb.trim()} » masque le mauvais nom` : "");
      else if (fb && !fb.includes("var(") && !/transparent|inherit|none/.test(fb))
        push(file, n, "fallback-dupliquant", `--${name}`, `fallback « ${fb.trim()} » fige la valeur du token`);
    }
    // palette Tailwind par défaut (tsx seulement — les .css n'ont pas de classes)
    if (file.endsWith(".tsx"))
      for (const m of l.matchAll(PALETTE))
        // p-{fam} = primitives préfixées légitimes du thème
        if (!m[1].includes("p-")) push(file, n, "palette-defaut", m[1], "classe hors thème Fili (morte ou non tokenisée)");
    // arbitraires Tailwind
    if (file.endsWith(".tsx"))
      for (const m of l.matchAll(/[\w-]+-\[(\d+(?:\.\d+)?(?:px|rem|em))\]/g))
        push(file, n, "arbitraire", m[0], "valeur hors échelle de tokens");
    if (file.endsWith(".tsx") && /rounded-full/.test(l))
      push(file, n, "rounded-full", "rounded-full", "préférer rounded-pill (token --radius-pill)");
    // valeurs en dur dans les .css
    if (file.endsWith(".css")) {
      for (const m of l.matchAll(/#(?:[0-9a-fA-F]{3}){1,2}\b/g)) {
        if (/^\s*\/?\*|\*\//.test(l)) continue; // commentaires
        if (m[0] === "#000" && /mask|linear-gradient\(#000/.test(l)) continue; // masques géométriques
        push(file, n, "hex-en-dur", m[0], l.trim().slice(0, 80));
      }
      for (const m of l.matchAll(/rgba?\([^)]+\)/g))
        push(file, n, "rgba-en-dur", m[0], l.trim().slice(0, 60));
    }
  });
}

// ── 3. Rapport ───────────────────────────────────────────────────────────────
const open = findings.filter((f) => !f.exc);
const classed = findings.filter((f) => f.exc);
const inStrict = (f) => STRICT_SCOPE.some((s) => f.file.startsWith(s) || f.file === s);
const strictFails = open.filter(inStrict);

const byType = {};
for (const f of open) (byType[f.type] ??= []).push(f);
console.log(`\nVérificateur de tokens — packages/react/src (${files.length} fichiers)\n`);
for (const [type, fs] of Object.entries(byType)) {
  console.log(`■ ${type} — ${fs.length} écart(s) non classé(s)`);
  for (const f of fs.slice(0, 40)) console.log(`   ${f.file}:${f.line}  ${f.motif}${f.detail ? "  — " + f.detail : ""}`);
  if (fs.length > 40) console.log(`   … +${fs.length - 40}`);
}
console.log(`\n${classed.length} écart(s) classé(s) en exception (tools/verifie-tokens.exceptions.json).`);
console.log(`${open.length} écart(s) à classer ou corriger — dont ${strictFails.length} dans le périmètre STRICT (pilote+lib).`);

if (STRICT && strictFails.length) {
  console.error(`\n❌ --strict : ${strictFails.length} écart(s) non excepté(s) dans la tranche pilote.`);
  process.exit(1);
}
console.log(STRICT ? "\n✅ Périmètre strict propre." : "\n(mode rapport — `--strict` pour bloquer sur la tranche pilote)");
