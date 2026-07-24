"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { GROUPS } from "./registry";
import { Controls } from "./controls";
import { ResizablePreview } from "./resizable-preview";
import { CodeBlock } from "./code-block";
import { useTheming } from "../theming-context";

const ALL = GROUPS.flatMap((g) => g.items);

export function Atelier() {
  const [key, setKey] = React.useState(ALL[0]?.key ?? "");
  const [states, setStates] = React.useState<Record<string, Record<string, any>>>(() =>
    Object.fromEntries(ALL.map((e) => [e.key, { ...(e.initial ?? {}) }]))
  );
  const [navSlot, setNavSlot] = React.useState<HTMLElement | null>(null);
  const [toolsSlot, setToolsSlot] = React.useState<HTMLElement | null>(null);
  const [replayKey, setReplayKey] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const { framework } = useTheming();

  React.useEffect(() => {
    setNavSlot(document.getElementById("section-nav"));
    setToolsSlot(document.getElementById("section-tools"));
  }, []);

  const entry = ALL.find((e) => e.key === key) ?? ALL[0];
  const s = states[entry.key] ?? {};
  const set = (k: string, v: any) =>
    setStates((prev) => ({ ...prev, [entry.key]: { ...prev[entry.key], [k]: v } }));

  const replay = () => {
    setReplayKey((k) => k + 1);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => previewRef.current?.querySelector("button")?.click())
    );
  };

  const shuffle = () => {
    if (!entry.controls?.length) return;
    const next: Record<string, any> = { ...s };
    for (const c of entry.controls) {
      if (c.type === "seg") next[c.k] = c.opts[Math.floor(Math.random() * c.opts.length)];
      else if (c.type === "bool") next[c.k] = Math.random() < 0.5;
      else if (c.type === "range") {
        const st = c.step ?? 1;
        const n = Math.floor((c.max - c.min) / st) + 1;
        next[c.k] = c.min + Math.floor(Math.random() * n) * st;
      }
    }
    setStates((prev) => ({ ...prev, [entry.key]: next }));
  };
  const reset = () => setStates((prev) => ({ ...prev, [entry.key]: { ...(entry.initial ?? {}) } }));

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

  const iconBtn = "rounded-sm p-1 text-text-secondary transition-colors hover:text-text-primary";
  const tools =
    entry.controls && entry.controls.length ? (
      <div>
        <div className="mb-md flex items-center justify-between">
          <p className="m-0 font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Contrôles · {entry.name}</p>
          <div className="flex items-center gap-1">
            <button type="button" onClick={shuffle} title="Aléatoire" aria-label="Aléatoire" className={iconBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5" /><path d="M4 20 21 3" /><path d="M21 16v5h-5" /><path d="m15 15 6 6" /><path d="M4 4l5 5" /></svg>
            </button>
            <button type="button" onClick={reset} title="Réinitialiser" aria-label="Réinitialiser" className={iconBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
            </button>
          </div>
        </div>
        <Controls controls={entry.controls} state={s} set={set} />
      </div>
    ) : null;

  return (
    <div className="mx-auto max-w-[900px] px-xl py-xl">
      <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Composant</span>
      <div className="mb-lg mt-1 flex items-center justify-between gap-md">
        <h1 className="m-0 text-3xl font-medium text-text-primary">{entry.name}</h1>
        {entry.replay ? (
          <div className="flex items-center gap-md">
            <label className="flex items-center gap-2 text-xs text-text-secondary">
              <input type="checkbox" checked={reduced} onChange={(e) => setReduced(e.target.checked)} />
              reduced-motion
            </label>
            <button
              type="button"
              onClick={replay}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:border-primary"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
              Rejouer
            </button>
          </div>
        ) : null}
      </div>

      <ResizablePreview>
        <div ref={previewRef} key={`${entry.key}-${replayKey}`} className={reduced ? "atelier-reduced" : undefined}>
          {entry.render(s, set)}
        </div>
      </ResizablePreview>

      <CodeBlock code={entry.code(s, framework)} framework={framework} />

      {navSlot ? createPortal(list, navSlot) : null}
      {toolsSlot && tools ? createPortal(tools, toolsSlot) : null}
    </div>
  );
}
