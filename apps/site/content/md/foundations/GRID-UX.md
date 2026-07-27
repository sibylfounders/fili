---
component: grid
layer: ux
type: foundation
version: 1.2.0 # 1.2.0 : extension au SHELL applicatif — trois régions (rail de nav + contenu + rail d'outils), ordre de dégradation (le rail d'outils secondaire cède avant la nav), off-canvas sous breakpoint.tablet, repli des outils sous breakpoint.desktop. Le comportement overlay d'une région hors flux (scrim, focus trap, scroll-lock) reste hors périmètre (sujet overlay/drawer). Tokens : DESIGN.md 1.29.0. Cf. DECISIONS.md 2026-07-24. 1.1.0 : la clause de naissance est levée — la grille de colonnes appartient au pattern collection (COLLECTION-UX/UI, 2026-07-21, cf. DECISIONS.md) ; ce fichier garde le cadre de page ; grid.item-min vit dans DESIGN.md pour le pattern. 1.0.1 : vocabulaire aligné sur le modèle style × tone du bouton (DECISIONS 2026-07-18), aucune règle modifiée. 1.0.0 : première rédaction — fondation née du besoin prouvé « largeur de conteneur » (pilotes externes 2026-07-16, deux occurrences indépendantes). Inventaire et benchmark faits AVANT livraison (leçon typographie). La grille de colonnes reste différée (cf. note de transposition). Cf. DECISIONS.md 2026-07-16.
last_updated: 2026-07-21
companion: GRID-UI.md
confidence: mixed # les largeurs de conteneur et la mesure de lecture sont établies (convergence Carbon/GOV.UK/Material) ; le nombre exact de crans de conteneur est un arbitrage interne, marqué comme tel
---

# Grille & layout — Couche UX (fondation)

> Ce fichier porte le raisonnement du **cadre de page** : quelle largeur maximale un conteneur doit
> prendre, quand le borner, quand le laisser déborder. Pour les valeurs exactes (largeurs, marges,
> mapping des contextes), voir `GRID-UI.md`.

## Note de transposition — ce que cette fondation est, et n'est pas

Comme toute fondation, `grid` **n'a pas d'axes** (style/tone/size) : ce sont des propriétés de
composant, pas de contrainte transversale. Deux frontières la définissent en négatif :

- **≠ mesure de lecture.** La largeur maximale d'un *texte courant* (≈ 45-75 caractères par ligne) est
  déjà `measure.reading-max`, propriété de la typographie — pas de la grille. Un conteneur de formulaire
  n'est pas un bloc de prose : il se borne pour le focus et l'ergonomie de saisie, pas pour la lisibilité
  d'un paragraphe.
- **≠ espacement.** La *proximité* (gouttières, marges, densité) dérive de l'échelle `spacing` et lui
  appartient. La grille ne redéfinit aucune valeur d'espace : elle les **compose** en un cadre de page.

Et surtout, cette fondation **ne documente pas la grille de colonnes** (colonnes, gouttières
d'une collection) — non plus par report, mais par **propriété** : la clause de naissance écrite ici
(« la grille de colonnes naîtra avec le pattern collection/grille ») a été levée le 2026-07-21 —
le pattern `collection` (COLLECTION-UX/UI) possède désormais colonnes, gouttières et régimes de
grille. Cette fondation garde le cadre de page ; le refus d'anticiper sans consommateur reste la leçon.

## But

Un conteneur de page a une largeur maximale au-delà de laquelle il cesse d'être utile : un formulaire
étalé sur 1600 px disperse le regard, un tableau bridé à 480 px étouffe. Cette fondation nomme les
quelques largeurs de conteneur du système et dit laquelle répond à quel contexte — pour qu'aucun agent
n'ait à inventer une largeur, ni à détourner un breakpoint faute de token (le trou exact qu'ont révélé
les pilotes).

## Largeurs de conteneur

RÈGLE : tout conteneur de page borné référence une largeur de `grid.container-*`, jamais une valeur brute
ni un breakpoint détourné — `breakpoint.*` est un point de bascule responsive, pas une largeur maximale.

RÈGLE : **narrow** — saisie mono-colonne focalisée : formulaire, écran d'authentification, création de
compte. Le conteneur se centre et reste étroit pour tenir le regard sur une seule colonne d'actions.

RÈGLE : **default** — page de contenu ou d'application à colonne unique : réglages, article, tableau de
bord simple. Largeur intermédiaire, confort de scan.

RÈGLE : **wide** — surface dense assumée : dashboard, collection, tableau large. Largeur maximale haute ;
au-delà, le contenu se disperse plutôt qu'il ne respire.

> **Pourquoi trois crans et pas un continuum** : les systèmes majeurs convergent vers quelques largeurs
> nommées (Carbon borne à 1584 px en 16 colonnes, GOV.UK à ~1020 px, Material cadre par window size
> classes) plutôt qu'une largeur libre — un petit jeu fermé se retient, se teste et se re-thématise ;
> une largeur au cas par cas ne se vérifie pas. CONFIANCE : le principe est établi (convergence) ; le
> choix de **trois** crans précisément est un arbitrage interne au produit.

## Pleine largeur (full-bleed)

RÈGLE : un élément décoratif ou immersif (hero, bandeau, image de fond, séparateur de section) peut
**déborder** le conteneur et prendre toute la largeur de la fenêtre — c'est une intention, pas un oubli
de max-width.

RÈGLE : le contenu *lisible ou actionnable* à l'intérieur d'un full-bleed reste, lui, borné par un
conteneur — un titre de hero ne s'étale pas d'un bord à l'autre sur grand écran.

## Marges et centrage

RÈGLE : un conteneur borné se **centre** dans la fenêtre (marges automatiques) ; il ne s'aligne pas à
gauche « par défaut » ni ne se centre un bloc qui, lui, appartient à une grille de contenu alignée.

RÈGLE : la **marge de page** (espace entre le conteneur et le bord de l'écran) dérive de l'échelle
`spacing` — resserrée en régime mobile, plus large en desktop — jamais une valeur propre à la grille.

> **Pourquoi** : sur mobile, une marge trop large mange la surface utile ; sur desktop, une marge nulle
> colle le contenu aux bords. Le même principe de proximité que `spacing`, appliqué au cadre de page.

## Conteneurs imbriqués

RÈGLE : un conteneur dans un conteneur (une carte dans une page bornée) **n'additionne pas** les
largeurs maximales ni les marges — la largeur vient du parent, l'enfant remplit ou se subdivise, il ne
se re-borne pas une seconde fois.

## Régime responsive

RÈGLE : sous `breakpoint.mobile`, le max-width **ne mord pas** — le conteneur prend la pleine largeur
moins la marge de page. Au-dessus, le max-width borne et centre.

RÈGLE : la bascule mobile/desktop change la **largeur** du conteneur, jamais la nature de son contenu —
cohérent avec le cadrage de SPACING (deux régimes réels, un seul breakpoint, pas une gamme de paliers).

## Frontières (ce que la grille ne fait pas)

RÈGLE : la largeur d'un **texte courant** relève de `measure.reading-max` (typographie), pas d'un
`grid.container-*`. Si le besoin est « que cette prose reste lisible », c'est la mesure, pas le conteneur.

RÈGLE : la **densité**, les **gouttières** et la **proximité** relèvent de `spacing`. La grille compose
des tokens `spacing`, elle n'en crée aucun.

RÈGLE : le **ratio** d'un média relève de `media_ratio`. La grille donne la largeur disponible, pas la
proportion de l'image.

RÈGLE : la **grille de colonnes** (nombre de colonnes, gouttières inter-colonnes d'une collection)
appartient au **pattern collection** (COLLECTION-UX/UI) depuis le 2026-07-21 — un build multi-colonnes
charge RULES-collection ; ce fichier ne porte que le cadre de page.

## Shell applicatif — régions

> Le cadre de page ci-dessus borne UNE colonne de contenu. Un shell applicatif (documentation, dashboard,
> back-office) compose en plus des **régions permanentes** autour du contenu. Cette section étend la fondation
> au cadre multi-régions — elle ne remplace pas le conteneur, elle l'enchâsse.

RÈGLE : le shell a **trois régions** — un **rail de navigation** (début / gauche en LTR), la **colonne de
contenu** (qui applique le cadre de page ci-dessus, borné ou plein), un **rail d'outils** (fin / droite). Le
rail d'outils est la région **secondaire** : rien de ce qu'il porte (theming, playground, sommaire de page)
n'est nécessaire pour lire ou pour naviguer.

RÈGLE : le rail de navigation référence `grid.rail-nav`, le rail d'outils `grid.rail-tools` — largeurs fixes,
jamais une valeur brute ni une fraction de la fenêtre. La colonne de contenu prend l'espace restant et y
applique son `grid.container-*`.

RÈGLE — **ordre de dégradation** (de la plus grande à la plus petite fenêtre) :
- au-dessus de `breakpoint.desktop` : les trois régions coexistent dans le flux ;
- entre `breakpoint.tablet` et `breakpoint.desktop` : le rail d'outils **cède le premier** — il quitte le flux
  et devient un **panneau invocable** ; nav + contenu restent ;
- sous `breakpoint.tablet` : le rail de navigation passe à son tour en **off-canvas** ; le contenu occupe toute
  la largeur ; les deux rails sont alors invocables à la demande.

> **Pourquoi le rail d'outils cède avant la nav** : la navigation est un besoin permanent (savoir où l'on est,
> aller ailleurs) ; les outils sont un confort. Quand la largeur devient rare, on sacrifie le confort avant le
> repère. CONFIANCE : le principe « la région secondaire cède d'abord » est établi ; les deux seuils exacts
> (1024 / 1280) et les largeurs de rails (280 / 320) sont un arbitrage interne, à éprouver.

RÈGLE — **off-canvas = overlay** : une région retirée du flux recouvre le contenu au lieu de le pousser ; elle
relève donc du registre overlay (scrim, piège de focus, verrouillage du défilement, retour du focus au
déclencheur). Ce comportement n'est **pas** spécifié par la grille — il appartient au sujet **overlay/drawer**,
hors périmètre à cette date : un build qui l'implémente **remonte avant de coder**.

RÈGLE — **frontière contenu vs shell** : les paliers `breakpoint.tablet` / `breakpoint.desktop` pilotent la
**présence des rails**, pas les régimes du conteneur de contenu — qui n'en a toujours que deux. Trois paliers
de shell, deux régimes de contenu : deux échelles distinctes, pas une contradiction avec « deux régimes réels ».

## Sources et niveau de confiance (couche UX)
| Affirmation | Source | Confiance |
|---|---|---|
| Un conteneur de page a une largeur maximale nommée (petit jeu fermé) | [Carbon — 2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/) (max 1584 px, 16 colonnes), [GOV.UK — Layout](https://design-system.service.gov.uk/styles/layout/) (wrapper ~1020 px) | Établi par convergence |
| Cadrer la largeur par classes de fenêtre plutôt qu'en continu | [Material — Responsive layout grid](https://m2.material.io/design/layout/responsive-layout-grid.html) (window size classes, marges/gouttières adaptatives) | Établi chez Material |
| Mesure de lecture ≈ 45-75 caractères, ≤ 80 (distincte de la largeur de conteneur) | [Baymard — Line length](https://baymard.com/blog/line-length-readability), WCAG 1.4.8 (≤ 80 caractères) | Établi — c'est l'argument de la frontière grid ≠ measure |
| Gouttières et marges dérivées de l'échelle d'espacement | [Atlassian — Grid](https://atlassian.design/foundations/grid-beta) (gouttières = valeurs spacing), [Carbon — 2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/) (mini-unit 8px) | Établi — cohérent avec le cadrage SPACING |
| Nombre exact de crans de conteneur (trois) | Arbitrage interne au produit | Non formalisé — à éprouver, ajustable sur besoin réel |
| Shell d'app/doc à trois régions (nav + contenu + outils/aside) | [Carbon — UI Shell](https://carbondesignsystem.com/), [Docusaurus — doc + TOC](https://docusaurus.io/), [Backstage — Layout](https://backstage.io/) | Établi par convergence |
| La région secondaire cède avant la primaire quand la place manque | Raisonnement de hiérarchie (repère permanent > confort) ; convergence des shells responsives | Établi (mécanisme) |
| Seuils exacts 1024 / 1280 et largeurs de rails 280 / 320 px | Arbitrage interne au produit (grille de 4px) | Non formalisé — à éprouver |

*Toute règle de cette couche sans source explicite ci-dessus repose sur un raisonnement de mécanisme
(ergonomie, cohérence interne) plutôt que sur une étude chiffrée.*

## À approfondir (hors scope de cette version)
- La **grille de colonnes** — née le 2026-07-21 dans le pattern collection (grille intrinsèque,
  pas de N-colonnes canonique) ; son test de transposition a bien eu lieu chez elle.
- Un **palier intermédiaire** (tablette) — s'ajoutera sur besoin réel observé, pas par mimétisme.
