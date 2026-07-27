---
component: tabs
layer: ui
type: component
version: 1.0.0 # 1.0.0 : première rédaction — mapping tokens. Aucun token neuf : trait courant `color.primary`, poids `typography.display.fontWeight`, pastille `radius.pill` + `elevation.raised`, transitions `motion.fast`/`motion.ease-out`, anneau de focus = BORDER. Cf. TABS-UX.md et packages/react/src/components/tabs/tabs.tsx.
last_updated: 2026-07-26
companion: TABS-UX.md
confidence: mixed # le mapping suit les tokens déjà établis par BUTTON/LINK/ACCORDION ; l'état disabled n'a pas de token de couleur dédié (dette assumée, cf. BUTTON-UI.md).
---

# Tabs — Couche UI (tokens)

> Mapping des contextes de TABS-UX.md sur les tokens et sur l'API réelle
> (`packages/react/src/components/tabs/tabs.tsx`). Aucune valeur brute.

## Structure ARIA et API

RÈGLE : la structure est `Tabs.Root` (contexte + valeur contrôlée/non contrôlée) > `Tabs.List`
(`role="tablist"`, `aria-orientation="horizontal"`) > `Tabs.Tab` (`role="tab"`) et, en frère,
`Tabs.Panel` (`role="tabpanel"`). `Tabs.List` porte une prop `label` **obligatoire** — l'étiquette
annoncée au lecteur d'écran (`aria-label`) ; aucun jeu d'onglets ne s'affiche sans elle.

RÈGLE : `Tabs.Root` accepte `value`/`onValueChange` (contrôlé) ou `defaultValue` (non contrôlé) —
jamais les deux logiques mélangées. Sans valeur initiale, **le premier `Tabs.Tab` monté** s'auto-
sélectionne (renvoi TABS-UX § Onglet par défaut). `variant` vaut `"line"` ou `"pill"` ;
`activation` vaut `"auto"` (défaut) ou `"manual"` (renvoi TABS-UX § Activation).

RÈGLE : `Tabs.Tab` et `Tabs.Panel` partagent le même `value` — l'implémentation dérive
`id`/`aria-controls`/`aria-labelledby` de ce `value` et d'un `baseId` unique (`React.useId`),
jamais codés en dur. `Tabs.Panel` accepte `keepMounted` (défaut `false` : démonté quand non
courant — renvoi TABS-UX § Volet démonté ou masqué).

## Tablist

RÈGLE : le conteneur défile horizontalement (`overflow-x-auto`) — jamais de retour à la ligne
(renvoi TABS-UX § Débordement). Variante `line` : séparateur bas en `color.border` (rôle
délimitante douce, pas de seuil de contraste requis — groupement), espacement entre onglets en
`spacing.lg`. Variante `pill` : piste en `color.background`, bordure `color.border`, rayon
`radius.pill`, padding interne `3px`, espacement entre onglets `spacing.xs` (`gap-0.5`).

## Onglet (`Tabs.Tab`) — états

| État | Texte | Fond / trait porteur | Poids |
|---|---|---|---|
| Repos | `color.text-secondary` | `line` : trait bas transparent · `pill` : aucun fond | normal |
| Survol | `color.text-primary` | `line` : trait bas `color.border-strong` (hover) | normal |
| Courant | `color.text-primary` | `line` : trait bas `color.primary` · `pill` : fond `color.surface` + `elevation.raised` | `typography.display.fontWeight` (renforcé) |
| Focus (clavier) | inchangé | anneau `border.focus-width` / `border.focus-offset` en `color.accent`, extérieur à la boîte (BORDER-UI) | inchangé |
| Désactivé | CONFIANCE : non formalisé — arbitrage à remonter (aucun token `text-disabled` dans DESIGN.md ; dette assumée comme `disabled` de BUTTON-UI.md) | — | — |

RÈGLE : le texte de l'onglet suit `typography.body` ; la variante `line` compose en corps réduit
(cran `sm`), la variante `pill` en corps compact (cran `xs`) — même famille, même graisse de base,
seul le cran de taille change avec la densité du motif. Le padding horizontal/vertical de l'onglet
vient de `spacing.sm` (`line`) et `spacing.md`/`1.5` (`pill`) — jamais une valeur en pixels codée
dans le composant.

RÈGLE : le **canal non chromatique** de l'onglet courant (renvoi TABS-UX) est porté par la paire
`typography.display.fontWeight` (poids) + trait/fond porteur (`color.primary` en `line`,
`elevation.raised` en `pill`) — deux signaux, jamais la couleur du texte seule.

RÈGLE : les transitions (couleur du texte, trait) utilisent `motion.fast` / `motion.ease-out` — un
petit changement d'état est un feedback court (renvoi MOTION-UI). L'anneau de focus n'est **jamais**
animé (BORDER-UI, MOTION-UX § ce qui ne s'anime pas).

## Volet (`Tabs.Panel`)

RÈGLE : le volet est focalisable (`tabindex="0"`) — il reçoit donc un anneau de focus visible à
l'arrivée au clavier, y compris vide (BORDER-UI documente explicitement cette exception : un panneau
d'onglet `tabindex="0"` **n'est pas** une cible de focus programmatique masquée, l'anneau reste dû).
Le volet non courant est masqué par l'attribut natif `hidden` quand `keepMounted` est actif, ou
simplement absent du DOM sinon.

## Frontières — aucune valeur en dur

RÈGLE : tout référence un token existant : couleurs par rôle (`color.text-secondary`,
`color.text-primary`, `color.primary`, `color.border`, `color.border-strong`, `color.surface`,
`color.background`, `color.accent`), espacement (`spacing.xs`, `spacing.sm`, `spacing.md`,
`spacing.lg`), rayon (`radius.pill`), relief (`elevation.raised`), mouvement (`motion.fast`,
`motion.ease-out`), focus (`border.focus-width`, `border.focus-offset`), typographie
(`typography.body`, `typography.display.fontWeight`). Aucune couleur, durée ou rayon n'est écrit en
clair dans le composant.

## Sources et niveau de confiance (couche UI)
| Affirmation | Source | Confiance |
|---|---|---|
| `label` obligatoire sur la tablist (nom accessible du groupe) | [ARIA APG — Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | Établi |
| Anneau de focus dû sur un tabpanel `tabindex="0"`, même vide | `BORDER-UI.md` § Focus ring — exception cible programmatique | Établi (interne) |
| Poids + trait/fond comme canal non chromatique de l'onglet courant | convergence avec `LINK-UI.md` (état courant de navigation) | Établi par convergence |
| Absence de token `text-disabled` — dette assumée | `BUTTON-UI.md` (« disabled … dette assumée tant qu'un besoin réel ne l'a pas fait émerger ») | Non formalisé |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec les fondations voisines).*
