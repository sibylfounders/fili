import { defineConfig } from "vitest/config";

// Harnais de test LÉGER du kit (fermeture chantier cohérence) — pas de Storybook :
// l'Atelier reste l'outil vivant ; ici, l'API, l'interaction et l'accessibilité
// s'attestent en jsdom. Les tests visuels/adaptatifs (rendu réel) restent un trou
// documenté (cf. RAPPORT-FERMETURE-COHERENCE.md).
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: false,
    include: ["src/**/*.test.tsx"],
  },
  esbuild: { jsx: "automatic" },
});
