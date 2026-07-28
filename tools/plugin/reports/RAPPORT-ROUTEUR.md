# RAPPORT — genere-routeur.js

Sujets indexés : 47 — erreurs : 0 — avertissements : 0

## Poids (estimation chars/3,6)

- Socle toujours chargé : routeur ~8,1 k + tokens.yaml ~4,4 k + DECISIONS-locales.md ~0,9 k (gabarit — croît chez le consommateur) + RULES-accessibility/interaction/adaptive/cognitive-load/performance ~5,8 k
- Totalité du paquet (l'ancien pire cas) : ~84,5 k

- Socle universel : principe d'accessibilité + langage d'interaction + principe adaptatif + principe de charge cognitive + principe de performance perçue (~5,8 k), quelle que soit l'intention.

| Bundle | Fichiers | Poids RULES | Total chargé (avec socle) | vs tout le paquet |
|---|---|---|---|---|
| Formulaire | 18 | ~31,7 k | ~50,7 k | −40 % |
| Collection | 12 | ~21,3 k | ~40,4 k | −52 % |
| Page de contenu | 6 | ~8,9 k | ~28,0 k | −67 % |
| Feedback | 10 | ~16,3 k | ~35,4 k | −58 % |
| Création de compte | 15 | ~35,9 k | ~55,0 k | −35 % |
| Consentement | 15 | ~25,8 k | ~44,9 k | −47 % |
| Cadre applicatif | 14 | ~17,2 k | ~36,3 k | −57 % |
| Superposé modal | 10 | ~14,0 k | ~33,1 k | −61 % |

## Extensions (chargées uniquement si le contexte les exige — hors bundle par défaut)

| Extension | Parent | Poids seul | Total avec parent et socle |
|---|---|---|---|
| creation-compte-consentement | creation-compte | ~0,9 k | ~46,3 k |
| creation-compte-email-deja-utilise | creation-compte | ~0,8 k | ~46,2 k |
| creation-compte-force-mot-de-passe | creation-compte | ~0,6 k | ~46,0 k |
| creation-compte-sso-social | creation-compte | ~0,6 k | ~46,0 k |
| creation-compte-verification-email | creation-compte | ~0,6 k | ~46,0 k |
| form-async-validation | form | ~0,4 k | ~35,7 k |
| form-autosave | form | ~0,4 k | ~35,7 k |
| form-conditional-fields | form | ~0,5 k | ~35,7 k |
| form-multi-step | form | ~0,5 k | ~35,8 k |
| form-partial-success | form | ~0,3 k | ~35,6 k |
| form-sensitive-data | form | ~0,5 k | ~35,8 k |
| form-server-errors | form | ~0,5 k | ~35,8 k |
