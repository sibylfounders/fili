---
component: radius
layer: ui
type: foundation
version: 1.1.0 # 1.1.0 : cran conteneur radius.lg — stress-test 2026-07-17
last_updated: 2026-07-11
companion: RADIUS-UX.md
tokens:
  # Aucune valeur définie ici — l'échelle vit dans DESIGN.md. Ce fichier fixe la grammaire d'application.
  crans:
    petit: radius.sm # petites hauteurs (bouton/input sm)
    controle: radius.md # contrôles de taille standard (bouton/input md-lg) — le rayon de croisière des contrôles
    conteneur: radius.lg # conteneurs (card, alert) — cran conteneur ajouté en 1.1.0
    plein: radius.pill # badge/avatar uniquement (forme = pilule) — jamais un contrôle
confidence: mixed
---

# Radius — Couche UI (fondation)

> Grammaire d'application de l'échelle. Le raisonnement (le rayon suit la taille, imbrication, pill borné) vit dans RADIUS-UX.md. Les valeurs sont résolues dans DESIGN.md.

## Application

- **Choix du cran** : par la taille ET le type, jamais en % de la hauteur. Petites hauteurs (`scale.compact`) → `radius.sm` ; contrôles standard (bouton/input md-lg) → `radius.md` ; conteneurs (card, alert) → `radius.lg` ; badge/avatar (forme intrinsèquement pilule) → `radius.pill`. Un contrôle mono-ligne ne prend jamais `pill` (cf. RADIUS-UX).
- **Cohérence de groupe** : les contrôles voisins d'une même taille partagent le même cran (bouton md + input md → `radius.md`) — déjà le cas chez les consommateurs, désormais une règle.
- **Imbrication** : coin interne collé → épouse le rayon externe (media de carte) ; élément concentrique interne → rayon externe − écart ; anneau externe (focus ring) → rayon du composant **+ `border.focus-offset`** (cf. BORDER-UI).
- **Stabilité** : aucun état ne modifie le rayon.

## Consommation par les composants

| Consommateur | Crans consommés |
|---|---|
| Bouton (BUTTON-UI.md) | sm → `radius.sm` ; md/lg → `radius.md` (pas de proportionnalité, décision documentée) |
| Input (INPUT-UI.md) | même mapping que le bouton, par taille |
| Card (CARD-UI.md) | `radius.lg` (conteneur, 1.1.0) ; media imbriqué épouse le coin |
| Alert (ALERT-UI.md) | `radius.lg` (conteneur, 1.1.0) |
| Badge/tag (à naître) | `radius.pill` — provision documentée |

## Vérifiabilité

- `valide-dossier.js` vérifie la résolution des tokens `radius.*` ; la concentricité des imbrications est un contrôle visuel de revue (non calculable depuis les .md) — signalé plutôt que simulé.

## Sources et niveau de confiance (couche UI)

| Affirmation | Source | Confiance |
|---|---|---|
| Mapping par taille, échelle fermée | [Atlassian — Radius](https://atlassian.design/foundations/radius), précédents internes (BUTTON-UI, INPUT-UI) | Établi par convergence |
| Rayon du ring = base + offset | [Atlassian — Radius](https://atlassian.design/foundations/radius) (leur token de rayon de focus, calculé base + écart) | Établi chez Atlassian, adopté (BORDER-UI) |
