import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Select — choix unique parmi des options prédéfinies (DS-MD RULES-select). Motif ARIA APG
 * « select-only combobox » : un déclencheur (role="combobox") ouvre une listbox en popover
 * NON-MODAL (fondation overlay, lot C) — ancrée, sans voile, sans piège, light-dismiss.
 *
 * Le focus reste sur le déclencheur ; l'option active est suivie par `aria-activedescendant`.
 * Clavier : fermé ↓↑/Entrée/Espace ouvrent, une frappe présélectionne (type-ahead) ; ouvert ↑↓
 * déplacent, Début/Fin aux extrêmes, Entrée/Espace valident, Échap ferme, Tab valide l'actif.
 *
 * Contrôlé : `value` + `onValueChange`. Nom accessible requis (`aria-label`/`aria-labelledby`).
 * Mono-sélection (multi/recherche différés). Requis et validation = affaire du formulaire.
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const triggerVariants = cva(
  [
    "inline-flex w-full items-center justify-between gap-sm rounded-md border border-border-strong",
    "bg-background text-text-primary transition-colors duration-fast ease-out",
    "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: { size: { sm: "h-8 px-sm text-sm min-w-40", md: "h-10 px-md min-w-48" } },
    defaultVariants: { size: "md" },
  },
);

const Chevron = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0 text-text-secondary">
    <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 shrink-0 text-primary">
    <path d="M5 10l3.5 3.5L15 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface SelectProps extends VariantProps<typeof triggerVariants> {
  options: SelectOption[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "Sélectionner…",
  disabled,
  size = "md",
  className,
  ...aria
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listId = React.useId();
  const typed = React.useRef({ str: "", t: 0 });

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;
  const firstEnabled = () => {
    const i = options.findIndex((o) => !o.disabled);
    return i < 0 ? 0 : i;
  };

  const openList = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : firstEnabled());
    setOpen(true);
  };
  const close = (focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };
  const commit = (idx: number) => {
    const opt = options[idx];
    if (opt && !opt.disabled) onValueChange(opt.value);
    close();
  };
  const move = (dir: 1 | -1) => {
    setActive((prev) => {
      let i = prev;
      for (let n = 0; n < options.length; n++) {
        i = (i + dir + options.length) % options.length;
        if (!options[i].disabled) return i;
      }
      return prev;
    });
  };
  const typeahead = (ch: string) => {
    const now = Date.now();
    typed.current.str = now - typed.current.t > 700 ? ch : typed.current.str + ch;
    typed.current.t = now;
    const q = typed.current.str.toLowerCase();
    const i = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(q));
    if (i >= 0) {
      if (open) setActive(i);
      else onValueChange(options[i].value);
    }
  };

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    const k = e.key;
    if (!open) {
      if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") {
        e.preventDefault();
        openList();
        return;
      }
    } else {
      if (k === "ArrowDown") return e.preventDefault(), move(1);
      if (k === "ArrowUp") return e.preventDefault(), move(-1);
      if (k === "Home") return e.preventDefault(), setActive(firstEnabled());
      if (k === "End") {
        e.preventDefault();
        for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) { setActive(i); break; }
        return;
      }
      if (k === "Enter" || k === " ") return e.preventDefault(), commit(active);
      if (k === "Escape") return e.preventDefault(), close();
      if (k === "Tab") return commit(active);
    }
    if (k.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      typeahead(k);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-opt-${active}` : undefined}
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
        className={triggerVariants({ size })}
        {...aria}
      >
        <span className={cn("truncate", !selected && "text-text-muted")}>
          {selected ? selected.label : placeholder}
        </span>
        <Chevron />
      </button>

      {open && (
        <ul
          role="listbox"
          id={listId}
          tabIndex={-1}
          className="absolute left-0 top-full z-popover mt-1 max-h-64 w-full min-w-full overflow-auto rounded-md border border-border bg-background py-1 shadow-overlay outline-none"
        >
          {options.map((o, i) => {
            const isSel = o.value === value;
            return (
              <li
                key={o.value}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={isSel}
                aria-disabled={o.disabled || undefined}
                onMouseEnter={() => !o.disabled && setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => !o.disabled && commit(i)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-sm px-md py-2 text-text-primary",
                  i === active && "bg-surface-hover",
                  o.disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <span className="truncate">{o.label}</span>
                {isSel && <Check />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
Select.displayName = "Select";

export { triggerVariants as selectTriggerVariants };
