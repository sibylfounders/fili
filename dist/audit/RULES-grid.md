---
sujet: grid
nature: foundations
resume: "Ce fichier porte le raisonnement du **cadre de page** : quelle largeur maximale un conteneur doit"
selon-contexte: [collection]
source: GRID-UX.md v1.2.0 + GRID-UI.md v1.2.0
empreinte: sha256:57a3f23ceb84f1fb
regles: {loi: 0, preference: 0, non_qualifie: 27}
---
# RULES — grid (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** tout conteneur de page borné référence une largeur de `grid.container-*`, jamais une valeur brute
- **[non qualifié]** **narrow** — saisie mono-colonne focalisée : formulaire, écran d'authentification, création de
- **[non qualifié]** **default** — page de contenu ou d'application à colonne unique : réglages, article, tableau de
- **[non qualifié]** **wide** — surface dense assumée : dashboard, collection, tableau large. Largeur maximale haute ;
- **[non qualifié]** un élément décoratif ou immersif (hero, bandeau, image de fond, séparateur de section) peut
- **[non qualifié]** le contenu *lisible ou actionnable* à l'intérieur d'un full-bleed reste, lui, borné par un
- **[non qualifié]** un conteneur borné se **centre** dans la fenêtre (marges automatiques) ; il ne s'aligne pas à
- **[non qualifié]** la **marge de page** (espace entre le conteneur et le bord de l'écran) dérive de l'échelle
- **[non qualifié]** un conteneur dans un conteneur (une carte dans une page bornée) **n'additionne pas** les
- **[non qualifié]** sous `breakpoint.mobile`, le max-width **ne mord pas** — le conteneur prend la pleine largeur
- **[non qualifié]** la bascule mobile/desktop change la **largeur** du conteneur, jamais la nature de son contenu —
- **[non qualifié]** la largeur d'un **texte courant** relève de `measure.reading-max` (typographie), pas d'un
- **[non qualifié]** la **densité**, les **gouttières** et la **proximité** relèvent de `spacing`. La grille compose
- **[non qualifié]** le **ratio** d'un média relève de `media_ratio`. La grille donne la largeur disponible, pas la
- **[non qualifié]** la **grille de colonnes** (nombre de colonnes, gouttières inter-colonnes d'une collection)
- **[non qualifié]** le shell a **trois régions** — un **rail de navigation** (début / gauche en LTR), la **colonne de
- **[non qualifié]** le rail de navigation référence `grid.rail-nav`, le rail d'outils `grid.rail-tools` — largeurs fixes,
