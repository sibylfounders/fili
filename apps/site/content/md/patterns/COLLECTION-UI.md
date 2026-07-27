---
component: collection
layer: ui
type: pattern
version: 1.0.0 # 1.0.0 : première rédaction — mapping tokens/techniques du pattern collection. Un seul token nouveau : grid.item-min (DESIGN.md 1.27.0). Gouttières = tokens spacing (cadrage SPACING respecté) ; autorité du gap transférée depuis CARD-UI (DECISIONS.md 2026-07-21).
last_updated: 2026-07-21
companion: COLLECTION-UX.md
confidence: mixed
---

# Collection — Couche UI (tokens et techniques)

> Ce fichier mappe les règles de `COLLECTION-UX.md` sur les tokens et les techniques. Toutes les valeurs vivent dans `DESIGN.md` / `tokens.yaml` ; **un seul token est né avec ce pattern** (`grid.item-min`, DESIGN.md 1.27.0) — tout le reste compose l'existant. Les tokens internes d'une carte (padding, slot_gap, ratio) restent dans `CARD-UI.md`.

## Grille intrinsèque (régime items homogènes)

RÈGLE : la grille de référence tient en une déclaration — colonnes émergentes, sans media query :

```css
.collection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--grid-item-min)), 1fr));
  gap: var(--collection-gap);
}
```

- `--grid-item-min` ← `grid.item-min` (valeur unique du pattern, définie dans DESIGN.md — 64 × la grille de base ; arbitrée le 2026-07-21).
- `min(100%, …)` : dans un conteneur plus étroit que l'item minimal (sidebar, split), la grille passe à une colonne au lieu de déborder — jamais de scroll horizontal accidentel.
- **`auto-fill`, jamais `auto-fit`** : la dernière rangée incomplète garde la largeur d'item ; `auto-fit` étirerait les derniers items (déformation interdite par la couche UX).

RÈGLE : sous `breakpoint.mobile`, colonne unique pleine largeur (moins la marge de page `GRID-UI`) — le comportement émerge déjà de `min(100%, …)` dans la plupart des cas ; la media query n'est ajoutée que si un item plus étroit que `grid.item-min` doit malgré tout occuper toute la largeur.

## Gouttières (tokens spacing, pas grid)

RÈGLE : une seule valeur de gouttière par collection (colonnes ET rangées), appareillée à la densité `CARD` :

```yaml
collection_gap:
  comfortable: spacing.lg   # collections aérées (galerie, catalogue)
  compact:     spacing.md   # dashboards denses, listes d'admin
```

RÈGLE : **transfert d'autorité** — `CARD-UI.md` portait `grid_gap: spacing.md` en attente de propriétaire ; cette ligne est désormais un alias de compatibilité qui renvoie ici (CARD-UI 1.5.1, journalisé). Aucune valeur ne change pour l'existant : `compact` reprend `spacing.md`.

## Cadre et zone de collection

RÈGLE : le conteneur de page d'une collection est `grid.container-wide` (max-width + centrage — `GRID-UI` fait autorité) ; la grille remplit ce cadre, elle ne se re-borne pas.

RÈGLE : la zone de collection (grille + barre d'outils + compteur) peut se poser sur le fond `surface` (token calibré précisément pour la distinction zone de collection / carte, cf. DESIGN.md 1.3.0) avec un padding `spacing.lg` ; les cartes gardent leur fond `background`.

## Régime composé (dashboard)

RÈGLE : grille explicite à colonnes égales, spans en cellules entières :

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(var(--dashboard-cols), 1fr); /* --dashboard-cols : choisi par le contenu, cf. UX */
  gap: var(--collection-gap);
}
.widget--large { grid-column: span 2; }  /* toujours des cellules entières */
```

RÈGLE : mêmes gouttières que le régime homogène ; un widget ne définit jamais sa propre marge externe (la grille possède l'espace entre widgets).

## Croissance et stabilité

RÈGLE : « Charger plus » est un `BUTTON` secondary, centré sous la grille, dans le flux (jamais flottant) ; pendant le chargement il suit le cycle de soumission (état en cours, anti-double-clic — `BUTTON`/`FORM`).

RÈGLE : les squelettes occupent un **nombre de cellules fixe** (une rangée pleine au minimum) et les cellules réelles les remplacent en place — aucun layout shift mesurable (la grille ne change pas de hauteur au remplacement d'une rangée complète).

RÈGLE : le compteur de résultats est une région live polie :

```html
<p class="collection-compteur" aria-live="polite">42 résultats</p>
```

— une seule région live par collection (le compteur), jamais la grille entière (annonce chaque carte = bruit).

## Implémentation

- Aucune largeur de colonne, gouttière ou hauteur codée en dur ; `grid.item-min` est la seule dimension propre au pattern.
- Ordre DOM = ordre visuel ; aucune propriété `order` pour « remonter » un item (l'ordre se décide dans les données).
- Balisage liste (`ul/li` ou `role="list"`) sur la grille — cf. sources a11y de `CARD`.
- `prefers-reduced-motion` : remplacement sans transition lors d'un tri/filtre (cf. UX).

## Sources et niveau de confiance (couche UI)

| Affirmation | Source | Confiance |
|---|---|---|
| `repeat(auto-fill, minmax(min(100%, X), 1fr))` — grille intrinsèque robuste aux conteneurs étroits | [web.dev — One-line layouts (RAM)](https://web.dev/articles/one-line-layouts), [MDN — repeat()](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat) | Établi — technique standard |
| `auto-fill` vs `auto-fit` (dernière rangée non étirée) | [MDN — auto-fill/auto-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout) | Établi |
| Région live polie pour un compteur mis à jour | [MDN — ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) | Établi — mécanique à éprouver à la première implémentation (cf. UX) |
| Valeur de `grid.item-min` (fixée dans DESIGN.md) et mapping des gouttières | Arbitrage interne du 2026-07-21 — 64 × la grille de base, dans la fourchette des largeurs de carte observées | Non formalisé — à éprouver, ajustable sur besoin réel |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec l'échelle de la grille de base et les régimes du système) plutôt que sur une étude chiffrée.*
