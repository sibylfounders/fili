"use client";
import * as React from "react";
import { Select, Switch } from "@sibyl/react";
import type { Control } from "./registry";

export function Controls({
  controls,
  state,
  set,
}: {
  controls: Control[];
  state: Record<string, any>;
  set: (k: string, v: any) => void;
}) {
  return (
    <div className="flex flex-col gap-md">
      {controls.map((c) => {
        const label = c.label ?? c.k;
        if (c.type === "seg")
          return (
            <div key={c.k} className="flex items-center justify-between gap-md">
              <span className="text-sm text-text-secondary">{label}</span>
              <Select
                options={c.opts.map((o) => ({ value: o, label: o }))}
                value={state[c.k]}
                onValueChange={(v) => set(c.k, v)}
                aria-label={label}
              />
            </div>
          );
        if (c.type === "bool")
          return (
            <div key={c.k} className="flex items-center justify-between gap-md">
              <span className="text-sm text-text-secondary">{label}</span>
              <Switch checked={!!state[c.k]} onCheckedChange={(v) => set(c.k, v)} aria-label={label} />
            </div>
          );
        if (c.type === "text")
          return (
            <label key={c.k} className="flex flex-col gap-1">
              <span className="text-sm text-text-secondary">{label}</span>
              <input
                className="rounded-sm border border-border bg-background px-md py-1.5 text-sm text-text-primary"
                value={state[c.k] ?? ""}
                onChange={(e) => set(c.k, e.target.value)}
              />
            </label>
          );
        if (c.type === "range")
          return (
            <label key={c.k} className="flex flex-col gap-1">
              <span className="text-sm text-text-secondary">
                {label} <b className="text-text-primary">{state[c.k]}{c.unit ?? ""}</b>
              </span>
              <input type="range" min={c.min} max={c.max} step={c.step ?? 1} value={state[c.k]} onChange={(e) => set(c.k, Number(e.target.value))} />
            </label>
          );
        return null;
      })}
    </div>
  );
}
