---
sujet: select
nature: components
resume: "Choisir **une** valeur parmi un ensemble **prédéfini et limité**."
selon-contexte: [border, input, overlay]
source: SELECT-UX.md v1.0.0 + SELECT-UI.md v1.0.0
empreinte: sha256:0570e7ff3a7d5893
regles: {loi: 0, preference: 0, non_qualifie: 14}
---
# RULES — select (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** **select** pour un choix unique dans une liste **longue ou encombrante** à déplier à la demande.
- **[non qualifié]** le déclencheur **montre la valeur courante** (ou un placeholder neutre si aucun choix), jamais une
- **[non qualifié]** la liste est un superposé **non-modal** (fondation overlay) : **ancrée au déclencheur**, **sans
- **[non qualifié]** à l'ouverture, l'option **sélectionnée** (ou la première) devient l'option **active** ; la liste ne
- **[non qualifié]** déclencheur fermé — **↓ / ↑ / Entrée / Espace** ouvrent ; une **frappe de caractère** ouvre et
- **[non qualifié]** le déclencheur porte `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` et son **nom
- **[non qualifié]** **désactivé** (non focalisable, contraste réduit assumé), **erreur** (bordure et message d'erreur
- **[non qualifié]** l'**ancrage, le light-dismiss, le z-index** de la liste relèvent d'`overlay` (non-modal) ; le

## Non couvert — poser la question, ne rien trancher

- Options groupées : Regrouper par catégorie.
- Recherche dans la liste (combobox éditable) : Saisie qui filtre les options.
- Multi-sélection : Plusieurs valeurs à la fois.
