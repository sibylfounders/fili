"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { GROUPS } from "./registry";
import { Controls } from "./controls";
import { ResizablePreview } from "./resizable-preview";
import { Tabs } from "./tabs";

const ALL = GROUPS.flatMap((g) => g.items);

export function Atelier() {
  const [key, setKey] = React.useState(ALL[0]?.key ?? "");
  const [tab, setTab] = React.useState<"apercu" | "code">("apercu");
  const [states, setStates] = React.useState<Record<string, Record<string, any>>>(() =>
    Object.fromEntries(ALL.map((e) => [e.key, { ...(e.initial ?? {}) }]))
  );
  const [navSlot, setNavSlot] = React.useState<HTMLElement | null>(null);
  const [toolsSlot, setToolsSlot] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    setNavSlot(document.getElementById("section-nav"));
    setToolsSlot(document.getElementById("section-tools"));
  }, []);

  const entry = ALL.find((e) => e.key === key) ?? ALL[0];
  const s = states[entry.key] ?? {};
  const set = (k: string, v: any) =>
    setStates((prev) => ({ ...prev, [entry.key]: { ...prev[entry.key], [k]: v } }));

  const list = (
    <div className="flex flex-col gap-lg">
      {GROUPS.map((g) => (
        <div key={g.label}>
          <p className="mb-2 font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">{g.label}</p>
          <div className="flex flex-col gap-1">
            {g.items.map((it) => (
              <button
                key={it.key}
                onClick={() => setKey(it.key)}
                className={"rounded-sm px-md py-1.5 text-left text-sm " + (it.key === entry.key ? "bg-surface font-semibold text-primary" : "text-text-secondary")}
              >
                {it.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const tools =
    entry.controls && entry.controls.length ? (
      <div>
        <p className="mb-md font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Contrôles · {entry.name}</p>
        <Controls controls={entry.controls} state={s} set={set} />
      </div>
    ) : null;

  return (
    <div className="mx-auto max-w-[900px] px-xl py-xl">
      <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Composant</span>
      <h1 className="mb-lg mt-1 text-3xl font-medium text-text-primary">{entry.name}</h1>

      <div className="mb-md flex items-center justify-between">
        <Tabs
          tabs={[{ value: "apercu", label: "Aperçu" }, { value: "code", label: "Code" }]}
          value={tab}
          onChange={(v) => setTab(v as "apercu" | "code")}
        />
      </div>

      {tab === "apercu" ? (
        <ResizablePreview>{entry.render(s, set)}</ResizablePreview>
      ) : (
        <div className="overflow-hidden rounded-md border border-border">
          <div className="border-b border-border bg-surface px-md py-2 font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">jsx</div>
          <pre className="m-0 overflow-x-auto bg-surface p-md font-mono text-sm text-text-primary">{entry.code(s)}</pre>
        </div>
      )}

      {navSlot ? createPortal(list, navSlot) : null}
      {toolsSlot && tools ? createPortal(tools, toolsSlot) : null}
    </div>
  );
}
