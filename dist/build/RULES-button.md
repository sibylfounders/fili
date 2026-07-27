---
sujet: button
nature: components
resume: "Ce fichier contient le raisonnement : quand utiliser quoi, pourquoi, quel wording, quel risque."
selon-contexte: [accessibility, adaptive, border, card, consentement, elevation, emotion, form, iconography, interaction, link, motion, toast, typography, voice]
source: BUTTON-UX.md v1.8.1 + BUTTON-UI.md v1.6.2
empreinte: sha256:bfb4367b9c587424
regles: {loi: 11, preference: 83, non_qualifie: 0}
---
# RULES — button (compilé, mode build)

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
- **[préférence]** Chez nous, un bouton qui ouvre une fenêtre modale est traité comme un bouton, même s'il ne navigue pas au sens strict. `BUTTON-R03`
- **[préférence]** Chez nous, la forme, la bordure et les états visuels d'un bouton doivent suffire à le faire reconnaître comme un contrôle interactif avant même la lecture de son texte. `BUTTON-R04`
- **[préférence]** Chez nous, un bouton ne signale jamais son affordance par une ombre portée : celle-ci vient de son style, sa bordure et ses états. `BUTTON-R05`
- **[préférence]** Chez nous, même dans son style le plus discret, un bouton reste un vrai bouton avec zone de contrôle et états propres, jamais un lien déguisé. `BUTTON-R06`
- **[préférence]** Chez nous, le survol d'un bouton produit une transition rapide et progressive, signal de retour immédiat plutôt qu'information nouvelle. `BUTTON-R07`
- **[préférence]** Chez nous, toute animation d'état du bouton est interruptible : redéclencher le survol pendant une transition l'inverse depuis où elle en est. `BUTTON-R08`
- **[préférence]** Chez nous, seule la rotation continue de l'indicateur de chargement se fait à vitesse constante ; tout autre mouvement du bouton accélère ou décélère. `BUTTON-R09`
- **[préférence]** Chez nous, la réussite d'un envoi s'incarne d'abord dans le bouton de soumission lui-même, qui se transforme visuellement avant d'afficher la confirmation. `BUTTON-R10`
- **[préférence]** Chez nous, la célébration d'un envoi réussi ne se joue qu'à un seul endroit à la fois, jamais sur le bouton et dans une notification en même temps. `BUTTON-R11`
- **[loi]** L'information transmise par une animation doit toujours rester disponible sans elle : en mode mouvement réduit, l'état final s'affiche instantanément, sans perte. `BUTTON-R12`
- **[préférence]** Chez nous, l'animation de célébration d'un envoi ne se joue jamais sur une action répétitive ou réflexe, seulement sur les moments qui le méritent. `BUTTON-R13`
- **[préférence]** Chez nous, l'envoi démarre réellement dès le premier clic indépendamment de toute animation, et l'état serveur réel prévaut toujours sur elle. `BUTTON-R14`
- **[préférence]** Chez nous, un bouton se définit par deux dimensions indépendantes : le style, qui exprime son poids visuel, et le tone, qui exprime la nature de l'action. `BUTTON-R16`
- **[préférence]** Chez nous, les styles et les tones d'un bouton se combinent librement, formant seize combinaisons de couleurs possibles, chacune ayant un sens propre. `BUTTON-R17`
- **[préférence]** Chez nous, le bouton dominant d'une vue porte précisément l'action que ce parcours est conçu pour provoquer, pas n'importe quelle action jugée importante. `BUTTON-R18`
- **[préférence]** Chez nous, une vue ne doit jamais afficher plus d'un bouton dominant à la fois, pour ne pas diluer le signal de priorité. `BUTTON-R19`
- **[préférence]** Chez nous, le bouton d'action du header persistant et le bouton dominant du contenu comptent comme deux zones distinctes et peuvent coexister à l'écran. `BUTTON-R20`
- **[préférence]** Chez nous, le bouton du header et celui du contenu de page ne doivent jamais avoir exactement le même poids visuel : l'un des deux doit dominer. `BUTTON-R21`
- **[préférence]** Chez nous, un bouton alternatif propose une option légitime, comme annuler ou retour, qui ne concurrence jamais visuellement le bouton dominant. `BUTTON-R22`
- **[préférence]** Chez nous, un bouton alternatif a toujours moins de poids visuel que le bouton dominant placé à côté de lui, même à taille identique. `BUTTON-R23`
- **[préférence]** Chez nous, un bouton mineur porte une action secondaire présente mais volontairement peu visible, comme voir plus ou modifier les préférences. `BUTTON-R24`
- **[préférence]** Chez nous, si une action en style discret a un enjeu réel fort, c'est le classement de l'action qui doit être revu, pas la visibilité du bouton. `BUTTON-R25`
- **[préférence]** Chez nous, un bouton au style le plus discret peut porter une action à enjeu réel si sa couleur sémantique compense sa faible présence visuelle. `BUTTON-R26`
- **[préférence]** Chez nous, un seul tone de bouton est tiré directement de la couleur de marque ; les autres tones expriment un état sémantique. `BUTTON-R27`
- **[préférence]** Chez nous, le tone neutre est la couleur par défaut d'un bouton qui n'a pas de charge sémantique particulière au-delà de son style. `BUTTON-R28`
- **[préférence]** Chez nous, le tone destructif signale sans ambiguïté qu'une action supprime, retire ou annule quelque chose de coûteux à revenir en arrière. `BUTTON-R29`
- **[préférence]** Chez nous, un bouton destructif n'est jamais placé exactement là où se trouve habituellement une action fréquente, pour éviter le clic accidentel. `BUTTON-R30`
- **[préférence]** Chez nous, le tone d'avertissement porte une action qui a un poids réel et mérite l'attention, sans jamais détruire ni retirer quoi que ce soit. `BUTTON-R31`
- **[préférence]** Chez nous, un bouton d'avertissement est isolé visuellement des actions fréquentes, selon la même logique que le bouton destructif. `BUTTON-R32`
- **[préférence]** Chez nous, le choix du style et du tone d'un bouton n'est jamais esthétique : il déclare explicitement l'enjeu réel de l'action pour l'utilisateur. `BUTTON-R34`
- **[préférence]** Chez nous, la taille d'un bouton répond à la densité du contexte qui l'accueille, pas à l'importance perçue de l'action. `BUTTON-R35`
- **[préférence]** Chez nous, la plus petite taille de bouton est réservée aux contextes denses comme les tableaux, barres d'outils et panneaux compacts. `BUTTON-R36`
- **[préférence]** Chez nous, la taille moyenne est la taille par défaut du bouton, utilisée dans les formulaires et la majorité des contextes standards. `BUTTON-R37`
- **[préférence]** Chez nous, la plus grande taille de bouton est réservée aux contextes à forte emphase visuelle volontaire, comme un hero ou un CTA marketing. `BUTTON-R38`
- **[préférence]** Chez nous, tous les boutons d'un même groupe partagent toujours la même taille, même si leurs styles diffèrent. `BUTTON-R39`
- **[préférence]** Chez nous, un bouton d'état bascule entre deux états persistants, comme suivre ou ne plus suivre, il ne déclenche pas une action ponctuelle. `BUTTON-R40`
- **[préférence]** Chez nous, le label d'un bouton d'état décrit l'état actuel de l'élément, jamais l'action qu'un clic déclencherait. `BUTTON-R41`
- **[préférence]** Chez nous, un bouton de confirmation valide une action déjà engagée plus tôt dans le flux, il ne l'initie pas. `BUTTON-R42`
- **[préférence]** Chez nous, un bouton de confirmation est toujours accompagné d'une option d'annulation visible au même niveau, jamais seul comme unique issue. `BUTTON-R43`
- **[préférence]** Chez nous, un bouton d'annulation permet de revenir sur une action qui vient d'être exécutée, généralement affiché dans une notification temporaire. `BUTTON-R44`
- **[préférence]** Chez nous, le message proposant d'annuler une action reste visible au moins 5 à 8 secondes, sans bloquer le reste de l'interface pendant ce délai. `BUTTON-R45`
- **[préférence]** Chez nous, une action à enjeu réel doit toujours offrir soit une confirmation préalable, soit une option d'annulation après coup, jamais aucune des deux. `BUTTON-R46`
- **[préférence]** Chez nous, le niveau de friction avant une suppression dépend du coût de recréation de la donnée si l'action est mal exécutée. `BUTTON-R47`
- **[préférence]** Chez nous, deux boutons de suppression visuellement identiques peuvent avoir des niveaux de friction différents selon la donnée qu'ils suppriment. `BUTTON-R48`
- **[loi]** Une action à effet unique, comme un paiement ou un envoi définitif, doit être protégée contre un déclenchement multiple par impatience ou latence réseau. `BUTTON-R49`
- **[loi]** Dès le premier clic sur une action à effet unique, le bouton doit passer en état de chargement ou désactivé, avant même la réponse du serveur. `BUTTON-R50`
- **[préférence]** Chez nous, une friction volontaire retarde l'exécution d'une action destructive à enjeu élevé, pour empêcher un clic réflexe. `BUTTON-R51`
- **[préférence]** Chez nous, la confirmation finale d'une action très critique impose un délai de 2 à 3 secondes avant d'être cliquable, ou une saisie explicite de confirmation. `BUTTON-R52`
- **[préférence]** Chez nous, l'ordre entre bouton dominant et alternatif suit une convention propre à chaque type de paire, faute de convention universelle établie. `BUTTON-R53`
- **[préférence]** Chez nous, une fois un ordre choisi pour un type de paire de boutons, il reste identique sur tout le produit, sans jamais varier d'un écran à l'autre. `BUTTON-R54`
- **[préférence]** Chez nous, deux boutons de poids visuel identique côte à côte sont à proscrire, sauf dans un choix binaire volontairement équilibré. `BUTTON-R55`
- **[préférence]** Chez nous, un menu d'au moins trois options proposées à poids visuel égal côte à côte est un cas où la règle du bouton dominant unique ne s'applique pas. `BUTTON-R56`
- **[préférence]** Chez nous, l'espacement entre deux boutons adjacents doit être suffisant pour éviter le clic accidentel sur le mauvais bouton. `BUTTON-R57`
- **[préférence]** Chez nous, un bouton hérite toujours de la grille du contenu qu'il accompagne, il ne flotte jamais de façon arbitraire. `BUTTON-R58`
- **[préférence]** Chez nous, un bouton lié à un bloc de contenu s'aligne sur la même grille que ce contenu, jamais centré par simple préférence esthétique. `BUTTON-R59`
- **[préférence]** Chez nous, un formulaire ne doit jamais avoir plus d'un bouton de soumission. `BUTTON-R60`
- **[préférence]** Chez nous, un groupe de boutons peut se réorganiser selon la largeur de son conteneur, mais chaque bouton garde toujours la même action, le même style et le même niveau de friction. `BUTTON-R61`
- **[préférence]** Chez nous, le texte visible d'un bouton n'est jamais tronqué automatiquement ; il se replie sur plusieurs lignes si besoin plutôt que d'être coupé. `BUTTON-R62`
- **[préférence]** Chez nous, le bouton de soumission d'un formulaire se trouve toujours en fin de parcours, jamais au milieu d'un long formulaire qui défile. `BUTTON-R63`
- **[préférence]** Chez nous, le libellé du bouton final d'un formulaire reflète la conclusion réelle de l'action plutôt que de rester générique sur la dernière étape. `BUTTON-R64`
- **[préférence]** Chez nous, le bouton de soumission d'un formulaire reste cliquable en permanence ; la validation se fait au clic plutôt que de désactiver le bouton par avance. `BUTTON-R65`
- **[loi]** Une action affichée uniquement au survol d'une ligne doit rester accessible sans survol, car les appareils tactiles n'ont pas de hover et l'action deviendrait inutilisable. `BUTTON-R66`
- **[préférence]** Chez nous, une action destructive représentée par une simple icône reste soumise à confirmation obligatoire, contrairement à une icône d'action réversible. `BUTTON-R67`
- **[préférence]** Chez nous, la position du bouton qui referme ou valide une modale suit une convention unique définie pour tout le produit, jamais réinventée au cas par cas. `BUTTON-R68`
- **[préférence]** Chez nous, dans une modale de confirmation, le bouton destructif n'est jamais celui qui s'active par défaut avec la touche Entrée. `BUTTON-R69`
- **[loi]** Un bouton en grille dense doit rester lisible sans que son padding ne descende sous le seuil minimal de zone tactile accessible. `BUTTON-R71`
- **[préférence]** Chez nous, le bouton d'action du header reste visible au défilement ou se repositionne intelligemment, il ne disparaît jamais. `BUTTON-R72`
- **[préférence]** Chez nous, un header ne contient qu'un seul bouton d'action dominant ; les autres éléments de navigation restent des liens, pas des boutons. `BUTTON-R73`
- **[préférence]** Chez nous, dans une pagination, la page actuellement affichée n'est jamais cliquable et son état est visuellement sans ambiguïté. `BUTTON-R74`
- **[préférence]** Chez nous, une pagination affiche, quand c'est pertinent, une indication explicite de progression comme le numéro de page sur le total. `BUTTON-R75`
- **[loi]** Une bannière de consentement doit donner un poids visuel strictement équivalent à l'option d'acceptation et à l'option de refus, sous peine de dark pattern. `BUTTON-R76`
- **[préférence]** Chez nous, le bouton de fermeture d'une bannière promotionnelle reste une action facile et sans friction. `BUTTON-R77`
- **[préférence]** Chez nous, un bouton d'action flottant réserve une zone d'exclusion autour de lui pour ne jamais masquer de contenu critique. `BUTTON-R78`
- **[préférence]** Chez nous, un écran ne doit jamais afficher plus d'un bouton d'action flottant à la fois. `BUTTON-R79`
- **[préférence]** Chez nous, un bouton désactivé ne doit jamais l'être silencieusement : la cause de la désactivation doit toujours être exposée à l'utilisateur. `BUTTON-R80`
- **[préférence]** Chez nous, l'état de chargement d'un bouton remplace son libellé par un indicateur de progression, plutôt que de simplement le griser. `BUTTON-R81`
- **[préférence]** Chez nous, sur mobile, l'absence de survol est compensée par un léger retour haptique au moment où l'utilisateur touche le bouton. `BUTTON-R82`
- **[loi]** Le retour haptique d'un bouton ne doit jamais être l'unique confirmation d'une action : le changement d'état doit toujours rester perceptible visuellement. `BUTTON-R83`
- **[loi]** Une action grave ne doit jamais se déclencher dès l'enfoncement du bouton : elle doit partir au relâchement, et un appui relâché en dehors du bouton doit être annulé. `BUTTON-R84`
- **[préférence]** Chez nous, sur desktop, le survol du bouton est le principal signal confirmant qu'il est bien interactif avant le clic. `BUTTON-R85`
- **[préférence]** Chez nous, quand une action ne peut être réitérée qu'après un délai, le compte à rebours reste affiché en continu sur le bouton. `BUTTON-R86`
- **[préférence]** Chez nous, un verbe d'action qui décrit le bénéfice ou la conséquence est préféré à un label générique comme valider ou OK. `BUTTON-R87`
- **[loi]** Le texte d'un bouton doit rester compréhensible même hors contexte, et un même concept doit toujours porter le même mot partout dans le produit. `BUTTON-R88`
- **[préférence]** Chez nous, le ton du bouton de soumission ne se réchauffe que sur le moment précis de succès d'un envoi catalogué ; partout ailleurs il reste factuel. `BUTTON-R89`
- **[préférence]** Chez nous, la position de l'icône d'un bouton est l'une de cinq valeurs possibles : aucune, en tête, en fin, des deux côtés, ou icône seule. `BUTTON-R90`
- **[loi]** Un bouton qui n'affiche qu'une icône, sans texte visible, doit toujours porter un nom accessible, sans aucune exception. `BUTTON-R91`
- **[préférence]** Chez nous, l'icône se place en tête du texte pour une action de navigation, et en fin de texte pour une action de progression ou d'ouverture. `BUTTON-R92`
- **[préférence]** Chez nous, une icône de chaque côté du texte n'est utilisée que lorsque les deux directions portent réellement du sens. `BUTTON-R93`
- **[préférence]** Chez nous, un badge ou compteur affiché sur un bouton est une simple information d'état, jamais une seconde action cliquable. `BUTTON-R94`
- **[préférence]** Chez nous, un bouton de connexion sociale suit les contraintes de la marque tierce plutôt que le design system interne, à titre d'exception documentée. `BUTTON-R95`
- **[préférence]** Chez nous, le niveau de friction d'un bouton doit toujours être proportionnel au risque réel de l'action, jamais appliqué de façon uniforme. `BUTTON-R97`

## Consignes d'implémentation

- **[préférence]** Le code du bouton n'implémente aucune ombre portée à l'état de repos ; son affordance vient du remplissage, de la bordure, des états et du focus. `BUTTON-U01`
