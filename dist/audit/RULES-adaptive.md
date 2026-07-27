---
sujet: adaptive
nature: principles
resume: "Ce principe s'applique indépendamment de React et de CSS : un composant réutilisable"
selon-contexte: []
source: ADAPTIVE-UX.md v1.1.0 + ADAPTIVE-UI.md v1.1.0
empreinte: sha256:cc4c69360daf8a0f
regles: {loi: 0, preference: 0, non_qualifie: 29}
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

- **[non qualifié]** **la fenêtre définit la page ; le conteneur définit le composant.**
- **[non qualifié]** une décision de structure globale répond au viewport ou à l'environnement. Une décision
- **[non qualifié]** une Media Query reste légitime pour les préférences et capacités d'environnement :
- **[non qualifié]** une Container Query est le mécanisme par défaut quand **la largeur disponible du composant**
- **[non qualifié]** les états adaptatifs se nomment par leur effet ou leur capacité — `compact`, `regular`,
- **[non qualifié]** les seuils viennent du contenu : un état bascule quand le label, les actions ou la mise en
- **[non qualifié]** les seuils ne sont pas nécessairement universels. Deux composants peuvent atteindre leur
- **[non qualifié]** l'espace peut modifier :
- **[non qualifié]** l'espace ne modifie jamais :
- **[non qualifié]** le plus petit état viable conserve l'intention principale, le contexte minimal pour la
- **[non qualifié]** quand l'espace augmente, le composant peut révéler des descriptions, métadonnées ou actions
- **[non qualifié]** une icône seule n'est pas une abréviation gratuite. Elle exige une icône reconnue dans le
- **[non qualifié]** le composant possède son adaptation. Son consommateur choisit le contexte et la largeur ; il
- **[non qualifié]** un composant ne suppose pas qu'un viewport large implique un conteneur large. Il doit
- **[non qualifié]** les conteneurs sont nommés lorsque plusieurs ancêtres pourraient répondre, afin que le
- **[non qualifié]** un composant adaptatif se teste :
- **[non qualifié]** une capture « mobile » et une capture « desktop » ne suffisent plus à prouver l'adaptation
- **[non qualifié]** le style de base est le plus petit état viable ; les états plus riches sont une amélioration
- **[non qualifié]** les adaptations ne provoquent pas de changement inattendu pendant l'interaction. Un panneau
