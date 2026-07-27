---
sujet: elevation
nature: foundations
resume: "Ce fichier contient le raisonnement : ce que la profondeur *signifie*, quand le relief est un signal et quand il est du bruit."
selon-contexte: [alert, button, card, input, interaction, motion, toast, typography]
source: ELEVATION-UX.md v2.0.0 + ELEVATION-UI.md v2.0.0
empreinte: sha256:57dcd007b514d7e4
regles: {loi: 3, preference: 13, non_qualifie: 0}
---
# RULES — elevation (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** L'élévation ne dit qu'une chose : à quelle couche du flux un élément appartient — à plat, soulevé mais dans le flux, ou au-dessus du flux. `ELEVATION-R02`
- **[préférence]** Un élément interactif doit porter un signifiant perceptible de sa nature ; ce système choisit le relief comme signifiant. `ELEVATION-R03`
- **[préférence]** Toute surface est classée dans l'une de trois natures — posé, creusé, plat — et cette classe détermine son relief. `ELEVATION-R04`
- **[préférence]** Un effet de relief qui ne répond à aucune question de matérialité fonctionnelle est décoratif et interdit. `ELEVATION-R05`
- **[loi]** L'ombrage suppose une source de lumière unique et venue du haut, la perception humaine interprétant toute ombre selon un a priori de lumière d'en haut. `ELEVATION-R07`
- **[préférence]** Un objet posé a trois états dans une seule métaphore : posé au repos, soulevé au survol, enfoncé à l'appui. `ELEVATION-R08`
- **[préférence]** En thème sombre les directions de la physique du relief sont conservées et seules les valeurs changent. `ELEVATION-R09`
- **[préférence]** Le repos d'une surface est à plat : l'élévation soulevée n'est accordée qu'au survol des surfaces cliquables. `ELEVATION-R10`
- **[préférence]** La mise en avant passe par le fond et non par l'ombre : élévation et fond contrasté ne se cumulent pas. `ELEVATION-R11`
- **[préférence]** L'échelle d'ombre compte exactement trois niveaux ; l'ombre interne d'enfoncement est un état, pas un palier. `ELEVATION-R12`
- **[préférence]** Les ombres sont teintées sur la couleur de texte primaire, jamais en noir pur, et se distinguent par leur portée plutôt que par leur seule opacité. `ELEVATION-R13`
- **[préférence]** Les ombres se remplacent instantanément et ne sont jamais interpolées ; seules les couleurs transitionnent. `ELEVATION-R14`
- **[préférence]** Un squelette de chargement ne porte jamais de relief : il occupe l'espace du contenu sans promettre d'interaction. `ELEVATION-R15`
- **[loi]** Aucune information ne repose sur la seule ombre ni sur le seul liseré : en mode de couleurs forcées les ombres sont supprimées et les fonds dégradés annulés. `ELEVATION-R16`
- **[loi]** Les valeurs d'élévation et de liseré appartiennent au thème : un thème les redéfinit comme il redéfinit ses couleurs de fond. `ELEVATION-R17`
- **[préférence]** Le relief dit la nature d'un élément et jamais son importance, qui passe par la place, le contraste et le nom. `ELEVATION-R19`

## Non couvert — poser la question, ne rien trancher

- Empilement de superpositions : Une modale contient un popover.
- Élévation pendant un drag : On soulève une carte pendant un glisser-déposer.
- Mode sombre : L'interface passe en sombre.
- z-index anarchique : Les z-index se battent sans échelle.
