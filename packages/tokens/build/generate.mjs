// Générateur — Node pur. Source unique → 3 sorties (CSS, thème Tailwind, variables Figma).
// Aucune valeur n'est écrite à la main dans les sorties : tout vient de tokens.source.mjs.

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  primitives, alpha, semantic, states,
  typography, spacing, radius, elevation, motion, grid, border, breakpoint, zIndex, overlay, meta,
} from "../src/tokens.source.mjs";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
mkdirSync(DIST, { recursive: true });

const resolve = (ref) => {
  const [fam, step] = ref.split(".");
  return primitives[fam][step];
};

// Rôles sémantiques À PLAT (noms d'autorité) → { name: {light, dark} }
const roles = {};
for (const [name, modes] of Object.entries(semantic))
  roles[name] = { light: resolve(modes.light), dark: resolve(modes.dark) };

// ── 1. tokens.css ────────────────────────────────────────────────────────────
let css = `/* GÉNÉRÉ depuis tokens.source.mjs — NE PAS ÉDITER. ${meta.name} */\n:root {\n`;
css += `  /* primitives */\n`;
for (const [fam, steps] of Object.entries(primitives))
  for (const [step, hex] of Object.entries(steps))
    css += `  --${fam}-${step}: ${hex};\n`;
for (const [k, v] of Object.entries(alpha)) css += `  --${k}: ${v};\n`;
css += `\n  /* rôles sémantiques — MODE CLAIR */\n`;
for (const [name, m] of Object.entries(roles)) css += `  --${name}: ${m.light};\n`;
css += `\n  /* typographie */\n`;
css += `  --font-sans: ${typography.fontFamily.sans};\n`;
css += `  --font-mono: ${typography.fontFamily.mono};\n`;
css += `  --font-label: ${typography.fontFamily.label};\n`;
for (const [k, v] of Object.entries(typography.heading)) css += `  --text-${k}: ${v};\n`;
for (const [k, v] of Object.entries(typography.size)) css += `  --size-${k}: ${v};\n`;
for (const [k, v] of Object.entries(typography.weight)) css += `  --weight-${k}: ${v};\n`;
for (const [k, v] of Object.entries(typography.icon)) css += `  --icon-${k}: ${v};\n`;
css += `\n  /* espacement */\n`;
for (const [k, v] of Object.entries(spacing)) css += `  --space-${k}: ${v};\n`;
css += `\n  /* rayon */\n`;
for (const [k, v] of Object.entries(radius)) css += `  --radius-${k}: ${v};\n`;
css += `\n  /* élévation */\n`;
for (const [k, v] of Object.entries(elevation)) css += `  --elevation-${k}: ${v};\n`;
css += `\n  /* motion — durées + courbes */\n`;
for (const [k, v] of Object.entries(motion.duration)) css += `  --duration-${k}: ${v};\n`;
for (const [k, v] of Object.entries(motion.easing)) css += `  --${k}: ${v};\n`;
css += `\n  /* grille — largeurs de conteneur */\n`;
for (const [k, v] of Object.entries(grid)) css += `  --${k}: ${v};\n`;
css += `\n  /* z-index — ordre des couches (DS-MD overlay 1.30.0) */\n`;
for (const [k, v] of Object.entries(zIndex)) css += `  --z-${k}: ${v};\n`;
css += `\n  /* overlay — voile modal */\n  --scrim: ${overlay.scrim};\n`;
css += `\n  /* breakpoints (référence CSS — les bascules réelles passent par les screens Tailwind) */\n`;
for (const [k, v] of Object.entries(breakpoint)) css += `  --breakpoint-${k}: ${v};\n`;
css += `\n  /* bordure / focus ring */\n`;
for (const [k, v] of Object.entries(border)) css += `  --${k}: ${v};\n`;
css += `}\n\n`;
css += `/* rôles sémantiques — MODE SOMBRE (data-theme + prefers) */\n`;
css += `[data-theme="dark"] {\n`;
for (const [name, m] of Object.entries(roles)) css += `  --${name}: ${m.dark};\n`;
css += `}\n\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n`;
for (const [name, m] of Object.entries(roles)) css += `    --${name}: ${m.dark};\n`;
css += `  }\n}\n`;
writeFileSync(join(DIST, "tokens.css"), css);

// ── 2. thème Tailwind (CJS) — les couleurs pointent vers les vars → modes gratuits ──
const primGroup = (fam) => Object.fromEntries(
  Object.keys(primitives[fam]).map((s) => [s, `var(--${fam}-${s})`]));

// Chaque rôle d'AUTORITÉ (à plat) devient une couleur Tailwind de premier niveau →
// classes bg-primary, text-text-primary, border-border-strong, bg-danger-subtle, ring-accent…
const colors = { transparent: "transparent", current: "currentColor", inherit: "inherit" };
for (const n of Object.keys(roles)) colors[n] = `var(--${n})`;
for (const fam of Object.keys(primitives)) if (fam !== "static") colors[`p-${fam}`] = primGroup(fam);
colors.scrim = "var(--scrim)";

const theme = {
  colors,
  fontFamily: { sans: ["Geist", "system-ui", "sans-serif"], mono: ["JetBrains Mono", "monospace"], label: ["Inter", "system-ui", "sans-serif"] },
  fontSize: Object.fromEntries(Object.entries(typography.heading).map(([k, v]) => [k, v])),
  spacing: Object.fromEntries(Object.entries(spacing).map(([k, v]) => [k, v])),
  borderRadius: { ...radius },
  boxShadow: { ...elevation },
  transitionDuration: Object.fromEntries(Object.entries(motion.duration).map(([k, v]) => [k, v])),
  transitionTimingFunction: Object.fromEntries(
    Object.entries(motion.easing).map(([k, v]) => [k.replace(/^ease-/, ""), v])),
  maxWidth: Object.fromEntries(Object.entries(grid).filter(([k]) => k.startsWith("container-")).map(([k, v]) => [k, v])),
  screens: { ...breakpoint },
  width: Object.fromEntries(Object.entries(grid).filter(([k]) => k.startsWith("rail-"))),
  minWidth: Object.fromEntries(Object.entries(grid).filter(([k]) => k.startsWith("rail-"))),
  flexBasis: Object.fromEntries(Object.entries(grid).filter(([k]) => k.startsWith("rail-"))),
  zIndex: { ...zIndex },
};
writeFileSync(join(DIST, "tailwind.theme.cjs"),
  `// GÉNÉRÉ depuis tokens.source.mjs — NE PAS ÉDITER.\nmodule.exports = ${JSON.stringify(theme, null, 2)};\n`);

// ── 3. variables Figma (interchange) — collections + modes ─────────────────────
const figma = {
  collections: [
    {
      name: "Primitives", modes: ["Value"],
      variables: Object.entries(primitives).flatMap(([fam, steps]) =>
        Object.entries(steps).map(([step, hex]) =>
          ({ name: `${fam}/${step}`, type: "color", valuesByMode: { Value: hex } }))),
    },
    {
      name: "Semantic", modes: ["Light", "Dark"],
      variables: Object.entries(roles).map(([name, m]) =>
        ({ name: name.replace(/-/g, "/"), type: "color",
           valuesByMode: { Light: m.light, Dark: m.dark } })),
    },
    {
      name: "Motion", modes: ["Value"],
      variables: [
        ...Object.entries(motion.duration).map(([k, v]) =>
          ({ name: `duration/${k}`, type: "float", valuesByMode: { Value: parseFloat(v) } })), // ms
        ...Object.entries(motion.easing).map(([k, v]) =>
          ({ name: `easing/${k.replace(/^ease-/, "")}`, type: "string", valuesByMode: { Value: v } })),
      ],
    },
    {
      name: "Grid", modes: ["Value"],
      variables: Object.entries(grid).filter(([k]) => k.startsWith("container-")).map(([k, v]) =>
        ({ name: `container/${k.replace(/^container-/, "")}`, type: "float", valuesByMode: { Value: parseFloat(v) } })), // px
    },
    {
      name: "Radius", modes: ["Value"],
      variables: Object.entries(radius).map(([k, v]) =>
        ({ name: k, type: "float", valuesByMode: { Value: parseFloat(v) } })), // px (pill = 9999)
    },
    {
      name: "Spacing", modes: ["Value"],
      variables: Object.entries(spacing).map(([k, v]) =>
        ({ name: k, type: "float", valuesByMode: { Value: parseFloat(v) } })), // px
    },
    {
      name: "Border", modes: ["Value"],
      variables: Object.entries(border).map(([k, v]) =>
        ({ name: k.replace(/-/g, "/"), type: "float", valuesByMode: { Value: parseFloat(v) } })), // px
    },
  ],
};
writeFileSync(join(DIST, "figma-variables.json"), JSON.stringify(figma, null, 2));

const nRoles = Object.keys(roles).length;
const nPrims = Object.values(primitives).reduce((a, s) => a + Object.keys(s).length, 0);
console.log(`Généré dans dist/ :`);
console.log(`  tokens.css            (${nPrims} primitives + ${nRoles} rôles × 2 modes)`);
console.log(`  tailwind.theme.cjs    (couleurs → var(), modes automatiques)`);
console.log(`  figma-variables.json  (Primitives[Value] + Semantic[Light,Dark])`);
