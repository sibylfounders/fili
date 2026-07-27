---
sujet: accordion
nature: components
resume: "Un **disclosure** : un en-tête révèle ou masque une région de contenu."
selon-contexte: [border, spacing]
source: ACCORDION-UX.md v1.0.0 + ACCORDION-UI.md v1.0.0
empreinte: sha256:c3d2c32bebe3061e
regles: {loi: 0, preference: 0, non_qualifie: 10}
---
# RULES — accordion (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** chaque section a un **en-tête cliquable** (un `button`) qui **révèle/masque** sa région. Le contenu
- **[non qualifié]** **plusieurs sections peuvent être ouvertes à la fois** (multi-ouvert par défaut). Le **single-open**
- **[non qualifié]** l'en-tête est un `button` avec `aria-expanded` (true/false) et `aria-controls` vers sa région ; la
- **[non qualifié]** l'ouverture d'une section **ne vole pas le focus** et ne déplace pas la page sous le pointeur ; le
- **[non qualifié]** l'état ouvert/fermé se lit à un **indicateur non chromatique** (chevron qui pivote, +/−), pas à la
- **[non qualifié]** le dépliage/repliage anime la **hauteur** en `motion.base` / `motion.ease-in-out` (mouvement sur
- **[non qualifié]** le **chevron** relève d'`iconography` ; les **durées/courbes** de `motion` ; un **lien** dans une

## Non couvert — poser la question, ne rien trancher

- Superposé (modal) : Un contenu qui recouvre et piège.
