# tools/plugin — chaîne de fabrication du paquet Cowork

Produit `build/design-system-md.plugin`, le paquet installable dans Cowork.

```bash
node tools/plugin/build-plugin.js
```

Le paquet obtenu se glisse dans une conversation Cowork pour installer ou mettre à jour le
plugin. Le dossier `build/` n'est pas versionné.

## Ce qui est source, ce qui est généré

| Chemin | Statut |
|---|---|
| `apps/site/content/md/core/DESIGN.md` | **source** — frontmatter = tous les tokens |
| `apps/site/content/md/**/*-UX.md`, `*-UI.md` | **source** — la doctrine longue |
| `tools/plugin/rules/RULES-*.md` | **source** — condensations éditoriales (voir plus bas) |
| `tools/plugin/plugin.json` | **source** — nom, version, description du paquet |
| `tools/plugin/README-paquet.md` | **source** — README embarqué dans le paquet |
| `tools/plugin/theme-gate.mjs` | **source** — barrière consommateur, voyage avec les tokens |
| `build/plugin/**` | généré | 
| `tools/plugin/reports/RAPPORT-ROUTEUR.md` | généré (poids des bundles, erreurs, avertissements) |

## Le point qui se rate

Une fiche `RULES-<sujet>.md` **n'est pas dérivable par script**. C'est une condensation
éditoriale d'une paire `<SUJET>-UX.md` / `<SUJET>-UI.md` : on garde les règles normatives et les
arbitrages, on jette la prose et les cas d'usage. Aucun outil ne la régénère — modifier la
doctrine d'un sujet oblige à repasser sur sa fiche à la main.

**Ajouter un sujet** = écrire la paire `-UX`/`-UI` dans `apps/site/content/md/`, compiler sa
fiche dans `tools/plugin/rules/`, puis :

- si le sujet mérite sa propre porte d'entrée, ajouter une entrée à la table `INTENTIONS` de
  `genere-routeur.js` (seul contenu éditorial de ce script) ;
- sinon il reste accessible par la table des sujets du routeur — le rapport le signalera comme
  « orphelin », ce qui est l'état attendu dans ce cas.

## Contrat de frontmatter (le routeur échoue sinon)

```yaml
---
sujet: <slug identique au nom de fichier>
type: fondation | langage | principe | composant | pattern | flow | extension
resume: "une phrase"
requires: ["sujets chargés d'office avec celui-ci"]
selon-contexte: ["sujets à n'ajouter que si la situation se présente (raison)"]
---
```

Règle dure : toute mention `RULES-<slug>` dans le corps d'une fiche doit être déclarée dans son
`requires` ou son `selon-contexte`. Le plus simple est de nommer les sujets voisins en toutes
lettres dans le corps, sans le préfixe.

Une fiche `type: extension` porte en plus `extension-de: <parent>` ; elle n'entre jamais dans un
bundle d'intention, seulement dans la colonne « selon contexte » de son parent.

## Historique

Chaîne portée depuis le dépôt `Design System MD` le 2026-07-26 (`tools/genere-tokens.js` et
`tools/genere-routeur.js`), au moment où le paquet Cowork installé (1.6.0, 16/07) a divergé du
monorepo. Le reste de l'outillage DS-MD (génération du site, audits, garden) n'a pas été porté :
seul le chemin du paquet l'a été.
