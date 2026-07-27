---
sujet: accordion
nature: components
resume: "Un **disclosure** : un en-tête révèle ou masque une région de contenu."
selon-contexte: [border, spacing]
source: ACCORDION-UX.md v1.0.0 + ACCORDION-UI.md v1.0.0
empreinte: sha256:380f17559719c5cc
regles: {loi: 5, preference: 3, non_qualifie: 0}
---
# RULES — accordion (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Chaque section d'un accordéon est révélée ou masquée par un en-tête qui est un bouton ; le contenu replié n'est pas détruit et sa réouverture restitue l'état précédent. `ACCORDION-R01`
- **[préférence]** Plusieurs sections d'un accordéon peuvent être ouvertes simultanément ; la fermeture automatique des autres sections à l'ouverture d'une section est une option demandée explicitement, jamais le comportement par défaut. `ACCORDION-R02`
- **[loi]** L'en-tête d'une section est un bouton portant aria-expanded et aria-controls vers sa région, laquelle est nommée par cet en-tête ; lorsque les en-têtes structurent la page, le bouton est l'unique enfant d'un élément de titre de niveau cohérent, et Entrée comme Espace basculent l'état. `ACCORDION-R03`
- **[loi]** L'ouverture ou la fermeture d'une section ne déplace ni le focus ni le contenu déjà sous le pointeur : le focus reste sur l'en-tête activé, la tabulation entre et sort librement, et aucun piège de focus n'est posé. `ACCORDION-R04`
- **[loi]** L'état ouvert ou fermé d'une section se lit à un indicateur non chromatique — chevron orienté, signe plus ou moins — et jamais à la seule couleur. `ACCORDION-R05`
- **[loi]** Le dépliage et le repliage d'une section sont un mouvement sur place emprunté aux tokens de mouvement, et deviennent une bascule instantanée lorsque l'utilisateur a demandé moins de mouvement, sans jamais escamoter de contenu. `ACCORDION-R06`

## Consignes d'implémentation

- **[préférence]** L'en-tête d'accordéon résout son retrait, le rayon de son fond de survol et sa couleur de texte sur les tokens, et son chevron — icône en couleur courante — pivote à l'ouverture par transformation, aux durées et courbes des tokens de mouvement. `ACCORDION-U01`
- **[préférence]** La région ouverte prend son retrait dans l'échelle d'espacement, et la séparation entre deux sections passe d'abord par l'espace, le trait n'intervenant qu'en dernier recours. `ACCORDION-U02`

## Non couvert — poser la question, ne rien trancher

- Superposé (modal) : Un contenu qui recouvre et piège.
