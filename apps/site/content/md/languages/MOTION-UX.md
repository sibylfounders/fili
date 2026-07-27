---
component: motion
layer: ux
type: language
version: 1.3.2 # 1.3.2 : lecture d'audit du parti pris (pivot 2026-07-21) — seul le volet contraintes fonde une non-conformité chez un hôte tiers ; le registre se signale comme divergence, jamais comme défaut. 1.3.1 : frontière nommée avec le principe performance (2026-07-21) — motion possède les durées et courbes des animations, performance le contrat des attentes ; aucune règle modifiée. 1.3.0 : Motion devient un langage de premier niveau — le canal temporel qui exprime feedback et continuité ; les tokens motion.* restent des fondations techniques dans DESIGN.md. 1.2.1 : note « À approfondir » — patterns de transition inter-écrans de M3 (container transform, shared axis, fade through, fade) recensés comme hors périmètre jusqu'au layout/navigation, pour ne pas les redécouvrir (2026-07-19). 1.2.0 : distinction contrainte (WCAG) vs parti pris d'identité paramétrable (registre productif) — stress-test 2026-07-17. 1.1.0 : ajout de l'interdit dur du flash dangereux (WCAG 2.3.1) — trou P1 de l'inventaire transversal accessibilité comblé chez son propriétaire (2026-07-14, cf. DECISIONS.md). 1.0.0 : première rédaction — inventaire et benchmark faits avant livraison ; crée les tokens motion.* dans DESIGN.md 1.11.0 (les micro-interactions existaient sans vocabulaire commun : hover, chevron, disparition de l'alert, skeleton)
last_updated: 2026-07-21
companion: MOTION-UI.md
confidence: mixed # les plages de durées, les courbes et reduced-motion sont établis par convergence ; le registre "productif seulement" est une décision d'identité interne
---

# Langage de mouvement — Couche UX

> Ce fichier contient le raisonnement : à quoi le mouvement sert, combien de temps il dure, qui il ne doit jamais gêner. Les valeurs (`motion.*` — durées, courbes) vivent dans `DESIGN.md` ; les techniques vivent dans `MOTION-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE : le motion est un **langage temporel** — pas d'axes : il exprime tous les changements d'état du système par le feedback et la continuité. Particularité : ce langage est *entièrement fait* d'états transitoires — le prédicteur "état transitoire" du README ne désigne plus un trou probable mais le sujet lui-même ; son application ici devient : traiter d'office **l'interruption** (l'état transitoire de l'état transitoire, cf. § Interruption).

RÈGLE : le mouvement porte deux fonctions, et seulement deux :
  1. **Le feedback** — confirmer qu'une action a été reçue (hover, press, transition d'état). Court, discret, immédiat.
  2. **La continuité** — relier deux états pour expliquer d'où vient le changement (chevron qui tourne, contenu qui se déplie, alert qui se résout). Un peu plus long, jamais spectaculaire.

RÈGLE : **frontière avec le principe `performance`** (2026-07-21) — ce langage possède les durées et courbes des **animations** ; le contrat des **attentes** (quel feedback à quel délai, optimisme, honnêteté de la progression) vit dans PERFORMANCE-UX.md. L'indicateur de chargement appartient aux deux : sa forme et son mouvement ici, son moment d'apparition et sa sincérité là-bas.

RÈGLE : **le registre de ce produit est productif, pas expressif** (dualité Carbon) : documentation, précision, sobriété. Le mouvement décoratif, d'ambiance ou de célébration est hors registre par décision — pas de bounce, pas de stagger d'apparat, pas d'animation de marque. Toute exception se journalise.

RÈGLE : **distinguer la contrainte du parti pris (1.2.0).** Deux natures de règles cohabitent dans ce langage et ne se négocient pas de la même façon : les **contraintes** (WCAG — reduced-motion, flash < 3/s, transform/opacity, jamais l'information par le mouvement seul) sont **non négociables** ; le **registre « productif seulement »** est un **parti pris d'identité** (ligne CONFIANCE « décision interne »), donc **paramétrable par un consommateur qui l'assume** — une marque expressive (ex. un hero interactif) peut relever le registre **sans jamais toucher aux contraintes** (mouvement coupé sous reduced-motion, transform/opacity seuls, aucune information portée par le mouvement). Le système encadre la dérogation au lieu de la forcer : relever le registre est un chemin sanctionné, pas une entorse. **Lecture d'audit (pivot 2026-07-21)** : face à une interface tierce, seul le volet *contraintes* fonde une non-conformité ; une animation expressive chez un hôte au registre assumé est une *divergence de registre* à signaler à part, pas un défaut.

> **Pourquoi** : le mouvement est le canal le plus intrusif du système — il capte l'attention de force (la vision périphérique est câblée pour détecter le mouvement). Un produit de documentation qui bouge beaucoup est un produit qui interrompt beaucoup.

## Le mouvement confirme, il n'informe jamais seul

RÈGLE : **la règle cardinale** : toute information portée par un mouvement existe aussi statiquement — l'état du chevron est dans `aria-expanded`, la résolution de l'alert est annoncée (ALERT-UX), le chargement a son indicateur visible. Le mouvement est une *confirmation sensorielle*, jamais la *source* de l'information.

> **Pourquoi** : c'est la condition qui rend `prefers-reduced-motion` implémentable sans perte : si couper le mouvement coupait de l'information, la préférence d'accessibilité deviendrait une dégradation fonctionnelle.

## Durées — l'échelle et ses bornes

RÈGLE : trois crans (`motion.fast` / `motion.base` / `motion.slow`), et une lecture simple : **petit changement = cran court, grand changement = cran long**. Feedback (hover, couleur) : fast. Continuité locale (chevron, apparition, dépliage) : base. Grandes surfaces (panneaux, futurs superposés) : slow.

RÈGLE : bornes sourcées — sous ~100 ms, un feedback est perçu comme instantané (Nielsen) ; au-delà de ~400 ms, une transition paraît lente (Material). L'échelle entière de ce système vit dans cette fenêtre, et son cran le plus long reste sous la borne haute.

RÈGLE : **la sortie est plus courte que l'entrée** : ce qui part n'a plus besoin d'attention — en pratique, une sortie prend le cran inférieur de son entrée (entrée base → sortie fast).

RÈGLE : le mouvement **ne verrouille jamais l'interaction** : aucune action n'attend la fin d'une animation pour être disponible ; l'animation accompagne le changement d'état, elle ne le retarde pas.

## Courbes — trois, et pourquoi pas plus

RÈGLE : trois courbes (`motion.ease-out` / `motion.ease-in` / `motion.ease-in-out`), mappées sur les trois situations : **ce qui entre décélère** (ease-out : arrive vite, se pose), **ce qui sort accélère** (ease-in : s'efface sans traîner), **ce qui bouge sur place fait les deux** (ease-in-out : chevron, dépliage). Consensus explicite des quatre systèmes benchmarkés.

RÈGLE : **jamais de linéaire pour un déplacement** ("le mouvement strictement linéaire paraît artificiel à l'œil" — Carbon) — une seule exception : la **rotation continue du spinner** (Polaris la réserve exactement à ça).

## Interruption — écrit d'office

RÈGLE : toute transition est **interruptible et repart de l'état courant** : un re-hover pendant la sortie du hover inverse la transition là où elle en est ; un double clic sur le chevron ne rejoue pas deux animations. Jamais de file d'attente d'animations, jamais d'état "en attente de fin d'animation".

> **Pourquoi** : les transitions CSS ont ce comportement nativement — le perdre (animations par keyframes rejouées, verrous JS) est une régression qu'on s'interdit d'introduire.

## Ce qui ne s'anime pas

RÈGLE : **le focus ring n'est jamais animé** — c'est une information de position pour la navigation clavier, pas un effet (règle partagée avec BORDER-UX, qui fait autorité sur le ring).

RÈGLE : **rien n'anime au chargement initial** de la page — le contenu proactif est du contenu comme un autre (généralisation de ALERT-UX : "pas d'animation d'entrée nécessaire") ; les entrées animées sont réservées aux changements *réactifs* (conséquences d'une action).

RÈGLE : **le contenu ne se déplace jamais sans action de l'utilisateur** : l'insertion dynamique réserve son espace quand c'est possible (ALERT-UX, SPACING-UX) ; à défaut, elle insère sous le point de lecture. Le déplacement non sollicité est le mouvement le plus hostile — il déplace la cible sous le curseur.

RÈGLE : pas de **stagger décoratif** : ce qui réagit ensemble bouge ensemble (des cartes qui apparaissent en cascade, c'est de l'expressif — hors registre).

## prefers-reduced-motion — le contrat d'accessibilité

RÈGLE : sous `prefers-reduced-motion: reduce` : **les déplacements, rotations, changements d'échelle se désactivent ; les changements d'opacité et de couleur peuvent rester** (la préférence vise le mouvement *spatial* — troubles vestibulaires : nausées, vertiges — pas le changement visuel). "Reduce" ne veut pas dire zéro : un crossfade remplace un glissement.

RÈGLE : applications concrètes chez les consommateurs : bascules d'état instantanées ou en fondu (hover, élévation), chevron qui *saute* à son orientation finale, **skeleton sans pulse** (l'attente reste visible, statique — l'indicateur demeure, le mouvement part), spinner remplacé par un indicateur statique ou un pulse d'opacité.

RÈGLE : cadre normatif — WCAG 2.3.3 (AAA) : les animations d'interaction doivent pouvoir être désactivées ; WCAG 2.2.2 (A) : tout mouvement automatique de plus de 5 s doit être arrêtable. Le seul mouvement en boucle du système (pulse du skeleton) est un indicateur de chargement — exemption prévue par 2.2.2 — et il est *quand même* coupé sous reduced-motion, par choix.

CONFIANCE : établi (WCAG, MDN/web.dev, convergence des systèmes) ; le sur-respect du skeleton est une décision interne.

## Flash et clignotement — l'interdit dur

RÈGLE : **aucune séquence ne flashe plus de trois fois par seconde**, et rien ne franchit les seuils de flash général ou de flash rouge (WCAG 2.3.1, niveau A). Le registre productif ne prévoit aucun flash — cette règle **verrouille** l'interdit pour tout futur consommateur (célébration, alerte clignotante, chargement pulsé agressif) : le clignotement rapide « pour attirer l'œil » est proscrit, l'attention se gagne par la place et le mot, jamais par le stroboscope.

RÈGLE : le seul mouvement en boucle admis reste l'indicateur de chargement (skeleton, spinner) — il pulse en **opacité douce**, jamais en flash ; un clignotement décoratif, rapide (dangereux) comme lent (bruit), n'existe pas dans le registre.

> **Pourquoi** : c'est le seul risque du langage qui ne dégrade pas le confort mais peut **déclencher une crise** (épilepsie photosensible). Contrairement à une durée trop longue (agaçante) ou à un layout animé (saccadé), un flash au-dessus du seuil est un danger physiologique sans contrepartie ergonomique négociable — d'où l'interdit dur, distinct du reste du registre.

CONFIANCE : établi — WCAG 2.3.1 (seuil des trois flashs) et 2.3.2 sont un standard d'accessibilité.

## Performance — la contrainte qui décide des techniques

RÈGLE : n'animer que **`transform` et `opacity`** (étape composite — pas de layout, pas de paint) ; jamais width/height/top/margin (layout) ni box-shadow interpolé (paint) — les techniques concrètes (ombre par pseudo-élément, dépliage) vivent dans MOTION-UI.

> **Pourquoi** : une animation qui saccade est pire que pas d'animation — elle transforme le feedback en bruit. La contrainte technique rejoint le registre sobre : ce qui est cher à animer est précisément ce qu'on ne veut pas animer.

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Information portée par le mouvement seul | Perte fonctionnelle sous reduced-motion, AT aveugle | Critique |
| Flash > 3/s ou seuil de flash rouge franchi | Risque de crise photosensible (WCAG 2.3.1) | Critique |
| reduced-motion ignoré | Troubles vestibulaires — nausées, vertiges (WCAG 2.3.3) | Élevée |
| Contenu déplacé sans action utilisateur | Cible mouvante, clics ratés, lecture perdue | Élevée |
| Mouvement qui verrouille l'interaction | Utilisateur otage de l'animation | Élevée |
| Animation de layout (width/top/margin) | Saccades, feedback transformé en bruit | Moyenne à élevée |
| Boucle > 5 s non arrêtable (hors indicateurs) | Échec WCAG 2.2.2 (niveau A) | Élevée |
| Durées > ~400 ms | Produit perçu comme lent | Moyenne |
| Focus animé | Position clavier incertaine | Moyenne |
| Vocabulaire incohérent (durées/courbes par écran) | Produit perçu comme disparate | Moyenne |

## Règle transversale

RÈGLE : **le mouvement est un commentaire — jamais le texte.** Il confirme, relie, occupe l'attente ; il n'informe pas seul, ne bloque pas, ne décore pas.

> **Pourquoi** : c'est la déclinaison temporelle du principe des canaux (COLOR-UX : jamais la couleur seule ; ICONOGRAPHY-UX : jamais le dessin seul) — le mouvement est le troisième canal non fiable : le plus rapide à percevoir, le premier à disparaître (reduced-motion, AT, captures).

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Plages de durées 50-400 ms, petit=court/grand=long | [Atlassian — Motion](https://atlassian.design/foundations/motion) (interactions 50-150 / transitions 150-400), [Carbon — Motion](https://carbondesignsystem.com/elements/motion/overview/) (70-700 ms), [Material — durées](https://m1.material.io/motion/duration-easing.html) (au-delà de 400 ms : lent), [Polaris — tokens](https://polaris-react.shopify.com/tokens/motion) | Établi — convergence des quatre systèmes |
| < 100 ms perçu instantané ; 1 s limite du flux de pensée | [NN/g — Response Times](https://www.nngroup.com/articles/response-times-3-important-limits/) ; [Doherty threshold](https://lawsofux.com/doherty-threshold/) (< 400 ms) | Établi — littérature fondatrice |
| Sortie plus courte que l'entrée | [Material v1 — Duration & easing](https://m1.material.io/motion/duration-easing.html) (225/195 ms) | Établi chez Material, convergent |
| ease-out entrée / ease-in sortie / ease-in-out sur place ; jamais linéaire sauf spinner | [Carbon](https://carbondesignsystem.com/elements/motion/overview/), [Atlassian](https://atlassian.design/foundations/motion), [Polaris](https://polaris-react.shopify.com/tokens/motion) (linear réservé aux spinners), [Material 3 — easing & duration](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs) | Établi — consensus fort |
| Dualité productive/expressive | [Carbon — Motion](https://carbondesignsystem.com/elements/motion/overview/) | Établi chez Carbon — le "productif seul" est un choix d'identité interne |
| reduced-motion : réduire ≠ supprimer ; opacité conservable, déplacement remplacé | [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [web.dev](https://web.dev/articles/prefers-reduced-motion) | Établi |
| WCAG 2.3.3 (AAA) et 2.2.2 (A, exemption des indicateurs de progression) | [W3C — Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions), [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Établi, standard d'accessibilité |
| Flash ≤ 3/s, seuils général et rouge (WCAG 2.3.1) | [W3C — Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html) | Établi, standard d'accessibilité |
| transform/opacity seuls (composite) | [web.dev — Animations guide](https://web.dev/articles/animations-guide) | Établi — littérature performance |

## À approfondir

- **Toast/snackbar** : ses durées d'affichage (auto-dismiss) sont une décision du composant à naître — ce langage ne fournit que le vocabulaire d'entrée/sortie.
- **Futurs superposés** (modale) : entrée en slow + scrim — à confirmer avec elevation.overlay et le scrim (COLOR-UX).
- **Patterns de transition inter-écrans (M3)** : Material 3 documente quatre chorégraphies de navigation entre surfaces — *container transform* (un élément se transforme en un autre : carte → page de détail), *shared axis* (relation directionnelle x/y/z entre pairs : onglets, stepper), *fade through* (le sortant s'efface puis l'entrant apparaît, sans lien fort) et *fade* (entrée/sortie dans les limites de l'écran : dialog, menu). **Hors périmètre pour l'instant** — on n'a ni layout ni navigation, et ces patterns relèvent du registre expressif/spatial qu'on a écarté (§ Note de transposition). À rouvrir le jour où le produit a des vues superposées ou une vraie navigation : *fade through* et *fade* rentrent sans peine dans le registre productif ; *container transform* et *shared axis* sont plus expressifs et demandent un arbitrage (comme le relèvement de registre du 1.2.0). On garde le vocabulaire (durées/courbes/entrée-sortie) qui les alimenterait ; ce qui manque, c'est l'orchestration cross-composant. Réf. [M3 — Transition patterns](https://m3.material.io/styles/motion/transitions/transition-patterns).
- **View Transitions API** : hors périmètre tant que les transitions restent locales à un composant (c'est le levier technique des patterns inter-écrans ci-dessus).
- **Retour haptique mobile** (BUTTON-UX le mentionne au tap) : canal voisin du motion, non traité ici — à rattacher le jour où le produit a une surface native.
