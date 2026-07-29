---
sujet: surface
nature: foundations
resume: "Ce fichier contient le raisonnement : ce qu'est un plan, quand il mérite d'exister, ce qui le distingue et ce qui survit quand un canal tombe."
selon-contexte: [button, card, collection, color, elevation, input, modal, overlay, spacing, typography]
source: SURFACE-UX.md v1.0.1 + SURFACE-UI.md v1.0.0
empreinte: sha256:0e4a87225d233649
regles: {loi: 6, preference: 15, non_qualifie: 0}
---
# RULES — surface (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une surface est un plan étendu qui porte du contenu et se distingue de son voisinage ; un aplat sans contenu est un décor et non une surface. `SURFACE-R02`
- **[préférence]** Le système expose quatre rôles de plan — fond de page, surface, surface visée, surface inversée — et un seul cran de profondeur entre le fond de page et la surface. `SURFACE-R03`
- **[préférence]** Le remplissage d'un plan au survol signale la visée, et le relief signale la pressabilité : ce sont deux signaux distincts, jamais synonymes. `SURFACE-R04`
- **[préférence]** Le remplissage de survol d'un plan n'est pas soumis au seuil de 3:1, mais les couples texte/fond qu'il crée sont vérifiés au même seuil que le repos. `SURFACE-R05`
- **[préférence]** Une surface se distingue par son remplissage, son trait, son rayon ou son élévation ; l'absence des quatre signifie que le plan n'a pas lieu d'exister. `SURFACE-R06`
- **[loi]** En mode de couleurs forcées, les remplissages de deux plans adjacents sont ramenés à la même couleur système et cessent de les distinguer, les ombres sont supprimées, et seul le trait survit en étant recoloré. `SURFACE-R07`
- **[loi]** Un plan qui constitue le seul signal d'identification d'un composant d'interface atteint 3:1 avec les couleurs adjacentes, et aucune ombre n'est comptée dans ce calcul. `SURFACE-R08`
- **[préférence]** Un plan devient une surface s'il porte un contenu nommable et autonome, si sa frontière doit être perçue, s'il change d'état, ou s'il vit sur une autre couche du flux. `SURFACE-R09`
- **[préférence]** L'espace est essayé avant le plan, et le plan avant le trait ; un plan qui ne fait rien que l'espace ne ferait pas n'est pas créé. `SURFACE-R10`
- **[préférence]** Les rôles de plan appartiennent au registre neutre : un plan neutre ne porte jamais d'état sémantique, et un fond sémantique n'est pas un rôle de plan. `SURFACE-R11`
- **[loi]** Le plan inversé est un rôle nommé qui se consomme avec son couple de texte et de trait, et jamais en réutilisant les jetons prévus pour fond clair. `SURFACE-R12`
- **[loi]** Un plan s'écarte du fond de page dans la direction que le thème impose — plus sombre en thème clair, plus clair en thème sombre — et les valeurs de plan appartiennent au thème. `SURFACE-R13`
- **[préférence]** Le système ne renforce aujourd'hui aucun plan sous la préférence de contraste élevé ; cette absence est une position déclarée et non un oubli. `SURFACE-R14`
- **[préférence]** Un plan situe le contenu et ne promet aucune action ; la promesse d'action vient du relief, du trait, du curseur et de la sémantique. `SURFACE-R17`

## Consignes d'implémentation

- **[préférence]** Tout plan référence l'un des quatre rôles nommés, qui détermine son usage, son seuil et les textes admis dessus. `SURFACE-U01`
- **[préférence]** Le remplissage d'un plan est peint sur une couche dédiée placée sous le contenu, et non sur l'élément porteur. `SURFACE-U02`
- **[préférence]** Le remplissage d'un plan se transitionne sur le cran rapide, l'ombre ne s'interpole jamais, et la préférence de mouvement réduit supprime le déplacement sans supprimer l'état final. `SURFACE-U03`
- **[préférence]** Chaque plan crée ses propres paires texte/fond, qui sont mesurées avant usage ; un texte secondaire ne se pose pas sur le plan de survol tant que la paire n'est pas déclarée. `SURFACE-U04`
- **[préférence]** Le plan inversé se consomme avec son texte et son trait inversés, jamais avec les jetons prévus pour fond clair. `SURFACE-U05`
- **[loi]** Une surface dont la frontière porte de l'information déclare une bordure en couleur système sous le mode de couleurs forcées. `SURFACE-U06`
- **[préférence]** Tout remplissage de plan référence un rôle de jeton ; les substituts de média ne sont pas des plans et sortent du périmètre. `SURFACE-U07`
