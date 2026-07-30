"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @fili/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { INTERACTION_MODE_CURSOR, type InteractionMode } from "../../lib/interaction";
import { LinkRoot } from "../link/link";
import { useCollectionContext } from "../card-group/collection-context";
import "../../lib/focus.css";
import "./card.css";

/**
 * Card — conteneur qui ORGANISE et donne accès à du contenu ; il ne déclenche jamais
 * d'action lui-même (Button) et ne navigue jamais sans un vrai lien (Link, Card.TitleLink).
 * Construit sur les RÈGLES de Design System MD — langage **Interaction** (relief = signal,
 * jamais décor) + principe **Adaptive** (le conteneur pilote le composant) — habillé par les
 * tokens @fili/tokens. Cf. `foundations/relief-adaptive.md` pour le contexte de ces deux
 * autorités (évolution DS-MD du 2026-07-20).
 *
 * AXES DS-MD, volontairement différents de Button/Input : `mode` (interaction_mode) ×
 * `density` — PAS de tone (le conteneur n'a pas de sémantique propre), PAS de style au sens
 * de Button : outlined/elevated est une décision d'identité visuelle fixée une fois pour tout
 * le produit (outlined au repos, elevated réservé au hover d'une carte clickable), pas un
 * choix par instance (cf. CARD-UX.md/CARD-UI.md, DECISIONS.md 2026-07-20).
 *
 * RELIEF = SIGNAL, JAMAIS DÉCOR (langage Interaction) : repos = `shadow-none` sur TOUS les
 * modes, sans exception. Le relief n'apparaît que sur `mode="clickable"`, uniquement au
 * hover/focus, via un pseudo-élément pré-rendu animé en OPACITÉ (card.css) — jamais un
 * box-shadow interpolé (coûteux, cf. note motion de CARD-UI.md). Card est l'exemple canonique
 * du langage : le SEUL composant qui « a besoin » de relief, et seulement là — le généraliser
 * à toutes les cartes ou à l'état de repos tuerait le signal d'affordance.
 *
 * ADAPTIVE = LE CONTENEUR, PAS LE VIEWPORT (principe Adaptive) : `Card.Root` est son propre
 * conteneur de requête (`container-type: inline-size`, card.css) ; sa disposition interne
 * (media en haut vs à côté du contenu) réagit à SA largeur réelle via `@container`, jamais à
 * un breakpoint de fenêtre. La grille de collection qui héberge la Card décide de son nombre
 * de colonnes (autorité page) ; la Card décide de sa disposition interne (autorité composant)
 * — deux autorités qui ne se mélangent jamais (ADAPTIVE-UX.md).
 */

// L'axe mode n'appartient plus à Card : c'est l'axe transversal du langage Interaction
// (lib/interaction — INTERACTION-R26…R28, arbitrage 2026-07-29). Card en est le premier
// consommateur ; l'alias reste exporté pour l'API existante.
type CardInteractionMode = InteractionMode;
type CardDensity = "comfortable" | "compact";

const CardContext = React.createContext<{ mode: CardInteractionMode; density: CardDensity }>({
  mode: "static",
  density: "comfortable",
});

const rootVariants = cva(
  [
    // Le Root mesure l'espace disponible. La surface interne, descendante du conteneur,
    // porte le rendu et peut donc être modifiée par @container (card.css).
    "group/card relative w-full",
  ].join(" "),
  {
    variants: {
      // Le curseur annonce l'affordance ; le relief (::before, lib/interaction.css) ne
      // réagit qu'au hover/focus — jamais au repos. Voir « Relief = signal » dans la docstring.
      mode: INTERACTION_MODE_CURSOR,
      density: {
        comfortable: "",
        compact: "",
      },
    },
    defaultVariants: { mode: "static", density: "comfortable" },
  },
);

export interface CardRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rootVariants> {
  /**
   * Carte selectable : état sélectionné. En mode `selectable`, la carte l'expose elle-même —
   * `role="button"` + `aria-pressed`, anneau de focus, et coche non chromatique en plus de la
   * bordure `color.primary` (CARD-UI.md : « selected_border PLUS un indicateur non chromatique,
   * et l'état exposé techniquement »). La collection qui l'héberge n'a pas à le refaire.
   */
  selected?: boolean;
  /**
   * Mode selectable : bascule de l'état. C'est la CARTE qui porte l'interaction (clic sur la
   * surface hors actions/cibles internes, Espace/Entrée au clavier) — autorité CARD, la
   * collection n'a pas à refaire cette mécanique (rétablissement des frontières 2026-07-30).
   */
  onSelectedChange?: (selected: boolean) => void;
  /**
   * Autorise le passage en disposition horizontale (media à côté du contenu) quand le
   * conteneur a assez de largeur — état `regular` de l'Architecture adaptative. Désactiver
   * pour une carte qui doit rester empilée quelle que soit la largeur reçue. Défaut : true.
   */
  adaptiveMedia?: boolean;
  /** Rend la carte en squelette (Card.Skeleton) — mêmes dimensions de collection. */
  loading?: boolean;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  (
    {
      className,
      mode,
      density,
      selected,
      onSelectedChange,
      adaptiveMedia = true,
      loading = false,
      onClick,
      onKeyDown,
      children,
      ...props
    },
    ref,
  ) => {
    // La collection (CardGroup) fournit des DÉFAUTS via son contexte ; une prop explicite
    // les surclasse — c'est ainsi qu'une carte sans cible reste `static` dans une
    // collection interactive. Hors collection : défauts propres de Card.
    const collection = useCollectionContext();
    if (loading) return <CardSkeleton className={className} />;
    const resolvedMode: CardInteractionMode = mode ?? collection?.mode ?? "static";
    const resolvedDensity: CardDensity = density ?? collection?.density ?? "comfortable";
    // Le mode selectable rend la carte manipulable : c'est donc ELLE qui porte le rôle, la
    // tabulation, l'état ET la bascule (clic hors actions/cibles internes, Espace/Entrée).
    // Les attributs restent surchargeables (`{...props}` passe après) pour le cas d'un vrai
    // input checkbox/radio en aval.
    const sel =
      resolvedMode === "selectable"
        ? { role: "button" as const, tabIndex: 0, "aria-pressed": !!selected }
        : null;
    const handleClick =
      resolvedMode === "selectable"
        ? (e: React.MouseEvent<HTMLDivElement>) => {
            onClick?.(e);
            if (e.defaultPrevented) return;
            // Les cibles internes (actions, liens, boutons) restent des cibles distinctes :
            // les manipuler ne bascule pas la sélection.
            const t = e.target as HTMLElement;
            if (t !== e.currentTarget && t.closest("a,button,input,select,textarea,.ds-card-actions")) return;
            onSelectedChange?.(!selected);
          }
        : onClick;
    const handleKeyDown =
      resolvedMode === "selectable"
        ? (e: React.KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(e);
            if (e.defaultPrevented) return;
            if ((e.key === " " || e.key === "Enter") && e.target === e.currentTarget) {
              e.preventDefault();
              onSelectedChange?.(!selected);
            }
          }
        : onKeyDown;
    return (
      <CardContext.Provider value={{ mode: resolvedMode, density: resolvedDensity }}>
        <div
          ref={ref}
          {...sel}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          data-mode={resolvedMode}
          data-density={resolvedDensity}
          data-selected={selected || undefined}
          data-regular-capable={adaptiveMedia || undefined}
          className={cn(
            "ds-card", // conteneur de requête ; la surface adaptative est son enfant
            "ds-interactive", // couche partagée du mode (lib/interaction.css)
            resolvedMode === "selectable" && "ds-focus-ring", // anneau unique de BORDER (focus v2)
            rootVariants({ mode: resolvedMode, density: resolvedDensity }),
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "ds-card-surface relative z-[1] flex w-full flex-col overflow-hidden rounded-card border border-border bg-background shadow-none",
              selected && "border-primary",
            )}
          >
            {children}
            {resolvedMode === "selectable" && selected ? <CardCheck /> : null}
          </div>
        </div>
      </CardContext.Provider>
    );
  },
);
CardRoot.displayName = "Card.Root";

/**
 * Coche de sélection — l'indicateur NON CHROMATIQUE qui accompagne `selected_border`
 * (CARD-UI.md l.99). Décoratif pour l'AT : l'état est déjà annoncé par `aria-pressed`.
 */
function CardCheck() {
  return (
    <span aria-hidden="true" className="ds-card-check absolute right-sm top-sm z-[2] size-4 text-primary">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}
CardCheck.displayName = "Card.Check";

/** Media : ratio fixe, object-fit cover ; fallback = surface + icône (même ratio, la grille ne voit pas la différence). */
export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: "landscape" | "square";
}
function CardMedia({ className, ratio = "landscape", children, ...props }: CardMediaProps) {
  return (
    <div
      className={cn(
        "ds-card-media flex shrink-0 items-center justify-center overflow-hidden bg-surface text-text-muted",
        ratio === "landscape" ? "aspect-video" : "aspect-square",
        "[&_img]:size-full [&_img]:object-cover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
CardMedia.displayName = "Card.Media";

/** Header : titre (+ chevron en mode expandable) — première ligne lue de la carte. */
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ds-card-header flex items-start justify-between gap-sm", className)} {...props} />;
}
CardHeader.displayName = "Card.Header";

/** Body : conteneur flex du contenu ; la surface parente orchestre la disposition adaptative. */
function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { density } = React.useContext(CardContext);
  return (
    <div
      className={cn(
        "ds-card-body flex min-w-0 flex-1 flex-col",
        density === "compact" ? "gap-xs p-sm" : "gap-sm p-md",
        className,
      )}
      {...props}
    />
  );
}
CardBody.displayName = "Card.Body";

/**
 * Titre — élément de titre réel (h2…h4 selon la structure de la page qui accueille la
 * collection). La TAILLE reste fixe (`text-h4`) : « niveau ≠ taille » (TYPOGRAPHY-UX.md).
 */
function CardTitle({
  className,
  as: Comp = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }) {
  return <Comp className={cn("ds-card-title text-h4 font-medium leading-tight text-text-primary", className)} {...props} />;
}
CardTitle.displayName = "Card.Title";

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-text-secondary", className)} {...props} />;
}
CardDescription.displayName = "Card.Description";

/** Actions internes : SIBLINGS du lien étendu, jamais des descendants (cf. Card.TitleLink) — chaque cible reste distincte au clavier. */
function CardActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ds-card-actions relative z-[1] mt-sm flex items-center gap-sm", className)} {...props} />;
}
CardActions.displayName = "Card.Actions";

/**
 * Lien étendu — technique DS-MD (CARD-UI.md) : un vrai `<a>` dont un pseudo-élément
 * (`::after`, card.css) étend la cible à toute la carte. C'est LUI que le lecteur d'écran
 * annonce ; `Card.Actions` reste un sibling positionné au-dessus en z-index, jamais imbriqué
 * dans ce lien.
 */
export interface CardTitleLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}
const CardTitleLink = React.forwardRef<HTMLAnchorElement, CardTitleLinkProps>(
  ({ className, href, ...props }, ref) => (
    <LinkRoot
      ref={ref}
      href={href}
      context="standalone"
      className={cn("ds-card-title-link ds-interactive-target", className)}
      {...props}
    />
  ),
);
CardTitleLink.displayName = "Card.TitleLink";

/**
 * Pastille d'icône (32×32, glyphe 22) — au-dessus ou à côté du titre. Rapatriée depuis la
 * collection (`.cg-chip` de card-group.css) le 2026-07-30 : un affleurement d'ITEM appartient
 * à CARD, pas au pattern qui la dispose. Décorative pour l'AT (`aria-hidden`).
 */
function CardIcon({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn("ds-card-icon", className)} {...props} />;
}
CardIcon.displayName = "Card.Icon";

/**
 * Cible étendue-COMMANDE — le pendant de `Card.TitleLink` quand la carte clickable ouvre un
 * superposé au lieu de naviguer : un vrai `<button>`, jamais un `<a href="#">` — une commande
 * n'est pas une destination. Même technique de zone étendue (`ds-interactive-target`).
 * Rapatriée depuis la collection (`.cg-cmd`) le 2026-07-30 — autorité CARD.
 */
export interface CardTitleCommandProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const CardTitleCommand = React.forwardRef<HTMLButtonElement, CardTitleCommandProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn("ds-card-title-command ds-interactive-target", className)}
      {...props}
    />
  ),
);
CardTitleCommand.displayName = "Card.TitleCommand";

/** Chevron du mode expandable — l'ORIENTATION porte l'état (aria-expanded en aval), jamais un changement de glyphe. */
export interface CardChevronProps extends React.HTMLAttributes<HTMLSpanElement> {
  expanded?: boolean;
}
function CardChevron({ className, expanded, ...props }: CardChevronProps) {
  return (
    <span
      aria-hidden="true"
      data-expanded={expanded || undefined}
      className={cn(
        "relative z-[1] flex size-5 shrink-0 items-center justify-center text-text-secondary transition-transform duration-base ease-in-out motion-reduce:transition-none",
        expanded && "rotate-180",
        className,
      )}
      {...props}
    />
  );
}
CardChevron.displayName = "Card.Chevron";

/** Skeleton — mêmes dimensions que la carte réelle ; `aria-hidden`, l'annonce de chargement vit sur la collection (`aria-busy`). */
function CardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("ds-card w-full animate-pulse motion-reduce:animate-none", className)}
      {...props}
    >
      <div className="ds-card-surface flex w-full flex-col overflow-hidden rounded-card border border-border bg-background">
        <div className="aspect-video bg-surface" />
        <div className="flex flex-col gap-sm p-md">
          <div className="h-4 w-2/3 rounded-sm bg-surface" />
          <div className="h-3 w-full rounded-sm bg-surface" />
        </div>
      </div>
    </div>
  );
}
CardSkeleton.displayName = "Card.Skeleton";

export const Card = {
  Root: CardRoot,
  Check: CardCheck,
  Media: CardMedia,
  Icon: CardIcon,
  Header: CardHeader,
  Body: CardBody,
  Title: CardTitle,
  Description: CardDescription,
  Actions: CardActions,
  TitleLink: CardTitleLink,
  TitleCommand: CardTitleCommand,
  Chevron: CardChevron,
  Skeleton: CardSkeleton,
};

export {
  CardRoot,
  CardCheck,
  CardMedia,
  CardIcon,
  CardHeader,
  CardBody,
  CardTitle,
  CardDescription,
  CardActions,
  CardTitleLink,
  CardTitleCommand,
  CardChevron,
  CardSkeleton,
  rootVariants as cardRootVariants,
};
