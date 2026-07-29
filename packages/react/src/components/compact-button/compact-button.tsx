"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @fili/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * CompactButton — bouton ICON-ONLY pour les espaces contraints (fermer, développer,
 * supprimer en ligne…). Version compacte de <Button> : mêmes axes orthogonaux
 * `style` (remplissage) × `tone` (couleur) que Button, en carré et sans label.
 *
 * - `size` : sm (20px) / md (24px) — cible tactile à étendre à 44px en usage (hit area).
 * - `fullRadius` : cercle (true) vs arrondi (false).
 * - Icône OBLIGATOIRE + `aria-label` obligatoire (WCAG — icône seule sans exception).
 *
 * ⚠︎ `style` masque l'attribut DOM `style` (consommé comme variante) — passer par `className`.
 */
const compactButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center select-none",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // cursor-not-allowed (comme Input/Button) : PAS de pointer-events-none, qui masquerait le curseur.
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      style: { filled: "", stroke: "border", lighter: "", ghost: "" },
      // Anneau de focus accordé au ton — même règle que Button (couleur de l'objet).
      tone: {
        primary: "focus-visible:ring-primary",
        neutral: "focus-visible:ring-text-primary",
        destructive: "focus-visible:ring-danger",
      },
      size: { sm: "size-5 [&_svg]:size-4", md: "size-6 [&_svg]:size-5" },
      fullRadius: { true: "rounded-full", false: "rounded-md" },
    },
    // Même mapping de tokens que Button (l'icône hérite de la couleur du texte).
    compoundVariants: [
      { style: "filled", tone: "primary", class: "bg-primary text-on-primary hover:bg-primary-hover" },
      { style: "filled", tone: "neutral", class: "bg-surface-inverse text-text-inverse hover:opacity-90" },
      { style: "filled", tone: "destructive", class: "bg-danger text-on-danger hover:bg-danger-hover" },
      { style: "stroke", tone: "primary", class: "border-primary text-primary hover:bg-primary-subtle hover:text-on-primary-subtle" },
      { style: "stroke", tone: "neutral", class: "border-border-strong text-text-primary hover:bg-surface" },
      { style: "stroke", tone: "destructive", class: "border-danger text-danger hover:bg-danger-subtle" },
      { style: "lighter", tone: "primary", class: "bg-primary-subtle text-on-primary-subtle hover:bg-primary-subtle-hover" },
      { style: "lighter", tone: "neutral", class: "bg-surface text-text-primary hover:bg-surface-hover" },
      { style: "lighter", tone: "destructive", class: "bg-danger-subtle text-danger hover:bg-danger-subtle-hover hover:text-danger-hover" },
      { style: "ghost", tone: "primary", class: "text-primary hover:bg-primary-subtle hover:text-on-primary-subtle" },
      { style: "ghost", tone: "neutral", class: "text-text-secondary hover:bg-surface" },
      { style: "ghost", tone: "destructive", class: "text-danger hover:bg-danger-subtle" },
    ],
    // Défauts lighter + neutral (arbitrage 2026-07-29) : l'usage majoritaire du CompactButton
    // est utilitaire (fermer, développer) — le filled primary criait plus fort que l'action.
    defaultVariants: { style: "lighter", tone: "neutral", size: "md", fullRadius: false },
  },
);

export interface CompactButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style">,
    VariantProps<typeof compactButtonVariants> {
  asChild?: boolean;
  /** Rend le bouton en squelette de chargement — mêmes dimensions, contenu masqué. */
  loading?: boolean;
  /** Obligatoire : le bouton n'a que l'icône (WCAG — icône seule sans exception). */
  "aria-label": string;
}

const CompactButtonRoot = React.forwardRef<HTMLButtonElement, CompactButtonProps>(
  ({ className, style, tone, size, fullRadius, asChild = false, loading = false, type, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        className={cn(compactButtonVariants({ style, tone, size, fullRadius }), loading && "ds-skeleton", className)}
        {...props}
      />
    );
  },
);
CompactButtonRoot.displayName = "CompactButton.Root";

/** Slot icône — currentColor, dimensionnée par la taille du bouton. */
const CompactButtonIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-hidden="true" className={cn("inline-flex", className)} {...props} />
  ),
);
CompactButtonIcon.displayName = "CompactButton.Icon";

export const CompactButton = Object.assign(CompactButtonRoot, {
  Root: CompactButtonRoot,
  Icon: CompactButtonIcon,
});
export { CompactButtonRoot, CompactButtonIcon, compactButtonVariants };
