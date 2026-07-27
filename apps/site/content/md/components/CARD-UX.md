---
component: card
layer: ux
version: 1.4.1 # 1.4.1 (2026-07-21) : le pattern collection existe — la note Kanban renvoie à son extension à naître collection-kanban ; aucune règle modifiée. 1.4.0 (2026-07-21) : rattachement nommé Interaction/Motion/Voice, contrat reduced-motion chevron/dépliage, E-motion sans objet raisonné. 1.3.0 : rattachement au Langage d'interaction (surface statique calme, cible honnête) et à l'Architecture adaptative (états selon le conteneur sans perte d'information essentielle). 1.2.1 : vocabulaire aligné sur le modèle style × tone du bouton.
last_updated: 2026-07-21
companion: CARD-UI.md
confidence: mixed
---

# Card (carte) — Couche UX

> Ce fichier contient le raisonnement : modes d'interaction, composition, empty state, risques. Tokens et techniques dans `CARD-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE : les axes de la carte sont **interaction_mode / density** — pas les 3 axes du bouton.

RÈGLE : **l'axe `style` n'existe pas ici.** Le style de conteneur (outlined / elevated — cf. Material Design) pourrait y ressembler, mais c'est une décision d'identité visuelle prise une fois pour tout le produit, pas un choix par instance : il vit dans CARD-UI.md comme token, pas ici comme axe.

> **Pourquoi** : la carte vit presque toujours **en collection** (grille, liste, dashboard), où la hiérarchie est *volontairement absente* — le régime du "menu à choix parallèles" documenté comme exception dans BUTTON-UX.md, devenu ici le cas normal.

RÈGLE : **tone n'existe pas** : le conteneur n'a pas de sémantique propre — la charge sémantique appartient au *contenu* de la carte (un badge de statut, un texte), jamais à la carte elle-même. Une carte "d'erreur" ou "d'alerte" n'est pas une variante de carte : c'est un autre composant (alert).

RÈGLE : seule exception apparente — l'état "sélectionné" d'une carte sélectionnable : un état d'interaction, pas un tone.

> **Pourquoi** : Polaris les sépare explicitement (Card vs Alert card).

RÈGLE : **size se réduit à la densité** (comfortable / compact) : la hauteur d'une carte est dictée par son contenu et sa largeur par la grille — pas de sm/md/lg. La densité module le padding interne et répond à la même question que size ("quelle est la densité du contexte ?") sans fixer de dimensions.

RÈGLE : les axes réels (issus du benchmark, notamment des 4 variantes de tile chez IBM Carbon) :
  1. **Mode d'interaction** — static / clickable / selectable / expandable. C'est l'axe structurant : il détermine ce que la carte a le droit de contenir (une carte cliquable ne peut pas contenir de CTA imbriqué) et toutes les contraintes d'accessibilité.
  2. **Densité** — comfortable / compact.

RÈGLE : la présence d'une image, le nombre d'actions, la présence d'un titre ne sont **pas** des axes : ce sont des *slots* de composition (media / header / corps / zone d'actions), optionnels et combinables — l'équivalent de "Forme et contenu" chez le bouton.

Principe retenu : **plus un composant est un conteneur, moins il a d'axes propres** — sa variabilité se déplace vers ce qu'il contient (form, cas extrême, n'a aucun axe). (Cheminement du test de transposition : cf. DECISIONS.md.)

## Partage d'autorité avec BUTTON-UX.md

RÈGLE : **la règle de cardinalité** ("un seul bouton d'action principal par carte, actions secondaires en icônes") vit ici (section "Zone d'actions") — ce fichier fait autorité sur le nombre et la position des actions dans une carte.

RÈGLE : **la contrainte de zone tactile en grille dense** reste dans BUTTON-UX.md : c'est une propriété du bouton (son padding, son seuil de 44px), pas de la carte — la carte n'a pas à connaître les tokens du bouton.

(Décision : cf. DECISIONS.md.)

## But

Une carte regroupe des informations liées à **un seul sujet** en une unité visuelle autonome, au sein d'une collection ou d'une page. Contrairement au bouton (qui déclenche) et à l'input (qui capture), la carte **organise et donne accès** : c'est un résumé qui sert de point d'entrée vers un contenu plus complet. Toute règle ci-dessous découle de ce statut de conteneur : la carte ne porte pas de sens en propre, elle donne une forme lisible à ce qu'elle contient.

## Application du langage d'interaction

RÈGLE : une Card statique exprime l'intention **consulter** : containment calme, aucune réaction de
clic. Une Card clickable exprime une **navigation** et délègue sa cible à un vrai Link
(`LINK-UX.md`). Une Card selectable exprime un **choix** avec un contrôle et un état programmatiques.

RÈGLE : le mode d'interaction est reconnaissable au repos. Le hover confirme la cible ; il ne révèle
pas après coup qu'une Card était cliquable.

RÈGLE : l'adaptation au conteneur peut changer disposition, densité et divulgation d'informations
secondaires. Elle ne change jamais le mode d'interaction, le sujet, la destination ni les informations
nécessaires pour décider.

RÈGLE : rattachement nommé — cette section applique `INTERACTION-UX.md`. La Card statique incarne l'intention **consulter** de son § « Les six intentions » (« lire une information organisée » — expression canonique explicitement listée : Texte, Card statique, Panel) : elle organise sans se donner pour une cible.

RÈGLE : les deux lois d'affordance qui gouvernent la Card sont nommées — loi 3 « une surface organise sans promettre un clic » (une Card statique reste calme, ne copie jamais l'apparence d'un contrôle) et loi 4 « la profondeur explique une couche » (l'élévation au survol indique un changement d'état, elle ne décore pas — d'où l'`elevation.raised` réservé au hover cliquable, jamais au repos généralisé).

> **Pourquoi** : la Card doit passer le « Test de reconnaissance » d'`INTERACTION-UX.md` — en niveaux de gris et sans hover, une Card statique se distingue d'une Card cliquable, et son rôle (consulter) ne se confond pas avec agir ou naviguer. Un « non » à ce test n'appelle pas plus d'effets mais un meilleur mode d'interaction ou une meilleure structure.

## Quand l'utiliser / ne pas l'utiliser

RÈGLE : utiliser pour parcourir du contenu hétérogène où chaque item se suffit à lui-même : dashboard, flux de contenus variés, catalogue où l'image porte l'essentiel de la décision.

RÈGLE : ne pas utiliser pour comparer ou rechercher parmi des items homogènes — une liste ou une table est alors supérieure.

> **Pourquoi** : la carte dégrade la scannabilité et rend la comparaison difficile (positions d'information variables d'une carte à l'autre). C'est le point le plus contre-intuitif du benchmark : le réflexe "des cartes, c'est plus moderne qu'une liste" est explicitement identifié comme une erreur par NN/g.

RÈGLE : cas limite fréquent — une liste de résultats de recherche produits : le critère qui tranche est le mode de lecture dominant : *découverte* (browse) → carte, *évaluation comparative* → liste/table, quitte à proposer les deux modes.

CONFIANCE : établi — NN/g, argumenté par mécanisme (scannabilité), pas chiffré.

## Mode d'interaction (l'axe structurant)

### Static (carte-conteneur)

RÈGLE : présenter un groupe d'informations, sans que la carte elle-même soit une cible. Les éléments interactifs (boutons, liens) vivent *à l'intérieur* et sont les seules cibles.

RÈGLE : c'est le seul mode qui accepte librement plusieurs éléments interactifs internes.

> **Erreur fréquente** : donner à une carte statique un style qui suggère la cliquabilité (ombre au survol, curseur pointer) — l'utilisateur clique dans le vide et perd confiance dans les affordances du produit.

### Clickable (carte-cible)

RÈGLE : toute la surface de la carte est une seule et même cible — typiquement une navigation vers le détail du sujet.

> **Pourquoi** : l'intérêt est ergonomique — une grande cible est plus facile à atteindre qu'un petit lien (loi de Fitts).

RÈGLE : règle absolue — une carte cliquable ne contient **aucun élément interactif imbriqué**.

> **Pourquoi** : un lien dans un lien ou un bouton dans une cible cliquable produit un ordre de tabulation incohérent et des annonces de lecteur d'écran imprévisibles — ce n'est pas une dégradation esthétique, c'est une exclusion.

RÈGLE : règle d'implémentation — la cliquabilité vient d'un vrai lien (ou bouton) sémantique étendu à la surface de la carte — jamais d'un `div` avec un gestionnaire de clic, invisible au clavier et au lecteur d'écran (technique exacte dans CARD-UI.md).

RÈGLE : si carte entièrement cliquable *et* boutons d'action internes sont tous deux nécessaires — les actions internes doivent être des *siblings* dans le DOM avec des cibles dédiées, et le conflit doit être une décision consciente, pas un accident (voir "Zone d'actions").

> **Erreur fréquente** : vouloir le beurre et l'argent du beurre — carte entièrement cliquable *et* boutons d'action à l'intérieur, sans arbitrage.

CONFIANCE : établi — interdiction des imbrications convergente (Livefront, règles HTML/ARIA, recoupé par plusieurs sources d'accessibilité).

### Selectable (carte-option)

RÈGLE : la carte représente une option dans un choix (plan tarifaire, configuration, sélection multiple d'items). Le clic ne navigue pas — il sélectionne.

RÈGLE : l'état sélectionné doit être signalé par plus que la couleur seule (bordure renforcée + coche, par exemple) — même exigence daltonisme que le message d'erreur de l'input.

RÈGLE : règle de cohérence — dans un groupe de cartes sélectionnables, toutes partagent le même mode (single ou multi) et la même structure interne — un groupe mixte est illisible.

> **Erreur fréquente** : ne pas distinguer visuellement "sélectionné" de "survolé" — l'utilisateur ne sait plus ce qu'il a réellement choisi.

### Expandable (carte-accordéon)

RÈGLE : masquer puis révéler un contenu secondaire volumineux sans quitter le contexte.

RÈGLE : si la carte contient des éléments interactifs, seul un contrôle dédié (chevron) déclenche l'expansion — pas toute la surface. Si elle n'en contient pas, toute la surface peut déclencher (convention Carbon).

> **Erreur fréquente** : utiliser l'expansion pour cacher du contenu essentiel à la décision — l'expansion est pour le secondaire, pas pour faire tenir l'important dans une grille.

### Règle de groupe

RÈGLE : ne jamais mélanger les modes d'interaction dans une même collection.

> **Pourquoi** : une grille où certaines cartes naviguent, d'autres sélectionnent, casse la prédictibilité que la répétition visuelle promet. Même logique que "un groupe de boutons partage la même taille".

## Densité (ce qui survit de l'axe size)

RÈGLE : **comfortable** — le défaut : dashboards, pages de contenu, catalogues.

RÈGLE : **compact** — contextes denses : panneaux latéraux, listes de cartes à fort volume, widgets.

RÈGLE : la densité module le padding interne et les écarts entre slots (valeurs dans CARD-UI.md), jamais la structure : une carte compact a les mêmes slots dans le même ordre qu'une carte comfortable.

RÈGLE : même règle de groupe que partout — une collection partage une seule densité.

## Composition (les slots — pas des axes)

RÈGLE : ordre canonique : **media → header → corps → zone d'actions**. Chaque slot est optionnel ; l'ordre, lui, ne se réinvente pas carte par carte.

### Media (image, vidéo)

RÈGLE : porter l'identification visuelle du sujet — pas décorer. Une image qui n'aide pas à identifier ou décider est du bruit qui agrandit la carte sans bénéfice.

RÈGLE : règle de ratio — un ratio d'image unique et fixe pour toute la collection (token dans CARD-UI.md).

> **Pourquoi** : des hauteurs d'image variables détruisent l'alignement de la grille, qui est la principale promesse visuelle d'une collection de cartes.

RÈGLE : media manquant — prévoir un remplacement délibéré (couleur de fond + icône ou initiales) plutôt que de laisser la carte s'effondrer ou afficher une image cassée : le trou de media est un cas normal, pas une erreur.

RÈGLE : l'alternative textuelle est obligatoire, sauf si l'image est purement décorative (auquel cas elle doit être explicitement marquée comme telle).

> **Erreur fréquente** : laisser l'image porter l'information seule, sans équivalent textuel.

### Header (titre, sur-titre, avatar)

RÈGLE : nommer le sujet de la carte — c'est l'élément que le lecteur d'écran et l'œil utilisent comme point d'entrée.

RÈGLE : le titre est un vrai titre sémantique, de niveau cohérent dans toute la collection (toutes les cartes d'une grille ont le même niveau de titre).

> **Erreur fréquente** : faire du titre le seul lien cliquable d'une carte "presque entièrement cliquable" — soit la carte est cliquable (mode clickable), soit le titre est un lien dans une carte statique, mais le choix doit être franc.

### Corps (texte, métadonnées, badges)

RÈGLE : donner juste assez d'information pour décider d'entrer ou passer — la carte est un résumé, pas le contenu lui-même.

RÈGLE : le texte est tronqué à une longueur fixe (nombre de lignes constant) plutôt que laissé libre — même raison que le ratio d'image : l'alignement de la collection prime sur l'exhaustivité d'une carte isolée. La troncature suit `VOICE-UI.md` (§ Longueur et troncature, token `measure`) : l'ellipsis ne masque jamais une information décisive et le texte complet reste accessible (`title`/tooltip).

RÈGLE : badge de statut — c'est ici, dans le contenu, que vit la sémantique (nouveau, en rupture, urgent...) — jamais sur le conteneur (cf. note de transposition : la carte n'a pas de tone).

RÈGLE : cohérence lexicale des badges — le libellé d'un statut suit **« un concept = un mot »** de `VOICE-UX.md` (lexique contrôlé dans `VOICE-UI.md`) : un même statut porte le même mot d'une carte et d'un écran à l'autre (« En rupture » ne devient pas « Épuisé » puis « Indisponible »), sinon l'utilisateur doute qu'il s'agisse du même état.

### Zone d'actions (fait autorité — cf. partage en tête de fichier)

RÈGLE : règle de cardinalité — une seule action principale par carte ; les actions secondaires (favori, partage, menu) passent en icônes discrètes ou en menu de débordement, jamais en boutons texte concurrents.

RÈGLE : règle de position — les actions vivent en fin de carte (footer) ou en coin de header pour les actions d'objet (éditer, menu) — position constante dans toute la collection.

RÈGLE : ne jamais rendre les actions d'une carte visibles *uniquement* au survol. Un menu de débordement toujours visible vaut mieux que des icônes qui apparaissent.

> **Pourquoi** : même piège que les icônes hover-only en table documenté dans BUTTON-UX.md — invisible donc inexistant sur écran tactile.

RÈGLE : renvoi — le choix de style/tone/taille des boutons internes suit BUTTON-UX.md : la carte impose le *nombre* et la *position*, le bouton garde ses propres règles.

## Empty state (l'état vide d'une carte ou d'une collection)

Deux cas distincts que le benchmark (Carbon) sépare bien :

RÈGLE : **la collection est vide** (première utilisation, recherche sans résultat, erreur) — afficher un état vide structuré : image facultative, titre court et positif, explication de *pourquoi* c'est vide, action pour en sortir.

RÈGLE : le wording diffère selon le cas : première utilisation ("Commencez par ajouter...") ≠ recherche sans résultat ("Aucun résultat pour...") ≠ erreur (ton factuel + action corrective).

RÈGLE : rattachement nommé — ce wording applique `VOICE-UX.md` § « Le ton suit l'utilisateur », ligne **« Vide / démarrage »** (ton encourageant, orienté action) : il faut **distinguer « rien encore » de « rien trouvé »** — la première utilisation (« rien encore », on pointe la première action) ne se formule pas comme une recherche infructueuse (« rien trouvé », on relance la requête).

RÈGLE : sur l'empty state d'**erreur**, la règle cardinale **« ne jamais blâmer »** de `VOICE-UX.md` s'applique : on décrit l'écart et la correction, on ne qualifie pas l'utilisateur ; quand la faute est côté système, le produit la prend à son compte.

RÈGLE : **une carte du flux manque de contenu** (pas d'image, description absente) — ce n'est pas un empty state, c'est un cas normal de données incomplètes : traité slot par slot (cf. "Media manquant"), sans casser la structure.

> **Erreur fréquente** : l'écran blanc silencieux — une grille vide sans explication est indistinguable d'un bug pour l'utilisateur.

## États et comportement

RÈGLE : **hover (carte cliquable uniquement)** — le survol doit confirmer l'affordance : élévation ou bordure renforcée (tokens dans CARD-UI.md). Une carte statique, elle, ne réagit pas au survol.

> **Pourquoi** : la réaction au survol *est* le signal de cliquabilité, il ne doit jamais mentir.

RÈGLE : **focus visible** — une carte cliquable ou sélectionnable est une cible clavier comme une autre : focus ring obligatoire sur la carte entière, jamais supprimé.

RÈGLE : **loading / skeleton** — pendant le chargement d'une collection, afficher des cartes squelettes qui reproduisent la structure réelle (bloc media, lignes de texte) plutôt qu'un spinner global. Le squelette doit avoir les mêmes dimensions que la carte réelle.

> **Pourquoi** : réduit l'attente perçue et évite le saut de mise en page à l'arrivée des données — sinon il ajoute le layout shift qu'il devait éviter.

RÈGLE : **selected** — cf. mode selectable.

## Application du langage de motion

RÈGLE : rattachement nommé — les micro-mouvements de la Card appliquent `MOTION-UX.md`. Le hover d'une Card cliquable relève du **feedback** (confirmer que l'affordance a été reçue — court, `motion.fast`) ; la rotation du chevron et le dépliage du mode expandable relèvent de la **continuité** (relier deux états, expliquer d'où vient le changement — `motion.base`).

RÈGLE : **rien n'anime au chargement initial** — une collection de cartes est du contenu chargé avec la page, pas une conséquence réactive d'une action ; les squelettes occupent l'attente, ils n'« entrent » pas en animation. Seuls les changements réactifs (hover, sélection, dépliage déclenché par l'utilisateur) sont animés.

RÈGLE : **le mouvement confirme, il n'informe jamais seul** — l'état déplié/replié vit dans `aria-expanded`, pas dans la rotation du chevron ; couper le mouvement ne coupe aucune information. La rotation n'est qu'une confirmation sensorielle de ce que l'attribut porte déjà.

RÈGLE : contrat `prefers-reduced-motion` (couche UX ; valeurs et sélecteurs dans CARD-UI.md) — le chevron **saute** à son orientation finale sans rotation animée, et le contenu révélé apparaît en **crossfade instantané** plutôt qu'en glissement ; l'information (ouvert/fermé, contenu présent) reste intégrale, seul le déplacement spatial disparaît.

> **Pourquoi** : c'est la condition qui rend `prefers-reduced-motion` implémentable sans perte — puisque aucune information n'est portée par le seul mouvement, la préférence d'accessibilité dégrade le confort sensoriel, jamais la fonction.

## Instrument E-motion — sans objet (surface calme)

RÈGLE : statut tranché (arbitrage utilisateur 2026-07-21) — **la Card ne porte aucun moment E-motion.** L'absence est documentée et raisonnée, pas un oubli : elle se déduit du même raisonnement que l'exclusion danger/warning de `TOAST-UX.md` (§ Instrument E-motion), appliqué au conteneur plutôt qu'au tone.

RÈGLE : première raison — **surface de consultation calme.** La doctrine d'interaction fait de la Card statique l'expression de l'intention *consulter* (une surface qui organise sans promettre de clic) ; un battement expressif sur un conteneur de lecture mentirait sur son rôle, exactement comme un style cliquable sur une carte statique.

RÈGLE : seconde raison — **composant-collection.** La Card vit en collection (grille, liste, dashboard) ; or le budget de rareté d'`EMOTION-UX.md` (« un moment qui se répète cesse d'être expressif ») disqualifie d'emblée tout ce qui se répète par carte — une grille de vingt cartes est l'exact opposé d'un moment mérité.

RÈGLE : où va alors l'expression — le moment catalogué **« vide et attente qui ont une personnalité »** d'`EMOTION-UX.md` ne s'incarne pas dans le conteneur mais dans le **contenu injecté** (un Toast, réactif et seul à l'écran, cf. `TOAST-UX.md` § Instrument E-motion). L'expression appartient à ce qui est injecté, jamais au conteneur qui l'accueille.

RÈGLE : périmètre strict — l'empty state d'**erreur** et l'état **« sans résultat »** restent strictement productifs (ton factuel, « ne jamais blâmer ») : l'exception chaleureuse d'`EMOTION-UX.md`/`VOICE-UX.md` ne s'applique jamais à une erreur ni à une absence de résultat, ici pas davantage qu'ailleurs.

## Contextes d'intégration

### En grille (le cas de référence)

RÈGLE : largeurs uniformes, hauteurs idéalement alignées par rangée — c'est le ratio d'image fixe et la troncature de texte qui rendent cet alignement possible.

RÈGLE : la position de chaque slot est identique sur toutes les cartes — la grille promet la prédictibilité, chaque écart la rompt.

### En liste verticale (cartes empilées)

RÈGLE : alternative à la grille quand la lecture est séquentielle — la carte peut alors passer en disposition horizontale (media à gauche, contenu à droite).

RÈGLE : point de vigilance — si toutes les cartes sont homogènes et comparées entre elles, se reposer la question "liste de cartes ou simple liste ?" (cf. Quand ne pas l'utiliser).

### En dashboard (carte-widget, carte-KPI)

RÈGLE : la carte-statistique (un chiffre + un libellé + une tendance) est une carte statique dans la quasi-totalité des cas — si elle navigue vers le détail, elle devient clickable et suit toutes les règles de ce mode.

RÈGLE : la hiérarchie d'un dashboard vient de la taille des cartes dans la grille, pas d'un axe de style par carte — cohérent avec la note de transposition.

### En carrousel horizontal

RÈGLE : signaler le débordement (carte partiellement visible en bord d'écran) — un carrousel dont rien ne dépasse est indistinguable d'une grille complète.

*Couverture partielle — signalé dans l'inventaire, à approfondir.*

### Kanban / carte déplaçable

RÈGLE : **toute opération offerte au glisser-déposer a une alternative à pointeur unique** — un bouton ou un menu « Déplacer vers… » qui réalise le même déplacement sans maintenir ni traîner (WCAG 2.5.7 « Dragging Movements »). Le glisser-déposer reste un raccourci, jamais le seul chemin : l'utilisateur au clavier, au contacteur ou à faible dextérité passe par l'alternative, et le déplacement effectif est annoncé au lecteur d'écran (départ → arrivée).

> **Pourquoi** : c'est l'application au conteneur du principe « pas de dépendance à une seule modalité » — un tableau Kanban où l'on ne peut avancer une carte qu'en la traînant exclut d'emblée qui ne peut pas produire ce geste continu.

*Le reste du Kanban — affordance visuelle de saisie, réordonnancement fin, région live d'annonce — relève de l'extension à naître `collection-kanban` du pattern collection (COLLECTION-UX.md, § À approfondir) ; hors scope ici. Seule l'obligation d'alternative est normative dans ce fichier.*

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Carte cliquable avec éléments interactifs imbriqués | Exclusion clavier/lecteur d'écran, tabulation incohérente | Critique |
| Cliquabilité par div + onclick (non sémantique) | Cible invisible aux technologies d'assistance | Critique |
| Actions visibles uniquement au survol | Fonction inaccessible sur tactile | Élevée |
| Déplacement possible uniquement au glisser-déposer | Exclusion clavier/motricité (WCAG 2.5.7) | Élevée |
| Cartes pour des items homogènes à comparer | Scannabilité dégradée, comparaison difficile, abandon | Moyenne |
| Ratio d'image variable dans une collection | Grille cassée, lecture désordonnée | Faible à moyenne |
| État sélectionné signalé par la couleur seule | Exclusion daltonisme | Élevée |
| Collection vide sans empty state | Confusion (vide = bug ?), abandon silencieux | Moyenne |
| Style cliquable sur carte statique (ou l'inverse) | Affordance mensongère, perte de confiance | Moyenne |

## Règle transversale

RÈGLE : **l'interactivité d'une carte doit être univoque : soit la carte est la cible, soit elle contient des cibles — jamais une ambiguïté entre les deux.**

> **Pourquoi** : c'est la déclinaison pour un conteneur du principe déjà posé pour le bouton (la friction suit le risque réel) et l'input (la validation suit le risque d'erreur) : ici, ce qui doit suivre la fonction réelle, c'est l'affordance — une surface qui a l'air cliquable doit l'être, une surface cliquable doit le montrer, et l'utilisateur ne doit jamais deviner où cliquer.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Carte = résumé + point d'entrée, entièrement cliquable de préférence (Fitts) | [NN/g — Cards: UI-Component Definition](https://www.nngroup.com/articles/cards-component/) | Établi — article de référence, définition largement reprise |
| Cartes inférieures aux listes pour comparer/rechercher des items homogènes | [NN/g — Cards: UI-Component Definition](https://www.nngroup.com/articles/cards-component/) | Établi — argumenté par mécanisme (scannabilité), pas chiffré |
| 4 modes d'interaction (base/clickable/selectable/expandable) | [IBM Carbon — Tile usage](https://carbondesignsystem.com/components/tile/usage/) | Établi — taxonomie explicitement documentée par Carbon |
| Carte cliquable sans CTA interne ; expansion par chevron si contenu interactif | [IBM Carbon — Tile usage](https://carbondesignsystem.com/components/tile/usage/) | Établi — règle explicite du système |
| Structure header/corps/footer, actions d'objet en header, CTA en footer, 1 seule action mise en avant | [Shopify Polaris — Card layout](https://polaris-react.shopify.com/patterns/card-layout) | Établi — pattern documenté en détail par Polaris |
| Interdiction des éléments interactifs imbriqués ; siblings DOM + cible étendue en CSS ; balisage liste pour les collections | [Livefront — Accessibility dos and don'ts for interactive cards](https://livefront.com/writing/accessibility-dos-and-donts-for-interactive-cards/) | Établi — converge avec les règles HTML/ARIA, recoupé par plusieurs sources d'accessibilité |
| Alternative à pointeur unique pour tout glisser-déposer | [WCAG 2.2 — 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | Établi, standard (2.2) |
| 3 styles de conteneur (elevated/filled/outlined) comme décision visuelle, pas hiérarchie par instance | [Material Design 3 — Cards](https://m3.material.io/components/cards/guidelines), recoupé via [MUI — Card](https://mui.com/material-ui/react-card/) | Établi pour l'existence des 3 styles ; l'interprétation "décision produit, pas axe par instance" est une lecture de ce fichier |
| Surface cliquable + actions détachées pour éviter les conflits d'événements | [MUI — Card (CardActionArea)](https://mui.com/material-ui/react-card/) | Établi — pattern d'implémentation documenté |
| Empty state : image/titre/corps/action, variantes première utilisation / sans résultat / erreur | [IBM Carbon — Empty states pattern](https://carbondesignsystem.com/patterns/empty-states-pattern/) | Établi — pattern documenté |
| Media = éducatif/identification, pas décoration ; toujours accompagné de texte | [Shopify Polaris — Media card](https://polaris-react.shopify.com/components/layout-and-structure/media-card) | Établi chez Polaris, formulation générale extrapolée |
| Absence de composant carte générique chez Atlassian (cartes spécialisées uniquement) | [Atlassian Design System](https://atlassian.design/design-system) + [question communauté restée sans doctrine générale](https://community.developer.atlassian.com/t/any-design-guidelines-around-an-issue-card-or-card-in-general-for-apps/25779) | Constat de structure — confirme que "carte" est moins standardisé que bouton/input d'un système à l'autre |
| Intention *consulter* + lois d'affordance 3 et 4 + Test de reconnaissance | `INTERACTION-UX.md` § Les six intentions / Les lois d'affordance / Test de reconnaissance | Établi — rattachement interne nommé |
| Hover = feedback, chevron/dépliage = continuité ; rien n'anime au chargement initial ; mouvement jamais seul porteur ; reduced-motion (chevron qui saute, crossfade) | `MOTION-UX.md` § Deux rôles / Le mouvement confirme… / prefers-reduced-motion | Établi — rattachement interne nommé |
| Wording empty state (« rien encore » vs « rien trouvé ») ; « ne jamais blâmer » sur l'erreur | `VOICE-UX.md` § Le ton suit l'utilisateur | Établi — rattachement interne nommé |
| Cohérence lexicale des badges (« un concept = un mot ») ; troncature (`measure`) | `VOICE-UX.md` § Cohérence lexicale + `VOICE-UI.md` § Lexique contrôlé / Longueur et troncature | Établi — rattachement interne nommé |
| Card = surface calme sans moment E-motion ; expression dans le contenu injecté (Toast) | `EMOTION-UX.md` (budget de rareté, catalogue) + `TOAST-UX.md` § Instrument E-motion | Déduction argumentée — arbitrage utilisateur 2026-07-21 |

*Toute règle sans source explicite ci-dessus repose sur un raisonnement de mécanisme (affordance, charge cognitive, alignement de grille) plutôt que sur une étude chiffrée. Aucune étude chiffrée type "+X% de conversion" n'a été trouvée pour la carte — contrairement au bouton ($300M button) et à l'input (Wroblewski, Baymard) ; c'est un écart de niveau de preuve à garder en tête.*

## À approfondir

- **Kanban / drag-and-drop** : l'obligation d'alternative à pointeur unique est désormais normative (WCAG 2.5.7) ; l'affordance visuelle de saisie et le réordonnancement fin restent à traiter dans un futur pattern « collection ».
- **Carrousel horizontal** : effleuré, mérite un traitement complet (navigation, indicateurs, tactile).
- **Performance des collections longues** (virtualisation, lazy-loading des images) : enjeu réel signalé dans l'inventaire, plus technique qu'UX — à trancher entre CARD-UI.md et un futur pattern "collection".
