---
sujet: typography
nature: foundations
resume: "Ce fichier contient le raisonnement : hiérarchie, lisibilité, risques."
selon-contexte: [alert, button, card, form, input]
source: TYPOGRAPHY-UX.md v1.1.2 + TYPOGRAPHY-UI.md v1.1.0
empreinte: sha256:b5b2e02e80346234
regles: {loi: 0, preference: 0, non_qualifie: 33}
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

- **[non qualifié]** la typographie n'est **ni un composant, ni un pattern — c'est une fondation**, et la structure du dossier le rend visible (`atelier/foundations/`, parallèle à `atelier/components/` et `atelier/patterns/`).
- **[non qualifié]** **le modèle à axes ne s'applique pas.** La typographie n'a ni instances ni assemblage : elle est une **contrainte transversale** que tous les composants consomment — le bouton compose son label avec, l'input son message d'erreur, l'alert son titre.
- **[non qualifié]** elle porte deux fonctions distinctes qui ne doivent jamais être confondues — c'est la vraie structure de ce fichier :
- **[non qualifié]** la règle cardinale de cette fondation est que ces deux fonctions sont **indépendantes** — le reste du fichier en découle.
- **[non qualifié]** les niveaux h1-h6 décrivent la **structure du contenu** — c'est l'arbre que le lecteur d'écran navigue, que les moteurs indexent, que la table des matières reflète. Ils ne décrivent jamais le style.
- **[non qualifié]** **un seul h1 par page** — c'est le titre du document, pas le plus gros texte de la page.
- **[non qualifié]** **jamais de saut de niveau** — un h2 n'est jamais suivi directement d'un h4.
- **[non qualifié]** **le niveau et la taille sont deux décisions indépendantes.** Le niveau suit la structure du contenu ; la taille suit le design. Un h2 peut légitimement être stylé plus petit qu'un h3 si le contexte l'exige.
- **[non qualifié]** un texte qui doit *avoir l'air* d'un titre sans en être un (chiffre de dashboard, citation mise en avant) prend le style visuel voulu sur un élément non-heading — jamais un heading pour le style.
- **[non qualifié]** faire glisser la taille du texte entre une borne minimale et une borne maximale selon la largeur du viewport, au lieu de sauter par paliers de media queries.
- **[non qualifié]** **les unités viewport seules sont interdites** — un texte dimensionné uniquement en `vw` échoue WCAG 1.4.4 (*Resize Text*).
- **[non qualifié]** la correction standard — combiner `rem` et `vw` dans `clamp()`, avec du `rem` dans le minimum, le maximum **et la partie fixe de la valeur préférée** (`clamp(2rem, 1.67rem + 1.67vw, 3rem)` — jamais `clamp(2rem, 4vw, 3rem)`). La composante `rem` répond au zoom, la composante `vw` porte la fluidité.
- **[non qualifié]** limite connue — même cette version corrigée peut ne pas atteindre les 200 % d'agrandissement exigés par WCAG 1.4.4 à des niveaux de zoom extrêmes (jusqu'à 500 %), sur certaines plages de viewport — démontré mathématiquement par l'analyse de novembre 2023 (cf. sources). Tester réellement au zoom plutôt que de faire confiance à la formule.
- **[non qualifié]** garde-fou communément admis — ne jamais dépasser un **ratio de 2.5× entre la taille minimale et la taille maximale d'un même échelon**. L'échelle de ce système (TYPOGRAPHY-UI.md) reste très en dessous (ratio ≤ 1.5 partout).
- **[non qualifié]** borner la longueur de ligne du texte courant — la lisibilité d'un paragraphe dépend plus de sa mesure que de sa taille.
- **[non qualifié]** viser la fourchette classique d'environ **45 à 75 caractères par ligne** pour le texte courant. La mesure s'exprime en `ch` (elle suit la police et la taille effective), via le token `measure.reading-max` — jamais en pixels, qui ne suivraient ni le zoom ni la police.
- **[non qualifié]** le pendant de la fluidité — un texte fluide qui s'étire sans `max-width` casse sa mesure sur grand écran. Fluidité de la taille et bornage de la mesure vont ensemble : l'un sans l'autre dégrade la lecture qu'ils devaient améliorer.
- **[non qualifié]** inversement proportionnel au corps — le texte courant respire : 120 à 145 % du corps selon la fourchette classique (Butterick), et WCAG 1.4.8 (AAA) demande un interligne d'au moins 1.5 dans les paragraphes ; `typography.body` est à 1.6, conforme aux deux. Les grands corps serrent — un titre n'a pas besoin de l'air d'un paragraphe (`typography.display` à 1.1).
- **[non qualifié]** l'interligne n'est pas une constante du système, c'est une fonction du corps et de l'usage.
- **[non qualifié]** la graisse est un canal de hiérarchie parmi d'autres — jamais le seul.
- **[non qualifié]** la hiérarchie se construit par **combinaison** de corps, graisse et position (Polaris) — une graisse légère peut dominer une grasse si son corps est nettement supérieur (Carbon). C'est le pendant visuel de "niveau ≠ taille".
- **[non qualifié]** le semibold porte les titres, **jamais le texte long** (Carbon) — et aucune graisse light sous le corps standard : la finesse en petit corps dégrade le contraste effectif du trait.
- **[non qualifié]** le gras s'utilise avec parcimonie — pour "l'information critique que l'utilisateur rate" (GOV.UK) ; gras et italique le moins possible, et jamais ensemble (Butterick).
- **[non qualifié]** titres en **sentence case** (GOV.UK) — décision prise une fois pour tout le produit, pas titre par titre.
- **[non qualifié]** **TOUT EN CAPITALES : réservé aux étiquettes brèves** (le rôle exact de `label-mono` dans ce système), jamais au texte courant — et toujours accompagné de 5 à 12 % d'interlettrage (Butterick). La valeur déjà utilisée en local (0.08em = 8 %) entre dans la fourchette — règle désormais sourcée, candidate à un token.
- **[non qualifié]** les capitales s'appliquent en CSS (`text-transform`), jamais tapées dans le contenu — le texte source reste en casse normale pour les lecteurs d'écran et le copier-coller.
- **[non qualifié]** **fer à gauche par défaut** — le retour à la ligne régulier est le repère de lecture.
- **[non qualifié]** **jamais de texte justifié en interface**.
- **[non qualifié]** le centré est réservé aux titres courts et aux moments éditoriaux — jamais un paragraphe (le début de ligne devient introuvable).
- **[non qualifié]** corps de texte web — 15 à 25 px d'équivalent (Butterick) ; `typography.body` (16px) est dans la fourchette, volontairement bas de fourchette pour un produit dense. **Jamais sous l'équivalent 16px pour le texte courant.**
- **[non qualifié]** cas particulier des champs de saisie — sous 16px, iOS Safari **zoome automatiquement** la page au focus du champ : la taille du texte d'un input n'est pas une décision esthétique, c'est un comportement de plateforme (frontière avec INPUT-UI.md, qui hérite du corps standard et n'est donc pas concerné).
- **[non qualifié]** six niveaux existent, quatre suffisent presque toujours — GOV.UK ne style que quatre échelons de titres. Des h5/h6 récurrents signalent une structure trop profonde à réorganiser, pas un besoin de styles supplémentaires. L'échelle complète h1-h6 de DESIGN.md existe pour les cas légitimes (documentation longue, spécifications), pas comme une invitation.
- **[non qualifié]** **la structure appartient au contenu, l'apparence appartient au design — et aucun des deux ne se déduit de l'autre.**

## Non couvert — poser la question, ne rien trancher

- Texte d'accroche / lead : Un premier paragraphe est mis en avant.
- Chiffres alignés (montants, tables) : Des nombres se comparent verticalement.
- Texte traduit (expansion ~30 %) : Le texte est traduit (allemand, finnois).
- Préférences utilisateur (reduced motion, contraste élevé) : L'utilisateur active un mode d'accessibilité.
- RTL / scripts non latins : La langue se lit de droite à gauche.
- Impression : Le contenu est imprimé.
