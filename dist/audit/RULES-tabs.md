---
sujet: tabs
nature: components
resume: "Des onglets **découpent un même objet en vues exclusives** : un seul volet visible à la fois, et"
selon-contexte: [accessibility, border, button, link, motion, navigation]
source: TABS-UX.md v1.0.0 + TABS-UI.md v1.1.0
empreinte: sha256:efdbe06227a026c2
regles: {loi: 17, preference: 11, non_qualifie: 0}
---
# RULES — tabs (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un jeu d'onglets s'applique à un seul objet dont les volets sont des vues alternatives du même sujet, et non à des sujets distincts regroupés par commodité de mise en page. `TABS-R01`
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[loi]** Les onglets sont écartés lorsque deux volets doivent être comparés simultanément, lorsque leur contenu doit rester trouvable par la recherche dans la page, lorsqu'il n'existe qu'un seul volet, ou lorsque les volets sont en réalité les étapes ordonnées d'un parcours. `TABS-R02`
  - vérifiable : aucun jeu d'onglets ne comporte un seul onglet
- **[loi]** Des onglets n'affichent qu'un seul volet à la fois ; l'exclusivité est le critère qui les sépare d'un accordéon, dont plusieurs sections peuvent être ouvertes simultanément et lues à la suite. `TABS-R03`
  - vérifiable : un seul volet d'un même jeu d'onglets est affiché à un instant donné
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[loi]** Lorsque l'usage réel conduit les utilisateurs à ouvrir successivement tous les onglets pour tout lire, le contenu relève d'un composant multi-ouvert et non d'un jeu d'onglets. `TABS-R04`
- **[préférence]** Une bascule d'onglet change de vue à l'intérieur de la même page : elle ne modifie pas l'URL et n'ajoute pas d'entrée dans l'historique, de sorte que le bouton Retour du navigateur ne défait jamais un changement d'onglet. `TABS-R05`
  - vérifiable : une bascule d'onglet n'ajoute aucune entrée à l'historique du navigateur
- **[loi]** Un jeu de volets qui doit être partageable par URL, indexable ou atteignable par le bouton Retour relève de la navigation : ses déclencheurs deviennent des liens et la sémantique de tablist est abandonnée au profit d'une navigation étiquetée, l'apparence visuelle des onglets pouvant être conservée. `TABS-R06`
  - vérifiable : aucun élément portant role=tab n'expose une destination href
  - source : https://carbondesignsystem.com/components/tabs/usage/
- **[préférence]** Le nombre d'onglets reste restreint à ce qui tient sur une seule ligne dans la largeur disponible, aucun seuil numérique absolu n'étant fixé. `TABS-R07`
- **[loi]** Un jeu d'onglets ne se répartit jamais sur deux lignes : en cas de débordement, la liste d'onglets défile horizontalement ou le contenu est refondu. `TABS-R08`
  - vérifiable : la liste d'onglets ne présente jamais plus d'une ligne, quelle que soit la largeur du conteneur
  - source : https://carbondesignsystem.com/components/tabs/usage/
- **[loi]** Le libellé d'un onglet est court et nominal — un ou deux mots — et n'est jamais une phrase complète ni un verbe d'action, un onglet ouvrant une vue et ne déclenchant pas une opération. `TABS-R09`
  - vérifiable : aucun libellé d'onglet ne commence par un verbe à l'infinitif ou à l'impératif
- **[loi]** L'onglet courant se distingue par au moins un canal non chromatique en plus de la couleur — poids typographique et trait ou fond porteur — et jamais par la couleur seule. `TABS-R10`
  - vérifiable : l'onglet courant se distingue des autres par au moins une propriété visuelle non chromatique
- **[loi]** L'état sélectionné de l'onglet courant est exposé programmatiquement par aria-selected, redondant avec le signal visuel : ni l'un ni l'autre n'est seul porteur de l'information. `TABS-R11`
  - vérifiable : exactement un onglet du jeu porte aria-selected=true, tous les autres aria-selected=false
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[loi]** Deux modes d'activation d'un onglet coexistent : l'activation automatique, où le volet suit le focus, et l'activation manuelle, où les flèches ne déplacent que le focus et où Entrée ou Espace active l'onglet focalisé. `TABS-R12`
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[loi]** L'activation automatique est le mode par défaut tant que le volet associé s'affiche sans latence perceptible, ce qui suppose son contenu déjà disponible ; dès que l'affichage d'un volet engage une requête, un calcul ou un rendu coûteux, l'activation manuelle s'impose. `TABS-R13`
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[loi]** La liste porte role=tablist, chaque onglet role=tab et chaque volet role=tabpanel, et un seul onglet — le courant — reste dans l'ordre de tabulation avec tabindex 0, les autres en étant retirés avec tabindex -1, de sorte que la tabulation entre et sort de la liste en une étape. `TABS-R14`
  - vérifiable : un seul élément role=tab d'un même jeu porte tabindex=0
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[loi]** À l'intérieur de la liste d'onglets, les flèches gauche et droite déplacent le focus d'onglet en onglet avec bouclage du dernier au premier, Origine porte le focus au premier onglet et Fin au dernier ; le mode d'activation détermine si ce déplacement change aussi le volet affiché. `TABS-R15`
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[loi]** Le conteneur du volet est inclus dans l'ordre de tabulation avec tabindex 0 lorsqu'il ne commence pas par un élément focalisable, et le couple onglet/volet se relie dans les deux sens par aria-controls et aria-labelledby. `TABS-R16`
  - vérifiable : chaque role=tab porte un aria-controls résolvant vers son tabpanel, et chaque tabpanel un aria-labelledby résolvant vers son tab
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[préférence]** Par défaut, le volet non courant est retiré du DOM plutôt que masqué, son maintien en mémoire devant être demandé explicitement. `TABS-R17`
  - vérifiable : en l'absence de demande explicite de maintien, aucun volet non courant n'est présent dans le DOM
- **[préférence]** Un volet contenant une saisie utilisateur que la bascule ne doit pas perdre reste monté et seulement masqué, au lieu d'être démonté : le coût de le garder en mémoire est inférieur au coût d'une saisie effacée silencieusement. `TABS-R18`
- **[loi]** Un jeu d'onglets n'a jamais d'état sans onglet sélectionné : en l'absence de valeur initiale explicite, le premier onglet monté devient courant, et il existe toujours un volet visible. `TABS-R19`
  - vérifiable : à tout instant, exactement un onglet du jeu est sélectionné
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **[préférence]** L'atteinte d'un onglet précis depuis l'extérieur de la page passe par un paramètre d'URL ou un fragment lu au montage pour initialiser la valeur, et non par une entrée d'historique poussée à chaque bascule. `TABS-R20`

## Non couvert — poser la question, ne rien trancher

- Comparateur de plans tarifaires : Deux offres à regarder en même temps, pas l'une après l'autre.
- Formulaire long découpé en onglets : Champs d'une même soumission répartis en volets exclusifs.
- Deux volets à comparer côte à côte : Le contenu masqué est précisément ce qu'on veut voir en même temps.
- Contenu cherché au Cmd+F : Le volet non monté ou masqué échappe à la recherche de page.
- Un seul volet disponible : Un onglet unique n'est pas un choix — habillage inutile.
- Étapes d'un parcours imposé : Ordre contraint, pas de bascule libre — c'est un stepper.
- Sujets sans rapport logés côte à côte : Les volets ne décrivent pas le même objet.
- Onglet désactivé : Fonctionnalité verrouillée (plan, permission) rendue non activable.
- Widget avec scroll interne à préserver : Position de défilement à conserver entre deux visites du volet.
- Badge de compteur sur un onglet : Ex. « Messages (3) » — affichage d'un nombre sur le libellé.
- Regroupement multi-ouvert : Plusieurs sections ouvertes à la fois.
- Bascule partageable par URL à chaque clic : Historique poussé à chaque changement de volet.
- Superposé qui recouvre et piège : Contenu qui masque le reste de l'écran.
