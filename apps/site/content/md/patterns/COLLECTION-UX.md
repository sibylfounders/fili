---
component: collection
layer: ux
type: pattern # composition de plusieurs composants sur un écran, comme form
version: 1.0.0 # 1.0.0 : première rédaction — le pattern lève la clause de naissance de la grille de colonnes (GRID-UX 1.1.0 : « la grille de colonnes naîtra avec le pattern collection/grille » — c'est fait). Inventaire et benchmark faits AVANT livraison. Arbitrages du 2026-07-21 (cf. DECISIONS.md) : grille intrinsèque via grid.item-min (256px), composé par le contenu (pas de 12 canonique), charger-plus > pagination > scroll-infini-jamais-seul, transfert du gap depuis CARD-UI.
last_updated: 2026-07-21
companion: COLLECTION-UI.md
confidence: mixed # la grille intrinsèque (colonnes émergentes de la largeur d'item) est établie techniquement et convergente avec le principe adaptatif ; le refus d'un 12-colonnes canonique est une décision interne assumée ; la position charger-plus/pagination/scroll infini s'appuie sur NN/g mais reste un arbitrage produit
---

# Collection — Couche UX (pattern de composition)

> Ce pattern orchestre **une grille d'items et ses outils** : la zone de collection, la mécanique des colonnes, la croissance (charger plus, pagination), le tri et les filtres, les états de chargement et de changement. Il fait naître la **grille de colonnes** que `GRID-UX.md` et `SPACING-UX.md` avaient différée jusqu'à son premier consommateur — c'est lui. Il ne réécrit rien de ce que `CARD` possède (modes, densité, ratio, troncature, empty states, squelettes) : la carte reste l'atome, la collection est la phrase. Source du besoin : `atelier/inventaires/inventaire-cas-usage-collection.md` + l'intention « Collection » du routeur, jusqu'ici sans pattern propriétaire.

## Note de transposition

RÈGLE : `collection` est un **pattern** — une composition, pas un atome. Le modèle à axes ne s'y applique pas (comme `form`) : ses variables sont le **régime de grille** (items homogènes / composé) et la **densité**, qui appartient déjà à `CARD`. Aucun axe style/tone.

RÈGLE : ce pattern **lève la clause de naissance** de la grille de colonnes. `GRID-UX.md` (§ Frontières) et `SPACING-UX.md` (§ note de transposition) l'avaient différée « jusqu'au pattern collection/grille » : la grille naît ici, et elle hérite des cadrages posés — les gouttières sont des tokens `spacing`, le cadre de page reste `grid.container-*`, une seule valeur nouvelle au besoin démontré (`grid.item-min`). La levée est actée dans `GRID-UX.md` 1.1.0 et journalisée (DECISIONS.md 2026-07-21).

RÈGLE : **transfert d'autorité** — le nombre de colonnes et la gouttière d'une collection appartiennent au pattern, pas à la carte. `CARD-UI.md` portait un `grid_gap` d'attente ; il renvoie désormais ici (même mécanisme que le transfert de la stratégie de validation d'INPUT vers FORM — journalisé, DECISIONS.md 2026-07-21).

## Frontières d'autorité (la table de référence)

| Question | Autorité |
|---|---|
| Contenu, modes, densité, ratio, troncature, empty states, squelette d'une carte | `CARD` |
| Nombre de colonnes, gouttières, régime de grille, croissance, outils de collection | `COLLECTION` (ce fichier) |
| Largeur du cadre de page, centrage, full-bleed | `GRID` |
| Valeurs d'espacement (gouttières incluses), proximité, régimes mobile/desktop | `SPACING` |
| Bascules dérivées du contenu, ordre DOM au reflux, divulgation par l'espace | `ADAPTIVE` |
| Hiérarchie des actions, zone tactile | `BUTTON` |
| Défauts annoncés, budget de décision de l'écran, coût jamais caché | `COGNITIVE-LOAD` |
| Formulation des compteurs, libellés de tri, états vides | `VOICE` |

## But

Une collection promet une chose : la **prédictibilité**. Les mêmes items, au même rythme, dans un ordre lisible — pour que l'utilisateur balaye au lieu de déchiffrer. Toute la mécanique ci-dessous (colonnes émergentes, gouttières constantes, croissance contrôlée, tri déclaré) sert cette promesse ; chaque écart la rompt.

## Les deux régimes

RÈGLE : régime **items homogènes** — le cas de référence : résultats, catalogue, galerie. Tous les items ont le même poids, la même largeur ; la grille est **intrinsèque** (colonnes émergentes, voir ci-dessous).

RÈGLE : régime **composé** — le dashboard : des widgets de tailles différentes dont la hiérarchie vient de la **taille dans la grille** (règle `CARD`), sur une grille **explicite** à colonnes égales, spans en cellules entières, mêmes gouttières. Le nombre de colonnes du composé se choisit par le contenu du dashboard, pas par un 12 canonique copié — divergence assumée vs Carbon/Material, journalisée, à éprouver au premier dashboard réel.

RÈGLE : une collection ne mélange pas les régimes — un dashboard peut *contenir* une grille d'items homogènes (widget-liste), l'inverse n'existe pas.

## La grille intrinsèque (régime de référence)

RÈGLE : le nombre de colonnes **émerge** de deux facteurs : la largeur minimale d'un item (`grid.item-min`) et l'espace réellement disponible. Il n'est **jamais** fixé par appareil ni par breakpoint intermédiaire — c'est la déclinaison grille du principe adaptatif (les seuils viennent du contenu).

> **Pourquoi** : une grille « 4 colonnes desktop / 2 tablette / 1 mobile » fige des classes d'appareils que le produit ne mesure pas et casse dans une sidebar ou un split-screen (le viewport large ne garantit pas un conteneur large — `ADAPTIVE`). Une grille pilotée par la largeur d'item est juste partout, sans palier à maintenir. Technique CSS d'une ligne, établie (cf. `COLLECTION-UI.md`).

RÈGLE : sous `breakpoint.mobile`, la grille passe en **colonne unique** pleine largeur — c'est la règle que `DESIGN.md` notait déjà sur le token (« grille de cartes → 1 colonne ») ; elle trouve ici son propriétaire.

RÈGLE : la **dernière rangée incomplète** reste alignée au flux de lecture — les items gardent leur largeur, rien ne s'étire pour « remplir » (la déformation casse l'uniformité que la collection promet).

RÈGLE : le **reflux ne réordonne jamais** — 3→2→1 colonnes préserve l'ordre de lecture et l'ordre DOM (`ADAPTIVE` fait autorité) ; la grille ne « remonte » pas un item mis en avant, la mise en avant est un choix d'ordre, pas de layout.

RÈGLE : une collection d'**un ou deux items** garde sa grille et ses largeurs — pas de mise en scène spéciale du petit nombre ; la stabilité prime quand la collection grandira.

## Gouttières et zone de collection

RÈGLE : la gouttière (inter-colonnes et inter-rangées, une seule valeur) est un token `spacing`, appareillé à la densité de la collection : `comfortable` et `compact` ont chacun leur gouttière (mapping dans `COLLECTION-UI.md`). Jamais de token « grid.gutter » propre — cadrage `SPACING` respecté.

RÈGLE : la **zone de collection** peut se distinguer de la page par le fond `surface` (le token a été calibré pour exactement cette distinction) — elle regroupe la grille ET ses outils (barre de tri/filtres, compteur) en une région perçue comme une (Gestalt, région commune — via le catalogue des lois).

## Outils de la collection

RÈGLE : les outils (tri, filtres, recherche, compteur) vivent **au-dessus de la grille**, position constante ; ils portent sur toute la collection — un contrôle qui ne porte que sur un item vit dans sa carte (`CARD`, zone d'actions).

RÈGLE : le **tri par défaut est annoncé** — la collection arrive triée par un défaut sensé ET visible (« Récents d'abord »), jamais silencieux. C'est le cas « En attente » de l'inventaire charge-cognitive qui trouve ici son propriétaire (`COGNITIVE-LOAD` pose l'obligation de défaut, ce pattern la mécanise).

RÈGLE : un **filtre actif d'office se déclare** — il ne cache jamais silencieusement une partie des résultats (déclinaison directe de la frontière dure « jamais un coût caché » : un sous-ensemble non déclaré est une information cachée).

RÈGLE : les **filtres actifs restent visibles** et se retirent d'un geste ; le **compteur de résultats** se met à jour avec eux (formulation : `VOICE`).

RÈGLE (périmètre) : la **mécanique des contrôles** de la barre d'outils attend ses composants — select, chips de filtre n'existent pas dans le système. Un build qui en a besoin **s'arrête et remonte** ; ce pattern pose les obligations, pas les contrôles.

## Croissance — charger plus, pagination, scroll infini

RÈGLE : une collection longue grandit par **« Charger plus »** par défaut : l'utilisateur garde le contrôle, le pied de page reste atteignable, la position reste stable.

RÈGLE : la **pagination** remplace « Charger plus » quand la *position* a de la valeur — résultats à citer, retrouver, comparer (« page 3 ») ; elle est le seul mode qui rend un emplacement adressable.

RÈGLE : le **scroll infini n'est jamais seul** — s'il existe, il est doublé d'un chemin fini (charger-plus ou pagination) et n'emporte jamais un écran qui a un footer à atteindre. Position NN/g adoptée : le scroll infini convient au flux de découverte, pas à la recherche orientée but.

RÈGLE : **revenir à la collection restaure l'état** — position, tri, filtres. Une collection qui oublie où l'utilisateur en était lui fait payer deux fois le même parcours (reconnaissance plutôt que rappel, `COGNITIVE-LOAD`).

RÈGLE : si la **page suivante échoue**, l'acquis reste affiché — l'erreur est locale, réessayable, elle ne détruit jamais ce qui est déjà là (même logique que le succès partiel de `FORM`).

## Chargement et changement

RÈGLE : au chargement initial, des **squelettes** (`CARD` fait autorité sur leur anatomie) occupent un **nombre de cellules stable** — la grille ne saute pas quand le contenu arrive ; rien n'anime (`CARD`/`MOTION`).

RÈGLE : trier ou filtrer **réorganise sans spectacle** — registre productif de `MOTION` (crans `base`, jamais de chorégraphie) ; sous `prefers-reduced-motion`, le résultat remplace l'ancien sans transition.

RÈGLE : un changement de résultats **s'annonce** aux technologies d'assistance (le compteur mis à jour dans une région live polie) — obligation posée ici, mécanique à éprouver à la première implémentation réelle (`ACCESSIBILITY` : annonce des changements dynamiques).

RÈGLE : les états **vide, sans résultat, erreur** appartiennent à `CARD` (empty states structurés) et `VOICE` (ton productif, jamais blâmer) — le pattern ne fait que garantir leur place : dans la zone de collection, à la place de la grille, jamais en toast éphémère.

## Orchestration des quatre Languages (au niveau pattern)

RÈGLE : **Interaction** — une collection est une surface de consultation calme ; un seul mode d'interaction par collection (`CARD`), et la barre d'outils n'introduit pas de deuxième « primary » d'écran (budget de décision, `COGNITIVE-LOAD`).

RÈGLE : **Motion** — rien au chargement, sobriété au changement (ci-dessus) ; le mouvement confirme un tri demandé, il ne décore jamais une grille.

RÈGLE : **Voice** — compteurs, libellés de tri et états vides suivent la mécanique commune (nombres, casse) ; « sans résultat » décrit et propose, ne blâme pas.

RÈGLE : **E-motion** — sans objet, comme pour la carte : tout ce qui se répète par item est disqualifié par le budget de rareté ; l'expression appartient au contenu injecté, jamais au conteneur.

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Colonnes fixées par appareil (4/2/1) | Grille cassée en sidebar/split, paliers à maintenir sans besoin | Moyenne à élevée |
| Filtre par défaut silencieux | Résultats invisibles sans le savoir — information cachée, confiance rompue | Élevée |
| Scroll infini seul | Footer inatteignable, position perdue, contrôle retiré | Élevée |
| Étirement de la dernière rangée (auto-fit) | Items déformés, uniformité rompue | Faible à moyenne |
| Grille qui saute au chargement (squelettes instables) | Repères perdus, clics ratés (layout shift) | Moyenne |
| Barre d'outils improvisée sans composants | Contrôles incohérents, dette d'accessibilité | Moyenne à élevée |
| État de collection oublié au retour | Parcours payé deux fois, abandon | Moyenne |

## Règle transversale

RÈGLE : **la grille est un contrat, pas une décoration.** Ce que la collection promet — même largeur, même rythme, même ordre, mêmes règles pour chaque item — est exactement ce que l'utilisateur utilise pour balayer vite. Chaque exception locale (une carte plus large « pour mettre en avant », un ratio différent « juste ici ») dépense la prédictibilité de toute la collection. La mise en avant se fait par l'ordre, la taille *dans* la grille (régime composé) ou le contenu — jamais en cassant le contrat.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Grille intrinsèque : colonnes émergentes via une largeur minimale d'item (une ligne de CSS, sans media query) | [web.dev — One-line layouts (RAM : repeat, auto, minmax)](https://web.dev/articles/one-line-layouts) ; [MDN — repeat() / minmax()](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat) | Établi — technique standard documentée |
| Les seuils viennent du contenu, pas de l'appareil ; le conteneur ne garantit rien du viewport | `ADAPTIVE-UX.md` (principe interne, socle) | Établi en interne — cohérence de système |
| Scroll infini : contrôle réduit, footer inatteignable, mauvais pour la recherche orientée but ; alternatives charger-plus/pagination | [NN/g — Infinite Scrolling: When to Use It, When to Avoid It](https://www.nngroup.com/articles/infinite-scrolling-tips/) | Établi (recommandation argumentée) ; la répartition exacte par contexte reste un arbitrage produit |
| Grilles fixes des systèmes majeurs (Carbon 16 col / Material window classes) — écartées ici | [Carbon — 2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/), [Material — Responsive layout grid](https://m2.material.io/design/layout/responsive-layout-grid.html) | Établi chez eux — divergence interne assumée : pas de consommateur multi-produits qui justifie un N canonique |
| Gouttières = tokens spacing, grille héritière de l'échelle | `SPACING-UX.md` (cadrage journalisé 2026-07-16) | Décision interne établie |
| Uniformité (ratio, densité, mode, titre) comme promesse de la collection | `CARD-UX.md` | Établi en interne — le pattern orchestre, ne réécrit pas |

CONFIANCE : la mécanique de grille intrinsèque est établie (technique standard + cohérence avec le principe adaptatif) ; le refus d'un nombre de colonnes canonique et la hiérarchie charger-plus > pagination > scroll-infini-doublé sont des **positions du système** (convergence NN/g pour la seconde), à éprouver au premier consommateur réel. Décision non tranchée par une règle (colonnes du régime composé, contrôle de barre d'outils manquant, virtualisation, kanban) : STOP — remonter.

## À approfondir

- **`grid.item-min` (256px)** : valeur arbitrée (64 × la grille de base, fourchette 240-320 observée) — à éprouver au premier consommateur réel, ajustable sur besoin.
- **Colonnes du régime composé** : « par le contenu » est la position ; le premier dashboard réel dira si un nombre canonique outillerait mieux les spans.
- **Barre d'outils** : les composants manquants (select, chips de filtre) naîtront de leur propre pipeline ; jusque-là, tout build qui en a besoin remonte.
- **Région live du compteur** : obligation posée, mécanique à éprouver à la première implémentation (avec les tests manuels du principe d'accessibilité).
- **Extension `collection-kanban`** : promise par CARD-UX (§ Kanban) — réordonnancement fin, affordance de saisie, live region de drag ; à faire naître sur besoin réel, comme les extensions form-*.
- **Virtualisation** : position à prendre avant tout consommateur de liste très longue — casse facilement balisage liste et recherche navigateur.
- **Retour à la collection** : l'obligation de restauration (position, tri, filtres) est posée ; la mécanique appartient au produit consommateur, à documenter au premier cas réel.
