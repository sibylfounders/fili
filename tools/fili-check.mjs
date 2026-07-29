#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// fili-check — le validateur de consommation PORTABLE du design system Fili.
//
// À exécuter depuis la racine d'un projet consommateur :
//   node fili-check.mjs .            (ou tout chemin cible)
//   node fili-check.mjs . --manifest ./manifest.json
//
// Analyse en AST TypeScript (fichier COMPLET, jamais ligne par ligne — un élément
// JSX écrit sur plusieurs lignes est vu comme un seul nœud). Échoue clairement si
// TypeScript n'est pas résolvable : pas d'analyse dégradée silencieuse.
//
// Détections (toutes bloquantes) :
//   button-natif     <button> recréant Button/CompactButton
//   input-natif      <input>/<textarea> recréant Input
//   select-natif     <select> recréant Select
//   div-cliquable    <div>/<span> porteur d'onClick (un contrôle est Button/Link)
//   role-button      role="button" sur un élément natif non-bouton
//   import-sibyl     ancienne importation @sibyl/*
//   palette-defaut   classe Tailwind de la palette brute là où un rôle Fili existe
//   carte-recreee    <div> combinant bordure + fond + rayon + ombre (Card recréée)
//   prop-inventee    valeur d'axe hors de l'union du manifeste (ex. tone="magic")
//   manque-sans-fiche marqueur FILI-MANQUE sans fiche .fili/manques/<slug>.md
//   allow-sans-raison exception inline déclarée sans justification
//
// Exceptions — jamais implicites, toujours justifiées :
//   - inline, sur la ligne du nœud ou la précédente :
//       // fili-check-allow: <règle> — <raison>
//     (mécanique interne, démo volontaire de mauvaise pratique, infrastructure)
//   - par configuration : .fili/fili-check.config.json
//       { "roots": ["app","src"], "exclude": [{"path":"src/legacy","raison":"…"}],
//         "allow": [{"rule":"input-natif","path":"src/editor/","raison":"…"}] }
//   - implémentation locale PROVISOIRE : /* FILI-MANQUE: <slug> */ + fiche
//     .fili/manques/<slug>.md (modèle livré avec ce paquet) — recensée, pas sanctionnée.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, isAbsolute } from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const RACINES_DEFAUT = ["app", "src", "pages", "components"];
const PALETTE =
  /(?:^|[\s"'`:])((?:bg|text|border|ring|outline|divide|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})(?![\w-])/g;
const ATTRS_STANDARD =
  /^(class(Name)?|id|style|key|ref|children|href|src|alt|title|type|name|value|defaultValue|placeholder|disabled|required|checked|open|width|height|target|rel|role|tabIndex|lang|dir|slot|form|min|max|step|rows|cols|size|colSpan|rowSpan|htmlFor|onC|on[A-Z]|aria-|data-)/;

export function chargeTypescript(cible) {
  const essais = [
    () => createRequire(pathToFileURL(join(resolve(cible), "package.json")))("typescript"),
    () => createRequire(import.meta.url)("typescript"),
  ];
  for (const e of essais) { try { return e(); } catch { /* essai suivant */ } }
  return null;
}

export function analyser(cible, options = {}) {
  const racine = resolve(cible);
  const ts = options.ts ?? chargeTypescript(racine);
  if (!ts) {
    throw new Error(
      "fili-check : TypeScript introuvable — l'analyse syntaxique est requise, pas d'analyse dégradée.\n" +
      "  Installer dans le projet cible : npm i -D typescript",
    );
  }
  const confPath = options.config ?? join(racine, ".fili", "fili-check.config.json");
  const conf = existsSync(confPath) ? JSON.parse(readFileSync(confPath, "utf8")) : {};
  for (const ex of conf.exclude ?? [])
    if (!ex.raison) throw new Error(`fili-check : exclusion « ${ex.path} » sans raison — toute exclusion est justifiée.`);
  const manifeste = options.manifest
    ? JSON.parse(readFileSync(options.manifest, "utf8"))
    : null;
  const axesParComposant = new Map();
  for (const e of manifeste?.entries ?? [])
    if (e.axes) axesParComposant.set(e.name, e.axes);

  const roots = (conf.roots ?? RACINES_DEFAUT).map((r) => join(racine, r)).filter(existsSync);
  const scanRoots = roots.length ? roots : [racine];
  const exclus = (p) => (conf.exclude ?? []).find((e) => relative(racine, p).startsWith(e.path));

  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir)) {
      if (e === "node_modules" || e.startsWith(".")) continue;
      const p = join(dir, e);
      if (statSync(p).isDirectory()) { if (!exclus(p)) walk(p); }
      else if (/\.(tsx|jsx)$/.test(e) && !exclus(p)) files.push(p);
    }
  };
  for (const r of scanRoots) walk(r);

  const findings = [];
  const manques = [];

  for (const path of files) {
    const file = relative(racine, path);
    const src = readFileSync(path, "utf8");
    const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const lignes = src.split("\n");
    const ligneDe = (pos) => sf.getLineAndCharacterOfPosition(pos).line + 1;
    const allowInline = (ligne, rule) => {
      for (const l of [lignes[ligne - 1] ?? "", lignes[ligne - 2] ?? ""]) {
        const m = l.match(/fili-check-allow:\s*([\w-]+)(?:\s*[—-]\s*(.+))?/);
        if (m && m[1] === rule) {
          if (!m[2] || !m[2].trim()) return { sansRaison: true };
          return { raison: m[2].trim() };
        }
      }
      return null;
    };
    const allowConf = (rule) => (conf.allow ?? []).find((a) => a.rule === rule && (!a.path || file.startsWith(a.path)) && a.raison);
    const pousse = (rule, ligne, motif, detail = "") => {
      if (rule !== "manque-sans-fiche" && lignesCouvertes.has(ligne)) return; // provisoire déclaré
      const inline = allowInline(ligne, rule);
      if (inline?.sansRaison) { findings.push({ file, ligne, rule: "allow-sans-raison", motif: rule, detail: "exception inline sans justification" }); return; }
      if (inline || allowConf(rule)) return;
      findings.push({ file, ligne, rule, motif, detail });
    };

    // marqueurs FILI-MANQUE (commentaires — sur le texte complet). Un marqueur AVEC fiche
    // valide couvre l'implémentation locale provisoire qu'il annote (l'élément qui suit) :
    // recensée, jamais sanctionnée — c'est le contrat du MISSING-COMPONENT-PROTOCOL.
    const lignesCouvertes = new Set();
    for (const m of src.matchAll(/FILI-MANQUE:\s*([\w-]+)/g)) {
      const slug = m[1];
      const ligne = ligneDe(m.index);
      const fiche = options.fichesManques
        ? join(options.fichesManques, `${slug}.md`)
        : join(racine, ".fili", "manques", `${slug}.md`);
      if (existsSync(fiche)) {
        manques.push({ file, ligne, slug, fiche: relative(racine, fiche) });
        lignesCouvertes.add(ligne + 1).add(ligne + 2);
      } else pousse("manque-sans-fiche", ligne, slug, `fiche attendue : ${relative(racine, fiche)}`);
    }

    const nomDeTag = (tag) =>
      ts.isIdentifier(tag) ? tag.text : ts.isPropertyAccessExpression(tag) ? `${tag.expression.getText()}.${tag.name.text}` : tag.getText();

    const visite = (node) => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith("@sibyl/"))
        pousse("import-sibyl", ligneDe(node.getStart()), node.moduleSpecifier.text);

      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const ligne = ligneDe(node.getStart());
        const nom = nomDeTag(node.tagName);
        const attrs = node.attributes.properties;
        const attr = (n) => attrs.find((a) => ts.isJsxAttribute(a) && a.name.getText() === n);
        const valeurTexte = (a) =>
          a?.initializer && ts.isStringLiteral(a.initializer) ? a.initializer.text
          : a?.initializer && ts.isJsxExpression(a.initializer) && a.initializer.expression && ts.isStringLiteral(a.initializer.expression) ? a.initializer.expression.text
          : null;
        const classes = valeurTexte(attr("className")) ?? "";

        if (/^[a-z]/.test(nom)) {
          if (nom === "button") pousse("button-natif", ligne, "<button>", "utiliser Button / CompactButton (@fili/react)");
          if (nom === "input" || nom === "textarea") pousse("input-natif", ligne, `<${nom}>`, "utiliser Input (@fili/react)");
          if (nom === "select") pousse("select-natif", ligne, "<select>", "utiliser Select (native le rend aussi)");
          if ((nom === "div" || nom === "span") && attr("onClick")) pousse("div-cliquable", ligne, `<${nom} onClick>`, "un contrôle est un Button ou un Link");
          if (nom !== "button" && valeurTexte(attr("role")) === "button") pousse("role-button", ligne, `<${nom} role="button">`, "utiliser la primitive appropriée");
          if (nom === "div" && /(^|\s)border(-|\s|")/.test(" " + classes) && /rounded/.test(classes) && /shadow/.test(classes) && /bg-/.test(classes))
            pousse("carte-recreee", ligne, "div border+rounded+shadow+bg", "c'est une Card — utiliser Card/CardGroup (@fili/react)");
          for (const m of classes.matchAll(PALETTE)) pousse("palette-defaut", ligne, m[1], "un rôle Fili existe (tokens sémantiques)");
        } else if (axesParComposant.size) {
          const base = nom.split(".")[0];
          // Les axes/props du manifeste décrivent la RACINE : ne vérifier que <X> ou <X.Root>
          // (les sous-composants ont leurs propres props, non couvertes ici).
          const estRacine = nom === base || nom === `${base}.Root`;
          const axes = estRacine ? axesParComposant.get(base) : undefined;
          if (axes) {
            for (const a of attrs) {
              if (!ts.isJsxAttribute(a)) continue;
              const an = a.name.getText();
              const axe = axes[an];
              const v = valeurTexte(a);
              if (axe && v != null && !(v in axe.values))
                pousse("prop-inventee", ligne, `${nom} ${an}="${v}"`, `valeurs réelles : ${Object.keys(axe.values).join(" | ")}`);
              else if (!axe && v != null && !ATTRS_STANDARD.test(an) && !Object.keys(axesParComposant.get(base) ?? {}).includes(an)) {
                const entree = (manifeste.entries.find((e) => e.name === base)) ?? null;
                const props = Object.keys(entree?.props ?? {});
                if (entree && !props.includes(an)) pousse("prop-inventee", ligne, `${nom} ${an}=…`, `hors manifeste (axes : ${Object.keys(axes).join(", ")} ; props : ${props.join(", ") || "—"})`);
              }
            }
          }
        }
      }
      ts.forEachChild(node, visite);
    };
    visite(sf);
  }
  return { files: files.length, findings, manques };
}

export function rapport({ files, findings, manques }) {
  const parRegle = {};
  for (const f of findings) (parRegle[f.rule] ??= []).push(f);
  const lignes = [`\nfili-check — ${files} fichier(s) analysé(s) (AST TypeScript)`];
  for (const [rule, fs] of Object.entries(parRegle)) {
    lignes.push(`\n■ ${rule} — ${fs.length}`);
    for (const f of fs.slice(0, 30)) lignes.push(`   ${f.file}:${f.ligne}  ${f.motif}${f.detail ? " — " + f.detail : ""}`);
  }
  if (manques.length) {
    lignes.push(`\n○ Implémentations locales provisoires déclarées (FILI-MANQUE) — ${manques.length} :`);
    for (const m of manques) lignes.push(`   ${m.file}:${m.ligne}  ${m.slug} (fiche : ${m.fiche})`);
  }
  lignes.push(findings.length ? `\n❌ ${findings.length} écart(s) — un site incorrect ne se publie pas.` : `\n✅ Consommation conforme au kit Fili.`);
  return lignes.join("\n");
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const estCli = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (estCli) {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const opt = (n) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : undefined; };
  const cible = args[0] ?? ".";
  try {
    const manifest = opt("manifest") ?? (existsSync(join(resolve(cible), "manifest.json")) ? join(resolve(cible), "manifest.json") : undefined);
    const res = analyser(cible, { config: opt("config"), manifest, fichesManques: opt("manques") });
    console.log(rapport(res));
    process.exit(res.findings.length ? 1 : 0);
  } catch (e) {
    console.error(String(e.message ?? e));
    process.exit(2);
  }
}
