#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// VÉRIFICATEUR D'EXEMPLES — les exemples canoniques du manifeste COMPILENT.
// Assemble tous les canonicalExamples de packages/react/manifest.json dans un
// fichier TSX temporaire du site, lance le tsc du site (qui résout @fili/react),
// puis nettoie. Un exemple qui ne compile pas = un agent qui recevrait du faux.
//
// Usage : node tools/verifie-exemples.mjs   (exit 1 si la compilation échoue)
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = JSON.parse(readFileSync(join(ROOT, "packages/react/manifest.json"), "utf8")).entries;
const OUT = join(ROOT, "apps/site/exemples-manifeste.gen.tsx");

const blocks = [];
const used = new Set();
let n = 0;
for (const e of MANIFEST) {
  for (const ex of e.canonicalExamples ?? []) {
    // composants utilisés dans l'exemple (imports depuis le baril)
    for (const m of ex.code.matchAll(/<([A-Z][\w]*)[.\s/>]/g)) used.add(m[1]);
    blocks.push(`/** ${e.name} — ${ex.title} */\nexport const Exemple${n++} = () => (\n  <>\n${ex.code.replace(/^/gm, "    ")}\n  </>\n);`);
  }
}
if (!blocks.length) { console.log("Aucun exemple canonique dans le manifeste."); process.exit(0); }

const file = `// GÉNÉRÉ par tools/verifie-exemples.mjs — supprimé après vérification.
import * as React from "react";
import { ${[...used].sort().join(", ")} } from "@fili/react";

${blocks.join("\n\n")}
`;
writeFileSync(OUT, file);
try {
  execSync("npx tsc --noEmit -p apps/site/tsconfig.json", { cwd: ROOT, stdio: "pipe" });
  console.log(`✅ ${n} exemple(s) canonique(s) compilent (${used.size} composants importés).`);
} catch (err) {
  console.error(`❌ Un exemple canonique du manifeste ne compile pas :\n`);
  console.error(String(err.stdout || err.message).split("\n").filter((l) => l.includes("exemples-manifeste")).join("\n") || String(err.stdout));
  process.exitCode = 1;
} finally {
  // Sous le pont Cowork, unlink est interdit dans le dossier monté : repli = vider le
  // fichier (il est gitignoré, et réécrit à chaque passage).
  try { rmSync(OUT, { force: true }); }
  catch { writeFileSync(OUT, "// vidé par tools/verifie-exemples.mjs — fichier de travail gitignoré\nexport {};\n"); }
}
