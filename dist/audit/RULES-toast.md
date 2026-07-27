---
sujet: toast
nature: components
resume: "Ce fichier contient le raisonnement : tone, timing, actions, empilement, position, instrument"
selon-contexte: [adaptive, alert, button, emotion, motion, voice]
source: TOAST-UX.md v1.0.0 + TOAST-UI.md v1.1.0
empreinte: sha256:db75eae28a834e4b
regles: {loi: 7, preference: 23, non_qualifie: 0}
---
# RULES — toast (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Le toast confirme l'issue immédiate d'une action déclenchée par l'utilisateur lorsque cette confirmation n'a pas besoin de rester consultable. `TOAST-R05`
  - source : https://fluent2.microsoft.design/components/web/react/core/toast/usage
- **[loi]** Le toast n'est employé ni pour une condition qui dure, ni pour une décision qui doit bloquer l'utilisateur, ni pour du contenu promotionnel. `TOAST-R06`
  - vérifiable : aucun toast n'est émis sans être la conséquence directe d'une action de l'utilisateur
  - source : https://fluent2.microsoft.design/components/web/react/core/toast/usage
- **[préférence]** Le toast porte l'un des quatre tones info, success, warning ou danger, identiques à ceux de l'alert ; il n'existe pas de tone neutre. `TOAST-R08`
  - vérifiable : l'énumération des tones vaut exactement info, success, warning, danger
- **[préférence]** Les tones warning et danger sont autorisés sur un toast à la seule condition que la condition grave dispose d'un répondant durable ailleurs dans l'interface ; un toast n'est jamais l'unique porteur d'un état qui persiste. `TOAST-R09`
  - vérifiable : tout toast de tone danger ou warning s'accompagne d'un changement d'état visible ou d'un alert de relais
- **[loi]** Le minuteur d'un toast se suspend intégralement au survol du pointeur et au focus clavier, et ne reprend son décompte qu'à leur sortie. `TOAST-R10`
  - vérifiable : le temps restant est identique avant et après une période de survol ou de focus
  - source : https://fluent2.microsoft.design/components/web/react/core/toast/usage
- **[loi]** Un toast n'est jamais le seul porteur d'une information : l'état qu'il confirme reste lisible dans l'écran sous-jacent après sa disparition. `TOAST-R11`
  - vérifiable : l'information portée par le toast reste atteignable dans l'interface après son expiration
  - source : https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html
- **[préférence]** La durée d'affichage d'un toast ne descend jamais sous cinq secondes, qu'il porte une action ou non. `TOAST-R12`
  - vérifiable : durée d'affichage >= 5000 ms
- **[préférence]** Un toast porte au plus une action ; il n'expose jamais une seconde sortie ni un second lien. `TOAST-R13`
  - vérifiable : nombre d'éléments interactifs d'action par toast <= 1
- **[préférence]** L'action d'un toast est soumise à la même suspension de minuteur que son texte, afin que la fenêtre de décision annoncée reste effective au survol comme au focus clavier. `TOAST-R14`
  - vérifiable : le focus sur l'action suspend le minuteur du toast qui la porte
- **[préférence]** Au plus trois toasts sont affichés simultanément. `TOAST-R16`
  - vérifiable : nombre de toasts simultanément visibles <= 3
- **[préférence]** Une pile de toasts s'ordonne par ordre chronologique d'arrivée et non par gravité décroissante, contrairement à une pile d'alerts qui empile des conditions simultanément vraies. `TOAST-R17`
  - vérifiable : l'ordre d'affichage reproduit l'ordre d'émission
- **[préférence]** Lorsque le plafond d'empilement est atteint, le toast le plus ancien sort ; les toasts ne sont jamais agrégés en un message de synthèse. `TOAST-R18`
  - vérifiable : aucun toast ne résume plusieurs événements
- **[préférence]** La position et la largeur d'un toast sont déterminées par l'espace du conteneur qui l'héberge et non par un ancrage fixe à un coin du viewport. `TOAST-R19`
  - vérifiable : aucune valeur de position exprimée en unités de viewport dans la région de toasts
- **[préférence]** Le moment E-motion « réussite d'un envoi ou d'une soumission » s'incarne dans le toast et non dans l'alert. `TOAST-R21`
- **[préférence]** L'instrument illustration ne s'active que sur un toast seul à l'écran, jamais sur un toast qui rejoint une pile existante. `TOAST-R22`
  - vérifiable : aucune animation d'instrument déclenchée lorsque le nombre de toasts visibles est supérieur à un
- **[loi]** Un toast confirme un événement passé et ne peut jamais être le seul endroit où vit une information qui compte encore. `TOAST-R27`
  - source : https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html
