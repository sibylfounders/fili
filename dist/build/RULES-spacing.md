---
sujet: spacing
nature: foundations
resume: "Ce fichier contient le raisonnement : proximité, hiérarchie de l'espace, échelle fermée, responsive."
selon-contexte: [adaptive, alert, button, card, collection, form, grid, input]
source: SPACING-UX.md v1.2.1 + SPACING-UI.md v1.2.0
empreinte: sha256:61797e752d89c081
regles: {loi: 7, preference: 13, non_qualifie: 0}
---
# RULES — spacing (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Tout espacement du système est un multiple entier d'une unité de base unique. `SPACING-R04`
- **[loi]** L'échelle d'espacement est fermée : on choisit un cran existant sans inventer de valeur intermédiaire ; un besoin répété fait évoluer l'échelle, pas l'écran. `SPACING-R05`
- **[préférence]** Chez nous l'échelle est délibérément plus courte que celles des systèmes majeurs et ne s'allonge que sur un besoin réel journalisé. `SPACING-R06`
- **[loi]** L'espace encode la relation : plus deux éléments sont proches, plus leur lien est perçu comme fort, et cette proximité l'emporte sur les autres indices visuels de groupement. `SPACING-R07`
- **[loi]** La hiérarchie de proximité est monotone : l'écart entre éléments liés est inférieur à l'écart entre frères, lui-même inférieur à l'écart entre groupes. `SPACING-R08`
- **[loi]** L'espacement interne d'un composant est toujours inférieur ou égal à son espacement externe. `SPACING-R09`
- **[préférence]** La séparation entre deux groupes passe par un saut d'échelle franc et non par un cran adjacent. `SPACING-R10`
- **[préférence]** La séparation se fait d'abord par l'espace, ensuite par le fond, et en dernier recours seulement par un trait dessiné. `SPACING-R11`
- **[préférence]** L'empilement vertical est un usage de l'échelle existante et non une seconde échelle. `SPACING-R12`
- **[préférence]** Un titre est placé plus près de ce qu'il ouvre que de ce qu'il ferme : l'espace au-dessus dépasse l'espace au-dessous d'au moins un cran. `SPACING-R13`
- **[préférence]** Toute hauteur posée par le système s'exprime en multiples de la grille de base et s'y justifie. `SPACING-R14`
- **[préférence]** Les interlignes restent gouvernés par la lisibilité et non par la grille de base : aucun interligne n'est recalé sur la grille sans arbitrage explicite. `SPACING-R15`
- **[préférence]** La densité d'un composant est un décalage d'exactement un cran sur l'échelle commune, jamais une valeur propre. `SPACING-R16`
- **[préférence]** La densité modifie les espacements et jamais la structure : l'ordre des emplacements et la présence des éléments restent identiques. `SPACING-R17`
- **[loi]** Quand l'équilibre mathématique et l'équilibre perçu divergent, l'ajustement optique est légitime s'il reste local, n'est jamais promu en valeur d'échelle, et est commenté là où il vit. `SPACING-R18`
- **[préférence]** Le système ne définit que deux régimes de mise en page, mobile et desktop, séparés par un seuil unique. `SPACING-R19`
- **[préférence]** Les crans conservent la même valeur de part et d'autre du seuil responsive : ce qui change au mobile est la densité et la disposition, jamais la valeur des crans. `SPACING-R20`
- **[préférence]** L'espacement s'exprime en pixels et non en unités relatives au texte, la typographie restant seule à suivre l'agrandissement. `SPACING-R21`
- **[loi]** L'espace occupé par un élément ne dépend pas de son état : la place du contenu attendu ou différé est réservée dès la mise en page initiale. `SPACING-R22`
- **[préférence]** L'espace est un canal d'information et non un reste : ce que les distances disent d'une page doit être aussi vrai que ce qu'en dit le texte. `SPACING-R24`

## Non couvert — poser la question, ne rien trancher

- Alignement optique vs mathématique : Un élément paraît décentré malgré des px égaux.
- Contenu plus long que prévu : Le contenu déborde (traduction, titres longs).
- Tablette / intermédiaire : L'écran est intermédiaire.
- Zoom navigateur / rem : L'utilisateur zoome le texte.
