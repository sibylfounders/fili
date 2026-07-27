---
sujet: radius
nature: foundations
resume: "Ce fichier contient le raisonnement : ce que le rayon suit, l'imbrication, le pill."
selon-contexte: [alert, border, button, card, input]
source: RADIUS-UX.md v1.1.0 + RADIUS-UI.md v1.1.0
empreinte: sha256:b06ffc5dfc5424dd
regles: {loi: 2, preference: 7, non_qualifie: 0}
---
# RULES — radius (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Le rayon est une propriété d'identité et non d'état : il ne varie jamais entre repos, survol, focus, erreur ou sélection. `RADIUS-R02`
- **[préférence]** Le cran de rayon se choisit selon la taille et le type du composant, sur une échelle fermée et croissante. `RADIUS-R03`
- **[préférence]** Le rayon n'est jamais dérivé d'un pourcentage ni d'une fraction de la hauteur : c'est un cran choisi, qui ne croît pas proportionnellement à la taille. `RADIUS-R04`
- **[préférence]** Deux contrôles de même taille voisins dans une même composition partagent le même cran de rayon. `RADIUS-R05`
- **[loi]** Un coin intérieur n'est jamais plus rond que le coin extérieur qui le contient : au contact il épouse le rayon extérieur, à distance il vaut le rayon extérieur moins l'écart. `RADIUS-R06`
- **[loi]** Un anneau posé à l'extérieur d'un composant prend pour rayon celui du composant augmenté de son écart. `RADIUS-R07`
- **[préférence]** Le rayon plein est réservé aux contenus mono-ligne dont la forme est intrinsèquement une pilule ; aucun contrôle ni contenu susceptible de passer en multiligne ne le prend. `RADIUS-R08`
- **[préférence]** L'angle droit n'a pas de token dans l'échelle : rien n'est carré par défaut, et un besoin réel devrait ajouter explicitement un cran nul. `RADIUS-R10`
- **[préférence]** Le rayon suit la taille du composant et rien d'autre : ni son importance, ni son état, ni une préférence locale d'écran. `RADIUS-R12`
