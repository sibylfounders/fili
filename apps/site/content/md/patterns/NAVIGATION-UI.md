---
component: navigation
layer: ui
type: pattern
version: 1.0.0 # 1.0.0 : première rédaction — mapping tokens de l'assemblage. Aucun token neuf : rythme en `spacing`, liens en tokens de LINK, TOC avec repère non chromatique, skip-link visible au focus (BORDER). Cf. NAVIGATION-UX.md.
last_updated: 2026-07-24
companion: NAVIGATION-UX.md
confidence: mixed
---

# Navigation — Couche UI (tokens)

> Mapping de l'assemblage sur les tokens. La navigation ne crée aucun token : elle compose ceux de `link`,
> `accordion`, `spacing` et `border`.

## Nav latérale

RÈGLE : le rythme vertical (entre groupes, entre liens) dérive de `spacing` ; l'indentation d'un sous-niveau
est un cran `spacing`. Les liens appliquent les tokens de `link` (contexte navigation) ; l'état courant y est
porté (renvoi LINK), signalé par un fond `secondary` et/ou un trait, **plus** le poids — jamais la couleur seule.

## Table des matières

RÈGLE : les entrées du TOC sont des liens (`link`, navigation) ; l'entrée active porte un **repère non
chromatique** — un trait latéral (`border`, couleur `primary`) **et** un poids accru — en plus d'`aria-current`.
Espace et retrait viennent de `spacing`.

## Skip-link

RÈGLE : le skip-link est **hors flux visuel** (retiré à l'écran) tant qu'il n'a pas le focus ; **au focus**,
il devient visible — fond `background`, bordure/anneau `border` (`border.focus-width`), rayon `radius.md`,
au-dessus du contenu (`z-index.sticky` au minimum). Il ne doit jamais rester caché **au focus**.

## Frontières

RÈGLE : aucune valeur d'espacement, de couleur ou de trait codée en dur : tout référence `spacing.*`,
`radius.*`, `border*`, et les tokens de `link`. L'off-canvas de la nav applique `overlay` (z-index, scrim),
non redéfini ici.

## Sources et niveau de confiance (couche UI)
| Affirmation | Source | Confiance |
|---|---|---|
| État courant = fond `secondary`/trait + poids, jamais la couleur seule | LINK-UI + WCAG 1.4.1 | Établi (interne) |
| Skip-link visible uniquement au focus, au-dessus du contenu | WCAG 2.4.1, pattern « skip link » | Établi |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec les fondations voisines).*
