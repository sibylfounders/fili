---
sujet: typography
nature: foundations
resume: "Ce fichier contient le raisonnement : hiérarchie, lisibilité, risques."
selon-contexte: [alert, button, card, form, input]
source: TYPOGRAPHY-UX.md v1.4.0 + TYPOGRAPHY-UI.md v1.1.0
empreinte: sha256:bd566899b4cbdec5
regles: {loi: 15, preference: 16, non_qualifie: 0}
---
# RULES — typography (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** La typographie porte deux décisions séparées — la structure sémantique du contenu et les conditions physiques de lisibilité — et aucune des deux ne se prend à la place de l'autre. `TYPOGRAPHY-R03`
- **[loi]** Le niveau sémantique d'un texte et son traitement visuel se décident indépendamment l'un de l'autre. `TYPOGRAPHY-R04`
- **[loi]** Les niveaux de titre h1 à h6 décrivent la structure du contenu et ne sont jamais employés pour obtenir un effet de style. `TYPOGRAPHY-R05`
- **[loi]** Une page comporte exactement un titre de niveau 1, qui est le titre du document. `TYPOGRAPHY-R06`
  - vérifiable : exactement un élément h1 par page
  - critère : `compte("h1") == 1`
  - source : https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements
- **[loi]** Les niveaux de titre se suivent sans saut : un niveau n n'est jamais suivi directement d'un niveau n+2. `TYPOGRAPHY-R07`
  - vérifiable : aucun saut de niveau de titre (h2 → h4)
  - critère : `suite("h1,h2,h3,h4,h5,h6") sans_saut`
  - source : https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements
- **[loi]** Le niveau d'un titre suit la structure du contenu et sa taille suit le design : un titre de niveau inférieur peut légitimement être rendu plus petit qu'un titre de niveau supérieur. `TYPOGRAPHY-R08`
  - source : https://design-system.service.gov.uk/styles/typography/
- **[loi]** Un texte qui doit avoir l'apparence d'un titre sans en être un prend son style sur un élément non-titre. `TYPOGRAPHY-R09`
  - vérifiable : les éléments h1 à h6 ne portent que des titres de section
  - source : https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements
- **[préférence]** Les tailles de texte varient continûment entre une borne minimale et une borne maximale en fonction de la largeur du viewport, plutôt que par paliers. `TYPOGRAPHY-R10`
- **[loi]** Une taille de texte ne s'exprime jamais en unités viewport seules, qui ne répondent pas au zoom du navigateur et font échouer le critère de redimensionnement du texte. `TYPOGRAPHY-R11`
  - vérifiable : aucune taille de police exprimée en unités viewport seules
  - critère : `aucune_valeur("font-size") unites_seules(vw|vh|vmin|vmax)`
  - source : https://adrianroselli.com/2019/12/responsive-type-and-zoom.html
- **[préférence]** Toute taille fluide combine rem et vw dans clamp(), avec une composante rem dans le minimum, dans le maximum et dans la partie fixe de la valeur préférée. `TYPOGRAPHY-R12`
  - vérifiable : chaque clamp() de taille contient une composante rem dans le minimum, le maximum et la partie fixe
  - critère : `chaque_valeur("font-size") clamp_avec_rem()`
- **[préférence]** La conformité au redimensionnement du texte se vérifie par un test de zoom navigateur réel, et non par la seule forme de la formule ni par un redimensionnement de fenêtre. `TYPOGRAPHY-R13`
  - vérifiable : à 200 % de zoom navigateur, la taille rendue a doublé sans perte de contenu ni défilement à deux dimensions
- **[préférence]** Le rapport entre la taille maximale et la taille minimale d'un même échelon typographique ne dépasse pas 2,5. `TYPOGRAPHY-R14`
  - vérifiable : ratio taille maximale / taille minimale ≤ 2,5 par échelon
- **[loi]** La longueur de ligne du texte courant est bornée, la lisibilité d'un paragraphe dépendant davantage de sa mesure que de sa taille. `TYPOGRAPHY-R15`
  - source : https://practicaltypography.com/summary-of-key-rules.html
- **[préférence]** Le texte courant vise une longueur de ligne d'environ 45 à 75 caractères, bornée par une largeur maximale exprimée en unités ch et jamais en pixels. `TYPOGRAPHY-R16`
  - vérifiable : longueur de ligne du texte courant entre 45 et 75 caractères, bornée par une max-width en ch
- **[préférence]** Une taille de texte fluide s'accompagne toujours d'une largeur maximale sur le bloc de texte, faute de quoi la mesure se dégrade sur grand écran. `TYPOGRAPHY-R17`
  - vérifiable : tout bloc de texte courant porte une max-width
- **[loi]** Le texte courant est composé avec un interlignage d'au moins 1,5 fois le corps, et les grands corps peuvent recevoir un interlignage plus serré. `TYPOGRAPHY-R18`
  - vérifiable : interlignage ≥ 1,5 pour le texte courant
- **[préférence]** L'interlignage n'est pas une constante du système : il se détermine en fonction du corps et de l'usage du texte. `TYPOGRAPHY-R19`
- **[loi]** La graisse n'est jamais le seul canal par lequel une hiérarchie de texte est exprimée. `TYPOGRAPHY-R20`
- **[loi]** La hiérarchie typographique se construit par combinaison du corps, de la graisse et de la position, un corps nettement supérieur pouvant dominer une graisse plus forte. `TYPOGRAPHY-R21`
  - source : https://carbondesignsystem.com/elements/typography/overview/
- **[préférence]** Les graisses semi-grasses portent les titres et jamais le texte long, et aucune graisse plus fine que la graisse standard n'est employée sous le corps de texte courant. `TYPOGRAPHY-R22`
  - vérifiable : aucune graisse inférieure à la graisse standard sous l'équivalent 16 px
- **[préférence]** Le gras est réservé à l'information critique que le lecteur risque de manquer ; le gras et l'italique restent rares et ne se cumulent pas. `TYPOGRAPHY-R23`
- **[préférence]** Les titres sont rédigés en sentence case, décision prise une fois pour l'ensemble du produit. `TYPOGRAPHY-R24`
  - vérifiable : titres en sentence case
- **[préférence]** Les capitales sont réservées aux étiquettes brèves, jamais au texte courant, et s'accompagnent d'un interlettrage de 5 à 12 % du corps. `TYPOGRAPHY-R25`
  - vérifiable : text-transform: uppercase uniquement sur des étiquettes courtes, avec un interlettrage entre 0,05em et 0,12em
- **[loi]** La casse haute s'applique par la feuille de style et jamais en saisissant le contenu en capitales, afin que le texte source reste dans sa casse d'origine. `TYPOGRAPHY-R26`
  - vérifiable : aucune chaîne de contenu saisie tout en capitales ; la casse haute vient de text-transform
- **[préférence]** Le texte est aligné sur le bord de début de ligne par défaut, le retour à la ligne régulier servant de repère de lecture. `TYPOGRAPHY-R27`
  - vérifiable : text-align des blocs de texte = start par défaut
- **[loi]** Le texte d'interface n'est jamais justifié. `TYPOGRAPHY-R28`
  - vérifiable : aucun bloc de texte en text-align: justify
- **[préférence]** Le centrage est réservé aux titres courts et aux moments éditoriaux, jamais appliqué à un paragraphe. `TYPOGRAPHY-R29`
  - vérifiable : aucun paragraphe en text-align: center
- **[préférence]** Le texte courant n'est jamais composé sous l'équivalent de 16 px, et sa taille s'exprime en unités relatives au corps racine. `TYPOGRAPHY-R30`
  - vérifiable : taille du texte courant ≥ 16 px d'équivalent, exprimée en rem
- **[préférence]** Les champs de saisie ne descendent jamais sous l'équivalent de 16 px, faute de quoi Safari iOS zoome automatiquement la page à la prise de focus. `TYPOGRAPHY-R31`
  - vérifiable : font-size des champs de saisie ≥ 16 px d'équivalent
- **[préférence]** Quatre échelons de titres stylés suffisent en usage courant, la récurrence de niveaux 5 et 6 signalant une structure de contenu à réorganiser. `TYPOGRAPHY-R32`
  - vérifiable : au plus quatre échelons de titres stylés distincts en usage courant
- **[loi]** La structure appartient au contenu et l'apparence appartient au design : aucune des deux ne se déduit de l'autre. `TYPOGRAPHY-R34`

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

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

## Non couvert — poser la question, ne rien trancher

- Texte d'accroche / lead : Un premier paragraphe est mis en avant.
- Chiffres alignés (montants, tables) : Des nombres se comparent verticalement.
- Texte traduit (expansion ~30 %) : Le texte est traduit (allemand, finnois).
- Préférences utilisateur (reduced motion, contraste élevé) : L'utilisateur active un mode d'accessibilité.
- RTL / scripts non latins : La langue se lit de droite à gauche.
- Impression : Le contenu est imprimé.
