---
component: navigation
layer: ux
type: pattern
version: 1.0.0 # 1.0.0 : première rédaction — sujet auparavant HORS PÉRIMÈTRE, entré en scope avec le shell (2026-07-24). Pattern d'ASSEMBLAGE : landmark <nav>, hiérarchie, état courant (délégué à LINK), regroupement (délégué à ACCORDION), TOC « sur cette page » (scrollspy), skip-link. Périmètre arbitré : nav latérale + TOC + skip-link ; fil d'Ariane mappé mais différé. Cf. DECISIONS.md 2026-07-24.
last_updated: 2026-07-24
companion: NAVIGATION-UI.md
confidence: mixed # landmarks, aria-current et skip-link sont établis (WCAG/APG) ; le comportement de scrollspy du TOC est un consensus convergent.
---

# Navigation — Couche UX (pattern)

> **Orchestration** d'une navigation, pas un composant neuf : elle **assemble** des destinations (`link` en
> contexte navigation), les **regroupe** (`accordion`), les place dans des **repères** (landmarks) et gère
> l'**état courant**. Elle couvre trois surfaces : la **nav latérale**, la **table des matières « sur cette
> page »**, et le **skip-link**. Le fil d'Ariane est cartographié mais différé.

## Repères (landmarks)

RÈGLE : toute navigation vit dans un `nav` **étiqueté** (`aria-label`) ; quand plusieurs coexistent, chacune
porte une étiquette distincte (« Navigation principale », « Sur cette page »). Le contenu principal est un
`main` — cible du skip-link.

## Nav latérale

RÈGLE : les destinations sont des **liens** (`link`, contexte navigation) ; leur regroupement est un
**accordion**. La **destination courante** est signalée par `link` (aria-current + signal **non chromatique**)
— **un seul** lien courant à la fois. La hiérarchie (groupe → sous-liens) se lit à l'indentation et au
regroupement, pas à la seule couleur.

RÈGLE : sous les seuils du shell, la nav latérale passe **off-canvas** — comportement porté par `overlay`
(scrim, focus, dismiss), pas par ce pattern. Un skip-link permet de sauter la nav pour atteindre le contenu.

## Table des matières « sur cette page »

RÈGLE : le TOC liste les **sections de la page courante** ; l'entrée **active suit la lecture** (la section
visible), marquée par `aria-current` et un repère **non chromatique** (trait/gras), jamais la seule couleur.
Le TOC **complète** la nav principale, il ne la remplace pas — c'est de la navigation *intra-page*.

RÈGLE : cliquer une entrée **défile** vers la section (ancre) ; le scrollspy **reflète** la lecture, il ne la
pilote pas. Sous `prefers-reduced-motion`, le défilement est instantané (renvoi MOTION).

## Skip-link (aller au contenu)

RÈGLE : le **premier élément focalisable** de la page est un lien « **Aller au contenu** » — **masqué
visuellement jusqu'au focus**, puis visible — qui déplace le focus vers le `main`. Obligatoire dès qu'une nav
longue précède le contenu (renvoi ACCESSIBILITY : focus ordonné, franchissable au clavier).

## Clavier

RÈGLE : Tab traverse la navigation dans un **ordre qui suit le sens** ; **aucun piège de focus** ; les
accordéons de nav suivent le clavier d'`accordion`, les liens celui de `link`. La navigation reste
**entièrement franchissable au clavier**.

## Frontières

RÈGLE : l'**item** est un `link` ; le **regroupement** un `accordion` ; l'**off-canvas** relève d'`overlay` ;
l'**anneau de focus** de `border` ; l'**ordre de focus général** d'`accessibility` ; le **mot** d'un libellé
de `voice`. Ce pattern ne redéfinit aucun de ces mécanismes — il les **compose**.

## Sources et niveau de confiance (couche UX)
| Affirmation | Source | Confiance |
|---|---|---|
| `nav` étiqueté, `main`, un seul `aria-current="page"` | [WAI — Landmarks](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/), [aria-current](https://www.w3.org/TR/wai-aria-1.1/#aria-current) | Établi |
| Skip-link masqué jusqu'au focus, saute au contenu | [WCAG 2.4.1 — Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) | Établi |
| TOC « sur cette page » avec entrée active suivant la lecture (scrollspy) | Convergence des docs (Docusaurus, MDN) | Convergent |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence interne, ergonomie).*
