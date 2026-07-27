---
component: switch
layer: ux
type: component
version: 1.0.0 # 1.0.0 : première rédaction — besoin réel : interrupteurs de theming et réglages du rail d'outils du shell (2026-07-24). Distinct de la « bascule d'affichage » du mot de passe (INPUT) et de la checkbox : un switch a un EFFET IMMÉDIAT. Périmètre arbitré : basique (on/off, disabled) ; l'état asynchrone (bascule qui appelle le serveur) est une extension différée. role=switch (ARIA). Cf. DECISIONS.md 2026-07-24.
last_updated: 2026-07-24
companion: SWITCH-UI.md
confidence: mixed # role=switch et son clavier sont établis (ARIA/WCAG) ; la frontière switch vs checkbox est un consensus UX convergent.
---

# Switch — Couche UX (composant)

> Activer ou désactiver **une fonction, tout de suite**. Le switch bascule un état booléen à **effet
> immédiat** — c'est ce qui le sépare de la checkbox.

## Switch ou checkbox — la ligne de partage

RÈGLE : **switch** = l'action prend effet **immédiatement** (un réglage, le mode sombre, une notification
qu'on coupe) — pas de bouton « appliquer ». **Checkbox** = une **sélection** intégrée à un formulaire,
**validée à la soumission** (choisir des options, un consentement). Ne jamais utiliser l'un pour l'autre :
un switch qui n'agit qu'après un « enregistrer » ment sur l'immédiateté ; une checkbox qui agit au clic
surprend.

RÈGLE : l'effet immédiat implique qu'il n'y a **rien à soumettre** — le switch n'attend pas un envoi. Si la
bascule peut **échouer** (elle déclenche un appel serveur), c'est le cas asynchrone : **hors périmètre de
cette version** (extension différée), à remonter plutôt qu'à improviser.

## État — jamais la seule couleur

RÈGLE : l'état on/off se lit d'abord à la **position** du pouce (gauche/droite), pas seulement à la couleur
(renvoi ACCESSIBILITY, COLOR : jamais un seul canal). Quand la conséquence n'est pas évidente, un **libellé
d'état** (« Activé / Désactivé ») accompagne — le mot reste le canal fiable (VOICE).

RÈGLE : le switch porte un **libellé** qui dit ce qu'il gouverne ; ce libellé est cliquable et fait partie
du **nom accessible**. États **désactivé** (non focalisable, contraste réduit assumé) et **focus** visibles.

## Rôle et clavier

RÈGLE : `role="switch"` + `aria-checked` (true/false) ; **Espace** (et Entrée) **basculent** ; le nom
accessible contient le libellé visible (WCAG 2.5.3). Le changement d'état est annoncé par `aria-checked`,
pas seulement par le déplacement visuel.

## Frontières

RÈGLE : la **couleur** des états relève de `color` ; le **mouvement** du pouce relève de `motion` ; l'**anneau
de focus** de `border` ; le **mot** du libellé de `voice` ; une **sélection validée à la soumission** relève
de la **checkbox** et de `form`, pas du switch.

## Sources et niveau de confiance (couche UX)
| Affirmation | Source | Confiance |
|---|---|---|
| role="switch", aria-checked, Espace bascule | [ARIA APG — Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) | Établi |
| Switch = effet immédiat ; checkbox = sélection validée à la soumission | [NN/g — Toggle-Switch Guidelines](https://www.nngroup.com/articles/toggle-switch-guidelines/) | Convergent |
| État jamais porté par la seule couleur (position + mot) | WCAG 1.4.1, 1.3.3 (renvoi ACCESSIBILITY) | Établi |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence interne, ergonomie).*
