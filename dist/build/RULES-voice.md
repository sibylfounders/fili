---
sujet: voice
nature: languages
resume: "Ce fichier contient le raisonnement : quelle est la voix du produit, comment le ton s'adapte à l'utilisateur, pourquoi le mot est le canal d'information le plus fiable du système."
selon-contexte: [alert, button, card, color, emotion, form, iconography, input, laws, motion, typography]
source: VOICE-UX.md v1.3.1 + VOICE-UI.md v1.2.0
empreinte: sha256:b030de4474fdcbc5
regles: {loi: 25, preference: 10, non_qualifie: 0}
---
# RULES — voice (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** La voix du produit reste constante d'une surface à l'autre tandis que le ton s'ajuste à l'état de la personne qui lit (routine, erreur, panne, succès, attente, destruction). `VOICE-R02`
- **[préférence]** Le registre du produit est productif et non expressif : clarté, précision et sobriété, sans humour d'apparat, superlatif marketing ni sur-célébration. `VOICE-R03`
- **[préférence]** Le relèvement de registre ne s'étend jamais à une erreur, à une action destructive ni à une action fréquente ou réflexe : ces cas restent strictement productifs. `VOICE-R06`
- **[loi]** Le texte est le canal d'information de dernier recours du système : toute information portée par la couleur, le mouvement ou la forme reste disponible en mots, car le mot survit à la couleur coupée, au mouvement coupé, à l'icône incomprise et au lecteur d'écran. `VOICE-R07`
- **[loi]** Le libellé d'un lien ou d'un bouton se comprend hors de son contexte : il nomme la destination ou la conséquence de l'action, jamais une formule générique. `VOICE-R08`
- **[loi]** L'écriture d'interface dit la chose la plus simple qui soit vraie : phrases courtes, voix active, un sujet par phrase, le mot courant plutôt que le mot savant. `VOICE-R09`
- **[loi]** Aucun jargon technique, code d'erreur ni sigle interne n'est exposé à l'utilisateur, et un acronyme inévitable est développé à sa première occurrence. `VOICE-R10`
- **[loi]** La concision retire les mots vides et jamais l'information nécessaire : elle ne justifie pas de supprimer la cause d'un problème ni le moyen de le corriger. `VOICE-R11`
- **[préférence]** Le système tient une table de correspondance entre l'état de la personne et le ton employé, qui fixe notamment un succès routinier bref et factuel, sans félicitation ni célébration. `VOICE-R12`
- **[loi]** Un message d'erreur ne qualifie jamais la personne : il décrit en texte l'écart constaté et la correction attendue, et le produit prend à son compte les défaillances système. `VOICE-R13`
- **[loi]** La voix ne change pas d'un écran à l'autre : ni familiarité soudaine, ni formalisme intermittent. `VOICE-R14`
- **[loi]** Un concept est désigné par un seul mot dans toute l'interface, et ce mot ne désigne pas un autre concept ailleurs. `VOICE-R15`
- **[loi]** Le niveau de lecture visé reste bas, au service de l'accessibilité cognitive et des personnes non natives ; aucun seuil chiffré n'est fixé à ce jour, et cette absence est une position assumée. `VOICE-R16`
- **[loi]** Le texte d'interface s'écrit traduisible : aucune phrase construite par concaténation de fragments à l'exécution, aucune longueur codée en dur, et pas d'idiome ni de jeu de mots qui ne franchisse pas les langues. `VOICE-R17`
- **[loi]** Le mot descriptif porte l'accessibilité non visuelle — texte alternatif utile, nom accessible qui dit l'action, texte de lien signifiant — et le nom accessible d'un contrôle contient le texte visible de son libellé. `VOICE-R18`
- **[loi]** Le mot porte l'information quand les autres canaux tombent : il l'énonce sans blâmer, dans un vocabulaire constant, la clarté primant sur l'élégance. `VOICE-R20`

## Consignes d'implémentation

- **[loi]** Les titres, boutons, labels et menus s'écrivent en sentence case : une majuscule au premier mot, le reste en minuscules hors noms propres. `VOICE-U02`
- **[préférence]** Les capitales sont réservées aux étiquettes rendues avec le style de label (pastilles, badges, kickers) et ne portent jamais une phrase ni un libellé d'action. `VOICE-U03`
- **[loi]** Un libellé court, un label, un titre ou un bouton ne se termine pas par un point ; la ponctuation finale revient dès qu'il y a une phrase complète d'aide ou d'erreur, ou au moins deux phrases. `VOICE-U04`
- **[loi]** Les points de suspension signalent une action qui demande une étape supplémentaire avant de s'exécuter et ne figurent jamais sur une action qui agit immédiatement. `VOICE-U05`
- **[loi]** La ponctuation suit la norme typographique française — espace insécable avant les deux-points, le point-virgule, le point d'exclamation et le point d'interrogation, guillemets français en contenu — la ponctuation ASCII n'étant conservée que dans les blocs de code et de données. `VOICE-U06`
- **[préférence]** Le point d'exclamation est proscrit dans l'interface produit, hors message de bienvenue rare et hors microcopy de résolution d'un moment E-motion catalogué. `VOICE-U07`
- **[loi]** Toute donnée numérique s'écrit en chiffres et non en lettres, les lettres restant réservées à un usage rhétorique hors données. `VOICE-U08`
- **[loi]** Les nombres suivent le format de la locale — séparateur de milliers par espace insécable, virgule décimale, espace insécable avant l'unité et le symbole — et ce format n'est jamais codé en dur dans une chaîne : il est délégué au formatage sensible à la locale. `VOICE-U09`
- **[loi]** Une date affichée n'est jamais ambiguë entre les conventions de locale, et le format long avec le mois nommé est préféré partout où la place le permet. `VOICE-U10`
- **[loi]** Le temps relatif n'est employé qu'en deçà de 24 à 48 heures, au-delà desquelles la date absolue s'affiche, et tout horodatage relatif est doublé de la date absolue dans sa valeur machine. `VOICE-U11`
- **[préférence]** La prose de lecture ne dépasse pas la mesure de lecture maximale du système, les libellés d'action restent courts, et une troncature ne masque jamais une information décisive, dont la version complète reste accessible. `VOICE-U12`
- **[préférence]** Le lexique du produit fixe un mot unique par concept, l'engagement portant sur le fait de ne pas mélanger deux désignations pour la même action plutôt que d'interdire des synonymes en soi. `VOICE-U13`
- **[loi]** Un message d'erreur ne porte ni interjection de fausse légèreté, ni emoji, ni point d'exclamation : un incident se traite avec calme et ne se minimise pas. `VOICE-U14`
- **[loi]** Un message d'erreur énonce ce qui s'est passé, pourquoi et comment corriger, sans attribuer de faute à la personne, et fournit la correction dès qu'elle est connue. `VOICE-U15`
- **[préférence]** Un succès routinier se confirme brièvement et au passé accompli, sans félicitation ni point d'exclamation. `VOICE-U16`
- **[préférence]** Le microcopy de résolution d'un moment E-motion catalogué est la seule exception au gabarit de succès et peut se réchauffer d'un cran, jamais par défaut. `VOICE-U17`
- **[loi]** Un état vide énonce la situation et pointe la première action qui la comble, en distinguant l'absence de résultat d'une recherche de l'absence de contenu encore créé. `VOICE-U18`
- **[loi]** Une confirmation destructive nomme la conséquence exacte de l'action, et son bouton porte le verbe de cette action plutôt qu'une formule générique. `VOICE-U19`
- **[préférence]** Un état d'attente énonce au présent progressif ce qui est en train de se passer, le mot doublant l'indicateur visuel sans le remplacer. `VOICE-U20`

## Non couvert — poser la question, ne rien trancher

- Consentement / mentions : Un consentement ou une mention légale s'affiche.
- Sens de lecture (RTL) : Une langue se lit de droite à gauche.
