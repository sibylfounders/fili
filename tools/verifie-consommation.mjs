#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// VÉRIFICATEUR DE CONSOMMATION — les applications Fili ne recréent pas le kit.
// (Complète tools/verifie-kit.py, qui traque les cartes réinventées.)
//
// Signale dans apps/*/app (hors atelier app/ui et app/test, qui ont leurs
// exceptions d'infrastructure) :
//   - <button> / <input> / <select> natifs hors mécanique interne ;
//   - contrôle cliquable construit avec un <div>/<span onClick> ;
//   - import @sibyl/* (TOUJOURS bloquant — la migration Fili est terminée) ;
//   - classes Tailwind palette par défaut (rôles Fili existants) ;
//   - marqueurs FILI-MANQUE (implémentations locales tolérées en attente de
//     promotion — recensées, jamais sanctionnées : cf. MISSING-COMPONENT-PROTOCOL).
//
// Mode par défaut : rapport (exit 0 sauf @sibyl). `--strict` : exit 1 sur tout
// écart non excepté. Exceptions : tools/verifie-consommation.exceptions.json.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STRICT = process.argv.includes("--strict");
const EXC_PATH = join(ROOT, "tools/verifie-consommation.exceptions.json");
const exceptions = existsSync(EXC_PATH) ? JSON.parse(readFileSync(EXC_PATH, "utf8")) : [];
const excepted = (file, motif) => exceptions.find((e) => file.includes(e.file) && motif.includes(e.motif));

const files = [];      // périmètre complet des contrôles
const filesInfra = []; // atelier + test : seuls les invariants globaux (@sibyl) s'y appliquent
const SCAN_ROOTS = readdirSync(join(ROOT, "apps")).map((a) => join(ROOT, "apps", a, "app")).filter(existsSync);
(function walkAll() {
  for (const root of SCAN_ROOTS)
    (function walk(dir, infra) {
      for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        if (statSync(p).isDirectory()) {
          const rel = relative(ROOT, p);
          // L'atelier et les pages de test ont droit à leur infrastructure (démos de
          // natifs, poignée de redimensionnement…) — couverts par verifie-kit.py côté cartes.
          walk(p, infra || /apps\/[^/]+\/app\/(ui|test)$/.test(rel));
        } else if (/\.(tsx|jsx)$/.test(e)) (infra ? filesInfra : files).push(p);
      }
    })(root, false);
})();

const findings = [];
const push = (file, line, type, motif, detail = "") => {
  const exc = excepted(file, motif + type);
  findings.push({ file, line, type, motif, detail, exc: exc?.raison });
};

const PALETTE =
  /(?:^|[\s"'`:])((?:bg|text|border|ring|outline|divide)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})(?![\w-])/g;

let sibyl = 0;
const manques = [];
// Invariant global : AUCUN import @sibyl/*, atelier compris.
for (const p of filesInfra) {
  const file = relative(ROOT, p);
  readFileSync(p, "utf8").split("\n").forEach((l, i) => {
    if (/from ["']@sibyl\//.test(l)) { push(file, i + 1, "import-sibyl", l.trim()); sibyl++; }
  });
}
for (const p of files) {
  const file = relative(ROOT, p);
  const src = readFileSync(p, "utf8");
  src.split("\n").forEach((l, i) => {
    const n = i + 1;
    if (/from ["']@sibyl\//.test(l)) { push(file, n, "import-sibyl", l.trim()); sibyl++; }
    if (/<button[\s>]/.test(l)) push(file, n, "button-natif", "<button>", "utiliser Button / CompactButton (ou classer l'exception)");
    if (/<input[\s>]/.test(l)) push(file, n, "input-natif", "<input>", "utiliser Input (ou mécanique interne classée)");
    if (/<select[\s>]/.test(l)) push(file, n, "select-natif", "<select>", "utiliser Select (native le rend aussi)");
    if (/<(div|span)[^>]*onClick/.test(l)) push(file, n, "div-cliquable", "<div onClick>", "un contrôle est un Button/Link, pas un div");
    for (const m of l.matchAll(PALETTE)) push(file, n, "palette-defaut", m[1]);
    const mq = l.match(/FILI-MANQUE:\s*([\w-]+)/);
    if (mq) manques.push({ file, line: n, slug: mq[1] });
  });
}

const open = findings.filter((f) => !f.exc);
const classed = findings.filter((f) => f.exc);
const byType = {};
for (const f of open) (byType[f.type] ??= []).push(f);

console.log(`\nVérificateur de consommation — ${files.length} fichiers d'app (hors atelier)\n`);
for (const [type, fs] of Object.entries(byType)) {
  console.log(`■ ${type} — ${fs.length}`);
  for (const f of fs.slice(0, 30)) console.log(`   ${f.file}:${f.line}  ${f.motif}${f.detail ? "  — " + f.detail : ""}`);
  if (fs.length > 30) console.log(`   … +${fs.length - 30}`);
}
if (manques.length) {
  console.log(`■ manques recensés (FILI-MANQUE) — ${manques.length}`);
  for (const m of manques) console.log(`   ${m.file}:${m.line}  ${m.slug} → fiche attendue dans content/md/inventaires/manques/`);
}
console.log(`\n${classed.length} exception(s) classée(s) · ${open.length} écart(s) ouverts.`);

if (sibyl) { console.error(`\n❌ ${sibyl} import(s) @sibyl/* — la migration Fili ne tolère aucun retour.`); process.exit(1); }
if (STRICT && open.length) { console.error(`\n❌ --strict : ${open.length} écart(s) non excepté(s).`); process.exit(1); }
console.log(STRICT ? "\n✅ Consommation propre." : "\n(mode rapport — `--strict` pour bloquer)");
