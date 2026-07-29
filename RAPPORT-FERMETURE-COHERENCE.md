# Rapport de fermeture — chantier cohérence (2026-07-29, commits a54567d → 818e5a0)

> Critère de réussite visé : *un agent reçoit le bon contrat Fili, connaît l'API réellement
> disponible, utilise les composants existants, signale les manquants, ne peut pas inventer
> silencieusement une option, et un site incorrect fait échouer la vérification avant publication.*
> Statuts employés : **TERMINÉ-VÉRIFIÉ** · **PARTIEL** · **DETTE ACCEPTÉE** · **DÉCISION REQUISE** · **HORS PÉRIMÈTRE**.

## 1. Ce qui a été corrigé (vs l'audit de fermeture)

| Écart de l'audit | Verdict | Statut |
|---|---|---|
| `npm run verifie` non bloquant | scripts scindés `rapport:*` / `verifie:*` ; `verifie` = chaîne complète (tokens → manifeste:check → manifeste → tokens strict → consommation strict → exemples → tsc → tests → paquet → site) | TERMINÉ-VÉRIFIÉ (les 7 premiers maillons attestés sur machine ; tests/site : cf. §7) |
| Génération silencieuse du manifeste | `manifeste:check` compare la génération EN MÉMOIRE au commité, n'écrit rien, message de régénération | TERMINÉ-VÉRIFIÉ |
| CI publie sur simple build visuel | pages.yml verrouillé (ci-joint) — fichier PROTÉGÉ contre l'écriture à distance : **à coller toi-même** | PARTIEL (livré, non appliqué) |
| 61 écarts non bloquants | baseline versionnée `tools/verifie-tokens.baseline.json` : 146 entrées / 305 occurrences (détection ÉTENDUE : dimensions, durées, z-index, couleurs), chacune avec justification et vague ; tout nouveau/augmentation échoue ; `--update-baseline` ne sait QUE réduire | TERMINÉ-VÉRIFIÉ |
| Var locale « connue partout » | portée PAR DOSSIER de composant + liste `PARTAGEES` explicite (vide) | TERMINÉ-VÉRIFIÉ |
| Validateur consommation regex/ligne, non livré | `fili-check.mjs` : AST TypeScript, fichier complet, portable (`node fili-check.mjs .`), config d'exclusions justifiées, échec clair sans TypeScript ; livré dans le paquet ; `verifie-consommation` = enveloppe monorepo du même moteur | TERMINÉ-VÉRIFIÉ (fixtures ± + auto-test dans build-plugin) |
| JSX multiligne non détecté | fixture dédiée (input multiligne) détectée | TERMINÉ-VÉRIFIÉ |
| FILI-MANQUE sans fiche | fiche exigée (`.fili/manques/` consommateur · `content/md/inventaires/manques/` monorepo), statuts contrôlés (proposé/validé/refusé/résolu), résolu+marqueur = échec, promotion fantôme = échec | TERMINÉ-VÉRIFIÉ (1er cas réel : `chip-renvoi`) |
| Paquet sans Contract/Protocol/validateur | 6 livrables ajoutés + **liens documentaires des KIT vérifiés mécaniquement** (lien mort = paquet non produit) ; KIT-socle ne cite plus de chemin interne au monorepo | TERMINÉ-VÉRIFIÉ (paquet 70 fichiers, 217 Ko) |
| « Le manifeste ne peut pas mentir » vrai du seul pilote | axes `axe<U>()` sur les 27, props `propsDe<P>()`, anatomie `anatomie<T>()`, exemple canonique + accessibilité + anti-patterns EXIGÉS pour tout stable, dette doctrinale QUALIFIÉE (champ `dette`) sinon échec | TERMINÉ-VÉRIFIÉ (limite honnête : une prop inventée qui collisionne avec un attribut HTML passe le garde `propsDe` ; les axes, eux, sont étanches) |
| Atelier dérivé pour 3 composants | 16 composants de plus dérivés (Select, Tabs, Drawer, Modal, Dropdown, Container, Link, Skeleton, Alert, Toast, Switch, ThemeToggle, Delete/SubmitButton, CardGroup…) ; **Card séparée de la démo CardGroup** (2 entrées, expandable inclus) | TERMINÉ-VÉRIFIÉ (reste manuel, assumé : contrôles pédagogiques — position d'icône, contenus de démo) |
| Marque active « Sibyl » | atelier (Fili Docs, Fili, fili.fr), commentaires techniques @fili/* ; historiques/journaux INTACTS ; skill `design-system-md` non renommée (compat installations) | TERMINÉ-VÉRIFIÉ |

## 2. Commandes exécutées et résultats exacts (sur ta machine, 818e5a0)

```
npm run manifeste:check      → ✅ manifest.json à jour (27 composants)
verifie-tokens --strict      → ✅ pilote 0 écart · 0 nouveau · 0 augmentation (baseline 146/305)
verifie-consommation --strict→ ✅ 23 fichiers AST · 0 écart · 2 manques déclarés (chip-renvoi)
verifie-manifeste            → ✅ 27 entrées · 0 incohérence · 0 avertissement
verifie-exemples             → ✅ 28 exemples canoniques compilent (26 composants importés)
tsc site                     → ✅ (inclut les gardes de types du manifeste)
build-plugin                 → ✅ 70 fichiers, 217 Ko — auto-test fili-check + 0 lien mort
teste-fili-check             → ✅ 10 détections sur fixture négative, 0 faux positif
```

## 3. Couvertures

- **Manifeste** : 27/27 entrées ; axes typés sur 24 composants porteurs d'axes ; props gardées partout où l'API publique est typée (exception : sous-composants de Dropdown — props non exportées, garde au niveau des axes seulement) ; 28 exemples canoniques compilables ; 3 dettes doctrinales qualifiées (AppLayout, Skeleton, ThemeToggle, Brand, Drawer, Dropdown — champ `dette` avec vague).
- **Atelier** : options dérivées du manifeste pour 20 entrées ; restent manuels (choix assumés) : contrôles pédagogiques (icône, labels, données de démo) et le contrôle `field_type` d'Input (c'est le type HTML, pas une prop).
- **Tests** : pilote couvert en API/interaction/accessibilité (26 assertions : défauts, alias `style`→`variant` + priorité, relief data-*, focus v2, clearable/Password/Search/Number, aria-invalid, Card clickable/selectable/loading, axe-core sans violation hors color-contrast).

## 4. Ce qui reste ouvert — avec propriétaire et prochaine action

| Ouvert | Statut | Prochaine action |
|---|---|---|
| Exécution des tests vitest | **PARTIEL** — le registre npm est inaccessible depuis le pont (403, cloud ET VM local) : les dépendances ne sont pas installées | Toi, Terminal : `npm i -D -w @fili/react vitest jsdom @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom axe-core && npm test` |
| `npm audit` | **PARTIEL** — même blocage réseau | Toi, Terminal : `npm audit` (rapport §11 : non exécutable d'ici ; AUCUNE correction automatique à lancer sans lecture) |
| Build Next + `npm run verifie` complet | **PARTIEL** | Toi, Terminal : `npm run verifie` (après l'install ci-dessus) |
| pages.yml | **PARTIEL** — protégé à distance | Coller le fichier livré dans `.github/workflows/pages.yml` |
| Tests visuels (clair/sombre/reduced-motion/hover/pressed) | **DETTE ACCEPTÉE** — jsdom n'a pas de moteur de rendu ; Storybook exclu | Harnais Playwright sur l'Atelier (le cloud a Chromium ; il faut @playwright/test installable — Terminal) — vague dédiée |
| Tests adaptatifs (220px, redimensionnement réel du conteneur) | **DETTE ACCEPTÉE** — container queries invisibles en jsdom | Même harnais Playwright, pages /ui en `fill` |
| Baseline 146 entrées | **DETTE ACCEPTÉE** — gelée, ne peut plus croître | Résorption par vagues (2→8), `--update-baseline` à chaque réduction |
| `chip-renvoi` (2 boutons natifs des grilles doctrine) | **DÉCISION REQUISE** — fiche `proposé` | Valider/refuser la promotion (Chip de renvoi) |
| Retrait d'AppShell du baril ; sort du token `accent` (libéré par le focus v2) ; alias `style` (retrait en majeure) ; fiches condensées du plugin (éditoriales vs dérivées) | **DÉCISION REQUISE** | Arbitrages listés aussi dans RAPPORT-CHANTIER-COHERENCE §5 |
| Storybook, nouveaux composants, refonte visuelle, renommage de la skill | **HORS PÉRIMÈTRE** (consigne) | — |

## 5. Contenu exact du paquet agents (build/design-system-md.plugin, v1.7.1, 70 fichiers)

47 RULES-* · KIT-socle + 8 KIT-<intention> (générés du manifeste) · FILI-COMPONENT-CONTRACT.md ·
MISSING-COMPONENT-PROTOCOL.md · fili-check.mjs + fili-check.config.example.json ·
modele-fiche-manque.md · manifest.json · tokens.css/tokens.yaml/theme-gate.mjs ·
CLAUDE.md/AGENTS.md/SKILL.md (routeur, règle 11 = charge des KIT si @fili/react) · README + plugin.json.
Publication versionnée : `npm run plugin` (publie.js proposera le bump depuis 1.7.1).

## 6. Note d'implémentation pour la suite

Le moteur AST est UN fichier (`tools/fili-check.mjs`), consommé par le monorepo (verifie-consommation),
par le paquet (copie au build, auto-testée) et par les consommateurs (`node fili-check.mjs .`).
Toute nouvelle détection s'ajoute là, avec sa fixture dans `tools/fixtures/fili-check/` — l'auto-test
du build refuse un paquet dont le validateur a perdu une détection.
