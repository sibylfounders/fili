const theme = require("@sibyl/tokens/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "../../packages/react/src/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: { extend: { ...theme } },
  plugins: [],
};
