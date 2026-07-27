---
sujet: alert
nature: components
resume: "Ce fichier contient le raisonnement : tones, persistance, empilement, wording, risques."
selon-contexte: [button, consentement, emotion, form, input, interaction, motion, toast, typography, voice]
source: ALERT-UX.md v1.4.0 + ALERT-UI.md v1.4.0
empreinte: sha256:4d6bec19530fdfd5
regles: {loi: 18, preference: 44, non_qualifie: 0}
---
# RULES — alert (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Un alert porte l'un des quatre tones info, success, warning ou danger ; il n'existe pas de tone neutre, info étant le degré zéro de la gravité. `ALERT-R03`
- **[préférence]** Le registre de gravité maximale est nommé selon ce qu'il signifie pour chaque composant — danger pour l'alert, destructive pour le bouton, error pour l'input — sans terme unique imposé. `ALERT-R04`
- **[préférence]** L'alert n'expose aucune variante de taille : sa largeur est celle de son conteneur et sa hauteur celle de son contenu. `ALERT-R05`
- **[préférence]** La persistance d'un alert vaut permanent lorsque seule la fin de la condition met fin au message, et dismissible lorsque l'utilisateur peut le clore. `ALERT-R06`
- **[préférence]** L'alert est l'expression canonique de l'intention « comprendre un état » : il informe sur un état et ne propose jamais un geste. `ALERT-R12`
- **[loi]** Un alert sert à porter une information contextuelle que l'utilisateur doit voir sans avoir à la chercher. `ALERT-R13`
- **[préférence]** Le retour immédiat d'une action qui vient de réussir est porté par un toast plutôt que par un alert. `ALERT-R14`
- **[loi]** Une décision qui doit bloquer l'utilisateur est portée par un dialogue d'alerte, jamais par un alert. `ALERT-R15`
- **[loi]** Un alert ne porte jamais de contenu promotionnel. `ALERT-R16`
- **[loi]** Le degré d'interruption se choisit sur l'urgence réelle du message selon l'échelle croissante alert, toast, modale. `ALERT-R17`
- **[loi]** Une erreur portant sur un seul champ est rendue par le message inline de ce champ ; l'alert n'intervient que lorsque l'information dépasse l'élément. `ALERT-R18`
- **[préférence]** Les quatre tones de l'alert sont la projection sur ce composant de l'axe état-émotionnel de la voix : le ton du texte se déduit du tone du conteneur. `ALERT-R19`
- **[préférence]** Le tone info informe sans alarmer : état du système, précision utile, nouveauté factuelle. `ALERT-R20`
- **[préférence]** Seul le tone info se justifie pour un contenu purement proactif sans risque associé. `ALERT-R21`
- **[loi]** Une information qui n'a pas besoin d'être remarquée est intégrée au contenu courant plutôt que placée dans un alert. `ALERT-R22`
- **[préférence]** Le tone success s'emploie pour confirmer durablement un état acquis dont la confirmation doit rester consultable. `ALERT-R23`
- **[préférence]** Un succès qui n'est qu'un retour d'action relève du toast et non de l'alert. `ALERT-R24`
- **[préférence]** Le tone warning signale une condition qui mérite attention avant d'agir, sans qu'aucune erreur ne soit encore commise. `ALERT-R25`
- **[préférence]** Un warning énonce ce qu'il faut faire ou surveiller, et pas seulement qu'une attention est requise. `ALERT-R26`
- **[préférence]** Le tone danger signale qu'une condition grave est déjà vraie, erreur constatée ou état critique persistant. `ALERT-R27`
- **[préférence]** Le tone danger reste rare : plusieurs alerts danger simultanés signalent un défaut d'architecture de l'information. `ALERT-R28`
- **[loi]** Un alert danger énonce ce qui se passe, pourquoi, et comment en sortir. `ALERT-R29`
- **[préférence]** Le message d'un alert décrit l'écart et la sortie sans jamais qualifier ni accuser l'utilisateur. `ALERT-R30`
- **[préférence]** Un alert permanent vit aussi longtemps que sa condition et ne peut pas être fermé par l'utilisateur. `ALERT-R31`
- **[préférence]** La persistance permanente est réservée aux messages proactifs chargés avec la page et aux conditions qui doivent être résolues. `ALERT-R32`
- **[loi]** La résolution d'une condition consécutive à une action de l'utilisateur est annoncée par un message qui prend le relais, et non par la seule disparition de l'alert. `ALERT-R33`
- **[préférence]** Un mot porte toujours l'information de résolution : la disparition visuelle et le changement de couleur ne sont jamais les seuls canaux. `ALERT-R34`
- **[préférence]** Un alert qui n'est ni bloquant ni critique est fermable par l'utilisateur. `ALERT-R35`
- **[loi]** Le contrôle de fermeture d'un alert est un bouton focusable, doté d'un nom accessible et d'une cible de taille suffisante. `ALERT-R36`
- **[préférence]** La fermeture d'un alert est mémorisée au moins pour la durée de la session, et durablement pour les annonces ponctuelles. `ALERT-R37`
- **[préférence]** Un alert fermé peut réapparaître si sa condition redevient vraie ou s'aggrave : il s'agit alors d'un nouveau message. `ALERT-R38`
- **[préférence]** Toutes les combinaisons de tone et de persistance sont possibles, mais info-dismissible et danger-permanent sont les régimes nominaux et les autres demandent une justification. `ALERT-R39`
- **[préférence]** L'ordre de composition d'un alert est icône, titre, corps, actions, la croix de fermeture venant au coin opposé au sens de lecture. `ALERT-R40`
- **[loi]** Chaque tone est porté par une icône propre, constante dans tout le produit, en plus de sa couleur. `ALERT-R41`
- **[loi]** L'icône de tone est un canal d'information redondant et ne peut pas être retirée pour alléger le rendu. `ALERT-R42`
- **[loi]** Les tones se distinguent par des formes d'icône différentes, et pas seulement par des couleurs différentes. `ALERT-R43`
- **[préférence]** Le titre d'un alert énonce le message en une ligne et porte le contenu, pas la catégorie. `ALERT-R44`
- **[préférence]** Le corps d'un alert énonce le pourquoi et le moyen de corriger ; il est facultatif quand le titre suffit. `ALERT-R45`
- **[préférence]** Le corps d'un alert tient en une à deux phrases ; au-delà, l'information est liée plutôt qu'entassée. `ALERT-R46`
- **[préférence]** Un alert met en avant une seule action ; une seconde n'est tolérée que sous forme de lien discret. `ALERT-R47`
- **[préférence]** Le tone d'un alert décrit la condition et ne détermine pas le tone du bouton qu'il contient, lequel décrit l'action. `ALERT-R49`
- **[préférence]** Un alert permanent ne présente jamais de croix de fermeture. `ALERT-R50`
- **[préférence]** Un seul alert est affiché par niveau de conteneur ; au-delà, les messages sont agrégés en un seul. `ALERT-R51`
- **[préférence]** Lorsque plusieurs alerts cohabitent, ils sont ordonnés par gravité décroissante et jamais par ordre d'arrivée. `ALERT-R52`
- **[préférence]** Un alert unique agrégeant plusieurs conditions est préféré à une pile d'alerts. `ALERT-R53`
- **[loi]** Un alert présent au chargement de la page est du contenu ordinaire : il ne porte pas de région live et ne fait pas l'objet d'une annonce spéciale. `ALERT-R54`
- **[loi]** Un alert inséré après une action est annoncé aux technologies d'assistance par une région live, role=alert pour les messages critiques et role=status pour les messages advisoires. `ALERT-R55`
- **[préférence]** L'insertion d'un alert ne doit pas déplacer le contenu situé sous le point de lecture courant. `ALERT-R56`
- **[préférence]** L'apparition d'un alert réactif se joue en opacité seule, sans translation, et sa disparition prend le cran de durée inférieur à son apparition. `ALERT-R57`
- **[préférence]** Un alert chargé avec la page ne s'anime pas. `ALERT-R58`
- **[préférence]** L'apparition en opacité d'un alert est conservée telle quelle sous mouvement réduit, faute de mouvement spatial à supprimer. `ALERT-R59`
- **[loi]** Le conteneur d'un alert n'est ni focusable ni cliquable et ne porte aucun état de survol ou de focus ; seuls ses enfants interactifs en portent. `ALERT-R61`
- **[loi]** Un signal sonore d'alerte double toujours un message textuel et visuel et ne porte jamais seul l'information. `ALERT-R62`
- **[préférence]** L'alert n'active aucun instrument expressif : sa chorégraphie et son wording restent dans le registre productif. `ALERT-R63`
- **[préférence]** Le porteur d'un problème et le porteur de sa résolution sont deux composants distincts : l'alert porte le problème, un message de succès ou un toast porte la récupération. `ALERT-R64`
- **[préférence]** Aucune exception de ton chaleureux ne s'applique aux alerts de tone danger ou warning. `ALERT-R65`
- **[loi]** Un alert de portée page est placé en tête du contenu, sur toute sa largeur, avant ce qu'il conditionne. `ALERT-R66`
- **[préférence]** La position de tête de page est réservée aux conditions qui affectent la page entière. `ALERT-R67`
- **[préférence]** Un alert de portée section se place sous le titre de la section concernée et en épouse la largeur. `ALERT-R68`
- **[préférence]** Dans une modale, l'alert se place au-dessus des champs ou boutons concernés et n'y prend jamais la portée d'un alert de page. `ALERT-R69`
- **[préférence]** Un alert peut se placer immédiatement au-dessus d'un contrôle précis lorsque la condition ne concerne que ce geste. `ALERT-R70`
- **[loi]** Le degré d'interruption d'un message est proportionnel à l'urgence réelle de ce message, jamais à la visibilité souhaitée par son émetteur. `ALERT-R74`

## Non couvert — poser la question, ne rien trancher

- Feedback immédiat d'action ("Enregistré ✓") : Le retour est réactif et de vie courte.
- Alerte bloquante exigeant une décision : L'utilisateur ne doit pas pouvoir continuer.
- Bannière de consentement (cookies) : Un consentement réglementaire est requis.
- Contenu promotionnel / upsell : On veut pousser du marketing dans le flux.
- Bannière globale multi-pages (système entier) : Le message persiste à travers la navigation.
- Dans une collection (alert entre les cartes) : Un message s'insère dans une grille ou une liste.
- Contenu de l'alert mis à jour en place : Le contenu change sans re-création.
- Auto-dismiss temporisé : Le message disparaît seul après quelques secondes.
- RTL (lecture droite-gauche) : La langue se lit de droite à gauche.
- Reduced motion : L'utilisateur limite les animations.
- Contenu long (paragraphe+) : Le message dépasse deux phrases.
- Sans icône : On envisage de porter le tone par la seule couleur.
