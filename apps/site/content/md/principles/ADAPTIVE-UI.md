---
component: adaptive
layer: ui
type: principle
version: 1.1.0 # 1.1.0 : Adaptive devient un principe de premier niveau ; aucune convention Container Query modifiée. 1.0.0 : première rédaction — conventions Container Queries, frontière avec Media Queries et stratégie de repli
last_updated: 2026-07-20
companion: ADAPTIVE-UX.md
confidence: established
---

# Principe adaptatif — Couche UI (implémentation)

> Les Container Queries sont l'outil actuel de la règle portée par `ADAPTIVE-UX.md`. Ce principe
> n'ajoute aucun breakpoint global : les seuils sont dérivés du contenu de chaque composant.

## Règle de choix

| Cause de l'adaptation | Outil |
|---|---|
| largeur disponible d'un composant réutilisable | Size Container Query |
| structure globale de la page / fenêtre | Media Query ou layout fluide |
| préférence ou capacité (`prefers-reduced-motion`, `forced-colors`, `hover`) | Media Query |
| disposition qui peut se résoudre naturellement | Grid/Flex, `minmax()`, `wrap`, tailles intrinsèques |

RÈGLE : ne pas remplacer un layout intrinsèque qui fonctionne par des seuils. La Container Query
intervient quand le composant doit réellement changer d'état, pas seulement laisser ses éléments
revenir à la ligne.

## Déclaration

Le parent qui définit l'espace disponible devient conteneur de requête :

```css
.card-region {
  container-type: inline-size;
  container-name: card-region;
}

@container card-region (min-width: 30rem) {
  .card {
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  }
}
```

RÈGLE : préférer `inline-size` à `size` quand seule la largeur logique pilote le composant. Cela évite
d'isoler inutilement la dimension de bloc.

RÈGLE : nommer le conteneur dès qu'un composant peut être imbriqué dans plusieurs conteneurs de
requête. Le nom exprime le contrat et évite une dépendance accidentelle au mauvais ancêtre.

RÈGLE : utiliser les unités logiques et relatives (`rem`, `cqi`, pourcentages) ; le seuil exact se
place dans le fichier du composant propriétaire, accompagné de la raison qui l'a fait émerger.

## États

RÈGLE : le CSS de base rend l'état compact viable. Les requêtes successives enrichissent vers
`regular`, puis `expanded` uniquement si ces états existent réellement.

RÈGLE : limiter le nombre de seuils au nombre de changements structurels observables. Un seuil sans
changement sémantique ou spatial net est supprimé.

RÈGLE : les noms d'état ne deviennent pas nécessairement des props React. Si l'état dépend uniquement
de la place, CSS le calcule ; l'API n'oblige pas le consommateur à synchroniser JavaScript et layout.

## Divulgation et accessibilité

RÈGLE : `display: none` n'est appliqué qu'à du contenu secondaire dont l'absence a été autorisée dans
la couche UX. Une action essentielle reste accessible, éventuellement regroupée dans un menu.

RÈGLE : le DOM conserve un ordre de lecture logique dans tous les états. CSS Grid peut déplacer
visuellement sans réordonner le sens ; si le sens change, la structure doit être repensée.

RÈGLE : une version icône seule garde son nom accessible. Le label peut être visuellement masqué avec
la technique commune du système, pas supprimé du nom accessible.

## Media Queries qui restent légitimes

```css
@media (prefers-reduced-motion: reduce) {
  .adaptive-component {
    transition-duration: 0s;
  }
}

@media (forced-colors: active) {
  .adaptive-component {
    border-color: CanvasText;
  }
}
```

Ces requêtes décrivent une préférence ou un mode de rendu global. Elles ne concurrencent pas les
Container Queries de taille.

## Test d'implémentation

- fixer le viewport, redimensionner uniquement le conteneur ;
- tester chaque état avec les textes les plus longs ;
- vérifier juste sous, sur et juste au-dessus de chaque seuil ;
- vérifier le focus avant et après une bascule ;
- inspecter les conteneurs imbriqués et le `container-name` résolu ;
- vérifier que l'état compact reste utilisable si les règles `@container` sont absentes.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| `container-type: inline-size` établit un conteneur pour les requêtes sur l'axe inline | [MDN — CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) | Établi |
| Les conteneurs peuvent être nommés et ciblés par `@container` | [CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3/) | Normatif |
| Base compacte + enrichissement progressif | Décision interne de robustesse, cohérente avec progressive enhancement | Établi comme stratégie interne |
