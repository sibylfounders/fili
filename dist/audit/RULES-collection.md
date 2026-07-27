---
sujet: collection
nature: patterns
resume: "Ce pattern orchestre **une grille d'items et ses outils** : la zone de collection, la mécanique des colonnes, la croissance (charger plus, pagination), le tri et les filtres, les états de…"
selon-contexte: [adaptive, card, grid, spacing]
source: COLLECTION-UX.md v1.0.0 + COLLECTION-UI.md v1.0.0
empreinte: sha256:4c1b1d995f774181
regles: {loi: 0, preference: 0, non_qualifie: 42}
---
# RULES — collection (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** `collection` est un **pattern** — une composition, pas un atome. Le modèle à axes ne s'y applique pas (comme `form`) : ses variables sont le **régime de grille** (items homogènes / composé) et la **densité**, qui appartient déjà à `CARD`. Aucun axe style/tone.
- **[non qualifié]** ce pattern **lève la clause de naissance** de la grille de colonnes. `GRID-UX.md` (§ Frontières) et `SPACING-UX.md` (§ note de transposition) l'avaient différée « jusqu'au pattern collection/grille » : la grille naît ici, et elle hérite des cadrages posés — les gouttières sont des tokens `spacing`, le cadre de page reste `grid.container-*`, une seule valeur nouvelle au besoin démontré (`grid.item-min`). La levée est actée dans `GRID-UX.md` 1.1.0 et journalisée (DECISIONS.md 2026-07-21).
- **[non qualifié]** **transfert d'autorité** — le nombre de colonnes et la gouttière d'une collection appartiennent au pattern, pas à la carte. `CARD-UI.md` portait un `grid_gap` d'attente ; il renvoie désormais ici (même mécanisme que le transfert de la stratégie de validation d'INPUT vers FORM — journalisé, DECISIONS.md 2026-07-21).
- **[non qualifié]** régime **items homogènes** — le cas de référence : résultats, catalogue, galerie. Tous les items ont le même poids, la même largeur ; la grille est **intrinsèque** (colonnes émergentes, voir ci-dessous).
- **[non qualifié]** régime **composé** — le dashboard : des widgets de tailles différentes dont la hiérarchie vient de la **taille dans la grille** (règle `CARD`), sur une grille **explicite** à colonnes égales, spans en cellules entières, mêmes gouttières. Le nombre de colonnes du composé se choisit par le contenu du dashboard, pas par un 12 canonique copié — divergence assumée vs Carbon/Material, journalisée, à éprouver au premier dashboard réel.
- **[non qualifié]** une collection ne mélange pas les régimes — un dashboard peut *contenir* une grille d'items homogènes (widget-liste), l'inverse n'existe pas.
- **[non qualifié]** le nombre de colonnes **émerge** de deux facteurs : la largeur minimale d'un item (`grid.item-min`) et l'espace réellement disponible. Il n'est **jamais** fixé par appareil ni par breakpoint intermédiaire — c'est la déclinaison grille du principe adaptatif (les seuils viennent du contenu).
- **[non qualifié]** sous `breakpoint.mobile`, la grille passe en **colonne unique** pleine largeur — c'est la règle que `DESIGN.md` notait déjà sur le token (« grille de cartes → 1 colonne ») ; elle trouve ici son propriétaire.
- **[non qualifié]** la **dernière rangée incomplète** reste alignée au flux de lecture — les items gardent leur largeur, rien ne s'étire pour « remplir » (la déformation casse l'uniformité que la collection promet).
- **[non qualifié]** le **reflux ne réordonne jamais** — 3→2→1 colonnes préserve l'ordre de lecture et l'ordre DOM (`ADAPTIVE` fait autorité) ; la grille ne « remonte » pas un item mis en avant, la mise en avant est un choix d'ordre, pas de layout.
- **[non qualifié]** une collection d'**un ou deux items** garde sa grille et ses largeurs — pas de mise en scène spéciale du petit nombre ; la stabilité prime quand la collection grandira.
- **[non qualifié]** la gouttière (inter-colonnes et inter-rangées, une seule valeur) est un token `spacing`, appareillé à la densité de la collection : `comfortable` et `compact` ont chacun leur gouttière (mapping dans `COLLECTION-UI.md`). Jamais de token « grid.gutter » propre — cadrage `SPACING` respecté.
- **[non qualifié]** la **zone de collection** peut se distinguer de la page par le fond `surface` (le token a été calibré pour exactement cette distinction) — elle regroupe la grille ET ses outils (barre de tri/filtres, compteur) en une région perçue comme une (Gestalt, région commune — via le catalogue des lois).
- **[non qualifié]** les outils (tri, filtres, recherche, compteur) vivent **au-dessus de la grille**, position constante ; ils portent sur toute la collection — un contrôle qui ne porte que sur un item vit dans sa carte (`CARD`, zone d'actions).
- **[non qualifié]** le **tri par défaut est annoncé** — la collection arrive triée par un défaut sensé ET visible (« Récents d'abord »), jamais silencieux. C'est le cas « En attente » de l'inventaire charge-cognitive qui trouve ici son propriétaire (`COGNITIVE-LOAD` pose l'obligation de défaut, ce pattern la mécanise).
- **[non qualifié]** un **filtre actif d'office se déclare** — il ne cache jamais silencieusement une partie des résultats (déclinaison directe de la frontière dure « jamais un coût caché » : un sous-ensemble non déclaré est une information cachée).
- **[non qualifié]** les **filtres actifs restent visibles** et se retirent d'un geste ; le **compteur de résultats** se met à jour avec eux (formulation : `VOICE`).
- **[non qualifié]** une collection longue grandit par **« Charger plus »** par défaut : l'utilisateur garde le contrôle, le pied de page reste atteignable, la position reste stable.
- **[non qualifié]** la **pagination** remplace « Charger plus » quand la *position* a de la valeur — résultats à citer, retrouver, comparer (« page 3 ») ; elle est le seul mode qui rend un emplacement adressable.
- **[non qualifié]** le **scroll infini n'est jamais seul** — s'il existe, il est doublé d'un chemin fini (charger-plus ou pagination) et n'emporte jamais un écran qui a un footer à atteindre. Position NN/g adoptée : le scroll infini convient au flux de découverte, pas à la recherche orientée but.
- **[non qualifié]** **revenir à la collection restaure l'état** — position, tri, filtres. Une collection qui oublie où l'utilisateur en était lui fait payer deux fois le même parcours (reconnaissance plutôt que rappel, `COGNITIVE-LOAD`).
- **[non qualifié]** si la **page suivante échoue**, l'acquis reste affiché — l'erreur est locale, réessayable, elle ne détruit jamais ce qui est déjà là (même logique que le succès partiel de `FORM`).
- **[non qualifié]** au chargement initial, des **squelettes** (`CARD` fait autorité sur leur anatomie) occupent un **nombre de cellules stable** — la grille ne saute pas quand le contenu arrive ; rien n'anime (`CARD`/`MOTION`).
- **[non qualifié]** trier ou filtrer **réorganise sans spectacle** — registre productif de `MOTION` (crans `base`, jamais de chorégraphie) ; sous `prefers-reduced-motion`, le résultat remplace l'ancien sans transition.
- **[non qualifié]** un changement de résultats **s'annonce** aux technologies d'assistance (le compteur mis à jour dans une région live polie) — obligation posée ici, mécanique à éprouver à la première implémentation réelle (`ACCESSIBILITY` : annonce des changements dynamiques).
- **[non qualifié]** les états **vide, sans résultat, erreur** appartiennent à `CARD` (empty states structurés) et `VOICE` (ton productif, jamais blâmer) — le pattern ne fait que garantir leur place : dans la zone de collection, à la place de la grille, jamais en toast éphémère.
- **[non qualifié]** **Interaction** — une collection est une surface de consultation calme ; un seul mode d'interaction par collection (`CARD`), et la barre d'outils n'introduit pas de deuxième « primary » d'écran (budget de décision, `COGNITIVE-LOAD`).
- **[non qualifié]** **Motion** — rien au chargement, sobriété au changement (ci-dessus) ; le mouvement confirme un tri demandé, il ne décore jamais une grille.
- **[non qualifié]** **Voice** — compteurs, libellés de tri et états vides suivent la mécanique commune (nombres, casse) ; « sans résultat » décrit et propose, ne blâme pas.
- **[non qualifié]** **E-motion** — sans objet, comme pour la carte : tout ce qui se répète par item est disqualifié par le budget de rareté ; l'expression appartient au contenu injecté, jamais au conteneur.
- **[non qualifié]** **la grille est un contrat, pas une décoration.** Ce que la collection promet — même largeur, même rythme, même ordre, mêmes règles pour chaque item — est exactement ce que l'utilisateur utilise pour balayer vite. Chaque exception locale (une carte plus large « pour mettre en avant », un ratio différent « juste ici ») dépense la prédictibilité de toute la collection. La mise en avant se fait par l'ordre, la taille *dans* la grille (régime composé) ou le contenu — jamais en cassant le contrat.

## Non couvert — poser la question, ne rien trancher

- Table de données : Le besoin est un tableau à colonnes triables.
