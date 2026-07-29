#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// VÉRIFICATEUR DE CONSOMMATION (monorepo) — enveloppe du moteur PORTABLE
// tools/fili-check.mjs (AST TypeScript, fichier complet), avec :
//   - la configuration monorepo EXPLICITE (fili-check.config.monorepo.json —
//     exclusions justifiées une à une, jamais implicites) ;
//   - l'invariant GLOBAL @sibyl/* balayé sur TOUT apps/ (atelier et tests compris) ;
//   - les fiches de manque du monorepo : content/md/inventaires/manques/<slug>.md
//     (chez un consommateur : .fili/manques/<slug>.md — cf. MISSING-COMPONENT-PROTOCOL).
//
// Mode par défaut : rapport (exit 0 sauf @sibyl). `--strict` : exit 1 sur tout écart.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { analyser, rapport } from "./fili-check.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STRICT = process.argv.includes("--strict");

// ── 1. moteur portable, config monorepo, manifeste réel ──────────────────────
const res = analyser(ROOT, {
  config: join(ROOT, "tools/fili-check.config.monorepo.json"),
  manifest: join(ROOT, "packages/react/manifest.json"),
  fichesManques: join(ROOT, "apps/site/content/md/inventaires/manques"),
});

// ── 2. invariant global : AUCUN import @sibyl/*, partout dans apps/ ──────────
let sibyl = 0;
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".next" || e.startsWith(".")) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?|mjs|cjs)$/.test(e)) {
      readFileSync(p, "utf8").split("\n").forEach((l, i) => {
        if (/from ["']@sibyl\//.test(l)) {
          res.findings.push({ file: relative(ROOT, p), ligne: i + 1, rule: "import-sibyl", motif: l.trim(), detail: "invariant global (atelier compris)" });
          sibyl++;
        }
      });
    }
  }
})(join(ROOT, "apps"));

console.log(rapport(res));
if (sibyl) { console.error(`\n❌ ${sibyl} import(s) @sibyl/* — la migration Fili ne tolère aucun retour.`); process.exit(1); }
if (STRICT && res.findings.length) process.exit(1);
if (!STRICT) console.log("(mode rapport — `--strict` pour bloquer)");
