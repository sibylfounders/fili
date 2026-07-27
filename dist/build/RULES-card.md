---
sujet: card
nature: components
resume: "Ce fichier contient le raisonnement : modes d'interaction, composition, empty state, risques."
selon-contexte: [adaptive, border, button, collection, emotion, input, interaction, link, motion, toast, typography, voice]
source: CARD-UX.md v1.4.1 + CARD-UI.md v1.5.2
empreinte: sha256:1ae75e2f2b6bcf0b
regles: {loi: 8, preference: 42, non_qualifie: 0}
---
# RULES — card (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Le mode d'interaction d'une carte est reconnaissable au repos ; le survol confirme une cible déjà annoncée et ne révèle jamais après coup qu'une carte était cliquable. `CARD-R11`
- **[préférence]** L'adaptation d'une carte à la largeur de son conteneur peut changer sa disposition, sa densité et la divulgation d'informations secondaires, jamais son mode d'interaction, son sujet, sa destination ni les informations nécessaires pour décider. `CARD-R12`
- **[préférence]** La carte convient au parcours de contenus hétérogènes dont chaque élément se suffit à lui-même : tableau de bord, flux varié, catalogue où l'image porte l'essentiel de la décision. `CARD-R15`
- **[préférence]** La carte ne convient pas à la comparaison ni à la recherche parmi des éléments homogènes, où une liste ou une table est supérieure. `CARD-R16`
- **[préférence]** Lorsqu'un même écran peut relever des deux régimes, le critère qui tranche est le mode de lecture dominant : la découverte appelle la carte, l'évaluation comparative appelle la liste ou la table, quitte à offrir les deux modes. `CARD-R17`
- **[préférence]** Une carte statique présente un groupe d'informations sans être elle-même une cible ; les seules cibles sont les éléments interactifs placés à l'intérieur. `CARD-R18`
- **[préférence]** Le mode statique est le seul qui accepte librement plusieurs éléments interactifs internes. `CARD-R19`
- **[préférence]** Dans une carte cliquable, toute la surface constitue une cible unique, typiquement une navigation vers le détail du sujet. `CARD-R20`
- **[préférence]** Quand une carte cliquable doit malgré tout porter des actions, celles-ci sont des éléments frères dans le document, dotés de cibles propres et distinctes, et cette coexistence est arbitrée explicitement plutôt que subie. `CARD-R23`
- **[préférence]** Une carte sélectionnable représente une option dans un choix : son activation sélectionne, elle ne navigue pas. `CARD-R24`
- **[loi]** L'état sélectionné d'une carte est signalé autrement que par la couleur seule et est exposé programmatiquement. `CARD-R25`
- **[préférence]** Dans un groupe de cartes sélectionnables, toutes partagent le même mode de sélection — simple ou multiple — et la même structure interne. `CARD-R26`
- **[préférence]** Une carte dépliable masque puis révèle un contenu secondaire volumineux sans faire quitter le contexte ; elle ne sert pas à dissimuler une information nécessaire à la décision. `CARD-R27`
- **[préférence]** Lorsqu'une carte dépliable contient des éléments interactifs, seul un contrôle dédié déclenche le dépliage ; lorsqu'elle n'en contient pas, toute la surface peut le déclencher. `CARD-R28`
- **[préférence]** Une même collection ne mélange jamais plusieurs modes d'interaction de carte. `CARD-R29`
- **[préférence]** La densité confortable est le défaut de la carte : tableaux de bord, pages de contenu, catalogues. `CARD-R30`
- **[préférence]** La densité compacte est réservée aux contextes denses : panneaux latéraux, listes de cartes à fort volume, widgets. `CARD-R31`
- **[préférence]** La densité modifie le remplissage interne et les écarts entre emplacements, jamais la structure : une carte compacte a les mêmes emplacements, dans le même ordre, qu'une carte confortable. `CARD-R32`
- **[préférence]** Une collection de cartes partage une densité unique. `CARD-R33`
- **[préférence]** L'ordre des emplacements d'une carte est canonique — media, en-tête, corps, zone d'actions — chaque emplacement restant facultatif ; cet ordre ne se réinvente pas carte par carte. `CARD-R34`
- **[préférence]** Le media d'une carte porte l'identification visuelle du sujet ; une image qui n'aide ni à identifier ni à décider agrandit la carte sans bénéfice. `CARD-R35`
- **[préférence]** Une collection de cartes emploie un ratio d'image unique et fixe. `CARD-R36`
- **[préférence]** L'absence de media est un cas normal et non une erreur : elle est traitée par un remplacement délibéré de même encombrement, jamais par une image cassée ni par un effondrement de la carte. `CARD-R37`
- **[loi]** Toute image informative d'une carte porte une alternative textuelle ; une image purement décorative est explicitement marquée comme telle afin d'être ignorée par les technologies d'assistance. `CARD-R38`
- **[loi]** Le titre d'une carte nomme le sujet de la carte et en décrit le propos ; il est le point d'entrée de la lecture visuelle comme de la lecture d'écran. `CARD-R39`
- **[loi]** Le titre d'une carte est un élément de titre sémantique réel, de niveau identique sur toutes les cartes d'une même collection. `CARD-R40`
- **[préférence]** Le corps d'une carte donne juste assez d'information pour décider d'entrer ou de passer : la carte est un résumé, pas le contenu lui-même. `CARD-R41`
- **[préférence]** Le texte d'une carte est tronqué à un nombre de lignes constant plutôt que laissé libre ; la troncature ne masque jamais une information décisive et le texte complet reste accessible. `CARD-R42`
- **[préférence]** Une carte ne porte qu'une seule action principale ; les actions secondaires passent en icônes discrètes ou en menu de débordement, jamais en boutons texte concurrents. `CARD-R45`
- **[loi]** Les actions d'une carte occupent une position constante dans toute la collection : en pied de carte pour les appels à l'action, en coin d'en-tête pour les actions portant sur l'objet entier. `CARD-R46`
- **[préférence]** Les actions d'une carte ne sont jamais visibles au seul survol : un menu de débordement permanent est préférable à des icônes qui apparaissent. `CARD-R47`
- **[préférence]** Une collection vide affiche un état vide structuré : image facultative, titre court et positif, explication de la cause du vide, et action pour en sortir. `CARD-R49`
- **[préférence]** Le texte d'un état vide diffère selon sa cause : première utilisation, absence de résultat, ou erreur. `CARD-R50`
- **[préférence]** Le survol d'une carte cliquable confirme son affordance par une élévation ou une bordure renforcée ; une carte statique ne réagit pas au survol. `CARD-R54`
- **[loi]** Une carte cliquable ou sélectionnable est une cible clavier : elle présente un indicateur de focus visible, portant sur la carte entière, qui n'est jamais supprimé. `CARD-R55`
- **[préférence]** Le chargement d'une collection est occupé par des cartes squelettes qui reproduisent la structure et les dimensions des cartes réelles, plutôt que par un indicateur global. `CARD-R56`
- **[préférence]** Rien n'anime au chargement initial d'une collection de cartes : seuls les changements réactifs déclenchés par l'utilisateur sont animés, les squelettes occupent l'attente sans entrer en scène. `CARD-R59`
- **[loi]** Le mouvement d'une carte confirme un changement d'état sans jamais le porter seul : l'état déplié ou replié est exposé programmatiquement, de sorte que la suppression de l'animation ne supprime aucune information. `CARD-R60`
- **[préférence]** Sous préférence de mouvement réduit, le chevron d'une carte dépliable saute à son orientation finale sans rotation animée et le contenu révélé apparaît en fondu instantané plutôt qu'en glissement : l'information reste intégrale, seul le déplacement spatial disparaît. `CARD-R61`
- **[préférence]** Une carte est une surface de consultation calme : un battement expressif sur un conteneur de lecture mentirait sur son rôle, comme le ferait un style cliquable sur une carte statique. `CARD-R63`
- **[préférence]** Un composant qui vit en collection est disqualifié d'emblée pour tout moment expressif : ce qui se répète à chaque carte cesse d'être un moment mérité. `CARD-R64`
- **[préférence]** En grille, les cartes ont des largeurs uniformes et des hauteurs alignées par rangée ; c'est le ratio d'image fixe et la troncature du texte qui rendent cet alignement possible. `CARD-R67`
- **[préférence]** En grille, chaque emplacement occupe la même position sur toutes les cartes : la répétition visuelle promet la prédictibilité et chaque écart la rompt. `CARD-R68`
- **[préférence]** En liste verticale, quand la lecture est séquentielle, une carte peut adopter une disposition horizontale plaçant le media à côté du contenu. `CARD-R69`
- **[préférence]** Une liste de cartes homogènes comparées entre elles rouvre la question du composant : la liste simple redevient candidate. `CARD-R70`
- **[préférence]** Une carte statistique — un chiffre, un libellé, une tendance — est statique par défaut ; si elle conduit vers un détail, elle devient cliquable et suit toutes les règles de ce mode. `CARD-R71`
- **[préférence]** La hiérarchie d'un tableau de bord vient de la taille occupée par chaque carte dans la grille, non d'un axe de style porté par la carte. `CARD-R72`
- **[préférence]** Un carrousel de cartes signale son débordement en laissant une carte partiellement visible en bord de zone ; un carrousel dont rien ne dépasse est indistinguable d'une grille complète. `CARD-R73`
- **[loi]** Toute opération de déplacement offerte au glisser-déposer dispose d'une alternative à pointeur unique réalisant le même déplacement sans maintien ni traînée, et le déplacement effectif est annoncé aux technologies d'assistance. `CARD-R74`
- **[préférence]** L'interactivité d'une carte est univoque : soit la carte est la cible, soit elle contient des cibles, sans ambiguïté possible entre les deux. `CARD-R76`

## Non couvert — poser la question, ne rien trancher

- Carte promotionnelle / alert : La carte veut porter un message mis en avant.
- Carte tâche (kanban) : La carte se déplace entre colonnes.
- Masonry (hauteurs variables) : Les cartes ont des hauteurs différentes (Pinterest).
- Carte dans une modale / side panel : La carte vit dans un espace contraint.
- Carte draggable : On réordonne les cartes.
- Carte dismissable : L'utilisateur peut fermer définitivement la carte.
- Swipe actions mobiles : On glisse une carte pour révéler des actions.
