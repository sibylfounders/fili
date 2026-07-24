// ─────────────────────────────────────────────────────────────────────────────
// SYNC DS-MD → contrat DS-UI — Node pur.
//
// Lit le tokens.yaml d'autorité de « Design System MD » et régénère
// src/ds-md.contract.mjs, puis affiche le diff avec le contrat précédent.
// C'est le SEUL point d'entrée des valeurs DS-MD dans DS-UI : on ne recopie
// plus une couleur à la main.
//
// Chemin source : $DS_MD_TOKENS, sinon le dépôt frère « Design System MD ».
// Usage : node build/sync-ds-md.mjs   (puis relancer verify-ds-md.mjs)
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTRACT = join(HERE, "..", "src", "ds-md.contract.mjs");
const DEFAULT_SRC = resolve(HERE, "..", "..", "..", "..", "Design System MD", "dist", "tokens.yaml");
const SRC = process.env.DS_MD_TOKENS || DEFAULT_SRC;

let raw;
try { raw = readFileSync(SRC, "utf8"); }
catch {
  console.error(`❌ tokens.yaml DS-MD introuvable : ${SRC}`);
  console.error(`   Renseigne le chemin via DS_MD_TOKENS=/chemin/vers/tokens.yaml node build/sync-ds-md.mjs`);
  process.exit(1);
}

// Parse plat, ciblé : sections top-level → { clef: "valeur" } (commentaires # ignorés).
const WANT = new Set(["colors", "spacing", "radius", "elevation"]);
const parsed = {};
let section = null;
for (const line of raw.split("\n")) {
  const top = line.match(/^([a-z_][\w-]*):\s*(#.*)?$/i);
  if (top) { section = top[1]; if (WANT.has(section)) parsed[section] = {}; continue; }
  if (!section || !WANT.has(section)) continue;
  const kv = line.match(/^  ([\w-]+):\s*"([^"]*)"/);
  if (kv) parsed[section][kv[1]] = kv[2];
}

// Fondations : on ne garde que les clefs du contrat courant (superset DS-UI ignoré).
const KEEP = {
  spacing: ["base", "xs", "sm", "md", "lg", "xl", "section"],
  radius: ["sm", "md", "lg", "pill"],
  elevation: ["none", "raised", "overlay"],
};
const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => k in (obj || {})).map((k) => [k, obj[k]]));

const version = (raw.match(/DESIGN\.md v([\d.]+)/) || [])[1] || "inconnue";
const today = new Date().toISOString().slice(0, 10);

const next = {
  colors: parsed.colors || {},
  spacing: pick(parsed.spacing, KEEP.spacing),
  radius: pick(parsed.radius, KEEP.radius),
  elevation: pick(parsed.elevation, KEEP.elevation),
  // ancre display : reprise du frontmatter (sync ciblé, valeurs stables)
  typography: { display: { fontFamily: "Geist", fontSize: "48px", fontWeight: 500, lineHeight: "1.1" } },
};

// Diff avec le contrat précédent, s'il existe.
let prev = null;
try { prev = (await import(pathToFileURL(CONTRACT).href)).contract; } catch { /* premier sync */ }
if (prev) {
  const changes = [];
  const walk = (a, b, path) => {
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    for (const k of keys) {
      const av = a?.[k], bv = b?.[k];
      if (av && typeof av === "object") { walk(av, bv, `${path}${k}.`); continue; }
      if (bv && typeof bv === "object") { walk(av, bv, `${path}${k}.`); continue; }
      if (String(av) !== String(bv)) changes.push(`  ${path}${k} : ${av ?? "∅"} → ${bv ?? "∅"}`);
    }
  };
  walk(prev, next, "");
  console.log(changes.length ? `Changements DS-MD → contrat :\n${changes.join("\n")}` : "Aucun changement (contrat déjà à jour).");
} else {
  console.log("Premier sync — contrat créé.");
}

const body = `// ─────────────────────────────────────────────────────────────────────────────
// CONTRAT DS-MD — valeurs d'AUTORITÉ importées de « Design System MD ».
//
// GÉNÉRÉ par build/sync-ds-md.mjs depuis DS-MD dist/tokens.yaml.
// NE PAS ÉDITER À LA MAIN : relancer \`npm run sync:ds-md\` pour rafraîchir.
//
// DS-MD fait autorité sur les VALEURS (README « Deux entités » : « MD tranche »).
// build/verify-ds-md.mjs asserte que chaque token DS-UI correspondant porte
// EXACTEMENT la valeur ci-dessous. Une divergence non déclarée est une dérive.
//
// Source : Design System MD — DESIGN.md v${version}
// ─────────────────────────────────────────────────────────────────────────────

export const dsMdVersion = ${JSON.stringify(version)};
export const syncedAt = ${JSON.stringify(today)};

export const contract = ${JSON.stringify(next, null, 2)};
`;
writeFileSync(CONTRACT, body);
console.log(`\n✅ ${CONTRACT.split("/").slice(-1)[0]} régénéré depuis DESIGN.md v${version} (${today}).`);
console.log(`   Relance la garde : node build/verify-ds-md.mjs`);
