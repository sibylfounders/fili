---
sujet: input
nature: components
resume: "Ce fichier contient le raisonnement : quand valider, quel wording, quels risques."
selon-contexte: [accessibility, adaptive, border, button, emotion, form, interaction, motion, toast, typography, voice]
source: INPUT-UX.md v1.7.1 + INPUT-UI.md v1.6.0
empreinte: sha256:df4c0e6aef8b4e07
regles: {loi: 22, preference: 35, non_qualifie: 0}
---
# RULES — input (compilé, mode audit)

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
  - vérifiable : au repos, le champ affiche un label visible, une bordure délimitée et l'espace de contenu, sans nécessiter d'interaction.
- **[préférence]** Nous excluons toute élévation de type action sur l'input : le focus et la bordure d'état portent seuls l'expression de la saisie. `INPUT-R06`
  - vérifiable : le champ ne porte aucune élévation de type action ; un inset éventuel n'est jamais l'unique délimitation visible.
- **[préférence]** Nous imposons que label, valeur, contrainte nécessaire et message d'erreur restent visibles dans toute adaptation d'espace. `INPUT-R07`
  - vérifiable : dans toute adaptation d'espace, le label, la valeur, la contrainte nécessaire et le message d'erreur restent visibles ; seule une aide secondaire non requise peut disparaître.
- **[loi]** La transition de couleur de la bordure d'état doit rester un feedback qui confirme un changement déjà signalé ailleurs, jamais son unique vecteur d'information. `INPUT-R08`
  - vérifiable : la transition de bordure d'état confirme un changement déjà signalé ailleurs (texte), elle ne le porte jamais seule.
- **[loi]** L'information d'erreur ne doit jamais reposer sur la seule couleur ou animation de la bordure : elle doit être portée par un texte lié techniquement au champ. `INPUT-R09`
  - vérifiable : le message d'erreur est signalé par le mot « Erreur » associé via aria-describedby, indépendamment de toute couleur ou animation de bordure.
- **[préférence]** Nous choisissons de conserver la transition de couleur de la bordure d'état sous prefers-reduced-motion, cette préférence ciblant le mouvement spatial, pas la couleur. `INPUT-R10`
  - vérifiable : sous prefers-reduced-motion, la transition de couleur de la bordure d'état reste active.
- **[préférence]** Nous n'insérons le message d'erreur qu'à la suite d'une action de l'utilisateur, jamais par un déplacement de contenu non sollicité. `INPUT-R11`
  - vérifiable : le message d'erreur apparaît uniquement après une action utilisateur (blur, soumission), jamais par déplacement spontané du contenu.
- **[préférence]** Nous recommandons l'input pour toute donnée exprimée en texte libre ou semi-libre, comme un nom, un email, un montant ou une recherche. `INPUT-R12`
- **[préférence]** Nous déconseillons l'input pour un choix parmi des options prédéfinies et limitées, ce rôle revenant au select, au radio ou à la checkbox. `INPUT-R13`
- **[préférence]** Nous classons le champ de recherche comme un input, et non une action, car la nature de la donnée saisie prime sur l'action déclenchée ensuite. `INPUT-R14`
- **[loi]** Le type de champ HTML doit correspondre à la nature réelle de la donnée saisie, car il détermine le clavier, la validation native et le comportement attendu. `INPUT-R15`
  - vérifiable : le type HTML natif utilisé (text/email/password/number/search/textarea) correspond à la nature réelle de la donnée attendue.
- **[préférence]** Nous utilisons le tone neutral par défaut, tant qu'aucune validation en cours ou réussie ne nécessite d'être signalée visuellement. `INPUT-R16`
  - vérifiable : en l'absence de validation active à afficher, le champ est en tone neutral.
- **[préférence]** Nous utilisons le tone error pour signaler qu'une valeur ne respecte pas le format ou la contrainte attendue. `INPUT-R17`
  - vérifiable : le tone error s'affiche lorsque la valeur ne respecte pas le format ou la contrainte attendue.
- **[préférence]** Nous déclenchons la validation inline au blur, sauf sur les champs à fort risque de format où elle se joue ~500ms après la frappe, jamais avant la première saisie complète. `INPUT-R18`
  - vérifiable : la validation inline se déclenche au blur, ou après environ 500ms sans frappe sur les champs à risque (email, mot de passe) ; jamais avant la fin de la première saisie.
- **[préférence]** Nous réservons le tone success aux champs à forte friction perçue, comme la disponibilité d'un identifiant, plutôt qu'à toute validation réussie. `INPUT-R20`
  - vérifiable : le tone success n'est utilisé que sur des champs à forte friction perçue, pas systématiquement sur chaque champ valide.
- **[préférence]** Nous utilisons le tone warning pour signaler une valeur acceptée mais qui mérite l'attention, plus rarement que sur le bouton. `INPUT-R21`
  - vérifiable : le tone warning est utilisé sur une valeur acceptée mais signalée comme perfectible.
- **[loi]** Un message d'erreur doit décrire l'écart et la correction sans jamais qualifier ou blâmer l'utilisateur. `INPUT-R22`
- **[loi]** Un message d'erreur doit expliquer pourquoi la valeur est invalide et comment la corriger, pas seulement signaler qu'elle est fausse. `INPUT-R23`
  - vérifiable : chaque message d'erreur indique la cause du problème et l'action de correction, pas seulement l'invalidité (ex: pas seulement « Champ invalide »).
- **[préférence]** Nous réservons la validation inline aux champs à fort risque d'erreur, car la généraliser oblige à un va-et-vient constant entre saisie et correction. `INPUT-R24`
  - vérifiable : la validation inline n'est appliquée que sur les champs à fort risque d'erreur de format, pas sur l'ensemble d'un formulaire.
- **[préférence]** Nous distinguons le helper text, aide persistante visible dès le focus, du message d'erreur qui le remplace temporairement. `INPUT-R25`
  - vérifiable : le helper text apparaît sous le label dès le focus, indépendamment de la validation ; il est remplacé, pas cumulé, par le message d'erreur actif.
- **[préférence]** Nous faisons en sorte que le message d'erreur remplace temporairement le helper text plutôt que de s'y ajouter. `INPUT-R26`
  - vérifiable : quand l'erreur est active, le helper text n'est pas affiché simultanément.
- **[préférence]** Nous affichons le compteur de caractères dès l'apparition du champ à limite, avant que l'utilisateur commence à taper. `INPUT-R27`
  - vérifiable : sur un champ à limite de caractères, le compteur est visible dès l'affichage du champ, avant toute frappe, au format 'saisi/maximum'.
- **[préférence]** Nous intégrons le prefix ou suffix comme élément non éditable à l'intérieur du champ, jamais comme un label externe séparé. `INPUT-R28`
  - vérifiable : un prefix ou suffix est rendu à l'intérieur du champ, non éditable, et non positionné comme un label externe.
- **[préférence]** Nous n'affichons le bouton d'effacement qu'une fois le champ non vide. `INPUT-R29`
  - vérifiable : le bouton d'effacement n'est visible/actif que lorsque le champ contient du texte.
- **[préférence]** Nous marquons systématiquement tout champ obligatoire par un astérisque ou une mention textuelle équivalente. `INPUT-R30`
  - vérifiable : chaque champ obligatoire porte un astérisque ou une mention textuelle équivalente, indépendante de la couleur.
- **[loi]** Un message d'erreur doit être précédé du mot « Erreur » ou d'une icône dédiée, jamais signalé par la seule couleur du texte. `INPUT-R31`
  - vérifiable : le message d'erreur est précédé du mot « Erreur » ou d'une icône dédiée, et ne repose pas uniquement sur la couleur rouge.
- **[loi]** Le champ doit accepter dictée et collage sans interception bloquante ; tout formatage doit s'appliquer après coup, jamais en empêchant la saisie. `INPUT-R32`
  - vérifiable : le champ n'intercepte aucune touche de façon à bloquer la dictée ou le collage ; tout formatage s'applique après coup sur la valeur.
- **[loi]** Le nom accessible du champ doit contenir le texte de son libellé visible, conformément à WCAG 2.5.3 (Label in Name). `INPUT-R33`
  - vérifiable : le texte du label visible est inclus dans le nom accessible (aria-label ne le contredit ni ne le remplace).
- **[préférence]** Nous réservons la taille sm de l'input aux tableaux éditables, cellules inline et filtres compacts. `INPUT-R34`
- **[préférence]** Nous utilisons la taille md comme taille par défaut de l'input, pour les formulaires standards. `INPUT-R35`
- **[préférence]** Nous réservons la taille lg aux champs de recherche hero et aux formulaires d'onboarding à fort enjeu de conversion. `INPUT-R36`
- **[préférence]** Nous interdisons de mélanger les tailles d'input au sein d'un même groupe de champs liés, comme un bloc adresse. `INPUT-R37`
  - vérifiable : tous les champs d'un même groupe logique (ex: adresse) utilisent la même taille, sans mélange.
- **[loi]** Le label du champ doit rester visible en permanence, y compris pendant la saisie ; il ne doit jamais être porté uniquement par le placeholder. `INPUT-R38`
  - vérifiable : le label reste visible en permanence, y compris pendant la saisie ; il n'est jamais porté uniquement par le placeholder.
- **[préférence]** Nous groupons visuellement les champs appartenant à un même ensemble logique, comme un bloc adresse. `INPUT-R39`
  - vérifiable : les champs d'un même ensemble logique sont rapprochés visuellement (espacement réduit, bordure ou fond commun).
- **[préférence]** Nous exigeons que le passage en mode édition d'un champ inline soit visuellement non ambigu. `INPUT-R41`
  - vérifiable : le mode édition inline se distingue visuellement du mode lecture par au moins un changement de bordure ou de fond.
- **[loi]** La barre de recherche doit utiliser le type HTML natif « search » plutôt qu'un champ texte stylisé, pour conserver les comportements natifs du navigateur. `INPUT-R42`
  - vérifiable : la barre de recherche utilise le type HTML natif 'search', pas un 'text' stylisé pour ressembler à une recherche.
- **[loi]** Le champ de mot de passe doit capturer une donnée sensible masquée par défaut, tout en restant vérifiable par l'utilisateur avant soumission. `INPUT-R44`
  - vérifiable : le champ mot de passe est masqué par défaut et propose un moyen de vérifier la valeur avant soumission.
- **[loi]** Un formulaire doit utiliser un seul champ de mot de passe avec un toggle de visibilité, plutôt qu'un champ de confirmation séparé. `INPUT-R45`
  - vérifiable : le formulaire ne comporte qu'un seul champ mot de passe, avec un toggle afficher/masquer, sans champ de confirmation.
- **[loi]** Le champ de mot de passe doit rester masqué par défaut ; seul un toggle actionné explicitement peut afficher le texte en clair, jamais l'inverse. `INPUT-R46`
  - vérifiable : le champ est masqué par défaut ; seule une action explicite (clic sur le toggle) révèle temporairement le texte en clair.
- **[loi]** Au moment de la soumission, le champ doit revenir au type « password » s'il ne l'était pas déjà. `INPUT-R47`
  - vérifiable : au moment de la soumission, le champ mot de passe est de type 'password', même s'il avait été affiché en clair juste avant.
- **[loi]** Le champ de mot de passe doit toujours autoriser le copier-coller, car le bloquer casse l'usage des gestionnaires de mots de passe. `INPUT-R48`
  - vérifiable : le champ mot de passe n'intercepte ni ne bloque les actions copier/coller.
- **[loi]** Le champ de mot de passe doit désactiver la correction orthographique et la mise en majuscule automatique. `INPUT-R49`
  - vérifiable : le champ mot de passe porte les attributs spellcheck="false" et autocapitalize="off".
- **[préférence]** Nous affichons les exigences de format du mot de passe avant la saisie, sans imposer de règle de complexité sans justification de sécurité réelle. `INPUT-R50`
  - vérifiable : les exigences de format du mot de passe sont affichées avant la saisie, pas seulement en cas d'erreur.
- **[loi]** Le champ de carte bancaire doit être traité comme une donnée à très haut risque, encadrée par la contrainte non négociable de conformité PCI-DSS. `INPUT-R51`
- **[loi]** Les champs numéro de carte et CVV doivent être rendus via l'iframe du processeur de paiement, hors du contrôle direct du design system. `INPUT-R52`
  - vérifiable : les champs numéro de carte et CVV sont rendus dans un iframe fourni par le processeur de paiement, pas par les composants input du design system.
- **[loi]** Les champs de paiement non sensibles (titulaire, adresse de facturation) doivent utiliser les valeurs autocomplete standard dédiées. `INPUT-R53`
  - vérifiable : les champs adjacents non sensibles utilisent les valeurs autocomplete dédiées (cc-name, cc-exp, cc-csc).
- **[loi]** Le remplissage automatique du navigateur ou d'un gestionnaire de mots de passe est un comportement natif qui doit être anticipé, pas subi. `INPUT-R54`
- **[loi]** L'autofill du navigateur ne doit jamais être désactivé sans raison de sécurité valable et documentée. `INPUT-R55`
  - vérifiable : l'autofill n'est désactivé sur aucun champ, sauf raison de sécurité documentée.
- **[préférence]** Nous excluons tout instrument E-motion du champ de saisie lui-même, car la saisie est une action réflexe et à haute fréquence. `INPUT-R56`
  - vérifiable : aucun instrument E-motion n'est déclenché par le champ de saisie lui-même.
- **[préférence]** Nous maintenons le champ en état error dans un registre strictement productif, le soulagement de la résolution restant porté par un composant séparé. `INPUT-R57`
  - vérifiable : un champ en état error reste en registre strictement productif ; le soulagement de la résolution est porté par un autre composant (toast, alert success).
- **[préférence]** Nous calibrons la friction de validation sur le risque réel d'erreur du champ, plutôt que d'appliquer un traitement uniforme. `INPUT-R58`
  - vérifiable : le niveau de validation appliqué varie selon le risque d'erreur du champ, et n'est pas uniforme sur tous les champs.

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Combinaison | Risque principal | Sévérité |
|---|---|---|
| Validation à la soumission uniquement sur un champ à fort risque de format | Abandon, redécouverte punitive d'erreurs (la stratégie du formulaire assemblé : FORM-UX.md) | Élevée |
| Label en placeholder seul | Perte de repère, erreur de saisie | Moyenne |
| Type HTML non natif (ex: text stylé en email) | Perte de comportements natifs, accessibilité | Moyenne |
| Label non lié techniquement au champ | Exclusion lecteur d'écran | Critique |
| Nom accessible divergent du libellé visible | Champ inadressable en commande vocale (WCAG 2.5.3) | Moyenne |
| Masque de saisie qui rejette dictée/collage | Saisie vocale ou gestionnaire de mots de passe cassés | Moyenne |
| Champ mot de passe sans toggle de visibilité | Erreurs de saisie non détectées, abandon | Moyenne |
| Champ de paiement stylé hors iframe processeur | Non-conformité PCI-DSS | Critique |
| Autofill navigateur non anticipé dans le design | Rupture visuelle du design system | Faible à moyenne |

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
