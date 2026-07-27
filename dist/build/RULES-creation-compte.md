---
sujet: creation-compte
nature: flows
resume: "Ce fichier n'est ni un composant (BUTTON-UX, INPUT-UX) ni un pattern (FORM-UX) — c'est un **flow**, un parcours nommé de bout en bout."
selon-contexte: [alert, button, emotion, form, input, interaction, laws, motion, voice]
source: CREATION-COMPTE-UX.md v1.3.3
empreinte: sha256:d056b46924bcd6fe
regles: {loi: 28, preference: 29, non_qualifie: 0}
---
# RULES — creation-compte (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Le design system ne crée aucun token dédié à ce flow : ses états sont rendus uniquement par les composants qu'il coordonne. `CREATION-COMPTE-R02`
- **[loi]** Un parcours d'inscription doit se limiter au strict minimum nécessaire pour créer le compte et reporter le reste après la première valeur perçue. `CREATION-COMPTE-R03`
- **[préférence]** Nous découpons le parcours d'inscription en quatre moments au maximum, dont deux conditionnels. `CREATION-COMPTE-R05`
- **[préférence]** Nous limitons le nombre d'étapes d'inscription au strict nécessaire : pour la plupart des produits grand public, un seul écran suffit. `CREATION-COMPTE-R06`
- **[loi]** Le parcours d'inscription ne doit jamais redemander une information déjà obtenue à une étape précédente ou via un fournisseur tiers. `CREATION-COMPTE-R07`
- **[préférence]** Nous considérons qu'un compte n'a besoin, pour exister, que d'un identifiant et d'un moyen d'authentification ; le reste est du profil. `CREATION-COMPTE-R08`
- **[préférence]** Nous ne demandons pas nom, entreprise, téléphone ou cas d'usage à l'inscription, sauf si le compte serait inutilisable sans. `CREATION-COMPTE-R09`
- **[loi]** Un produit ne doit pas exiger la création d'un compte avant d'avoir montré une valeur, quand un accès invité ou un essai est possible. `CREATION-COMPTE-R10`
- **[préférence]** Nous présentons toutes les méthodes d'inscription à poids visuel comparable, sans en déguiser une en défaut ni en reléguer une en lien minuscule. `CREATION-COMPTE-R11`
- **[loi]** Deux comptes ne doivent jamais être rapprochés sur la seule ressemblance de leurs adresses e-mail ; une preuve de contrôle est requise. `CREATION-COMPTE-R12`
- **[préférence]** Nous limitons les fournisseurs tiers proposés aux options réellement pertinentes pour l'audience, plutôt qu'une liste exhaustive de logos. `CREATION-COMPTE-R13`
- **[loi]** Un formulaire d'inscription ne doit comporter qu'un seul champ mot de passe, avec bascule d'affichage, jamais de champ de confirmation. `CREATION-COMPTE-R14`
- **[loi]** Le collage et les gestionnaires de mots de passe doivent être autorisés sur le champ mot de passe et sur les codes de vérification. `CREATION-COMPTE-R15`
- **[loi]** Les contraintes du mot de passe doivent être annoncées avant la saisie, jamais révélées seulement après un envoi refusé. `CREATION-COMPTE-R16`
- **[loi]** L'inscription ne doit jamais imposer de test cognitif bloquant ; un anti-robot éventuel doit offrir une alternative accessible. `CREATION-COMPTE-R17`
- **[loi]** Un compte dont l'e-mail établit l'identité ou sert à la récupération ne doit être actif qu'après vérification de cet e-mail. `CREATION-COMPTE-R18`
- **[préférence]** Nous ne terminons jamais une inscription réussie sur une impasse : la personne est déposée devant un premier pas concret dans le produit. `CREATION-COMPTE-R19`
- **[préférence]** Nous n'empilons pas, juste après la création du compte, tous les écrans de profil qu'on a reportés à l'inscription. `CREATION-COMPTE-R20`
- **[préférence]** Nous confirmons la création de compte par un message de succès discret, avec un ton légèrement plus chaleureux qu'ailleurs dans le parcours. `CREATION-COMPTE-R21`
- **[loi]** Un même rôle d'interface doit garder les mêmes signaux visuels d'un écran à l'autre du parcours d'inscription. `CREATION-COMPTE-R23`
- **[préférence]** Nous distinguons toujours l'action de progresser dans le parcours (un bouton) de celle d'en sortir (un lien), sans jamais les confondre. `CREATION-COMPTE-R24`
- **[préférence]** Nous limitons les transitions entre écrans du parcours d'inscription à un registre sobre (fade / fade through), sans motif expressif. `CREATION-COMPTE-R26`
- **[préférence]** Nous faisons porter l'annonce d'un changement d'écran par le déplacement du focus ; l'animation l'accompagne sans la remplacer ni la doubler. `CREATION-COMPTE-R27`
- **[loi]** Sous la préférence de mouvement réduit, les transitions doivent être instantanées, et le premier écran ne doit jamais s'animer à son chargement. `CREATION-COMPTE-R28`
- **[préférence]** Nous associons à chaque état du parcours (attente, erreur, atterrissage) un ton défini : rassurant, sans blâme, ou encourageant selon le moment. `CREATION-COMPTE-R29`
- **[préférence]** Nous réservons le seul réchauffement de ton du parcours au moment de l'atterrissage ; partout ailleurs, le ton reste sobre, jamais exubérant. `CREATION-COMPTE-R30`
- **[préférence]** Nous réservons un seul moment expressif à tout le parcours d'inscription : l'atterrissage, au moment où le compte est créé. `CREATION-COMPTE-R31`
- **[préférence]** Nous avons choisi une anatomie sobre pour l'animation de l'atterrissage : un glyphe qui se dessine, sans rebond, jouée une seule fois. `CREATION-COMPTE-R32`
- **[préférence]** Nous faisons porter le moment expressif de l'atterrissage par le message de confirmation (alert ou toast succès), pas par un élément propre au flow. `CREATION-COMPTE-R33`
- **[loi]** L'état « compte créé » doit rester lisible dans le contenu statique et l'ARIA indépendamment de toute animation, qui ne fait que l'accompagner. `CREATION-COMPTE-R34`
- **[préférence]** Nous limitons le parcours d'inscription à un seul moment de célébration animée, jamais un enchaînement de célébrations à chaque étape. `CREATION-COMPTE-R35`
- **[loi]** Le design de l'inscription doit garantir la sécurité perçue (mot de passe masqué par défaut, gestionnaires non bloqués, pas de confirmation d'adresses enregistrées), pas la sécurité serveur. `CREATION-COMPTE-R36`
- **[préférence]** Nous exigeons que chaque friction du parcours d'inscription (champ, étape, vérification) soit justifiée par une valeur ou un risque réels, jamais par habitude. `CREATION-COMPTE-R38`
- **[loi]** Un compte dont l'e-mail établit l'identité ou la récupération doit être vérifié avant activation ; un accès provisoire suppose un périmètre à faible risque explicitement borné. `CREATION-COMPTE-R39`
- **[préférence]** Nous affichons l'attente de vérification d'e-mail par un message d'information persistant et non bloquant, pas par une modale récurrente. `CREATION-COMPTE-R40`
- **[préférence]** Nous proposons toujours de renvoyer le lien ou le code de vérification, avec un anti-spam honnête et un moyen de corriger l'adresse e-mail saisie. `CREATION-COMPTE-R41`
- **[loi]** L'écran atteint après expiration d'un lien de vérification doit proposer un renvoi immédiat sans redemander l'adresse e-mail. `CREATION-COMPTE-R42`
- **[préférence]** Nous ramenons la personne, après vérification réussie de son e-mail, là où elle allait plutôt que sur une page morte « e-mail vérifié ». `CREATION-COMPTE-R43`
- **[préférence]** Nous affichons les fournisseurs tiers d'inscription à poids visuel égal entre eux et comparable à l'option e-mail. `CREATION-COMPTE-R44`
- **[loi]** Un compte créé par SSO ne doit jamais fusionner automatiquement avec un compte e-mail existant sur la seule correspondance d'adresse. `CREATION-COMPTE-R45`
- **[préférence]** Nous ne demandons aux fournisseurs SSO que le minimum (identité et e-mail vérifié), jamais des périmètres d'accès larges par précaution. `CREATION-COMPTE-R46`
- **[préférence]** Nous gérons explicitement l'échec ou l'annulation d'une connexion SSO en ramenant la personne à l'écran de méthode, avec un message neutre. `CREATION-COMPTE-R47`
- **[loi]** Un e-mail rendu déjà vérifié par un fournisseur de confiance ne doit pas relancer le parcours de vérification d'e-mail. `CREATION-COMPTE-R48`
- **[loi]** Le mot de passe doit privilégier la longueur sur la complexité : au moins 15 caractères en facteur unique (8 avec MFA), 64 acceptés, sans composition ni expiration forcées. `CREATION-COMPTE-R49`
- **[loi]** Un mot de passe compromis ou évident (fuite connue, égal à l'e-mail, suite triviale) doit être refusé via une blocklist. `CREATION-COMPTE-R50`
- **[préférence]** Nous n'affichons un indicateur de force du mot de passe que s'il reflète une mesure réelle, mise à jour après une pause, jamais à chaque touche. `CREATION-COMPTE-R51`
- **[loi]** Le champ mot de passe d'inscription doit annoncer ses contraintes avant la saisie, autoriser collage et gestionnaires, offrir une bascule, sans champ de confirmation. `CREATION-COMPTE-R52`
- **[loi]** Un e-mail déjà utilisé doit ouvrir un chemin vers la connexion ou la récupération, sans renvoyer la personne au début ni effacer sa saisie. `CREATION-COMPTE-R53`
- **[préférence]** Nous demandons au produit d'arbitrer explicitement, une fois pour toutes, entre une posture ouverte ou neutre face à un e-mail déjà utilisé. `CREATION-COMPTE-R54`
- **[préférence]** Tant que le produit n'a pas tranché la posture sur « e-mail déjà utilisé », nous appliquons par défaut la posture neutre et remontons la décision. `CREATION-COMPTE-R55`
- **[loi]** En posture neutre, la disponibilité d'un e-mail ne doit jamais être révélée en direct pendant la frappe, seulement à la soumission, côté serveur. `CREATION-COMPTE-R56`
- **[loi]** L'accès au produit ne doit jamais dépendre d'un consentement marketing distinct de l'acceptation des CGU. `CREATION-COMPTE-R57`
- **[loi]** Aucune case de consentement ne doit être pré-cochée, et chaque finalité doit avoir sa propre case, jamais un « tout accepter » qui les regroupe. `CREATION-COMPTE-R58`
- **[loi]** Une case de consentement facultative (marketing) ne doit pas être mise en avant visuellement par rapport aux autres éléments du formulaire. `CREATION-COMPTE-R59`
- **[loi]** L'accès aux CGU et à la politique de confidentialité doit être visible avant le point de décision de l'inscription, pas seulement en pied de page. `CREATION-COMPTE-R60`
- **[loi]** La politique de confidentialité doit se présenter comme une information consultable, jamais comme un objet qu'on « accepte » avec les CGU. `CREATION-COMPTE-R61`
- **[loi]** Une vérification d'âge minimum, si elle est requise, doit se faire par simple déclaration, sans interrogatoire, et sans stocker plus de données que nécessaire. `CREATION-COMPTE-R62`

## Non couvert — poser la question, ne rien trancher

- Âge minimum selon le contexte : Vérifier un âge plancher quand la loi l'exige.
- Suppression / correction après une erreur : Annuler ou corriger après un faux départ.
