---
component: elevation
layer: ux
type: foundation
version: 2.0.0 # 2.0.0 : le relief entre dans la fondation — grammaire d'objet posé / creusé / plat, registre d'identité « Relief » (parti pris paramétrable, débrayable) ; « le repos est à plat » devient la règle des SURFACES, les CONTRÔLES gagnent un relief de repos fonctionnel ; physique commune (lumière du haut, soulevé au survol, enfoncé à l'appui) éprouvée dans l'atelier DS-UI (2026-07-23). 1.1.0 : élévation déclarée dépendante du thème — stress-test 2026-07-17. 1.0.0 : première rédaction.
last_updated: 2026-07-23
companion: ELEVATION-UI.md
confidence: mixed # l'échelle courte et l'élévation-signal sont convergentes ; la grammaire de relief est un parti pris d'identité daté, adossé à des constats établis sur le flat (NN/g) et à la théorie des affordances (Norman)
---

# Élévation & Relief — Couche UX (fondation)

> Ce fichier contient le raisonnement : ce que la profondeur *signifie*, quand le relief est un signal et quand il est du bruit. Les valeurs (`elevation.none/raised/overlay`) vivent dans `DESIGN.md` ; la grammaire d'application vit dans `ELEVATION-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE : l'élévation est une **fondation** — pas d'axes, pas d'assemblage : une contrainte transversale. Particularité de trajectoire : ses tokens sont nés *avant* sa doctrine (créés en DESIGN.md 1.2.0 pour la card) ; la 2.0.0 élargit la doctrine de l'**ombre** au **relief** entier (ombre + arête + liseré), après que l'implémentation de référence (atelier DS-UI) en a éprouvé la grammaire.

RÈGLE : l'élévation porte une seule fonction — **dire à quelle couche du flux un élément appartient** :
  1. **À plat** (`none`) — dans le flux. L'état de repos de toute *surface*.
  2. **Soulevé** (`raised`) — encore dans le flux, mais prêt à répondre.
  3. **Au-dessus du flux** (`overlay`) — hors du document : toast, modale, popover, menu.

> **Pourquoi** : cette échelle à 3 niveaux recoupe exactement une frontière déjà tracée ailleurs — "dans le flux vs au-dessus du flux" (ALERT-UX, la frontière alert/toast). L'élévation est la traduction visuelle de cette frontière ; elle n'a donc pas plus de niveaux que le système n'a de couches.

## Le relief — ce que le flat avait perdu

RÈGLE : le relief est la **matérialité retrouvée de la fonction** : un objet qui dépasse de la page appelle le doigt ; un creux appelle un contenu ; une surface plate se lit sans rien promettre. Le flat design a uniformisé ces trois natures en une seule — le système les redistingue.

> **Pourquoi** : la disparition des signifiants du flat est un coût d'utilisabilité **documenté**, pas une nostalgie : les éléments plats à signifiants faibles attirent moins l'attention et créent de l'incertitude sur ce qui est cliquable (NN/g). Le biseau des années 90 encodait physiquement l'affordance (Norman : ce qui se perçoit comme pressable est pressé) — il le disait avec 4 px de gris ; ce système le dit à 1 px près, sur tokens.

RÈGLE : **grammaire à trois natures** — à la création de tout composant, chaque surface est classée :

| Nature | Ce que ça dit | Qui |
|---|---|---|
| **Posé** | « je suis un objet, on peut me presser » | contrôles actionnables (bouton et dérivés), couches flottantes (toast) |
| **Creusé** | « je suis un réceptacle, on me remplit » | champs de saisie |
| **Plat** | « je suis du contenu, je ne promets rien » | alert, texte, surfaces statiques, actions fantômes (ghost) |

RÈGLE : **le relief suit la fonction, jamais la décoration.** Le test reste celui du langage d'interaction (INTERACTION-UX, matérialité fonctionnelle) : manipulable ? reçoit ? organise ? couche temporaire ? état changé ? — un effet qui ne répond à aucune question est décoratif, donc banni. La grammaire ne crée pas un droit à l'effet ; elle nomme les trois seules réponses admises.

RÈGLE : **statut de frontière — parti pris d'identité, paramétrable.** Le registre Relief est débrayable (l'implémentation de référence l'expose comme un réglage de thème) : un consommateur peut le désactiver et retomber sur le registre plat intégral (doctrine 1.x, conservée ci-dessous). En audit d'une interface tierce, l'absence de relief n'est jamais une non-conformité ; l'affordance mensongère (relief sur du statique) en est une.

## La physique du relief (registre actif)

RÈGLE : **la lumière vient du haut, pour tout le monde.** Un objet posé porte une arête externe sombre, un liseré interne clair *en haut qui fond vers sa couleur en bas* (jamais un anneau uniforme — la lumière ne cercle pas), et l'ombre de repos `raised`. Un creux porte une ombre interne haute. Une seule source de lumière dans tout le produit ; deux objets éclairés de deux directions sont un bug de physique.

RÈGLE : **matrice d'états des objets posés** — trois états, une seule métaphore :
  - **défaut = posé** : arête + liseré + `raised` ;
  - **survol = soulevé** : l'objet monte vers la lumière — `overlay` + fond *éclairci* ;
  - **appui = enfoncé** : l'objet descend — ombre interne, fond *assombri*, liseré assombri, course d'un demi-pixel.

> **Pourquoi** : au registre plat, le survol assombrit (convention state-layer). Au registre relief, il éclaircit — parce que la métaphore prime : ce qui monte prend la lumière, ce qui s'enfonce la perd. Un registre qui mélange les deux directions ne raconte plus rien. L'appui qui s'enfonce ferme la boucle sensorielle du biseau : l'utilisateur *sent* le clic avant la réponse du système.

RÈGLE : **en thème sombre, la physique tient, les valeurs changent.** La convention « les surfaces s'éclaircissent avec la hauteur » (1.1.0) s'applique au registre entier : le soulevé s'éclaircit aussi en sombre ; l'enfoncé se dérive *vers le noir* — jamais via le token de survol, qui s'éclaircit en sombre et inverserait la physique (un bouton qui *monte* quand on le presse). Le liseré s'exprime dans la gamme de l'objet, jamais en blanc pur.

RÈGLE : les surfaces restent gouvernées par la doctrine 1.x, **inchangée** : le repos d'une *surface* est à plat ; `raised` reste le retour de survol des surfaces **cliquables** uniquement (card clickable — et en registre relief, ce survol porte aussi l'arête et le liseré, qui apparaissent et disparaissent *avec* lui) ; une surface statique ne réagit jamais.

> **Pourquoi** : c'est la ligne de partage qui empêche la grammaire de dégénérer en skeuomorphisme : les **objets** (petits, actionnables, en nombre borné par écran) ont droit au relief de repos ; les **surfaces** (grandes, porteuses de contenu) ne l'obtiennent qu'en le méritant par l'interaction. Généraliser le relief aux surfaces recréerait l'inflation que la 1.x combattait — si tout est posé, rien n'est pressable.

RÈGLE : **mise en avant ≠ élévation**, inchangé : `surface-contrast` met en avant par le fond, sans ombre (non-cumul). Et **l'importance ne réquisitionne pas le relief** : un bouton primaire n'est pas plus posé qu'un bouton neutre — la hiérarchie passe par style × tone (BUTTON-UX), le relief dit la nature, pas le rang.

## L'échelle courte, et pourquoi elle le reste

RÈGLE : trois niveaux d'ombre, inchangés. Le relief n'ajoute **aucun niveau** : il compose les niveaux existants avec l'arête et le liseré (fondation border : le containment passe par la bordure). L'ombre interne d'enfoncement est un état, pas un palier — elle n'entre pas dans l'échelle.

RÈGLE : les ombres restent **teintées** (base `text-primary`, jamais noir pur) et se distinguent par la *portée*, pas par l'opacité seule.

## Le relief dans le temps

RÈGLE : les transitions d'état du relief appartiennent à motion (MOTION-UX) : les couleurs transitionnent ; **les ombres se remplacent instantanément** (jamais de box-shadow interpolé — le soulevé/enfoncé est un changement d'état sec, pas un glissement). Sous `prefers-reduced-motion`, tout est instantané ; l'information (la nature de l'objet) reste — elle est statique par construction.

RÈGLE : le **skeleton n'est jamais en relief** — il occupe l'espace du contenu, il ne promet aucune interaction (inchangé).

## Ce que le relief ne garantit pas

RÈGLE : le relief n'est **jamais le seul signal** (inchangé, étendu) : en `forced-colors`, ombres ET liserés disparaissent — restent la bordure, le focus ring, la sémantique. Le registre relief a l'avantage de reposer d'abord sur des *bordures* (arête = border réel), qui survivent au contraste forcé mieux que les ombres.

RÈGLE : l'élévation — et désormais le liseré — sont **dépendants du thème** (1.1.0, étendu) : un thème redéfinit `elevation.*` et les dérivations de liseré comme il redéfinit `background`.

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Relief sur une surface statique | Affordance mensongère — clic dans le vide | Élevée |
| Relief généralisé (surfaces posées par défaut) | Le signal ne signale plus rien — retour du skeuomorphisme | Élevée |
| Relief comme seul signal | Information perdue en forced-colors | Élevée |
| Enfoncé dérivé du token de survol en sombre | Physique inversée — l'objet monte quand on le presse | Élevée |
| Liseré en anneau uniforme ou blanc pur en sombre | Lumière incohérente, halo criard | Moyenne |
| Deux directions de lumière dans un même écran | Métaphore brisée, lecture ralentie | Moyenne |
| Ombre + surface-contrast cumulés | Deux vocabulaires brouillés | Moyenne |
| Box-shadow interpolé sur les transitions de relief | Paint coûteux, jank | Moyenne |

## Règle transversale

RÈGLE : **le relief dit la nature, jamais l'importance.** Posé = pressable, creusé = remplissable, plat = lisible — et rien d'autre. Un élément important n'est pas plus posé : il est mieux placé, mieux contrasté, mieux nommé.

> **Pourquoi** : c'est la même discipline que "Large ne veut pas dire important" (BUTTON-UX) et "niveau ≠ taille" (TYPOGRAPHY-UX) — chaque canal a son sens propre, l'importance n'en réquisitionne aucun. Le relief rejoint la liste des canaux protégés.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Échelles courtes et sémantiques | [Atlassian — Elevation](https://atlassian.design/foundations/elevation), [Material 3](https://m3.material.io/styles/elevation/overview) | Établi par convergence |
| Les éléments plats à signifiants faibles créent incertitude et coût attentionnel | [NN/g — Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/) | Établi — recherche publiée |
| Affordances perçues : ce qui semble pressable est pressé | Don Norman, *The Design of Everyday Things* (affordances/signifiers) | Référence établie en design |
| Le survol comme élévation des surfaces cliquables | Convention Material/MUI + précédent interne (CARD-UI) | Établi par convergence |
| Dark mode : surfaces éclaircies avec la hauteur | [Material — Dark theme](https://m2.material.io/design/color/dark-theme.html) | Établi par convergence — étendue ici au registre relief entier |
| Grammaire posé / creusé / plat, physique lumière-du-haut, matrice défaut/soulevé/enfoncé | Décision d'identité interne (2026-07-23), maquettes Figma Sibyl 86:129 et 128:136, éprouvée dans l'atelier DS-UI (registre débrayable) | Parti pris d'identité — à éprouver par tests utilisateurs |
| Registre relief débrayable = parti pris paramétrable, pas contrainte | Cadre « contrainte ≠ parti pris » (DECISIONS 2026-07-17) | Décision de méthode interne |

## À approfondir

- **Tokens de relief dans DESIGN.md** : l'implémentation de référence dérive arête et liserés par mélange des tokens de tone (aucune valeur nouvelle) ; l'ombre interne d'enfoncement est la seule valeur candidate à la tokenisation (`elevation.pressed` ?) — à trancher avec un second consommateur.
- **Tests utilisateurs** du registre : la promesse (reconnaissance plus rapide des rôles) est mesurable — protocole en maquette désaturée, avec et sans registre.
- **Expandable et drag & drop** : natures non couvertes par la grammaire (un objet saisi est-il « soulevé » ? Atlassian : raised = déplaçable) — aucun consommateur, noté.
- **Premier consommateur d'`overlay` modal** : échelle z-index et scrim, inchangé.
