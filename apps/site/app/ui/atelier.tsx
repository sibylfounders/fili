"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { GROUPS } from "./registry";
import { Controls } from "./controls";
import { ResizablePreview } from "./resizable-preview";
import { CodeBlock } from "./code-block";
import { Foundations, FOUNDATIONS } from "./foundations";
import { useTheming } from "../theming-context";

const ALL = GROUPS.flatMap((g) => g.items);

export function Atelier() {
  const [key, setKey] = React.useState(FOUNDATIONS[0]?.key ?? ALL[0]?.key ?? "");
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

  const isFoundation = key.startsWith("f-");
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

  const navBtn = (k: string, name: string, active: boolean) => (
    <button
      key={k}
      onClick={() => setKey(k)}
      className={"rounded-sm px-md py-1.5 text-left text-sm " + (active ? "bg-surface font-semibold text-primary" : "text-text-secondary")}
    >
      {name}
    </button>
  );

  const list = (
    <div className="flex flex-col gap-lg">
      <div>
        <p className="mb-2 font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Fondations</p>
        <div className="flex flex-col gap-1">
          {FOUNDATIONS.map((f) => navBtn(f.key, f.title, f.key === key))}
        </div>
      </div>
      {GROUPS.map((g) => (
        <div key={g.label}>
          <p className="mb-2 font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">{g.label}</p>
          <div className="flex flex-col gap-1">
            {g.items.map((it) => navBtn(it.key, it.name, !isFoundation && it.key === entry.key))}
          </div>
        </div>
      ))}
    </div>
  );

  const iconBtn = "rounded-sm p-1 text-text-secondary transition-colors hover:text-text-primary";
  const changed = !!entry.initial && JSON.stringify(s) !== JSON.stringify(entry.initial);
  const tools =
    !isFoundation && entry.controls && entry.controls.length ? (
      <div>
        <div className="mb-md flex items-center justify-between">
          <span className="font-label text-sm font-semibold text-text-primary">Playground</span>
          <div className="flex items-center gap-1.5">
            {changed ? (
              <button type="button" onClick={reset} title="Réinitialiser" aria-label="Réinitialiser" className={iconBtn}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
              </button>
            ) : null}
            <button type="button" onClick={shuffle} title="Aléatoire" aria-label="Aléatoire" className={iconBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" /><path d="m18 2 4 4-4 4" /><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" /><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" /><path d="m18 14 4 4-4 4" /></svg>
            </button>
          </div>
        </div>
        {entry.controls[0]?.sec ? null : (
          <p className="mb-2 font-label text-[11px] font-semibold uppercase tracking-wider text-text-muted">{entry.name}</p>
        )}
        <Controls controls={entry.controls} state={s} set={set} />
      </div>
    ) : null;

  const main = isFoundation ? (
    <Foundations which={key} />
  ) : (
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

      {entry.blocks ? (
        entry.blocks.map((b, i) => (
          <div key={i} className={i > 0 ? "mt-xl" : undefined}>
            <p className="blk-title">{b.title}</p>
            <ResizablePreview>
              <div className={"contents" + (reduced ? " atelier-reduced" : "")}>{b.render(s, set)}</div>
            </ResizablePreview>
            <CodeBlock code={b.code(s, framework)} framework={framework} />
          </div>
        ))
      ) : (
        <>
          <ResizablePreview>
            <div ref={previewRef} key={`${entry.key}-${replayKey}`} className={"contents" + (reduced ? " atelier-reduced" : "")}>
              {entry.render(s, set)}
            </div>
          </ResizablePreview>
          <CodeBlock code={entry.code(s, framework)} framework={framework} />
        </>
      )}
    </div>
  );

  return (
    <>
      {main}
      {navSlot ? createPortal(list, navSlot) : null}
      {toolsSlot && tools ? createPortal(tools, toolsSlot) : null}
    </>
  );
}
