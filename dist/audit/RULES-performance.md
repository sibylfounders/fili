---
sujet: performance
nature: principles
resume: "Ce fichier pose le **contrat des attentes** : ce que l'interface montre, dit et promet pendant que le système travaille."
selon-contexte: [laws]
source: PERFORMANCE-UX.md v1.0.0
empreinte: sha256:269d62f4819b3356
regles: {loi: 0, preference: 0, non_qualifie: 20}
---
# RULES — performance (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** la performance perçue est un **principe transversal** — ni variantes, ni assemblage, ni token ; le modèle à axes ne s'applique pas. Comme `accessibility` et `cognitive-load` : `companion: none` **sans** `audience: humans` — compilé vers `dist/RULES-performance.md` et **chargé d'office par le routeur pour toute intention** (5e RULES du socle universel, arbitré le 2026-07-21 — toute intention charge et attend ; le coût du socle est mesuré à chaque build et sa clause de réouverture est déjà journalisée chez cognitive-load).
- **[non qualifié]** **frontière avec `motion`** — `MOTION` possède les durées et courbes des **animations** (ce qui bouge) ; ce principe possède le contrat des **attentes** (ce qu'on montre pendant que le système travaille). Les deux se rejoignent sur une conviction : tout le registre productif vit sous ~400 ms — mais une transition de 200 ms et une réponse serveur de 4 s sont deux problèmes différents, avec deux propriétaires.
- **[non qualifié]** **aucun token nouveau.** Les seuils de ce fichier (~0,1 s / ~1 s / ~10 s) sont des **bornes de raisonnement sourcées**, pas des valeurs de design à thématiser — on ne re-thème pas la psychophysique. Ils restent en prose, comme la fourchette 45-75 caractères avant que `measure` n'ait un consommateur — position arbitrée le 2026-07-21, à revoir uniquement si un consommateur outillé (harness, lint) réclame des valeurs machine (cf. À approfondir).
- **[non qualifié]** ce principe **ne fait pas autorité sur un comportement précis** — il pose l'obligation, le propriétaire pose la mécanique (`FORM` pour le cycle de soumission et ses timeouts, `BUTTON` pour l'état loading, `INPUT` pour l'attente par champ, `CARD`/`COLLECTION` pour les squelettes). En cas de divergence, le propriétaire a raison.
- **[non qualifié]** **la perception ne remplace pas la vitesse.** Un squelette ne répare pas dix secondes. Si une attente dépasse régulièrement ses bornes, la réponse est l'ingénierie ou la conception du parcours — pas un indicateur de plus. Ce constat se **remonte**, il ne se maquille pas.
- **[non qualifié]** sous **~100 ms**, aucun indicateur d'attente — le feedback d'activation suffit (press du `BUTTON`, focus du champ). Un spinner pour un aller-retour instantané *fabrique* de la lenteur perçue.
- **[non qualifié]** entre **~100 ms et ~1 s**, l'attente se porte **localement** — l'élément qui a déclenché change d'état (bouton en loading, champ en validation) ; pas d'indicateur global, pas de blocage d'écran. Le flux de pensée n'est pas rompu (NN/g : 1 s est la limite du flux ininterrompu).
- **[non qualifié]** au-delà de **~1 s**, l'attente est **visible et annoncée** — indicateur perceptible ET annonce aux technologies d'assistance (un spinner seul n'annonce rien — la mécanique `aria-live` vit chez `FORM`/`INPUT`). L'interface dit *que* ça travaille, et reste utilisable partout où l'attente ne bloque pas réellement.
- **[non qualifié]** au-delà de **~10 s** — ou dès que la durée est longue et inconnue — l'attente devient un **état à part entière** : progression réelle ou estimation honnête, possibilité de continuer autre chose quand c'est techniquement vrai, et un **timeout toujours défini** (jamais d'attente infinie silencieuse — le cycle de `FORM` fait autorité sur la reprise).
- **[non qualifié]** un indicateur d'attente **n'apparaît pas immédiatement** — il attend un court délai (l'ordre de quelques centaines de ms) pour laisser les réponses rapides passer sans bruit ; et **une fois montré, il reste un minimum perceptible** — un squelette qui flashe 80 ms est un défaut, pas un feedback.
- **[non qualifié]** ce qui permet de **décider ou d'agir arrive en premier** — le contenu principal avant l'accessoire, la structure avant le détail. Le squelette est une **promesse de structure** (anatomie chez `CARD`, stabilité de grille chez `COLLECTION`) : il promet exactement ce qui va arriver, là où ça va arriver.
- **[non qualifié]** **rien ne se déplace après coup** — un contenu qui arrive tard ne pousse pas ce que l'utilisateur lit et ne vole jamais le geste engagé (le clic parti vers un bouton qui s'est décalé). L'espace du tardif est réservé d'avance ou son arrivée est neutre pour la mise en page. Généralisation d'écran de la règle `COLLECTION` (« la grille ne saute pas ») et cousine du « le contenu ne se déplace jamais sans action » de `SPACING`/`MOTION`.
- **[non qualifié]** une interface peut **afficher le succès avant la confirmation serveur** à trois conditions cumulées : l'action est **réversible ou rejouable sans dommage**, son succès est **très probable**, et l'échec éventuel sera **réparé visiblement** (l'élément revient, l'écart est expliqué, rien ne se perd en silence — la reprise vit chez `FORM`, erreurs serveur).
- **[non qualifié]** l'optimisme est **interdit** sur l'irréversible, le paiement, l'engagement légal et tout ce dont l'échec coûterait plus que l'attente économisée — ces actions attendent leur confirmation réelle (cohérent avec `cognitive-load` : la confirmation est réservée à ce qui la mérite, et « Annuler » est une promesse tenue).
- **[non qualifié]** un succès optimiste **reste un état en cours** pour le système — jamais re-présenté comme définitif à un endroit où l'utilisateur prendrait sur lui une décision irréversible fondée sur un état non confirmé.
- **[non qualifié]** **jamais de fausse progression** — pas de barre qui avance sans lien avec le travail réel, pas d'étapes gonflées pour faire vivre une jauge (la frontière Goal-Gradient du catalogue `laws` devient ici un interdit opérationnel). Barre **déterminée** si l'avancement est mesurable, **indéterminée** sinon — et une estimation ne s'affiche que si elle est honnête.
- **[non qualifié]** **jamais d'attente artificielle.** Si le système peut répondre instantanément, il répond instantanément — on ne ralentit pas « pour montrer le travail ». La labor illusion (l'attente mise en scène augmente la confiance perçue) est documentée : ce système choisit de **ne pas l'exploiter** — même famille de refus que les dark patterns de `cognitive-load`.
- **[non qualifié]** une attente qui **s'éternise l'avoue** — au-delà du raisonnable, l'interface le dit (« plus long que prévu ») et donne une issue (réessayer, continuer ailleurs, être prévenu) plutôt que de laisser un indicateur tourner à vide.
- **[non qualifié]** il ne mesure pas la performance réelle, ne fixe aucun budget technique, n'ajoute aucun token, et ne possède aucune mécanique d'attente — table de renvois ci-dessous. Quand la vitesse réelle est le problème, il l'expose et **remonte**.
- **[non qualifié]** **le temps de l'utilisateur est la ressource la plus chère que le produit dépense.** Chaque attente est un emprunt : le contrat de ce principe — feedback au bon seuil, structure stable, optimisme mérité, honnêteté totale — est la façon de le rembourser. Une interface qui respecte le temps n'a presque jamais besoin de le mettre en scène.
