---
sujet: navigation
nature: patterns
resume: "**Orchestration** d'une navigation, pas un composant neuf : elle **assemble** des destinations (`link` en"
selon-contexte: [link]
source: NAVIGATION-UX.md v1.0.0 + NAVIGATION-UI.md v1.0.0
empreinte: sha256:aef249d7a6749cec
regles: {loi: 5, preference: 6, non_qualifie: 0}
---
# RULES — navigation (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Chaque bloc majeur de liens de navigation est exposé dans un élément nav porteur d'une étiquette accessible distincte, et le contenu principal dans un unique main. `NAVIGATION-R01`
  - vérifiable : chaque nav de la page porte un aria-label ou aria-labelledby, tous distincts entre eux, et la page contient un seul main
  - source : https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
- **[loi]** Dans un bloc de navigation, la destination correspondant à la page affichée est la seule à porter aria-current, et son état courant est signalé par au moins un indice non chromatique en plus de la couleur. `NAVIGATION-R02`
  - vérifiable : un seul élément par bloc de navigation porte aria-current, et l'état courant reste distinguable en niveaux de gris
  - source : https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
- **[préférence]** Sous le seuil de compacité du shell, la navigation latérale devient un panneau hors-écran dont le scrim, le confinement du focus et la fermeture sont fournis par le composant overlay et non redéfinis par la navigation. `NAVIGATION-R03`
- **[préférence]** Le sommaire « sur cette page » liste les sections du document affiché, marque l'entrée correspondant à la section lue par aria-current et par un indice non chromatique, et complète la navigation principale sans s'y substituer. `NAVIGATION-R04`
  - vérifiable : une seule entrée du sommaire porte aria-current à un instant donné, et l'entrée active reste distinguable en niveaux de gris
- **[loi]** L'activation d'une entrée de sommaire mène à sa section par une ancre, et le défilement associé est instantané dès que l'utilisateur a demandé une réduction des animations ; l'indicateur actif reflète la position de lecture sans la piloter. `NAVIGATION-R05`
  - vérifiable : sous prefers-reduced-motion: reduce, aucun défilement animé n'est appliqué (scroll-behavior différent de smooth)
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **[loi]** Le premier élément focalisable du document est un lien qui mène directement au contenu principal ; il peut n'être visible qu'au focus, mais il doit alors le devenir. `NAVIGATION-R06`
  - vérifiable : le premier élément focalisable du document est un lien dont la cible est le main
  - source : https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html
- **[loi]** L'ordre de tabulation à travers la navigation préserve le sens et l'opérabilité du contenu, et aucun élément de la navigation ne retient le focus au clavier. `NAVIGATION-R07`
  - vérifiable : chaque élément interactif de la navigation peut être atteint puis quitté au clavier seul, sans tabindex positif
  - source : https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html

## Non couvert — poser la question, ne rien trancher

- Fil d'Ariane (breadcrumb) : Chemin dans l'arborescence.
- Barre de nav horizontale : Onglets de premier niveau en haut.
