---
component: touch
layer: ui
type: foundation
version: 1.0.0 # 1.0.0 : première rédaction — grammaire technique de la cible tactile ; crée les tokens touch.* dans DESIGN.md et impose leur consommation par les composants interactifs (min-height/min-width, hit-area, pointer:coarse).
last_updated: 2026-07-25
companion: TOUCH-UX.md
tokens:
  cible:
    plancher: touch.target-min # 24 — plancher AA (WCAG 2.5.8)
    confort: touch.target-comfortable # 44 — cible par défaut au doigt (WCAG 2.5.5 AAA / Apple HIG)
    espacement: touch.target-spacing # 8 — écart minimal entre cibles adjacentes
  application:
    hauteur_mini: touch.target-comfortable # min-height/min-width d'une cible principale
    pointeur_grossier: '@media (pointer: coarse)' # le régime où le confort devient obligatoire
confidence: mixed
---

# Fondation tactile (touch) — Couche UI

> Ce fichier traduit `TOUCH-UX.md` en grammaire de rendu. Il **crée** les tokens `touch.*` dans
> `DESIGN.md` et dit comment un composant les consomme. Les valeurs concrètes vivent dans `DESIGN.md`
> (l'implémentation de référence) ; ce fichier ne cite que les noms de tokens.

## Les tokens

| Token | Rôle |
|---|---|
| `touch.target-min` | plancher absolu d'une cible tactile — niveau AA |
| `touch.target-comfortable` | cible confortable par défaut au doigt — niveau AAA / HIG |
| `touch.target-spacing` | écart minimal entre deux cibles adjacentes |

RÈGLE : aucun composant ne code une taille de cible en dur — il référence un de ces trois tokens.
Un composant qui posait sa propre hauteur minimale « à la main » (36, 40, 48…) la relit désormais
contre `touch.*`.

## Comment un composant consomme la cible

RÈGLE : la cible se garantit par **`min-height` et `min-width`**, pas par la seule hauteur de
contenu. Un bouton dont le texte fait 20 px de haut atteint la cible par le padding **et** par un
`min-height` qui empêche l'écrasement.

RÈGLE : **la zone tactile peut déborder le dessin.** Une icône de `icon.md` (20) se touche dans une
cible de `touch.target-comfortable` (44) — le supplément est du padding, ou une zone étendue
(pseudo-élément, `::before` transparent) qui n'agrandit pas le dessin visible.

RÈGLE : le régime tactile se déclare par **`@media (pointer: coarse)`** (et/ou `(hover: none)`) : sur
pointeur grossier, la cible principale passe à `touch.target-comfortable` et aucune affordance ne
dépend du `:hover`. Sur pointeur fin, une densité plus serrée reste permise, `touch.target-min`
faisant toujours plancher.

## Matrice de consommation par composant

| Composant | Cible visée | Technique |
|---|---|---|
| Button | `touch.target-comfortable` (coarse) | `min-height` ; `sm` peut viser `touch.target-min` **hors** coarse |
| Input / Select | `touch.target-comfortable` (coarse) | `min-height` du champ et du déclencheur |
| Switch / Checkbox | `touch.target-comfortable` | zone tactile étendue autour de la piste, dessin plus petit |
| Icon-only (compact-button, fermeture) | `touch.target-comfortable` | padding ou hit-area ; l'icône reste à `icon.*` |
| Lien inline | exempté (inline) | ne pas gonfler l'interligne ; hors du fil, la cible suit les crans |
| Ligne d'action (nav, liste, toc) | `touch.target-comfortable` | hauteur de ligne + espacement vertical ≥ `touch.target-spacing` |

## Espacement

RÈGLE : deux cibles adjacentes sont séparées d'au moins `touch.target-spacing`. Quand la densité
force `touch.target-min`, l'espacement **n'est pas** optionnel : c'est lui qui, avec la zone de
sécurité de 24 px de WCAG 2.5.8, rend deux petites cibles distinctes.

## Annulation du pointeur

RÈGLE : l'action se lie à l'**événement de relâchement** (`pointerup`/`click`), jamais au
`pointerdown`. Le comportement natif d'un `<button>`/`<a>` le fournit gratuitement : glisser hors de
la cible avant de lever annule. Un contrôle custom qui écoute `pointerdown` pour agir **casse** cette
issue de secours (WCAG 2.5.2) — à proscrire.

## Robustesse

RÈGLE : sous `forced-colors`, la cible garde sa taille (géométrie, pas couleur) — l'agrandissement
ne dépend d'aucun fond ni ombre.

RÈGLE : tailles en unités qui suivent le zoom (le token résout une valeur cohérente au zoom
navigateur) ; jamais une cible figée qui rétrécit relativement au contenu agrandi.

RÈGLE : une cible custom (`div`/`span` rendue interactive) ne réduit pas la surface native attendue
et conserve son rôle et son nom accessibles — la taille ne compense pas une sémantique manquante.

## Vérifiabilité

- `valide-dossier.js` résout les références `touch.*` (groupe ajouté à ses motifs de tokens).
- La taille rendue au doigt ne se teste pas entièrement en statique (comme le `clamp()` typographique
  ou le comportement animé) : les tests qui comptent sont (1) DevTools en émulation tactile — chaque
  cible principale ≥ `touch.target-comfortable` ; (2) `(hover: none)` — aucune fonction masquée ;
  (3) un contrôle custom : l'action part bien du relâchement, pas du contact.

## Sources et niveau de confiance (couche UI)

| Affirmation | Source | Confiance |
|---|---|---|
| `min-height`/`min-width` + hit-area étendue pour la cible tactile | [WCAG 2.2 — 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) ; [Apple HIG — Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures) | Établi |
| Régime tactile via `pointer: coarse` / `hover: none` | [MDN — pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer), [MDN — hover](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover) | Établi |
| Action au relâchement (pointer cancellation) | [WCAG 2.2 — 2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html) | Établi, standard d'accessibilité |
| Consommation par les composants (min-height, hit-area) | Décision interne issue de `TOUCH-UX.md` | À éprouver par tests d'appareil |
