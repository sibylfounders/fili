// Validation de contraste WCAG — Node pur, zéro dépendance.
// Rejoue l'esprit du test-rendu.js de DS-MD : aucun token couleur n'est "validé"
// sans passer 4.5:1 (texte) / 3:1 (délimitant, grand texte, icône informative).
// Sort en code 1 si une paire REQUISE échoue.

import { primitives, semantic, stateFamilies } from "../src/tokens.source.mjs";

const resolve = (ref) => {
  const [fam, step] = ref.split(".");
  const v = primitives[fam]?.[step];
  if (!v) throw new Error(`Référence primitive introuvable: ${ref}`);
  return v;
};
// rôles À PLAT (noms d'autorité) : role("text-primary", mode)
const role = (name, mode) => resolve(semantic[name][mode]);

const srgb = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (hex) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };

const checks = [];
const add = (label, fg, bg, min, required = true) =>
  checks.push({ label, fg, bg, min, required, r: ratio(fg, bg) });

for (const mode of ["light", "dark"]) {
  const M = mode.toUpperCase();
  const background = role("background", mode);
  const surface = role("surface", mode);
  const surfInv = role("surface-inverse", mode);

  // Texte sur fonds (4.5 : texte courant)
  add(`${M} text-primary / background`, role("text-primary", mode), background, 4.5);
  add(`${M} text-primary / surface`, role("text-primary", mode), surface, 4.5);
  add(`${M} text-secondary / background`, role("text-secondary", mode), background, 4.5);
  add(`${M} text-secondary / surface`, role("text-secondary", mode), surface, 4.5);
  add(`${M} text-inverse / surface-inverse`, role("text-inverse", mode), surfInv, 4.5);
  // text-muted = métadonnée accessoire (DS-MD : aucun pair au seuil texte) → INFO
  add(`${M} text-muted / background (info)`, role("text-muted", mode), background, 4.5, false);

  // Bordure délimitante (3:1)
  add(`${M} border-strong / background`, role("border-strong", mode), background, 3);

  // secondary (lavis primaire) : on-secondary sur secondary
  add(`${M} on-secondary / secondary`, role("on-secondary", mode), role("secondary", mode), 4.5);
  add(`${M} primary / background`, role("primary", mode), background, 4.5);

  // États : texte "on" sur fond plein + base-comme-texte sur background
  for (const fam of stateFamilies) {
    add(`${M} on-${fam} / ${fam}`, role(`on-${fam}`, mode), role(fam, mode), 4.5);
    add(`${M} ${fam} / background`, role(fam, mode), background, 4.5);
  }
  // base-comme-texte sur le lavis -subtle (primary a « secondary » pour lavis, traité plus haut)
  for (const fam of ["danger", "success", "info", "warning"]) {
    add(`${M} ${fam} / ${fam}-subtle`, role(fam, mode), role(`${fam}-subtle`, mode), 4.5);
  }
  // ÉTATS DE SURVOL (AA-strict) : au survol le lavis se fonce ET le texte passe en -hover
  for (const fam of ["danger", "success", "info", "warning"]) {
    add(`${M} ${fam}-hover / ${fam}-subtle-hover`, role(`${fam}-hover`, mode), role(`${fam}-subtle-hover`, mode), 4.5);
  }
  // lavis primaire (secondary) au survol : on-secondary tient sur secondary-hover
  add(`${M} on-secondary / secondary-hover`, role("on-secondary", mode), role("secondary-hover", mode), 4.5);
}

let fails = 0;
const pad = (s, n) => (s + " ".repeat(n)).slice(0, n);
console.log("PAIRE".padEnd(40), "RATIO", " MIN", " ", "STATUT");
console.log("-".repeat(66));
for (const c of checks) {
  const ok = c.r >= c.min;
  if (!ok && c.required) fails++;
  const status = ok ? "OK" : (c.required ? "ÉCHEC" : "sous seuil (toléré)");
  console.log(pad(c.label, 40), c.r.toFixed(2).padStart(5), c.min.toFixed(1).padStart(4), "  ", status);
}
console.log("-".repeat(66));
console.log(`${checks.length} paires · ${fails} échec(s) requis`);
if (fails > 0) { console.error("\n❌ Contraste : des paires REQUISES échouent."); process.exit(1); }
console.log("\n✅ Toutes les paires requises passent (clair + sombre).");
