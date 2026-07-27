---
component: performance
layer: ux
type: principle
version: 1.0.0 # 1.0.0 : première rédaction — le contrat des attentes, pendant temporel de cognitive-load. Inventaire transversal et benchmark faits AVANT livraison. Arbitrages du 2026-07-21 (cf. DECISIONS.md) : socle universel (5e RULES), seuils en prose (aucun token), anti-scintillement non chiffré jusqu'au premier consommateur outillé, nom « performance ».
last_updated: 2026-07-21
companion: none # principe UX-only pressenti, sur le modèle d'accessibility/cognitive-load : aucune valeur visuelle ni token propre — les mécaniques d'attente vivent chez leurs propriétaires (FORM, BUTTON, INPUT, CARD, COLLECTION, MOTION)
confidence: mixed # les seuils de réponse (0,1 s / 1 s / 10 s, NN/g) et la borne ~400 ms (Doherty, via le catalogue laws) sont établis ; l'interdit de l'attente artificielle va CONTRE une littérature documentée (labor illusion) — position interne assumée, marquée comme telle ; le délai anti-scintillement est une convergence non chiffrée
---

# Performance perçue — Couche UX (principe transversal)

> Ce fichier pose le **contrat des attentes** : ce que l'interface montre, dit et promet pendant que le système travaille. La vitesse *réelle* est une affaire d'ingénierie (poids, réseau, calcul) — hors périmètre ; la vitesse *perçue* est une affaire de design, et c'est elle que l'utilisateur vit. Le système possède déjà les morceaux (bornes d'animation chez `MOTION`, cycle de soumission chez `FORM`, squelette chez `CARD`, attente par champ chez `INPUT`) ; personne ne possédait le contrat transversal — quel feedback à quel délai, quand l'optimisme est permis, ce que l'honnêteté interdit. Comme `cognitive-load` face au catalogue des lois : ce principe contraint, cite, renvoie — il ne réécrit aucune mécanique. Source du besoin : `atelier/inventaires/inventaire-cas-usage-performance.md` (audit transversal du 2026-07-21).

## Note de transposition (à lire en premier)

RÈGLE : la performance perçue est un **principe transversal** — ni variantes, ni assemblage, ni token ; le modèle à axes ne s'applique pas. Comme `accessibility` et `cognitive-load` : `companion: none` **sans** `audience: humans` — compilé vers `dist/RULES-performance.md` et **chargé d'office par le routeur pour toute intention** (5e RULES du socle universel, arbitré le 2026-07-21 — toute intention charge et attend ; le coût du socle est mesuré à chaque build et sa clause de réouverture est déjà journalisée chez cognitive-load).

RÈGLE : **frontière avec `motion`** — `MOTION` possède les durées et courbes des **animations** (ce qui bouge) ; ce principe possède le contrat des **attentes** (ce qu'on montre pendant que le système travaille). Les deux se rejoignent sur une conviction : tout le registre productif vit sous ~400 ms — mais une transition de 200 ms et une réponse serveur de 4 s sont deux problèmes différents, avec deux propriétaires.

RÈGLE : **aucun token nouveau.** Les seuils de ce fichier (~0,1 s / ~1 s / ~10 s) sont des **bornes de raisonnement sourcées**, pas des valeurs de design à thématiser — on ne re-thème pas la psychophysique. Ils restent en prose, comme la fourchette 45-75 caractères avant que `measure` n'ait un consommateur — position arbitrée le 2026-07-21, à revoir uniquement si un consommateur outillé (harness, lint) réclame des valeurs machine (cf. À approfondir).

RÈGLE : ce principe **ne fait pas autorité sur un comportement précis** — il pose l'obligation, le propriétaire pose la mécanique (`FORM` pour le cycle de soumission et ses timeouts, `BUTTON` pour l'état loading, `INPUT` pour l'attente par champ, `CARD`/`COLLECTION` pour les squelettes). En cas de divergence, le propriétaire a raison.

RÈGLE : **la perception ne remplace pas la vitesse.** Un squelette ne répare pas dix secondes. Si une attente dépasse régulièrement ses bornes, la réponse est l'ingénierie ou la conception du parcours — pas un indicateur de plus. Ce constat se **remonte**, il ne se maquille pas.

## Le contrat — obligations universelles

### 1. L'échelle de l'attente — quel feedback à quel délai

RÈGLE : sous **~100 ms**, aucun indicateur d'attente — le feedback d'activation suffit (press du `BUTTON`, focus du champ). Un spinner pour un aller-retour instantané *fabrique* de la lenteur perçue.

RÈGLE : entre **~100 ms et ~1 s**, l'attente se porte **localement** — l'élément qui a déclenché change d'état (bouton en loading, champ en validation) ; pas d'indicateur global, pas de blocage d'écran. Le flux de pensée n'est pas rompu (NN/g : 1 s est la limite du flux ininterrompu).

RÈGLE : au-delà de **~1 s**, l'attente est **visible et annoncée** — indicateur perceptible ET annonce aux technologies d'assistance (un spinner seul n'annonce rien — la mécanique `aria-live` vit chez `FORM`/`INPUT`). L'interface dit *que* ça travaille, et reste utilisable partout où l'attente ne bloque pas réellement.

RÈGLE : au-delà de **~10 s** — ou dès que la durée est longue et inconnue — l'attente devient un **état à part entière** : progression réelle ou estimation honnête, possibilité de continuer autre chose quand c'est techniquement vrai, et un **timeout toujours défini** (jamais d'attente infinie silencieuse — le cycle de `FORM` fait autorité sur la reprise).

CONFIANCE : établi — les trois seuils fondateurs (0,1 / 1 / 10 s) sont la littérature de référence (NN/g, Response Times), convergente avec Doherty (~400 ms, via le catalogue `laws`). Le placement exact d'un cas limite reste un jugement — au doute, traiter l'attente comme plus longue, jamais comme plus courte.

### 2. Anti-scintillement — un indicateur qui clignote est pire que l'attente

RÈGLE : un indicateur d'attente **n'apparaît pas immédiatement** — il attend un court délai (l'ordre de quelques centaines de ms) pour laisser les réponses rapides passer sans bruit ; et **une fois montré, il reste un minimum perceptible** — un squelette qui flashe 80 ms est un défaut, pas un feedback.

> **Pourquoi** : l'indicateur est un *aveu* d'attente. L'afficher pour une réponse quasi instantanée transforme un système rapide en système qui a l'air lent ; le faire clignoter transforme l'attente en instabilité.

CONFIANCE : convergence — pattern documenté chez plusieurs systèmes de production (délai d'apparition des busy indicators) ; aucune valeur canonique interne tant qu'un consommateur réel n'existe pas — position arbitrée le 2026-07-21 : chiffrer sans besoin réel serait le travers que « un token naît d'un besoin réel » interdit.

### 3. Ordre d'apparition — l'utile d'abord, et rien ne bouge après coup

RÈGLE : ce qui permet de **décider ou d'agir arrive en premier** — le contenu principal avant l'accessoire, la structure avant le détail. Le squelette est une **promesse de structure** (anatomie chez `CARD`, stabilité de grille chez `COLLECTION`) : il promet exactement ce qui va arriver, là où ça va arriver.

RÈGLE : **rien ne se déplace après coup** — un contenu qui arrive tard ne pousse pas ce que l'utilisateur lit et ne vole jamais le geste engagé (le clic parti vers un bouton qui s'est décalé). L'espace du tardif est réservé d'avance ou son arrivée est neutre pour la mise en page. Généralisation d'écran de la règle `COLLECTION` (« la grille ne saute pas ») et cousine du « le contenu ne se déplace jamais sans action » de `SPACING`/`MOTION`.

CONFIANCE : établi par convergence — la stabilité visuelle est documentée jusque dans les métriques du web (layout shift) ; l'obligation d'écran posée ici est la généralisation des règles locales existantes.

### 4. UI optimiste — la confiance se mérite

RÈGLE : une interface peut **afficher le succès avant la confirmation serveur** à trois conditions cumulées : l'action est **réversible ou rejouable sans dommage**, son succès est **très probable**, et l'échec éventuel sera **réparé visiblement** (l'élément revient, l'écart est expliqué, rien ne se perd en silence — la reprise vit chez `FORM`, erreurs serveur).

RÈGLE : l'optimisme est **interdit** sur l'irréversible, le paiement, l'engagement légal et tout ce dont l'échec coûterait plus que l'attente économisée — ces actions attendent leur confirmation réelle (cohérent avec `cognitive-load` : la confirmation est réservée à ce qui la mérite, et « Annuler » est une promesse tenue).

RÈGLE : un succès optimiste **reste un état en cours** pour le système — jamais re-présenté comme définitif à un endroit où l'utilisateur prendrait sur lui une décision irréversible fondée sur un état non confirmé.

CONFIANCE : convergence — l'UI optimiste est un pattern documenté (littérature d'interface, production : messageries, likes, listes) ; ses conditions exactes sont une position du système, alignée sur la réversibilité de `cognitive-load`.

### 5. Honnêteté de l'attente — le temps ne se met pas en scène

RÈGLE : **jamais de fausse progression** — pas de barre qui avance sans lien avec le travail réel, pas d'étapes gonflées pour faire vivre une jauge (la frontière Goal-Gradient du catalogue `laws` devient ici un interdit opérationnel). Barre **déterminée** si l'avancement est mesurable, **indéterminée** sinon — et une estimation ne s'affiche que si elle est honnête.

RÈGLE : **jamais d'attente artificielle.** Si le système peut répondre instantanément, il répond instantanément — on ne ralentit pas « pour montrer le travail ». La labor illusion (l'attente mise en scène augmente la confiance perçue) est documentée : ce système choisit de **ne pas l'exploiter** — même famille de refus que les dark patterns de `cognitive-load`.

RÈGLE : une attente qui **s'éternise l'avoue** — au-delà du raisonnable, l'interface le dit (« plus long que prévu ») et donne une issue (réessayer, continuer ailleurs, être prévenu) plutôt que de laisser un indicateur tourner à vide.

CONFIANCE : établi pour la réfutation de la fausse progression (frontière du catalogue) ; l'interdit de l'attente artificielle est une **règle interne renforcée** qui va contre une littérature réelle (Buell & Norton, labor illusion) — position d'honnêteté assumée, marquée comme telle.

## Ce que ce principe ne fait pas

RÈGLE : il ne mesure pas la performance réelle, ne fixe aucun budget technique, n'ajoute aucun token, et ne possède aucune mécanique d'attente — table de renvois ci-dessous. Quand la vitesse réelle est le problème, il l'expose et **remonte**.

## Renvois vers les propriétaires (aucune valeur ici)

| Obligation | Propriétaire normatif |
|---|---|
| État loading du déclencheur, press, anti-double-clic | `RULES-button` |
| Cycle de soumission, timeout, annonce > seuil, reprise après échec | `RULES-form` (+ `RULES-form-server-errors`) |
| Attente par champ (validation asynchrone) | `RULES-input`, `RULES-form-async-validation` |
| Anatomie du squelette, rien n'anime au chargement | `RULES-card` |
| Squelettes stables, croissance, échec de page suivante | `RULES-collection` |
| Durées/courbes des animations, pulse sous reduced-motion, spinner | `RULES-motion` |
| Mots de l'attente (« Envoi en cours… », « plus long que prévu ») | `RULES-voice` |
| Réversibilité, « Annuler » = promesse tenue | `RULES-cognitive-load` |
| Limites de temps contrôlables, conservation des données | `RULES-accessibility` |

## Tensions connues (à rendre visibles, jamais à trancher seul)

| Tension | Les deux forces | Arbitrage |
|---|---|---|
| Feedback ↔ bruit | Ne rien montrer inquiète ; montrer trop tôt fabrique de la lenteur | L'échelle du § 1 + l'anti-scintillement du § 2 |
| Optimisme ↔ honnêteté | Le succès anticipé fluidifie ; l'échec non réparé trahit | Les trois conditions du § 4 — au doute, attendre |
| Occuper ↔ mettre en scène | Le squelette rend l'attente lisible ; l'attente fabriquée ment | Occuper une attente réelle : oui ; en créer une : jamais |
| Perception ↔ vitesse réelle | Le design absorbe l'attente ; il ne la résout pas | Au-delà des bornes récurrentes : remonter, pas maquiller |

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Optimisme sur l'irréversible (paiement, suppression) | Perte réelle présentée comme succès | Élevée |
| Fausse progression, étapes gonflées | Confiance détruite quand le mensonge se voit | Élevée |
| Attente > 1 s sans annonce (spinner muet) | Lecteur d'écran sans feedback, double soumission | Élevée |
| Contenu tardif qui déplace la page | Clic volé, lecture perdue | Moyenne à élevée |
| Indicateur instantané sur réponse rapide | Système rapide perçu comme lent | Moyenne |
| Échec post-optimisme réparé en silence | Donnée perdue sans que personne ne le sache | Élevée |
| Attente artificielle « pour faire sérieux » | Temps volé — et le jour où ça se sait, tout le reste devient suspect | Moyenne à élevée |

## Règle transversale

RÈGLE : **le temps de l'utilisateur est la ressource la plus chère que le produit dépense.** Chaque attente est un emprunt : le contrat de ce principe — feedback au bon seuil, structure stable, optimisme mérité, honnêteté totale — est la façon de le rembourser. Une interface qui respecte le temps n'a presque jamais besoin de le mettre en scène.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Trois seuils de réponse : ~0,1 s (instantané), ~1 s (flux de pensée), ~10 s (limite d'attention) | [NN/g — Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/) | Établi — littérature fondatrice, déjà citée par MOTION |
| ~400 ms : seuil d'engagement (Doherty) | via `LAWS-UX.md` (le catalogue fait autorité sur la loi) | Établi |
| Indicateurs de progression : percent-done si mesurable, sinon indéterminé ; feedback obligatoire au-delà du seuil | [NN/g — Progress Indicators](https://www.nngroup.com/articles/progress-indicators/) | Établi |
| UI optimiste : afficher le succès probable avant confirmation, réparer visiblement l'échec | [Smashing Magazine — Optimistic UI (Mishunov)](https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/) ; production (messageries, réactions) | Convergence — conditions exactes = position interne |
| Labor illusion : l'attente mise en scène peut augmenter la valeur perçue — documentée ET refusée ici | Buell & Norton (2011), *The Labor Illusion* (Management Science) | Établi (l'effet) ; le refus de l'exploiter est une règle interne renforcée |
| Stabilité visuelle (le contenu tardif ne déplace pas la page) | Convergence web (métriques de layout shift) ; règles internes SPACING/MOTION/COLLECTION généralisées | Établi par convergence |
| Délai d'apparition + durée minimale d'un indicateur (anti-scintillement) | Convergence de production (busy indicators différés) | Convergence — non chiffré en interne, cf. arbitrage n°3 |

CONFIANCE : les seuils et la doctrine des indicateurs sont établis ; les conditions de l'UI optimiste et l'interdit de l'attente artificielle sont des **positions du système**, identifiées comme telles (la seconde va sciemment contre la labor illusion). Toute obligation en conflit apparent avec une mécanique propriétaire : le propriétaire tranche — STOP, remonter si l'ambiguïté persiste.

## À approfondir

- **Composant de progression** : la barre déterminée (percent-done) n'a aucun composant dans le système — l'obligation « progression réelle si mesurable » est posée, le composant naîtra de son premier besoin réel ; d'ici là, un build qui en a besoin remonte.
- **Chiffrage de l'anti-scintillement** : délai d'apparition et durée minimale restent en ordre de grandeur — à chiffrer (et éventuellement tokeniser) au premier consommateur outillé, avec benchmark dédié.
- **Seuils en valeurs machine** : si un harness de test ou un lint consomme un jour les bornes 0,1/1/10 s, la question token se rouvre — jusque-là, prose sourcée.
- **UI optimiste — premier terrain** : le `TOAST` porteur d'une annulation est le premier candidat d'incarnation (avec la réversibilité de `cognitive-load`) ; documenter le cas réel quand il arrive.
- **Coût du socle à cinq** : mesuré à chaque build (RAPPORT-ROUTEUR) — la clause de réouverture socle/bundle vaut pour les trois principes chargés d'office.
