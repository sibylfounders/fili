---
sujet: motion
nature: languages
resume: "Ce fichier contient le raisonnement : à quoi le mouvement sert, combien de temps il dure, qui il ne doit jamais gêner."
selon-contexte: [alert, border, button, card, color, form, iconography, input, performance, spacing]
source: MOTION-UX.md v1.3.2 + MOTION-UI.md v1.1.0
empreinte: sha256:89dc3c9bbbdebe0d
regles: {loi: 0, preference: 0, non_qualifie: 24}
---
# RULES — motion (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** le motion est un **langage temporel** — pas d'axes : il exprime tous les changements d'état du système par le feedback et la continuité. Particularité : ce langage est *entièrement fait* d'états transitoires — le prédicteur "état transitoire" du README ne désigne plus un trou probable mais le sujet lui-même ; son application ici devient : traiter d'office **l'interruption** (l'état transitoire de l'état transitoire, cf. § Interruption).
- **[non qualifié]** le mouvement porte deux fonctions, et seulement deux :
- **[non qualifié]** **frontière avec le principe `performance`** (2026-07-21) — ce langage possède les durées et courbes des **animations** ; le contrat des **attentes** (quel feedback à quel délai, optimisme, honnêteté de la progression) vit dans PERFORMANCE-UX.md. L'indicateur de chargement appartient aux deux : sa forme et son mouvement ici, son moment d'apparition et sa sincérité là-bas.
- **[non qualifié]** **le registre de ce produit est productif, pas expressif** (dualité Carbon) : documentation, précision, sobriété. Le mouvement décoratif, d'ambiance ou de célébration est hors registre par décision — pas de bounce, pas de stagger d'apparat, pas d'animation de marque. Toute exception se journalise.
- **[non qualifié]** **distinguer la contrainte du parti pris (1.2.0).** Deux natures de règles cohabitent dans ce langage et ne se négocient pas de la même façon : les **contraintes** (WCAG — reduced-motion, flash < 3/s, transform/opacity, jamais l'information par le mouvement seul) sont **non négociables** ; le **registre « productif seulement »** est un **parti pris d'identité** (ligne CONFIANCE « décision interne »), donc **paramétrable par un consommateur qui l'assume** — une marque expressive (ex. un hero interactif) peut relever le registre **sans jamais toucher aux contraintes** (mouvement coupé sous reduced-motion, transform/opacity seuls, aucune information portée par le mouvement). Le système encadre la dérogation au lieu de la forcer : relever le registre est un chemin sanctionné, pas une entorse. **Lecture d'audit (pivot 2026-07-21)** : face à une interface tierce, seul le volet *contraintes* fonde une non-conformité ; une animation expressive chez un hôte au registre assumé est une *divergence de registre* à signaler à part, pas un défaut.
- **[non qualifié]** **la règle cardinale** : toute information portée par un mouvement existe aussi statiquement — l'état du chevron est dans `aria-expanded`, la résolution de l'alert est annoncée (ALERT-UX), le chargement a son indicateur visible. Le mouvement est une *confirmation sensorielle*, jamais la *source* de l'information.
- **[non qualifié]** trois crans (`motion.fast` / `motion.base` / `motion.slow`), et une lecture simple : **petit changement = cran court, grand changement = cran long**. Feedback (hover, couleur) : fast. Continuité locale (chevron, apparition, dépliage) : base. Grandes surfaces (panneaux, futurs superposés) : slow.
- **[non qualifié]** bornes sourcées — sous ~100 ms, un feedback est perçu comme instantané (Nielsen) ; au-delà de ~400 ms, une transition paraît lente (Material). L'échelle entière de ce système vit dans cette fenêtre, et son cran le plus long reste sous la borne haute.
- **[non qualifié]** **la sortie est plus courte que l'entrée** : ce qui part n'a plus besoin d'attention — en pratique, une sortie prend le cran inférieur de son entrée (entrée base → sortie fast).
- **[non qualifié]** le mouvement **ne verrouille jamais l'interaction** : aucune action n'attend la fin d'une animation pour être disponible ; l'animation accompagne le changement d'état, elle ne le retarde pas.
- **[non qualifié]** trois courbes (`motion.ease-out` / `motion.ease-in` / `motion.ease-in-out`), mappées sur les trois situations : **ce qui entre décélère** (ease-out : arrive vite, se pose), **ce qui sort accélère** (ease-in : s'efface sans traîner), **ce qui bouge sur place fait les deux** (ease-in-out : chevron, dépliage). Consensus explicite des quatre systèmes benchmarkés.
- **[non qualifié]** **jamais de linéaire pour un déplacement** ("le mouvement strictement linéaire paraît artificiel à l'œil" — Carbon) — une seule exception : la **rotation continue du spinner** (Polaris la réserve exactement à ça).
- **[non qualifié]** toute transition est **interruptible et repart de l'état courant** : un re-hover pendant la sortie du hover inverse la transition là où elle en est ; un double clic sur le chevron ne rejoue pas deux animations. Jamais de file d'attente d'animations, jamais d'état "en attente de fin d'animation".
- **[non qualifié]** **le focus ring n'est jamais animé** — c'est une information de position pour la navigation clavier, pas un effet (règle partagée avec BORDER-UX, qui fait autorité sur le ring).
- **[non qualifié]** **rien n'anime au chargement initial** de la page — le contenu proactif est du contenu comme un autre (généralisation de ALERT-UX : "pas d'animation d'entrée nécessaire") ; les entrées animées sont réservées aux changements *réactifs* (conséquences d'une action).
- **[non qualifié]** **le contenu ne se déplace jamais sans action de l'utilisateur** : l'insertion dynamique réserve son espace quand c'est possible (ALERT-UX, SPACING-UX) ; à défaut, elle insère sous le point de lecture. Le déplacement non sollicité est le mouvement le plus hostile — il déplace la cible sous le curseur.
- **[non qualifié]** pas de **stagger décoratif** : ce qui réagit ensemble bouge ensemble (des cartes qui apparaissent en cascade, c'est de l'expressif — hors registre).
- **[non qualifié]** sous `prefers-reduced-motion: reduce` : **les déplacements, rotations, changements d'échelle se désactivent ; les changements d'opacité et de couleur peuvent rester** (la préférence vise le mouvement *spatial* — troubles vestibulaires : nausées, vertiges — pas le changement visuel). "Reduce" ne veut pas dire zéro : un crossfade remplace un glissement.
- **[non qualifié]** applications concrètes chez les consommateurs : bascules d'état instantanées ou en fondu (hover, élévation), chevron qui *saute* à son orientation finale, **skeleton sans pulse** (l'attente reste visible, statique — l'indicateur demeure, le mouvement part), spinner remplacé par un indicateur statique ou un pulse d'opacité.
- **[non qualifié]** cadre normatif — WCAG 2.3.3 (AAA) : les animations d'interaction doivent pouvoir être désactivées ; WCAG 2.2.2 (A) : tout mouvement automatique de plus de 5 s doit être arrêtable. Le seul mouvement en boucle du système (pulse du skeleton) est un indicateur de chargement — exemption prévue par 2.2.2 — et il est *quand même* coupé sous reduced-motion, par choix.
- **[non qualifié]** **aucune séquence ne flashe plus de trois fois par seconde**, et rien ne franchit les seuils de flash général ou de flash rouge (WCAG 2.3.1, niveau A). Le registre productif ne prévoit aucun flash — cette règle **verrouille** l'interdit pour tout futur consommateur (célébration, alerte clignotante, chargement pulsé agressif) : le clignotement rapide « pour attirer l'œil » est proscrit, l'attention se gagne par la place et le mot, jamais par le stroboscope.
- **[non qualifié]** le seul mouvement en boucle admis reste l'indicateur de chargement (skeleton, spinner) — il pulse en **opacité douce**, jamais en flash ; un clignotement décoratif, rapide (dangereux) comme lent (bruit), n'existe pas dans le registre.
- **[non qualifié]** n'animer que **`transform` et `opacity`** (étape composite — pas de layout, pas de paint) ; jamais width/height/top/margin (layout) ni box-shadow interpolé (paint) — les techniques concrètes (ombre par pseudo-élément, dépliage) vivent dans MOTION-UI.
- **[non qualifié]** **le mouvement est un commentaire — jamais le texte.** Il confirme, relie, occupe l'attente ; il n'informe pas seul, ne bloque pas, ne décore pas.
