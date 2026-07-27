---
sujet: switch
nature: components
resume: "Activer ou désactiver **une fonction, tout de suite**."
selon-contexte: [border]
source: SWITCH-UX.md v1.0.0 + SWITCH-UI.md v1.0.0
empreinte: sha256:77b26f89f1d9ef33
regles: {loi: 5, preference: 1, non_qualifie: 0}
---
# RULES — switch (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un switch est réservé aux bascules binaires dont l'effet est immédiat et n'appelle aucune validation ; une sélection binaire qui n'est appliquée qu'à la soumission d'un formulaire est une case à cocher, et l'un ne se substitue jamais à l'autre. `SWITCH-R01`
  - vérifiable : aucun switch n'est accompagné d'un bouton d'application ou d'enregistrement de son propre état
  - source : https://www.nngroup.com/articles/toggle-switch-guidelines/
- **[loi]** L'état d'un switch se lit à un canal non chromatique — la position du pouce sur la piste — en plus de toute variation de couleur, et un libellé d'état accompagne la bascule quand la conséquence de l'état n'est pas évidente. `SWITCH-R03`
  - vérifiable : l'état activé se distingue de l'état désactivé autrement que par la seule couleur
- **[loi]** Un switch porte un libellé qui nomme ce qu'il gouverne ; ce libellé est cliquable, il est contenu dans le nom accessible du contrôle, et les états désactivé et focalisé restent perceptibles. `SWITCH-R04`
  - vérifiable : le nom accessible du switch contient le texte du libellé visible ; un clic sur le libellé bascule le switch
  - source : https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html
- **[loi]** Un switch expose role=switch et aria-checked, bascule à la barre d'espace, et notifie son changement d'état par aria-checked plutôt que par le seul déplacement visuel du pouce. `SWITCH-R05`
  - vérifiable : le contrôle porte role=switch et aria-checked ; la barre d'espace bascule l'état ; aria-checked change à chaque bascule
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/switch/

## Non couvert — poser la question, ne rien trancher

- vs Checkbox : Sélection validée à la soumission d'un formulaire.
- vs Radio : Choix exclusif parmi plusieurs.
- Bascule qui appelle le serveur (asynchrone) : État d'attente, retour arrière si échec.
