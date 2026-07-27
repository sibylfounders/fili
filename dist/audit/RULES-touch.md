---
sujet: touch
nature: foundations
resume: "Cette fondation ne porte pas une forme ni une couleur : elle porte une **contrainte de taille et"
selon-contexte: [button, laws]
source: TOUCH-UX.md v1.0.0 + TOUCH-UI.md v1.0.0
empreinte: sha256:bd2033776663bbb3
regles: {loi: 0, preference: 0, non_qualifie: 25}
---
# RULES — touch (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** le doigt n'est pas une souris. Il est **imprécis** (une empreinte de contact d'environ 9 mm,
- **[non qualifié]** **la cible n'est pas l'icône.** La zone qui reçoit le doigt (le *hit target*) peut être bien
- **[non qualifié]** trois valeurs, et une lecture simple — **confort par défaut, plancher en dernier recours,
- **[non qualifié]** `touch.target-comfortable` est la valeur qu'on vise sans y penser. On ne descend à
- **[non qualifié]** sous `touch.target-min`, le build **s'arrête et remonte**. Une cible plus petite que le
- **[non qualifié]** une cible peut descendre sous `touch.target-min` dans **deux cas seulement**, tous deux
- **[non qualifié]** ces deux exceptions se **déclarent**, elles ne se présument pas. Toute autre cible sous le
- **[non qualifié]** les actions **primaires et fréquentes** d'un parcours au doigt visent la **zone
- **[non qualifié]** on ne place jamais une cible tapable là où elle entre en **conflit avec un geste système**
- **[non qualifié]** au doigt, il n'y a **pas de hover** — le **press** (l'appui) est le signal d'affordance. La
- **[non qualifié]** l'action se déclenche au **relâchement sur la cible**, jamais au premier contact. Glisser le
- **[non qualifié]** le **retour haptique** (vibration) est un supplément facultatif, jamais un canal unique : il
- **[non qualifié]** la cible reste tapable **au zoom** (200 %, loupe) — les tailles dérivent de tokens, jamais
- **[non qualifié]** la marge de `touch.target-comfortable` et de `touch.target-spacing` **est** l'accessibilité
- **[non qualifié]** une cible n'existe **jamais que pour le doigt**. Toute cible tactile est aussi atteignable au
- **[non qualifié]** toute nouvelle famille de cibles passe ces quatre questions :
