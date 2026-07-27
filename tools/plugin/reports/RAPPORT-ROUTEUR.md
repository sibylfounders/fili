# RAPPORT — genere-routeur.js

Sujets indexés : 46 — erreurs : 0 — avertissements : 4

## Poids (estimation chars/3,6)

- Socle toujours chargé : routeur ~7,1 k + tokens.yaml ~4,4 k + RULES-accessibility/interaction/adaptive/cognitive-load/performance ~5,8 k
- Totalité du paquet (l'ancien pire cas) : ~79,5 k

- Socle universel : principe d'accessibilité + langage d'interaction + principe adaptatif + principe de charge cognitive + principe de performance perçue (~5,8 k), quelle que soit l'intention.

| Bundle | Fichiers | Poids RULES | Total chargé (avec socle) | vs tout le paquet |
|---|---|---|---|---|
| Formulaire | 16 | ~30,0 k | ~47,3 k | −41 % |
| Collection | 12 | ~21,3 k | ~38,6 k | −51 % |
| Page de contenu | 5 | ~7,6 k | ~24,9 k | −69 % |
| Feedback | 10 | ~16,3 k | ~33,6 k | −58 % |
| Création de compte | 15 | ~35,9 k | ~53,1 k | −33 % |
| Superposé modal | 10 | ~14,0 k | ~31,2 k | −61 % |

## Extensions (chargées uniquement si le contexte les exige — hors bundle par défaut)

| Extension | Parent | Poids seul | Total avec parent et socle |
|---|---|---|---|
| creation-compte-consentement | creation-compte | ~0,9 k | ~44,5 k |
| creation-compte-email-deja-utilise | creation-compte | ~0,8 k | ~44,4 k |
| creation-compte-force-mot-de-passe | creation-compte | ~0,6 k | ~44,2 k |
| creation-compte-sso-social | creation-compte | ~0,6 k | ~44,2 k |
| creation-compte-verification-email | creation-compte | ~0,6 k | ~44,2 k |
| form-async-validation | form | ~0,4 k | ~33,9 k |
| form-autosave | form | ~0,4 k | ~33,9 k |
| form-conditional-fields | form | ~0,5 k | ~33,9 k |
| form-multi-step | form | ~0,5 k | ~34,0 k |
| form-partial-success | form | ~0,3 k | ~33,8 k |
| form-sensitive-data | form | ~0,5 k | ~33,9 k |
| form-server-errors | form | ~0,5 k | ~34,0 k |

## Avertissements

- sujet « navigation » présent dans aucune intention et référencé par personne — accessible seulement via la table des sujets
- sujet « select » présent dans aucune intention et référencé par personne — accessible seulement via la table des sujets
- sujet « switch » présent dans aucune intention et référencé par personne — accessible seulement via la table des sujets
- sujet « tabs » présent dans aucune intention et référencé par personne — accessible seulement via la table des sujets
