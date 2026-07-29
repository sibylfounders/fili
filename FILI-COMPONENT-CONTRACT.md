# Fili Component Contract — version 1.0.0 (2026-07-29)

> La grammaire commune de l'API du kit `@fili/react`. Les mêmes mots portent le même type
> de décision partout. Deux composants peuvent proposer des valeurs différentes pour un
> même axe ; ils ne doivent jamais employer deux noms différents pour la même idée sans
> raison documentée ici.

## Les axes

| Axe | Type de décision | Exemples de valeurs | Qui l'emploie |
|---|---|---|---|
| `variant` | **Facture visuelle** — la forme de présentation, à sémantique constante | filled/stroke/lighter/ghost (Button) ; line/pill (Tabs) ; default/ghost (Select) ; block/text/circle (Skeleton) ; default/docs (AppLayout) | tout composant à plusieurs factures |
| `tone` | **Registre de couleur ou portée sémantique** — ce que la couleur veut dire | primary/neutral/destructive (contrôles) ; info/success/warning/danger/neutral (messages) | Button, CompactButton, Alert, Toast |
| `size` | **Échelle dimensionnelle d'un contrôle** | sm/md/lg | Button, Input, Select, Switch, ThemeToggle… |
| `status` | **État communiqué par le composant**, notamment la validation — imposé par les données, pas choisi pour l'esthétique | default/error/success/warning | Input (et tout futur champ) |
| `mode` | **Nature de l'interaction** d'une surface-conteneur (langage transversal INTERACTION) | static/clickable/selectable/expandable | Card, CardGroup |
| `density` | **Densité de contenu ou de composition** | comfortable/compact (+spacious en collection) | Card, CardGroup |
| `context` | **Environnement d'usage** qui change la présentation sans changer la nature | inline/standalone/navigation | Link |
| `state` | **État interne de machine** — exposé en `data-state`, jamais une option décorative publique | idle/deleting/done ; entering/visible/exiting | DeleteButton, SubmitButton, Toast |

Distinctions à ne pas écraser :

- `variant` ≠ `tone` : la facture (remplissage, forme) est orthogonale à la couleur.
  Un Button `stroke` peut être `destructive` ; un Tabs `pill` n'a pas de tone.
- `status` ≠ `tone` : le `status` est **subi** (la validation le pose), le `tone` est
  **choisi** (l'auteur décide du registre). C'est pourquoi Input dit `status` là où
  Alert dit `tone`, même si les palettes se recouvrent.
- `size` ≠ `density` : `size` dimensionne un contrôle isolé ; `density` compacte une
  composition. Les tailles de contrôles parlent sm/md/lg ; les largeurs de contenu
  parlent narrow/default/wide/full (Container, Modal, Drawer) — deux langues, deux usages,
  jamais mélangées.
- Directions : toujours logiques (start/end), jamais physiques (left/right).

## Le cas `style` (résolu — arbitrage Aurélien 2026-07-29)

`style` était l'axe de facture de Button/CompactButton. Il masquait l'attribut React natif
`style` (retiré des props via `Omit`), ce qu'aucun autre composant ne fait, et le reste du
kit disait déjà `variant`.

**Décision : `variant` est l'API canonique.** Trajectoire :

1. `variant` accepté dès maintenant sur Button et CompactButton, mêmes valeurs.
2. `style` reste accepté comme **alias déprécié** ; si les deux sont fournis, `variant`
   gagne. Un avertissement unique est émis en développement.
3. L'atelier, les exemples, la doctrine et le catalogue agents ne montrent plus que `variant`.
4. Suppression de l'alias à la prochaine version majeure de `@fili/react` ; l'attribut DOM
   `style` redeviendra alors utilisable (aujourd'hui il reste masqué tant que l'alias vit).

## Dictionnaire des tones (résolu — arbitrage Aurélien 2026-07-29)

Deux registres, assumés et documentés — pas d'unification forcée :

- **Contrôles** (Button, CompactButton) : le tone dit **l'intention UX de l'action** —
  `primary` (l'action principale), `neutral` (l'action ordinaire), `destructive`
  (l'action irréversible).
- **Messages** (Alert, Toast) : le tone dit **la sémantique du contenu** — `info`,
  `success`, `warning`, `danger`, `neutral` (Toast seul).

Table de correspondance intention → famille chromatique canonique :

| Valeur de tone | Famille de tokens consommée |
|---|---|
| primary | `primary` (indigo) |
| neutral (contrôle) | `neutral` / `surface-inverse` (solide) · `surface` (subtil) · `border-strong` (contour) |
| **destructive** | **`danger`** (red) — l'intention est destructive, la couleur est danger |
| info / success / warning / danger | familles homonymes |
| neutral (Toast) | `neutral` (l'inverse haute-contraste) |

`warning` n'est **jamais** un tone d'action : l'avertissement est un message (Alert, Badge),
pas un bouton — un stroke warning se confondrait avec une alerte (arbitrage 2026-07-29,
doctrine BUTTON corrigée en conséquence).

## Focus (résolu — arbitrage Aurélien 2026-07-29)

Un seul anneau pour tout le système, celui de la fondation BORDER : `outline` extérieur,
couleur `--accent`, largeur `--focus-width`, écart `--focus-offset`, sur `:focus-visible`.
Implémentation par les rôles transversaux `--control-focus-*` (voir Tokens). L'ancienne
décision BUTTON-UI « anneau accordé au ton » est abrogée. Exceptions légitimes, à
documenter au cas par cas : cible de focus programmatique (`tabindex="-1"` — Modal,
Drawer), remplacement par un signal équivalent ≥ 3:1 (items de Dropdown au fond glissant).

## Tokens : qui consomme quoi

- Un composant public ne consomme **jamais** une primitive (étage 1) ni une valeur en dur
  quand un rôle existe.
- Il consomme les **rôles transversaux** (étage 2 : `control-*`, `field-*`, `surface-*`,
  `overlay-*`) et, quand son contrat l'exige, ses **alias de composant** (étage 3 :
  `button-*`, `input-*`, `card-*`) qui pointent vers les rôles.
- Les exceptions (SVG, géométrie, mécanique interne) sont classées dans
  `tools/verifie-tokens.exceptions.json` — jamais silencieuses.

## Autorité des couches

| Couche | Fait autorité sur |
|---|---|
| TypeScript (`@fili/react`) | ce que le composant **accepte réellement** |
| Manifeste (`packages/react/src/manifest/`) | statut, intention, relations, exemples, anti-patterns |
| Doctrine (`content/md/`) | les règles UX/UI — le pourquoi et le quand |
| Tokens (`@fili/tokens`) | les valeurs |

Un validateur (`tools/verifie-manifeste.mjs`) détecte les divergences entre ces couches.
Une règle compilée (RULES) ne doit jamais proposer à un agent une API absente du manifeste.

## Évolution du contrat

Ce contrat se modifie comme la doctrine : proposition, arbitrage journalisé dans
DECISIONS.md, version bumpée ici. Un nouvel axe n'entre que s'il porte un type de décision
qu'aucun axe existant ne couvre.
