---
sujet: border
nature: foundations
resume: "Ce fichier contient le raisonnement : les rôles du trait, le critère délimitant/décoratif, le focus ring."
selon-contexte: [alert, button, card, color, input, motion, overlay, radius, spacing]
source: BORDER-UX.md v1.3.0 + BORDER-UI.md v1.3.0
empreinte: sha256:f2f5033a84470302
regles: {loi: 8, preference: 14, non_qualifie: 0}
---
# RULES — border (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un trait doit avoir un rôle explicite — délimiter un élément interactif, grouper du contenu ou séparer deux zones. Le rôle décide de sa couleur et du contraste exigé. `BORDER-R02`
- **[loi]** Si un élément n'est identifiable que par sa bordure, cette bordure doit atteindre un contraste de 3:1 avec son fond. `BORDER-R03`
- **[préférence]** Nous utilisons une seule épaisseur de trait, 1px, partout. `BORDER-R04`
- **[préférence]** Nous ne changeons jamais l'épaisseur d'un trait pour signaler un état : la couleur s'en charge, et le contenu ne bouge pas. `BORDER-R05`
- **[préférence]** Notre anneau de focus est le même partout : une couleur, une largeur, un écart, définis une seule fois. `BORDER-R06`
- **[préférence]** Chez nous, l'anneau de focus s'ajoute à la bordure existante plutôt que de la remplacer — les deux restent lisibles ensemble. `BORDER-R07`
- **[loi]** L'indicateur de focus ne doit jamais être supprimé sans un remplacement au moins aussi visible. `BORDER-R08`
- **[loi]** L'élément qui a le focus ne doit jamais être masqué, même en partie, par un en-tête collant ou un élément superposé. `BORDER-R09`
- **[préférence]** Chez nous, l'anneau de focus apparaît instantanément, sans animation. `BORDER-R10`
- **[préférence]** Notre anneau est d'une seule couleur : sur un fond imprévisible il peut se fondre, et nous ne traitons pas encore ce cas. `BORDER-R11`
- **[loi]** Une information portée par un fond ou une ombre disparaît en mode contraste forcé ; le trait, lui, survit — c'est sur lui qu'il faut compter. `BORDER-R12`
- **[préférence]** Le trait reste à 1px CSS, y compris sur écran haute densité. `BORDER-R13`
- **[préférence]** Les changements de couleur d'un trait s'animent ; l'apparition de l'anneau de focus, jamais. `BORDER-R14`
- **[loi]** Un même gris n'a pas le même statut selon qu'il délimite, groupe ou sépare : c'est l'usage qui décide, pas la valeur. `BORDER-R16`

## Consignes d'implémentation

- **[préférence]** Le code applique 1px à tous les traits ; un état change la couleur, jamais l'épaisseur. `BORDER-U01`
- **[préférence]** L'anneau de focus se pose en `outline` avec un décalage extérieur, jamais en `border`. `BORDER-U02`
- **[préférence]** Le rayon de l'anneau suit celui du composant, augmenté du décalage. `BORDER-U03`
- **[préférence]** L'anneau apparaît sans transition. `BORDER-U04`
- **[loi]** Utiliser `:focus-visible` plutôt que `:focus`. `BORDER-U05`
- **[loi]** Ne jamais écrire `outline: none` sur un élément atteignable au clavier sans un remplacement équivalent. `BORDER-U06`
- **[préférence]** Exception : un élément focalisable uniquement par script (`tabindex="-1"`) ne porte pas d'anneau. `BORDER-U07`
- **[préférence]** Le contraste des bordures est vérifié automatiquement à la génération. `BORDER-U08`

## Non couvert — poser la question, ne rien trancher

- Style de trait (dashed, dotted) : Une zone de dépôt appelle un trait pointillé.
