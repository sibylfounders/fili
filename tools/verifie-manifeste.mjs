#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// VÉRIFICATEUR DE MANIFESTE — cohérence entre les couches d'autorité
// (Fili Component Contract 1.0.0) :
//   TypeScript (ce que le composant accepte — déjà gardé par tsc via axe<U>())
//   ↔ manifeste (statut, intention, doctrine, exemples)
//   ↔ doctrine (content/md) ↔ RULES compilées (dist/build) ↔ atelier (registry).
//
// Échoue (exit 1) si :
//   - un dossier de composant n'a pas d'entrée de manifeste (ou l'inverse) ;
//   - une entrée pointe une fiche doctrinale ou une RULES inexistante ;
//   - une RULES compilée cite une version de source différente de la fiche actuelle
//     (fiche périmée → un agent recevrait une API potentiellement fausse).
// Avertit (sans échouer) si :
//   - un composant stable est absent de l'atelier ;
//   - un composant sans doctrine est status "stable" (dette documentée) ;
//   - une entrée experimental (jamais proposée aux agents par le catalogue).
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = JSON.parse(readFileSync(join(ROOT, "packages/react/manifest.json"), "utf8")).entries;
const COMPONENTS = join(ROOT, "packages/react/src/components");
const MD = join(ROOT, "apps/site/content/md");
const RULES = join(ROOT, "dist/build");
const REGISTRY = readFileSync(join(ROOT, "apps/site/app/ui/registry.tsx"), "utf8");

// dossier → nom public
const DIR_TO_NAME = {
  accordion: "Accordion", alert: "Alert", "app-layout": "AppLayout", "app-shell": "AppShell",
  brand: "Brand", button: "Button", card: "Card", "card-group": "CardGroup",
  "compact-button": "CompactButton", container: "Container", "delete-button": "DeleteButton",
  divider: "Divider", drawer: "Drawer", dropdown: "Dropdown", input: "Input", link: "Link",
  modal: "Modal", nav: "Nav", select: "Select", skeleton: "Skeleton", "skip-link": "SkipLink",
  "submit-button": "SubmitButton", switch: "Switch", tabs: "Tabs", "theme-toggle": "ThemeToggle",
  toast: "Toast", toc: "TableOfContents",
};

let fails = 0, warns = 0;
const fail = (m) => { console.error(`  ❌ ${m}`); fails++; };
const warn = (m) => { console.warn(`  ⚠ ${m}`); warns++; };

const byName = Object.fromEntries(MANIFEST.map((e) => [e.name, e]));

// ── 1. Bijection dossiers ↔ manifeste ────────────────────────────────────────
const dirs = readdirSync(COMPONENTS).filter((d) => !d.startsWith("."));
for (const d of dirs) {
  const name = DIR_TO_NAME[d];
  if (!name) { fail(`dossier components/${d} inconnu du mapping du vérificateur`); continue; }
  if (!byName[name]) fail(`composant ${name} (components/${d}) sans entrée de manifeste`);
}
for (const e of MANIFEST)
  if (e.package === "@fili/react" && !Object.values(DIR_TO_NAME).includes(e.name))
    fail(`entrée de manifeste ${e.name} sans dossier de composant`);

// ── 2. Doctrine et RULES pointées existent ───────────────────────────────────
const version = (file) => readFileSync(file, "utf8").match(/^version:\s*([\d.]+)/m)?.[1] ?? null;
for (const e of MANIFEST) {
  for (const k of ["ux", "ui"]) {
    const ref = e.doctrine?.[k];
    if (!ref || !ref.endsWith(".md")) continue;
    if (!existsSync(join(MD, ref.split(" ")[0].replace(/ .*/, "")))) fail(`${e.name} : doctrine ${k} introuvable — ${ref}`);
  }
  if (e.rules && !existsSync(join(RULES, e.rules))) fail(`${e.name} : RULES introuvable — dist/build/${e.rules}`);
  if (!e.doctrine && e.status === "stable") warn(`${e.name} : stable sans doctrine (dette à résorber)`);
  if (e.status === "experimental") warn(`${e.name} : experimental — non proposé aux agents`);
}

// ── 3. Fraîcheur des RULES vs sources ────────────────────────────────────────
for (const e of MANIFEST) {
  if (!e.rules || !e.doctrine) continue;
  const rulesPath = join(RULES, e.rules);
  if (!existsSync(rulesPath)) continue;
  const compiled = readFileSync(rulesPath, "utf8");
  for (const k of ["ux", "ui"]) {
    const ref = e.doctrine[k];
    if (!ref || !ref.endsWith(".md")) continue;
    const srcPath = join(MD, ref);
    if (!existsSync(srcPath)) continue;
    const vSrc = version(srcPath);
    if (!vSrc) continue;
    const base = ref.split("/").pop().replace(".md", ""); // p.ex. BUTTON-UX
    const m = compiled.match(new RegExp(`${base}[^\\d]*v?([\\d.]+)`));
    if (m && m[1] !== vSrc)
      fail(`${e.name} : RULES compilée cite ${base} v${m[1]} mais la source est v${vSrc} — recompiler (compile-regles.py)`);
  }
}

// ── 4. Atelier ───────────────────────────────────────────────────────────────
for (const e of MANIFEST) {
  if (e.package !== "@fili/react" || e.status === "interne") continue;
  if (!new RegExp(`\\b${e.name}\\b`).test(REGISTRY)) warn(`${e.name} : absent de l'atelier (registry.tsx)`);
}

console.log(`\nManifeste : ${MANIFEST.length} entrées · ${fails} incohérence(s) · ${warns} avertissement(s)`);
if (fails) { console.error("\n❌ Divergence entre les couches d'autorité."); process.exit(1); }
console.log("✅ Manifeste cohérent avec le code, la doctrine, les RULES et l'atelier (aux avertissements près).");
