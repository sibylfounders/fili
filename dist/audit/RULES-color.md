---
sujet: color
nature: foundations
resume: "Ce fichier contient le raisonnement : rôles, registres, redondance, contraste, theming."
selon-contexte: [alert, button, card, elevation, form, input, link]
source: COLOR-UX.md v1.2.0 + COLOR-UI.md v1.2.0
empreinte: sha256:115abe39bbc5881d
regles: {loi: 13, preference: 10, non_qualifie: 0}
---
# RULES — color (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Le rôle d'une couleur et sa valeur sont deux décisions distinctes : les composants référencent le rôle, et la valeur vit dans une source unique dont elle peut changer entièrement sans qu'aucune règle d'usage bouge. `COLOR-R02`
  - vérifiable : aucune valeur hexadécimale hors du fichier de valeurs unique
  - source : https://developer.android.com/design/ui/mobile/guides/styles/color
- **[loi]** La palette se répartit en trois registres étanches — marque, sémantique, neutres — et chaque token appartient à un seul d'entre eux. `COLOR-R03`
  - vérifiable : chaque token couleur est rattaché à exactement un registre
- **[loi]** Une couleur ne change jamais de registre selon le contexte : un token de marque ne porte jamais un état, un token sémantique ne sert jamais de décor. `COLOR-R04`
  - vérifiable : aucun token de marque employé pour un tone sémantique, et réciproquement
  - source : https://atlassian.design/foundations/color
- **[préférence]** Le registre marque se limite aux rôles fonctionnels existants : une teinte purement décorative ne reçoit pas de token. `COLOR-R05`
  - vérifiable : tout token de marque est référencé par au moins un rôle fonctionnel documenté
- **[préférence]** Chaque registre a son niveau d'expression — les couleurs sémantiques existent en couple texte/fond subtil, les neutres en échelle — et toute nouvelle valeur sémantique fournit son couple complet dès sa création. `COLOR-R06`
  - vérifiable : tout token sémantique possède son couple texte/fond dès son introduction
- **[loi]** Aucune information ne repose sur la couleur seule. `COLOR-R07`
  - vérifiable : aucune information portée par la couleur seule
  - source : https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
- **[loi]** Chaque usage sémantique de la couleur déclare un canal redondant non chromatique — icône, mot ou forme — qui ne peut être retiré pour alléger. `COLOR-R08`
  - vérifiable : chaque tone sémantique porte au moins un signal non chromatique déclaré
  - source : https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
- **[loi]** Le texte courant atteint 4,5:1 avec son fond, et tout composant d'interface ou état requis pour l'identifier atteint 3:1 avec les couleurs adjacentes. `COLOR-R09`
  - vérifiable : contraste texte / fond ≥ 4,5:1 ; contraste composant ou état / fond ≥ 3:1
  - source : https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- **[loi]** La conformité au contraste s'établit par paire et non par token isolé : chaque couleur de texte déclare les fonds sur lesquels elle est vérifiée. `COLOR-R10`
  - vérifiable : chaque token de texte déclare la liste des fonds vérifiés ; tout fond non déclaré est interdit
  - source : https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- **[préférence]** Les couples texte/fond des états de survol sont vérifiés au même seuil que l'état de repos, bien que la norme en exempte le survol. `COLOR-R11`
  - vérifiable : contraste texte / fond ≥ 4,5:1 également à l'état hover
- **[préférence]** Le token de texte le plus faible est réservé aux métadonnées accessoires et n'est jamais employé pour du texte fonctionnel. `COLOR-R12`
  - vérifiable : aucun texte fonctionnel ne consomme un token de texte sous 4,5:1
- **[préférence]** Les états interactifs sont portés par des tokens dédiés et jamais calculés à la volée dans les composants. `COLOR-R13`
  - vérifiable : aucune couleur d'état produite hors token (ni filtre, ni assombrissement calculé en feuille de style)
- **[préférence]** L'état désactivé n'a pas de tokens dédiés tant qu'aucun composant ne documente un état désactivé légitime ; le jour venu, le couple complet fond/texte/bordure est créé en une seule fois. `COLOR-R14`
  - vérifiable : aucun token disabled dans la table de valeurs
- **[loi]** Dans un système à thèmes, un token de couleur résout une valeur par thème : l'architecture par tokens est la condition d'existence d'un second thème. `COLOR-R15`
  - vérifiable : chaque token couleur résout une valeur pour chaque thème déclaré
  - source : https://atlassian.design/foundations/color
- **[préférence]** Le mode sombre n'est pas couvert par décision explicite ; son adoption ajouterait une table de valeurs sans déplacer les rôles, et imposerait une re-vérification intégrale des seuils de contraste. `COLOR-R16`
- **[préférence]** La surface sombre de mise en avant est un panneau local sur page claire et ne constitue pas l'amorce d'un thème sombre ; son usage ne se généralise pas. `COLOR-R17`
- **[loi]** Deux textes garantis sur un même fond ne peuvent tous deux atteindre 4,5:1 que s'ils tombent du même côté de l'échelle de luminance. `COLOR-R18`
  - vérifiable : contraste ≥ 4,5:1 vérifié simultanément pour les deux textes garantis sur un même fond
  - source : https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- **[loi]** Le rapport de contraste ne dépendant que de la luminance relative, teinter un neutre en conservant sa luminance ne modifie aucun rapport de contraste et reste sûr par construction. `COLOR-R19`
  - vérifiable : rapport de contraste identique avant et après teinte, à luminance relative inchangée
  - source : https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
- **[préférence]** Le teintage d'un neutre s'opère en espace OKLCh — lightness figée, teinte cible posée — puis la luminance relative d'origine est recalée par dichotomie pour absorber la dérive de conversion. `COLOR-R20`
  - vérifiable : luminance relative recalculée identique à l'originale après conversion aller-retour
- **[loi]** En mode de couleurs forcées par le système, la palette est remplacée d'office et les fonds et ombres disparaissent : ce mode n'est jamais neutralisé, et l'interface s'appuie sur ce qui survit — sémantique, bordures, texte. `COLOR-R21`
  - vérifiable : aucune déclaration forced-color-adjust: none hors correctif d'accessibilité justifié
  - source : https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
- **[loi]** Du texte posé sur une image imprévisible ne garantit aucun contraste : il est soit adossé à un voile de contraste, soit sorti du média, jamais laissé nu. `COLOR-R22`
  - vérifiable : contraste texte / pixel de fond le plus défavorable ≥ 4,5:1
  - source : https://www.w3.org/WAI/WCAG22/Techniques/general/G18
- **[préférence]** Le voile de contraste se calcule et ne s'ajuste pas à l'œil : le pixel le plus défavorable est échantillonné derrière chaque zone de texte, l'opacité minimale nécessaire est calculée pour atteindre 4,5:1, et le résultat est revérifié à plusieurs formats de viewport. `COLOR-R23`
  - vérifiable : opacité du voile calculée sur le pixel le plus défavorable et revérifiée à chaque point de rupture
- **[loi]** La couleur s'applique par rôle et jamais par valeur, et un rôle ne porte jamais deux sens. `COLOR-R25`
  - vérifiable : aucune valeur hexadécimale hors du fichier de valeurs unique ; un rôle correspond à un sens unique
  - source : https://developer.android.com/design/ui/mobile/guides/styles/color

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

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

## Non couvert — poser la question, ne rien trancher

- Couleur désactivée (disabled) : Un contrôle est désactivé.
- Scrim / voile de superposition : Un fond s'assombrit derrière une modale.
- Couleur de sélection (texte surligné, item sélectionné) : Du texte ou un item est sélectionné.
- Texte sur photo/media : Du texte se pose sur une image imprévisible.
- Dataviz / graphiques : Une palette de graphiques.
- Mode sombre (dark mode) : L'interface passe en thème sombre.
- Contraste élevé forcé (forced-colors / high contrast) : L'OS force ses propres couleurs.
- Impression : Le contenu est imprimé.
- Sémantique divergente entre produits (rouge = danger vs solde négatif) : Un métier détourne le rouge.
