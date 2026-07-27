---
sujet: modal
nature: components
resume: "La modale est le superposé qui **interrompt** : elle bloque le flux, réclame une décision ou une saisie"
selon-contexte: [button, form, overlay]
source: MODAL-UX.md v1.0.0 + MODAL-UI.md v1.0.1
empreinte: sha256:8af333f61a23f8ed
regles: {loi: 10, preference: 15, non_qualifie: 0}
---
# RULES — modal (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une modale porte toujours une conclusion : au moins une action qui la ferme et clôt la question posée. Un contenu sans fin naturelle — navigation libre, exploration longue, information destinée à persister — relève d'une page, jamais d'une modale. `MODAL-R02`
  - vérifiable : toute modale expose au moins une action de conclusion ; aucune modale n'héberge de navigation interne ni de contenu destiné à rester disponible après sa fermeture
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- **[préférence]** Une modale n'est légitime que lorsque trois conditions tiennent ensemble : l'interruption est courte, une décision doit être prise avant de pouvoir continuer ailleurs, et le contexte d'origine doit être retrouvé intact ; dès que l'une manque, le besoin est routé vers une page, un drawer, une saisie en ligne, une notification ou un popover. `MODAL-R03`
  - vérifiable : chaque ouverture de modale documentée satisfait les trois conditions ; un besoin qui n'en satisfait que deux est routé vers l'alternative correspondante
- **[préférence]** Une seule modale est ouverte à la fois : une modale n'en déclenche jamais une seconde et deux surfaces modales ne se superposent jamais. `MODAL-R04`
  - vérifiable : au plus une surface portant aria-modal="true" est montée dans le document à un instant donné ; aucun gestionnaire interne à une modale n'ouvre une autre modale
- **[préférence]** Lorsqu'une action lancée depuis une modale réclame elle-même une confirmation, la modale ouverte remplace son propre contenu par l'étape de confirmation au lieu d'empiler une seconde surface ; fermer puis rouvrir n'est admis que si le contexte de retour n'a pas besoin d'être préservé. `MODAL-R05`
  - vérifiable : une confirmation demandée depuis une modale s'affiche dans la surface déjà montée ; aucune seconde surface modale n'est créée
- **[préférence]** Trois familles d'usage seulement sont admises pour la modale — confirmation d'action, saisie courte, détail ou lecture — chacune fixant son contenu, son cran de largeur et son nombre d'actions ; toute quatrième famille suppose de remonter l'arbitrage. `MODAL-R06`
  - vérifiable : toute modale du produit se rattache à l'une des trois familles déclarées
- **[préférence]** Le cran de largeur d'une modale est déterminé par sa famille d'usage et jamais par la longueur de son contenu : un texte long se replie en lignes supplémentaires, il ne fait pas passer la modale au cran supérieur. `MODAL-R07`
  - vérifiable : la largeur maximale d'une modale se déduit de sa famille d'usage ; aucune modale ne déclare une largeur motivée par la quantité de contenu
- **[loi]** Toute action destructive et irréversible dont le coût dépasse ce qu'une annulation suffirait à réparer se confirme dans une modale de la famille confirmation, jamais par une simple alerte dans le flux ni par une boîte de dialogue native du navigateur. `MODAL-R08`
  - vérifiable : toute action irréversible au-delà du seuil de friction déclaré passe par une modale de confirmation ; aucun appel à window.confirm dans le code produit
  - source : https://www.nngroup.com/articles/confirmation-dialog/
- **[loi]** Le titre et le corps d'une confirmation destructive nomment l'objet réel visé et la conséquence de l'action, jamais une formule générique : la question doit se comprendre sans relire l'écran de fond. `MODAL-R09`
  - vérifiable : le titre d'une modale de confirmation destructive contient le verbe de l'action et le nom de l'objet visé ; aucune formulation de type « Êtes-vous sûr ? » ou « Confirmer »
  - source : https://www.nngroup.com/articles/confirmation-dialog/
- **[loi]** Dans une modale de confirmation destructive, l'action irréversible n'est jamais celle qu'un appui réflexe sur Entrée déclenche : le focus initial va à l'action la moins destructive, ou aucune action n'est pré-activée ; l'emphase et la position du bouton destructif restent fixées par le langage de bouton. `MODAL-R10`
  - vérifiable : à l'ouverture d'une modale de confirmation destructive, l'élément focalisé n'est pas le bouton destructif
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- **[loi]** Une destruction à enjeu élevé — volume important, ressources dépendantes, recréation coûteuse — exige une confirmation renforcée, dont la forme documentée est la saisie manuelle du nom de la ressource avant activation du bouton destructif ; la modale héberge ce mécanisme sans le redéfinir. `MODAL-R11`
  - vérifiable : pour une destruction à enjeu élevé, le bouton destructif reste inactif tant que la confirmation renforcée n'est pas satisfaite
  - source : https://carbondesignsystem.com/patterns/delete-and-remove-pattern/
- **[préférence]** Le clic sur le voile est le seul des trois moyens de fermeture qui se désarme, et seulement lorsqu'une fermeture accidentelle perdrait une saisie en cours ; Échap et le bouton de fermeture restent actifs dans tous les cas, et la confirmation de perte de données incombe au consommateur du composant, qui ne l'implémente pas nativement. `MODAL-R13`
  - vérifiable : la prop de fermeture au voile passe à faux dès qu'un champ de la modale est modifié ; Échap et le bouton de fermeture appellent la fermeture quelle que soit sa valeur
- **[loi]** Toute modale expose un nom accessible : un titre visible référencé par aria-labelledby, ou à défaut un aria-label explicite porté par la surface ; l'absence des deux laisse le dialogue annoncé sans complément. `MODAL-R14`
  - vérifiable : toute surface role="dialog" porte soit un aria-labelledby résolvant vers un titre visible non vide, soit un aria-label non vide
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- **[loi]** Le titre d'une modale nomme la tâche ou la question qu'elle pose, sous forme de phrase verbale brève, et jamais la catégorie du composant. `MODAL-R15`
  - vérifiable : aucun titre de modale n'est un nom de catégorie du type « Confirmation », « Information » ou « Modale »
  - source : https://www.nngroup.com/articles/modal-nonmodal-dialog/
- **[préférence]** Dans une modale de saisie, le focus d'entrée va au premier contrôle de saisie et non au bouton de fermeture ; le bouton de fermeture de l'en-tête n'est jamais placé avant le contenu principal dans l'ordre de tabulation. `MODAL-R17`
  - vérifiable : à l'ouverture d'une modale de saisie, l'élément focalisé est le premier contrôle de saisie du corps
- **[loi]** Au-delà de la hauteur disponible, seule la région de contenu d'une modale défile : l'en-tête et le pied restent fixes et visibles, et la surface entière ne défile jamais. `MODAL-R18`
  - vérifiable : seule la région de contenu porte un débordement défilant ; l'en-tête et le pied restent visibles quelle que soit la hauteur du contenu
  - source : https://www.nngroup.com/articles/modal-nonmodal-dialog/
- **[loi]** Le pied d'actions d'une modale reste atteignable sans défiler, et sa fixation ne recouvre jamais entièrement un contrôle qui vient de recevoir le focus dans la région défilante. `MODAL-R19`
  - vérifiable : les actions du pied sont visibles à l'ouverture quelle que soit la longueur du contenu ; aucun contrôle focalisé du corps n'est entièrement masqué par le pied
  - source : https://www.nngroup.com/articles/modal-nonmodal-dialog/
- **[loi]** Une information qui n'appelle aucune décision immédiate — succès, erreur non bloquante, changement de statut — se rend par une notification non modale ou une alerte dans le flux, jamais par une modale. `MODAL-R21`
  - vérifiable : aucune modale n'est ouverte pour un message dont la seule action possible est un accusé de réception
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

## Non couvert — poser la question, ne rien trancher

- Formulaire long multi-champs : Inscription, réglages complets d'un objet — plusieurs sections de champs.
- Wizard multi-étapes : Séquence d'écrans qui progresse vers un but (ex. création de compte).
- À l'arrivée sur une URL profonde (deep link) : Une route applicative ouvre directement la modale au chargement.
- Ouverture automatique sans interaction : Une modale s'affiche au chargement sans déclencheur explicite (ex. onboarding).
- Confirmation de perte de données avant fermeture : Échap ou la croix sont actionnés avec une saisie non enregistrée.
- Drawer : Un panneau ancré à un bord plutôt que centré à l'écran.
- Toast : Une notification éphémère et non-modale, sans décision requise.
- Alert inline : Un message dans le flux de la page, non superposé.
- Popover / dropdown : Un superposé non-modal ancré au déclencheur, pour un détail court.
- Modale sur modale (empilement) : Une seconde modale s'ouvrirait depuis une première déjà ouverte.
- Page dédiée : Un contenu long, autonome, navigable et partageable par URL.
- Confirmation native du navigateur (beforeunload) : L'avertissement natif à la fermeture d'onglet ou de fenêtre.
