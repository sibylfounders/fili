---
component: iconography
layer: ux
type: foundation
version: 1.0.0 # première rédaction — inventaire et benchmark faits avant livraison ; crée les tokens icon.* dans DESIGN.md 1.10.0 (les tailles d'icônes étaient la déduction silencieuse de 4 composants)
last_updated: 2026-07-11
companion: ICONOGRAPHY-UI.md
confidence: mixed # la redondance texte/icône et l'accessibilité sont établies (NN/g, WCAG, convergence) ; le choix outline/1.5px est une décision d'identité ; GOV.UK est cité comme contre-position documentée
---

# Iconographie — Couche UX (fondation)

> Ce fichier contient le raisonnement : quand une icône a le droit d'exister, ce qu'elle porte, ce qu'elle ne remplace jamais. Les valeurs (tailles `icon.*`, trait) vivent dans `DESIGN.md` ; la grammaire d'application vit dans `ICONOGRAPHY-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE : l'iconographie est une **fondation** — pas d'axes, pas d'assemblage : tous les composants consomment des icônes (tones de l'alert, chevron de la card, actions du bouton, services de l'input).

RÈGLE : **ce système ne fournit pas de bibliothèque d'icônes.** Le dessin précis des glyphes est une décision d'identité visuelle — précédent posé par `icon_shape` de l'alert : la *silhouette* est normative (cercle/triangle/octogone), le *dessin* est libre. Cette fondation régit tout ce qui ne dépend pas du dessin : rôles, tailles, style, redondance, accessibilité, stabilité du sens. La grille de construction interne (keylines, zone de sécurité) appartient à la bibliothèque choisie.

RÈGLE : la fondation sépare deux fonctions :
  1. **Le sens** — ce que l'icône dit, et si elle a le droit de le dire seule. Une décision de *contenu*.
  2. **La forme** — taille, trait, alignement, couleur. Une décision de *design*.

> **Pourquoi** : c'est la structure de la typographie (sens vs lisibilité) transposée — et le même garde-fou : aucune des deux fonctions ne se déduit de l'autre.

## Une icône ne parle presque jamais seule

RÈGLE : **le texte d'abord** : "utiliser des labels pour soutenir les icônes partout où c'est possible, et éviter les icônes là où elles ne sont pas nécessaires" (Atlassian — repris tel quel). Une icône est un *accélérateur de reconnaissance*, pas un remplacement du langage.

RÈGLE : le droit de paraître seule est **une liste fermée, pas un jugement au cas par cas** : les métaphores quasi universelles (recherche/loupe, fermeture/croix, accueil/maison, impression — NN/g n'en reconnaît que trois ou quatre) plus les actions apprises *dans ce produit* et confirmées par l'usage. Tout le reste : label visible.

RÈGLE : icône seule → **aria-label obligatoire sans exception** (règle déjà posée par BUTTON-UI, généralisée) — et le tooltip au survol ne compte pas comme label : invisible au tactile, coûteux à découvrir (NN/g).

RÈGLE : la règle des 5 secondes (NN/g) comme test de conception : si trouver l'icône d'une action prend plus de 5 secondes, cette action n'a pas d'icône — elle a un mot.

> **Contre-position documentée** : GOV.UK a *retiré* ses icônes (2013) faute de preuve d'utilité ("les utilisateurs cliquaient sur les icônes en pensant qu'elles feraient quelque chose") — rappel salutaire : l'icône par défaut n'est pas un embellissement neutre, c'est une promesse d'interaction.

## Un sens = une icône, une icône = un sens

RÈGLE : le registre iconographique du produit est **stable** : une fois un glyphe associé à un sens, il ne sert plus à rien d'autre — et le même sens ne change pas de glyphe selon l'écran (précédent : une icône par tone, constante dans tout le produit, ALERT-UX).

RÈGLE : ne jamais détourner un symbole à sens établi ailleurs (l'étoile note, elle ne "favorise" pas si le produit note aussi ; la corbeille supprime, elle n'archive pas).

RÈGLE : l'icône sémantique est un **canal redondant, pas décoratif** (WCAG 1.4.1) : les icônes de tone de l'alert ne se retirent pas pour alléger, et leurs silhouettes distinctes font le travail que la couleur ne garantit pas (deutéranopie — décision F03).

## Style — un seul trait pour tout le produit

RÈGLE : **outline par défaut**, trait constant (`icon.stroke`) sur toute la bibliothèque — le style du trait est le "fallback stack" de l'iconographie : une seule décision, prise une fois, visible partout. Le **filled est réservé aux états actifs/sélectionnés** si le besoin naît (convention Material Symbols et Polaris : fill = transition d'état, pas un second style décoratif).

RÈGLE : contrainte de lisibilité : le trait doit tenir au plus petit cran (`icon.sm`) — une icône dont les détails se bouchent en petit est une icône trop détaillée, pas un cran trop petit.

RÈGLE : pas de 3D, pas de perspective, pas de détail intérieur superflu (Atlassian — difficile à décoder, notamment pour les troubles cognitifs).

## La forme — taille, alignement, couleur

RÈGLE : les tailles sont **des crans fermés** (`icon.sm/md/lg`, créés par cette fondation — elles étaient la déduction silencieuse de quatre composants), appariés aux corps de texte et aux hauteurs de composants, jamais des valeurs libres. **Ne jamais redimensionner une icône hors crans** (Polaris : cela détruit la relation établie avec la typographie).

RÈGLE : à côté d'un texte, l'icône est **centrée verticalement** sur la ligne — pas alignée sur la baseline (Carbon, explicite). Sa couleur est **celle du texte qu'elle accompagne** — jamais de couleur propre hors tone sémantique.

RÈGLE : l'icône informative respecte **3:1** (WCAG 1.4.11) comme tout signal visible ; l'icône décorative est exemptée — et cachée (`aria-hidden`).

RÈGLE : **cible tactile ≠ taille d'icône** : le glyphe reste petit, la cible s'étend par le padding — 44px partout (standard du système), ce qui couvre largement le minimum WCAG 2.5.8 (24px, AA).

## L'icône dans le temps

RÈGLE : écrit d'office (prédicteur "état transitoire") : le **spinner** est une icône animée — sa taille et sa place relèvent de cette fondation (il occupe le cran de l'icône qu'il remplace : le label du bouton loading devient indicateur sans changer la géométrie), sa rotation appartient à la fondation motion (linéaire, la seule rotation continue admise).

RÈGLE : une icône qui change avec l'état est **le même glyphe transformé** (chevron tourné, œil barré) plutôt que deux glyphes — et l'état est toujours exposé techniquement (aria-expanded, aria-pressed) : le dessin confirme, il n'est jamais la source.

RÈGLE : **SVG inline, pas d'icon font** : une icon font qui échoue au chargement laisse un caractère fantôme ou un carré, se fait lire par certains lecteurs d'écran, et casse à la traduction automatique. Le SVG inline hérite de la couleur du texte (`currentColor`) et n'a pas d'état de chargement — c'est le pendant iconographique des piles de secours typographiques.

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Icône seule sans aria-label | Action invisible au lecteur d'écran | Critique |
| Sens porté par l'icône sans redondance (tone sans forme distincte) | Exclusion daltonisme (1.4.1) — cas F03 payé | Élevée |
| Métaphore ambiguë sans label visible | Action non trouvée, erreurs d'usage (NN/g) | Élevée |
| Icône hover-only | Inaccessible au tactile (précédent BUTTON-UX/CARD-UX) | Élevée |
| Icon font | Échec de chargement illisible, AT perturbée | Moyenne à élevée |
| Registre instable (même sens, glyphes différents) | Apprentissage détruit | Moyenne |
| Cible réduite au glyphe | Zone tactile < 44px | Moyenne à élevée |
| Icône redimensionnée hors crans | Relation typo/icône cassée, trait bouché | Moyenne |
| Icônes décoratives multipliées | Bruit, promesses d'interaction mensongères (leçon GOV.UK) | Moyenne |

## Règle transversale

RÈGLE : **l'icône accélère la reconnaissance d'un sens que le produit sait déjà dire autrement — elle n'est jamais le seul dépositaire du sens.**

> **Pourquoi** : c'est 1.4.1 (jamais la couleur seule) élargi : jamais *le dessin* seul. Le texte, le rôle ARIA, la forme, la couleur — l'icône est un canal parmi d'autres, le plus rapide et le moins fiable.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Label visible requis, tooltips insuffisants, ~3 icônes universelles, règle des 5s | [NN/g — Icon Usability](https://www.nngroup.com/articles/icon-usability/), [NN/g — Bad Icons](https://www.nngroup.com/articles/bad-icons/) | Établi — littérature de référence |
| "Labels partout où c'est possible, pas d'icône non nécessaire" | [Atlassian — Iconography](https://atlassian.design/foundations/iconography) | Établi, citation directe |
| Actions universelles tolérées seules (edit, delete, search) | [Polaris — Using icons](https://polaris-react.shopify.com/design/icons/using-icons) | Établi chez Polaris — croisé avec la liste plus stricte de NN/g |
| Retrait des icônes faute de preuve | [GDS blog 2013](https://gds.blog.gov.uk/2013/06/18/retiring-our-icons/), [Design notes 2016](https://designnotes.blog.gov.uk/2016/11/28/removing-the-external-link-icon-from-gov-uk/) | Établi chez GOV.UK — contre-position documentée |
| aria-hidden par défaut / label si porteuse de sens | [Carbon — Icons code](https://carbondesignsystem.com/elements/icons/code/), [Polaris — Icon](https://polaris-react.shopify.com/components/images-and-icons/icon) | Établi par convergence |
| 3:1 pour les graphiques porteurs de sens | [WCAG 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html), [technique G207](https://www.w3.org/WAI/WCAG21/Techniques/general/G207) ; Carbon monte à 4.5:1 | Établi (3:1) ; le 4.5:1 de Carbon noté, non adopté |
| Cible ≥ 24px (AA) / 44px (AAA, HIG) | [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [WCAG 2.5.5] ; Carbon 44px | Établi — le 44px interne couvre les deux |
| Tailles appariées aux corps de texte (16/20 ↔ 14/16px) | [Carbon — Icons usage](https://carbondesignsystem.com/elements/icons/usage/) | Établi chez Carbon — adopté (icon.md ↔ body 16px) |
| Centrage vertical, pas baseline ; jamais redimensionner | [Carbon — Icons usage](https://carbondesignsystem.com/elements/icons/usage/), [Polaris — Using icons](https://polaris-react.shopify.com/design/icons/using-icons) | Établi par convergence |
| Outline défaut / filled = état ; trait constant (1.5px Atlassian/Polaris, 2dp Material) | [Polaris — Creating icons](https://polaris-react.shopify.com/design/icons/creating-icons), [Material Symbols](https://developers.google.com/fonts/docs/material_symbols), [Atlassian](https://atlassian.design/foundations/iconography) | Établi (outline/filled) ; la valeur du trait est un choix d'identité |
| Pas de 3D/perspective | [Atlassian — Iconography](https://atlassian.design/foundations/iconography) | Établi chez Atlassian |

## À approfondir

- **RTL** : icônes directionnelles en miroir (chevrons, flèches) — 3e signalement RTL du système, toujours sans consommateur.
- **Bibliothèque d'icônes** : le jour du choix (identité), vérifier : outline, trait tenant `icon.sm`, silhouettes des tones compatibles avec `icon_shape` de l'alert.
- **Filled comme état** : à activer au premier consommateur (navigation ? favori ?) — la convention est prête.
