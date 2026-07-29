"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @sibyl/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { verrouilleDefilement } from "../../lib/scroll-lock";
import "./drawer.css";

/**
 * Drawer — superposé MODAL ancré à un bord (off-canvas). Premier consommateur de la fondation
 * DS-MD `overlay` (RULES-overlay) : voile `scrim`, focus piégé, défilement du fond verrouillé,
 * Échap ferme, retour du focus au déclencheur. C'est le mécanisme qui rend invocables les rails
 * de l'AppShell sous `breakpoint.tablet` (nav) et `breakpoint.desktop` (outils).
 *
 * Contrôlé : `open` + `onClose`. `side` = start (gauche, défaut) | end (droite) | bottom (bas,
 * feuille). Un nom accessible est requis (`aria-label` ou `aria-labelledby`) — role="dialog"
 * aria-modal.
 *
 * EFFET sur le fond (`effect`) — nécessite un `<Drawer.Frame>` autour du contenu de la page :
 *  - `overlay` (défaut) : le tiroir glisse au-dessus, le fond ne bouge pas ;
 *  - `push` : le contenu se décale de la largeur du tiroir (start/end uniquement — un push
 *    vertical n'a pas de largeur de référence, bottom retombe sur overlay) ;
 *  - `depth` : « Depth Transition » façon iOS — le contenu recule dans une frame arrondie sur
 *    fond noir. Sans Frame, tout `effect` retombe sur overlay (aucune erreur).
 * Dans un Frame, le tiroir est PORTÉ DANS le Frame (positionnement absolu, contenu dans son
 * cadre) ; sans Frame il est porté vers document.body (fixe, plein viewport).
 *
 * Limite assumée (v1) : le fond n'est pas mis `inert` (il faudrait une référence à la racine
 * applicative) ; l'inertie est approchée par le scrim + le piège de focus + aria-modal. À durcir
 * quand la racine sera exposée. Cf. OVERLAY-UX « focus et clavier ».
 */

export type DrawerSide = "start" | "end" | "bottom";
export type DrawerEffect = "overlay" | "push" | "depth";

const panelVariants = cva(
  [
    "z-overlay bg-surface shadow-overlay",
    "overflow-y-auto outline-none flex flex-col",
    "transition-transform duration-slow ease-out motion-reduce:transition-none",
  ].join(" "),
  {
    variants: {
      side: {
        start: "inset-y-0 left-0 w-rail-nav max-w-[85%] border-r border-border",
        end: "inset-y-0 right-0 w-rail-nav max-w-[85%] border-l border-border",
        bottom: "inset-x-0 bottom-0 max-h-[85%] w-full rounded-t-lg border-t border-border",
      },
    },
    defaultVariants: { side: "start" },
  },
);

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/* ── Frame : le cadre qui héberge la page et subit push/depth ─────────────────────────────── */
type FrameState = { side: DrawerSide; effect: DrawerEffect };
type FrameCtxValue = {
  node: HTMLDivElement | null;
  set: (state: FrameState | null) => void;
};
const FrameCtx = React.createContext<FrameCtxValue | null>(null);

export interface DrawerFrameProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerFrame({ className, children, ...props }: DrawerFrameProps) {
  const [node, setNode] = React.useState<HTMLDivElement | null>(null);
  const [state, setState] = React.useState<FrameState | null>(null);
  const value = React.useMemo(() => ({ node, set: setState }), [node]);
  return (
    <div
      ref={setNode}
      data-open={state ? "true" : "false"}
      data-side={state?.side}
      data-effect={state?.effect}
      className={cn("ds-drawer-frame", className)}
      {...props}
    >
      <div className="ds-drawer-frame__content">
        <FrameCtx.Provider value={value}>{children}</FrameCtx.Provider>
      </div>
    </div>
  );
}
DrawerFrame.displayName = "Drawer.Frame";

/* ── Tiroir ───────────────────────────────────────────────────────────────────────────────── */
export interface DrawerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  open: boolean;
  onClose: () => void;
  /** Effet sur le fond — actif seulement dans un <Drawer.Frame> (cf. docstring). */
  effect?: DrawerEffect;
}

export function DrawerRoot({
  open,
  onClose,
  side = "start",
  effect = "overlay",
  className,
  children,
  ...props
}: DrawerProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);
  const frame = React.useContext(FrameCtx);
  const inFrame = !!frame?.node;
  // push vertical impossible (pas de largeur de référence) → overlay.
  const effectiveEffect: DrawerEffect = side === "bottom" && effect === "push" ? "overlay" : effect;

  React.useEffect(() => {
    if (!open) return;
    // 1. mémoriser le déclencheur pour lui rendre le focus à la fermeture
    restoreRef.current = document.activeElement as HTMLElement | null;
    // 2. verrouiller le défilement du fond — hors Frame seulement (le Frame contient déjà
    //    son contenu ; verrouiller le body punirait la page qui héberge le cadre)
    const deverrouille = inFrame ? () => {} : verrouilleDefilement(restoreRef.current);
    // 3. faire entrer le focus dans le panneau
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus({ preventScroll: true });
    // 4. jouer la transition d'entrée
    const raf = requestAnimationFrame(() => setShown(true));

    return () => {
      cancelAnimationFrame(raf);
      deverrouille();
      setShown(false);
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, inFrame]);

  // Signaler l'état au Frame (push/depth sur le contenu derrière).
  const setFrame = frame?.set;
  React.useEffect(() => {
    if (!setFrame) return;
    if (open) setFrame({ side: side ?? "start", effect: effectiveEffect });
    return () => setFrame(null);
  }, [open, side, effectiveEffect, setFrame]);

  if (!open || typeof document === "undefined") return null;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    // piège de focus : Tab boucle dans le panneau
    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const firstEl = items[0];
    const lastEl = items[items.length - 1];
    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  const closedTransform =
    side === "end" ? "translate-x-full" : side === "bottom" ? "translate-y-full" : "-translate-x-full";
  const openTransform = side === "bottom" ? "translate-y-0" : "translate-x-0";
  // Dans un Frame : positionnement absolu (contenu dans le cadre) ; sinon fixe (viewport).
  const positionClass = inFrame ? "absolute" : "fixed";

  return createPortal(
    <>
      {/* Scrim — même couche que la surface, rendu AVANT (donc derrière) ; clic = fermeture */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          positionClass,
          "inset-0 z-overlay bg-scrim transition-opacity duration-slow ease-out motion-reduce:transition-none",
          shown ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={cn(
          positionClass,
          panelVariants({ side }),
          shown ? openTransform : closedTransform,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </>,
    frame?.node ?? document.body,
  );
}
DrawerRoot.displayName = "Drawer";

export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Frame: DrawerFrame,
});

export { panelVariants as drawerPanelVariants };
