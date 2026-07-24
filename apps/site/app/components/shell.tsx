"use client";
import * as React from "react";
import Link from "next/link";
import { AppShell, Brand, ThemeToggle, Divider } from "@sibyl/react";

const SECTIONS = [
  { key: "md", label: "Doctrine", href: "/md" },
  { key: "ui", label: "Composants", href: "/ui" },
  { key: "audit", label: "Audit", href: "/audit" },
];

export function Shell({
  section,
  nav,
  children,
}: {
  section: "md" | "ui" | "audit";
  nav?: React.ReactNode;
  children: React.ReactNode;
}) {
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
          <nav className="flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <Link
                key={s.key}
                href={s.href}
                className={
                  "rounded-sm px-md py-2 text-sm no-underline " +
                  (s.key === section
                    ? "bg-surface font-semibold text-primary"
                    : "text-text-secondary")
                }
              >
                {s.label}
              </Link>
            ))}
          </nav>
          {nav ? (<><Divider /><div>{nav}</div></>) : null}
        </div>
      </AppShell.Nav>

      <AppShell.Main>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </AppShell.Main>

      <AppShell.Tools>
        <div className="flex flex-col gap-md p-lg">
          <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Outils
          </span>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">Thème sombre</span>
            <ThemeToggle checked={dark} onCheckedChange={setDark} aria-label="Thème sombre" />
          </div>
        </div>
      </AppShell.Tools>
    </AppShell.Root>
  );
}
