"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import "./card-group.css";

/**
 * CardGroup — la COLLECTION de cartes, pas la carte. Deux autorités qui ne se mélangent pas
 * (ADAPTIVE-UX) : le groupe décide du nombre de colonnes, de la jointure et du mode ; la carte
 * décide de sa disposition interne.
 *
 * Règles portées, venues de CARD-UX/UI et du pattern COLLECTION :
 *  · UN SEUL mode d'interaction par collection — `mode` vit sur le groupe, jamais sur la carte ;
 *  · jointes (défaut) = filets internes + coins hérités du conteneur ; `separated` = cartes détachées ;
 *  · RELIEF = SIGNAL : rien au repos, l'élévation n'apparaît qu'au survol d'une carte interactive ;
 *  · highlight de PROXIMITÉ : la carte la plus proche du pointeur s'éclaire (surface pleine), les
 *    filets adjacents s'effacent pour ne pas doubler le contour ;
 *  · en mode `clickable`, la cible étendue est portée par un vrai lien OU un vrai bouton (`onActivate`) —
 *    une commande n'est pas une destination ; les actions internes restent des cibles distinctes.
 *
 * Promu depuis l'atelier (apps/site) vers le package le 2026-07-26 : le catalogue montrait un
 * composant que le package n'avait pas.
 */

export type CardGroupMode = "static" | "clickable" | "selectable";
export type CardGroupDensity = "spacious" | "comfortable" | "compact";

type Ctx = { mode: CardGroupMode; inline: boolean };
const GroupCtx = React.createContext<Ctx>({ mode: "static", inline: false });

export interface CardGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Colonnes du groupe. `"auto"` (défaut) = colonnes INTRINSÈQUES : elles émergent de la largeur
   * reçue et de `grid.item-min`, jamais d'un nombre par appareil (COLLECTION-UI). Un nombre fixe
   * reste possible quand la collection a une cardinalité connue (galerie de démonstration).
   */
  cols?: 1 | 2 | 3 | 4 | "auto";
  /** Cartes détachées (gap + contour par carte) au lieu de jointes (filets internes). */
  separated?: boolean;
  /** Contour du groupe (ou de chaque carte si `separated`). Défaut : true. */
  outlined?: boolean;
  density?: CardGroupDensity;
  orientation?: "stacked" | "inline";
  /** Mode d'interaction — UN SEUL pour toute la collection (CARD-UX). */
  mode?: CardGroupMode;
  /** Carte isolée : pas de grille, pas de highlight de proximité. */
  solo?: boolean;
  /** Highlight de proximité. Défaut : actif dès que le groupe est interactif et non-solo. */
  proximity?: boolean;
  /** Étiquette de la liste, annoncée au lecteur d'écran. */
  label?: string;
  children?: React.ReactNode;
}

export function CardGroupRoot({
  cols = "auto",
  separated = false,
  outlined = true,
  density = "comfortable",
  orientation = "stacked",
  mode = "static",
  solo = false,
  proximity,
  label,
  className,
  children,
  ...props
}: CardGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inline = orientation === "inline";
  const interactif = mode === "clickable" || mode === "selectable";
  const prox = (proximity ?? interactif) && !solo;
  const fluide = cols === "auto" && !solo && !inline;
  const effCols = solo || inline ? 1 : cols === "auto" ? undefined : cols;

  const items = React.Children.toArray(children).filter(React.isValidElement);
  const cles = items.map((c) => (c as React.ReactElement).key).join("|");

  // Filets et coins : dépendent du nombre de colonnes RÉEL (container queries) → mesure au runtime.
  React.useLayoutEffect(() => {
    const grp = ref.current;
    if (!grp) return;
    const cards = Array.from(grp.querySelectorAll<HTMLElement>(".cg-card"));
    if (!cards.length) return;
    const colonnes = () => getComputedStyle(grp).gridTemplateColumns.split(" ").length;
    const trim = () => {
      const n = colonnes();
      const len = cards.length;
      const debutDerniereLigne = (Math.ceil(len / n) - 1) * n;
      cards.forEach((c, i) => {
        c.classList.toggle("no-r", (i + 1) % n === 0);
        c.classList.toggle("no-b", i >= debutDerniereLigne);
        c.classList.toggle("c-tl", i === 0);
        c.classList.toggle("c-tr", i === Math.min(n, len) - 1);
        c.classList.toggle("c-bl", i === debutDerniereLigne);
        c.classList.toggle("c-br", i === len - 1 && (len % n === 0 || n === 1));
      });
    };
    trim();
    const ro = new ResizeObserver(trim);
    ro.observe(grp);
    return () => ro.disconnect();
  }, [cles, effCols, separated, density, inline]);

  // Highlight de proximité : la carte la plus proche du pointeur reçoit la surface.
  React.useLayoutEffect(() => {
    const grp = ref.current;
    if (!grp || !prox) return;
    const hl = grp.querySelector<HTMLElement>(".cg-hl");
    // Les cartes déclarées sans cible n'attirent pas le highlight : le survol ne promet
    // que ce qui existe (cf. la prop `inactive` de CardGroup.Card).
    const cards = Array.from(grp.querySelectorAll<HTMLElement>(".cg-card:not(.cg-card--inactive)"));
    if (!hl || !cards.length) return;
    let visible = false;
    const colonnes = () => getComputedStyle(grp).gridTemplateColumns.split(" ").length;
    const nettoie = () => cards.forEach((c) => c.classList.remove("hl-off-b", "hl-off-r"));
    const place = (it: HTMLElement, i: number) => {
      hl.classList.toggle("teleport", !visible);
      hl.style.transform = `translate(${it.offsetLeft}px,${it.offsetTop}px)`;
      hl.style.width = `${it.offsetWidth}px`;
      hl.style.height = `${it.offsetHeight}px`;
      if (!visible) {
        void hl.offsetWidth;
        hl.classList.add("on");
        visible = true;
      }
      const n = colonnes();
      nettoie();
      it.classList.add("hl-off-b", "hl-off-r");
      if (i % n > 0) cards[i - 1]?.classList.add("hl-off-r");
      if (i - n >= 0) cards[i - n]?.classList.add("hl-off-b");
    };
    const plusProche = (e: MouseEvent): [HTMLElement, number] | null => {
      let best: [HTMLElement, number] | null = null;
      let dist = Infinity;
      cards.forEach((it, i) => {
        const r = it.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          best = [it, i];
          dist = -1;
          return;
        }
        if (dist === -1) return;
        const d = Math.hypot(e.clientX - (r.left + r.right) / 2, e.clientY - (r.top + r.bottom) / 2);
        if (d < dist) {
          dist = d;
          best = [it, i];
        }
      });
      return best;
    };
    const onMove = (e: MouseEvent) => {
      const t = plusProche(e);
      if (t) place(t[0], t[1]);
    };
    const onLeave = () => {
      hl.classList.remove("on");
      visible = false;
      nettoie();
    };
    grp.addEventListener("mousemove", onMove);
    grp.addEventListener("mouseleave", onLeave);
    return () => {
      grp.removeEventListener("mousemove", onMove);
      grp.removeEventListener("mouseleave", onLeave);
    };
  }, [cles, prox, effCols, separated, inline]);

  return (
    <GroupCtx.Provider value={{ mode, inline }}>
      <div
        ref={ref}
        role={mode === "selectable" ? undefined : "list"}
        aria-label={label}
        style={effCols ? ({ ["--grp-cols" as string]: effCols } as React.CSSProperties) : undefined}
        className={cn(
          "cardgrp",
          // Grille intrinsèque : minmax(min(100%, grid.item-min), 1fr) — la valeur vient du token,
          // la règle vit dans card-group.css (cf. le commentaire de `.cardgrp.fluide`).
          fluide && "fluide",
          separated || solo ? "sep" : "joined",
          outlined && "outlined",
          solo && "solo",
          density,
          inline ? "inline" : "stacked",
          className,
        )}
        {...props}
      >
        {prox ? <div className="cg-hl" aria-hidden="true" /> : null}
        {items}
      </div>
    </GroupCtx.Provider>
  );
}
CardGroupRoot.displayName = "CardGroup.Root";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export interface CardGroupCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Pastille d'icône (24×24 conseillé) — au-dessus du titre, ou en tête de rangée en inline. */
  icon?: React.ReactNode;
  /** Média illustratif : en haut (stacked) ou sur le flanc (inline). */
  media?: React.ReactNode;
  /** Actions internes — cibles distinctes de la cible étendue, jamais imbriquées dedans. */
  actions?: React.ReactNode;
  /** Contenu libre sous la description (métadonnées, statut, lien de lecture). */
  children?: React.ReactNode;
  /** Mode clickable : destination (rend un lien). */
  href?: string;
  /** Mode clickable : commande (rend un bouton) — ouvre un superposé, par exemple. */
  onActivate?: () => void;
  /** Mode selectable : état et bascule. */
  selected?: boolean;
  onSelectedChange?: (v: boolean) => void;
  /** Niveau de titre réel dans la page qui accueille la collection. */
  titleAs?: "h2" | "h3" | "h4" | "h5";
  /**
   * Carte SANS CIBLE dans une collection interactive.
   *
   * Ce n'est pas un second mode : la collection en garde un seul (CARD-UX). C'est la
   * déclaration qu'un élément particulier n'a rien à ouvrir — une règle sans détail
   * supplémentaire, une entrée sans destination. Elle perd alors toute affordance : pas de
   * curseur main, pas de relief au survol, et le highlight de proximité l'ignore.
   *
   * Sans cette prop, il n'y avait que deux issues, toutes deux mauvaises : promettre un
   * détail inexistant au survol, ou alourdir chaque carte d'un bouton explicite.
   */
  inactive?: boolean;
}

export function CardGroupCard({
  title,
  description,
  icon,
  media,
  actions,
  children,
  href,
  onActivate,
  selected,
  onSelectedChange,
  titleAs: H = "h4",
  inactive = false,
  className,
  ...props
}: CardGroupCardProps) {
  const { mode, inline } = React.useContext(GroupCtx);
  const clickable = mode === "clickable" && !inactive;
  const selectable = mode === "selectable" && !inactive;

  const cible = clickable ? (
    href ? (
      <a href={href}>{title}</a>
    ) : (
      <button type="button" onClick={onActivate}>
        {title}
      </button>
    )
  ) : (
    title
  );

  const titre = <H className="cg-title">{cible}</H>;
  const desc = description ? <p className="cg-desc">{description}</p> : null;
  const chip = icon ? (
    <span className="cg-chip" aria-hidden="true">
      {icon}
    </span>
  ) : null;
  const visuel = media ? <span className={inline ? "cg-media--side" : "cg-media--top"} aria-hidden="true">{media}</span> : null;

  const corps = inline ? (
    <div className="cg-inner">
      {visuel}
      {chip}
      <div className="cg-text">
        {titre}
        {desc}
        {children}
      </div>
      {actions ? <div className="cg-actions">{actions}</div> : null}
    </div>
  ) : (
    <>
      {visuel}
      <div className="cg-head">
        {chip}
        {titre}
        {desc}
        {children}
      </div>
      {actions ? <div className="cg-actions">{actions}</div> : null}
    </>
  );

  const selAttrs = selectable
    ? ({
        role: "button" as const,
        tabIndex: 0,
        "aria-pressed": !!selected,
        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
          if ((e.target as HTMLElement).closest(".cg-actions")) return;
          onSelectedChange?.(!selected);
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if ((e.key === " " || e.key === "Enter") && e.target === e.currentTarget) {
            e.preventDefault();
            onSelectedChange?.(!selected);
          }
        },
      })
    : ({ role: "listitem" as const });

  return (
    <div
      className={cn(
        "cg-card",
        inactive && "cg-card--inactive",
        clickable && "cg-card--click",
        selectable && "cg-card--select",
        selected && "selected",
        media && inline && "has-img",
        className,
      )}
      {...selAttrs}
      {...props}
    >
      <span className="cg-hb" aria-hidden="true" />
      <span className="cg-hr" aria-hidden="true" />
      {clickable || selectable ? <span className="cg-lift" aria-hidden="true" /> : null}
      {selectable ? <span className="cg-check" aria-hidden="true">{CHECK}</span> : null}
      {corps}
    </div>
  );
}
CardGroupCard.displayName = "CardGroup.Card";

export const CardGroup = Object.assign(CardGroupRoot, {
  Root: CardGroupRoot,
  Card: CardGroupCard,
});
