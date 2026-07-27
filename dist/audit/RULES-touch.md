---
sujet: touch
nature: foundations
resume: "Cette fondation ne porte pas une forme ni une couleur : elle porte une **contrainte de taille et"
selon-contexte: [button, laws]
source: TOUCH-UX.md v1.0.0 + TOUCH-UI.md v1.0.0
empreinte: sha256:99e9c9e5bf20a7fb
regles: {loi: 13, preference: 10, non_qualifie: 0}
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

- **[loi]** Une interface tactile se conçoit pour un doigt imprécis, qui masque sa propre cible et ne survole pas, et non pour un curseur qui vise un pixel : cette différence se traduit en contraintes de taille, d'espacement et d'affordance, pas en ajustements esthétiques. `TOUCH-R01`
  - source : https://www.nngroup.com/articles/touch-target-size/
- **[loi]** La cible tactile est la région qui accepte l'action du pointeur, pas le dessin visible : réduire une icône ne réduit jamais la zone qui la reçoit. `TOUCH-R02`
  - vérifiable : zone tactile ≥ cran visé, indépendamment des dimensions du dessin
  - source : https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- **[préférence]** Le système expose exactement trois crans de cible tactile — une taille confortable par défaut, un plancher absolu, un espacement minimal — et aucune autre valeur. `TOUCH-R03`
- **[préférence]** Toute cible vise par défaut la taille confortable ; descendre au plancher exige un besoin de densité réel et documenté, et n'est jamais permis sans respecter l'espacement minimal. `TOUCH-R04`
  - vérifiable : cible par défaut = touch.target-comfortable ; usage de touch.target-min accompagné d'une justification de densité écrite
- **[loi]** Une cible ne peut descendre sous le plancher de 24 px CSS que si elle est prise dans le fil d'un texte (inline) ou si sa petitesse est essentielle à sa fonction. `TOUCH-R06`
  - vérifiable : toute cible < 24×24 px CSS relève du cas inline ou du cas essentiel
  - source : https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- **[préférence]** Les exceptions au plancher se déclarent explicitement au cas par cas ; une cible sous le plancher sans exception déclarée est un défaut, pas un choix. `TOUCH-R07`
  - vérifiable : toute cible sous le plancher porte une déclaration d'exception nommée
- **[préférence]** Chez nous, les actions primaires et fréquentes d'un parcours au doigt se placent dans la zone atteignable à une main (centre et bas d'écran), et le haut et les coins sont réservés aux actions peu fréquentes. `TOUCH-R08`
- **[loi]** Aucune cible tapable ne se place dans une zone réservée aux gestes système (balayage de bord, barre d'accueil, encoche) : ces régions appartiennent au système d'exploitation. `TOUCH-R09`
  - vérifiable : aucune cible interactive dans les zones d'exclusion de gestes déclarées par la plateforme
  - source : https://developer.android.com/develop/ui/views/touch-and-input/gestures/gesturenav
- **[loi]** Aucune information ni aucune action ne repose sur le seul survol : sous un pointeur incapable de survoler, la totalité des fonctions reste atteignable, l'appui tenant lieu de signal d'affordance. `TOUCH-R10`
  - vérifiable : sous (hover: none), 100 % des fonctions restent atteignables
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
- **[loi]** L'action se déclenche au relâchement sur la cible et jamais au premier contact ; glisser le doigt hors de la cible avant de lever annule l'action. `TOUCH-R11`
  - vérifiable : aucune action déclenchée sur l'événement de contact ; sortie de la cible avant relâchement = annulation
  - source : https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html
- **[loi]** Le retour haptique est un supplément facultatif et jamais un canal unique : il est absent de nombreux appareils et navigateurs et reste désactivable par l'utilisateur. `TOUCH-R12`
  - vérifiable : aucune information ni action portée uniquement par le retour haptique
  - source : https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
- **[loi]** Une cible reste atteignable et activable à 200 % d'agrandissement : ses dimensions dérivent de tokens qui suivent le zoom, jamais d'une valeur absolue figée. `TOUCH-R13`
  - vérifiable : toute cible reste ≥ touch.target-min et activable à 200 % de zoom
  - source : https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html
- **[loi]** La taille confortable et l'espacement minimal sont des exigences d'accessibilité motrice — ils protègent les personnes dont la visée tremble ou manque de précision — et ne se négocient pas au nom de la densité visuelle. `TOUCH-R14`
  - source : https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- **[loi]** Toute cible tactile est également opérable au clavier, porte un indicateur de focus visible et expose un nom et un rôle accessibles : la taille de la cible ne remplace jamais sa sémantique. `TOUCH-R15`
  - vérifiable : toute cible tactile est focalisable au clavier, montre un focus visible et porte un nom accessible programmatiquement déterminable
  - source : https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html
