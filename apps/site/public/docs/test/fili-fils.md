# Fili — les trois fils de la semaine

*Établi le 01/08/2026. Trois fils, pas cinq, pas un. Chaque brief est à coller tel quel
en ouverture d'un nouveau fil Cowork.*

**L'état partagé ne vit dans aucun fil** : il vit dans la mémoire de projet, dans
`Projects/fili-roadmap.html` et dans la liste ClickUp « 🚧 Fermeture des chantiers ».
Les fils sont des ateliers, pas des archives.

**Interdit cette semaine** — tout ce que la roadmap range en « ce qui attend » :
cycle de vie des constats, pipeline d'information, pilote relations, l'offre d'audit,
galerie, catégorie 5 de la migration. Si un de ces sujets remonte dans un fil, il repart
en mémoire et on n'y touche pas.

---

## Fil 1 — « Fili · Dépôt »

**Contient** : J0 et J1. **Peut démarrer tout de suite.**

> Fil dédié au jalon J0 et J1 de la roadmap de fermeture Fili (01/08/2026).
> Lis d'abord la mémoire de projet : `chantier_roadmap_fermeture.md`, puis
> `chantier_stabilisation_02.md`, `chantier_validation.md`, `chantier_flows_diagramme.md`.
>
> Objectif du fil, et rien d'autre : **remettre `~/Claude/Projects/Fili` dans un état commité et vert.**
>
> Le dépôt porte 111 fichiers modifiés ou non suivis sur `26a1eac`. Au moins **cinq** chantiers
> s'y empilent, pas trois : Stabilisation 0.2, Validation chaîne, la grammaire `CRITERE`
> (`tools/criteres-grammaire.mjs`, `execute-criteres.mjs`), les instruments d'audit
> (`tools/instrument-statique.mjs`, `instrument-interactif.mjs`) et la vue Flows
> (`apps/site/app/flows/`, `content/flows/`, `lib/flows.ts`, `tools/extrait-flow.mjs`).
> Les six documents de `docs/chantiers/` les plus récents sont eux-mêmes non suivis.
>
> Ordre imposé :
> 1. **Caractériser avant de commiter.** `git diff --stat`, `git status --porcelain`, et trier
>    chemin par chemin : quel chantier revendique quoi, et ce que personne ne revendique.
>    Signaler `tools/.dbg.mjs` et tout autre résidu qui n'a rien à faire dans un commit.
> 2. Dépendances de test, puis la porte complète, **à mon Terminal** — la session Cowork ne peut
>    jouer ni `npm test` (rolldown darwin-only), ni le build Next (plafond 45 s), ni
>    `verifie:rendu` strict. Tu me donnes les commandes, je les joue, je te colle la sortie.
> 3. **Commits séparés par chantier.** Jamais un commit fourre-tout sur 111 fichiers.
> 4. Coller `.github/workflows/pages.yml` (protégé contre l'écriture à distance).
> 5. J1 — rediagnostiquer `MIGRATION-FILI.md`, qui déclare « Rien n'est renommé dans cette étape »
>    alors que le code est en `@fili/*` depuis le 30/07. Vérifier si le renommage a été journalisé
>    dans `DECISIONS.md`. Ne garder ouvert que la catégorie 5.
>
> **Fini quand** : `npm run verifie` rend `0`, l'arbre est propre, et chaque chantier a son commit.
> Termine toujours par la commande de relance du serveur local.
>
> Tu n'ouvres aucun autre sujet dans ce fil. Un constat de doctrine qui surgit part en mémoire,
> pas dans la conversation.

---

## Fil 2 — « Fili Audit · doctrine »

**Contient** : J2 et J3. **Peut démarrer en parallèle du fil 1 — il ne touche pas au dépôt.**

> Fil dédié aux jalons J2 et J3 de la roadmap de fermeture Fili (01/08/2026).
> Lis d'abord la mémoire de projet : `fili_audit_contradictions.md`,
> `chantier_roadmap_fermeture.md`, `chantier_fili_audit_cadrage.md`,
> `chantier_fili_audit_produit.md`, `chantier_fili_audit_axes.md`,
> `feedback_arbitrages_agent.md`.
>
> Objectif du fil, et rien d'autre : **rendre `CADRAGE-FILI-AUDIT.md` et `CAHIER-FILI-AUDIT.md`
> compatibles, puis rendre trois arbitrages.** Aucune ligne de code, aucun commit.
>
> Le cadrage (v0.1.1) annonce compléter le cahier **v0.3.0** ; le cahier est en **v0.9.0**.
> Quinze écarts relevés. Commence par relire les deux fichiers en entier — ne te fie pas
> à la mémoire pour le détail.
>
> Ordre imposé :
> 1. Les cinq écarts structurants, dans cet ordre : **C-3** (le cahier dit « rien n'est décidé »,
>    le cadrage dit « arbitré le 31/07 » six fois) · **C-7** (URL → dossier, ou stack → branche ?
>    et l'offre A est-elle le MVP du lot 1 ?) · **C-5** (quels « trois registres » ?) ·
>    **C-11** (quelle épreuve de reproductibilité fait foi ?) · **C-10** (3+12+15+7 = 37, pas 34).
> 2. Réparer les renvois faux : § 13 pointe « cahier § 11.4 » pour les lots, c'est § 11.2 ;
>    § 9.1 cite la « loi 4.3 » avec un vocabulaire renommé sans le dire.
> 3. Monter les deux documents de version, et journaliser dans `DECISIONS.md`.
> 4. **Alors seulement**, les trois arbitrages du J3 : `11.1` (le `type` des cinq nouveaux sujets),
>    cahier § 10 #1 (où vit l'exécuteur), et le versionnement du corpus.
>
> Garde 5 : **tu ne fermes aucun arbitrage.** Tu instruis, tu relèves les options, tu me les poses.
> Y compris les micro-décisions qui ressemblent à de l'exécution — c'est exactement la faute
> du 31/07 sur Somlys.
>
> **Et tu me les poses avec l'interface de questions à choix, pas en prose** : une question par
> arbitrage, son numéro dans l'en-tête, les options relevées du document (pas des options
> inventées), la recommandation en premier et libellée, et ce que l'arbitrage débloque.
> Quatre questions par appel au maximum.
>
> **Fini quand** : les deux documents disent la même chose du produit, et les trois arbitrages
> sont rendus par moi et journalisés.

---

## Fil 3 — « Fili Audit · lot 1 »

**Contient** : J4. **N'ouvre pas avant que les fils 1 et 2 soient clos.**

> Fil dédié au lot 1 de Fili Audit. Lis d'abord `chantier_roadmap_fermeture.md`,
> `fili_audit_contradictions.md`, puis `CAHIER-FILI-AUDIT.md` § 6 et § 11 en entier.
>
> Objectif, mot pour mot : « Donner une URL, obtenir un rapport en trois registres,
> avec les mesures qui les justifient. »
>
> **Ne repars pas de zéro.** `tools/instrument-statique.mjs`, `tools/instrument-interactif.mjs`,
> `tools/execute-criteres.mjs` et `tools/criteres-grammaire.mjs` existent déjà — ils ont été
> commités au fil 1. Commence par un inventaire de ce qu'ils couvrent, **plus** l'inventaire de
> ce que `fili-check` couvre déjà, comme le cahier le demande en ouverture de lot.
>
> Ce que le lot 1 ne fait pas, et qui ne se rediscute pas : « ni Figma, ni images, ni app cliente,
> ni ingestion, ni panier, ni aperçu, ni branche, ni rôles, ni interface. »
>
> Garde d'ordonnancement : « Un lot ne s'ouvre pas tant que le précédent n'a pas passé son critère. »
> Le critère du lot 1 aura été fixé au fil 2 (contradiction C-11) — va le chercher avant d'écrire
> quoi que ce soit.
>
> **Quand viendra le lot 3** (mémoire des constats), ses sept arbitrages se posent avec l'interface
> de questions à choix, recommandation nommée, en deux appels groupés par sujet — jamais en prose.

---

## Ce qui reste dans le fil d'origine

Rien à y faire. Il porte la roadmap et la critique du modèle. Si tu veux un point d'étape
en fin de semaine, ouvre un quatrième fil court plutôt que d'y revenir : la mémoire de projet
et la liste ClickUp portent l'état, pas la conversation.
