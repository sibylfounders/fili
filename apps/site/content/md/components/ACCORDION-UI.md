---
component: accordion
layer: ui
type: component
version: 1.0.0 # 1.0.0 : première rédaction — mapping tokens. Aucun token neuf : en-tête au survol `surface-hover`, `radius.md`, chevron `icon.sm`/`icon.md`, dépliage `motion.base`, séparateur `border`. Cf. ACCORDION-UX.md.
last_updated: 2026-07-24
companion: ACCORDION-UX.md
confidence: mixed
---

# Accordion — Couche UI (tokens)

> Mapping des contextes de ACCORDION-UX.md sur les tokens. Aucune valeur brute.

## En-tête

RÈGLE : l'en-tête a un padding pris dans `spacing`, un rayon `radius.md` sur son fond de survol
(`surface-hover`), un texte `text-primary`. Le **chevron** est une icône `icon.sm` (ou `icon.md`) en
`currentColor` (couleur `text-muted`/`text-secondary`), qui **pivote** à l'ouverture via `transform` +
`motion.base` / `motion.ease-in-out`. Anneau de focus = BORDER (`border.focus-width` / `border.focus-offset`).

## Région

RÈGLE : la région ouverte a un padding `spacing` ; un **séparateur** entre sections, si nécessaire, est un
trait `border` — mais l'**espace d'abord** (renvoi SPACING/BORDER : le trait en dernier recours). Le
dépliage anime la hauteur en `motion.base`, `prefers-reduced-motion` respecté (bascule instantanée).

## Frontières

RÈGLE : aucune couleur, rayon ou durée codés en dur : tout référence `spacing.*`, `radius.md`,
`surface-hover`, `text-*`, `icon.*`, `motion.*`, `border`. La cible tactile de l'en-tête respecte 44px
(ACCESSIBILITY).

## Sources et niveau de confiance (couche UI)
| Affirmation | Source | Confiance |
|---|---|---|
| Chevron qui pivote comme indicateur d'état, animé en motion | convergence des systèmes | Établi par convergence |
| Espace avant le trait pour séparer les sections | SPACING-UX / BORDER-UX (guardrail) | Établi (interne) |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec les fondations voisines).*
