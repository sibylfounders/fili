---
name: migration-fili
description: Inventaire de migration de nom vers Fili / Fili DS / Fili Audit — aucun remplacement exécuté dans cette étape.
version: 0.1.0
date: 2026-07-27
statut: inventaire — chaque catégorie attend une validation explicite avant toute exécution
---

# Migration de nom — inventaire

Structure de marque cible : **Fili** (le projet et la marque ombrelle), **Fili DS** (conception et production d'interfaces — doctrine, sélection contextuelle, mode build, implémentation UI, atelier), **Fili Audit** (analyse et audit d'interfaces existantes). Le corpus, le routeur, les liens typés et les arbitrages sont le **socle commun interne**, sans nom de produit propre.

Ce document classe les occurrences des anciens noms par **risque de renommage**. Rien n'est renommé dans cette étape.

## 1. Mentions éditoriales et titres — renommables sans risque

Texte lu par des humains, sans effet sur le build ni sur les chemins :

- prose des documents de cadre : `README.md`, `OU-EST-QUOI.md`, `docs/INSTALLATION.md` ;
- mentions conceptuelles dans l'atelier (« DS-MD », « couche d'intelligence ») dans `METHODE.md`, `PROCESS.md`, `POURQUOI.md`, `AUDIT-DU-CORPUS.md` — les mentions *conceptuelles* de METHODE.md et PROCESS.md sont déjà passées à Fili (1.15.0) ;
- textes du site (pages d'accueil, vitrine, titres de sections) dans `apps/site/app/` ;
- titres et descriptions des fiches quand ils citent l'ancien nom en prose (pas les chemins).

Précaution unique : passer fiche par fiche (montée de version par fiche touchée), jamais par sed global — certains « DS-MD » désignent le concept (→ Fili), d'autres un chemin ou un outil (→ catégorie 3).

## 2. Noms de produits et de navigation

Visibles par l'utilisateur, sans être des identifiants techniques :

- le nom du paquet Cowork / skill installée : `design-system-md` (dossier `build/plugin/skills/design-system-md`, `plugin.json`, `SKILL.md` généré) — le renommer change l'identité de la skill chez les consommateurs installés ;
- la navigation du site (`/md/…`, libellés de sections, la page installation et le nom de l'archive distribuée) ;
- les intitulés « mode build » / « mode audit » du routeur généré, qui deviennent conceptuellement les projections **Fili DS** / **Fili Audit** (le texte du routeur est généré : se change dans `genere-routeur.js`, catégorie 3).

À traiter après la catégorie 1, avec une communication de renommage pour les consommateurs du paquet.

## 3. Noms techniques — identifiants, chemins, clés

Chaque renommage casse quelque chose ; à traiter par lots atomiques avec vérification :

- **Package npm** : `@sibyl/react` (et `packages/charts`, `packages/tokens` s'ils portent le scope) — imports dans `apps/site`, `package.json` racine, lockfile. Cible probable : `@fili/…`.
- **Dossier du dépôt** : `~/Claude/Projects/Sibyl DS` — chemins absolus dans les scripts, la config Cowork/Claude, les sessions, la mémoire de projet.
- **Scripts et clés hérités** : `verify-ds-md.mjs`, `ds-md.map.mjs`, `npm run sync:ds-md`, `tools/extrait-fiches-ds-md.py`, `README-migration-doctrine.md` — noms cités par `METHODE.md`/`PROCESS.md` (étape 7) : renommer script + doc ensemble.
- **Générateurs et sorties** : `tools/plugin/genere-routeur.js` (textes générés du routeur mentionnant l'ancien univers), `compile-regles.py` (en-têtes), artefacts `dist/`, rapport `RAPPORT-ROUTEUR.md`.
- **Données du site** : `content/doctrine/*.json` (chaînes contenant l'ancien nom), `content/audit/regles/*` — régénérables : recompiler plutôt que rééditer.
- **Ce dépôt de connaissance transverse** : la skill Cowork `sibyl-modeles-tokens` et la mémoire de projet (références au nom du dépôt).

## 4. Références historiques — conservent l'ancien nom

Ne pas réécrire l'histoire :

- `DECISIONS.md` : les entrées datées citent les noms de l'époque — un journal ne se renomme pas ;
- les changelogs de version dans les frontmatters des fiches (« fin de la migration vers le monorepo Sibyl DS ») ;
- l'ancien dépôt `Design System MD` / `Design System UI` (lecture seule, base de connaissance) ;
- les identifiants de règles existants : **aucun ID ne change** — ils sont stables et jamais réattribués, la marque n'y touche pas.

## 5. Changements cassants — stratégie de compatibilité ou migration atomique

- **`@sibyl/react` → `@fili/react`** : casse tous les imports. Migration atomique dans le monorepo (rename + codemod d'imports + build vert dans le même commit) ; pas de période de double publication tant que le package n'est pas publié hors du monorepo.
- **Renommage du dossier du dépôt** : casse les sessions, chemins absolus, config locale. À faire seul, en dernier, un jour sans autre chantier.
- **Nom de la skill du paquet** (`design-system-md` → nom Fili) : casse l'auto-chargement chez les consommateurs installés (`CLAUDE.md`/`AGENTS.md` pointant l'ancien nom). Prévoir une version de transition dont l'ancien nom référence le nouveau, ou une note d'installation.
- **URLs du site** (`/md/…`) si renommées : redirections nécessaires.

## Ordre de migration proposé

1. **Éditorial** (catégorie 1) — fiches et documents de cadre, par lots, versions montées. Vérification : relecture + `npx tsc --noEmit` (rien ne doit bouger) + recompilation `compile-regles.py --tous` (empreintes recalculées).
2. **Générateurs** (textes produits par `genere-routeur.js`, `compile-regles.py`) puis régénération de toute la distribution. Vérification : `node tools/plugin/build-plugin.js` sans erreur, diff du routeur relu.
3. **Produit et navigation** (catégorie 2) — site puis nom de la skill, avec note aux consommateurs. Vérification : build du site, installation du paquet dans un projet témoin.
4. **Techniques** (catégorie 3) — un lot atomique par identifiant : scripts `*-ds-md*`, puis `@sibyl/*`. Vérification après chaque lot : `npm run tokens:build`, `npx tsc --noEmit`, `compile-regles.py --tous`, `build-plugin.js`.
5. **Dossier du dépôt** — en dernier, seul.

Chaque lot se journalise dans `DECISIONS.md` (étape 8). Aucun lot ne démarre sans validation explicite de son périmètre.
