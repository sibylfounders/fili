# Process

> La méthode, en quatre volets — l'essentiel, les décisions, le pipeline, les instruments.

## L’essentiel

**La méthode**

Comment une demande devient-elle une UI conforme ?

Le raisonnement, pas seulement l’artefact — dix étapes, dix décisions et sept instruments, de la demande à la génération par une IA.

Une demande entre, un inventaire cadre la couverture, une paire UX/UI sourcée est rédigée puis éprouvée (benchmark, couverture, scripts), les décisions sont journalisées, et le tout est compilé en règles légères qu'une IA peut consommer pour générer de l'UI conforme — ou pour auditer une interface existante en l'y confrontant — en remontant les arbitrages qu'elle n'a pas le droit de trancher.

**01 / INVENTAIRE**

#### Cartographier avant de décider

Les cas d’usage révèlent les situations que la première intuition oublie.

**02 / CONTRADICTION**

#### Éprouver chaque règle

Une règle est confrontée aux autres sujets, aux standards et aux cas limites avant de devenir normative.

**03 / TRACE**

#### Journaliser ce qui change

Chaque révision garde l’ancienne règle, la nouvelle et la raison de l’arbitrage.

**10**étapes du pipeline

**7**instruments de pensée

**89**décisions journalisées

Quatre volets composent cette page : **l’essentiel** (cette vue d’ensemble), **décider** (dix décisions et le raisonnement dessous), **le pipeline** (le déroulé en dix étapes) et **le lexique** (les instruments de pensée, nommés).

## Décider

**02 · Le jugement**

### Comment je décide

Dix décisions : le réflexe qu’on aurait eu, la vérification qui l’a attrapé, le principe qui en reste.

01 · Formulaire · accessibilité**Le bouton d'envoi désactivé**

« Un contrôle ne doit jamais cacher la raison de son propre blocage. »

Voir le raisonnement02 · Nommage · sémantique**La fausse cohérence des noms**

« Une cohérence qui trahit le sens n'en est pas une — c'est un mensonge bien rangé. »

Voir le raisonnement03 · Contraste · intégrité**L'exception que je me suis refusée**

« Une règle que je m'impose ne souffre pas d'exception esthétique — sinon ce n'est pas une règle, c'est une préférence. »

Voir le raisonnement04 · Couleur · rigueur**Recalibrer contre sa propre marque**

« Aucune valeur sacrée n'échappe à sa propre règle. »

Voir le raisonnement05 · Méthode · humilité**La règle bâtie sur un seul cas**

« Une occurrence n'est pas un motif — un seul cas ne fait pas une règle universelle. »

Voir le raisonnement06 · Rigueur · dette cachée**La déduction silencieuse**

« Ce qui marche par déduction juste est une dette, pas une solution. »

Voir le raisonnement07 · Méthode · l'instrument**Le test de transposition**

« La structure d'un composant se déduit de ce qu'il fait, pas de ce qui l'a précédé. »

Voir le raisonnement08 · Systèmes · lecture d'indice**Le sujet « orphelin »**

« Une anomalie est parfois une information sur la nature de l'objet, pas une erreur à réparer. »

Voir le raisonnement09 · Systèmes · coût**Un socle plutôt qu'un gros bloc**

« Le coût d'un système se paie à la lecture — ne fais charger que ce que la situation réclame. »

Voir le raisonnement10 · Occam · avant d'ajouter**La moitié existait déjà**

« Avant d'ajouter, vérifie ce qui existe déjà — deux noms pour la même valeur, c'est une dette, pas une richesse. »

Voir le raisonnement

## Pipeline

**03 · Le déroulé**

### Le pipeline

De la demande à la consommation par une IA, en dix étapes.

**Étape 1 / 10**

#### La demande et le cadrage

Tout part d'une demande : *« documente le sujet X »*. Deux décisions avant d'écrire quoi que ce soit :

Le détail de cette étape

- **La nature du sujet** : *fondation* (matière ou vocabulaire de construction — couleur, typographie), *langage* (canal d'expression — interaction, mouvement, voix, émotion), *principe* (obligation ou raisonnement transversal — accessibilité, adaptation, lois), *composant* (variantes visuelles propres — bouton, input, card, alert), *pattern* (composition de plusieurs composants sur un écran — form) ou *flow* (séquence de patterns ou d'écrans vers un but — création de compte).

- **Le test de transposition** : vérifier que le modèle d'axes (style / tone / size…) s'applique réellement au sujet, plutôt que de le copier par défaut. C'est ce test qui a donné 2 axes seulement à la carte, un axe inédit (persistance) à l'alert, et aucun axe au form.

Le périmètre se trace aussi en négatif : ce que le composant **n'est pas** (le toast exclu de l'alert par la frontière « dans le flux vs au-dessus du flux »).

**Étape 2 / 10**

#### L'inventaire des cas d'usage

Avant la rédaction, construire `atelier/inventaires/inventaire-cas-usage-x` (fichier .md) : la carte de tous les contextes où le composant apparaît. C'est un **outil de vérification** (checklist de couverture pour l'étape 6), pas du contenu à lire.

Le détail de cette étape

Règle apprise — biais confirmé 4 fois, désormais un prédicteur : **l'état transitoire** (loading, validation asynchrone, skeleton, disparition/résolution) est systématiquement le trou de la première rédaction. La section « sortie de scène / état d'attente » s'écrit donc d'office, avant le test de couverture.

Leçon typographie (v1.1.0) : cette étape s'applique **aussi aux fondations** — l'avoir sautée avait laissé 10 trous sur 33 cas.

Deux portées d'inventaire coexistent désormais :

- **inventaire de sujet** — vérifie un composant, pattern, flow ou fondation contre ses contextes ; chaque trou revient à ce sujet ou à un propriétaire nommé ;

- **inventaire transversal** — audite une contrainte qui traverse plusieurs propriétaires (premier cas : `inventaire-cas-usage-accessibilite.md`). Il cartographie les règles réparties, distingue couvert / partiel / absent / en attente, et **ne devient pas une source normative de substitution**. Un trou se comble dans le composant, pattern ou fondation qui en est propriétaire, puis le statut transversal est recalculé.

**Étape 3 / 10**

#### La rédaction UX/UI — paire ou exception déclarée

Un sujet visuel se documente en **2 fichiers** :

Le détail de cette étape

- **`X-UX`** (fichier .md) — le raisonnement : les axes, les règles, les frontières, les cas limites. Une re-thématisation (valeurs de tokens) ne le fait pas bouger ; un rebranding complet (voix, iconographie, formes, composition, partis pris d'identité) peut en revanche faire évoluer certaines de ses règles.

- **`X-UI`** (fichier .md) — les tokens visuels : référence toujours `DESIGN.md` **par nom de token**, jamais de valeur brute (hex, px) — sauf standard externe non négociable (ex. zone tactile 44px WCAG).

Si un token manque, il s'ajoute d'abord à `DESIGN.md` avec montée de version (la carte a introduit `elevation.*` et `media_ratio.*` ; l'alert, `info`/`info-subtle` et `success-subtle`).

Les exceptions UX-only sont déclarées par `companion: none` : les principes de référence ou transversaux sans traduction visuelle propre (`accessibility`, `cognitive-load`, `laws`, `performance`) et le flow qui orchestre des écrans sans posséder de pixels (`creation-compte`). Le validateur les reconnaît par leur nature (`companion: none` + type principle/language/foundation/flow), sans compte figé. L'exception décrit une différence de nature ; elle ne permet pas d'oublier un fichier UI nécessaire.

**Étape 4 / 10**

#### Le sourçage

Les affirmations non triviales sont **sourcées** ; les arbitrages débattus, divergents ou fragiles portent en plus un **niveau de confiance explicite** : *établi > convergence > cas isolé > non formalisé*. Chaque fiche se clôt sur son tableau de sources, avec une clause par défaut pour les règles de simple mécanisme — la couverture règle par règle n'est pas encore vérifiée mécaniquement.

Le détail de cette étape

Les points réellement débattus sont marqués comme tels (ex. fluid type et WCAG 1.4.4 à zoom extrême — « émergent/débattu »).

Ce sourçage n'est pas décoratif : c'est lui qui indique à l'IA consommatrice (étape 9) quand trancher seule et quand remonter la question.

Depuis le pivot du 2026-07-21 (DS-MD = couche d'intelligence au-dessus d'un design system hôte), le sourçage porte une seconde dimension : le **statut de frontière**, dans la continuité de la distinction « contrainte ≠ parti pris » née du stress-test du 2026-07-17. Trois statuts : la **propriété universelle** (contrainte — WCAG, standards, mécanismes établis) fonde seule une non-conformité en audit d'une interface tierce ; le **parti pris d'identité** (registres productifs de motion/voice, « jamais de disabled comme validation ») est paramétrable et se lit en audit comme une *divergence de registre* à signaler à part, jamais comme un défaut ; l'**implémentation de référence** (tokens, valeurs et variantes des fichiers `*-UI.md` et de `DESIGN.md`) n'est jamais un critère d'audit d'hôte. Le statut s'annote progressivement, tiré par l'usage des audits — pas par une passe de réécriture.

**Étape 5 / 10**

#### Le benchmark externe

Confronter la fiche à la littérature, aux standards et aux systèmes de design majeurs (Carbon, Polaris, Material, GOV.UK, Atlassian…) pour repérer ce que la première rédaction a manqué. Pour un flow, cette passe précède la confrontation à un corpus d'interfaces réelles : la littérature formule les règles ; le réel éprouve leur pouvoir de détection.

Le détail de cette étape

Complémentaire à l'inventaire, elle ne le remplace pas.

**Étape 6 / 10**

#### Le test de couverture

Vérifier la fiche **contre l'inventaire** de l'étape 2 : chaque cas d'usage est-il couvert par une règle ? Identifier les trous, combler les prioritaires (l'ordre de grandeur constaté : ~3 trous prioritaires par composant).

Le détail de cette étape

Tester avant livraison, pas après.

**Étape 7 / 10**

#### La vérification outillée

Deux scripts Node sans dépendance — lancés depuis la racine, isolément pour le diagnostic ou enchaînés par le build complet (`node tools/build.js`, chemin recommandé, qui ajoute en fin de course un contrôle des liens et ancres du site généré) :

Le détail de cette étape

- **`tools/valide-dossier.js`** — la structure : tokens référencés existants dans `DESIGN.md`, renvois croisés valides, pas de valeur brute non justifiée, paires UX/UI complètes, versions incrémentées. → `RAPPORT-VALIDATION.md`.

- **`tools/test-rendu.js`** — le rendu : résolution des tokens, combinaisons d'axes indiscernables, contrastes WCAG (3:1 état visible, 4.5:1 texte courant). → `RAPPORT-TEST.md`.

Les seuils du système ne sont pas déclaratifs, ils sont **testés** : tout recalibrage de couleur se re-vérifie par `test-rendu.js`. À relancer après toute modification de `DESIGN.md`, d'un `*-UI.md`, ou tout ajout/déplacement de fichier.

**Étape 8 / 10**

#### La journalisation des décisions

Tout changement de règle s'inscrit dans `DECISIONS.md`, daté : *ancienne règle → nouvelle règle → pourquoi*. Les fichiers `*-UX.md`/`*-UI.md` ne contiennent que les règles **actuelles** et renvoient au journal quand le contexte historique vaut le détour.

Le détail de cette étape

Non normatif : en cas de divergence, le fichier de composant a raison.

**Étape 9 / 10**

#### La compilation vers `dist/` — et le routeur d'intention

L'atelier alimente une distribution légère : un fichier `RULES-X` (.md) par sujet + les tokens. Chaque `RULES-X` porte un **frontmatter de routage** : son périmètre, ses dépendances dures (`requires`) et conditionnelles (`selon-contexte`).

Le détail de cette étape

Depuis le 2026-07-15, `tools/genere-flow.js` extrait mécaniquement `RULES-creation-compte.md` et ses cinq extensions depuis la source UX ; version et empreinte SHA-256 rendent leur provenance vérifiable. La généralisation de ce mécanisme aux RULES antérieurs reste à faire.

`tools/genere-routeur.js` compile ces frontmatters + une table d'intentions éditoriale (Formulaire / Collection / Page de contenu / Feedback / Création de compte) en un **routeur généré** — `dist/CLAUDE.md` (auto-lu par Claude Code) et son jumeau `dist/AGENTS.md` (Cursor, Codex, Copilot…), jamais édités à la main. Le routeur fixe le protocole de consommation par une IA en deux modes : **build** (générer ou modifier de l'UI conforme) et, depuis le pivot du 2026-07-21, **audit** (confronter une interface existante aux règles : bundle d'intention chargé **sans** les tokens — l'implémentation de référence n'est jamais un critère —, constats qui citent leurs règles, statut de frontière appliqué, non-couverts remontés). Pour le mode build :

- charger le socle (routeur + `tokens.yaml` + `RULES-accessibility`, le contrat d'accessibilité universel chargé pour toute intention) puis **uniquement** le bundle de l'intention reconnue ; intention inconnue → décomposer par sujet via la table et les `requires` ; retouche isolée → le seul fichier concerné ;

- sujet hors périmètre (modale, table, navigation, datepicker…) : **s'arrêter et remonter**, ne pas improviser depuis les règles voisines ;

- ne **jamais** lire la couche atelier pendant un build, ne jamais éditer la distribution à la main ;

- **s'arrêter et remonter la question** dès qu'une décision de design se pose au lieu d'être tranchée par une règle (choix de style ou de tone, wording, conflit apparent, cas absent) — les lignes CONFIANCE calibrent la vitesse de remontée : plus c'est faible, plus on remonte vite.

Le script valide le graphe (toute mention « RULES-x » d'un corps doit être déclarée dans son frontmatter ; tout bundle est clos sur ses dépendances dures) et **refuse de régénérer** en cas d'erreur → `tools/reports/RAPPORT-ROUTEUR.md`, qui mesure aussi le coût en tokens par bundle. Pour installer la distribution dans un projet consommateur (Claude Code, Cursor, Codex, Copilot…) : `docs/INSTALLATION.md`, rendu public par la page installation du site avec l'archive de la distribution.

**Étape 10 / 10**

#### La boucle de dédoublonnage

Signal de méthode permanent, à l'origine de deux réorganisations :

Le détail de cette étape

- **Règle dupliquée entre deux composants → pattern.** La coordination bouton/champs trouvée en double entre `BUTTON-UX.md` et `INPUT-UX.md` a fait naître `atelier/patterns/form/`.

- **Recouvrement entre un pattern et un composant → le composant fait autorité.** Le résumé d'erreurs est un alert danger permanent : le conteneur vit dans `atelier/components/alert/`, `FORM-UX.md` garde l'orchestration propre au formulaire.

Chaque composant documenté renvoie ainsi de la connaissance vers les précédents — le système converge au lieu de s'empiler.

##### Les boucles de rétroaction

Le pipeline n'est pas linéaire ; trois boucles le referment :

| Boucle | De → vers | Déclencheur |
|---|---|---|
| Couverture | Étape 6 → étape 3 | Un trou trouvé contre l'inventaire → on complète la fiche |
| Dédoublonnage | Étape 10 → étapes 1–3 | Une règle en double → naissance d'un pattern ou transfert d'autorité |
| Arbitrage | Étape 9 → l'humain | L'IA consommatrice rencontre une décision non tranchée → elle s'arrête et expose les options |

À quoi s'ajoute la boucle de fond : tout ce que les boucles produisent passe par l'étape 8 (journal) et se recompile en étape 9.

##### En une phrase

Une demande entre, un inventaire cadre la couverture, une paire UX/UI sourcée est rédigée puis éprouvée (benchmark, couverture, scripts), les décisions sont journalisées, et le tout est compilé en règles légères qu'une IA peut consommer pour générer de l'UI conforme — ou pour auditer une interface existante en l'y confrontant — en remontant les arbitrages qu'elle n'a pas le droit de trancher.
