---
sujet: link
nature: components
resume: "Un lien promet une destination."
selon-contexte: [border, card, emotion, iconography, interaction, motion, voice]
source: LINK-UX.md v1.1.0 + LINK-UI.md v1.1.0
empreinte: sha256:709a7c8e5cbb6976
regles: {loi: 19, preference: 11, non_qualifie: 0}
---
# RULES — link (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un déclencheur qui conduit l'utilisateur vers une autre page, ressource, section ou URL est un lien. `LINK-R01`
  - vérifiable : toute navigation est portée par un élément de type lien, jamais par un bouton
- **[loi]** Un déclencheur dont l'activation modifie l'état courant, soumet, crée, supprime ou lance un traitement est un bouton, y compris dans une application monopage : c'est le résultat perçu qui décide, pas la technologie de routage. `LINK-R02`
  - vérifiable : aucun lien ne déclenche une action sans changement de destination
- **[loi]** Un lien qui ouvre une modale d'action et un bouton qui conduit vers une page sont l'un et l'autre des promesses fausses ; toute exception se justifie par le parcours, jamais par un besoin de style. `LINK-R03`
  - vérifiable : aucun lien n'ouvre une modale d'action ; aucun bouton ne provoque un changement de page
- **[loi]** Un lien placé dans un bloc de texte reste identifiable sans dépendre de la couleur seule, le soulignement étant le signal par défaut. `LINK-R04`
  - vérifiable : un lien dans un bloc de texte est distingué autrement que par la seule couleur, au repos
  - source : https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
- **[loi]** Le libellé d'un lien garde son sens hors de son contexte immédiat ; un libellé générique répété est proscrit dès que plusieurs occurrences mènent à des destinations différentes. `LINK-R05`
  - vérifiable : deux liens de même libellé dans une même page ne mènent pas à des destinations différentes
  - source : https://www.w3.org/TR/WCAG22/#link-purpose-in-context
- **[préférence]** Un lien autonome peut associer texte et icône directionnelle ; il reste plus léger qu'un bouton adjacent et ne concurrence pas l'action dominante de l'écran. `LINK-R06`
- **[loi]** Dans un ensemble de navigation, la destination courante est signalée par un indice non chromatique et par l'état programmatique correspondant, et n'est pas présentée comme une action. `LINK-R07`
  - vérifiable : la destination courante porte aria-current et un signal non chromatique
  - source : https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
- **[loi]** Un lien de téléchargement annonce la nature du fichier et, quand elle est utile, sa taille, avant l'activation. `LINK-R08`
  - vérifiable : tout lien de téléchargement mentionne le format du fichier dans son nom accessible
  - source : https://html.spec.whatwg.org/multipage/links.html
- **[loi]** L'ouverture d'un nouvel onglet reste exceptionnelle et est annoncée dans le libellé ou par une indication accessible équivalente ; une icône seule ne suffit pas tant que sa signification n'est pas établie dans le produit. `LINK-R09`
  - vérifiable : tout lien ouvrant un nouvel onglet porte une mention d'ouverture externe dans son nom accessible
  - source : https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html
- **[préférence]** Les états default, hover, focus, active et visited d'un lien restent distinguables les uns des autres partout où ils s'appliquent. `LINK-R10`
  - vérifiable : chaque état appliqué se distingue de l'état default par au moins une propriété visuelle
- **[préférence]** L'état visited est réservé aux collections de contenu où se souvenir des pages consultées sert la tâche ; il peut être omis dans la navigation applicative persistante lorsqu'il brouillerait le repère de destination courante. `LINK-R11`
- **[préférence]** Un lien n'a pas d'état désactivé : une destination indisponible est retirée ou remplacée par une explication, jamais laissée sous la forme d'un lien inerte. `LINK-R12`
  - vérifiable : aucun lien ne porte un état disabled ou aria-disabled
- **[préférence]** Une icône de lien complète le libellé — en tête elle décrit la ressource, en fin elle décrit la direction ou la nature de la destination — et ne le remplace que si le lien conserve un nom accessible explicite. `LINK-R13`
- **[loi]** Un lien réduit à une icône porte un nom accessible et une cible pointeur suffisante, et sa forme ne le fait pas passer pour un bouton alors que son résultat est une navigation. `LINK-R14`
  - vérifiable : tout lien icône seule a un nom accessible non vide et une cible ≥ 24×24 px CSS
  - source : https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **[loi]** Une carte cliquable vers un détail contient un lien réel dont le texte accessible est le titre de la carte ; l'extension de la surface cliquable est une technique de ce lien, pas un gestionnaire de clic posé sur un conteneur inerte. `LINK-R15`
  - vérifiable : aucune surface de carte navigable n'est portée par un élément non interactif muni d'un gestionnaire de clic
- **[loi]** Les actions internes à une carte restent hors du lien et conservent leur propre sémantique ; aucun élément interactif n'est descendant d'un lien. `LINK-R16`
  - vérifiable : aucun élément interactif n'est descendant d'un élément de type lien
  - source : https://html.spec.whatwg.org/multipage/links.html
- **[loi]** Le texte d'un lien décrit la destination ou la ressource, et évite l'URL brute dès qu'un nom humain est disponible. `LINK-R17`
  - vérifiable : aucun libellé de lien réduit à « cliquez ici », « ici » ou « en savoir plus » seul
  - source : https://www.w3.org/TR/WCAG22/#link-purpose-in-context
- **[loi]** Le contexte accessible d'un lien permet d'en comprendre la fonction, et deux liens portant le même texte accessible conduisent à la même nature de destination. `LINK-R18`
  - vérifiable : deux liens de même texte accessible dans une page mènent à la même nature de destination
  - source : https://www.w3.org/TR/WCAG22/#link-purpose-in-context
- **[loi]** Un lien dit « aller », un bouton dit « faire » ; le poids visuel ne modifie jamais cette répartition. `LINK-R20`
- **[préférence]** Le lien n'invoque aucun instrument d'animation expressive : un clic de navigation est une interaction à haute fréquence, hors du catalogue des moments mérités, et son seul besoin temporel est le feedback d'état. `LINK-R21`
  - vérifiable : aucune animation d'un lien n'excède la durée de feedback du système

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Link utilisé pour une action | Sémantique, clavier et attente utilisateur incohérents | Élevée |
| Button utilisé pour naviguer | Comportements natifs du lien perdus | Élevée |
| Lien inline distingué par la couleur seule | Lien invisible pour une partie des utilisateurs | Élevée |
| « En savoir plus » répété | Destination incompréhensible hors contexte | Moyenne |
| Nouvel onglet non annoncé | Changement de contexte inattendu | Moyenne |
| Lien disabled | Promesse visible mais impossible | Moyenne |
