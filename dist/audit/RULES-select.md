---
sujet: select
nature: components
resume: "Choisir **une** valeur parmi un ensemble **prédéfini et limité**."
selon-contexte: [border, input, overlay]
source: SELECT-UX.md v1.0.0 + SELECT-UI.md v1.0.0
empreinte: sha256:6c39265f766658fd
regles: {loi: 8, preference: 3, non_qualifie: 0}
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

- **[préférence]** Le select est réservé au choix unique dans une liste assez longue ou encombrante pour justifier d'être repliée ; en deçà du seuil retenu d'environ cinq options comparables d'un coup d'œil, le choix est présenté en radios visibles, une saisie libre relève du champ de texte et une bascule à effet immédiat du switch. `SELECT-R01`
  - vérifiable : aucun select ne porte un choix binaire ni une saisie libre
- **[loi]** Le déclencheur d'un select affiche la valeur actuellement sélectionnée, ou à défaut un placeholder neutre qui n'est ni une option sélectionnable ni une valeur soumissible, et jamais une étiquette figée qui masquerait la sélection. `SELECT-R02`
  - vérifiable : le texte du déclencheur change à chaque changement de valeur ; l'option de placeholder porte une valeur vide et ne satisfait pas une contrainte de champ requis
  - source : https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element
- **[loi]** La liste d'un select est un superposé non modal : ancrée à son déclencheur, sans voile, sans piège de focus, refermée aussi bien par Échap que par un clic ou un focus à l'extérieur, et rendant le focus au déclencheur à la fermeture. `SELECT-R03`
  - vérifiable : Échap et un clic extérieur ferment la liste ; aucun piège de focus n'est posé ; le focus revient au déclencheur après fermeture
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
- **[loi]** À l'ouverture de la liste, l'option sélectionnée — ou la première à défaut — devient l'option active sans que le focus du document quitte le déclencheur : l'option active est désignée par aria-activedescendant et rendue visible dans la liste. `SELECT-R04`
  - vérifiable : à l'ouverture, aria-activedescendant du déclencheur désigne l'option sélectionnée ou la première ; le focus du document reste sur le déclencheur
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
- **[loi]** Le select est intégralement opérable au clavier selon le motif combobox à sélection seule : fermé, les flèches, Entrée, Espace et toute frappe de caractère l'ouvrent, la frappe présélectionnant par correspondance ; ouvert, les flèches déplacent l'option active, Début et Fin vont aux extrêmes, Entrée et Espace sélectionnent et ferment, Échap ferme sans changer la valeur et Tab ferme en validant l'option active. `SELECT-R05`
  - vérifiable : chaque touche du motif combobox à sélection seule produit l'effet prescrit ; aucune fonction du select n'exige le pointeur
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
- **[loi]** Le déclencheur d'un select expose role=combobox, aria-expanded et une relation programmatique vers sa liste, et son nom accessible reprend le libellé visible ; la liste expose role=listbox, chaque option role=option avec son état de sélection, et la valeur choisie est restituée comme nom et valeur du combobox. `SELECT-R06`
  - vérifiable : le déclencheur porte role=combobox, aria-expanded et aria-controls vers la liste ; son nom accessible contient le libellé visible ; chaque option porte role=option et aria-selected
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
- **[loi]** Le select distingue visuellement trois choses différentes — l'option survolée, l'option active et l'option sélectionnée — et expose ses états : désactivé et alors non focalisable, vide et alors signalé par un placeholder neutre, en erreur et alors signalé sans que le select prenne en charge l'orchestration du message. `SELECT-R07`
  - vérifiable : survol, option active et option sélectionnée se distinguent chacun par au moins une propriété visuelle ; un select désactivé n'est pas atteignable au clavier
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/

## Non couvert — poser la question, ne rien trancher

- Options groupées : Regrouper par catégorie.
- Recherche dans la liste (combobox éditable) : Saisie qui filtre les options.
- Multi-sélection : Plusieurs valeurs à la fois.
