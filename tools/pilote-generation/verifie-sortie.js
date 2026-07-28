#!/usr/bin/env node
/**
 * verifie-sortie.js — checklist du test (spec § 7.3), analyse STATIQUE d'un .jsx généré.
 *
 * Périmètre EXACT — ce que ce script sait réellement conclure :
 *
 *  VIOLATIONS (comptées dans nbViolations) :
 *   V1 (semi-déterministe, convention de harnais) : plus d'un rang dominant par vue —
 *       Button style filled + tone primary, DÉFAUTS INCLUS, et SubmitButton.
 *   V2 (déterministe) : action présentée comme un lien — <a>/<Link> SANS destination réelle
 *       (href absent, "#", "javascript:…") porteur d'un onClick, ou onClick annulant la
 *       navigation (preventDefault).
 *   V3 (déterministe) : surface statique cliquable — <Card> en mode static (ou défaut) avec
 *       onClick, ou <div> avec onClick.
 *
 *  SIGNAUX (assistés — signalés dans `signaux`, PAS comptés en violation) :
 *   S1 : <a>/<Link> à destination réelle portant un onClick — peut être de l'analytics
 *        légitime ou une action déguisée : à trancher par un juge, pas par ce script.
 *
 *  NON COUVERT par ce script (à juger au rendu ou par lecture humaine) :
 *   navigation portée par un Button (BUTTON-R02) ; contraste, focus visible, cible tactile
 *   (portés par les composants du package) ; tout ce qui exige une exécution du code.
 *
 * Usage : node verifie-sortie.js <fichier.jsx> [...]  → JSON par fichier sur stdout
 */
'use strict';
const fs = require('fs');

function balises(texte, nom) {
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
const destinationFactice = (href) => href === undefined || href === '' || href === '#' || /^javascript:/i.test(href || '');

function verifie(fichier) {
  const t = fs.readFileSync(fichier, 'utf8');
  const violations = [];
  const signaux = [];

  // V1 — rang dominant (convention de harnais : défauts inclus)
  let dominants = 0;
  for (const p of balises(t, 'Button')) {
    const style = prop(p, 'style') ?? 'filled';
    const tone = prop(p, 'tone') ?? 'primary';
    if (style === 'filled' && tone === 'primary') dominants++;
  }
  dominants += balises(t, 'SubmitButton').length;
  if (dominants > 1) violations.push({ code: 'V1-dominants-multiples', classe: 'semi-déterministe', detail: `${dominants} contrôles au rang dominant (convention : filled+primary défauts inclus, SubmitButton compris) — BUTTON-R19` });

  // V2 — action présentée comme un lien (déterministe uniquement sur destination factice
  // ou navigation annulée) ; S1 — href réel + onClick = signal assisté, jamais une violation.
  for (const nom of ['a', 'Link']) {
    for (const p of balises(t, nom)) {
      const aOnClick = /\bonClick\s*=/.test(p);
      if (!aOnClick) continue;
      const href = prop(p, 'href');
      if (destinationFactice(href) || /preventDefault/.test(p)) {
        violations.push({ code: 'V2-action-en-lien', classe: 'déterministe', detail: `<${nom}> avec onClick et ${destinationFactice(href) ? `destination factice (href=${JSON.stringify(href ?? 'absent')})` : 'navigation annulée (preventDefault)'} — INTERACTION-R07 / LINK-R02` });
      } else {
        signaux.push({ code: 'S1-lien-avec-onClick', classe: 'assisté', detail: `<${nom} href=${JSON.stringify(href)}> porte un onClick — analytics légitime ou action déguisée : à trancher par un juge` });
      }
    }
  }

  // V3 — surface statique cliquable
  for (const p of balises(t, 'Card')) {
    const mode = prop(p, 'mode') ?? 'static';
    if (mode === 'static' && /\bonClick\s*=/.test(p)) {
      violations.push({ code: 'V3-surface-statique-cliquable', classe: 'déterministe', detail: 'Card en mode static avec onClick — INTERACTION-R10' });
    }
  }
  for (const p of balises(t, 'div')) {
    if (/\bonClick\s*=/.test(p)) violations.push({ code: 'V3-surface-statique-cliquable', classe: 'déterministe', detail: 'div avec onClick (surface non sémantique) — CARD-R22 / INTERACTION-R10' });
  }

  return { fichier, dominants, violations, nbViolations: violations.length, signaux };
}

const resultats = process.argv.slice(2).map(verifie);
console.log(JSON.stringify(resultats, null, 2));
