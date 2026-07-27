---
component: radius
layer: ux
type: foundation
version: 1.1.0 # 1.1.0 : cran conteneur radius.lg (12px) — sépare le rayon des conteneurs (card/alert) de celui des contrôles ; contradiction pill tranchée (réservé badge/avatar, jamais un contrôle). Stress-test 2026-07-17. 1.0.0 : première rédaction — inventaire et benchmark faits avant livraison ; la plus petite fondation du système, brièveté confirmée par l'inventaire (17 cas)
last_updated: 2026-07-11
companion: RADIUS-UI.md
confidence: mixed # l'échelle croissante avec la taille et l'imbrication concentrique sont convergentes ; l'échelle à 3 crans est un choix interne
---

# Radius — Couche UX (fondation)

> Ce fichier contient le raisonnement : ce que le rayon suit, l'imbrication, le pill. Les valeurs (`radius.sm/md/pill`) vivent dans `DESIGN.md` ; la grammaire d'application vit dans `RADIUS-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE : le radius est une **fondation** — la contrainte transversale la plus courte du système, et c'est une propriété du sujet : trois tokens, quatre règles, aucun axe. L'inventaire (17 cas) confirme que la brièveté n'est pas un trou de couverture.

RÈGLE : le rayon est une propriété d'**identité**, pas d'état : il ne change jamais entre repos/hover/focus/error, et il ne porte aucun sens sémantique. Ce qu'il suit, c'est la **taille du composant**.

## Le rayon suit la taille — pas l'importance, pas la proportion

RÈGLE : **le cran suit la taille ET le type (contrôle vs conteneur)** : `radius.sm` pour les petites hauteurs (bouton/input sm), `radius.md` pour les **contrôles** de taille standard (bouton/input md-lg), `radius.lg` pour les **conteneurs** (card, alert). C'est la logique croissante convergente des systèmes majeurs (Atlassian : 2px badges → 12px conteneurs → 16px players ; Material : 4 → 28dp), à échelle réduite.

> **Pourquoi le cran conteneur (1.1.0)** : un contrôle et le conteneur qui l'accueille n'ont pas la même échelle de courbure — beaucoup d'identités déclarent explicitement les deux (une maquette du stress-test : carte 16 / contrôle 8). Sans cran conteneur, cette intention était strictement **inexprimable** (un thème ne crée pas de nom). `radius.lg` (12px) la rend exprimable ; l'imbrication reste concentrique (un contrôle md 8px dans une carte lg 12px : interne < externe, jamais d'« oreille »).

RÈGLE : le rayon ne grandit **pas linéairement** avec la taille — le bouton lg garde `radius.md` ("l'agrandir proportionnellement donnerait un effet pilule non désiré", BUTTON-UI). Le rayon est un cran choisi, jamais un pourcentage de la hauteur.

> **Erreur fréquente** : dériver le rayon en % de la hauteur — deux composants voisins de hauteurs différentes ont alors des courbures visiblement dissonantes, et le pill apparaît par accident sur les éléments hauts.

RÈGLE : la cohérence se joue **par taille, pas par composant** : un input md à côté d'un bouton md partagent `radius.md` — les contrôles d'un même formulaire ont la même courbure (BUTTON-UI et INPUT-UI le font déjà, la règle est désormais dite).

## Imbrication — les rayons concentriques

RÈGLE : un coin interne n'est jamais plus rond que le coin externe qui le contient. Cas collé (media d'une carte) : le rayon interne épouse l'externe. Cas concentrique idéal : rayon interne = rayon externe − écart.

RÈGLE : le cas **inversé** existe aussi : un anneau posé *à l'extérieur* (le focus ring) prend rayon du composant **+ offset** — c'est la même géométrie dans l'autre sens, et Atlassian la tokenise exactement ainsi (radius.focus = rayon de base + 2px).

> **Pourquoi** : deux courbes non concentriques créent une "oreille" — un croissant d'espace inégal dans le coin, petit mais immédiatement visible.

## Le pill — provisionné, borné

RÈGLE : `radius.pill` (valeur géante, convention partagée : 999/9999px) est **réservé aux contenus mono-ligne intrinsèques dont la forme EST la pilule** — pastilles, badges, avatars. **Tranché (1.1.0) : un contrôle mono-ligne (bouton, input) ne prend JAMAIS `pill`** — il est mono-ligne mais pas *intrinsèquement pilule*, et suit sa taille (sm/md). « Intrinsèque » qualifie la forme du contenu, pas le simple fait de tenir sur une ligne. Jamais sur un contenu qui peut passer en multiligne : la pilule devient un stade.

RÈGLE : aucun consommateur documenté à ce jour — provision rendue visible (même statut qu'`elevation.overlay`), candidat naturel : badge/tag, dont `typography.label` (Inter, 1.8.0) est l'autre moitié déjà née.

RÈGLE : l'**angle droit n'a pas de token** — décision, pas oubli : rien dans ce système n'est carré par défaut (Carbon fait le choix inverse — esthétique d'identité, pas une norme). Un besoin réel l'ajouterait en un cran `none`.

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Rayons dépareillés dans un même groupe de contrôles | Formulaire visuellement disparate, perçu comme cassé | Moyenne |
| Imbrication non concentrique | "Oreilles" dans les coins, finition perçue dégradée | Moyenne |
| Pill sur multiligne | Forme de stade, lisibilité du contour perdue | Moyenne |
| Rayon dérivé en % de la hauteur | Pill accidentel, courbures dissonantes | Faible à moyenne |
| Rayon qui change à l'état | Le composant semble se déformer | Faible |

## Règle transversale

RÈGLE : **le rayon suit la taille et rien d'autre** — ni l'importance (BUTTON-UX : "large ne veut pas dire important"), ni l'état, ni le goût de l'écran.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Échelle croissante avec la taille du composant | [Atlassian — Radius](https://atlassian.design/foundations/radius) (xsmall badges → xxlarge players), [Material 3 — shape scale](https://m3.material.io/styles/shape/corner-radius-scale) (via [doc Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)), [Polaris — border tokens](https://polaris-react.shopify.com/tokens/border) | Établi — convergence des trois échelles |
| Rayon du focus = rayon de base + offset (concentrique inversé) | [Atlassian — Radius](https://atlassian.design/foundations/radius) (radius.focus tokenisé à base+2px) | Établi chez Atlassian — adopté, cf. BORDER-UI |
| Pill par valeur géante | [Atlassian](https://atlassian.design/foundations/radius) (full 999px, "réservé à l'humain" : avatars), [Polaris](https://polaris-react.shopify.com/tokens/border) (radius-full 9999px) | Établi — convention partagée ; la borne mono-ligne est une formalisation interne |
| Angle droit comme identité possible | [Carbon](https://carbondesignsystem.com/components/tag/style/) (esthétique majoritairement carrée, pill réservé au Tag) | Établi chez Carbon — choix inverse du nôtre, cité comme preuve que c'est une décision d'identité |

*L'imbrication concentrique (interne = externe − écart) est une règle de géométrie perceptive répandue dans la littérature de design, sans source normative unique — confiance : convergence.*

## À approfondir

- **Premier consommateur du pill** (badge/tag) : confirmera la borne mono-ligne et rejoindra `typography.label`.
- **Rayon des futurs superposés** (modale, popover) : `radius.lg` (12px) attendu — le cran conteneur né en 1.1.0 est précisément la « montée d'un cran pour les grandes surfaces » qu'Atlassian tokenise (xlarge 12px pour les modales). Plus besoin d'un cran ad hoc le jour venu.
