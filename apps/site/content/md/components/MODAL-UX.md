---
component: modal
layer: ux
type: component
version: 1.0.0 # 1.0.0 : première rédaction — la doctrine rattrape le composant. Modal est entré au catalogue le 2026-07-26 (site de doctrine, détail d'un cas d'usage) en appliquant OVERLAY-UX/UI à la lettre ; l'inventaire overlay le déclarait « couvert (mécanique posée), composant différé », le différé s'arrête ici (cf. DECISIONS.md 2026-07-26, entrée « MODAL / TABS »). Périmètre arbitré : confirmation d'action, saisie courte, détail/lecture ; formulaire long et wizard multi-étapes renvoyés à une page dédiée.
last_updated: 2026-07-26
companion: MODAL-UI.md
confidence: mixed # la mécanique héritée d'OVERLAY-UX (scrim, piège de focus, Échap, retour au déclencheur, scroll-lock) est établie (ARIA APG Dialog Modal, WCAG) ; le seuil de légitimité et « une seule modale à la fois » sont établis par convergence (NN/g, Material, Carbon) ; les deux crans de largeur sont un arbitrage interne daté 2026-07-26.
---

# Modal — Couche UX (composant)

> La modale est le superposé qui **interrompt** : elle bloque le flux, réclame une décision ou une saisie
> courte, et rend la main une fois la question réglée. `OVERLAY-UX.md` a déjà tranché toute sa mécanique
> (modal vs non-modal, z-index, scrim, focus, scroll-lock) — cette fiche ne la rouvre pas, elle **spécialise**
> la branche « modale/dialog » de cette fondation : quand l'ouvrir, comment la peupler, comment la fermer.

## Nature et périmètre

RÈGLE : une modale est un `dialog` **modal** et **centré** — la seconde forme de superposé modal après le
Drawer (`OVERLAY-UX.md`, ligne « Modal vs non-modal »), qui partage tout : scrim, piège de focus, Échap,
retour au déclencheur, verrouillage du défilement. Ce qui la distingue du Drawer est seulement l'**ancrage**
(centré vs bord) — jamais réinventé ici (cf. « Frontière avec Drawer » plus bas).

RÈGLE : une modale porte toujours une **conclusion** — une action qui la ferme légitimement (valider, annuler,
fermer une fois lu). Un contenu sans fin naturelle (navigation libre, exploration longue) n'est pas un cas de
modale ; c'est une page.

## Légitimité — quand une modale, et quand autre chose

RÈGLE : une modale est légitime quand trois conditions tiennent à la fois : (1) l'interruption est **courte**
(quelques secondes de lecture ou de saisie, pas une tâche) ; (2) une **décision** doit être prise avant de
pouvoir continuer ailleurs ; (3) le **contexte d'origine compte** — l'utilisateur doit revenir exactement où
il était, ce qu'une navigation vers une page dédiée casserait.

| Besoin réel | Solution | Pourquoi pas la modale |
|---|---|---|
| Contenu long, autonome, partageable par URL | **Page dédiée** | Une modale n'a pas d'URL propre, ne se marque pas, ne s'indexe pas |
| Contenu lié au contexte mais volumineux ou multi-étapes | **Drawer** | Le défilement long et l'aller-retour répété usent moins ancrés au bord que centrés |
| Édition d'un seul champ visible dans son contexte | **Saisie en ligne (inline)** | La modale masque justement le contexte qu'il faut voir pour éditer |
| Information qui n'exige aucune décision immédiate | **Toast / Alert** | Rien à interrompre — cf. « Frontière avec Toast et Alert » |
| Aide ponctuelle, ancrée à un élément précis | **Popover** | Non-modal, léger, n'a pas besoin de piéger le focus pour un détail court |

> **Pourquoi ce triple test** : chacune des trois conditions, prise seule, ouvre trop de portes — beaucoup de
> contenus sont courts sans réclamer de décision (un tooltip l'est aussi), beaucoup réclament une décision
> sans être courts (un formulaire d'inscription l'est aussi). C'est la conjonction qui définit la modale.
>
> **Erreur fréquente** : ouvrir une modale pour un formulaire de 12 champs parce que « ça évite de changer de
> page ». Le défilement interne d'une modale (cf. plus bas) n'est pas fait pour porter un formulaire long — il
> est fait pour de la lecture. Un formulaire long est une page ; au pire, un drawer.

## Le coût d'interruption — une seule modale, jamais de modale sur modale

RÈGLE : **une seule modale ouverte à la fois**. Une modale ouverte depuis une modale est interdite — pas
d'empilement, pas de `z-index.overlay` sur `z-index.overlay`.

RÈGLE : quand une action dans une modale a elle-même besoin d'une confirmation (ex. supprimer un élément
depuis une modale d'édition), la modale existante **remplace son propre contenu** par l'étape de confirmation
— elle ne s'empile pas une seconde. Fermer d'abord puis rouvrir est acceptable seulement si le contexte du
retour n'a pas besoin d'être préservé.

> **Pourquoi** : deux modales ouvertes posent deux pièges de focus concurrents et deux voiles superposés —
> Échap et Tab n'ont plus de destinataire non ambigu (ni ARIA APG ni aucun système majeur ne documente de
> comportement correct pour ce cas, cf. table de sources). Le voile d'une seconde modale sur la première rend
> aussi la première illisible sans la fermer, ce qui contredit sa propre raison d'être.
>
> **Erreur fréquente** : une modale de confirmation « Voulez-vous vraiment quitter sans enregistrer ? »
> ouverte par-dessus une modale de formulaire. La bonne forme est un remplacement de contenu dans la même
> surface, pas une seconde surface.

## Les trois familles d'usage

RÈGLE : trois familles couvrent l'usage légitime de la modale, et rien d'autre n'en justifie une quatrième
sans remonter l'arbitrage.

| Famille | Contenu | Largeur | Actions |
|---|---|---|---|
| **Confirmation d'action** | Une question fermée, sa conséquence en une ou deux phrases | `grid.container-narrow` (`size="narrow"`) | Deux boutons : l'action et son retrait — jamais plus |
| **Saisie courte** | Un à trois champs qui n'ont pas besoin de tout l'écran | `grid.container-narrow` (`size="narrow"`) | Valider / Annuler — le nom du bouton reflète la conclusion (renvoi BUTTON-UX) |
| **Détail / lecture** | Une fiche, un aperçu, un tableau court, une illustration | `grid.overlay` (`size="default"`) | Zéro à une action ; souvent un simple bouton de fermeture |

RÈGLE : la largeur suit la famille, pas l'inverse — une confirmation reste sur `narrow` même si son texte
d'explication est long (le contenu se replie en lignes, il ne pousse jamais le cran de largeur).

> **Pourquoi seulement deux crans** : `DECISIONS.md` (2026-07-26) l'a tranché lors de la création de
> `grid.overlay` — 480 couvre déjà la confirmation, 640 couvre l'illustration ou le tableau court, et au-delà
> le contenu appelle une page. CONFIANCE : les deux crans eux-mêmes (480/640) sont un arbitrage interne
> ajustable ; ce qui est établi, c'est qu'une modale plus large qu'une page de contenu n'a plus de sens.

## La destruction — confirmer une action irréversible

RÈGLE : toute action destructive et irréversible se confirme dans une modale de la famille « confirmation »
(jamais une simple alerte inline, jamais un `window.confirm`) — dès lors que le critère de friction de
`BUTTON-UX.md` (§ Quel palier choisir) place l'action au-delà du « triviale à recréer, undo suffisant ».

RÈGLE : le **titre et le corps nomment l'objet réel**, jamais un « Confirmer » générique — « Supprimer le
projet *Rocket* ? », pas « Êtes-vous sûr ? ». Le corps précise la conséquence en une phrase quand elle n'est
pas évidente (« Cette action est définitive » ; « Les 12 membres perdront l'accès »).

RÈGLE : le bouton destructif porte `filled` + `destructive` (renvoi `BUTTON-UX.md`) et se positionne selon la
convention de paire modale du produit — jamais réinventée modale par modale (renvoi `BUTTON-UX.md` § Dans une
modale). Il **n'est jamais le bouton par défaut activable par un simple Entrée réflexe** (même renvoi) :
l'action sûre (Annuler/Retour) peut recevoir le focus initial, ou aucune action n'est pré-activée par Entrée.

RÈGLE : pour une destruction à enjeu élevé (volume important, coûteuse à recréer), la modale porte la
confirmation différée que `BUTTON-UX.md` décrit (délai avant activation, ou saisie explicite type « tapez
SUPPRIMER ») — la modale ne fait qu'héberger ce mécanisme, elle ne le redéfinit pas.

> **Pourquoi nommer l'objet** : « Êtes-vous sûr ? » force une seconde lecture pour retrouver de quoi il est
> question ; la question qui se suffit à elle-même réduit l'erreur de clic sur le mauvais élément.
>
> **Erreur fréquente** : une modale de confirmation dont le bouton par défaut (focus initial + Entrée) est
> l'action destructive elle-même — un utilisateur clavier qui ferme vite d'un réflexe Entrée exécute alors
> l'irréversible.

## La fermeture — Échap, croix, clic-voile, et son désarmement

RÈGLE : trois sorties toujours actives, héritées d'`OVERLAY-UX.md` sans exception : **Échap**, la **croix** du
`Header` (`Modal.Close`), et le **clic sur le voile** (équivalent d'une annulation). Une modale de type
« détail/lecture » sans action de fond n'a besoin d'aucune autre sortie.

RÈGLE : le clic-voile se **désarme** (`dismissOnScrim={false}`) quand une fermeture accidentelle perdrait une
saisie en cours — un formulaire touché, un champ modifié. Échap et la croix restent actifs dans ce cas ; c'est
au consommateur du composant de router ces deux sorties vers une confirmation de perte de données s'il le
juge nécessaire (le composant Modal ne l'implémente pas nativement, cf. `MODAL-UI.md` § Limites).

> **Pourquoi désarmer seulement le voile** : le clic-voile est le geste le plus « accidentel » des trois — un
> clic hors-cible pendant qu'on lit l'écran. Échap et la croix sont des gestes intentionnels ; les priver de
> sortie recréerait le piège que WCAG 2.1.2 exclut (cf. `OVERLAY-UX.md`).
>
> **Erreur fréquente** : désarmer les trois sorties « pour protéger la saisie ». Une modale sans aucune issue
> visible ou clavier est un piège plein, pas une protection — la bonne réponse à une saisie en cours est de
> confirmer la perte, pas d'interdire la sortie.

## Le titre obligatoire et le nom accessible

RÈGLE : toute modale a un **titre** — le `Modal.Header` le porte, et devient le **nom accessible** de la
surface (`aria-labelledby` posé automatiquement sur le `role="dialog"`). Une modale sans `Header` doit
recevoir un `aria-label` explicite ; l'absence des deux est une régression silencieuse (le lecteur d'écran
annonce « boîte de dialogue » sans complément).

RÈGLE : le titre **nomme la tâche ou la question**, jamais l'objet générique du composant (« Confirmation »
plutôt que « Supprimer le projet Rocket ? » est la même erreur qu'un bouton « Confirmer » — cf. § Destruction).

## Le focus — entrée, piège, retour

RÈGLE : la modale applique le contrat de focus d'`OVERLAY-UX.md` sans variation : à l'ouverture, le focus
**entre** dans la surface (premier élément focalisable, sinon la surface elle-même) ; Tab/Maj+Tab **bouclent**
à l'intérieur ; à la fermeture, le focus **revient** au déclencheur (ou à l'élément le plus proche s'il a
disparu). Le ring de focus interne reste celui de `border.focus-width`/`border.focus-offset` — la modale ne
le redéfinit pas.

RÈGLE : un `Header` avec `closable` (par défaut) place la **croix** en dernier élément focalisable naturel de
l'en-tête ; elle ne doit jamais précéder le contenu principal dans l'ordre de tabulation d'une modale de
saisie (le premier champ reçoit le focus d'entrée, pas la croix).

## Le contenu long — défilement interne

RÈGLE : au-delà de la hauteur disponible, seul le `Body` défile — jamais la page derrière (déjà verrouillée
par `OVERLAY-UX.md`), jamais la surface entière (`Header` et `Footer` restent fixes, ancrés en haut et en
bas). Une modale de détail/lecture avec un contenu long est le cas d'usage qui exerce cette règle le plus.

RÈGLE : un `Footer` d'actions reste **visible sans défiler** — jamais relégué en bas d'un contenu qui déborde,
sous peine de rendre l'action principale introuvable dans une modale longue.

> **Pourquoi le défilement se limite au `Body`** : une modale qui laisse défiler toute sa surface perd son
> titre et ses actions hors champ, exactement le problème qu'une page évite avec un en-tête sticky. Border et
> footer fixes sont ce qui distingue une « boîte » d'une simple page réduite en fenêtre.

## Frontière avec Drawer

RÈGLE : Modal et Drawer partagent **toute** la mécanique modale d'`OVERLAY-UX.md` (scrim, piège, Échap,
retour, scroll-lock, `z-index.overlay`) — ils divergent sur un seul axe, l'**ancrage** : la modale est
**centrée**, le drawer est **ancré à un bord**. Le choix entre les deux se fait sur la nature du contenu, pas
sur une préférence esthétique : un contenu qui se prête à un défilement vertical long ou à une navigation
interne (liste de réglages, panneau de filtres) va au drawer ; une question fermée ou une fiche courte va à
la modale.

## Frontière avec Toast et Alert

RÈGLE : Toast et Alert **n'interrompent pas** — non-modaux (toast) ou dans le flux (alert), ils ne posent
jamais de scrim, ne piègent jamais le focus, et l'utilisateur reste libre d'agir autour d'eux. La modale ne
concurrence jamais leur rôle : une information qui ne réclame **aucune décision immédiate** (succès, erreur
non bloquante, mise à jour de statut) est un toast ou une alerte inline, jamais une modale.

> **Erreur fréquente** : ouvrir une modale « Enregistré avec succès » avec un unique bouton OK. Rien à
> décider ici — c'est un toast.

## Frontières (ce que ce composant ne fait pas)

RÈGLE : le **scrim**, le **z-index**, le **piège de focus**, le **scroll-lock** restent la propriété
d'`OVERLAY-UX.md` — Modal les consomme, ne les redéfinit pas. L'**ombre** de la surface reste
`elevation.overlay` (ELEVATION), le **ring de focus** reste BORDER, les **durées/courbes** restent MOTION, le
**wording** des titres et boutons reste VOICE, la structure d'un formulaire porté par une modale de saisie
reste `FORM-UX.md`, l'emphase et l'ordre des boutons de son `Footer` restent `BUTTON-UX.md`.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Toute la mécanique modale (scrim, piège de focus, Échap, retour au déclencheur, fond inerte, scroll-lock) | [ARIA APG — Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) ; renvoi `OVERLAY-UX.md` | Établi |
| Le piège modal est admis car Échap fournit la sortie clavier | [WCAG 2.1.2 — No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | Établi |
| Une seule modale à la fois, jamais de modale sur modale | Convergence — aucun motif d'empilement modal documenté par [ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [NN/g — Modal & Nonmodal Dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/) | Établi par convergence |
| Trois conditions de légitimité (court, décision requise, contexte préservé) vs page/drawer/inline/toast | [NN/g — Modal & Nonmodal Dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/), [Carbon — Modal usage](https://carbondesignsystem.com/components/modal/usage/) | Établi par convergence |
| Nommer l'objet dans le titre/le corps plutôt que « Confirmer » ; ne jamais mettre l'action destructive par défaut au clavier | [Nielsen — Confirmation Dialogs](https://www.nngroup.com/articles/confirmation-dialog/), renvoi `BUTTON-UX.md` | Établi par convergence |
| Palier de friction avant confirmation (undo / confirmation simple / confirmation différée) selon le coût de recréation | [Carbon — Delete/Remove pattern](https://carbondesignsystem.com/patterns/delete-and-remove-pattern/), renvoi `BUTTON-UX.md` | Établi |
| Défilement limité au `Body`, `Header`/`Footer` fixes | [Material — Dialogs](https://m3.material.io/components/dialogs/guidelines), [Polaris — Modal](https://polaris.shopify.com/components/overlays/modal) | Établi par convergence |
| Deux crans de largeur exacts (`container-narrow` 480 / `grid.overlay` 640) | Arbitrage interne, `DECISIONS.md` 2026-07-26 | Non formalisé — arbitrage à remonter si un troisième cran est demandé |
| Désarmement du clic-voile en cas de saisie non enregistrée, sans confirmation de sortie native | Cas isolé — raisonnement de mécanisme interne, pas de motif externe consulté | Cas isolé |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec `OVERLAY-UX.md` et les fondations voisines).*
