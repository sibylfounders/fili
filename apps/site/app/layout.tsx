import "@sibyl/tokens/css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sibyl DS",
  description: "Design System Sibyl — doctrine, composants, audit. Une stack, un shell.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
