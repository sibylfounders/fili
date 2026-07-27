---
sujet: grid
nature: foundations
resume: "Ce fichier porte le raisonnement du **cadre de page** : quelle largeur maximale un conteneur doit"
selon-contexte: [collection]
source: GRID-UX.md v1.2.0 + GRID-UI.md v1.2.0
empreinte: sha256:87af549ad571e494
regles: {loi: 2, preference: 20, non_qualifie: 0}
---
# RULES — grid (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Tout conteneur de page borné tire sa largeur maximale d'un token de conteneur nommé, jamais d'une valeur brute ni d'un point de rupture détourné en largeur. `GRID-R01`
- **[préférence]** Un écran de saisie mono-colonne focalisée applique le cran de conteneur le plus étroit et se centre. `GRID-R02`
- **[préférence]** Une page de contenu ou d'application à colonne unique applique le cran de conteneur intermédiaire. `GRID-R03`
- **[préférence]** Une surface dense assumée applique le cran de conteneur le plus large, qui reste borné au lieu de suivre la fenêtre indéfiniment. `GRID-R04`
- **[préférence]** Un élément décoratif ou immersif peut délibérément déborder le conteneur, ce débordement étant déclaré comme une intention et non subi. `GRID-R05`
- **[préférence]** Le contenu lisible ou actionnable placé dans un bloc pleine largeur se re-borne sur un conteneur nommé et ne s'étale jamais d'un bord à l'autre. `GRID-R06`
- **[préférence]** Un conteneur borné se centre par marges automatiques symétriques dès que la fenêtre dépasse sa borne. `GRID-R07`
- **[préférence]** La marge entre le conteneur et le bord de la fenêtre est prise dans l'échelle d'espacement et n'introduit aucune valeur propre à la grille. `GRID-R08`
- **[préférence]** Un conteneur imbriqué dans un conteneur déjà borné hérite de la largeur du parent et n'applique ni seconde largeur maximale ni seconde marge de page. `GRID-R09`
- **[loi]** En dessous de sa borne, un conteneur occupe la largeur disponible moins la marge de page, et aucun contenu ne provoque de défilement horizontal à 320 px CSS de large. `GRID-R10`
- **[loi]** Le passage d'un régime de largeur à l'autre ne retire ni n'altère aucune information ni fonctionnalité, et ne restreint pas l'usage à une seule orientation. `GRID-R11`
- **[préférence]** Un shell applicatif se compose d'un rail de navigation, d'une colonne de contenu qui applique le cadre de page, et d'un rail d'outils secondaire. `GRID-R16`
- **[préférence]** Chaque rail tire sa largeur d'un token dédié à largeur fixe, la colonne de contenu prenant l'espace restant. `GRID-R17`
- **[préférence]** Quand la largeur se raréfie, les régions du shell quittent le flux dans l'ordre inverse de leur priorité, la colonne de contenu ne cédant jamais. `GRID-R18`

## Consignes d'implémentation

- **[préférence]** Un conteneur borné applique un token de largeur en largeur maximale et des marges logiques automatiques pour le centrage. `GRID-U01`
- **[préférence]** Le cran de conteneur se choisit sur le contexte fonctionnel documenté en couche UX, non sur l'espace disponible. `GRID-U02`
- **[préférence]** La marge entre le conteneur et le bord de la fenêtre est un remplissage horizontal pris dans l'échelle d'espacement. `GRID-U03`
- **[préférence]** En régime étroit, le conteneur occupe la pleine largeur moins la marge de page, la largeur maximale restant sans effet. `GRID-U04`
- **[préférence]** Un élément pleine largeur neutralise la largeur maximale et la marge de page, tandis que le contenu lisible qu'il abrite se re-borne sur un token de conteneur. `GRID-U05`
- **[préférence]** Chaque rail est un élément non flexible dont la base est un token de largeur de rail, la colonne de contenu étant le seul élément flexible. `GRID-U07`
- **[préférence]** Les seuils de bascule des régions du shell sont des tokens de point de rupture, jamais des largeurs en dur. `GRID-U08`
- **[préférence]** La marge de page s'applique dans la colonne de contenu, tandis que chaque rail porte son propre remplissage et n'hérite pas de la marge de page. `GRID-U10`
