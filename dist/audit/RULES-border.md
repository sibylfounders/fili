---
sujet: border
nature: foundations
resume: "Ce fichier contient le raisonnement : les rôles du trait, le critère délimitant/décoratif, le focus ring."
selon-contexte: [alert, button, card, color, input, motion, overlay, radius, spacing]
source: BORDER-UX.md v1.4.0 + BORDER-UI.md v1.4.0
empreinte: sha256:cd4c6fc6cbe5c218
regles: {loi: 8, preference: 14, non_qualifie: 0}
---
# RULES — border (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un trait doit avoir un rôle explicite — délimiter un élément interactif, grouper du contenu ou séparer deux zones. Le rôle décide de sa couleur et du contraste exigé. `BORDER-R02`
  - source : https://carbondesignsystem.com/elements/color/tokens/
- **[loi]** Si un élément n'est identifiable que par sa bordure, cette bordure doit atteindre un contraste de 3:1 avec son fond. `BORDER-R03`
  - vérifiable : contraste bordure / fond ≥ 3:1
  - source : https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- **[préférence]** Nous utilisons une seule épaisseur de trait, 1px, partout. `BORDER-R04`
  - vérifiable : épaisseur du trait = 1px
  - le secteur : sept systèmes sur neuf relevés exposent une ÉCHELLE d'épaisseurs tokenisée (Atlassian, Material 3, Carbon, Polaris, Fluent 2, Spectrum, Ant Design).
- **[préférence]** Nous ne changeons jamais l'épaisseur d'un trait pour signaler un état : la couleur s'en charge, et le contenu ne bouge pas. `BORDER-R05`
  - vérifiable : épaisseur identique au repos et à l'état
  - le secteur : six systèmes sur neuf relevés font l'inverse et épaississent le trait à l'état.
- **[préférence]** Notre anneau de focus partage partout la même géométrie et le même mécanisme, définis une seule fois ; sa couleur est un cran subtil tokenisé, accordé à la bordure ou à l'état du composant, avec le primary éclairci pour défaut. `BORDER-R06`
- **[préférence]** Chez nous, l'anneau de focus s'ajoute à la bordure existante plutôt que de la remplacer — les deux restent lisibles ensemble. `BORDER-R07`
  - le secteur : le relevé du 2026-07-27 donne le terrain **partagé, et plutôt contre nous** — quatre systèmes remplacent la bordure d'état par l'anneau au focus (Carbon, Primer, GOV.
- **[loi]** L'indicateur de focus ne doit jamais être supprimé sans un remplacement au moins aussi visible. `BORDER-R08`
  - vérifiable : aucun outline supprimé sans équivalent ≥ 3:1
  - source : https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
- **[loi]** L'élément qui a le focus ne doit jamais être masqué, même en partie, par un en-tête collant ou un élément superposé. `BORDER-R09`
  - source : https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
- **[préférence]** Chez nous, l'anneau de focus apparaît instantanément, sans animation. `BORDER-R10`
- **[préférence]** Notre anneau est d'une seule couleur : sur un fond imprévisible il peut se fondre, et nous ne traitons pas encore ce cas. `BORDER-R11`
- **[loi]** Une information portée par un fond ou une ombre disparaît en mode contraste forcé ; le trait, lui, survit — c'est sur lui qu'il faut compter. `BORDER-R12`
  - source : https://developer.mozilla.org/docs/Web/CSS/@media/forced-colors
- **[préférence]** Le trait reste à 1px CSS, y compris sur écran haute densité. `BORDER-R13`
  - vérifiable : 1px CSS, jamais 0.5px
- **[préférence]** Les changements de couleur d'un trait s'animent ; l'apparition de l'anneau de focus, jamais. `BORDER-R14`
- **[loi]** Un même gris n'a pas le même statut selon qu'il délimite, groupe ou sépare : c'est l'usage qui décide, pas la valeur. `BORDER-R16`
  - source : https://carbondesignsystem.com/elements/color/tokens/

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Bordure délimitante sous 3:1 | Composant interactif invisible (WCAG 1.4.11) — deux précédents payés | Critique |
| Focus supprimé sans remplacement | Navigation clavier aveugle — exclusion | Critique |
| Cible focalisée cachée par un sticky/superposé | Focus invisible en usage clavier (WCAG 2.4.11) | Élevée |
| Épaisseur qui change à l'état | Layout shift, focus confondu avec un état du trait | Moyenne à élevée |
| Ring fondu dans le fond | Focus invisible sur fond non prévu | Moyenne à élevée |
| Sur-bordage (traits partout) | Bruit, hiérarchie spatiale illisible — l'espace devait suffire | Moyenne |
| Rôles confondus (décorative promue délimitante sans seuil) | Le guardrail fuit — retour au cas F02 | Moyenne |

## Non couvert — poser la question, ne rien trancher

- Style de trait (dashed, dotted) : Une zone de dépôt appelle un trait pointillé.
