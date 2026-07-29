---
sujet: chip
nature: components
resume: "Une chip est un **renvoi compact** : elle pointe vers une entité du système (une règle,"
selon-contexte: [border, touch]
source: CHIP-UX.md v1.0.0 + CHIP-UI.md v1.0.0
empreinte: sha256:5ceeb9a7def901e8
regles: {loi: 4, preference: 6, non_qualifie: 0}
---
# RULES — chip (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** la chip porte un renvoi de LECTURE — ouvrir, montrer, faire défiler vers — jamais une action qui modifie l'état. `CHIP-R01`
- **[préférence]** la chip vit en NUÉE — plusieurs renvois côte à côte dans un espace contraint (volet, fiche, tableau) ; isolée et unique, la question « Button ou Link ? » se pose d'abord. `CHIP-R02`
- **[préférence]** le libellé dit l'ENTITÉ, pas l'action — « BUTTON-R12 », « Situations qui l'éprouvent », jamais « Cliquer ici ». `CHIP-R04`
- **[préférence]** un identifiant technique (ID de règle, code) s'affiche en mono — la nature « référence » se lit à la forme. `CHIP-R05`
- **[loi]** la sémantique suit la cible — un `<a>` si la chip navigue, un `<button>` si elle ouvre un volet ou déplace la vue ; jamais un `<div>` cliquable. `CHIP-R06`
- **[loi]** la densité de la nuée ne sacrifie pas la cible — hauteur de frappe effective ≥ touch.target-min, l'espacement de la nuée complète la zone. `CHIP-R07`

## Consignes d'implémentation

- **[préférence]** deux factures — `outline` (fond de page, filet `border`) et `subtle` (fond `surface`, sans filet) ; le survol signale par la bordure/le fond, jamais par un déplacement. `CHIP-U01`
- **[préférence]** le rayon est `radius.md` — la chip n'entre PAS dans la grammaire du relief posé (pas de [data-style], pas d'ombre, pas d'enfoncement) : c'est un renvoi, pas un objet qu'on presse. `CHIP-U02`
- **[loi]** focus visible = la géométrie unique de BORDER (`.ds-focus-ring`, outline + offset tokenisés) en cran `control.focus-color`. `CHIP-U03`
- **[loi]** la flèche de déplacement (`→`) est du TEXTE dans le libellé chez le consommateur ou l'icône 12px du slot — jamais une image décorative séparée du nom accessible. `CHIP-U04`
