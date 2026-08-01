---
component: radius
layer: ux
type: foundation
version: 1.2.0 # 1.2.0 : `CRITERE` posé sur R03 — l'échelle de rayon devient mesurable sur une feuille de style tierce (2026-07-31). 1.1.0 : cran conteneur radius.lg (12px) — sépare le rayon des conteneurs (card/alert) de celui des contrôles ; contradiction pill tranchée (réservé badge/avatar, jamais un contrôle). Stress-test 2026-07-17. 1.0.0 : première rédaction — inventaire et benchmark faits avant livraison ; la plus petite fondation du système, brièveté confirmée par l'inventaire (17 cas)
last_updated: 2026-07-11
companion: RADIUS-UI.md
confidence: mixed # l'échelle croissante avec la taille et l'imbrication concentrique sont convergentes ; l'échelle à 3 crans est un choix interne
---

# Radius — Couche UX (fondation)

> Ce fichier contient le raisonnement : ce que le rayon suit, l'imbrication, le pill. Les valeurs (`radius.sm/md/pill`) vivent dans `DESIGN.md` ; la grammaire d'application vit dans `RADIUS-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE [RADIUS-R01] : le radius est une **fondation** — la contrainte transversale la plus courte du système, et c'est une propriété du sujet : trois tokens, quatre règles, aucun axe. L'inventaire (17 cas) confirme que la brièveté n'est pas un trou de couverture.
STATUT : note de méthode
SOURCE : interne
ÉNONCÉ : Le radius est une fondation transversale à laquelle le modèle à axes ne s'applique pas ; sa brièveté est une propriété du sujet, pas un défaut de couverture.

RÈGLE [RADIUS-R02] : le rayon est une propriété d'**identité**, pas d'état : il ne change jamais entre repos/hover/focus/error, et il ne porte aucun sens sémantique. Ce qu'il suit, c'est la **taille du composant**.
STATUT : parti pris d'identité
SOURCE : interne
ÉNONCÉ : Le rayon est une propriété d'identité et non d'état : il ne varie jamais entre repos, survol, focus, erreur ou sélection.
MESURE : rayon identique au repos et dans tous les états d'un même composant

## Le rayon suit la taille — pas l'importance, pas la proportion

RÈGLE [RADIUS-R03] : **le cran suit la taille ET le type (contrôle vs conteneur)** : `radius.sm` pour les petites hauteurs (bouton/input sm), `radius.md` pour les **contrôles** de taille standard (bouton/input md-lg), `radius.lg` pour les **conteneurs** (card, alert). C'est la logique croissante convergente des systèmes majeurs (Atlassian : 2px badges → 12px conteneurs → 16px players ; Material : 4 → 28dp), à échelle réduite.
STATUT : parti pris d'identité
SOURCE : S1, S7, S8, S9, S10
ÉNONCÉ : Le cran de rayon se choisit selon la taille et le type du composant, sur une échelle fermée et croissante.
MESURE : chaque composant résout un cran de l'échelle ; aucune valeur de rayon en dur
CRITERE : chaque_valeur("border-radius,border-*-radius") dans(radius.*)

> **Pourquoi le cran conteneur (1.1.0)** : un contrôle et le conteneur qui l'accueille n'ont pas la même échelle de courbure — beaucoup d'identités déclarent explicitement les deux (une maquette du stress-test : carte 16 / contrôle 8). Sans cran conteneur, cette intention était strictement **inexprimable** (un thème ne crée pas de nom). `radius.lg` (12px) la rend exprimable ; l'imbrication reste concentrique (un contrôle md 8px dans une carte lg 12px : interne < externe, jamais d'« oreille »).

RÈGLE [RADIUS-R04] : le rayon ne grandit **pas linéairement** avec la taille — le bouton lg garde `radius.md` ("l'agrandir proportionnellement donnerait un effet pilule non désiré", BUTTON-UI). Le rayon est un cran choisi, jamais un pourcentage de la hauteur.
STATUT : parti pris d'identité
SOURCE : S6
ÉNONCÉ : Le rayon n'est jamais dérivé d'un pourcentage ni d'une fraction de la hauteur : c'est un cran choisi, qui ne croît pas proportionnellement à la taille.
MESURE : aucun rayon exprimé en pourcentage ou calculé depuis la hauteur

> **Erreur fréquente** : dériver le rayon en % de la hauteur — deux composants voisins de hauteurs différentes ont alors des courbures visiblement dissonantes, et le pill apparaît par accident sur les éléments hauts.

RÈGLE [RADIUS-R05] : la cohérence se joue **par taille, pas par composant** : un input md à côté d'un bouton md partagent `radius.md` — les contrôles d'un même formulaire ont la même courbure (BUTTON-UI et INPUT-UI le font déjà, la règle est désormais dite).
STATUT : parti pris d'identité
SOURCE : interne
ÉNONCÉ : Deux contrôles de même taille voisins dans une même composition partagent le même cran de rayon.
MESURE : contrôles de même taille d'un même groupe : même token de rayon

## Imbrication — les rayons concentriques

RÈGLE [RADIUS-R06] : un coin interne n'est jamais plus rond que le coin externe qui le contient. Cas collé (media d'une carte) : le rayon interne épouse l'externe. Cas concentrique idéal : rayon interne = rayon externe − écart.
STATUT : propriété universelle
SOURCE : S5, S12
ÉNONCÉ : Un coin intérieur n'est jamais plus rond que le coin extérieur qui le contient : au contact il épouse le rayon extérieur, à distance il vaut le rayon extérieur moins l'écart.
MESURE : rayon interne ≤ rayon externe ; cas concentrique : rayon interne = rayon externe − écart

RÈGLE [RADIUS-R07] : le cas **inversé** existe aussi : un anneau posé *à l'extérieur* (le focus ring) prend rayon du composant **+ offset** — c'est la même géométrie dans l'autre sens, et Atlassian la tokenise exactement ainsi (radius.focus = rayon de base + 2px).
STATUT : propriété universelle
SOURCE : S5, S2, S7
ÉNONCÉ : Un anneau posé à l'extérieur d'un composant prend pour rayon celui du composant augmenté de son écart.
MESURE : rayon de l'anneau de focus = rayon du composant + écart de focus

> **Pourquoi** : deux courbes non concentriques créent une "oreille" — un croissant d'espace inégal dans le coin, petit mais immédiatement visible.

## Le pill — provisionné, borné

RÈGLE [RADIUS-R08] : `radius.pill` (valeur géante, convention partagée : 999/9999px) est **réservé aux contenus mono-ligne intrinsèques dont la forme EST la pilule** — pastilles, badges, avatars. **Tranché (1.1.0) : un contrôle mono-ligne (bouton, input) ne prend JAMAIS `pill`** — il est mono-ligne mais pas *intrinsèquement pilule*, et suit sa taille (sm/md). « Intrinsèque » qualifie la forme du contenu, pas le simple fait de tenir sur une ligne. Jamais sur un contenu qui peut passer en multiligne : la pilule devient un stade.
STATUT : parti pris d'identité
SOURCE : S3, S6, S7, S8, S9
ÉNONCÉ : Le rayon plein est réservé aux contenus mono-ligne dont la forme est intrinsèquement une pilule ; aucun contrôle ni contenu susceptible de passer en multiligne ne le prend.
MESURE : aucun composant de type contrôle ni contenu multiligne ne consomme le rayon plein

RÈGLE [RADIUS-R09] : aucun consommateur documenté à ce jour — provision rendue visible (même statut qu'`elevation.overlay`), candidat naturel : badge/tag, dont `typography.label` (Inter, 1.8.0) est l'autre moitié déjà née.
STATUT : note de méthode
SOURCE : interne
ÉNONCÉ : Un token de rayon provisionné sans consommateur documenté est déclaré comme provision explicite, avec son consommateur candidat nommé.

RÈGLE [RADIUS-R10] : l'**angle droit n'a pas de token** — décision, pas oubli : rien dans ce système n'est carré par défaut (Carbon fait le choix inverse — esthétique d'identité, pas une norme). Un besoin réel l'ajouterait en un cran `none`.
STATUT : parti pris d'identité
SOURCE : S4, S11, S8, S9
ÉNONCÉ : L'angle droit n'a pas de token dans l'échelle : rien n'est carré par défaut, et un besoin réel devrait ajouter explicitement un cran nul.
MESURE : l'échelle de rayon ne comporte aucun cran de valeur 0

## Risque

RÈGLE [RADIUS-R11] : table ci-dessous
STATUT : note de méthode
SOURCE : interne
ÉNONCÉ : Les risques du rayon sont consignés dans une table de cas, de risque principal et de sévérité.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Rayons dépareillés dans un même groupe de contrôles | Formulaire visuellement disparate, perçu comme cassé | Moyenne |
| Imbrication non concentrique | "Oreilles" dans les coins, finition perçue dégradée | Moyenne |
| Pill sur multiligne | Forme de stade, lisibilité du contour perdue | Moyenne |
| Rayon dérivé en % de la hauteur | Pill accidentel, courbures dissonantes | Faible à moyenne |
| Rayon qui change à l'état | Le composant semble se déformer | Faible |

## Règle transversale

RÈGLE [RADIUS-R12] : **le rayon suit la taille et rien d'autre** — ni l'importance (BUTTON-UX : "large ne veut pas dire important"), ni l'état, ni le goût de l'écran.
STATUT : parti pris d'identité
SOURCE : interne
ÉNONCÉ : Le rayon suit la taille du composant et rien d'autre : ni son importance, ni son état, ni une préférence locale d'écran.

## Sources et niveau de confiance

| Réf. | Affirmation | Source | Confiance |
|---|---|---|---|
| S1 | Échelle croissante avec la taille du composant | [Atlassian — Radius](https://atlassian.design/foundations/radius) (xsmall badges → xxlarge players), [Material 3 — shape scale](https://m3.material.io/styles/shape/corner-radius-scale) (via [doc Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)), [Polaris — border tokens](https://polaris-react.shopify.com/tokens/border) | Établi — convergence des trois échelles |
| S2 | Rayon du focus = rayon de base + offset (concentrique inversé) | [Atlassian — Radius](https://atlassian.design/foundations/radius) (radius.focus tokenisé à base+2px) | Établi chez Atlassian — adopté, cf. BORDER-UI |
| S3 | Pill par valeur géante | [Atlassian](https://atlassian.design/foundations/radius) (full 999px, "réservé à l'humain" : avatars), [Polaris](https://polaris-react.shopify.com/tokens/border) (radius-full 9999px) | Établi — convention partagée ; la borne mono-ligne est une formalisation interne |
| S4 | Angle droit comme identité possible | [Carbon](https://carbondesignsystem.com/components/tag/style/) (esthétique majoritairement carrée, pill réservé au Tag) | Établi chez Carbon — choix inverse du nôtre, cité comme preuve que c'est une décision d'identité |
| S5 | Géométrie des coins concentriques, normative : le rayon du bord intérieur vaut le rayon extérieur moins l'épaisseur correspondante, et zéro si le résultat est négatif ; idem du padding au contenu | [W3C — CSS Backgrounds and Borders Level 3, Corner Shaping](https://www.w3.org/TR/css-backgrounds-3/) | Établi, norme W3C — **contredit la note du fichier qui déclarait l'imbrication « sans source normative unique »** |
| S6 | Réduction proportionnelle des rayons : si la somme de deux rayons d'un même côté dépasse la longueur de ce côté, tous les rayons sont multipliés par un facteur f < 1. C'est ce mécanisme qui produit la pilule exacte, le stade multiligne et la pilule accidentelle d'un rayon en pourcentage | [CSSWG — CSS Backgrounds 3, Overlapping Curves](https://drafts.csswg.org/css-backgrounds-3/#corner-overlap) | Établi, norme W3C |
| S7 | Relevé du 2026-07-27 : Atlassian expose huit crans (2, 4, 6, 8, 12, 16 px, plein, tuile) avec mapping explicite — medium pour boutons et champs, large pour cartes et menus, xlarge pour conteneurs de page et modales ; anneau de focus tokenisé à base + 2 px ; les badges y prennent 2 px, pas le rayon plein | [Atlassian — Radius](https://atlassian.design/foundations/radius) | Établi — seul système vérifié à documenter le mapping contrôle / conteneur. **Contredit R08 sur les badges** |
| S8 | Polaris expose une échelle croissante et fermée de 0 à 30 px plus un cran plein ; aucune consigne d'usage par composant n'est publiée : l'échelle est convergente, le mapping ne l'est pas. Le cran nul y est tokenisé | [Polaris — Border tokens](https://polaris-react.shopify.com/tokens/border) | Établi — relevé sur la table de tokens officielle |
| S9 | Fluent 2 expose un cran nul, puis 2, 4, 6, 8, 12, 16, 24, 32, 40 px et un cran circulaire : échelle croissante, cran nul tokenisé, pilule par valeur géante | [Fluent UI — tokens/borderRadius.ts](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/borderRadius.ts) | Établi — source primaire (dépôt de tokens) |
| S10 | Material 3 définit une échelle de forme nommée et croissante terminée par un cran plein ; les valeurs numériques ne sont pas dans le fichier de tokens et le site n'est pas lisible sans JavaScript | [Material Web — tokens/_md-sys-shape.scss](https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-sys-shape.scss) | Partiel — noms de crans vérifiés, valeurs non vérifiables |
| S11 | Carbon pose explicitement un rayon nul sur ses boutons via un mixin appliqué à toutes les variantes : l'angle droit y est le défaut voulu. Le Tag, cité comme exception, est spécifié à 16 px et non par un token de pilule | [Carbon — issue #285](https://github.com/carbon-design-system/carbon/issues/285) ; [Carbon — Tag, style](https://carbondesignsystem.com/components/tag/style/) | Établi — **corrige la sur-interprétation de S4** |
| S12 | Règle du rayon imbriqué telle qu'elle circule dans la littérature de design : rayon extérieur = rayon intérieur + écart ; l'article note la limite quand l'écart dépasse le rayon extérieur | [Frontend Masters — The Classic Border Radius Advice](https://master.dev/blog/the-classic-border-radius-advice-plus-an-unusual-trick) | Convergence de littérature — secondaire ; la version normative est S5 |

*L'imbrication concentrique (interne = externe − écart) est une règle de géométrie perceptive répandue dans la littérature de design, sans source normative unique — confiance : convergence.*

## À approfondir

- **Premier consommateur du pill** (badge/tag) : confirmera la borne mono-ligne et rejoindra `typography.label`.
- **Rayon des futurs superposés** (modale, popover) : `radius.lg` (12px) attendu — le cran conteneur né en 1.1.0 est précisément la « montée d'un cran pour les grandes surfaces » qu'Atlassian tokenise (xlarge 12px pour les modales). Plus besoin d'un cran ad hoc le jour venu.
