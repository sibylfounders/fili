---
sujet: creation-compte
nature: flows
resume: "Ce fichier n'est ni un composant (BUTTON-UX, INPUT-UX) ni un pattern (FORM-UX) — c'est un **flow**, un parcours nommé de bout en bout."
selon-contexte: [alert, button, emotion, form, input, interaction, laws, motion, voice]
source: CREATION-COMPTE-UX.md v1.3.3
empreinte: sha256:d056b46924bcd6fe
regles: {loi: 28, preference: 29, non_qualifie: 0}
---
# RULES — creation-compte (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Le design system ne crée aucun token dédié à ce flow : ses états sont rendus uniquement par les composants qu'il coordonne. `CREATION-COMPTE-R02`
  - vérifiable : aucun token de design nommé « création-compte-* » n'existe dans la codebase
- **[loi]** Un parcours d'inscription doit se limiter au strict minimum nécessaire pour créer le compte et reporter le reste après la première valeur perçue. `CREATION-COMPTE-R03`
- **[préférence]** Nous découpons le parcours d'inscription en quatre moments au maximum, dont deux conditionnels. `CREATION-COMPTE-R05`
  - vérifiable : le parcours comprend au maximum quatre moments : choisir une méthode, saisir le minimum, vérifier l'e-mail (si nécessaire), atterrir
- **[préférence]** Nous limitons le nombre d'étapes d'inscription au strict nécessaire : pour la plupart des produits grand public, un seul écran suffit. `CREATION-COMPTE-R06`
- **[loi]** Le parcours d'inscription ne doit jamais redemander une information déjà obtenue à une étape précédente ou via un fournisseur tiers. `CREATION-COMPTE-R07`
  - vérifiable : aucune information déjà saisie ou fournie par un fournisseur SSO n'est redemandée à l'écran suivant du parcours
- **[préférence]** Nous considérons qu'un compte n'a besoin, pour exister, que d'un identifiant et d'un moyen d'authentification ; le reste est du profil. `CREATION-COMPTE-R08`
  - vérifiable : le formulaire d'inscription ne demande par défaut qu'un identifiant et un moyen d'authentification, aucun autre champ
- **[préférence]** Nous ne demandons pas nom, entreprise, téléphone ou cas d'usage à l'inscription, sauf si le compte serait inutilisable sans. `CREATION-COMPTE-R09`
  - vérifiable : le formulaire d'inscription ne comporte pas de champ nom, entreprise, téléphone ou cas d'usage, sauf si le compte est inutilisable sans
- **[loi]** Un produit ne doit pas exiger la création d'un compte avant d'avoir montré une valeur, quand un accès invité ou un essai est possible. `CREATION-COMPTE-R10`
- **[préférence]** Nous présentons toutes les méthodes d'inscription à poids visuel comparable, sans en déguiser une en défaut ni en reléguer une en lien minuscule. `CREATION-COMPTE-R11`
  - vérifiable : toutes les méthodes d'inscription proposées à l'écran de choix ont un poids visuel comparable (taille, contraste, position)
- **[loi]** Deux comptes ne doivent jamais être rapprochés sur la seule ressemblance de leurs adresses e-mail ; une preuve de contrôle est requise. `CREATION-COMPTE-R12`
  - vérifiable : le rapprochement de deux comptes n'a lieu qu'après réauthentification ou preuve d'identité vérifiée, jamais sur la seule ressemblance des adresses e-mail
- **[préférence]** Nous limitons les fournisseurs tiers proposés aux options réellement pertinentes pour l'audience, plutôt qu'une liste exhaustive de logos. `CREATION-COMPTE-R13`
- **[loi]** Un formulaire d'inscription ne doit comporter qu'un seul champ mot de passe, avec bascule d'affichage, jamais de champ de confirmation. `CREATION-COMPTE-R14`
  - vérifiable : le formulaire d'inscription ne contient qu'un seul champ mot de passe, sans champ de confirmation
- **[loi]** Le collage et les gestionnaires de mots de passe doivent être autorisés sur le champ mot de passe et sur les codes de vérification. `CREATION-COMPTE-R15`
  - vérifiable : le collage n'est pas bloqué sur le champ mot de passe ni sur les champs de code de vérification
- **[loi]** Les contraintes du mot de passe doivent être annoncées avant la saisie, jamais révélées seulement après un envoi refusé. `CREATION-COMPTE-R16`
  - vérifiable : les contraintes du mot de passe sont affichées avant la première saisie, pas seulement après un rejet
- **[loi]** L'inscription ne doit jamais imposer de test cognitif bloquant ; un anti-robot éventuel doit offrir une alternative accessible. `CREATION-COMPTE-R17`
  - vérifiable : aucun test cognitif (puzzle, mémorisation imposée) n'est requis pour finaliser l'inscription ; le copier-coller est toujours permis
- **[loi]** Un compte dont l'e-mail établit l'identité ou sert à la récupération ne doit être actif qu'après vérification de cet e-mail. `CREATION-COMPTE-R18`
  - source : https://cheatsheetseries.owasp.org/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.html
- **[préférence]** Nous ne terminons jamais une inscription réussie sur une impasse : la personne est déposée devant un premier pas concret dans le produit. `CREATION-COMPTE-R19`
  - vérifiable : l'écran final de l'inscription réussie affiche un état vide orienté action ou une tâche amorcée, pas seulement un message de confirmation isolé
- **[préférence]** Nous n'empilons pas, juste après la création du compte, tous les écrans de profil qu'on a reportés à l'inscription. `CREATION-COMPTE-R20`
  - vérifiable : aucune séquence d'écrans de profilage n'est affichée immédiatement après la création du compte, avant tout usage du produit
- **[préférence]** Nous confirmons la création de compte par un message de succès discret, avec un ton légèrement plus chaleureux qu'ailleurs dans le parcours. `CREATION-COMPTE-R21`
  - vérifiable : la confirmation de création de compte est un alert de succès discret, sans modale ni interruption bloquante
- **[loi]** Un même rôle d'interface doit garder les mêmes signaux visuels d'un écran à l'autre du parcours d'inscription. `CREATION-COMPTE-R23`
  - vérifiable : le CTA de progression, le lien « déjà un compte » et le lien de retour gardent la même forme, couleur et libellé sur tous les écrans du parcours
- **[préférence]** Nous distinguons toujours l'action de progresser dans le parcours (un bouton) de celle d'en sortir (un lien), sans jamais les confondre. `CREATION-COMPTE-R24`
  - vérifiable : l'action de progression (soumettre, continuer) est un bouton, l'action de bifurcation (déjà un compte, retour) est un lien, jamais l'inverse
- **[préférence]** Nous limitons les transitions entre écrans du parcours d'inscription à un registre sobre (fade / fade through), sans motif expressif. `CREATION-COMPTE-R26`
  - vérifiable : la transition entre écrans du parcours est un fade ou fade through ; aucun shared axis ni container transform n'est utilisé
- **[préférence]** Nous faisons porter l'annonce d'un changement d'écran par le déplacement du focus ; l'animation l'accompagne sans la remplacer ni la doubler. `CREATION-COMPTE-R27`
  - vérifiable : l'annonce du changement d'écran est portée par le déplacement du focus, jamais dupliquée par l'animation ou un aria-live simultané
- **[loi]** Sous la préférence de mouvement réduit, les transitions doivent être instantanées, et le premier écran ne doit jamais s'animer à son chargement. `CREATION-COMPTE-R28`
  - vérifiable : sous prefers-reduced-motion, les transitions entre écrans sont instantanées ; le premier écran du parcours ne joue aucune animation d'entrée au chargement
- **[préférence]** Nous associons à chaque état du parcours (attente, erreur, atterrissage) un ton défini : rassurant, sans blâme, ou encourageant selon le moment. `CREATION-COMPTE-R29`
- **[préférence]** Nous réservons le seul réchauffement de ton du parcours au moment de l'atterrissage ; partout ailleurs, le ton reste sobre, jamais exubérant. `CREATION-COMPTE-R30`
- **[préférence]** Nous réservons un seul moment expressif à tout le parcours d'inscription : l'atterrissage, au moment où le compte est créé. `CREATION-COMPTE-R31`
  - vérifiable : le parcours ne comporte qu'un seul moment animé ou expressif (l'atterrissage) ; aucun autre écran n'a d'animation d'émotion
- **[préférence]** Nous avons choisi une anatomie sobre pour l'animation de l'atterrissage : un glyphe qui se dessine, sans rebond, jouée une seule fois. `CREATION-COMPTE-R32`
  - vérifiable : l'animation de l'atterrissage est un glyphe qui se dessine sans effet spring/overshoot, jouée une seule fois ; sous mouvement réduit, l'état s'affiche instantanément
- **[préférence]** Nous faisons porter le moment expressif de l'atterrissage par le message de confirmation (alert ou toast succès), pas par un élément propre au flow. `CREATION-COMPTE-R33`
  - vérifiable : le moment expressif de l'atterrissage est porté par un composant alert ou toast de type succès, jamais par un élément propre au flow
- **[loi]** L'état « compte créé » doit rester lisible dans le contenu statique et l'ARIA indépendamment de toute animation, qui ne fait que l'accompagner. `CREATION-COMPTE-R34`
  - vérifiable : l'état « compte créé/actif » est présent dans le contenu statique et l'ARIA indépendamment de l'animation ; sous mouvement réduit, la bascule est instantanée et sans perte
- **[préférence]** Nous limitons le parcours d'inscription à un seul moment de célébration animée, jamais un enchaînement de célébrations à chaque étape. `CREATION-COMPTE-R35`
  - vérifiable : le parcours ne contient qu'un seul moment de célébration animée (l'atterrissage), aucun autre écran n'a d'animation festive
- **[loi]** Le design de l'inscription doit garantir la sécurité perçue (mot de passe masqué par défaut, gestionnaires non bloqués, pas de confirmation d'adresses enregistrées), pas la sécurité serveur. `CREATION-COMPTE-R36`
  - vérifiable : le mot de passe n'est pas affiché en clair par défaut (bascule disponible) ; le collage et les gestionnaires ne sont jamais bloqués ; aucun message ne confirme quelles adresses e-mail sont déjà enregistrées
- **[préférence]** Nous exigeons que chaque friction du parcours d'inscription (champ, étape, vérification) soit justifiée par une valeur ou un risque réels, jamais par habitude. `CREATION-COMPTE-R38`
- **[loi]** Un compte dont l'e-mail établit l'identité ou la récupération doit être vérifié avant activation ; un accès provisoire suppose un périmètre à faible risque explicitement borné. `CREATION-COMPTE-R39`
  - source : https://cheatsheetseries.owasp.org/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.html
- **[préférence]** Nous affichons l'attente de vérification d'e-mail par un message d'information persistant et non bloquant, pas par une modale récurrente. `CREATION-COMPTE-R40`
  - vérifiable : l'état « en attente de vérification » est affiché via un alert d'information persistant, jamais une modale récurrente ; il indique les fonctions indisponibles et un chemin de vérification
- **[préférence]** Nous proposons toujours de renvoyer le lien ou le code de vérification, avec un anti-spam honnête et un moyen de corriger l'adresse e-mail saisie. `CREATION-COMPTE-R41`
  - vérifiable : un lien « renvoyer » est proposé avec un délai ou compte à rebours visible avant réactivation, et un chemin pour corriger l'adresse e-mail saisie est disponible
- **[loi]** L'écran atteint après expiration d'un lien de vérification doit proposer un renvoi immédiat sans redemander l'adresse e-mail. `CREATION-COMPTE-R42`
  - vérifiable : l'écran affiché après expiration du lien de vérification propose un renvoi immédiat sans redemander l'adresse e-mail
- **[préférence]** Nous ramenons la personne, après vérification réussie de son e-mail, là où elle allait plutôt que sur une page morte « e-mail vérifié ». `CREATION-COMPTE-R43`
  - vérifiable : après vérification réussie, la personne est redirigée vers l'action ou l'écran qu'elle visait avant l'inscription, pas vers une page « e-mail vérifié » isolée
- **[préférence]** Nous affichons les fournisseurs tiers d'inscription à poids visuel égal entre eux et comparable à l'option e-mail. `CREATION-COMPTE-R44`
  - vérifiable : les boutons des fournisseurs SSO ont un poids visuel égal entre eux et comparable au bouton d'inscription par e-mail
- **[loi]** Un compte créé par SSO ne doit jamais fusionner automatiquement avec un compte e-mail existant sur la seule correspondance d'adresse. `CREATION-COMPTE-R45`
  - vérifiable : le rapprochement d'un compte SSO avec un compte e-mail existant n'a lieu qu'après réauthentification ou preuve d'identité vérifiée, jamais automatiquement sur la seule correspondance d'adresse
- **[préférence]** Nous ne demandons aux fournisseurs SSO que le minimum (identité et e-mail vérifié), jamais des périmètres d'accès larges par précaution. `CREATION-COMPTE-R46`
  - vérifiable : l'intégration SSO ne demande au fournisseur que l'identité et l'e-mail vérifié, aucun scope additionnel n'est demandé par défaut
- **[préférence]** Nous gérons explicitement l'échec ou l'annulation d'une connexion SSO en ramenant la personne à l'écran de méthode, avec un message neutre. `CREATION-COMPTE-R47`
  - vérifiable : en cas d'échec ou d'annulation du SSO, la personne revient à l'écran de choix de méthode avec un message neutre, sans accusation
- **[loi]** Un e-mail rendu déjà vérifié par un fournisseur de confiance ne doit pas relancer le parcours de vérification d'e-mail. `CREATION-COMPTE-R48`
  - vérifiable : si le fournisseur SSO atteste l'e-mail comme déjà vérifié, aucun écran de vérification d'e-mail supplémentaire n'est affiché
- **[loi]** Le mot de passe doit privilégier la longueur sur la complexité : au moins 15 caractères en facteur unique (8 avec MFA), 64 acceptés, sans composition ni expiration forcées. `CREATION-COMPTE-R49`
  - vérifiable : le mot de passe minimum est de 15 caractères en authentification à facteur unique (8 si MFA obligatoire), au moins 64 caractères acceptés, aucune règle de composition imposée ni expiration périodique forcée
  - source : https://pages.nist.gov/800-63-4/sp800-63b.html
- **[loi]** Un mot de passe compromis ou évident (fuite connue, égal à l'e-mail, suite triviale) doit être refusé via une blocklist. `CREATION-COMPTE-R50`
  - vérifiable : le mot de passe saisi est comparé à une blocklist de mots de passe compromis ou évidents (fuites connues, valeur égale à l'e-mail, suites triviales) et refusé s'il y figure
  - source : https://pages.nist.gov/800-63-4/sp800-63b.html
- **[préférence]** Nous n'affichons un indicateur de force du mot de passe que s'il reflète une mesure réelle, mise à jour après une pause, jamais à chaque touche. `CREATION-COMPTE-R51`
  - vérifiable : l'indicateur de force du mot de passe, s'il est affiché, reflète une mesure réelle et se met à jour après une pause dans la frappe, pas à chaque touche
- **[loi]** Le champ mot de passe d'inscription doit annoncer ses contraintes avant la saisie, autoriser collage et gestionnaires, offrir une bascule, sans champ de confirmation. `CREATION-COMPTE-R52`
  - vérifiable : le champ mot de passe d'inscription affiche ses contraintes avant la saisie, autorise le collage et les gestionnaires, propose une bascule d'affichage, et n'a pas de champ de confirmation
- **[loi]** Un e-mail déjà utilisé doit ouvrir un chemin vers la connexion ou la récupération, sans renvoyer la personne au début ni effacer sa saisie. `CREATION-COMPTE-R53`
  - vérifiable : en cas d'e-mail déjà utilisé, un chemin vers la connexion ou la récupération est proposé sans effacer ni redemander la saisie déjà faite
- **[préférence]** Nous demandons au produit d'arbitrer explicitement, une fois pour toutes, entre une posture ouverte ou neutre face à un e-mail déjà utilisé. `CREATION-COMPTE-R54`
- **[préférence]** Tant que le produit n'a pas tranché la posture sur « e-mail déjà utilisé », nous appliquons par défaut la posture neutre et remontons la décision. `CREATION-COMPTE-R55`
  - vérifiable : en l'absence d'arbitrage produit explicite, l'écran « e-mail déjà utilisé » applique la posture neutre (aucune confirmation d'existence de compte dans l'interface) et signale le choix à trancher
- **[loi]** En posture neutre, la disponibilité d'un e-mail ne doit jamais être révélée en direct pendant la frappe, seulement à la soumission, côté serveur. `CREATION-COMPTE-R56`
  - vérifiable : en posture neutre, aucune validation en direct pendant la frappe ne signale qu'un e-mail est déjà enregistré ; la vérification n'a lieu qu'à la soumission, côté serveur
- **[loi]** L'accès au produit ne doit jamais dépendre d'un consentement marketing distinct de l'acceptation des CGU. `CREATION-COMPTE-R57`
  - vérifiable : l'accès au produit n'est jamais conditionné à l'acceptation d'un consentement marketing distinct des CGU
- **[loi]** Aucune case de consentement ne doit être pré-cochée, et chaque finalité doit avoir sa propre case, jamais un « tout accepter » qui les regroupe. `CREATION-COMPTE-R58`
  - vérifiable : aucune case de consentement n'est pré-cochée par défaut ; chaque finalité dispose de sa propre case, sans case globale regroupant CGU et marketing
- **[loi]** Une case de consentement facultative (marketing) ne doit pas être mise en avant visuellement par rapport aux autres éléments du formulaire. `CREATION-COMPTE-R59`
  - vérifiable : la case de consentement marketing (optionnel) n'a pas de mise en forme plus visible (taille, couleur) que les autres éléments du formulaire
- **[loi]** L'accès aux CGU et à la politique de confidentialité doit être visible avant le point de décision de l'inscription, pas seulement en pied de page. `CREATION-COMPTE-R60`
  - vérifiable : les liens vers les CGU et la politique de confidentialité sont visibles avant le point de décision (bouton de création de compte), pas uniquement en pied de page
- **[loi]** La politique de confidentialité doit se présenter comme une information consultable, jamais comme un objet qu'on « accepte » avec les CGU. `CREATION-COMPTE-R61`
  - vérifiable : le texte associé au bouton de création de compte ne fait accepter que les CGU ; la politique de confidentialité est seulement mentionnée comme consultable, sans case ni verbe d'acceptation qui l'engloberait
- **[loi]** Une vérification d'âge minimum, si elle est requise, doit se faire par simple déclaration, sans interrogatoire, et sans stocker plus de données que nécessaire. `CREATION-COMPTE-R62`
  - vérifiable : si un âge minimum est requis, il est vérifié par une simple déclaration, sans pièce justificative demandée, et aucune donnée d'âge précise n'est stockée au-delà du nécessaire

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Vérification e-mail en barrage avant toute valeur sans risque identifié | Friction et abandon évitables | Moyenne à élevée |
| Activation complète avant preuve de possession de l'e-mail | Usurpation, récupération ambiguë, abus de compte | Élevée |
| Champs de profil (nom, société, téléphone) exigés à l'inscription | Friction non contrepartie, abandon, données de mauvaise qualité | Élevée |
| « E-mail déjà utilisé » traité comme un mur, sans chemin vers la connexion | Utilisateur revenant bloqué, perçoit le produit comme cassé | Élevée |
| Message « e-mail déjà utilisé » qui confirme l'existence d'un compte à un inconnu | Énumération de comptes — fuite de la base d'e-mails | Moyenne à élevée (selon le produit) |
| Inscription forcée avant toute valeur (pas d'invité/essai) | Abandon de conversion documenté | Élevée |
| « Confirmez le mot de passe » + collage bloqué | Double friction, mots de passe plus faibles, exclusion des gestionnaires | Moyenne |
| Consentement marketing pré-coché ou groupé avec les CGU | Non-conformité RGPD (consentement non libre), défiance | Élevée (légal) |
| Atterrissage sur une impasse « compte créé » sans premier pas | Élan perdu au moment de plus fort engagement | Moyenne |
| Enfermement dans une méthode (doublon Google vs e-mail) | Comptes fantômes, utilisateur qui ne se retrouve pas | Moyenne |
| Test cognitif / captcha inaccessible à l'inscription | Exclusion (WCAG 3.3.8), abandon | Élevée |

## Non couvert — poser la question, ne rien trancher

- Âge minimum selon le contexte : Vérifier un âge plancher quand la loi l'exige.
- Suppression / correction après une erreur : Annuler ou corriger après un faux départ.
