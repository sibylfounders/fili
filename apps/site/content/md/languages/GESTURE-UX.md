---
component: gesture
layer: ux
type: language
version: 1.0.0 # 1.0.0 : première rédaction — le langage des gestes (glisser, balayer, appui long, multipoint) et de leur contrat non négociable : jamais le seul chemin vers une fonction. Pendant comportemental de la fondation touch. Langage largement anticipatoire (le produit n'a pas encore de surface gestuelle). Inventaire + benchmark faits avant livraison.
last_updated: 2026-07-25
companion: GESTURE-UI.md
confidence: mixed # les obligations d'alternative (WCAG 2.5.1 / 2.5.7 / 2.5.4) sont établies ; le registre « le geste est un raccourci, jamais une porte » est un parti pris d'identité interne
---

# Langage des gestes (gesture) — Couche UX

> Ce langage définit ce qu'un **geste** a le droit de faire. Un geste — balayer, glisser-déposer,
> appuyer longuement, pincer — est rapide et fluide, mais il est **invisible** : pas de libellé, pas
> de bordure, pas d'état au repos. La règle qui fonde tout le reste : un geste est un **raccourci**,
> jamais le **seul** moyen d'accomplir une action. La fondation voisine `TOUCH` porte la taille et
> l'atteinte des cibles ; ce langage porte le mouvement qu'on fait dessus. Les techniques vivent dans
> `GESTURE-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE : un geste n'a **ni forme ni état**. Là où un bouton montre qu'il est cliquable, un balayage
ne montre rien — il faut le connaître pour le faire. Deux conséquences fondent le langage : un geste
doit être **découvrable** (annoncé par un affordant visible) et **doublé** (une alternative simple
atteint la même fonction).

RÈGLE : **le geste est un raccourci, pas un substitut.** Il accélère pour qui le connaît ; il
n'enlève jamais l'accès à qui ne le connaît pas, ne peut pas le faire, ou ne le découvre pas.

> **Pourquoi** : un geste caché sans alternative est une fonction qui n'existe que pour ceux qui
> l'ont devinée. C'est le défaut structurel du geste — invisible par nature — et la raison pour
> laquelle WCAG en fait une obligation, pas une recommandation.

## L'alternative — la règle cardinale

RÈGLE : **tout geste à trajectoire (path-based) ou multipoint a une alternative à pointeur unique.**
Un balayage, un pincement, une rotation : la même fonction s'atteint par un tap/clic simple
(WCAG 2.5.1, niveau A). Balayer pour supprimer → un bouton « supprimer » existe aussi.

RÈGLE : **tout glissement (drag) a une alternative sans glisser.** Réordonner, déplacer vers une
cible : la même action se fait sans maintenir-déplacer — boutons monter/descendre, menu « déplacer
vers », sélection puis destination (WCAG 2.5.7, niveau AA).

RÈGLE : **une fonction déclenchée par le mouvement de l'appareil** (secouer pour annuler, incliner)
a un contrôle équivalent à l'écran **et** peut être désactivée (WCAG 2.5.4, niveau A).

RÈGLE : la **seule exception** est le geste **essentiel** — quand le tracé *est* la donnée
(signer, dessiner, une carte à exploration libre). L'exception se **déclare** ; elle ne se présume
jamais parce qu'« un bouton serait moins élégant ».

## Découvrabilité

RÈGLE : un geste utile s'**annonce** — une poignée, un « peek » (un bord de contenu qui dépasse),
une ombre, un chevron. L'affordant visible est la frontière avec `INTERACTION` : le geste sans indice
n'est pas un geste, c'est un secret.

RÈGLE : on respecte le **geste standard de la plateforme** (balayer-pour-revenir iOS, tirer-pour-
rafraîchir) plutôt que d'en inventer un concurrent. Un geste maison qui contredit le geste système
attendu est un piège.

RÈGLE : l'**aide au premier usage** (coach-mark, animation d'amorce) est **ponctuelle** et non
bloquante — jamais répétée à chaque venue, jamais un mur avant l'accès.

## Seuil, annulation, accident

RÈGLE : un geste ne se déclenche qu'au-delà d'un **seuil franc** (distance ou durée) — sous le seuil,
rien ne se passe. Un effleurement en défilant n'est pas un geste d'action : le **défilement prime**.

RÈGLE : un geste est **annulable avant sa validation** : ramener puis relâcher hors de la zone
d'effet annule ; l'effet n'est acté qu'au franchissement du seuil et au relâchement. C'est la parenté
du geste avec l'annulation du pointeur (`TOUCH`, WCAG 2.5.2).

RÈGLE : le **retour d'accompagnement** pendant le geste (le contenu qui suit le doigt, un aperçu)
suit `MOTION` — `transform`/`opacity` seuls — et se coupe sous `prefers-reduced-motion` sans jamais
retirer la fonction.

## Accessibilité et robustesse

RÈGLE : toute fonction gestuelle est atteignable **au clavier** — le geste n'est jamais l'unique
chemin (le contrat clavier complet appartient au principe `accessibility`, ce langage en est un
consommateur explicite).

RÈGLE : les **technologies d'assistance** capturent leurs propres gestes (lecteur d'écran) ; l'action
reste donc exposée par un **contrôle nommé**, pas par un balayage brut que l'AT ne peut pas relayer.

RÈGLE : l'alternative à pointeur unique **est** l'accès pour la **motricité réduite** — qui ne peut
ni tracer un chemin précis ni maintenir un appui. Ce n'est pas une faveur, c'est la porte principale
pour une partie des utilisateurs.

## Test du geste

RÈGLE : tout nouveau geste passe ces quatre questions :

1. La même fonction est-elle atteignable par un **tap/clic simple** (pas de trajectoire, pas de
   maintien) ?
2. Le geste est-il **annoncé** par un affordant visible, ou est-il un secret ?
3. A-t-il un **seuil** qui le distingue du défilement et une **annulation** avant validation ?
4. Est-il atteignable au **clavier** et exposé à l'**AT** par un contrôle nommé ?

Un « non » à la question 1 n'est pas négociable hors du cas *essentiel* déclaré.

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Geste path-based/multipoint sans alternative | Fonction inaccessible (WCAG 2.5.1) | Critique |
| Drag sans alternative sans glisser | Fonction inaccessible en motricité réduite (WCAG 2.5.7) | Critique |
| Motion actuation sans équivalent ni désactivation | Déclenchement involontaire, inaccessible (WCAG 2.5.4) | Élevée |
| Geste caché sans affordant | Fonction découverte par personne | Élevée |
| Geste maison contre un geste système | Conflit, action involontaire | Élevée |
| Pas de seuil (confusion avec le scroll) | Action déclenchée en défilant | Moyenne |
| Retour de geste porté par le mouvement seul | Perte sous reduced-motion / AT | Moyenne |

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Un geste à trajectoire/multipoint a une alternative à pointeur unique (sauf essentiel) | [WCAG 2.2 — 2.5.1 Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html) | Établi, standard d'accessibilité (niveau A) |
| Un glissement a une alternative sans glisser (sauf essentiel) | [WCAG 2.2 — 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | Établi, standard d'accessibilité (niveau AA) |
| Une fonction par mouvement de l'appareil a un équivalent et se désactive | [WCAG 2.1 — 2.5.4 Motion Actuation](https://www.w3.org/WAI/WCAG21/Understanding/motion-actuation.html) | Établi, standard d'accessibilité (niveau A) |
| Annulation au relâchement (parenté) | [WCAG 2.2 — 2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html) | Établi |
| Découvrabilité et respect des gestes de plateforme | [Apple HIG — Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures) ; [Material — Gestures](https://m2.material.io/design/interaction/gestures.html) | Établi par convergence |
| « Le geste est un raccourci, jamais une porte » (registre) | Décision d'identité interne, 2026-07-25 | Parti pris interne, aligné sur les obligations WCAG |

## À approfondir

- **Surface gestuelle réelle** : le produit n'en a pas encore — ce langage est *anticipatoire*. Le
  premier drag-and-drop (réordonner une collection) ou swipe-to-dismiss (fermer un toast) arrivera
  avec son contrat déjà posé. À rouvrir avec des cas concrets.
- **Seuils chiffrés** (distance de swipe, durée d'appui long) : non tokenisés — ils dépendent du
  contexte et de la plateforme. Candidats à des valeurs de référence le jour d'une vraie surface, en
  lien avec `MOTION` (durées) et `TOUCH` (tailles).
- **Gestes multi-doigts avancés** (pincer-pivoter simultané) : hors périmètre tant qu'aucune vue
  (carte, éditeur) ne les exige ; l'exception « essentiel » leur est réservée quand ils arriveront.
