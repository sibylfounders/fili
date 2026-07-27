---
component: overlay
layer: ux
type: foundation
version: 1.0.0 # 1.0.0 : première rédaction — fondation née du besoin prouvé « off-canvas du shell » (AppShell, 2026-07-24) et de la case réservée par ELEVATION (« premier consommateur d'overlay modal : échelle z-index et scrim ») et déléguée par ACCESSIBILITY (« ordre et absence de piège au futur composant modal »). Périmètre arbitré : fondation overlay + Drawer ; modale/popover/dropdown/tooltip mappés, différés. Cf. DECISIONS.md 2026-07-24.
last_updated: 2026-07-24
companion: OVERLAY-UI.md
confidence: mixed # la mécanique modale (piège de focus, Échap, retour au déclencheur, fond inerte) est établie (ARIA APG dialog, WCAG) ; l'ordre des couches z-index est établi par convergence ; le nombre de crans et les valeurs exactes sont un arbitrage interne.
---

# Overlay — Couche UX (fondation)

> Cette fondation porte la **couche au-dessus du flux** : ce qui recouvre le contenu au lieu de s'y insérer.
> Elle ne dessine aucun composant ; elle pose la mécanique que **drawer, modale, popover, dropdown, tooltip**
> (et le toast existant) partagent : ordre d'empilement, voile, gestion du focus, verrouillage du défilement,
> inertie du fond, fermeture. ELEVATION avait déjà nommé cette couche (« au-dessus du flux — toast, modale,
> popover, menu ») et lui réservait « l'échelle z-index et le scrim » ; ACCESSIBILITY lui déléguait « l'ordre
> et l'absence de piège » de focus. Cette fondation remplit ces deux cases.

## Note de transposition — ce que la fondation est, et n'est pas

RÈGLE : `overlay` est une **fondation sans axes** (ni style/tone/size) — une propriété transversale, pas un
composant. Elle **possède** : l'échelle `z-index`, le token `overlay.scrim`, le contrat de focus en
superposition (piège, retour), le verrouillage du défilement, l'inertie du fond, les patterns de fermeture.
Elle **délègue** : l'**ombre** d'un superposé à ELEVATION (`elevation.overlay`), le **focus ring** à BORDER,
les **durées/courbes** d'entrée-sortie à MOTION, le **wording** d'un titre à VOICE, l'**ordre de focus
général** à ACCESSIBILITY (qui, elle, lui a délégué le seul piège en superposition).

## La distinction fondatrice : modal vs non-modal

RÈGLE : tout superposé est **modal** ou **non-modal**, et ce choix détermine toute sa mécanique.

| | **Modal** | **Non-modal** |
|---|---|---|
| Exemples | modale/dialog, **drawer / off-canvas** | popover, dropdown/menu, tooltip (+ toast, existant) |
| Voile (scrim) | oui | non |
| Focus | **piégé** dans le superposé ; fond **inerte** | libre ; fond actif |
| Fermeture | Échap + bouton ; retour du focus au déclencheur | **light-dismiss** (Échap OU clic/focus dehors) |
| Défilement du fond | **verrouillé** | libre |
| Ancrage | centré (modale) ou bord (drawer) | **ancré au déclencheur** |

> **Pourquoi cette ligne d'abord** : elle décide du scrim, du piège, du scroll-lock et de l'inertie d'un coup.
> Un superposé mal rangé (une modale sans piège, un popover avec scrim) trahit l'attente de l'utilisateur.

## Ordre d'empilement (z-index)

RÈGLE : tout superposé référence un cran de `z-index` — jamais un entier codé en dur. Cinq couches, dans
cet ordre : `z-index.sticky` (collant dans le flux) < `z-index.overlay` (modal : scrim + surface) <
`z-index.popover` (non-modal ancré) < `z-index.toast` < `z-index.tooltip`.

> **Pourquoi popover AU-DESSUS de overlay** : un menu ou un tooltip ouvert *depuis* une modale doit passer
> au-dessus d'elle (règle APG). **Pourquoi le tooltip tout en haut** : un libellé au survol ne doit jamais
> être masqué. CONFIANCE : l'ordre est établi par convergence (Bootstrap/Material/Microsoft) ; le nombre de
> crans (cinq) est un arbitrage interne compact.

## Voile (scrim)

RÈGLE : un superposé **modal** pose un **voile** `overlay.scrim` entre le fond et sa surface — il assombrit
le contenu inerte et concentre l'attention. Un superposé **non-modal n'a jamais de voile**. Le scrim partage
la couche `z-index.overlay` (rendu derrière la surface par ordre du DOM), il n'ajoute pas de cran.

RÈGLE : un clic sur le voile **ferme** le superposé modal (équivalent d'une annulation) — cohérent avec le
light-dismiss du non-modal, sauf quand une perte de saisie est en jeu (le propriétaire du superposé décide
alors de confirmer avant de fermer).

## Focus et clavier

RÈGLE (**modal**) : à l'ouverture, le focus **entre** dans le superposé (premier élément focalisable, ou la
surface avec `tabindex=-1`) ; **Tab / Maj+Tab bouclent** à l'intérieur (piège) ; le fond est **inerte**
(`aria-modal` / `inert`, non atteignable au clavier ni au lecteur d'écran) ; **Échap ferme** ; à la
fermeture, le focus **revient au déclencheur** (ou à l'élément qui a le plus de sens si le déclencheur a
disparu). Source : ARIA APG, motif *Dialog (Modal)*.

> **Pourquoi le piège est admis** malgré WCAG 2.1.2 (« pas de piège au clavier ») : le critère exige un moyen
> de sortie au clavier ; **Échap est ce moyen**. Le piège modal, échappable, est le motif accepté — pas une
> violation.

RÈGLE (**non-modal**) : **pas de piège**, le fond reste actif ; le superposé se ferme en **light-dismiss**
(Échap OU clic/focus en dehors) et rend le focus au déclencheur ; il reste **ancré** au déclencheur.

## Défilement et inertie du fond

RÈGLE : un superposé **modal verrouille le défilement** du fond tant qu'il est ouvert (le fond ne bouge pas
sous le superposé) et rend le fond **inerte**. Un superposé **non-modal ne verrouille rien** et ne rend rien
inerte : la page vit normalement autour de lui.

## Mouvement

RÈGLE : l'entrée et la sortie d'un superposé utilisent les durées/courbes de MOTION (une grande surface
relève de `motion.slow`) et **respectent `prefers-reduced-motion`** (apparition sans glissement si réduit).
L'ombre suit `elevation.overlay` — animée en opacité, jamais en `box-shadow` interpolé (règle ELEVATION).

## Frontières (ce que la fondation ne fait pas)

RÈGLE : l'**ombre** d'un superposé est `elevation.overlay` — overlay la **consomme**, ne la redéfinit pas.
Le **focus ring** reste BORDER ; l'**ordre de focus général** et « la cible focalisée n'est jamais masquée »
restent ACCESSIBILITY/BORDER — overlay ne possède que le **piège en superposition** délégué. Le **toast**
(composant existant) garde ses propres règles (empilement FIFO, auto-dismiss) ; overlay ne lui apporte que le
cran `z-index.toast`. Le **wording** d'un titre de modale reste VOICE.

## Sources et niveau de confiance (couche UX)
| Affirmation | Source | Confiance |
|---|---|---|
| Focus modal : entre à l'ouverture, piège Tab/Maj+Tab, Échap ferme, retour au déclencheur, fond inerte | [ARIA APG — Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Établi |
| Le piège modal est admis car Échap fournit la sortie clavier | [WCAG 2.1.2 — No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | Établi |
| Ordre des couches z-index (sticky < overlay/backdrop < popover < tooltip < toast) | [Material Style — Z-index](https://materialstyle.github.io/materialstyle/3.1/layout/z-index/), [Microsoft Atlas — Z-index](https://design.learn.microsoft.com/tokens/z-index.html) | Établi par convergence |
| Popover/menu/tooltip non-modaux, ancrés au déclencheur, light-dismiss | [Carbon — Popover](https://carbondesignsystem.com/components/popover/usage/) | Établi |
| Nombre de crans (cinq), valeurs exactes, opacité du scrim (50 %) | Arbitrage interne au produit | Non formalisé — à éprouver |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence interne, ergonomie).*
