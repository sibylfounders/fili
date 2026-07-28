# Design System MD — paquet Cowork

Version {{VERSION}} · tokens DESIGN {{VERSION_DESIGN}} · {{NB_FICHES}} fiches de règles.

Documentation UX/UI **contextuelle** : au lieu de charger tout le design system, l'agent
identifie l'intention du travail demandé et ne charge que le bundle correspondant.

## Ce que contient le paquet

Une seule compétence, `skills/design-system-md/`, en dossier plat :

- `AGENTS.md` / `CLAUDE.md` — le **routeur** (contenu identique, deux noms selon l'agent).
  Il porte le protocole de build, le mode audit, le circuit des décisions locales,
  la table « intentions → bundle » et la table des sujets.
- `RULES-<sujet>.md` — les règles condensées, une fiche par sujet (fondations, langages,
  principes, composants, patterns, flows) et leurs extensions contextuelles `form-*` et `creation-compte-*`.
- `tokens.yaml` — le contrat de valeurs. Aucune valeur visuelle n'est écrite en dur.
- `tokens.css` — les mêmes tokens en custom properties, pour un consommateur web.
- `theme-gate.mjs` — barrière de vérification pour qui re-thématise (contrastes).
- `DECISIONS-locales.md` — le **journal des décisions du consommateur** : vos arbitrages
  rendus là où le système ne couvre pas, relus par l'agent à chaque session.
- `SKILL.md` — le point d'entrée qui branche l'agent sur le routeur.

## Comment l'agent s'en sert

1. Il charge `SKILL.md`, qui le renvoie au routeur.
2. Le routeur identifie l'intention (formulaire, collection, page de contenu, feedback,
   création de compte, superposé modal) et charge **uniquement** le bundle correspondant.
3. Toute propriété visuelle référence un token de `tokens.yaml`.
4. Un sujet non couvert ou un arbitrage de design non tranché : l'agent relit d'abord
   `DECISIONS-locales.md` (une décision déjà rendue s'applique telle quelle), sinon il
   **stoppe**, émet un constat d'arbitrage formaté, l'appende au journal en `en attente`,
   et attend la décision de l'arbitre — il n'improvise jamais à partir des règles voisines.

Mode audit : le même routeur sert à confronter une interface existante aux règles, sans
charger `tokens.yaml` — les tokens sont l'implémentation de référence, jamais un critère d'audit.

## Personnalisation

Deux surfaces appartiennent au consommateur : les **valeurs** de `tokens.yaml` (jamais ses
noms — vérifier les contrastes après re-thématisation avec `node theme-gate.mjs`), et
`DECISIONS-locales.md` (déclarez l'arbitre en tête de fichier ; lui seul rend les décisions,
l'agent n'y écrit que des constats `en attente`). Tout le reste ne se modifie pas.

## Provenance

Généré depuis le monorepo **Sibyl DS** (`node tools/plugin/build-plugin.js`) : la prose et
les tokens viennent de `apps/site/content/md/`, les fiches condensées de `tools/plugin/rules/`.
Ne pas éditer les fichiers du paquet à la main — ils sont régénérés à chaque build.
