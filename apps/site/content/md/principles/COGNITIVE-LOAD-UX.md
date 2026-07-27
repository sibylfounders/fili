---
component: cognitive-load
layer: ux
type: principle
version: 1.0.0 # 1.0.0 : première rédaction — pendant OPÉRATIONNEL du catalogue laws (qui garde la théorie, audience: humans) ; inventaire transversal et benchmark faits AVANT livraison ; statut de socle universel arbitré le 2026-07-21 (cf. DECISIONS.md) ; UX-only par nature (aucun token)
last_updated: 2026-07-21
companion: none # principe UX-only, sur le modèle d'accessibility : aucune valeur visuelle ni token propre — chaque mécanique vit chez son propriétaire, ce fichier ne porte que l'obligation et le renvoi
confidence: mixed # les fondements (divulgation progressive NN/g, « one thing per page » GOV.UK, heuristiques de Nielsen 3/5/6, défauts NN/g, consentement actif RGPD/CJUE) sont établis ou convergents ; les règles internes renforcées (coût jamais caché, undo = promesse tenue, anti-camouflage) sont des positions du système, identifiées comme telles
---

# Charge cognitive — Couche UX (principe transversal)

> Ce fichier pose les **obligations universelles de charge cognitive** : ce que tout écran, composant, pattern et flow doit respecter pour que l'interface n'impose jamais plus de travail mental que la tâche elle-même. Il est le **pendant opérationnel** de `LAWS-UX.md` : les lois (Sweller, Hick, Tesler, Zeigarnik…) y restent la référence théorique, `audience: humans`, jamais chargée au build — ce principe, lui, est **compilé et consommé** au moment de générer de l'UI. Il ne réécrit aucune loi et aucune mécanique : il contraint, cite, et renvoie. Source du besoin : `atelier/inventaires/inventaire-cas-usage-charge-cognitive.md` (audit transversal du 2026-07-21).

## Note de transposition (à lire en premier)

RÈGLE : la charge cognitive est un **principe transversal** — ni variantes (composant), ni assemblage (pattern), ni token ; le modèle à axes ne s'applique pas. Comme `accessibility` : `companion: none` **sans** `audience: humans` — compilé vers `dist/RULES-cognitive-load.md` et **chargé d'office par le routeur pour toute intention** (socle universel, arbitré le 2026-07-21 ; le coût en tokens du socle est mesuré à chaque build dans RAPPORT-ROUTEUR).

RÈGLE : **frontière avec `laws`** — les lois éclairent, ce principe contraint. `LAWS-UX.md` reste le seul endroit où une loi est énoncée, sourcée et bornée ; chaque règle ici **cite** sa loi sans la réécrire. Si une règle opérationnelle de ce fichier semble contredire la portée d'une loi du catalogue, le catalogue a raison sur la loi, ce fichier a raison sur l'obligation — et l'écart se remonte.

> **Pourquoi ce principe alors que le catalogue existe** : `LAWS-UX.md` déclare lui-même Cognitive Load « principe implicite de tout le système » et signalait des trous opérationnels (anti-camouflage « candidate à passer de frontière à RÈGLE »). Implicite = invisible au build : avant ce fichier, aucune règle chargée ne contraignait le nombre de décisions d'un écran, la divulgation, les défauts ou la réversibilité *en tant qu'obligations transversales*. Elles existaient en pièces détachées chez les propriétaires ; ce fichier les élève en contrat unique, comme l'a fait `accessibility` pour ses obligations.

RÈGLE : ce principe **ne fait pas autorité sur un comportement précis** — il pose l'obligation, le propriétaire pose la mécanique (`FORM` pour le multi-step, `BUTTON` pour le destructive, `INPUT` pour les défauts de saisie…). En cas de divergence, le propriétaire a raison. Même clause qu'`accessibility` : pas une source normative de substitution.

RÈGLE : ce principe **ne quantifie aucun plafond**. Aucune règle ne dira « maximum N choix » — le plafond numérique est le mythe que `LAWS-UX.md` réfute (Miller « 7 items », règle des 3 clics). La contrainte porte sur la **structure** (hiérarchie, divulgation, défauts), jamais sur un nombre magique.

## Le contrat — obligations universelles

### 1. Budget de décision — une intention principale par moment

RÈGLE : tout écran ou toute vue déclare **une décision principale**, et une seule. Tout le reste — choix secondaires, réglages, chemins alternatifs — lui est subordonné visuellement et structurellement. Le système l'applique déjà localement (primary unique de `BUTTON`, une décision par étape du `FORM` multi-step) ; l'obligation devient ici celle de **l'écran assemblé**, pas seulement du composant.

RÈGLE : le nombre de choix simultanés se justifie par le besoin de la décision présente, jamais par l'espace disponible. Un conteneur large peut révéler du contenu secondaire (cf. `adaptive`, divulgation par l'espace) — il n'autorise pas des décisions nouvelles.

> **Pourquoi** : Hick — le temps de décision croît avec le nombre *et* la complexité des options (cf. LAWS § 2) ; « one thing per page » du GOV.UK Service Manual — « commencer par découper le formulaire en pages ne contenant qu'une seule chose », avec sa nuance d'origine : c'est la recherche utilisateur qui dit quand regrouper (usage interne intensif, allers-retours rapides entre tâches).

CONFIANCE : convergence — « one thing per page » est documenté par un système majeur et largement observé ; le découpage exact d'un parcours en « moments » reste un arbitrage par cas (voir Tensions : un émiettement mécanique déplace la complexité au lieu de la réduire — GOV.UK lui-même regroupe quand la recherche le justifie).

### 2. Divulgation progressive — l'essentiel d'abord, le détail sur demande

RÈGLE : par défaut, une interface montre ce qui est nécessaire à la décision présente ; l'avancé, le rare et le détail se révèlent **sur demande explicite**. La cause est ici la complexité — distincte de la divulgation par l'espace, qui appartient à `adaptive` et répond à la largeur du conteneur.

RÈGLE INTERNE RENFORCÉE (frontière dure) : la divulgation **ne cache jamais** l'information nécessaire pour décider — un coût, un engagement, une obligation, un risque **se voient avant** l'action qui engage. C'est l'extension transversale du « ne révèle pas tardivement une information nécessaire » d'`adaptive`, et la ligne qui sépare la divulgation progressive de la dissimulation.

RÈGLE : réduire n'est pas enfouir — une fonction essentielle reste découvrable sans connaissance préalable. La tension Hick ↔ découvrabilité (cf. LAWS) ne se tranche pas par principe : au doute, remonter.

CONFIANCE : établi — progressive disclosure documentée (NN/g). La frontière « jamais un coût caché » est une **règle interne renforcée** à portée éthique, convergente avec le corpus deceptive patterns (Brignull).

### 3. Défauts intelligents — le système propose, l'utilisateur dispose

RÈGLE : tout choix qui admet une réponse majoritaire sensée porte un **défaut** ; l'utilisateur corrige un défaut plutôt qu'il ne construit une réponse à vide. C'est la forme la plus directe d'absorption de complexité par le système (Tesler, cf. LAWS § 2) — et la plus puissante : la plupart des utilisateurs ne changent jamais un défaut (NN/g), ce qui en fait une responsabilité autant qu'un levier.

RÈGLE INTERNE RENFORCÉE (frontière dure) : un défaut **n'engage jamais à l'insu** — jamais de consentement, d'achat, d'abonnement ou de partage pré-coché. Le consentement est **actif** ; sa mécanique appartient à `FORM-sensitive-data` et au flow `creation-compte-consentement`, qui font autorité.

RÈGLE : un défaut se distingue toujours d'une valeur saisie — l'utilisateur sait ce qu'il a choisi et ce qui a été choisi pour lui. La mécanique (placeholder ≠ valeur, pré-remplissage annoncé) appartient à `INPUT`.

CONFIANCE : établi pour l'effet des défauts (NN/g, « The Power of Defaults » : les utilisateurs gardent massivement les valeurs proposées) ; établi **normativement** pour la frontière du consentement (RGPD ; CJUE C-673/17 « Planet49 » : la case pré-cochée n'est pas un consentement).

### 4. Réversibilité — annuler vaut mieux que confirmer

RÈGLE : une action **réversible** s'exécute immédiatement, avec un chemin d'annulation visible et un délai raisonnable. La **confirmation bloquante** est réservée à l'irréversible et au coûteux-à-défaire — la banaliser en détruit la valeur (fatigue de confirmation : cliquer « oui » devient un réflexe, et le garde-fou ne protège plus l'irréversible).

RÈGLE : l'irréversible **se déclare avant** l'exécution : ce que l'action détruit, sa portée, l'absence de retour. La mécanique destructive (styles, garde-fous, friction proportionnelle) appartient à `BUTTON` ; le cas DeleteButton reste OUVERT au journal et n'est pas tranché ici.

RÈGLE : **quitter n'est pas perdre** — une saisie en cours survit à la navigation, à l'interruption et à l'expiration quand c'est techniquement possible (propriétaires : `FORM` autosave ; `accessibility` pour les limites de temps).

RÈGLE INTERNE RENFORCÉE (frontière dure) : un « Annuler » affiché est une **promesse tenue** — si l'annulation n'est pas techniquement garantie, ne pas l'afficher ; une confirmation honnête vaut mieux qu'un undo fictif.

> **Pourquoi** : « User control and freedom » (Nielsen, heuristique n°3) — l'utilisateur a besoin d'une sortie de secours clairement signalée ; l'undo encourage l'exploration là où la confirmation punit l'essai.

CONFIANCE : établi pour l'heuristique et le pattern (undo largement observé en production : messageries, corbeilles) ; la répartition undo / confirmation par cas d'usage reste à éprouver composant par composant — premier terrain concret : le `TOAST` porteur d'une action d'annulation.

### 5. Reconnaissance plutôt que rappel — la mémoire est au système

RÈGLE : ne jamais exiger de retenir une information d'un écran à l'autre — le contexte nécessaire est **re-présenté là où la décision se prend**. Mécaniques propriétaires déjà en place : ask-once et récapitulation (`FORM` multi-step), helper persistant plutôt qu'aide qui disparaît (`INPUT`).

RÈGLE : l'interface **montre l'état** plutôt qu'elle ne le fait mémoriser — où j'en suis, ce qui est fait, ce qui reste (progression du `FORM` multi-step, statut d'autosave).

CONFIANCE : établi — « Recognition rather than recall » (Nielsen, heuristique n°6) ; Working Memory (cf. LAWS § 1). Cette section n'ajoute aucune mécanique : elle élève en obligation universelle ce que `FORM` et `INPUT` possèdent déjà.

### 6. Anti-camouflage — le critique ne ressemble jamais au décor

RÈGLE : une information critique (erreur, coût, sécurité, obligation légale) ne prend **jamais** la forme d'un élément décoratif ou promotionnel — ce qui ressemble à de la publicité est filtré avant lecture (banner blindness, cf. LAWS § Selective Attention). Ce fichier **promeut en RÈGLE** le trou que `LAWS-UX.md` signalait comme « candidate » dans son À approfondir. La forme du message reste chez ses propriétaires (`ALERT` pour les tones, `VOICE` pour le mot) ; l'interdit du déguisement est l'obligation transversale posée ici.

CONFIANCE : convergence — la banner blindness est documentée (NN/g) ; la formulation opérationnelle est une formalisation interne, première rédaction.

## Ce que ce principe ne fait pas

RÈGLE : il ne possède **aucune mécanique** (table de renvois ci-dessous), ne fixe **aucun nombre**, et ne tranche **aucune tension** — il les rend visibles et l'arbitrage remonte, à la vitesse calibrée par les lignes CONFIANCE.

## Renvois vers les propriétaires (aucune valeur ici)

| Obligation | Propriétaire normatif |
|---|---|
| Primary unique, hiérarchie des actions, mécanique destructive | `RULES-button` (DeleteButton : OUVERT au journal) |
| Une décision par étape, ask-once, récapitulation, progression | `RULES-form` + `RULES-form-multi-step` |
| Survie de la saisie (autosave, interruption) | `RULES-form-autosave` |
| Consentement actif, données sensibles | `RULES-form-sensitive-data`, `RULES-creation-compte-consentement` |
| Défaut ≠ valeur saisie, helper persistant, diagnostic d'erreur | `RULES-input` |
| Divulgation par l'espace (compact → expanded) | `RULES-adaptive` |
| Rareté et hiérarchie des interruptions ; toast porteur d'une annulation | `RULES-alert`, `RULES-toast` |
| Sobriété du mouvement (l'attention est un budget) | `RULES-motion` |
| Mots simples, une idée par phrase, ton des moments critiques | `RULES-voice` |
| Limites de temps contrôlables | `RULES-accessibility` |

## Tensions connues (à rendre visibles, jamais à trancher seul)

| Tension | Les deux forces | Arbitrage |
|---|---|---|
| Réduire ↔ découvrir | Hick pousse à montrer moins ; une fonction enfouie n'existe plus | Par cas — remonter |
| Une décision par moment ↔ Tesler | Émietter un parcours n'élimine pas sa complexité, il la déplace | Un écran par décision, pas un écran par champ — GOV.UK regroupe quand la recherche le justifie |
| Défauts ↔ contrôle | Le défaut allège ; le défaut invisible déresponsabilise | Défaut visible, distinct, corrigeable |
| Undo ↔ friction protectrice | Une confirmation retirée exige un undo réellement tenu | Jamais les deux absents sur une action à conséquence |
| Divulgation ↔ transparence | Cacher le détail allège ; cacher le coût trompe | Frontière dure du § 2 — non négociable |

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Divulgation retournée en dissimulation (coût, engagement caché) | Dark pattern — confiance détruite, enjeu légal | Élevée |
| Défaut pré-coché d'engagement | Consentement invalide (RGPD), enjeu légal direct | Élevée |
| « Annuler » affiché mais non garanti techniquement | Perte réelle + promesse trahie — pire qu'une confirmation | Élevée |
| « Une décision par écran » appliqué mécaniquement | Parcours émietté, complexité déplacée (Tesler ignoré) | Moyenne à élevée |
| Plafond numérique inventé pour trancher (« max 7 ») | Décision justifiée par un mythe réfuté au catalogue | Moyenne |
| Confirmation banalisée sur le réversible | Fatigue de confirmation — le garde-fou ne protège plus l'irréversible | Moyenne |

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Charge extrinsèque = gaspillage ; le système absorbe la complexité | Sweller (cognitive load theory) ; Tesler — via `LAWS-UX.md` (le catalogue fait autorité sur les lois) | Établi (théorie) ; transposition UI par convergence |
| Divulgation progressive : l'essentiel d'abord, le détail sur demande | [NN/g — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) | Établi |
| Une décision principale par page/moment — et regrouper quand la recherche le justifie | [GOV.UK Service Manual — Structuring forms](https://www.gov.uk/service-manual/design/form-structure) (« splitting the form across multiple pages with each page containing just one thing ») | Convergence — pattern documenté d'un système majeur, nuance d'origine incluse |
| User control and freedom (sortie de secours, undo) ; error prevention ; recognition rather than recall | [NN/g — 10 Usability Heuristics (n°3, 5, 6)](https://www.nngroup.com/articles/ten-usability-heuristics/) | Établi comme heuristiques de référence — pas des lois quantifiées |
| Les utilisateurs changent rarement les valeurs par défaut | [NN/g — The Power of Defaults](https://www.nngroup.com/articles/the-power-of-defaults/) | Établi (observation robuste) |
| La case pré-cochée n'est pas un consentement | RGPD art. 4(11) et 7 ; CJUE C-673/17 (Planet49, 2019) | Établi — normatif |
| Frontières éthiques (dissimulation, pré-cochage, pression) | [Deceptive Patterns — Brignull](https://www.deceptive.design/) | Établi comme catalogue de référence |
| Banner blindness / attention sélective | [NN/g — Banner Blindness](https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/) ; via `LAWS-UX.md` | Établi (observation robuste) |

CONFIANCE : les fondements de chaque section sont établis ou convergents et cités depuis leur propriétaire théorique (`LAWS-UX.md`) ou leur source primaire ; aucune règle de ce fichier n'introduit de mécanique nouvelle. Les **règles internes renforcées** (coût jamais caché, jamais d'engagement pré-coché, undo = promesse tenue, anti-camouflage) sont identifiées comme telles. Toute obligation qui semble entrer en conflit avec une règle propriétaire : le propriétaire tranche — STOP, remonter si l'ambiguïté persiste.

## À approfondir

- **Undo / confirmation par cas** : la répartition précise se documentera composant par composant — premier terrain : le `TOAST` porteur d'une action d'annulation ; le futur composant superposé (modale) héritera de la règle « confirmation réservée à l'irréversible ».
- **Défaut d'une collection** (tri, filtre, densité par défaut) : besoin réel repéré à l'inventaire, sans propriétaire désigné — `CARD` est candidate le jour où une collection réelle l'exige ; position à prendre avant, ne pas improviser.
- **Anti-camouflage** : à re-tester le jour d'un premier composant de contenu marketing (bannière, promo) — la règle est posée, son épreuve du réel reste à venir.
- **Coût du socle** : le poids du quatrième RULES universel est mesuré à chaque build (RAPPORT-ROUTEUR) ; si le socle enfle au fil des principes, l'arbitrage socle/bundle se rouvre avec les chiffres.
