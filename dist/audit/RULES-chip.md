---
sujet: chip
nature: components
resume: "Une chip est un **renvoi compact** : elle pointe vers une entité du système (une règle,"
selon-contexte: [border, touch]
source: CHIP-UX.md v1.0.0 + CHIP-UI.md v1.0.0
empreinte: sha256:5ceeb9a7def901e8
regles: {loi: 4, preference: 6, non_qualifie: 0}
---
# RULES — chip (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** la chip porte un renvoi de LECTURE — ouvrir, montrer, faire défiler vers — jamais une action qui modifie l'état. `CHIP-R01`
  - vérifiable : aucun onClick de chip ne déclenche une mutation de données
- **[préférence]** la chip vit en NUÉE — plusieurs renvois côte à côte dans un espace contraint (volet, fiche, tableau) ; isolée et unique, la question « Button ou Link ? » se pose d'abord. `CHIP-R02`
  - vérifiable : les usages de chip apparaissent dans des conteneurs flex-wrap d'au moins deux éléments, ou documentent leur exception
- **[préférence]** le libellé dit l'ENTITÉ, pas l'action — « BUTTON-R12 », « Situations qui l'éprouvent », jamais « Cliquer ici ». `CHIP-R04`
  - vérifiable : aucun libellé de chip n'est un verbe d'injonction
- **[préférence]** un identifiant technique (ID de règle, code) s'affiche en mono — la nature « référence » se lit à la forme. `CHIP-R05`
- **[loi]** la sémantique suit la cible — un `<a>` si la chip navigue, un `<button>` si elle ouvre un volet ou déplace la vue ; jamais un `<div>` cliquable. `CHIP-R06`
  - vérifiable : chaque chip rend un a[href] ou un button, vérifié par fili-check
- **[loi]** la densité de la nuée ne sacrifie pas la cible — hauteur de frappe effective ≥ touch.target-min, l'espacement de la nuée complète la zone. `CHIP-R07`
  - vérifiable : cible effective ≥ 24px (touch.target-min), gap de nuée ≥ spacing.sm
