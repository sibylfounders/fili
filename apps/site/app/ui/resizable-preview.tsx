"use client";
import * as React from "react";

/** Fond damier thème-aware (tuiles var(--surface) sur var(--background)) — repris
 *  des aperçus DS-MD, pour situer les bords/la transparence d'un composant. */
const CHECKER: React.CSSProperties = {
  backgroundColor: "var(--background)",
  backgroundImage:
    "linear-gradient(45deg, var(--surface) 25%, transparent 25%)," +
    "linear-gradient(-45deg, var(--surface) 25%, transparent 25%)," +
    "linear-gradient(45deg, transparent 75%, var(--surface) 75%)," +
    "linear-gradient(-45deg, transparent 75%, var(--surface) 75%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
};

/** Aperçu redimensionnable : glisser la poignée droite (elle grossit + passe en
 *  primary), double-clic pour réinitialiser. `container-type` sur le cadre → les
 *  container queries du composant réagissent à la largeur. */
export function ResizablePreview({ children }: { children: React.ReactNode }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [w, setW] = React.useState<number | null>(null);
  const [drag, setDrag] = React.useState(false);

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    setDrag(true);
    const move = (ev: PointerEvent) =>
      setW(Math.max(240, Math.min(rect.width, ev.clientX - rect.left)));
    const up = () => {
      setDrag(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <div
        style={{ width: w ? `${w}px` : "100%", maxWidth: "100%", ...CHECKER }}
        className="relative overflow-hidden rounded-xl border border-border"
      >
        <div className="flex min-h-[220px] items-center justify-center p-xl [container-type:inline-size]">
          {children}
        </div>
        {w ? (
          <span className="pointer-events-none absolute right-3 top-3 rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-text-secondary">
            {Math.round(w)}px
          </span>
        ) : null}
      </div>

      <div
        onPointerDown={onDown}
        onDoubleClick={() => setW(null)}
        title="Glisser pour redimensionner · double-clic pour réinitialiser"
        style={{ left: w ? `${w}px` : "100%", transform: "translateX(-50%)" }}
        className="group absolute top-0 flex h-full w-6 cursor-ew-resize touch-none items-center justify-center"
      >
        <span
          className={
            "w-1.5 rounded-full transition-all " +
            (drag ? "h-11 bg-primary" : "h-8 bg-border-strong group-hover:h-11 group-hover:bg-primary")
          }
        />
      </div>
    </div>
  );
}
