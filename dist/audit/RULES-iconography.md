---
sujet: iconography
nature: foundations
resume: "Ce fichier contient le raisonnement : quand une icône a le droit d'exister, ce qu'elle porte, ce qu'elle ne remplace jamais."
selon-contexte: [alert, button, card, color, input, motion, spacing]
source: ICONOGRAPHY-UX.md v1.0.0 + ICONOGRAPHY-UI.md v1.0.0
empreinte: sha256:c6f8657be9c66b1a
regles: {loi: 0, preference: 0, non_qualifie: 21}
---
# RULES — iconography (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** l'iconographie est une **fondation** — pas d'axes, pas d'assemblage : tous les composants consomment des icônes (tones de l'alert, chevron de la card, actions du bouton, services de l'input).
- **[non qualifié]** **ce système ne fournit pas de bibliothèque d'icônes.** Le dessin précis des glyphes est une décision d'identité visuelle — précédent posé par `icon_shape` de l'alert : la *silhouette* est normative (cercle/triangle/octogone), le *dessin* est libre. Cette fondation régit tout ce qui ne dépend pas du dessin : rôles, tailles, style, redondance, accessibilité, stabilité du sens. La grille de construction interne (keylines, zone de sécurité) appartient à la bibliothèque choisie.
- **[non qualifié]** la fondation sépare deux fonctions :
- **[non qualifié]** **le texte d'abord** : "utiliser des labels pour soutenir les icônes partout où c'est possible, et éviter les icônes là où elles ne sont pas nécessaires" (Atlassian — repris tel quel). Une icône est un *accélérateur de reconnaissance*, pas un remplacement du langage.
- **[non qualifié]** le droit de paraître seule est **une liste fermée, pas un jugement au cas par cas** : les métaphores quasi universelles (recherche/loupe, fermeture/croix, accueil/maison, impression — NN/g n'en reconnaît que trois ou quatre) plus les actions apprises *dans ce produit* et confirmées par l'usage. Tout le reste : label visible.
- **[non qualifié]** icône seule → **aria-label obligatoire sans exception** (règle déjà posée par BUTTON-UI, généralisée) — et le tooltip au survol ne compte pas comme label : invisible au tactile, coûteux à découvrir (NN/g).
- **[non qualifié]** la règle des 5 secondes (NN/g) comme test de conception : si trouver l'icône d'une action prend plus de 5 secondes, cette action n'a pas d'icône — elle a un mot.
- **[non qualifié]** le registre iconographique du produit est **stable** : une fois un glyphe associé à un sens, il ne sert plus à rien d'autre — et le même sens ne change pas de glyphe selon l'écran (précédent : une icône par tone, constante dans tout le produit, ALERT-UX).
- **[non qualifié]** ne jamais détourner un symbole à sens établi ailleurs (l'étoile note, elle ne "favorise" pas si le produit note aussi ; la corbeille supprime, elle n'archive pas).
- **[non qualifié]** l'icône sémantique est un **canal redondant, pas décoratif** (WCAG 1.4.1) : les icônes de tone de l'alert ne se retirent pas pour alléger, et leurs silhouettes distinctes font le travail que la couleur ne garantit pas (deutéranopie — décision F03).
- **[non qualifié]** **outline par défaut**, trait constant (`icon.stroke`) sur toute la bibliothèque — le style du trait est le "fallback stack" de l'iconographie : une seule décision, prise une fois, visible partout. Le **filled est réservé aux états actifs/sélectionnés** si le besoin naît (convention Material Symbols et Polaris : fill = transition d'état, pas un second style décoratif).
- **[non qualifié]** contrainte de lisibilité : le trait doit tenir au plus petit cran (`icon.sm`) — une icône dont les détails se bouchent en petit est une icône trop détaillée, pas un cran trop petit.
- **[non qualifié]** pas de 3D, pas de perspective, pas de détail intérieur superflu (Atlassian — difficile à décoder, notamment pour les troubles cognitifs).
- **[non qualifié]** les tailles sont **des crans fermés** (`icon.sm/md/lg`, créés par cette fondation — elles étaient la déduction silencieuse de quatre composants), appariés aux corps de texte et aux hauteurs de composants, jamais des valeurs libres. **Ne jamais redimensionner une icône hors crans** (Polaris : cela détruit la relation établie avec la typographie).
- **[non qualifié]** à côté d'un texte, l'icône est **centrée verticalement** sur la ligne — pas alignée sur la baseline (Carbon, explicite). Sa couleur est **celle du texte qu'elle accompagne** — jamais de couleur propre hors tone sémantique.
- **[non qualifié]** l'icône informative respecte **3:1** (WCAG 1.4.11) comme tout signal visible ; l'icône décorative est exemptée — et cachée (`aria-hidden`).
- **[non qualifié]** **cible tactile ≠ taille d'icône** : le glyphe reste petit, la cible s'étend par le padding — 44px partout (standard du système), ce qui couvre largement le minimum WCAG 2.5.8 (24px, AA).
- **[non qualifié]** écrit d'office (prédicteur "état transitoire") : le **spinner** est une icône animée — sa taille et sa place relèvent de cette fondation (il occupe le cran de l'icône qu'il remplace : le label du bouton loading devient indicateur sans changer la géométrie), sa rotation appartient à la fondation motion (linéaire, la seule rotation continue admise).
- **[non qualifié]** une icône qui change avec l'état est **le même glyphe transformé** (chevron tourné, œil barré) plutôt que deux glyphes — et l'état est toujours exposé techniquement (aria-expanded, aria-pressed) : le dessin confirme, il n'est jamais la source.
- **[non qualifié]** **SVG inline, pas d'icon font** : une icon font qui échoue au chargement laisse un caractère fantôme ou un carré, se fait lire par certains lecteurs d'écran, et casse à la traduction automatique. Le SVG inline hérite de la couleur du texte (`currentColor`) et n'a pas d'état de chargement — c'est le pendant iconographique des piles de secours typographiques.
- **[non qualifié]** **l'icône accélère la reconnaissance d'un sens que le produit sait déjà dire autrement — elle n'est jamais le seul dépositaire du sens.**

## Non couvert — poser la question, ne rien trancher

- Illustration : Un visuel d'empty state ou pédagogique s'affiche.
- RTL : La langue se lit de droite à gauche.
