"use client";
import * as React from "react";

/** Aperçu redimensionnable : glisser la poignée de droite pour tester le responsive
 *  / les container queries ; double-clic pour réinitialiser. */
export function ResizablePreview({ children }: { children: React.ReactNode }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [w, setW] = React.useState<number | null>(null);

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const left = rect.left;
    const max = rect.width;
    const move = (ev: PointerEvent) => {
      setW(Math.max(240, Math.min(max, ev.clientX - left)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div ref={wrapRef} className="relative">
      <div
        style={{ width: w ? `${w}px` : "100%", maxWidth: "100%", position: "relative" }}
        className="grid min-h-[180px] place-items-center rounded-lg border border-border bg-background p-xl shadow-[var(--elevation-raised)]"
      >
        {children}
        {w ? (
          <span className="absolute right-3 top-2 rounded-sm bg-surface px-2 py-0.5 font-mono text-xs text-text-secondary">
            {Math.round(w)}px
          </span>
        ) : null}
        <div
          onPointerDown={onDown}
          onDoubleClick={() => setW(null)}
          title="Glisser pour redimensionner · double-clic pour réinitialiser"
          className="absolute right-0 top-0 flex h-full w-4 translate-x-1/2 cursor-ew-resize touch-none items-center justify-center"
        >
          <span className="h-10 w-1 rounded-full bg-border-strong" />
        </div>
      </div>
    </div>
  );
}
