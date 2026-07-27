---
sujet: performance
nature: principles
resume: "Ce fichier pose le **contrat des attentes** : ce que l'interface montre, dit et promet pendant que le système travaille."
selon-contexte: [laws]
source: PERFORMANCE-UX.md v1.0.1
empreinte: sha256:b14fd85a642c0639
regles: {loi: 6, preference: 8, non_qualifie: 0}
---
# RULES — performance (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une réponse obtenue en moins de 100 ms n'affiche aucun indicateur d'attente : le feedback d'activation du contrôle suffit, et tout indicateur y fabrique de la lenteur perçue. `PERFORMANCE-R06`
  - vérifiable : aucun indicateur d'attente rendu pour une opération résolue en moins de 100 ms
  - source : https://www.nngroup.com/articles/response-times-3-important-limits/
- **[préférence]** Entre 100 ms et 1 s, l'attente se signale localement par un changement d'état du seul élément déclencheur, sans indicateur global ni blocage d'écran. `PERFORMANCE-R07`
  - vérifiable : attente inférieure à 1 s : indicateur porté par le contrôle déclencheur, aucun overlay ni indicateur de page
- **[loi]** Toute attente dépassant 1 s est rendue perceptible visuellement et annoncée aux technologies d'assistance par un message d'état programmatiquement déterminable sans prise de focus, l'interface restant utilisable partout où l'attente ne bloque pas réellement. `PERFORMANCE-R08`
  - vérifiable : attente > 1 s : indicateur visible ET message d'état exposé via role="status" ou aria-live, sans déplacement du focus
  - source : https://www.nngroup.com/articles/response-times-3-important-limits/
- **[loi]** Au-delà de 10 s, ou dès que la durée est longue et inconnue, l'attente devient un état à part entière portant une progression réelle ou une estimation honnête, la possibilité de poursuivre une autre tâche quand c'est techniquement vrai, et un délai d'expiration toujours défini. `PERFORMANCE-R09`
  - vérifiable : attente supérieure ou égale à 10 s : indicateur de progression déterminé si l'avancement est mesurable, et délai d'expiration explicite ; aucune attente sans borne de temps
  - source : https://www.nngroup.com/articles/response-times-3-important-limits/
- **[loi]** Un indicateur d'attente n'apparaît pas au premier instant : il est différé d'un court délai afin de laisser passer sans bruit les réponses rapides, et reste affiché une durée minimale perceptible une fois montré. `PERFORMANCE-R10`
  - vérifiable : tout indicateur d'attente déclare un délai d'apparition non nul et une durée d'affichage minimale ; aucun cycle apparition-disparition sous le seuil de perception
- **[préférence]** Ce qui permet de décider ou d'agir s'affiche en premier — le contenu principal avant l'accessoire, la structure avant le détail — et le squelette de chargement promet exactement la structure qui va arriver, à l'endroit où elle arrivera. `PERFORMANCE-R11`
  - vérifiable : le squelette reprend l'anatomie et l'emplacement du contenu final ; aucun élément accessoire rendu avant le contenu principal
- **[loi]** Un contenu qui arrive tardivement ne déplace jamais ce qui est déjà affiché : son espace est réservé d'avance ou son arrivée est neutre pour la mise en page, afin qu'aucune lecture ne soit perdue et qu'aucun geste déjà engagé ne soit détourné. `PERFORMANCE-R12`
  - vérifiable : CLS inférieur ou égal à 0,1 au 75e centile ; aucun décalage de mise en page non consécutif à une action de l'utilisateur
- **[préférence]** Une interface ne peut afficher le succès avant confirmation du serveur qu'à trois conditions cumulées : l'action est réversible ou rejouable sans dommage, son succès est très probable, et tout échec éventuel est réparé visiblement. `PERFORMANCE-R13`
  - vérifiable : tout affichage optimiste documente les trois conditions et un chemin de réparation visible en cas d'échec
- **[préférence]** L'affichage optimiste est interdit sur les actions irréversibles, les paiements, les engagements juridiques et toute action dont l'échec coûterait plus que l'attente économisée : ces actions attendent leur confirmation réelle. `PERFORMANCE-R14`
  - vérifiable : aucun rendu optimiste sur une action irréversible, un paiement ou un engagement juridique
- **[préférence]** Un succès affiché de façon optimiste reste, pour le système, un état en cours : il n'est jamais re-présenté comme définitif à un endroit où l'utilisateur fonderait sur lui une décision irréversible. `PERFORMANCE-R15`
  - vérifiable : aucun état optimiste non confirmé utilisé comme condition d'une action irréversible
- **[loi]** Aucune progression affichée n'est déconnectée du travail réel : la barre est déterminée quand l'avancement est mesurable, indéterminée sinon, aucune étape n'est ajoutée au seul bénéfice de l'affichage, et une estimation de durée ne s'affiche que si elle est honnête. `PERFORMANCE-R16`
  - vérifiable : tout indicateur déterminé est piloté par un avancement réellement mesuré ; aucune étape présente uniquement pour alimenter la jauge
  - source : https://www.nngroup.com/articles/progress-indicators/
- **[préférence]** Aucune attente n'est fabriquée : quand le système peut répondre instantanément, il répond instantanément, et la mise en scène du travail n'est jamais employée pour augmenter la valeur perçue. `PERFORMANCE-R17`
  - vérifiable : aucun délai artificiel introduit entre la disponibilité de la réponse et son affichage
- **[préférence]** Une attente qui dépasse la durée attendue le dit explicitement à l'utilisateur et lui ouvre une issue — réessayer, poursuivre ailleurs, être prévenu — plutôt que de laisser un indicateur tourner sans fin. `PERFORMANCE-R18`
  - vérifiable : tout état d'attente prolongée expose un message d'anomalie et au moins une action de sortie
- **[préférence]** Le temps de l'utilisateur est traité comme la ressource la plus chère que le produit dépense : chaque attente est un emprunt remboursé par un feedback au bon seuil, une structure stable, un optimisme mérité et une honnêteté totale, jamais par une mise en scène. `PERFORMANCE-R20`

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Optimisme sur l'irréversible (paiement, suppression) | Perte réelle présentée comme succès | Élevée |
| Fausse progression, étapes gonflées | Confiance détruite quand le mensonge se voit | Élevée |
| Attente > 1 s sans annonce (spinner muet) | Lecteur d'écran sans feedback, double soumission | Élevée |
| Contenu tardif qui déplace la page | Clic volé, lecture perdue | Moyenne à élevée |
| Indicateur instantané sur réponse rapide | Système rapide perçu comme lent | Moyenne |
| Échec post-optimisme réparé en silence | Donnée perdue sans que personne ne le sache | Élevée |
| Attente artificielle « pour faire sérieux » | Temps volé — et le jour où ça se sait, tout le reste devient suspect | Moyenne à élevée |
