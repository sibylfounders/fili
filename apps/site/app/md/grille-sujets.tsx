"use client";
import { CardGroup } from "@fili/react";

/**
 * Grille des sujets d'une nature — CLIENT.
 *
 * Une collection de destinations de même nature : `CardGroup` en mode `clickable`, la cible
 * étendue portée par `href`. Elle était écrite à la main en `<Link>` bordés, ce qui privait
 * la page des filets internes, des coins hérités et du highlight de proximité — et faisait
 * diverger la doctrine de son propre site.
 *
 * Client parce que les composés du kit sont exportés par des modules `"use client"` : y
 * accéder depuis le graphe serveur produit une référence que le manifest de Next 14.2
 * n'enregistre pas. La page serveur ne passe donc que des données sérialisables.
 */
export type SujetTuile = {
  slug: string;
  titre: string;
  meta: string;
  embleme?: string;
};

export function GrilleSujets({ items, label }: { items: SujetTuile[]; label: string }) {
  return (
    <CardGroup cols="auto" mode="clickable" separated label={label}>
      {items.map((s) => (
        <CardGroup.Card
          key={s.slug}
          titleAs="h3"
          title={s.titre}
          href={`/md/${s.slug}/`}
          icon={
            s.embleme ? (
              <span
                aria-hidden="true"
                className="[&_svg]:size-6"
                dangerouslySetInnerHTML={{ __html: s.embleme }}
              />
            ) : undefined
          }
        >
          <p className="m-0 mt-2xs font-mono text-[11px] text-text-muted">{s.meta}</p>
        </CardGroup.Card>
      ))}
    </CardGroup>
  );
}
