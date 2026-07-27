---
component: voice
layer: ui
type: language
version: 1.2.0 # 1.2.0 : gabarit « succès » et règle « pas de point d'exclamation » assortis de l'exception E-motion (cf. VOICE-UX.md § Exception E-motion, 1.3.0) — sans ce renvoi, la mécanique interdisait toute célébration y compris sur un moment catalogué par EMOTION-UX.md. 1.1.0 : Voice devient un langage de premier niveau, distinct des fondations typographiques qu'il emploie. 1.0.0 : première rédaction — la couche "concrète" de la voix : lexique contrôlé, mécaniques d'écriture (casse, ponctuation, nombres, dates), gabarits de messages. Ne définit AUCUN token de valeur (aucun hex/px) ; référence typography.label, typography.body, measure.reading-max de DESIGN.md — un besoin de valeur nouvelle passerait d'abord par DESIGN.md
last_updated: 2026-07-20
companion: VOICE-UX.md
confidence: mixed # capitalisation sentence-case, chiffres pour les données et texte de lien signifiant sont établis par convergence ; le lexique exact (mots préférés/bannis) est une décision d'identité interne, amenée à s'étendre avec les surfaces
---

# Voix & ton — Couche UI (langage)

> La couche concrète et changeante de la voix : les mots exacts, la casse, la ponctuation, les formats de nombres et de dates, les gabarits de messages. Le raisonnement (voix constante / ton variable, le mot comme canal fiable, ne jamais blâmer) vit dans `VOICE-UX.md`. Cette couche est celle qui **bouge avec la marque ou le produit** — comme les valeurs hex de DESIGN.md, elle peut être remplacée sans toucher aux principes. Aucune valeur nouvelle n'est définie ici : les longueurs et styles référencent `DESIGN.md` par nom de token.

## Ce que cette couche ne fait pas

RÈGLE : **elle ne redéfinit pas le wording des composants.** Les libellés de bouton (BUTTON-UX § Wording), les messages d'erreur de champ (INPUT-UX), les contenus par tone de l'alert (ALERT-UX) restent la propriété de ces fichiers. Cette couche fournit le **cadre mécanique commun** (casse, ponctuation, gabarits) qu'ils appliquent tous. En cas de divergence, le fichier du composant fait autorité sur *son* libellé, ce langage sur la *mécanique*.

## Mécaniques d'écriture

### Capitalisation

RÈGLE : **sentence case partout par défaut** — une majuscule au premier mot, le reste en minuscules (« Enregistrer les modifications », pas « Enregistrer Les Modifications »). Titres, boutons, labels, menus : sentence case. Le Title Case anglo-saxon n'est pas utilisé (il n'existe pas en français et nuit à la lisibilité).

RÈGLE : **les CAPITALES sont réservées aux étiquettes** rendues avec `typography.label` (pastilles, badges, kickers) — jamais une phrase, jamais un libellé d'action. Une capitale isolée porte un nom propre ou un sigle, rien d'autre.

### Ponctuation

RÈGLE : **pas de point final** sur un libellé court, un label, un titre ou un bouton. Le point revient dès qu'il y a **au moins deux phrases** ou une phrase complète d'aide/d'erreur.

RÈGLE : **« … » (points de suspension)** sur une action qui ouvre une étape supplémentaire avant de s'exécuter (« Exporter… » ouvre un choix de format) ; jamais sur une action qui agit immédiatement (« Enregistrer »).

RÈGLE : **ponctuation française** — espace insécable avant `: ; ! ?` et à l'intérieur des guillemets français `« … »` ; pas de guillemets droits `"` en contenu. (Frontière : dans les blocs de code/données rendus en `label-mono`, la ponctuation ASCII est conservée telle quelle.)

RÈGLE : **pas de point d'exclamation** dans l'UI produit, sauf rare message de bienvenue — c'est la marque du registre expressif (VOICE-UX : productif, pas expressif). Un succès se ponctue d'un point, pas d'un « ! ». Exception unique : le microcopy de résolution d'un moment E-motion catalogué (VOICE-UX § Exception E-motion) peut porter un « ! » ou un émoji ponctuel — jamais un message d'erreur, jamais une action destructive.

### Nombres

RÈGLE : **chiffres, pas lettres, pour toute donnée** (« 3 résultats », pas « trois résultats ») — un chiffre s'accroche à l'œil qui scanne (GOV.UK). Les lettres restent pour un usage rhétorique en prose, hors data.

RÈGLE : **format localisé** — séparateur de milliers par espace insécable (`12 500`), virgule décimale (`3,5 %`), espace insécable avant l'unité et le symbole `%` `€`. Ne jamais coder ces formats en dur dans une chaîne : ils changent de langue en langue (renvoi VOICE-UX : traduisibilité).

### Dates et heures

RÈGLE : **date explicite, jamais ambiguë** — « 12 juillet 2026 » ou « 12/07/2026 » (jamais un format où JJ/MM et MM/JJ se confondent selon la locale). Le format long est préféré partout où la place le permet.

RÈGLE : **le relatif est borné** — « il y a 3 min », « hier » sont admis jusqu'à ~24-48 h ; au-delà, date absolue. Un relatif toujours doublé de l'absolu en `title`/`datetime` pour l'accessibilité et le survol.

### Longueur et troncature

RÈGLE : la prose de lecture suit `measure.reading-max` (**70ch**, TYPOGRAPHY) — au-delà, la mesure casse. Les libellés d'action restent courts (verbe + objet) ; une troncature par ellipsis ne masque jamais une information décisive (le nom complet reste accessible en `title`/tooltip).

## Lexique contrôlé (noyau)

RÈGLE : **un concept = un mot.** Noyau de départ, à étendre avec les surfaces (VOICE-UX : cohérence). La colonne « on évite » n'est pas une liste de synonymes interdits en soi — c'est l'engagement à ne pas *mélanger* les deux pour la même action.

| Concept | On dit | On évite |
|---|---|---|
| Valider/sauver une saisie | **Enregistrer** | Sauvegarder, Soumettre, Valider (ambigu : valider = confirmer ?) |
| Détruire définitivement | **Supprimer** | Effacer, Retirer, Nettoyer |
| Retirer d'une liste sans détruire | **Retirer** | Supprimer (réservé au destructif) |
| Abandonner sans enregistrer | **Annuler** | Quitter, Fermer, Abandonner |
| Confirmer une action | **Confirmer** | OK, Valider, Oui |
| Envoyer un formulaire | verbe de la conséquence (**Créer le compte**, **Payer**) | Soumettre, Envoyer, OK (BUTTON-UX § Wording) |
| Politesse | ton direct, pas d'injonction | « Veuillez… » systématique, « Merci de… » |
| Excuse (erreur système) | « Nous n'avons pas pu… » | « Oups ! », « Aïe », emoji |

RÈGLE : **pas de « Oups », d'emoji, ni d'exclamation** dans les messages d'erreur — un incident se traite avec calme, pas avec une fausse légèreté qui minimise le problème de l'utilisateur (VOICE-UX : ton système honnête).

## Gabarits de messages

RÈGLE : **message d'erreur = ce qui s'est passé + pourquoi + comment corriger.** Gabarit partagé par l'erreur mono-champ (INPUT) et l'erreur globale (ALERT), toujours sans blâme :
> *« Le format attendu est JJ/MM/AAAA. »* — dit la correction, pas la faute.
> *« Nous n'avons pas pu enregistrer vos modifications. Vérifiez votre connexion et réessayez. »* — le produit assume + issue.

RÈGLE : **succès (routinier) = confirmation + libération.** Bref, factuel, au passé accompli : *« Modifications enregistrées. »* Pas de félicitation, pas de « ! ».

RÈGLE : **succès (moment E-motion catalogué) = seule exception au gabarit ci-dessus.** Le microcopy de résolution peut se réchauffer d'un cran (*« C'est parti ✈️ »* plutôt que *« Envoyé »*) — uniquement sur les moments du catalogue d'EMOTION-UX.md, jamais par défaut (renvoi VOICE-UX § Exception E-motion).

RÈGLE : **état vide = situation + première action.** Distinguer *« Aucun résultat pour « … ». Essayez d'élargir votre recherche. »* (rien trouvé) de *« Vous n'avez pas encore de projet. Créez le premier. »* (rien encore) — renvoi CARD (empty state).

RÈGLE : **confirmation destructive = conséquence nommée + libellé qui dit l'action.** *« Supprimer ce projet ? Cette action est irréversible. »* + bouton **Supprimer** (pas « OK »). La friction se calibre sur le coût réel (renvoi BUTTON destructive / FORM-sensitive-data).

RÈGLE : **attente = ce qui se passe, au présent progressif.** *« Enregistrement… »*, *« Vérification du paiement… »* — le mot double l'indicateur visuel (MOTION), il ne le remplace pas.

## Tokens référencés (aucun défini ici)

| Besoin | Token (DESIGN.md) | Fichier faisant autorité |
|---|---|---|
| Mesure de lecture de la prose | `measure.reading-max` (70ch) | TYPOGRAPHY-UI |
| Style des étiquettes en CAPITALES | `typography.label` (Inter) | TYPOGRAPHY-UI / DESIGN.md |
| Corps de texte courant | `typography.body` | TYPOGRAPHY-UI |
| Données techniques (codes, tokens cités) | `typography.label-mono` | TYPOGRAPHY-UI |

RÈGLE : cette couche n'introduit **aucune valeur brute**. Si un besoin de valeur apparaît (ex. une longueur maximale de libellé chiffrée), il passe d'abord par `DESIGN.md` avec montée de version — guardrail commun à tous les `*-UI.md`.

## Consommation par les composants

| Consommateur | Ce que le langage lui fournit | Ce qu'il garde en propre |
|---|---|---|
| Bouton (BUTTON-UI/UX) | Casse, ponctuation, « … », lexique des libellés | Le wording exact (verbe + conséquence) |
| Input (INPUT-UX) | Gabarit d'erreur (quoi/pourquoi/comment), ton sans blâme | Les messages par type de champ, le « Erreur » d'accessibilité |
| Alert (ALERT-UX) | Ton par état, gabarits succès/erreur/info | Le contenu par tone, la persistance |
| Form (FORM-UX) | Ton du cycle de soumission, résumé d'erreurs | L'orchestration (timing, focus, ancres) |
| Card (CARD-UX) | Gabarit d'état vide | Le déclenchement de l'empty state / skeleton |

RÈGLE : chaque composant applique la **mécanique** de cette couche et garde l'**autorité** sur son wording — divergence assumée, sur le modèle exact de COLOR-UI (« chaque composant nomme le registre danger selon ce qu'il signifie pour lui »).

## Vérifiabilité

RÈGLE : **la voix ne se teste pas automatiquement — c'est une exigence de revue.** Comme la redondance (COLOR 1.4.1) que `test-rendu.js` ne calcule pas, le ton, l'absence de blâme et la cohérence lexicale se vérifient à l'œil. Ce que l'outillage *peut* attraper (candidats, non implémentés à ce jour) : présence de mots bannis (« Oups », « cliquez ici », emoji dans un message d'erreur), point final sur un libellé court, guillemets droits en contenu — un lint de contenu à ajouter à `valide-dossier.js` le jour venu.

RÈGLE : limite assumée — le lexique de cette v1.0.0 est un **noyau** (les concepts déjà consommés par les 4 composants + le form). Il s'étend au fil des surfaces, pas d'avance (principe « un token/un mot naît d'un besoin réel »).

## Sources et niveau de confiance (couche UI)

| Affirmation | Source | Confiance |
|---|---|---|
| Sentence case par défaut, pas de Title Case | [Shopify Polaris — Grammar & mechanics](https://polaris.shopify.com/content/grammar-and-mechanics), [GOV.UK — style guide (capitalisation)](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style) | Établi par convergence |
| Chiffres pour les données, pas les lettres | [GOV.UK — numbers](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#numbers) | Établi — recherche utilisateur |
| Pas de point sur les libellés courts ; « … » pour action différée | [Apple HIG — Writing](https://developer.apple.com/design/human-interface-guidelines/writing), [Microsoft — Text in UI](https://learn.microsoft.com/style-guide/) | Établi par convergence |
| Ponctuation française (espaces insécables, guillemets `« »`) | [Lexique des règles typographiques (Imprimerie nationale)](https://fr.wikipedia.org/wiki/Lexique_des_r%C3%A8gles_typographiques_en_usage_%C3%A0_l%27Imprimerie_nationale) | Établi — norme typographique FR |
| Date non ambiguë, relatif borné et doublé | [NN/g — Timestamps](https://www.nngroup.com/articles/timestamps/) | Établi |
| Gabarit d'erreur quoi/pourquoi/comment, sans blâme | [NN/g — Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/), INPUT-UX | Établi |
| Lexique contrôlé (mots exacts) | Décision d'identité interne — noyau extensible | Décision de conception, non empirique |
| Formats non codés en dur (i18n) | [W3C — Text size in translation](https://www.w3.org/International/articles/article-text-size) | Établi — bonne pratique i18n |

## À approfondir

- **Lint de contenu** : ajouter à `valide-dossier.js` la détection des mots bannis, du point final sur libellé court, des guillemets droits — le pendant écriture de l'interdiction des hex en dur.
- **Glossaire produit complet** : le lexique ci-dessus est un noyau de 8 concepts ; à étendre avec chaque nouvelle surface.
- **Formats de données avancés** : monnaies multiples, fuseaux horaires, pluriels dépendants de la locale — à traiter si le produit devient multi-régions.
- **Voix hors interface** : e-mails transactionnels, notifications push — mêmes principes, mécaniques propres à définir le jour venu.
