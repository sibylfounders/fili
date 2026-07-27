---
sujet: gesture
nature: languages
resume: "Ce langage définit ce qu'un **geste** a le droit de faire."
selon-contexte: [motion, touch]
source: GESTURE-UX.md v1.0.0 + GESTURE-UI.md v1.0.0
empreinte: sha256:be5398d9f4e67a2d
regles: {loi: 0, preference: 0, non_qualifie: 26}
---
# RULES — gesture (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** un geste n'a **ni forme ni état**. Là où un bouton montre qu'il est cliquable, un balayage
- **[non qualifié]** **le geste est un raccourci, pas un substitut.** Il accélère pour qui le connaît ; il
- **[non qualifié]** **tout geste à trajectoire (path-based) ou multipoint a une alternative à pointeur unique.**
- **[non qualifié]** **tout glissement (drag) a une alternative sans glisser.** Réordonner, déplacer vers une
- **[non qualifié]** **une fonction déclenchée par le mouvement de l'appareil** (secouer pour annuler, incliner)
- **[non qualifié]** la **seule exception** est le geste **essentiel** — quand le tracé *est* la donnée
- **[non qualifié]** un geste utile s'**annonce** — une poignée, un « peek » (un bord de contenu qui dépasse),
- **[non qualifié]** on respecte le **geste standard de la plateforme** (balayer-pour-revenir iOS, tirer-pour-
- **[non qualifié]** l'**aide au premier usage** (coach-mark, animation d'amorce) est **ponctuelle** et non
- **[non qualifié]** un geste ne se déclenche qu'au-delà d'un **seuil franc** (distance ou durée) — sous le seuil,
- **[non qualifié]** un geste est **annulable avant sa validation** : ramener puis relâcher hors de la zone
- **[non qualifié]** le **retour d'accompagnement** pendant le geste (le contenu qui suit le doigt, un aperçu)
- **[non qualifié]** toute fonction gestuelle est atteignable **au clavier** — le geste n'est jamais l'unique
- **[non qualifié]** les **technologies d'assistance** capturent leurs propres gestes (lecteur d'écran) ; l'action
- **[non qualifié]** l'alternative à pointeur unique **est** l'accès pour la **motricité réduite** — qui ne peut
- **[non qualifié]** tout nouveau geste passe ces quatre questions :
