---
sujet: collection
nature: patterns
resume: "Ce pattern orchestre **une grille d'items et ses outils** : la zone de collection, la mécanique des colonnes, la croissance (charger plus, pagination), le tri et les filtres, les états de…"
selon-contexte: [adaptive, card, grid, spacing]
source: COLLECTION-UX.md v1.0.0 + COLLECTION-UI.md v1.0.0
empreinte: sha256:fb506c7542e5a2ef
regles: {loi: 5, preference: 27, non_qualifie: 0}
---
# RULES — collection (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Une collection d'items homogènes présente des items de même poids et de même largeur, disposés sur une grille dont les colonnes émergent d'une largeur minimale d'item. `COLLECTION-R04`
- **[préférence]** Une collection composée dispose des blocs de tailles différentes sur une grille explicite à colonnes égales, chaque bloc occupant un nombre entier de cellules, le nombre de colonnes se choisissant sur le contenu plutôt que sur un nombre canonique repris d'un autre système. `COLLECTION-R05`
  - vérifiable : toute portée de bloc s'exprime en nombre entier de colonnes
- **[préférence]** Une même collection n'applique qu'un seul régime de grille ; une collection composée peut contenir une collection d'items homogènes, jamais l'inverse. `COLLECTION-R06`
- **[préférence]** Le nombre de colonnes d'une collection se déduit de la largeur minimale d'un item et de l'espace réellement disponible dans son conteneur, jamais d'une classe d'appareil ni d'un point de rupture intermédiaire. `COLLECTION-R07`
  - vérifiable : aucune requête média ne fixe un nombre de colonnes de collection
- **[préférence]** Sous le point de rupture mobile, la collection s'affiche en colonne unique occupant toute la largeur disponible. `COLLECTION-R08`
  - vérifiable : une seule colonne d'items en dessous du point de rupture mobile
- **[préférence]** La dernière rangée incomplète conserve la largeur d'item des rangées pleines : aucun item ne s'étire pour combler l'espace restant. `COLLECTION-R09`
  - vérifiable : la largeur d'item de la dernière rangée est égale à celle des rangées précédentes
- **[loi]** Le passage d'un nombre de colonnes à un autre préserve l'ordre de lecture, l'ordre du document et l'ordre de focus ; la mise en avant d'un item se décide par son rang, jamais par une réorganisation visuelle qui contredit l'ordre programmatique. `COLLECTION-R10`
  - vérifiable : l'ordre visuel des items est identique à l'ordre du document à toutes les largeurs ; aucune propriété d'ordre CSS sur les items
  - source : https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html
- **[préférence]** Une collection réduite à un ou deux items conserve la grille et les largeurs de la collection pleine, sans mise en scène particulière du petit nombre. `COLLECTION-R11`
- **[préférence]** Une collection n'utilise qu'une seule valeur de gouttière, identique entre colonnes et rangées, prise dans l'échelle d'espacement du système et appariée à la densité de la collection. `COLLECTION-R12`
  - vérifiable : gouttière horizontale égale à la gouttière verticale, résolue vers un token d'espacement
- **[préférence]** La zone de collection peut se distinguer du fond de page par une surface propre, qui englobe la grille et ses outils comme une seule région perçue. `COLLECTION-R13`
- **[préférence]** Les outils portant sur l'ensemble de la collection — tri, filtres, recherche, compteur — occupent une position constante au-dessus de la grille ; un contrôle qui ne porte que sur un item appartient à cet item. `COLLECTION-R14`
- **[préférence]** Le tri appliqué par défaut est visible et nommé dans l'interface : une collection n'arrive jamais triée silencieusement. `COLLECTION-R15`
  - vérifiable : un libellé de tri est affiché à l'arrivée sur la collection
- **[préférence]** Un filtre actif dès l'arrivée sur la collection est déclaré visiblement : aucune restriction du jeu de résultats n'est appliquée sans que l'utilisateur puisse la constater. `COLLECTION-R16`
- **[loi]** Les filtres actifs restent affichés, chacun retirable d'un seul geste, et le compteur de résultats reflète le jeu filtré à chaque changement. `COLLECTION-R17`
  - vérifiable : chaque filtre actif est affiché avec un moyen de retrait direct ; le nombre affiché par le compteur correspond au jeu de résultats filtré
  - source : https://carbondesignsystem.com/patterns/filtering/
- **[préférence]** Par défaut, une collection longue s'étend sur demande explicite de l'utilisateur, sans déplacer sa position de lecture ni éloigner le pied de page. `COLLECTION-R19`
- **[préférence]** La pagination remplace l'extension à la demande lorsque la position d'un résultat doit être adressable — citée, retrouvée ou comparée. `COLLECTION-R20`
- **[préférence]** Le défilement infini n'est jamais le seul moyen de parcourir une collection : il est doublé d'un chemin fini, et il est exclu d'un écran dont le pied de page doit rester atteignable. `COLLECTION-R21`
- **[préférence]** Le retour à une collection déjà consultée en restaure la position, le tri et les filtres. `COLLECTION-R22`
- **[préférence]** L'échec du chargement d'un incrément laisse en place les items déjà affichés et propose une reprise locale de la seule opération échouée. `COLLECTION-R23`
- **[préférence]** Au chargement initial, les marques d'attente occupent un nombre de cellules stable, de sorte que l'arrivée du contenu ne déplace pas la grille, et rien ne s'anime. `COLLECTION-R24`
  - vérifiable : aucun décalage de mise en page mesurable entre l'état d'attente et l'état chargé
- **[loi]** Un tri ou un filtrage réorganise la grille sobrement et sans changement de contexte — ni déplacement du focus, ni changement de vue imposé ; sous préférence de mouvement réduit, le nouveau résultat remplace l'ancien sans transition. `COLLECTION-R25`
  - vérifiable : sous préférence de mouvement réduit, aucune transition ni animation au changement de tri ou de filtre
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **[loi]** Tout changement du jeu de résultats est annoncé aux technologies d'assistance par un message de statut déterminable programmatiquement, qui ne prend pas le focus. `COLLECTION-R26`
  - vérifiable : le compteur de résultats est exposé dans une région live polie et sa valeur change à chaque changement de résultats
  - source : https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
- **[préférence]** L'uniformité de largeur, de rythme, d'ordre et de règles est le contrat d'une collection : la mise en avant d'un item passe par son rang, par sa taille en cellules ou par son contenu, jamais par une exception locale à ce contrat. `COLLECTION-R32`

## Non couvert — poser la question, ne rien trancher

- Table de données : Le besoin est un tableau à colonnes triables.
