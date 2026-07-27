---
sujet: form
nature: patterns
resume: "Ce fichier n'est pas un composant au sens de BUTTON-UX.md ou INPUT-UX.md — c'est un **pattern**, une règle qui n'émerge que quand plusieurs champs et un bouton sont assemblés."
selon-contexte: [alert, button, emotion, input, interaction, motion, toast, voice]
source: FORM-UX.md v2.3.1 + FORM-UI.md v1.3.0
empreinte: sha256:702de78bed9c68f5
regles: {loi: 17, preference: 52, non_qualifie: 0}
---
# RULES — form (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Les champs formant un groupe de sens doivent être réunis dans un fieldset avec une legend, pour que les lecteurs d'écran annoncent le contexte du groupe. `FORM-R04`
  - vérifiable : chaque groupe de champs liés par le sens est contenu dans un fieldset dont la legend nomme le groupe
- **[loi]** L'ordre des champs et du focus doit suivre la logique de la tâche et ne jamais utiliser de tabindex positif pour corriger un DOM mal ordonné. `FORM-R05`
  - vérifiable : aucun attribut tabindex positif n'est utilisé sur les champs du formulaire
- **[préférence]** Nous limitons chaque formulaire à un seul bouton de soumission, positionné en fin de flux. `FORM-R06`
  - vérifiable : le formulaire ne contient qu'un seul bouton de type submit
- **[préférence]** Nous définissons un formulaire comme long non par un nombre de champs mais par le besoin de scroller pour voir toutes les erreurs possibles. `FORM-R07`
  - vérifiable : le formulaire est classé long dès que l'utilisateur doit scroller pour voir toutes les erreurs possibles
- **[préférence]** Dans une modale, nous réservons le formulaire aux saisies courtes et déplaçons tout formulaire long en page complète. `FORM-R08`
- **[préférence]** Nous décidons une fois pour tout le formulaire s'il marque les champs requis ou les champs optionnels, jamais champ par champ. `FORM-R10`
  - vérifiable : la convention de marquage requis/optionnel est identique pour tous les champs d'un même formulaire
- **[préférence]** Nous marquons uniquement la minorité des champs, requis ou optionnels selon la proportion, pour que le marqueur reste informatif. `FORM-R11`
  - vérifiable : si la majorité des champs sont obligatoires, seuls les optionnels portent la mention (optionnel) ; sinon seuls les obligatoires sont marqués ; si tous sont obligatoires, une mention unique figure en tête
- **[préférence]** Nous affichons toujours en tête de formulaire une phrase expliquant la convention de marquage retenue, pas seulement l'indicateur visuel isolé. `FORM-R12`
  - vérifiable : une phrase en tête du formulaire explique la convention retenue (ex. Les champs marqués * sont obligatoires)
- **[loi]** Chaque champ obligatoire doit porter l'attribut required ou aria-required="true" en plus de son indicateur visuel. `FORM-R13`
  - vérifiable : chaque champ obligatoire porte l'attribut HTML required ou aria-required="true"
- **[préférence]** Nous appliquons la même convention requis/optionnel à tous les formulaires du produit, jamais une convention différente d'un écran à l'autre. `FORM-R14`
  - vérifiable : la même convention de marquage requis/optionnel est appliquée sur tous les formulaires du produit
- **[préférence]** Nous décidons la stratégie de timing de validation au niveau du formulaire entier, pas champ par champ. `FORM-R15`
- **[préférence]** Nous choisissons par formulaire entre valider uniquement à la soumission ou valider au blur avec un délai d'environ 500 ms sur les champs à risque. `FORM-R16`
  - vérifiable : la validation au blur est différée d'environ 500 ms pendant la frappe, ou le formulaire ne valide qu'au submit
- **[préférence]** Nous ne validons jamais un champ à chaque frappe sans délai, ni avant que l'utilisateur ait terminé sa première saisie. `FORM-R17`
  - vérifiable : aucune validation ne se déclenche à chaque frappe sans délai, ni avant que l'utilisateur ait quitté le champ pour la première fois
- **[loi]** Les contraintes de format connues d'avance doivent être expliquées avant la saisie, pas seulement révélées après une erreur. `FORM-R18`
  - vérifiable : chaque champ à format contraint affiche son format attendu avant la saisie, via un texte d'aide visible
- **[préférence]** Nous rattachons une erreur de combinaison entre champs à leur groupe entier, jamais à un champ isolé arbitraire. `FORM-R19`
  - vérifiable : le message d'erreur nomme la relation entre les champs et le lien du résumé mène au premier champ du groupe dans l'ordre de lecture
- **[loi]** Après un échec de soumission, une vue d'ensemble de toutes les erreurs doit être donnée avant que l'utilisateur ne les redécouvre en scrollant. `FORM-R20`
  - vérifiable : un résumé listant toutes les erreurs apparaît après un échec de soumission
- **[loi]** Le résumé d'erreurs doit être structuré comme une alerte de tonalité danger, non fermable, annoncée via role="alert". `FORM-R21`
  - vérifiable : le résumé d'erreurs est un composant alert de tone danger, non fermable tant que des erreurs subsistent, avec role="alert"
- **[loi]** Le résumé d'erreurs ne doit apparaître qu'après un échec de soumission, jamais de façon préventive. `FORM-R22`
  - vérifiable : le résumé d'erreurs n'est jamais affiché avant une tentative de soumission
- **[loi]** Le résumé d'erreurs doit lister des liens d'ancre vers chaque champ en erreur, en reprenant le message d'erreur exact. `FORM-R23`
  - vérifiable : chaque entrée du résumé est un lien d'ancre vers le champ en erreur reprenant son message d'erreur exact, pas un intitulé générique
- **[loi]** Le résumé d'erreurs ne doit jamais remplacer les messages d'erreur inline à côté de chaque champ — les deux doivent coexister. `FORM-R24`
  - vérifiable : chaque champ en erreur affiche un message d'erreur inline en plus de son entrée dans le résumé
- **[préférence]** Nous préfixons le titre de la page par « Erreur : » après un échec de soumission d'un formulaire rendu côté serveur. `FORM-R25`
  - vérifiable : le title de la page est préfixé par 'Erreur :' après un échec de soumission
- **[préférence]** Nous déplaçons le focus vers le premier champ en erreur pour un formulaire court, ou vers le résumé pour un formulaire long ou à erreurs multiples. `FORM-R26`
  - vérifiable : après échec, le focus va au premier champ en erreur (formulaire court) ou au résumé d'erreurs (formulaire long ou erreurs multiples)
- **[préférence]** Nous faisons en sorte qu'un champ atteint depuis un lien du résumé conserve son message d'erreur et sa valeur saisie. `FORM-R27`
  - vérifiable : un champ atteint depuis un lien du résumé conserve son message d'erreur inline et sa valeur fautive
- **[préférence]** Nous gardons le bouton de soumission actif en permanence avant l'envoi, plutôt que de le désactiver comme validation préalable. `FORM-R28`
  - vérifiable : le bouton de soumission n'est jamais désactivé avant la soumission, hors traitement asynchrone de l'envoi
- **[préférence]** Nous ne désactivons le bouton de soumission que pendant le traitement asynchrone de l'envoi, jamais comme validation préalable. `FORM-R29`
  - vérifiable : le bouton n'est désactivé que pendant le traitement asynchrone de l'envoi (état submitting)
- **[préférence]** Chaque état du cycle de soumission définit précisément ce qui devient visible, ce qui est annoncé, où va le focus et le sort des valeurs saisies. `FORM-R31`
  - vérifiable : chaque état du cycle de soumission a un comportement défini pour le focus, l'annonce ARIA, l'état du bouton et la conservation des valeurs
- **[préférence]** Nous réaffichons toujours les champs avec exactement les valeurs saisies par l'utilisateur après un échec, quelle qu'en soit la cause. `FORM-R32`
  - vérifiable : après tout échec (validation, serveur, timeout), tous les champs réaffichent exactement les valeurs saisies par l'utilisateur
- **[préférence]** Nous faisons toujours prévaloir le verdict du serveur sur celui du client quand les deux se contredisent sur un champ. `FORM-R33`
  - vérifiable : en cas de désaccord entre validation client et serveur sur un champ, seule l'erreur serveur est affichée
- **[préférence]** Nous ne proposons d'annuler une soumission en cours que si l'annulation est réellement possible, sans jamais le simuler faussement. `FORM-R34`
- **[préférence]** En cas de session expirée ou de perte de connexion, nous informons toujours l'utilisateur de ce qui s'est passé et de ce qui est préservé. `FORM-R35`
- **[préférence]** Pour un envoi à effet unique comme un paiement, l'idempotence côté produit reste nécessaire en plus des mécanismes anti double-activation. `FORM-R36`
- **[préférence]** Nous distinguons toujours une erreur serveur portant sur un champ précis d'une erreur globale, jamais déguisée en erreur de champ. `FORM-R37`
  - vérifiable : une erreur de champ renvoyée par le serveur s'affiche inline et dans le résumé ; une erreur globale (5xx) s'affiche en alert danger en tête, jamais rattachée à un champ
- **[préférence]** Nous faisons en sorte qu'un nouvel essai après erreur réutilise les valeurs déjà saisies, sans jamais vider le formulaire. `FORM-R38`
  - vérifiable : un bouton Réessayer soumet à nouveau les valeurs déjà saisies sans les vider
- **[préférence]** Quand seule une partie d'une demande aboutit, nous affichons une alerte d'avertissement listant réussites et reliquat, jamais un simple succès ou échec. `FORM-R40`
  - vérifiable : un succès partiel affiche un alert de tone warning listant ce qui a réussi et ce qui reste à faire, avec le focus dessus
- **[préférence]** Après un succès partiel, seules les parties échouées du formulaire restent soumissibles à nouveau. `FORM-R41`
  - vérifiable : après un succès partiel, seules les parties échouées restent modifiables et resoumises ; les parties réussies sont figées ou retirées
- **[préférence]** Nous découpons un formulaire en plusieurs étapes seulement quand sa longueur ou sa charge cognitive le justifie, jamais par esthétique. `FORM-R42`
- **[préférence]** Chaque étape d'un formulaire multi-étapes valide ses propres champs, sans faire découvrir plus tard une erreur d'une étape déjà validée. `FORM-R43`
  - vérifiable : chaque étape valide uniquement ses propres champs lors de sa propre soumission
- **[préférence]** Le retour en arrière dans un formulaire multi-étapes ne doit jamais perdre les données déjà saisies. `FORM-R44`
  - vérifiable : un lien ou bouton retour est toujours présent et préserve les données de l'étape quittée et des étapes précédentes
- **[loi]** Une information déjà fournie dans le parcours ne doit jamais être redemandée sans être pré-remplie ou rappelée. `FORM-R45`
  - vérifiable : aucune information déjà fournie dans le parcours n'est redemandée sans être pré-remplie ou rappelée
- **[loi]** Un engagement juridique ou financier doit passer par une étape de récapitulation vérifiable avant sa soumission finale. `FORM-R46`
  - vérifiable : une étape de récapitulation avec des liens Modifier vers chaque section précède la soumission finale d'un engagement juridique ou financier
- **[préférence]** Nous ajoutons un indicateur de progression uniquement quand le nombre d'étapes n'est pas évident, jamais cliquable vers l'avant. `FORM-R47`
  - vérifiable : si un indicateur de progression existe, il nomme les étapes, indique la position courante et n'est jamais cliquable vers l'avant
- **[préférence]** Le bouton de la dernière étape d'un formulaire multi-étapes doit refléter l'action réelle, jamais un générique 'Suivant'. `FORM-R48`
  - vérifiable : le bouton de la dernière étape porte un label reflétant l'action réelle, jamais 'Suivant'
- **[préférence]** Quand la validité d'un champ dépend d'un aller-retour serveur, ce champ doit afficher un état d'attente visible et annoncé. `FORM-R49`
  - vérifiable : un champ en validation asynchrone affiche un état d'attente visible et annoncé pendant l'aller-retour serveur
- **[préférence]** Une validation asynchrone en cours ne doit jamais bloquer la soumission en silence. `FORM-R50`
  - vérifiable : si l'utilisateur soumet pendant une validation asynchrone en cours, le formulaire attend le verdict et l'affiche, ou revalide au submit
- **[préférence]** Un verdict de validation asynchrone périmé est toujours jeté, et la soumission revérifie côté serveur. `FORM-R51`
  - vérifiable : si la valeur d'un champ change pendant l'aller-retour, le verdict reçu est ignoré et la soumission revérifie côté serveur
- **[préférence]** La validation asynchrone est réservée aux champs dont la validité ne peut pas être calculée localement. `FORM-R52`
  - vérifiable : la validation asynchrone n'est utilisée que pour des champs dont la validité ne peut pas être vérifiée par une règle locale
- **[préférence]** Un champ ou groupe conditionnel doit toujours apparaître immédiatement après le champ qui le déclenche. `FORM-R53`
  - vérifiable : un champ ou groupe conditionnel apparaît immédiatement après le champ qui le déclenche, dans l'ordre de lecture et de focus
- **[loi]** L'apparition d'un champ conditionnel ne doit jamais voler le focus, et doit être annoncée si l'utilisateur risque de la manquer. `FORM-R54`
  - vérifiable : l'apparition d'un champ conditionnel ne déplace pas le focus automatiquement, et déclenche aria-expanded ou aria-live="polite" si la révélation est distante
- **[préférence]** Une valeur saisie dans un champ ensuite masqué n'est pas soumise mais reste mémorisée pour être restaurée si la condition redevient vraie. `FORM-R55`
  - vérifiable : une valeur saisie puis masquée n'est pas incluse dans la soumission mais reste restaurée si la condition est réactivée ; l'erreur associée disparaît du résumé
- **[préférence]** Dans un groupe répétable, le bouton d'ajout est toujours secondaire et le focus va au nouveau groupe après ajout. `FORM-R56`
  - vérifiable : le bouton d'ajout d'un groupe répétable n'est jamais le bouton primary ; après ajout, le focus va au premier champ du nouveau groupe ; chaque groupe est un fieldset numéroté
- **[préférence]** Nous activons l'autosave seulement quand le coût d'une perte de saisie est élevé, jamais par défaut sur un formulaire court. `FORM-R57`
- **[préférence]** Le statut d'autosave doit être visible en annonce discrète, et un échec d'autosave doit déclencher un avertissement explicite. `FORM-R58`
  - vérifiable : le statut d'autosave est affiché en role="status" ; un échec d'autosave déclenche un alert de tone warning
- **[préférence]** L'autosave ne remplace jamais la soumission du formulaire et ne se déclenche jamais pendant l'envoi lui-même. `FORM-R59`
  - vérifiable : l'autosave ne se déclenche jamais pendant l'état submitting du cycle de soumission
- **[préférence]** À la reprise d'un brouillon, nous annonçons toujours explicitement ce qui a été restauré. `FORM-R60`
  - vérifiable : un message indique explicitement ce qui a été restauré plutôt que de pré-remplir silencieusement
- **[loi]** Toute limite de temps imposée à l'utilisateur doit être supprimable, ajustable ou prolongeable après avertissement, sauf exception normative. `FORM-R61`
  - vérifiable : toute limite de temps imposée par le formulaire est supprimable, ajustable avant son démarrage, ou prolongeable après un avertissement, sauf exception normative
- **[loi]** L'expiration d'une limite de temps doit toujours être annoncée à l'avance, laissant le temps de la prolonger. `FORM-R62`
  - vérifiable : un avertissement d'expiration apparaît avant que la limite de temps ne survienne, avec un moyen de la prolonger
- **[préférence]** Nous assemblons le formulaire à partir de rôles fixes : action pour le submit, navigation pour Modifier, action secondaire pour l'ajout, information pour le résumé. `FORM-R64`
  - vérifiable : le submit est un composant Button, le lien Modifier un Link, l'ajout un bouton secondaire jamais primary, le résumé/message un composant Alert
- **[préférence]** Le formulaire assemblé doit rester lisible en niveaux de gris et sans survol : deux rôles différents ne sont jamais rendus indiscernables. `FORM-R65`
  - vérifiable : en niveaux de gris et sans hover, le submit, les liens Modifier, les champs et le résumé restent visuellement distinguables par rôle
- **[préférence]** Les apparitions orchestrées par le formulaire sont toujours réactives à une action, jamais préventives, et animées en opacité plutôt qu'en glissement. `FORM-R66`
  - vérifiable : le résumé d'erreurs apparaît uniquement en réaction à un échec de soumission, en transition d'opacité, jamais au chargement de la page
- **[préférence]** Le dépliage d'un champ conditionnel est un mouvement de continuité déclenché par l'action de l'utilisateur. `FORM-R67`
  - vérifiable : le dépliage d'un champ ou groupe conditionnel est déclenché par l'action de l'utilisateur, jamais automatique
- **[loi]** Sous la préférence de mouvement réduit, les apparitions du formulaire doivent dégrader en crossfade ou bascule instantanée, sans perte d'information. `FORM-R68`
  - vérifiable : sous prefers-reduced-motion, les apparitions du formulaire dégradent en crossfade ou bascule instantanée, sans glissement, sans perte d'information
- **[préférence]** Nous distinguons toujours le verrou métier d'un verrou d'animation : aucune interaction n'attend qu'une transition visuelle se termine. `FORM-R69`
  - vérifiable : aucune action du formulaire n'attend la fin d'une transition visuelle pour redevenir disponible ; seul un verrou métier explicite peut désactiver les champs
- **[préférence]** Nous faisons correspondre chaque état du cycle de soumission à un registre de ton précis, de la routine à la panne assumée. `FORM-R70`
  - vérifiable : chaque état du cycle de soumission est rédigé dans le registre de ton correspondant défini par la charte éditoriale
- **[préférence]** Nous incarnons la réussite d'un envoi dans un seul porteur choisi selon sa consultabilité, jamais dans deux canaux simultanés. `FORM-R71`
  - vérifiable : le succès d'un envoi n'est incarné que par un seul porteur (alert, toast ou bouton) — jamais deux simultanément pour le même événement
- **[préférence]** Nous réservons tout moment de célébration aux contextes à seuil et ne l'utilisons jamais sur une action répétitive ou réflexe. `FORM-R72`
  - vérifiable : aucun instrument de célébration n'est utilisé sur une recherche, des paramètres sauvés, un autosave ou un envoi répété plusieurs fois par jour
- **[loi]** L'information de succès doit toujours rester disponible par un canal statique et annoncé, que l'animation ne porte jamais seule. `FORM-R73`
  - vérifiable : le succès reste disponible via ARIA et le texte statique indépendamment de toute animation
- **[préférence]** Nous calibrons le niveau de friction sur le coût réel d'une erreur dans le contexte précis du formulaire, jamais uniformément. `FORM-R74`
- **[loi]** Pour tout engagement juridique ou financier, la soumission doit être réversible, vérifiée ou confirmée. `FORM-R75`
  - vérifiable : pour un engagement juridique, financier ou une modification de données contrôlées par l'utilisateur, la soumission est réversible, vérifiée ou confirmée
- **[préférence]** Nous appliquons au formulaire le même principe qu'au bouton et au champ : la friction doit informer, jamais bloquer silencieusement. `FORM-R77`
  - vérifiable : aucun blocage d'interaction (bouton désactivé, soumission silencieuse, formulaire vidé) ne se produit sans indication visible de sa cause

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Contexte | Coût d'une erreur | Friction adaptée |
|---|---|---|
| Recherche | Nul (on relance) | Aucune — pas de résumé d'erreurs, submit implicite (Entrée), formulaire dégénéré à un champ |
| Contact, création rapide d'un objet | Faible | Validation au submit, correction simple ; undo plutôt que confirmation (BUTTON-UX.md) |
| Inscription | Moyen | Validation au blur sur les champs de format, indication des contraintes avant saisie |
| Paramètres | Moyen (réversible) | Soumission explicite ou autosave — jamais les deux ambigus sur le même écran |
| Authentification | Moyen + accessibilité critique | Pas de test cognitif (copier-coller autorisé, pas de puzzle) — WCAG 2.2, 3.3.8 AA ; champ mot de passe : INPUT-UX.md |
| Paiement, engagement juridique | Élevé, difficilement réversible | Récapitulation vérifiable + confirmation explicite — WCAG 3.3.4 AA : réversible, vérifié ou confirmé. Champs carte : INPUT-UX.md (iframe PCI) |
| Données sensibles / médicales | Élevé (confidentialité) | Ne collecter que le nécessaire ; pas de validation-espion (pas d'aller-retour serveur sur une donnée sensible avant soumission explicite) ; consentement distinct |
| Consentement | Élevé (légal) | Cases jamais pré-cochées, une case par finalité, options de poids visuel égal (BUTTON-UX.md, bannières). **Autorité selon le contexte** : à l'inscription, l'extension `creation-compte-consentement` fait autorité (CGU/confidentialité/marketing dégroupés) ; `form-sensitive-data` ne couvre le consentement que lorsqu'il est **lié à des données sensibles ou à un paiement** — ne jamais charger les deux extensions pour un même consentement (cf. DECISIONS.md 2026-07-16). |
| Suppression | Critique | Paliers de friction de BUTTON-UX.md (coût de recréation) — le formulaire orchestre, le bouton porte le mécanisme |

## Non couvert — poser la question, ne rien trancher

- Édition inline (table) : Une seule cellule devient éditable et se soumet seule.
- Astérisques répétés sur tous les champs : Presque tous les champs sont obligatoires.
- Captcha / anti-robot : Distinguer un humain d'un robot.
- Upload de fichier : Envoyer un fichier.
