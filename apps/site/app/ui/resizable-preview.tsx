"use client";
import * as React from "react";

/** Fond damier thème-aware (tuiles var(--surface) sur var(--background)). */
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

const IconExpand = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
);
const IconClose = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

/** Aperçu redimensionnable : glisser la poignée droite pour changer la largeur,
 *  double-clic pour réinitialiser. `fill` = composant pleine surface (shell) : pas de
 *  centrage/padding, hauteur remplie. Bouton plein écran pour tester aux vraies largeurs. */
export function ResizablePreview({ children, fill = false }: { children: React.ReactNode; fill?: boolean }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [w, setW] = React.useState<number | null>(null);
  const [drag, setDrag] = React.useState(false);
  const [full, setFull] = React.useState(false);

  React.useEffect(() => {
    if (!full) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [full]);

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    setDrag(true);
    const move = (ev: PointerEvent) => setW(Math.max(240, Math.min(rect.width, ev.clientX - rect.left)));
    const up = () => {
      setDrag(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const innerCls = fill
    ? "[container-name:atelier-preview] [container-type:inline-size] " + (full ? "h-full" : "h-[520px]")
    : "flex min-h-[220px] items-center justify-center p-xl [container-name:atelier-preview] [container-type:inline-size]";

  const frame = (
    <div ref={wrapRef} className={"relative w-full" + (full ? " min-h-0 flex-1" : "")}>
      <div
        style={{ width: w ? `${w}px` : "100%", maxWidth: "100%", ...CHECKER }}
        className={"relative overflow-hidden rounded-xl border border-border" + (full ? " h-full" : "")}
      >
        <div className={innerCls}>{children}</div>
        {w ? (
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-text-secondary">
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
        <span className={"w-1.5 rounded-full transition-all " + (drag ? "h-11 bg-primary" : "h-8 bg-border-strong group-hover:h-11 group-hover:bg-primary")} />
      </div>
    </div>
  );

  if (full) {
    return (
      <div className="fixed inset-0 z-[80] flex flex-col gap-2 bg-background p-3">
        <div className="flex shrink-0 items-center justify-between">
          <span className="font-mono text-xs text-text-secondary">Aperçu plein écran{w ? ` · ${Math.round(w)}px` : ""} — glisser la poignée pour la largeur</span>
          <button
            type="button"
            onClick={() => setFull(false)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-text-primary hover:border-primary"
          >
            {IconClose} Fermer
          </button>
        </div>
        {frame}
      </div>
    );
  }

  return (
    <div className="group/preview relative">
      <button
        type="button"
        onClick={() => setFull(true)}
        title="Plein écran"
        aria-label="Aperçu plein écran"
        className="absolute right-2 top-2 z-40 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-text-secondary opacity-0 transition-opacity hover:text-text-primary group-hover/preview:opacity-100"
      >
        {IconExpand}
      </button>
      {frame}
    </div>
  );
}
