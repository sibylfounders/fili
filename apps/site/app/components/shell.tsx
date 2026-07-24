"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell, Brand, ThemeToggle, Divider, Select, Switch } from "@sibyl/react";

const SECTIONS = [
  { value: "md", label: "Doctrine" },
  { value: "ui", label: "Composants" },
  { value: "audit", label: "Audit" },
];
const RADIUS_OPTS = [
  { value: "carre", label: "Carré" },
  { value: "defaut", label: "Défaut" },
  { value: "arrondi", label: "Arrondi" },
  { value: "pilule", label: "Pilule" },
];
const RADIUS_PRESETS: Record<string, Record<"sm" | "md" | "lg", string | null>> = {
  carre: { sm: "0px", md: "0px", lg: "0px" },
  defaut: { sm: null, md: null, lg: null },
  arrondi: { sm: "8px", md: "14px", lg: "20px" },
  pilule: { sm: "9999px", md: "9999px", lg: "9999px" },
};
const FW_OPTS = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "tailwind", label: "Tailwind" },
  { value: "html", label: "HTML" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-md">
      <span className="text-sm text-text-secondary">{label}</span>
      {children}
    </div>
  );
}

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
  const [radius, setRadius] = React.useState("defaut");
  const [relief, setRelief] = React.useState(false);
  const [fw, setFw] = React.useState("react");

  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setNavOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  React.useEffect(() => {
    const r = RADIUS_PRESETS[radius] ?? {};
    const root = document.documentElement;
    (["sm", "md", "lg"] as const).forEach((sz) => {
      const v = r[sz];
      if (v) root.style.setProperty(`--radius-${sz}`, v);
      else root.style.removeProperty(`--radius-${sz}`);
    });
  }, [radius]);
  React.useEffect(() => {
    document.documentElement.toggleAttribute("data-relief", relief);
  }, [relief]);

  return (
    <AppShell.Root>
      <button
        type="button"
        onClick={() => setNavOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={navOpen}
        className="fixed left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-text-primary shadow-sm desktop:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {navOpen ? <div className="fixed inset-0 z-40 bg-black/40 desktop:hidden" onClick={() => setNavOpen(false)} /> : null}

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
          <div className="flex items-baseline justify-between">
            <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Theming</span>
            <span className="font-mono text-[11px] text-text-muted">tokens live</span>
          </div>
          <Row label="Thème"><ThemeToggle checked={dark} onCheckedChange={setDark} aria-label="Thème sombre" /></Row>
          <Row label="Rayon"><Select options={RADIUS_OPTS} value={radius} onValueChange={setRadius} aria-label="Rayon" /></Row>
          <Row label="Relief"><Switch checked={relief} onCheckedChange={setRelief} aria-label="Relief" /></Row>
          <Row label="Framework"><Select options={FW_OPTS} value={fw} onValueChange={setFw} aria-label="Framework" /></Row>
          <Divider />
          <Row label="Icônes"><span className="text-sm text-text-secondary">◈ Lucide</span></Row>
          <Row label="Primitives"><span className="text-sm text-text-secondary">Radix</span></Row>
          <Divider />
          <div id="section-tools" />
        </div>
      </AppShell.Tools>
    </AppShell.Root>
  );
}
