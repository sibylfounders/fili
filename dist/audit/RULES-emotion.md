---
sujet: emotion
nature: languages
resume: "La couche d'**expression** du système : les moments où l'interface a le droit de sortir de la rigueur productive pour offrir un instant humain."
selon-contexte: [button, interaction, motion, voice]
source: EMOTION-UX.md v1.1.1 + EMOTION-UI.md v1.2.0
empreinte: sha256:3fc4f34e4016e625
regles: {loi: 0, preference: 0, non_qualifie: 11}
---
# RULES — emotion (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** le choix d'offrir un moment E‑motion n'est jamais esthétique — c'est une déclaration que *cet instant précis compte* pour l'utilisateur. C'est le miroir exact de la règle transversale du bouton (« la friction est proportionnelle au risque réel ») : ici, **l'expression est proportionnelle au poids émotionnel du moment**.
- **[non qualifié]** **rareté obligatoire (le budget de délice).** Un moment expressif qui se répète cesse d'être expressif — il devient une attente, puis une gêne. C'est la même mécanique que « un seul primary par vue » : un signal partout n'est plus un signal. La rigueur du reste du système est ce qui *rend audible* la note expressive ; sans le silence autour, elle n'est que du bruit.
- **[non qualifié]** E‑motion ne se pose que sur les **battements émotionnels** d'un parcours — pas ailleurs. Le catalogue de départ :
- **[non qualifié]** hors de ce catalogue, on ne s'improvise pas un moment. Ajouter une entrée est une **décision de design tranchée** (elle passe par DECISIONS.md), pas un réflexe d'implémenteur.
- **[non qualifié]** **E‑motion est toujours une amélioration, jamais un canal d'information.** L'état (succès, envoi, accomplissement) vit dans l'ARIA et dans le statique — l'animation ne fait que le *célébrer*. Couper l'animation ne coupe jamais l'information.
- **[non qualifié]** `prefers-reduced-motion` — le moment expressif **dégrade proprement** vers sa version productive/instantanée (le repli de la fondation `motion`), pas vers rien. L'avion ne vole pas ; le bouton passe directement à « Envoyé ✓ ». L'utilisateur sensible au mouvement perd la *fête*, jamais le *fait*.
- **[non qualifié]** E‑motion **hérite intégralement du contrat d'accessibilité de `motion`** — et n'en relâche aucune clause. Ce qui est relevé est le *parti pris d'identité* (productif→expressif), jamais la contrainte : pas de flash > 3/s (WCAG 2.3.1), on n'anime que `transform`/`opacity`, le mouvement ne verrouille jamais une action, rien n'informe par le seul mouvement. (Détail des interdits : `RULES-motion.md`, `RULES-accessibility.md`.)
- **[non qualifié]** E‑motion joue sur plusieurs instruments accordés — le mouvement est la porte d'entrée, pas toute la pièce.
- **[non qualifié]** un moment réussi **accorde** ses instruments (le mouvement se résout au moment où la voix change et où le vert s'installe) ; désaccordés, ils font du bruit.
- **[non qualifié]** chaque moment signature est un **composant/comportement catalogué, versionné, budget‑gated** — pas un effet local. Un composant qui invoque E‑motion est une **exception documentée** (au même titre qu'un bouton de connexion sociale), tracée, jamais arbitraire.
- **[non qualifié]** le premier citoyen d'E‑motion est le **SubmitButton « avion en papier »** (envoi async → pliage/vol → succès). Il sert de preuve et de gabarit : tout futur moment suit son anatomie (cf. EMOTION-UI) et son contrat de repli.

## Non couvert — poser la question, ne rien trancher

- Action réflexe ou à haute fréquence : Une action réflexe ou répétée (hover, navigation, envoi 40 fois par jour).
- Répétition à chaque frappe ou par item de liste : Le même moment serait rejoué en boucle.
- Micro‑interaction purement fonctionnelle : Un feedback purement fonctionnel (press, bordure d'erreur).
- Décor gratuit sans moment : On envisage une animation « pour faire joli ».
- Instruments désaccordés : Mouvement, voix et couleur ne se résolvent pas ensemble.
- E‑motion comme canal d'information : On tenterait de porter un état par la seule animation.
- Effet local copié d'un écran à l'autre : Un CSS expressif est recollé sans gouvernance.
