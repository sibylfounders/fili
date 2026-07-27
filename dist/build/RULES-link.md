---
sujet: link
nature: components
resume: "Un lien promet une destination."
selon-contexte: [border, card, emotion, iconography, interaction, motion, voice]
source: LINK-UX.md v1.1.0 + LINK-UI.md v1.1.0
empreinte: sha256:709a7c8e5cbb6976
regles: {loi: 19, preference: 11, non_qualifie: 0}
---
# RULES — link (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un déclencheur qui conduit l'utilisateur vers une autre page, ressource, section ou URL est un lien. `LINK-R01`
- **[loi]** Un déclencheur dont l'activation modifie l'état courant, soumet, crée, supprime ou lance un traitement est un bouton, y compris dans une application monopage : c'est le résultat perçu qui décide, pas la technologie de routage. `LINK-R02`
- **[loi]** Un lien qui ouvre une modale d'action et un bouton qui conduit vers une page sont l'un et l'autre des promesses fausses ; toute exception se justifie par le parcours, jamais par un besoin de style. `LINK-R03`
- **[loi]** Un lien placé dans un bloc de texte reste identifiable sans dépendre de la couleur seule, le soulignement étant le signal par défaut. `LINK-R04`
- **[loi]** Le libellé d'un lien garde son sens hors de son contexte immédiat ; un libellé générique répété est proscrit dès que plusieurs occurrences mènent à des destinations différentes. `LINK-R05`
- **[préférence]** Un lien autonome peut associer texte et icône directionnelle ; il reste plus léger qu'un bouton adjacent et ne concurrence pas l'action dominante de l'écran. `LINK-R06`
- **[loi]** Dans un ensemble de navigation, la destination courante est signalée par un indice non chromatique et par l'état programmatique correspondant, et n'est pas présentée comme une action. `LINK-R07`
- **[loi]** Un lien de téléchargement annonce la nature du fichier et, quand elle est utile, sa taille, avant l'activation. `LINK-R08`
- **[loi]** L'ouverture d'un nouvel onglet reste exceptionnelle et est annoncée dans le libellé ou par une indication accessible équivalente ; une icône seule ne suffit pas tant que sa signification n'est pas établie dans le produit. `LINK-R09`
- **[préférence]** Les états default, hover, focus, active et visited d'un lien restent distinguables les uns des autres partout où ils s'appliquent. `LINK-R10`
- **[préférence]** L'état visited est réservé aux collections de contenu où se souvenir des pages consultées sert la tâche ; il peut être omis dans la navigation applicative persistante lorsqu'il brouillerait le repère de destination courante. `LINK-R11`
- **[préférence]** Un lien n'a pas d'état désactivé : une destination indisponible est retirée ou remplacée par une explication, jamais laissée sous la forme d'un lien inerte. `LINK-R12`
- **[préférence]** Une icône de lien complète le libellé — en tête elle décrit la ressource, en fin elle décrit la direction ou la nature de la destination — et ne le remplace que si le lien conserve un nom accessible explicite. `LINK-R13`
- **[loi]** Un lien réduit à une icône porte un nom accessible et une cible pointeur suffisante, et sa forme ne le fait pas passer pour un bouton alors que son résultat est une navigation. `LINK-R14`
- **[loi]** Une carte cliquable vers un détail contient un lien réel dont le texte accessible est le titre de la carte ; l'extension de la surface cliquable est une technique de ce lien, pas un gestionnaire de clic posé sur un conteneur inerte. `LINK-R15`
- **[loi]** Les actions internes à une carte restent hors du lien et conservent leur propre sémantique ; aucun élément interactif n'est descendant d'un lien. `LINK-R16`
- **[loi]** Le texte d'un lien décrit la destination ou la ressource, et évite l'URL brute dès qu'un nom humain est disponible. `LINK-R17`
- **[loi]** Le contexte accessible d'un lien permet d'en comprendre la fonction, et deux liens portant le même texte accessible conduisent à la même nature de destination. `LINK-R18`
- **[loi]** Un lien dit « aller », un bouton dit « faire » ; le poids visuel ne modifie jamais cette répartition. `LINK-R20`
- **[préférence]** Le lien n'invoque aucun instrument d'animation expressive : un clic de navigation est une interaction à haute fréquence, hors du catalogue des moments mérités, et son seul besoin temporel est le feedback d'état. `LINK-R21`

## Consignes d'implémentation

- **[loi]** Un lien inline est souligné au repos ; le survol peut renforcer l'épaisseur ou le décalage du soulignement mais n'est jamais le moment où le lien devient enfin identifiable. `LINK-U01`
- **[préférence]** Un lien autonome reste visuellement plus léger qu'un bouton ; lui donner une boîte, un fond et des états de pression équivalents à un bouton signifie que le choix du composant doit être réexaminé. `LINK-U02`
- **[préférence]** Le soulignement d'un lien est produit par les propriétés CSS dédiées text-decoration-* et reste lisible autour des jambages ; il n'est pas simulé par une bordure qui traverse les lignes. `LINK-U03`
- **[préférence]** Les changements de couleur d'un lien s'animent sur la durée courte et la courbe de sortie du système au titre du feedback d'état, et sont supprimables sous prefers-reduced-motion sans perte d'information. `LINK-U04`
- **[préférence]** L'anneau de focus d'un lien n'est jamais animé : c'est une information de position pour la navigation clavier, pas un effet. `LINK-U05`
- **[loi]** Toute navigation est portée par un élément d'ancre muni d'une destination réelle ; un gestionnaire JavaScript peut enrichir le comportement, jamais remplacer l'attribut de destination. `LINK-U06`
- **[loi]** La destination courante est déclarée par la valeur appropriée d'aria-current, et un changement de contexte ou un téléchargement porte les attributs natifs correspondants accompagnés de l'annonce accessible prévue. `LINK-U07`
- **[loi]** Le lien étendu d'une carte suit la technique documentée du composant carte, et les actions internes restent des éléments frères du lien, jamais ses descendants. `LINK-U08`
- **[préférence]** L'icône d'un lien inline utilise la taille d'icône petite et celle d'un lien autonome peut utiliser la taille moyenne ; le trait et le dessin suivent la fondation d'iconographie. `LINK-U09`
- **[loi]** Un lien icône seule porte obligatoirement un nom accessible et une zone interactive atteignant la cible tactile commune de 44 px, sans que le glyphe lui-même soit agrandi. `LINK-U10`
