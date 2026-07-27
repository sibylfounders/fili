---
sujet: spacing
nature: foundations
resume: "Ce fichier contient le raisonnement : proximité, hiérarchie de l'espace, échelle fermée, responsive."
selon-contexte: [adaptive, alert, button, card, collection, form, grid, input]
source: SPACING-UX.md v1.2.1 + SPACING-UI.md v1.2.0
empreinte: sha256:61797e752d89c081
regles: {loi: 7, preference: 13, non_qualifie: 0}
---
# RULES — spacing (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Tout espacement du système est un multiple entier d'une unité de base unique. `SPACING-R04`
  - vérifiable : toute valeur d'espacement est un multiple entier de spacing.base
  - source : https://atlassian.design/foundations/spacing
- **[loi]** L'échelle d'espacement est fermée : on choisit un cran existant sans inventer de valeur intermédiaire ; un besoin répété fait évoluer l'échelle, pas l'écran. `SPACING-R05`
  - vérifiable : aucune valeur d'espacement en dur hors des crans de l'échelle
  - source : https://atlassian.design/foundations/spacing
- **[préférence]** Chez nous l'échelle est délibérément plus courte que celles des systèmes majeurs et ne s'allonge que sur un besoin réel journalisé. `SPACING-R06`
- **[loi]** L'espace encode la relation : plus deux éléments sont proches, plus leur lien est perçu comme fort, et cette proximité l'emporte sur les autres indices visuels de groupement. `SPACING-R07`
  - source : https://carbondesignsystem.com/elements/spacing/overview/
- **[loi]** La hiérarchie de proximité est monotone : l'écart entre éléments liés est inférieur à l'écart entre frères, lui-même inférieur à l'écart entre groupes. `SPACING-R08`
  - vérifiable : la suite des crans consommés est croissante du plus lié au plus séparé, sans inversion
  - source : https://carbondesignsystem.com/elements/spacing/overview/
- **[loi]** L'espacement interne d'un composant est toujours inférieur ou égal à son espacement externe. `SPACING-R09`
  - vérifiable : le plus grand espacement interne est inférieur ou égal au plus petit espacement externe
  - source : https://carbondesignsystem.com/elements/spacing/overview/
- **[préférence]** La séparation entre deux groupes passe par un saut d'échelle franc et non par un cran adjacent. `SPACING-R10`
  - vérifiable : deux groupes séparés par au moins deux crans, jamais par des crans adjacents
- **[préférence]** La séparation se fait d'abord par l'espace, ensuite par le fond, et en dernier recours seulement par un trait dessiné. `SPACING-R11`
  - vérifiable : aucun séparateur dessiné là où un saut de cran suffit
- **[préférence]** L'empilement vertical est un usage de l'échelle existante et non une seconde échelle. `SPACING-R12`
  - vérifiable : aucun token d'espacement vertical distinct de l'échelle spacing
- **[préférence]** Un titre est placé plus près de ce qu'il ouvre que de ce qu'il ferme : l'espace au-dessus dépasse l'espace au-dessous d'au moins un cran. `SPACING-R13`
  - vérifiable : pour tout titre, le cran au-dessus dépasse d'au moins un rang celui au-dessous
- **[préférence]** Toute hauteur posée par le système s'exprime en multiples de la grille de base et s'y justifie. `SPACING-R14`
  - vérifiable : toute hauteur posée est un multiple entier de spacing.base
- **[préférence]** Les interlignes restent gouvernés par la lisibilité et non par la grille de base : aucun interligne n'est recalé sur la grille sans arbitrage explicite. `SPACING-R15`
  - vérifiable : interligne du corps de texte ≥ 1,5 ; aucun interligne contraint à tomber sur la grille
- **[préférence]** La densité d'un composant est un décalage d'exactement un cran sur l'échelle commune, jamais une valeur propre. `SPACING-R16`
  - vérifiable : padding compact = padding confortable décalé d'exactement un cran
- **[préférence]** La densité modifie les espacements et jamais la structure : l'ordre des emplacements et la présence des éléments restent identiques. `SPACING-R17`
  - vérifiable : à densités différentes, ordre et présence des emplacements identiques
- **[loi]** Quand l'équilibre mathématique et l'équilibre perçu divergent, l'ajustement optique est légitime s'il reste local, n'est jamais promu en valeur d'échelle, et est commenté là où il vit. `SPACING-R18`
  - vérifiable : tout ajustement optique est commenté à son point d'usage et n'apparaît dans aucun token
  - source : https://atlassian.design/foundations/spacing
- **[préférence]** Le système ne définit que deux régimes de mise en page, mobile et desktop, séparés par un seuil unique. `SPACING-R19`
  - vérifiable : un seul seuil de largeur global dans le système
- **[préférence]** Les crans conservent la même valeur de part et d'autre du seuil responsive : ce qui change au mobile est la densité et la disposition, jamais la valeur des crans. `SPACING-R20`
  - vérifiable : les crans ont la même valeur de part et d'autre du seuil
- **[préférence]** L'espacement s'exprime en pixels et non en unités relatives au texte, la typographie restant seule à suivre l'agrandissement. `SPACING-R21`
  - vérifiable : tous les tokens d'espacement sont exprimés en px
- **[loi]** L'espace occupé par un élément ne dépend pas de son état : la place du contenu attendu ou différé est réservée dès la mise en page initiale. `SPACING-R22`
  - vérifiable : les dimensions d'un squelette égalent celles du contenu réel ; aucun décalage non provoqué par une action utilisateur
  - source : https://web.dev/articles/optimize-cls
- **[préférence]** L'espace est un canal d'information et non un reste : ce que les distances disent d'une page doit être aussi vrai que ce qu'en dit le texte. `SPACING-R24`

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Proximité qui ment (label équidistant) | L'utilisateur relie l'information au mauvais élément | Élevée |
| Valeur hors échelle | Rythme cassé, rebranding impossible, dérive au copier-coller | Élevée |
| Interne > externe | Le contenu semble appartenir au voisin | Moyenne à élevée |
| Sauts d'échelle indiscernables (crans adjacents pour séparer) | Groupes non perçus, page plate | Moyenne |
| Espacements écrasés en mobile hors échelle | Zones tactiles accolées (< 44px effectifs) | Élevée |
| Contenu qui saute (espace non réservé) | Cible déplacée sous le doigt/curseur | Élevée |
| Densité qui change la structure | Deux produits dans un — apprentissage cassé | Moyenne |

## Non couvert — poser la question, ne rien trancher

- Alignement optique vs mathématique : Un élément paraît décentré malgré des px égaux.
- Contenu plus long que prévu : Le contenu déborde (traduction, titres longs).
- Tablette / intermédiaire : L'écran est intermédiaire.
- Zoom navigateur / rem : L'utilisateur zoome le texte.
