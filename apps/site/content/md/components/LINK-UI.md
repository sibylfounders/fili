---
component: link
layer: ui
version: 1.1.0 # 1.1.0 : rattachement nommé à Motion (transition d'état = feedback, focus ring jamais animé) — 2026-07-21. 1.0.0 : première rédaction — mapping inline/standalone/navigation et états sur les tokens existants
last_updated: 2026-07-21
companion: LINK-UX.md
tokens:
  typography:
    font: typography.body
    fallback: typography.fallback.sans
  colors:
    default: color.primary
    hover: color.primary-hover
    visited: color.text-secondary
  focus:
    color: color.accent
    width: border.focus-width
    offset: border.focus-offset
  icon:
    inline: icon.sm
    standalone: icon.md
  motion:
    state: { duration: motion.fast, easing: motion.ease-out }
  axes:
    context: [inline, standalone, navigation]
    icon: [none, leading, trailing, only]
confidence: established
---

# Link — Couche UI

> Tokens et techniques du Link. Le choix Link vs Button, les destinations et le wording vivent dans
> `LINK-UX.md`.

## Contextes de rendu

| Contexte | Rendu |
|---|---|
| `inline` | soulignement visible au repos ; couleur `colors.default` |
| `standalone` | texte + éventuelle icône ; soulignement ou indicateur directionnel constant |
| `navigation` | traitement du groupe de navigation ; état courant non chromatique + sémantique |

RÈGLE : `inline` reste souligné au repos. Le hover peut renforcer l'épaisseur ou le décalage du
soulignement, mais ne doit pas être le moment où le lien devient enfin identifiable.

RÈGLE : `standalone` reste visuellement plus léger qu'un Button. Ajouter une boîte, un fond et des
états de pression équivalents à un Button signifie que le choix du composant doit être réexaminé.

## États

- default : `color.primary`, soulignement selon le contexte ;
- hover : `color.primary-hover`, soulignement maintenu ;
- focus : outline `color.accent`, `border.focus-width`, `border.focus-offset` ;
- active : variation immédiate, sans déplacement de layout ;
- visited : `color.text-secondary` uniquement dans les contextes où l'historique aide.

RÈGLE : le soulignement utilise les propriétés CSS dédiées (`text-decoration-*`) et reste lisible
avec les jambages ; il n'est pas simulé par une border qui traverse les lignes.

RÈGLE : les changements de couleur utilisent `motion.fast`/`motion.ease-out` — la transition d'état
du lien relève de la fonction **feedback** de `MOTION-UX.md` (§ Durées : « petit changement = cran
court »). Sous `prefers-reduced-motion`, la transition peut être supprimée sans perte d'information
(repli conforme à `MOTION-UX.md` § prefers-reduced-motion).

RÈGLE : le focus ring n'est jamais animé — c'est une information de position pour la navigation
clavier, pas un effet (règle partagée `MOTION-UX.md` § Ce qui ne s'anime pas / `BORDER-UX.md`, qui
fait autorité sur le ring).

## Sémantique

RÈGLE : navigation = élément `<a>` avec une destination réelle. Un handler JavaScript peut enrichir
le comportement, pas remplacer `href`.

RÈGLE : destination courante = `aria-current` approprié. Nouveau contexte ou téléchargement =
attributs natifs correspondants et annonce accessible prévue dans LINK-UX.

RÈGLE : un lien étendu de Card suit la technique documentée dans `CARD-UI.md`; les actions internes
restent des siblings, jamais des descendants du lien.

## Icônes et cible

RÈGLE : l'icône inline utilise `icon.sm`; un lien autonome peut utiliser `icon.md`. Le trait et le
dessin suivent `ICONOGRAPHY-UI.md`.

RÈGLE : en `only`, le nom accessible est obligatoire et la zone interactive atteint la cible tactile
commune de 44px sans imposer que le glyphe lui-même soit agrandi.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Soulignement et signal non chromatique des liens inline | [WCAG 2.2 — 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Établi |
| Lien natif avec destination réelle | [HTML Living Standard — Links](https://html.spec.whatwg.org/multipage/links.html) | Normatif |
| `aria-current` pour l'élément courant d'un ensemble | [WAI-ARIA — aria-current](https://www.w3.org/TR/wai-aria-1.2/#aria-current) | Normatif |
| Transition d'état = feedback motion ; focus ring jamais animé | `MOTION-UX.md` (§ Durées / § Ce qui ne s'anime pas), `BORDER-UX.md` | Établi — langage transversal |
