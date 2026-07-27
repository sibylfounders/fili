---
component: interaction
layer: ux
type: language
version: 1.1.0 # 1.1.0 : Interaction devient un langage de premier niveau, distinct des fondations qu'il compose. 1.0.0 : première rédaction — langage d'interaction fondé sur l'affordance honnête : reconnaître le rôle avant de lire, sans imposer une esthétique décorative
last_updated: 2026-07-20
companion: INTERACTION-UI.md
confidence: mixed # les obligations d'accessibilité et de cohérence sont établies ; la matérialité tactile sobre est une décision d'identité interne
---

# Langage d'interaction — Couche UX

> Ce langage définit comment un élément communique son **rôle** avant même que son libellé soit
> lu. Elle ne prescrit ni skeuomorphisme, ni ombre généralisée : elle impose une affordance honnête,
> cohérente et accessible. La traduction visuelle vit dans `INTERACTION-UI.md`.

## Premier principe

RÈGLE : **une interface doit pouvoir être comprise avant d'être lue.** La forme, la structure, la
position et les états indiquent d'abord le rôle ; le mot précise ensuite l'intention.

RÈGLE : ce principe ne remplace jamais le texte accessible. « Reconnaître avant de lire » réduit
l'effort de compréhension ; il n'autorise ni pictogramme ambigu, ni contrôle sans nom.

> **Pourquoi** : une personne parcourt une interface en reconnaissant des régularités avant de lire
> chaque libellé. Quand une action, une navigation et une zone de saisie se ressemblent, elle doit
> interpréter chaque élément au lieu de s'appuyer sur le système.

## Les six intentions

RÈGLE : le rôle précède le style. Le composant se choisit d'après ce qui se produit :

| Intention | Promesse faite à l'utilisateur | Expression canonique |
|---|---|---|
| **Agir** | déclencher un effet dans le contexte actuel | Button |
| **Naviguer** | aller vers une autre ressource ou position | Link |
| **Saisir** | fournir ou modifier une information | Input et contrôles de formulaire |
| **Choisir** | sélectionner une option ou un état | Checkbox, radio, switch, select |
| **Consulter** | lire une information organisée | Texte, Card statique, Panel |
| **Comprendre un état** | recevoir un statut ou un retour | Alert, badge, message explicite |

RÈGLE : deux éléments qui se ressemblent et réagissent de la même façon doivent promettre le même
type de résultat. Inversement, deux rôles différents ne sont pas rendus indiscernables.

RÈGLE : la sémantique native suit l'intention — un bouton reste un bouton, un lien reste un lien, un
champ reste un champ. Le style ne transforme jamais artificiellement l'un en l'autre.

## Les lois d'affordance

### 1. Une action a une présence

RÈGLE : un contrôle manipulable possède une limite et des états perceptibles. Cette présence peut
venir d'un fond, d'une bordure, d'une forme, d'une position ou d'une réaction — pas nécessairement
d'une ombre.

RÈGLE : une action de faible poids peut être visuellement discrète, mais elle ne devient jamais un
faux lien. La hiérarchie module la présence ; elle n'efface pas le rôle.

### 2. Une zone de saisie paraît réceptive

RÈGLE : un champ délimite clairement l'endroit où la valeur sera reçue. Son label, sa bordure, son
contenu et son focus le distinguent d'un bouton et d'une simple surface.

RÈGLE : « réceptif » décrit une fonction, pas un effet imposé. Une ombre interne peut soutenir cette
lecture dans un thème, mais elle n'est ni universelle ni suffisante.

### 3. Une surface organise sans promettre un clic

RÈGLE : une Card statique reste calme. Une Card cliquable reçoit une cible réelle et des signaux
d'interaction supplémentaires. Une surface statique ne copie jamais l'apparence d'un contrôle.

### 4. La profondeur explique une couche

RÈGLE : l'ombre indique une relation spatiale ou un changement d'état ; elle ne décore pas. La
fondation `ELEVATION-UX.md` reste propriétaire de ses niveaux et de leurs usages.

### 5. La couleur renforce, elle ne crée pas seule le sens

RÈGLE : action, navigation, erreur, sélection et focus restent compréhensibles sans perception de la
couleur. Le mot, la forme, la bordure, l'icône ou la position fournissent au moins un second canal.

### 6. Les états confirment la manipulation

RÈGLE : repos, hover, focus, active, loading et disabled sont distincts quand ils existent. Le
changement confirme ce qui arrive ; il ne révèle pas tardivement que l'élément était interactif.

RÈGLE : le focus clavier est un état à part entière, jamais une imitation du hover. L'active peut
donner une sensation de pression, mais cette identité tactile reste subordonnée au focus visible, au
contraste et à `prefers-reduced-motion`.

## Une matérialité fonctionnelle, pas décorative

RÈGLE : la matérialité est **proportionnelle au besoin de compréhension**, pas à l'importance
commerciale. Elle sert particulièrement à distinguer contrôle, réceptacle, surface et superposition.

RÈGLE : un effet visuel est conservé seulement s'il répond à une question vérifiable :

- cet élément est-il manipulable ?
- reçoit-il une information ?
- organise-t-il du contenu ?
- appartient-il à une couche temporaire ?
- son état vient-il de changer ?

RÈGLE : si l'effet ne répond à aucune de ces questions, il est décoratif et ne fait pas partie du
langage d'interaction.

RÈGLE : le système évite le neumorphisme et le glassmorphism comme langage par défaut : ils rendent la
compréhension dépendante d'effets fragiles, coûteux ou insuffisamment contrastés. Un usage ponctuel
reste possible hors composant si l'accessibilité et la performance sont démontrées.

## Cohérence et variation

RÈGLE : un même rôle conserve ses signaux essentiels dans tous les contextes. Une action principale
peut changer de taille ou de disposition ; elle reste identifiable comme action.

RÈGLE : l'adaptation à l'espace ne change jamais la nature du résultat. `ADAPTIVE-UX.md` peut
réorganiser, condenser ou révéler progressivement ; il ne transforme pas une navigation en action.

RÈGLE : la cohérence ne signifie pas uniformité. Button, Link, Input et Card ont justement des
expressions différentes parce qu'ils font des promesses différentes.

## Accessibilité et robustesse

RÈGLE : le langage reste opérant au clavier, au toucher, au zoom, en contraste forcé, sans hover et
avec mouvement réduit. Aucun canal fragile — ombre, vibration, couleur, animation — n'est indispensable.

RÈGLE : une icône seule conserve un nom accessible ; un changement d'état conserve un libellé ou un
état programmatique ; une cible conserve la sémantique native attendue.

RÈGLE : l'apparence cohérente accompagne une identification cohérente : un composant ayant la même
fonction est nommé et représenté de façon constante dans le produit.

## Test de reconnaissance

RÈGLE : toute nouvelle famille de composants passe ces quatre questions :

1. En niveaux de gris, distingue-t-on action, navigation, saisie et information ?
2. Sans hover, les cibles et leurs rôles restent-ils reconnaissables ?
3. Au clavier, le focus et l'état sont-ils visibles sans ambiguïté ?
4. Deux éléments visuellement équivalents produisent-ils un résultat de même nature ?

Un « non » n'appelle pas automatiquement plus d'effets : il appelle d'abord un meilleur composant,
une meilleure sémantique ou une meilleure structure.

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Button rendu comme du texte | Action confondue avec navigation ou information | Élevée |
| Link rendu comme un Button sans nécessité | Navigation annoncée comme action | Élevée |
| Card statique traitée comme cliquable | Affordance mensongère | Élevée |
| Couleur comme seul signal | Sens perdu pour une partie des utilisateurs | Élevée |
| Hover comme révélation de la cible | Fonction invisible au tactile et au clavier | Élevée |
| Ombres et reflets généralisés | Bruit visuel, signal dilué, coût de rendu | Moyenne |
| Pression physique trop animée | Retard, inconfort ou distraction | Moyenne |

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Le rôle et les résultats attendus doivent être cohérents pour des composants identifiés de la même manière | [WCAG 2.2 — 3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification) | Établi |
| La couleur ne doit pas être le seul moyen de transmettre une information | [WCAG 2.2 — 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Établi |
| Les contrôles ont un nom, un rôle et une valeur déterminables | [WCAG 2.2 — 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG22/#name-role-value) | Établi |
| Les affordances et signifiants réduisent l'interprétation nécessaire | Don Norman, *The Design of Everyday Things* | Référence établie en design ; traduction visuelle interne |
| Matérialité fonctionnelle sobre et tactile | Décision d'identité interne, 2026-07-20 | À éprouver par tests utilisateurs |

## À approfondir

- Tester la reconnaissance Button / Link / Input / Card en maquette désaturée et sans hover.
- Éprouver la sensation tactile sur pointer fin, tactile et clavier sans créer de latence perceptible.
- Étendre le contrat aux futurs sélecteurs (checkbox, radio, switch, segmented control).
