---
component: typography
layer: ux
type: foundation # distinct de "component" (un atome avec variantes) et de "pattern" (une composition) — une contrainte transversale
version: 1.1.2 # 1.1.2 : vocabulaire aligné sur le modèle style × tone du bouton (DECISIONS 2026-07-18), aucune règle modifiée. 1.1.1 : balisage RÈGLE/CONFIANCE, aucune règle modifiée. 1.1.0 : benchmark (GOV.UK, Carbon, Polaris + littérature typographique : Butterick, Bringhurst, WCAG 1.4.8) et test de couverture — 6 trous comblés (interlignage, graisse, casse, alignement, taille minimale, profondeur). 1.0.0 : première rédaction, sans benchmark ni inventaire — écart de méthode corrigé, cf. DECISIONS.md
last_updated: 2026-07-05
companion: TYPOGRAPHY-UI.md
confidence: mixed # la hiérarchie sémantique et la mesure sont établies ; la typographie fluide contient un point activement débattu, marqué comme tel
---

# Typographie — Couche UX (fondation)

> Ce fichier contient le raisonnement : hiérarchie, lisibilité, risques. Les valeurs (échelle h1-h6, piles de secours, mesure) vivent dans `TYPOGRAPHY-UI.md`, qui référence `DESIGN.md`.

## Note de transposition (à lire en premier)

RÈGLE : la typographie n'est **ni un composant, ni un pattern — c'est une fondation**, et la structure du dossier le rend visible (`atelier/foundations/`, parallèle à `atelier/components/` et `atelier/patterns/`).

RÈGLE : **le modèle à axes ne s'applique pas.** La typographie n'a ni instances ni assemblage : elle est une **contrainte transversale** que tous les composants consomment — le bouton compose son label avec, l'input son message d'erreur, l'alert son titre.

> **Pourquoi** : un bouton a des instances qui se déclinent (style × tone × size) ; un pattern coordonne des composants assemblés. Chercher les axes de la typographie reviendrait à chercher les variantes d'une grille : la question n'a pas d'objet.

RÈGLE : elle porte deux fonctions distinctes qui ne doivent jamais être confondues — c'est la vraie structure de ce fichier :
  1. **Le sens** — la hiérarchie sémantique (h1-h6) : à qui appartient cette information dans la structure du document. Une décision de *contenu*.
  2. **La lisibilité** — la taille, la mesure de lecture, l'échelle responsive : dans quelles conditions physiques ce texte se lit. Une décision de *design*.

RÈGLE : la règle cardinale de cette fondation est que ces deux fonctions sont **indépendantes** — le reste du fichier en découle.

**Méthode — position corrigée en 1.1.0** : la première version affirmait qu'une fondation n'a pas d'inventaire ("pas de situations, seulement des consommateurs"). Le test de couverture l'a démenti : les *usages* de la typographie s'inventorient très bien (par rôle de texte, par contexte, par état — cf. `atelier/inventaires/inventaire-cas-usage-typographie.md`), et l'inventaire a trouvé le même ordre de grandeur de trous que sur les composants. Benchmark et inventaire s'appliquent donc aux fondations comme au reste — correction documentée dans DECISIONS.md.

## Hiérarchie sémantique vs hiérarchie visuelle

RÈGLE : les niveaux h1-h6 décrivent la **structure du contenu** — c'est l'arbre que le lecteur d'écran navigue, que les moteurs indexent, que la table des matières reflète. Ils ne décrivent jamais le style.

RÈGLE : **un seul h1 par page** — c'est le titre du document, pas le plus gros texte de la page.

RÈGLE : **jamais de saut de niveau** — un h2 n'est jamais suivi directement d'un h4.

> **Pourquoi** : un saut casse l'arbre pour la navigation par titres (un utilisateur de lecteur d'écran conclut à du contenu manquant) sans aucun bénéfice en échange.

RÈGLE : **le niveau et la taille sont deux décisions indépendantes.** Le niveau suit la structure du contenu ; la taille suit le design. Un h2 peut légitimement être stylé plus petit qu'un h3 si le contexte l'exige.

> **Pourquoi** : c'est la déclinaison typographique d'un principe déjà établi ailleurs dans le système : "Large ne veut pas dire important" (BUTTON-UX.md — la taille du bouton répond à la densité du contexte, pas à l'importance de l'action).

RÈGLE : un texte qui doit *avoir l'air* d'un titre sans en être un (chiffre de dashboard, citation mise en avant) prend le style visuel voulu sur un élément non-heading — jamais un heading pour le style.

> **Erreur fréquente** : utiliser un h1 pour un hero visuel géant qui n'est pas le titre sémantique réel de la page — le texte d'accroche marketing prend le *style* display, mais le h1 appartient au vrai titre du document. Cas réellement rencontré dans ce projet (audit de portfolio-landing, laissé en écart assumé avant la suppression du dossier) : documenter la règle évite de refaire l'approximation.

## Typographie fluide (fluid type)

RÈGLE : faire glisser la taille du texte entre une borne minimale et une borne maximale selon la largeur du viewport, au lieu de sauter par paliers de media queries.

RÈGLE : **les unités viewport seules sont interdites** — un texte dimensionné uniquement en `vw` échoue WCAG 1.4.4 (*Resize Text*).

> **Pourquoi** : **le zoom du navigateur n'affecte pas les unités viewport** — l'utilisateur zoome, la fenêtre ne change pas de largeur, le texte ne grandit pas. C'est un échec d'accessibilité silencieux : invisible en test standard, bloquant pour l'utilisateur malvoyant qui dépend du zoom.

RÈGLE : la correction standard — combiner `rem` et `vw` dans `clamp()`, avec du `rem` dans le minimum, le maximum **et la partie fixe de la valeur préférée** (`clamp(2rem, 1.67rem + 1.67vw, 3rem)` — jamais `clamp(2rem, 4vw, 3rem)`). La composante `rem` répond au zoom, la composante `vw` porte la fluidité.

RÈGLE : limite connue — même cette version corrigée peut ne pas atteindre les 200 % d'agrandissement exigés par WCAG 1.4.4 à des niveaux de zoom extrêmes (jusqu'à 500 %), sur certaines plages de viewport — démontré mathématiquement par l'analyse de novembre 2023 (cf. sources). Tester réellement au zoom plutôt que de faire confiance à la formule.

CONFIANCE : non formalisé (émergent/débattu) — analyse mathématique publiée, pas un consensus établi ; Roselli recommande de tester réellement au zoom.

RÈGLE : garde-fou communément admis — ne jamais dépasser un **ratio de 2.5× entre la taille minimale et la taille maximale d'un même échelon**. L'échelle de ce système (TYPOGRAPHY-UI.md) reste très en dessous (ratio ≤ 1.5 partout).

> **Pourquoi** : sous ce ratio, le texte atteint ses 200 % dans les navigateurs modernes sur les plages de viewport usuelles.
> **Erreur fréquente** : tester le fluid type en redimensionnant la fenêtre et conclure que "ça marche" — le redimensionnement et le zoom sont deux mécanismes différents, et c'est le zoom qui est protégé par WCAG. Le test qui compte : zoom navigateur à 200 %, le texte doit avoir doublé.

## Mesure de lecture

RÈGLE : borner la longueur de ligne du texte courant — la lisibilité d'un paragraphe dépend plus de sa mesure que de sa taille.

RÈGLE : viser la fourchette classique d'environ **45 à 75 caractères par ligne** pour le texte courant. La mesure s'exprime en `ch` (elle suit la police et la taille effective), via le token `measure.reading-max` — jamais en pixels, qui ne suivraient ni le zoom ni la police.

RÈGLE : le pendant de la fluidité — un texte fluide qui s'étire sans `max-width` casse sa mesure sur grand écran. Fluidité de la taille et bornage de la mesure vont ensemble : l'un sans l'autre dégrade la lecture qu'ils devaient améliorer.

> **Pourquoi** : la taille monte en butée de `clamp()` pendant que la ligne continue de s'allonger, et à 75+ caractères par ligne l'œil perd le retour à la ligne.
> **Erreur fréquente** : appliquer la mesure aux titres — un titre d'un ou deux mots n'a pas de problème de retour à la ligne ; la mesure protège le texte *courant*. (Un titre très long peut mériter sa propre borne, plus courte — décision locale, pas de token.)

## Interlignage (comblé après test de couverture)

RÈGLE : inversement proportionnel au corps — le texte courant respire : 120 à 145 % du corps selon la fourchette classique (Butterick), et WCAG 1.4.8 (AAA) demande un interligne d'au moins 1.5 dans les paragraphes ; `typography.body` est à 1.6, conforme aux deux. Les grands corps serrent — un titre n'a pas besoin de l'air d'un paragraphe (`typography.display` à 1.1).

RÈGLE : l'interligne n'est pas une constante du système, c'est une fonction du corps et de l'usage.

> **Pourquoi** : l'espace entre les lignes fait plus pour la lisibilité d'un paragraphe que le choix de la police.
> **Erreur fréquente** : laisser un titre multi-lignes hériter de l'interligne du corps de texte — les lignes du titre flottent, séparées par des trous ; l'inverse (interligne de titre sur un paragraphe) compacte le texte au point de gêner le suivi de ligne.

## Graisse et emphase (comblé après test de couverture)

RÈGLE : la graisse est un canal de hiérarchie parmi d'autres — jamais le seul.

RÈGLE : la hiérarchie se construit par **combinaison** de corps, graisse et position (Polaris) — une graisse légère peut dominer une grasse si son corps est nettement supérieur (Carbon). C'est le pendant visuel de "niveau ≠ taille".

RÈGLE : le semibold porte les titres, **jamais le texte long** (Carbon) — et aucune graisse light sous le corps standard : la finesse en petit corps dégrade le contraste effectif du trait.

RÈGLE : le gras s'utilise avec parcimonie — pour "l'information critique que l'utilisateur rate" (GOV.UK) ; gras et italique le moins possible, et jamais ensemble (Butterick).

> **Pourquoi** : un paragraphe semé de gras n'a plus d'emphase du tout.
> **Erreur fréquente** : compenser une hiérarchie confuse en engraissant — si tout est important, rien ne l'est ; c'est l'inflation du primary (BUTTON-UX.md), version texte.

## Casse (comblé après test de couverture)

RÈGLE : titres en **sentence case** (GOV.UK) — décision prise une fois pour tout le produit, pas titre par titre.

RÈGLE : **TOUT EN CAPITALES : réservé aux étiquettes brèves** (le rôle exact de `label-mono` dans ce système), jamais au texte courant — et toujours accompagné de 5 à 12 % d'interlettrage (Butterick). La valeur déjà utilisée en local (0.08em = 8 %) entre dans la fourchette — règle désormais sourcée, candidate à un token.

> **Pourquoi** : les capitales, dessinées pour ouvrir des phrases, se serrent sans interlettrage.

RÈGLE : les capitales s'appliquent en CSS (`text-transform`), jamais tapées dans le contenu — le texte source reste en casse normale pour les lecteurs d'écran et le copier-coller.

> **Erreur fréquente** : des capitales pour "faire titre" sur une phrase entière — la lecture par silhouette de mot disparaît, l'utilisateur épelle.

## Alignement et justification (comblé après test de couverture)

RÈGLE : **fer à gauche par défaut** — le retour à la ligne régulier est le repère de lecture.

RÈGLE : **jamais de texte justifié en interface**.

> **Pourquoi** : la justification sans césure creuse des rivières d'espace ; Butterick ne l'admet qu'avec césure activée, et la césure web reste inégale selon les langues et navigateurs. WCAG 1.4.8 (AAA) exclut le justifié.

RÈGLE : le centré est réservé aux titres courts et aux moments éditoriaux — jamais un paragraphe (le début de ligne devient introuvable).

## Taille minimale et zoom (comblé après test de couverture)

RÈGLE : corps de texte web — 15 à 25 px d'équivalent (Butterick) ; `typography.body` (16px) est dans la fourchette, volontairement bas de fourchette pour un produit dense. **Jamais sous l'équivalent 16px pour le texte courant.**

RÈGLE : cas particulier des champs de saisie — sous 16px, iOS Safari **zoome automatiquement** la page au focus du champ : la taille du texte d'un input n'est pas une décision esthétique, c'est un comportement de plateforme (frontière avec INPUT-UI.md, qui hérite du corps standard et n'est donc pas concerné).

## Profondeur de hiérarchie (comblé après test de couverture)

RÈGLE : six niveaux existent, quatre suffisent presque toujours — GOV.UK ne style que quatre échelons de titres. Des h5/h6 récurrents signalent une structure trop profonde à réorganiser, pas un besoin de styles supplémentaires. L'échelle complète h1-h6 de DESIGN.md existe pour les cas légitimes (documentation longue, spécifications), pas comme une invitation.

## Risque

RÈGLE : table ci-dessous

| Cas | Risque principal | Sévérité |
|---|---|---|
| Texte en vw seul (sans composante rem) | Zoom navigateur sans effet — échec WCAG 1.4.4, exclusion des utilisateurs malvoyants | Critique |
| Sauts de niveaux de titres (h2 → h4) | Arbre de navigation cassé pour lecteur d'écran, contenu perçu comme manquant | Élevée |
| Plusieurs h1, ou h1 décoratif de hero | Titre réel du document illisible pour l'outillage (AT, SEO, sommaire) | Moyenne à élevée |
| Fluid type non testé au zoom (seulement au resize) | Échec 1.4.4 invisible en test standard | Élevée |
| Texte courant sans max-width sur grand écran | Mesure > 75 caractères, lecture dégradée, fatigue | Moyenne |
| Polices non embarquées sans pile de secours | Rendu système imprévisible, métriques décalées (layout shift) | Moyenne |
| Texte justifié sans césure | Rivières d'espace, lecture hachée — exclu par WCAG 1.4.8 | Moyenne |
| Capitales sur du texte courant | Silhouette de mot perdue, lecture épelée, fatigue | Moyenne |
| Graisse light en petit corps | Contraste effectif du trait dégradé, illisible sur écran basse densité | Élevée |
| Input avec texte < 16px | Zoom automatique iOS au focus — saut de mise en page subi | Moyenne |
| Hiérarchie par le gras seul, partout | Inflation de l'emphase — plus aucun signal ne porte | Moyenne |

## Règle transversale

RÈGLE : **la structure appartient au contenu, l'apparence appartient au design — et aucun des deux ne se déduit de l'autre.**

> **Pourquoi** : c'est la déclinaison typographique du principe fondateur du système : comme le style d'un bouton ne dit rien de sa taille, le niveau d'un titre ne dit rien de sa graisse ni de son corps. Chaque fois qu'une décision visuelle force une décision sémantique (ou l'inverse), c'est le signe qu'une des deux est prise au mauvais endroit.

## Sources et niveau de confiance

| Affirmation | Source | Confiance |
|---|---|---|
| Le zoom navigateur n'affecte pas les unités viewport → vw seul échoue Resize Text | WCAG 2.1 — 1.4.4, [Adrian Roselli — Responsive Type and Zoom](https://adrianroselli.com/2019/12/responsive-type-and-zoom.html) | Établi — comportement navigateur documenté |
| Correction : rem dans min, max et partie fixe du clamp() | [Smashing Magazine — Addressing Accessibility Concerns With Using Fluid Type (nov. 2023)](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/) | Établi comme mitigation |
| Même corrigé, échec possible à zoom extrême (500 %) sur certaines plages de viewport | [Smashing Magazine, nov. 2023](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/), relayant Roselli | **Émergent/débattu** — analyse mathématique publiée, pas de consensus normatif ; tester au zoom réel |
| Garde-fou : ratio max/min ≤ 2.5 par échelon | [Smashing Magazine, nov. 2023](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/) | Communément admis, découle de l'analyse ci-dessus — pas un critère WCAG officiel |
| Mesure de lecture ~45-75 caractères par ligne (Butterick élargit à 45-90) | Typographie classique (Bringhurst, *The Elements of Typographic Style* ; [Butterick, *Practical Typography*](https://practicaltypography.com/summary-of-key-rules.html)) | Établi par convergence de la littérature typographique, bornes indicatives |
| Un seul h1, pas de saut de niveau, hiérarchie = structure | WCAG 1.3.1 / techniques WAI (G141, H42), convergence des systèmes majeurs | Établi, standard d'accessibilité |
| Indépendance niveau sémantique / taille visuelle | [GOV.UK Design System — Typography](https://design-system.service.gov.uk/styles/typography/) : "the heading class you use does not always need to correspond to the heading level" ; convergent avec Carbon | Établi — règle explicitement documentée, citation directe |
| Interligne du corps 120-145 %, corps web 15-25px, caps brèves + 5-12 % d'interlettrage, gras/italique rares et jamais ensemble, justifié seulement avec césure | [Butterick — Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html) | Établi — littérature typographique de référence, bornes indicatives |
| Interligne ≥ 1.5 dans les paragraphes, pas de justifié, mesure ≤ 80 caractères | WCAG 2.1 — 1.4.8 Visual Presentation (niveau AAA) | Établi comme critère AAA — visé, pas exigé au niveau AA |
| Hiérarchie par combinaison corps/graisse/position ; semibold pour titres, pas pour texte long ; une light plus grande peut dominer une bold | [IBM Carbon — Typography](https://carbondesignsystem.com/elements/typography/overview/), [Shopify Polaris — Typography](https://polaris-react.shopify.com/design/typography) | Établi par convergence |
| Titres en sentence case ; gras réservé à l'information critique ; 4 échelons de titres stylés suffisent | [GOV.UK Design System — Typography](https://design-system.service.gov.uk/styles/typography/) | Établi chez GOV.UK (système à recherche utilisateur documentée), adopté ici |
| Zoom automatique iOS Safari sur input < 16px | Comportement de plateforme documenté (WebKit), observation production | Établi — comportement vérifiable, non documenté officiellement par Apple |

*Toute règle sans source explicite ci-dessus repose sur un raisonnement de mécanisme (navigation par titres, fatigue oculaire, comportement du zoom) plutôt que sur une étude chiffrée.*

## À approfondir

- **Tokens d'interlignage par échelon** : la règle existe (cf. Interlignage), les valeurs h1-h6 ne sont pas encore tokenisées — seuls display/body/label-mono ont les leurs.
- **Token d'interlettrage des capitales** : la règle et la fourchette existent (5-12 %), 8 % est déjà utilisé en local — à promouvoir au 2e consommateur.
- **Nombres tabulaires** : Polaris exige les chiffres tabulaires pour aligner les montants — réglage OpenType (`font-variant-numeric`), pas encore de règle ici ; concerne les futures tables et le dashboard.
- **Liens dans le texte courant** : soulignement, couleur, état visité — à la frontière entre cette fondation et un futur composant "lien" (GOV.UK les traite dans la typographie).
- **RTL et scripts non latins** : la mesure en `ch` et l'échelle supposent le latin — à revisiter le jour venu.
- **Expansion de traduction** : l'allemand ou le finnois s'étirent ~30 % — les troncatures et les largeurs calées sur le français casseront ; jamais traité nulle part dans le système.
