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
  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <AppShell.Root>
      <AppShell.Nav>
        <div className="flex flex-col gap-lg p-lg">
          <Link href="/" className="no-underline">
            <Brand.Root><Brand.Text>Sibyl DS</Brand.Text></Brand.Root>
          </Link>
          <Select
            options={SECTIONS}
            value={section}
            onValueChange={(v) => router.push(`/${v}`)}
            aria-label="Section"
          />
          {/* rempli par la section active (ex: liste des composants de l'atelier) */}
          <div id="section-nav" />
        </div>
      </AppShell.Nav>

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
          {/* rempli par la section active (ex: contrôles de l'atelier) */}
          <div id="section-tools" />
        </div>
      </AppShell.Tools>
    </AppShell.Root>
  );
}
