---
component: modal
layer: ui
type: component
version: 1.0.1 # 1.0.1 : le verrou de défilement porte sur la région défilante du shell, pas sur le document, et aucun focus ne fait défiler (preventScroll) — correction d'un saut de page observé le 2026-07-26 à la fermeture par clic sur le voile. 1.0.0 : 1.0.0 : première rédaction — mapping tokens de l'implémentation réelle (packages/react/src/components/modal/modal.tsx), livrée le 2026-07-26 avant sa doctrine. Aucun token neuf hormis grid.overlay (DESIGN.md 1.32.0, déjà introduit pour ce composant). Cf. MODAL-UX.md, DECISIONS.md 2026-07-26.
last_updated: 2026-07-26
companion: MODAL-UX.md
confidence: mixed
---

# Modal — Couche UI (tokens)

> Mapping des contextes de `MODAL-UX.md` sur les tokens. Aucune valeur brute : tout référence `DESIGN.md`.
> Modal **consomme** intégralement `OVERLAY-UI.md` (z-index, scrim, ombre, focus) — ce fichier ne fait que
> nommer où et comment.

## Structure (API réelle)

Composé `Modal` = `Modal.Root` (alias `Modal`) + `.Header` + `.Body` + `.Footer` + `.Close`, portés par
`packages/react/src/components/modal/modal.tsx` :

```
<Modal open={open} onClose={onClose} size="narrow" dismissOnScrim>
  <Modal.Header kicker="Optionnel" level={2}>Titre de la modale</Modal.Header>
  <Modal.Body>Contenu, défile seul au-delà de la hauteur disponible</Modal.Body>
  <Modal.Footer>
    <Button variant="stroke" tone="neutral" onClick={onClose}>Annuler</Button>
    <Button variant="filled" tone="destructive">Supprimer</Button>
  </Modal.Footer>
</Modal>
```

RÈGLE : `Header` pose automatiquement `aria-labelledby` sur la surface (`role="dialog"`, `aria-modal="true"`)
via son titre — aucun ID à câbler à la main. Sans `Header`, passer `aria-label` sur `Modal`.

## Props

| Prop | Rôle | Défaut |
|---|---|---|
| `open` | Monte/démonte la modale (portail vers `document.body`) | requis |
| `onClose` | Appelé par Échap, la croix, et le clic-voile (si actif) | requis |
| `size` | `narrow` (`grid.container-narrow`) ou `default` (`grid.overlay`) | `narrow` |
| `dismissOnScrim` | Clic sur le voile = fermeture | `true` |
| `Header.closable` | Affiche `Modal.Close` dans l'en-tête | `true` |
| `Header.level` | Niveau de titre (`h2`/`h3`/`h4`) | `2` |

## Largeur — deux crans GRID, jamais un de plus

RÈGLE : `size="narrow"` applique `max-width: grid.container-narrow` (480) — la modale de confirmation et de
saisie courte. `size="default"` applique `max-width: grid.overlay` (640) — la modale de détail, d'illustration
ou de tableau court. Aucun autre cran : au-delà, `MODAL-UX.md` renvoie à une page.

## Voile, empilement, ombre

RÈGLE : le voile applique `overlay.scrim` en `position: fixed`, inset 0, rendu **avant** la surface dans le
DOM (donc derrière) — les deux partagent `z-index.overlay`, hérité tel quel d'`OVERLAY-UI.md`. La surface
porte `elevation.overlay` (jamais `elevation.raised`), un rayon `radius.md`, un fond `background`, une
bordure `border-border`.

## Focus, scroll-lock, inertie (état réel de l'implémentation)

RÈGLE : à l'ouverture, le focus **entre** dans la surface (premier élément `FOCUSABLE`, sinon la surface
elle-même via `tabindex=-1`) ; Tab/Maj+Tab **bouclent** entre le premier et le dernier élément focalisable
(piège manuel, géré par le gestionnaire `onKeyDown`) ; à la fermeture, le focus **revient** à
`document.activeElement` capturé à l'ouverture. Le défilement du `body` est verrouillé (`overflow: hidden`)
tant que `open` est vrai, et restauré à la fermeture.

RÈGLE : le ring de focus interne d'un contrôle dans la modale reste `border.focus-width` /
`border.focus-offset` — le composant ne le redéfinit à aucun endroit ; `Modal.Close` applique le même contrat
(`focus-visible:outline` en `border.focus-width`, décalage `border.focus-offset`).

**Limite assumée (identique au Drawer)** : le fond n'est **pas** mis `inert` — faute de référence à la racine
applicative dans ce package, l'inertie est **approchée** par la combinaison scrim + piège de focus manuel +
`aria-modal="true"`, pas par l'attribut `inert` natif. Un lecteur d'écran naviguant en mode « lecture »
(virtual cursor) plutôt qu'en interaction directe peut donc atteindre le fond. C'est un écart documenté à
`OVERLAY-UX.md` (qui prescrit `inert`), pas un oubli silencieux — même réserve que le composant Drawer.

## Fermeture

RÈGLE : trois déclencheurs appellent `onClose` — la touche `Escape`, `Modal.Close` (croix par défaut de
`Header`, `aria-label="Fermer"` si aucun enfant), et le clic sur le voile **si** `dismissOnScrim` est `true`
(défaut). Passer `dismissOnScrim={false}` désarme uniquement le troisième — Échap et la croix restent actifs
dans tous les cas (cf. `MODAL-UX.md` § La fermeture).

## Mouvement

RÈGLE : l'entrée/sortie de la surface anime `opacity` + `translate-y` sur `motion.slow` (`ease-out`) — cran
« grande surface » d'`OVERLAY-UI.md`. Le voile anime son `opacity` sur la même durée. Les deux respectent
`motion-reduce:transition-none` (`prefers-reduced-motion`), qui coupe la transition, pas l'état final.

## Frontières

RÈGLE : aucune couleur, rayon, ombre, durée ou largeur codés en dur — tout référence `z-index.overlay`,
`overlay.scrim`, `elevation.overlay`, `radius.md`, `border.focus-width`/`border.focus-offset`,
`motion.slow`, `grid.container-narrow`, `grid.overlay`, l'espacement `space.*` (padding `lg`/`md`/`sm` du
`Header`/`Body`/`Footer`). Le `Footer` applique un séparateur `border-border` en trait supérieur — l'espace
d'abord, le trait en dernier recours (renvoi SPACING/BORDER, même garde-fou qu'Accordion).


## Verrou de défilement dans un shell (précision 1.0.1)

RÈGLE : le verrou porte sur **la région qui défile réellement**, pas sur le document. Dans un shell
applicatif, `document.body` ne défile pas : c'est le `<main>` de l'AppLayout qui porte
`overflow-y: auto`. Verrouiller le body seul ne verrouille rien. L'implémentation verrouille le body
**et chaque ancêtre défilant du déclencheur** (`lib/scroll-lock.ts`), et restaure l'état d'origine à la
fermeture.

RÈGLE : aucun `focus()` d'un superposé ne fait défiler quoi que ce soit — entrée du focus comme retour
au déclencheur utilisent `{ preventScroll: true }`. Le déclencheur est déjà à sa place puisque le fond
n'a pas bougé ; laisser le navigateur « révéler » la cible produit un saut visible.

> **Erreur fréquente** : `document.body.style.overflow = "hidden"` recopié depuis un exemple de page
> classique. Dans une app à régions, c'est un verrou qui ne verrouille pas — le fond glisse sous la
> modale, et le retour du focus ramène l'utilisateur ailleurs qu'où il avait cliqué.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Voile `overlay.scrim` sous la surface, même couche `z-index.overlay` | `OVERLAY-UI.md`, [ARIA APG — Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Établi |
| Ombre `elevation.overlay`, jamais `raised` | `OVERLAY-UI.md`, renvoi ELEVATION | Établi |
| Piège de focus manuel + `aria-modal` en l'absence d'`inert` natif est une approximation acceptable, pas une conformité totale | [ARIA APG — Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) (prescrit `inert`/`aria-hidden` du fond) | Cas isolé — écart documenté, à combler si une racine applicative devient disponible |
| Deux crans de largeur (`grid.container-narrow` 480 / `grid.overlay` 640) | Arbitrage interne, `DESIGN.md` 1.32.0, `DECISIONS.md` 2026-07-26 | Non formalisé — arbitrage à remonter si un troisième cran est demandé |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence avec `OVERLAY-UI.md` et l'implémentation réelle de `modal.tsx`).*
