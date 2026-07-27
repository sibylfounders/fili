---
sujet: adaptive
nature: principles
resume: "Ce principe s'applique indépendamment de React et de CSS : un composant réutilisable"
selon-contexte: []
source: ADAPTIVE-UX.md v1.1.0 + ADAPTIVE-UI.md v1.1.0
empreinte: sha256:bcc679dee265b0f6
regles: {loi: 13, preference: 14, non_qualifie: 0}
---
# RULES — adaptive (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Une décision de mise en page qui dépend de la fenêtre est portée par la fenêtre, et une décision qui dépend de l'espace reçu par un composant réutilisable est portée par son conteneur : une requête média n'évalue que la fenêtre, une requête de conteneur évalue le conteneur. `ADAPTIVE-R01`
  - vérifiable : toute adaptation causée par la largeur d'un composant réutilisable est exprimée par une requête de conteneur, jamais par une requête média
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
- **[loi]** Une décision de structure globale répond au viewport ou à l'environnement ; une décision interne à un composant réutilisable répond à l'espace réellement disponible dans son conteneur, la largeur de la fenêtre ne décrivant pas cet espace. `ADAPTIVE-R02`
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
- **[loi]** Les préférences et capacités d'environnement — mouvement réduit, schéma de couleur, contraste préféré, couleurs forcées, impression, survol et type de pointeur — restent exprimées par requête média : elles décrivent l'utilisateur et le mode de rendu, jamais la largeur d'un composant. `ADAPTIVE-R03`
  - vérifiable : aucune de ces préférences n'est exprimée par une requête de conteneur
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **[loi]** Quand la cause de l'adaptation est la largeur disponible du composant, le mécanisme est la requête de conteneur ; elle n'est pas employée lorsqu'une grille, un retour à la ligne ou une taille intrinsèque résout déjà la disposition. `ADAPTIVE-R04`
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
- **[préférence]** Les états adaptatifs portent des noms de capacité — compact, regular, expanded — et jamais des noms d'appareil comme mobile, tablet ou desktop. `ADAPTIVE-R05`
  - vérifiable : aucun nom d'état, de classe ou de token adaptatif ne contient mobile, tablet ou desktop
- **[préférence]** Le seuil d'un état dérive du contenu — le point où le libellé, les actions ou la disposition cessent de tenir correctement — et ne recopie pas un point de rupture global de la fenêtre. `ADAPTIVE-R06`
  - vérifiable : aucun seuil de composant n'est défini par référence à un token de point de rupture global
- **[préférence]** Les seuils ne sont pas partagés entre composants : deux composants atteignent leur état compact à des largeurs différentes lorsque leur contenu et leur structure diffèrent. `ADAPTIVE-R07`
- **[préférence]** L'espace disponible peut modifier la disposition interne, la densité et les espacements dans les limites du composant, l'ordre visuel tant que l'ordre de lecture reste logique, la longueur d'un libellé lorsqu'une alternative validée existe, la présence d'informations secondaires et le regroupement d'actions secondaires dans un menu accessible. `ADAPTIVE-R08`
- **[préférence]** L'espace disponible ne modifie jamais la nature d'une action ou d'une navigation, la priorité réelle d'une action, l'information nécessaire pour décider, le nom accessible d'un contrôle, l'ordre de lecture, ni l'énoncé d'une obligation légale, d'un risque ou d'une erreur à corriger. `ADAPTIVE-R09`
  - vérifiable : le nom accessible et l'ordre de lecture d'un composant sont identiques dans tous ses états
- **[loi]** Le plus petit état viable d'un composant conserve l'intention principale, le contexte minimal pour la comprendre et l'accès à toutes les fonctions essentielles : la réduction de l'espace n'entraîne aucune perte d'information ni de fonctionnalité. `ADAPTIVE-R10`
  - vérifiable : à une largeur équivalente à 320 px CSS (1280 px à 400 % de zoom), aucune perte d'information ni de fonctionnalité et aucun défilement en deux dimensions
  - source : https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- **[loi]** Un accroissement de l'espace ne peut que révéler des descriptions, des métadonnées ou des actions secondaires ; une information nécessaire à la décision est présente dès l'état compact et n'est jamais différée à un état plus large. `ADAPTIVE-R11`
  - vérifiable : toute information requise pour agir est présente dans l'état le plus étroit
  - source : https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- **[loi]** Un contrôle réduit à sa seule icône conserve un nom accessible programmatiquement déterminable et s'appuie sur une icône déjà reconnue dans le système ; l'infobulle qui l'accompagne se déclenche au pointeur comme au focus clavier et reste écartable, survolable et persistante. `ADAPTIVE-R12`
  - vérifiable : tout contrôle en icône seule expose un nom accessible ; toute infobulle apparaît aussi au focus clavier
  - source : https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html
- **[préférence]** Le composant possède son adaptation : son consommateur choisit le contexte et la largeur qu'il lui accorde, sans maintenir une série de surcharges propres à chaque page. `ADAPTIVE-R13`
  - vérifiable : aucune surcharge de disposition d'un composant réutilisable dans le code appelant
- **[loi]** Un composant ne présume pas qu'une fenêtre large lui accorde un conteneur large : il reste fonctionnel en barre latérale, en modale, en cellule de grille, en panneau divisé et en pleine largeur, l'espace disponible étant indépendant du type d'appareil et de la taille de l'écran. `ADAPTIVE-R14`
  - vérifiable : chaque composant réutilisable est vérifié dans au moins deux contextes de largeur différents à viewport constant
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
- **[loi]** Un conteneur de requête est nommé dès que plusieurs ancêtres pourraient y répondre : en l'absence de nom, la requête se résout contre l'ancêtre qualifié le plus proche, qui n'est pas nécessairement celui qui porte le contrat. `ADAPTIVE-R15`
  - vérifiable : toute requête de conteneur portant sur un composant imbriquable cite un nom de conteneur explicite
  - source : https://www.w3.org/TR/css-contain-3/
- **[préférence]** Le style de base d'un composant rend son plus petit état viable et les états plus riches sont une amélioration progressive : si le mécanisme d'adaptation n'est pas disponible, le composant reste utilisable. `ADAPTIVE-R18`
  - vérifiable : le composant reste utilisable lorsque les règles de requête de conteneur sont ignorées
- **[loi]** Une bascule d'état adaptative ne constitue pas un changement de contexte : le focus, la valeur saisie et la tâche en cours sont conservés de part et d'autre de la bascule. `ADAPTIVE-R19`
  - vérifiable : après une bascule d'état provoquée par un redimensionnement, l'élément focalisé et les valeurs saisies sont inchangés
  - source : https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html
