---
component: interaction
layer: ui
type: language
version: 1.1.0 # 1.1.0 : Interaction devient un langage de premier niveau, distinct des fondations qu'il compose. 1.0.0 : première rédaction — grammaire technique d'affordance ; compose les tokens existants sans créer un thème d'effets
last_updated: 2026-07-20
companion: INTERACTION-UX.md
tokens:
  action:
    boundary: color.border-strong
    hover_surface: color.surface-hover
    press_duration: motion.fast
  receptive:
    boundary: color.border-strong
    background: color.background
  surface:
    rest_shadow: elevation.none
  focus:
    width: border.focus-width
    offset: border.focus-offset
  state_motion:
    duration: motion.fast
    easing: motion.ease-out
confidence: mixed
---

# Langage d'interaction — Couche UI

> Ce fichier traduit `INTERACTION-UX.md` en grammaire de rendu. Il **compose** les tokens existants ;
> il n'ajoute ni ombre de bouton, ni gradient, ni valeur brute à `DESIGN.md`.

## Matrice de rendu

| Rôle | Repos | Réaction | Ne doit pas devenir |
|---|---|---|---|
| Action (Button) | forme et limite perceptibles selon son style | hover/active/focus distincts | texte de navigation ambigu |
| Navigation (Link) | texte identifiable comme lien, inline souligné | soulignement/contraste/focus renforcés | faux bouton d'action |
| Saisie (Input) | zone réceptive délimitée + label visible | bordure d'état + focus ring | surface élevée |
| Information (Card statique) | containment calme, `elevation.none` | aucune réaction de clic | contrôle sans cible |
| Card cliquable | cible réelle + différence au hover/focus | `elevation.raised` autorisé au hover | `div onclick` |
| Superposition | séparation de couche | `elevation.overlay` selon ELEVATION | importance rendue par l'ombre |

## Contrat des états

RÈGLE : la présence au repos précède le feedback. Un hover ne sert pas à révéler une cible qui semblait
statique ; il confirme une cible déjà reconnaissable.

RÈGLE : les transitions d'état utilisent `motion.fast` et `motion.ease-out`. Elles portent sur des
propriétés sobres ; sous `prefers-reduced-motion`, le changement reste visible mais devient instantané.

RÈGLE : l'état `active` peut réduire un décalage ou une ombre **déjà justifiée** pour donner une
sensation de pression. Il ne crée pas une nouvelle ombre de repos et ne déplace jamais le layout.

RÈGLE : le focus utilise la géométrie `border.focus-width` + `border.focus-offset`. Sa couleur est
définie par le composant propriétaire ; aucun effet tactile ne le remplace.

RÈGLE : `disabled` conserve la forme et le rôle perceptibles. La baisse de contraste ne doit pas
faire disparaître la limite au point de confondre le contrôle avec le contenu.

## Composition autorisée

- **Limite** : bordure ou fond issus des tokens du composant ; `color.border-strong` quand la
  délimitation porte seule l'identification.
- **Surface d'état** : `color.surface-hover` ou le token sémantique de hover appartenant au composant.
- **Profondeur** : uniquement selon `ELEVATION-UI.md` ; aucune ombre de repos ajoutée ici.
- **Mouvement** : `motion.fast` pour hover/press/focus ; techniques de `MOTION-UI.md`.
- **Focus** : `outline` et offset selon `BORDER-UI.md`, jamais une border qui déplace le contenu.

## Robustesse

RÈGLE : sous `forced-colors`, les bordures, le focus et la sémantique native survivent même si les
fonds, ombres ou reflets sont neutralisés.

RÈGLE : sous `(hover: none)`, aucune information ni action n'est masquée. Le style `:hover` est un
renforcement facultatif.

RÈGLE : une implémentation tactile n'intercepte pas les événements natifs du contrôle et respecte
l'annulation du pointeur documentée dans BUTTON-UX.

## Vérification par composant

- **Button** : action réelle, état de repos reconnaissable, focus indépendant du hover.
- **Link** : destination réelle, soulignement inline, texte explicite, focus visible.
- **Input** : label visible, zone délimitée, erreurs reliées, jamais élevée.
- **Card** : absence d'état interactif si statique ; vrai lien/input si clickable/selectable.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Focus visible et non masqué | [WCAG 2.2 — 2.4.7 Focus Visible](https://www.w3.org/TR/WCAG22/#focus-visible), [2.4.11 Focus Not Obscured](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) | Établi |
| Ne pas dépendre de la couleur seule | [WCAG 2.2 — 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Établi |
| Utiliser les éléments natifs pour leur rôle | [WAI-ARIA Authoring Practices — No ARIA is better than bad ARIA](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) | Établi |
| Matrice visuelle action/réceptacle/surface | Décision interne issue d'INTERACTION-UX.md | À éprouver |
