"use client";
import { CardGroup } from "@sibyl/react";

/**
 * Les règles fondamentales d'un sujet — CLIENT.
 *
 * Collection d'éléments de même nature, sans destination : `CardGroup` en mode `static`.
 * Le mode vit sur le groupe et jamais sur la carte (CARD-UX), et `static` signifie
 * exactement ce qu'il dit — aucun relief, aucune affordance, rien à cliquer.
 *
 * Écrites à la main en `<article>` bordés jusqu'ici, elles ressemblaient à des cartes
 * cliquables sans en être : le relief est un signal, pas un décor.
 */
export type RegleCle = { num: string; texte: string };

export function ReglesCles({ regles, label }: { regles: RegleCle[]; label: string }) {
  return (
    <CardGroup cols="auto" mode="static" separated label={label}>
      {regles.map((r, i) => (
        <CardGroup.Card
          key={i}
          titleAs="h3"
          title={
            <span className="font-label text-[11px] font-semibold uppercase tracking-wider text-primary">
              {r.num}
            </span>
          }
        >
          <p className="m-0 mt-sm text-sm font-medium leading-snug text-text-primary">{r.texte}</p>
        </CardGroup.Card>
      ))}
    </CardGroup>
  );
}
