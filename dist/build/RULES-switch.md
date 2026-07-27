---
sujet: switch
nature: components
resume: "Activer ou désactiver **une fonction, tout de suite**."
selon-contexte: [border]
source: SWITCH-UX.md v1.0.0 + SWITCH-UI.md v1.0.0
empreinte: sha256:77b26f89f1d9ef33
regles: {loi: 5, preference: 1, non_qualifie: 0}
---
# RULES — switch (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un switch est réservé aux bascules binaires dont l'effet est immédiat et n'appelle aucune validation ; une sélection binaire qui n'est appliquée qu'à la soumission d'un formulaire est une case à cocher, et l'un ne se substitue jamais à l'autre. `SWITCH-R01`
- **[loi]** L'état d'un switch se lit à un canal non chromatique — la position du pouce sur la piste — en plus de toute variation de couleur, et un libellé d'état accompagne la bascule quand la conséquence de l'état n'est pas évidente. `SWITCH-R03`
- **[loi]** Un switch porte un libellé qui nomme ce qu'il gouverne ; ce libellé est cliquable, il est contenu dans le nom accessible du contrôle, et les états désactivé et focalisé restent perceptibles. `SWITCH-R04`
- **[loi]** Un switch expose role=switch et aria-checked, bascule à la barre d'espace, et notifie son changement d'état par aria-checked plutôt que par le seul déplacement visuel du pouce. `SWITCH-R05`

## Consignes d'implémentation

- **[préférence]** La piste d'un switch est une pilule et son pouce un disque inscrit séparé des bords par un retrait constant ; l'état inactif oppose une piste de surface bordée à au moins 3:1 et un pouce de fond, l'état actif une piste primaire et un pouce en couleur sur primaire, la transition empruntant les tokens de mouvement. `SWITCH-U01`
- **[loi]** Quelle que soit la taille visuelle de la piste, la zone interactive d'un switch — libellé cliquable compris — atteint le seuil de cible renforcé de 44 × 44 px CSS. `SWITCH-U03`

## Non couvert — poser la question, ne rien trancher

- vs Checkbox : Sélection validée à la soumission d'un formulaire.
- vs Radio : Choix exclusif parmi plusieurs.
- Bascule qui appelle le serveur (asynchrone) : État d'attente, retour arrière si échec.
