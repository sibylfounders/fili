---
sujet: modal
nature: components
resume: "La modale est le superposé qui **interrompt** : elle bloque le flux, réclame une décision ou une saisie"
selon-contexte: [button, form, overlay]
source: MODAL-UX.md v1.0.0 + MODAL-UI.md v1.0.1
empreinte: sha256:8af333f61a23f8ed
regles: {loi: 10, preference: 15, non_qualifie: 0}
---
# RULES — modal (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une modale porte toujours une conclusion : au moins une action qui la ferme et clôt la question posée. Un contenu sans fin naturelle — navigation libre, exploration longue, information destinée à persister — relève d'une page, jamais d'une modale. `MODAL-R02`
- **[préférence]** Une modale n'est légitime que lorsque trois conditions tiennent ensemble : l'interruption est courte, une décision doit être prise avant de pouvoir continuer ailleurs, et le contexte d'origine doit être retrouvé intact ; dès que l'une manque, le besoin est routé vers une page, un drawer, une saisie en ligne, une notification ou un popover. `MODAL-R03`
- **[préférence]** Une seule modale est ouverte à la fois : une modale n'en déclenche jamais une seconde et deux surfaces modales ne se superposent jamais. `MODAL-R04`
- **[préférence]** Lorsqu'une action lancée depuis une modale réclame elle-même une confirmation, la modale ouverte remplace son propre contenu par l'étape de confirmation au lieu d'empiler une seconde surface ; fermer puis rouvrir n'est admis que si le contexte de retour n'a pas besoin d'être préservé. `MODAL-R05`
- **[préférence]** Trois familles d'usage seulement sont admises pour la modale — confirmation d'action, saisie courte, détail ou lecture — chacune fixant son contenu, son cran de largeur et son nombre d'actions ; toute quatrième famille suppose de remonter l'arbitrage. `MODAL-R06`
- **[préférence]** Le cran de largeur d'une modale est déterminé par sa famille d'usage et jamais par la longueur de son contenu : un texte long se replie en lignes supplémentaires, il ne fait pas passer la modale au cran supérieur. `MODAL-R07`
- **[loi]** Toute action destructive et irréversible dont le coût dépasse ce qu'une annulation suffirait à réparer se confirme dans une modale de la famille confirmation, jamais par une simple alerte dans le flux ni par une boîte de dialogue native du navigateur. `MODAL-R08`
- **[loi]** Le titre et le corps d'une confirmation destructive nomment l'objet réel visé et la conséquence de l'action, jamais une formule générique : la question doit se comprendre sans relire l'écran de fond. `MODAL-R09`
- **[loi]** Dans une modale de confirmation destructive, l'action irréversible n'est jamais celle qu'un appui réflexe sur Entrée déclenche : le focus initial va à l'action la moins destructive, ou aucune action n'est pré-activée ; l'emphase et la position du bouton destructif restent fixées par le langage de bouton. `MODAL-R10`
- **[loi]** Une destruction à enjeu élevé — volume important, ressources dépendantes, recréation coûteuse — exige une confirmation renforcée, dont la forme documentée est la saisie manuelle du nom de la ressource avant activation du bouton destructif ; la modale héberge ce mécanisme sans le redéfinir. `MODAL-R11`
- **[préférence]** Le clic sur le voile est le seul des trois moyens de fermeture qui se désarme, et seulement lorsqu'une fermeture accidentelle perdrait une saisie en cours ; Échap et le bouton de fermeture restent actifs dans tous les cas, et la confirmation de perte de données incombe au consommateur du composant, qui ne l'implémente pas nativement. `MODAL-R13`
- **[loi]** Toute modale expose un nom accessible : un titre visible référencé par aria-labelledby, ou à défaut un aria-label explicite porté par la surface ; l'absence des deux laisse le dialogue annoncé sans complément. `MODAL-R14`
- **[loi]** Le titre d'une modale nomme la tâche ou la question qu'elle pose, sous forme de phrase verbale brève, et jamais la catégorie du composant. `MODAL-R15`
- **[préférence]** Dans une modale de saisie, le focus d'entrée va au premier contrôle de saisie et non au bouton de fermeture ; le bouton de fermeture de l'en-tête n'est jamais placé avant le contenu principal dans l'ordre de tabulation. `MODAL-R17`
- **[loi]** Au-delà de la hauteur disponible, seule la région de contenu d'une modale défile : l'en-tête et le pied restent fixes et visibles, et la surface entière ne défile jamais. `MODAL-R18`
- **[loi]** Le pied d'actions d'une modale reste atteignable sans défiler, et sa fixation ne recouvre jamais entièrement un contrôle qui vient de recevoir le focus dans la région défilante. `MODAL-R19`
- **[loi]** Une information qui n'appelle aucune décision immédiate — succès, erreur non bloquante, changement de statut — se rend par une notification non modale ou une alerte dans le flux, jamais par une modale. `MODAL-R21`

## Consignes d'implémentation

- **[préférence]** L'en-tête du composant établit lui-même la liaison entre le titre et la surface, qui porte role="dialog" et aria-modal="true", sans identifiant à câbler à la main ; une modale sans en-tête reçoit un aria-label explicite. `MODAL-U01`
- **[préférence]** La modale n'admet que deux crans de largeur : un cran étroit pour la confirmation et la saisie courte, un cran par défaut pour le détail, l'illustration et le tableau court ; aucun troisième cran n'existe, un contenu plus large relevant d'une page. `MODAL-U02`
- **[préférence]** Le voile est rendu en position fixe sur tout le cadre d'affichage et avant la surface dans l'ordre du document, donc derrière elle, les deux partageant le même cran d'empilement ; la surface porte l'ombre de superposé, un rayon, un fond et une bordure référencés en jetons. `MODAL-U03`
- **[préférence]** L'implémentation réalise le contrat de focus par un piège manuel géré au clavier : le focus entre dans la surface à l'ouverture, sur le premier élément focalisable ou sur la surface elle-même rendue focalisable par programme, Tab et Maj+Tab bouclent entre le premier et le dernier élément focalisable, et la fermeture restitue le focus à l'élément actif capturé à l'ouverture. `MODAL-U04`
- **[préférence]** Trois déclencheurs appellent la fermeture — la touche Échap, le bouton de fermeture de l'en-tête, et le clic sur le voile lorsqu'il est armé ; désarmer le clic sur le voile ne retire que ce troisième déclencheur. `MODAL-U06`
- **[préférence]** L'entrée et la sortie de la surface animent l'opacité et une translation verticale sur le cran de durée lent, le voile animant son opacité sur la même durée ; sous préférence de mouvement réduit, la transition est supprimée, jamais l'état final. `MODAL-U07`
- **[préférence]** Le verrou de défilement porte sur la région qui défile réellement et non sur le document : l'implémentation verrouille le corps du document et chaque ancêtre défilant du déclencheur, puis restaure l'état d'origine de chacun à la fermeture. `MODAL-U09`
- **[préférence]** Aucune prise de focus liée à un superposé ne fait défiler quoi que ce soit : l'entrée du focus comme son retour au déclencheur demandent explicitement au navigateur de ne pas amener l'élément dans le champ de vision. `MODAL-U10`

## Non couvert — poser la question, ne rien trancher

- Formulaire long multi-champs : Inscription, réglages complets d'un objet — plusieurs sections de champs.
- Wizard multi-étapes : Séquence d'écrans qui progresse vers un but (ex. création de compte).
- À l'arrivée sur une URL profonde (deep link) : Une route applicative ouvre directement la modale au chargement.
- Ouverture automatique sans interaction : Une modale s'affiche au chargement sans déclencheur explicite (ex. onboarding).
- Confirmation de perte de données avant fermeture : Échap ou la croix sont actionnés avec une saisie non enregistrée.
- Drawer : Un panneau ancré à un bord plutôt que centré à l'écran.
- Toast : Une notification éphémère et non-modale, sans décision requise.
- Alert inline : Un message dans le flux de la page, non superposé.
- Popover / dropdown : Un superposé non-modal ancré au déclencheur, pour un détail court.
- Modale sur modale (empilement) : Une seconde modale s'ouvrirait depuis une première déjà ouverte.
- Page dédiée : Un contenu long, autonome, navigable et partageable par URL.
- Confirmation native du navigateur (beforeunload) : L'avertissement natif à la fermeture d'onglet ou de fenêtre.
