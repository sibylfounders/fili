---
component: switch
layer: ui
type: component
version: 1.0.0 # 1.0.0 : première rédaction — mapping tokens. Aucun token neuf : piste en `radius.pill`, états en `color`, glissement du pouce en `motion.base`, anneau `border`, cible tactile 44px (ACCESSIBILITY). Cf. SWITCH-UX.md.
last_updated: 2026-07-24
companion: SWITCH-UX.md
confidence: mixed
---

# Switch — Couche UI (tokens)

> Mapping des contextes de SWITCH-UX.md sur les tokens. Aucune valeur brute : la géométrie est relationnelle
> (le pouce est un disque inscrit dans la piste), les couleurs et le mouvement viennent des fondations.

## Piste et pouce

RÈGLE : la **piste** est une pilule (`radius.pill`) ; le **pouce** est un disque inscrit, séparé des bords
par un retrait constant. **Off** : piste `surface` bordée `border-strong` (elle délimite un contrôle
interactif : 3:1), pouce `background`. **On** : piste `primary`, pouce `on-primary`. La transition du pouce
et du fond suit `motion.base` / `motion.ease-in-out` (mouvement sur place).

RÈGLE : l'anneau de focus est celui de BORDER (`border.focus-width` / `border.focus-offset`) ; l'état
désactivé abaisse l'opacité sans changer le trait ni le rayon.

## Cible tactile

RÈGLE : quelle que soit la taille visuelle de la piste, la **zone interactive** atteint au minimum 44px
(zone de confort ACCESSIBILITY) — le libellé cliquable y participe.

## Frontières

RÈGLE : aucune couleur, rayon ou durée codés en dur : tout référence `radius.pill`, `color` (`surface`,
`border-strong`, `primary`, `on-primary`, `background`), `motion.base` / `motion.ease-in-out`, `border.*`.
Le déplacement du pouce respecte `prefers-reduced-motion` (bascule instantanée si réduit).

## Sources et niveau de confiance (couche UI)
| Affirmation | Source | Confiance |
|---|---|---|
| Piste pilule + pouce inscrit, états on/off contrastés | convergence des systèmes (Material, Carbon) | Établi par convergence |
| Bordure délimitante d'un contrôle interactif à 3:1 → `border-strong` | BORDER-UX (guardrail) | Établi (interne) |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec les fondations voisines).*
