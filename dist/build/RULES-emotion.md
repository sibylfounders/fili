---
sujet: emotion
nature: languages
resume: "La couche d'**expression** du système : les moments où l'interface a le droit de sortir de la rigueur productive pour offrir un instant humain."
selon-contexte: [button, interaction, motion, voice]
source: EMOTION-UX.md v1.1.1 + EMOTION-UI.md v1.2.0
empreinte: sha256:d839b3aa1227266d
regles: {loi: 4, preference: 4, non_qualifie: 0}
---
# RULES — emotion (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Le recours à un moment expressif se justifie par le poids du moment pour l'utilisateur et jamais par une intention décorative : l'intensité de l'expression est proportionnelle à l'importance de l'instant. `EMOTION-R01`
- **[loi]** Un moment expressif ne se déclenche jamais sur une action réflexe ou à haute fréquence, et ne se répète pas plus d'une fois par séquence utile : au-delà, l'animation cesse d'être un signal et devient un obstacle qui allonge la tâche. `EMOTION-R02`
- **[préférence]** Un moment expressif ne se place que sur un moment inscrit au catalogue des moments mérités — réussite d'un envoi, franchissement d'une première fois, cap atteint, sortie d'erreur, vide ou attente assumés — et nulle part ailleurs. `EMOTION-R03`
- **[loi]** Un moment expressif est toujours une amélioration et jamais un canal d'information : l'état qu'il célèbre est exposé indépendamment sous forme statique et programmatiquement déterminable, de sorte que la suppression de l'animation ne retire aucune information. `EMOTION-R05`
- **[loi]** Sous une préférence utilisateur de mouvement réduit, un moment expressif dégrade vers sa version productive ou instantanée — l'état final s'installe sans déplacement — et jamais vers l'absence d'état. `EMOTION-R06`
- **[loi]** Le registre expressif relève le parti pris d'identité mais ne relâche aucune contrainte d'accessibilité : pas plus de trois flashs par seconde, aucun verrouillage de l'action par l'animation, et aucune information portée par le seul mouvement. `EMOTION-R07`
- **[préférence]** Un moment expressif joue sur quatre instruments — mouvement, voix, couleur, forme — dont la couleur puise exclusivement dans les rôles de couleur existants du système, sans jamais introduire de valeur nouvelle. `EMOTION-R08`
- **[préférence]** Les instruments d'un moment expressif se résolvent de manière accordée : la fin du mouvement, le changement de voix et l'installation de la couleur convergent sur le même temps plutôt que de se succéder indépendamment. `EMOTION-R09`

## Non couvert — poser la question, ne rien trancher

- Action réflexe ou à haute fréquence : Une action réflexe ou répétée (hover, navigation, envoi 40 fois par jour).
- Répétition à chaque frappe ou par item de liste : Le même moment serait rejoué en boucle.
- Micro‑interaction purement fonctionnelle : Un feedback purement fonctionnel (press, bordure d'erreur).
- Décor gratuit sans moment : On envisage une animation « pour faire joli ».
- Instruments désaccordés : Mouvement, voix et couleur ne se résolvent pas ensemble.
- E‑motion comme canal d'information : On tenterait de porter un état par la seule animation.
- Effet local copié d'un écran à l'autre : Un CSS expressif est recollé sans gouvernance.
