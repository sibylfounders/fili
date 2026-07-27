---
sujet: cognitive-load
nature: principles
resume: "Ce fichier pose les **obligations universelles de charge cognitive** : ce que tout écran, composant, pattern et flow doit respecter pour que l'interface n'impose jamais plus de travail mental que…"
selon-contexte: [laws]
source: COGNITIVE-LOAD-UX.md v1.0.0
empreinte: sha256:a37e3e0b06bc6441
regles: {loi: 7, preference: 8, non_qualifie: 0}
---
# RULES — cognitive-load (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Tout écran ou toute vue déclare une décision principale et une seule ; les choix secondaires, réglages et chemins alternatifs lui sont subordonnés visuellement et structurellement. `COGNITIVE-LOAD-R05`
  - vérifiable : une seule décision principale déclarée par écran ou vue ; une seule action de rang primaire rendue
- **[préférence]** Le nombre de choix simultanés se justifie par le besoin de la décision présente et jamais par la place disponible : un conteneur plus large peut révéler du contenu secondaire, il n'autorise aucune décision nouvelle. `COGNITIVE-LOAD-R06`
  - vérifiable : aucune décision nouvelle introduite par un palier de largeur ; les paliers ne font varier que la révélation de contenu
- **[loi]** Une interface montre par défaut ce qui est nécessaire à la décision présente ; l'avancé, le rare et le détail ne se révèlent que sur demande explicite de l'utilisateur. `COGNITIVE-LOAD-R07`
  - vérifiable : aucun contenu classé avancé ou rare n'est rendu à l'état initial de la vue
  - source : https://www.nngroup.com/articles/progressive-disclosure/
- **[préférence]** La divulgation progressive ne masque jamais une information nécessaire pour décider : un coût, un engagement, une obligation ou un risque est visible avant l'action qui engage. `COGNITIVE-LOAD-R08`
  - vérifiable : toute information de coût, d'engagement, d'obligation ou de risque est rendue dans la même vue que l'action qui engage, sans interaction de révélation préalable
- **[préférence]** Une fonction essentielle reste découvrable sans connaissance préalable : réduire le nombre de choix visibles ne justifie jamais d'enfouir une fonction, et le doute se remonte au lieu de se trancher par principe. `COGNITIVE-LOAD-R09`
- **[préférence]** Tout choix qui admet une réponse majoritaire sensée porte une valeur par défaut, afin que l'utilisateur corrige une proposition plutôt qu'il ne construise une réponse à vide. `COGNITIVE-LOAD-R10`
  - vérifiable : tout champ ou réglage dont une réponse majoritaire est identifiée expose une valeur par défaut
- **[loi]** Aucune valeur par défaut n'engage l'utilisateur à son insu : consentement, achat, abonnement et partage ne sont jamais pré-cochés, le consentement résultant toujours d'un acte positif de l'utilisateur. `COGNITIVE-LOAD-R11`
  - vérifiable : aucune case de consentement, d'achat, d'abonnement ou de partage n'est cochée à l'état initial
- **[loi]** Une valeur par défaut se distingue toujours d'une valeur saisie par l'utilisateur : le pré-remplissage est annoncé et un texte indicatif ne tient jamais lieu de valeur. `COGNITIVE-LOAD-R12`
  - vérifiable : tout champ pré-rempli porte une indication de pré-remplissage ; aucune valeur portée par le seul texte indicatif
  - source : https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html
- **[préférence]** Une action réversible s'exécute immédiatement et offre un chemin d'annulation visible pendant un délai raisonnable ; la confirmation bloquante est réservée à l'action irréversible ou coûteuse à défaire. `COGNITIVE-LOAD-R13`
  - vérifiable : aucune confirmation bloquante sur une action réversible ; toute action réversible expose une commande d'annulation visible
- **[loi]** Une action irréversible déclare avant son exécution ce qu'elle détruit, sa portée et l'absence de retour ; à défaut d'être réversible, elle est vérifiée et confirmée avant d'être finalisée. `COGNITIVE-LOAD-R14`
  - vérifiable : toute action qui engage juridiquement, engage financièrement ou détruit des données est réversible, vérifiée, ou confirmée avant finalisation
  - source : https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html
- **[loi]** Une saisie en cours survit à la navigation, à l'interruption et à l'expiration : quand la conservation n'est pas garantie, l'utilisateur est averti de la durée d'inactivité qui entraînerait la perte, et toute limite de temps reste ajustable. `COGNITIVE-LOAD-R15`
  - vérifiable : données conservées au-delà de 20 heures d'inactivité, ou avertissement explicite de la durée entraînant la perte ; toute limite de temps désactivable, ajustable ou prolongeable
  - source : https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html
- **[préférence]** Une commande d'annulation n'est affichée que si l'annulation est techniquement garantie ; à défaut, le système demande une confirmation honnête plutôt que de proposer une annulation fictive. `COGNITIVE-LOAD-R16`
  - vérifiable : toute commande d'annulation exposée est adossée à une opération d'annulation effective
- **[loi]** Aucune information nécessaire à une décision n'est à retenir d'un écran à l'autre : le contexte requis est re-présenté là où la décision se prend. `COGNITIVE-LOAD-R17`
  - vérifiable : toute donnée nécessaire à une étape est affichée dans cette étape, sans dépendance à la mémorisation d'un écran précédent
  - source : https://www.nngroup.com/articles/ten-usability-heuristics/
- **[loi]** L'interface montre l'état plutôt qu'elle ne le fait mémoriser : où l'utilisateur en est, ce qui est fait et ce qui reste sont visibles à tout moment. `COGNITIVE-LOAD-R18`
  - vérifiable : tout parcours à plusieurs étapes affiche l'étape courante, les étapes faites et les étapes restantes
  - source : https://www.nngroup.com/articles/ten-usability-heuristics/
- **[préférence]** Une information critique — erreur, coût, sécurité, obligation légale — ne prend jamais la forme d'un élément décoratif ou promotionnel, sous peine d'être filtrée avant lecture. `COGNITIVE-LOAD-R19`
  - vérifiable : aucun message critique rendu avec les styles, placements ou composants réservés au contenu promotionnel ou décoratif

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Divulgation retournée en dissimulation (coût, engagement caché) | Dark pattern — confiance détruite, enjeu légal | Élevée |
| Défaut pré-coché d'engagement | Consentement invalide (RGPD), enjeu légal direct | Élevée |
| « Annuler » affiché mais non garanti techniquement | Perte réelle + promesse trahie — pire qu'une confirmation | Élevée |
| « Une décision par écran » appliqué mécaniquement | Parcours émietté, complexité déplacée (Tesler ignoré) | Moyenne à élevée |
| Plafond numérique inventé pour trancher (« max 7 ») | Décision justifiée par un mythe réfuté au catalogue | Moyenne |
| Confirmation banalisée sur le réversible | Fatigue de confirmation — le garde-fou ne protège plus l'irréversible | Moyenne |
