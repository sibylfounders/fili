---
sujet: toast
nature: components
resume: "Ce fichier contient le raisonnement : tone, timing, actions, empilement, position, instrument"
selon-contexte: [adaptive, alert, button, emotion, motion, voice]
source: TOAST-UX.md v1.0.1 + TOAST-UI.md v1.1.0
empreinte: sha256:db30391839ac95b9
regles: {loi: 7, preference: 23, non_qualifie: 0}
---
# RULES — toast (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Le toast confirme l'issue immédiate d'une action déclenchée par l'utilisateur lorsque cette confirmation n'a pas besoin de rester consultable. `TOAST-R05`
- **[loi]** Le toast n'est employé ni pour une condition qui dure, ni pour une décision qui doit bloquer l'utilisateur, ni pour du contenu promotionnel. `TOAST-R06`
- **[préférence]** Le toast porte l'un des quatre tones info, success, warning ou danger, identiques à ceux de l'alert ; il n'existe pas de tone neutre. `TOAST-R08`
- **[préférence]** Les tones warning et danger sont autorisés sur un toast à la seule condition que la condition grave dispose d'un répondant durable ailleurs dans l'interface ; un toast n'est jamais l'unique porteur d'un état qui persiste. `TOAST-R09`
- **[loi]** Le minuteur d'un toast se suspend intégralement au survol du pointeur et au focus clavier, et ne reprend son décompte qu'à leur sortie. `TOAST-R10`
- **[loi]** Un toast n'est jamais le seul porteur d'une information : l'état qu'il confirme reste lisible dans l'écran sous-jacent après sa disparition. `TOAST-R11`
- **[préférence]** La durée d'affichage d'un toast ne descend jamais sous cinq secondes, qu'il porte une action ou non. `TOAST-R12`
- **[préférence]** Un toast porte au plus une action ; il n'expose jamais une seconde sortie ni un second lien. `TOAST-R13`
- **[préférence]** L'action d'un toast est soumise à la même suspension de minuteur que son texte, afin que la fenêtre de décision annoncée reste effective au survol comme au focus clavier. `TOAST-R14`
- **[préférence]** Au plus trois toasts sont affichés simultanément. `TOAST-R16`
- **[préférence]** Une pile de toasts s'ordonne par ordre chronologique d'arrivée et non par gravité décroissante, contrairement à une pile d'alerts qui empile des conditions simultanément vraies. `TOAST-R17`
- **[préférence]** Lorsque le plafond d'empilement est atteint, le toast le plus ancien sort ; les toasts ne sont jamais agrégés en un message de synthèse. `TOAST-R18`
- **[préférence]** La position et la largeur d'un toast sont déterminées par l'espace du conteneur qui l'héberge et non par un ancrage fixe à un coin du viewport. `TOAST-R19`
- **[préférence]** Le moment E-motion « réussite d'un envoi ou d'une soumission » s'incarne dans le toast et non dans l'alert. `TOAST-R21`
- **[préférence]** L'instrument illustration ne s'active que sur un toast seul à l'écran, jamais sur un toast qui rejoint une pile existante. `TOAST-R22`
- **[loi]** Un toast confirme un événement passé et ne peut jamais être le seul endroit où vit une information qui compte encore. `TOAST-R27`

## Consignes d'implémentation

- **[préférence]** Le toast porte elevation.overlay, seul écart de relief avec l'alert qui n'en porte aucune : le relief signale la superposition, il n'est pas un décor. `TOAST-U01`
- **[préférence]** Le toast n'expose pas de bouton de fermeture par défaut, la suspension du minuteur au survol et au focus étant tenue pour couvrir le besoin de temps de lecture supplémentaire. `TOAST-U02`
- **[préférence]** La durée d'affichage d'un toast vaut la durée de base, augmentée d'une extension par mot au-delà de huit mots et d'un bonus si une action est présente, bornée par une valeur de plafond. `TOAST-U03`
- **[loi]** Le minuteur se suspend au survol du toast et à tout focus contenu dans le toast, action comprise, et reprend son décompte à leur sortie sans jamais repartir de zéro. `TOAST-U04`
- **[préférence]** Le minuteur est implémenté par un unique délai programmé par toast, annulé et relancé aux entrées et sorties de survol ou de focus, jamais par une boucle d'intervalle recalculée en continu. `TOAST-U05`
- **[préférence]** La file de toasts est en premier entré premier sorti avec un plafond de trois ; l'arrivée d'un quatrième toast fait sortir le plus ancien selon la chorégraphie de disparition normale et non par coupure brutale. `TOAST-U06`
- **[préférence]** Chaque toast d'une pile possède son propre minuteur indépendant ; l'arrivée d'un nouveau toast ne réinitialise pas le temps déjà écoulé des précédents. `TOAST-U07`
- **[préférence]** La région qui héberge la pile de toasts est déclarée conteneur de requête sur l'axe inline, et non ancrée en dur au viewport. `TOAST-U08`
- **[préférence]** Un élément déclaré conteneur de requête et sorti du flux normal reçoit obligatoirement une largeur explicite : la containment de taille l'empêche de tirer sa largeur de son contenu, et un plafond de largeur seul ne détermine aucune largeur de départ. `TOAST-U09`
- **[préférence]** En état compact la région de toasts occupe la pleine largeur utile et empile du bas vers le haut ; en états regular et expanded elle est ancrée en bas au centre, à la largeur maximale de structure. `TOAST-U10`
- **[préférence]** Quand l'instrument illustration s'active, le glyphe est dessiné par animation de son tracé, jamais rendu par une illustration statique importée. `TOAST-U11`
- **[préférence]** L'animation de l'instrument suit trois actes — anticipation, tracé du glyphe, résolution chromatique — dont la somme des durées ne dépasse pas la durée de célébration. `TOAST-U12`
- **[loi]** Sous prefers-reduced-motion, les actes de mouvement de l'instrument sont supprimés et l'état final est atteint par bascule instantanée, sans perte de l'information portée. `TOAST-U13`
- **[préférence]** La condition d'activation de l'instrument est évaluée à l'injection du toast et non en continu : un acte déjà commencé va à son terme, mais aucun nouveau moment illustré ne démarre tant que la pile compte plus d'un toast. `TOAST-U14`
