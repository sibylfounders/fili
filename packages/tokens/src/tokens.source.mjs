// Design System UI — SOURCE DE VÉRITÉ DES TOKENS
// Écrit à la main. Tout le reste (CSS, thème Tailwind, variables Figma) en est GÉNÉRÉ.
// Valeurs = palette DS-MD (échelles froides Tailwind-like), organisées en 3 étages.

// ─────────────────────────────────────────────────────────────────────────────
// ÉTAGE 1 — PRIMITIVES (échelles brutes, ne jamais consommer directement en composant)
// ─────────────────────────────────────────────────────────────────────────────
export const primitives = {
  neutral: {
    0: "#FFFFFF", 50: "#F9FAFB", 100: "#F3F4F6", 200: "#E5E7EB", 300: "#D1D5DB",
    400: "#9CA3AF", 500: "#6B7280", 600: "#4B5563", 700: "#374151", 800: "#1F2937",
    900: "#111827", 950: "#030712",
  },
  // primary = indigo (DS-MD primary #4F46E5 = indigo-600)
  indigo: {
    50: "#EEF2FF", 100: "#E0E7FF", 200: "#C7D2FE", 300: "#A5B4FC", 400: "#818CF8",
    500: "#6366F1", 600: "#4F46E5", 700: "#4338CA", 800: "#3730A3", 900: "#312E81",
    950: "#1E1B4B",
  },
  // error = red (DS-MD danger #B91C1C = red-700)
  red: {
    50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA", 300: "#FCA5A5", 400: "#F87171",
    500: "#EF4444", 600: "#DC2626", 700: "#B91C1C", 800: "#991B1B", 900: "#7F1D1D",
    950: "#450A0A",
  },
  // success = green (DS-MD success #15803D = green-700)
  green: {
    50: "#F0FDF4", 100: "#DCFCE7", 200: "#BBF7D0", 300: "#86EFAC", 400: "#4ADE80",
    500: "#22C55E", 600: "#16A34A", 700: "#15803D", 800: "#166534", 900: "#14532D",
    950: "#052E16",
  },
  // warning = amber (DS-MD warning #92400E = amber-800)
  amber: {
    50: "#FFFBEB", 100: "#FEF3C7", 200: "#FDE68A", 300: "#FCD34D", 400: "#FBBF24",
    500: "#F59E0B", 600: "#D97706", 700: "#B45309", 800: "#92400E", 900: "#78350F",
    950: "#451A03",
  },
  // info = blue (DS-MD info #1D4ED8 = blue-700)
  blue: {
    50: "#EFF6FF", 100: "#DBEAFE", 200: "#BFDBFE", 300: "#93C5FD", 400: "#60A5FA",
    500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8", 800: "#1E40AF", 900: "#1E3A8A",
    950: "#172554",
  },
  // accent = cyan (DS-MD accent #0891B2 = cyan-600) — anneau de focus dédié
  cyan: {
    50: "#ECFEFF", 100: "#CFFAFE", 200: "#A5F3FC", 300: "#67E8F9", 400: "#22D3EE",
    500: "#06B6D4", 600: "#0891B2", 700: "#0E7490", 800: "#155E75", 900: "#164E63",
    950: "#083344",
  },
  static: { black: "#000000", white: "#FFFFFF" },
};

// Variantes alpha du neutre (state-layers, lavis) — sur neutral-950 froid
export const alpha = {
  "neutral-alpha-10": "rgba(3, 7, 18, 0.10)",
  "neutral-alpha-16": "rgba(3, 7, 18, 0.16)",
  "neutral-alpha-24": "rgba(3, 7, 18, 0.24)",
};

// ─────────────────────────────────────────────────────────────────────────────
// ÉTAGE 2 — RÔLES SÉMANTIQUES (nommés par usage, une valeur par mode)
//   ref "famille.pas" → résolu vers un hex primitif à la génération.
// ─────────────────────────────────────────────────────────────────────────────
// RÔLES À PLAT, nommés d'après l'AUTORITÉ DS-MD (tokens.yaml) — SOURCE UNIQUE DE VÉRITÉ.
// La valeur CLAIR est celle de l'autorité ; la valeur SOMBRE (que l'autorité ne définit pas)
// est fournie par le DS-UI sous le même nom (extension assumée). Convention de l'autorité :
//   {nom} (base) · {nom}-hover · on-{nom} · {nom}-subtle (+ -subtle-hover pour le lavis interactif).
export const semantic = {
  // ── Surfaces neutres (autorité : background / surface / surface-hover)
  "background":     { light: "neutral.0",   dark: "neutral.950" }, // surface de page
  "surface":        { light: "neutral.100", dark: "neutral.800" }, // zone surélevée / carte
  "surface-hover":  { light: "neutral.200", dark: "neutral.700" }, // survol de surface / remplissage ~10%
  "surface-inverse":{ light: "neutral.900", dark: "neutral.0"   }, // surface neutre inversée (bouton neutral plein) — extension DS-UI

  // ── Texte (autorité : text-primary / text-secondary / text-muted)
  "text-primary":   { light: "neutral.900", dark: "neutral.0"   },
  "text-secondary": { light: "neutral.600", dark: "neutral.400" },
  "text-muted":     { light: "neutral.400", dark: "neutral.500" },
  "text-disabled":  { light: "neutral.300", dark: "neutral.600" }, // extension DS-UI
  "text-inverse":   { light: "neutral.0",   dark: "neutral.900" }, // texte sur surface-inverse — extension DS-UI

  // ── Bordures (autorité : border / border-strong)
  "border":         { light: "neutral.200", dark: "neutral.800" }, // décorative / séparation
  "border-strong":  { light: "neutral.500", dark: "neutral.400" }, // délimitante 3:1 (WCAG 1.4.11)
  "border-inverse": { light: "neutral.0",   dark: "neutral.950" }, // couture sur surface-inverse — extension DS-UI

  // ── static (papier E-motion) : HORS autorité, fixe (light === dark), jamais inversé
  "static-base":    { light: "neutral.0",   dark: "neutral.0"   },
  "static-dark":    { light: "neutral.200", dark: "neutral.200" },
  "static-darker":  { light: "neutral.400", dark: "neutral.400" },

  // ── Marque primaire (autorité : primary / primary-hover / on-primary)
  "primary":        { light: "indigo.600", dark: "indigo.400" },
  "primary-hover":  { light: "indigo.700", dark: "indigo.300" },
  "on-primary":     { light: "neutral.0",  dark: "neutral.950" },
  // secondary = lavis primaire (autorité : secondary / secondary-hover / on-secondary)
  "secondary":        { light: "indigo.100", dark: "indigo.900" },
  "secondary-hover":  { light: "indigo.200", dark: "indigo.800" },
  "on-secondary":     { light: "indigo.800", dark: "indigo.200" },
  // accent = anneau de focus dédié (autorité : accent #0891B2)
  "accent":         { light: "cyan.600", dark: "cyan.400" },

  // ── Destructif (autorité : danger / danger-hover / danger-subtle) — ex-« error »
  "danger":              { light: "red.700", dark: "red.400" },
  "danger-hover":        { light: "red.800", dark: "red.300" },
  "danger-subtle":       { light: "red.100", dark: "red.950" },
  "danger-subtle-hover": { light: "red.200", dark: "red.900" }, // lavis interactif — extension (cf. warning-subtle-hover)
  "on-danger":           { light: "neutral.0", dark: "neutral.950" },

  // ── Succès (autorité : success / success-subtle)
  "success":              { light: "green.700", dark: "green.400" },
  "success-hover":        { light: "green.800", dark: "green.300" },
  "success-subtle":       { light: "green.100", dark: "green.950" },
  "success-subtle-hover": { light: "green.200", dark: "green.900" },
  "on-success":           { light: "neutral.0", dark: "neutral.950" },

  // ── Info (autorité : info / info-subtle)
  "info":              { light: "blue.700", dark: "blue.400" },
  "info-hover":        { light: "blue.800", dark: "blue.300" },
  "info-subtle":       { light: "blue.100", dark: "blue.950" },
  "info-subtle-hover": { light: "blue.200", dark: "blue.900" },
  "on-info":           { light: "neutral.0", dark: "neutral.950" },

  // ── Avertissement (autorité : warning / warning-subtle / warning-subtle-hover)
  "warning":              { light: "amber.800", dark: "amber.400" },
  "warning-hover":        { light: "amber.900", dark: "amber.300" },
  "warning-subtle":       { light: "amber.100", dark: "amber.950" },
  "warning-subtle-hover": { light: "amber.200", dark: "amber.900" },
  "on-warning":           { light: "neutral.0", dark: "neutral.950" },
};

// Familles d'états (pour la validation de contraste et le regroupement) — dérivé du plat ci-dessus.
export const stateFamilies = ["primary", "danger", "success", "info", "warning"];
// Conservé pour compat d'import ; les rôles vivent désormais à plat dans `semantic`.
export const states = {};

// ─────────────────────────────────────────────────────────────────────────────
// FONDATIONS NON-COULEUR — héritées de DS-MD (déjà validées), reprises telles quelles
// ─────────────────────────────────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    sans: "Geist, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, 'SF Mono', 'Cascadia Mono', Consolas, monospace",
    label: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  // échelle fluide DS-MD (clamp rem+vw), titres graisse 500
  heading: {
    h1: "clamp(2rem, 1.67rem + 1.67vw, 3rem)",
    h2: "clamp(1.5rem, 1.33rem + 0.83vw, 2rem)",
    h3: "clamp(1.25rem, 1.17rem + 0.42vw, 1.5rem)",
    h4: "clamp(1.125rem, 1.08rem + 0.21vw, 1.25rem)",
    h5: "clamp(1rem, 0.96rem + 0.21vw, 1.125rem)",
    h6: "clamp(0.875rem, 0.83rem + 0.21vw, 1rem)",
  },
  // grille jumelle label(500)/paragraphe(400) sur corps partagés
  size: { xl: "24px", lg: "18px", md: "16px", sm: "14px", xs: "12px" },
  weight: { regular: 400, medium: 500, semibold: 600 },
  display: { fontSize: "48px", fontWeight: 500, lineHeight: "1.1" },
};

export const spacing = {
  0: "0px", base: "4px", xs: "4px", sm: "8px", md: "16px", lg: "24px",
  xl: "40px", "2xl": "64px", section: "80px",
};

// `lg` vient du contrat DS-MD. none/xs/2xl restent des extensions propres à DS-UI.
export const radius = { none: "0px", xs: "2px", sm: "4px", md: "8px", lg: "12px", "2xl": "20px", pill: "9999px" };

export const elevation = {
  none: "none",
  raised: "0 1px 3px rgba(3, 7, 18, 0.10)",
  overlay: "0 4px 12px rgba(3, 7, 18, 0.14)",
  // rôle "scène" : ombre ambiante des gabarits (jamais une affordance)
  scene: "0 24px 64px -16px rgba(3, 7, 18, 0.13), 0 4px 16px rgba(3, 7, 18, 0.05)",
};

// MOTION — durées + courbes des micro-interactions (DS-MD motion, fondation 1.11.0).
// Tout le système reste sous ~400ms ; rotation continue du spinner = seule exception au bannissement du linéaire.
export const motion = {
  duration: {
    fast: "100ms",  // feedback : hover, press, changement de couleur/bordure (~seuil perçu-instantané, Nielsen)
    base: "200ms",  // continuité locale : chevron, apparition, dépliage
    slow: "300ms",  // grandes surfaces — provisionné (panneaux, superposés)
    // Cran EXPRESSIF (fondation E-motion, DS-MD DESIGN 1.22.0) — au-delà de la borne ~400ms
    // du registre productif. RÉSERVÉ aux moments MÉRITÉS, sous budget de rareté (cf. EMOTION-UX).
    expressive: "700ms",   // beat d'un moment expressif signature
    celebration: "1200ms", // plafond DUR d'une séquence chorégraphiée complète (l'avion en papier)
  },
  easing: {
    "ease-out":    "cubic-bezier(0, 0, 0.2, 1)",   // ce qui entre décélère
    "ease-in":     "cubic-bezier(0.4, 0, 1, 1)",   // ce qui sort accélère
    "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)", // ce qui bouge sur place (chevron, dépliage)
    spring:        "cubic-bezier(0.34, 1.56, 0.64, 1)", // overshoot — le « caractère » d'E-motion ; hors registre productif
  },
};

// GRID — largeurs de conteneur structurelles (DS-MD grid, fondation 1.18.0).
// max-width d'un conteneur de page (≠ breakpoint = point de bascule, ≠ measure = mesure de lecture).
// La grille de colonnes reste différée jusqu'au pattern collection/grille.
export const grid = {
  "container-narrow":  "480px",  // formulaire, auth, création de compte — mono-colonne focalisée
  "container-default": "1024px", // page de contenu ou d'app standard
  "container-wide":    "1440px", // dashboard, collection dense, tableau large
  // Rails du SHELL applicatif (DS-MD grid 1.29.0) — largeurs fixes ; le contenu prend le reste.
  "rail-nav":   "280px", // rail de navigation (début)
  "rail-tools": "320px", // rail d'outils (fin)
};

// BREAKPOINT — points de bascule du SHELL (DS-MD breakpoint). Exposés en `screens` Tailwind :
// classes mobile:/tablet:/desktop: = min-width. Distinct de grid (largeurs) et measure (lecture).
export const breakpoint = {
  mobile:  "480px",  // bascule mobile/desktop de base
  tablet:  "1024px", // sous ce seuil : rail de nav en off-canvas
  desktop: "1280px", // sous ce seuil : rail d'outils replié (panneau invocable)
};

// BORDER — focus ring (DS-MD border, fondation 1.9.0) : implémenté en outline (pas de layout shift).
export const border = {
  "focus-width":  "2px", // largeur de l'anneau
  "focus-offset": "2px", // écart composant ↔ anneau (le ring s'ajoute, ne remplace pas la bordure d'état)
};

// Z-INDEX — ordre des couches superposées (DS-MD z-index, fondation overlay 1.30.0).
export const zIndex = {
  sticky:  "100",
  overlay: "1000", // scrim + surface d'un superposé modal (drawer, modale)
  popover: "1100", // superposé non-modal ancré (dropdown, menu, popover)
  toast:   "1200",
  tooltip: "1300",
};

// OVERLAY — voile d'un superposé modal (DS-MD overlay.scrim). rgba (alpha) → hors paires de contraste.
export const overlay = {
  scrim: "rgba(17, 24, 39, 0.5)",
};

export const meta = {
  name: "@ds-ui/tokens",
  modes: ["light", "dark"],
  note: "DS-UI consomme DS-MD. Valeurs = DS-MD ; organisation 3 étages + modes.",
};
