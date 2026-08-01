---
sujet: accessibility
nature: principles
resume: "Ce fichier pose les **obligations universelles** d'accessibilité que tout composant, pattern, fondation et langage doit respecter — le contrat minimal, pas le détail."
selon-contexte: []
source: ACCESSIBILITY-UX.md v1.2.0
empreinte: sha256:ccc8def301141b7c
regles: {loi: 10, preference: 2, non_qualifie: 0}
---
# RULES — accessibility (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Toute fonction doit être utilisable au clavier seul, atteignable et activable sans souris ni écran tactile. `ACCESSIBILITY-R04`
- **[loi]** Aucune fonction ne doit dépendre uniquement du survol, d'un geste complexe, du glisser-déposer ou de la parole. `ACCESSIBILITY-R06`
- **[loi]** Le focus clavier doit toujours être visible, suivre un ordre cohérent, ne jamais être piégé ni masqué par un élément superposé. `ACCESSIBILITY-R07`
- **[loi]** Chaque contrôle doit exposer nom, rôle et valeur à l'arbre d'accessibilité, et son nom accessible doit contenir le libellé affiché. `ACCESSIBILITY-R08`
- **[loi]** Aucune information ni instruction ne doit reposer uniquement sur une caractéristique sensorielle ou sur la couleur. `ACCESSIBILITY-R09`
- **[loi]** Une alternative simple doit exister pour tout geste complexe ou glisser-déposer, et une action grave ne doit jamais se déclencher au pointerdown seul. `ACCESSIBILITY-R10`
- **[loi]** Toute cible interactive doit mesurer au moins 24 × 24 pixels CSS ou bénéficier d'un espacement équivalent, sauf exceptions prévues. `ACCESSIBILITY-R11`
- **[préférence]** Nous appliquons les mécanismes normatifs pour toute limite de temps imposée, et renforçons l'exigence en annonçant et préservant les données déjà saisies. `ACCESSIBILITY-R12`
- **[loi]** Aucun contenu ne doit produire de flash dangereux — au maximum trois flashs par seconde, dans le respect des seuils établis. `ACCESSIBILITY-R13`
- **[préférence]** Nous testons chaque écran assemblé avant livraison avec le clavier seul, un lecteur d'écran, le zoom 200 %, un usage tactile imprécis et le mode mouvement réduit. `ACCESSIBILITY-R14`
- **[loi]** Tout attribut de relation ARIA désigne un identifiant porté par un élément présent dans le document. `ACCESSIBILITY-R17`
- **[loi]** Tout élément portant aria-invalid="true" expose un message d'erreur en texte, associé par une relation programmatique. `ACCESSIBILITY-R18`

## Non couvert — poser la question, ne rien trancher

- Mode sombre : Maintenir les contrastes et la hiérarchie.
- Notifications interruptives : Éviter et contrôler les interruptions non urgentes.
