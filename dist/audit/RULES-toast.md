---
sujet: toast
nature: components
resume: "Ce fichier contient le raisonnement : tone, timing, actions, empilement, position, instrument"
selon-contexte: [adaptive, alert, button, emotion, motion, voice]
source: TOAST-UX.md v1.0.0 + TOAST-UI.md v1.1.0
empreinte: sha256:fdfe8e0eb8e6f622
regles: {loi: 0, preference: 0, non_qualifie: 41}
---
# RULES — toast (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** les axes du toast sont **tone** uniquement — pas de **persistance** (le toast est temporaire
- **[non qualifié]** l'alert vit *dans le flux* de la page ; le toast vit *au-dessus*, injecté par le système,
- **[non qualifié]** le toast est le territoire du feedback immédiat d'une action qui vient de réussir
- **[non qualifié]** échelle d'interruption héritée — **alert < toast < modale**. Le toast interrompt
- **[non qualifié]** utiliser pour confirmer l'issue immédiate d'une action déclenchée par l'utilisateur
- **[non qualifié]** ne pas utiliser pour une condition qui dure (→ alert) ni pour une décision qui doit bloquer
- **[non qualifié]** cas limite — si la confirmation doit rester visible après que l'utilisateur a quitté des
- **[non qualifié]** les 4 tones d'`ALERT-UX.md` sont repris à l'identique — **info / success / warning /
- **[non qualifié]** **avertissement documenté — danger/warning en toast portent un risque spécifique que
- **[non qualifié]** un toast qui disparaît après un délai fixe relève de WCAG 2.2.1 (Timing Adjustable) — le
- **[non qualifié]** **contrat de repli, décliné du contrat E-motion** — le toast n'est jamais le seul porteur
- **[non qualifié]** durée de base — pas de valeur nouvelle inventée ici : `BUTTON-UX.md` § Bouton d'annulation
- **[non qualifié]** **une action tolérée, jamais deux** (arbitrage utilisateur 2026-07-20 — pattern undo :
- **[non qualifié]** l'action est soumise à la même suspension de timing que le texte (§ Timing) — sans ça, la
- **[non qualifié]** cohérence de tone héritée d'`ALERT-UX.md` — l'action décrit ce qu'elle fait
- **[non qualifié]** **jusqu'à 2-3 toasts simultanés** (arbitrage utilisateur 2026-07-20 — écarte l'option « 1
- **[non qualifié]** **ordre d'arrivée, pas gravité décroissante** — divergence assumée avec `ALERT-UX.md`
- **[non qualifié]** au-delà de 2-3, le plus ancien sort (FIFO) plutôt que d'agréger — contrairement à l'alert
- **[non qualifié]** **pilotée par Adaptive, pas un ancrage fixe à la fenêtre** (arbitrage utilisateur
- **[non qualifié]** reste au-dessus du contenu (superposé, jamais dans le flux — cf. § Frontière), l'ancrage
- **[non qualifié]** le toast est le foyer naturel du moment catalogué **« réussite d'un envoi / d'une
- **[non qualifié]** **l'instrument illustration ne s'active que si le toast est seul à l'écran** (arbitrage
- **[non qualifié]** sur un toast danger/warning, l'instrument reste dans le registre productif (icône `◈`
- **[non qualifié]** toujours réactif par nature (jamais chargé avec la page) — doit être annoncé :
- **[non qualifié]** hérite du contrat d'accessibilité motion/E-motion pour son animation d'entrée/sortie — pas
- **[non qualifié]** pas d'état hover/focus propre au conteneur — seuls l'action et la fermeture explicite (si
- **[non qualifié]** **le toast confirme un événement passé, il ne doit jamais être le seul endroit où vit une
