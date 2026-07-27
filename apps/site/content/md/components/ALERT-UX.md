---
component: alert
layer: ux
version: 1.4.0 # 1.4.0 : rattachement nommé aux 4 Languages (Interaction, Motion, Voice, E-motion) — Alert désigné expression canonique de « Comprendre un état », lois d'affordance n°3/n°5 nommées, chorégraphie rattachée à MOTION-UX.md, contrat reduced-motion posé en POSITION explicite, tone relié à l'axe état-émotionnel de VOICE-UX.md, « ne jamais blâmer » et « le mot est le canal de dernier recours » nommés, section Instrument E-motion tranchant en négatif (E-motion délégué au success/toast de relais — arbitrage « un événement, un porteur » 2026-07-21) ; aucune règle existante retirée ni déplacée. 1.3.1 : vocabulaire aligné sur le modèle style × tone du bouton (DECISIONS 2026-07-18), aucune règle modifiée. 1.3.0 : contrat du canal sonore (un signal sonore reste doublé d'un message textuel, WCAG 1.4.1) — trou « partiel » de l'inventaire transversal accessibilité comblé chez son propriétaire (2026-07-14, cf. DECISIONS.md). 1.2.0 : renommage du composant callout → alert (décision 2026-07-11) — aucune règle modifiée, tous les renvois croisés mis à jour. Ancienne version : 1.1.3. # 1.1.3 : balisage RÈGLE/CONFIANCE, aucune règle modifiée. 1.1.2 : narration migrée vers DECISIONS.md. 1.1.1 : règle de silhouette d'icône (RAPPORT-TEST F03)
last_updated: 2026-07-21
companion: ALERT-UI.md
confidence: mixed
---

# Alert (banner / alert / notification inline) — Couche UX

> Ce fichier contient le raisonnement : tones, persistance, empilement, wording, risques. Tokens et techniques dans `ALERT-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE [ALERT-R01] : les axes de l'alert sont **tone / persistance**.

RÈGLE [ALERT-R02] : **l'axe `style` n'existe pas ici.**

> **Pourquoi** : le candidat apparent (les notifications *high-contrast* / *low-contrast* de Carbon) n'est pas un axe indépendant : le niveau de contraste doit *suivre* la gravité du message — un danger discret ou un info tapageur seraient des mensonges d'interface. Un poids visuel qui découle mécaniquement d'un autre axe n'est pas un axe, c'est un rendu ; il vit dans ALERT-UI.md comme décision de style.

RÈGLE [ALERT-R03] : **tone : info / success / warning / danger — pas de `neutral`.** Sa valeur minimale est **info**, le degré zéro de la gravité, pas l'absence de sens.

> **Pourquoi** : l'alert ne peut pas être neutre : porter une charge sémantique est sa fonction même — c'est ce que `neutral` devient quand le composant *est* le message. Les 4 systèmes du benchmark convergent sur ce quatuor (Carbon, Polaris, Atlassian, Material).

RÈGLE [ALERT-R04] : sur le nom `danger` (vs `destructive` au bouton, `error` à l'input) — les trois composants nomment le même registre — la famille `color.danger` — par ce qu'il signifie *pour eux* : une action qui détruit, une saisie invalide, un état grave. Divergence assumée plutôt qu'un terme unique qui mentirait sur au moins un composant. (cf. DECISIONS.md.)

RÈGLE [ALERT-R05] : **size n'existe pas.** Largeur dictée par le conteneur (pleine page, section, élément), hauteur par le contenu. La variation de prominence selon le conteneur est un contexte d'intégration, pas un choix par instance.

> **Pourquoi** : pas même une densité — un alert compact qui perdrait son icône ou son titre perdrait sa lisibilité de signal.

RÈGLE [ALERT-R06] : **persistance — permanent / dismissible** : l'axe qui encode *qui décide de la fin de vie du message* — personne tant que la condition est vraie (permanent), ou l'utilisateur (dismissible).

> **Pourquoi** : distinction structurante dans tout le benchmark (Carbon : l'alert "ne se ferme jamais" ; Polaris : dismissible *sauf* information critique).

RÈGLE [ALERT-R07] : frontière du composant — la 3e valeur de persistance qu'on pourrait attendre, *temporaire* (le toast/snackbar, qui disparaît seul), est **exclue : c'est un autre composant**. Le critère est le rapport à la page : l'alert vit *dans le flux* (il charge avec le contenu ou s'y insère, pousse ce qui le suit, appartient au contexte qu'il annote) ; le toast vit *au-dessus du flux et dans le temps* (superposé, empilable, chronométré, placé par le système et non par la page). Même logique pour la modale d'alerte : elle bloque l'interaction, c'est un dialogue.

Les trois forment l'échelle d'interruption documentée plus bas ("Quand ne pas l'utiliser"). (Cheminement complet du test de transposition et convergences du benchmark : cf. DECISIONS.md.)

## Partage d'autorité avec FORM-UX.md

RÈGLE [ALERT-R08] : le "résumé d'erreurs" de FORM-UX.md est structurellement un alert `danger` permanent placé en tête de formulaire.

RÈGLE [ALERT-R09] : **ce fichier est la référence générique du conteneur** : structure (icône + titre + corps), redondance icône/couleur, tokens par tone, comportement `role="alert"`, non-dismissibilité tant que la condition persiste.

RÈGLE [ALERT-R10] : **FORM-UX.md garde autorité sur l'orchestration propre au formulaire** : quand le résumé apparaît (échec de soumission), son contenu (chaque erreur reprend le message inline exact, en lien d'ancre vers le champ), la gestion du focus après échec, et la coexistence résumé/messages inline.

(Décision : cf. DECISIONS.md.)

RÈGLE [ALERT-R11] : recoupement secondaire, non déplacé — la section "Dans une bannière (cookies/consentement ou promotionnelle)" de BUTTON-UX.md reste où elle est : elle régit les *boutons* d'une bannière de consentement, pas la bannière elle-même. La bannière de consentement en tant qu'objet est un pattern réglementaire (choix bloquant + persistance légale) qui déborde l'alert — signalé dans l'inventaire comme hors périmètre.

## But

Un alert attire l'attention sur une information que le flux normal de la page ne suffirait pas à faire remarquer — un état du système, une condition qui affecte ce que l'utilisateur s'apprête à faire, le résultat d'une action passée. Contrairement au bouton (qui déclenche), à l'input (qui capture) et à la carte (qui organise), l'alert **interrompt — à un degré choisi**. Toute règle ci-dessous découle de ce statut : l'interruption est un budget qui s'épuise, chaque alert non indispensable dévalue tous les suivants.

RÈGLE [ALERT-R12] : dans la grille des six intentions d'`INTERACTION-UX.md` (§ Les six intentions), **l'alert est l'expression canonique de l'intention « Comprendre un état »** — recevoir un statut ou un retour. C'est l'ancrage de ce composant dans le langage Interaction : tout ce qui suit (non-interactivité de surface, redondance des canaux, wording du message) découle de cette promesse — l'alert *informe sur un état*, il ne *propose pas un geste*.

> **Pourquoi** : les six intentions posent que « le rôle précède le style » — deux rôles différents ne se rendent jamais indiscernables. Nommer l'intention porteuse ici verrouille l'alert du côté « recevoir un retour » (avec badge et message explicite), à distance du bouton (« Agir ») et du lien (« Naviguer ») : c'est ce qui interdit qu'il emprunte leurs affordances (cf. § États et comportement, loi d'affordance n°3).

## Quand l'utiliser / ne pas l'utiliser

RÈGLE [ALERT-R13] : utiliser pour une information contextuelle qui doit être vue sans être cherchée : condition affectant la page (maintenance à venir, données partielles), conséquence d'un état (abonnement expirant), résumé d'erreurs de formulaire, avertissement avant une zone risquée.

RÈGLE [ALERT-R14] : ne pas utiliser pour le feedback immédiat d'une action qui vient de réussir ("Enregistré ✓") — c'est le territoire du toast : message réactif, à vie courte, qui n'a pas besoin d'occuper le flux.

RÈGLE [ALERT-R15] : ne pas utiliser pour une décision qui doit bloquer l'utilisateur — c'est la modale.

RÈGLE [ALERT-R16] : ne pas utiliser pour du contenu promotionnel ou d'upsell.

> **Pourquoi** : Polaris le dit explicitement : le banner porte de l'information nécessaire, le marketing a d'autres véhicules.

RÈGLE [ALERT-R17] : l'échelle d'interruption (le critère qui tranche) : **alert < toast < modale**. L'alert occupe l'espace sans interrompre le geste ; le toast interrompt l'attention quelques secondes ; la modale interrompt tout. Le niveau se choisit sur l'urgence *réelle* de la décision demandée à l'utilisateur, jamais sur l'envie de visibilité de l'émetteur.

> **Pourquoi** : Atlassian réserve même le banner système aux "critical system-level messaging" seulement. Monter d'un cran sans nécessité use la vigilance ; c'est la règle de friction du bouton, appliquée à l'attention.

RÈGLE [ALERT-R18] : cas limite fréquent — l'erreur qui concerne *un seul champ* : message inline de l'input (INPUT-UX.md), pas un alert. L'alert entre en scène quand l'information dépasse l'élément : plusieurs erreurs (résumé), une section entière, la page.

## Tone (l'axe sémantique — natif ici)

RÈGLE [ALERT-R19] : **l'axe de gravité info / success / warning / danger est une projection, sur ce composant, de l'axe état-émotionnel de `VOICE-UX.md` (§ « Le ton suit l'utilisateur ») — pas un axe concurrent.** Voice fait varier le *ton* selon l'état de l'utilisateur (routine, erreur de l'utilisateur, erreur système / panne, succès, attente) ; l'alert fige ces états en quatre tones nommés et colorés qui les incarnent dans une surface. Le wording de chaque tone ci-dessous suit donc les prescriptions de Voice : c'est le même axe, vu depuis le conteneur qui le porte, pas une seconde taxonomie à réconcilier.

> **Pourquoi** : sans ce rattachement, un lecteur pourrait croire que la gravité de l'alert et le ton de la voix sont deux réglages indépendants — et écrire un danger au ton badin ou un info alarmiste. En nommant la projection, on rend le ton du texte *déductible* du tone du conteneur.

### Info

RÈGLE [ALERT-R20] : le degré zéro — informer sans alarmer. État du système, précision utile, nouveauté factuelle ("Les exports sont désormais au format CSV").

RÈGLE [ALERT-R21] : c'est le seul tone qui se justifie pour un contenu purement proactif sans risque associé.

RÈGLE [ALERT-R22] : si l'information n'a même pas besoin d'être *remarquée*, elle n'a pas besoin d'un alert — du texte courant suffit.

> **Erreur fréquente** : l'info-poubelle — utiliser l'alert info comme emplacement d'annonces générales répétées. Chaque alert inutile entraîne l'utilisateur à ignorer les suivants, y compris les danger.

### Success

RÈGLE [ALERT-R23] : confirmer durablement qu'un état positif est acquis — pas féliciter pour un clic. Le success en alert se justifie quand la confirmation doit *rester consultable* (paiement validé en haut du récapitulatif, migration terminée avec bilan).

RÈGLE [ALERT-R24] : un success de simple feedback d'action appartient au toast, pas à l'alert.

> **Pourquoi** : Carbon va jusqu'à exclure success (et error réactif) de son alert permanent : ce qui charge avec la page est proactif, un succès est réactif par nature — d'où la règle de combinaison plus bas (permanent + success : à peu près jamais justifié).
> **Erreur fréquente** : le success qui ne part jamais — une confirmation vieille de dix minutes encore à l'écran devient du bruit, puis de la méfiance ("est-ce que ça date de maintenant ?").

### Warning

RÈGLE [ALERT-R25] : signaler une condition qui mérite attention avant d'agir — sans qu'aucune erreur ne soit encore commise. Quota bientôt atteint, fonctionnalité dépréciée, saisie acceptée mais risquée.

RÈGLE [ALERT-R26] : un warning doit dire *quoi faire* ou *quoi surveiller*, pas seulement que "quelque chose" mérite attention.

> **Pourquoi** : un avertissement sans action possible est de l'anxiété gratuite. Transposition directe du warning de l'input ("techniquement accepté mais mérite l'attention"), élargie de la valeur d'un champ à l'état d'un contexte.
> **Erreur fréquente** : utiliser warning comme "danger poli" pour adoucir une vraie erreur — si la condition est déjà bloquante ou destructrice, c'est un danger ; l'adoucir retarde la correction.

### Danger

RÈGLE [ALERT-R27] : signaler qu'une condition grave est *déjà* vraie — erreur bloquante, perte en cours, échéance dépassée. Couvre les deux registres : l'erreur-feedback (résumé d'erreurs de formulaire) et l'état critique persistant (paiement refusé, service coupé).

RÈGLE [ALERT-R28] : règle de rareté — même logique que le destructive du bouton : le danger est un signal d'alarme qui ne garde sa valeur que rare. Plusieurs danger simultanés sur une page signalent un problème d'architecture de l'information, pas une page très en danger.

RÈGLE [ALERT-R29] : règle de complétude — un danger dit toujours quoi, pourquoi, et comment sortir : le gabarit du message d'erreur de l'input (INPUT-UX.md, section wording) s'applique au paragraphe entier.

RÈGLE [ALERT-R30] : **règle cardinale de wording héritée de `VOICE-UX.md` — ne jamais blâmer l'utilisateur.** Un danger décrit l'écart et la sortie (« Le paiement n'a pas abouti », « Le format attendu est JJ/MM/AAAA ») ; il ne qualifie jamais l'utilisateur (« saisie invalide », « vous n'avez pas rempli… »). Quand la faute est côté système, le produit la prend à son compte (« Nous n'avons pas pu enregistrer »), il n'accuse pas l'utilisateur d'un bug.

> **Pourquoi** : Voice pose « ne jamais blâmer » comme *règle cardinale du ton*, non négociable (Peak-End : le message d'erreur est le pic dont l'utilisateur se souvient). Le danger de l'alert est le lieu où ce risque est le plus aigu — c'est là que le langage Voice cesse d'être un conseil de style pour devenir une contrainte du composant.

> **Erreur fréquente** : le danger décoratif sur une condition simplement inhabituelle — banalise le signal exactement là où il doit rester intact.

## Persistance (l'axe inédit)

### Permanent

RÈGLE [ALERT-R31] : le message vit aussi longtemps que sa condition — l'utilisateur ne peut pas le fermer, seul un changement d'état le fait disparaître. Réservé aux informations dont l'ignorance a un coût réel : erreurs à corriger, conditions critiques actives.

RÈGLE [ALERT-R32] : permanent = proactif ou bloquant. Ce qui charge avec la page (Carbon : "always present on the screen and load with contents") ou ce qui doit être résolu (résumé d'erreurs). Jamais pour du confort d'émetteur.

RÈGLE [ALERT-R33] : résolution silencieuse — un alert permanent dont la condition cesse d'être vraie doit disparaître, mais pas *silencieusement* pour tout le monde : si la résolution résulte d'une action de l'utilisateur (erreurs corrigées, soumission réussie), la confirmation doit être annoncée par le mécanisme qui prend le relais (message de succès, changement d'état focalisé).

> **Pourquoi** : visuellement, sa disparition est le signal de résolution ; pour un lecteur d'écran, un élément qui s'évapore n'annonce rien — un alert qui disparaît sans successeur laisse l'utilisateur non-voyant dans l'incertitude. (Origine de cette règle — 4e occurrence du biais "état transitoire" : cf. DECISIONS.md.)

RÈGLE [ALERT-R34] : cette résolution est l'application, sur l'alert, du principe de `VOICE-UX.md` « **le mot est le canal de dernier recours** » : la disparition visuelle et le changement de couleur sont des canaux qui *s'évaporent* (rien pour l'AT, rien sous forced-colors), seul un **mot** — message de succès, changement d'état focalisé — porte la résolution de façon inconditionnelle. Le relais textuel n'est pas une politesse, c'est le seul canal qui ne tombe jamais.

### Dismissible

RÈGLE [ALERT-R35] : l'utilisateur peut clore le message — il en a pris connaissance, il reprend son espace. Le défaut raisonnable pour tout ce qui n'est ni bloquant ni critique (Polaris : "be dismissible unless they contain critical information or an important step").

RÈGLE [ALERT-R36] : règle de fermeture — la croix de fermeture est une cible à part entière (taille tactile, focusable, libellée "Fermer" pour le lecteur d'écran) — pas un ornement de coin.

RÈGLE [ALERT-R37] : mémoire de fermeture — la fermeture doit être mémorisée au moins pour la session, et durablement pour les annonces ponctuelles.

RÈGLE [ALERT-R38] : exception explicite — si la *condition* redevient vraie ou s'aggrave (le quota warning fermé hier atteint 100 %), la réapparition est légitime — c'est un nouveau message, pas le retour de l'ancien.

> **Pourquoi** : fermer un alert est une décision de l'utilisateur — la respecter a une portée. Un alert dismissible re-affiché à chaque chargement de page n'est pas dismissible, il est harcelant.

### Combinaisons tone × persistance

RÈGLE [ALERT-R39] : table ci-dessous

| Tone | Permanent | Dismissible |
|---|---|---|
| Info | Rare — seulement si l'info conditionne l'usage de la page (maintenance imminente) | **Le cas nominal de l'info** — annonce prise en compte, on ferme |
| Success | À peu près jamais justifié — un succès est réactif, il n'a pas vocation à occuper le flux sans fin (cf. Carbon, qui l'exclut de l'alert) | Confirmation durable mais congédiable — le bon défaut du success |
| Warning | Condition active à surveiller (quota, dépréciation à échéance) | Avertissement pris en compte — légitime si l'utilisateur peut réellement assumer le risque |
| Danger | **Le cas nominal du danger** — tant que la condition est vraie, le message reste (Polaris : jamais dismissible si critique) | Seulement si la gravité est passée ou assumable — un danger qu'on peut fermer sans conséquence était probablement un warning |

> **Ce que cette table révèle** : les deux axes sont indépendants dans la mécanique mais pas dans la légitimité — les diagonales info-dismissible et danger-permanent sont les régimes naturels, les cases inverses demandent une justification. Même structure que la table style × tone du bouton : toutes les combinaisons existent, toutes ne se valent pas.

## Composition (les slots — pas des axes)

RÈGLE [ALERT-R40] : ordre canonique : **icône → titre → corps → actions**, plus la **croix de fermeture** (dismissible uniquement) en coin opposé au sens de lecture.

### Icône

RÈGLE [ALERT-R41] : porter le tone *autrement que par la couleur*. Une icône par tone, constante dans tout le produit.

RÈGLE [ALERT-R42] : l'icône n'est pas décorative, elle est le canal redondant du sens — elle ne se retire pas pour alléger. (WCAG 1.4.1 — l'information ne repose jamais sur la couleur seule ; et **loi d'affordance n°5** d'`INTERACTION-UX.md`, « la couleur renforce, elle ne crée pas seule le sens » — la forme de l'icône, sa silhouette et le mot fournissent le second canal que la couleur seule ne garantit pas.)

RÈGLE [ALERT-R43] : règle de silhouette — les quatre tones ont des **formes** d'icône distinctes, pas seulement des couleurs distinctes (cercle / cercle-coche / triangle / octogone — silhouettes fixées dans ALERT-UI.md).

> **Pourquoi** : la redondance doit tenir même quand la couleur ne sépare pas les tones entre eux — warning et danger sont proches pour une vision rouge-vert déficiente. C'est le pendant, côté alert, de la règle daltonisme de l'input (erreur signalée par plus que le rouge) et de la carte (sélection signalée par plus que la bordure).

CONFIANCE : établi — WCAG 2.1, critère 1.4.1, standard d'accessibilité.

### Titre

RÈGLE [ALERT-R44] : énoncer le message en une ligne — c'est lui que l'œil et le lecteur d'écran attrapent. Un utilisateur qui ne lit que le titre doit repartir avec l'essentiel.

> **Erreur fréquente** : le titre-catégorie ("Erreur", "Attention") qui ne dit rien — le tone porte déjà la catégorie ; le titre porte le *contenu* ("Le paiement n'a pas abouti").

### Corps

RÈGLE [ALERT-R45] : le pourquoi et le comment-corriger — mêmes exigences de wording que le message d'erreur de l'input : diagnostic fait pour l'utilisateur, pas transféré à l'utilisateur. Optionnel si le titre suffit.

RÈGLE [ALERT-R46] : règle de longueur — 1-2 phrases (Polaris). Au-delà, l'information relève d'une page, pas d'un alert — lier plutôt qu'entasser.

### Zone d'actions

RÈGLE [ALERT-R47] : offrir la sortie — corriger, réessayer, en savoir plus. **Une seule action mise en avant** (Polaris), une seconde tolérée en lien discret.

RÈGLE [ALERT-R48] : le choix de style/tone des boutons internes suit BUTTON-UX.md ; l'alert impose le nombre, comme la carte.

RÈGLE [ALERT-R49] : règle de cohérence de tone — l'action d'un alert danger n'est pas nécessairement un bouton destructive : le tone de l'alert décrit la condition ; le tone du bouton décrit l'action.

> **Pourquoi** : "Corriger" répare, ne détruit pas. Les confondre remet du rouge partout.

### Croix de fermeture

RÈGLE [ALERT-R50] : cf. persistance/dismissible. Jamais présente sur un permanent.

> **Pourquoi** : une croix qui ne ferme pas, ou qui ferme ce qui va revenir, est une affordance mensongère (même famille que la carte statique stylée cliquable).

## Empilement et budget d'attention

Plusieurs conditions simultanément vraies produisent plusieurs alerts candidats — le cas n'est pas exceptionnel, il est l'état normal d'un produit mûr.

RÈGLE [ALERT-R51] : plafond pratique — **un alert par niveau de conteneur** (un pour la page, un par section concernée). Au-delà, agréger : trois warnings de quota deviennent un seul alert listant les trois.

RÈGLE [ALERT-R52] : ordre en cas de cohabitation inévitable — gravité décroissante (danger avant warning avant info) — jamais l'ordre d'arrivée.

RÈGLE [ALERT-R53] : la version agrégée est toujours préférable à la pile.

> **Pourquoi** : Carbon : "avoid overloading a single page with multipl'alerts". Le résumé d'erreurs de FORM-UX.md est précisément ce mouvement (N erreurs → 1 alert).

CONFIANCE : non formalisé — raisonnement de mécanisme + convergence des "sparingly" (Carbon, Polaris), pas de règle chiffrée publiée trouvée.

## États et comportement

RÈGLE [ALERT-R54] : apparition au chargement (proactif) — l'alert est du contenu comme un autre : pas d'animation d'entrée nécessaire, pas d'annonce spéciale ; le lecteur d'écran le rencontre à sa place dans le flux, avant le contenu qu'il conditionne.

RÈGLE [ALERT-R55] : apparition dynamique (réactif) — un alert injecté après une action doit être *annoncé* : `role="alert"` pour danger/warning réactifs, `role="status"` pour info/success (Polaris fait exactement cette distinction).

> **Pourquoi** : c'est le cas SPA déjà documenté par FORM-UX.md — une mise à jour d'état côté client n'annonce rien gratuitement.

RÈGLE [ALERT-R56] : l'insertion ne doit pas provoquer de saut de mise en page sous le point de lecture — insérer au-dessus du viewport courant sans compensation vole la position de lecture.

RÈGLE [ALERT-R57] : **chorégraphie d'apparition / disparition — rattachée nommément à `MOTION-UX.md`.** L'apparition d'un alert *réactif* se joue **en opacité seule** (fondu), jamais en slide qui pousserait le contenu : c'est l'application directe de la règle « **le contenu ne se déplace jamais sans action de l'utilisateur** » de `MOTION-UX.md` — un alert injecté qui glisse déplacerait la cible sous le curseur d'un lecteur qui n'a rien demandé. La **sortie prend le cran inférieur de l'entrée** (plus brève, même registre, `motion.fast` vs `motion.base` — cf. ALERT-UI.md), et l'annonce au lecteur d'écran ne dépend jamais du mouvement.

RÈGLE [ALERT-R58] : **proactif = aucune animation.** Un alert chargé avec la page ne s'anime pas — « **rien n'anime au chargement initial** » (`MOTION-UX.md`) : le contenu proactif est du contenu comme un autre, l'entrée animée est réservée au réactif (conséquence d'une action). C'est la formulation d'origine de ce fichier (« pas d'animation d'entrée nécessaire ») que `MOTION-UX.md` a généralisée à tout le système, puis nous re-cite ici sous son nom.

RÈGLE [ALERT-R59] : **contrat `prefers-reduced-motion` — POSITION explicite, pas un oubli.** L'apparition en opacité est **nativement conforme** au contrat reduced-motion de `MOTION-UX.md` (« réduire ≠ supprimer : les changements d'opacité et de couleur peuvent rester, seul le mouvement *spatial* se désactive »). Comme l'alert n'a **aucune translation à supprimer**, sa chorégraphie ne se dégrade pas sous `prefers-reduced-motion: reduce` — il n'y a rien à couper, le fondu demeure. Ce n'est pas un point resté ouvert (contrairement au « reduced motion » historiquement signalé en fin de fichier) : c'est une conformité par construction, posée ici comme position tenue.

RÈGLE [ALERT-R60] : disparition — cf. "Résolution silencieuse" (permanent) et "Mémoire de fermeture" (dismissible).

RÈGLE [ALERT-R61] : l'alert n'a pas d'état hover/focus propre — il n'est pas interactif en surface ; seuls ses enfants (actions, croix, liens d'ancre) le sont.

> **Pourquoi** : un alert entièrement cliquable cumulerait les problèmes de la carte cliquable sans en avoir la légitimité (la cible naturelle est l'action, pas le message). C'est l'application directe de la **loi d'affordance n°3** d'`INTERACTION-UX.md` — « **une surface organise sans promettre un clic** » : l'alert est une surface qui porte du sens, pas un contrôle ; une surface statique ne copie jamais l'apparence d'un contrôle, ni ses états hover/focus. L'affordance de clic est réservée à ses enfants (actions, croix, liens d'ancre), jamais au conteneur.

CONFIANCE : établi — `role="alert"` vs `role="status"` : Polaris, convergent avec WCAG/ARIA.

RÈGLE [ALERT-R62] : **un éventuel signal sonore d'alerte reste strictement redondant** — si un canal sonore est un jour ajouté (bip pour une condition critique), il *double* le message, il ne le porte jamais seul : texte + icône + couleur portent déjà l'information en entier, un utilisateur sourd, en environnement silencieux ou au son coupé ne perd rien (WCAG 1.4.1 / 1.3.3, principe des canaux ; 1.4.2 pour le contrôle du son). Le son est un rappel d'attention, pas un porteur d'information.

> **Pourquoi** : l'inventaire transversal a marqué le canal sonore « partiel » — l'alert garantit déjà texte + icône + couleur, mais aucune règle ne cadrait un futur son. Ce contrat est posé en avance, sur le modèle de MOTION (jamais l'information par le mouvement seul) : le jour où le produit sonorise une alerte, le principe est déjà écrit.

CONFIANCE : établi (principe des canaux, WCAG 1.4.1) ; aucun consommateur sonore actuel — contrat en avance.

## Instrument E-motion (statuer, même en négatif)

RÈGLE [ALERT-R63] : **l'alert ne porte aucun instrument expressif — position tranchée, pas silence.** Comme le toast statue sur son instrument, l'alert statue ici : c'est un composant **productif** de bout en bout, jamais un moment E-motion. Aucun des quatre instruments d'`EMOTION-UX.md` (mouvement expressif, voix chaleureuse, couleur de fête, illustration / forme) ne s'active sur un alert — sa chorégraphie reste en opacité productive (cf. § États et comportement), son wording dans le registre productif de `VOICE-UX.md`.

RÈGLE [ALERT-R64] : **« un événement, un porteur » (arbitrage utilisateur 2026-07-21).** Le moment catalogué « **sortie d'une erreur / récupération** » d'`EMOTION-UX.md` — qui recoupe la « résolution silencieuse » d'un danger permanent enfin résolu (§ Persistance / Permanent) — ne s'incarne **pas dans l'alert danger elle-même** : l'alert reste le porteur *productif* du problème tant que la condition dure. Le soulagement, lui, s'incarne dans le **success / toast de relais** qui confirme la résolution **après coup** — exactement la distinction que `TOAST-UX.md` fait déjà « entre le problème et son soulagement ». Le porteur du problème et le porteur de la récupération sont deux composants distincts, jamais la même surface.

> **Pourquoi** : incarner la fête de la récupération dans l'alert danger qui porte *encore* le problème mélangerait deux battements émotionnels opposés sur une seule surface — l'alert doit rester lisible comme signal d'alarme tant que sa condition est vraie. Le budget de rareté d'E-motion (« un moment qui se répète cesse d'être expressif ») l'interdit d'autant plus sur un composant permanent par nature. Un événement (le problème), un porteur (l'alert) ; un autre événement (sa résolution), un autre porteur (le relais).

RÈGLE [ALERT-R65] : **l'exception chaleureuse ne touche jamais danger ni warning** — ni côté `VOICE-UX.md` (§ Exception E-motion : « l'exception ne s'étend jamais à une erreur… ni à une action destructive »), ni côté `EMOTION-UX.md`. Sur un alert danger / warning, le registre reste strictement productif : pas d'émoji, pas de « Oups », pas de « ! ». C'est la même frontière que `TOAST-UX.md` trace pour son instrument illustration — la chaleur est réservée aux moments positifs et rares, l'alarme n'en est jamais un.

CONFIANCE : établi (position tranchée par arbitrage utilisateur 2026-07-21 ; cohérente avec le catalogue fermé et le budget de rareté d'`EMOTION-UX.md` et l'Exception E-motion de `VOICE-UX.md`).

## Contextes d'intégration

### Pleine page (bandeau de page)

RÈGLE [ALERT-R66] : en tête du contenu, sous le header, pleine largeur du contenu (Polaris) — avant ce qu'il conditionne, jamais après.

RÈGLE [ALERT-R67] : c'est la position au plus fort budget d'attention : réservée aux conditions qui affectent la page entière.

### Section, carte, modale

RÈGLE [ALERT-R68] : sous le titre de la section concernée, largeur de la section (Polaris : "section-level") — l'alert hérite du conteneur qu'il annote, comme le bouton hérite de la grille de son contenu.

RÈGLE [ALERT-R69] : dans une modale — au-dessus des champs/boutons concernés ; jamais de alert pleine page *dans* une modale.

### Au-dessus d'un élément précis

RÈGLE [ALERT-R70] : le placement contextuel de Carbon ("above buttons/inputs when relevant") — pour une condition qui ne concerne qu'un geste précis ("l'export est indisponible pendant la maintenance", au-dessus du bouton d'export).

RÈGLE [ALERT-R71] : frontière avec le message inline de l'input — si la condition porte sur la *valeur* d'un champ, c'est INPUT-UX.md ; si elle porte sur la *disponibilité ou le contexte* du geste, c'est un alert.

### En tête de formulaire (résumé d'erreurs)

RÈGLE [ALERT-R72] : le cas est entièrement orchestré par FORM-UX.md (cf. recoupement) — conteneur d'ici, chorégraphie de là-bas.

## Risque

RÈGLE [ALERT-R73] : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Alert réactif injecté sans annonce (SPA) | Utilisateur lecteur d'écran jamais informé d'une erreur pourtant affichée | Critique |
| Tone porté par la couleur seule (pas d'icône) | Exclusion daltonisme — un danger et un success indistinguables | Élevée |
| Signal sonore porteur d'information sans équivalent texte/visuel | Exclusion des utilisateurs sourds ou au son coupé (WCAG 1.4.1) | Élevée |
| Danger dismissible sur condition active | Condition critique masquée puis oubliée, perte de données ou d'échéance | Élevée |
| Inflation de alerts (info-poubelle, piles) | Cécité d'attention apprise — les vrais danger ignorés avec le reste | Élevée (différée — invisible dans les tests ponctuels) |
| Fermeture non mémorisée (réapparition à chaque page) | Harcèlement, apprentissage du réflexe "fermer sans lire" | Moyenne |
| Success permanent / confirmation qui ne part jamais | Méfiance sur la fraîcheur de tout ce que la page affiche | Moyenne |
| Insertion avec saut de mise en page | Perte de position de lecture, clic raté sur l'élément déplacé | Moyenne |
| Wording titre-catégorie sans contenu | Charge de diagnostic transférée à l'utilisateur | Moyenne |

## Règle transversale

RÈGLE [ALERT-R74] : **l'interruption doit être proportionnelle à l'urgence réelle du message, jamais à l'envie de visibilité de l'émetteur.**

> **Pourquoi** : c'est la déclinaison pour l'attention du principe posé sur le bouton (la friction suit le risque), l'input (la validation suit le risque d'erreur) et la carte (l'affordance suit la fonction) : ici, ce qui doit suivre la réalité, c'est le *degré d'interruption* — un message qui monte d'un cran sans nécessité (alert→toast→modale, ou info déguisé en warning) dépense un budget d'attention qui manquera au prochain vrai danger.

## Sources et niveau de confiance

| Réf. | Affirmation | Source | Confiance |
|---|---|---|---|
| S1 | 4 variantes de notification (inline persistant / toast auto-fermant ~5s / actionable / alert permanent) | [IBM Carbon — Notification usage](https://carbondesignsystem.com/components/notification/usage/) | Établi — taxonomie explicitement documentée |
| S2 | Alert permanent = proactif, info/warning seulement, jamais success/error réactifs, "used sparingly" | [IBM Carbon — Notification usage](https://carbondesignsystem.com/components/notification/usage/) | Établi — règle explicite du système |
| S3 | 4 tones (info/success/warning/critical), dismissible sauf critique, 1 action principale max, placement page/section/élément | [Shopify Polaris — Banner](https://polaris-react.shopify.com/components/feedback-indicators/banner) | Établi — pattern documenté en détail |
| S4 | `role="alert"` (critique/warning) vs `role="status"` (info/success) | [Shopify Polaris — Banner](https://polaris-react.shopify.com/components/feedback-indicators/banner), convergent avec WCAG/ARIA | Établi |
| S5 | Échelle d'interruption snackbar (basse, auto-dismiss) < banner (moyenne, persiste jusqu'à action) < dialog (haute, bloque) | [Material Design — Banners](https://m2.material.io/components/banners) et [Snackbars](https://m2.material.io/design/components/snackbars.html), lus via source secondaire ([Soliant](https://www.soliantconsulting.com/blog/material-design-filemaker-snackbars-banners/)) car m3.material.io ne sert pas de contenu statique | Établi comme hiérarchie — vérification directe sur m3 non faite, à recouper si enjeu |
| S6 | Banner système réservé au "critical system-level messaging" ; flag pour confirmations à interaction minimale ; section message = portée de section | [Atlassian — Designing messages](https://atlassian.design/foundations/content/designing-messages), [Section message](https://atlassian.design/components/section-message/), [Flag](https://atlassian.design/components/flag/) | Établi — doctrine explicite d'Atlassian |
| S7 | Information jamais portée par la couleur seule (icône par tone) | WCAG 2.1 — 1.4.1 | Établi, standard d'accessibilité |
| S8 | Signal sonore toujours redondant avec le texte/visuel | WCAG 2.1 — 1.4.1 / 1.3.3 (principe des canaux), 1.4.2 (contrôle du son) | Établi, standard d'accessibilité — contrat en avance |
| S9 | Wording quoi/pourquoi/comment-corriger | INPUT-UX.md (Wroblewski, Baymard — déjà sourcé là-bas) | Établi — transposition interne |
| S10 | Mémoire de fermeture, plafond d'empilement par conteneur, budget d'attention | Raisonnement de mécanisme + convergence des "sparingly" (Carbon, Polaris) | Déduction argumentée — pas de règle chiffrée publiée trouvée |
| S11 | Alert = expression canonique de l'intention « Comprendre un état » ; non-interactivité de surface = loi d'affordance n°3 ; redondance icône/couleur = loi n°5 | `INTERACTION-UX.md` (§ Les six intentions ; lois d'affordance n°3 et n°5) | Établi — rattachement interne au langage |
| S12 | Apparition réactive en opacité (jamais de slide), proactif sans animation, sortie au cran inférieur de l'entrée, contrat reduced-motion natif (rien à couper) | `MOTION-UX.md` (« le contenu ne se déplace jamais sans action » ; « rien n'anime au chargement initial » ; reduced-motion « réduire ≠ supprimer ») | Établi — rattachement interne au langage |
| S13 | Tone = projection de l'axe état-émotionnel ; « ne jamais blâmer » (règle cardinale) ; « le mot est le canal de dernier recours » ; Exception E-motion inapplicable à danger/warning | `VOICE-UX.md` (§ Le ton suit l'utilisateur ; § Le mot est le canal d'information fiable ; § Exception E-motion) | Établi — rattachement interne au langage |
| S14 | Alert sans instrument expressif ; « un événement, un porteur » — récupération (« sortie d'erreur ») déléguée au success/toast de relais, pas à l'alert danger | `EMOTION-UX.md` (§ Catalogue des moments mérités, « sortie d'une erreur / récupération ») + arbitrage utilisateur 2026-07-21 | Décision d'identité interne, tranchée par arbitrage |

*Toute règle sans source explicite ci-dessus repose sur un raisonnement de mécanisme (attention, charge cognitive, accessibilité) plutôt que sur une étude chiffrée. Comme pour la carte, aucune étude type "+X%" n'a été trouvée pour ce composant — l'écart de niveau de preuve bouton/input vs carte/alert se confirme : les composants de feedback sont moins mesurés que les composants de conversion.*

## À approfondir

- **Toast / snackbar** : le composant frère exclu par la frontière de périmètre — candidat naturel de prochaine documentation (durées, empilement, undo — BUTTON-UX.md l'effleure déjà par la fenêtre 5-8s du pattern undo).
- **Bannière de consentement (cookies)** : pattern réglementaire distinct — les boutons restent régis par BUTTON-UX.md, l'objet lui-même n'est couvert nulle part.
- **Centre de notifications** (historique des messages passés) : hors périmètre — c'est une vue, pas un composant.
- **RTL et reduced motion** : position de l'icône/croix en lecture droite-gauche, insertion sans animation — signalés dans l'inventaire, non couverts.
