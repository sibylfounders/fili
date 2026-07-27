---
sujet: overlay
nature: foundations
resume: "Cette fondation porte la **couche au-dessus du flux** : ce qui recouvre le contenu au lieu de s'y insérer."
selon-contexte: []
source: OVERLAY-UX.md v1.0.0 + OVERLAY-UI.md v1.0.0
empreinte: sha256:9ed49e6e988e9c4d
regles: {loi: 0, preference: 0, non_qualifie: 15}
---
# RULES — overlay (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** `overlay` est une **fondation sans axes** (ni style/tone/size) — une propriété transversale, pas un
- **[non qualifié]** tout superposé est **modal** ou **non-modal**, et ce choix détermine toute sa mécanique.
- **[non qualifié]** tout superposé référence un cran de `z-index` — jamais un entier codé en dur. Cinq couches, dans
- **[non qualifié]** un superposé **modal** pose un **voile** `overlay.scrim` entre le fond et sa surface — il assombrit
- **[non qualifié]** un clic sur le voile **ferme** le superposé modal (équivalent d'une annulation) — cohérent avec le
- **[non qualifié]** un superposé **modal verrouille le défilement** du fond tant qu'il est ouvert (le fond ne bouge pas
- **[non qualifié]** l'entrée et la sortie d'un superposé utilisent les durées/courbes de MOTION (une grande surface
- **[non qualifié]** l'**ombre** d'un superposé est `elevation.overlay` — overlay la **consomme**, ne la redéfinit pas.

## Non couvert — poser la question, ne rien trancher

- Ombre d'un superposé : Relief de la surface flottante.
- Anneau de focus interne : Focus d'un contrôle dans le superposé.
- Ordre de focus général : Séquence de tabulation de la page.
