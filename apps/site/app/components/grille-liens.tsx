"use client";
import { Card, CardGroup } from "@fili/react";

/**
 * Collection de DESTINATIONS — le composant unique des listes de liens du site.
 *
 * `CardGroup` est le pattern COLLECTION : il assemble et orchestre de vraies `Card`,
 * il ne redessine jamais leur contenu. Les cartes sont donc composées ICI avec la seule
 * anatomie de carte du kit (`Card.Root/Body/Header/Title/TitleLink/Description`) — l'API
 * `CardGroup.Card`, seconde anatomie parallèle, a été supprimée le 2026-07-30.
 * Le mode et la densité viennent du groupe (contexte de collection) ; la cible étendue
 * est un vrai lien (`Card.TitleLink`).
 *
 * Le `<Link>` bordé à la main faisait diverger la doctrine de son propre site — rayon de
 * contrôle (`radius.md`) au lieu du rayon conteneur (`radius.lg`, CARD-UI.md), colonnes
 * décidées par un breakpoint de fenêtre au lieu du token `grid.item-min` (ADAPTIVE/
 * COLLECTION-UI), titre en `<strong>` donc absent du plan du document (CARD-UI.md :
 * élément de titre réel), pas de balisage liste, et un troisième vocabulaire de survol.
 * Même constat, même correctif que `md/grille-sujets.tsx` (2026-07-26).
 *
 * UNE destination n'est pas une collection : `solo` (défaut dès qu'il n'y a qu'un item)
 * retire la grille et le highlight de proximité — il ne reste que la carte.
 *
 * Client parce que les composés du kit sont exportés par des modules `"use client"` : la
 * page serveur ne passe que des données sérialisables.
 */
export type Destination = { href: string; titre: string; sous?: string };

export function GrilleLiens({
  items,
  label,
  cols = "auto",
  titleAs = "h3",
  solo,
}: {
  items: Destination[];
  label: string;
  cols?: 1 | 2 | 3 | 4 | "auto";
  titleAs?: "h2" | "h3" | "h4" | "h5";
  solo?: boolean;
}) {
  return (
    <CardGroup cols={cols} mode="clickable" separated solo={solo ?? items.length === 1} label={label}>
      {items.map((d) => (
        <Card.Root key={d.href}>
          <Card.Body>
            <Card.Header>
              <Card.Title as={titleAs}>
                <Card.TitleLink href={d.href}>{d.titre}</Card.TitleLink>
              </Card.Title>
            </Card.Header>
            {d.sous ? <Card.Description>{d.sous}</Card.Description> : null}
          </Card.Body>
        </Card.Root>
      ))}
    </CardGroup>
  );
}
