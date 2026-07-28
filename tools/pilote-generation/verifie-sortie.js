#!/usr/bin/env node
/**
 * verifie-sortie.js — checklist déterministe + semi-déterministe du test (spec § 7.3)
 *
 * Analyse STATIQUE d'un fichier .jsx généré. Trois familles de violations vérifiées :
 *   V1 (semi-déterministe, convention de harnais) : plus d'un rang dominant par vue —
 *       Button style filled + tone primary, DÉFAUTS INCLUS, et SubmitButton.
 *   V2 : action présentée comme un lien — <a>/<Link> porteur d'un onClick d'action.
 *   V3 : surface statique cliquable — <Card> en mode static (ou défaut) avec onClick,
 *        ou <div> avec onClick (surface non sémantique).
 * Non couvert statiquement (assumé) : contraste, focus, cible tactile, navigation via Button.
 *
 * Usage : node verifie-sortie.js <fichier.jsx> [...]  → JSON par fichier sur stdout
 */
'use strict';
const fs = require('fs');

function balises(texte, nom) {
  // capture chaque balise ouvrante <Nom ...> (props sur plusieurs lignes incluses)
  const re = new RegExp(`<${nom}(\\s[^>]*?)?/?>`, 'gs');
  const out = [];
  let m;
  while ((m = re.exec(texte))) out.push(m[1] || '');
  return out;
}
const prop = (props, nom) => {
  const m = props.match(new RegExp(`${nom}\\s*=\\s*(?:"([^"]*)"|\\{[\`'"]([^\`'"]*)[\`'"]\\})`));
  return m ? (m[1] ?? m[2]) : undefined;
};

function verifie(fichier) {
  const t = fs.readFileSync(fichier, 'utf8');
  const violations = [];

  // V1 — rang dominant (convention de harnais : défauts inclus)
  let dominants = 0;
  for (const p of balises(t, 'Button')) {
    const style = prop(p, 'style') ?? 'filled';
    const tone = prop(p, 'tone') ?? 'primary';
    if (style === 'filled' && tone === 'primary') dominants++;
  }
  dominants += balises(t, 'SubmitButton').length;
  if (dominants > 1) violations.push({ code: 'V1-dominants-multiples', detail: `${dominants} contrôles au rang dominant (convention : filled+primary défauts inclus, SubmitButton compris) — BUTTON-R19` });

  // V2 — action présentée comme un lien
  for (const nom of ['a', 'Link']) {
    for (const p of balises(t, nom)) {
      if (/\bonClick\s*=/.test(p) && !/preventDefault/.test(p)) {
        violations.push({ code: 'V2-action-en-lien', detail: `<${nom}> porteur d'un onClick d'action — INTERACTION-R07 / LINK-R02` });
      }
    }
  }

  // V3 — surface statique cliquable
  for (const p of balises(t, 'Card')) {
    const mode = prop(p, 'mode') ?? 'static';
    if (mode === 'static' && /\bonClick\s*=/.test(p)) {
      violations.push({ code: 'V3-surface-statique-cliquable', detail: 'Card en mode static avec onClick — INTERACTION-R10' });
    }
  }
  for (const p of balises(t, 'div')) {
    if (/\bonClick\s*=/.test(p)) violations.push({ code: 'V3-surface-statique-cliquable', detail: 'div avec onClick (surface non sémantique) — CARD-R22 / INTERACTION-R10' });
  }

  return { fichier, dominants, violations, nbViolations: violations.length };
}

const resultats = process.argv.slice(2).map(verifie);
console.log(JSON.stringify(resultats, null, 2));
