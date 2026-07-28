# DECISIONS.md — journal des décisions et révisions

> Journal daté des changements de raisonnement du projet : ancienne règle, nouvelle règle, pourquoi.
> Les fichiers `*-UX.md` / `*-UI.md` ne contiennent que les règles **actuelles** — quand un passage
> disait "une version antérieure affirmait...", il vit désormais ici. Les dates sont approximatives
> pour les entrées antérieures au 2026-07-03 (reconstituées depuis les numéros de version).
> Ce fichier n'est pas normatif : en cas de divergence avec un fichier de composant, le fichier de composant a raison.

---

## 2026-07-28 — BUTTON-R65 / FORM-R06 : les pointeurs de cession cessent d'être des règles normatives

- **Fichiers** : `components/BUTTON-UX.md` (1.9.0), `patterns/FORM-UX.md` (2.4.0)
- **Ancien état** : la cession du 2026-07-03 (« la règle vit dans FORM-UX.md, qui fait autorité ; BUTTON-UX.md y renvoie ») et la répartition form/button laissaient `BUTTON-R65` et `FORM-R06` au statut `parti pris d'identité`, avec ÉNONCÉ et MESURE — des doublons normatifs des règles de leurs propriétaires réels (`FORM-R28`, `BUTTON-R60`).
- **Nouvel état** : les deux règles passent en `note de méthode` — pointeurs non normatifs vers le propriétaire, sans MESURE, identifiants conservés — même modèle que `BUTTON-R70` → `CARD-R08` et `BUTTON-R76` → `CONSENTEMENT-R08`. Les règles métier des propriétaires (`FORM-R28`, `BUTTON-R60`) ne bougent pas d'une virgule.
- **Pourquoi** : le modèle de propriété du pilote relations/arbitrages (relation `cede-a`) exige qu'une règle cédante ne reste pas normative — deux endroits qui disent la même chose finissent par se contredire, et un audit qui cite le pointeur cite le mauvais propriétaire. Requalification issue de l'audit du 2026-07-28 ; cinquième et sixième requalifications de cession, les deux premières faites a posteriori.

## 2026-07-27 — CONSENTEMENT : un bandeau qui déclarait lui-même n'avoir pas lieu d'être

- **Fichiers** : `patterns/CONSENTEMENT-UX.md` + `patterns/CONSENTEMENT-UI.md` (1.0.0, nouveaux), `inventaires/inventaire-cas-usage-consentement.md` (34 cas), `content/doctrine/consentement.json` (4 familles, 14 cas), `components/BUTTON-UX.md` 1.8.0 (R76 cède son autorité), `lib/md.ts` (branchement de l'inventaire).
- **Contexte** : l'audit externe de la page de contact d'un cabinet de courtage a rencontré un bandeau de consentement dont le texte affirmait, en gras, « ce site utilise uniquement des cookies techniques — strictement nécessaires au fonctionnement, aucun cookie publicitaire ni de traçage », et qui demandait malgré tout l'autorisation de les poser. Vérification du code : **aucun `document.cookie`**, deux entrées de stockage local — la préférence de thème et la mémorisation de la réponse au bandeau lui-même. Les deux appartiennent aux catégories exemptées de consentement. Le bouton « Refuser » ne modifiait aucun dépôt : les deux réponses produisaient exactement le même état.
- **Ancienne règle** : `BUTTON-R76` — « les deux options d'une bannière de consentement doivent porter un poids visuel équivalent », rangée dans le composant bouton, section « Dans une bannière ».
- **Nouvelle règle** : la symétrie est une contrainte du **pattern**, pas du composant. Elle devient `CONSENTEMENT-R08` (UX) et `CONSENTEMENT-UI-R02` (tokens). `BUTTON-R76` conserve son identifiant et devient une note de méthode qui pointe vers son nouveau propriétaire — quatrième cession d'autorité journalisée, après form↔button, form↔card et form↔alert.
- **Pourquoi ce déplacement** : rangée dans BUTTON, la règle n'avait pas de place pour la question qui la précède — *faut-il un bandeau ?*. Un moteur d'audit qui ne dispose que de R76 corrige la couleur d'un bouton sur un bandeau qui n'aurait jamais dû exister. C'est le cas réel rencontré. Une règle rangée au mauvais endroit est une règle qu'on applique mal.
- **La frontière posée, et elle est structurante** : le référentiel **constate**, il ne **qualifie** pas (`CONSENTEMENT-R04`). Un audit rapporte l'inventaire mesuré des stockages et pose la question de la nécessité du bandeau ; il ne conclut jamais « bandeau non requis ». Ce type de constat se remonte au registre **« à trancher »**, jamais à « à corriger ». Deux raisons : la qualification dépend de la finalité réelle des traitements, que le code ne montre pas ; et les textes bougent — la proposition « Digital Omnibus » de la Commission du 12 novembre 2025 réécrit précisément ces exemptions et introduit un consentement par signal navigateur. Une règle de design qui se prononcerait sur le droit serait fausse à la première réforme, et engagerait une responsabilité qui n'est pas la nôtre.
- **Ce que le benchmark a donné** : **2 design systems sur 9** documentent ce pattern — GOV.UK et le DSFR, tous deux publics. NHS (demandé publiquement depuis 2020, jamais publié), Carbon, Material 3, Polaris, Atlassian, Spectrum et Fluent 2 l'ignorent, ce qui se comprend : ils outillent des applications authentifiées, pas des sites soumis à l'ePrivacy. Conséquence assumée : nos règles s'appuient sur deux précédents et sur des textes de régulateurs, pas sur une convergence de neuf systèmes comme pour la bordure. Le niveau de confiance du sujet est `mixte`, et il le restera.
- **Le point où nos deux précédents divergent** : GOV.UK écrit explicitement qu'un service n'utilisant que des cookies essentiels n'a pas besoin de bandeau — une page d'information suffit. Le DSFR décrit le bandeau comme s'affichant toujours à l'arrivée, sans poser la question préalable, parce qu'il outille des sites d'État qui mesurent tous leur audience. `CONSENTEMENT-R03` suit GOV.UK. C'est un choix, il est réversible, et il est écrit comme tel dans la section benchmark.
- **Deux partis pris explicitement non normatifs** : le refus du *cookie wall* (`R11`) — le Conseil d'État a jugé le 19 juin 2020 qu'il n'est pas illégal en soi, et la CNIL l'apprécie au cas par cas : nous le refusons, nous ne prétendons pas qu'il est interdit. Et la durée de six mois (`R14`), là où GOV.UK mémorise un an — six mois est la valeur la plus courte des trois références, donc la plus protectrice, et la seule qui les satisfait toutes.
- **Diversité des sources** : sept références pour dix-sept règles, réparties sur cinq familles distinctes — deux design systems (GOV.UK, DSFR), deux régulateurs (CNIL, CEPD), une norme (WCAG 2.2), une législation en cours (Digital Omnibus) et un relevé interne. Aucune source ne porte plus de quatre règles. C'était l'objectif fixé après le constat de concentration sur `border`.
- **Reste ouvert** : la granularité par finalité (les deux précédents divergent, décision reportée au premier consommateur ayant plus de deux finalités) ; les signaux navigateur (dépend de l'adoption de l'article 88b) ; le réaffichage quand les finalités du site changent ; le texte de remplacement d'un service désactivé après refus, que le DSFR impose et que nous n'avons pas tranché.
- **Sujet voisin identifié, non ouvert** : une ressource tierce sans traceur — police, carte ou vidéo servie par un CDN — transmet l'adresse IP du visiteur sans déposer le moindre cookie. Ce n'est donc pas du consentement au sens de l'ePrivacy, et c'est hors du périmètre de ce sujet. Mais c'est rencontré au même moment, dans le même audit : le site de courtage charge ses deux polices depuis les serveurs de Google. À ouvrir, probablement dans `PERFORMANCE-UX` ou dans un sujet propre.

## 2026-07-26 — PAQUET COWORK : le compilateur du bundle rejoint le monorepo

- **Fichiers** : `tools/plugin/` (nouveau — `build-plugin.js`, `genere-tokens.js`, `genere-routeur.js`, `zip.js`, `plugin.json`, `README.md`, `README-paquet.md`, `rules/RULES-*.md`), `.gitignore` (`build/`).
- **Contexte** : le plugin Cowork installé était figé en **1.6.0 (16/07)**, en retard sur deux niveaux — 16 fiches absentes et 23 modifiées par rapport au dernier build DS-MD, lui-même resté en DESIGN 1.31.0 sans MODAL ni TABS. La chaîne qui fabrique le paquet n'avait jamais été portée : relancer DS-MD aurait produit un paquet déjà périmé.
- **Décision** : **option 1** de l'arbitrage ouvert le matin même (cf. entrée « DS AUDIT ») — le compilateur emménage dans le monorepo. `genere-tokens.js` et `genere-routeur.js` sont portés à l'identique quant à leur mécanique ; seuls changent les chemins (`apps/site/content/md/core/DESIGN.md` comme source de tokens) et la table éditoriale `INTENTIONS`. Sortie : `build/design-system-md.plugin`, archive écrite en Node pur (`zip.js`, zlib) parce que le binaire `zip` n'est pas garanti sur les machines qui lancent le build.
- **Ce qui reste une source, et pourquoi** : les `RULES-<sujet>.md` sont **importées telles quelles** dans `tools/plugin/rules/`, pas dérivées de `content/doctrine/*.json`. Une fiche condensée n'est pas une projection mécanique de la doctrine : c'est une réécriture qui garde les règles normatives et jette la prose et les cas. Aucun script ne sait la produire — la faire dériver du JSON aurait signifié réécrire 46 fiches à l'aveugle. Elles sont donc versionnées comme source, avec le contrat de frontmatter documenté dans `tools/plugin/README.md`.
- **Ce que ce portage ne règle pas** : les identifiants `SUJET-Rnn` et les `SOURCE` n'entrent toujours pas dans le bundle — la promesse « un constat d'audit cite sa base » reste ouverte. Elle est désormais **atteignable sans toucher au dépôt gelé** : le compilateur est ici, il suffira de lui apprendre à propager les identifiants quand le format sera généralisé.
- **Arbitrages éditoriaux pris avec** : (1) `modale` sort du hors-périmètre du routeur (couverte par `RULES-modal`) et `popover` y entre — cité comme frontière par overlay et modal, jamais traité ; (2) une sixième intention, **« Superposé modal »**, entre dans la table (déclencheurs : confirmation de suppression, saisie courte, panneau de détail) — ~31,2 k chargés, `overlay` tiré par les `requires` ; (3) `tabs` n'a **pas** d'intention propre : changer de vue n'est pas une intention de build, la fiche reste accessible par la table des sujets, comme `select`, `switch` et `navigation`. Le rapport du routeur la signale comme orpheline : c'est l'état voulu.
- **Fiches compilées ce jour** : `RULES-modal` et `RULES-tabs`, depuis les paires UX/UI du matin — le corpus passe à 46 fiches, le paquet à **1.7.0**, tokens DESIGN 1.32.0.
- **Non porté** : la génération du site, les audits (`audit-regles`, `garden`, `a11y`, `agnostique`) et le harness restent dans DS-MD. Seul le chemin du paquet a déménagé.

## 2026-07-26 — DS AUDIT : les décisions deviennent adressables et sourcées (pilote `border`)

- **Fichiers** : `METHODE.md` 1.13.0 (le format), `foundations/BORDER-UX.md` 1.2.0 (le pilote), `tools/extrait-decisions.py` (la projection), `apps/site/app/md/[slug]/volet-decisions.tsx` (le rendu), `content/doctrine/border.json` (`decisions[]`).
- **Contexte** : DS Audit promet de **sourcer ses décisions**. Le corpus contenait déjà les quatre ingrédients — problème (les blocs `> **Pourquoi**`), solution (les `RÈGLE :`), cas UX (les cartes de cas), sources (la table de fin de fichier) — mais rien ne les reliait : la bibliographie était une annexe *du fichier*, pas *de la règle*, et une règle n'avait pas d'identifiant. Un constat d'audit ne pouvait donc pas citer sa base.
- **Ancienne règle** : chaque fiche UX se termine par une table « Sources et niveau de confiance » au grain du fichier.
- **Nouvelle règle** : chaque `RÈGLE` porte un identifiant stable (`SUJET-Rnn`), un `STATUT` de frontière, une ou plusieurs `SOURCE` (références `S1…Sn` de la bibliographie, ou `interne`), et un `PROBLÈME` facultatif. La table de fin gagne une colonne `Réf.`. Le format complet est décrit dans METHODE.md.
- **Pourquoi facultatif, le problème** : toutes les règles n'ont pas de douleur à énoncer — « la palette se lit en trois registres étanches » est définitionnelle. Rendre les quatre champs obligatoires produirait du remplissage sur ~700 règles. `SOURCE` reste obligatoire : c'est la promesse.
- **Ce que le pilote a trouvé sur border** : 16 décisions — 7 universelles, 5 partis pris d'identité, 2 implémentations de référence, 2 notes de méthode ; **deux sources manquaient** (R08 s'appuyait sur WCAG 2.4.7 sans le citer, R12 affirmait le comportement de `forced-colors` sans source) — ajoutées en S8 et S9 ; 13 citations de règle dans les cartes de cas ont retrouvé leur ID ; **6 décisions ne sont éprouvées par aucun cas d'usage** (R02, R04, R07, R10, R11, R16) — trou de couverture à traiter, pas un défaut de format.
- **Reste à trancher (bloquant pour la promesse)** : `dist/RULES-*.md`, le bundle que le moteur d'audit consomme réellement, ne porte ni identifiants ni sources, et son compilateur vit dans l'ancien dépôt DS-MD, gelé. Sourcer la fiche sans sourcer le bundle documente la promesse sans la livrer. Deux options : déplacer le compilateur dans le monorepo et le faire compiler depuis les mêmes données que le site, ou régénérer les bundles depuis `content/doctrine/*.json`. Arbitrage à prendre avant de généraliser le format aux 34 autres sujets.

## 2026-07-26 — OVERLAY : le verrou de défilement vise la région, pas le document

- **Fichiers** : `packages/react/src/lib/scroll-lock.ts` (nouveau), `components/modal/modal.tsx`, `components/drawer/drawer.tsx`, `MODAL-UI.md` 1.0.1.
- **Contexte** : remontée d'Aurélien — fermer une modale de cas d'usage en cliquant sur le voile ramenait parfois la page à un autre endroit.
- **Ancienne règle** : « à l'ouverture d'un superposé modal, le défilement du document est verrouillé » (OVERLAY-UI), implémentée par `document.body.style.overflow = "hidden"`.
- **Nouvelle règle** : le verrou porte sur la **région qui défile réellement** — dans un shell applicatif, le body ne défile pas, c'est le `<main>` de l'AppLayout. On verrouille le body **et** chaque ancêtre défilant du déclencheur. Second volet : aucun `focus()` de superposé ne fait défiler (`{ preventScroll: true }`), ni à l'entrée ni au retour au déclencheur.
- **Pourquoi** : les deux défauts se composaient. Le fond continuait de défiler sous la surface ; à la fermeture, le retour du focus au déclencheur faisait « révéler » un élément désormais hors écran, d'où le saut. Le Drawer avait le même bug, hérité de la même ligne de code — corrigé avec.
- **Portée** : la règle d'OVERLAY-UI reste juste dans son intention ; c'est sa formulation (« le document ») qui supposait une page qui défile. À relire quand un troisième superposé arrivera.

## 2026-07-26 — MODAL / TABS : la doctrine rattrape le composant

- **Fichiers** : `components/MODAL-UX.md` + `MODAL-UI.md` 1.0.0, `components/TABS-UX.md` + `TABS-UI.md` 1.0.0, `inventaires/inventaire-cas-usage-modal.md` (34 cas), `inventaires/inventaire-cas-usage-tabs.md` (31 cas), fiches `content/doctrine/{modal,tabs}.json`.
- **Décision** : les deux composants entrés au catalogue le matin même reçoivent leur paire UX/UI, leur inventaire et leur fiche — la dette ouverte par l'entrée précédente est soldée le jour même. `MODAL-UX` ne redit pas la mécanique d'`OVERLAY-UX` : elle la cite et tranche ce qui reste au composant — la légitimité de l'interruption (trois conditions), « une seule modale à la fois, jamais de modale sur modale », les trois familles (confirmation, saisie courte, détail), le désarmement du clic-voile quand une saisie est en cours. `TABS-UX` tranche les deux frontières que le catalogue laissait floues : Tabs/Accordion (exclusif vs multi-ouvert) et Tabs/Navigation (changer de vue vs changer de page, donc d'historique).
- **Pourquoi** : la méthode veut la doctrine **avant** le composant ; l'ordre a été inversé parce que le site de doctrine avait besoin des deux mécaniques pour s'afficher. Inverser l'ordre est acceptable une fois, à condition de solder tout de suite et de le journaliser — sans quoi le catalogue se met à contenir des composants que personne ne peut auditer.
- **Arbitrages laissés ouverts** (marqués `CONFIANCE : non formalisé` dans les fiches) : l'ouverture d'une modale sans interaction de l'utilisateur (onboarding) ; la confirmation de perte de données à la fermeture, laissée au consommateur ; le seuil numérique de débordement d'une tablist ; le style de l'onglet désactivé (même dette que `BUTTON-UI` sur `text-disabled`) ; la conservation du défilement d'un volet gardé monté.

## 2026-07-26 — MODAL / TABS : deux composants naissent du site de doctrine, et un token de largeur avec eux

- **Fichiers** : `packages/react/src/components/modal/`, `packages/react/src/components/tabs/` (nouveaux) ; `packages/tokens/src/tokens.source.mjs` + `build/generate.mjs` (token `grid.overlay`) ; `DESIGN.md` 1.32.0 ; `apps/site/app/md/**` (la fiche de doctrine les consomme).
- **Contexte** : la reprise du site DS-MD dans l'app React demandait deux mécaniques que le catalogue n'avait pas — les quatre volets d'une fiche (onglets) et le détail d'un cas d'usage (modale). L'inventaire d'`overlay` les annonçait toutes deux : « Modale / dialog — couvert (mécanique posée), composant différé ». Le différé s'arrête ici : la doctrine ne peut pas s'afficher avec des composants qu'elle ne documente pas.
- **Décision** : `Modal` (superposé modal centré) et `Tabs` (volets exclusifs) entrent au catalogue. Modal n'invente **aucune** mécanique : il applique OVERLAY-UX/UI à la lettre (scrim, clic-voile = annulation, focus qui entre / piégé / rendu au déclencheur, défilement verrouillé, `z-index.overlay`, `elevation.overlay`, `radius.md`, entrée `motion.slow`, `prefers-reduced-motion`), et le ring interne reste celui de BORDER. Tabs suit le modèle ARIA APG, avec le signal d'onglet courant **non chromatique** (poids + trait porteur), comme Nav.Link.
- **Token créé** : `grid.overlay` = 640px. La largeur d'une surface modale n'avait aucun propriétaire : GRID s'arrêtait aux conteneurs de page (480 / 1024 / 1440) et aux rails du shell (280 / 320). Une modale n'est ni l'un ni l'autre — troisième rôle, donc token, conformément à « un token naît d'un besoin réel ». **Un seul cran** : 480 (`container-narrow`) couvre déjà la modale de confirmation, 640 couvre la modale qui porte une illustration ou un tableau court, et au-delà le contenu appelle une page. La modale des cas d'usage de la doctrine est le premier consommateur.
- **Pourquoi 640** : 160 × 4px, entre les deux crans existants ; convergence des dialogs de référence (Material `md` 560, Carbon `md` 640, Polaris `large` 620) — aucune source n'impose une valeur, le cran est **proposé, ajustable**, et il est tokenisé pour que l'ajustement soit une seule ligne.
- **Réserve** : `Modal` et `Tabs` n'ont pas encore leur paire `*-UX.md` / `*-UI.md` au moment de cette entrée — le composant précède sa doctrine, ce que la méthode interdit normalement. Dette assumée et datée : elle se solde dans la foulée (voir l'entrée « MODAL / TABS : la doctrine rattrape le composant »).

## 2026-07-22 — Accueil refondu : l'audit d'abord, le nom en retrait

- **Fichiers** : `tools/genere-site.js` (hero, `pageAccueil`, `navigation`, méta description par défaut) ; site régénéré.
- **Décision** : la page d'accueil cesse d'ouvrir sur la définition par la négative (« n'est pas un design system ») pour ouvrir sur la preuve : le moteur d'audit montré au travail — verdict et constats réels de l'étude `wanderluxe-creation-compte` (dont un « à préserver »), lien vers l'étude complète sur le site des études. Le catalogue est reframé « le référentiel derrière les verdicts » ; dans la nav, les repères « Core »/« Application » deviennent un unique « Référentiel », un lien « études d'audit ↗ » entre dans la nav (constellation), « tokens » devient « tokens · référence ». La stat « version des tokens » quitte le bandeau de chiffres au profit des parcours audités. Le nom du projet ne porte plus le hero — anticipation du chantier de renommage, ouvert ce jour (la décision du 2026-07-21 « pas de renommage immédiat » est révisée en « chantier ouvert, arbitrage à venir »).
- **Pourquoi** : test à froid du 2026-07-22 sur l'accueil en ligne — le lecteur naïf conclut « encore un design system » : « le déni textuel perd contre la preuve visuelle » (nom, nav-catalogue archétypale, tokens versionnés) ; et « rien sur la page ne montre un audit » alors que le hero en promet un. On montre désormais avant d'expliquer.
- **Réserve** : le nombre de « parcours audités » affiché est éditorial (constante `NB_PARCOURS_AUDITES` — les études vivent dans le dépôt `audit-md`) : à tenir à jour à chaque étude versée.

## 2026-07-22 — Plateforme : le moteur d'audit part dans son dépôt privé « audit-md »

- **Fichiers** : `audit/` retiré du dépôt (déplacé vers le dépôt privé `sibylfounders/audit-md`, copie à l'identique, zéro modification de code, protocoles gelés intouchés) ; `README.md` et `docs/architecture/REPOSITORY.md` révisés (cinq responsabilités, flux d'audit externalisé).
- **Décision** : dans le cadre du plan de plateforme (séparation des produits AVANT tout déploiement — décidée pendant que rien n'était en ligne), le moteur d'audit, ses huit études et leurs preuves quittent le dépôt-vitrine. Le nouveau dépôt embarque un **instantané épinglé de `dist/`** : le moteur d'audit devient un **consommateur officiel de la distribution** (dogfooding). Les preuves privées (`audit/private/`, 71 Mo) et la vue privée (`private-view/`) restent hors git dans le nouveau dépôt aussi.
- **Pourquoi** : (1) confidentialité — `audit/data/` contient des findings détaillés sur des produits réels dont un client ; impubliable dans un dépôt destiné à être public ; (2) le gel par snapshots (2026-07-21) rend les études auto-portées : le moteur n'a plus besoin de vivre à côté des sources ; (3) chaque produit sa nature — le dépôt-vitrine démontre, le dépôt d'audit juge. Vérifié avant retrait : validate 0 erreur, test complet VERT, build public et check-site OK dans le nouveau dépôt.
- **Au même moment** : le site est publié sur GitHub Pages (dépôt public `design-system-md-site`, contenu généré seul) — première URL publique du projet.

## 2026-07-21 — Vitrine alignée sur le pivot : le site public parle la nouvelle langue

- **Fichiers** : `tools/genere-site.js` (hero de l'accueil, méta description par défaut, en-tête consommable), `tools/methode-contenu.js` (page « Pourquoi » : section d'ouverture + distribution à deux modes + première puce du « n'est pas »), `tools/genere-harness.js` (description) ; site régénéré.
- **Décision** : le récit public cesse de se présenter comme « documentation contextuelle UX/UI » et assume le positionnement du pivot — titre du hero « Le raisonnement que les tokens n'ont pas » (le créneau), couche d'intelligence au-dessus d'un hôte, règle de frontière ❌/✅ en pied de hero, moteur d'audit en premier, DS-UI en chemin de refonte jamais imposé. La preuve est citée avec les réserves maison : mesure M2 (95 % de constats universels) et test à froid (périmètre observable explicité).
- **Pourquoi** : la vitrine est la carte de visite du projet ; un positionnement acté dans DECISIONS mais absent du site public est un positionnement qui n'existe pas.

## 2026-07-21 — Consentement : la fusion implicite « vous acceptez CGU et politique de confidentialité » entre dans la règle

- **Fichiers** : `CREATION-COMPTE-UX.md` 1.3.1 (§ Extension consentement) ; `dist/RULES-creation-compte-*` recompilés mécaniquement.
- **Contexte** : le test à froid n°2 du mode audit (agent vierge + dist/ + 5 écrans Cosmos) a retrouvé ~8 findings sur 9 de l'étude gelée — le seul manqué est F08 : la mention « By creating an account, you agree to our Terms of Service and Privacy Policy » a été jugée conforme. La règle existante visait la forme explicite (« j'accepte la politique de confidentialité » avec case) ; le piège implicite — un « vous acceptez » sans case qui englobe la politique de confidentialité — n'était pas nommé.
- **Décision** : la règle nomme désormais le pattern : la politique de confidentialité se **présente**, elle ne s'**accepte** pas (RGPD art. 13 — information due, pas contrat) ; la fusion se signale même sans case à cocher, dès qu'un « vous acceptez » l'englobe.
- **Pourquoi** : une règle qu'un agent à froid ne peut pas appliquer sur le cas réel le plus fréquent ne protège rien — le test à froid sert exactement à trouver ces formulations trop étroites.

## 2026-07-21 — Mode audit : le routeur porte désormais deux protocoles (P2 du pivot)

- **Fichiers** : `tools/genere-routeur.js` (protocole + SKILL), `dist/CLAUDE.md`/`AGENTS.md`/`SKILL.md` régénérés, `METHODE.md` 1.11.0.
- **Décision** : à côté du protocole de build, le routeur porte un **Mode audit** (« audite cet écran / ce parcours ») : bundle de l'intention sous-jacente chargé **sans `tokens.yaml`** (la mesure M2 a prouvé que les annexes de tokens ne fondent aucun finding — l'implémentation de référence n'est jamais un critère d'audit d'une interface tierce) ; confrontation qui cite ses règles et sépare observation / inférence / constat ; **statut de frontière** appliqué (propriété universelle → non-conformité possible ; parti pris d'identité → divergence de registre, à part ; implémentation de référence → hors critères) ; CONFIANCE calibre la force du constat ; non-couvert → remonté tel quel. L'audit ne modifie jamais les règles qu'il évalue. Le protocole outillé complet (baseline, empreintes, preuve) reste dans `audit/`.
- **Correction au passage** : `HORS_PERIMETRE` du routeur listait encore « toast/snackbar » alors que toast est un sujet couvert depuis le 2026-07-21 (intention Feedback) — retiré.
- **Pourquoi** : le pivot fait de l'audit le mode de livraison principal ; le livrable machine ne proposait que le build. Le mode audit transpose au contexte agent la méthode déjà éprouvée par les huit études, sans chaîne de preuve.

## 2026-07-21 — Statut de frontière : les quatre règles désignées par la mesure M2 sont annotées

- **Fichiers** : `METHODE.md` 1.10.0 (la convention), `VOICE-UX.md` 1.3.1, `MOTION-UX.md` 1.3.2, `FORM-UX.md` 2.3.0, `BUTTON-UI.md` 1.6.1, + miroirs `dist/RULES-voice|motion|form|button.md`.
- **Contexte** : le dépouillement des findings des huit études (mesure M2 du pivot) donne 95 % de justifications universelles ; les seules exceptions sont trois contrats de registre (voice « pas de ! », motion « productif seulement », label 16 px) et un parti pris contesté (« jamais de disabled comme validation » — Strava-decisions F09, Carbon/iOS documentent l'inverse).
- **Décision** : généraliser la distinction « contrainte ≠ parti pris » (stress-test 2026-07-17) en **statut de frontière** à trois valeurs — **propriété universelle / parti pris d'identité / implémentation de référence** — avec sa **lecture d'audit** : seule la propriété universelle fonde une non-conformité chez un hôte tiers ; un parti pris se signale comme *divergence de registre*, à part ; l'implémentation de référence n'est jamais un critère. L'annotation est progressive, tirée par l'usage des audits — pas de passe de réécriture.
- **Pourquoi** : sans ce statut, un audit d'interface tierce requalifie en défaut ce qui n'est qu'une identité maison — trois cas réels dans Passion Courtage site-v2 (F06 « pas de ! », F08 registre motion, F09 label 16 px). La crédibilité du moteur d'audit dépend de cette distinction.

## 2026-07-21 — PIVOT : DS-MD devient une couche d'intelligence de conception au-dessus d'un design system hôte

- **Fichiers** : `README.md` (vision), `docs/roadmap/EVOLUTION.md` (re-cadrage des jalons), `docs/architecture/REPOSITORY.md` (carte des quatre produits), README de DS-UI (statut), versionnage git de DS-UI. Aucun contenu de règle modifié.
- **Décision** : DS-MD n'est pas un design system. C'est une **couche d'intelligence de conception** qui se greffe au-dessus de n'importe quel design system hôte (Material, Fluent, Carbon, DS interne…). DS-MD décrit les **propriétés** et les **décisions** qu'une bonne interface doit posséder (le pourquoi, le quand) ; l'hôte garde l'**implémentation** (le comment : composants, tokens, API). DS-MD se livre comme un **moteur d'audit** (écrans, puis parcours). DS-UI devient l'**implémentation de référence** et le laboratoire — jamais imposée à l'audité, toujours proposée comme chemin de refonte.
- **Règle de frontière** : DS-MD décrit les propriétés qu'une interface doit posséder, jamais leur apparence exacte. ❌ « Utiliser un bouton Filled » → ✅ « L'action principale doit être clairement dominante ». En cas d'hésitation principe vs implémentation : le principe reste dans DS-MD, l'implémentation part vers l'hôte ou l'adaptateur, et le raisonnement s'explique.
- **Pourquoi** : (1) la vision fondatrice le disait déjà — « une base de connaissance, pas une bibliothèque de composants » ; une règle UX qui suppose une techno précise était déjà un défaut à corriger : le pivot est un aboutissement, pas un virage. (2) Le produit d'audit le pratique déjà : les études confrontent des interfaces qui n'utilisent pas DS-MD (Cosmos, Strava iOS, Passion Courtage) à un instantané versionné des règles. (3) Le créneau visé — la couche de raisonnement que les tokens n'ont pas — devient littéral.
- **Vision long terme (étoile polaire, pas une to-do)** : l'entonnoir audit → doc contextuelle finie → bascule sur le UI kit re-thématisé à la marque du client. Gouvernance, offres, généralisation « doc dérivée par client » restent hors périmètre immédiat.
- **Ce qui ne change pas** : le pipeline de méthode, les contenus des règles UX/UI, les tokens (qui deviennent le thème de l'implémentation de référence), le protocole de build du routeur (qui devient le mode d'emploi de la bascule ; un protocole d'audit viendra à côté, pas à la place). La reformulation des règles en propriétés hôte-agnostiques se fera par **annotation progressive**, tirée par l'usage d'audit — pas par réécriture en masse.

## 2026-07-21 — Principe « performance » : le contrat des attentes devient le cinquième RULES du socle universel

- **Fichiers** : `atelier/principles/performance/PERFORMANCE-UX.md` (1.0.0, companion: none) ; `atelier/inventaires/inventaire-cas-usage-performance.md` (3e inventaire transversal, 20 cas) ; `dist/RULES-performance.md` (maintenu à la main) ; `DESIGN.md` 1.28.0 (index, aucun token) ; `LAWS-UX.md` 1.3.1 (Doherty → carte) ; `MOTION-UX.md` 1.3.1 (frontière nommée) ; `tools/genere-routeur.js` (socle à 5 RULES) ; contenus éditoriaux du site.
- **Constat** : le système possédait les mécaniques d'attente en pièces détachées (cycle de soumission FORM, loading BUTTON, attente par champ INPUT, squelettes CARD/COLLECTION, bornes d'animation MOTION) mais aucun propriétaire du contrat transversal — quel feedback à quel délai, quand l'optimisme est permis, ce que l'honnêteté interdit. Doherty et les seuils NN/g n'existaient qu'en théorie (catalogue) ou en local (MOTION).
- **Décisions** :
  1. **Frontière motion / performance** (haute) : motion possède les durées et courbes des ANIMATIONS ; performance possède le contrat des ATTENTES. L'indicateur de chargement appartient aux deux — forme et mouvement chez motion, moment d'apparition et sincérité chez performance.
  2. **Socle universel à cinq** (haute, arbitrage délégué) : toute intention charge et attend — RULES-performance rejoint accessibility/interaction/adaptive/cognitive-load ; coût mesuré à chaque build, clause de réouverture déjà journalisée chez cognitive-load.
  3. **Échelle de l'attente** (haute) : rien sous ~100 ms ; local entre ~100 ms et ~1 s ; visible ET annoncé au-delà ; état à part entière (progression honnête, issue, timeout) au-delà de ~10 s ou en durée inconnue. Anti-scintillement : délai d'apparition + durée minimale, non chiffrés jusqu'au premier consommateur outillé (un chiffre sans besoin réel serait le travers que le système interdit).
  4. **UI optimiste sous trois conditions cumulées** (haute) : réversible/rejouable + très probable + échec réparé visiblement ; interdite sur l'irréversible, le paiement, le légal — alignée sur la réversibilité de cognitive-load.
  5. **Honnêteté renforcée** (haute) : jamais de fausse progression (la frontière Goal-Gradient du catalogue devient un interdit opérationnel) et JAMAIS d'attente artificielle — refus assumé d'exploiter la labor illusion (Buell & Norton), documentée puis écartée, cohérent avec le refus des dark patterns.
  6. **Seuils en prose, aucun token** (moyenne) : les bornes 0,1/1/10 s sont de la psychophysique sourcée, pas des valeurs de design à thématiser.
- **Laissé ouvert** : composant de progression déterminée (aucun dans le système — naîtra du besoin, d'ici là remonter) ; chiffrage de l'anti-scintillement ; incarnation de l'optimisme (premier terrain : TOAST porteur d'une annulation) ; valeurs machine des seuils si un harness les consomme un jour.
- **Pourquoi** : troisième et dernière absence prioritaire du fil « quatre axes » (2026-07-21 : cognitive-load, collection, performance) — le tout par la voie complète de la méthode, en un jour, sans casser la promesse d'aucun fichier existant.

## 2026-07-21 — Pattern « collection » : la grille de colonnes naît chez son consommateur, intrinsèque et sans N canonique

- **Fichiers** : `atelier/patterns/collection/COLLECTION-UX.md` + `COLLECTION-UI.md` (1.0.0) ; `atelier/inventaires/inventaire-cas-usage-collection.md` (31 cas) ; `dist/RULES-collection.md` (maintenu à la main) ; `DESIGN.md` 1.27.0 (token `grid.item-min`) ; `GRID-UX.md` 1.1.0 + `GRID-UI.md` 1.1.0 (clause de naissance levée) ; `SPACING-UX.md` 1.2.1 (note de transposition réalisée) ; `CARD-UX.md` 1.4.1 + `CARD-UI.md` 1.5.1 (transfert `grid_gap`) ; `tools/genere-routeur.js` (l'intention Collection charge le pattern) ; contenus éditoriaux du site.
- **Constat** : GRID-UX (2026-07-16) et SPACING-UX avaient écrit une clause de naissance explicite — « la grille de colonnes naîtra avec le pattern collection/grille ». L'intention « Collection » du routeur existait sans pattern propriétaire ; CARD portait un `grid_gap` d'attente et promettait un « pattern collection dédié » pour le Kanban.
- **Décisions** :
  1. **Grille intrinsèque** (haute) : les colonnes émergent de `grid.item-min` (256px, seul token nouveau — 64 × la grille de base) et de l'espace réel via `repeat(auto-fill, minmax(min(100%, item-min), 1fr))` — jamais « 4 desktop / 2 tablette / 1 mobile ». Divergence assumée vs Carbon (16 col) / Material (window classes) : pas de multi-produits qui justifie un N canonique, et un viewport large ne garantit pas un conteneur large (cohérence adaptive). `auto-fill` jamais `auto-fit` (dernière rangée non déformée).
  2. **Régime composé** (moyenne) : dashboard en grille explicite, spans en cellules entières, colonnes choisies par le contenu — pas de 12 copié ; à éprouver au premier dashboard réel.
  3. **Croissance** (haute) : « charger plus » par défaut ; pagination quand la position est adressable ; scroll infini jamais seul (NN/g) ; état restauré au retour ; échec d'une page suivante = erreur locale, l'acquis reste.
  4. **Transfert d'autorité** (moyenne) : `CARD-UI.collection.grid_gap` devient un alias — le gap appartient au pattern (mapping par densité : compact = spacing.md, comfortable = spacing.lg). Même mécanisme que le transfert INPUT→FORM.
  5. **Défauts de collection** (moyenne) : tri par défaut annoncé, filtre d'office déclaré — le cas « En attente » de l'inventaire charge-cognitive trouve son propriétaire le jour même.
- **Laissé ouvert** : extension `collection-kanban` (promise par CARD-UX) ; virtualisation ; contrôles de barre d'outils (select, chips — composants à naître, tout build qui en a besoin remonte) ; N canonique du composé si un dashboard réel le réclame ; mécanique de la région live du compteur à éprouver.
- **Pourquoi** : deuxième absence du fil « quatre axes » intégrée, par la voie complète de la méthode — et la clause écrite le 2026-07-16 est honorée telle quelle : le système a tenu sa propre promesse de ne documenter la grille qu'avec son premier consommateur.

## 2026-07-21 — Principe « cognitive-load » : le pendant opérationnel du catalogue des lois entre au socle universel

- **Fichiers** : `atelier/principles/cognitive-load/COGNITIVE-LOAD-UX.md` (1.0.0, companion: none) ; `atelier/inventaires/inventaire-cas-usage-charge-cognitive.md` (2e inventaire transversal, 23 cas) ; `dist/RULES-cognitive-load.md` (maintenu à la main, comme les RULES historiques) ; `LAWS-UX.md` 1.3.0 (carte d'application + promotion anti-camouflage) ; `DESIGN.md` 1.26.0 (index des principes, aucun token) ; `tools/genere-routeur.js` (socle à 4 RULES) ; contenus éditoriaux du site (`tools/site/data.js`, `tools/genere-site.js`).
- **Constat** : `LAWS-UX.md` déclare Cognitive Load « principe implicite de tout le système » — implicite = invisible au build : aucune règle chargée ne contraignait le nombre de décisions d'un écran, la divulgation, les défauts, la réversibilité ou l'anti-camouflage en tant qu'obligations transversales ; elles existaient en pièces détachées chez les propriétaires.
- **Décisions** :
  1. **Frontière laws / cognitive-load** (haute) : le catalogue garde la théorie (audience: humans, jamais chargé au build) ; le nouveau principe porte les obligations opérationnelles, cite les lois sans les réécrire, et renvoie chaque mécanique à son propriétaire (modèle accessibility). En divergence : le catalogue a raison sur la loi, le principe sur l'obligation, le propriétaire sur la mécanique.
  2. **Socle universel à quatre** (haute, arbitrée avec l'utilisateur) : `RULES-cognitive-load` rejoint accessibility/interaction/adaptive, chargé pour toute intention ; le coût est mesuré à chaque build (RAPPORT-ROUTEUR) et l'arbitrage se rouvre avec les chiffres si le socle enfle.
  3. **Anti-camouflage promu** (moyenne) : le trou signalé par le catalogue (« candidate ») devient une RÈGLE du principe ; le catalogue pointe désormais vers lui.
  4. **Aucun plafond numérique** (moyenne) : le principe contraint la structure (hiérarchie, divulgation, défauts, réversibilité), jamais un nombre — cohérent avec les mythes réfutés du catalogue (Miller « 7 », règle des 3 clics).
- **Laissé ouvert** : tri/filtre par défaut d'une collection (propriétaire à désigner — CARD candidate le jour d'une collection réelle) ; répartition fine undo/confirmation par composant (premier terrain : TOAST porteur d'une annulation) ; épreuve du réel de l'anti-camouflage (attend un composant de contenu marketing) ; DeleteButton toujours OUVERT (non tranché ici).
- **Pourquoi** : première absence identifiée par la relecture « quatre axes » (visuel / technique / psychologique / sensoriel) à entrer au système — et elle entre par la voie complète de la méthode (inventaire transversal → benchmark → couverture → compilation), pas comme une fiche isolée.

## 2026-07-21 — Calibrage outillé, rythme vertical, cadrage white-space

- **Fichiers** : `tools/audit-couverture.js` (nouveau, lancement manuel) + `tools/reports/RAPPORT-COUVERTURE.md` ; `SPACING-UX.md` 1.2.0 + `SPACING-UI.md` 1.2.0 + `dist/RULES-spacing.md` (section Rythme vertical) ; `atelier/inventaires/inventaire-cas-usage-whitespace.md` (cadrage — aucune règle rédigée) ; `tools/README.md`.
- **Constat** : à 742 cas et 764 règles, la question « assez ou trop ? » ne se juge plus au volume. Le croisement outillé montre 374 cas sans règle rattachée et 363 règles UX jamais exercées par un cas (heuristique lexicale du site — elle désigne où regarder, elle ne condamne pas). Les extrêmes sont parlants : button porte 85 règles pour 33 cas (64 orphelines), accessibility 76 cas pour 15 règles (51 muets).
- **Décision 1 — calibrage** : le critère de légitimité est croisé — un cas est légitime s'il force une décision qu'une règle tranche, une règle l'est si au moins un cas l'exerce. Outillé en rapport NON bloquant ; tailler ou renforcer reste une décision d'atelier, sujet par sujet, de préférence après confrontation au réel (pilotes, études).
- **Décision 2 — rythme vertical** : le rythme entre dans SPACING comme **usage de l'échelle existante** (aucun token nouveau — un token naît d'un besoin réel) : monotonie verticale (intra-bloc < frères < groupes < sections), titre plus proche de ce qu'il ouvre que de ce qu'il ferme, hauteurs accrochées à la grille de base. Les interlignes restent en **baseline souple** — aucun n'est conforme aujourd'hui (body 25,6 px, body-small 21, label 14,4, display 52,8) et les recaler toucherait la lisibilité : position assumée, révisable, documentée en « À approfondir ».
- **Décision 3 — white-space** : inventaire de cadrage AVANT rédaction (leçon typographie). Verdict : l'essentiel du sens du vide vit déjà chez SPACING (proximité, et le rythme désormais) ; les trous réels sont transversaux — isolement/poids (Von Restorff appliqué), affordance par la respiration, anti-usages du vide menteur (horror vacui, aérer un danger), registre d'identité (générosité déclarée). Nature pressentie : **langage mince propriétaire du sens du vide** (modèle accessibility — renvoie aux propriétaires, aucun token) ; l'alternative (combler chez SPACING/INTERACTION sans nouveau sujet) reste ouverte. **NON tranché — remonté**, avec table d'autorité proposée dans l'inventaire.
- **Pourquoi** : réponse au constat fondateur de la discussion — les IA composent par mimétisme (copier des pixels) faute de règles de composition raisonnables (des relations). La proximité, l'affordance et le rythme sont précisément les règles qu'une IA peut appliquer à un écran qu'elle n'a jamais vu ; leur donner un propriétaire et une traçabilité croisée est ce qui distingue une documentation qui raisonne d'un catalogue qui imite.

## 2026-07-21 — Application explicite des 4 Languages à tous les composants, patterns et flow

- **Fichiers** : `atelier/components/{alert,button,card,input,link}/*-UX.md` + `*-UI.md`, `atelier/patterns/form/FORM-UX.md` + `FORM-UI.md`, `atelier/flows/creation-compte/CREATION-COMPTE-UX.md` (versions bumpées, changelogs datés). Compagnons `dist/RULES-*` de composant/pattern mis à jour à la main ; `RULES-creation-compte*` recompilés depuis la source (flow).
- **Contexte** : les 4 Languages (Interaction, Motion, Voice, E-motion) ont été promus « premier niveau » le 2026-07-20 ; seul Toast, écrit après, les intégrait explicitement (renvois nommés + raisonnement propre + contrat `prefers-reduced-motion` + points ouverts remontés). Les autres artefacts portaient la matière brute mais pas le LIEN nommé. Cette passe les met au niveau Toast.
- **Nature du travail** : surtout rédactionnel — renvois NOMMÉS aux fichiers-Language, règle cardinale « ne jamais blâmer » explicitée (input/card/alert), contrats `prefers-reduced-motion` posés là où ils manquaient. Aucune règle existante retirée ; aucun token nouveau.
- **Décisions de design (arbitrées avec l'utilisateur)** :
  1. **E-motion « un événement, un porteur »** (haute) : le moment « réussite d'un envoi » ne s'incarne qu'UNE fois par événement — porté soit par le bouton de soumission quand il résout EN PLACE (l'avion → « Envoyé ✓ »), soit par un toast success illustré quand la confirmation est INJECTÉE ailleurs — jamais les deux. Form et flows DÉLÈGUENT, ne dupliquent pas ; si la confirmation doit rester consultable, c'est un alert success PRODUCTIF (pas de moment). Principe transversal porté par BUTTON, FORM, ALERT (relais) et CREATION-COMPTE.
  2. **Nouveau moment catalogué — « atterrissage / compte créé »** (haute) : le flow création de compte porte un moment E-motion « première fois / onboarding franchi » à l'écran final, anatomie SOBRE (glyphe qui se dessine, SANS `spring`/overshoot — plus calme que l'avion), UNE fois dans le parcours, porteur = un alert/toast success à l'atterrissage, repli reduced-motion vers le fait instantané. Entrée au catalogue d'`EMOTION-UX.md` par cette décision (gouvernance : les moments passent par DECISIONS.md). Réconcilie le « sobre, jamais exubérant » du flow avec l'exception Voice 1.3.0 (un cran chaleureux sur ce seul moment).
  3. **Card — aucun moment E-motion** (moyenne) : absence documentée et raisonnée (§ « Instrument E-motion — sans objet »). La Card est une surface de consultation calme (Interaction) et le composant-collection par excellence (budget de rareté : tout ce qui se répète par carte est disqualifié) ; le moment catalogué « vide/attente avec personnalité » s'incarne dans le CONTENU injecté (un Toast), pas dans le conteneur ; empty states d'erreur et « sans résultat » restent strictement productifs.
  4. **Input / Link — E-motion sans objet, explicité** (basse) : un champ (réflexe/haute fréquence) et un clic de navigation sont hors du catalogue des moments mérités ; l'absence est désormais raisonnée, plus silencieuse.
- **Laissé ouvert (non tranché)** : le **DeleteButton « froissage »** (label qui se froisse avant la corbeille, signalé par `EMOTION-UX.md` § À approfondir depuis le 2026-07-19) reste un point ouvert — hors périmètre de cette passe ; ni catalogué, ni reclassé, ni retiré. Tension avec Voice (« action destructive : ni euphémisme ni sur-dramatisation ») à trancher plus tard.
- **Pourquoi une entrée** : deux entrées de catalogue E-motion (atterrissage retenu, DeleteButton laissé ouvert) et un principe transversal (« un événement, un porteur ») sont des décisions de gouvernance — retrouvables ici plutôt que dispersées.

## 2026-07-21 — TOAST (DS-UI) : région invisible — piège CSS corrigé, ancrage bas-centré tranché

- **Fichiers** : `atelier/components/toast/TOAST-UI.md` (1.0.0 → 1.1.0), `dist/RULES-toast.md` (régénéré à la main, compagnon). Côté DS-UI (hors périmètre normatif de ce dépôt, mentionné pour traçabilité) : `packages/react/src/components/toast/toast.css`, `atelier.html`.
- **Constat (rapport utilisateur)** : le premier livrable Toast sur DS-UI (2026-07-20) affichait les boutons déclencheurs mais aucun toast visible à l'écran — capture d'écran à l'appui.
- **Root cause** : `.ds-toast-region` déclarait `container-type: inline-size` (Container Query, Adaptive) avec seulement une `max-inline-size` en guise de largeur. `container-type: inline-size` applique un `contain` sur l'axe inline : le conteneur perd sa taille intrinsèque (impossible de la dériver de son contenu). Un plafond (`max-*`) ne fixe rien tant que rien d'autre ne détermine la taille de départ — sans une largeur EXPLICITE, l'élément s'effondre à 0px et devient invisible, avec tout son contenu.
- **Décisions** :
  1. **Correction technique** (haute) : `TOAST-UI.md` § Position — implémentation prescrit désormais une largeur EXPLICITE (`width`, pas seulement un plafond) pour tout conteneur de requête. RÈGLE TRANSVERSALE ajoutée : pertinente pour n'importe quel futur composant de ce système utilisant `container-type`, pas seulement Toast.
  2. **Ancrage** (moyenne) : **bas-centré**, tranché par l'utilisateur en conversation — remplace la proposition « bas-droit » de `TOAST-UI.md` v1.0.0, qui n'avait jamais été qu'une convergence d'usage externe (Carbon/Polaris/Material) non vérifiée. Conséquence directe : la note RTL de `TOAST-UI.md` change de nature — un centrage n'a par construction aucun miroir à écrire, contrairement à un ancrage de coin.
- **Pourquoi une entrée plutôt qu'une simple correction silencieuse** : la cause n'est pas un détail d'implémentation isolé — c'est un piège CSS reproductible par tout futur conteneur de requête de ce système (Toast n'est que le premier concerné). Le documenter dans `TOAST-UI.md` en RÈGLE plutôt que dans le seul historique de DS-UI le rend retrouvable la prochaine fois qu'un composant Adaptive doit gérer une taille contrainte plutôt qu'un flux normal.
- **À approfondir** : vérifier si `Card` (autre conteneur de requête du système) est exposé au même piège — `.ds-card` a une largeur naturelle (`width: 100%` dans un flux normal), donc probablement hors de cause, mais à confirmer plutôt que supposer.

## 2026-07-20 — TOAST : nouveau composant, adopté (candidat qu'ALERT-UX.md appelait déjà)

- **Fichiers** : nouveaux `atelier/components/toast/TOAST-UX.md` (1.0.0), `TOAST-UI.md` (1.0.0). Aucun fichier existant modifié — Toast était déjà anticipé sans être écrit (`ALERT-UX.md` § À approfondir : « composant frère exclu par la frontière de périmètre — candidat naturel de prochaine documentation »).
- **Origine** : remonté depuis une question produit sur l'humanisation de l'UI (Fluent UI Emoji) — l'analyse a montré que le foyer légitime de l'instrument « illustration/forme » d'E-motion pour les moments « envoi réussi » et « sortie d'erreur » n'est pas l'Alert (qui exclut structurellement le feedback immédiat) mais ce composant frère, jusqu'ici non documenté.
- **Décisions (arbitrées en conversation avec l'utilisateur)** :
  1. **Tone** (moyenne) : les 4 tones d'Alert repris à l'identique (info/success/warning/danger) — pas de restriction à info/success malgré le risque identifié.
  2. **Danger en toast** (haute) : accepté avec risque documenté plutôt qu'exclu vers l'alert seul — un toast danger ne doit jamais être le seul porteur d'une condition qui dure (cf. TOAST-UX.md § Tone).
  3. **Actions** (moyenne) : une seule tolérée (pattern undo), timing suspendu au survol/focus obligatoire (WCAG 2.2.1). Durée plancher reprise telle quelle de `BUTTON-UX.md` (5-8s, IBM Carbon) — aucune nouvelle valeur inventée à ce niveau.
  4. **Empilement** (moyenne) : 2-3 max, ordre d'arrivée (FIFO) — divergence assumée avec Alert (qui empile par gravité décroissante) : le toast empile des événements séquentiels, pas des conditions simultanées, le raisonnement d'Alert ne se transpose pas à l'identique.
  5. **Position** (basse) : pilotée par Adaptive (conteneur), pas un ancrage fixe viewport — cohérent avec la décision Adaptive du 2026-07-20 (Interaction Language, Adaptive Architecture et Link).
  6. **Instrument illustration E-motion** (haute) : actif uniquement si le toast est seul à l'écran (jamais sur une pile — cohérence avec le budget de rareté), jamais sur danger/warning. Technique retenue : glyphe dessiné (`stroke-dashoffset`, gabarit SubmitButton, héritage direct d'`EMOTION-UI.md`) — PAS une illustration importée. L'arbitrage plus large « Fluent UI Emoji comme bibliothèque d'illustration » (options A/B/C) reste NON TRANCHÉ ; seule la technique déjà établie est utilisée ici.
- **Valeurs UI proposées, non sourcées** (`TOAST-UI.md` § Sources, marquées « non établi ») : formule de durée (base 6000ms + 50ms/mot au-delà de 8 + bonus 2000ms si action, plafond 10000ms) et ancrage bas-droit par défaut — les deux à vérifier à l'usage avant d'être promues « établi ».
- **Ce qui est repris sans discussion** (déjà établi ailleurs, pas une décision de cette entrée) : silhouettes d'icône par tone, `role="alert"`/`role="status"`, `elevation.overlay` — désigné légitime pour le toast dans `RULES-interaction.md` avant même que ce composant existe.
- **Pourquoi une entrée plutôt qu'un silence** : six décisions de gouvernance et deux valeurs techniques non sourcées méritent chacune d'être retrouvables — même principe que la décision Interaction/Adaptive/Link du même jour : documenter la raison, pas seulement la règle.
- **À approfondir** : cf. `TOAST-UX.md` § À approfondir (RTL, reduced motion, fermeture manuelle explicite) et `TOAST-UI.md` § À approfondir (vérification des deux valeurs proposées).


## 2026-07-20 — README : vision explicitée (base framework-agnostique, philosophie fonctionnelle)

- **Fichiers** : `README.md` (nouvelle section « Vision »). Aucune règle UX/UI modifiée, aucune version de composant/fondation/langage bumpée.
- **Ancienne situation** : deux intentions fondatrices du projet n'existaient qu'à l'oral — dans les échanges avec l'auteur et dans la mémoire de session d'un agent — sans jamais avoir été couchées dans un fichier du dépôt. (1) DS-MD est pensé comme une base de connaissance indépendante du framework, dont DS-UI (React) n'est qu'une implémentation parmi d'autres possibles (SwiftUI, Flutter, plugin Figma, génération directe par IA) ; rien dans `README.md`, `AGENTS.md` ou la page « pourquoi » du site ne le disait. (2) La philosophie visuelle du projet — fonctionnel avant tendance, compréhension avant lecture, registre intemporel plutôt que décoratif — vit déjà, appliquée, dans `INTERACTION-UX.md`, `MOTION-UX.md`, `VOICE-UX.md` et `EMOTION-UX.md`, mais aucun endroit ne la nomme comme intention commune : un lecteur qui n'ouvre qu'un seul de ces fichiers ne voit qu'une application locale, pas le principe qui les relie.
- **Nouvelle règle** : aucune (documentaire). `README.md` porte désormais une section « Vision » qui nomme les deux explicitement, avec renvoi vers les fichiers qui les appliquent déjà — elle ne redéfinit rien, elle rend visible ce qui existait dispersé.
- **Pourquoi** : une intention qui ne vit que dans la mémoire d'une conversation ne survit pas à la conversation. Un dépôt destiné à rester la source de vérité, y compris pour un futur contributeur ou une future IA sans contexte oral, doit porter par écrit les raisons de ses choix, pas seulement les choix eux-mêmes.

## 2026-07-20 — E-MOTION : DeleteButton (DS-UI) hors catalogue — point ouvert, non tranché

- **Constat** : DS-UI a livré le 2026-07-19 un DeleteButton dont le label se froisse en boule (E-motion, cran `motion.spring`) avant de tomber dans la corbeille. Ni le composant ni le moment n'existent dans DS-MD : `BUTTON-UX.md` ne connaît pas de « DeleteButton » distinct du modèle style×tone générique, et le catalogue des moments mérités d'`EMOTION-UX.md` ne couvre que succès / première fois / cap / sortie d'erreur / vide — aucune entrée destructive.
- **Tension identifiée** : VOICE-UX § « Le ton suit l'utilisateur » impose pour toute action destructive un ton « direct, factuel, conséquence nommée ; ni euphémisme ni sur-dramatisation ». Un froissage ludique avant la corbeille peut se lire comme l'équivalent visuel d'un euphémisme — sans que ce soit certain : la question reste ouverte.
- **Décision** : AUCUNE. Conformément au protocole du routeur (une décision de design non tranchée s'expose et se remonte, elle ne s'improvise pas), ce point est documenté comme non résolu — cf. `EMOTION-UX.md` § À approfondir — plutôt que catalogué ou invalidé unilatéralement.
- **Options à trancher** : (1) cataloguer un moment « retrait/suppression » à l'anatomie sobre, distincte de l'avion en papier (sans `spring`/overshoot) ; (2) reclasser le froissage comme signal de transition (Interaction/Motion) plutôt que comme moment E-motion « mérité » ; (3) sobriser ou retirer l'animation.
- **Pourquoi remonté plutôt que résolu ici** : DS-MD est l'autorité UX, DS-UI l'implémentation — un écart de ce type, une fois repéré, se documente et s'arbitre avec l'utilisateur ; il ne se règle pas silencieusement par un agent, quel que soit le sens du règlement.

## 2026-07-20 — VOICE : exception E-motion documentée dans les deux sens

- **Fichiers** : `atelier/languages/voice/VOICE-UX.md` (→ 1.3.0), `VOICE-UI.md` (→ 1.2.0).
- **Ancienne situation** : `EMOTION-UX.md` affirmait unilatéralement (§ Quatre instruments) : « Voix — autorité `RULES-voice.md` ; E-motion en autorise le registre chaleureux ». Ni `VOICE-UX.md` ni `VOICE-UI.md` ne mentionnaient E-motion — un agent chargeant Voice sans E-motion (ou lisant les deux dans cet ordre) n'avait aucun moyen de découvrir l'exception. Pire, le tableau « Le ton suit l'utilisateur » de VOICE-UX affirmait l'inverse pour le cas Succès : « pas de "Bravo !", pas de confettis (écho MOTION : pas de célébration) », sans distinguer succès routinier et moment E-motion catalogué — et VOICE-UI gardait un gabarit « succès » identique, sans exception.
- **Nouvelle règle** : VOICE-UX documente désormais explicitement l'exception (§ Exception E-motion, nouvelle section) et corrige la ligne Succès du tableau de ton en deux cas (routinier / moment E-motion catalogué) ; VOICE-UI assortit la règle « pas de point d'exclamation » et le gabarit « succès » de la même exception, bornée aux seuls moments du catalogue d'EMOTION-UX.md.
- **Pourquoi** : une règle d'autorité doit être lisible depuis les deux fichiers qu'elle relie. Le routeur charge Voice quand E-motion est invoqué (`selon-contexte`), jamais l'inverse — l'exception ne pouvait donc être garantie visible que si elle vivait aussi côté Voice.

## 2026-07-20 — DESIGN.md : résidu terminologique corrigé (E-motion = langage, pas fondation)

- **Fichiers** : `atelier/core/DESIGN.md` (→ 1.25.1). Aucun token modifié.
- **Ancienne situation** : le commentaire du cran `motion.expressive`/`spring`/`celebration` (ajouté en 1.22.0, à l'époque où E-motion était encore une fondation) disait toujours « fondation E-motion », alors que la reclassification 1.24.0 a promu E-motion en langage.
- **Nouvelle règle** : le commentaire dit « langage E-motion ».
- **Pourquoi** : un résidu de nommage après une reclassification peut laisser croire, à tort, qu'une classification reste incertaine ou que deux sources se contredisent.

## 2026-07-20 — Équilibre structurel Foundations / Languages / Principles

- **Fichiers** : création de `atelier/principles/` ; Motion déplacé vers `atelier/languages/` ; Accessibility, Adaptive et Laws déplacés vers `atelier/principles/` ; adaptation de DESIGN, de la méthode, du routeur, des validateurs, de la distribution et du site. Navigation regroupée sous trois repères : Méthode / Core / Application.
- **Ancienne situation** : la séparation Foundations / Languages clarifiait Interaction, Emotion et Voice, mais laissait Motion parmi les fondations alors qu'il exprime les changements dans le temps. Accessibility, Adaptive et Laws étaient regroupés avec les matières visuelles malgré leur rôle d'obligation ou de raisonnement transversal. Créer une catégorie Architecture pour Adaptive seul aurait provisionné une famille sans corpus.
- **Nouvelle règle** : une **Foundation fournit la matière et le vocabulaire de construction** ; un **Language exprime du sens par un canal cohérent** ; un **Principle encadre les décisions indépendamment du rendu**. Répartition : 8 Foundations, 4 Languages, 3 Principles.
- **Pourquoi** : trois tests simples suffisent désormais à classer un sujet : « sert-il à construire ? », « exprime-t-il quelque chose ? », « doit-il guider toute décision ? ». Les catégories restent substantielles sans forcer un sujet dans une case ni créer de groupe solitaire.
- **Navigation** : **Méthode** regroupe pourquoi / process / vérification dans un volet repliable ; **Core** regroupe Foundations / Languages / Principles ; **Application** regroupe Components / Patterns / Flows. Core et Application restent des séparateurs visuels ; les intitulés de catégories portent les accordéons.

## 2026-07-20 — Séparation structurelle Foundations / Languages

- **Fichiers** : création de `atelier/languages/` ; déplacement de Interaction, E-motion et Voice ; adaptation des validateurs, du routeur IA, du site, de l’index DESIGN et de la distribution.
- **Ancienne situation** : Interaction portait déjà le nom de « langage », Voice décrivait une grammaire de contenu et E-motion une couche d’expression, mais les trois vivaient dans `atelier/foundations/` avec `type: foundation`. La structure contredisait leur rôle.
- **Nouvelle règle** : une **fondation** fournit une primitive, une contrainte ou une architecture ; un **langage** compose ces fondations pour produire des signes cohérents. Interaction, E-motion et Voice portent désormais `type: language`. Adaptive reste une fondation architecturale.
- **Pourquoi** : les fondations sont le vocabulaire ; les langages sont la grammaire. Cette séparation permet à une IA de distinguer ce qui constitue l’interface de ce qui lui donne du sens.

## 2026-07-20 — Interaction Language, Adaptive Architecture et Link

- **Fichiers** : nouvelles fondations `interaction` et `adaptive`, nouveau composant `link`, trois
  inventaires de couverture ; Button, Input, Card et Spacing reliés ; index de DESIGN étendu sans
  nouveau token.
- **Constat** : le corpus portait déjà plusieurs fragments justes — Button ≠ Link, Input délimité,
  Card statique sans ombre, elevation comme signal — mais aucun propriétaire ne les réunissait en
  langage. Le responsive des composants restait piloté par `breakpoint.mobile`, donc par la fenêtre,
  même quand leur espace réel venait d'une sidebar, d'une modale ou d'une grille.
- **Décision Interaction** : la reconnaissance du rôle précède le style. Agir, naviguer, saisir,
  choisir, consulter et signaler ont des promesses distinctes. La matérialité est fonctionnelle :
  bordure, fond, forme, état, mouvement ou profondeur peuvent renforcer le rôle, mais aucune ombre,
  inset ou animation n'est imposé. La couleur et le hover ne portent jamais seuls l'information.
- **Décision Adaptive** : « la fenêtre définit la page ; le conteneur définit le composant ».
  Container Queries par défaut quand l'espace disponible du composant cause l'adaptation ; Media
  Queries maintenues pour la structure globale, l'impression, le mouvement réduit, le contraste forcé
  et les capacités d'entrée. Les seuils sont dérivés du contenu et les états se nomment
  compact/regular/expanded, jamais mobile/tablet/desktop.
- **Décision Link** : la dette « lien dans le texte » devient un composant documenté. Un Link promet
  une destination ; un Button promet une action. Le soulignement inline, le but du lien, les
  téléchargements, les nouveaux contextes et le lien étendu d'une Card ont désormais un propriétaire.
- **Pourquoi aucun token** : les besoins visuels se résolvent déjà avec couleur, typographie,
  bordure, icône, motion et élévation. Ajouter des tokens « tactile » aurait transformé une loi
  d'affordance en thème graphique et dupliqué les propriétaires existants.
- **Condition de validation** : éprouver sur un écran réel la coexistence d'un même composant dans
  deux largeurs de conteneur au même viewport, puis tester la reconnaissance en niveaux de gris, sans
  hover et au clavier.

## 2026-07-19 — Propagation du modèle STYLE × TONE dans les renvois croisés

- **Fichiers** : `COLOR-UI.md` (v1.1.0 — paires garanties étendues aux nouveaux fonds pleins, « warning jamais un fond plein » levé aussi ici, table de consommation du bouton réécrite en rôles par tone) et `dist/RULES-color.md` (mêmes tables) ; bumps de vocabulaire sans changement de règle : COLOR-UX 1.1.1, ALERT-UX 1.3.1, CARD-UX 1.2.1, INPUT-UX 1.5.1, INPUT-UI 1.4.2, FORM-UX 2.1.3, CREATION-COMPTE-UX 1.2.2, TYPOGRAPHY-UX 1.1.2, GRID-UX 1.0.1, METHODE 1.8.1, inventaire couleur (9 → 16 combinaisons), RULES-alert/card/input/creation-compte(-sso-social), `tools/genere-site.js` + `tools/methode-contenu.js` (deux textes du site).
- **Ancienne situation** : la décision BUTTON du 2026-07-18 avait renommé l'axe `emphasis` → `style` dans BUTTON-* et DESIGN.md, mais l'ancien nom restait vivant dans les notes de transposition et les renvois des autres sujets — et COLOR-UI garantissait encore « warning : jamais un fond plein » alors que le garde-fou était levé, sans mentionner `neutral-strong(-hover)`, `warning-hover` ni `danger-subtle-hover`.
- **Nouvelle situation** : plus aucune occurrence normative d'`emphasis` ; les mentions restantes sont historiques (ce journal, la note de vocabulaire BUTTON-UX 1.5.0, les récits du site). La formule des notes de transposition devient « l'axe `style` n'existe pas ici ». La table des paires garanties dit les paires réelles : `on-primary` sur `neutral-strong(-hover)` et `warning(-hover)`, `danger` sur `danger-subtle-hover`.
- **Pourquoi** : un renvoi normatif vers un axe qui n'existe plus est un défaut de doc du même ordre qu'un token fantôme ; et la table des paires garanties est le contrat que `test-rendu.js` vérifie — elle doit dire ce qui est vrai, ni plus ni moins.

## 2026-07-18 — E-MOTION : la couche d'EXPRESSION (13e fondation)

- **Fichiers** : `atelier/foundations/emotion/EMOTION-UX.md` + `EMOTION-UI.md` (v1.0.0), `dist/RULES-emotion.md`, `atelier/core/DESIGN.md` (v1.22.0 — cran motion `expressive` 700ms / `spring` overshoot / `celebration` 1200ms), `tools/genere-routeur.js` (emotion rattachée aux intentions Formulaire + Feedback). `dist/tokens.*` régénérés.
- **Ancienne règle** : le système n'avait qu'un registre de mouvement PRODUCTIF (< ~400ms, « pas de célébration, pas de bounce »). MOTION-UX 1.2.0 avait déjà noté que ce « productif seulement » était un parti pris d'identité PARAMÉTRABLE, relevable par un « chemin sanctionné » — mais ce chemin n'existait pas encore.
- **Nouvelle règle** : E-motion EST ce chemin. Une couche d'expression mince, rare et gouvernée — la « couche humaine/émotionnelle » qui différencie le DS. Elle relève le parti pris (durées > 400ms, courbe à dépassement `spring`, plafond `celebration`) pour des moments strictement MÉRITÉS (réussite d'un envoi, première fois, cap franchi, sortie d'erreur, vide avec personnalité), sous **budget de rareté** (un moment qui se répète cesse d'être expressif — miroir de « un seul primary par vue »). Loi cardinale : l'expression est proportionnelle au SENS du moment (miroir de « friction ∝ risque »).
- **Ce qui n'est JAMAIS relevé** : le contrat d'accessibilité. E-motion hérite tout WCAG de motion (reduced-motion → version instantanée ; `transform`/`opacity` seulement ; pas de flash > 3/s ; jamais d'info par le seul mouvement). Contrat de repli INVIOLABLE : E-motion est toujours une amélioration, jamais un canal d'information.
- **Pourquoi** : demande produit explicite (réf. « Paper plane button » d'Aaron Iker) — offrir des moments d'expression qui sortent de la monotonie d'un DS ultra-cadré ; la couche émotionnelle qui différencie. Nom trouvé ensemble : « E-motion » (émotion + motion). Décision de tracer le parti pris DANS le système (fondation gouvernée) plutôt qu'à côté (effet local), pour ne pas introduire de valeur hors-système.
- **Premier citoyen** : le SubmitButton « avion en papier » (envoi async → pliage/vol → succès), gabarit de tout futur moment. Quatre instruments : mouvement (premier violon), voix (registre chaleureux autorisé), couleur (empruntée aux tokens), forme.

## 2026-07-18 — BUTTON : modèle STYLE × TONE (deux axes pleinement orthogonaux)

- **Fichiers** : `atelier/core/DESIGN.md` (v1.21.0 — 4 tokens : `neutral-strong`, `neutral-strong-hover`, `warning-hover`, `danger-subtle-hover`), `atelier/components/button/BUTTON-UI.md` (v1.4.0 — bloc `colors` plat remplacé par un bloc `tones`), `BUTTON-UX.md` (v1.5.0 — vocabulaire des axes), `dist/RULES-button.md` (édition manuelle), `tools/test-rendu.js` (gate `buttonModel` réécrit), `tools/genere-site.js` (spécimens + kitchen-sink). `dist/tokens.*` régénérés au build.
- **Ancienne règle** : axe `emphasis` [primary, secondary, ghost] × `tone` [neutral, destructive, warning] = 9 combinaisons. `emphasis` confondait deux choses — le REMPLISSAGE (primary = plein, secondary/ghost = sans fond) et le RANG de l'action dans la vue. `primary` et `neutral` n'étaient pas des tones ; le warning n'existait qu'en fond subtil (« jamais un fond plein »).
- **Nouvelle règle** : deux axes pleinement orthogonaux — `style` [filled, stroke, lighter, ghost] (le remplissage) × `tone` [primary, neutral, destructive, warning] (la couleur sémantique) = **16 combinaisons**, chacune un token explicite. Chaque tone fournit 4 rôles : `solid`/`on_solid`/`solid_hover` (filled), `fg`/`border` (stroke), `subtle`/`on_subtle`/`subtle_hover` (lighter), le style ghost réutilisant `fg`/`subtle`. Le **rang** (dominante/alternative/mineure) n'est plus un axe : il s'obtient en combinant style+tone (dominante = `filled`+`primary`, alternative = `stroke`/`lighter`+`neutral`, mineure = `ghost`+tone). Le garde-fou « warning jamais en fond plein » est levé.
- **Pourquoi** : demande produit — aligner DS-UI et DS-MD sur un même modèle Style × Tone (réf. Material 3 : filled/tonal/outlined/text). L'ancien `emphasis` mélangeait remplissage et rang, ce qui rendait illégitimes un `stroke`+`primary` (bordé bleu) ou un `lighter`+`primary` (bleu doux). L'ambre profond `warning` #92400E (assombri en 1.14.0 pour la lisibilité) porte le blanc à 7.09:1 : il tient désormais comme fond plein, donc warning a les 4 styles comme les autres.
- **Vérifié** : les 16 combinaisons × (repos + hover) tiennent ≥ 4.5:1 (`tools/test-rendu.js`). Paire la plus tendue : `lighter` + destructive au hover = 4.60:1 — d'où `danger-subtle-hover` calibré à #FBCFCF (un #FECACA « red-200 » naïf tombait à 4.47:1, sous le seuil).

## 2026-07-16 — BORDER/ACCESSIBILITÉ : pas d'anneau sur une cible de focus programmatique

- **Fichiers** : `atelier/foundations/border/BORDER-UI.md` (v1.1.0), `tools/genere-site.js` (émet `[tabindex="-1"]:focus{outline:none}` dans `public/assets/site.css`). `dist/RULES-border.md` reste à resynchroniser (dette de compilation non généralisée).
- **Ancienne règle** : « jamais `outline: none` sans remplacement 3:1 », sans exception — en collision avec la pratique d'accessibilité qui déplace le focus sur le titre/la région au changement de vue (annonce lecteur d'écran).
- **Nouvelle règle** : `outline: none` est autorisé, et seulement, sur une cible de focus programmatique (`tabindex="-1"`, non atteignable au Tab). L'anneau reste obligatoire sur tout contrôle clavier, y compris un panneau d'onglet `tabindex="0"` vide.
- **Pourquoi** : bug visible sur les trois surfaces (démo, doc, audit) — un titre encadré « parfois » au chargement. Le focus programmatique sur un `<h1 tabindex="-1">` affiche son anneau quand la dernière modalité était le clavier (`:focus-visible`), d'où l'intermittence. La règle ne disait rien de cette cible ; le bug l'a révélé.

## 2026-07-17 — Site : gate de complétude du registre des sujets, plutôt qu'une refonte physique du registre

- **Fichiers** : `tools/audit-sujets.js` (nouveau), `tools/build.js` (étape 8/11 insérée), `docs/SITE-CONVENTIONS.md`, `tools/README.md`. Aucun changement de sortie (`public/` identique).
- **Constat** : dans `genere-site.js`, les données d'un sujet sont éclatées dans des structures indépendantes — `ICONES` (emblème), `SUJET_QUESTIONS` (narration), `SUJET_REGLES` (règles), `casVisuel`/`familleVisuel` (illustrations). Rien ne reliait ces morceaux : `grid` a pu être ajouté à moitié illustré, et un clobber de sous-agent a pu réverter son emblème vers `_defaut` **sans qu'aucun contrôle ne le signale**. Le code review proposait de tout consolider en « un objet par sujet ».
- **Option écartée** : la consolidation *physique* des quatre fonctions d'illustration en propriétés par slug. Mesuré sur le terrain : `casVisuel`/`familleVisuel`/`specimen*` dépendent chacune de ~20 closures locales partagées (helpers `bar`, `champ`, `coche`, `svg`…) ; les fondre voudrait dire recâbler ~2500 lignes de générateur SVG — **risque pur pour zéro changement de sortie**. `familleVisuel` s'est de plus révélée pilotée par le *titre* de section (fallback garanti), pas par le slug : « un objet par slug » ne correspond pas à sa vraie mécanique.
- **Décision** : livrer la *garantie* que la refonte cherchait — « impossible d'oublier une pièce » — par un **gate mécanique** (`audit-sujets.js`) au lieu du déplacement de données. Il découvre les sujets depuis `atelier/` (comme le site) et vérifie pour chacun le contrat universel : **emblème dédié ≠ `_defaut`, narration, règles, branche `casVisuel`** (sans elle, la fonction retombe sur `return null` → aucune illustration de cas). `familleVisuel` et le spécimen sont reportés en informatif. Le build passe au rouge, en nommant le sujet et la pièce, dès qu'un morceau manque. Vérifié : les 18 sujets passent aujourd'hui ; une copie cassée (branche retirée + emblème = défaut) est bien détectée.
- **Dans la foulée (a11y, WCAG 1.3.1)** : le gate `audit-a11y` signalait 25 sauts de hiérarchie `h1→h3`. Cause unique et systématique : le titre de section « Trois règles fondamentales » (et le titre du flow-chrono, et les entrées de journal) étaient des `h3` **avant** le premier `h2` de la page, alors qu'ils sont des sections **paires** de « Cas d'usage » (déjà `h2`). Correction : promotion en `h2` avec une classe qui **reproduit au pixel** l'ancien style `h3` (`h2.titre-essentiel`, `h2.flow-chrono-titre`) — sémantique corrigée, **zéro changement visuel**. Résultat final : **25 → 0 avertissement**, les **34 pages** propres. Deux techniques, toutes deux **sans changement visuel** : (a) les titres de section réels promus en `h2` avec une classe qui reproduit au pixel l'ancien style (`h2.titre-essentiel`, `h2.flow-chrono-titre`) ; (b) pour les pages où un titre `h2`/`h1` manquait dans le plan sans manquer visuellement (`decisions`, `pourquoi`, `process`, `tests`, et un titre de page pour `preuve-themes`), un titre `sr-only` (invisible, lu par les seuls lecteurs d'écran). Enfin, les **aperçus décoratifs** de landing (mock répété deux fois par page → `h1` multiples) sont passés `aria-hidden="true" inert` : hors de l'arbre d'accessibilité ET de l'ordre de tabulation (les faux boutons ne sont plus focusables — vrai gain clavier), et `audit-a11y` a appris à **ignorer les sous-arbres cachés** dans le calcul du plan de titres (correction de principe : un titre caché des lecteurs d'écran ne compte pas). Le `h1` de page de `preuve-themes` n'est ajouté qu'en page autonome, pas dans le volet « Thèmes » embarqué de `tests` (sinon double `h1`).
- **Pourquoi** : la fiabilité voulue est une *contrainte vérifiée*, pas une *forme de code*. Un gate déclaratif l'obtient sans toucher au générateur (donc sans risque de régression visuelle), reste dans l'invariant zéro-dépendance et rejoint la famille `audit-regles`/`garden`/`audit-a11y`. La consolidation physique reste possible plus tard si un autre besoin la justifie — elle n'est plus la condition de la garantie. (A aussi corrigé une dette : la liste numérotée du build dans `tools/README.md` avait sauté l'étape a11y.)

## 2026-07-16 — TYPOGRAPHIE : token `body-small` (14 px) pour le texte fonctionnel sous le corps

- **Fichiers** : `atelier/core/DESIGN.md` (v1.19.0, `typography.body-small`), `atelier/components/input/INPUT-UI.md` (v1.4.1), `dist/tokens.css` + `dist/tokens.yaml` régénérés.
- **Ancienne règle** : aucun cran de texte entre `label` (12 px, interface) et `body` (16 px). INPUT-UI mappait le texte saisi, le label **et les messages** sur `typography.body` (16 px), au nom de la règle « jamais sous 16 px » — laquelle vise en réalité le **champ de saisie** (zoom iOS), pas son helper.
- **Nouvelle règle** : `typography.body-small` (Geist 14 px) pour le **texte fonctionnel qui n'est pas un champ** : helper, message d'erreur, compteur, légende. Le texte saisi et le label restent en `body` (16 px, règle iOS maintenue).
- **Pourquoi** : révélé par le pilote externe (agent à froid Claude Code, 2026-07-16) — faute d'un cran ~14 px, l'agent a détourné `headings.h6`, un token de **titre**, pour du helper text (couplage au mauvais rôle). Jumeau du besoin qui a fait naître la fondation `grid` au même pilote. Décision de design assumée : le helper passe de 16 à 14 px.

## 2026-07-16 — Fondation grid : naissance par le besoin de largeur de conteneur

- **Fichiers** : `atelier/foundations/grid/GRID-UX.md` + `GRID-UI.md` (1.0.0), `atelier/inventaires/inventaire-cas-usage-grid.md`, `DESIGN.md` (1.18.0, groupe `grid`), `SPACING-UX.md` (1.1.0), `dist/RULES-grid.md` (condensation) + routeur (grid ajouté aux bundles Formulaire/Collection/Page de contenu/Création de compte), outillage (`genere-tokens`, `valide-dossier`, `garden`).
- **Ancienne règle** : SPACING avait différé la fondation grid *entière* en l'absence de consommateur ; un écran mono-colonne n'avait donc aucun token de largeur (détour de `breakpoint.mobile`).
- **Nouvelle règle** : la fondation `grid` naît avec le **besoin prouvé** — les largeurs de conteneur (`container-narrow` 480 / `-default` 1024 / `-wide` 1440), trou confirmé par deux pilotes indépendants le 2026-07-16. La **grille de colonnes** (12 colonnes, gouttières inter-colonnes) reste différée jusqu'au pattern collection/grille.
- **Pourquoi** : un token de largeur bolté seul aurait été une fondation orpheline ; le faire naître avec sa fiche, son inventaire et son benchmark (Carbon, GOV.UK, Material) respecte la méthode. Frontières posées : `grid` ≠ `measure` (lecture) ≠ `spacing` (proximité) ≠ `media_ratio` (ratio). RULES-spacing mis à jour (le cadre de page a quitté spacing).

## 2026-07-16 — Pilotes externes (login + inscription) : registre de trous, consentement désambiguïsé

- **Contexte** : deux pilotes « consommateur naïf » exécutés sur `dist/` seul (login → intention Formulaire ; inscription → Création de compte), désormais reproductibles via `tools/pilote/PROTOCOLE-PILOTE.md` (résultats : `tools/reports/RAPPORT-PILOTE.md`). Verdict : routage, discipline des extensions et remontées (toast hors-périmètre, garde-fous couleur, soft/hard-gate) tous corrects — le système est consommable par un tiers. La valeur du test est dans les trous ci-dessous.
- **Fait maintenant** : `atelier/patterns/form/FORM-UX.md` (2.1.1 → 2.1.2). *Ancienne* : la table de risque routait « Consentement » sans distinguer l'inscription du consentement lié à des données sensibles, alors que `form-sensitive-data` revendique aussi « consentement » dans son périmètre — les deux pilotes ont noté le risque de charger la mauvaise extension. *Nouvelle* : autorité explicite — `creation-compte-consentement` à l'inscription, `form-sensitive-data` seulement pour un consentement lié à des données sensibles ou à un paiement, jamais les deux. Aucune règle de fond modifiée.
- **Routé à leur propriétaire (à traiter par le cycle méthode, pas en patch)** :
  - **Token de largeur de conteneur** — signal fort (trouvé par les DEUX pilotes) : un écran de formulaire centré n'a aucun token de largeur, l'agent détourne `breakpoint.mobile`. À traiter avec la **fondation grid/layout déjà différée** (cf. entrée 2026-07-11 « SPACING : le grid n'a pas de fondation propre ») — ne pas bolter un token orphelin, ce serait une fondation orpheline.
  - **Bundle `alert` sans `iconography`** — signal fort (deux pilotes) : `alert`, présent dans les bundles Formulaire/Création, impose une icône par tone, mais `iconography` n'est pas chargé par ces intentions. ALERT reste auto-suffisant (silhouettes fixées dans ALERT-UI.md), donc non bloquant ; correctif = ajouter `iconography` au « Charger » de ces intentions dans la table INTENTIONS de `tools/genere-routeur.js`, ou déclarer la dépendance dans ALERT-UX. Reporté (genere-routeur.js en cours de modification dans l'arbre — éviter le clobber).
  - **Checkbox, angle mort** : INPUT-UX énumère ses `field_type` sans la checkbox ; le consentement délègue « le mécanisme » à INPUT/FORM qui ne le spécifient pas (états, couleur de coche, focus). À documenter comme `field_type` d'INPUT via le cycle complet (inventaire + benchmark), pas en patch.
  - **Indicateur de force** : la barre colorée attendue heurte deux garde-fous couleur (`warning` jamais en fond plein, pas de token `on-success`). Ajouter un renvoi explicite dans l'extension force (source `CREATION-COMPTE-UX.md`) : rendre la force par le tone d'input + le mot, pas une barre pleine. Reporté (source en cours de modification dans l'arbre).
  - **Couleur du lien dans le texte** : dette déjà connue (COLOR : « lien dans le texte, sans consommateur donc sans token — STOP si le cas se présente »), re-confirmée par le pilote login. Un consommateur existe désormais (lien « Mot de passe oublié ? ») : décider un token de lien dédié ou réutiliser `text-secondary`/`primary` — décision produit, à journaliser lors de sa prise.
- **Pourquoi** : ces trous ne sont pas des patchs — plusieurs sont liés à une fondation différée (grid) ou demandent le cycle inventaire+benchmark ; les combler à la va-vite contredirait la méthode que le reste du projet applique. Ils sont donc tracés ici (étape 8 du pipeline) pour revenir à leur propriétaire. Corrobore et complète l'entrée « e-mail déjà utilisé » ci-dessous, issue d'un pilote indépendant le même jour — deux pilotes distincts convergent sur la même couture login/flow.

## 2026-07-16 — ROUTEUR : source visuelle externe = thème, pas composant (+ barrière theme-gate)

- **Fichiers** : `tools/genere-routeur.js` (protocole, point 11), `tools/theme-gate.mjs` (nouveau) copié en `dist/theme-gate.mjs` par `tools/genere-tokens.js`, `docs/INSTALLATION.md` (v1.8.0), `dist/CLAUDE.md` + `dist/AGENTS.md` régénérés.
- **Ancienne règle** : le protocole ne disait rien du cas « un design.md externe entre dans le fil de discussion ». Laissé libre, un agent forke un composant parallèle (test WanderLuxe) — il perd la logique UX et réintroduit des bugs d'accessibilité (border-strong ramené à 1,6:1).
- **Nouvelle règle** : une source externe est un **thème** (valeurs mappées sur les noms de tokens), jamais une spec de composant ; tout token manquant garde le défaut du système (jamais d'invention) ; une maquette marketing est signalée et on retombe sur le système ; validation de contraste obligatoire (`theme-gate.mjs`) avant d'appliquer — un thème qui échoue ne s'applique pas.
- **Pourquoi** : retour de deux tests de rebranding (2026-07-16) — le fork casse les normes, le token-swap validé les conserve. La barrière rend la norme **exécutable** au lieu de déclarative.


## 2026-07-16 — FLOW « e-mail déjà utilisé » : défaut sûr + remontée obligatoire (retour de pilote)

- **Fichiers** : `atelier/flows/creation-compte/CREATION-COMPTE-UX.md` (v1.2.1), `dist/RULES-creation-compte-email-deja-utilise.md`, `docs/INSTALLATION.md` (v1.7.0).
- **Ancienne règle** : le flow imposait de *choisir explicitement* la posture (ouverte vs neutre) et de la tenir partout, sans dire quoi faire tant que le produit n'a pas tranché.
- **Nouvelle règle** : en l'absence d'arbitrage produit, l'agent **remonte le choix** et applique **par défaut la posture neutre** (ne pas confirmer l'existence d'un compte dans l'interface). Retenir la posture ouverte en silence devient explicitement le défaut à éviter.
- **Pourquoi** : premier pilote à froid (agent Claude Code non briefé, 2026-07-16). Sur un parcours d'inscription complet et par ailleurs très conforme, l'agent a tranché seul la seule question de sécurité de l'écran — en choisissant l'option la moins protectrice, notée comme simple hypothèse. Le signal « lève la main » du système n'était pas assez impératif là où il compte le plus. Corrobore la couture repérée côté login (posture inatteignable depuis l'intention formulaire — à traiter quand le flow connexion sera documenté).

## 2026-07-15 — FLOW : retrait du prototype fictif, la preuve attendra le réel

- **Fichiers** : `tools/genere-site.js`, `docs/architecture/SITE.md` (v1.12.0), `public/sujets/creation-compte.html`.
- **Ancienne présentation** : un film de quatre téléphones puis un second prototype interactif rejouaient une inscription inventée, avec des choix produit spécifiques et des composants encore absents du système.
- **Nouvelle présentation** : la page conserve la lecture temporelle dans « L'essentiel » et la carte des cas d'usage, mais retire l'onglet « Voir en action ». Cet emplacement ne reviendra qu'avec un flow réellement observé, présenté comme une chaîne `faits → règles → risques → arbitrages`.
- **Pourquoi** : une maquette fictive prouve seulement que le site sait dessiner des écrans. Elle ne prouve ni le pouvoir de détection du projet ni sa plus-value face au réel, et peut être confondue avec un template prescriptif.

## 2026-07-15 — FLOW création de compte : règles sensibles recalibrées et première compilation mécanique

- **Fichiers** : `atelier/flows/creation-compte/CREATION-COMPTE-UX.md` (v1.2.0), `tools/genere-flow.js`, `dist/RULES-creation-compte*.md`, `tools/genere-routeur.js`, `tools/genere-site.js`, `atelier/core/METHODE.md` (v1.8.0), `docs/INSTALLATION.md` (v1.6.0), `docs/architecture/SITE.md` (v1.11.0).
- **Anciennes règles** : mot de passe résumé à « ≥ 8 » ; rapprochement de comptes suggéré sur l'égalité de l'e-mail ; soft gate présenté comme défaut grand public ; focus et région live prescrits ensemble ; consentement, CGU et information de confidentialité partiellement confondus. Les six RULES du Flow étaient des condensations éditoriales sans preuve mécanique de fraîcheur.
- **Nouvelles règles** : NIST SP 800-63B-4 (15 caractères en facteur unique, 8 avec MFA, au moins 64 acceptés) ; aucune fusion sans preuve de contrôle ; vérification et activation calibrées au risque ; focus réservé au vrai changement de vue et statut live aux mises à jour sans déplacement ; contrat, information et consentement séparés. Le build extrait désormais les six RULES depuis une source unique et inscrit version + SHA-256 dans chaque sortie.
- **Pourquoi** : l'audit du Flow a trouvé des prescriptions devenues fausses ou dangereuses et une promesse de « compilation » que la chaîne ne garantissait pas. La plus-value du projet dépend d'abord de sa capacité à ne pas transformer une vieille synthèse en règle sûre d'elle-même.

## 2026-07-15 — FLOW : une lecture temporelle et des dépendances visibles

- **Fichiers** : `tools/genere-site.js`, `tools/genere-routeur.js`, `docs/architecture/SITE.md` (v1.11.0), `docs/INSTALLATION.md` (v1.6.0).
- **Ancienne présentation** : la page Flow reprenait la galerie générique des sujets et l'installateur ne savait pas expliquer ce qu'un Flow sélectionné seul entraînait. Son empreinte simulait un sous-bundle alors que le téléchargement restait toujours l'archive complète.
- **Nouvelle présentation** : l'essentiel du Flow montre quatre moments, la machine à états et les bifurcations ; l'installateur calcule la fermeture transitive `creation-compte → form → composants → fondations`, distingue sélection, dépendances automatiques et archive complète ; « onboarding » n'est plus un déclencheur de la création de compte.
- **Pourquoi** : un Flow vaut par l'ordre et les sorties de scène, pas par une collection de cartes. Rendre cette structure visible aide l'auditoire humain à comprendre ce que l'outil détecte sans l'obliger à lire quarante cas.

## 2026-07 (début) — BUTTON-UX : liste plate de variantes → deux axes indépendants

- **Fichier** : components/button/BUTTON-UX.md (v1.0.x)
- **Ancienne règle** : une liste plate de 5 variantes (primary / secondary / destructive / warning / ghost).
- **Nouvelle règle** : deux axes indépendants combinables — emphasis (primary/secondary/ghost) × tone (neutral/destructive/warning).
- **Pourquoi** : la liste plate ne permettait pas d'exprimer un cas pourtant déjà documenté dans le fichier lui-même — un destructive à faible emphase (icône de suppression discrète dans une table). Un tour des systèmes majeurs (Material Design, IBM Carbon, Shopify Polaris, Material UI) a confirmé que tous séparent emphasis et tone.

## 2026-07 (début) — BUTTON-UX : retrait de la règle "le primary mène la lecture"

- **Fichier** : components/button/BUTTON-UX.md
- **Ancienne règle** : le primary devait précéder le secondary dans le sens de lecture, par défaut.
- **Nouvelle règle** : pas de règle universelle d'ordre — deux conventions coexistent selon le type de paire ; la seule règle qui tienne est la cohérence interne au produit.
- **Pourquoi** : la règle initiale avait été généralisée à partir d'un seul cas observé ; un second cas réel l'a contredite. Leçon méthodologique : ne pas généraliser depuis un cas unique.

## 2026-07-03 — BUTTON-UX + FORM-UX : le bouton désactivé n'est plus un mécanisme de validation

- **Fichiers** : components/button/BUTTON-UX.md (§ Dans un formulaire), patterns/form/FORM-UX.md (§ Coordination bouton/champs)
- **Ancienne règle** : "bouton désactivé tant que les champs requis ne sont pas valides" (vivait dans BUTTON-UX.md).
- **Nouvelle règle** : bouton de soumission actif en permanence ; validation au clic, erreurs affichées (inline + résumé), focus déplacé. Désactivation uniquement pendant le traitement asynchrone (anti double-soumission). La règle vit dans FORM-UX.md, qui fait autorité ; BUTTON-UX.md y renvoie.
- **Pourquoi** : un bouton désactivé n'explique pas *pourquoi* il l'est (pas de tooltip sur tactile) et casse la découvrabilité pour un lecteur d'écran. Tendance récente de l'industrie, émergente plutôt qu'unanime — documentée comme telle dans les sources de FORM-UX.md. C'est aussi la duplication qui a fait naître `patterns/` : la règle n'appartenait ni au bouton ni à l'input.

## 2026-07-03 — BUTTON-UX → CARD-UX : la cardinalité des actions en carte change de propriétaire

- **Fichiers** : components/button/BUTTON-UX.md (v1.3.0), components/card/CARD-UX.md (§ Zone d'actions)
- **Ancienne règle** : "un seul bouton d'action principal par carte, actions secondaires en icônes" vivait dans BUTTON-UX.md (§ Dans une carte).
- **Nouvelle règle** : la règle vit dans CARD-UX.md, qui fait autorité sur le nombre et la position des actions ; BUTTON-UX.md garde le *choix* de chaque bouton (emphasis/tone/taille) et la contrainte de zone tactile (propriété du bouton).
- **Pourquoi** : c'est une règle de composition de la carte, pas une propriété du bouton — 2e application du principe de dédoublonnage établi avec FORM-UX.md.

## 2026-07-03 — BUTTON-UI 1.1.0 : mapping emphasis × tone complété (corrections F03/F04 — numérotation d'un premier outillage)

- **Fichier** : components/button/BUTTON-UI.md
- **Ancienne règle** : tokens de tone définis uniquement pour les fonds pleins (`tone.destructive_bg`, `tone.warning_bg`) ; `tone.destructive_text` n'existait pas (déduit implicitement par les outils de rendu).
- **Nouvelle règle** : tout tone se décline en `_bg`/`_text` (fonds pleins) et `_fg` (emphasis sans fond) — les 9 combinaisons résolvent des tokens explicites.
- **Pourquoi** : quatre des neuf combinaisons (secondary/ghost × destructive/warning) étaient rendues identiques au neutral, en contradiction directe avec la table de combinaisons de BUTTON-UX.md ("ghost + destructive : tone qui compense par la couleur"). Un premier passage de test de rendu a rendu le trou visible. Une déduction correcte reste une déduction non documentée — cas vécu : l'outil de rendu déduisait la couleur du texte destructive, juste mais silencieusement.

## 2026-07-03 — BUTTON-UI 1.1.0 : tokens hover ajoutés (correction F08 — numérotation historique)

- **Fichier** : components/button/BUTTON-UI.md, DESIGN.md 1.3.0
- **Ancienne règle** : `states` déclarait hover sans lui donner un seul token.
- **Nouvelle règle** : famille hover complète sur le modèle des state layers — fond assombri d'un cran (emphasis avec fond), remplissage léger apparaissant (emphasis sans fond).
- **Pourquoi** : BUTTON-UX.md fait du hover "le principal signal d'affordance sur desktop" — un état déclaré sans token était une promesse sans implémentation.

## 2026-07 (début) — INPUT-UX : l'indicateur de champ requis, deux corrections successives

- **Fichiers** : components/input/INPUT-UX.md, patterns/form/FORM-UX.md
- **Ancienne règle** : (1) d'abord absent de la première version d'INPUT-UX.md — par oubli, pas par choix ; (2) puis ajouté comme propriété du champ.
- **Nouvelle règle** : l'indicateur existe, mais la *convention* (marquer le requis vs marquer l'optionnel) est une décision de formulaire — FORM-UX.md fait autorité.
- **Pourquoi** : "ce formulaire marque-t-il les champs requis ou optionnels ?" se décide une fois pour tout le formulaire, jamais champ par champ. Qualifiée à l'époque d'« erreur structurelle qu'on a laissée traîner » — l'information vivait au mauvais niveau.

## 2026-07 (début) — INPUT-UX : trous comblés après benchmark

- **Fichier** : components/input/INPUT-UX.md (§ Contenu additionnel du champ, § Accessibilité du message d'erreur)
- **Ancienne règle** : première rédaction sans helper text, compteur de caractères, prefix/suffix, bouton d'effacement, ni la précision "message d'erreur précédé du mot Erreur ou d'une icône".
- **Nouvelle règle** : sections présentes (contenu actuel du fichier).
- **Pourquoi** : trous révélés par le benchmark (Carbon, Material) et l'inventaire de cas d'usage — 11 trous sur 30 cas à la première passe, dont la validation asynchrone (2e occurrence du biais "état transitoire", voir plus bas).

## 2026-07-03 — CARD-UX : le test de transposition invalide les 3 axes du bouton pour la carte

- **Fichier** : components/card/CARD-UX.md (note de transposition)
- **Ancienne hypothèse** : le gabarit générique d'un composant serait "3 axes emphasis/tone/size" (issu du bouton, déjà amendé par l'input qui avait substitué field_type à emphasis).
- **Nouvelle règle** : la carte a 2 axes (interaction_mode / density) + des slots de composition ; emphasis n'a pas de sens en collection (régime du "menu à choix parallèles" généralisé), tone disparaît entièrement (la sémantique appartient au contenu — une "carte d'alerte" est un callout), size se réduit à la densité.
- **Pourquoi** : le nombre et la nature des axes dépendent de ce que le composant *fait*. Hypothèse issue de ce test : **plus un composant est un conteneur, moins il a d'axes propres** (form, cas extrême, n'en a aucun). Trois composants, trois configurations d'axes — la leçon de l'input ("les axes dépendent de la fonction") se confirme et se précise.

## 2026-07-03 — CARD-UX ↔ BUTTON-UX : partage d'autorité tranché

- **Fichiers** : components/card/CARD-UX.md, components/button/BUTTON-UX.md
- **Décision** : cardinalité et position des actions → CARD-UX.md ; choix de chaque bouton et seuil de zone tactile → BUTTON-UX.md / BUTTON-UI.md.
- **Pourquoi** : la carte n'a pas à connaître les tokens du bouton ; le bouton n'a pas à connaître la composition de la carte. (Détail dans l'entrée "cardinalité" ci-dessus — même décision vue des deux côtés.)

## 2026-07-03 — CARD-UX 1.1.0 : trois trous comblés après test de couverture

- **Fichier** : components/card/CARD-UX.md
- **Ancien état** : première rédaction sans loading/skeleton, sans la règle anti hover-only pour les actions de carte, sans le cas "media manquant".
- **Nouvelle règle** : les trois sections existent (contenu actuel).
- **Pourquoi** : test de couverture contre l'inventaire (9 trous sur 41 cas), fait *avant* livraison pour la première fois — ordre conservé depuis. Le trou skeleton est la 3e occurrence du biais "état transitoire" (après le loading du bouton et la validation asynchrone de l'input).

## 2026-07-03 — CARD-UI 1.0.0 : premiers tokens d'ombre et de ratio du système

- **Fichiers** : components/card/CARD-UI.md, DESIGN.md 1.2.0
- **Décision** : `elevation.*` et `media_ratio.*` créés dans DESIGN.md à l'occasion de la carte — aucun composant n'en avait eu besoin avant. `overlay` provisionné pour les futurs composants superposés.
- **Pourquoi** : principe "ajouter un token quand un besoin réel le fait émerger", pas par anticipation systématique.

## 2026-07-04 — CALLOUT : création du composant, deux résultats de transposition inédits

- **Fichiers** : components/callout/CALLOUT-UX.md, CALLOUT-UI.md (v1.0.0 → 1.1.0)
- **Décisions structurantes** :
  - **tone garde 4 valeurs mais `neutral` → `info`** : un composant dont la fonction est de porter du sens ne peut pas être neutre ; sa valeur minimale est le degré zéro de gravité. Convergence des 4 systèmes benchmarkés (Carbon, Polaris, Material, Atlassian).
  - **axe `persistance` (permanent/dismissible)** : premier axe de fin de vie du projet — n'émerge que sur un contenu qui se termine.
  - **frontière de périmètre** : le toast (auto-dismiss, au-dessus du flux) et la modale d'alerte (bloquante) sont d'autres composants — critère : dans le flux vs au-dessus du flux.
  - **nommage `danger`** (vs `destructive` bouton, `error` input) : chaque composant nomme le registre de la famille `color.danger` par ce qu'il signifie pour lui — divergence assumée plutôt qu'un terme unique qui mentirait sur au moins un composant.
- **Pourquoi** : 4e test de transposition — les axes ne se contentent pas d'apparaître/disparaître selon la fonction, ils *changent de nature* en transposant. Trous comblés après test de couverture (8/39) : résolution silencieuse d'un permanent (**4e occurrence du biais "état transitoire"** — désormais un prédicteur : écrire la section "sortie de scène" d'office au prochain composant), mémoire de fermeture, empilement/agrégation.

## 2026-07-04 — FORM ↔ CALLOUT : le résumé d'erreurs rend son conteneur au composant

- **Fichiers** : patterns/form/FORM-UX.md 1.1.0, FORM-UI.md 1.1.0, components/callout/*
- **Ancienne règle** : structure et style du résumé d'erreurs (fond danger-subtle, bordure/texte danger, radius) définis dans FORM-UX.md / FORM-UI.md — le composant callout n'existait pas.
- **Nouvelle règle** : le conteneur (structure, tokens, icône, `role="alert"`) vit dans components/callout/ (tone danger, persistance permanent) ; FORM-UX.md garde l'orchestration propre au formulaire (timing d'apparition, liens d'ancre reprenant les messages exacts, focus) ; FORM-UI.md a rendu ses tokens `error_summary`.
- **Pourquoi** : 3e application du principe de dédoublonnage — appliquée pour la première fois dans l'autre sens : c'est le pattern qui rend une règle au composant. Les valeurs n'ont pas changé, la duplication est résorbée.

## 2026-07-04 — DESIGN 1.4.0 : tokens du callout et recalibrage de success

- **Fichier** : DESIGN.md
- **Ancien état** : pas de `info`/`info-subtle` ni `success-subtle` ; `success` à #16A34A (3.30:1 sur blanc).
- **Nouvelle règle** : `info` #1D4ED8 / `info-subtle` #DBEAFE ajoutés (le tone info ne peut pas emprunter `accent` — guardrail palette de marque ≠ état sémantique) ; `success-subtle` #DCFCE7 ajouté ; `success` recalibré → #15803D (5.02:1 sur blanc, 4.57:1 sur success-subtle).
- **Pourquoi** : le callout est le premier composant où chaque tone doit fonctionner en couple texte/fond subtil — success devenait un token de *texte* et ne tenait pas le seuil 4.5:1 que le système s'impose. Même mouvement que danger/warning en 1.3.0 : famille conservée, luminosité descendue jusqu'au seuil.

## 2026-07-04 — RAPPORT-TEST F01 : le compteur de caractères passe sur text-secondary

- **Fichier** : components/input/INPUT-UI.md 1.3.0
- **Ancienne règle** : `character_counter: color.text-muted` (#9CA3AF — 2.54:1 sur blanc).
- **Nouvelle règle** : `character_counter: color.text-secondary` (7.56:1), aligné sur `helper_text`.
- **Pourquoi** : le compteur est du texte fonctionnel courant (seuil 4.5:1), pas une mention accessoire — premier constat critique du nouvel outil de test.

## 2026-07-04 — RAPPORT-TEST F02 : bordure délimitante vs décorative (décision de principe)

- **Fichiers** : components/input/INPUT-UI.md 1.3.0, DESIGN.md 1.4.1 (guardrail), tools/test-rendu.js
- **Ancienne règle** : bordure neutral de l'input sur `color.border` (1.24:1) ; INPUT-UI.md n'exigeait 3:1 qu'en état error — en conflit latent avec la règle globale de DESIGN.md ("3:1 sur tout état visible") ; la carte outlined avait la même valeur avec un autre statut.
- **Nouvelle règle** : la bordure neutral de l'input passe sur `color.border-strong` (4.83:1). Guardrail ajouté à DESIGN.md : une bordure qui est le *seul signal* identifiant un composant interactif au repos → `border-strong`, 3:1 obligatoire ; une bordure de groupement décoratif (carte outlined) → `border`, exemptée. Critère : "si cette bordure disparaît, l'utilisateur sait-il encore où interagir ?". Le test de rendu applique le critère identiquement à tous les composants.
- **Pourquoi** : option "exception" écartée — un champ de saisie au repos est identifié par sa seule bordure, c'est le cas d'école de WCAG 1.4.11, et c'est exactement le raisonnement qui avait fait recalibrer le bouton secondary en DESIGN 1.3.0. Laisser l'input y échapper aurait été deux poids deux mesures. La subtilité visuelle au repos y perd — assumé : un champ qu'on ne voit pas est un champ qu'on ne remplit pas.

## 2026-07-04 — RAPPORT-TEST F03 : silhouettes d'icônes normatives pour le callout

- **Fichiers** : components/callout/CALLOUT-UI.md 1.1.0, CALLOUT-UX.md 1.1.1
- **Ancienne règle** : une icône par tone, glyphes entièrement laissés à l'identité visuelle.
- **Nouvelle règle** : la *forme* de base est fixée par tone (`icon_shape` : cercle / cercle-coche / triangle / octogone) ; seul le dessin précis reste une décision d'identité.
- **Pourquoi** : warning (#92400E) et danger (#B91C1C) sont chromatiquement proches (distance RGB 55 entre les textes) — pour une déficience rouge-vert, la couleur seule ne les sépare pas. Triangle vs octogone est la distinction standard de l'industrie (signalisation, Carbon, GOV.UK).

## 2026-07-04 — RAPPORT-TEST F04 : le chevron du mode expandable est tokenisé

- **Fichier** : components/card/CARD-UI.md 1.1.0
- **Ancienne règle** : le mode `expandable` n'avait aucun token propre — indiscernable de `static` au repos (le chevron n'existait que dans la prose de CARD-UX.md).
- **Nouvelle règle** : `expand_chevron` (`color.text-secondary`, toujours visible) + `expand_chevron_rotation` (180° à l'état déplié).
- **Pourquoi** : un axe déclaré doit résoudre au moins un token qui le rend discernable — sinon la promesse de l'axe n'est pas implémentable depuis les .md seuls.

## 2026-07-04 — RAPPORT-TEST F05 : la couleur du texte saisi de l'input devient explicite

- **Fichier** : components/input/INPUT-UI.md 1.3.0
- **Ancienne règle** : aucune — la couleur du texte saisi était déduite implicitement (`text-primary` supposé).
- **Nouvelle règle** : `value_text: color.text-primary`.
- **Pourquoi** : même famille de "déduction silencieuse" que `tone.destructive_text` sur le bouton — une déduction correcte reste une déduction non documentée.

## 2026-07-04 — RAPPORT-VALIDATION : résorption des 9 constats structurels

- **Fichiers** : DESIGN.md 1.5.0, BUTTON-UI.md 1.2.0, CARD-UI.md 1.2.0, CALLOUT-UI.md 1.1.2, INPUT-UX.md 1.3.2, tools/*
- **Ancien état** : renvoi périmé vers un rapport disparu dans DESIGN.md ; 8 valeurs brutes dans les *-UI.md (480px ×2, 36px, 4px/8px illustratifs, 1px, #15803D) ; numérotation F04 ambiguë (historique vs tools/RAPPORT-TEST.md) ; "À approfondir" périmé dans INPUT-UX.md (autofill déjà documenté côté UI).
- **Nouvelle règle** : `breakpoint.mobile` (480px) et `scale.desktop-min` (36px) créés dans DESIGN.md et référencés par nom ; mentions de grille reformulées en tokens (spacing.*) ; `1px` promu **exception documentée** au même titre que 44px (épaisseur de hairline, pas une valeur d'échelle — documenté dans CALLOUT-UI.md, admis par valide-dossier.js) ; #15803D remplacé par `color.success` ; la source historique de BUTTON-UI est préfixée "F04 (numérotation historique)" ; le "À approfondir" autofill est retiré.
- **Pourquoi** : premier passage complet de l'outil de validation structurelle — les valeurs brutes se traitent par famille (token d'échelle, exception documentée, ou reformulation) plutôt qu'au cas par cas, pour que la règle survive au prochain constat du même type.

## 2026-07-05 — Typographie : création de la couche foundations/

- **Fichiers** : foundations/typography/TYPOGRAPHY-UX.md + TYPOGRAPHY-UI.md (1.0.0), DESIGN.md 1.6.0, tools/*
- **Décision** : 3e nature de fichier — la typographie n'est ni un composant (pas d'instances à décliner) ni un pattern (pas d'assemblage) : une **fondation**, contrainte transversale consommée par tout le reste. Le modèle à axes ne s'y applique pas ; à la place, deux fonctions strictement séparées : le sens (hiérarchie sémantique) et la lisibilité (taille, mesure, échelle responsive). Pas d'inventaire de cas d'usage (une fondation a des consommateurs, pas des situations). DESIGN.md gagne l'échelle typography.headings (h1-h6 fluides en clamp rem+vw, ratio ≤ 2.5 par échelon), typography.fallback (piles de secours — les polices ne sont pas embarquées) et measure.reading-max. Les outils traitent foundations/ comme patterns/ (résolution de tokens, paires UX/UI) et documentent une limite assumée : les tailles fluides ne sont pas vérifiables statiquement, le test au zoom est manuel.
- **Pourquoi** : des besoins typographiques non tokenisés étaient apparus à l'usage (titres intermédiaires dérivés par calc, letter-spacing local) et l'audit historique de portfolio-landing avait laissé un écart assumé (h1 de hero non sémantique) — la règle "niveau ≠ taille" les tranche désormais. Le point fluid type / zoom 500 % est documenté en confiance "émergent/débattu" (Roselli via Smashing Magazine, nov. 2023) — première règle du système explicitement marquée comme non consensuelle.

## 2026-07-05 — Typographie 1.1.0 : benchmark et inventaire rattrapés (écart de méthode corrigé)

- **Fichiers** : foundations/typography/TYPOGRAPHY-UX.md 1.1.0, inventaires/inventaire-cas-usage-typographie.md
- **Ancienne position (v1.0.0)** : pas de benchmark ni d'inventaire pour une fondation — "une fondation n'a pas de situations, elle a des consommateurs". Relevé comme trop léger à la relecture (à raison).
- **Nouvelle règle** : benchmark et inventaire s'appliquent aux fondations comme aux composants. Le test l'a prouvé : 10 trous sur 33 cas en v1.0.0 — exactement le ratio des composants (8/33, 11/30, 9/41, 8/39). Six comblés en 1.1.0 : interlignage (120-145 %, WCAG 1.4.8 ≥ 1.5 — les tokens 1.1/1.6 encodaient déjà la règle sans la dire), graisse (hiérarchie par combinaison, semibold jamais en texte long, gras parcimonieux), casse (sentence case, caps brèves + 5-12 % d'interlettrage — la valeur locale 8 % devient sourcée), alignement (fer à gauche, jamais justifié), taille minimale (≥ 16px, zoom iOS des inputs), profondeur (4 échelons suffisent — GOV.UK).
- **Pourquoi** : les 6 trous venaient tous des sources standard (GOV.UK, Carbon, Polaris, Butterick, WCAG 1.4.8) — sauter le benchmark s'est payé exactement comme la méthode le prévoyait. Note positive : le prédicteur "état transitoire" a fonctionné en amont pour la première fois (chargement de police couvert dès la v1.0).
- **Complément (liaison aux consommateurs)** : un audit a montré que la fondation était **orpheline** — aucun composant ni pattern ne la référençait ; famille, corps et graisse de leurs textes étaient des déductions silencieuses (le travers exact que le système combat, cf. tone.destructive_text). Corrigé dans les deux sens : blocs `typography` ajoutés à BUTTON-UI 1.2.1 (label), INPUT-UI 1.3.2 (valeur — jamais sous l'équivalent 16 px, zoom iOS), CARD-UI 1.2.1 (titre en `headings.h4` par défaut, niveau libre — "niveau ≠ taille" en application), CALLOUT-UI 1.1.3 (titre en graisse, pas un heading), note d'héritage dans FORM-UI ; et table "Consommation par les composants" dans TYPOGRAPHY-UI 1.1.0.

## 2026-07-06 — DESIGN.md 1.7.0 : tokens ajoutés suite à l'étude d'un DESIGN.md externe (Auralis/Neuform)

- **Fichier** : DESIGN.md (1.6.0 → 1.7.0)
- **Contexte** : étude d'un DESIGN.md externe (« Auralis — Neural Audio Engine », template Neuform)
  pour permettre un style de panneau contrasté type dashboard. Des ajouts, **aucun remplacement**.
- **Recoupements constatés avant d'ajouter** (la moitié du fichier externe existait déjà chez nous) :
  `primary` #4F46E5, `background`, `text-primary`, `text-secondary`, `border` — identiques ;
  leur `accent` #06B6D4 est notre **ancienne** valeur, déjà recalibrée #0891B2 en 1.3.0 pour le
  focus ring (3:1) — l'arbitrage tient, on n'y revient pas ; leur `card-padding` 24px **recoupe
  exactement `spacing.lg`** — pas de second nom pour la même valeur (commentaire ajouté sur
  `lg` pour mémoire) ; leurs `rounded.card/control` 8px = notre `radius.md`.
- **Ajouts réels** :
  - `colors.surface-contrast` #1C1C1E — chez Auralis c'est leur `surface` de repos (système
    sombre) ; chez nous la valeur est importée mais **pas le rôle** : panneau sombre de mise
    en avant uniquement (console/dashboard flottant, panneau central d'étapes), `surface`
    claire inchangée. Nom aligné sur la convention rôle-modificateur existante
    (`surface`, `surface-hover` → `surface-contrast`).
  - `spacing.section` 80px (20 × base) — le `section-padding` externe, sans équivalent
    dans l'échelle (xl = 40px) ; provisionné pour le rythme vertical de pages/gabarits
    consommateurs de la charte.
- **Non retenus** : `display-lg` 64px (notre échelle h1-h6 en clamp() couvre le besoin),
  `secondary` #FFFFFF (doublon de `background`/`on-primary`), leur `surface` en rôle de repos.

---

## 2026-07-06 — DESIGN.md 1.8.0 : typography.label (Inter), l'étiquette d'interface

- **Fichier** : DESIGN.md (1.7.0 → 1.8.0)
- **Décision** : nouveau style `typography.label` (Inter 600, 12px) pour les étiquettes
  d'interface (pastilles, badges, kickers) ; `label-mono` (JetBrains Mono) redevient la
  police des **données** techniques (code, tokens, attributions, niveaux de confiance).
- **Pourquoi** : retour d'usage — le mono en capitales espacées est illisible et déplaisant
  en étiquette. La frontière est désormais nette : Inter pour étiqueter, JetBrains Mono pour
  citer une donnée. Ajout pur : aucune valeur existante modifiée.

---

## 2026-07-11 — Fondations : passe complète sur le socle (7 fondations d'un coup)

- **Fichiers** : foundations/{color,spacing,elevation,border,radius,iconography,motion}/ (14 fichiers, v1.0.0), inventaires/ (7 nouveaux), DESIGN.md 1.9.0→1.11.0, tools/*, dist/*
- **Décision** : compléter la couche foundations/ en une passe, sur le modèle du catalogue Atlassian
  (foundations) **passé au test de transposition** — repris : color, spacing, elevation, border,
  radius, iconography, motion ; fondu : grid (dans spacing, cf. entrée dédiée) ; exclu : logos et
  illustrations (décisions d'identité sans consommateur, frontières tracées dans ICONOGRAPHY-UX).
- **Méthode** : inventaire et benchmark faits **avant** livraison pour les 7 (leçon typographie 1.1.0
  appliquée) ; sources vérifiées sur les pages officielles (Atlassian, Carbon, Polaris, Material,
  GOV.UK, WCAG, NN/g, web.dev). Le ratio de trous chute au fil de la passe (9/31 couleur → 3/28
  motion) — les fondations tardives héritent des leçons payées : prédicteur "état transitoire"
  appliqué d'office, frontières héritées des composants.
- **Constat de méthode nouveau** : sur une fondation, le trou type n'est pas l'état oublié mais le
  **contexte pas encore né** (dark mode, modale, dataviz, RTL) — l'inventaire d'une fondation sert
  autant à rendre visibles les provisions (elevation.overlay, radius.pill) et les dettes (disabled,
  lien) qu'à trouver des trous. Les fichiers marquent systématiquement "non couvert par décision"
  plutôt que de laisser des silences.

## 2026-07-11 — SPACING : le grid n'a pas de fondation propre

- **Fichier** : foundations/spacing/SPACING-UX.md (note de transposition)
- **Hypothèse écartée** : suivre le catalogue Atlassian qui documente spacing et grid séparément.
- **Décision** : pas de fondation grid tant qu'aucun consommateur de colonnes n'existe — la seule
  grille du système (collection de cartes) se définit par un gap (token spacing) et un breakpoint,
  pas par 12 colonnes. Argument de fond : chez Atlassian et Carbon eux-mêmes, la grille *dérive* de
  l'échelle d'espacement (gouttières = valeurs spacing, même mini-unit). Une fondation grid naîtra
  avec le pattern collection/grille (candidat README) et héritera de spacing, pas l'inverse.
- **Pourquoi** : même mécanisme que les axes du bouton non transposés à la carte — copier une
  structure externe par défaut est ce que le test de transposition existe pour empêcher.

## 2026-07-11 — DESIGN 1.9.0 : border.focus-* — le focus ring cesse d'être une déduction silencieuse

- **Fichiers** : DESIGN.md 1.9.0, foundations/border/*, BUTTON-UI/INPUT-UI/CARD-UI (consommateurs)
- **Ancien état** : trois composants déclaraient `focus_ring: color.accent` — la couleur seulement ;
  largeur et écart de l'anneau étaient laissés à chaque implémentation.
- **Nouvelle règle** : ring unifié — `border.focus-width` (2px) + `border.focus-offset` (2px),
  implémenté en outline + offset (jamais border : pas de layout shift, coexistence avec la bordure
  d'état). Épaisseur du trait : toujours 1px constante, l'état change la couleur, jamais l'épaisseur
  — divergence assumée avec Atlassian (selected/focused à 2px), motivée dans BORDER-UX.md.
- **Pourquoi** : même famille que tone.destructive_text et value_text — une déduction correcte reste
  une déduction non documentée. La fondation border est née d'un guardrail (1.4.1/F02) : trajectoire
  inverse de l'élévation (tokens d'abord, doctrine ensuite), notée comme telle.

## 2026-07-11 — DESIGN 1.10.0 : icon.* — tailles et trait, liaison aux consommateurs immédiate

- **Fichiers** : DESIGN.md 1.10.0, foundations/iconography/*, BUTTON-UI 1.3.0, INPUT-UI 1.4.0,
  CARD-UI 1.3.0, CALLOUT-UI 1.2.0
- **Ancien état** : quatre composants rendent des icônes (tones, chevron, actions, clear/prefix) sans
  qu'aucune taille ne soit fixée nulle part — déduction silencieuse à l'échelle du système.
- **Nouvelle règle** : trois crans fermés (`icon.sm/md/lg` : 16/20/24px, appariement Carbon 20↔16)
  + `icon.stroke` (1.5px, décision d'identité fixée dans DESIGN.md comme les polices). SVG inline +
  currentColor, jamais d'icon font. Le dessin des glyphes reste libre (précédent icon_shape) — le
  système ne fournit **pas** de bibliothèque d'icônes, la frontière est documentée.
- **Pourquoi la liaison immédiate** : la typographie avait été livrée orpheline (aucun consommateur
  ne la référençait, corrigé en 1.1.0) — leçon appliquée : les quatre `*-UI.md` consommateurs sont
  reliés dans la même passe, pas après coup.

## 2026-07-11 — DESIGN 1.11.0 : motion.* — un vocabulaire pour des micro-interactions qui existaient déjà

- **Fichiers** : DESIGN.md 1.11.0, foundations/motion/*, les 4 `*-UI.md` composants (mapping)
- **Ancien état** : le hover ("principal signal d'affordance"), la rotation du chevron (180°), la
  disparition du callout et le pulse du skeleton existaient dans les fichiers — sans durée, sans
  courbe, sans règle reduced-motion. Chaque implémentation aurait inventé les siennes.
- **Nouvelle règle** : 3 durées (`fast` 100ms / `base` 200ms / `slow` 300ms — tout sous la borne
  ~400ms), 3 courbes (ease-out entrée / ease-in sortie / ease-in-out sur place), sortie au cran
  inférieur de l'entrée, linéaire réservé au spinner. Registre **productif seulement** (dualité
  Carbon) : pas de mouvement décoratif, rien n'anime au chargement, pas de stagger. Règle cardinale :
  le mouvement confirme, il n'informe jamais seul — condition qui rend `prefers-reduced-motion`
  implémentable sans perte (déplacements coupés, opacité/couleur conservées, skeleton statique).
- **Pourquoi** : 5e occurrence du biais "état transitoire", à l'échelle du système cette fois — la
  fondation qui *est* l'état transitoire manquait. Son trou propre (l'interruption : agir pendant la
  transition) a été écrit d'office, le prédicteur ayant désigné l'endroit exact.

## 2026-07-11 — COLOR : audit — rien ne manque pour les consommateurs actuels, les dettes deviennent visibles

- **Fichiers** : foundations/color/*, DESIGN.md (aucun token couleur ajouté ni modifié)
- **Question posée** : "les couleurs sont partiellement dans DESIGN.md — peut-être il en manque."
- **Réponse d'audit** : les 23 tokens couvrent les 9 combinaisons du bouton, les tones input/callout
  en couples complets, les surfaces de la card et les états hover/focus (résolution test-rendu.js).
  Les manques sont tous des **contextes sans consommateur** : lien dans le texte (2e signalement),
  scrim, ::selection, disabled (dette héritée de BUTTON-UI, conditions de sortie désormais écrites),
  dark mode (position explicite : non couvert par décision, architecture par rôles prête). Aucun
  token provisionné — principe "un token naît d'un besoin réel" maintenu.
- **Apport propre** : la fondation consolide en un lieu les règles éparses (registres étanches
  marque/sémantique/neutres, paires texte/fond garanties, canal redondant 1.4.1) que DESIGN.md
  portait en guardrails courts — DESIGN.md garde valeurs et guardrails, COLOR-UX le raisonnement.

## 2026-07-11 — Outillage : les motifs de tokens suivent les nouveaux groupes

- **Fichiers** : tools/valide-dossier.js, tools/test-rendu.js, tools/genere-tokens.js
- **Décision** : TOKEN_RE des deux vérificateurs et GROUPS du générateur étendus aux groupes
  `border`, `icon`, `motion` — sans quoi les références des nouvelles fondations auraient été
  silencieusement ignorées (ni vérifiées, ni générées en CSS).
- **Pourquoi** : tools/README.md le prévoit — "si un fichier change ses règles de mapping, le script
  doit suivre". Un vérificateur qui ignore un groupe donne la pire des assurances : la fausse.

## 2026-07-11 — Consommation : le système devient installable (INSTALLATION.md + page de téléchargement) ; METHODE § 9 et README alignés

- **Fichiers** : INSTALLATION.md (nouveau), tools/genere-site.js (page installation.html + archive design-system-md.zip), tools/genere-routeur.js (wording portable), dist/CLAUDE.md + dist/AGENTS.md (régénérés), METHODE.md 1.1.0 (§ 9 et « Les deux couches »), README.md
- **Décision** : la distribution devient installable par un tiers. Un guide source `INSTALLATION.md` (trois étapes : déposer, brancher l'agent — Claude Code, Cowork, Cursor, Codex, Copilot —, vérifier par le prompt-test « page de login ») est rendu par une page du site avec une archive de `dist/` construite à la génération (zip « store » sans compression ni dépendance — le choix zéro-dépendance des outils tient). Le routeur ne suppose plus qu'il vit dans `dist/` (« le tokens.yaml placé à côté ») : le même fichier fonctionne dans un projet consommateur, quel que soit le nom du dossier ; l'exception consommateur est explicitée (modifier les **valeurs** de tokens.yaml, jamais ses noms). METHODE.md § 9 et README décrivent désormais le routeur — la dette notée dans l'entrée précédente est soldée.
- **Pourquoi** : le système vendait sa consommation par IA sans offrir de chemin d'adoption. La page rend le produit installable et **vérifiable** (trois comportements attendus au prompt-test : chargement minimal, zéro valeur en dur, arbitrages remontés) sans casser les principes du site : aucun contenu écrit pour lui (la page rend INSTALLATION.md), documentation/ toujours généré, jamais édité à la main.

## 2026-07-11 — Site : accueil refondu, visuels de cas dédiés aux fondations, noms de sujets non traduits

- **Fichiers** : tools/genere-site.js, SITE-CONCEPTION.md 1.6.0, documentation/ (sortie régénérée)
- **Décision** : (1) **Accueil** — hero clair sur toute la largeur de la zone de contenu (la nav reste à part), contenu centré, animation d'entrée en cascade, et un fond three.js discret : nuage de points aux couleurs des tokens avec parallaxe légère. C'est la **première ressource externe du site** (three.min.js via cdnjs, `defer`), assumée et bornée : sans réseau le hero garde son gradient CSS pur, et `prefers-reduced-motion` coupe toutes les animations (entrée et fond) conformément à MOTION-UX. Les CTA du hero appliquent RULES-button : un seul primary (« Installer dans votre projet »), un secondary (« Essayer avec le bouton »), llms.txt reste un lien technique. (2) **Panneaux de cas** — le visuel au cas par cas (mots-clés → mini-wireframe aux tokens résolus) est étendu aux 8 fondations (~65 nouveaux gabarits) ; le visuel de famille ne sert plus que de repli. (3) **Vocabulaire** — les noms de sujets ne sont jamais traduits dans la prose du site et reçoivent une distinction visuelle légère (chip monospace), hors blocs de code.
- **Pourquoi** : hiérarchiser la conversion de l'accueil (installer > essayer > index machine) ; le visuel de famille répété dans le modal mentait sur la spécificité de chaque cas ; et « un alert » n'est pas « une alerte » — le vocabulaire du système doit se voir comme tel. La ressource externe est un compromis explicite et réversible (une vendorisation locale de three.min.js suffirait à revenir au site 100 % autonome).

## 2026-07-11 — INPUT-UX → FORM-UX : la stratégie de timing de validation change de propriétaire

- **Fichiers** : components/input/INPUT-UX.md 1.4.0 (§ Error), patterns/form/FORM-UX.md 2.0.0 (§ Stratégie de validation)
- **Ancienne règle** : INPUT-UX portait le timing en absolu ("valider au blur, ~500 ms pendant la frappe sur les champs à risque") — chaque champ décidait de son timing, le formulaire n'avait pas voix au chapitre.
- **Nouvelle règle** : INPUT-UX garde la *mécanique* du champ (comment une erreur inline s'affiche, se formule, remplace le helper text) et le défaut d'un champ isolé hors formulaire (recherche, édition inline) ; FORM-UX fait autorité sur la *stratégie* du formulaire assemblé — submit-only ou blur-sur-champs-à-risque, choisie par formulaire selon le risque d'erreur de format.
- **Pourquoi** : le benchmark primaire a montré une divergence frontale entre systèmes majeurs — GOV.UK interdit la validation au blur ("attendez la soumission", problèmes documentés pour les utilisateurs qui tapent lentement) quand Carbon la recommande. Une divergence de cette taille ne peut pas être tranchée champ par champ : c'est une décision d'ensemble, comme la convention requis/optionnel l'était déjà (même trajectoire exacte : une propriété apparente du champ qui se révèle être une décision de formulaire). 4e application du principe de dédoublonnage.

## 2026-07-11 — FORM-UX 2.0.0 : le cycle de soumission formalisé — le pattern couvre enfin son état transitoire

- **Fichiers** : patterns/form/FORM-UX.md 2.0.0, FORM-UI.md 1.2.0, inventaires/inventaire-cas-usage-form.md (créé)
- **Ancien état** : form était le seul sujet du système **sans inventaire** (étape 2 de la méthode sautée), et FORM-UX 1.x s'arrêtait à l'échec de validation — tout ce qui se passe entre `submit` et le résultat (submitting, erreur serveur, timeout, retry, succès partiel, conservation des valeurs) n'existait nulle part. La page Form du site affichait "Aucun inventaire disponible" et trois espacements comme seul contenu visuel.
- **Nouvelle règle** : machine à états à 9 états (idle → validating → invalid → correcting → submitting → success / server_error / timeout / retrying / partial_success), avec pour chaque transition : déclencheur, visible, annoncé, focus, état du bouton, sort des valeurs, condition de sortie. Les états ne sont **pas** des variantes visuelles — le pattern reste sans axe ni token d'état propre (FORM-UI le verrouille : un état qui exigerait un token propre est une règle au mauvais niveau). S'y ajoutent : structure/fieldset+legend, convention requis "marquer la minorité" (annonce en tête + required/aria-required — divergence GOV.UK/Carbon/Material documentée, décision interne calibrée sur la proportion), validation croisée (l'erreur appartient au groupe, ancrée au premier champ), titre de page préfixé "Erreur :", conservation des données après tout échec, multi-étapes (retour sans perte, ask-once 3.3.7, récapitulation 3.3.4), validation asynchrone (verdict périmé jeté), champs conditionnels (valeurs masquées mémorisées mais non soumises), groupes répétables (focus après ajout/suppression), autosave (`role="status"`, jamais pendant submitting), table de friction par contexte (recherche → paiement).
- **Pourquoi** : 6e occurrence du biais "état transitoire", à l'échelle d'un pattern entier cette fois — et la confirmation la plus nette du coût de sauter l'inventaire : 47 cas non couverts sur 71 recensés (contre 8-11 partout ailleurs). Le benchmark primaire (GOV.UK error summary/validation/question pages, W3C WAI notifications, WCAG 2.2 guideline 3.3, Carbon forms) a produit deux trous face à des standards établis (titre de page, fieldset/legend) et deux divergences réelles à documenter comme telles au lieu de trancher en absolu (timing de validation, marquage requis). Aucune convention observée n'est présentée comme obligation WCAG : les lignes CONFIANCE distinguent établi / convergence / divergence documentée / non formalisé.

## 2026-07-11 — Distribution : RULES-form devient un socle + 7 extensions conditionnelles ; le routeur apprend le type « extension »

- **Fichiers** : dist/RULES-form.md (socle recompilé), dist/RULES-form-{multi-step,async-validation,conditional-fields,autosave,server-errors,sensitive-data,partial-success}.md (créés), tools/genere-routeur.js, dist/CLAUDE.md + AGENTS.md (régénérés)
- **Ancien état** : RULES-form.md ~1,1 k tokens, fidèle à FORM-UX 1.x donc partiel. Avec FORM-UX 2.0.0, la compilation en un seul fichier aurait pesé plusieurs k tokens chargés pour tout formulaire, y compris un contact de trois champs. Le routeur n'indexait que `RULES-[a-z]+.md` — un fichier à tiret aurait été silencieusement ignoré.
- **Nouvelle règle** : trois options comparées (un RULES exhaustif / sections conditionnelles internes / socle + modules). Retenu, sur arbitrage explicite : **socle + les 7 modules nommés dans la mission**, plutôt qu'un sous-ensemble resserré. Le socle garde tout ce qui concerne *n'importe quel* formulaire : structure, labels, convention requis, stratégie de validation, croisée, résumé, focus, cycle de soumission (cas nominal de chaque état, y compris un aperçu de l'échec serveur et du succès partiel — un contact peut timeouter, ce n'est pas un contexte détectable), conservation des valeurs, frontières. Les 7 extensions détaillent chacune un contexte que le routeur peut reconnaître dans la demande avant de lire quoi que ce soit : `form-multi-step` (étapes/wizard), `form-async-validation` (vérification pendant la saisie), `form-conditional-fields` (champs selon une réponse, groupes répétables), `form-autosave` (brouillon), `form-server-errors` (mapping détaillé des erreurs de champ serveur, contradictions client/serveur, idempotence — au-delà du cas nominal déjà au socle), `form-sensitive-data` (paiement/médical/consentement — récapitulation 3.3.4 détaillée), `form-partial-success` (au-delà du cas nominal). Le routeur gagne le type `extension` et le frontmatter `extension-de` : une extension n'entre dans aucun bundle d'intention, ne se charge que via la colonne « Selon contexte » de son parent, hérite du parent par `requires`, et le validateur de graphe vérifie qu'une extension pointe vers un sujet existant qui n'est pas lui-même une extension.
- **Pourquoi** : l'option "un seul fichier" charge multi-étapes + autosave + paiement pour un formulaire de contact ; l'option "sections conditionnelles" n'économise rien en pratique (un fichier chargé est un fichier lu en entier). Le découpage à 7 modules a été choisi en connaissance du risque signalé à la proposition (`form-server-errors` et `form-partial-success` recoupent en partie le socle, dont le cycle de soumission couvre déjà leur cas nominal) — la frontière retenue est donc : le socle porte le cas nominal de tout le cycle, chaque module porte l'approfondissement du cas qui le concerne. Coûts mesurés par RAPPORT-ROUTEUR.md à la régénération.

## 2026-07-12 — Fondations : ajout de `laws` (lois UX) et `voice` (voix & ton) — le test de transposition donne deux structures différentes

- **Fichiers** : foundations/laws/LAWS-UX.md (créé), foundations/voice/VOICE-UX.md + VOICE-UI.md (créés), inventaires/inventaire-cas-usage-{lois,voix}.md (créés), DESIGN.md 1.13.0 (index `foundations:` étendu, aucune valeur ajoutée).
- **Décision** : deux fondations ajoutées, avec un **résultat de transposition différent pour chacune** (le test appliqué sujet par sujet, jamais copié par défaut) :
  - **laws → UX-only.** Un catalogue de lois n'a ni surface visuelle (hex/px) ni lexique concret : c'est la *couche théorique* que les autres fondations citent déjà (Doherty dans motion, Hick dans l'inflation du primary, Gestalt/proximité dans spacing). Pas de `LAWS-UI.md` — le créer dupliquerait ce qui vit dans les autres `*-UI.md`. Sa « couche concrète » est la **carte d'application** en fin de fichier (loi → règle qui l'implémente). Périmètre « catalogue large » (27 lois, aligné lawsofux.com + sources primaires) ; deux mythes réfutés à leur source (Miller « 7 items », règle des 3 clics).
  - **voice → paire UX/UI.** Le split rôle/valeur de la couleur retombe pile : principes de voix *stables* (voix constante, ton variable, ne jamais blâmer, le mot comme canal fiable) en UX ; lexique + mécaniques *changeants avec la marque* (casse, ponctuation FR, nombres, dates, gabarits) en UI. VOICE-UI n'introduit **aucun token** — il référence `typography.label`, `typography.body`, `measure.reading-max`. Consolide le wording déjà écrit dans BUTTON-UX (§ Wording), INPUT-UX (§ Contenu du message) et ALERT-UX **sans en retirer l'autorité** : le composant garde son libellé, la fondation fournit la mécanique (même modèle que COLOR pour les valeurs).
- **Conséquence outillée à trancher (remontée, non tranchée d'office)** : `valide-dossier.js` vérifie la complétude des paires UX/UI ; une fondation délibérément UX-only (laws) est un cas qu'il ne connaît pas. Deux issues admises : (1) le script exempte les fichiers `type: foundation` déclarant `companion: none` ; (2) exception documentée. À confirmer au moment de recompiler `dist/`. Décision explicite : **ne pas** fabriquer un `LAWS-UI.md` factice pour satisfaire le script — ce serait une valeur sans besoin réel (guardrail COLOR/Occam).
- **Pourquoi** : `laws` rend lisible la théorie derrière les règles existantes (résorbe la « déduction silencieuse » conceptuelle : une règle fondée sur une loi qu'on ne nomme pas) ; `voice` fournit le socle des canaux redondants — quand COLOR/MOTION/ICONOGRAPHY disent « jamais ce canal seul », le canal de repli qu'ils invoquent tous est le mot. Inventaire + benchmark faits **avant** livraison pour les deux (leçon typographie) ; ratios de trous conformes à la série (laws 3/27, voice 6/38). Nouveau constat de méthode : sur `voice`, le prédicteur « état transitoire » s'applique enfin *littéralement* (ton d'attente, de résolution, message qui en remplace un autre) — écrit d'office ; sur `laws`, il ne s'applique pas (aucun état), le trou-type devient « la loi connue mais non reliée ».

## 2026-07-12 — LAWS reclassée « référence humaine » : hors de la couche IA, gardée sur le site

- **Fichiers** : foundations/laws/LAWS-UX.md 1.1.0 (`audience: humans`), dist/RULES-laws.md (supprimé → _to_delete/), tools/genere-site.js (badge « référence humaine » + warning RULES exempté pour `audience: humans`), DESIGN.md (index laws), documentation/ régénéré.
- **Ancienne règle** : laws était compilée comme les autres fondations — un `RULES-laws.md` dans `dist/`, indexé par le routeur (mais dans aucun bundle → seul sujet « orphelin »).
- **Nouvelle règle** : laws est une fondation **de référence humaine** — `audience: humans`, **non compilée vers `dist/`**. Plus de `RULES-laws`, absente du routeur, jamais chargée par une IA au build. Elle reste dans l'atelier et **sur le site** (page complète : cas, illustrations, décisions) pour la revue, la formation et l'argumentation.
- **Pourquoi** : laws ne pose **aucune contrainte que le build consomme** — de son propre aveu, ses 27 cas renvoient tous à une règle qui vit ailleurs (motion, color, spacing, button…). Son statut « orphelin » dans le routeur n'était pas un défaut à corriger mais le **symptôme** qu'elle n'a pas le métier des autres fondations : elle éclaire des décisions pour des humains, elle ne contraint pas une génération. La charger à chaque build alourdissait le contexte IA sans rien contraindre. La distinction `audience` est désormais une nature de fondation à part entière — une fondation « humaine » (théorie, éthique, mythes) vs une fondation « machine » (tokens, règles compilées). voice reste, elle, pleinement compilée (RULES-voice, bundles Formulaire/Feedback/Page de contenu) : elle contraint le wording réel.
- **Portée méthode** : nouveau champ de frontmatter `audience: humans`, reconnu par `genere-site.js` (pas d'avertissement « RULES manquant », badge « référence humaine — non chargée par l'IA » sur la page) et ignoré par `genere-routeur.js` (qui n'indexe que les `dist/RULES-*`). Une fondation sans ce champ reste compilée par défaut.

---

## 2026-07-14 — Site : couche éditoriale nommée (methode-contenu.js non normatif)

- **Fichiers** : SITE-CONCEPTION.md (§ Décision fondatrice), tools/methode-contenu.js (en-tête), documentation/ régénéré.
- **Ancienne règle** : « aucun contenu n'est écrit pour le site » (règle absolue) ; l'en-tête de methode-contenu.js prétendait que ce fichier était « une source de l'atelier, jamais écrite pour le site ».
- **Nouvelle règle** : deux niveaux explicites. (1) Sources normatives — `*-UX.md`, `*-UI.md`, `DESIGN.md`, `DECISIONS.md`, `inventaires/`, rapports — font autorité et sont rendues sans réécriture. (2) Couche éditoriale non normative — `methode-contenu.js`, `blog-articles.js` — qui reformule et relie des faits déjà tracés (champ `trace:`), sans créer de règle de design ni de preuve nouvelle ; en cas de divergence, la source de l'atelier a raison.
- **Pourquoi** : methode-contenu.js reformule de fait DECISIONS.md et METHODE.md pour le site — il contredisait donc la règle absolue. Nier ce statut (« jamais écrite pour le site ») était l'esquive ; le nommer honnêtement lève la contradiction sans introduire de norme non sourcée. Reste interdit : créer une règle ou une preuve pour le site.

## 2026-07-14 — Site : recalibrage des promesses publiques sur les capacités réelles

- **Fichiers** : tools/genere-site.js (pages Process, Vérification, Santé, Thèmes ; hero d'accueil), tools/methode-contenu.js, documentation/ régénéré.
- **Ancienne formulation** : « UX + UI testés à chaque build » ; « les seuils sont testés » ; « la preuve que l'identité se rebrande sans toucher au raisonnement » ; « Markdown structuré, versionné » ; page « Tests ».
- **Nouvelle formulation** : « tokens, combinaisons et contrastes vérifiés » (test-rendu.js ne lit pas les `*-UX.md` et n'est pas lancé par le build) ; « seuils de contraste vérifiés par l'outillage » ; « démonstration de re-thématisation / vérification de la séparation valeurs d'identité ↔ règles communes » (les thèmes ne prouvent pas un rebrand complet sans toucher au raisonnement : PaperFlow hérite de la couche sémantique et échoue encore sur 2 paires de contraste) ; « Markdown structuré, sourcé et journalisé (DECISIONS.md) » ; page renommée « Vérification ».
- **Pourquoi** : le site annonçait des capacités que les scripts n'ont pas (UX jamais testé, rien d'automatique au build) et exposait une contradiction visible — « versionné » en accueil vs « pas de dépôt git » en page Santé (le dossier n'est pas un dépôt git ; aucun `git init` n'a été fait). « Testé » réservé au seul contrôle automatique réel (contrastes). Au passage, ordre de Process revu : le jugement (« Comment je décide ») placé avant le déroulé de production.

## 2026-07-14 — atmosphere.* reclassé : vocabulaire décoratif du site, hors du corpus distribué

- **Fichiers** : DESIGN.md 1.14.0 → 1.15.0 (groupe `atmosphere.*` retiré du frontmatter), documentation/ régénéré.
- **Ancienne règle** : `atmosphere.*` (wash/veil/glow/ring/shadow-tint) déclaré comme fondation « atmospnère » dans DESIGN.md, avec une future fondation `EFFECTS-UX.md` annoncée.
- **Nouvelle règle** : `atmosphere.*` est retiré du frontmatter normatif. Ces intensités d'effets d'ambiance sont un **vocabulaire décoratif propre au chrome du site** : non exportées vers `generated/tokens.css`, `dist/tokens.yaml` ni l'export Figma, et **aucun composant, pattern ou fondation ne les consomme**. La référence à une future fondation `EFFECTS-UX.md` est retirée.
- **Pourquoi** : le groupe était né des effets décoratifs du site et de la démonstration PaperFlow, sans consommateur produit réel ni chaîne d'export — le déclarer « fondation » sur-vendait le corpus distribué et laissait un renvoi cassé (`EFFECTS-UX.md`) que la validation signalait. Il redeviendra une fondation le jour où un composant réel l'exigera, avec une vraie chaîne (CSS, YAML, Figma, validation, test, doc).

## 2026-07-14 — Contrat des niveaux de confiance recalibré

- **Fichiers** : README.md, METHODE.md 1.1.0 → 1.2.0, tools/methode-contenu.js, tools/blog-articles.js, documentation/ régénéré.
- **Ancien discours** : « chaque affirmation non triviale porte un niveau de confiance explicite ».
- **Constat** : faux à la lettre — ~46 lignes CONFIANCE pour ~518 RÈGLE (≈ 9 %). La confiance vit à trois niveaux (ligne inline ciblée, tableau de sources par fiche, clause de mécanisme par défaut) et n'est vérifiée par aucun script.
- **Nouvelle formulation** : les arbitrages structurants, divergents ou fragiles portent une confiance explicite ; le reste hérite du tableau de sources de sa fiche ou d'un raisonnement de mécanisme déclaré ; la couverture règle par règle n'est pas encore outillée.
- **Dette ouverte** : identifiants stables par règle + contrôle mécanique de couverture source/confiance dans `valide-dossier.js`.

## 2026-07-14 — Accessibilité : premier inventaire transversal « modalités et capacités »

- **Fichiers** : inventaires/inventaire-cas-usage-accessibilite.md (créé), METHODE.md 1.2.0 → 1.3.0, README.md.
- **Ancien état** : l'accessibilité était répartie dans les sujets — contrastes et daltonisme (color/iconography), clavier et focus (button/card/form/border), lecteur d'écran et annonces (typography/input/alert/form), troubles vestibulaires (motion), cognition (voice/form/laws). Chaque inventaire la vérifiait localement, mais aucun ne pouvait montrer les canaux absents du corpus entier. La fondation `voice` pouvait en outre être lue à tort comme une couverture de la commande vocale alors qu'elle ne traite que la voix éditoriale.
- **Nouvelle règle de méthode** : deux portées d'inventaire. L'inventaire de sujet reste la checklist d'un propriétaire ; l'inventaire transversal audite une contrainte distribuée, nomme le propriétaire de chaque règle et distingue **couvert / partiel / absent / en attente**. Il n'est ni une fondation `accessibility`, ni une règle consommée par le build : les trous se comblent dans BUTTON, FORM, MOTION ou le futur composant concerné, puis l'audit est recalculé.
- **Constat initial** : quatre noyaux réellement couverts (contraste/redondance visuelle, sémantique/annonces, focus des consommateurs actuels, reduced-motion) ; angles morts structurants sur audio/médias, commande vocale, motricité au-delà des cibles, gestes/drag, modalités concurrentes, flash et tests avec technologies d'assistance réelles.
- **Pourquoi** : une somme de règles accessibles par composant ne prouve pas une couverture des capacités humaines. Le clavier était visible parce que plusieurs composants l'exercent ; le son restait invisible précisément parce qu'aucun consommateur n'en a encore. L'audit transversal rend les deux situations distinguables sans fabriquer prématurément une fondation orpheline.

## 2026-07-14 — Resynchronisation éditoriale/technique : sources, site et outils racontent la même histoire

- **Fichiers** : README.md, METHODE.md → 1.4.0, SITE-CONCEPTION.md 1.6.0 → 1.7.0, DESIGN.md, tools/genere-site.js, tools/blog-articles.js, tools/build.js, tools/README.md, documentation/ régénéré.
- **Rebranding — formulation recalibrée partout** : l'ancien absolu (« DESIGN.md, seul fichier à remplacer » / « un rebranding est un bloc à remplacer ») est remplacé par : DESIGN.md centralise les valeurs visuelles tokenisées ; une re-thématisation de ces valeurs se fait sans toucher aux règles UX, mais un changement d'identité plus large peut demander des décisions d'iconographie, de voix, de composition ou de forme qui dépassent les tokens. Le thème externe PaperFlow reste une démonstration de re-thématisation (2 paires de contraste encore hors seuil), pas la preuve d'un rebranding complet.
- **Honnêteté des verbes** : le hero et le schéma « avant/après » passent de « testé » à « vérifiable/vérifié » ; ce qui est réellement vérifié mécaniquement = structure, existence et résolution des tokens, contrastes déclarés, graphe de routage, liens/ancres/ids du site — jamais le comportement UX/navigateur.
- **Onglets accessibles étendus aux pages sujet** : le motif APG Tabs (rôles ARIA, roving tabindex, flèches/Début/Fin/Entrée/Espace, hash, repli sans-JS) déjà posé sur Process et Vérification est désormais appliqué aussi aux pages sujet, sans casser le rail contextuel (scroll-spy) ni les liens profonds. L'ancre du 1er volet sujet passe de #decider à #essentiel (cohérence libellé/ancre).
- **Build unique** : `tools/build.js` enchaîne tokens → validation → rendu → routeur → site → contrôle liens/ancres/ids, et devient le chemin recommandé (README, METHODE, tools/README). Le contrôle de sortie détecte en plus les identifiants HTML dupliqués et les fichiers locaux (`href`/`src`) manquants — ce n'est pas une validation HTML complète.
- **Prochaine étape** : le pilote externe (usage par une personne ou un agent qui n'a pas participé à la conception), pas un nouveau composant.
- **Pourquoi** : « les preuves techniques, les textes publics et le fonctionnement réel doivent raconter exactement la même histoire » — cette passe supprime les derniers écarts entre ce que le site promet et ce que l'outillage garantit.

## 2026-07-14 — Accessibilité : fondation transversale `accessibility` (UX-only, compilée, socle universel) + règles chez leurs propriétaires

- **Fichiers** : foundations/accessibility/ACCESSIBILITY-UX.md (créé), dist/RULES-accessibility.md (créé), MOTION-UX.md 1.0.0→1.1.0, BORDER-UX.md 1.0.0→1.1.0, BUTTON-UX.md 1.3.2→1.4.0, CARD-UX.md 1.1.2→1.2.0, FORM-UX.md 2.0.0→2.1.0, ALERT-UX.md 1.2.0→1.3.0, INPUT-UX.md 1.4.0→1.5.0, dist/RULES-{motion,border,button,card,form,alert,input}, tools/genere-routeur.js, tools/genere-site.js, DESIGN.md 1.15.0→1.16.0, README.md, METHODE.md 1.4.0→1.5.0, inventaires/inventaire-cas-usage-accessibilite.md.
- **Ancien état** : l'inventaire transversal du 2026-07-14 (entrée précédente) avait cartographié l'accessibilité et refusé de fabriquer une fondation orpheline — les trous devaient se combler chez leur propriétaire. Il laissait cinq trous **P1** (modalités concurrentes, focus complet, pointer/motricité, flash, canaux sensoriels) sans contrat consommable par le build, et signalait un risque de lecture : la fondation VOICE pouvait passer pour une couverture de la commande vocale.
- **Nouvelle règle — architecture hybride** : (1) une fondation `accessibility` **UX-only** (`companion: none`, aucun token, aucune valeur visuelle) pose les **obligations universelles** (clavier ; modalités concurrentes non bloquées ; focus visible/ordonné/non piégé/non masqué ; nom accessible = libellé visible ; jamais un seul canal ; alternative aux gestes complexes et au glisser-déposer ; limites de temps contrôlables ; aucun flash dangereux) et **renvoie aux propriétaires** — elle ne duplique jamais COLOR/BORDER/MOTION/ICONOGRAPHY/VOICE. (2) Chaque règle *propre* est placée chez son vrai propriétaire : **MOTION** (flash 2.3.1), **BORDER** (focus non masqué 2.4.11), **BUTTON** (annulation du pointeur 2.5.2 + haptique jamais indispensable), **CARD** (alternative au glisser-déposer 2.5.7), **FORM** (limites de temps 2.2.1), **ALERT** (signal sonore toujours doublé du texte, 1.4.1), **INPUT** (dictée + label in name 2.5.3). **Aucune section « accessibilité » générique recopiée** dans chaque fichier — seulement la règle qui décrit le comportement propre du sujet.
- **Précédent nouveau** : `companion: none` **sans** `audience: humans`. Contrairement à `laws` (référence humaine, non compilée), `accessibility` **est compilée** vers `dist/RULES-accessibility.md` et **intégrée au socle du routeur** (constante `SOCLE_FONDATIONS` dans genere-routeur.js), donc chargée d'office pour **toute** intention. valide-dossier.js reconnaissait déjà le cas UX-only ; genere-routeur.js a reçu la notion de socle universel (poids mesuré, sujet non-orphelin) ; genere-site.js l'expose comme une fondation à part entière.
- **VOICE recadrée explicitement** : VOICE = voix **éditoriale**, jamais commande **vocale**. L'obligation « service utilisable sans parler / nom adressable à la voix » relève de l'interaction (clavier + nom accessible chez INPUT), pas de VOICE. Écrit noir sur blanc dans ACCESSIBILITY-UX et RULES-accessibility.
- **Chargement minimal préservé, poids mesuré** : le socle passe de « routeur + tokens.yaml » à « + RULES-accessibility » (~1,3 k). Chaque bundle augmente uniformément de ~1,3 k — Formulaire ~25,1 k, Collection ~18,4 k, Page de contenu ~11,4 k, Feedback ~13,7 k (cf. tools/RAPPORT-ROUTEUR.md). `accessibility` a `requires: []` (n'entraîne aucune fondation dans la fermeture) et `selon-contexte: [color, border, motion, iconography, voice]` (renvois, non chargés d'office).
- **En attente (inchangé)** : sous-titres, transcriptions, audiodescriptions, reconnaissance vocale complète — aucun composant audio/vidéo ne les exerce ; position à prendre avant d'en créer un. Dette **P3** : aucun test réel (clavier, lecteur d'écran, dictée, tactile imprécis, zoom/reflow) sur écran assemblé — la couverture est **documentaire, pas éprouvée**.
- **Pourquoi** : une somme de règles par composant ne prouve pas une couverture des capacités, et une section accessibilité recopiée partout diverge dès la première évolution. Un contrat unique chargé partout + un renvoi vers le propriétaire réel : la règle ne vit qu'à un seul endroit, et le build la consomme réellement.

## 2026-07-14 — Stabilisation après audit : trois lots séparés et références WCAG rectifiées

- **Fichiers** : `foundations/accessibility/ACCESSIBILITY-UX.md` 1.0.0→1.0.1, `patterns/form/FORM-UX.md` 2.1.0→2.1.1, inventaires accessibilité/form, `DESIGN.md`, `README.md`, `INSTALLATION.md` 1.3.0→1.4.0, `PLAN-EVOLUTION.md`, `.gitignore`, `.github/workflows/build.yml`, `pousser-vers-github.sh` (supprimé), puis sorties générées.
- **Découpage** : les modifications locales sont désormais relues comme trois lots indépendants — (1) stabilisation documentaire et build, (2) changement produit Accessibilité, (3) industrialisation CI/déterminisme/distribution. Ce découpage n'est ni un commit ni une publication ; il empêche de faire passer une extension d'architecture pour une simple correction éditoriale.
- **WCAG — corrections factuelles** : le critère 2.5.6 est identifié comme **AAA** ; l'ordre de focus doit préserver sens et opérabilité sans reproduire nécessairement l'ordre visuel ; les options et exceptions de 2.2.1 sont explicitées ; la redondance mouvement/son/haptique est assumée comme règle interne renforcée et non attribuée abusivement à 1.4.2 ; le minimum AA 2.5.8 est ajouté, le standard interne de 44px restant plus exigeant.
- **Plan** : le diagnostic antérieur (v1.15.0, 10 fondations, absence de CI et de `SKILL.md`) est conservé comme état initial, mais n'est plus présenté comme l'état courant. Le statut actuel indique v1.16.0, 11 fondations et J1 implémenté localement mais encore inactif à distance.
- **Dépôt** : les `_to_delete/` imbriqués et l'archive d'export restent hors versionnement. Le script ponctuel `pousser-vers-github.sh` est supprimé : il recréait le `.gitignore`, gérait lui-même un jeton et réalisait commit/push dans une seule commande ; le flux standard Git/SSH et une publication volontaire le remplacent. Aucun commit ni push n'est déclenché par cette décision.
- **Sécurité** : le remote local actuel est en SSH et sans identifiant intégré. Cela ne prouve pas la révocation d'un éventuel ancien jeton, qui reste à confirmer côté GitHub.

## 2026-07-14 — Site : les trois cartes deviennent le motif commun de toutes les vues « L’essentiel »

- **Fichiers** : `tools/genere-site.js`, `SITE-CONCEPTION.md` 1.7.0→1.8.0, `documentation/` régénéré.
- **Ancien état** : le motif visuel numéroté en trois cartes (accent primaire, accent et succès) n'existait que dans la vue essentielle de « Pourquoi ce projet ». Les fiches sujet présentaient leurs trois règles fondamentales comme une liste de lignes ; Process et Vérification n'avaient pas cette synthèse visuelle.
- **Nouvelle règle de surface** : toute vue nommée **« L'essentiel »** commence par le manifeste, puis présente trois décisions structurantes avec le même motif de cartes. Le composant de génération est factorisé ; le contenu reste propre à chaque page. Les 16 fiches sujet reprennent leurs trois règles éditoriales existantes, Process synthétise inventaire/contradiction/trace, Vérification structure/rendu/limite.
- **Responsive** : trois colonnes sur grand écran, une colonne sous 900px, sans transformer les cartes en éléments interactifs — ce sont des résumés sémantiques en `<article>`.
- **Pourquoi** : une même promesse de lecture doit produire le même repère visuel. Le lecteur reconnaît immédiatement la synthèse, sans uniformiser le fond ni inventer de nouvelles règles normatives.

## 2026-07-14 — Site : format « Quand / Que faire / Exemple » garanti pour tous les cas d’usage

- **Fichiers** : `tools/genere-site.js`, `tools/build.js`, `SITE-CONCEPTION.md` 1.8.0→1.8.1, `documentation/` régénéré.
- **Constat** : 76 cas d'Accessibilité, un cas de Bordure et un cas d'Espacement reposaient encore sur la colonne brute de leur inventaire. Leur carte n'affichait pas le repère « Quand » et leur modale ne contenait pas systématiquement les trois blocs éditoriaux visibles sur Typographie.
- **Nouvelle règle de surface** : chaque carte contient titre + repère **Quand** + situation + action. Chaque modale contient, dans cet ordre, **Quand utiliser cette règle ?**, **Que faire ?**, **Exemple**, puis les règles liées. Les textes éditorialisés à la main restent prioritaires ; un repli complet et honnête est généré depuis l'inventaire pour tout nouveau cas encore non éditorialisé.
- **Garantie mécanique** : le contrôle final du build compte cartes et modales, exige le repère « Quand » sur chaque carte et les trois titres dans chaque gabarit. Une régression devient bloquante au lieu de rester visuelle et silencieuse.
- **Pourquoi** : le statut de couverture peut varier, mais la qualité de lecture ne doit pas dépendre de l'ancienneté d'une fiche. Accessibilité suit désormais exactement le même contrat que les autres sujets.

## 2026-07-14 — Site : huit illustrations distinctes pour les familles Accessibility

- **Fichiers** : `tools/genere-site.js`, `SITE-CONCEPTION.md` 1.8.1→1.8.2, `documentation/` régénéré.
- **Constat** : les huit familles de l’inventaire Accessibility retombaient sur deux illustrations génériques, « catégories » et « contenu ». Le titre changeait, mais le visuel ne portait pas la capacité auditée.
- **Nouvelle règle de surface** : perception visuelle, navigation clavier, technologies d’assistance, capacités motrices, audition, parole, cognition et mouvement disposent chacune d’un SVG dédié, dessiné avec les tokens du site.
- **Garantie mécanique** : le build compare les SVG des familles Accessibility et échoue si deux sections partagent à nouveau la même illustration.
- **Pourquoi** : cette page est une cartographie transversale des capacités. Répéter une vignette de mise en page effaçait précisément la différence que l’inventaire cherche à rendre visible.

## 2026-07-14 — Accueil : le hero met en avant le raisonnement compilé et l’arbitrage humain

- **Fichiers** : `tools/genere-site.js`, `SITE-CONCEPTION.md` 1.8.2→1.8.3, `documentation/` régénéré.
- **Ancien message** : « une documentation UX/UI que les humains lisent et que les IA consomment », structurée en deux couches par composant, avec Button comme seconde porte d’entrée.
- **Constat** : le projet couvre désormais composants, pattern, fondations et contrat Accessibility UX-only. Sa différence n’est plus la simple lisibilité du Markdown, mais la compilation du raisonnement en contexte ciblé, avec autorité, périmètre et arrêt explicites.
- **Nouveau message** : cas d’usage, règles, tokens et décisions deviennent des règles légères chargées selon l’intention ; l’IA applique ce qui est couvert et rend les absences, contradictions et arbitrages à l’humain. Le CTA secondaire conduit à la méthode, vrai livrable stratégique, plutôt qu’au seul pilote Button.
- **Pourquoi** : le hero doit présenter la capacité actuelle sans conserver les simplifications de la phase pilote ni promettre une conformité intégrale encore non éprouvée par un tiers.

## 2026-07-14 — Dépôt : séparation stricte entre atelier, contenus, documentation, prototypes et sorties

- **Fichiers** : arborescence complète, `README.md`, `docs/architecture/REPOSITORY.md`, `atelier/core/METHODE.md` 1.5.0→1.6.0, `docs/architecture/SITE.md` 1.8.3→1.9.0, outils, workflow CI et sorties régénérées.
- **Ancien état** : sources normatives, plans, prototypes HTML, assets et trois familles de sorties partageaient la racine. `_sync/` dupliquait quinze fichiers — dont deux versions périmées — et deux dossiers `_to_delete/` conservaient des sauvegardes et générateurs obsolètes.
- **Nouvelle structure** : `atelier/` contient toutes les sources de connaissance ; `content/` les assets originaux ; `docs/` l'architecture, l'installation, la roadmap et les archives ; `prototypes/` les explorations hors build ; `dist/` le paquet IA ; `public/` le site généré. Dans `public/`, les pages système, sujets, articles, téléchargements et fichiers machine sont séparés. `tokens.css` rejoint `dist/` et les rapports rejoignent `tools/reports/`.
- **Nettoyage** : `_sync/`, les deux dossiers `_to_delete/` et les fichiers `.DS_Store` sont retirés. Le plan initial est conservé explicitement dans `docs/archive/` au lieu de rivaliser avec la roadmap active.
- **Pourquoi** : la séparation source/sortie existait dans le fonctionnement mais pas dans la topologie. Une racine ambiguë permettait d'éditer la mauvaise copie et rendait la chaîne difficile à expliquer. Le nouveau contrat rend visible l'autorité de chaque zone sans modifier les règles UX/UI.

## 2026-07-14 — Flow « création de compte » : inventaire recalibré en statuts francs + complétion des sections de parcours

- **Fichiers** : atelier/flows/creation-compte/CREATION-COMPTE-UX.md (1.0.0 → 1.1.0), atelier/inventaires/inventaire-cas-usage-creation-compte.md, dist/RULES-creation-compte.md (v1.1.0).
- **Constat** : la première version de l'inventaire marquait ses 10 cas « Couvert » sans exception — incompatible avec l'honnêteté de couverture du projet et avec la fonction même d'un inventaire (rendre les trous visibles). La fiche couvrait la décision (méthode, minimum viable, vérification, atterrissage) mais pas les briques proprement « flow » (temporelles).
- **Décision** : (1) inventaire réécrit avec statuts explicites `Couvert / Partiel / Absent / En attente` + propriétaire (~30 cas), séparant le socle, les cas partagés avec un propriétaire hors DS (serveur, contenu d'e-mail) et les cas `En attente` qui relèvent d'une décision produit / juridique / sécurité (âge minimum, création partielle, suppression après erreur, step-up de fraude, i18n / RTL) — le flow nomme la frontière, ne la tranche pas. (2) Ajout de six sections de parcours à la fiche : préconditions et points d'entrée, machine à états **du parcours** (distincte de la machine de soumission d'un écran, qui appartient à `form`), états transitoires, abandon et réentrée, accessibilité **inter-écrans** (focus au changement d'écran, annonce de progression — WCAG 2.4.3 / 4.1.3), instrumentation (des repères, jamais des règles). (3) RULES synchronisée en versions condensées.
- **Pourquoi** : ces briques temporelles distinguent un flow d'un pattern — c'est le cœur de la valeur de la nature Flow, et c'était la zone la plus mince. Un inventaire honnête est aussi la condition pour que la future confrontation au crawl Mobbin ait du sens.
- **Arbitrages ouverts avant l'audit Mobbin** : slug `creation-compte` (FR) vs `creating-account` (spec initiale) non tranché ; les cas `En attente` restent hors périmètre DS ; les cartes du site n'ont pas été étendues aux nouveaux cas d'inventaire (page existante inchangée). Aucune observation Mobbin anticipée.

## 2026-07-17 — Passe « stress-test » : neuf remontées d'un rebranding double (dont un thème sombre) intégrées

- **Fichiers** : `atelier/core/DESIGN.md` (1.19.0 → 1.20.0, token `radius.lg`), `foundations/color/COLOR-UX.md` (→ 1.1.0) + `COLOR-UI.md` (→ 1.0.1), `radius/RADIUS-UX.md` + `RADIUS-UI.md` (→ 1.1.0), `elevation/ELEVATION-UX.md` + `ELEVATION-UI.md` (→ 1.1.0), `motion/MOTION-UX.md` (→ 1.2.0), `voice/VOICE-UX.md` (→ 1.1.0), `components/card/CARD-UI.md` + `alert/ALERT-UI.md` (→ radius.lg), `tools/genere-tokens.js` (copie de theme-gate.mjs + guardrail), `dist/` régénéré.
- **Origine** : rapport de stress-test du 2026-07-17 — un parcours de création de compte construit puis rebrandé deux fois à partir de maquettes marketing externes (WanderLuxe, Nexus UI), dont un thème sombre. Neuf manques relevés, tous non bloquants ; les chiffres du rapport (contrastes, teinte, voile) revérifiés de zéro avant intégration.
- **Décisions** :
  1. **Règle dérivée dark mode** (haute) : la table des paires suppose implicitement un thème clair. `surface-contrast` doit porter `background` ET `on-primary` à 4.5:1 ; en sombre, cela force `primary` clair (un primary sombre est démontré insatisfiable — aucun neutre représentable ne tient 4.5:1 à la fois avec un quasi-noir et un blanc). Ajoutée en dérivée, pas en préférence.
  2. **Outil de vérif livré** (haute) : le garde-fou « re-vérifier par test-rendu.js » n'était pas exécutable côté consommateur (dist/ ne contient pas tools/). `theme-gate.mjs` (mêmes seuils) est désormais **copié dans dist/ par le build** (son en-tête l'annonçait sans que ce soit fait) ; le garde-fou distingue mainteneur (test-rendu) et consommateur (theme-gate).
  3. **Élévation dépendante du thème** (haute) : `elevation.*` encode une ombre pour fond clair, invisible en sombre — déclaré valeur à re-thématiser, pas constante.
  4. **Cran conteneur `radius.lg` (12px)** (moyenne) : sépare le rayon des conteneurs (card, alert, désormais en `lg`) de celui des contrôles (bouton/input en sm/md). Rend exprimable l'intention « carte 16 / contrôle 8 » d'une source externe.
  5. **Contradiction pill tranchée** (moyenne) : `radius.pill` réservé aux badges/avatars (forme intrinsèquement pilule) ; un contrôle mono-ligne (bouton, input) ne prend jamais pill.
  6. **Contrainte ≠ parti pris** (moyenne) : dans motion et voice, le registre « productif seulement » est marqué comme parti pris d'identité **paramétrable** par un consommateur qui l'assume, distinct des contraintes WCAG non négociables — le système encadre la dérogation au lieu de la forcer.
  7. **Teinte des neutres à luminance constante** (basse) : méthode bénie (OKLCh + recalage de L) — le contraste ne dépendant que de la luminance, teinter à luminance constante ne déplace aucun rapport.
  8. **Méthode de voile sur image** (basse) : le voile est un calcul (échantillonner le pire pixel, calculer l'alpha pour 4.5:1, revérifier à plusieurs formats), pas un réglage à l'œil.
  9. **Slot de marque additionnel refusé** (basse) : les identités multi-teintes décoratives sortent du périmètre — un token naît d'un besoin réel, pas d'une couleur à caser. Le registre marque reste à trois rôles.
- **Pourquoi** : le test a montré que l'architecture par rôles tient un rebranding double sans code conditionnel (surface-contrast s'inverse seule en sombre). Les manques étaient concentrés sur l'outillage et sur des angles morts que seul un thème sombre révèle. Intégrer les dérivées (dark mode, élévation) évite à chaque futur consommateur de les redécouvrir par l'échec.
- **Arbitrages assumés** : `radius.lg` change la courbure rendue des cartes/alertes (8 → 12 px) — décision d'identité tranchée ici, trivialement réversible (valeur du token). Le dark mode reste non implémenté (décision produit non prise) ; seule sa contrainte dérivée est documentée.

## 2026-07-23 — Le relief entre dans la fondation élévation : grammaire posé / creusé / plat (registre d'identité débrayable)

- **Fichiers** : `foundations/elevation/ELEVATION-UX.md` (1.1.0 → 2.0.0) + `ELEVATION-UI.md` (1.1.0 → 2.0.0), `dist/RULES-elevation.md` (condensation mise à jour). DESIGN.md inchangé — aucune valeur nouvelle (dérivations par mélange des tokens de tone) ; `elevation.pressed` noté candidat, non créé.
- **Origine** : direction utilisateur (« on a perdu avec le flat la notion d'objet visuel ») + maquettes Figma Sibyl (nœuds 86:129, 128:136) + journée d'implémentation dans l'atelier DS-UI (2026-07-23) où la grammaire a été éprouvée composant par composant, en clair et en sombre, avant d'être remontée ici. Trajectoire inverse de la méthode habituelle — l'implémentation de référence a précédé la doctrine — assumée et datée.
- **Décisions** :
  1. **Grammaire à trois natures** (haute) : à la création de tout composant, chaque surface est classée **posé** (objet actionnable ou couche flottante : boutons, toast), **creusé** (réceptacle : input) ou **plat** (contenu : alert, texte, statique). Le relief suit la fonction, jamais la décoration — le test des 5 questions d'INTERACTION-UX reste le juge.
  2. **« Le repos est à plat » devient la règle des SURFACES** (haute) : les contrôles (objets) gagnent un relief de repos ; les surfaces (card, panels) ne l'obtiennent qu'au survol cliquable (doctrine 1.x conservée pour elles). C'est la ligne qui empêche la grammaire de dégénérer en skeuomorphisme : si tout est posé, rien n'est pressable.
  3. **Physique commune** (haute) : lumière du haut (liseré dégradé clair en haut → couleur de l'objet en bas, jamais un anneau uniforme) ; survol = soulevé (overlay + fond ÉCLAIRCI — inverse de la convention state-layer du registre plat, la métaphore prime) ; appui = enfoncé (ombre interne + fond assombri + course 0,5 px). En sombre : mêmes directions, enfoncé dérivé vers le noir — jamais via le token de survol qui s'éclaircit en sombre (bug de physique documenté : l'objet monterait à l'appui).
  4. **Statut de frontière : parti pris d'identité, paramétrable** (haute) : le registre Relief est débrayable (réglage de thème dans l'implémentation de référence) ; le registre plat 1.x reste documenté et valide. En audit d'hôte, l'absence de relief n'est jamais une non-conformité.
  5. **Aucun niveau d'ombre ajouté** (moyenne) : le relief compose `none/raised/overlay` avec l'arête (border) et le liseré ; l'ombre interne d'enfoncement est un état, pas un palier.
  6. **Techniques imposées** (moyenne) : liseré = anneau 1 px par pseudo + mask-composite (un box-shadow ne dégrade pas) ; swaps d'ombre instantanés (jamais de box-shadow interpolé, MOTION-UI) ; composants sans bordure structurelle : arête en inset shadow, métrique de crans intacte.
- **Pourquoi** : la perte des signifiants du flat est un coût d'utilisabilité documenté (NN/g : les éléments plats attirent moins l'attention et créent de l'incertitude sur le cliquable) ; la grammaire rend au produit trois natures perceptibles avant lecture (Norman) sans rouvrir la porte à l'ombre décorative — le registre est borné (objets seulement), débrayable, et l'ancienne doctrine reste le socle des surfaces.
- **Arbitrages assumés** : le survol qui ÉCLAIRCIT contredit la convention state-layer du registre plat — divergence de registre, documentée comme telle. Deux dérogations connexes actées le même jour côté DS-UI, à remonter à leurs propriétaires lors d'une prochaine passe : indicateurs partagés de collection animant leur géométrie (MOTION — highlight glissant) et icônes multicolores d'identité dans les chips de card (ICONOGRAPHY — écart à currentColor). Les tests utilisateurs de la promesse (reconnaissance plus rapide des rôles) restent à faire.

## Fil rouge méthodologique (transversal, non daté)

- **Le biais "état transitoire"** : loading (bouton) → validation asynchrone (input) → skeleton (card) → résolution/disparition (callout) → et, à l'échelle du système, la fondation motion elle-même (5e occurrence — le vocabulaire des transitions manquait en entier). La première rédaction documente l'état final, jamais la transition. Depuis le callout : écrire la section "sortie de scène / état d'attente" *avant* le test de couverture — le prédicteur a fonctionné en amont sur typographie (chargement de police), iconographie (spinner) et motion (interruption).
- **Le principe de dédoublonnage** : une règle qui semble dupliquée entre deux fichiers appartient à un pattern (form), à un conteneur (card) ou doit être centralisée dans un composant (callout ← form). 3 applications, dans les deux sens.
- **Ratio de trous stable sur les composants, décroissant sur les fondations** : bouton 8/33, input 11/30, carte 9/41, callout 8/39, typographie 10/33 (benchmark sauté) — puis couleur 9/31, spacing 6/24, elevation 5/21, border 5/23, radius 4/17, iconographie 4/28, motion 3/28 (benchmark et inventaire avant livraison). La première passe laisse des trous quelle que soit la méthode d'entrée ; leur nombre baisse quand les leçons précédentes sont appliquées d'office. Le test de couverture n'est pas optionnel.
- **La déduction silencieuse** (transversal, nommé lors de la passe fondations) : tone.destructive_text (bouton) → value_text (input) → styles de texte des 4 composants (typographie 1.1.0) → focus ring, tailles d'icônes, durées/courbes (fondations 2026-07-11). Une déduction correcte reste une déduction non documentée — le motif revient assez souvent pour être cherché activement à chaque nouveau sujet : "qu'est-ce que l'implémenteur devine ici ?"
