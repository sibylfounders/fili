---
component: grid
layer: ui
type: foundation
version: 1.2.0 # 1.2.0 : tokens des régions du shell (rail-nav, rail-tools) et mapping des seuils (off-canvas nav = breakpoint.tablet, repli outils = breakpoint.desktop). Le comportement overlay d'une région hors flux reste au sujet overlay/drawer (hors périmètre). Valeurs : DESIGN.md 1.29.0. Cf. DECISIONS.md 2026-07-24. 1.1.0 : renvoi gouttières → pattern collection (clause levée le 2026-07-21, cf. DECISIONS.md) ; grid.item-min vit dans DESIGN.md pour COLLECTION-UI. 1.0.0 : première rédaction — mapping des largeurs de conteneur et des marges de page. Valeurs dans DESIGN.md 1.18.0 (groupe grid). Cf. DECISIONS.md 2026-07-16.
last_updated: 2026-07-21
companion: GRID-UX.md
confidence: mixed
---

# Grille & layout — Couche UI (tokens)

> Ce fichier mappe les contextes de GRID-UX.md sur les tokens. Toutes les valeurs vivent dans
> `DESIGN.md` (`grid.*`) et `tokens.yaml` ; aucune valeur brute ici. Les marges et gouttières ne sont
> pas des tokens propres à la grille : ce sont des tokens `spacing` réutilisés.

## Largeurs de conteneur

Trois crans, tous en `max-width` (le conteneur peut être plus étroit que sa borne, jamais plus large) :

```yaml
container:
  narrow:  grid.container-narrow    # formulaire, auth, création de compte — mono-colonne focalisée
  default: grid.container-default   # page de contenu ou d'app à colonne unique
  wide:    grid.container-wide       # dashboard, collection, tableau large
```

RÈGLE : un conteneur borné applique en `max-width` l'un des trois tokens (`grid.container-narrow`, `grid.container-default`, `grid.container-wide`) **et** `margin-inline: auto` (centrage).
Jamais de largeur en dur, jamais un `breakpoint.*` employé comme largeur.

RÈGLE : le choix du cran suit le contexte de GRID-UX (narrow/default/wide), pas l'esthétique — un
formulaire reste `narrow` même s'il « aurait de la place » en `default`.

## Marges de page (tokens spacing, pas grid)

RÈGLE : la marge entre le conteneur et le bord de la fenêtre est un padding horizontal pris dans
l'échelle `spacing` :

```yaml
page_margin:
  mobile:  spacing.md   # régime étroit — sous breakpoint.mobile
  desktop: spacing.lg   # régime large — au-dessus de breakpoint.mobile
```

RÈGLE : sous `breakpoint.mobile`, le conteneur est en pleine largeur moins `page_margin.mobile` de chaque
côté ; le `max-width` ne mord pas (le contenu n'atteint pas encore la borne).

## Full-bleed

RÈGLE : un élément full-bleed retire le `max-width` et la marge (largeur = 100 % de la fenêtre) ; le
contenu lisible/actionnable à l'intérieur se re-borne sur l'un des trois tokens `grid.container-narrow`/`grid.container-default`/`grid.container-wide`.

## Gouttière de colonnes

RÈGLE : **toujours aucun token de gouttière ici** — la grille de colonnes vit dans le pattern
collection (COLLECTION-UI.md) depuis le 2026-07-21, et ses gouttières sont bien des tokens `spacing`
(mapping par densité), comme le cadrage SPACING l'exigeait. Seule `grid.item-min` (largeur minimale
d'un item de grille intrinsèque) a rejoint le groupe `grid` de DESIGN.md.

## Implémentation

- `max-width` en `grid.container-narrow`/`grid.container-default`/`grid.container-wide` ; centrage par marges automatiques ; padding horizontal en
  `spacing.md`/`spacing.lg` selon le régime.
- Aucune largeur ni marge codée en dur, même pour une exception : toute exception remonte au design system.
- Un conteneur imbriqué n'ajoute ni `max-width` ni marge de page : il hérite de la largeur du parent.

## Shell applicatif — tokens des régions

Trois régions ; les deux rails ont une largeur fixe en token, le contenu prend le reste :

```yaml
shell:
  rail-nav:   grid.rail-nav     # rail de navigation (début)
  rail-tools: grid.rail-tools   # rail d'outils (fin)
  content:    (espace restant)  # y applique grid.container-narrow / grid.container-default / grid.container-wide comme une page mono-colonne
seuils:
  off-canvas-nav: breakpoint.tablet    # sous 1024 : rail de nav en off-canvas
  repli-outils:   breakpoint.desktop   # sous 1280 : rail d'outils en panneau invocable
```

RÈGLE : les rails appliquent `grid.rail-nav` / `grid.rail-tools` en largeur fixe (`flex: 0 0 <token>`), jamais
un pourcentage ; la colonne de contenu est l'élément flexible et applique en son sein l'un des `grid.container-narrow / grid.container-default / grid.container-wide`.

RÈGLE : les seuils de bascule sont des `breakpoint.*`, jamais une largeur en dur — `breakpoint.desktop` fait
sortir le rail d'outils du flux, `breakpoint.tablet` fait sortir le rail de nav (dans cet ordre).

RÈGLE : une région hors flux (panneau invocable) relève du registre overlay (`elevation.overlay`, scrim, focus
trap, scroll-lock) — comportement NON porté par la grille ; cf. sujet overlay/drawer (hors périmètre à cette date).

RÈGLE : la **marge de page** interne à la colonne de contenu reste celle du cadre de page (`spacing.md`/`spacing.lg`
selon le régime) ; chaque rail a son propre padding (`spacing`), il n'hérite pas de la marge de page.

## Sources et niveau de confiance (couche UI)
| Affirmation | Source | Confiance |
|---|---|---|
| `max-width` + marges auto pour borner et centrer un conteneur | [GOV.UK — Layout](https://design-system.service.gov.uk/styles/layout/) (`govuk-width-container`, max ~1020 px centré) | Établi |
| Marges/paddings de page pris dans l'échelle d'espacement | [Carbon — 2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/) (marges 16-24 px, mini-unit de 8 px), [Material — Layout](https://m2.material.io/design/layout/understanding-layout.html) (marges adaptatives) | Établi par convergence |
| Valeurs exactes des trois conteneurs (480 / 1024 / 1440 px) | Arbitrage interne, calé sur la grille de 8 px et la fourchette des systèmes majeurs | Non formalisé — ajustable sur besoin réel |
| Rails à largeur fixe + contenu flexible dans un shell | [Carbon — UI Shell](https://carbondesignsystem.com/), convergence des shells d'app | Établi par convergence |
| Largeurs de rails et seuils du shell (grid.rail-nav, grid.rail-tools, breakpoint.tablet, breakpoint.desktop) | Arbitrage interne, aligné sur la grille de base | Non formalisé — ajustable |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec l'échelle
8 px et les régimes responsive du système) plutôt que sur une étude chiffrée.*
