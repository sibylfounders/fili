---
sujet: cognitive-load
nature: principles
resume: "Ce fichier pose les **obligations universelles de charge cognitive** : ce que tout écran, composant, pattern et flow doit respecter pour que l'interface n'impose jamais plus de travail mental que…"
selon-contexte: [laws]
source: COGNITIVE-LOAD-UX.md v1.0.0
empreinte: sha256:f92e9cd29ff54544
regles: {loi: 0, preference: 0, non_qualifie: 17}
---
# RULES — cognitive-load (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** la charge cognitive est un **principe transversal** — ni variantes (composant), ni assemblage (pattern), ni token ; le modèle à axes ne s'applique pas. Comme `accessibility` : `companion: none` **sans** `audience: humans` — compilé vers `dist/RULES-cognitive-load.md` et **chargé d'office par le routeur pour toute intention** (socle universel, arbitré le 2026-07-21 ; le coût en tokens du socle est mesuré à chaque build dans RAPPORT-ROUTEUR).
- **[non qualifié]** **frontière avec `laws`** — les lois éclairent, ce principe contraint. `LAWS-UX.md` reste le seul endroit où une loi est énoncée, sourcée et bornée ; chaque règle ici **cite** sa loi sans la réécrire. Si une règle opérationnelle de ce fichier semble contredire la portée d'une loi du catalogue, le catalogue a raison sur la loi, ce fichier a raison sur l'obligation — et l'écart se remonte.
- **[non qualifié]** ce principe **ne fait pas autorité sur un comportement précis** — il pose l'obligation, le propriétaire pose la mécanique (`FORM` pour le multi-step, `BUTTON` pour le destructive, `INPUT` pour les défauts de saisie…). En cas de divergence, le propriétaire a raison. Même clause qu'`accessibility` : pas une source normative de substitution.
- **[non qualifié]** ce principe **ne quantifie aucun plafond**. Aucune règle ne dira « maximum N choix » — le plafond numérique est le mythe que `LAWS-UX.md` réfute (Miller « 7 items », règle des 3 clics). La contrainte porte sur la **structure** (hiérarchie, divulgation, défauts), jamais sur un nombre magique.
- **[non qualifié]** tout écran ou toute vue déclare **une décision principale**, et une seule. Tout le reste — choix secondaires, réglages, chemins alternatifs — lui est subordonné visuellement et structurellement. Le système l'applique déjà localement (primary unique de `BUTTON`, une décision par étape du `FORM` multi-step) ; l'obligation devient ici celle de **l'écran assemblé**, pas seulement du composant.
- **[non qualifié]** le nombre de choix simultanés se justifie par le besoin de la décision présente, jamais par l'espace disponible. Un conteneur large peut révéler du contenu secondaire (cf. `adaptive`, divulgation par l'espace) — il n'autorise pas des décisions nouvelles.
- **[non qualifié]** par défaut, une interface montre ce qui est nécessaire à la décision présente ; l'avancé, le rare et le détail se révèlent **sur demande explicite**. La cause est ici la complexité — distincte de la divulgation par l'espace, qui appartient à `adaptive` et répond à la largeur du conteneur.
- **[non qualifié]** réduire n'est pas enfouir — une fonction essentielle reste découvrable sans connaissance préalable. La tension Hick ↔ découvrabilité (cf. LAWS) ne se tranche pas par principe : au doute, remonter.
- **[non qualifié]** tout choix qui admet une réponse majoritaire sensée porte un **défaut** ; l'utilisateur corrige un défaut plutôt qu'il ne construit une réponse à vide. C'est la forme la plus directe d'absorption de complexité par le système (Tesler, cf. LAWS § 2) — et la plus puissante : la plupart des utilisateurs ne changent jamais un défaut (NN/g), ce qui en fait une responsabilité autant qu'un levier.
- **[non qualifié]** un défaut se distingue toujours d'une valeur saisie — l'utilisateur sait ce qu'il a choisi et ce qui a été choisi pour lui. La mécanique (placeholder ≠ valeur, pré-remplissage annoncé) appartient à `INPUT`.
- **[non qualifié]** une action **réversible** s'exécute immédiatement, avec un chemin d'annulation visible et un délai raisonnable. La **confirmation bloquante** est réservée à l'irréversible et au coûteux-à-défaire — la banaliser en détruit la valeur (fatigue de confirmation : cliquer « oui » devient un réflexe, et le garde-fou ne protège plus l'irréversible).
- **[non qualifié]** l'irréversible **se déclare avant** l'exécution : ce que l'action détruit, sa portée, l'absence de retour. La mécanique destructive (styles, garde-fous, friction proportionnelle) appartient à `BUTTON` ; le cas DeleteButton reste OUVERT au journal et n'est pas tranché ici.
- **[non qualifié]** **quitter n'est pas perdre** — une saisie en cours survit à la navigation, à l'interruption et à l'expiration quand c'est techniquement possible (propriétaires : `FORM` autosave ; `accessibility` pour les limites de temps).
- **[non qualifié]** ne jamais exiger de retenir une information d'un écran à l'autre — le contexte nécessaire est **re-présenté là où la décision se prend**. Mécaniques propriétaires déjà en place : ask-once et récapitulation (`FORM` multi-step), helper persistant plutôt qu'aide qui disparaît (`INPUT`).
- **[non qualifié]** l'interface **montre l'état** plutôt qu'elle ne le fait mémoriser — où j'en suis, ce qui est fait, ce qui reste (progression du `FORM` multi-step, statut d'autosave).
- **[non qualifié]** une information critique (erreur, coût, sécurité, obligation légale) ne prend **jamais** la forme d'un élément décoratif ou promotionnel — ce qui ressemble à de la publicité est filtré avant lecture (banner blindness, cf. LAWS § Selective Attention). Ce fichier **promeut en RÈGLE** le trou que `LAWS-UX.md` signalait comme « candidate » dans son À approfondir. La forme du message reste chez ses propriétaires (`ALERT` pour les tones, `VOICE` pour le mot) ; l'interdit du déguisement est l'obligation transversale posée ici.
- **[non qualifié]** il ne possède **aucune mécanique** (table de renvois ci-dessous), ne fixe **aucun nombre**, et ne tranche **aucune tension** — il les rend visibles et l'arbitrage remonte, à la vitesse calibrée par les lignes CONFIANCE.
