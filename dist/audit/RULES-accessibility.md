---
sujet: accessibility
nature: principles
resume: "Ce fichier pose les **obligations universelles** d'accessibilité que tout composant, pattern, fondation et langage doit respecter — le contrat minimal, pas le détail."
selon-contexte: []
source: ACCESSIBILITY-UX.md v1.1.0
empreinte: sha256:7e385fb61c6490d8
regles: {loi: 8, preference: 2, non_qualifie: 0}
---
# RULES — accessibility (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Toute fonction doit être utilisable au clavier seul, atteignable et activable sans souris ni écran tactile. `ACCESSIBILITY-R04`
  - vérifiable : chaque fonction est atteignable et activable au clavier seul, sans souris ni tactile
  - source : https://www.w3.org/TR/WCAG22/
- **[loi]** Aucune fonction ne doit dépendre uniquement du survol, d'un geste complexe, du glisser-déposer ou de la parole. `ACCESSIBILITY-R06`
  - vérifiable : aucune fonction ne dépend uniquement du survol, d'un geste complexe, du glisser-déposer ou de la parole — une alternative à pointeur unique ou clavier existe
  - source : https://www.w3.org/WAI/WCAG22/Understanding/input-modalities.html
- **[loi]** Le focus clavier doit toujours être visible, suivre un ordre cohérent, ne jamais être piégé ni masqué par un élément superposé. `ACCESSIBILITY-R07`
  - vérifiable : le focus clavier reste visible, suit un ordre cohérent, n'est jamais piégé dans une zone, et n'est jamais masqué par un élément superposé
  - source : https://www.w3.org/TR/WCAG22/
- **[loi]** Chaque contrôle doit exposer nom, rôle et valeur à l'arbre d'accessibilité, et son nom accessible doit contenir le libellé affiché. `ACCESSIBILITY-R08`
  - vérifiable : chaque contrôle expose nom, rôle et valeur à l'arbre d'accessibilité, et son nom accessible contient le libellé visible à l'écran
  - source : https://www.w3.org/TR/WCAG22/
- **[loi]** Aucune information ni instruction ne doit reposer uniquement sur une caractéristique sensorielle ou sur la couleur. `ACCESSIBILITY-R09`
  - vérifiable : aucune information ou instruction ne repose uniquement sur une caractéristique sensorielle ou sur la couleur
  - source : https://www.w3.org/TR/WCAG22/
- **[loi]** Une alternative simple doit exister pour tout geste complexe ou glisser-déposer, et une action grave ne doit jamais se déclencher au pointerdown seul. `ACCESSIBILITY-R10`
  - vérifiable : toute action grave se déclenche au relâchement du pointeur, jamais au pointerdown seul, et reste annulable ; tout geste complexe a une alternative simple
  - source : https://www.w3.org/WAI/WCAG22/Understanding/input-modalities.html
- **[loi]** Toute cible interactive doit mesurer au moins 24 × 24 pixels CSS ou bénéficier d'un espacement équivalent, sauf exceptions prévues. `ACCESSIBILITY-R11`
  - vérifiable : chaque cible interactive mesure au moins 24 × 24 pixels CSS, ou bénéficie d'un espacement équivalent, sauf exception normative
  - source : https://www.w3.org/WAI/WCAG22/Understanding/input-modalities.html
- **[préférence]** Nous appliquons les mécanismes normatifs pour toute limite de temps imposée, et renforçons l'exigence en annonçant et préservant les données déjà saisies. `ACCESSIBILITY-R12`
  - vérifiable : toute limite de temps applique un mécanisme (suppression, ajustement préalable ou prolongation avertie), et un message annonce l'expiration en préservant les données saisies
- **[loi]** Aucun contenu ne doit produire de flash dangereux — au maximum trois flashs par seconde, dans le respect des seuils établis. `ACCESSIBILITY-R13`
  - vérifiable : aucun contenu ne clignote plus de trois fois par seconde, et les seuils de flash général et de flash rouge sont respectés
  - source : https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html
- **[préférence]** Nous testons chaque écran assemblé avant livraison avec le clavier seul, un lecteur d'écran, le zoom 200 %, un usage tactile imprécis et le mode mouvement réduit. `ACCESSIBILITY-R14`

## Non couvert — poser la question, ne rien trancher

- Mode sombre : Maintenir les contrastes et la hiérarchie.
- Notifications interruptives : Éviter et contrôler les interruptions non urgentes.
