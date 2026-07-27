---
component: select
layer: ux
type: component
version: 1.0.0 # 1.0.0 : première rédaction — INPUT-UX renvoyait déjà « un choix parmi des options prédéfinies et limitées » au select (l.71) ; besoin réel : sélecteur de site + réglages du rail d'outils du shell (2026-07-24). Liste en popover NON-MODAL (consomme la fondation overlay, lot C). Motif clavier : ARIA APG « select-only combobox ». Périmètre arbitré : mono-sélection ; multi/recherche différés. Cf. DECISIONS.md 2026-07-24.
last_updated: 2026-07-24
companion: SELECT-UI.md
confidence: mixed # le motif combobox/listbox et son clavier sont établis (ARIA APG) ; le seuil select vs radio est un repère convergent, pas une loi.
---

# Select — Couche UX (composant)

> Choisir **une** valeur parmi un ensemble **prédéfini et limité**. INPUT renvoie ici dès que le choix n'est
> pas une saisie libre. Un **déclencheur** (qui montre la valeur choisie) ouvre une **liste** (listbox) en
> **popover non-modal** — la fondation `overlay` en porte l'ancrage, le light-dismiss et l'empilement.

## Quand un select (et quand autre chose)

RÈGLE : **select** pour un choix unique dans une liste **longue ou encombrante** à déplier à la demande.
Pour **peu d'options** (repère ≈ 2-5) toutes utiles à comparer d'un coup, préférer des **radios** visibles ;
pour une saisie libre, c'est un **input** ; pour activer/désactiver une fonction tout de suite, un **switch**.

RÈGLE : le déclencheur **montre la valeur courante** (ou un placeholder neutre si aucun choix), jamais une
étiquette figée qui masque ce qui est sélectionné. Le placeholder n'est pas une option sélectionnable.

## Comportement de la liste (popover non-modal)

RÈGLE : la liste est un superposé **non-modal** (fondation overlay) : **ancrée au déclencheur**, **sans
voile**, **sans piège de focus**, fermée en **light-dismiss** (Échap **ou** clic/focus en dehors) ; elle
applique `z-index.popover` et rend le focus au déclencheur à la fermeture.

RÈGLE : à l'ouverture, l'option **sélectionnée** (ou la première) devient l'option **active** ; la liste ne
vole pas le focus au sens modal — le focus reste géré par `aria-activedescendant` sur le déclencheur.

## Clavier (motif « select-only combobox », ARIA APG)

RÈGLE : déclencheur fermé — **↓ / ↑ / Entrée / Espace** ouvrent ; une **frappe de caractère** ouvre et
présélectionne par correspondance (type-ahead). Ouvert — **↑ ↓** déplacent l'option active, **Début / Fin**
vont aux extrêmes, **Entrée / Espace** sélectionnent et ferment, **Échap** ferme sans changer, **Tab**
ferme en validant l'option active.

## Rôle, nom, valeur

RÈGLE : le déclencheur porte `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` et son **nom
accessible reprend le libellé visible** ; la liste est un `listbox`, chaque option un `option` avec
`aria-selected`. La valeur choisie est annoncée par le nom/valeur du combobox (renvoi ACCESSIBILITY, INPUT).

## États

RÈGLE : **désactivé** (non focalisable, contraste réduit assumé), **erreur** (bordure et message d'erreur
sont l'affaire de FORM/INPUT — le select expose l'état, l'orchestration appartient au formulaire), **vide**
(placeholder neutre). Le survol d'une option et l'option active sont **distincts** de l'option sélectionnée.

## Frontières

RÈGLE : l'**ancrage, le light-dismiss, le z-index** de la liste relèvent d'`overlay` (non-modal) ; le
**requis et la validation** relèvent de `form` ; le **chevron** relève d'`iconography` ; la **saisie libre**
relève d'`input` (un select n'est pas un champ de texte) ; le **mot** d'un libellé relève de `voice`.

## Sources et niveau de confiance (couche UX)
| Affirmation | Source | Confiance |
|---|---|---|
| Déclencheur combobox + listbox, clavier (↑↓ Début/Fin Entrée Échap, type-ahead) | [ARIA APG — Select-Only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/) | Établi |
| Liste ancrée non-modale, light-dismiss | [Carbon — Dropdown / Popover](https://carbondesignsystem.com/components/dropdown/usage/) | Établi |
| Seuil select vs radios (peu d'options → radios visibles) | [NN/g — Listbox vs Radio](https://www.nngroup.com/articles/drop-down-menus/) | Convergent, pas une loi |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence interne, ergonomie).*
