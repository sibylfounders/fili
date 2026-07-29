import { defineConfig } from "vitest/config";

// Harnais de test LÉGER du kit (fermeture chantier cohérence) — pas de Storybook :
// l'Atelier reste l'outil vivant ; ici, l'API, l'interaction et l'accessibilité
// s'attestent en jsdom. Les tests visuels/adaptatifs (rendu réel) restent un trou
// documenté (cf. docs/chantiers/RAPPORT-FERMETURE-COHERENCE.md).
export default defineConfig({
  test: {
    environment: "jsdom",
    // globals: true est REQUIS pour le nettoyage automatique de testing-library
    // entre les tests (sans lui, le DOM du test précédent fuit dans le suivant).
    globals: true,
    setupFiles: "./vitest.setup.ts",
    css: false,
    include: ["src/**/*.test.tsx"],
  },
  esbuild: { jsx: "automatic" },
});
