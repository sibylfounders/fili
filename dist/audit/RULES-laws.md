---
sujet: laws
nature: principles
resume: "Ce fichier est un **catalogue de lecture théorique** : il nomme les lois de psychologie et d'ergonomie qui fondent les règles déjà écrites ailleurs dans le système, en donne la source, la portée…"
selon-contexte: [alert, border, button, card, cognitive-load, color, form, iconography, input, motion, performance, spacing, voice]
source: LAWS-UX.md v1.3.1
empreinte: sha256:ab6835977b40d862
regles: {loi: 19, preference: 7, non_qualifie: 0}
---
# RULES — laws (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Toute charge mentale imposée par la présentation de l'interface au-delà de la tâche elle-même est une charge extrinsèque à supprimer ; la réduire ne consiste jamais à masquer une décision, qui resterait alors à prendre ailleurs. `LAWS-R06`
  - source : https://mrbartonmaths.com/resourcesnew/8.%20Research/Explicit%20Instruction/Cognitive%20Load%20during%20problem%20solving.pdf
- **[loi]** Aucune limite d'items d'interface — menu, onglets, champs — ne se justifie par Miller (1956) : la seule règle utilisable qui en dérive est le regroupement en unités signifiantes, jamais un plafond numérique. `LAWS-R07`
  - vérifiable : aucune contrainte de cardinalité du système n'est justifiée par une référence à Miller ou au « 7±2 »
  - source : https://psychclassics.yorku.ca/Miller/
- **[loi]** L'information longue ou dense se découpe en unités signifiantes — étapes, groupes visuels, segments de nombres et de dates — plutôt que d'être présentée d'un seul bloc. `LAWS-R08`
  - source : https://labs.la.utexas.edu/gilden/files/2016/04/MagicNumberSeven-Miller1956.pdf
- **[loi]** L'interface n'exige jamais qu'une information soit retenue d'un écran à l'autre : ce qui a déjà été saisi est redonné à voir au moment où il sert, et l'aide nécessaire à une saisie reste visible au lieu de disparaître. `LAWS-R09`
  - vérifiable : aucune donnée déjà saisie n'est redemandée ; aucune aide nécessaire à la saisie n'est masquée après son premier affichage
  - source : https://philpapers.org/rec/COWTMN
- **[préférence]** La progression d'une tâche longue est rendue visible pour aider la reprise, jamais pour exercer une pression : aucune relance ni aucun message n'a pour seul déclencheur le caractère incomplet d'une tâche. `LAWS-R10`
  - vérifiable : aucune notification ni message dont l'unique condition de déclenchement est un taux de complétion inférieur à 100 %
- **[loi]** Aucune information critique ne prend l'apparence d'un élément décoratif ou promotionnel : ce qui ressemble à une publicité est filtré avant lecture, et le mouvement, qui capte l'attention de force, reste parcimonieux. `LAWS-R11`
  - source : https://www.nngroup.com/articles/banner-blindness-original-eyetracking/
- **[préférence]** Chez nous, une vue porte une action dominante et une seule, et chaque registre de couleur porte un sens unique ; réduire le nombre d'options visibles ne consiste jamais à enfouir une option derrière une navigation plus profonde. `LAWS-R12`
  - vérifiable : au plus un bouton primary par vue
- **[préférence]** Le nombre d'actions portées par une carte ou une alerte est plafonné par une règle explicite du composant concerné, et non par un seuil général d'abondance d'options. `LAWS-R13`
- **[loi]** Le temps d'atteinte d'une cible croît avec la distance à parcourir et décroît avec la taille de la cible : une action fréquente est grande et placée près de son contexte d'usage, et les bords d'écran comptent comme des cibles de profondeur infinie. `LAWS-R14`
  - vérifiable : toute action fréquente présente une zone tactile ≥ 44 px CSS (WCAG 2.5.5)
  - source : https://www.nngroup.com/articles/fitts-law/
- **[préférence]** Toute progression affichée reflète l'avancement réel de la tâche : ni étape gonflée, ni avance offerte, ni jauge qui progresse sans travail accompli. `LAWS-R15`
  - vérifiable : la valeur de progression affichée est une fonction du nombre d'étapes réellement franchies sur le nombre d'étapes réellement requises
- **[préférence]** La complexité irréductible d'une tâche est absorbée par le système et non reportée sur la personne : normalisation des saisies, valeurs par défaut sensées, messages qui énoncent la cause et la correction. `LAWS-R16`
- **[loi]** Une saisie est acceptée dans toutes ses formes usuelles — espaces, tirets, parenthèses, casse — puis normalisée en interne ; aucun rejet ne porte sur une forme que le système peut nettoyer, et la validation porte sur le sens. `LAWS-R17`
  - vérifiable : un numéro de téléphone, un numéro de carte ou une adresse e-mail saisis avec espaces, tirets ou casse variable sont acceptés et normalisés sans message d'erreur
  - source : https://design-system.service.gov.uk/patterns/phone-numbers/
- **[préférence]** Aucun token, état ou variante n'est provisionné avant qu'un besoin réel ne l'exige : la solution la plus simple qui répond au besoin constaté est retenue. `LAWS-R18`
  - vérifiable : tout token du système est référencé par au moins un consommateur
- **[loi]** L'aide est contextuelle et disponible dans l'action plutôt que préalable : aucune fonction ne suppose la lecture d'une documentation ou le passage par un tutoriel bloquant avant usage. `LAWS-R19`
  - vérifiable : aucun écran d'apprentissage obligatoire ne précède l'accès à une fonction
  - source : https://www.nngroup.com/articles/paradox-of-the-active-user/
- **[loi]** Le contenu ne se déplace ni ne change de contexte sans action de la personne, et aucune animation ne verrouille l'interaction ; l'interruption n'est légitime que devant un enjeu destructeur ou une perte de données. `LAWS-R20`
  - vérifiable : aucun changement de contexte non déclenché par l'utilisateur (WCAG 3.2.5) ; tout contenu en mouvement ou en mise à jour automatique de plus de 5 s est pausable (WCAG 2.2.2) ; aucune animation ne bloque les entrées
  - source : https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html
- **[loi]** Les éléments rapprochés sont perçus comme un groupe indépendamment de tout trait : l'espacement porte donc l'information de regroupement, avec un écart plus petit à l'intérieur d'un groupe qu'entre deux groupes. `LAWS-R22`
  - vérifiable : l'écart interne à un groupe est strictement inférieur à l'écart qui le sépare du groupe voisin
  - source : https://www.interaction-design.org/literature/topics/gestalt-principles
- **[loi]** Un fond ou un cadre commun regroupe son contenu plus fortement que la proximité seule : un conteneur déclare un groupe et ne s'emploie donc jamais comme simple ornement. `LAWS-R23`
  - source : https://www.interaction-design.org/literature/topics/gestalt-principles
- **[loi]** Les éléments qui partagent forme, couleur ou taille sont perçus comme appartenant à la même famille : un même rôle reçoit toujours le même traitement visuel, et deux rôles distincts n'en partagent jamais un seul. `LAWS-R24`
  - source : https://www.interaction-design.org/literature/topics/gestalt-principles
- **[loi]** Un lien visuel explicite — trait continu ou fond partagé — produit le regroupement le plus fort, au-dessus de la proximité et de la similarité ; il s'emploie là où le groupement doit être sans ambiguïté. `LAWS-R25`
  - source : https://www.interaction-design.org/literature/topics/gestalt-principles
- **[loi]** La perception ramène le complexe à l'arrangement le plus simple : les formes portent le sens indépendamment de la couleur — trait constant en iconographie, silhouettes distinctes selon les états — afin qu'aucune information ne repose sur la seule teinte. `LAWS-R26`
  - source : https://www.interaction-design.org/literature/topics/gestalt-principles
- **[loi]** Un élément qui rompt l'homogénéité de son contexte est mieux mémorisé, et l'effet disparaît dès que la distinction se généralise : l'accent et l'action primaire restent uniques dans leur vue. `LAWS-R27`
  - vérifiable : au plus un élément par vue porte le traitement d'accentuation réservé
  - source : https://link.springer.com/article/10.3758/BF03214414
- **[loi]** Dans une liste, les éléments de tête et de queue sont mieux mémorisés que ceux du milieu : les entrées décisives se placent aux extrémités et jamais au centre d'une longue série. `LAWS-R28`
  - source : https://psychologysorted.blog/wp-content/uploads/2019/07/glanzer-and-cunitz_1966.pdf
- **[loi]** Une réponse du système obtenue sous 400 ms maintient la personne dans son flux et une réponse sous 100 ms est perçue comme instantanée : ces deux seuils bornent l'échelle des durées d'animation et de retour du système. `LAWS-R29`
  - vérifiable : toute durée d'animation ou de retour du système ≤ 400 ms ; retour d'appui perçu instantané ≤ 100 ms
  - source : https://www.computerhistory.org/collections/catalog/102751398
- **[préférence]** L'esthétique et l'utilisabilité se vérifient séparément : un jugement esthétique favorable ne clôt jamais une question d'utilisabilité en revue, car le soin visuel gonfle l'utilisabilité perçue et fait sous-déclarer les défauts en test. `LAWS-R30`
- **[loi]** Le souvenir d'un parcours est dominé par son moment le plus intense et par sa fin : les messages d'erreur et les messages de clôture reçoivent un soin supérieur au reste — calmes et orientés solution pour les premiers, nets et sans sur-célébration pour les seconds. `LAWS-R31`
  - source : https://www.nngroup.com/articles/peak-end-rule/
- **[loi]** Aucune exigence du système ne se formule en nombre de clics : la qualité d'un parcours se juge à l'évidence de chaque étape et à sa progression vers le but, pas au décompte des interactions. `LAWS-R33`
  - vérifiable : aucune règle du système ne fixe un plafond de clics ou de niveaux de profondeur
  - source : https://articles.uie.com/three_click_rule/

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Loi citée hors de sa source (Miller « 7 », 3 clics) | Décision justifiée par un mythe, débat clos à tort | Élevée |
| Loi manipulable retournée en dark pattern (Zeigarnik, Goal-gradient) | Exploitation de l'utilisateur, perte de confiance, enjeu éthique | Élevée |
| Aesthetic-usability qui masque un défaut d'UX en test | Problème réel non détecté car « c'est joli » | Élevée |
| Une seule loi appliquée en ignorant sa tension (Hick vs découvrabilité) | Sur-simplification, fonction enfouie | Moyenne à élevée |
| Loi appliquée mais non nommée (règle sans sa justification) | Règle fragile, indéfendable en revue, dupliquée par ignorance | Moyenne |
| Von Restorff dilué (tout est mis en avant) | Plus aucun point focal — inflation | Moyenne |

## Non couvert — poser la question, ne rien trancher

- Parkinson's Law : Une tâche s'étire pour remplir le temps disponible.
