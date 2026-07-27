---
sujet: switch
nature: components
resume: "Activer ou désactiver **une fonction, tout de suite**."
selon-contexte: [border]
source: SWITCH-UX.md v1.0.0 + SWITCH-UI.md v1.0.0
empreinte: sha256:b995854a511579af
regles: {loi: 0, preference: 0, non_qualifie: 10}
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

- **[non qualifié]** **switch** = l'action prend effet **immédiatement** (un réglage, le mode sombre, une notification
- **[non qualifié]** l'effet immédiat implique qu'il n'y a **rien à soumettre** — le switch n'attend pas un envoi. Si la
- **[non qualifié]** l'état on/off se lit d'abord à la **position** du pouce (gauche/droite), pas seulement à la couleur
- **[non qualifié]** le switch porte un **libellé** qui dit ce qu'il gouverne ; ce libellé est cliquable et fait partie
- **[non qualifié]** `role="switch"` + `aria-checked` (true/false) ; **Espace** (et Entrée) **basculent** ; le nom
- **[non qualifié]** la **couleur** des états relève de `color` ; le **mouvement** du pouce relève de `motion` ; l'**anneau

## Non couvert — poser la question, ne rien trancher

- vs Checkbox : Sélection validée à la soumission d'un formulaire.
- vs Radio : Choix exclusif parmi plusieurs.
- Bascule qui appelle le serveur (asynchrone) : État d'attente, retour arrière si échec.
