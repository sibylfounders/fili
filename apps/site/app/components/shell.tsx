"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell, Brand, ThemeToggle, Divider, Select } from "@sibyl/react";

const SECTIONS = [
  { value: "md", label: "Doctrine" },
  { value: "ui", label: "Composants" },
  { value: "audit", label: "Audit" },
];

export function Shell({
  section,
  children,
}: {
  section: "md" | "ui" | "audit";
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [dark, setDark] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setNavOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AppShell.Root>
      {/* Burger — visible seulement quand le menu est off-canvas (sous desktop) */}
      <button
        type="button"
        onClick={() => setNavOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={navOpen}
        className="fixed left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-text-primary shadow-sm desktop:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Scrim (sous desktop, menu ouvert) */}
      {navOpen ? <div className="fixed inset-0 z-40 bg-black/40 desktop:hidden" onClick={() => setNavOpen(false)} /> : null}

      {/* Rail de menu — off-canvas sous desktop (glisse derrière le burger), rail sticky au-dessus */}
      <nav
        aria-label="Navigation"
        onClick={(e) => { if ((e.target as HTMLElement).closest("a,button")) setNavOpen(false); }}
        className={
          "w-rail-nav shrink-0 overflow-y-auto border-r border-border bg-surface " +
          "max-desktop:fixed max-desktop:inset-y-0 max-desktop:left-0 max-desktop:z-50 max-desktop:transition-transform " +
          (navOpen ? "max-desktop:translate-x-0 " : "max-desktop:-translate-x-full ") +
          "desktop:sticky desktop:top-0 desktop:h-screen"
        }
      >
        <div className="flex flex-col gap-lg p-lg">
          <Link href="/" className="no-underline"><Brand.Root><Brand.Text>Sibyl DS</Brand.Text></Brand.Root></Link>
          <Select options={SECTIONS} value={section} onValueChange={(v) => router.push(`/${v}`)} aria-label="Section" />
          <div id="section-nav" />
        </div>
      </nav>

      <AppShell.Main>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </AppShell.Main>

      <AppShell.Tools>
        <div className="flex flex-col gap-md p-lg">
          <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Outils</span>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">Thème sombre</span>
            <ThemeToggle checked={dark} onCheckedChange={setDark} aria-label="Thème sombre" />
          </div>
          <Divider />
          <div id="section-tools" />
        </div>
      </AppShell.Tools>
    </AppShell.Root>
  );
}
