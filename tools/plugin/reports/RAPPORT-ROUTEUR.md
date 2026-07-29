# RAPPORT — genere-routeur.js

Sujets indexés : 47 — erreurs : 0 — avertissements : 0

## Poids (estimation chars/3,6)

- Socle toujours chargé : routeur ~7,9 k + tokens.yaml ~4,6 k + RULES-accessibility/interaction/adaptive/cognitive-load/performance ~5,8 k
- Totalité du paquet (l'ancien pire cas) : ~83,7 k

- Socle universel : principe d'accessibilité + langage d'interaction + principe adaptatif + principe de charge cognitive + principe de performance perçue (~5,8 k), quelle que soit l'intention.

| Bundle | Fichiers | Poids RULES | Total chargé (avec socle) | vs tout le paquet |
|---|---|---|---|---|
| Formulaire | 18 | ~31,6 k | ~49,9 k | −40 % |
| Collection | 12 | ~21,2 k | ~39,5 k | −53 % |
| Page de contenu | 6 | ~8,9 k | ~27,2 k | −67 % |
| Feedback | 10 | ~16,3 k | ~34,6 k | −59 % |
| Création de compte | 15 | ~35,8 k | ~54,1 k | −35 % |
| Consentement | 15 | ~25,7 k | ~44,1 k | −47 % |
| Cadre applicatif | 14 | ~17,2 k | ~35,5 k | −58 % |
| Superposé modal | 10 | ~14,0 k | ~32,3 k | −61 % |

## Extensions (chargées uniquement si le contexte les exige — hors bundle par défaut)

| Extension | Parent | Poids seul | Total avec parent et socle |
|---|---|---|---|
| creation-compte-consentement | creation-compte | ~0,9 k | ~45,4 k |
| creation-compte-email-deja-utilise | creation-compte | ~0,8 k | ~45,3 k |
| creation-compte-force-mot-de-passe | creation-compte | ~0,6 k | ~45,1 k |
| creation-compte-sso-social | creation-compte | ~0,6 k | ~45,1 k |
| creation-compte-verification-email | creation-compte | ~0,6 k | ~45,2 k |
| form-async-validation | form | ~0,4 k | ~34,8 k |
| form-autosave | form | ~0,4 k | ~34,8 k |
| form-conditional-fields | form | ~0,5 k | ~34,9 k |
| form-multi-step | form | ~0,5 k | ~34,9 k |
| form-partial-success | form | ~0,3 k | ~34,7 k |
| form-sensitive-data | form | ~0,5 k | ~34,9 k |
| form-server-errors | form | ~0,5 k | ~34,9 k |
