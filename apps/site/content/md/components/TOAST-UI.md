---
component: toast
layer: ui
version: 1.1.0 # 1.1.0 : ancrage bas-centré (arbitrage utilisateur 2026-07-21, remplace la proposition bas-droit du premier jet) + correction d'un piège CSS (container-type sans largeur explicite → région/toasts invisibles, rapporté par l'utilisateur sur DS-UI). 1.0.0 : première rédaction, adoptée — compagnon technique de TOAST-UX.md v1.0.0. Reprend telles quelles les valeurs déjà établies ailleurs (tone/rendu d'ALERT-UI, elevation.overlay de RULES-interaction, motion/E-motion) ; propose des valeurs nouvelles là où TOAST-UX.md renvoyait explicitement ici (durée, ancrage) — marquées comme proposition, pas comme établi, jusqu'à vérification à l'usage.
last_updated: 2026-07-21
companion: TOAST-UX.md
tokens:
  axes:
    tone: [info, success, warning, danger] # identique à alert — aucun token de couleur nouveau
  tone:
    info: { background: color.info-subtle, border: color.info, text: color.info, icon: color.info }
    success: { background: color.success-subtle, border: color.success, text: color.success, icon: color.success }
    warning: { background: color.warning-subtle, border: color.warning, text: color.warning, icon: color.warning }
    danger: { background: color.danger-subtle, border: color.danger, text: color.danger, icon: color.danger }
  icon_shape: { info: circle, success: circle-check, warning: triangle, danger: octagon } # héritées d'alert, mêmes silhouettes normatives
  structure:
    radius: radius.lg
    padding: spacing.md
    icon_gap: spacing.sm
    action_gap: spacing.sm
    max_width: 24rem # proposition — largeur de lecture confortable pour 1-2 lignes, à l'état regular/expanded
  elevation: elevation.overlay # déjà désigné légitime pour le toast dans RULES-interaction.md (« Overlays (modale/popover/futur toast) : elevation.overlay légitime — signale une couche ») — seul écart avec alert, qui n'a aucune élévation
  motion:
    apparition: { duration: motion.base, easing: motion.ease-out } # identique au pattern alert réactif
    disparition: { duration: motion.fast, easing: motion.ease-in } # cran inférieur de l'entrée, comme alert
    reduced_motion: crossfade d'opacité conservé, jamais de translation supprimée sans remplacement (cf. § reduced-motion)
  duree: # PROPOSITION — TOAST-UX.md renvoyait explicitement ici la formule exacte, aucun token existant à réutiliser
    base_ms: 6000 # milieu de la fourchette 5-8s déjà établie (BUTTON-UX.md, pattern undo)
    extension_par_mot_ms: 50 # au-delà de 8 mots — temps de lecture, pas un chiffre sourcé, à vérifier à l'usage
    bonus_action_ms: 2000 # fenêtre supplémentaire si une action (undo) est présente — décision proposée, pas sourcée
    plafond_ms: 10000
  aria:
    reactive_danger_warning: role="alert"
    reactive_info_success: role="status"
  empilement: { max: 3, ordre: fifo, comportement_au_dela: le_plus_ancien_sort }
confidence: mixed
---

# Toast — Couche UI

> Tokens et techniques d'implémentation. Le raisonnement (tone, timing, actions, empilement,
> position, instrument E-motion) vit dans `TOAST-UX.md`. Ce fichier est un premier jet — les valeurs
> marquées « proposition » n'ont pas de source externe, contrairement à celles reprises d'`ALERT-UI.md`.

## Ce qui est repris tel quel (rien de nouveau à vérifier)

- **Tone et silhouettes** : mêmes 4 tones, mêmes tokens `{tone}-subtle`/`{tone}`, mêmes silhouettes
  d'icône normatives (cercle / cercle-coche / triangle / octogone) qu'`ALERT-UI.md`. Aucun token
  couleur nouveau.
- **`radius.lg`**, `spacing.md`/`spacing.sm` : cran conteneur et espacement, identiques à alert.
- **`role="alert"`/`role="status"`** : mapping identique à alert par tone — le toast est toujours
  réactif (jamais de variante proactive, contrairement à l'alert).

## Ce qui diverge d'Alert (et pourquoi)

RÈGLE : **`elevation.overlay`** — le toast est le seul des deux composants à porter une élévation.
Ce n'est pas une extension inventée ici : `RULES-interaction.md` désignait déjà « Overlays
(modale/popover/**futur toast**) : `elevation.overlay` légitime » avant même que ce fichier existe.
Alert n'en porte aucune (il vit dans le flux, il n'a rien à signaler comme couche superposée) ; le
toast, lui, flotte au-dessus du contenu — c'est exactement le signal que le relief matériel doit
porter selon la doctrine Interaction (le relief est un signal, jamais un décor).

RÈGLE : **pas de croix de fermeture par défaut** — proposition, non tranchée par `TOAST-UX.md`. Le
pause-au-survol/focus (§ Timing) couvre déjà le besoin « je n'ai pas eu le temps » ; ajouter une
croix dupliquerait l'affordance de sortie sur un composant qui, contrairement à l'alert, a déjà une
fin de vie programmée. À revoir si l'usage réel montre le besoin d'une sortie immédiate volontaire.

## Timing — implémentation

RÈGLE : durée = `duree.base_ms` + `duree.extension_par_mot_ms` × (nombre de mots au-delà de 8) +
`duree.bonus_action_ms` si une action est présente, plafonné à `duree.plafond_ms`.

> **Statut de cette formule** : `TOAST-UX.md` renvoyait la valeur exacte à cette couche sans la
> fixer — ce n'est pas une règle établie en externe (contrairement au plancher 5-8s, lui sourcé sur
> `BUTTON-UX.md`/IBM Carbon), c'est une proposition de premier jet. À vérifier à l'usage avant de la
> marquer CONFIANCE établi.

RÈGLE : le minuteur se **suspend** intégralement au `:hover` et au `:focus-within` du toast (y
compris l'action s'il y en a une) — reprend à leur sortie, ne redémarre jamais de zéro (WCAG 2.2.1).

RÈGLE : technique — un seul `setTimeout` par toast, remis à zéro par `clearTimeout`/relance sur
entrée/sortie de survol-focus, jamais une boucle d'intervalle qui recalcule en continu.

## Empilement — implémentation

RÈGLE : file **FIFO**, plafond 3 (`empilement.max`) — le 4ᵉ toast entrant fait sortir le plus ancien
immédiatement (disparition au cran `motion.fast`/`ease-in`, comme une disparition normale, pas une
coupure brutale).

RÈGLE : chaque toast de la pile a son **propre minuteur indépendant** — l'arrivée d'un nouveau toast
ne remet pas à zéro le temps déjà écoulé des précédents.

## Position — implémentation Adaptive

RÈGLE : le conteneur qui héberge la pile de toasts est un **conteneur de requête** (`container-type:
inline-size`), conformément à `ADAPTIVE-UI.md` — pas un ancrage codé en dur au viewport.

```css
.toast-region {
  container-type: inline-size;
  container-name: toast-region;
  position: fixed;
  inset-block-end: spacing.lg;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  width: min(structure.max_width, calc(100vw - spacing.lg * 2)); /* largeur EXPLICITE — cf. RÈGLE piège ci-dessous */
}

@container toast-region (max-width: 28rem) {
  .toast-region {
    inset-inline: spacing.md; /* état compact : pleine largeur utile, plus de centrage */
    inset-inline-start: spacing.md;
    width: auto;
    transform: none;
  }
}
```

RÈGLE : **une largeur EXPLICITE est obligatoire** (piège CSS découvert et corrigé le 2026-07-21,
rapport utilisateur sur DS-UI — la région et ses toasts étaient invisibles). `container-type:
inline-size` retire au conteneur sa taille intrinsèque (containment) : un `max-inline-size` (ou
`max-width`) SEUL ne fixe rien tant que rien d'autre ne détermine la taille de départ — sans
`width` déclaré, l'élément s'effondre à une largeur nulle et tout son contenu devient invisible. RÈGLE
TRANSVERSALE pour tout futur conteneur de requête de ce système : `container-type` impose
toujours une largeur explicite, jamais un plafond seul.

RÈGLE : état **compact** (espace insuffisant pour un centrage à marge fixe) → pleine largeur
utile, empilement vertical du bas vers le haut. État **regular/expanded** → ancré **bas-centré**,
largeur `structure.max_width`.

> **Ancrage bas-centré** (arbitrage utilisateur 2026-07-21 — remplace la proposition « bas-droit »
> du premier jet, jamais vérifiée à l'usage). `TOAST-UX.md` renvoyait ce point ici sans le
> trancher ; l'utilisateur a tranché en conversation plutôt que d'attendre une convergence externe
> (Carbon/Polaris/Material proposent tous bas-droit, mais rien n'obligeait à les suivre).

## Instrument E-motion — implémentation

RÈGLE : **hérite la technique d'`EMOTION-UI.md` sans exception** — quand l'instrument illustration
s'active (toast success, seul à l'écran, moment « envoi réussi »), le glyphe est **dessiné**
(`stroke-dashoffset` de plein à zéro sur l'icône `circle-check` de tone success), jamais une
illustration statique importée. C'est la seule technique établie à ce jour dans ce système (gabarit
SubmitButton) — l'arbitrage emoji/illustration externe (options A/B/C exposées en conversation le
2026-07-20, non tranché ; cf. `DECISIONS.md`) reste ouvert ; si l'option B est retenue plus tard,
cette section devra être amendée (nouvelle source d'asset, exception couleur documentée), pas
simplement étendue.

RÈGLE : anatomie en trois actes héritée telle quelle — anticipation (`motion.fast`/`ease-in`) →
acte, le glyphe se dessine (`motion.expressive`/`spring`) → résolution, le vert s'installe
(`motion.expressive`/`ease-out`). Somme ≤ `motion.celebration`.

RÈGLE : `prefers-reduced-motion` — actes 1-2 supprimés, acte 3 conservé en bascule instantanée :
l'icône `circle-check` apparaît pleine directement, sans traînée. Le fait (succès confirmé) reste
intact.

RÈGLE : condition d'activation vérifiée à l'injection, pas en continu — si un 2ᵉ toast arrive
pendant que le glyphe du 1ᵉʳ se dessine encore, le 1ᵉʳ **termine** son acte en cours (le moment ne
se coupe pas net) mais aucun nouveau moment illustré ne démarre tant que la pile n'est pas revenue à
un seul élément.

## Accessibilité — spécifications techniques

- Toujours réactif : `role="alert"` (danger/warning) ou `role="status"` (info/success), conteneur
  live présent dans le DOM avant l'injection — même exigence qu'alert.
- Icône `aria-hidden="true"` si le tone est déjà annoncé par le texte/rôle ; sinon alternative
  textuelle. Jamais la couleur seule (WCAG 1.4.1), hérité d'alert.
- Zone tactile de l'action (si présente) : 44px minimum, focusable, libellée explicitement (pas
  « Annuler » seul si le contexte n'est pas clair au lecteur d'écran — « Annuler la suppression »).
- `prefers-reduced-motion` : bloc média global hérité de `MOTION-UI.md`, aucune redéclaration locale.
- RTL : l'ancrage bas-centré n'a, par construction, aucun miroir à écrire (un centre ne dépend pas
  du sens de lecture) — seul l'état compact utilise `inset-inline` (logique, pas `left`/`right`),
  qui s'inverse nativement si jamais un ancrage de coin revenait en jeu.

## Sources et niveau de confiance (couche UI)

| Affirmation | Source | Confiance |
|---|---|---|
| Tone/silhouettes/rendu couleur | `ALERT-UI.md` (repris à l'identique) | Établi — transposition interne |
| `elevation.overlay` légitime pour le toast | `RULES-interaction.md` (« Overlays… futur toast ») | Établi — déjà écrit avant ce fichier |
| Motion apparition/disparition (base/fast, ease-out/in) | `MOTION-UI.md` (pattern alert réactif, repris à l'identique) | Établi — transposition interne |
| Technique instrument illustration (stroke-dashoffset, 3 actes, reduced-motion par acte) | `EMOTION-UI.md` (héritage direct, gabarit SubmitButton) | Établi — hérité |
| Container Query pour la position (pas d'ancrage viewport fixe) | `ADAPTIVE-UI.md` | Établi — application directe |
| `role="alert"`/`role="status"`, timing suspendu au survol/focus | `ALERT-UI.md` ; WCAG 2.2.1 | Établi |
| Formule de durée (base 6000ms, extension/mot, bonus action, plafond) | Proposition de premier jet, aucune source externe | **Non établi — à vérifier à l'usage** |
| Ancrage bas-centré | Arbitrage utilisateur explicite, 2026-07-21 (remplace la proposition bas-droit du premier jet) | Établi — décision d'identité interne |
| `container-type` nécessite une largeur explicite (sinon la région s'effondre à une largeur nulle) | Comportement CSS spécifié (containment), corrigé après rapport utilisateur 2026-07-21 | Établi — piège CSS documenté |
| Pas de croix de fermeture par défaut | Raisonnement de mécanisme (redondance avec pause-au-survol) | Déduction argumentée, non testée |

## À approfondir

- Vérifier la formule de durée à l'usage réel (textes longs, undo fréquent) avant de la marquer établie.
- Tester l'ancrage bas-centré avec une barre d'actions flottante ou une navigation basse (mobile)
  qui occuperait déjà le bas de l'écran.
- Si l'arbitrage emoji/illustration bascule sur l'option B : revoir uniquement § Instrument E-motion,
  aucune autre section n'est concernée.
