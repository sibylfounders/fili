---
component: overlay
layer: ui
type: foundation
version: 1.0.0 # 1.0.0 : première rédaction — mapping des tokens de la couche superposée (z-index, scrim) et grammaire d'application (position, inertie, scroll-lock, focus). Valeurs dans DESIGN.md 1.30.0 (groupes z-index et overlay). Cf. OVERLAY-UX.md, DECISIONS.md 2026-07-24.
last_updated: 2026-07-24
companion: OVERLAY-UX.md
confidence: mixed
---

# Overlay — Couche UI (tokens)

> Ce fichier mappe les contextes de OVERLAY-UX.md sur les tokens. Toutes les valeurs vivent dans `DESIGN.md`
> (`z-index.*`, `overlay.scrim`) et `tokens.yaml` ; aucune valeur brute ici. L'ombre est un token ELEVATION,
> les durées un token MOTION.

## Ordre d'empilement

Cinq crans, appliqués en `z-index` — jamais un entier codé en dur :

```yaml
z-index:
  sticky:  z-index.sticky    # 100  — en-tête, rails sticky du shell (dans le flux)
  overlay: z-index.overlay   # 1000 — scrim + surface d'un superposé MODAL (drawer, modale)
  popover: z-index.popover   # 1100 — superposé NON-MODAL ancré (dropdown, menu, popover)
  toast:   z-index.toast     # 1200 — notifications éphémères (toast)
  tooltip: z-index.tooltip   # 1300 — la couche la plus haute
```

RÈGLE : la **surface** d'un superposé modal applique `z-index.overlay` ; son **scrim** vit dans la même
couche, placé **avant** la surface dans le DOM (rendu derrière). Un superposé non-modal ancré applique
`z-index.popover`.

## Voile (scrim)

RÈGLE : le voile d'un superposé modal est un plan plein `overlay.scrim` couvrant la fenêtre
(`position: fixed`, inset 0), sous la surface. Aucun superposé non-modal ne pose de scrim.

## Ombre et surface

RÈGLE : la surface d'un superposé porte l'ombre `elevation.overlay` (jamais `raised`, réservé au survol
cliquable) et un rayon `radius.md` ; elle repose sur `background`. Overlay **consomme** ces tokens, il n'en
crée aucun.

## Focus, inertie, défilement

RÈGLE : à l'ouverture d'un superposé **modal**, le fond reçoit `inert` (ou `aria-hidden`) — non focalisable,
invisible au lecteur d'écran — et le défilement du document est **verrouillé** (le fond ne défile pas sous la
surface). À la fermeture, l'inertie et le verrou sont **retirés** et le focus **revient au déclencheur**.

RÈGLE : le **focus ring** d'un contrôle à l'intérieur d'un superposé reste celui de BORDER
(`border.focus-width` / `border.focus-offset`) — overlay ne redéfinit pas le ring.

## Mouvement

RÈGLE : l'entrée/sortie utilise une durée MOTION (grande surface → `motion.slow`), l'ombre s'anime en
opacité (`elevation.overlay`), et l'ensemble respecte `prefers-reduced-motion` (pas de glissement si réduit).

## Frontières

RÈGLE : aucune valeur d'empilement, d'ombre, de rayon, de durée ou de couleur n'est écrite en dur : tout
référence `z-index.*`, `overlay.scrim`, `elevation.overlay`, `radius.md`, `motion.*`, `border.*`. Le toast
conserve ses propres règles d'empilement et n'emprunte à overlay que le cran `z-index.toast`.

## Sources et niveau de confiance (couche UI)
| Affirmation | Source | Confiance |
|---|---|---|
| Fond `inert` + verrouillage du défilement pour un modal | [ARIA APG — Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Établi |
| Crans z-index espacés, ordonnés par type de couche | [Microsoft Atlas — Z-index](https://design.learn.microsoft.com/tokens/z-index.html) | Établi par convergence |
| Valeurs exactes des crans et opacité du scrim | Arbitrage interne (DESIGN.md 1.30.0) | Non formalisé — ajustable |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec les fondations voisines).*
