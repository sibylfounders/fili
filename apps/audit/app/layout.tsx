import "@sibyl/tokens/css";
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Audit MD — Sibyl",
  description: "Protocoles d'audit et règles condensées de la constellation Sibyl.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="light">
      <body>
        <header className="topbar">
          <Link href="/" className="brand">Audit MD</Link>
          <span className="brand-v">Sibyl · preuve Next</span>
        </header>
        {children}
      </body>
    </html>
  );
}
