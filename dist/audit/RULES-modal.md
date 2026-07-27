---
sujet: modal
nature: components
resume: "La modale est le superposé qui **interrompt** : elle bloque le flux, réclame une décision ou une saisie"
selon-contexte: [button, form, overlay]
source: MODAL-UX.md v1.0.0 + MODAL-UI.md v1.0.1
empreinte: sha256:f08c4381fcd14eee
regles: {loi: 0, preference: 0, non_qualifie: 32}
---
# RULES — modal (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** une modale est un `dialog` **modal** et **centré** — la seconde forme de superposé modal après le
- **[non qualifié]** une modale porte toujours une **conclusion** — une action qui la ferme légitimement (valider, annuler,
- **[non qualifié]** une modale est légitime quand trois conditions tiennent à la fois : (1) l'interruption est **courte**
- **[non qualifié]** **une seule modale ouverte à la fois**. Une modale ouverte depuis une modale est interdite — pas
- **[non qualifié]** quand une action dans une modale a elle-même besoin d'une confirmation (ex. supprimer un élément
- **[non qualifié]** trois familles couvrent l'usage légitime de la modale, et rien d'autre n'en justifie une quatrième
- **[non qualifié]** la largeur suit la famille, pas l'inverse — une confirmation reste sur `narrow` même si son texte
- **[non qualifié]** toute action destructive et irréversible se confirme dans une modale de la famille « confirmation »
- **[non qualifié]** le **titre et le corps nomment l'objet réel**, jamais un « Confirmer » générique — « Supprimer le
- **[non qualifié]** le bouton destructif porte `filled` + `destructive` (renvoi `BUTTON-UX.md`) et se positionne selon la
- **[non qualifié]** pour une destruction à enjeu élevé (volume important, coûteuse à recréer), la modale porte la
- **[non qualifié]** trois sorties toujours actives, héritées d'`OVERLAY-UX.md` sans exception : **Échap**, la **croix** du
- **[non qualifié]** le clic-voile se **désarme** (`dismissOnScrim={false}`) quand une fermeture accidentelle perdrait une
- **[non qualifié]** toute modale a un **titre** — le `Modal.Header` le porte, et devient le **nom accessible** de la
- **[non qualifié]** le titre **nomme la tâche ou la question**, jamais l'objet générique du composant (« Confirmation »
- **[non qualifié]** la modale applique le contrat de focus d'`OVERLAY-UX.md` sans variation : à l'ouverture, le focus
- **[non qualifié]** un `Header` avec `closable` (par défaut) place la **croix** en dernier élément focalisable naturel de
- **[non qualifié]** au-delà de la hauteur disponible, seul le `Body` défile — jamais la page derrière (déjà verrouillée
- **[non qualifié]** un `Footer` d'actions reste **visible sans défiler** — jamais relégué en bas d'un contenu qui déborde,
- **[non qualifié]** Modal et Drawer partagent **toute** la mécanique modale d'`OVERLAY-UX.md` (scrim, piège, Échap,
- **[non qualifié]** Toast et Alert **n'interrompent pas** — non-modaux (toast) ou dans le flux (alert), ils ne posent
- **[non qualifié]** le **scrim**, le **z-index**, le **piège de focus**, le **scroll-lock** restent la propriété

## Non couvert — poser la question, ne rien trancher

- Formulaire long multi-champs : Inscription, réglages complets d'un objet — plusieurs sections de champs.
- Wizard multi-étapes : Séquence d'écrans qui progresse vers un but (ex. création de compte).
- À l'arrivée sur une URL profonde (deep link) : Une route applicative ouvre directement la modale au chargement.
- Ouverture automatique sans interaction : Une modale s'affiche au chargement sans déclencheur explicite (ex. onboarding).
- Confirmation de perte de données avant fermeture : Échap ou la croix sont actionnés avec une saisie non enregistrée.
- Drawer : Un panneau ancré à un bord plutôt que centré à l'écran.
- Toast : Une notification éphémère et non-modale, sans décision requise.
- Alert inline : Un message dans le flux de la page, non superposé.
- Popover / dropdown : Un superposé non-modal ancré au déclencheur, pour un détail court.
- Modale sur modale (empilement) : Une seconde modale s'ouvrirait depuis une première déjà ouverte.
- Page dédiée : Un contenu long, autonome, navigable et partageable par URL.
- Confirmation native du navigateur (beforeunload) : L'avertissement natif à la fermeture d'onglet ou de fenêtre.
