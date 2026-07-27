---
sujet: alert
nature: components
resume: "Ce fichier contient le raisonnement : tones, persistance, empilement, wording, risques."
selon-contexte: [button, emotion, form, input, interaction, motion, toast, typography, voice]
source: ALERT-UX.md v1.4.0 + ALERT-UI.md v1.4.0
empreinte: sha256:9e538c040a25bc76
regles: {loi: 0, preference: 0, non_qualifie: 72}
---
# RULES — alert (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** les axes de l'alert sont **tone / persistance**.
- **[non qualifié]** **l'axe `style` n'existe pas ici.**
- **[non qualifié]** **tone : info / success / warning / danger — pas de `neutral`.** Sa valeur minimale est **info**, le degré zéro de la gravité, pas l'absence de sens.
- **[non qualifié]** sur le nom `danger` (vs `destructive` au bouton, `error` à l'input) — les trois composants nomment le même registre — la famille `color.danger` — par ce qu'il signifie *pour eux* : une action qui détruit, une saisie invalide, un état grave. Divergence assumée plutôt qu'un terme unique qui mentirait sur au moins un composant. (cf. DECISIONS.md.)
- **[non qualifié]** **size n'existe pas.** Largeur dictée par le conteneur (pleine page, section, élément), hauteur par le contenu. La variation de prominence selon le conteneur est un contexte d'intégration, pas un choix par instance.
- **[non qualifié]** **persistance — permanent / dismissible** : l'axe qui encode *qui décide de la fin de vie du message* — personne tant que la condition est vraie (permanent), ou l'utilisateur (dismissible).
- **[non qualifié]** frontière du composant — la 3e valeur de persistance qu'on pourrait attendre, *temporaire* (le toast/snackbar, qui disparaît seul), est **exclue : c'est un autre composant**. Le critère est le rapport à la page : l'alert vit *dans le flux* (il charge avec le contenu ou s'y insère, pousse ce qui le suit, appartient au contexte qu'il annote) ; le toast vit *au-dessus du flux et dans le temps* (superposé, empilable, chronométré, placé par le système et non par la page). Même logique pour la modale d'alerte : elle bloque l'interaction, c'est un dialogue.
- **[non qualifié]** le "résumé d'erreurs" de FORM-UX.md est structurellement un alert `danger` permanent placé en tête de formulaire.
- **[non qualifié]** **ce fichier est la référence générique du conteneur** : structure (icône + titre + corps), redondance icône/couleur, tokens par tone, comportement `role="alert"`, non-dismissibilité tant que la condition persiste.
- **[non qualifié]** **FORM-UX.md garde autorité sur l'orchestration propre au formulaire** : quand le résumé apparaît (échec de soumission), son contenu (chaque erreur reprend le message inline exact, en lien d'ancre vers le champ), la gestion du focus après échec, et la coexistence résumé/messages inline.
- **[non qualifié]** recoupement secondaire, non déplacé — la section "Dans une bannière (cookies/consentement ou promotionnelle)" de BUTTON-UX.md reste où elle est : elle régit les *boutons* d'une bannière de consentement, pas la bannière elle-même. La bannière de consentement en tant qu'objet est un pattern réglementaire (choix bloquant + persistance légale) qui déborde l'alert — signalé dans l'inventaire comme hors périmètre.
- **[non qualifié]** dans la grille des six intentions d'`INTERACTION-UX.md` (§ Les six intentions), **l'alert est l'expression canonique de l'intention « Comprendre un état »** — recevoir un statut ou un retour. C'est l'ancrage de ce composant dans le langage Interaction : tout ce qui suit (non-interactivité de surface, redondance des canaux, wording du message) découle de cette promesse — l'alert *informe sur un état*, il ne *propose pas un geste*.
- **[non qualifié]** utiliser pour une information contextuelle qui doit être vue sans être cherchée : condition affectant la page (maintenance à venir, données partielles), conséquence d'un état (abonnement expirant), résumé d'erreurs de formulaire, avertissement avant une zone risquée.
- **[non qualifié]** ne pas utiliser pour le feedback immédiat d'une action qui vient de réussir ("Enregistré ✓") — c'est le territoire du toast : message réactif, à vie courte, qui n'a pas besoin d'occuper le flux.
- **[non qualifié]** ne pas utiliser pour une décision qui doit bloquer l'utilisateur — c'est la modale.
- **[non qualifié]** ne pas utiliser pour du contenu promotionnel ou d'upsell.
- **[non qualifié]** l'échelle d'interruption (le critère qui tranche) : **alert < toast < modale**. L'alert occupe l'espace sans interrompre le geste ; le toast interrompt l'attention quelques secondes ; la modale interrompt tout. Le niveau se choisit sur l'urgence *réelle* de la décision demandée à l'utilisateur, jamais sur l'envie de visibilité de l'émetteur.
- **[non qualifié]** cas limite fréquent — l'erreur qui concerne *un seul champ* : message inline de l'input (INPUT-UX.md), pas un alert. L'alert entre en scène quand l'information dépasse l'élément : plusieurs erreurs (résumé), une section entière, la page.
- **[non qualifié]** **l'axe de gravité info / success / warning / danger est une projection, sur ce composant, de l'axe état-émotionnel de `VOICE-UX.md` (§ « Le ton suit l'utilisateur ») — pas un axe concurrent.** Voice fait varier le *ton* selon l'état de l'utilisateur (routine, erreur de l'utilisateur, erreur système / panne, succès, attente) ; l'alert fige ces états en quatre tones nommés et colorés qui les incarnent dans une surface. Le wording de chaque tone ci-dessous suit donc les prescriptions de Voice : c'est le même axe, vu depuis le conteneur qui le porte, pas une seconde taxonomie à réconcilier.
- **[non qualifié]** le degré zéro — informer sans alarmer. État du système, précision utile, nouveauté factuelle ("Les exports sont désormais au format CSV").
- **[non qualifié]** c'est le seul tone qui se justifie pour un contenu purement proactif sans risque associé.
- **[non qualifié]** si l'information n'a même pas besoin d'être *remarquée*, elle n'a pas besoin d'un alert — du texte courant suffit.
- **[non qualifié]** confirmer durablement qu'un état positif est acquis — pas féliciter pour un clic. Le success en alert se justifie quand la confirmation doit *rester consultable* (paiement validé en haut du récapitulatif, migration terminée avec bilan).
- **[non qualifié]** un success de simple feedback d'action appartient au toast, pas à l'alert.
- **[non qualifié]** signaler une condition qui mérite attention avant d'agir — sans qu'aucune erreur ne soit encore commise. Quota bientôt atteint, fonctionnalité dépréciée, saisie acceptée mais risquée.
- **[non qualifié]** un warning doit dire *quoi faire* ou *quoi surveiller*, pas seulement que "quelque chose" mérite attention.
- **[non qualifié]** signaler qu'une condition grave est *déjà* vraie — erreur bloquante, perte en cours, échéance dépassée. Couvre les deux registres : l'erreur-feedback (résumé d'erreurs de formulaire) et l'état critique persistant (paiement refusé, service coupé).
- **[non qualifié]** règle de rareté — même logique que le destructive du bouton : le danger est un signal d'alarme qui ne garde sa valeur que rare. Plusieurs danger simultanés sur une page signalent un problème d'architecture de l'information, pas une page très en danger.
- **[non qualifié]** règle de complétude — un danger dit toujours quoi, pourquoi, et comment sortir : le gabarit du message d'erreur de l'input (INPUT-UX.md, section wording) s'applique au paragraphe entier.
- **[non qualifié]** **règle cardinale de wording héritée de `VOICE-UX.md` — ne jamais blâmer l'utilisateur.** Un danger décrit l'écart et la sortie (« Le paiement n'a pas abouti », « Le format attendu est JJ/MM/AAAA ») ; il ne qualifie jamais l'utilisateur (« saisie invalide », « vous n'avez pas rempli… »). Quand la faute est côté système, le produit la prend à son compte (« Nous n'avons pas pu enregistrer »), il n'accuse pas l'utilisateur d'un bug.
- **[non qualifié]** le message vit aussi longtemps que sa condition — l'utilisateur ne peut pas le fermer, seul un changement d'état le fait disparaître. Réservé aux informations dont l'ignorance a un coût réel : erreurs à corriger, conditions critiques actives.
- **[non qualifié]** permanent = proactif ou bloquant. Ce qui charge avec la page (Carbon : "always present on the screen and load with contents") ou ce qui doit être résolu (résumé d'erreurs). Jamais pour du confort d'émetteur.
- **[non qualifié]** résolution silencieuse — un alert permanent dont la condition cesse d'être vraie doit disparaître, mais pas *silencieusement* pour tout le monde : si la résolution résulte d'une action de l'utilisateur (erreurs corrigées, soumission réussie), la confirmation doit être annoncée par le mécanisme qui prend le relais (message de succès, changement d'état focalisé).
- **[non qualifié]** cette résolution est l'application, sur l'alert, du principe de `VOICE-UX.md` « **le mot est le canal de dernier recours** » : la disparition visuelle et le changement de couleur sont des canaux qui *s'évaporent* (rien pour l'AT, rien sous forced-colors), seul un **mot** — message de succès, changement d'état focalisé — porte la résolution de façon inconditionnelle. Le relais textuel n'est pas une politesse, c'est le seul canal qui ne tombe jamais.
- **[non qualifié]** l'utilisateur peut clore le message — il en a pris connaissance, il reprend son espace. Le défaut raisonnable pour tout ce qui n'est ni bloquant ni critique (Polaris : "be dismissible unless they contain critical information or an important step").
- **[non qualifié]** règle de fermeture — la croix de fermeture est une cible à part entière (taille tactile, focusable, libellée "Fermer" pour le lecteur d'écran) — pas un ornement de coin.
- **[non qualifié]** mémoire de fermeture — la fermeture doit être mémorisée au moins pour la session, et durablement pour les annonces ponctuelles.
- **[non qualifié]** exception explicite — si la *condition* redevient vraie ou s'aggrave (le quota warning fermé hier atteint 100 %), la réapparition est légitime — c'est un nouveau message, pas le retour de l'ancien.
- **[non qualifié]** ordre canonique : **icône → titre → corps → actions**, plus la **croix de fermeture** (dismissible uniquement) en coin opposé au sens de lecture.
- **[non qualifié]** porter le tone *autrement que par la couleur*. Une icône par tone, constante dans tout le produit.
- **[non qualifié]** l'icône n'est pas décorative, elle est le canal redondant du sens — elle ne se retire pas pour alléger. (WCAG 1.4.1 — l'information ne repose jamais sur la couleur seule ; et **loi d'affordance n°5** d'`INTERACTION-UX.md`, « la couleur renforce, elle ne crée pas seule le sens » — la forme de l'icône, sa silhouette et le mot fournissent le second canal que la couleur seule ne garantit pas.)
- **[non qualifié]** règle de silhouette — les quatre tones ont des **formes** d'icône distinctes, pas seulement des couleurs distinctes (cercle / cercle-coche / triangle / octogone — silhouettes fixées dans ALERT-UI.md).
- **[non qualifié]** énoncer le message en une ligne — c'est lui que l'œil et le lecteur d'écran attrapent. Un utilisateur qui ne lit que le titre doit repartir avec l'essentiel.
- **[non qualifié]** le pourquoi et le comment-corriger — mêmes exigences de wording que le message d'erreur de l'input : diagnostic fait pour l'utilisateur, pas transféré à l'utilisateur. Optionnel si le titre suffit.
- **[non qualifié]** règle de longueur — 1-2 phrases (Polaris). Au-delà, l'information relève d'une page, pas d'un alert — lier plutôt qu'entasser.
- **[non qualifié]** offrir la sortie — corriger, réessayer, en savoir plus. **Une seule action mise en avant** (Polaris), une seconde tolérée en lien discret.
- **[non qualifié]** le choix de style/tone des boutons internes suit BUTTON-UX.md ; l'alert impose le nombre, comme la carte.
- **[non qualifié]** règle de cohérence de tone — l'action d'un alert danger n'est pas nécessairement un bouton destructive : le tone de l'alert décrit la condition ; le tone du bouton décrit l'action.
- **[non qualifié]** cf. persistance/dismissible. Jamais présente sur un permanent.
- **[non qualifié]** plafond pratique — **un alert par niveau de conteneur** (un pour la page, un par section concernée). Au-delà, agréger : trois warnings de quota deviennent un seul alert listant les trois.
- **[non qualifié]** ordre en cas de cohabitation inévitable — gravité décroissante (danger avant warning avant info) — jamais l'ordre d'arrivée.
- **[non qualifié]** la version agrégée est toujours préférable à la pile.
- **[non qualifié]** apparition au chargement (proactif) — l'alert est du contenu comme un autre : pas d'animation d'entrée nécessaire, pas d'annonce spéciale ; le lecteur d'écran le rencontre à sa place dans le flux, avant le contenu qu'il conditionne.
- **[non qualifié]** apparition dynamique (réactif) — un alert injecté après une action doit être *annoncé* : `role="alert"` pour danger/warning réactifs, `role="status"` pour info/success (Polaris fait exactement cette distinction).
- **[non qualifié]** l'insertion ne doit pas provoquer de saut de mise en page sous le point de lecture — insérer au-dessus du viewport courant sans compensation vole la position de lecture.
- **[non qualifié]** **chorégraphie d'apparition / disparition — rattachée nommément à `MOTION-UX.md`.** L'apparition d'un alert *réactif* se joue **en opacité seule** (fondu), jamais en slide qui pousserait le contenu : c'est l'application directe de la règle « **le contenu ne se déplace jamais sans action de l'utilisateur** » de `MOTION-UX.md` — un alert injecté qui glisse déplacerait la cible sous le curseur d'un lecteur qui n'a rien demandé. La **sortie prend le cran inférieur de l'entrée** (plus brève, même registre, `motion.fast` vs `motion.base` — cf. ALERT-UI.md), et l'annonce au lecteur d'écran ne dépend jamais du mouvement.
- **[non qualifié]** **proactif = aucune animation.** Un alert chargé avec la page ne s'anime pas — « **rien n'anime au chargement initial** » (`MOTION-UX.md`) : le contenu proactif est du contenu comme un autre, l'entrée animée est réservée au réactif (conséquence d'une action). C'est la formulation d'origine de ce fichier (« pas d'animation d'entrée nécessaire ») que `MOTION-UX.md` a généralisée à tout le système, puis nous re-cite ici sous son nom.
- **[non qualifié]** **contrat `prefers-reduced-motion` — POSITION explicite, pas un oubli.** L'apparition en opacité est **nativement conforme** au contrat reduced-motion de `MOTION-UX.md` (« réduire ≠ supprimer : les changements d'opacité et de couleur peuvent rester, seul le mouvement *spatial* se désactive »). Comme l'alert n'a **aucune translation à supprimer**, sa chorégraphie ne se dégrade pas sous `prefers-reduced-motion: reduce` — il n'y a rien à couper, le fondu demeure. Ce n'est pas un point resté ouvert (contrairement au « reduced motion » historiquement signalé en fin de fichier) : c'est une conformité par construction, posée ici comme position tenue.
- **[non qualifié]** disparition — cf. "Résolution silencieuse" (permanent) et "Mémoire de fermeture" (dismissible).
- **[non qualifié]** l'alert n'a pas d'état hover/focus propre — il n'est pas interactif en surface ; seuls ses enfants (actions, croix, liens d'ancre) le sont.
- **[non qualifié]** **un éventuel signal sonore d'alerte reste strictement redondant** — si un canal sonore est un jour ajouté (bip pour une condition critique), il *double* le message, il ne le porte jamais seul : texte + icône + couleur portent déjà l'information en entier, un utilisateur sourd, en environnement silencieux ou au son coupé ne perd rien (WCAG 1.4.1 / 1.3.3, principe des canaux ; 1.4.2 pour le contrôle du son). Le son est un rappel d'attention, pas un porteur d'information.
- **[non qualifié]** **l'alert ne porte aucun instrument expressif — position tranchée, pas silence.** Comme le toast statue sur son instrument, l'alert statue ici : c'est un composant **productif** de bout en bout, jamais un moment E-motion. Aucun des quatre instruments d'`EMOTION-UX.md` (mouvement expressif, voix chaleureuse, couleur de fête, illustration / forme) ne s'active sur un alert — sa chorégraphie reste en opacité productive (cf. § États et comportement), son wording dans le registre productif de `VOICE-UX.md`.
- **[non qualifié]** **« un événement, un porteur » (arbitrage utilisateur 2026-07-21).** Le moment catalogué « **sortie d'une erreur / récupération** » d'`EMOTION-UX.md` — qui recoupe la « résolution silencieuse » d'un danger permanent enfin résolu (§ Persistance / Permanent) — ne s'incarne **pas dans l'alert danger elle-même** : l'alert reste le porteur *productif* du problème tant que la condition dure. Le soulagement, lui, s'incarne dans le **success / toast de relais** qui confirme la résolution **après coup** — exactement la distinction que `TOAST-UX.md` fait déjà « entre le problème et son soulagement ». Le porteur du problème et le porteur de la récupération sont deux composants distincts, jamais la même surface.
- **[non qualifié]** **l'exception chaleureuse ne touche jamais danger ni warning** — ni côté `VOICE-UX.md` (§ Exception E-motion : « l'exception ne s'étend jamais à une erreur… ni à une action destructive »), ni côté `EMOTION-UX.md`. Sur un alert danger / warning, le registre reste strictement productif : pas d'émoji, pas de « Oups », pas de « ! ». C'est la même frontière que `TOAST-UX.md` trace pour son instrument illustration — la chaleur est réservée aux moments positifs et rares, l'alarme n'en est jamais un.
- **[non qualifié]** en tête du contenu, sous le header, pleine largeur du contenu (Polaris) — avant ce qu'il conditionne, jamais après.
- **[non qualifié]** c'est la position au plus fort budget d'attention : réservée aux conditions qui affectent la page entière.
- **[non qualifié]** sous le titre de la section concernée, largeur de la section (Polaris : "section-level") — l'alert hérite du conteneur qu'il annote, comme le bouton hérite de la grille de son contenu.
- **[non qualifié]** dans une modale — au-dessus des champs/boutons concernés ; jamais de alert pleine page *dans* une modale.
- **[non qualifié]** le placement contextuel de Carbon ("above buttons/inputs when relevant") — pour une condition qui ne concerne qu'un geste précis ("l'export est indisponible pendant la maintenance", au-dessus du bouton d'export).
- **[non qualifié]** frontière avec le message inline de l'input — si la condition porte sur la *valeur* d'un champ, c'est INPUT-UX.md ; si elle porte sur la *disponibilité ou le contexte* du geste, c'est un alert.
- **[non qualifié]** le cas est entièrement orchestré par FORM-UX.md (cf. recoupement) — conteneur d'ici, chorégraphie de là-bas.
- **[non qualifié]** **l'interruption doit être proportionnelle à l'urgence réelle du message, jamais à l'envie de visibilité de l'émetteur.**

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
