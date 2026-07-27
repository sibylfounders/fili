---
component: gesture
layer: ui
type: language
version: 1.0.0 # 1.0.0 : première rédaction — grammaire technique des gestes : événements pointeur, alternative à pointeur unique, seuils, annulation. Aucun token propre — référence motion.* (durées du retour) et touch.* (tailles des cibles et alternatives).
last_updated: 2026-07-25
companion: GESTURE-UX.md
confidence: mixed
---

# Langage des gestes (gesture) — Couche UI

> Ce fichier traduit `GESTURE-UX.md` en techniques. Langage **comportemental sans token propre** : il
> compose `motion.*` (le retour d'accompagnement du geste) et `touch.*` (les cibles des alternatives).
> Il n'ajoute aucune valeur à `DESIGN.md`.

## Événements et alternative

RÈGLE : implémenter les gestes sur les **Pointer Events** (`pointerdown`/`move`/`up`/`cancel`), qui
unifient souris, doigt et stylet — pas sur des `touchstart`/`mousedown` séparés qui divergent.

RÈGLE : l'action ne se lie **jamais** au seul geste. Le chemin canonique est : un **contrôle natif**
(`<button>`, `<a>`) porte la fonction ; le geste est un **raccourci additionnel** branché par-dessus.
Ainsi l'alternative à pointeur unique (WCAG 2.5.1) et le clavier existent par construction, pas après
coup.

| Geste | Alternative obligatoire (même fonction) |
|---|---|
| Balayer pour supprimer/archiver | bouton d'action révélé ou menu « … » |
| Glisser pour réordonner (drag) | boutons monter/descendre, ou « déplacer vers » |
| Pincer pour zoomer | boutons +/−, double-tap, ou champ de niveau |
| Appui long pour menu contextuel | bouton « … » visible menant au même menu |
| Tirer pour rafraîchir | bouton « rafraîchir » |
| Secouer pour annuler (motion) | bouton « annuler » + réglage pour désactiver |

## Seuil et annulation

RÈGLE : un geste à trajectoire ne s'engage qu'au-delà d'un **seuil** (une distance minimale) qui le
distingue d'un tap ou d'un scroll ; en deçà, l'événement revient au défilement. Le sens dominant
(vertical = scroll, horizontal = geste, ou l'inverse) se décide au premier franchissement et se tient.

RÈGLE : `pointercancel` (le navigateur reprend le pointeur pour défiler) et le relâchement **hors
zone** ramènent l'élément à son état initial via une transition `motion` — l'effet n'est acté qu'au
franchissement du seuil **et** au relâchement dans la zone d'effet (parenté WCAG 2.5.2).

RÈGLE : pendant le geste, n'animer que **`transform`/`opacity`** (le contenu qui suit le doigt) ;
sous `prefers-reduced-motion`, le suivi se réduit à une bascule d'état instantanée — la fonction
demeure, l'accompagnement part (contrat hérité de `MOTION-UI`).

## Cibles des alternatives

RÈGLE : les contrôles-alternatives (le bouton « supprimer » révélé, les boutons +/−) sont des cibles
tactiles comme les autres : ils respectent `touch.target-comfortable` et `touch.target-spacing`
(`TOUCH-UI`). Une alternative trop petite pour être touchée n'est pas une alternative.

## Découvrabilité (technique)

RÈGLE : l'affordant d'un geste est rendu par des moyens **statiques et accessibles** — un « peek »
(un bord visible), une poignée (`::before` avec un motif), un chevron. Il n'est pas porté par une
animation seule (invisible sous reduced-motion) ni par le seul `:hover` (absent au doigt, cf.
`TOUCH-UI`).

RÈGLE : le coach-mark de premier usage est un overlay **non-modal** léger (cf. fondation overlay),
fermé au premier tap, non ré-affiché par défaut.

## Robustesse

RÈGLE : sous `(pointer: coarse)`, les cibles-alternatives sont dimensionnées pour le doigt ; sous
`(hover: none)`, aucun affordant de geste ne dépend du survol.

RÈGLE : un `<div>` rendu « swipable » conserve un rôle et un nom accessibles et ne capte pas les
événements clavier/AT destinés au contrôle natif sous-jacent.

## Vérifiabilité

- Aucun token propre à résoudre (le langage compose `motion.*` et `touch.*`, vérifiés chez leurs
  propriétaires).
- Le comportement gestuel ne se teste pas en statique : les tests qui comptent sont manuels —
  (1) chaque geste a son alternative atteignable au tap **et** au clavier ; (2) `pointercancel` et le
  relâchement hors zone annulent proprement ; (3) sous reduced-motion, le suivi s'efface mais la
  fonction reste.

## Sources et niveau de confiance (couche UI)

| Affirmation | Source | Confiance |
|---|---|---|
| Pointer Events unifient souris/doigt/stylet ; `pointercancel` | [MDN — Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) | Établi |
| Alternative à pointeur unique / sans glisser branchée sur un contrôle natif | [WCAG 2.2 — 2.5.1](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html), [2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | Établi, standard d'accessibilité |
| Retour de geste en `transform`/`opacity`, coupé sous reduced-motion | [web.dev — Animations guide](https://web.dev/articles/animations-guide) ; `MOTION-UI` | Établi + héritage interne |
| Cibles-alternatives dimensionnées au doigt | `TOUCH-UI` (touch.target-comfortable, touch.target-spacing) | Décision interne cohérente |
