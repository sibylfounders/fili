"use client";
import * as React from "react";
import { GROUPS } from "./registry";

const ALL = GROUPS.flatMap((g) => g.items);

export function Atelier() {
  const [key, setKey] = React.useState(ALL[0]?.key ?? "");
  const entry = ALL.find((e) => e.key === key) ?? ALL[0];

  return (
    <div className="flex gap-xl px-lg py-xl">
      <aside className="w-52 shrink-0">
        {GROUPS.map((g) => (
          <div key={g.label} className="mb-lg">
            <p className="mb-2 font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">{g.label}</p>
            <div className="flex flex-col gap-1">
              {g.items.map((it) => (
                <button
                  key={it.key}
                  onClick={() => setKey(it.key)}
                  className={
                    "rounded-sm px-md py-1.5 text-left text-sm " +
                    (it.key === entry.key ? "bg-surface font-semibold text-primary" : "text-text-secondary")
                  }
                >
                  {it.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <div className="min-w-0 flex-1">
        <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Composant</span>
        <h1 className="mb-lg mt-1 text-3xl font-medium text-text-primary">{entry.name}</h1>

        <div className="rounded-lg border border-border bg-background p-xl shadow-[var(--elevation-raised)]">
          <entry.Demo />
        </div>

        <div className="mt-md overflow-hidden rounded-md border border-border">
          <div className="border-b border-border bg-surface px-md py-2 font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">jsx</div>
          <pre className="m-0 overflow-x-auto bg-surface p-md font-mono text-sm text-text-primary">{entry.code}</pre>
        </div>

        <p className="mt-lg text-sm text-text-muted">
          Rendu par le vrai <code>@sibyl/react</code>. Le ThemeToggle (rail de droite) bascule le thème : tout suit.
        </p>
      </div>
    </div>
  );
}
