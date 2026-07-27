---
component: link
layer: ux
version: 1.1.0 # 1.1.0 : rattachement nommé à Voice (wording de lien) et Motion (feedback d'état), absence E-motion explicitée — 2026-07-21. 1.0.0 : première rédaction — dette explicite résorbée : navigation distincte de l'action, dans le langage d'interaction
last_updated: 2026-07-21
companion: LINK-UI.md
confidence: established
---

# Link — Couche UX

> Un lien promet une destination. Un bouton promet une action. Cette distinction est le point
> d'ancrage du composant et l'application directe de `INTERACTION-UX.md`.

## But

RÈGLE : utiliser un Link pour conduire vers une autre page, ressource, section ou URL.

RÈGLE : utiliser un Button quand l'activation modifie l'état courant, soumet, crée, supprime, ouvre
une action ou déclenche un traitement. Le fait qu'une application soit une SPA ne change pas cette
frontière : c'est le résultat perçu qui décide.

RÈGLE : un lien qui ouvre une modale d'action est une mauvaise promesse ; un bouton qui conduit vers
une page est une mauvaise promesse. Les exceptions exigent une justification de parcours, pas un
besoin de style.

## Contextes

### Lien inline

RÈGLE : dans un paragraphe, le lien reste identifiable sans dépendre de la couleur seule. Le
soulignement est le signal par défaut.

RÈGLE : le libellé garde du sens hors contexte immédiat. « En savoir plus » seul est évité quand
plusieurs liens identiques mènent vers des destinations différentes.

### Lien autonome

RÈGLE : un lien placé seul peut associer texte et icône directionnelle. Il reste plus léger qu'un
bouton adjacent et ne concurrence pas l'action dominante.

### Navigation

RÈGLE : les liens de navigation identifient la destination courante avec un signal non chromatique
et l'état programmatique approprié. La destination courante n'est pas présentée comme une action.

### Téléchargement et destination externe

RÈGLE : un téléchargement annonce la nature du fichier et, quand elle est utile, sa taille.

RÈGLE : l'ouverture d'un nouvel onglet reste exceptionnelle et est annoncée dans le libellé ou par
une indication accessible cohérente. Une icône seule ne suffit pas si sa signification n'est pas
établie dans le produit.

## États

RÈGLE : default, hover, focus, active et visited restent distinguables quand ils s'appliquent.

RÈGLE : `visited` sert surtout aux collections de contenu où se souvenir des pages consultées aide la
tâche. Il peut être omis dans la navigation applicative persistante si son changement brouillerait le
repère courant.

RÈGLE : un lien n'a normalement pas d'état disabled. Si la destination n'est pas disponible, le lien
est retiré ou remplacé par une explication ; un faux lien inerte garde une promesse impossible.

## Icônes

RÈGLE : une icône leading décrit la ressource ; une icône trailing décrit la direction ou la nature
de la destination. Elle ne remplace pas le libellé sauf convention universellement comprise et nom
accessible explicite.

RÈGLE : un lien icône seule conserve une cible tactile suffisante et un nom accessible. Sa forme ne
doit pas le faire confondre avec un IconButton si le résultat est une navigation.

## Carte cliquable

RÈGLE : une Card cliquable vers un détail contient un vrai Link dont le texte accessible est le titre
de la carte. La surface étendue reste une technique du Link, pas un `div onclick`.

RÈGLE : les actions internes à la Card restent hors du lien et conservent leur propre sémantique.

## Wording

RÈGLE : le texte décrit la destination ou la ressource : « Voir les factures », « Documentation de
l'API », « Conditions d'utilisation ». Il évite l'URL brute quand un nom humain est disponible.

RÈGLE : le contexte accessible permet de comprendre la fonction du lien. Plusieurs liens portant le
même texte conduisent à la même nature de destination.

RÈGLE : ces règles de wording sont la déclinaison locale de `VOICE-UX.md`, cadre unificateur du
wording de lien — § « Le mot est le canal d'information fiable » (« le texte de lien se suffit hors
contexte », WCAG 2.4.4) et § « Cohérence — une voix, un vocabulaire » (un concept, un mot). Elles ne
sont pas réécrites ici, elles s'y rattachent.

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Link utilisé pour une action | Sémantique, clavier et attente utilisateur incohérents | Élevée |
| Button utilisé pour naviguer | Comportements natifs du lien perdus | Élevée |
| Lien inline distingué par la couleur seule | Lien invisible pour une partie des utilisateurs | Élevée |
| « En savoir plus » répété | Destination incompréhensible hors contexte | Moyenne |
| Nouvel onglet non annoncé | Changement de contexte inattendu | Moyenne |
| Lien disabled | Promesse visible mais impossible | Moyenne |

## Règle transversale

RÈGLE : **un Link dit “aller”, un Button dit “faire”.** Le poids visuel ne change jamais cette
grammaire.

RÈGLE : Link n'invoque aucun instrument E-motion : un clic de navigation est une action à haute
fréquence, hors du catalogue des moments mérités (`EMOTION-UX.md` § budget de rareté). Son seul
besoin temporel est le feedback d'état (cf. Motion, `LINK-UI.md`).

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| La fonction d'un lien est déterminable à partir de son texte ou de son contexte | [WCAG 2.2 — 2.4.4 Link Purpose](https://www.w3.org/TR/WCAG22/#link-purpose-in-context) | Établi |
| La couleur ne suffit pas à identifier un lien inline | [WCAG 2.2 — 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Établi |
| Un changement de contexte au focus ou à la saisie doit être prévisible | [WCAG 2.2 — 3.2.1 On Focus](https://www.w3.org/TR/WCAG22/#on-focus), [3.2.2 On Input](https://www.w3.org/TR/WCAG22/#on-input) | Établi |
| Séparation lien/navigation et bouton/action | Sémantique HTML + convergence des design systems majeurs | Établi |
| Texte de lien signifiant, cadre wording | `VOICE-UX.md` (§ Le mot est le canal fiable / § Cohérence) | Établi — langage transversal |
