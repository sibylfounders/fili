---
sujet: adaptive
nature: principles
resume: "Ce principe s'applique indépendamment de React et de CSS : un composant réutilisable"
selon-contexte: []
source: ADAPTIVE-UX.md v1.1.0 + ADAPTIVE-UI.md v1.1.0
empreinte: sha256:bcc679dee265b0f6
regles: {loi: 13, preference: 14, non_qualifie: 0}
---
# RULES — adaptive (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une décision de mise en page qui dépend de la fenêtre est portée par la fenêtre, et une décision qui dépend de l'espace reçu par un composant réutilisable est portée par son conteneur : une requête média n'évalue que la fenêtre, une requête de conteneur évalue le conteneur. `ADAPTIVE-R01`
- **[loi]** Une décision de structure globale répond au viewport ou à l'environnement ; une décision interne à un composant réutilisable répond à l'espace réellement disponible dans son conteneur, la largeur de la fenêtre ne décrivant pas cet espace. `ADAPTIVE-R02`
- **[loi]** Les préférences et capacités d'environnement — mouvement réduit, schéma de couleur, contraste préféré, couleurs forcées, impression, survol et type de pointeur — restent exprimées par requête média : elles décrivent l'utilisateur et le mode de rendu, jamais la largeur d'un composant. `ADAPTIVE-R03`
- **[loi]** Quand la cause de l'adaptation est la largeur disponible du composant, le mécanisme est la requête de conteneur ; elle n'est pas employée lorsqu'une grille, un retour à la ligne ou une taille intrinsèque résout déjà la disposition. `ADAPTIVE-R04`
- **[préférence]** Les états adaptatifs portent des noms de capacité — compact, regular, expanded — et jamais des noms d'appareil comme mobile, tablet ou desktop. `ADAPTIVE-R05`
- **[préférence]** Le seuil d'un état dérive du contenu — le point où le libellé, les actions ou la disposition cessent de tenir correctement — et ne recopie pas un point de rupture global de la fenêtre. `ADAPTIVE-R06`
- **[préférence]** Les seuils ne sont pas partagés entre composants : deux composants atteignent leur état compact à des largeurs différentes lorsque leur contenu et leur structure diffèrent. `ADAPTIVE-R07`
- **[préférence]** L'espace disponible peut modifier la disposition interne, la densité et les espacements dans les limites du composant, l'ordre visuel tant que l'ordre de lecture reste logique, la longueur d'un libellé lorsqu'une alternative validée existe, la présence d'informations secondaires et le regroupement d'actions secondaires dans un menu accessible. `ADAPTIVE-R08`
- **[préférence]** L'espace disponible ne modifie jamais la nature d'une action ou d'une navigation, la priorité réelle d'une action, l'information nécessaire pour décider, le nom accessible d'un contrôle, l'ordre de lecture, ni l'énoncé d'une obligation légale, d'un risque ou d'une erreur à corriger. `ADAPTIVE-R09`
- **[loi]** Le plus petit état viable d'un composant conserve l'intention principale, le contexte minimal pour la comprendre et l'accès à toutes les fonctions essentielles : la réduction de l'espace n'entraîne aucune perte d'information ni de fonctionnalité. `ADAPTIVE-R10`
- **[loi]** Un accroissement de l'espace ne peut que révéler des descriptions, des métadonnées ou des actions secondaires ; une information nécessaire à la décision est présente dès l'état compact et n'est jamais différée à un état plus large. `ADAPTIVE-R11`
- **[loi]** Un contrôle réduit à sa seule icône conserve un nom accessible programmatiquement déterminable et s'appuie sur une icône déjà reconnue dans le système ; l'infobulle qui l'accompagne se déclenche au pointeur comme au focus clavier et reste écartable, survolable et persistante. `ADAPTIVE-R12`
- **[préférence]** Le composant possède son adaptation : son consommateur choisit le contexte et la largeur qu'il lui accorde, sans maintenir une série de surcharges propres à chaque page. `ADAPTIVE-R13`
- **[loi]** Un composant ne présume pas qu'une fenêtre large lui accorde un conteneur large : il reste fonctionnel en barre latérale, en modale, en cellule de grille, en panneau divisé et en pleine largeur, l'espace disponible étant indépendant du type d'appareil et de la taille de l'écran. `ADAPTIVE-R14`
- **[loi]** Un conteneur de requête est nommé dès que plusieurs ancêtres pourraient y répondre : en l'absence de nom, la requête se résout contre l'ancêtre qualifié le plus proche, qui n'est pas nécessairement celui qui porte le contrat. `ADAPTIVE-R15`
- **[préférence]** Le style de base d'un composant rend son plus petit état viable et les états plus riches sont une amélioration progressive : si le mécanisme d'adaptation n'est pas disponible, le composant reste utilisable. `ADAPTIVE-R18`
- **[loi]** Une bascule d'état adaptative ne constitue pas un changement de contexte : le focus, la valeur saisie et la tâche en cours sont conservés de part et d'autre de la bascule. `ADAPTIVE-R19`

## Consignes d'implémentation

- **[préférence]** Une requête de conteneur n'intervient que lorsque le composant doit réellement changer d'état ; un layout intrinsèque qui résout déjà la disposition — grille, retour à la ligne, tailles intrinsèques — n'est pas remplacé par des seuils. `ADAPTIVE-U01`
- **[préférence]** Le type de conteneur est inline-size lorsque seule la largeur logique pilote le composant ; size, qui applique la containment de taille sur les deux axes et fait s'effondrer l'élément sans taille de bloc contextuelle ou explicite, n'est employé que si une condition sur l'axe de bloc est réellement interrogée. `ADAPTIVE-U02`
- **[préférence]** Le conteneur de requête est nommé dès qu'un composant peut être imbriqué dans plusieurs conteneurs de requête, le nom exprimant le contrat et écartant la résolution implicite contre l'ancêtre qualifié le plus proche. `ADAPTIVE-U03`
- **[préférence]** Les seuils s'expriment en unités logiques et relatives — rem, unités de conteneur, pourcentages — et sont déclarés dans le fichier du composant propriétaire, accompagnés de la raison qui les a fait émerger. `ADAPTIVE-U04`
- **[préférence]** Le CSS de base rend l'état compact viable et les requêtes successives enrichissent vers regular puis expanded, ces états n'étant déclarés que s'ils existent réellement. `ADAPTIVE-U05`
- **[préférence]** Le nombre de seuils d'un composant est égal au nombre de changements structurels observables ; un seuil sans changement sémantique ou spatial net est supprimé. `ADAPTIVE-U06`
- **[préférence]** Un état qui ne dépend que de la place disponible est calculé par CSS et n'est pas exposé en propriété de composant : l'API n'oblige pas le consommateur à synchroniser JavaScript et disposition. `ADAPTIVE-U07`
- **[loi]** Le masquage complet ne s'applique qu'à du contenu secondaire dont l'absence a été autorisée par la couche UX ; une action essentielle reste atteignable dans tous les états, au besoin regroupée dans un menu accessible. `ADAPTIVE-U08`
- **[loi]** L'ordre du DOM porte un ordre de lecture correct dans tous les états : la mise en page peut déplacer visuellement des éléments sans réordonner le sens, et un déplacement qui change le sens impose de repenser la structure. `ADAPTIVE-U09`
- **[loi]** Une variante en icône seule conserve son nom accessible : le libellé est masqué visuellement par la technique commune du système, jamais retiré du nom accessible. `ADAPTIVE-U10`
