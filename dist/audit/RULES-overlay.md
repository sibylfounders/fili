---
sujet: overlay
nature: foundations
resume: "Cette fondation porte la **couche au-dessus du flux** : ce qui recouvre le contenu au lieu de s'y insérer."
selon-contexte: []
source: OVERLAY-UX.md v1.0.0 + OVERLAY-UI.md v1.0.0
empreinte: sha256:767b9d6a8bef58d3
regles: {loi: 6, preference: 8, non_qualifie: 0}
---
# RULES — overlay (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Tout superposé est soit modal, soit non-modal, et ce choix détermine l'intégralité de sa mécanique : présence d'un voile, piège de focus, inertie du fond, verrouillage du défilement, mode de fermeture et ancrage. `OVERLAY-R02`
  - vérifiable : chaque superposé est déclaré modal ou non-modal ; aucun superposé ne combine voile et fond actif, ni piège de focus et absence de voile
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- **[préférence]** Tout superposé applique un cran de l'échelle z-index du système plutôt qu'un entier codé en dur, dans l'ordre sticky < overlay (modal) < popover (non-modal ancré) < toast < tooltip. `OVERLAY-R03`
  - vérifiable : aucune valeur numérique de z-index écrite en dur dans le code d'un superposé
- **[loi]** Un superposé modal pose un voile entre le contenu devenu inerte et sa surface ; un superposé non-modal n'en pose jamais. Le voile partage la couche z-index du superposé et est rendu derrière sa surface. `OVERLAY-R04`
  - vérifiable : un superposé modal a exactement un voile ; un superposé non-modal en a zéro
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- **[préférence]** Un clic sur le voile ferme le superposé modal comme le ferait une annulation, sauf lorsqu'une perte de saisie est en jeu : le propriétaire du superposé demande alors confirmation avant de fermer. `OVERLAY-R05`
  - vérifiable : un clic sur le voile déclenche la même action que le bouton d'annulation du superposé
- **[loi]** À l'ouverture d'un superposé modal, le focus entre dans le superposé ; Tab et Maj+Tab bouclent à l'intérieur ; le fond est inerte, inatteignable au clavier comme au lecteur d'écran ; Échap ferme ; à la fermeture, le focus revient au déclencheur, ou à l'élément le plus pertinent si le déclencheur a disparu. `OVERLAY-R06`
  - vérifiable : aucun élément focalisable hors du superposé n'est atteignable au clavier pendant qu'il est ouvert ; Échap ferme ; le focus revient au déclencheur à la fermeture
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- **[loi]** Un superposé non-modal ne piège jamais le focus et laisse le fond actif ; il se ferme en light-dismiss (Échap ou clic/focus en dehors), rend le focus au déclencheur et reste ancré à ce déclencheur. `OVERLAY-R07`
  - vérifiable : le fond reste focalisable pendant l'ouverture ; Échap et un clic en dehors ferment tous deux le superposé ; le focus revient au déclencheur
  - source : https://carbondesignsystem.com/components/popover/usage/
- **[loi]** Un superposé modal verrouille le défilement du fond et rend ce fond inerte tant qu'il est ouvert ; un superposé non-modal ne verrouille rien et ne rend rien inerte. `OVERLAY-R08`
  - vérifiable : pendant qu'un modal est ouvert, le document ne défile pas et aucun élément du fond n'est focalisable ni exposé au lecteur d'écran
  - source : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- **[préférence]** L'entrée et la sortie d'un superposé utilisent les durées et courbes de MOTION — une grande surface relève de la durée lente — et respectent prefers-reduced-motion en supprimant le glissement ; l'ombre s'anime en opacité et jamais par interpolation de box-shadow. `OVERLAY-R09`
  - vérifiable : sous prefers-reduced-motion: reduce, aucune translation à l'entrée ni à la sortie

## Non couvert — poser la question, ne rien trancher

- Ombre d'un superposé : Relief de la surface flottante.
- Anneau de focus interne : Focus d'un contrôle dans le superposé.
- Ordre de focus général : Séquence de tabulation de la page.
