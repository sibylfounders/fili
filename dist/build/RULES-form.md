---
sujet: form
nature: patterns
resume: "Ce fichier n'est pas un composant au sens de BUTTON-UX.md ou INPUT-UX.md — c'est un **pattern**, une règle qui n'émerge que quand plusieurs champs et un bouton sont assemblés."
selon-contexte: [alert, button, emotion, input, interaction, motion, toast, voice]
source: FORM-UX.md v2.4.0 + FORM-UI.md v1.3.0
empreinte: sha256:2266fea548ff554e
regles: {loi: 17, preference: 51, non_qualifie: 0}
---
# RULES — form (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Les champs formant un groupe de sens doivent être réunis dans un fieldset avec une legend, pour que les lecteurs d'écran annoncent le contexte du groupe. `FORM-R04`
- **[loi]** L'ordre des champs et du focus doit suivre la logique de la tâche et ne jamais utiliser de tabindex positif pour corriger un DOM mal ordonné. `FORM-R05`
- **[préférence]** Nous définissons un formulaire comme long non par un nombre de champs mais par le besoin de scroller pour voir toutes les erreurs possibles. `FORM-R07`
- **[préférence]** Dans une modale, nous réservons le formulaire aux saisies courtes et déplaçons tout formulaire long en page complète. `FORM-R08`
- **[préférence]** Nous décidons une fois pour tout le formulaire s'il marque les champs requis ou les champs optionnels, jamais champ par champ. `FORM-R10`
- **[préférence]** Nous marquons uniquement la minorité des champs, requis ou optionnels selon la proportion, pour que le marqueur reste informatif. `FORM-R11`
- **[préférence]** Nous affichons toujours en tête de formulaire une phrase expliquant la convention de marquage retenue, pas seulement l'indicateur visuel isolé. `FORM-R12`
- **[loi]** Chaque champ obligatoire doit porter l'attribut required ou aria-required="true" en plus de son indicateur visuel. `FORM-R13`
- **[préférence]** Nous appliquons la même convention requis/optionnel à tous les formulaires du produit, jamais une convention différente d'un écran à l'autre. `FORM-R14`
- **[préférence]** Nous décidons la stratégie de timing de validation au niveau du formulaire entier, pas champ par champ. `FORM-R15`
- **[préférence]** Nous choisissons par formulaire entre valider uniquement à la soumission ou valider au blur avec un délai d'environ 500 ms sur les champs à risque. `FORM-R16`
- **[préférence]** Nous ne validons jamais un champ à chaque frappe sans délai, ni avant que l'utilisateur ait terminé sa première saisie. `FORM-R17`
- **[loi]** Les contraintes de format connues d'avance doivent être expliquées avant la saisie, pas seulement révélées après une erreur. `FORM-R18`
- **[préférence]** Nous rattachons une erreur de combinaison entre champs à leur groupe entier, jamais à un champ isolé arbitraire. `FORM-R19`
- **[loi]** Après un échec de soumission, une vue d'ensemble de toutes les erreurs doit être donnée avant que l'utilisateur ne les redécouvre en scrollant. `FORM-R20`
- **[loi]** Le résumé d'erreurs doit être structuré comme une alerte de tonalité danger, non fermable, annoncée via role="alert". `FORM-R21`
- **[loi]** Le résumé d'erreurs ne doit apparaître qu'après un échec de soumission, jamais de façon préventive. `FORM-R22`
- **[loi]** Le résumé d'erreurs doit lister des liens d'ancre vers chaque champ en erreur, en reprenant le message d'erreur exact. `FORM-R23`
- **[loi]** Le résumé d'erreurs ne doit jamais remplacer les messages d'erreur inline à côté de chaque champ — les deux doivent coexister. `FORM-R24`
- **[préférence]** Nous préfixons le titre de la page par « Erreur : » après un échec de soumission d'un formulaire rendu côté serveur. `FORM-R25`
- **[préférence]** Nous déplaçons le focus vers le premier champ en erreur pour un formulaire court, ou vers le résumé pour un formulaire long ou à erreurs multiples. `FORM-R26`
- **[préférence]** Nous faisons en sorte qu'un champ atteint depuis un lien du résumé conserve son message d'erreur et sa valeur saisie. `FORM-R27`
- **[préférence]** Nous gardons le bouton de soumission actif en permanence avant l'envoi, plutôt que de le désactiver comme validation préalable. `FORM-R28`
- **[préférence]** Nous ne désactivons le bouton de soumission que pendant le traitement asynchrone de l'envoi, jamais comme validation préalable. `FORM-R29`
- **[préférence]** Chaque état du cycle de soumission définit précisément ce qui devient visible, ce qui est annoncé, où va le focus et le sort des valeurs saisies. `FORM-R31`
- **[préférence]** Nous réaffichons toujours les champs avec exactement les valeurs saisies par l'utilisateur après un échec, quelle qu'en soit la cause. `FORM-R32`
- **[préférence]** Nous faisons toujours prévaloir le verdict du serveur sur celui du client quand les deux se contredisent sur un champ. `FORM-R33`
- **[préférence]** Nous ne proposons d'annuler une soumission en cours que si l'annulation est réellement possible, sans jamais le simuler faussement. `FORM-R34`
- **[préférence]** En cas de session expirée ou de perte de connexion, nous informons toujours l'utilisateur de ce qui s'est passé et de ce qui est préservé. `FORM-R35`
- **[préférence]** Pour un envoi à effet unique comme un paiement, l'idempotence côté produit reste nécessaire en plus des mécanismes anti double-activation. `FORM-R36`
- **[préférence]** Nous distinguons toujours une erreur serveur portant sur un champ précis d'une erreur globale, jamais déguisée en erreur de champ. `FORM-R37`
- **[préférence]** Nous faisons en sorte qu'un nouvel essai après erreur réutilise les valeurs déjà saisies, sans jamais vider le formulaire. `FORM-R38`
- **[préférence]** Quand seule une partie d'une demande aboutit, nous affichons une alerte d'avertissement listant réussites et reliquat, jamais un simple succès ou échec. `FORM-R40`
- **[préférence]** Après un succès partiel, seules les parties échouées du formulaire restent soumissibles à nouveau. `FORM-R41`
- **[préférence]** Nous découpons un formulaire en plusieurs étapes seulement quand sa longueur ou sa charge cognitive le justifie, jamais par esthétique. `FORM-R42`
- **[préférence]** Chaque étape d'un formulaire multi-étapes valide ses propres champs, sans faire découvrir plus tard une erreur d'une étape déjà validée. `FORM-R43`
- **[préférence]** Le retour en arrière dans un formulaire multi-étapes ne doit jamais perdre les données déjà saisies. `FORM-R44`
- **[loi]** Une information déjà fournie dans le parcours ne doit jamais être redemandée sans être pré-remplie ou rappelée. `FORM-R45`
- **[loi]** Un engagement juridique ou financier doit passer par une étape de récapitulation vérifiable avant sa soumission finale. `FORM-R46`
- **[préférence]** Nous ajoutons un indicateur de progression uniquement quand le nombre d'étapes n'est pas évident, jamais cliquable vers l'avant. `FORM-R47`
- **[préférence]** Le bouton de la dernière étape d'un formulaire multi-étapes doit refléter l'action réelle, jamais un générique 'Suivant'. `FORM-R48`
- **[préférence]** Quand la validité d'un champ dépend d'un aller-retour serveur, ce champ doit afficher un état d'attente visible et annoncé. `FORM-R49`
- **[préférence]** Une validation asynchrone en cours ne doit jamais bloquer la soumission en silence. `FORM-R50`
- **[préférence]** Un verdict de validation asynchrone périmé est toujours jeté, et la soumission revérifie côté serveur. `FORM-R51`
- **[préférence]** La validation asynchrone est réservée aux champs dont la validité ne peut pas être calculée localement. `FORM-R52`
- **[préférence]** Un champ ou groupe conditionnel doit toujours apparaître immédiatement après le champ qui le déclenche. `FORM-R53`
- **[loi]** L'apparition d'un champ conditionnel ne doit jamais voler le focus, et doit être annoncée si l'utilisateur risque de la manquer. `FORM-R54`
- **[préférence]** Une valeur saisie dans un champ ensuite masqué n'est pas soumise mais reste mémorisée pour être restaurée si la condition redevient vraie. `FORM-R55`
- **[préférence]** Dans un groupe répétable, le bouton d'ajout est toujours secondaire et le focus va au nouveau groupe après ajout. `FORM-R56`
- **[préférence]** Nous activons l'autosave seulement quand le coût d'une perte de saisie est élevé, jamais par défaut sur un formulaire court. `FORM-R57`
- **[préférence]** Le statut d'autosave doit être visible en annonce discrète, et un échec d'autosave doit déclencher un avertissement explicite. `FORM-R58`
- **[préférence]** L'autosave ne remplace jamais la soumission du formulaire et ne se déclenche jamais pendant l'envoi lui-même. `FORM-R59`
- **[préférence]** À la reprise d'un brouillon, nous annonçons toujours explicitement ce qui a été restauré. `FORM-R60`
- **[loi]** Toute limite de temps imposée à l'utilisateur doit être supprimable, ajustable ou prolongeable après avertissement, sauf exception normative. `FORM-R61`
- **[loi]** L'expiration d'une limite de temps doit toujours être annoncée à l'avance, laissant le temps de la prolonger. `FORM-R62`
- **[préférence]** Nous assemblons le formulaire à partir de rôles fixes : action pour le submit, navigation pour Modifier, action secondaire pour l'ajout, information pour le résumé. `FORM-R64`
- **[préférence]** Le formulaire assemblé doit rester lisible en niveaux de gris et sans survol : deux rôles différents ne sont jamais rendus indiscernables. `FORM-R65`
- **[préférence]** Les apparitions orchestrées par le formulaire sont toujours réactives à une action, jamais préventives, et animées en opacité plutôt qu'en glissement. `FORM-R66`
- **[préférence]** Le dépliage d'un champ conditionnel est un mouvement de continuité déclenché par l'action de l'utilisateur. `FORM-R67`
- **[loi]** Sous la préférence de mouvement réduit, les apparitions du formulaire doivent dégrader en crossfade ou bascule instantanée, sans perte d'information. `FORM-R68`
- **[préférence]** Nous distinguons toujours le verrou métier d'un verrou d'animation : aucune interaction n'attend qu'une transition visuelle se termine. `FORM-R69`
- **[préférence]** Nous faisons correspondre chaque état du cycle de soumission à un registre de ton précis, de la routine à la panne assumée. `FORM-R70`
- **[préférence]** Nous incarnons la réussite d'un envoi dans un seul porteur choisi selon sa consultabilité, jamais dans deux canaux simultanés. `FORM-R71`
- **[préférence]** Nous réservons tout moment de célébration aux contextes à seuil et ne l'utilisons jamais sur une action répétitive ou réflexe. `FORM-R72`
- **[loi]** L'information de succès doit toujours rester disponible par un canal statique et annoncé, que l'animation ne porte jamais seule. `FORM-R73`
- **[préférence]** Nous calibrons le niveau de friction sur le coût réel d'une erreur dans le contexte précis du formulaire, jamais uniformément. `FORM-R74`
- **[loi]** Pour tout engagement juridique ou financier, la soumission doit être réversible, vérifiée ou confirmée. `FORM-R75`
- **[préférence]** Nous appliquons au formulaire le même principe qu'au bouton et au champ : la friction doit informer, jamais bloquer silencieusement. `FORM-R77`

## Non couvert — poser la question, ne rien trancher

- Édition inline (table) : Une seule cellule devient éditable et se soumet seule.
- Astérisques répétés sur tous les champs : Presque tous les champs sont obligatoires.
- Captcha / anti-robot : Distinguer un humain d'un robot.
- Upload de fichier : Envoyer un fichier.
