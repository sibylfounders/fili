---
component: emotion
layer: ux
type: language
version: 1.1.1 # 1.1.1 : ajout d'un point ouvert (§ À approfondir) sur le DeleteButton de DS-UI (froissage E-motion sur une action destructive, 2026-07-19) — absent du catalogue, non tranché, remonté sans être résolu ici. Aucune règle modifiée. 1.1.0 : E-motion devient un langage d'expression de premier niveau, distinct de la fondation motion qu'il gouverne. 1.0.0 : première rédaction — la couche d'EXPRESSION du système. Emprunte le « chemin sanctionné » que MOTION-UX.md 1.2.0 avait laissé ouvert (le registre productif est un parti pris paramétrable). Ne crée pas de contrainte : elle en LÈVE une (la borne ~400ms, le « productif seulement ») pour des moments strictement mérités, sans jamais toucher au contrat d'accessibilité. Cf. DECISIONS.md 2026-07-18.
last_updated: 2026-07-20
companion: EMOTION-UI.md
confidence: mixed # le contrat de repli et l'héritage WCAG sont établis (hérités de motion/accessibility) ; la proportionnalité et le « budget de rareté » sont un parti pris d'identité interne, assumé
---

# E‑motion — Couche UX (langage d'expression)

> La couche d'**expression** du système : les moments où l'interface a le droit de sortir de la rigueur productive pour offrir un instant humain. E‑motion = **é‑motion portée par le mouvement** — le mouvement est l'instrument principal, pas le seul. Le raisonnement (quand, pourquoi, quel budget, quel repli) vit ici ; les tokens expressifs et la chorégraphie technique vivent dans `EMOTION-UI.md`.

## But
Un design system ultra‑cadré rassure mais peut sonner monotone. E‑motion est le **contrepoids assumé** : une couche mince, rare, gouvernée, qui donne une âme au système sans en trahir la rigueur. Elle ne s'oppose pas à la fondation `motion` — elle en est l'**extension sanctionnée**. MOTION‑UX pose que le registre « productif seulement » est *un parti pris d'identité paramétrable, qu'un consommateur expressif peut relever sans toucher aux contraintes*. E‑motion **est** ce consommateur, formalisé : elle relève le parti pris (durées plus longues, courbes à caractère, célébration) pour des moments choisis, et pour eux seuls.

## La loi cardinale : l'expression est proportionnelle au SENS du moment

RÈGLE : le choix d'offrir un moment E‑motion n'est jamais esthétique — c'est une déclaration que *cet instant précis compte* pour l'utilisateur. C'est le miroir exact de la règle transversale du bouton (« la friction est proportionnelle au risque réel ») : ici, **l'expression est proportionnelle au poids émotionnel du moment**.

RÈGLE : **rareté obligatoire (le budget de délice).** Un moment expressif qui se répète cesse d'être expressif — il devient une attente, puis une gêne. C'est la même mécanique que « un seul primary par vue » : un signal partout n'est plus un signal. La rigueur du reste du système est ce qui *rend audible* la note expressive ; sans le silence autour, elle n'est que du bruit.
  - Jamais sur une action **réflexe** ou **à haute fréquence** (un hover, un clic de navigation, un envoi qu'on répète 40 fois par jour). Mal placé, l'effet se retourne : il ralentit et agace.
  - Un même moment E‑motion ne se déclenche qu'une fois par séquence utile (pas à chaque frappe, pas à chaque item d'une liste).

## Le catalogue des moments MÉRITÉS

RÈGLE : E‑motion ne se pose que sur les **battements émotionnels** d'un parcours — pas ailleurs. Le catalogue de départ :

| Moment | Exemple | Pourquoi il est mérité |
|---|---|---|
| **Réussite d'un envoi / d'une soumission** | « Envoyer » → l'avion en papier part | L'utilisateur a confié quelque chose ; l'accusé de réception mérite d'être ressenti, pas seulement lu |
| **Première fois / onboarding franchi** | Fin d'un setup, premier projet créé | Un seuil de parcours ; l'émotion marque le passage |
| **Cap / accomplissement** | Objectif atteint, dernière tâche cochée | La récompense d'un effort, pas d'un clic |
| **Sortie d'une erreur / récupération** | Un blocage enfin résolu | Le soulagement mérite d'être reconnu |
| **Vide et attente qui ont une personnalité** | Empty state, chargement long assumé | Les creux du parcours, là où un système sec laisse l'utilisateur seul |

RÈGLE : hors de ce catalogue, on ne s'improvise pas un moment. Ajouter une entrée est une **décision de design tranchée** (elle passe par DECISIONS.md), pas un réflexe d'implémenteur.

## Le contrat de repli (INVIOLABLE)

RÈGLE : **E‑motion est toujours une amélioration, jamais un canal d'information.** L'état (succès, envoi, accomplissement) vit dans l'ARIA et dans le statique — l'animation ne fait que le *célébrer*. Couper l'animation ne coupe jamais l'information.

RÈGLE : `prefers-reduced-motion` — le moment expressif **dégrade proprement** vers sa version productive/instantanée (le repli de la fondation `motion`), pas vers rien. L'avion ne vole pas ; le bouton passe directement à « Envoyé ✓ ». L'utilisateur sensible au mouvement perd la *fête*, jamais le *fait*.

RÈGLE : E‑motion **hérite intégralement du contrat d'accessibilité de `motion`** — et n'en relâche aucune clause. Ce qui est relevé est le *parti pris d'identité* (productif→expressif), jamais la contrainte : pas de flash > 3/s (WCAG 2.3.1), on n'anime que `transform`/`opacity`, le mouvement ne verrouille jamais une action, rien n'informe par le seul mouvement. (Détail des interdits : `RULES-motion.md`, `RULES-accessibility.md`.)

## Plus que du mouvement : les quatre instruments

RÈGLE : E‑motion joue sur plusieurs instruments accordés — le mouvement est la porte d'entrée, pas toute la pièce.
- **Mouvement** (premier violon) : la chorégraphie, le caractère (cf. EMOTION-UI, cran `motion.expressive`/`motion.spring`).
- **Voix** : le microcopy du moment se réchauffe d'un cran (« C'est parti ✈️ » plutôt que « Envoyé »). Autorité : `RULES-voice.md` — E‑motion ne redéfinit pas la voix, elle en autorise le registre chaleureux sur ces instants.
- **Couleur** : puise dans les tokens (le vert de succès, le primary de marque) — jamais une couleur nouvelle ; la chaleur vient de l'usage, pas d'un hex inventé.
- **Illustration / forme** : un glyphe qui se dessine, une silhouette qui se plie — au service du moment, jamais gratuite.

RÈGLE : un moment réussi **accorde** ses instruments (le mouvement se résout au moment où la voix change et où le vert s'installe) ; désaccordés, ils font du bruit.

## Gouvernance

RÈGLE : chaque moment signature est un **composant/comportement catalogué, versionné, budget‑gated** — pas un effet local. Un composant qui invoque E‑motion est une **exception documentée** (au même titre qu'un bouton de connexion sociale), tracée, jamais arbitraire.

RÈGLE : le premier citoyen d'E‑motion est le **SubmitButton « avion en papier »** (envoi async → pliage/vol → succès). Il sert de preuve et de gabarit : tout futur moment suit son anatomie (cf. EMOTION-UI) et son contrat de repli.

## Sources et niveau de confiance
| Affirmation | Source | Confiance |
|---|---|---|
| Le registre productif est un parti pris paramétrable, relevable par un chemin sanctionné | MOTION-UX.md 1.2.0 (interne) | Établi en interne — E‑motion est ce chemin |
| L'animation ne porte jamais l'information seule ; repli reduced-motion obligatoire | WCAG 2.3.3, 1.4.13 ; MOTION-UX/ACCESSIBILITY | Établi, standard d'accessibilité |
| Expression proportionnelle au sens ; rareté (« budget de délice ») | Décision d'identité interne — miroir de « friction ∝ risque » et « un seul primary par vue » | Parti pris de conception, assumé, pas une étude chiffrée |
| Les moments de « délice » se placent aux battements du parcours, pas partout | Convergence pratique (peak‑end rule, NN/g sur le delight) ; catalogue propre à ce système | Émergent — cadre interne, à enrichir par l'usage réel |

## À approfondir

- **DeleteButton (DS-UI, 2026-07-19) — point NON TRANCHÉ.** L'implémentation DS-UI porte un DeleteButton dont les lettres du label se froissent en boule avant de tomber dans la corbeille (animation E-motion — cran `motion.spring`, convergence de particules). Ce moment n'apparaît dans aucun des deux fichiers qui font autorité : absent du catalogue des moments mérités ci-dessus (qui ne couvre que succès/première fois/cap/sortie d'erreur/vide — rien sur une action destructive), et absent de `BUTTON-UX.md`, qui ne connaît pas de composant nommé « DeleteButton » distinct du modèle générique style×tone. Il entre en tension potentielle avec VOICE-UX § « Le ton suit l'utilisateur » (action destructive : « direct, factuel, conséquence nommée ; ni euphémisme ni sur-dramatisation ») — un froissage ludique avant la corbeille peut se lire comme l'équivalent visuel d'un euphémisme.
- Conformément au protocole du routeur (« décision de design non tranchée : stoppe, expose les options, attends l'arbitrage »), ce point est **remonté, pas résolu**. Options à trancher par l'utilisateur : (1) cataloguer un nouveau moment « retrait/suppression d'un élément » avec une anatomie sobre et distincte de l'avion (sans `spring`/overshoot, cohérente avec le ton factuel du destructif) ; (2) reclasser le froissage comme un signal de transition d'état relevant d'`INTERACTION-UX.md`/`MOTION-UX.md` plutôt que d'E-motion, s'il ne s'agit pas d'un moment « mérité » au sens de ce fichier ; (3) sobriser ou retirer l'animation pour rester dans le registre productif. Cf. DECISIONS.md 2026-07-20.
