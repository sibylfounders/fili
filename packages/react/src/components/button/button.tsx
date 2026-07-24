import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import "./relief.css";

/**
 * Button — construit sur les RÈGLES de Design System MD (autorité UX),
 * habillé par les tokens @ds-ui/tokens.
 *
 * MODÈLE (évolution 0.3.0, alignée sur le modèle orthogonal de la référence) :
 * deux axes vraiment indépendants + la taille —
 *   - `style`  = le REMPLISSAGE : filled / stroke / lighter / ghost
 *   - `tone`   = la COULEUR sémantique : primary / neutral / destructive
 *   - `size`   = la densité : sm / md / lg
 * Remplace l'ancien `variant` (qui mélangeait poids et remplissage). « primary »
 * passe d'emphasis à tone (le bleu de marque) ; « neutral » devient un tone plein
 * (bouton haute-contraste, s'inverse en sombre). PAS de tone `warning` : l'autorité
 * réserve `warning` au message (texte/bordure), jamais à une action — il vit dans
 * Alert / Badge, pas dans Button (sinon le stroke se confond avec une alerte).
 *
 * ⚠︎ `style` masque l'attribut DOM `style` sur Button.Root (il est consommé comme
 * variante) : passer par `className` pour tout style ad hoc.
 *
 * Focus ring : ACCORDÉ AU TON (la couleur de l'objet) — primary→primary, neutral→text-primary,
 * destructive→danger. Chaque anneau tient ≥ 3:1 sur le fond de page (offset
 * blanc de 2px). Modes clair/sombre gratuits (les tokens s'inversent).
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full items-center justify-center text-center select-none",
    "font-medium leading-tight [overflow-wrap:anywhere] transition-colors",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // DS-MD : disabled jamais silencieux — exposer la cause en usage (tooltip/inline).
    // cursor-not-allowed (comme Input) : PAS de pointer-events-none, qui masquerait le curseur.
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      style: {
        filled: "",
        stroke: "border",
        lighter: "",
        ghost: "",
      },
      // Anneau de focus accordé au ton — couleur de l'objet (DS-MD BUTTON-UI 1.5.1).
      tone: {
        primary: "focus-visible:ring-primary",
        neutral: "focus-visible:ring-text-primary",
        destructive: "focus-visible:ring-danger",
      },
      size: {
        sm: "min-h-8 gap-1.5 rounded-md px-sm py-xs text-sm",
        md: "min-h-10 gap-2 rounded-md px-md py-xs text-base",
        lg: "min-h-12 gap-2 rounded-md px-lg py-sm text-base",
      },
    },
    compoundVariants: [
      // ── FILLED — fond plein + texte "on"
      { style: "filled", tone: "primary", class: "bg-primary text-on-primary hover:bg-primary-hover" },
      { style: "filled", tone: "neutral", class: "bg-surface-inverse text-text-inverse hover:opacity-90" },
      { style: "filled", tone: "destructive", class: "bg-danger text-on-danger hover:bg-danger-hover" },
      // ── STROKE — contour délimitant (bordure = tone) + texte tone
      { style: "stroke", tone: "primary", class: "border-primary text-primary hover:bg-secondary hover:text-on-secondary" },
      { style: "stroke", tone: "neutral", class: "border-border-strong text-text-primary hover:bg-surface" },
      { style: "stroke", tone: "destructive", class: "border-danger text-danger hover:bg-danger-subtle" },
      // ── LIGHTER — lavis (fond doux) + texte tone
      { style: "lighter", tone: "primary", class: "bg-secondary text-on-secondary hover:bg-secondary-hover" },
      { style: "lighter", tone: "neutral", class: "bg-surface text-text-primary hover:bg-surface-hover" },
      { style: "lighter", tone: "destructive", class: "bg-danger-subtle text-danger hover:bg-danger-subtle-hover hover:text-danger-hover" },
      // ── GHOST — sans fond, remplissage léger au survol
      { style: "ghost", tone: "primary", class: "text-primary hover:bg-secondary hover:text-on-secondary" },
      { style: "ghost", tone: "neutral", class: "text-text-secondary hover:bg-surface" },
      { style: "ghost", tone: "destructive", class: "text-danger hover:bg-danger-subtle" },
    ],
    defaultVariants: { style: "filled", tone: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style">,
    VariantProps<typeof buttonVariants> {
  /** Rend l'élément enfant à la place du <button> (Radix Slot). */
  asChild?: boolean;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, style, tone, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        data-style={style ?? "filled"}
        data-tone={tone ?? "primary"}
        className={cn(buttonVariants({ style, tone, size }), className)}
        {...props}
      />
    );
  },
);
ButtonRoot.displayName = "Button.Root";

/** Slot icône — hérite la couleur (currentColor), taille alignée sur le corps. */
const ButtonIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-hidden="true" className={cn("inline-flex shrink-0 [&>svg]:size-5", className)} {...props} />
  ),
);
ButtonIcon.displayName = "Button.Icon";

/** API compound : <Button.Root><Button.Icon/>…</Button.Root> */
export const Button = Object.assign(ButtonRoot, { Root: ButtonRoot, Icon: ButtonIcon });
export { ButtonRoot, ButtonIcon, buttonVariants };
