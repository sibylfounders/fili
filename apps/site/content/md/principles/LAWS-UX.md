---
component: laws
layer: ux
type: principle
version: 1.3.1 # 1.3.1 : la carte d'application renvoie Doherty aussi vers le principe performance (contrat des attentes, 2026-07-21) ; rien d'autre ne change. 1.3.0 : naissance du principe opérationnel cognitive-load (2026-07-21, cf. DECISIONS.md) — la carte d'application renvoie vers lui (Cognitive Load, Selective Attention) et l'anti-camouflage « candidate » est promu en RÈGLE chez lui ; le statut de référence humaine de ce catalogue reste inchangé. 1.2.0 : Laws devient un principe de premier niveau ; son statut de référence humaine non compilée reste inchangé. 1.1.0 : reclassée « référence humaine » — audience: humans, PAS compilée vers dist/ (l'IA ne la charge jamais au build). Décision 2026-07-12, cf. DECISIONS.md. 1.0.0 : première rédaction — catalogue large (27 lois, périmètre lawsofux.com + sources primaires) ; inventaire et benchmark faits AVANT livraison ; UX-only par nature (aucun token)
last_updated: 2026-07-21
companion: none # principe sans couche UI — décision justifiée dans la note de transposition
audience: humans # principe de RÉFÉRENCE : s'adresse aux humains (revue, formation), pas à l'IA au moment du build — non compilé en RULES, absent du routeur. Les lois s'appliquent via les principes/fondations/composants qui, eux, sont chargés.
confidence: mixed # les lois de perception (Gestalt) et les seuils temporels (Doherty, Fitts) sont établis ; plusieurs "lois" nommées sont des heuristiques ou des effets d'ampleur variable, marqués comme tels ; deux mythes courants sont réfutés (Miller "7 items", règle des 3 clics)
---

# Lois UX — Couche UX (principe)

> Ce fichier est un **catalogue de lecture théorique** : il nomme les lois de psychologie et d'ergonomie qui fondent les règles déjà écrites ailleurs dans le système, en donne la source, la portée réelle, la limite, et **la carte de là où chacune s'applique déjà**. Il ne crée aucune contrainte nouvelle et ne porte aucune valeur — les règles opérationnelles vivent dans les autres principes, les fondations, les langages et les composants, vers lesquels chaque loi renvoie.

## Note de transposition (à lire en premier)

RÈGLE : les lois UX forment le **principe théorique** du système — ni variantes (composant), ni assemblage (pattern), ni token transversal. C'est le corpus que les autres sujets *appliquent* et *citent* déjà (Doherty dans MOTION, Hick dans l'inflation du primary de BUTTON, Gestalt/proximité dans SPACING). Le modèle à axes ne s'y applique pas ; le modèle rôle/valeur non plus.

RÈGLE : **ce principe s'adresse aux humains, pas à l'IA du build** (`audience: humans`). Il n'est **pas compilé vers `dist/`** : aucun `RULES-laws`, absent du routeur, jamais chargé au moment de générer de l'UI. Motif — les lois ne posent aucune contrainte que le build consomme (elles renvoient toutes à une règle qui vit ailleurs) ; les charger à chaque build ne ferait qu'alourdir sans rien contraindre. Il vit donc dans l'atelier et sur le site (revue, formation, argumentation), et son influence passe par les sujets opérationnels qui, eux, sont compilés et chargés. Décision journalée (DECISIONS.md 2026-07-12).

RÈGLE : **ce principe n'a pas de couche UI — par nature, pas par oubli.** Un catalogue de lois n'a ni surface visuelle (hex, px) ni lexique concret : ses « valeurs » sont les tokens et règles des autres sujets, qui portent déjà l'implémentation. Créer une couche `LAWS-UI` reviendrait à dupliquer ce qui vit dans les couches UI de motion, spacing, button… — exactement le travers que le principe de dédoublonnage interdit. Sa couche « concrète » est donc la **carte d'application** en fin de fichier : loi → où elle est déjà implémentée.

> **Conséquence outillée résolue** : `valide-dossier.js` reconnaît `companion: none` et exempte les sujets UX-only déclarés. **Ne pas** créer un UI factice pour satisfaire le script : ce serait une valeur sans besoin réel (guardrail COLOR).

RÈGLE : une loi ne s'applique **jamais seule**. La plupart sont en tension avec une autre (Hick « montre moins » ↔ découvrabilité et Fitts ; Miller « limite » ↔ Tesler « la complexité ne disparaît pas »). Le rôle de ce principe est de rendre ces tensions **visibles**, pas de les trancher — l'arbitrage remonte, comme partout ailleurs (les lignes CONFIANCE calibrent la vitesse de remontée).

RÈGLE : **une loi nommée n'est pas une loi vraie.** Le mot « loi » recouvre ici des choses d'ampleur très inégale : des résultats robustes (Fitts, Gestalt, Doherty), des heuristiques utiles (Occam, Postel), des effets réels mais contextuels (Peak-End, Aesthetic-Usability), et des formules **abusées** (Miller « 7 items », la « règle des 3 clics »). Chaque entrée porte donc son niveau de confiance, et les deux mythes les plus tenaces sont réfutés à leur source.

## Comment lire une entrée

Chaque loi tient en une ligne d'énoncé, une portée réelle, une **frontière** (là où elle cesse d'être vraie ou devient manipulatrice), et un renvoi vers la règle du système qui l'implémente déjà. Les lois sont groupées par domaine cognitif — le même découpage que l'inventaire.

## 1. Charge cognitive et mémoire

RÈGLE : **Cognitive Load (Sweller) — la loi-mère.** Toute charge mentale qu'une interface impose *au-delà* de la tâche elle-même est du gaspillage (charge extrinsèque). C'est le principe implicite de tout le système : registre productif du MOTION, échelles fermées de SPACING et RADIUS, « un token naît d'un besoin réel ». Frontière : réduire la charge extrinsèque ne veut pas dire cacher — un choix retiré de l'écran reste un choix à faire ailleurs (cf. Tesler).

RÈGLE : **Miller's Law — à corriger, pas à appliquer.** L'énoncé populaire « 7±2 éléments maximum » est un **abus** : Miller (1956) parlait de la capacité de la mémoire de travail sur des *unités non structurées*, pas d'une limite de menus, d'onglets ou de champs. La règle utile qui en dérive est le **chunking** (regrouper), pas le plafond numérique. Frontière : ne jamais justifier « maximum 7 items » par Miller — segmenter un numéro de carte en groupes de 4, oui ; brider une navigation à 7 entrées « à cause de Miller », non.

> **Pourquoi** : c'est exactement le travers que le système combat ailleurs — une formule citée hors de sa source (comme « le contraste suffit » pour le daltonisme, COLOR). La loi vraie est plus modeste et plus utile que sa version virale.

RÈGLE : **Chunking — regrouper pour mémoriser.** Découper l'information en unités signifiantes allège la mémoire de travail. Implémenté par le FORM-multi-step (une décision par étape), la proximité de SPACING (regroupement visuel), la segmentation des nombres et dates (VOICE-UI).

RÈGLE : **Working Memory — volatile et rare.** Ne jamais exiger de l'utilisateur qu'il retienne une information d'un écran à l'autre. Implémenté par l'« ask-once » et la récapitulation avant soumission finale (FORM-multi-step), par le helper text *persistant* plutôt que l'aide qui disparaît (INPUT).

RÈGLE : **Zeigarnik Effect — l'inachevé reste présent.** Une tâche interrompue occupe la mémoire ; une barre de progression visible exploite cet effet pour *aider* (FORM-multi-step, statut d'autosave). Frontière éthique : le même levier retourné en dark pattern (relances culpabilisantes, « votre profil n'est complété qu'à 40 % » à répétition) est hors registre — l'effet sert l'utilisateur, jamais la pression.

RÈGLE : **Selective Attention — l'utilisateur ignore le bruit.** La « banner blindness » est réelle : ce qui ressemble à de la publicité est filtré avant lecture. Fonde la sobriété du MOTION (le mouvement capte l'attention de force, donc parcimonie) et la rareté de l'alert. Frontière (promue en RÈGLE opérationnelle par le principe cognitive-load, 2026-07-21) : ne jamais déguiser une information critique en élément décoratif ou promotionnel — elle sera filtrée avec le reste.

## 2. Décision et action

RÈGLE : **Hick's Law — le choix coûte du temps.** Le temps de décision croît avec le nombre *et* la complexité des options. Implémenté par l'inflation du primary (un seul BUTTON primary par vue), les registres étanches (COLOR : une couleur = un sens), un CTA dominant par section. Frontière : Hick pousse à réduire les choix visibles, mais réduire ≠ enfouir — un choix caché derrière trois clics reste un choix (tension avec Fitts et la découvrabilité, arbitrée au cas par cas).

RÈGLE : **Choice Overload — corollaire de Hick.** Au-delà d'un seuil, l'abondance d'options réduit la satisfaction et la probabilité de décision. Implémenté par la cardinalité des actions en carte (CARD) et le nombre d'actions portées par une alert (ALERT).

RÈGLE : **Fitts's Law — grand et proche se cliquent vite.** Le temps d'atteinte d'une cible est proportionnel à la distance / à la taille. Implémenté par la zone tactile minimale de 44px (BUTTON-UI, standard WCAG 2.5.5), par les actions placées près de leur contexte, par les cibles de bord d'écran (infiniment « profondes »). Établi — une des rares vraies lois quantifiées de l'UX.

RÈGLE : **Goal-Gradient Effect — l'effort s'intensifie près du but.** La progression visible motive d'autant plus qu'on approche de la fin (FORM-multi-step). Frontière : la progression doit être *vraie* — une fausse jauge (progrès artificiel, étapes gonflées) trahit l'effet.

RÈGLE : **Tesler's Law — la complexité se conserve.** Toute tâche a une complexité irréductible ; la seule question est *qui l'absorbe* — le système ou l'utilisateur. Le système absorbe : autofill et normalisation (INPUT/Postel), messages qui diagnostiquent à la place de l'utilisateur (INPUT : *pourquoi* et *comment corriger*), valeurs par défaut sensées. Frontière : on ne peut pas supprimer la complexité, seulement décider où elle tombe — la reporter *toujours* sur l'utilisateur est le défaut par paresse.

RÈGLE : **Postel's Law (robustesse) — tolérant en entrée, strict en sortie.** Accepter les formes variées de saisie (espaces dans un IBAN ou un numéro de carte, casse d'un e-mail, tirets d'un téléphone) et normaliser en interne ; ne jamais rejeter sur la forme ce qu'on peut nettoyer. Implémenté par la tolérance de l'INPUT et sa validation qui vise le sens, pas la syntaxe cosmétique.

RÈGLE : **Occam's Razor — la solution la plus simple qui marche gagne.** Ne pas provisionner ce qu'aucun besoin réel ne réclame : disabled non tokenisé tant qu'inutile (COLOR), tokens qui naissent d'un besoin. C'est la version conception du principe d'économie du système.

RÈGLE : **Paradox of the Active User — personne ne lit la doc.** Les utilisateurs se lancent immédiatement plutôt que d'apprendre d'abord ; l'aide doit donc être *contextuelle et dans l'action*, pas préalable. Fonde « le helper text visible dès le focus, avant l'erreur » (INPUT) et l'onboarding intégré plutôt que le tutoriel bloquant (VOICE). Établi — observation robuste (Carroll & Rosson).

RÈGLE : **Flow (Csíkszentmihályi) — la concentration ininterrompue est précieuse.** Rien ne doit rompre l'élan sans raison : le MOTION « ne verrouille jamais l'interaction », le contenu « ne se déplace jamais sans action de l'utilisateur » (SPACING/MOTION). L'interruption se justifie seulement quand l'enjeu la vaut (destructive, perte de données).

RÈGLE : **Parkinson's Law — la tâche remplit le temps disponible (trou signalé).** Une tâche s'étale jusqu'à occuper le temps qu'on lui laisse ; d'où l'intérêt des accélérateurs (autofill, valeurs par défaut, raccourcis). Non couvert par un consommateur actuel — le produit n'a pas encore de mécanique de temps ni de saisie longue ; activé le jour d'un formulaire lourd ou d'une limite temporelle.

## 3. Perception et regroupement (lois de Gestalt)

> **Pourquoi ce bloc est solide** : les lois de Gestalt sont les mieux établies du catalogue (psychologie de la perception, un siècle de validation). Le système en dépend lourdement — surtout la proximité.

RÈGLE : **Proximity — proche = lié.** Les éléments rapprochés sont perçus comme un groupe, indépendamment de tout trait. C'est la loi que SPACING transforme en *information* : un label collé à son champ lui appartient ; un écart plus grand sépare deux groupes. La loi Gestalt la plus adossée au système.

RÈGLE : **Common Region — une frontière partagée regroupe.** Un fond ou un cadre commun lie son contenu plus fort que la proximité seule. Implémenté par la CARD (le conteneur *est* le groupe) et le rôle de regroupement de la BORDER.

RÈGLE : **Similarity — semblable = même famille.** Les éléments qui partagent forme, couleur ou taille sont perçus comme apparentés. Fonde les registres de COLOR (même rôle → même traitement) et la cohérence des tones.

RÈGLE : **Uniform Connectedness — le lien visuel explicite prime.** Ce qui est relié par un trait ou un fond continu est le regroupement le plus fort de tous (au-dessus de la proximité et de la similarité). Implémenté par les séparateurs/regroupements de BORDER et les fonds `*-subtle` de l'alert.

RÈGLE : **Prägnanz / Loi de simplicité — l'œil cherche la forme la plus simple.** On perçoit le complexe comme l'arrangement le plus simple possible. Fonde l'iconographie à trait constant (ICONOGRAPHY) et les silhouettes distinctes des tones (les formes font le travail que la couleur ne garantit pas — COLOR/daltonisme).

RÈGLE : **Von Restorff Effect (isolation) — ce qui diffère se retient.** L'élément visuellement isolé est mémorisé et attire l'action. C'est la justification du primary *unique* (BUTTON) et de l'accent *parcimonieux* (COLOR). Frontière : l'effet s'annule si tout se distingue — un écran où tout est mis en avant n'a plus de point focal (la même inflation que « le primary partout »).

RÈGLE : **Serial Position Effect — on retient le début et la fin (partiellement couvert).** Dans une liste, les premiers et derniers éléments sont mieux mémorisés que le milieu ; placer les items importants aux extrémités. Implicite dans l'ordre des actions, mais **trou** : pas de règle explicite tant qu'un composant navigation/liste n'existe pas — activé avec lui.

## 4. Temps, effort perçu et confiance

RÈGLE : **Doherty Threshold — sous ~400 ms, l'utilisateur reste dans le flux.** Quand système et utilisateur répondent l'un à l'autre sous 400 ms, l'engagement se maintient et la productivité grimpe. C'est la borne haute de toute l'échelle du MOTION ; le feedback perçu-instantané est sous ~100 ms (Nielsen). Établi — un des seuils fondateurs, déjà pleinement implémenté.

RÈGLE : **Aesthetic-Usability Effect — le beau paraît utilisable (un risque autant qu'un levier).** Un design perçu comme esthétique est jugé plus facile à utiliser, *même quand il ne l'est pas*. Levier : le soin visuel achète de la tolérance aux petits défauts. **Risque, et c'est le point** : le fini esthétique **masque les problèmes d'utilisabilité en test** — les utilisateurs les signalent moins. Règle du système : ne **jamais** laisser « c'est beau » clore une question d'utilisabilité en revue ; l'esthétique et l'utilisabilité se vérifient séparément (parallèle exact au « contraste et redondance sont deux exigences indépendantes » de COLOR).

RÈGLE : **Peak-End Rule — on juge sur le pic et la fin.** Le souvenir d'une expérience est dominé par son moment le plus intense et par sa fin, pas par sa moyenne. Conséquence : soigner *particulièrement* les moments d'erreur (pic négatif) et de succès/clôture (la fin) — c'est là que se joue le VOICE (ton du message d'erreur : calme, orienté solution ; ton du message final : net, sans sur-célébration). Établi (Kahneman) ; l'ampleur exacte en UI reste contextuelle.

RÈGLE : **Jakob's Law — l'utilisateur passe son temps sur *d'autres* produits.** Il s'attend donc à ce que le tien marche comme ceux qu'il connaît déjà. C'est la **justification méthodologique du benchmark** présent dans chaque fiche du système (Carbon, Polaris, Material, GOV.UK, Atlassian) : converger avec les conventions établies n'est pas un manque d'originalité, c'est respecter la mémoire acquise de l'utilisateur. La loi la plus structurante pour ce système — elle explique pourquoi « convergence » est un niveau de confiance à part entière. Frontière : suivre la convention *sauf* quand elle est mesurablement mauvaise (le disabled comme validation, écarté malgré sa fréquence — cf. DECISIONS.md).

## Bonus — deux mythes réfutés (pour couper court en revue)

RÈGLE : **« La règle des 3 clics » est fausse.** Aucune donnée ne montre que les utilisateurs abandonnent après 3 clics ; ce qui compte est que *chaque* clic soit évident et progresse vers le but, pas leur nombre (étude Joshua Porter / UIE). À opposer à toute exigence « tout doit être atteignable en 3 clics ».

RÈGLE : **« Miller = 7 items » est un abus** (traité au § 1) — la source ne dit pas ça.

> **Pourquoi ces deux-là ici** : ce sont les « lois » les plus dégainées en réunion pour trancher un désaccord sans donnée. Les documenter avec leur réfutation, c'est donner à l'IA consommatrice et à l'humain de quoi *remonter* plutôt que d'obéir à une formule.

## Risque

RÈGLE : table ci-dessous — le risque d'un principe-catalogue n'est pas visuel mais **argumentatif** (une loi mal invoquée justifie une mauvaise décision).

| Cas | Risque principal | Sévérité |
|---|---|---|
| Loi citée hors de sa source (Miller « 7 », 3 clics) | Décision justifiée par un mythe, débat clos à tort | Élevée |
| Loi manipulable retournée en dark pattern (Zeigarnik, Goal-gradient) | Exploitation de l'utilisateur, perte de confiance, enjeu éthique | Élevée |
| Aesthetic-usability qui masque un défaut d'UX en test | Problème réel non détecté car « c'est joli » | Élevée |
| Une seule loi appliquée en ignorant sa tension (Hick vs découvrabilité) | Sur-simplification, fonction enfouie | Moyenne à élevée |
| Loi appliquée mais non nommée (règle sans sa justification) | Règle fragile, indéfendable en revue, dupliquée par ignorance | Moyenne |
| Von Restorff dilué (tout est mis en avant) | Plus aucun point focal — inflation | Moyenne |

## Règle transversale

RÈGLE : **une loi UX explique une règle, elle ne la remplace pas — et jamais seule.** Ce fichier donne le *pourquoi* profond des contraintes écrites ailleurs ; il ne crée pas de contrainte, ne porte pas de valeur, et n'autorise personne à trancher un arbitrage « parce qu'une loi le dit ». Quand deux lois se contredisent (elles le font souvent), on remonte.

> **Pourquoi** : c'est la déclinaison théorique du principe des canaux du système (COLOR : jamais la couleur seule ; MOTION : le mouvement confirme, n'informe jamais seul). Ici : **la loi éclaire, elle ne décide jamais seule.** Une décision de design adossée à une unique loi hors contexte est aussi fragile qu'une information portée par un seul canal.

## Carte d'application — où chaque loi vit déjà (la « couche concrète » de ce principe)

> Cette table remplace la couche `LAWS-UI` absente : elle relie chaque loi à la règle qui l'implémente, pour que citer la loi et trouver son implémentation soit un seul geste. C'est l'outil qui résorbe le trou-type de ce principe (la loi appliquée mais non nommée).

| Loi | Implémentée par | Fichier faisant autorité |
|---|---|---|
| Cognitive Load | Registre productif, échelles fermées, tokens à la demande — et le contrat opérationnel transversal | MOTION-UX, SPACING-UX, DESIGN.md (guardrails), COGNITIVE-LOAD-UX |
| Chunking / Working Memory | Étapes, ask-once, récapitulation, helper persistant | FORM-UX (multi-step), INPUT-UX |
| Zeigarnik | Progression, autosave | FORM-UX (multi-step, autosave) |
| Selective Attention | Sobriété du mouvement, rareté de l'alert, anti-camouflage | MOTION-UX, ALERT-UX, COGNITIVE-LOAD-UX |
| Hick / Choice Overload | Primary unique, registres, cardinalité des actions | BUTTON-UX, COLOR-UX, CARD-UX, ALERT-UX |
| Fitts | Zone tactile 44px, cibles proches | BUTTON-UI (WCAG 2.5.5) |
| Goal-Gradient | Progression du multi-step | FORM-UX |
| Tesler | Autofill, normalisation, messages qui diagnostiquent | INPUT-UX |
| Postel | Tolérance de saisie, normalisation | INPUT-UX |
| Occam | Pas de provision sans besoin (grid, disabled) | SPACING-UX, COLOR-UX |
| Paradox of the Active User | Helper avant erreur, onboarding contextuel | INPUT-UX, VOICE-UX |
| Flow | Non-verrouillage, pas de déplacement non sollicité | MOTION-UX, SPACING-UX |
| Gestalt (proximité, région, similarité, connexité, Prägnanz) | Proximité = info, conteneurs, registres, trait constant | SPACING-UX, CARD-UX, BORDER-UX, COLOR-UX, ICONOGRAPHY-UX |
| Von Restorff | Primary unique, accent parcimonieux | BUTTON-UX, COLOR-UX |
| Serial Position | (trou — attend un composant navigation/liste) | — |
| Doherty | Échelle sous 400 ms, feedback < 100 ms — et le contrat des attentes | MOTION-UX / DESIGN.md (motion.*), PERFORMANCE-UX |
| Aesthetic-Usability | Traité comme risque de revue | ce fichier (§ risque) |
| Peak-End | Ton des messages d'erreur et de clôture | VOICE-UX, ALERT-UX, INPUT-UX |
| Jakob | Le benchmark de chaque fiche | méthode (README §5, METHODE §5) |
| Parkinson | (trou — attend une mécanique de temps) | — |

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Corpus de référence des « lois UX » (énoncés, regroupements) | [Laws of UX — Jon Yablonski](https://lawsofux.com/) (et l'ouvrage *Laws of UX*, O'Reilly) | Établi comme vulgarisation de référence — chaque loi renvoyée à sa source primaire ci-dessous |
| Lois de Gestalt (proximité, similarité, région commune, connexité, Prägnanz) | Psychologie de la Gestalt (Wertheimer, Koffka) ; [IxDF — Gestalt principles](https://www.interaction-design.org/literature/topics/gestalt-principles) | Établi — un siècle de validation en perception |
| Fitts's Law (temps ∝ distance/taille) | Fitts (1954) ; [NN/g — Fitts's Law](https://www.nngroup.com/articles/fitts-law/) | Établi — loi quantifiée robuste |
| Hick's Law (temps de décision ∝ log du nombre de choix) | Hick (1952), Hyman (1953) ; [lawsofux.com/hicks-law](https://lawsofux.com/hicks-law/) | Établi — avec la nuance « complexité, pas seulement nombre » |
| Doherty Threshold (~400 ms) | Doherty & Thadhani, IBM (1982) ; [lawsofux.com/doherty-threshold](https://lawsofux.com/doherty-threshold/) ; convergent avec [NN/g — Response Times](https://www.nngroup.com/articles/response-times-3-important-limits/) | Établi — déjà implémenté par MOTION |
| Miller (1956) porte sur la mémoire de travail, PAS sur une limite d'items UI | [Miller, *The Magical Number Seven*](https://psychclassics.yorku.ca/Miller/) ; [NN/g — The Myth of “Seven, Plus or Minus 2”](https://www.nngroup.com/articles/short-term-memory-and-web-usability/) | Établi (réfutation du mythe) |
| « Règle des 3 clics » non fondée | [UIE / Joshua Porter — Testing the Three-Click Rule](https://articles.uie.com/three_click_rule/) | Établi (réfutation) |
| Peak-End Rule | Kahneman & Tversky ; [NN/g — Peak-End Rule](https://www.nngroup.com/articles/peak-end-rule/) | Établi (mémoire) ; ampleur en UI contextuelle |
| Aesthetic-Usability Effect | Kurosu & Kashimura (1995), Tractinsky ; [NN/g — Aesthetic-Usability Effect](https://www.nngroup.com/articles/aesthetic-usability-effect/) | Établi — y compris son revers (masque les défauts en test) |
| Jakob's Law | [NN/g — Jakob's Law of Internet UX](https://www.nngroup.com/videos/jakobs-law-internet-ux/) ; [lawsofux.com/jakobs-law](https://lawsofux.com/jakobs-law/) | Établi — fonde la pratique du benchmark |
| Tesler's Law (conservation de la complexité) | Larry Tesler ; [lawsofux.com/teslers-law](https://lawsofux.com/teslers-law/) | Convergence — heuristique de conception largement admise |
| Postel's Law (robustesse) | RFC 760/761 (Jon Postel) ; [lawsofux.com/postels-law](https://lawsofux.com/postels-law/) | Établi en réseau ; transposé UI par convergence |
| Paradox of the Active User | Carroll & Rosson (1987) ; [NN/g](https://www.nngroup.com/articles/paradox-of-the-active-user/) | Établi par recherche |
| Zeigarnik, Goal-Gradient, Serial Position, Von Restorff, Selective Attention, Flow, Parkinson, Occam, Choice Overload | Sources primaires respectives, agrégées par [lawsofux.com](https://lawsofux.com/) et [IxDF](https://www.interaction-design.org/) | Mixte — effets réels d'ampleur variable, chacun marqué dans son entrée |

*Aucune règle de ce fichier n'introduit de contrainte propre : chaque loi renvoie à une règle déjà sourcée dans sa fondation ou son composant. La confiance affichée ici porte sur la loi elle-même (est-elle vraie ?), pas sur l'implémentation (déjà vérifiée là où elle vit).*

## À approfondir

- **Serial Position Effect** : à activer avec un composant navigation/menu/liste — placer les entrées clés en tête et en pied.
- **Parkinson's Law** : à activer le jour d'une saisie longue ou d'une limite de temps — accélérateurs (autofill, défauts, raccourcis).
- **Selective Attention** : règle anti-camouflage **promue en RÈGLE** par le principe `cognitive-load` (2026-07-21) — reste à l'éprouver sur un premier composant de contenu marketing.
- **Éthique du design (dark patterns)** : ce fichier signale la frontière loi-par-loi ; un sujet transversal « patterns trompeurs » (Brignull / deceptive patterns) pourrait naître si le produit ajoute des surfaces d'acquisition ou de rétention.
- **Loi vs donnée produit** : ces lois sont générales ; le jour où le produit a de la mesure réelle (tests, analytics), la donnée locale prime sur la loi générale (comme un précédent journalé prime sur un benchmark).
