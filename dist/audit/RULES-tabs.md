---
sujet: tabs
nature: components
resume: "Des onglets **découpent un même objet en vues exclusives** : un seul volet visible à la fois, et"
selon-contexte: [accessibility, border, button, link, motion, navigation]
source: TABS-UX.md v1.0.0 + TABS-UI.md v1.0.0
empreinte: sha256:8c0c4165f16c2148
regles: {loi: 0, preference: 0, non_qualifie: 30}
---
# RULES — tabs (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** les onglets s'appliquent à un **seul objet** dont les volets sont des **vues alternatives**,
- **[non qualifié]** les onglets **mentent** dans quatre cas fréquents — ne pas les utiliser quand :
- **[non qualifié]** Tabs et Accordion partagent la disclosure ; ils divergent sur l'**exclusivité**. Tabs = **un
- **[non qualifié]** un signe de mauvais choix : l'utilisateur qui ouvre systématiquement tous les onglets un par
- **[non qualifié]** Tabs change de **vue**, pas de **page** — même URL (sauf deep-link explicite, voir plus
- **[non qualifié]** si un produit a besoin que chaque volet soit **partageable par URL**, **indexable** ou
- **[non qualifié]** le nombre d'onglets reste **restreint** — au-delà d'un jeu qui tient sur une seule ligne dans
- **[non qualifié]** **jamais d'onglets sur deux lignes.** Un jeu d'onglets qui retombe à la ligne perd
- **[non qualifié]** le libellé d'un onglet est **court**, **nominal** — un nom, jamais une phrase complète et
- **[non qualifié]** l'onglet courant se signale par un **canal non chromatique** en plus de la couleur — poids
- **[non qualifié]** `aria-selected` porte l'état programmatique — le canal visuel n'est pas la seule source de
- **[non qualifié]** deux modes d'activation coexistent (ARIA APG) — **automatique** (le volet suit le focus : se
- **[non qualifié]** le critère de choix est le **coût de montage du volet**. Si les volets sont déjà en mémoire
- **[non qualifié]** la tablist porte `role="tablist"`, chaque onglet `role="tab"`, chaque volet
- **[non qualifié]** à l'intérieur de la tablist, les **flèches gauche/droite** déplacent le focus d'onglet en
- **[non qualifié]** le **volet est focalisable** (`tabindex="0"` sur le conteneur du volet) même s'il ne
- **[non qualifié]** par défaut, le volet **non courant est démonté** (retiré du DOM), pas seulement masqué —
- **[non qualifié]** si un volet contient une **saisie utilisateur** (formulaire, filtre, brouillon) que la
- **[non qualifié]** sans valeur initiale explicite, **le premier onglet monté prend la main** — un jeu
- **[non qualifié]** quand un onglet précis doit être atteint depuis l'extérieur de la page (lien externe,
- **[non qualifié]** le **survol/repos/courant** relève de `color` (rôles), le **poids et le trait** de

## Non couvert — poser la question, ne rien trancher

- Comparateur de plans tarifaires : Deux offres à regarder en même temps, pas l'une après l'autre.
- Formulaire long découpé en onglets : Champs d'une même soumission répartis en volets exclusifs.
- Deux volets à comparer côte à côte : Le contenu masqué est précisément ce qu'on veut voir en même temps.
- Contenu cherché au Cmd+F : Le volet non monté ou masqué échappe à la recherche de page.
- Un seul volet disponible : Un onglet unique n'est pas un choix — habillage inutile.
- Étapes d'un parcours imposé : Ordre contraint, pas de bascule libre — c'est un stepper.
- Sujets sans rapport logés côte à côte : Les volets ne décrivent pas le même objet.
- Onglet désactivé : Fonctionnalité verrouillée (plan, permission) rendue non activable.
- Widget avec scroll interne à préserver : Position de défilement à conserver entre deux visites du volet.
- Badge de compteur sur un onglet : Ex. « Messages (3) » — affichage d'un nombre sur le libellé.
- Regroupement multi-ouvert : Plusieurs sections ouvertes à la fois.
- Bascule partageable par URL à chaque clic : Historique poussé à chaque changement de volet.
- Superposé qui recouvre et piège : Contenu qui masque le reste de l'écran.
