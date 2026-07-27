---
component: color
layer: ux
type: foundation
version: 1.2.0 # 1.2.0 : le composant Link ferme la dette « lien dans le texte » en réutilisant primary/primary-hover et un soulignement ; aucun token ajouté. 1.1.1 : vocabulaire aligné sur le modèle style × tone du bouton (DECISIONS 2026-07-18), aucune règle modifiée. 1.1.0 : passe stress-test 2026-07-17 — quatre règles dérivées ajoutées (contrainte dark mode primary-clair, teinte des neutres à luminance constante, méthode de voile sur image, identités multi-teintes décoratives hors périmètre). Aucun token couleur changé. 1.0.0 : première rédaction — inventaire et benchmark faits AVANT livraison (leçon typographie appliquée) ; audit des tokens existants : aucun manque pour les consommateurs actuels, cf. § Audit
last_updated: 2026-07-20
companion: COLOR-UI.md
confidence: mixed # la structure par rôles, 1.4.1 et les seuils de contraste sont établis ; les positions dark mode / forced-colors sont des décisions internes datées, marquées comme telles
---

# Couleur — Couche UX (fondation)

> Ce fichier contient le raisonnement : rôles, registres, redondance, contraste, theming. Les **valeurs** (hex) vivent dans `DESIGN.md` et n'en bougent pas — cette fondation ne déplace pas la source de vérité, elle documente comment s'en servir. Les mappings par composant vivent dans `COLOR-UI.md`.

## Note de transposition (à lire en premier)

RÈGLE [COLOR-R01] : la couleur est une **fondation** — pas de variantes propres, pas d'assemblage : une contrainte transversale que tous les composants consomment. Le modèle à axes ne s'applique pas.

RÈGLE [COLOR-R02] : la fondation sépare deux choses qui ne doivent jamais se confondre — c'est la structure de ce fichier :
  1. **Le rôle** — à quoi cette couleur sert (porter la marque, porter un état, structurer la page). Une décision de *système*, stable.
  2. **La valeur** — quel hex derrière le rôle. Une décision d'*identité*, qui vit dans DESIGN.md et peut changer entièrement (rebranding) sans qu'aucune règle de ce fichier ne bouge.

> **Pourquoi** : c'est la déclinaison couleur du principe fondateur (niveau ≠ taille chez la typographie) : les systèmes majeurs nomment leurs tokens par usage, jamais par teinte — "on-primary plutôt que on-blue" (Material). Un composant qui référence un rôle survit au rebranding ; un composant qui référence un bleu meurt avec lui.

**Particularité de cadrage** : contrairement aux autres fondations, la moitié de celle-ci existait déjà — éparpillée dans la prose et les guardrails de DESIGN.md (registres, seuils, bordures, recalibrages). Cette fondation la **consolide et la développe** ; DESIGN.md garde les valeurs et les guardrails courts, ce fichier porte le raisonnement long. En cas de divergence, DESIGN.md (valeurs) et ce fichier (règles d'usage) font autorité chacun sur leur moitié.

## Les trois registres

RÈGLE [COLOR-R03] : la palette se lit en **trois registres étanches** :
  1. **Marque** — `primary` (l'action), `accent` (le focus et les touches secondaires). Porte l'identité, jamais un état.
  2. **Sémantique** — `danger`, `success`, `warning`, `info`, chacun en couple texte/`-subtle`. Porte un état, jamais l'identité.
  3. **Neutres** — textes (`text-*`), surfaces (`background`, `surface*`), bordures (`border*`). Structure la page, ne porte ni identité ni état.

RÈGLE [COLOR-R04] : **aucune couleur ne change de registre selon le contexte.** Jamais `primary` ou `accent` pour un état sémantique (guardrail fondateur de DESIGN.md) ; jamais `danger` pour "du rouge décoratif" ; l'inverse aussi — le tone info de l'alert a reçu son propre `info` plutôt que d'emprunter `accent`, alors que les deux sont des bleus.

RÈGLE [COLOR-R05] : **le registre marque tient en trois rôles fonctionnels — `primary`, `secondary`, `accent` — et pas un de plus par simple envie de décor.** Une identité traversée d'une teinte supplémentaire purement décorative (le magenta d'une maquette, sans rôle d'action ni de focus) n'a **pas** de slot, et n'en reçoit pas un : un token naît d'un besoin réel, jamais d'une couleur « à caser » (ce serait la porte ouverte au « primary partout » que le système s'interdit). **Position (1.1.0) : les identités multi-teintes décoratives sortent du périmètre.** Le jour où une teinte de marque supplémentaire porte un vrai rôle fonctionnel récurrent, elle entrera comme rôle nommé (avec son couple on-*), pas comme aplat libre.

CONFIANCE : décision interne datée (2026-07-17) — cohérente avec « un token naît d'un besoin réel » et l'interdit du décor par token de marque.

> **Pourquoi** : un utilisateur apprend le vocabulaire chromatique du produit en quelques écrans. Un bleu qui signifie tantôt "action de marque" tantôt "information" détruit cet apprentissage — c'est la même inflation que le primary partout (BUTTON-UX) : si une couleur dit deux choses, elle ne dit plus rien.

RÈGLE [COLOR-R06] : chaque registre a son niveau d'expression — les sémantiques existent en **couple** texte/fond subtil (`danger`/`danger-subtle`), les neutres en **échelle** (primary > secondary > muted pour le texte). Toute nouvelle valeur sémantique fournit son couple complet d'emblée (règle héritée de BUTTON-UI : `_bg`/`_text`/`_fg` dès la création).

## Jamais la couleur seule

RÈGLE [COLOR-R07] : l'information ne repose **jamais sur la couleur seule** — WCAG 1.4.1, la règle d'accessibilité cardinale de cette fondation.

RÈGLE [COLOR-R08] : chaque usage sémantique de la couleur déclare son **canal redondant** : l'icône par tone de l'alert (silhouettes distinctes), le mot "Erreur" de l'input, la coche de l'état sélectionné de la card. Le canal redondant ne se retire pas pour alléger.

> **Pourquoi** : ~8 % des hommes ont une déficience rouge-vert — et `warning` (ambre profond) et `danger` (rouge sombre) de cette palette sont chromatiquement proches (distance RGB 55, cas documenté par le F03 du RAPPORT-TEST). La forme fait le travail que la couleur ne peut pas garantir.
> **Erreur fréquente** : croire qu'un contraste suffisant règle le problème — le contraste rend le texte *lisible*, il ne distingue pas un rouge d'un vert pour qui ne voit pas la différence. Contraste et redondance sont deux exigences indépendantes (1.4.3 vs 1.4.1).

## Contraste — les seuils que le système s'impose

RÈGLE [COLOR-R09] : **4.5:1** pour le texte courant (WCAG 1.4.3), **3:1** pour tout état visible et composant d'interface (WCAG 1.4.11) — seuils déjà inscrits dans DESIGN.md, appliqués par quatre recalibrages successifs (accent, danger, warning, border-strong en 1.3.0 ; success en 1.4.0), vérifiés par `tools/test-rendu.js` à chaque régénération.

RÈGLE [COLOR-R10] : le contraste se vérifie **par paire** — un token de texte n'est pas "conforme" dans l'absolu, il l'est *sur un fond donné*. Chaque token de texte de ce système déclare ses fonds d'usage (le mapping vit dans COLOR-UI.md).

> **Erreur fréquente** : poser un token de texte conforme sur blanc sur un fond subtil sans revérifier — c'est exactement l'histoire de `success` (5.02:1 sur blanc, mais il a fallu le recalibrer pour tenir 4.57:1 sur `success-subtle`).

RÈGLE [COLOR-R11] : nuance sourcée — WCAG 1.4.11 **exempte le hover** ("l'état hover n'est pas requis pour identifier le composant") ; ce système teste quand même ses couples au hover, par choix : un hover illisible reste un hover raté, même conforme.

CONFIANCE : établi (seuils WCAG) ; le sur-test du hover est une exigence interne, pas une obligation normative.

RÈGLE [COLOR-R12] : `text-muted` (2.54:1 sur blanc) est **réservé aux métadonnées accessoires** — jamais du texte fonctionnel courant. Précédent journalisé : le compteur de caractères de l'input a dû quitter text-muted (F01).

## États interactifs

RÈGLE [COLOR-R13] : les états interactifs sont **tokenisés, pas improvisés** : famille `*-hover` (fond assombri d'un cran pour les fonds pleins, `surface-hover` apparaissant pour les styles sans fond au repos, stroke et ghost), `accent` pour le focus ring — mapping par composant dans les `*-UI.md`.

RÈGLE [COLOR-R14] : l'état **disabled n'a pas de tokens** — dette assumée, désormais documentée *ici* plutôt qu'en marge de BUTTON-UI : WCAG exempte les composants inactifs du contraste minimum (exception explicite de 1.4.3), et aucun consommateur n'a encore de vrai besoin (FORM-UX a même retiré le disabled de la validation). Conditions de sortie de la dette : le jour où un composant documente un état désactivé légitime (traitement asynchrone), créer le couple complet (fond, texte, bordure) en une fois.

## Theming et rebranding — ce que l'architecture par rôles achète

RÈGLE [COLOR-R15] : un token = potentiellement N valeurs (une par thème) — c'est la mécanique standard des systèmes à thèmes (Atlassian, Carbon : "impossible d'implémenter un dark mode sans tokens partout"). Ce système n'a qu'un thème ; l'architecture est prête, la décision de produit n'est pas prise.

RÈGLE [COLOR-R16] : **le mode sombre n'est pas couvert — par décision, pas par oubli.** Le jour venu : les rôles ne bougent pas, DESIGN.md gagne une seconde table de valeurs, et les seuils de contraste se re-vérifient intégralement (les ombres et surfaces se repensent aussi, cf. ELEVATION-UX).

RÈGLE [COLOR-R17] : `surface-contrast` n'est **pas** un début de dark mode — c'est un panneau de mise en avant sur page claire (cf. DESIGN.md 1.7.0). Ne pas généraliser son usage en "thème sombre local".

RÈGLE [COLOR-R18] : **contrainte dérivée (dark mode) — un thème sombre ne peut pas avoir un primary sombre.** Les deux seuls textes admis sur `surface-contrast` sont `background` et `on-primary` (paires garanties). Pour qu'un même fond les porte tous deux à 4.5:1, ils doivent tomber du même côté de l'échelle de luminance. En thème clair c'est trivial (les deux valent ~blanc). En thème sombre, `background` devient sombre → `on-primary` doit l'être aussi → **`primary` doit être clair** (un `on-primary` sombre suppose un fond d'action clair). Corollaire démontré : avec un primary sombre, aucun neutre représentable ne tient 4.5:1 à la fois avec un fond quasi-noir et avec le blanc — la fenêtre théorique fait ~8 % d'un cran 8-bit (le meilleur compromis plafonne à 4.50:1 des deux côtés). `surface-contrast` devient alors un panneau *clair* de mise en avant. La table des paires (COLOR-UI) n'est « prête pour N thèmes » qu'assortie de cette règle dérivée — sinon chaque consommateur la redécouvre par l'échec.

CONFIANCE : contrainte dérivée, démontrée par calcul WCAG (rapport stress-test 2026-07-17) — établie, pas une préférence.

CONFIANCE : décision interne datée (2026-07-11) — à réviser si le produit exige un thème sombre.

## Teinte des neutres — méthode bénie (1.1.0)

RÈGLE [COLOR-R19] : une identité peut vouloir des neutres **teintés** (gris chauds, gris bleutés) accordés à sa marque plutôt que des gris purs. Le système bénit une méthode sûre : **teinter un neutre à luminance WCAG constante**. Le contraste ne dépendant que de la luminance relative, déplacer uniquement la teinte (et la saturation) en gardant la luminance identique ne change **aucun** rapport de contraste — l'opération est gratuite côté accessibilité, et la barrière reste verte par construction.

RÈGLE [COLOR-R20] : mise en œuvre — convertir en OKLCh, fixer L, poser la teinte cible (reprise d'une couleur du thème : surface, accent), puis **recaler L par dichotomie** jusqu'à retrouver la luminance WCAG d'origine (l'aller-retour d'espace introduit une dérive infime, à corriger). C'est une transformation des **valeurs** dans DESIGN.md — aucun nom, aucune règle ne bouge. Vérifiée sur le stress-test 2026-07-17 : les trois thèmes restent conformes après teinte.

CONFIANCE : établi — le contraste WCAG est fonction de la seule luminance relative ; l'invariance est mathématique, pas empirique.

## Contraste élevé forcé (forced-colors)

RÈGLE [COLOR-R21] : quand l'OS force ses couleurs (mode contraste élevé Windows), les tokens sont **remplacés d'office** — fonds subtils aplatis, la palette disparaît. Règle minimale de ce système : ne jamais neutraliser ce mode (`forced-color-adjust: none` interdit par défaut), et s'appuyer sur ce qui **survit** — la sémantique HTML, les bordures, le texte. C'est une raison de plus pour les canaux redondants : l'icône et le mot restent quand la couleur tombe.

CONFIANCE : convergence (comportement plateforme documenté) ; la règle d'interdiction est une décision interne.

## Texte sur media

RÈGLE [COLOR-R22] : règle-frontière, aucun consommateur à ce jour (la card interdit le texte dans le media) : du texte posé sur une image **imprévisible** ne peut garantir aucun contraste. Deux issues admises le jour venu : un voile de contraste entre l'image et le texte, ou le texte hors du media. Jamais de texte nu sur image libre.

RÈGLE [COLOR-R23] : **le voile n'est pas un effet, c'est un calcul (méthode bénie, 1.1.0).** L'obligation « voile de contraste » ne se règle pas à l'œil (trop de voile tue l'image, trop peu casse le texte à certains formats seulement). Méthode : (1) échantillonner le **pire pixel** derrière chaque zone de texte (canvas) ; (2) calculer l'alpha de voile minimal pour que le texte tienne 4.5:1 sur ce pixel ; (3) **revérifier à plusieurs formats de viewport** — le cadrage (`background-position`, recadrage responsive) déplace le pire pixel et peut faire passer le voile requis du simple au double. Le cadrage, pas le voile, est souvent le vrai problème : un viewport court peut recadrer une crête claire pile derrière le titre.

CONFIANCE : décision interne datée (2026-07-17, stress-test) ; le calcul d'alpha découle directement du seuil WCAG 1.4.3.

## Audit des tokens existants (2026-07-11)

Réponse à la question "il en manque ou pas" : **pour les consommateurs actuels, il n'en manque pas.** Les 23 tokens couleur couvrent les 9 combinaisons du bouton, les 4 tones × (bordure, texte, fond) de l'input et de l'alert, les surfaces de la card, le Link et les états hover/focus — vérifié par la résolution complète de `test-rendu.js`. Le Link ferme la dette « lien dans le texte » sans créer de token : `color.primary` et `color.primary-hover` portent la marque, tandis que le soulignement garantit que la couleur n'est pas le seul signal. Les manques restants sont des **contextes sans consommateur** : scrim de superposition, ::selection et dataviz ; disabled et dark mode restent des décisions explicites. Conformément au principe "un token naît d'un besoin réel", ils ne sont pas provisionnés.

## Risque

RÈGLE [COLOR-R24] : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Information portée par la couleur seule | Exclusion daltonisme — danger/success indistinguables (WCAG 1.4.1) | Critique |
| Texte courant sous 4.5:1 | Illisible pour basse vision (WCAG 1.4.3) | Critique |
| État visible / bordure délimitante sous 3:1 | Composant invisible (WCAG 1.4.11) — cas border-strong vécu | Élevée |
| Marque utilisée en sémantique (ou l'inverse) | Vocabulaire chromatique incohérent, apprentissage détruit | Élevée |
| Valeur hex hors DESIGN.md | Rebranding impossible, dérive de palette | Élevée |
| Token de texte posé sur un fond non déclaré | Contraste non garanti (cas success avant recalibrage) | Moyenne à élevée |
| text-muted sur du texte fonctionnel | Métadonnée illisible promue au rang d'information (cas F01) | Moyenne |
| forced-colors neutralisé | Mode d'accessibilité système cassé | Moyenne |
| Texte nu sur image | Contraste imprévisible | Moyenne |

## Règle transversale

RÈGLE [COLOR-R25] : **la couleur s'applique par rôle, jamais par valeur — et un rôle ne porte jamais deux sens.**

> **Pourquoi** : c'est la déclinaison couleur du principe du système : comme le niveau d'un titre ne dit rien de sa taille, la teinte d'une couleur ne dit rien de son rôle. Chaque fois qu'une valeur est choisie "parce qu'elle est jolie ici", c'est le signe qu'un rôle manque ou qu'un registre fuit.

## Sources et niveau de confiance

| Réf. | Affirmation | Source | Confiance |
|---|---|---|---|
| S1 | Jamais la couleur seule comme signal | [WCAG 2.1 — 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html) ; repris tel quel par [Polaris](https://polaris.shopify.com/design/colors) | Établi, standard d'accessibilité |
| S2 | Seuils 4.5:1 texte / 3:1 non-texte, y compris les états ; exemption du hover ; exemption des composants inactifs | [WCAG — 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) et [1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) | Établi |
| S3 | Tokens de rôle plutôt que valeurs ("on-primary rather than on-blue") | [Material 3 — color roles](https://developer.android.com/design/ui/mobile/guides/styles/color), [Atlassian — color foundations](https://atlassian.design/foundations/color), [Carbon — color usage](https://carbondesignsystem.com/elements/color/usage/), [GOV.UK — colour](https://design-system.service.gov.uk/styles/colour/) (couleurs fonctionnelles) | Établi — convergence des quatre systèmes |
| S4 | Interdiction outillée des hex en dur | [Polaris — stylelint color-no-hex](https://polaris.shopify.com/tools/stylelint-polaris/rules/color-color-no-hex), [GOV.UK brand](https://brand.design-system.service.gov.uk/colour/web/) ("do not copy the hex values") | Établi — deux systèmes l'imposent par l'outil, comme valide-dossier.js ici |
| S5 | Sémantique ≠ accent, chaque couleur un sens fixe | [Atlassian](https://atlassian.design/foundations/color) ("don't use an accent when the color has semantic meaning"), [Polaris](https://polaris.shopify.com/design/colors) (rouge=critique, vert=succès, fond neutre) | Établi par convergence |
| S6 | Un token = N valeurs par thème ; pas de dark mode sans tokens partout | [Atlassian](https://atlassian.design/foundations/color), [Carbon — themes](https://carbondesignsystem.com/elements/themes/overview/) | Établi chez les systèmes à thèmes ; l'absence de thème sombre ici est une décision interne |
| S7 | Registres étanches marque/sémantique/neutres | Structure convergente (Atlassian brand/semantic/neutral/accent, Polaris sens fixes sur fond neutre) + guardrail interne préexistant | Établi par convergence, formalisation propre à ce système |

*Toute règle sans source explicite repose sur un précédent interne journalisé (DECISIONS.md : recalibrages 1.3.0/1.4.0, F01, F02, F03) — c'est la fondation du système la plus adossée à des cas vécus.*

## À approfondir

- **Lien dans le texte courant — résolu par Link (2026-07-20)** : `color.primary` au repos, `color.primary-hover` au survol et soulignement persistant dans le texte courant. Le composant Link porte désormais l'autorité ; aucun token dédié n'est nécessaire.
- **Scrim / voile de superposition** : naîtra avec la modale, en même temps que le vrai consommateur d'`elevation.overlay`.
- **::selection et couleur de surlignage** : aucun consommateur ; défaut navigateur acceptable en attendant.
- **Dark mode** : décision produit — la mécanique est décrite au § Theming.
- **Dataviz** : palette catégorielle, échelles séquentielles — hors périmètre produit à ce jour.
- **Sémantique multi-produits** : si la charte est adoptée ailleurs, vérifier que les registres tiennent (un rouge "solde négatif" n'est pas un rouge "danger").
