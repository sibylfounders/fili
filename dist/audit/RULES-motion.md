---
sujet: motion
nature: languages
resume: "Ce fichier contient le raisonnement : à quoi le mouvement sert, combien de temps il dure, qui il ne doit jamais gêner."
selon-contexte: [alert, border, button, card, color, form, iconography, input, performance, spacing]
source: MOTION-UX.md v1.3.2 + MOTION-UI.md v1.1.0
empreinte: sha256:33f45622086aea76
regles: {loi: 8, preference: 13, non_qualifie: 0}
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

- **[préférence]** Un mouvement d'interface ne remplit que deux fonctions : confirmer qu'une action a été reçue (feedback, court et discret) ou relier deux états pour expliquer le changement (continuité, plus long mais jamais spectaculaire). `MOTION-R02`
- **[préférence]** Le registre du mouvement est productif et non expressif : aucun mouvement décoratif, d'ambiance, de célébration ou de marque, et toute exception se journalise. `MOTION-R04`
  - vérifiable : aucun rebond, aucun stagger d'apparat, aucune animation de marque
- **[loi]** Toute information portée par un mouvement doit exister aussi sans lui : sous forme textuelle ou programmatiquement déterminable, le mouvement n'étant qu'une confirmation sensorielle. `MOTION-R06`
  - vérifiable : tout état signalé par une animation est exposé dans le DOM ou en texte, et reste lisible mouvement coupé
  - source : https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html
- **[préférence]** L'amplitude du changement décide de la durée : petit changement, cran court ; continuité locale, cran médian ; grande surface, cran long. `MOTION-R07`
  - vérifiable : toute durée d'animation provient d'un token motion.fast, motion.base ou motion.slow, jamais d'une valeur en dur
- **[loi]** Un feedback rendu en moins d'environ 100 ms est perçu comme instantané, et une transition d'interface qui dépasse environ 400 ms est perçue comme lente. `MOTION-R08`
  - vérifiable : aucune durée de transition d'interface supérieure à 400 ms
  - source : https://www.nngroup.com/articles/response-times-3-important-limits/
- **[loi]** La sortie d'un élément est plus rapide que son entrée, ce qui part n'ayant plus besoin d'attention. `MOTION-R09`
  - vérifiable : pour un même élément, durée de sortie strictement inférieure à la durée d'entrée
  - source : https://m1.material.io/motion/duration-easing.html
- **[préférence]** Le mouvement ne verrouille jamais l'interaction : aucune action n'attend la fin d'une animation pour devenir disponible. `MOTION-R10`
  - vérifiable : aucune action désactivée ou différée pendant la durée d'une animation
- **[préférence]** Ce qui entre décélère, ce qui sort accélère, ce qui bouge sur place fait les deux — et le vocabulaire s'arrête à ces trois courbes. `MOTION-R11`
  - vérifiable : toute animation consomme une des trois courbes motion.ease-out, motion.ease-in ou motion.ease-in-out
- **[préférence]** Aucun déplacement n'utilise une courbe linéaire ; le linéaire est réservé à la rotation continue d'un indicateur de chargement. `MOTION-R12`
  - vérifiable : aucune transition sur transform en timing-function linear, hors indicateur de chargement
- **[préférence]** Toute transition est interruptible et repart de la valeur courante : aucune file d'attente d'animations, aucun état d'attente de fin d'animation, aucun rejeu en double. `MOTION-R13`
  - vérifiable : un re-déclenchement pendant une transition inverse le mouvement depuis l'état courant, sans saut ni verrou
- **[préférence]** L'indicateur de focus apparaît instantanément : il n'est jamais animé ni retardé, car il porte une information de position clavier et non un effet. `MOTION-R14`
  - vérifiable : aucune propriété de transition sur l'outline ou le box-shadow de focus
- **[préférence]** Rien ne s'anime au chargement initial d'une page : les entrées animées sont réservées aux changements consécutifs à une action de l'utilisateur. `MOTION-R15`
  - vérifiable : aucune animation d'entrée déclenchée avant la première interaction
- **[loi]** Le contenu ne se déplace jamais sans action de l'utilisateur : une insertion dynamique réserve son espace, ou à défaut s'insère hors du point de lecture. `MOTION-R16`
  - vérifiable : CLS ≤ 0,1, les décalages survenant dans les 500 ms suivant une interaction discrète étant exclus
  - source : https://web.dev/articles/cls
- **[préférence]** Les éléments qui réagissent ensemble s'animent ensemble : aucun décalage en cascade décoratif. `MOTION-R17`
  - vérifiable : aucun delay échelonné entre éléments d'un même groupe
- **[loi]** Sous prefers-reduced-motion: reduce, les déplacements, rotations et changements d'échelle sont supprimés ou remplacés ; les changements d'opacité et de couleur peuvent subsister, la préférence visant le mouvement spatial. `MOTION-R18`
  - vérifiable : sous prefers-reduced-motion: reduce, aucune translation, rotation ni mise à l'échelle animée
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **[préférence]** Sous mouvement réduit, les bascules d'état sont instantanées ou en fondu, le chevron saute à son orientation finale, le squelette reste visible sans pulsation et l'indicateur de chargement cède la place à un rendu statique. `MOTION-R19`
- **[loi]** Une animation déclenchée par une interaction doit pouvoir être désactivée, et tout mouvement automatique qui dure plus de cinq secondes et se présente en parallèle d'autre contenu doit offrir un moyen de le mettre en pause, de l'arrêter ou de le masquer. `MOTION-R20`
  - vérifiable : aucune animation en boucle de plus de 5 s présentée en parallèle d'autre contenu sans mécanisme de pause, d'arrêt ou de masquage
  - source : https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions
- **[loi]** Aucune séquence ne flashe plus de trois fois par seconde, et aucune ne franchit les seuils de flash général ou de flash rouge. `MOTION-R21`
  - vérifiable : ≤ 3 flashs par seconde ; seuils de flash général et de flash rouge non franchis
  - source : https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html
- **[préférence]** Le seul mouvement en boucle admis est l'indicateur de chargement, qui pulse en opacité douce ; aucun clignotement décoratif n'existe dans le système. `MOTION-R22`
  - vérifiable : aucune animation en boucle hors indicateur de chargement
- **[loi]** Les animations portent sur des propriétés composites — transform et opacity — et jamais sur des propriétés qui déclenchent le layout ou un repaint coûteux. `MOTION-R23`
  - vérifiable : aucune propriété de layout dans les transitions
  - source : https://web.dev/articles/animations-guide
- **[préférence]** Le mouvement est un commentaire et jamais le texte : il confirme, relie et occupe l'attente, mais n'informe pas seul, ne bloque pas et ne décore pas. `MOTION-R25`
