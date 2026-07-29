"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @fili/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/cn";
import "../../lib/no-scrollbar.css";

/**
 * Dropdown — menu d'ACTIONS ancré à un déclencheur (intention « Agir », jamais un choix de
 * valeur : ça, c'est Select). Motif ARIA APG « Menu Button » : le déclencheur porte
 * aria-haspopup="menu" + aria-expanded, le menu est un popover NON-MODAL (fondation overlay :
 * ancré, sans voile, light-dismiss, `z-index.popover`), le focus VIT dans les items
 * (roving), Échap ferme et rend le focus au déclencheur.
 *
 * Inspiration assumée (fluidfunctionalism.com/docs/dropdown, relevé 2026-07-29), transposée
 * dans le langage fluide du système : le surlignage de survol/focus est UN SEUL fond animé
 * qui GLISSE d'un item à l'autre (translateY + height, motion.fast) au lieu d'apparaître et
 * disparaître item par item — même famille de mouvement que le pouce du ThemeToggle.
 * `prefers-reduced-motion` : le fond saute sans glisser, le signal reste.
 *
 * Compound : Dropdown.Root (open contrôlé ou non) / .Trigger (asChild possible) / .Content
 * (side top|bottom × align start|center|end + sideOffset) / .Item (icon, checked radio-style,
 * closeOnClick) / .Label / .Separator. Débordement : mêmes voiles dégradés + chevrons que la
 * listbox du Select, barre de scroll masquée (le voile est le signal).
 */

type DropdownCtx = {
  open: boolean;
  setOpen: (open: boolean, focusTrigger?: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  menuId: string;
  triggerId: string;
};
const Ctx = React.createContext<DropdownCtx | null>(null);
const useDropdown = (): DropdownCtx => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Dropdown.* doit vivre dans <Dropdown.Root>");
  return c;
};

/* ── Root ─────────────────────────────────────────────────────────────────── */
export interface DropdownRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function DropdownRoot({ open: controlled, defaultOpen = false, onOpenChange, className, children }: DropdownRootProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const open = controlled ?? uncontrolled;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const rid = React.useId();

  const setOpen = React.useCallback(
    (next: boolean, focusTrigger = false) => {
      if (controlled === undefined) setUncontrolled(next);
      onOpenChange?.(next);
      if (!next && focusTrigger) triggerRef.current?.focus();
    },
    [controlled, onOpenChange],
  );

  // light-dismiss : un clic hors de l'ancre ferme, sans voler le focus
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, setOpen]);

  const value = React.useMemo(
    () => ({ open, setOpen, triggerRef, menuId: `${rid}-menu`, triggerId: `${rid}-trigger` }),
    [open, setOpen, rid],
  );
  return (
    <Ctx.Provider value={value}>
      <div ref={rootRef} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </Ctx.Provider>
  );
}
DropdownRoot.displayName = "Dropdown.Root";

/* ── Trigger ──────────────────────────────────────────────────────────────── */
export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Rend l'élément enfant à la place du <button> (Radix Slot) — tout composant peut déclencher. */
  asChild?: boolean;
}

function DropdownTrigger({ asChild = false, onClick, onKeyDown, ...props }: DropdownTriggerProps) {
  const { open, setOpen, triggerRef, menuId, triggerId } = useDropdown();
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={triggerRef}
      id={triggerId}
      type={asChild ? undefined : "button"}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? menuId : undefined}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpen(!open);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setOpen(true);
        }
      }}
      {...props}
    />
  );
}
DropdownTrigger.displayName = "Dropdown.Trigger";

/* ── Content : le menu ancré ──────────────────────────────────────────────── */
export type DropdownSide = "top" | "bottom";
export type DropdownAlign = "start" | "center" | "end";

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: DropdownSide;
  align?: DropdownAlign;
  /** Écart déclencheur ↔ menu, en px (défaut 4). */
  sideOffset?: number;
}

const FOCUSABLE_ITEM = '[role^="menuitem"]:not([data-disabled])';

type Highlight = { top: number; height: number } | null;
const HighlightCtx = React.createContext<{ report: (el: HTMLElement) => void; clear: () => void } | null>(null);

function DropdownContent({ side = "bottom", align = "start", sideOffset = 4, className, children, ...props }: DropdownContentProps) {
  const { open, setOpen, triggerRef, menuId, triggerId } = useDropdown();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);
  const [hl, setHl] = React.useState<Highlight>(null);
  const [overflow, setOverflow] = React.useState({ top: false, bottom: false });

  const updateOverflow = React.useCallback(() => {
    const el = menuRef.current;
    if (!el) return;
    setOverflow({
      top: el.scrollTop > 2,
      bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 2,
    });
  }, []);

  // à l'ouverture : transition d'entrée + focus sur le premier item (le focus vit dans le menu)
  React.useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      setShown(true);
      updateOverflow();
      menuRef.current?.querySelector<HTMLElement>(FOCUSABLE_ITEM)?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      setShown(false);
      setHl(null);
    };
  }, [open, updateOverflow]);

  const report = React.useCallback((el: HTMLElement) => {
    setHl({ top: el.offsetTop, height: el.offsetHeight });
  }, []);
  const clear = React.useCallback(() => {
    // le fond suit le focus s'il est encore dans le menu, sinon il s'éteint
    const focused = menuRef.current?.querySelector<HTMLElement>('[role^="menuitem"]:focus');
    if (focused) setHl({ top: focused.offsetTop, height: focused.offsetHeight });
    else setHl(null);
  }, []);
  const highlightValue = React.useMemo(() => ({ report, clear }), [report, clear]);

  if (!open) return null;

  const items = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ITEM) ?? []);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list[(i + 1) % list.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      list[(i - 1 + list.length) % list.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      list[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      list[list.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false, true);
    } else if (e.key === "Tab") {
      setOpen(false); // Tab sort du menu — il se referme sans piéger
    }
  };

  return (
    <div
      className={cn(
        "absolute z-popover w-max min-w-full max-w-[18rem] overflow-hidden rounded-md border border-border bg-background shadow-overlay",
        "transition-[opacity,transform] duration-fast ease-out motion-reduce:transition-none",
        side === "bottom" ? "top-full" : "bottom-full",
        align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2",
        shown ? "opacity-100" : cn("opacity-0", side === "bottom" ? "translate-y-1" : "-translate-y-1"),
        className,
      )}
      style={{ [side === "bottom" ? "marginTop" : "marginBottom"]: sideOffset }}
      {...props}
    >
      {/* voiles de débordement — mêmes signaux que la listbox du Select */}
      {overflow.top ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex h-7 items-start justify-center bg-gradient-to-b from-background to-transparent pt-0.5">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 text-text-muted"><path d="M6 12l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      ) : null}
      {overflow.bottom ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex h-7 items-end justify-center bg-gradient-to-t from-background to-transparent pb-0.5">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 text-text-muted"><path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      ) : null}
      <div
        ref={menuRef}
        role="menu"
        id={menuId}
        aria-labelledby={triggerId}
        onKeyDown={onKeyDown}
        onScroll={updateOverflow}
        onMouseLeave={clear}
        className="ds-no-scrollbar relative max-h-72 w-full overflow-auto p-1 outline-none"
      >
        {/* LE fond de survol/focus — un seul, il GLISSE entre les items (langage fluide) */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-1 top-0 z-0 rounded-sm bg-surface-hover",
            "transition-[transform,height,opacity] duration-fast ease-out motion-reduce:transition-none",
            hl ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `translateY(${hl?.top ?? 0}px)`, height: hl?.height ?? 0 }}
        />
        <HighlightCtx.Provider value={highlightValue}>{children}</HighlightCtx.Provider>
      </div>
    </div>
  );
}
DropdownContent.displayName = "Dropdown.Content";

/* ── Item ─────────────────────────────────────────────────────────────────── */
const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-auto size-4 shrink-0 text-primary">
    <path d="M5 10l3.5 3.5L15 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface DropdownItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  /** Icône décorative à gauche (currentColor, 16px). */
  icon?: React.ReactNode;
  /** Action de l'item. */
  onSelect?: () => void;
  /** Radio-style : coche à droite + aria-checked (menuitemradio). Laisser undefined pour une action simple. */
  checked?: boolean;
  /** La sélection referme le menu (défaut : true). */
  closeOnClick?: boolean;
}

function DropdownItem({ icon, checked, onSelect, closeOnClick = true, disabled, className, children, ...props }: DropdownItemProps) {
  const { setOpen } = useDropdown();
  const hl = React.useContext(HighlightCtx);
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      role={checked !== undefined ? "menuitemradio" : "menuitem"}
      aria-checked={checked}
      data-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={-1}
      onMouseEnter={() => {
        if (disabled || !ref.current) return;
        ref.current.focus(); // le focus suit la souris : un seul item actif, le fond glisse
      }}
      onFocus={() => {
        if (ref.current) hl?.report(ref.current);
      }}
      onClick={() => {
        if (disabled) return;
        onSelect?.();
        if (closeOnClick) setOpen(false, true);
      }}
      className={cn(
        // pas de bg de survol propre : LE fond glissant du Content s'en charge
        "relative z-[1] flex w-full items-center gap-sm rounded-sm px-sm py-1.5 text-left text-sm text-text-primary",
        "outline-none disabled:cursor-not-allowed disabled:text-text-disabled",
        className,
      )}
      {...props}
    >
      {icon ? <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center text-text-secondary [&>svg]:size-4">{icon}</span> : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {checked ? <Check /> : null}
    </button>
  );
}
DropdownItem.displayName = "Dropdown.Item";

/* ── Label + Separator ────────────────────────────────────────────────────── */
function DropdownLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative z-[1] px-sm pb-1 pt-2 font-label text-[11px] font-semibold uppercase tracking-wider text-text-muted", className)}
      {...props}
    />
  );
}
DropdownLabel.displayName = "Dropdown.Label";

function DropdownSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" aria-orientation="horizontal" className={cn("relative z-[1] mx-1 my-1 h-px bg-border", className)} {...props} />;
}
DropdownSeparator.displayName = "Dropdown.Separator";

export const Dropdown = Object.assign(DropdownRoot, {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Label: DropdownLabel,
  Separator: DropdownSeparator,
});
