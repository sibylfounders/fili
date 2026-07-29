"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @sibyl/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import "./input.css";

/**
 * Input — construit sur les RÈGLES de Design System MD (autorité UX),
 * habillé par les tokens @sibyl/tokens. API compound inspirée de la LOGIQUE
 * de référence : Root > Wrapper > (Icon · Input · InlineAffix) + Affix.
 *
 * Axes DS-MD, ORTHOGONAUX : tone × size × field_type (le type HTML natif).
 *   - Pas d'emphasis : « l'input principal de l'écran » n'existe pas — le type de
 *     champ (nature du contenu) remplace le poids visuel.
 *   - Réconciliation référence : la référence n'expose qu'un booléen `hasError`.
 *     DS-MD faisant autorité, on garde un axe `tone` complet
 *     (neutral / error / success / warning).
 *   - Bordure au repos = `border-strong` : le champ au repos est identifié par sa
 *     seule bordure → délimitante, 3:1 obligatoire à tous les états (WCAG 1.4.11).
 *     La référence pose une bordure décorative douce ; DS-MD impose le seuil.
 *
 * Focus ring (RULES-border) : `outline` instantané (JAMAIS de transition) + offset,
 * qui s'AJOUTE à la bordure d'état (error focalisé = ring dehors + bordure danger
 * dedans, les deux visibles). Couleur `primary` : précédent Button — DS-UI n'a
 * pas de token `accent` distinct, le ring reste unifié sur tous les focalisables.
 *
 * Modes clair/sombre : gratuits (classes → tokens `var()`).
 */

type InputSize = "sm" | "md" | "lg";
type InputTone = "neutral" | "error" | "success" | "warning";

const InputContext = React.createContext<{ size: InputSize; tone: InputTone }>({
  size: "md",
  tone: "neutral",
});

const rootVariants = cva(
  [
    "group relative flex w-full items-stretch overflow-hidden border bg-background text-text-primary",
    "divide-x divide-border transition-colors",
    // Focus : le ring apparaît instantanément (hors liste de transition) et s'ajoute à la bordure d'état.
    // Focus : anneau en CSS (input.css) — 2px, teinte plus claire que primary, adaptée au tone.
    // Disabled : la cause n'est jamais silencieuse (à exposer en usage via helper/aria).
    "has-[input:disabled]:border-border has-[input:disabled]:bg-surface",
  ].join(" "),
  {
    variants: {
      // Le rayon suit la taille (RULES-radius) ; md et lg partagent radius.md.
      size: { sm: "rounded-sm", md: "rounded-md", lg: "rounded-md" },
      // Bordure : neutre délimitante (3:1) ; error/success/warning = bordure sémantique d'état.
      tone: {
        neutral: "border-border-strong",
        error: "border-danger",
        success: "border-success",
        warning: "border-warning",
      },
    },
    defaultVariants: { size: "md", tone: "neutral" },
  },
);

const wrapperVariants = cva("flex w-full cursor-text items-center bg-transparent", {
  variants: {
    // Hauteur = scale.compact/base/expanded ; padding_x = spacing.sm/md/lg (DS-MD input sizing).
    size: {
      sm: "h-8 gap-1.5 px-sm",
      md: "h-10 gap-2 px-md",
      lg: "h-12 gap-2 px-lg",
    },
  },
  defaultVariants: { size: "md" },
});

const affixVariants = cva(
  "flex shrink-0 items-center justify-center bg-surface text-base text-text-secondary",
  {
    variants: { size: { sm: "px-sm", md: "px-md", lg: "px-lg" } },
    defaultVariants: { size: "md" },
  },
);

/* ── Root ─────────────────────────────────────────────────────────────────── */
export interface InputRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rootVariants> {
  /** Rend l'élément enfant à la place du <div> (Radix Slot). */
  asChild?: boolean;
  /** Rend le champ en squelette de chargement — mêmes dimensions, contenu masqué, relief éteint. */
  loading?: boolean;
}

const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  ({ className, size = "md", tone = "neutral", asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <InputContext.Provider value={{ size: size ?? "md", tone: tone ?? "neutral" }}>
        <Comp
          ref={ref}
          data-slot={loading ? undefined : "input"}
          data-tone={tone ?? "neutral"}
          aria-busy={loading || undefined}
          className={cn(rootVariants({ size, tone }), loading && "ds-skeleton divide-transparent", className)}
          {...props}
        >
          {children}
        </Comp>
      </InputContext.Provider>
    );
  },
);
InputRoot.displayName = "Input.Root";

/* ── Wrapper (label : cliquer place le focus sur le champ) ─────────────────── */
const InputWrapper = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { size } = React.useContext(InputContext);
  return <label ref={ref} className={cn(wrapperVariants({ size }), className)} {...props} />;
});
InputWrapper.displayName = "Input.Wrapper";

/* ── Input (le champ natif) ───────────────────────────────────────────────── */
export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
}
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type = "text", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
        ref={ref}
        type={type}
        className={cn(
          // Valeur = typography.body (16px). JAMAIS en dessous : sous 16px, iOS Safari zoome au focus.
          "w-full bg-transparent text-base text-text-primary outline-none",
          "placeholder:select-none placeholder:text-text-muted",
          "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
          className,
        )}
        {...props}
      />
    );
  },
);
InputField.displayName = "Input.Input";

/* ── Icon (polymorphe, currentColor, décorative par défaut) ───────────────── */
type InputIconProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

function InputIcon<T extends React.ElementType = "span">({
  as,
  className,
  ...props
}: InputIconProps<T>) {
  const Comp = as || "span";
  return (
    <Comp
      aria-hidden="true"
      // icon.md = 20px (size-5), apparié au corps 16px ; couleur = contenu additionnel (text-secondary).
      className={cn(
        "flex size-5 shrink-0 items-center justify-center text-text-secondary [&>svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}

/* ── Affix : section non éditable adjacente (« https:// », « € EUR ») ─────── */
function InputAffix({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { size } = React.useContext(InputContext);
  return <div className={cn(affixVariants({ size }), className)} {...props} />;
}

/* ── InlineAffix : préfixe/suffixe non éditable DANS le champ (« € ») ──────── */
function InputInlineAffix({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("shrink-0 select-none text-base text-text-secondary", className)} {...props} />;
}

/* API compound — miroir de la logique de référence, tokens DS-UI. */
export const Input = {
  Root: InputRoot,
  Wrapper: InputWrapper,
  Input: InputField,
  Icon: InputIcon,
  Affix: InputAffix,
  InlineAffix: InputInlineAffix,
};

export {
  InputRoot,
  InputWrapper,
  InputField,
  InputIcon,
  InputAffix,
  InputInlineAffix,
  rootVariants as inputRootVariants,
};
