"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @sibyl/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Switch — bascule un état booléen à EFFET IMMÉDIAT (DS-MD RULES-switch). Distinct de la checkbox
 * (sélection validée à la soumission) : ici l'action prend effet tout de suite, sans « appliquer ».
 * role="switch" + aria-checked ; Espace/Entrée basculent (comportement natif du <button>).
 *
 * Contrôlé : `checked` + `onCheckedChange`. L'état se lit à la POSITION du pouce autant qu'à la
 * couleur (jamais la seule couleur). Un nom accessible est requis (`aria-label`/`aria-labelledby`,
 * ou un <label> lié) ; joindre au besoin un libellé d'état « Activé/Désactivé ».
 *
 * L'état asynchrone (bascule qui appelle le serveur) est hors périmètre v1 (extension différée).
 */
const trackVariants = cva(
  [
    "relative inline-flex shrink-0 items-center rounded-pill align-middle",
    "transition-colors duration-base ease-in-out motion-reduce:transition-none",
    "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
  ].join(" "),
  {
    variants: { size: { sm: "h-5 w-9", md: "h-6 w-11" } },
    defaultVariants: { size: "md" },
  },
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type">,
    VariantProps<typeof trackVariants> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, size = "md", className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        trackVariants({ size }),
        checked ? "bg-primary" : "bg-neutral-200",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block rounded-pill bg-background shadow-raised",
          "transition-transform duration-base ease-in-out motion-reduce:transition-none",
          size === "md" ? "size-5" : "size-4",
          checked ? (size === "md" ? "translate-x-5" : "translate-x-4") : "translate-x-0.5",
        )}
      />
    </button>
  ),
);
Switch.displayName = "Switch";

export { trackVariants as switchTrackVariants };
