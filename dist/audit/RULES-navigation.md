---
sujet: navigation
nature: patterns
resume: "**Orchestration** d'une navigation, pas un composant neuf : elle **assemble** des destinations (`link` en"
selon-contexte: [link]
source: NAVIGATION-UX.md v1.0.0 + NAVIGATION-UI.md v1.0.0
empreinte: sha256:ca4894e00ca54963
regles: {loi: 0, preference: 0, non_qualifie: 12}
---
# RULES — navigation (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** toute navigation vit dans un `nav` **étiqueté** (`aria-label`) ; quand plusieurs coexistent, chacune
- **[non qualifié]** les destinations sont des **liens** (`link`, contexte navigation) ; leur regroupement est un
- **[non qualifié]** sous les seuils du shell, la nav latérale passe **off-canvas** — comportement porté par `overlay`
- **[non qualifié]** le TOC liste les **sections de la page courante** ; l'entrée **active suit la lecture** (la section
- **[non qualifié]** cliquer une entrée **défile** vers la section (ancre) ; le scrollspy **reflète** la lecture, il ne la
- **[non qualifié]** le **premier élément focalisable** de la page est un lien « **Aller au contenu** » — **masqué
- **[non qualifié]** Tab traverse la navigation dans un **ordre qui suit le sens** ; **aucun piège de focus** ; les
- **[non qualifié]** l'**item** est un `link` ; le **regroupement** un `accordion` ; l'**off-canvas** relève d'`overlay` ;

## Non couvert — poser la question, ne rien trancher

- Fil d'Ariane (breadcrumb) : Chemin dans l'arborescence.
- Barre de nav horizontale : Onglets de premier niveau en haut.
