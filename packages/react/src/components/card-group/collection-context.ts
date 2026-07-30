"use client";
import * as React from "react";
import type { InteractionMode } from "../../lib/interaction";

/**
 * Contexte de COLLECTION — la mécanique interne par laquelle le pattern CardGroup
 * transmet son mode et sa densité aux `Card` qu'il héberge, SANS dupliquer leur
 * anatomie (rétablissement des frontières, 2026-07-30).
 *
 * Sens de l'autorité : la collection fournit des DÉFAUTS ; une Card qui déclare
 * explicitement son propre `mode` le conserve — c'est ainsi qu'une carte SANS CIBLE
 * (`mode="static"`) vit dans une collection interactive : elle garde sa place et sa
 * forme, perd toute affordance, et le highlight de proximité l'ignore.
 *
 * Le fichier est une FEUILLE (aucun import de composant) : Card le consomme,
 * CardGroup le fournit — pas de cycle.
 */
export type CollectionDensity = "comfortable" | "compact";

export interface CollectionContextValue {
  mode: InteractionMode;
  density: CollectionDensity;
}

/** null = hors collection : Card retombe sur ses propres défauts (static / comfortable). */
export const CollectionContext = React.createContext<CollectionContextValue | null>(null);

export function useCollectionContext(): CollectionContextValue | null {
  return React.useContext(CollectionContext);
}
