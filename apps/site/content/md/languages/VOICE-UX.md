---
component: voice
layer: ux
type: language
version: 1.3.1 # 1.3.1 : lecture d'audit du parti pris (pivot 2026-07-21) — chez un hôte tiers, le registre se lit comme paramètre relevable, jamais comme défaut. 1.3.0 : exception E-motion documentée côté Voice (elle n'existait qu'affirmée depuis EMOTION-UX.md, jamais réciproquée ici) — un agent chargeant Voice seul ne pouvait pas la découvrir ; correction de la ligne « Succès » du tableau de ton, qui excluait toute célébration sans distinguer le succès routinier du moment E-motion catalogué. 1.2.0 : Voice devient un langage de premier niveau, distinct des fondations typographiques qu'il emploie. 1.1.0 : distinction contrainte vs parti pris d'identité paramétrable (registre productif) — stress-test 2026-07-17. 1.0.0 : première rédaction — inventaire et benchmark faits AVANT livraison ; consolide les règles de wording déjà écrites dans BUTTON-UX (§ Wording), INPUT-UX (§ Contenu du message) et ALERT-UX, sans en retirer l'autorité (dédoublonnage : le composant garde son wording, le langage le nomme)
last_updated: 2026-07-21
companion: VOICE-UI.md
confidence: mixed # plain language, texte de lien signifiant et "ne jamais blâmer" sont établis (Nielsen, GOV.UK, WCAG) ; le registre "productif, pas expressif" est une décision d'identité interne (héritée de MOTION) ; le niveau de lecture cible n'est pas encore chiffré
---

# Voix & ton — Couche UX (langage)

> Ce fichier contient le raisonnement : quelle est la voix du produit, comment le ton s'adapte à l'utilisateur, pourquoi le mot est le canal d'information le plus fiable du système. Les mécaniques concrètes (capitalisation, ponctuation, nombres, dates, lexique, gabarits de messages) vivent dans `VOICE-UI.md` ; les longueurs de lecture dans `DESIGN.md` (`measure.reading-max`). Le wording propre à chaque composant reste dans son fichier (BUTTON-UX, INPUT-UX, ALERT-UX) — ce langage l'unifie, il ne le remplace pas.

## Note de transposition (à lire en premier)

RÈGLE : la voix est un **langage de contenu** — pas de variantes visuelles, pas d'assemblage, pas de token de valeur : une grammaire transversale sur tout ce que le produit *dit*. Elle se scinde en deux couches : le **principe de voix** (stable, ce fichier — ce qu'est le produit quand il parle) et le **lexique + les mécaniques** (changeants avec la marque ou le produit, `VOICE-UI.md` — les mots exacts, la casse, les formats). Une voix qui référence des principes survit à un changement de marque ; un texte qui code en dur ses tournures meurt avec lui.

RÈGLE : la voix porte **un quasi-axe** propre aux langages — le **ton varie selon l'état émotionnel de l'utilisateur** (routine, erreur, panne, succès, attente, destruction). C'est la distinction classique **voix vs ton** : la voix est *constante* (la personnalité du produit ne change pas d'un écran à l'autre), le ton s'*ajuste* (on ne parle pas d'un échec de paiement comme d'un succès d'inscription). Le § « Le ton suit l'utilisateur » tient lieu de table d'axes.

RÈGLE : **le registre de ce produit est productif, pas expressif** — reprise littérale de MOTION-UX. Clarté, précision, sobriété ; pas d'humour d'apparat, pas de superlatif marketing, pas de sur-célébration. Le produit parle comme un collègue compétent et calme, pas comme une marque qui vend. Toute exception (surface marketing) se journalise et se cadre à part.

RÈGLE : **distinguer la contrainte du parti pris (1.1.0)** — comme MOTION. Les contraintes (ne jamais blâmer, texte de lien signifiant WCAG 2.4.4, jamais l'information par le style seul, plain language accessible) ne se négocient pas ; le registre « productif, pas expressif » est un **parti pris d'identité paramétrable** — une surface marketing assumée peut relever le registre sans toucher aux contraintes d'accessibilité et d'anti-blâme. **Lecture d'audit (pivot 2026-07-21)** : face à une interface tierce, ce parti pris se lit comme un **paramètre relevable, jamais comme un défaut** — un « Parfait ! » chez un hôte au registre expressif assumé est une *divergence de registre* à signaler à part, pas une non-conformité ; seules les contraintes fondent un constat.

## Exception E-motion (1.3.0) — le seul relèvement cadré du registre

RÈGLE : **`EMOTION-UX.md` est l'unique exception cadrée au registre productif, et ce langage l'autorise explicitement.** Jusqu'ici l'autorisation n'existait que du côté d'E-motion (« Autorité : RULES-voice.md ») sans être réciproquée ici — un agent qui charge Voice sans E-motion n'avait aucun moyen de le savoir. Sur les moments mérités du catalogue d'E-motion (réussite d'un envoi, première fois, cap franchi, sortie d'erreur, vide avec personnalité) — et seulement ceux-là — le microcopy de résolution peut se réchauffer d'un cran : un émoji ponctuel et une formulation plus chaleureuse deviennent possibles (« C'est parti ✈️ » plutôt que « Envoyé »). Voice ne redéfinit pas cette exception, il la borne : E-motion reste gouverné par son propre catalogue fermé et son budget de rareté.

RÈGLE : **l'exception ne s'étend jamais** à une erreur (utilisateur ou système), à une action destructive, ni à une action fréquente ou réflexe — ces cas restent strictement dans le registre productif (bannis : « Oups », emoji, « ! »). Une exception positive et rare n'est pas une porte vers l'expressif généralisé ; hors du catalogue d'E-motion, le § « Le ton suit l'utilisateur » ci-dessous fait seul autorité.

> **Pourquoi** : une règle d'autorité doit rester lisible depuis les deux fichiers qu'elle relie, sinon sa validité dépend de l'ordre dans lequel un agent charge les bundles — ce que le routeur ne garantit pas toujours (`selon-contexte` charge Voice quand E-motion est invoqué, jamais l'inverse).

## Le mot est le canal d'information fiable

RÈGLE : **la règle cardinale de ce langage** — le texte est le **seul canal d'information qui survit à tout** : à la couleur coupée (daltonisme, forced-colors), au mouvement coupé (reduced-motion), à l'icône non comprise, au lecteur d'écran. Quand COLOR-UX dit « jamais la couleur seule », MOTION-UX « le mouvement n'informe jamais seul », ICONOGRAPHY-UX « jamais le dessin seul » — **le canal redondant qu'ils invoquent tous, c'est le mot.** Ce langage est donc le socle de la redondance de tout le système.

> **Pourquoi** : les trois autres canaux (couleur, mouvement, forme) sont rapides à percevoir mais faillibles ; le mot est plus lent mais **inconditionnel**. Un état d'erreur porte donc toujours le mot « Erreur » (INPUT), une résolution est *annoncée* (ALERT), un lien *décrit sa destination*. Retirer le mot pour « alléger » revient à retirer le seul canal garanti.

RÈGLE : **le texte de lien et de bouton se suffit hors contexte.** « Cliquez ici », « En savoir plus », « OK » échouent : un lecteur d'écran qui liste les liens de la page, ou un utilisateur qui scanne, ne voit pas le contexte autour. Le libellé dit *où il mène* ou *ce qu'il fait* (WCAG 2.4.4 ; renvoi BUTTON-UX § Wording : « un verbe qui décrit la conséquence bat un label générique »).

## Clarté d'abord — plain language

RÈGLE : **dire la chose la plus simple qui soit vraie.** Phrases courtes, voix active, un sujet par phrase, le mot courant plutôt que le mot savant. On écrit pour être compris du premier coup, pas pour paraître sérieux.

RÈGLE : **pas de jargon exposé à l'utilisateur.** Les termes techniques, codes d'erreur et sigles internes restent dans les logs et le support ; l'utilisateur lit une phrase humaine. Un acronyme inévitable se développe à sa première occurrence.

> **Erreur fréquente** : croire qu'un vocabulaire technique inspire confiance. Il exclut — c'est le pendant écriture du « contraste qui rend lisible mais ne distingue pas » (COLOR) : un texte peut être grammaticalement parfait et rester incompréhensible pour qui ne partage pas le jargon.

RÈGLE : **concision, mais pas au prix de la clarté.** On coupe les mots vides (« veuillez noter que », « afin de pouvoir »), pas l'information nécessaire. La concision sert la lisibilité (LAWS : Cognitive Load) ; elle ne justifie jamais de retirer le *pourquoi* ou le *comment corriger* d'un message.

## Le ton suit l'utilisateur (le quasi-axe)

RÈGLE : **la voix ne change pas, le ton s'ajuste à l'état émotionnel.** Table de correspondance — c'est la structure d'axes de ce langage :

| État de l'utilisateur | Ton | Ce qu'on fait / ce qu'on évite |
|---|---|---|
| Routine, neutre | Clair, direct, discret | La voix par défaut ; on ne commente pas ce qui va de soi |
| Erreur *de l'utilisateur* | Calme, sans blâme, orienté solution | Dire *quoi corriger* ; jamais « vous avez fait une erreur », jamais culpabiliser |
| Erreur *système* / panne | Honnête, responsable, rassurant | Le produit assume (« Nous n'avons pas pu enregistrer ») ; proposer une suite, ne pas accuser l'utilisateur d'un bug |
| Action destructive | Direct, factuel, conséquence nommée | Nommer exactement ce qui sera perdu ; ni euphémisme (« nettoyer ») ni sur-dramatisation |
| Succès (routinier) | Bref, factuel | Confirmer et libérer ; pas de « Bravo ! », pas de confettis (écho MOTION : pas de célébration) |
| Succès (moment E-motion catalogué) | Chaleureux, ponctuel | Seul cas où le registre se réchauffe — cf. § Exception E-motion ci-dessus |
| Attente | Rassurant, informatif | Dire ce qui se passe (« Enregistrement… ») ; le visuel vient de MOTION, le mot d'ici |
| Vide / démarrage | Encourageant, orienté action | Distinguer « rien encore » de « rien trouvé » ; pointer la première action |

> **Pourquoi soigner particulièrement l'erreur et la fin** : Peak-End Rule (LAWS) — le souvenir d'une expérience est dominé par son pic (souvent une erreur) et sa fin. Un message d'erreur calme et utile, et un message de clôture net, pèsent plus que la moyenne des écrans.

RÈGLE : **ne jamais blâmer l'utilisateur — règle cardinale du ton.** L'erreur est une information, pas un reproche. On décrit l'écart et la correction (« Le format attendu est JJ/MM/AAAA »), on ne qualifie pas l'utilisateur (« saisie invalide », « vous n'avez pas rempli… »). Quand la faute est côté système, le produit la prend à son compte.

## Cohérence — une voix, un vocabulaire

RÈGLE : **la voix est constante d'un écran à l'autre.** Pas de familiarité soudaine, pas de formalisme qui va et vient. Un utilisateur reconnaît le produit à sa manière de parler comme à ses couleurs (Gestalt/similarité, LAWS).

RÈGLE : **un concept = un mot, partout.** « Supprimer » ne devient pas « Effacer » puis « Retirer » selon l'écran. Le lexique contrôlé vit dans `VOICE-UI.md` ; le principe est ici — c'est la version écriture des registres étanches de COLOR (une couleur = un sens ; un mot = un sens).

> **Erreur fréquente** : varier les synonymes « pour ne pas se répéter », réflexe de rédaction littéraire. En UI, la répétition est une *fonctionnalité* : le même mot pour la même action réduit la charge cognitive et l'incertitude.

## Accessibilité et internationalisation

RÈGLE : **le niveau de lecture reste bas par choix.** Plain language sert d'abord l'accessibilité cognitive (WCAG 3.1.5, AAA, vise un niveau collège) et les non-natifs. Aucun niveau chiffré n'est encore fixé pour ce produit — position explicite, pas oubli (cf. À approfondir).

RÈGLE : **écrire pour être traduisible, même monolingue.** Ne jamais **concaténer** des fragments de phrase par du code (l'ordre des mots change d'une langue à l'autre) ; ne pas coder la longueur en dur (certaines langues s'allongent ~30 %) — c'est un renvoi vers `measure` et vers la mécanique de troncature de VOICE-UI. Éviter les idiomes, l'humour et les jeux de mots qui ne franchissent pas les langues.

RÈGLE : **le mot descriptif porte l'accessibilité non visuelle** — texte alternatif utile (pas « image »), `aria-label` qui dit l'action, texte de lien signifiant. C'est la même exigence que la redondance de COLOR, côté lecteur d'écran.

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Message qui blâme l'utilisateur | Honte, abandon, perte de confiance (pic négatif, Peak-End) | Élevée |
| Erreur générique non actionnable (« Une erreur est survenue ») | Utilisateur bloqué sans issue — charge de résolution reportée (Tesler) | Élevée |
| Information portée par le style seul (rouge sans le mot) | Exclusion daltonisme / lecteur d'écran (WCAG 1.4.1) | Critique |
| Texte de lien/bouton non signifiant (« cliquez ici », « OK ») | Navigation lecteur d'écran cassée (WCAG 2.4.4) | Élevée |
| Jargon ou code technique brut exposé | Exclusion des non-experts, incompréhension | Moyenne à élevée |
| Vocabulaire incohérent (un concept, plusieurs mots) | Incertitude, l'utilisateur doute que ce soit la même action | Moyenne |
| Voix qui change de personnalité entre écrans | Produit perçu comme disparate, méfiance | Moyenne |
| Concaténation de fragments / longueur codée en dur | Traduction cassée, texte tronqué | Moyenne (élevée si multilingue) |
| Sur-promesse ou sur-célébration marketing dans l'UI produit | Ton faux, décalage avec le registre productif | Moyenne |

## Règle transversale

RÈGLE : **le mot est le seul canal qui ne tombe jamais — il porte donc l'information, calmement, sans blâmer, dans un vocabulaire constant.** Voix stable, ton ajusté à l'utilisateur, clarté avant élégance.

> **Pourquoi** : c'est le socle des canaux redondants du système. COLOR, MOTION et ICONOGRAPHY disent tous « pas ce canal seul » — et se rabattent sur le texte. Si le texte lui-même est obscur, blâmant ou absent, la redondance de tout le système s'effondre. La voix n'est pas la couche décorative de l'UI : c'est sa couche d'information de dernier recours.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Plain language, phrases courtes, voix active | [Nielsen Norman — Plain Language](https://www.nngroup.com/articles/plain-language-experts/), [GOV.UK — Content design: writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) | Établi — recherche utilisateur documentée |
| Voix constante / ton variable selon le contexte | [Mailchimp — Voice and Tone](https://styleguide.mailchimp.com/voice-and-tone/), [Shopify Polaris — Content](https://polaris.shopify.com/content/voice-and-tone) | Établi — convergence des guides de contenu majeurs |
| Ne jamais blâmer l'utilisateur ; l'erreur dit quoi corriger | [NN/g — Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/), INPUT-UX (§ Contenu du message, Luke Wroblewski +22 %) | Établi |
| Texte de lien signifiant (pas « cliquez ici ») | [WCAG 2.4.4 — Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html), [NN/g — Links](https://www.nngroup.com/articles/writing-links/) | Établi, standard d'accessibilité |
| Niveau de lecture accessible (viser ~niveau collège) | [WCAG 3.1.5 — Reading Level](https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html) (AAA) | Établi (standard) ; niveau cible non encore chiffré pour ce produit |
| Registre « productif, pas expressif » | Reprise interne de MOTION-UX (dualité Carbon productif/expressif) | Décision d'identité interne, cohérente avec le reste du système |
| Ne pas concaténer, prévoir l'expansion de traduction | [W3C — Text size in translation](https://www.w3.org/International/articles/article-text-size), [Shopify Polaris — Grammar & mechanics](https://polaris.shopify.com/content/grammar-and-mechanics) | Établi — bonne pratique i18n |
| Cohérence lexicale (un concept, un mot) | [GOV.UK — Content design](https://www.gov.uk/guidance/content-design/writing-for-gov-uk), déclinaison écriture des registres COLOR | Établi par convergence |
| Soigner erreur et clôture (pic et fin) | Peak-End Rule (cf. LAWS-UX, Kahneman / NN/g) | Établi (mémoire) ; ampleur en UI contextuelle |

*Le wording opérationnel de chaque composant reste sourcé dans son fichier (BUTTON-UX, INPUT-UX, ALERT-UX, FORM-UX) — ce langage en donne le cadre commun, il ne re-source pas chaque libellé.*

## À approfondir

- **Niveau de lecture cible** : fixer une fourchette mesurable (ex. indice de lisibilité) le jour où le produit a du contenu long — aujourd'hui position « bas par principe » sans chiffre.
- **Surface marketing / contenu de page** : un registre plus expressif (landing, articles) frotte avec le « productif seul » — frontière à trancher si ces pages entrent dans le périmètre produit (la documentation en a déjà : à cadrer).
- **RTL (sens de lecture)** : non couvert, décision produit non prise — même statut que le dark mode (COLOR).
- **Multilingue** : produit monolingue à ce jour ; les règles de traduisibilité sont écrites d'avance, non éprouvées.
- **Glossaire produit** : le lexique contrôlé de VOICE-UI est un noyau ; un glossaire complet naîtra avec le volume de surfaces.
- **Ton de la voix synthétique / notifications hors app** (e-mails, push) : canal voisin, non traité — à rattacher le jour où le produit émet hors de l'interface.
