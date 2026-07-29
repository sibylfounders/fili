---
sujet: surface
nature: foundations
resume: "Ce fichier contient le raisonnement : ce qu'est un plan, quand il mérite d'exister, ce qui le distingue et ce qui survit quand un canal tombe."
selon-contexte: [button, card, collection, color, elevation, input, modal, overlay, spacing, typography]
source: SURFACE-UX.md v1.0.1 + SURFACE-UI.md v1.0.0
empreinte: sha256:0e4a87225d233649
regles: {loi: 6, preference: 15, non_qualifie: 0}
---
# RULES — surface (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une surface est un plan étendu qui porte du contenu et se distingue de son voisinage ; un aplat sans contenu est un décor et non une surface. `SURFACE-R02`
  - vérifiable : tout plan documenté comme surface nomme le contenu qu'il porte et le voisinage dont il se distingue
- **[préférence]** Le système expose quatre rôles de plan — fond de page, surface, surface visée, surface inversée — et un seul cran de profondeur entre le fond de page et la surface. `SURFACE-R03`
  - vérifiable : aucun plan neutre hors des quatre rôles nommés ; aucune surface imbriquée dans une autre surface avec un remplissage différent
  - le secteur : **six systèmes sur six vérifiés exposent une échelle de plans empilables, aucun ne tient un cran unique.
- **[préférence]** Le remplissage d'un plan au survol signale la visée, et le relief signale la pressabilité : ce sont deux signaux distincts, jamais synonymes. `SURFACE-R04`
  - vérifiable : un plan qui gagne un remplissage au survol sans être actionnable ne gagne aucune élévation
  - le secteur : **Atlassian impose l'inverse** — sa documentation d'élévation prescrit explicitement d'apparier toujours `elevation.
- **[préférence]** Le remplissage de survol d'un plan n'est pas soumis au seuil de 3:1, mais les couples texte/fond qu'il crée sont vérifiés au même seuil que le repos. `SURFACE-R05`
  - vérifiable : contraste texte / remplissage de survol vérifié à 4,5:1 pour tout texte fonctionnel posé dessus
- **[préférence]** Une surface se distingue par son remplissage, son trait, son rayon ou son élévation ; l'absence des quatre signifie que le plan n'a pas lieu d'exister. `SURFACE-R06`
  - vérifiable : tout plan documenté comme surface déclare lequel ou lesquels des quatre canaux le distingue
- **[loi]** En mode de couleurs forcées, les remplissages de deux plans adjacents sont ramenés à la même couleur système et cessent de les distinguer, les ombres sont supprimées, et seul le trait survit en étant recoloré. `SURFACE-R07`
  - vérifiable : toute surface dont la frontière porte de l'information reste identifiable en couleurs forcées par un trait ou par son contenu
  - le secteur : la nuance corrige un raccourci répandu — et le nôtre.
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
- **[loi]** Un plan qui constitue le seul signal d'identification d'un composant d'interface atteint 3:1 avec les couleurs adjacentes, et aucune ombre n'est comptée dans ce calcul. `SURFACE-R08`
  - vérifiable : contraste plan / voisinage ≥ 3:1 dès que le plan est le seul signal d'identification ; aucune ombre incluse dans la mesure
  - source : https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- **[préférence]** Un plan devient une surface s'il porte un contenu nommable et autonome, si sa frontière doit être perçue, s'il change d'état, ou s'il vit sur une autre couche du flux. `SURFACE-R09`
  - vérifiable : toute surface documentée cite laquelle des quatre conditions la justifie
- **[préférence]** L'espace est essayé avant le plan, et le plan avant le trait ; un plan qui ne fait rien que l'espace ne ferait pas n'est pas créé. `SURFACE-R10`
  - vérifiable : aucun plan créé là où une modification d'espacement produit la même lecture
- **[préférence]** Les rôles de plan appartiennent au registre neutre : un plan neutre ne porte jamais d'état sémantique, et un fond sémantique n'est pas un rôle de plan. `SURFACE-R11`
  - vérifiable : aucun jeton sémantique employé comme rôle de plan neutre, et réciproquement
- **[loi]** Le plan inversé est un rôle nommé qui se consomme avec son couple de texte et de trait, et jamais en réutilisant les jetons prévus pour fond clair. `SURFACE-R12`
  - vérifiable : tout usage du plan inversé consomme les jetons de texte et de trait inversés associés
  - le secteur : **le système se contredit lui-même sur ce rôle, et cette fondation ne tranche pas.
- **[loi]** Un plan s'écarte du fond de page dans la direction que le thème impose — plus sombre en thème clair, plus clair en thème sombre — et les valeurs de plan appartiennent au thème. `SURFACE-R13`
  - vérifiable : aucune valeur de remplissage de plan écrite hors de la définition de thème ; l'écart entre fond de page et surface est conservé dans les deux thèmes
  - source : https://carbondesignsystem.com/elements/color/usage/
- **[préférence]** Le système ne renforce aujourd'hui aucun plan sous la préférence de contraste élevé ; cette absence est une position déclarée et non un oubli. `SURFACE-R14`
  - vérifiable : aucune règle de plan conditionnée à prefers-contrast à ce jour
- **[préférence]** Un plan situe le contenu et ne promet aucune action ; la promesse d'action vient du relief, du trait, du curseur et de la sémantique. `SURFACE-R17`
  - vérifiable : aucun plan non actionnable ne se distingue par un canal réservé aux éléments actionnables

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Plan employé comme seul signal d'identification d'un composant | Composant invisible — 1,10:1 contre 3:1 requis (WCAG 1.4.11) | Critique |
| Surface distinguée par son seul remplissage | Fusion avec le plan voisin en couleurs forcées — la frontière n'existe plus | Élevée |
| Remplissage de survol lu comme une promesse de clic | Affordance mensongère : « visé » confondu avec « pressable » | Élevée |
| Texte fonctionnel posé sur un plan dont la paire n'est pas déclarée | Contraste non vérifié — le seuil se juge par paire, pas par jeton | Élevée |
| Deux plans neutres imbriqués | Indiscernables — le système n'a qu'un cran | Moyenne à élevée |
| Plan inversé consommé sans son couple texte/trait | Texte clair sur clair, ou trait absent | Moyenne à élevée |
| Inflation de plans (un fond gris par bloc) | Damier sans hiérarchie — l'espace devait suffire | Moyenne |
| Plan neutre chargé d'un sens sémantique | Registres mélangés (COLOR-R04) — le neutre se met à parler | Moyenne |
| Remplissage de plan écrit en dur | Le thème ne peut plus l'inverser — surface figée en sombre | Moyenne |
