---
sujet: input
nature: components
resume: "Ce fichier contient le raisonnement : quand valider, quel wording, quels risques."
selon-contexte: [accessibility, adaptive, border, button, emotion, form, interaction, motion, toast, typography, voice]
source: INPUT-UX.md v1.7.1 + INPUT-UI.md v1.6.0
empreinte: sha256:df4c0e6aef8b4e07
regles: {loi: 22, preference: 35, non_qualifie: 0}
---
# RULES — input (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Le tone (neutral/error/success/warning) doit reprendre les états de validation natifs à tous les frameworks UI courants (ex. Material UI). `INPUT-R02`
- **[préférence]** Nous définissons l'input comme l'expression canonique de l'intention de saisie : label, bordure et contenu signalent où saisir, même au repos. `INPUT-R05`
- **[préférence]** Nous excluons toute élévation de type action sur l'input : le focus et la bordure d'état portent seuls l'expression de la saisie. `INPUT-R06`
- **[préférence]** Nous imposons que label, valeur, contrainte nécessaire et message d'erreur restent visibles dans toute adaptation d'espace. `INPUT-R07`
- **[loi]** La transition de couleur de la bordure d'état doit rester un feedback qui confirme un changement déjà signalé ailleurs, jamais son unique vecteur d'information. `INPUT-R08`
- **[loi]** L'information d'erreur ne doit jamais reposer sur la seule couleur ou animation de la bordure : elle doit être portée par un texte lié techniquement au champ. `INPUT-R09`
- **[préférence]** Nous choisissons de conserver la transition de couleur de la bordure d'état sous prefers-reduced-motion, cette préférence ciblant le mouvement spatial, pas la couleur. `INPUT-R10`
- **[préférence]** Nous n'insérons le message d'erreur qu'à la suite d'une action de l'utilisateur, jamais par un déplacement de contenu non sollicité. `INPUT-R11`
- **[préférence]** Nous recommandons l'input pour toute donnée exprimée en texte libre ou semi-libre, comme un nom, un email, un montant ou une recherche. `INPUT-R12`
- **[préférence]** Nous déconseillons l'input pour un choix parmi des options prédéfinies et limitées, ce rôle revenant au select, au radio ou à la checkbox. `INPUT-R13`
- **[préférence]** Nous classons le champ de recherche comme un input, et non une action, car la nature de la donnée saisie prime sur l'action déclenchée ensuite. `INPUT-R14`
- **[loi]** Le type de champ HTML doit correspondre à la nature réelle de la donnée saisie, car il détermine le clavier, la validation native et le comportement attendu. `INPUT-R15`
- **[préférence]** Nous utilisons le tone neutral par défaut, tant qu'aucune validation en cours ou réussie ne nécessite d'être signalée visuellement. `INPUT-R16`
- **[préférence]** Nous utilisons le tone error pour signaler qu'une valeur ne respecte pas le format ou la contrainte attendue. `INPUT-R17`
- **[préférence]** Nous déclenchons la validation inline au blur, sauf sur les champs à fort risque de format où elle se joue ~500ms après la frappe, jamais avant la première saisie complète. `INPUT-R18`
- **[préférence]** Nous réservons le tone success aux champs à forte friction perçue, comme la disponibilité d'un identifiant, plutôt qu'à toute validation réussie. `INPUT-R20`
- **[préférence]** Nous utilisons le tone warning pour signaler une valeur acceptée mais qui mérite l'attention, plus rarement que sur le bouton. `INPUT-R21`
- **[loi]** Un message d'erreur doit décrire l'écart et la correction sans jamais qualifier ou blâmer l'utilisateur. `INPUT-R22`
- **[loi]** Un message d'erreur doit expliquer pourquoi la valeur est invalide et comment la corriger, pas seulement signaler qu'elle est fausse. `INPUT-R23`
- **[préférence]** Nous réservons la validation inline aux champs à fort risque d'erreur, car la généraliser oblige à un va-et-vient constant entre saisie et correction. `INPUT-R24`
- **[préférence]** Nous distinguons le helper text, aide persistante visible dès le focus, du message d'erreur qui le remplace temporairement. `INPUT-R25`
- **[préférence]** Nous faisons en sorte que le message d'erreur remplace temporairement le helper text plutôt que de s'y ajouter. `INPUT-R26`
- **[préférence]** Nous affichons le compteur de caractères dès l'apparition du champ à limite, avant que l'utilisateur commence à taper. `INPUT-R27`
- **[préférence]** Nous intégrons le prefix ou suffix comme élément non éditable à l'intérieur du champ, jamais comme un label externe séparé. `INPUT-R28`
- **[préférence]** Nous n'affichons le bouton d'effacement qu'une fois le champ non vide. `INPUT-R29`
- **[préférence]** Nous marquons systématiquement tout champ obligatoire par un astérisque ou une mention textuelle équivalente. `INPUT-R30`
- **[loi]** Un message d'erreur doit être précédé du mot « Erreur » ou d'une icône dédiée, jamais signalé par la seule couleur du texte. `INPUT-R31`
- **[loi]** Le champ doit accepter dictée et collage sans interception bloquante ; tout formatage doit s'appliquer après coup, jamais en empêchant la saisie. `INPUT-R32`
- **[loi]** Le nom accessible du champ doit contenir le texte de son libellé visible, conformément à WCAG 2.5.3 (Label in Name). `INPUT-R33`
- **[préférence]** Nous réservons la taille sm de l'input aux tableaux éditables, cellules inline et filtres compacts. `INPUT-R34`
- **[préférence]** Nous utilisons la taille md comme taille par défaut de l'input, pour les formulaires standards. `INPUT-R35`
- **[préférence]** Nous réservons la taille lg aux champs de recherche hero et aux formulaires d'onboarding à fort enjeu de conversion. `INPUT-R36`
- **[préférence]** Nous interdisons de mélanger les tailles d'input au sein d'un même groupe de champs liés, comme un bloc adresse. `INPUT-R37`
- **[loi]** Le label du champ doit rester visible en permanence, y compris pendant la saisie ; il ne doit jamais être porté uniquement par le placeholder. `INPUT-R38`
- **[préférence]** Nous groupons visuellement les champs appartenant à un même ensemble logique, comme un bloc adresse. `INPUT-R39`
- **[préférence]** Nous exigeons que le passage en mode édition d'un champ inline soit visuellement non ambigu. `INPUT-R41`
- **[loi]** La barre de recherche doit utiliser le type HTML natif « search » plutôt qu'un champ texte stylisé, pour conserver les comportements natifs du navigateur. `INPUT-R42`
- **[loi]** Le champ de mot de passe doit capturer une donnée sensible masquée par défaut, tout en restant vérifiable par l'utilisateur avant soumission. `INPUT-R44`
- **[loi]** Un formulaire doit utiliser un seul champ de mot de passe avec un toggle de visibilité, plutôt qu'un champ de confirmation séparé. `INPUT-R45`
- **[loi]** Le champ de mot de passe doit rester masqué par défaut ; seul un toggle actionné explicitement peut afficher le texte en clair, jamais l'inverse. `INPUT-R46`
- **[loi]** Au moment de la soumission, le champ doit revenir au type « password » s'il ne l'était pas déjà. `INPUT-R47`
- **[loi]** Le champ de mot de passe doit toujours autoriser le copier-coller, car le bloquer casse l'usage des gestionnaires de mots de passe. `INPUT-R48`
- **[loi]** Le champ de mot de passe doit désactiver la correction orthographique et la mise en majuscule automatique. `INPUT-R49`
- **[préférence]** Nous affichons les exigences de format du mot de passe avant la saisie, sans imposer de règle de complexité sans justification de sécurité réelle. `INPUT-R50`
- **[loi]** Le champ de carte bancaire doit être traité comme une donnée à très haut risque, encadrée par la contrainte non négociable de conformité PCI-DSS. `INPUT-R51`
- **[loi]** Les champs numéro de carte et CVV doivent être rendus via l'iframe du processeur de paiement, hors du contrôle direct du design system. `INPUT-R52`
- **[loi]** Les champs de paiement non sensibles (titulaire, adresse de facturation) doivent utiliser les valeurs autocomplete standard dédiées. `INPUT-R53`
- **[loi]** Le remplissage automatique du navigateur ou d'un gestionnaire de mots de passe est un comportement natif qui doit être anticipé, pas subi. `INPUT-R54`
- **[loi]** L'autofill du navigateur ne doit jamais être désactivé sans raison de sécurité valable et documentée. `INPUT-R55`
- **[préférence]** Nous excluons tout instrument E-motion du champ de saisie lui-même, car la saisie est une action réflexe et à haute fréquence. `INPUT-R56`
- **[préférence]** Nous maintenons le champ en état error dans un registre strictement productif, le soulagement de la résolution restant porté par un composant séparé. `INPUT-R57`
- **[préférence]** Nous calibrons la friction de validation sur le risque réel d'erreur du champ, plutôt que d'appliquer un traitement uniforme. `INPUT-R58`

## Consignes d'implémentation

- **[préférence]** Le code anime la couleur de la bordure d'état en motion.fast/ease-out, tandis que le message d'erreur apparaît sans délai. `INPUT-U01`
- **[préférence]** Le code conserve la transition de couleur de la bordure d'état sous prefers-reduced-motion, en héritant du bloc média global. `INPUT-U02`
- **[préférence]** Le code fixe l'élévation de l'Input à elevation.none dans tous ses états, sans inset requis. `INPUT-U03`
- **[préférence]** Le code ne doit jamais masquer le label, la valeur, une contrainte nécessaire ou le message d'erreur via une Container Query. `INPUT-U04`
- **[préférence]** Le code de l'Input n'utilise jamais breakpoint.mobile pour déduire sa largeur ; la réorganisation est déléguée au pattern parent. `INPUT-U05`

## Non couvert — poser la question, ne rien trancher

- Dans une modale : La saisie se fait dans une fenêtre superposée.
- Filtre (liste, dashboard) : Le champ affine un résultat affiché.
- Formulaire multi-étapes : Le champ appartient à un parcours en étapes.
- Champ de commentaire/réponse : La saisie est sociale, avec envoi séparé.
- Autocomplete / suggestions : Des propositions apparaissent pendant la saisie.
- Validation asynchrone (ex: dispo d'un username) : Un verdict vient du serveur pendant la saisie.
- Autosave : La saisie se sauvegarde sans action explicite.
- Autofill / gestionnaire de mots de passe navigateur : Le navigateur remplit automatiquement le champ.
- Label flottant (floating label) : Le label rétrécit et monte au focus.
- Icône leading/trailing dans le champ : Une icône de contexte accompagne le champ.
- Champs connectés (ex: select + input) : Deux composants sont visuellement fusionnés.
- Champ de paiement (carte bancaire) : L'utilisateur saisit une carte bancaire.
- Données personnelles sensibles : Le champ collecte des données sensibles.
- Recherche critique pour le produit : La recherche est au cœur du produit.
