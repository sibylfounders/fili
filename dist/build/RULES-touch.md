---
sujet: touch
nature: foundations
resume: "Cette fondation ne porte pas une forme ni une couleur : elle porte une **contrainte de taille et"
selon-contexte: [button, laws]
source: TOUCH-UX.md v1.0.0 + TOUCH-UI.md v1.0.0
empreinte: sha256:99e9c9e5bf20a7fb
regles: {loi: 13, preference: 10, non_qualifie: 0}
---
# RULES — touch (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une interface tactile se conçoit pour un doigt imprécis, qui masque sa propre cible et ne survole pas, et non pour un curseur qui vise un pixel : cette différence se traduit en contraintes de taille, d'espacement et d'affordance, pas en ajustements esthétiques. `TOUCH-R01`
- **[loi]** La cible tactile est la région qui accepte l'action du pointeur, pas le dessin visible : réduire une icône ne réduit jamais la zone qui la reçoit. `TOUCH-R02`
- **[préférence]** Le système expose exactement trois crans de cible tactile — une taille confortable par défaut, un plancher absolu, un espacement minimal — et aucune autre valeur. `TOUCH-R03`
- **[préférence]** Toute cible vise par défaut la taille confortable ; descendre au plancher exige un besoin de densité réel et documenté, et n'est jamais permis sans respecter l'espacement minimal. `TOUCH-R04`
- **[loi]** Une cible ne peut descendre sous le plancher de 24 px CSS que si elle est prise dans le fil d'un texte (inline) ou si sa petitesse est essentielle à sa fonction. `TOUCH-R06`
- **[préférence]** Les exceptions au plancher se déclarent explicitement au cas par cas ; une cible sous le plancher sans exception déclarée est un défaut, pas un choix. `TOUCH-R07`
- **[préférence]** Chez nous, les actions primaires et fréquentes d'un parcours au doigt se placent dans la zone atteignable à une main (centre et bas d'écran), et le haut et les coins sont réservés aux actions peu fréquentes. `TOUCH-R08`
- **[loi]** Aucune cible tapable ne se place dans une zone réservée aux gestes système (balayage de bord, barre d'accueil, encoche) : ces régions appartiennent au système d'exploitation. `TOUCH-R09`
- **[loi]** Aucune information ni aucune action ne repose sur le seul survol : sous un pointeur incapable de survoler, la totalité des fonctions reste atteignable, l'appui tenant lieu de signal d'affordance. `TOUCH-R10`
- **[loi]** L'action se déclenche au relâchement sur la cible et jamais au premier contact ; glisser le doigt hors de la cible avant de lever annule l'action. `TOUCH-R11`
- **[loi]** Le retour haptique est un supplément facultatif et jamais un canal unique : il est absent de nombreux appareils et navigateurs et reste désactivable par l'utilisateur. `TOUCH-R12`
- **[loi]** Une cible reste atteignable et activable à 200 % d'agrandissement : ses dimensions dérivent de tokens qui suivent le zoom, jamais d'une valeur absolue figée. `TOUCH-R13`
- **[loi]** La taille confortable et l'espacement minimal sont des exigences d'accessibilité motrice — ils protègent les personnes dont la visée tremble ou manque de précision — et ne se négocient pas au nom de la densité visuelle. `TOUCH-R14`
- **[loi]** Toute cible tactile est également opérable au clavier, porte un indicateur de focus visible et expose un nom et un rôle accessibles : la taille de la cible ne remplace jamais sa sémantique. `TOUCH-R15`

## Consignes d'implémentation

- **[préférence]** Aucun composant ne code une taille de cible en dur : il référence l'un des trois tokens de cible tactile du système. `TOUCH-U01`
- **[préférence]** La cible se garantit par une hauteur et une largeur minimales déclarées, et non par la seule hauteur du contenu ou du padding. `TOUCH-U02`
- **[préférence]** La zone tactile peut déborder le dessin : le supplément se produit par padding ou par une zone étendue transparente, sans agrandir l'élément visible. `TOUCH-U03`
- **[préférence]** Le régime tactile se déclare par les requêtes de média de pointeur grossier et d'absence de survol : sur pointeur grossier la cible principale passe à la taille confortable et aucune affordance ne dépend du survol ; sur pointeur fin une densité plus serrée reste permise au-dessus du plancher. `TOUCH-U04`
- **[loi]** Deux cibles adjacentes sont séparées d'au moins l'espacement minimal ; lorsque la densité impose le plancher, cet espacement est obligatoire et non optionnel. `TOUCH-U05`
- **[loi]** L'action se lie à l'événement de relâchement et jamais à l'événement de contact ; un contrôle personnalisé qui agit au contact supprime l'issue de secours fournie nativement par un bouton ou un lien. `TOUCH-U06`
- **[préférence]** En mode de couleurs forcées, la cible conserve exactement sa taille : sa géométrie ne dépend d'aucun fond, d'aucune image et d'aucune ombre, qui sont supprimés dans ce mode. `TOUCH-U07`
- **[préférence]** Les tailles de cible s'expriment dans des unités qui suivent l'agrandissement du navigateur, de sorte qu'aucune cible ne rétrécit relativement au contenu agrandi. `TOUCH-U08`
- **[loi]** Un élément générique rendu interactif conserve la surface attendue d'un contrôle natif et expose un rôle, un nom et des états programmatiquement déterminables : la taille ne compense pas une sémantique manquante. `TOUCH-U09`
