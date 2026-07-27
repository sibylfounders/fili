---
component: adaptive
layer: ux
type: principle
version: 1.1.0 # 1.1.0 : Adaptive devient un principe de premier niveau — contrainte contextuelle universelle, sans créer une catégorie Architecture isolée. 1.0.0 : première rédaction — architecture adaptative : la page répond au viewport et à l'environnement ; le composant réutilisable répond à l'espace de son conteneur
last_updated: 2026-07-20
companion: ADAPTIVE-UI.md
confidence: established
---

# Principe adaptatif — Couche UX

> Ce principe s'applique indépendamment de React et de CSS : un composant réutilisable
> s'adapte à l'espace qu'il reçoit, pas au nom supposé de l'appareil. L'implémentation actuelle par
> Container Queries vit dans `ADAPTIVE-UI.md`.

## Principe

RÈGLE : **la fenêtre définit la page ; le conteneur définit le composant.**

RÈGLE : une décision de structure globale répond au viewport ou à l'environnement. Une décision
interne à un composant réutilisable répond à l'espace réellement disponible dans son contexte.

> **Pourquoi** : une Card peut être large dans le contenu principal et étroite dans une sidebar sur
> le même écran. La largeur de la fenêtre ne décrit pas l'espace dont chacune dispose.

## Deux niveaux d'autorité

| Niveau | Question | Exemples |
|---|---|---|
| Page / application | quelle structure globale tient dans la fenêtre ? | navigation latérale → drawer, deux régions → une, marges de page |
| Composant réutilisable | quelle présentation tient dans son conteneur ? | Card verticale → horizontale, actions regroupées, métadonnées réorganisées |

RÈGLE : une Media Query reste légitime pour les préférences et capacités d'environnement :
`prefers-reduced-motion`, contraste forcé, impression, schéma de couleur, hover/pointer. Ces critères
ne décrivent pas une largeur de composant.

RÈGLE : une Container Query est le mécanisme par défaut quand **la largeur disponible du composant**
est la cause de l'adaptation. Elle n'est pas utilisée par réflexe quand une grille ou un flux naturel
suffit.

## États sémantiques, pas appareils

RÈGLE : les états adaptatifs se nomment par leur effet ou leur capacité — `compact`, `regular`,
`expanded` — jamais `mobile`, `tablet`, `desktop`.

RÈGLE : les seuils viennent du contenu : un état bascule quand le label, les actions ou la mise en
page cessent de tenir correctement. Ils ne copient pas automatiquement `breakpoint.mobile`.

RÈGLE : les seuils ne sont pas nécessairement universels. Deux composants peuvent atteindre leur
état `compact` à des largeurs différentes parce que leur contenu et leur structure diffèrent.

## Adaptations autorisées

RÈGLE : l'espace peut modifier :

- la disposition interne ;
- la densité et les espacements dans les limites du composant ;
- l'ordre **visuel** si l'ordre de lecture reste logique ;
- la longueur d'un libellé quand une alternative validée existe ;
- la présence d'informations secondaires ;
- le regroupement d'actions secondaires dans un menu accessible.

RÈGLE : l'espace ne modifie jamais :

- la nature de l'action ou de la navigation ;
- la priorité réelle d'une action ;
- l'information nécessaire pour décider ;
- le nom accessible d'un contrôle ;
- l'ordre DOM au détriment de l'ordre de lecture ;
- une obligation légale, un risque ou une erreur à corriger.

## Divulgation progressive

RÈGLE : le plus petit état viable conserve l'intention principale, le contexte minimal pour la
comprendre et l'accès aux fonctions essentielles.

RÈGLE : quand l'espace augmente, le composant peut révéler des descriptions, métadonnées ou actions
secondaires. Il ne révèle pas tardivement une information nécessaire qui aurait dû être présente dès
l'état compact.

RÈGLE : une icône seule n'est pas une abréviation gratuite. Elle exige une icône reconnue dans le
système, un nom accessible et, si nécessaire, un tooltip au clavier et au pointer.

## Autonomie et composition

RÈGLE : le composant possède son adaptation. Son consommateur choisit le contexte et la largeur ; il
ne maintient pas une série d'overrides propres à chaque page.

RÈGLE : un composant ne suppose pas qu'un viewport large implique un conteneur large. Il doit
fonctionner dans une sidebar, une modale, une grille, un panneau divisé et une page pleine largeur.

RÈGLE : les conteneurs sont nommés lorsque plusieurs ancêtres pourraient répondre, afin que le
composant écoute le bon contexte et non le premier conteneur rencontré par hasard.

## Tests obligatoires

RÈGLE : un composant adaptatif se teste :

1. étroit et large dans **le même viewport** ;
2. dans au moins deux contextes réels ;
3. avec contenu court, long et traduit ;
4. au zoom et avec taille de texte accrue ;
5. au clavier, au toucher et sans hover ;
6. à chaque seuil, juste avant et juste après la bascule.

RÈGLE : une capture « mobile » et une capture « desktop » ne suffisent plus à prouver l'adaptation
d'un composant.

## Dégradation

RÈGLE : le style de base est le plus petit état viable ; les états plus riches sont une amélioration
progressive. Si le mécanisme d'adaptation n'est pas disponible, le composant reste utilisable.

RÈGLE : les adaptations ne provoquent pas de changement inattendu pendant l'interaction. Un panneau
redimensionnable peut basculer d'état, mais le focus, la valeur et la tâche en cours sont conservés.

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Composant piloté par le viewport | Mauvais rendu dans sidebar, modal ou split panel | Élevée |
| Seuil copié d'un appareil | Bascule sans rapport avec le contenu réel | Moyenne |
| Information essentielle masquée en compact | Décision impossible ou trompeuse | Élevée |
| Actions secondaires supprimées | Fonction perdue selon la largeur | Élevée |
| Ordre visuel différent de l'ordre DOM | Lecture et focus incohérents | Élevée |
| Trop de seuils | Comportement difficile à prévoir et tester | Moyenne |
| Conteneurs imbriqués non nommés | Requête déclenchée par le mauvais ancêtre | Moyenne |

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Une Container Query peut appliquer des styles selon la taille, le style ou l'état de défilement d'un conteneur | [MDN — CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) | Établi |
| Les requêtes de taille s'appuient sur un conteneur de requête explicite | [CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3/) | Normatif |
| Le contenu et les fonctions restent disponibles au reflow et au zoom | [WCAG 2.2 — 1.4.10 Reflow](https://www.w3.org/TR/WCAG22/#reflow), [1.4.4 Resize Text](https://www.w3.org/TR/WCAG22/#resize-text) | Établi |
| Noms compact/regular/expanded et seuils dérivés du contenu | Décision d'architecture interne | À éprouver par composant |

## À approfondir

- Formaliser un harness de test qui redimensionne le conteneur sans changer le viewport.
- Éprouver les Container Style Queries quand un besoin de contexte non dimensionnel apparaît.
- Documenter les conventions des futurs composants composites et slots imbriqués.
