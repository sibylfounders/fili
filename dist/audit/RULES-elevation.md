---
sujet: elevation
nature: foundations
resume: "Ce fichier contient le raisonnement : ce que la profondeur *signifie*, quand le relief est un signal et quand il est du bruit."
selon-contexte: [alert, button, card, input, interaction, motion, toast, typography]
source: ELEVATION-UX.md v2.0.0 + ELEVATION-UI.md v2.0.0
empreinte: sha256:86b141546e18722c
regles: {loi: 0, preference: 0, non_qualifie: 18}
---
# RULES — elevation (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** l'élévation est une **fondation** — pas d'axes, pas d'assemblage : une contrainte transversale. Particularité de trajectoire : ses tokens sont nés *avant* sa doctrine (créés en DESIGN.md 1.2.0 pour la card) ; la 2.0.0 élargit la doctrine de l'**ombre** au **relief** entier (ombre + arête + liseré), après que l'implémentation de référence (atelier DS-UI) en a éprouvé la grammaire.
- **[non qualifié]** l'élévation porte une seule fonction — **dire à quelle couche du flux un élément appartient** :
- **[non qualifié]** le relief est la **matérialité retrouvée de la fonction** : un objet qui dépasse de la page appelle le doigt ; un creux appelle un contenu ; une surface plate se lit sans rien promettre. Le flat design a uniformisé ces trois natures en une seule — le système les redistingue.
- **[non qualifié]** **grammaire à trois natures** — à la création de tout composant, chaque surface est classée :
- **[non qualifié]** **le relief suit la fonction, jamais la décoration.** Le test reste celui du langage d'interaction (INTERACTION-UX, matérialité fonctionnelle) : manipulable ? reçoit ? organise ? couche temporaire ? état changé ? — un effet qui ne répond à aucune question est décoratif, donc banni. La grammaire ne crée pas un droit à l'effet ; elle nomme les trois seules réponses admises.
- **[non qualifié]** **statut de frontière — parti pris d'identité, paramétrable.** Le registre Relief est débrayable (l'implémentation de référence l'expose comme un réglage de thème) : un consommateur peut le désactiver et retomber sur le registre plat intégral (doctrine 1.x, conservée ci-dessous). En audit d'une interface tierce, l'absence de relief n'est jamais une non-conformité ; l'affordance mensongère (relief sur du statique) en est une.
- **[non qualifié]** **la lumière vient du haut, pour tout le monde.** Un objet posé porte une arête externe sombre, un liseré interne clair *en haut qui fond vers sa couleur en bas* (jamais un anneau uniforme — la lumière ne cercle pas), et l'ombre de repos `raised`. Un creux porte une ombre interne haute. Une seule source de lumière dans tout le produit ; deux objets éclairés de deux directions sont un bug de physique.
- **[non qualifié]** **matrice d'états des objets posés** — trois états, une seule métaphore :
- **[non qualifié]** **en thème sombre, la physique tient, les valeurs changent.** La convention « les surfaces s'éclaircissent avec la hauteur » (1.1.0) s'applique au registre entier : le soulevé s'éclaircit aussi en sombre ; l'enfoncé se dérive *vers le noir* — jamais via le token de survol, qui s'éclaircit en sombre et inverserait la physique (un bouton qui *monte* quand on le presse). Le liseré s'exprime dans la gamme de l'objet, jamais en blanc pur.
- **[non qualifié]** les surfaces restent gouvernées par la doctrine 1.x, **inchangée** : le repos d'une *surface* est à plat ; `raised` reste le retour de survol des surfaces **cliquables** uniquement (card clickable — et en registre relief, ce survol porte aussi l'arête et le liseré, qui apparaissent et disparaissent *avec* lui) ; une surface statique ne réagit jamais.
- **[non qualifié]** **mise en avant ≠ élévation**, inchangé : `surface-contrast` met en avant par le fond, sans ombre (non-cumul). Et **l'importance ne réquisitionne pas le relief** : un bouton primaire n'est pas plus posé qu'un bouton neutre — la hiérarchie passe par style × tone (BUTTON-UX), le relief dit la nature, pas le rang.
- **[non qualifié]** trois niveaux d'ombre, inchangés. Le relief n'ajoute **aucun niveau** : il compose les niveaux existants avec l'arête et le liseré (fondation border : le containment passe par la bordure). L'ombre interne d'enfoncement est un état, pas un palier — elle n'entre pas dans l'échelle.
- **[non qualifié]** les ombres restent **teintées** (base `text-primary`, jamais noir pur) et se distinguent par la *portée*, pas par l'opacité seule.
- **[non qualifié]** les transitions d'état du relief appartiennent à motion (MOTION-UX) : les couleurs transitionnent ; **les ombres se remplacent instantanément** (jamais de box-shadow interpolé — le soulevé/enfoncé est un changement d'état sec, pas un glissement). Sous `prefers-reduced-motion`, tout est instantané ; l'information (la nature de l'objet) reste — elle est statique par construction.
- **[non qualifié]** le **skeleton n'est jamais en relief** — il occupe l'espace du contenu, il ne promet aucune interaction (inchangé).
- **[non qualifié]** le relief n'est **jamais le seul signal** (inchangé, étendu) : en `forced-colors`, ombres ET liserés disparaissent — restent la bordure, le focus ring, la sémantique. Le registre relief a l'avantage de reposer d'abord sur des *bordures* (arête = border réel), qui survivent au contraste forcé mieux que les ombres.
- **[non qualifié]** l'élévation — et désormais le liseré — sont **dépendants du thème** (1.1.0, étendu) : un thème redéfinit `elevation.*` et les dérivations de liseré comme il redéfinit `background`.
- **[non qualifié]** **le relief dit la nature, jamais l'importance.** Posé = pressable, creusé = remplissable, plat = lisible — et rien d'autre. Un élément important n'est pas plus posé : il est mieux placé, mieux contrasté, mieux nommé.

## Non couvert — poser la question, ne rien trancher

- Empilement de superpositions : Une modale contient un popover.
- Élévation pendant un drag : On soulève une carte pendant un glisser-déposer.
- Mode sombre : L'interface passe en sombre.
- z-index anarchique : Les z-index se battent sans échelle.
