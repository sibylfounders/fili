---
sujet: consentement
nature: flows
resume: "Ce fichier n'est ni un composant ni un pattern d'écran."
selon-contexte: [alert, border, button, color, creation-compte, form, grid, modal, navigation, overlay, performance, radius, spacing]
source: CONSENTEMENT-UX.md v1.1.0 + CONSENTEMENT-UI.md v1.1.0
empreinte: sha256:d2aa2aa1b3ff3be1
regles: {loi: 11, preference: 8, non_qualifie: 0}
---
# RULES — consentement (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un bandeau de consentement ne s'affiche que si le site dépose au moins un traceur soumis à consentement ; l'inventaire des stockages doit être établi avant de concevoir le bandeau. `CONSENTEMENT-R03`
- **[loi]** Si le texte du bandeau affirme que le site n'utilise que des traceurs strictement nécessaires, et que l'inventaire le confirme, le bandeau est signalé comme sans objet. `CONSENTEMENT-R05`
- **[loi]** Chaque issue proposée doit produire un effet observable et différent ; un choix sans conséquence ne doit pas être présenté comme un choix. `CONSENTEMENT-R06`
- **[loi]** Le refus doit être atteignable en autant d'actions que l'acceptation, au même niveau de l'interface. `CONSENTEMENT-R07`
- **[loi]** Les boutons d'acceptation et de refus doivent avoir un traitement visuel strictement identique. `CONSENTEMENT-R08`
- **[loi]** L'absence d'action ne doit jamais être interprétée comme un consentement ; l'état par défaut est le refus. `CONSENTEMENT-R09`
- **[préférence]** Chez nous, les libellés des deux actions nomment la catégorie de traceurs concernée plutôt que d'exprimer un assentiment général. `CONSENTEMENT-R10`
- **[préférence]** Chez nous, aucun contenu n'est bloqué tant que le visiteur n'a pas répondu au bandeau. `CONSENTEMENT-R11`
- **[loi]** Le bandeau de consentement ne doit pas être fixé à l'écran, afin de ne jamais recouvrir un élément focalisé. `CONSENTEMENT-R12`
- **[préférence]** Placer le bandeau en tout premier dans le corps du document, avant le lien d'évitement. `CONSENTEMENT-R13`
- **[préférence]** Chez nous, le choix exprimé est conservé six mois, sans nouvelle sollicitation pendant cette durée, refus compris. `CONSENTEMENT-R14`
- **[préférence]** Après le choix, afficher un message de confirmation en lieu et place du bandeau, énonçant le choix retenu et offrant un lien pour le modifier ainsi qu'un bouton de fermeture. `CONSENTEMENT-R15`
- **[loi]** Un point d'accès permanent, présent sur toutes les pages, doit permettre de modifier ou retirer le choix exprimé. `CONSENTEMENT-R16`

## Consignes d'implémentation

- **[préférence]** Chez nous, le bandeau de consentement n'introduit aucun token propre et réutilise intégralement ceux d'alerte, de bouton, de couleur et d'espacement. `CONSENTEMENT-UI-R01`
- **[loi]** Les boutons d'acceptation et de refus doivent référencer le même token de style de bouton. `CONSENTEMENT-UI-R02`
- **[préférence]** Chez nous, les deux actions du bandeau sont rendues en style `ghost` par défaut. `CONSENTEMENT-UI-R03`
- **[loi]** Le bandeau ne consomme aucun token de superposition et n'est jamais fixé à l'écran. `CONSENTEMENT-UI-R04`
- **[loi]** Les seuils de contraste habituels s'appliquent sans dérogation au bandeau de consentement. `CONSENTEMENT-UI-R05`
- **[préférence]** Chez nous, le bandeau apparaît par une transition d'opacité courte, sans déplacement, et ses actions sont immédiatement activables. `CONSENTEMENT-UI-R06`
