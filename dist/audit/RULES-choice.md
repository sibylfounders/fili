---
sujet: choice
nature: components
resume: "Capturer un choix **validé à la soumission** : indépendant et cumulable (case à cocher), ou"
selon-contexte: [border, consentement, form, input, select, switch]
source: CHOICE-UX.md v1.0.0 + CHOICE-UI.md v1.0.0
empreinte: sha256:2bb70377429a26ea
regles: {loi: 16, preference: 1, non_qualifie: 0}
---
# RULES — choice (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** **le choix se valide, le switch agit.** Une sélection qui n'est appliquée qu'à la `CHOICE-R01`
  - vérifiable : aucun contrôle de choix n'applique son effet au clic sans soumission, et aucun switch n'attend un bouton d'enregistrement
- **[loi]** **cumulable ou exclusif** — c'est la seule question qui sépare la case du radio. Des `CHOICE-R02`
  - vérifiable : aucun ensemble d'options exclusives n'est rendu en cases à cocher, et aucun ensemble cumulable n'est rendu en boutons radio
- **[loi]** **une case isolée n'est pas un choix parmi un** — c'est la bascule d'une option unique `CHOICE-R03`
  - vérifiable : toute case isolée exprime une option activable, jamais une alternative unique
- **[loi]** **l'exclusivité appartient au GROUPE, pas au bouton.** Un radio isolé n'a pas de sens : `CHOICE-R05`
  - vérifiable : tout bouton radio appartient à un groupe nommé, et aucun groupe n'autorise deux réponses simultanées
- **[loi]** **le groupe a un nom accessible, toujours** — la question elle-même. Qu'elle soit `CHOICE-R06`
  - vérifiable : tout groupe de choix porte un nom accessible non vide, référençant le libellé visible quand il existe
- **[loi]** **les cases sont indépendantes ; leur groupe est facultatif mais l'étiquetage ne l'est pas.** `CHOICE-R07`
  - vérifiable : tout ensemble de cases répondant à une question commune est réuni dans un groupe portant cette question
- **[préférence]** **le libellé est embarqué, à côté du contrôle, et il est cliquable.** À la différence `CHOICE-R08`
  - vérifiable : le libellé d'un contrôle de choix est lié à son contrôle et l'activer bascule l'état
- **[loi]** **le libellé dit l'option, pas l'action, et se comprend hors contexte.** « Recevoir `CHOICE-R09`
  - vérifiable : chaque libellé d'option reste compréhensible lu seul, hors de sa question
- **[loi]** **l'aide d'une option est une phrase courte, sans point final.** Elle est lue à chaque `CHOICE-R10`
  - vérifiable : toute aide d'option tient en une phrase et ne contient aucun lien
- **[loi]** **l'indéterminé n'est pas un troisième choix.** Il décrit un parent dont les enfants `CHOICE-R11`
  - vérifiable : aucun contrôle indéterminé n'est atteignable par une action de l'utilisateur ni transmis comme valeur
- **[loi]** **l'état ne passe jamais par la seule couleur.** La coche, le point et leur présence `CHOICE-R12`
  - vérifiable : l'état coché reste distinguable de l'état décoché en niveaux de gris
- **[loi]** **une option pré-cochée est une décision, jamais un confort.** Elle oriente la réponse `CHOICE-R13`
  - vérifiable : aucune option de consentement n'est pré-cochée
- **[loi]** **un groupe de radios est UN seul arrêt de tabulation, et la sélection suit le focus.** `CHOICE-R14`
  - vérifiable : un groupe de radios n'expose qu'un seul arrêt de tabulation, et les quatre flèches y déplacent le focus en cochant
- **[loi]** **chaque case à cocher est un arrêt de tabulation, et Espace la bascule.** Les cases `CHOICE-R15`
  - vérifiable : chaque case à cocher est atteignable au clavier et bascule à la barre d'espace
- **[loi]** **la cible inclut le libellé.** Le plancher tactile s'applique à l'ensemble `CHOICE-R16`
  - vérifiable : la cible effective contrôle + libellé atteint le plancher tactile du système
- **[loi]** **l'erreur d'un groupe se rattache au groupe, pas à sa première option.** Elle est `CHOICE-R17`
  - vérifiable : le message d'erreur d'un groupe de choix est associé au groupe et non à une option isolée
- **[loi]** **l'option exclusive se place en dernier, séparée, et décoche les autres.** « Aucune de `CHOICE-R18`
  - vérifiable : toute option exclusive d'un ensemble cumulable est en dernière position et décoche les autres à sa sélection
