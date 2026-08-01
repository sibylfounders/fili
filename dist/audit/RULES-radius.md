---
sujet: radius
nature: foundations
resume: "Ce fichier contient le raisonnement : ce que le rayon suit, l'imbrication, le pill."
selon-contexte: [alert, border, button, card, input]
source: RADIUS-UX.md v1.2.0 + RADIUS-UI.md v1.1.0
empreinte: sha256:35a8026c523b0e2c
regles: {loi: 2, preference: 7, non_qualifie: 0}
---
# RULES — radius (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Le rayon est une propriété d'identité et non d'état : il ne varie jamais entre repos, survol, focus, erreur ou sélection. `RADIUS-R02`
  - vérifiable : rayon identique au repos et dans tous les états d'un même composant
- **[préférence]** Le cran de rayon se choisit selon la taille et le type du composant, sur une échelle fermée et croissante. `RADIUS-R03`
  - vérifiable : chaque composant résout un cran de l'échelle ; aucune valeur de rayon en dur
  - critère : `chaque_valeur("border-radius,border-*-radius") dans(radius.*)`
- **[préférence]** Le rayon n'est jamais dérivé d'un pourcentage ni d'une fraction de la hauteur : c'est un cran choisi, qui ne croît pas proportionnellement à la taille. `RADIUS-R04`
  - vérifiable : aucun rayon exprimé en pourcentage ou calculé depuis la hauteur
- **[préférence]** Deux contrôles de même taille voisins dans une même composition partagent le même cran de rayon. `RADIUS-R05`
  - vérifiable : contrôles de même taille d'un même groupe : même token de rayon
- **[loi]** Un coin intérieur n'est jamais plus rond que le coin extérieur qui le contient : au contact il épouse le rayon extérieur, à distance il vaut le rayon extérieur moins l'écart. `RADIUS-R06`
  - vérifiable : rayon interne ≤ rayon externe ; cas concentrique : rayon interne = rayon externe − écart
  - source : https://www.w3.org/TR/css-backgrounds-3/
- **[loi]** Un anneau posé à l'extérieur d'un composant prend pour rayon celui du composant augmenté de son écart. `RADIUS-R07`
  - vérifiable : rayon de l'anneau de focus = rayon du composant + écart de focus
  - source : https://www.w3.org/TR/css-backgrounds-3/
- **[préférence]** Le rayon plein est réservé aux contenus mono-ligne dont la forme est intrinsèquement une pilule ; aucun contrôle ni contenu susceptible de passer en multiligne ne le prend. `RADIUS-R08`
  - vérifiable : aucun composant de type contrôle ni contenu multiligne ne consomme le rayon plein
- **[préférence]** L'angle droit n'a pas de token dans l'échelle : rien n'est carré par défaut, et un besoin réel devrait ajouter explicitement un cran nul. `RADIUS-R10`
  - vérifiable : l'échelle de rayon ne comporte aucun cran de valeur 0
- **[préférence]** Le rayon suit la taille du composant et rien d'autre : ni son importance, ni son état, ni une préférence locale d'écran. `RADIUS-R12`

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Rayons dépareillés dans un même groupe de contrôles | Formulaire visuellement disparate, perçu comme cassé | Moyenne |
| Imbrication non concentrique | "Oreilles" dans les coins, finition perçue dégradée | Moyenne |
| Pill sur multiligne | Forme de stade, lisibilité du contour perdue | Moyenne |
| Rayon dérivé en % de la hauteur | Pill accidentel, courbures dissonantes | Faible à moyenne |
| Rayon qui change à l'état | Le composant semble se déformer | Faible |
