---
sujet: spacing
nature: foundations
resume: "Ce fichier contient le raisonnement : proximité, hiérarchie de l'espace, échelle fermée, responsive."
selon-contexte: [adaptive, alert, button, card, collection, form, grid, input]
source: SPACING-UX.md v1.2.1 + SPACING-UI.md v1.2.0
empreinte: sha256:ac7f3d7ea4d46607
regles: {loi: 0, preference: 0, non_qualifie: 23}
---
# RULES — spacing (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** l'espacement est une **fondation** — le modèle à axes ne s'applique pas. Tous les composants le consomment (paddings, gaps), tous les patterns le composent (field_gap, fieldset_gap), la page le rythme (section).
- **[non qualifié]** **le grid (grille de colonnes) n'a pas de fondation propre — par cadrage, pas par oubli.** Atlassian, Carbon et Material documentent spacing *et* grid séparément ; le test de transposition donne ici un autre résultat : ce système n'a **aucun consommateur de colonnes** (la seule grille existante — la collection de cartes — se définit par un gap et un breakpoint, pas par 12 colonnes), et chez les systèmes majeurs eux-mêmes la grille *dérive* de l'échelle d'espacement (les gouttières d'Atlassian sont des valeurs de son échelle spacing ; la 2x Grid de Carbon et son échelle partagent la même mini-unit de 8px). La fondation grid est née depuis (cadre de page, 2026-07-16), et la grille de colonnes a trouvé son propriétaire le 2026-07-21 : le pattern collection — dont les gouttières sont des tokens spacing (mapping par densité dans COLLECTION-UI.md), héritées de cette fondation, pas l'inverse.
- **[non qualifié]** la fondation porte deux fonctions distinctes :
- **[non qualifié]** tout espacement est un multiple de la **grille de base** (`spacing.base`) — c'est la grille que les `*-UI.md` demandaient sans la fixer, posée par DESIGN.md.
- **[non qualifié]** l'échelle est **fermée** : on choisit un cran existant (`xs` à `xl`, `section`), on n'invente pas de valeur intermédiaire. Si aucun cran ne convient de façon répétée, c'est l'échelle qu'on fait évoluer (DESIGN.md + journal), pas l'écran.
- **[non qualifié]** l'échelle de ce système est **plus courte** que celles des systèmes majeurs (7 crans contre 13-14) — assumé : elle grandit sur besoin réel journalisé (précédent : `section` ajouté en 1.7.0 pour le rythme de page), jamais par symétrie avec un benchmark.
- **[non qualifié]** **la règle cardinale — l'espace encode la relation** : plus deux éléments sont proches, plus leur lien perçu est fort (loi de proximité, Gestalt — formulée quasi textuellement par Carbon et Polaris).
- **[non qualifié]** la hiérarchie de proximité doit être **monotone** : lié < frère < groupe. En pratique chez les consommateurs : `label_to_field` < `field_gap` < `fieldset_gap` (FORM-UI) ; `icon_gap` interne < padding externe (BUTTON-UI, ALERT-UI).
- **[non qualifié]** **l'espacement interne est toujours inférieur ou égal à l'espacement externe** d'un même composant — un contenu plus proche du bord d'un voisin que de son propre bord a l'air d'appartenir au voisin.
- **[non qualifié]** la séparation entre groupes passe par **un saut d'échelle franc** (fieldset_gap vs field_gap), pas par un cran adjacent — deux valeurs trop proches ne sont pas perçues comme différentes ; c'est l'équivalent spatial des combinaisons indiscernables que traque test-rendu.js.
- **[non qualifié]** hiérarchie des séparateurs — **l'espace d'abord, le fond ensuite, le trait en dernier** : si un saut d'échelle suffit à séparer deux groupes, ni fond ni bordure ; réserver les séparateurs dessinés aux cas denses où l'espace manque (frontière avec la fondation border, qui fait autorité sur le trait).
- **[non qualifié]** l'empilement vertical suit la **même échelle fermée et la même monotonie** que la proximité : intra-bloc (`xs`–`sm`) < entre frères (`md`) < entre groupes (`xl`) < entre sections (`section`). Le rythme est un **usage de l'échelle**, pas une seconde échelle — aucun cran vertical propre.
- **[non qualifié]** **un titre est plus proche de ce qu'il ouvre que de ce qu'il ferme** — l'espace au-dessus d'un titre dépasse d'au moins un cran l'espace au-dessous.
- **[non qualifié]** les **hauteurs posées** du système s'accrochent à la grille de base (`spacing.base`) : hauteurs interactives (`scale.*` — 32/36/40/48, déjà conformes), espacements verticaux (multiples par construction), zones réservées. Toute nouvelle hauteur se justifie en multiples de `base`.
- **[non qualifié]** les **interlignes** restent gouvernés par la lisibilité, pas par la grille — **baseline souple, position assumée et révisable**. État chiffré : aucun interligne calculé ne tombe aujourd'hui sur la grille (body 16 × 1.6 = 25,6 px ; body-small 21 ; label 14,4 ; display 52,8 ; headings fluides par nature). Ne recaler aucun interligne sans arbitrage produit — la posture stricte est documentée en « À approfondir ».
- **[non qualifié]** la densité d'un composant est un **décalage d'un cran** sur l'échelle (comfortable : padding `md` → compact : padding `sm`), jamais une valeur propre — l'axe density de la card en est l'application.
- **[non qualifié]** la densité change les espacements, **jamais la structure** (ordre des slots, présence des éléments) — règle déjà posée par CARD-UI, généralisée ici.
- **[non qualifié]** quand l'équilibre mathématique et l'équilibre perçu divergent (icône asymétrique, pastille ronde contre texte), **l'œil arbitre** — l'ajustement optique est légitime, à deux conditions : il reste local (jamais promu en valeur d'échelle), et l'écart est commenté là où il vit.
- **[non qualifié]** ce système définit **deux régimes** (mobile / desktop) séparés par `breakpoint.mobile`, pas une gamme de 5-6 paliers comme Atlassian ou Carbon — divergence assumée : un seul produit consommateur, deux régimes réels observés (grille → 1 colonne, primaires full-width, hauteurs tactiles). Un palier intermédiaire (tablette) s'ajoutera sur besoin réel, pas par mimétisme.
- **[non qualifié]** **l'échelle d'espacement ne change pas au breakpoint** (contrairement à GOV.UK, dont l'échelle est responsive) — ce qui change en mobile : la densité choisie et la disposition, pas la valeur des crans. Si l'espace manque en mobile, on descend d'un cran de densité, on n'invente pas un "md-mobile".
- **[non qualifié]** l'espacement s'exprime en **px, pas en rem** — assumé et motivé : WCAG 1.4.4 protège l'agrandissement du *texte* ; un padding qui gonfle avec le zoom texte consomme l'écran sans servir la lecture (le zoom page, lui, agrandit tout uniformément). La typographie, elle, est en rem — les deux positions sont cohérentes entre elles, pas contradictoires.
- **[non qualifié]** l'espace réservé **ne dépend pas de l'état** — le skeleton occupe les dimensions du contenu réel (CARD-UI), l'espace d'un alert attendu se réserve quand c'est possible (ALERT-UX). Le déplacement de contenu non sollicité est le risque : il appartient à la fondation motion, l'espacement fournit la prévention (réservation).
- **[non qualifié]** **l'espace est un canal d'information, pas un reste** — ce que l'espace dit (proximité, groupes) doit être aussi vrai que ce que le texte dit.

## Non couvert — poser la question, ne rien trancher

- Alignement optique vs mathématique : Un élément paraît décentré malgré des px égaux.
- Contenu plus long que prévu : Le contenu déborde (traduction, titres longs).
- Tablette / intermédiaire : L'écran est intermédiaire.
- Zoom navigateur / rem : L'utilisateur zoome le texte.
