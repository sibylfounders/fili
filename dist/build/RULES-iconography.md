---
sujet: iconography
nature: foundations
resume: "Ce fichier contient le raisonnement : quand une icône a le droit d'exister, ce qu'elle porte, ce qu'elle ne remplace jamais."
selon-contexte: [alert, button, card, color, input, motion, spacing]
source: ICONOGRAPHY-UX.md v1.0.0 + ICONOGRAPHY-UI.md v1.0.0
empreinte: sha256:d86596ba0df16fc3
regles: {loi: 9, preference: 9, non_qualifie: 0}
---
# RULES — iconography (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Toute icône est accompagnée d'un libellé textuel partout où c'est possible, et aucune icône n'est ajoutée là où elle n'est pas nécessaire. `ICONOGRAPHY-R04`
- **[préférence]** Le droit d'une icône à paraître sans libellé visible est défini par une liste fermée et déclarée, non par un jugement au cas par cas. `ICONOGRAPHY-R05`
- **[loi]** Tout contrôle réduit à une icône porte un nom accessible non vide décrivant sa fonction ; une info-bulle au survol ne tient jamais lieu de nom accessible. `ICONOGRAPHY-R06`
- **[préférence]** Une action dont l'icône ne se laisse ni concevoir ni trouver en moins de cinq secondes se désigne par un mot et non par un glyphe. `ICONOGRAPHY-R07`
- **[loi]** Un glyphe ne désigne qu'un seul sens dans tout le produit, et un sens donné est toujours porté par le même glyphe. `ICONOGRAPHY-R08`
- **[préférence]** Aucun symbole dont le sens est déjà établi ailleurs n'est réaffecté à un autre sens. `ICONOGRAPHY-R09`
- **[loi]** Une icône porteuse de sens est un canal redondant d'une information déjà exprimée autrement : elle ne se retire pas pour alléger, et sa silhouette distingue le sens sans recours à la couleur. `ICONOGRAPHY-R10`
- **[préférence]** La bibliothèque adopte un style de contour unique à trait constant, et réserve la variante pleine à la signalisation d'un état actif. `ICONOGRAPHY-R11`
- **[préférence]** Une icône doit rester lisible au plus petit cran ; un glyphe dont les détails se bouchent est simplifié ou retiré, le cran n'est pas augmenté pour lui. `ICONOGRAPHY-R12`
- **[préférence]** Les icônes s'en tiennent à des formes simples et frontales, sans perspective, sans volume et sans détail intérieur superflu. `ICONOGRAPHY-R13`
- **[loi]** Les tailles d'icône proviennent d'un jeu fermé de crans appariés aux corps de texte ; une icône ne se redimensionne jamais hors de ces crans, elle change de cran. `ICONOGRAPHY-R14`
- **[loi]** À côté d'un texte, l'icône est centrée verticalement sur la ligne plutôt qu'alignée sur la ligne de base, et prend la couleur du texte qu'elle accompagne. `ICONOGRAPHY-R15`
- **[loi]** Une icône porteuse d'information respecte un contraste d'au moins 3:1 avec les couleurs adjacentes ; une icône décorative en est exemptée et est retirée de l'arbre d'accessibilité. `ICONOGRAPHY-R16`
- **[loi]** La cible tactile d'une icône interactive s'obtient par extension du padding et jamais par agrandissement du glyphe. `ICONOGRAPHY-R17`
- **[préférence]** Le spinner est traité comme une icône animée : il occupe le cran de l'icône qu'il remplace sans modifier la géométrie du composant. `ICONOGRAPHY-R18`
- **[préférence]** Une icône qui varie avec l'état est le même glyphe transformé plutôt qu'un second glyphe, et l'état reste exposé programmatiquement. `ICONOGRAPHY-R19`
- **[préférence]** Les icônes sont rendues en SVG inline héritant de la couleur du texte, et non par une police d'icônes. `ICONOGRAPHY-R20`
- **[loi]** Une icône n'est jamais le seul dépositaire d'un sens : toute information qu'elle porte reste disponible par le texte, le rôle ou la structure. `ICONOGRAPHY-R22`

## Non couvert — poser la question, ne rien trancher

- Illustration : Un visuel d'empty state ou pédagogique s'affiche.
- RTL : La langue se lit de droite à gauche.
