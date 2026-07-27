---
sujet: radius
nature: foundations
resume: "Ce fichier contient le raisonnement : ce que le rayon suit, l'imbrication, le pill."
selon-contexte: [alert, border, button, card, input]
source: RADIUS-UX.md v1.1.0 + RADIUS-UI.md v1.1.0
empreinte: sha256:6d61a152ddc5fd76
regles: {loi: 0, preference: 0, non_qualifie: 11}
---
# RULES — radius (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** le radius est une **fondation** — la contrainte transversale la plus courte du système, et c'est une propriété du sujet : trois tokens, quatre règles, aucun axe. L'inventaire (17 cas) confirme que la brièveté n'est pas un trou de couverture.
- **[non qualifié]** le rayon est une propriété d'**identité**, pas d'état : il ne change jamais entre repos/hover/focus/error, et il ne porte aucun sens sémantique. Ce qu'il suit, c'est la **taille du composant**.
- **[non qualifié]** **le cran suit la taille ET le type (contrôle vs conteneur)** : `radius.sm` pour les petites hauteurs (bouton/input sm), `radius.md` pour les **contrôles** de taille standard (bouton/input md-lg), `radius.lg` pour les **conteneurs** (card, alert). C'est la logique croissante convergente des systèmes majeurs (Atlassian : 2px badges → 12px conteneurs → 16px players ; Material : 4 → 28dp), à échelle réduite.
- **[non qualifié]** le rayon ne grandit **pas linéairement** avec la taille — le bouton lg garde `radius.md` ("l'agrandir proportionnellement donnerait un effet pilule non désiré", BUTTON-UI). Le rayon est un cran choisi, jamais un pourcentage de la hauteur.
- **[non qualifié]** la cohérence se joue **par taille, pas par composant** : un input md à côté d'un bouton md partagent `radius.md` — les contrôles d'un même formulaire ont la même courbure (BUTTON-UI et INPUT-UI le font déjà, la règle est désormais dite).
- **[non qualifié]** un coin interne n'est jamais plus rond que le coin externe qui le contient. Cas collé (media d'une carte) : le rayon interne épouse l'externe. Cas concentrique idéal : rayon interne = rayon externe − écart.
- **[non qualifié]** le cas **inversé** existe aussi : un anneau posé *à l'extérieur* (le focus ring) prend rayon du composant **+ offset** — c'est la même géométrie dans l'autre sens, et Atlassian la tokenise exactement ainsi (radius.focus = rayon de base + 2px).
- **[non qualifié]** `radius.pill` (valeur géante, convention partagée : 999/9999px) est **réservé aux contenus mono-ligne intrinsèques dont la forme EST la pilule** — pastilles, badges, avatars. **Tranché (1.1.0) : un contrôle mono-ligne (bouton, input) ne prend JAMAIS `pill`** — il est mono-ligne mais pas *intrinsèquement pilule*, et suit sa taille (sm/md). « Intrinsèque » qualifie la forme du contenu, pas le simple fait de tenir sur une ligne. Jamais sur un contenu qui peut passer en multiligne : la pilule devient un stade.
- **[non qualifié]** aucun consommateur documenté à ce jour — provision rendue visible (même statut qu'`elevation.overlay`), candidat naturel : badge/tag, dont `typography.label` (Inter, 1.8.0) est l'autre moitié déjà née.
- **[non qualifié]** l'**angle droit n'a pas de token** — décision, pas oubli : rien dans ce système n'est carré par défaut (Carbon fait le choix inverse — esthétique d'identité, pas une norme). Un besoin réel l'ajouterait en un cran `none`.
- **[non qualifié]** **le rayon suit la taille et rien d'autre** — ni l'importance (BUTTON-UX : "large ne veut pas dire important"), ni l'état, ni le goût de l'écran.
