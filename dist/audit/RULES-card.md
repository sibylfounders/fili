---
sujet: card
nature: components
resume: "Ce fichier contient le raisonnement : modes d'interaction, composition, empty state, risques."
selon-contexte: [adaptive, border, button, collection, emotion, input, interaction, link, motion, toast, typography, voice]
source: CARD-UX.md v1.4.1 + CARD-UI.md v1.5.1
empreinte: sha256:b968c924308a1c39
regles: {loi: 0, preference: 0, non_qualifie: 75}
---
# RULES — card (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** les axes de la carte sont **interaction_mode / density** — pas les 3 axes du bouton.
- **[non qualifié]** **l'axe `style` n'existe pas ici.** Le style de conteneur (outlined / elevated — cf. Material Design) pourrait y ressembler, mais c'est une décision d'identité visuelle prise une fois pour tout le produit, pas un choix par instance : il vit dans CARD-UI.md comme token, pas ici comme axe.
- **[non qualifié]** **tone n'existe pas** : le conteneur n'a pas de sémantique propre — la charge sémantique appartient au *contenu* de la carte (un badge de statut, un texte), jamais à la carte elle-même. Une carte "d'erreur" ou "d'alerte" n'est pas une variante de carte : c'est un autre composant (alert).
- **[non qualifié]** seule exception apparente — l'état "sélectionné" d'une carte sélectionnable : un état d'interaction, pas un tone.
- **[non qualifié]** **size se réduit à la densité** (comfortable / compact) : la hauteur d'une carte est dictée par son contenu et sa largeur par la grille — pas de sm/md/lg. La densité module le padding interne et répond à la même question que size ("quelle est la densité du contexte ?") sans fixer de dimensions.
- **[non qualifié]** les axes réels (issus du benchmark, notamment des 4 variantes de tile chez IBM Carbon) :
- **[non qualifié]** la présence d'une image, le nombre d'actions, la présence d'un titre ne sont **pas** des axes : ce sont des *slots* de composition (media / header / corps / zone d'actions), optionnels et combinables — l'équivalent de "Forme et contenu" chez le bouton.
- **[non qualifié]** **la règle de cardinalité** ("un seul bouton d'action principal par carte, actions secondaires en icônes") vit ici (section "Zone d'actions") — ce fichier fait autorité sur le nombre et la position des actions dans une carte.
- **[non qualifié]** **la contrainte de zone tactile en grille dense** reste dans BUTTON-UX.md : c'est une propriété du bouton (son padding, son seuil de 44px), pas de la carte — la carte n'a pas à connaître les tokens du bouton.
- **[non qualifié]** une Card statique exprime l'intention **consulter** : containment calme, aucune réaction de
- **[non qualifié]** le mode d'interaction est reconnaissable au repos. Le hover confirme la cible ; il ne révèle
- **[non qualifié]** l'adaptation au conteneur peut changer disposition, densité et divulgation d'informations
- **[non qualifié]** rattachement nommé — cette section applique `INTERACTION-UX.md`. La Card statique incarne l'intention **consulter** de son § « Les six intentions » (« lire une information organisée » — expression canonique explicitement listée : Texte, Card statique, Panel) : elle organise sans se donner pour une cible.
- **[non qualifié]** les deux lois d'affordance qui gouvernent la Card sont nommées — loi 3 « une surface organise sans promettre un clic » (une Card statique reste calme, ne copie jamais l'apparence d'un contrôle) et loi 4 « la profondeur explique une couche » (l'élévation au survol indique un changement d'état, elle ne décore pas — d'où l'`elevation.raised` réservé au hover cliquable, jamais au repos généralisé).
- **[non qualifié]** utiliser pour parcourir du contenu hétérogène où chaque item se suffit à lui-même : dashboard, flux de contenus variés, catalogue où l'image porte l'essentiel de la décision.
- **[non qualifié]** ne pas utiliser pour comparer ou rechercher parmi des items homogènes — une liste ou une table est alors supérieure.
- **[non qualifié]** cas limite fréquent — une liste de résultats de recherche produits : le critère qui tranche est le mode de lecture dominant : *découverte* (browse) → carte, *évaluation comparative* → liste/table, quitte à proposer les deux modes.
- **[non qualifié]** présenter un groupe d'informations, sans que la carte elle-même soit une cible. Les éléments interactifs (boutons, liens) vivent *à l'intérieur* et sont les seules cibles.
- **[non qualifié]** c'est le seul mode qui accepte librement plusieurs éléments interactifs internes.
- **[non qualifié]** toute la surface de la carte est une seule et même cible — typiquement une navigation vers le détail du sujet.
- **[non qualifié]** règle absolue — une carte cliquable ne contient **aucun élément interactif imbriqué**.
- **[non qualifié]** règle d'implémentation — la cliquabilité vient d'un vrai lien (ou bouton) sémantique étendu à la surface de la carte — jamais d'un `div` avec un gestionnaire de clic, invisible au clavier et au lecteur d'écran (technique exacte dans CARD-UI.md).
- **[non qualifié]** si carte entièrement cliquable *et* boutons d'action internes sont tous deux nécessaires — les actions internes doivent être des *siblings* dans le DOM avec des cibles dédiées, et le conflit doit être une décision consciente, pas un accident (voir "Zone d'actions").
- **[non qualifié]** la carte représente une option dans un choix (plan tarifaire, configuration, sélection multiple d'items). Le clic ne navigue pas — il sélectionne.
- **[non qualifié]** l'état sélectionné doit être signalé par plus que la couleur seule (bordure renforcée + coche, par exemple) — même exigence daltonisme que le message d'erreur de l'input.
- **[non qualifié]** règle de cohérence — dans un groupe de cartes sélectionnables, toutes partagent le même mode (single ou multi) et la même structure interne — un groupe mixte est illisible.
- **[non qualifié]** masquer puis révéler un contenu secondaire volumineux sans quitter le contexte.
- **[non qualifié]** si la carte contient des éléments interactifs, seul un contrôle dédié (chevron) déclenche l'expansion — pas toute la surface. Si elle n'en contient pas, toute la surface peut déclencher (convention Carbon).
- **[non qualifié]** ne jamais mélanger les modes d'interaction dans une même collection.
- **[non qualifié]** **comfortable** — le défaut : dashboards, pages de contenu, catalogues.
- **[non qualifié]** **compact** — contextes denses : panneaux latéraux, listes de cartes à fort volume, widgets.
- **[non qualifié]** la densité module le padding interne et les écarts entre slots (valeurs dans CARD-UI.md), jamais la structure : une carte compact a les mêmes slots dans le même ordre qu'une carte comfortable.
- **[non qualifié]** même règle de groupe que partout — une collection partage une seule densité.
- **[non qualifié]** ordre canonique : **media → header → corps → zone d'actions**. Chaque slot est optionnel ; l'ordre, lui, ne se réinvente pas carte par carte.
- **[non qualifié]** porter l'identification visuelle du sujet — pas décorer. Une image qui n'aide pas à identifier ou décider est du bruit qui agrandit la carte sans bénéfice.
- **[non qualifié]** règle de ratio — un ratio d'image unique et fixe pour toute la collection (token dans CARD-UI.md).
- **[non qualifié]** media manquant — prévoir un remplacement délibéré (couleur de fond + icône ou initiales) plutôt que de laisser la carte s'effondrer ou afficher une image cassée : le trou de media est un cas normal, pas une erreur.
- **[non qualifié]** l'alternative textuelle est obligatoire, sauf si l'image est purement décorative (auquel cas elle doit être explicitement marquée comme telle).
- **[non qualifié]** nommer le sujet de la carte — c'est l'élément que le lecteur d'écran et l'œil utilisent comme point d'entrée.
- **[non qualifié]** le titre est un vrai titre sémantique, de niveau cohérent dans toute la collection (toutes les cartes d'une grille ont le même niveau de titre).
- **[non qualifié]** donner juste assez d'information pour décider d'entrer ou passer — la carte est un résumé, pas le contenu lui-même.
- **[non qualifié]** le texte est tronqué à une longueur fixe (nombre de lignes constant) plutôt que laissé libre — même raison que le ratio d'image : l'alignement de la collection prime sur l'exhaustivité d'une carte isolée. La troncature suit `VOICE-UI.md` (§ Longueur et troncature, token `measure`) : l'ellipsis ne masque jamais une information décisive et le texte complet reste accessible (`title`/tooltip).
- **[non qualifié]** badge de statut — c'est ici, dans le contenu, que vit la sémantique (nouveau, en rupture, urgent...) — jamais sur le conteneur (cf. note de transposition : la carte n'a pas de tone).
- **[non qualifié]** cohérence lexicale des badges — le libellé d'un statut suit **« un concept = un mot »** de `VOICE-UX.md` (lexique contrôlé dans `VOICE-UI.md`) : un même statut porte le même mot d'une carte et d'un écran à l'autre (« En rupture » ne devient pas « Épuisé » puis « Indisponible »), sinon l'utilisateur doute qu'il s'agisse du même état.
- **[non qualifié]** règle de cardinalité — une seule action principale par carte ; les actions secondaires (favori, partage, menu) passent en icônes discrètes ou en menu de débordement, jamais en boutons texte concurrents.
- **[non qualifié]** règle de position — les actions vivent en fin de carte (footer) ou en coin de header pour les actions d'objet (éditer, menu) — position constante dans toute la collection.
- **[non qualifié]** ne jamais rendre les actions d'une carte visibles *uniquement* au survol. Un menu de débordement toujours visible vaut mieux que des icônes qui apparaissent.
- **[non qualifié]** renvoi — le choix de style/tone/taille des boutons internes suit BUTTON-UX.md : la carte impose le *nombre* et la *position*, le bouton garde ses propres règles.
- **[non qualifié]** **la collection est vide** (première utilisation, recherche sans résultat, erreur) — afficher un état vide structuré : image facultative, titre court et positif, explication de *pourquoi* c'est vide, action pour en sortir.
- **[non qualifié]** le wording diffère selon le cas : première utilisation ("Commencez par ajouter...") ≠ recherche sans résultat ("Aucun résultat pour...") ≠ erreur (ton factuel + action corrective).
- **[non qualifié]** rattachement nommé — ce wording applique `VOICE-UX.md` § « Le ton suit l'utilisateur », ligne **« Vide / démarrage »** (ton encourageant, orienté action) : il faut **distinguer « rien encore » de « rien trouvé »** — la première utilisation (« rien encore », on pointe la première action) ne se formule pas comme une recherche infructueuse (« rien trouvé », on relance la requête).
- **[non qualifié]** sur l'empty state d'**erreur**, la règle cardinale **« ne jamais blâmer »** de `VOICE-UX.md` s'applique : on décrit l'écart et la correction, on ne qualifie pas l'utilisateur ; quand la faute est côté système, le produit la prend à son compte.
- **[non qualifié]** **une carte du flux manque de contenu** (pas d'image, description absente) — ce n'est pas un empty state, c'est un cas normal de données incomplètes : traité slot par slot (cf. "Media manquant"), sans casser la structure.
- **[non qualifié]** **hover (carte cliquable uniquement)** — le survol doit confirmer l'affordance : élévation ou bordure renforcée (tokens dans CARD-UI.md). Une carte statique, elle, ne réagit pas au survol.
- **[non qualifié]** **focus visible** — une carte cliquable ou sélectionnable est une cible clavier comme une autre : focus ring obligatoire sur la carte entière, jamais supprimé.
- **[non qualifié]** **loading / skeleton** — pendant le chargement d'une collection, afficher des cartes squelettes qui reproduisent la structure réelle (bloc media, lignes de texte) plutôt qu'un spinner global. Le squelette doit avoir les mêmes dimensions que la carte réelle.
- **[non qualifié]** **selected** — cf. mode selectable.
- **[non qualifié]** rattachement nommé — les micro-mouvements de la Card appliquent `MOTION-UX.md`. Le hover d'une Card cliquable relève du **feedback** (confirmer que l'affordance a été reçue — court, `motion.fast`) ; la rotation du chevron et le dépliage du mode expandable relèvent de la **continuité** (relier deux états, expliquer d'où vient le changement — `motion.base`).
- **[non qualifié]** **rien n'anime au chargement initial** — une collection de cartes est du contenu chargé avec la page, pas une conséquence réactive d'une action ; les squelettes occupent l'attente, ils n'« entrent » pas en animation. Seuls les changements réactifs (hover, sélection, dépliage déclenché par l'utilisateur) sont animés.
- **[non qualifié]** **le mouvement confirme, il n'informe jamais seul** — l'état déplié/replié vit dans `aria-expanded`, pas dans la rotation du chevron ; couper le mouvement ne coupe aucune information. La rotation n'est qu'une confirmation sensorielle de ce que l'attribut porte déjà.
- **[non qualifié]** contrat `prefers-reduced-motion` (couche UX ; valeurs et sélecteurs dans CARD-UI.md) — le chevron **saute** à son orientation finale sans rotation animée, et le contenu révélé apparaît en **crossfade instantané** plutôt qu'en glissement ; l'information (ouvert/fermé, contenu présent) reste intégrale, seul le déplacement spatial disparaît.
- **[non qualifié]** statut tranché (arbitrage utilisateur 2026-07-21) — **la Card ne porte aucun moment E-motion.** L'absence est documentée et raisonnée, pas un oubli : elle se déduit du même raisonnement que l'exclusion danger/warning de `TOAST-UX.md` (§ Instrument E-motion), appliqué au conteneur plutôt qu'au tone.
- **[non qualifié]** première raison — **surface de consultation calme.** La doctrine d'interaction fait de la Card statique l'expression de l'intention *consulter* (une surface qui organise sans promettre de clic) ; un battement expressif sur un conteneur de lecture mentirait sur son rôle, exactement comme un style cliquable sur une carte statique.
- **[non qualifié]** seconde raison — **composant-collection.** La Card vit en collection (grille, liste, dashboard) ; or le budget de rareté d'`EMOTION-UX.md` (« un moment qui se répète cesse d'être expressif ») disqualifie d'emblée tout ce qui se répète par carte — une grille de vingt cartes est l'exact opposé d'un moment mérité.
- **[non qualifié]** où va alors l'expression — le moment catalogué **« vide et attente qui ont une personnalité »** d'`EMOTION-UX.md` ne s'incarne pas dans le conteneur mais dans le **contenu injecté** (un Toast, réactif et seul à l'écran, cf. `TOAST-UX.md` § Instrument E-motion). L'expression appartient à ce qui est injecté, jamais au conteneur qui l'accueille.
- **[non qualifié]** périmètre strict — l'empty state d'**erreur** et l'état **« sans résultat »** restent strictement productifs (ton factuel, « ne jamais blâmer ») : l'exception chaleureuse d'`EMOTION-UX.md`/`VOICE-UX.md` ne s'applique jamais à une erreur ni à une absence de résultat, ici pas davantage qu'ailleurs.
- **[non qualifié]** largeurs uniformes, hauteurs idéalement alignées par rangée — c'est le ratio d'image fixe et la troncature de texte qui rendent cet alignement possible.
- **[non qualifié]** la position de chaque slot est identique sur toutes les cartes — la grille promet la prédictibilité, chaque écart la rompt.
- **[non qualifié]** alternative à la grille quand la lecture est séquentielle — la carte peut alors passer en disposition horizontale (media à gauche, contenu à droite).
- **[non qualifié]** point de vigilance — si toutes les cartes sont homogènes et comparées entre elles, se reposer la question "liste de cartes ou simple liste ?" (cf. Quand ne pas l'utiliser).
- **[non qualifié]** la carte-statistique (un chiffre + un libellé + une tendance) est une carte statique dans la quasi-totalité des cas — si elle navigue vers le détail, elle devient clickable et suit toutes les règles de ce mode.
- **[non qualifié]** la hiérarchie d'un dashboard vient de la taille des cartes dans la grille, pas d'un axe de style par carte — cohérent avec la note de transposition.
- **[non qualifié]** signaler le débordement (carte partiellement visible en bord d'écran) — un carrousel dont rien ne dépasse est indistinguable d'une grille complète.
- **[non qualifié]** **toute opération offerte au glisser-déposer a une alternative à pointeur unique** — un bouton ou un menu « Déplacer vers… » qui réalise le même déplacement sans maintenir ni traîner (WCAG 2.5.7 « Dragging Movements »). Le glisser-déposer reste un raccourci, jamais le seul chemin : l'utilisateur au clavier, au contacteur ou à faible dextérité passe par l'alternative, et le déplacement effectif est annoncé au lecteur d'écran (départ → arrivée).
- **[non qualifié]** **l'interactivité d'une carte doit être univoque : soit la carte est la cible, soit elle contient des cibles — jamais une ambiguïté entre les deux.**

## Non couvert — poser la question, ne rien trancher

- Carte promotionnelle / alert : La carte veut porter un message mis en avant.
- Carte tâche (kanban) : La carte se déplace entre colonnes.
- Masonry (hauteurs variables) : Les cartes ont des hauteurs différentes (Pinterest).
- Carte dans une modale / side panel : La carte vit dans un espace contraint.
- Carte draggable : On réordonne les cartes.
- Carte dismissable : L'utilisateur peut fermer définitivement la carte.
- Swipe actions mobiles : On glisse une carte pour révéler des actions.
