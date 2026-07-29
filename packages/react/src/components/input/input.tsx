"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @fili/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import "./input.css";

/**
 * Input — construit sur les RÈGLES de Design System MD (autorité UX),
 * habillé par les tokens @fili/tokens. API compound inspirée de la LOGIQUE
 * de référence : Root > Wrapper > (Icon · Input · InlineAffix) + Affix.
 *
 * Axes DS-MD, ORTHOGONAUX : status × size × field_type (le type HTML natif).
 *   - `status` (renommé depuis `tone`, arbitrage 2026-07-29) : un STATUT de validation
 *     (default / error / success / warning), pas une couleur — le nom suit la fonction.
 *     En erreur, le champ porte aria-invalid automatiquement.
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
export type InputStatus = "default" | "error" | "success" | "warning";

const InputContext = React.createContext<{ size: InputSize; status: InputStatus }>({
  size: "md",
  status: "default",
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
      // Bordure : neutre délimitante (3:1) ; error/success/warning = bordure de STATUT.
      status: {
        default: "border-border-strong",
        error: "border-danger",
        success: "border-success",
        warning: "border-warning",
      },
    },
    defaultVariants: { size: "md", status: "default" },
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
  ({ className, size = "md", status = "default", asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <InputContext.Provider value={{ size: size ?? "md", status: status ?? "default" }}>
        <Comp
          ref={ref}
          data-slot={loading ? undefined : "input"}
          data-status={status ?? "default"}
          aria-busy={loading || undefined}
          className={cn(rootVariants({ size, status }), loading && "ds-skeleton divide-transparent", className)}
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
  /** Croix d'effacement quand le champ est non vide — remet le texte à vide (retour au placeholder). */
  clearable?: boolean;
}
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type = "text", asChild = false, clearable = false, onChange, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "input";
    const { status } = React.useContext(InputContext);
    // mécanique clearable — hooks inconditionnels, inactifs si !clearable
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const [hasValue, setHasValue] = React.useState(!!(props.value ?? props.defaultValue));
    React.useEffect(() => {
      if (props.value !== undefined) setHasValue(String(props.value) !== "");
    }, [props.value]);
    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    };
    const field = (
      <Comp
        ref={clearable && !asChild ? setRefs : forwardedRef}
        type={type}
        // le statut est porté par la sémantique, pas seulement la couleur (INTERACTION-R12)
        aria-invalid={status === "error" || undefined}
        className={cn(
          // Valeur = typography.body (16px). JAMAIS en dessous : sous 16px, iOS Safari zoome au focus.
          "w-full bg-transparent text-base text-text-primary outline-none",
          "placeholder:select-none placeholder:text-text-muted",
          "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
          className,
        )}
        onChange={
          clearable && !asChild
            ? (e: React.ChangeEvent<HTMLInputElement>) => {
                setHasValue(e.currentTarget.value !== "");
                onChange?.(e);
              }
            : onChange
        }
        {...props}
      />
    );
    if (!clearable || asChild) return field;
    return (
      <>
        {field}
        {hasValue && !props.disabled ? (
          <FieldButton
            aria-label="Effacer le champ"
            onClick={() => {
              const el = innerRef.current;
              if (!el) return;
              setNativeValue(el, ""); // remonte par onChange — vaut aussi pour un champ contrôlé
              el.focus();
            }}
          >
            {IconX}
          </FieldButton>
        ) : null}
      </>
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

/* ════ field_type — les natures de contenu qui exigent une MÉCANIQUE (DS-MD INPUT :
   le 3e axe est le type HTML NATIF, jamais un text déguisé — le type pilote le clavier
   mobile, la validation native et l'autofill). email/tel/url se composent avec l'API
   existante (Icon, Affix, InlineAffix) ; ci-dessous les quatre qui demandent plus. ════ */

const IconEye = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconEyeOff = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.7 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.1 3M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10.7 10.7 0 0 0 5.4-1.4" /><path d="M9.9 9.9a3 3 0 1 0 4.2 4.2" /><path d="m2 2 20 20" /></svg>
);
const IconLoupe = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);
const IconX = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

/** Petit bouton utilitaire interne au champ (toggle, clear, steppers) — jamais dans l'ordre
 *  de lecture avant le champ, focus ring du système, mousedown neutralisé pour ne pas voler
 *  le focus au champ. */
function FieldButton({ className, onMouseDown, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // le focus reste dans le champ
        onMouseDown?.(e);
      }}
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-sm text-text-secondary transition-colors duration-fast ease-out",
        "hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
        "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "[&>svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/** Déclenche l'onChange React après une mutation programmatique de la valeur native. */
function setNativeValue(el: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

/* ── Password : champ + toggle afficher/masquer ────────────────────────────── */
export interface InputPasswordProps extends InputFieldProps {
  /** Visible en clair au montage (défaut : masqué). */
  defaultVisible?: boolean;
}
const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ defaultVisible = false, autoComplete = "current-password", ...props }, ref) => {
    const [visible, setVisible] = React.useState(defaultVisible);
    return (
      <>
        <InputField ref={ref} {...props} type={visible ? "text" : "password"} autoComplete={autoComplete} />
        <FieldButton
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? IconEyeOff : IconEye}
        </FieldButton>
      </>
    );
  },
);
InputPassword.displayName = "Input.Password";

/* ── Search : loupe + champ type search + effacement (croix, visible si non vide) ── */
const InputSearch = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ onChange, className, ...props }, forwardedRef) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const [hasValue, setHasValue] = React.useState(!!(props.value ?? props.defaultValue));
    React.useEffect(() => {
      if (props.value !== undefined) setHasValue(String(props.value) !== "");
    }, [props.value]);
    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    };
    const clear = () => {
      const el = innerRef.current;
      if (!el) return;
      setNativeValue(el, ""); // remonte par onChange — vaut aussi pour un champ contrôlé
      el.focus();
    };
    return (
      <>
        <InputIcon>{IconLoupe}</InputIcon>
        <InputField
          ref={setRefs}
          type="search"
          {...props}
          onChange={(e) => {
            setHasValue(e.currentTarget.value !== "");
            onChange?.(e);
          }}
          // la croix native WebKit disparaît : l'effacement est le nôtre (cohérent partout)
          className={cn("[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:appearance-none", className)}
        />
        {hasValue ? (
          <FieldButton aria-label="Effacer la recherche" onClick={clear}>
            {IconX}
          </FieldButton>
        ) : null}
      </>
    );
  },
);
InputSearch.displayName = "Input.Search";

/* ── Number : QUANTITÉS réelles uniquement (steppers −/+). Un code postal, un OTP ou un
   numéro de carte = type text + inputmode numeric, JAMAIS number (zéros de tête mangés,
   « e » accepté) — cf. INPUT-UX. Spinners natifs masqués : les steppers sont les nôtres. ── */
const InputNumber = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, forwardedRef) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    };
    const step = (dir: 1 | -1) => {
      const el = innerRef.current;
      if (!el || el.disabled) return;
      try {
        dir > 0 ? el.stepUp() : el.stepDown();
      } catch {
        /* champ vide sans min : stepUp lève — on repart de 0 */
        setNativeValue(el, "0");
        return el.focus();
      }
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.focus();
    };
    return (
      <>
        <InputField
          ref={setRefs}
          type="number"
          inputMode="decimal"
          {...props}
          className={cn(
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
        />
        <FieldButton aria-label="Diminuer" disabled={props.disabled} onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
        </FieldButton>
        <FieldButton aria-label="Augmenter" disabled={props.disabled} onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </FieldButton>
      </>
    );
  },
);
InputNumber.displayName = "Input.Number";

/* ── Textarea : le multi-ligne. Remplace Input.Wrapper (hauteur au contenu, pas de h fixe) :
   <Input.Root><Input.Textarea/></Input.Root>. Redimensionnable verticalement seulement. ── */
export interface InputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const InputTextarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, rows = 3, ...props }, ref) => {
    const { size } = React.useContext(InputContext);
    return (
      <label
        className={cn(
          "flex w-full cursor-text",
          size === "sm" ? "px-sm py-1.5" : size === "lg" ? "px-lg py-sm" : "px-md py-2",
        )}
      >
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            // même contrat que le champ : corps 16px (jamais moins — zoom iOS), resize vertical seul
            "w-full resize-y bg-transparent text-base leading-normal text-text-primary outline-none",
            "placeholder:select-none placeholder:text-text-muted",
            "disabled:cursor-not-allowed disabled:resize-none disabled:text-text-disabled disabled:placeholder:text-text-disabled",
            className,
          )}
          {...props}
        />
      </label>
    );
  },
);
InputTextarea.displayName = "Input.Textarea";

/* API compound — miroir de la logique de référence, tokens DS-UI. */
export const Input = {
  Root: InputRoot,
  Wrapper: InputWrapper,
  Input: InputField,
  Icon: InputIcon,
  Affix: InputAffix,
  InlineAffix: InputInlineAffix,
  Password: InputPassword,
  Search: InputSearch,
  Number: InputNumber,
  Textarea: InputTextarea,
};

export {
  InputRoot,
  InputWrapper,
  InputField,
  InputIcon,
  InputAffix,
  InputInlineAffix,
  InputPassword,
  InputSearch,
  InputNumber,
  InputTextarea,
  rootVariants as inputRootVariants,
};
