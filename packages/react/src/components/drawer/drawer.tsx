import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { verrouilleDefilement } from "../../lib/scroll-lock";

/**
 * Drawer — superposé MODAL ancré à un bord (off-canvas). Premier consommateur de la fondation
 * DS-MD `overlay` (RULES-overlay) : voile `scrim`, focus piégé, défilement du fond verrouillé,
 * Échap ferme, retour du focus au déclencheur. C'est le mécanisme qui rend invocables les rails
 * de l'AppShell sous `breakpoint.tablet` (nav) et `breakpoint.desktop` (outils).
 *
 * Contrôlé : `open` + `onClose`. `side` = start (gauche, défaut) | end (droite). Un nom accessible
 * est requis (`aria-label` ou `aria-labelledby`) — c'est un role="dialog" aria-modal.
 *
 * Limite assumée (v1) : le fond n'est pas mis `inert` (il faudrait une référence à la racine
 * applicative) ; l'inertie est approchée par le scrim + le piège de focus + aria-modal. À durcir
 * quand la racine sera exposée. Cf. OVERLAY-UX « focus et clavier ».
 */
const panelVariants = cva(
  [
    "fixed top-0 z-overlay h-screen w-rail-nav max-w-[85vw] bg-surface shadow-overlay",
    "overflow-y-auto outline-none flex flex-col",
    "transition-transform duration-slow ease-out motion-reduce:transition-none",
  ].join(" "),
  {
    variants: {
      side: {
        start: "left-0 border-r border-border",
        end: "right-0 border-l border-border",
      },
    },
    defaultVariants: { side: "start" },
  },
);

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export interface DrawerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  open: boolean;
  onClose: () => void;
}

export function Drawer({ open, onClose, side = "start", className, children, ...props }: DrawerProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    // 1. mémoriser le déclencheur pour lui rendre le focus à la fermeture
    restoreRef.current = document.activeElement as HTMLElement | null;
    // 2. verrouiller le défilement du fond (body ET région défilante du shell)
    const deverrouille = verrouilleDefilement(restoreRef.current);
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
  }, [open]);

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

  const closedTransform = side === "end" ? "translate-x-full" : "-translate-x-full";

  return createPortal(
    <>
      {/* Scrim — même couche que la surface, rendu AVANT (donc derrière) ; clic = fermeture */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-overlay bg-scrim transition-opacity duration-slow ease-out motion-reduce:transition-none",
          shown ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={cn(panelVariants({ side }), shown ? "translate-x-0" : closedTransform, className)}
        {...props}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
Drawer.displayName = "Drawer";

export { panelVariants as drawerPanelVariants };
