#!/usr/bin/env node
'use strict';
/**
 * tools/plugin/build-plugin.js — construit le paquet Cowork « design-system-md » depuis le monorepo.
 *
 * Usage :  node tools/plugin/build-plugin.js
 *
 * Chaîne (arrêt à la première erreur) :
 *   1. nettoie build/plugin/
 *   2. copie tools/plugin/rules/RULES-*.md            → skills/design-system-md/
 *   2bis. copie DECISIONS-locales.gabarit.md          → skills/design-system-md/DECISIONS-locales.md
 *         (journal du consommateur — cf. CADRAGE-ARBITRAGE-CONSOMMATEUR.md 0.2.0)
 *   3. genere-tokens.js : DESIGN.md → tokens.css + tokens.yaml + theme-gate.mjs
 *   4. genere-routeur.js : frontmatters → CLAUDE.md + AGENTS.md + SKILL.md (valide le graphe)
 *   5. écrit .claude-plugin/plugin.json + README.md
 *   6. empaquette build/design-system-md.plugin (zip)
 *
 * Source de vérité : apps/site/content/md/ (prose et tokens) ; tools/plugin/rules/ (compilations).
 * Une fiche RULES-* n'est PAS dérivable par script : c'est une condensation éditoriale d'une paire
 * <SUJET>-UX.md / <SUJET>-UI.md. Ajouter un sujet = compiler sa fiche à la main dans rules/, puis
 * relancer ce build (cf. tools/plugin/README.md).
 *
 * Node sans aucune dépendance externe : l'archive est écrite par tools/plugin/zip.js (zlib).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RACINE = path.resolve(__dirname, '..', '..');
const PLUGIN_SRC = __dirname;
const BUILD = path.join(RACINE, 'build', 'plugin');
const SKILL_DIR = path.join(BUILD, 'skills', 'design-system-md');

const manifeste = JSON.parse(fs.readFileSync(path.join(PLUGIN_SRC, 'plugin.json'), 'utf8'));

console.log(`Paquet ${manifeste.name} v${manifeste.version}`);

// 1. nettoyage ---------------------------------------------------------------
// Certains bacs à sable (device_bash de Cowork) interdisent unlink : on avertit et on continue,
// le build se fait alors en place — des fichiers d'un sujet supprimé peuvent y survivre.
try {
  fs.rmSync(BUILD, { recursive: true, force: true });
} catch (e) {
  console.warn(`  ! nettoyage de build/plugin impossible (${e.code}) — build en place, des fichiers obsolètes peuvent subsister`);
}
fs.mkdirSync(SKILL_DIR, { recursive: true });
fs.mkdirSync(path.join(BUILD, '.claude-plugin'), { recursive: true });

// 2. corpus compilé ----------------------------------------------------------
const rules = fs.readdirSync(path.join(PLUGIN_SRC, 'rules')).filter((f) => /^RULES-[a-z-]+\.md$/.test(f)).sort();
if (!rules.length) { console.error('✗ tools/plugin/rules/ ne contient aucune fiche RULES-*.md'); process.exit(1); }
for (const f of rules) fs.copyFileSync(path.join(PLUGIN_SRC, 'rules', f), path.join(SKILL_DIR, f));
console.log(`  ${rules.length} fiches RULES-* copiées`);

// 2bis. journal des décisions locales (gabarit) -------------------------------
// Deuxième surface possédée par le consommateur (après les valeurs de tokens.yaml) :
// ses décisions, jamais les règles. Cf. CADRAGE-ARBITRAGE-CONSOMMATEUR.md 0.2.0 (§ 6 rendus).
const gabaritDL = path.join(PLUGIN_SRC, 'DECISIONS-locales.gabarit.md');
if (!fs.existsSync(gabaritDL)) {
  console.error('✗ tools/plugin/DECISIONS-locales.gabarit.md introuvable — paquet NON produit');
  process.exit(1);
}
fs.copyFileSync(gabaritDL, path.join(SKILL_DIR, 'DECISIONS-locales.md'));
console.log('  gabarit DECISIONS-locales.md copié (journal du consommateur)');

// 3. tokens ------------------------------------------------------------------
const { version: versionDesign } = require('./genere-tokens.js');

// 4. routeur (valide le graphe : sortie non nulle = build interrompu) --------
try {
  execFileSync(process.execPath, [path.join(PLUGIN_SRC, 'genere-routeur.js'), SKILL_DIR], {
    stdio: 'inherit',
    env: { ...process.env, DSMD_VERSION_PAQUET: manifeste.version, DSMD_VERSION_DESIGN: versionDesign },
  });
} catch (e) {
  console.error('✗ routeur en erreur — paquet NON produit (voir tools/plugin/reports/RAPPORT-ROUTEUR.md)');
  process.exit(1);
}

// 5. manifeste + README ------------------------------------------------------
fs.writeFileSync(path.join(BUILD, '.claude-plugin', 'plugin.json'), JSON.stringify(manifeste, null, 2) + '\n');
const readme = path.join(PLUGIN_SRC, 'README-paquet.md');
if (fs.existsSync(readme)) {
  fs.writeFileSync(
    path.join(BUILD, 'README.md'),
    fs.readFileSync(readme, 'utf8')
      .replace(/\{\{VERSION\}\}/g, manifeste.version)
      .replace(/\{\{VERSION_DESIGN\}\}/g, versionDesign)
      .replace(/\{\{NB_FICHES\}\}/g, String(rules.length)),
  );
}

// 6. empaquetage -------------------------------------------------------------
const { ecritZip, entreesDuDossier } = require('./zip.js');
const paquet = path.join(RACINE, 'build', `${manifeste.name}.plugin`);
try { fs.rmSync(paquet, { force: true }); } catch (e) { /* réécrit en place juste après */ }
const entrees = entreesDuDossier(BUILD);
ecritZip(paquet, entrees);
const ko = Math.round(fs.statSync(paquet).size / 1024);
console.log(`✓ ${path.relative(RACINE, paquet)} — ${entrees.length} fichiers, ${ko} Ko. Glisser dans Cowork pour installer.`);
