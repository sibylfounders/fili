#!/usr/bin/env node
/**
 * assemble-contextes.js — harnais du test à quatre conditions (spec § 7)
 *
 * Assemble les connaissances design par condition à partir des artefacts RÉELS :
 *  - contenu : dist/build/RULES-<sujet>.md (compilation adressable — les règles portent leurs IDs) ;
 *  - graphe de bundle : frontmatters `requires` de tools/plugin/rules (le graphe du routeur).
 * La table d'intentions ci-dessous est une COPIE DE HARNAIS de la table du routeur
 * (genere-routeur.js, 2026-07-27) limitée aux deux intentions des tâches — pas une source.
 *
 * Vérification intégrée : la taille calculée des bundles est comparée aux comptes du
 * RAPPORT-ROUTEUR (Formulaire 18 fichiers, Collection 12, hors socle).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const BASE = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..', '..');
const PLUGIN = path.join(BASE, 'tools/plugin/rules');
const DIST = path.join(BASE, 'dist/build');
const OUT = path.join(__dirname, 'contextes');
fs.mkdirSync(OUT, { recursive: true });

const SOCLE = ['accessibility', 'interaction', 'adaptive', 'cognitive-load', 'performance'];
const INTENTIONS = {
  Formulaire: {
    sujets: ['form', 'select', 'switch'],
    fondations: ['color', 'spacing', 'typography', 'border', 'grid', 'touch'],
    langages: ['emotion', 'motion', 'voice'],
    principes: [],
  },
  Collection: {
    sujets: ['collection'],
    fondations: ['color', 'spacing', 'typography', 'elevation', 'grid', 'touch'],
    langages: ['motion'],
    principes: [],
  },
};

const requiresDe = (sujet) => {
  const f = path.join(PLUGIN, `RULES-${sujet}.md`);
  if (!fs.existsSync(f)) return [];
  const m = fs.readFileSync(f, 'utf8').match(/^requires:\s*\[([^\]]*)\]/m);
  if (!m) return [];
  return m[1].split(',').map((s) => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
};

// Réplique exacte de fermeture() du routeur : les membres du socle atteints via
// `requires` restent dans le bundle (ils sont de toute façon chargés d'office).
function bundle(intention) {
  const it = INTENTIONS[intention];
  const dedans = new Set();
  const file = [...it.sujets, ...it.fondations, ...it.langages, ...it.principes];
  while (file.length) {
    const s = file.shift();
    if (dedans.has(s) || !fs.existsSync(path.join(PLUGIN, `RULES-${s}.md`))) continue;
    dedans.add(s);
    file.push(...requiresDe(s).map((x) => x.split(/[\s(]/)[0]));
  }
  return [...dedans].sort();
}

const litDist = (sujet) => {
  const f = path.join(DIST, `RULES-${sujet}.md`);
  if (!fs.existsSync(f)) throw new Error(`dist/build/RULES-${sujet}.md manquant`);
  return fs.readFileSync(f, 'utf8');
};
const concat = (sujets) => sujets.map((s) => litDist(s)).join('\n\n---\n\n');

// C2 : le corpus compilé entier, sans routage
const tous = fs.readdirSync(DIST).filter((f) => f.startsWith('RULES-')).map((f) => f.replace(/^RULES-|\.md$/g, '')).sort();
fs.writeFileSync(path.join(OUT, 'connaissance-C2.md'), concat(tous));

// C3 : bundle routé (socle + bundle de l'intention)
const rapports = [];
for (const [nom, attendu] of [['Formulaire', 18], ['Collection', 12]]) {
  const b = bundle(nom);
  const manquants = b.filter((s) => !fs.existsSync(path.join(DIST, `RULES-${s}.md`)));
  rapports.push(`${nom} : ${b.length} fichiers (RAPPORT-ROUTEUR : ${attendu}) ${b.length === attendu ? 'OK' : 'ÉCART'} — [${b.join(', ')}]${manquants.length ? ` — sans version dist : ${manquants.join(', ')}` : ''}`);
  const charge = [...new Set([...SOCLE, ...b])].filter((s) => !manquants.includes(s));
  fs.writeFileSync(path.join(OUT, `connaissance-C3-${nom.toLowerCase()}.md`), concat(charge));
}
console.log(rapports.join('\n'));
for (const c of ['connaissance-C2.md', 'connaissance-C3-formulaire.md', 'connaissance-C3-collection.md']) {
  console.log(`${c} : ${Math.round(fs.statSync(path.join(OUT, c)).size / 1024)} Ko`);
}
