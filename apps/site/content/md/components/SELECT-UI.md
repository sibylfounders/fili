---
component: select
layer: ui
type: component
version: 1.0.0 # 1.0.0 : première rédaction — mapping tokens du déclencheur et de la liste. Aucun token neuf : hauteur `scale.base`, `radius.md`, `border-strong` (bordure délimitante), `icon.md` (chevron), liste sur `overlay` (elevation.overlay, z-index.popover). Cf. SELECT-UX.md.
last_updated: 2026-07-24
companion: SELECT-UX.md
confidence: mixed
---

# Select — Couche UI (tokens)

> Mapping des contextes de SELECT-UX.md sur les tokens. Aucune valeur brute : le déclencheur est un contrôle
> standard, la liste un superposé non-modal de la fondation `overlay`.

## Déclencheur

RÈGLE : hauteur interactive `scale.base` (compacte `scale.compact`, aérée `scale.expanded`), rayon
`radius.md`, **bordure délimitante `border-strong`** (le select délimite seul un contrôle interactif :
3:1 requis), fond `background`, texte `text-primary` (placeholder `text-muted`), padding pris dans
`spacing`. Le chevron est une icône `icon.md` en `currentColor` (renvoi ICONOGRAPHY).

RÈGLE : l'anneau de focus est celui de BORDER (`border.focus-width` / `border.focus-offset`) ; l'état
désactivé abaisse l'opacité sans changer le trait ni le rayon.

## Liste (popover non-modal)

RÈGLE : la liste applique `z-index.popover`, l'ombre `elevation.overlay`, le rayon `radius.md`, le fond
`background` ; **pas de scrim** (non-modal). Elle est ancrée au déclencheur et alignée sur sa largeur.

RÈGLE : une option a un padding `spacing` ; l'option **active** (survol/clavier) prend `surface-hover` ;
l'option **sélectionnée** est marquée par une **coche** (icône, jamais la seule couleur — canal redondant,
renvoi ACCESSIBILITY/ICONOGRAPHY) et un texte `text-primary`.

## Mouvement

RÈGLE : l'ouverture/fermeture de la liste utilise `motion.base` et respecte `prefers-reduced-motion`
(apparition sans glissement si réduit) ; l'ombre suit `elevation.overlay` (animée en opacité).

## Frontières

RÈGLE : aucune valeur d'empilement, d'ombre, de rayon, de hauteur ou de couleur codée en dur : tout
référence `scale.*`, `radius.*`, `border-strong`, `icon.*`, `z-index.popover`, `elevation.overlay`,
`spacing.*`, `motion.*`, `border.*`. La cible tactile respecte le minimum de 44px (ACCESSIBILITY).

## Sources et niveau de confiance (couche UI)
| Affirmation | Source | Confiance |
|---|---|---|
| Liste ancrée en `elevation.overlay` + `z-index.popover`, sans scrim | fondation `overlay` (OVERLAY-UI) | Établi (interne) |
| Bordure délimitante d'un contrôle interactif à 3:1 → `border-strong` | BORDER-UX (guardrail) | Établi (interne) |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec les fondations voisines).*
