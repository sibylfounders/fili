"use client";
import * as React from "react";

/** Segmented control en pilule avec pouce glissant sous l'onglet actif (style fluide,
 *  repris de l'ancien atelier : .pgtabs / .pgtab-thumb). */
export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [thumb, setThumb] = React.useState<{ left: number; width: number }>({ left: 0, width: 0 });

  React.useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, tabs.length]);

  return (
    <div role="tablist" className="relative inline-flex gap-0.5 rounded-full border border-border bg-background p-[3px]">
      <span
        aria-hidden
        className="absolute top-[3px] rounded-full border border-border bg-surface transition-all duration-150 ease-out"
        style={{ left: thumb.left, width: thumb.width, height: "calc(100% - 6px)" }}
      />
      {tabs.map((t) => (
        <button
          key={t.value}
          ref={(el) => {
            refs.current[t.value] = el;
          }}
          role="tab"
          aria-selected={t.value === value}
          onClick={() => onChange(t.value)}
          className={
            "relative z-10 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors " +
            (t.value === value ? "text-text-primary" : "text-text-secondary hover:text-text-primary")
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
