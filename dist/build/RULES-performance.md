---
sujet: performance
nature: principles
resume: "Ce fichier pose le **contrat des attentes** : ce que l'interface montre, dit et promet pendant que le système travaille."
selon-contexte: [laws]
source: PERFORMANCE-UX.md v1.0.1
empreinte: sha256:b14fd85a642c0639
regles: {loi: 6, preference: 8, non_qualifie: 0}
---
# RULES — performance (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une réponse obtenue en moins de 100 ms n'affiche aucun indicateur d'attente : le feedback d'activation du contrôle suffit, et tout indicateur y fabrique de la lenteur perçue. `PERFORMANCE-R06`
- **[préférence]** Entre 100 ms et 1 s, l'attente se signale localement par un changement d'état du seul élément déclencheur, sans indicateur global ni blocage d'écran. `PERFORMANCE-R07`
- **[loi]** Toute attente dépassant 1 s est rendue perceptible visuellement et annoncée aux technologies d'assistance par un message d'état programmatiquement déterminable sans prise de focus, l'interface restant utilisable partout où l'attente ne bloque pas réellement. `PERFORMANCE-R08`
- **[loi]** Au-delà de 10 s, ou dès que la durée est longue et inconnue, l'attente devient un état à part entière portant une progression réelle ou une estimation honnête, la possibilité de poursuivre une autre tâche quand c'est techniquement vrai, et un délai d'expiration toujours défini. `PERFORMANCE-R09`
- **[loi]** Un indicateur d'attente n'apparaît pas au premier instant : il est différé d'un court délai afin de laisser passer sans bruit les réponses rapides, et reste affiché une durée minimale perceptible une fois montré. `PERFORMANCE-R10`
- **[préférence]** Ce qui permet de décider ou d'agir s'affiche en premier — le contenu principal avant l'accessoire, la structure avant le détail — et le squelette de chargement promet exactement la structure qui va arriver, à l'endroit où elle arrivera. `PERFORMANCE-R11`
- **[loi]** Un contenu qui arrive tardivement ne déplace jamais ce qui est déjà affiché : son espace est réservé d'avance ou son arrivée est neutre pour la mise en page, afin qu'aucune lecture ne soit perdue et qu'aucun geste déjà engagé ne soit détourné. `PERFORMANCE-R12`
- **[préférence]** Une interface ne peut afficher le succès avant confirmation du serveur qu'à trois conditions cumulées : l'action est réversible ou rejouable sans dommage, son succès est très probable, et tout échec éventuel est réparé visiblement. `PERFORMANCE-R13`
- **[préférence]** L'affichage optimiste est interdit sur les actions irréversibles, les paiements, les engagements juridiques et toute action dont l'échec coûterait plus que l'attente économisée : ces actions attendent leur confirmation réelle. `PERFORMANCE-R14`
- **[préférence]** Un succès affiché de façon optimiste reste, pour le système, un état en cours : il n'est jamais re-présenté comme définitif à un endroit où l'utilisateur fonderait sur lui une décision irréversible. `PERFORMANCE-R15`
- **[loi]** Aucune progression affichée n'est déconnectée du travail réel : la barre est déterminée quand l'avancement est mesurable, indéterminée sinon, aucune étape n'est ajoutée au seul bénéfice de l'affichage, et une estimation de durée ne s'affiche que si elle est honnête. `PERFORMANCE-R16`
- **[préférence]** Aucune attente n'est fabriquée : quand le système peut répondre instantanément, il répond instantanément, et la mise en scène du travail n'est jamais employée pour augmenter la valeur perçue. `PERFORMANCE-R17`
- **[préférence]** Une attente qui dépasse la durée attendue le dit explicitement à l'utilisateur et lui ouvre une issue — réessayer, poursuivre ailleurs, être prévenu — plutôt que de laisser un indicateur tourner sans fin. `PERFORMANCE-R18`
- **[préférence]** Le temps de l'utilisateur est traité comme la ressource la plus chère que le produit dépense : chaque attente est un emprunt remboursé par un feedback au bon seuil, une structure stable, un optimisme mérité et une honnêteté totale, jamais par une mise en scène. `PERFORMANCE-R20`
