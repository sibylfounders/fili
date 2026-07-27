---
sujet: accordion
nature: components
resume: "Un **disclosure** : un en-tête révèle ou masque une région de contenu."
selon-contexte: [border, spacing]
source: ACCORDION-UX.md v1.0.0 + ACCORDION-UI.md v1.0.0
empreinte: sha256:380f17559719c5cc
regles: {loi: 5, preference: 3, non_qualifie: 0}
---
# RULES — accordion (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Chaque section d'un accordéon est révélée ou masquée par un en-tête qui est un bouton ; le contenu replié n'est pas détruit et sa réouverture restitue l'état précédent. `ACCORDION-R01`
  - vérifiable : l'en-tête de section est un élément bouton ; le contenu replié reste dans le document et retrouve son état à la réouverture
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- **[préférence]** Plusieurs sections d'un accordéon peuvent être ouvertes simultanément ; la fermeture automatique des autres sections à l'ouverture d'une section est une option demandée explicitement, jamais le comportement par défaut. `ACCORDION-R02`
  - vérifiable : par défaut, ouvrir une section ne referme aucune autre section
- **[loi]** L'en-tête d'une section est un bouton portant aria-expanded et aria-controls vers sa région, laquelle est nommée par cet en-tête ; lorsque les en-têtes structurent la page, le bouton est l'unique enfant d'un élément de titre de niveau cohérent, et Entrée comme Espace basculent l'état. `ACCORDION-R03`
  - vérifiable : chaque en-tête porte un bouton avec aria-expanded et aria-controls ; le bouton est l'unique enfant de l'élément de titre ; Entrée et Espace basculent la section
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- **[loi]** L'ouverture ou la fermeture d'une section ne déplace ni le focus ni le contenu déjà sous le pointeur : le focus reste sur l'en-tête activé, la tabulation entre et sort librement, et aucun piège de focus n'est posé. `ACCORDION-R04`
  - vérifiable : après activation, le focus reste sur l'en-tête ; Tab et Maj+Tab traversent l'accordéon sans être retenus
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- **[loi]** L'état ouvert ou fermé d'une section se lit à un indicateur non chromatique — chevron orienté, signe plus ou moins — et jamais à la seule couleur. `ACCORDION-R05`
  - vérifiable : l'état ouvert se distingue de l'état fermé par au moins un signal non chromatique
- **[loi]** Le dépliage et le repliage d'une section sont un mouvement sur place emprunté aux tokens de mouvement, et deviennent une bascule instantanée lorsque l'utilisateur a demandé moins de mouvement, sans jamais escamoter de contenu. `ACCORDION-R06`
  - vérifiable : sous prefers-reduced-motion: reduce, la bascule est instantanée ; aucune durée ni courbe en dur
  - source : https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

## Non couvert — poser la question, ne rien trancher

- Superposé (modal) : Un contenu qui recouvre et piège.
