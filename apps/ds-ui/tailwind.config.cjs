// Thème = tokens @sibyl/tokens (couleurs var() -> mode sombre automatique). On scanne aussi
// la source de @sibyl/react pour émettre ses classes utilitaires dans le CSS de l'atelier.
const theme = require("@sibyl/tokens/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/react/src/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: { extend: { ...theme } },
  plugins: [],
};
