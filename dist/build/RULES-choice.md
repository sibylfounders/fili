---
sujet: choice
nature: components
resume: "Capturer un choix **validé à la soumission** : indépendant et cumulable (case à cocher), ou"
selon-contexte: [border, consentement, form, input, select, switch]
source: CHOICE-UX.md v1.0.0 + CHOICE-UI.md v1.0.0
empreinte: sha256:2bb70377429a26ea
regles: {loi: 16, preference: 1, non_qualifie: 0}
---
# RULES — choice (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** **le choix se valide, le switch agit.** Une sélection qui n'est appliquée qu'à la `CHOICE-R01`
- **[loi]** **cumulable ou exclusif** — c'est la seule question qui sépare la case du radio. Des `CHOICE-R02`
- **[loi]** **une case isolée n'est pas un choix parmi un** — c'est la bascule d'une option unique `CHOICE-R03`
- **[loi]** **l'exclusivité appartient au GROUPE, pas au bouton.** Un radio isolé n'a pas de sens : `CHOICE-R05`
- **[loi]** **le groupe a un nom accessible, toujours** — la question elle-même. Qu'elle soit `CHOICE-R06`
- **[loi]** **les cases sont indépendantes ; leur groupe est facultatif mais l'étiquetage ne l'est pas.** `CHOICE-R07`
- **[préférence]** **le libellé est embarqué, à côté du contrôle, et il est cliquable.** À la différence `CHOICE-R08`
- **[loi]** **le libellé dit l'option, pas l'action, et se comprend hors contexte.** « Recevoir `CHOICE-R09`
- **[loi]** **l'aide d'une option est une phrase courte, sans point final.** Elle est lue à chaque `CHOICE-R10`
- **[loi]** **l'indéterminé n'est pas un troisième choix.** Il décrit un parent dont les enfants `CHOICE-R11`
- **[loi]** **l'état ne passe jamais par la seule couleur.** La coche, le point et leur présence `CHOICE-R12`
- **[loi]** **une option pré-cochée est une décision, jamais un confort.** Elle oriente la réponse `CHOICE-R13`
- **[loi]** **un groupe de radios est UN seul arrêt de tabulation, et la sélection suit le focus.** `CHOICE-R14`
- **[loi]** **chaque case à cocher est un arrêt de tabulation, et Espace la bascule.** Les cases `CHOICE-R15`
- **[loi]** **la cible inclut le libellé.** Le plancher tactile s'applique à l'ensemble `CHOICE-R16`
- **[loi]** **l'erreur d'un groupe se rattache au groupe, pas à sa première option.** Elle est `CHOICE-R17`
- **[loi]** **l'option exclusive se place en dernier, séparée, et décoche les autres.** « Aucune de `CHOICE-R18`
