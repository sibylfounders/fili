---
component: toast
layer: ux
version: 1.0.0 # 1.0.0 : première rédaction, adoptée — issue de l'arbitrage utilisateur du 2026-07-20 (tone/actions/empilement/position/instrument illustration tranchés en conversation, cf. § Sources). Composant nommé « candidat naturel de prochaine documentation » par ALERT-UX.md § À approfondir.
last_updated: 2026-07-20
companion: TOAST-UI.md
confidence: mixed
---

# Toast (snackbar) — Couche UX

> Ce fichier contient le raisonnement : tone, timing, actions, empilement, position, instrument
> E-motion. Tokens et technique (animation d'entrée/sortie, valeurs exactes) vivront dans
> `TOAST-UI.md`, à écrire une fois ce fichier validé.

## Note de transposition (à lire en premier)

RÈGLE : les axes du toast sont **tone** uniquement — pas de **persistance** (le toast est temporaire
par nature, c'est ce qui le distingue de l'alert), pas de **style** (même raisonnement que l'alert :
le contraste suit la gravité, pas un choix par instance), pas de **size** (largeur dictée par le
contenu et le conteneur qui l'héberge, cf. § Position).

> **Pourquoi** : `ALERT-UX.md` § Note de transposition a déjà posé la frontière — « le toast vit
> au-dessus du flux et dans le temps (superposé, empilable, chronométré, placé par le système et
> non par la page) ». Ce fichier hérite cette frontière, il ne la retranche pas.

## Frontière avec Alert (héritée, formalisée ici en miroir)

RÈGLE : l'alert vit *dans le flux* de la page ; le toast vit *au-dessus*, injecté par le système,
toujours réactif (jamais chargé avec la page).

RÈGLE : le toast est le territoire du feedback immédiat d'une action qui vient de réussir
(« Enregistré ✓ ») — le registre qu'`ALERT-UX.md` exclut explicitement de lui-même.

RÈGLE : échelle d'interruption héritée — **alert < toast < modale**. Le toast interrompt
l'attention quelques secondes, jamais le geste en cours.

## But

Un toast confirme qu'une action vient de produire un effet, sans exiger que l'utilisateur s'arrête
pour le lire. Contrairement à l'alert (qui documente une condition qui dure), le toast documente un
**événement qui vient de se produire** — il a une naissance et une mort programmées dès son
apparition.

## Quand l'utiliser / ne pas l'utiliser

RÈGLE : utiliser pour confirmer l'issue immédiate d'une action déclenchée par l'utilisateur
(sauvegarde, envoi, suppression, changement de statut) quand cette confirmation n'a pas besoin de
*rester consultable*.

RÈGLE : ne pas utiliser pour une condition qui dure (→ alert) ni pour une décision qui doit bloquer
l'utilisateur (→ modale) ni pour du contenu promotionnel.

RÈGLE : cas limite — si la confirmation doit rester visible après que l'utilisateur a quitté des
yeux l'écran (ex. un paiement validé, consultable plus tard dans un récapitulatif), c'est un alert
success dismissible, pas un toast : le toast n'a pas de mémoire, une fois parti il est parti.

## Tone

RÈGLE : les 4 tones d'`ALERT-UX.md` sont repris à l'identique — **info / success / warning /
danger**, pas de `neutral` (arbitrage utilisateur 2026-07-20 ; option étudiée de restreindre à
info/success a été écartée).

RÈGLE : **avertissement documenté — danger/warning en toast portent un risque spécifique que
l'alert n'a pas.** `ALERT-UX.md` § Risque signale déjà : « Danger dismissible sur condition active →
condition critique masquée, perte de données ou d'échéance → Élevée ». Un toast danger aggrave ce
risque : il ne se ferme pas sur décision de l'utilisateur, il disparaît **de lui-même**, sans qu'un
changement d'état ne le remplace. Ce fichier accepte ce risque par arbitrage explicite (2026-07-20)
plutôt que de l'exclure — charge à chaque consommateur de vérifier qu'une condition grave a un
répondant durable ailleurs (l'objet concerné change visiblement d'état, ou un alert prend le relais)
avant d'utiliser un toast danger comme seul porteur du message.

> **Pourquoi accepter plutôt qu'exclure** : certains événements sont bien des échecs ponctuels
> plutôt que des conditions durables (« L'envoi a échoué, réessayez ») — les cantonner à l'alert
> forcerait un composant plus lourd que l'événement ne le justifie. Le risque n'est pas dans le
> tone, il est dans l'usage d'un toast danger comme *unique* trace d'un état qui, lui, dure.

## Timing (le point le plus sensible du composant)

RÈGLE : un toast qui disparaît après un délai fixe relève de WCAG 2.2.1 (Timing Adjustable) — le
délai doit être **suspendu au survol et au focus clavier**, et ne reprendre qu'à leur sortie.

RÈGLE : **contrat de repli, décliné du contrat E-motion** — le toast n'est jamais le seul porteur
d'une information : sa disparition ne doit jamais effacer une donnée que l'interface ne montre nulle
part ailleurs (l'état qu'il confirme doit rester lisible dans l'écran sous-jacent, même sans le
toast).

RÈGLE : durée de base — pas de valeur nouvelle inventée ici : `BUTTON-UX.md` § Bouton d'annulation
a déjà établi **5-8 secondes minimum** pour une fenêtre de décision réfléchie (pattern undo, IBM
Carbon). Ce fichier reprend cette valeur comme plancher pour tout toast, avec ou sans action —
`TOAST-UI.md` tranchera l'ajustement fin (ex. prolonger selon la longueur du texte).

CONFIANCE : établi pour le principe (WCAG 2.2.1) et pour la valeur plancher (BUTTON-UX.md, IBM
Carbon) ; la formule exacte de prolongation reste à instruire dans `TOAST-UI.md`.

## Actions

RÈGLE : **une action tolérée, jamais deux** (arbitrage utilisateur 2026-07-20 — pattern undo :
« Élément supprimé — Annuler »). Pas de second lien discret comme sur l'alert : le toast est trop
éphémère pour arbitrer entre deux sorties.

RÈGLE : l'action est soumise à la même suspension de timing que le texte (§ Timing) — sans ça, la
fenêtre de décision promise par `BUTTON-UX.md` (5-8s) n'est pas fiable au clavier ni au survol.

RÈGLE : cohérence de tone héritée d'`ALERT-UX.md` — l'action décrit ce qu'elle fait
(« Annuler »), pas la gravité du toast qui la porte.

## Empilement

RÈGLE : **jusqu'à 2-3 toasts simultanés** (arbitrage utilisateur 2026-07-20 — écarte l'option « 1
seul, le nouveau remplace »).

RÈGLE : **ordre d'arrivée, pas gravité décroissante** — divergence assumée avec `ALERT-UX.md`
§ Empilement. L'alert empile des *conditions simultanément vraies* (l'ordre par gravité a du sens,
rien ne les rend séquentiels) ; le toast empile des *événements survenus dans le temps* — inverser
un succès et un échec qui viennent de se produire dans le désordre chronologique désorienterait plus
qu'il n'aiderait.

> **Pourquoi une règle différente plutôt qu'un copier-coller** : la nature de ce qui est empilé
> diffère (état vs événement) — le raisonnement d'`ALERT-UX.md` s'applique à la lettre, pas la
> conclusion.

RÈGLE : au-delà de 2-3, le plus ancien sort (FIFO) plutôt que d'agréger — contrairement à l'alert
(où l'agrégation est toujours préférable), agréger des événements hétérogènes (« 3 actions
récentes ») perdrait le contenu spécifique que chaque toast porte.

CONFIANCE : non formalisé — raisonnement de mécanisme, pas de règle chiffrée publiée trouvée
(même statut que l'empilement de l'alert).

## Position

RÈGLE : **pilotée par Adaptive, pas un ancrage fixe à la fenêtre** (arbitrage utilisateur
2026-07-20 — cohérent avec `ADAPTIVE-UX.md` : « la fenêtre définit la page, le conteneur définit le
composant »). Le toast adapte position et largeur à l'espace du conteneur qui l'héberge plutôt qu'à
un coin fixe de viewport.

RÈGLE : reste au-dessus du contenu (superposé, jamais dans le flux — cf. § Frontière), l'ancrage
précis (quel coin, pleine largeur en état compact) est une décision `TOAST-UI.md`, pas de cette
couche.

## Instrument E-motion — illustration/forme

RÈGLE : le toast est le foyer naturel du moment catalogué **« réussite d'un envoi / d'une
soumission »** — c'est exactement l'endroit qu'`ALERT-UX.md` désigne en creux en excluant le
success réactif de lui-même.

RÈGLE : **l'instrument illustration ne s'active que si le toast est seul à l'écran** (arbitrage
utilisateur 2026-07-20) — jamais sur un toast qui rejoint une pile déjà existante. Cohérent avec le
budget de rareté E-motion (« un moment qui se répète cesse d'être expressif ») : un empilement de
2-3 toasts est par nature une séquence qui se répète, l'exact opposé d'un moment mérité.

RÈGLE : sur un toast danger/warning, l'instrument reste dans le registre productif (icône `◈`
standard, pas d'illustration) — l'exception chaleureuse de `VOICE-UX.md`/`EMOTION-UX.md` ne
s'applique jamais à une erreur ou une action destructive, quel que soit le composant qui la porte.
Le moment catalogué « sortie d'une erreur / récupération » ne s'incarne donc pas dans le toast
danger lui-même, mais dans le toast success/info qui **confirme la résolution après coup** — la
distinction déjà faite entre le problème et son soulagement.

## États et comportement

RÈGLE : toujours réactif par nature (jamais chargé avec la page) — doit être annoncé :
`role="alert"` pour danger/warning, `role="status"` pour info/success, en miroir exact
d'`ALERT-UX.md`.

RÈGLE : hérite du contrat d'accessibilité motion/E-motion pour son animation d'entrée/sortie — pas
de flash > 3/s, `transform`/`opacity` uniquement, `prefers-reduced-motion` dégrade vers une
apparition/disparition instantanée sans perte d'information.

RÈGLE : pas d'état hover/focus propre au conteneur — seuls l'action et la fermeture explicite (si
`TOAST-UI.md` en prévoit une) le sont, en miroir d'`ALERT-UX.md`.

## Risque

| Cas | Risque principal | Sévérité |
|---|---|---|
| Toast danger seul porteur d'une condition durable | Condition grave disparaît sans successeur, perte silencieuse | Élevée (acceptée, documentée — cf. § Tone) |
| Timing non suspendu au survol/focus | Fenêtre de décision (undo) non fiable, WCAG 2.2.1 non respecté | Élevée |
| Instrument illustration actif sur une pile | Répétition qui banalise le moment, décor gratuit (anti-usage E-motion) | Moyenne |
| Empilement agrégé au lieu de FIFO | Perte du contenu spécifique de chaque événement | Moyenne |
| Toast réactif injecté sans rôle live | Lecteur d'écran jamais informé | Critique |

## Règle transversale

RÈGLE : **le toast confirme un événement passé, il ne doit jamais être le seul endroit où vit une
information qui compte encore** — c'est la déclinaison, pour un composant chronométré, du principe
alert (« l'interruption suit l'urgence réelle ») et du contrat de repli E-motion (« jamais le seul
canal »).

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Frontière alert/toast (flux vs superposé/chronométré) | `ALERT-UX.md` § Note de transposition | Établi — déjà tranché |
| Toast = territoire du feedback immédiat, exclu de l'alert | `ALERT-UX.md` § Tone/Success | Établi — déjà tranché |
| Durée plancher undo 5-8s | `BUTTON-UX.md` § Bouton d'annulation (IBM Carbon) | Établi — transposition interne |
| Timing suspendu au survol/focus | WCAG 2.2.1 (Timing Adjustable) | Établi, standard d'accessibilité |
| `role="alert"` vs `role="status"` par tone | `ALERT-UX.md` § États et comportement (Polaris, WCAG/ARIA) | Établi — transposition interne |
| Tone 4 valeurs, actions tolérées, position Adaptive | Arbitrage utilisateur, conversation 2026-07-20 | Décision d'identité interne, non re-sourcée en externe |
| Empilement ordre d'arrivée (pas gravité) | Raisonnement de mécanisme (nature événement vs état) | Déduction argumentée — pas de règle chiffrée publiée trouvée |
| Instrument illustration réservé au toast seul | Cohérence avec budget de rareté E-motion (`EMOTION-UX.md`) | Déduction argumentée, cohérente avec une règle établie |

## À approfondir

- **Valeur exacte de prolongation de durée** (au-delà du plancher 5-8s) selon longueur du texte —
  à trancher dans `TOAST-UI.md`.
- **Ancrage précis à l'écran** (quel coin, comportement en état compact/regular/expanded) — décision
  `TOAST-UI.md`, dépend du travail Adaptive déjà en cours côté DS-UI (curseur de largeur de
  conteneur dans `atelier.html`).
- **RTL et reduced motion** — position miroir en lecture droite-gauche, chorégraphie d'entrée/sortie
  sans mouvement : signalés, non couverts ici (même statut que le point ouvert d'`ALERT-UX.md`).
- **Fermeture manuelle explicite** (croix, comme l'alert dismissible) — non tranché : le toast a
  une fin de vie programmée, une fermeture manuelle est un raccourci, pas une nécessité. À trancher
  dans `TOAST-UI.md` si le besoin se confirme à l'usage.
