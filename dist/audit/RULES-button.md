---
sujet: button
nature: components
resume: "Ce fichier contient le raisonnement : quand utiliser quoi, pourquoi, quel wording, quel risque."
selon-contexte: [accessibility, adaptive, border, card, consentement, elevation, emotion, form, iconography, interaction, link, motion, toast, typography, voice]
source: BUTTON-UX.md v1.9.0 + BUTTON-UI.md v1.6.2
empreinte: sha256:28e3c503d988bed4
regles: {loi: 10, preference: 82, non_qualifie: 0}
---
# RULES — button (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Nous utilisons un bouton pour toute action qui modifie un état, soumet une donnée ou déclenche un processus, jamais pour une simple navigation. `BUTTON-R01`
- **[loi]** Un contrôle qui se contente de naviguer vers une autre page doit être un lien, pas un bouton, car les deux n'ont pas le même comportement clavier natif. `BUTTON-R02`
  - vérifiable : un élément de navigation pure utilise un lien (<a href>), jamais un bouton
- **[préférence]** Chez nous, un bouton qui ouvre une fenêtre modale est traité comme un bouton, même s'il ne navigue pas au sens strict. `BUTTON-R03`
  - vérifiable : un contrôle qui ouvre une fenêtre modale est implémenté comme un bouton, pas comme un lien
- **[préférence]** Chez nous, la forme, la bordure et les états visuels d'un bouton doivent suffire à le faire reconnaître comme un contrôle interactif avant même la lecture de son texte. `BUTTON-R04`
- **[préférence]** Chez nous, un bouton ne signale jamais son affordance par une ombre portée : celle-ci vient de son style, sa bordure et ses états. `BUTTON-R05`
  - vérifiable : aucune ombre portée n'est appliquée au bouton à l'état de repos
- **[préférence]** Chez nous, même dans son style le plus discret, un bouton reste un vrai bouton avec zone de contrôle et états propres, jamais un lien déguisé. `BUTTON-R06`
  - vérifiable : un bouton en style discret reste un élément bouton avec états de focus et de pression, jamais un lien
- **[préférence]** Chez nous, le survol d'un bouton produit une transition rapide et progressive, signal de retour immédiat plutôt qu'information nouvelle. `BUTTON-R07`
  - vérifiable : la transition de survol du bouton utilise une durée courte et un ralentissement en sortie (ease-out)
- **[préférence]** Chez nous, toute animation d'état du bouton est interruptible : redéclencher le survol pendant une transition l'inverse depuis où elle en est. `BUTTON-R08`
  - vérifiable : un nouveau survol pendant la transition de sortie inverse l'animation depuis son état courant sans la relancer depuis le début
- **[préférence]** Chez nous, seule la rotation continue de l'indicateur de chargement se fait à vitesse constante ; tout autre mouvement du bouton accélère ou décélère. `BUTTON-R09`
  - vérifiable : seule la rotation de l'indicateur de chargement du bouton utilise une vitesse constante (linéaire)
- **[préférence]** Chez nous, la réussite d'un envoi s'incarne d'abord dans le bouton de soumission lui-même, qui se transforme visuellement avant d'afficher la confirmation. `BUTTON-R10`
- **[préférence]** Chez nous, la célébration d'un envoi réussi ne se joue qu'à un seul endroit à la fois, jamais sur le bouton et dans une notification en même temps. `BUTTON-R11`
  - vérifiable : la célébration animée d'un envoi réussi n'apparaît jamais simultanément sur le bouton et dans une notification pour le même événement
- **[loi]** L'information transmise par une animation doit toujours rester disponible sans elle : en mode mouvement réduit, l'état final s'affiche instantanément, sans perte. `BUTTON-R12`
  - vérifiable : quand les animations sont réduites, l'état final s'affiche instantanément et l'information reste disponible sans dépendre de l'animation
- **[préférence]** Chez nous, l'animation de célébration d'un envoi ne se joue jamais sur une action répétitive ou réflexe, seulement sur les moments qui le méritent. `BUTTON-R13`
  - vérifiable : une même animation de célébration ne se déclenche pas plus d'une fois par séquence utilisateur, ni sur une action répétitive
- **[préférence]** Chez nous, l'envoi démarre réellement dès le premier clic indépendamment de toute animation, et l'état serveur réel prévaut toujours sur elle. `BUTTON-R14`
  - vérifiable : le bouton passe en état loading ou disabled dès le premier clic, avant la fin de toute animation de célébration
- **[préférence]** Chez nous, un bouton se définit par deux dimensions indépendantes : le style, qui exprime son poids visuel, et le tone, qui exprime la nature de l'action. `BUTTON-R16`
- **[préférence]** Chez nous, les styles et les tones d'un bouton se combinent librement, formant seize combinaisons de couleurs possibles, chacune ayant un sens propre. `BUTTON-R17`
  - vérifiable : chaque combinaison des styles et des tones du bouton dispose d'un rendu de couleur défini
- **[préférence]** Chez nous, le bouton dominant d'une vue porte précisément l'action que ce parcours est conçu pour provoquer, pas n'importe quelle action jugée importante. `BUTTON-R18`
- **[préférence]** Chez nous, une vue ne doit jamais afficher plus d'un bouton dominant à la fois, pour ne pas diluer le signal de priorité. `BUTTON-R19`
  - vérifiable : un seul bouton au rang dominant est visible par vue
- **[préférence]** Chez nous, le bouton d'action du header persistant et le bouton dominant du contenu comptent comme deux zones distinctes et peuvent coexister à l'écran. `BUTTON-R20`
  - vérifiable : un bouton d'action de header persistant et un bouton dominant de contenu peuvent coexister à l'écran
- **[préférence]** Chez nous, le bouton du header et celui du contenu de page ne doivent jamais avoir exactement le même poids visuel : l'un des deux doit dominer. `BUTTON-R21`
  - vérifiable : le bouton du header et le bouton dominant de contenu n'ont pas exactement le même poids visuel
- **[préférence]** Chez nous, un bouton alternatif propose une option légitime, comme annuler ou retour, qui ne concurrence jamais visuellement le bouton dominant. `BUTTON-R22`
- **[préférence]** Chez nous, un bouton alternatif a toujours moins de poids visuel que le bouton dominant placé à côté de lui, même à taille identique. `BUTTON-R23`
  - vérifiable : le bouton alternatif utilise un style moins appuyé que le bouton dominant placé à côté de lui
- **[préférence]** Chez nous, un bouton mineur porte une action secondaire présente mais volontairement peu visible, comme voir plus ou modifier les préférences. `BUTTON-R24`
- **[préférence]** Chez nous, si une action en style discret a un enjeu réel fort, c'est le classement de l'action qui doit être revu, pas la visibilité du bouton. `BUTTON-R25`
- **[préférence]** Chez nous, un bouton au style le plus discret peut porter une action à enjeu réel si sa couleur sémantique compense sa faible présence visuelle. `BUTTON-R26`
- **[préférence]** Chez nous, un seul tone de bouton est tiré directement de la couleur de marque ; les autres tones expriment un état sémantique. `BUTTON-R27`
  - vérifiable : seul le tone de marque du bouton utilise une couleur issue de la palette de marque
- **[préférence]** Chez nous, le tone neutre est la couleur par défaut d'un bouton qui n'a pas de charge sémantique particulière au-delà de son style. `BUTTON-R28`
- **[préférence]** Chez nous, le tone destructif signale sans ambiguïté qu'une action supprime, retire ou annule quelque chose de coûteux à revenir en arrière. `BUTTON-R29`
- **[préférence]** Chez nous, un bouton destructif n'est jamais placé exactement là où se trouve habituellement une action fréquente, pour éviter le clic accidentel. `BUTTON-R30`
  - vérifiable : aucun bouton au tone destructif n'occupe l'emplacement habituel d'une action fréquente de l'interface
- **[préférence]** Chez nous, le tone d'avertissement porte une action qui a un poids réel et mérite l'attention, sans jamais détruire ni retirer quoi que ce soit. `BUTTON-R31`
- **[préférence]** Chez nous, un bouton d'avertissement est isolé visuellement des actions fréquentes, selon la même logique que le bouton destructif. `BUTTON-R32`
  - vérifiable : aucun bouton au tone d'avertissement n'occupe l'emplacement habituel d'une action fréquente
- **[préférence]** Chez nous, le choix du style et du tone d'un bouton n'est jamais esthétique : il déclare explicitement l'enjeu réel de l'action pour l'utilisateur. `BUTTON-R34`
- **[préférence]** Chez nous, la taille d'un bouton répond à la densité du contexte qui l'accueille, pas à l'importance perçue de l'action. `BUTTON-R35`
- **[préférence]** Chez nous, la plus petite taille de bouton est réservée aux contextes denses comme les tableaux, barres d'outils et panneaux compacts. `BUTTON-R36`
- **[préférence]** Chez nous, la taille moyenne est la taille par défaut du bouton, utilisée dans les formulaires et la majorité des contextes standards. `BUTTON-R37`
- **[préférence]** Chez nous, la plus grande taille de bouton est réservée aux contextes à forte emphase visuelle volontaire, comme un hero ou un CTA marketing. `BUTTON-R38`
- **[préférence]** Chez nous, tous les boutons d'un même groupe partagent toujours la même taille, même si leurs styles diffèrent. `BUTTON-R39`
  - vérifiable : tous les boutons d'un même groupe partagent la même taille
- **[préférence]** Chez nous, un bouton d'état bascule entre deux états persistants, comme suivre ou ne plus suivre, il ne déclenche pas une action ponctuelle. `BUTTON-R40`
- **[préférence]** Chez nous, le label d'un bouton d'état décrit l'état actuel de l'élément, jamais l'action qu'un clic déclencherait. `BUTTON-R41`
  - vérifiable : le label du bouton d'état décrit l'état actuel plutôt que l'action déclenchée par le clic
- **[préférence]** Chez nous, un bouton de confirmation valide une action déjà engagée plus tôt dans le flux, il ne l'initie pas. `BUTTON-R42`
- **[préférence]** Chez nous, un bouton de confirmation est toujours accompagné d'une option d'annulation visible au même niveau, jamais seul comme unique issue. `BUTTON-R43`
  - vérifiable : une option d'annulation est visible au même niveau que le bouton de confirmation
- **[préférence]** Chez nous, un bouton d'annulation permet de revenir sur une action qui vient d'être exécutée, généralement affiché dans une notification temporaire. `BUTTON-R44`
- **[préférence]** Chez nous, le message proposant d'annuler une action reste visible au moins 5 à 8 secondes, sans bloquer le reste de l'interface pendant ce délai. `BUTTON-R45`
  - vérifiable : le message proposant d'annuler une action reste affiché au moins 5 à 8 secondes
- **[préférence]** Chez nous, une action à enjeu réel doit toujours offrir soit une confirmation préalable, soit une option d'annulation après coup, jamais aucune des deux. `BUTTON-R46`
  - vérifiable : une action à enjeu réel dispose d'au moins l'un des deux mécanismes : confirmation préalable ou annulation après coup
- **[préférence]** Chez nous, le niveau de friction avant une suppression dépend du coût de recréation de la donnée si l'action est mal exécutée. `BUTTON-R47`
- **[préférence]** Chez nous, deux boutons de suppression visuellement identiques peuvent avoir des niveaux de friction différents selon la donnée qu'ils suppriment. `BUTTON-R48`
- **[loi]** Une action à effet unique, comme un paiement ou un envoi définitif, doit être protégée contre un déclenchement multiple par impatience ou latence réseau. `BUTTON-R49`
- **[loi]** Dès le premier clic sur une action à effet unique, le bouton doit passer en état de chargement ou désactivé, avant même la réponse du serveur. `BUTTON-R50`
  - vérifiable : dès le premier clic, le bouton passe en état loading ou disabled avant la réponse du serveur
- **[préférence]** Chez nous, une friction volontaire retarde l'exécution d'une action destructive à enjeu élevé, pour empêcher un clic réflexe. `BUTTON-R51`
- **[préférence]** Chez nous, la confirmation finale d'une action très critique impose un délai de 2 à 3 secondes avant d'être cliquable, ou une saisie explicite de confirmation. `BUTTON-R52`
  - vérifiable : le bouton de confirmation finale reste non cliquable pendant 2 à 3 secondes, ou nécessite la saisie d'un mot de confirmation, pour les actions les plus critiques
- **[préférence]** Chez nous, l'ordre entre bouton dominant et alternatif suit une convention propre à chaque type de paire, faute de convention universelle établie. `BUTTON-R53`
- **[préférence]** Chez nous, une fois un ordre choisi pour un type de paire de boutons, il reste identique sur tout le produit, sans jamais varier d'un écran à l'autre. `BUTTON-R54`
  - vérifiable : l'ordre choisi pour un type de paire de boutons donné est identique sur tous les écrans du produit
- **[préférence]** Chez nous, deux boutons de poids visuel identique côte à côte sont à proscrire, sauf dans un choix binaire volontairement équilibré. `BUTTON-R55`
  - vérifiable : aucun couple de boutons adjacents ne partage le même poids visuel, sauf choix binaire équilibré explicite
- **[préférence]** Chez nous, un menu d'au moins trois options proposées à poids visuel égal côte à côte est un cas où la règle du bouton dominant unique ne s'applique pas. `BUTTON-R56`
- **[préférence]** Chez nous, l'espacement entre deux boutons adjacents doit être suffisant pour éviter le clic accidentel sur le mauvais bouton. `BUTTON-R57`
- **[préférence]** Chez nous, un bouton hérite toujours de la grille du contenu qu'il accompagne, il ne flotte jamais de façon arbitraire. `BUTTON-R58`
- **[préférence]** Chez nous, un bouton lié à un bloc de contenu s'aligne sur la même grille que ce contenu, jamais centré par simple préférence esthétique. `BUTTON-R59`
  - vérifiable : un bouton lié à un bloc de contenu est aligné sur la même grille que ce contenu, pas centré
- **[préférence]** Chez nous, un formulaire ne doit jamais avoir plus d'un bouton de soumission. `BUTTON-R60`
  - vérifiable : un formulaire ne contient qu'un seul bouton de soumission
- **[préférence]** Chez nous, un groupe de boutons peut se réorganiser selon la largeur de son conteneur, mais chaque bouton garde toujours la même action, le même style et le même niveau de friction. `BUTTON-R61`
  - vérifiable : quelle que soit la disposition adoptée par un groupe de boutons, chaque bouton garde la même action, le même style, le même tone, le même nom accessible et le même niveau de friction
- **[préférence]** Chez nous, le texte visible d'un bouton n'est jamais tronqué automatiquement ; il se replie sur plusieurs lignes si besoin plutôt que d'être coupé. `BUTTON-R62`
  - vérifiable : le texte visible du bouton n'est jamais coupé par une ellipse automatique
- **[préférence]** Chez nous, le bouton de soumission d'un formulaire se trouve toujours en fin de parcours, jamais au milieu d'un long formulaire qui défile. `BUTTON-R63`
  - vérifiable : le bouton de soumission d'un formulaire long est positionné en fin de flux, pas au milieu du contenu défilant
- **[préférence]** Chez nous, le libellé du bouton final d'un formulaire reflète la conclusion réelle de l'action plutôt que de rester générique sur la dernière étape. `BUTTON-R64`
- **[loi]** Une action affichée uniquement au survol d'une ligne doit rester accessible sans survol, car les appareils tactiles n'ont pas de hover et l'action deviendrait inutilisable. `BUTTON-R66`
  - vérifiable : les icônes d'action d'une ligne de table restent visibles ou accessibles sans nécessiter de survol
- **[préférence]** Chez nous, une action destructive représentée par une simple icône reste soumise à confirmation obligatoire, contrairement à une icône d'action réversible. `BUTTON-R67`
  - vérifiable : une icône d'action destructive déclenche toujours une confirmation avant exécution
- **[préférence]** Chez nous, la position du bouton qui referme ou valide une modale suit une convention unique définie pour tout le produit, jamais réinventée au cas par cas. `BUTTON-R68`
  - vérifiable : la position du bouton principal d'une modale est identique sur toutes les modales du produit
- **[préférence]** Chez nous, dans une modale de confirmation, le bouton destructif n'est jamais celui qui s'active par défaut avec la touche Entrée. `BUTTON-R69`
  - vérifiable : dans une modale de confirmation destructive, le bouton par défaut activable à la touche Entrée n'est pas le bouton destructif
- **[loi]** Un bouton en grille dense doit rester lisible sans que son padding ne descende sous le seuil minimal de zone tactile accessible. `BUTTON-R71`
  - vérifiable : le padding du bouton ne descend jamais sous le seuil minimal de zone tactile, même en grille dense
- **[préférence]** Chez nous, le bouton d'action du header reste visible au défilement ou se repositionne intelligemment, il ne disparaît jamais. `BUTTON-R72`
  - vérifiable : le bouton d'action du header reste visible ou accessible pendant le défilement de la page
- **[préférence]** Chez nous, un header ne contient qu'un seul bouton d'action dominant ; les autres éléments de navigation restent des liens, pas des boutons. `BUTTON-R73`
  - vérifiable : un seul bouton au rang dominant apparaît dans le header, les autres éléments de navigation sont des liens
- **[préférence]** Chez nous, dans une pagination, la page actuellement affichée n'est jamais cliquable et son état est visuellement sans ambiguïté. `BUTTON-R74`
  - vérifiable : le bouton représentant la page courante dans une pagination n'est pas cliquable
- **[préférence]** Chez nous, une pagination affiche, quand c'est pertinent, une indication explicite de progression comme le numéro de page sur le total. `BUTTON-R75`
- **[préférence]** Chez nous, le bouton de fermeture d'une bannière promotionnelle reste une action facile et sans friction. `BUTTON-R77`
  - vérifiable : le bouton de fermeture d'une bannière promotionnelle est immédiatement accessible sans étape supplémentaire
- **[préférence]** Chez nous, un bouton d'action flottant réserve une zone d'exclusion autour de lui pour ne jamais masquer de contenu critique. `BUTTON-R78`
  - vérifiable : une zone d'exclusion est réservée autour du bouton flottant pour ne masquer aucun contenu critique
- **[préférence]** Chez nous, un écran ne doit jamais afficher plus d'un bouton d'action flottant à la fois. `BUTTON-R79`
  - vérifiable : un seul bouton d'action flottant est présent par écran
- **[préférence]** Chez nous, un bouton désactivé ne doit jamais l'être silencieusement : la cause de la désactivation doit toujours être exposée à l'utilisateur. `BUTTON-R80`
  - vérifiable : tout bouton désactivé expose la raison de sa désactivation via un texte, une infobulle ou un changement visuel explicite
- **[préférence]** Chez nous, l'état de chargement d'un bouton remplace son libellé par un indicateur de progression, plutôt que de simplement le griser. `BUTTON-R81`
  - vérifiable : l'état de chargement du bouton remplace le libellé par un indicateur de progression plutôt que de simplement le griser
- **[préférence]** Chez nous, sur mobile, l'absence de survol est compensée par un léger retour haptique au moment où l'utilisateur touche le bouton. `BUTTON-R82`
- **[loi]** Le retour haptique d'un bouton ne doit jamais être l'unique confirmation d'une action : le changement d'état doit toujours rester perceptible visuellement. `BUTTON-R83`
  - vérifiable : le changement d'état du bouton reste perceptible visuellement sans dépendre du retour haptique
- **[loi]** Une action grave ne doit jamais se déclencher dès l'enfoncement du bouton : elle doit partir au relâchement, et un appui relâché en dehors du bouton doit être annulé. `BUTTON-R84`
  - vérifiable : une action grave se déclenche à l'événement de relâche (click/pointerup), jamais à l'enfoncement (pointerdown), et un appui relâché en dehors du bouton est annulé
  - source : https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation.html
- **[préférence]** Chez nous, sur desktop, le survol du bouton est le principal signal confirmant qu'il est bien interactif avant le clic. `BUTTON-R85`
  - vérifiable : un changement visuel perceptible se produit au survol du bouton sur desktop
- **[préférence]** Chez nous, quand une action ne peut être réitérée qu'après un délai, le compte à rebours reste affiché en continu sur le bouton. `BUTTON-R86`
  - vérifiable : le compte à rebours d'une action différée reste affiché en continu sur le bouton lui-même
- **[préférence]** Chez nous, un verbe d'action qui décrit le bénéfice ou la conséquence est préféré à un label générique comme valider ou OK. `BUTTON-R87`
- **[loi]** Le texte d'un bouton doit rester compréhensible même hors contexte, et un même concept doit toujours porter le même mot partout dans le produit. `BUTTON-R88`
  - vérifiable : le texte du bouton reste compréhensible hors de tout contexte environnant, et un même concept est toujours désigné par le même mot dans toute l'interface
- **[préférence]** Chez nous, le ton du bouton de soumission ne se réchauffe que sur le moment précis de succès d'un envoi catalogué ; partout ailleurs il reste factuel. `BUTTON-R89`
  - vérifiable : en dehors du moment de succès d'envoi catalogué, le libellé du bouton ne contient ni emoji ni point d'exclamation
- **[préférence]** Chez nous, la position de l'icône d'un bouton est l'une de cinq valeurs possibles : aucune, en tête, en fin, des deux côtés, ou icône seule. `BUTTON-R90`
  - vérifiable : la position de l'icône du bouton correspond à l'une de cinq valeurs : aucune, en tête, en fin, des deux côtés, ou icône seule
- **[loi]** Un bouton qui n'affiche qu'une icône, sans texte visible, doit toujours porter un nom accessible, sans aucune exception. `BUTTON-R91`
  - vérifiable : un bouton n'affichant qu'une icône, sans texte visible, possède toujours un nom accessible (aria-label)
- **[préférence]** Chez nous, l'icône se place en tête du texte pour une action de navigation, et en fin de texte pour une action de progression ou d'ouverture. `BUTTON-R92`
- **[préférence]** Chez nous, une icône de chaque côté du texte n'est utilisée que lorsque les deux directions portent réellement du sens. `BUTTON-R93`
- **[préférence]** Chez nous, un badge ou compteur affiché sur un bouton est une simple information d'état, jamais une seconde action cliquable. `BUTTON-R94`
  - vérifiable : le badge ou compteur affiché sur un bouton n'est pas un élément cliquable indépendant
- **[préférence]** Chez nous, un bouton de connexion sociale suit les contraintes de la marque tierce plutôt que le design system interne, à titre d'exception documentée. `BUTTON-R95`
- **[préférence]** Chez nous, le niveau de friction d'un bouton doit toujours être proportionnel au risque réel de l'action, jamais appliqué de façon uniforme. `BUTTON-R97`

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Style + Tone | Risque principal | Sévérité | Réversibilité |
|---|---|---|---|
| filled + primary (conversion) | Perte de conversion si wording/état mal géré | Élevée | Facile à corriger, sessions perdues non récupérables |
| filled/ghost + destructive | Perte de données, confiance utilisateur | Critique | Nulle par définition — le design doit compenser |
| ghost + destructive (icône table/liste) | Exclusion accessibilité en plus du risque destructive | Critique | Nulle pour l'action, triviale pour la correction du bouton lui-même |
| Désactivé sans cause (tout style) | Confusion, abandon silencieux | Moyenne | Facile à corriger, invisible dans les rapports de bug classiques |
| filled/stroke + neutral (engagement financier) | Double soumission, perte de confiance si mal confirmé | Critique | Nulle en cas de double débit — dépend d'un remboursement manuel |
