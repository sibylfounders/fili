---
component: accordion
layer: ux
type: component
version: 1.0.0 # 1.0.0 : première rédaction — besoin réel : regrouper les liens de la nav latérale du shell (2026-07-24) ; disclosure réutilisable au-delà de la nav (FAQ, réglages). Périmètre arbitré : multi-ouvert autorisé (single-open = option, pas la règle). Motif clavier : ARIA APG « accordion/disclosure ». Cf. DECISIONS.md 2026-07-24.
last_updated: 2026-07-24
companion: ACCORDION-UI.md
confidence: mixed # le motif disclosure (en-tête bouton + région, aria-expanded) est établi (ARIA APG) ; le défaut multi-ouvert est un arbitrage interne (convergent).
---

# Accordion — Couche UX (composant)

> Un **disclosure** : un en-tête révèle ou masque une région de contenu. Un **accordion** est un ensemble
> de disclosures empilés. Réutilisable — la nav latérale du shell n'est qu'un usage parmi d'autres.

## Nature et périmètre

RÈGLE : chaque section a un **en-tête cliquable** (un `button`) qui **révèle/masque** sa région. Le contenu
masqué n'est **pas détruit** — le rouvrir retrouve l'état ; rien n'est perdu à la fermeture.

RÈGLE : **plusieurs sections peuvent être ouvertes à la fois** (multi-ouvert par défaut). Le **single-open**
(ouvrir une section referme les autres) est une **option**, pas la règle — l'imposer cache du contenu et
surprend dans une navigation.

## Clavier et rôle (ARIA APG)

RÈGLE : l'en-tête est un `button` avec `aria-expanded` (true/false) et `aria-controls` vers sa région ; la
région porte `aria-labelledby` renvoyant à l'en-tête. **Entrée / Espace** basculent. Quand les en-têtes
structurent la page, chaque en-tête est **enveloppé dans un titre** (`h2`-`h6`) de niveau cohérent.

RÈGLE : l'ouverture d'une section **ne vole pas le focus** et ne déplace pas la page sous le pointeur ; le
focus reste sur l'en-tête activé. Aucun **piège de focus** — Tab entre et sort librement (ce n'est pas un modal).

## Signal d'état — jamais la seule couleur

RÈGLE : l'état ouvert/fermé se lit à un **indicateur non chromatique** (chevron qui pivote, +/−), pas à la
seule couleur (renvoi ACCESSIBILITY, ICONOGRAPHY). Le chevron **tourne** pour marquer l'ouverture.

## Mouvement

RÈGLE : le dépliage/repliage anime la **hauteur** en `motion.base` / `motion.ease-in-out` (mouvement sur
place) et **respecte `prefers-reduced-motion`** — bascule instantanée si réduit, jamais de perte de contenu.

## Frontières

RÈGLE : le **chevron** relève d'`iconography` ; les **durées/courbes** de `motion` ; un **lien** dans une
région relève de `link` ; l'**anneau de focus** de `border` ; le **mot** d'un en-tête de `voice`. Un
disclosure **modal** (qui recouvre et piège) n'est pas un accordion : c'est un superposé (`overlay`).

## Sources et niveau de confiance (couche UX)
| Affirmation | Source | Confiance |
|---|---|---|
| En-tête `button` + `aria-expanded` + région `aria-labelledby` ; Entrée/Espace basculent | [ARIA APG — Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | Établi |
| Multi-ouvert par défaut, single-open optionnel | Convergence des systèmes (Carbon, GOV.UK details) | Convergent |
| État par indicateur non chromatique (chevron), pas la couleur | WCAG 1.4.1 (renvoi ACCESSIBILITY) | Établi |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence interne, ergonomie).*
