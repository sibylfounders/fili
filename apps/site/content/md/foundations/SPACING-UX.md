---
component: spacing
layer: ux
type: foundation
version: 1.2.1 # 1.2.1 : la note de transposition est mise à jour — la grille de colonnes est née dans le pattern collection (2026-07-21) et ses gouttières sont bien des tokens spacing ; aucune règle modifiée. 1.2.0 : le rythme vertical entre dans la fondation — même échelle et même monotonie sur l'axe Y, titre plus proche de ce qu'il ouvre, hauteurs accrochées à la grille de base ; interlignes en baseline SOUPLE (position assumée, révisable — cf. À approfondir). Aucun token nouveau. Cf. DECISIONS.md 2026-07-21. 1.1.0 : le cadre de page (largeurs de conteneur) est passé à la nouvelle fondation grid (née du besoin prouvé par les pilotes 2026-07-16) ; spacing garde la proximité/densité/régimes, et les gouttières d'une future grille de colonnes y resteront des tokens spacing. Cf. DECISIONS.md 2026-07-16. 1.0.0 : première rédaction — inventaire et benchmark faits avant livraison ; cadrage : le grid n'a pas de fondation propre (cf. note de transposition, décision journalisée dans DECISIONS.md)
last_updated: 2026-07-11
companion: SPACING-UI.md
confidence: mixed # la loi de proximité et la grille de base sont établies par convergence ; le breakpoint unique et l'échelle en px sont des décisions internes assumées, marquées comme telles
---

# Espacement & layout — Couche UX (fondation)

> Ce fichier contient le raisonnement : proximité, hiérarchie de l'espace, échelle fermée, responsive. Les valeurs (l'échelle `spacing.*`, `breakpoint.mobile`) vivent dans `DESIGN.md` ; la grammaire d'application vit dans `SPACING-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE : l'espacement est une **fondation** — le modèle à axes ne s'applique pas. Tous les composants le consomment (paddings, gaps), tous les patterns le composent (field_gap, fieldset_gap), la page le rythme (section).

RÈGLE : **le grid (grille de colonnes) n'a pas de fondation propre — par cadrage, pas par oubli.** Atlassian, Carbon et Material documentent spacing *et* grid séparément ; le test de transposition donne ici un autre résultat : ce système n'a **aucun consommateur de colonnes** (la seule grille existante — la collection de cartes — se définit par un gap et un breakpoint, pas par 12 colonnes), et chez les systèmes majeurs eux-mêmes la grille *dérive* de l'échelle d'espacement (les gouttières d'Atlassian sont des valeurs de son échelle spacing ; la 2x Grid de Carbon et son échelle partagent la même mini-unit de 8px). La fondation grid est née depuis (cadre de page, 2026-07-16), et la grille de colonnes a trouvé son propriétaire le 2026-07-21 : le pattern collection — dont les gouttières sont des tokens spacing (mapping par densité dans COLLECTION-UI.md), héritées de cette fondation, pas l'inverse.

> **Pourquoi** : copier le catalogue d'Atlassian par défaut est exactement ce que le test de transposition existe pour empêcher (précédent : les axes du bouton non transposés à la carte). Documenter une grille de 12 colonnes sans consommateur serait de l'anticipation — le travers que le principe "un token naît d'un besoin réel" interdit.

RÈGLE : la fondation porte deux fonctions distinctes :
  1. **La relation** — ce que l'espace *dit* : qui est lié à qui, où un groupe commence. Une décision de *sens*.
  2. **Le rythme** — la régularité qui rend la page calme : la grille de base, l'échelle fermée. Une décision de *système*.

## La grille de base et l'échelle fermée

RÈGLE : tout espacement est un multiple de la **grille de base** (`spacing.base`) — c'est la grille que les `*-UI.md` demandaient sans la fixer, posée par DESIGN.md.

RÈGLE : l'échelle est **fermée** : on choisit un cran existant (`xs` à `xl`, `section`), on n'invente pas de valeur intermédiaire. Si aucun cran ne convient de façon répétée, c'est l'échelle qu'on fait évoluer (DESIGN.md + journal), pas l'écran.

> **Pourquoi** : la régularité perçue vient du petit nombre de valeurs, pas de leur précision — les systèmes majeurs convergent sur une échelle courte à progression non linéaire (serrée en bas : 4/8/16, écartée en haut : 24/40/80), parce que les petits écarts se jouent au pixel près et les grands à la dizaine.
> **Erreur fréquente** : le 13px local "parce que 12 était trop peu" — la valeur unique casse le rythme partout où elle voisine l'échelle, et elle est invisible au rebranding.

RÈGLE : l'échelle de ce système est **plus courte** que celles des systèmes majeurs (7 crans contre 13-14) — assumé : elle grandit sur besoin réel journalisé (précédent : `section` ajouté en 1.7.0 pour le rythme de page), jamais par symétrie avec un benchmark.

## La proximité comme information

RÈGLE : **la règle cardinale — l'espace encode la relation** : plus deux éléments sont proches, plus leur lien perçu est fort (loi de proximité, Gestalt — formulée quasi textuellement par Carbon et Polaris).

RÈGLE : la hiérarchie de proximité doit être **monotone** : lié < frère < groupe. En pratique chez les consommateurs : `label_to_field` < `field_gap` < `fieldset_gap` (FORM-UI) ; `icon_gap` interne < padding externe (BUTTON-UI, ALERT-UI).

RÈGLE : **l'espacement interne est toujours inférieur ou égal à l'espacement externe** d'un même composant — un contenu plus proche du bord d'un voisin que de son propre bord a l'air d'appartenir au voisin.

> **Erreur fréquente** : un label équidistant de son champ et du champ précédent — la proximité ment, l'utilisateur relie le label au mauvais champ. C'est le même mécanisme que l'affordance mensongère de la carte (CARD-UX) : un signal spatial qui dit faux est pire que pas de signal.

RÈGLE : la séparation entre groupes passe par **un saut d'échelle franc** (fieldset_gap vs field_gap), pas par un cran adjacent — deux valeurs trop proches ne sont pas perçues comme différentes ; c'est l'équivalent spatial des combinaisons indiscernables que traque test-rendu.js.

RÈGLE : hiérarchie des séparateurs — **l'espace d'abord, le fond ensuite, le trait en dernier** : si un saut d'échelle suffit à séparer deux groupes, ni fond ni bordure ; réserver les séparateurs dessinés aux cas denses où l'espace manque (frontière avec la fondation border, qui fait autorité sur le trait).

## Le rythme vertical

RÈGLE : l'empilement vertical suit la **même échelle fermée et la même monotonie** que la proximité : intra-bloc (`xs`–`sm`) < entre frères (`md`) < entre groupes (`xl`) < entre sections (`section`). Le rythme est un **usage de l'échelle**, pas une seconde échelle — aucun cran vertical propre.

> **Pourquoi** : la loi de proximité ne connaît pas d'axe — ce que la fondation impose horizontalement (des distances qui disent la relation) vaut verticalement. Une page dont les blocs sont espacés de valeurs quelconques n'a pas de rythme au sens musical : c'est le trou des compositions « au mimétisme », qui copient des pixels, pas des relations.

RÈGLE : **un titre est plus proche de ce qu'il ouvre que de ce qu'il ferme** — l'espace au-dessus d'un titre dépasse d'au moins un cran l'espace au-dessous.

> **Pourquoi** : le titre appartient à son contenu (proximité, encore) ; un titre équidistant flotte, un titre plus proche du bloc précédent ment. Convention éditoriale constante (Rutter), transposée en crans d'échelle.

RÈGLE : les **hauteurs posées** du système s'accrochent à la grille de base (`spacing.base`) : hauteurs interactives (`scale.*` — 32/36/40/48, déjà conformes), espacements verticaux (multiples par construction), zones réservées. Toute nouvelle hauteur se justifie en multiples de `base`.

RÈGLE : les **interlignes** restent gouvernés par la lisibilité, pas par la grille — **baseline souple, position assumée et révisable**. État chiffré : aucun interligne calculé ne tombe aujourd'hui sur la grille (body 16 × 1.6 = 25,6 px ; body-small 21 ; label 14,4 ; display 52,8 ; headings fluides par nature). Ne recaler aucun interligne sans arbitrage produit — la posture stricte est documentée en « À approfondir ».

> **Pourquoi** : la baseline stricte des livres suppose des corps fixes ; ce système a des titres fluides et un corps dont l'interligne 1.6 est un choix de lisibilité (WCAG 1.4.8 demande ≥ 1.5). Accrocher les espacements et les hauteurs suffit à produire un rythme perçu ; accrocher les interlignes est un raffinement dont le coût se pèse, il ne se subit pas.

## Densité

RÈGLE : la densité d'un composant est un **décalage d'un cran** sur l'échelle (comfortable : padding `md` → compact : padding `sm`), jamais une valeur propre — l'axe density de la card en est l'application.

RÈGLE : la densité change les espacements, **jamais la structure** (ordre des slots, présence des éléments) — règle déjà posée par CARD-UI, généralisée ici.

## Alignement optique

RÈGLE : quand l'équilibre mathématique et l'équilibre perçu divergent (icône asymétrique, pastille ronde contre texte), **l'œil arbitre** — l'ajustement optique est légitime, à deux conditions : il reste local (jamais promu en valeur d'échelle), et l'écart est commenté là où il vit.

CONFIANCE : convergence (Atlassian "optical adjustments", Polaris admet le padding asymétrique pour l'équilibre visuel — en cassant la cohérence *entre* conteneurs, jamais *dans* un conteneur).

## Responsive — le breakpoint unique

RÈGLE : ce système définit **deux régimes** (mobile / desktop) séparés par `breakpoint.mobile`, pas une gamme de 5-6 paliers comme Atlassian ou Carbon — divergence assumée : un seul produit consommateur, deux régimes réels observés (grille → 1 colonne, primaires full-width, hauteurs tactiles). Un palier intermédiaire (tablette) s'ajoutera sur besoin réel, pas par mimétisme.

CONFIANCE : décision interne datée (2026-07-11) — à réviser au premier consommateur qui exige un 3e régime.

RÈGLE : **l'échelle d'espacement ne change pas au breakpoint** (contrairement à GOV.UK, dont l'échelle est responsive) — ce qui change en mobile : la densité choisie et la disposition, pas la valeur des crans. Si l'espace manque en mobile, on descend d'un cran de densité, on n'invente pas un "md-mobile".

RÈGLE : l'espacement s'exprime en **px, pas en rem** — assumé et motivé : WCAG 1.4.4 protège l'agrandissement du *texte* ; un padding qui gonfle avec le zoom texte consomme l'écran sans servir la lecture (le zoom page, lui, agrandit tout uniformément). La typographie, elle, est en rem — les deux positions sont cohérentes entre elles, pas contradictoires.

CONFIANCE : convergence partielle (Carbon fixe ses tokens en px/rem selon les cas ; le débat px/rem sur l'espacement n'est pas tranché par une norme) — position interne documentée, réversible.

## L'espace dans le temps

RÈGLE : l'espace réservé **ne dépend pas de l'état** — le skeleton occupe les dimensions du contenu réel (CARD-UI), l'espace d'un alert attendu se réserve quand c'est possible (ALERT-UX). Le déplacement de contenu non sollicité est le risque : il appartient à la fondation motion, l'espacement fournit la prévention (réservation).

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Proximité qui ment (label équidistant) | L'utilisateur relie l'information au mauvais élément | Élevée |
| Valeur hors échelle | Rythme cassé, rebranding impossible, dérive au copier-coller | Élevée |
| Interne > externe | Le contenu semble appartenir au voisin | Moyenne à élevée |
| Sauts d'échelle indiscernables (crans adjacents pour séparer) | Groupes non perçus, page plate | Moyenne |
| Espacements écrasés en mobile hors échelle | Zones tactiles accolées (< 44px effectifs) | Élevée |
| Contenu qui saute (espace non réservé) | Cible déplacée sous le doigt/curseur | Élevée |
| Densité qui change la structure | Deux produits dans un — apprentissage cassé | Moyenne |

## Règle transversale

RÈGLE : **l'espace est un canal d'information, pas un reste** — ce que l'espace dit (proximité, groupes) doit être aussi vrai que ce que le texte dit.

> **Pourquoi** : c'est la déclinaison spatiale du principe des affordances honnêtes (CARD-UX : "la réaction au survol ne doit jamais mentir") — l'utilisateur lit la page par ses distances avant de lire ses mots.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Loi de proximité appliquée à l'espacement | [Carbon — Spacing](https://carbondesignsystem.com/elements/spacing/overview/) ("elements near each other are perceived as meaningfully related"), [Polaris — Layout](https://polaris.shopify.com/design/layout) (principe de proximité explicite) | Établi — Gestalt + formulation convergente des systèmes |
| Grille de base 4/8px, échelle courte non linéaire | [Atlassian — Spacing](https://atlassian.design/foundations/spacing) (base 8, 14 crans), [Carbon](https://carbondesignsystem.com/elements/spacing/overview/) (multiples de 2/4/8, 13 crans), [Polaris — tokens](https://polaris-react.shopify.com/design/layout/layout-tokens) (base 4), [8pt grid](https://spec.fm/specifics/8-pt-grid) (divisibilité des résolutions, demi-pixels au scaling ×1,5) | Établi par convergence ; base 4 ici = choix interne préexistant (DESIGN.md) |
| Interne ≤ externe ; petit=interne, moyen=conteneur, grand=blocs de page | [Atlassian — Spacing](https://atlassian.design/foundations/spacing) (segmentation 0-8 / 12-24 / 32-80) | Établi chez Atlassian, convergent avec la pratique |
| Écarts hors échelle à éviter, exceptions admises | [Carbon — Spacing](https://carbondesignsystem.com/elements/spacing/overview/) | Établi |
| Ajustements optiques légitimes, locaux | [Atlassian](https://atlassian.design/foundations/spacing) (optical adjustments), [Polaris — Spacial organization](https://polaris-react.shopify.com/design/layout/spacial-organization) (asymétrie admise, jamais dans un même conteneur) | Établi par convergence, conditions propres à ce système |
| Séparateurs dessinés en dernier recours | [Polaris — Spacial organization](https://polaris-react.shopify.com/design/layout/spacial-organization) (pas de dividers hors tables) | Établi chez Polaris, adopté ici |
| Grille de colonnes dérivée de l'échelle d'espacement | [Atlassian — Grid](https://atlassian.design/foundations/grid-beta) (gouttières = valeurs spacing), [Carbon — 2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/) (même mini-unit 8px) | Établi — c'est l'argument du cadrage "pas de fondation grid" |
| Breakpoints multiples chez les systèmes majeurs | [Atlassian](https://atlassian.design/foundations/grid-beta) (6), [Carbon](https://carbondesignsystem.com/elements/2x-grid/overview/) (5), [Material — window size classes](https://developer.android.com/develop/ui/views/layout/use-window-size-classes) (5) | Établi ailleurs — le breakpoint unique ici est une divergence assumée, documentée |
| Échelle responsive (l'unité change au breakpoint) | [GOV.UK — Spacing](https://design-system.service.gov.uk/styles/spacing/) | Établi chez GOV.UK — explicitement **non** adopté ici |
| Rythme vertical composé sur une unité commune ; le vide n'est pas un reste | [Richard Rutter — Compose to a vertical rhythm](https://webtypography.net/2.2.2), [NN/g — The Power of White Space](https://www.nngroup.com/articles/whitespace/) | Établi dans la tradition typographique ; transposition écran en baseline souple, assumée ici |

## À approfondir

- **Palier tablette** : à trancher au premier consommateur réel d'un 3e régime.
- **Baseline stricte** : recaler les interlignes sur la grille de base (body 1.6 → 1.5 = 24 px, le minimum WCAG 1.4.8 ; body-small, label et display à recalculer) — gain de rythme réel, coût de lisibilité à arbitrer. Position actuelle : baseline souple (cf. § Rythme vertical). À réviser avec le cadrage white-space (inventaire 2026-07-21).
- **Expansion de traduction** (~30 %) : 3e signalement système (typographie, espacement) — les hauteurs et largeurs calées sur le français casseront ; mérite un traitement transversal un jour.
- **Tokens négatifs** (chevauchements, ancrages) : Atlassian en a ; aucun besoin interne à ce jour.
- **Fondation grid** : **née le 2026-07-16** avec le besoin prouvé de *largeur de conteneur* (cf. `GRID-UX.md`) — le cadre de page a quitté spacing. La **grille de colonnes** proprement dite reste, elle, différée jusqu'au pattern collection/grille ; ses gouttières y resteront des tokens spacing.
