import "@sibyl/tokens/css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier — Sibyl UI",
  description: "Atelier des composants @sibyl/react, dogfoodé sur la stack Sibyl.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
