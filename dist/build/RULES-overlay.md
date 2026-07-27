---
sujet: overlay
nature: foundations
resume: "Cette fondation porte la **couche au-dessus du flux** : ce qui recouvre le contenu au lieu de s'y insérer."
selon-contexte: []
source: OVERLAY-UX.md v1.0.0 + OVERLAY-UI.md v1.0.0
empreinte: sha256:767b9d6a8bef58d3
regles: {loi: 6, preference: 8, non_qualifie: 0}
---
# RULES — overlay (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Tout superposé est soit modal, soit non-modal, et ce choix détermine l'intégralité de sa mécanique : présence d'un voile, piège de focus, inertie du fond, verrouillage du défilement, mode de fermeture et ancrage. `OVERLAY-R02`
- **[préférence]** Tout superposé applique un cran de l'échelle z-index du système plutôt qu'un entier codé en dur, dans l'ordre sticky < overlay (modal) < popover (non-modal ancré) < toast < tooltip. `OVERLAY-R03`
- **[loi]** Un superposé modal pose un voile entre le contenu devenu inerte et sa surface ; un superposé non-modal n'en pose jamais. Le voile partage la couche z-index du superposé et est rendu derrière sa surface. `OVERLAY-R04`
- **[préférence]** Un clic sur le voile ferme le superposé modal comme le ferait une annulation, sauf lorsqu'une perte de saisie est en jeu : le propriétaire du superposé demande alors confirmation avant de fermer. `OVERLAY-R05`
- **[loi]** À l'ouverture d'un superposé modal, le focus entre dans le superposé ; Tab et Maj+Tab bouclent à l'intérieur ; le fond est inerte, inatteignable au clavier comme au lecteur d'écran ; Échap ferme ; à la fermeture, le focus revient au déclencheur, ou à l'élément le plus pertinent si le déclencheur a disparu. `OVERLAY-R06`
- **[loi]** Un superposé non-modal ne piège jamais le focus et laisse le fond actif ; il se ferme en light-dismiss (Échap ou clic/focus en dehors), rend le focus au déclencheur et reste ancré à ce déclencheur. `OVERLAY-R07`
- **[loi]** Un superposé modal verrouille le défilement du fond et rend ce fond inerte tant qu'il est ouvert ; un superposé non-modal ne verrouille rien et ne rend rien inerte. `OVERLAY-R08`
- **[préférence]** L'entrée et la sortie d'un superposé utilisent les durées et courbes de MOTION — une grande surface relève de la durée lente — et respectent prefers-reduced-motion en supprimant le glissement ; l'ombre s'anime en opacité et jamais par interpolation de box-shadow. `OVERLAY-R09`

## Consignes d'implémentation

- **[préférence]** La surface d'un superposé modal applique le cran z-index.overlay et son voile vit dans la même couche, placé avant la surface dans le DOM afin d'être rendu derrière elle ; un superposé non-modal ancré applique z-index.popover. `OVERLAY-U01`
- **[préférence]** Le voile d'un superposé modal est un plan plein de couleur overlay.scrim, en position fixed et inset 0, couvrant la fenêtre et placé sous la surface ; aucun superposé non-modal ne pose de voile. `OVERLAY-U02`
- **[préférence]** La surface d'un superposé porte l'ombre elevation.overlay — jamais elevation.raised, réservée au survol cliquable —, le rayon radius.md et le fond background ; overlay consomme ces tokens sans en créer aucun. `OVERLAY-U03`
- **[loi]** À l'ouverture d'un superposé modal, le fond reçoit inert (à défaut aria-hidden) — non focalisable et invisible au lecteur d'écran — et le défilement du document est verrouillé ; à la fermeture, l'inertie et le verrou sont retirés et le focus revient au déclencheur. `OVERLAY-U04`
- **[préférence]** L'entrée et la sortie d'un superposé utilisent une durée MOTION — motion.slow pour une grande surface —, animent l'ombre elevation.overlay en opacité, et suppriment tout glissement sous prefers-reduced-motion. `OVERLAY-U06`
- **[préférence]** Aucune valeur d'empilement, d'ombre, de rayon, de durée ou de couleur n'est écrite en dur dans un superposé : tout référence z-index.*, overlay.scrim, elevation.overlay, radius.md, motion.* et border.* ; le toast conserve ses propres règles d'empilement et n'emprunte à overlay que le cran z-index.toast. `OVERLAY-U07`

## Non couvert — poser la question, ne rien trancher

- Ombre d'un superposé : Relief de la surface flottante.
- Anneau de focus interne : Focus d'un contrôle dans le superposé.
- Ordre de focus général : Séquence de tabulation de la page.
