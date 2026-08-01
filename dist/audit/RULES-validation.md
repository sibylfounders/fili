---
sujet: validation
nature: principles
resume: "Ce fichier possède **la chaîne**, pas ses maillons."
selon-contexte: [accessibility, alert, choice, form, input, interaction, select, voice]
source: VALIDATION-UX.md v1.1.0
empreinte: sha256:d11ce02e38c76e2a
regles: {loi: 8, preference: 4, non_qualifie: 0}
---
# RULES — validation (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** **la chaîne est une, et elle est ordonnée.** Nature de la donnée attendue → contraintes déclarées → valeur saisie ou sélectionnée → déclenchement → validateur → **verdict** → état du contrôle → message local → agrégation par le formulaire → focus et annonce → correction → revalidation → soumission ou reprise. Aucun maillon ne se saute : un état affiché sans verdict est un mensonge, un verdict sans message est muet, un message sans agrégation est introuvable sur un formulaire long. `VALIDATION-R03`
  - vérifiable : pour tout état d'erreur affiché, on peut nommer la contrainte, le validateur, le verdict, le message et l'entrée de résumé correspondants
- **[loi]** **le verdict est l'unité, et il existe indépendamment du rendu.** Il porte au minimum un code stable, le champ ou groupe concerné, sa source, sa gravité et son message. Un statut visuel en DÉCOULE ; il n'en tient jamais lieu. `VALIDATION-R04`
  - vérifiable : l'état d'erreur d'un contrôle est calculable sans lire aucune couleur, classe ou attribut de présentation
- **[préférence]** **une erreur n'est jamais un style choisi.** Un état d'erreur posé sans verdict est un défaut, y compris s'il est visuellement juste : rien ne garantit qu'une donnée le justifie, et rien ne le fera disparaître à la correction. Seule exception nommée : une **fixture de présentation** — documentation ou démonstration d'un état isolé — qui doit se déclarer comme telle. `VALIDATION-R05`
  - vérifiable : aucun contrôle de formulaire d'une interface réelle ne reçoit un statut d'erreur non dérivé d'un verdict
- **[loi]** **cinq états, et ils ne sont pas interchangeables.** `pristine` (rien n'a été vérifié), `validating` (un verdict est attendu), `valid`, `invalid`, `warning`. **`pristine` n'est pas `valid`** : l'absence de verdict ne prouve rien, et traiter un champ jamais vérifié comme correct est la façon la plus courante de laisser passer une soumission fautive. `VALIDATION-R06`
  - vérifiable : un contrôle jamais validé se distingue, dans l'état du système, d'un contrôle validé avec succès
- **[loi]** **`error` bloque, `warning` non.** `error` signifie que la valeur ne peut pas être acceptée ; `warning` qu'elle reste acceptable mais mérite l'attention. Un avertissement qui empêche d'avancer est une erreur mal nommée — et une erreur présentée comme un avertissement est un piège. `VALIDATION-R07`
  - vérifiable : aucune soumission n'est refusée sur la seule présence d'un verdict d'avertissement
- **[loi]** **quatre sources, une seule autorité finale.** Un verdict vient d'une contrainte native, d'un schéma applicatif, d'une règle métier ou du serveur. Le design system NORMALISE et PRÉSENTE ces verdicts ; il n'invente aucune contrainte métier. En cas de contradiction, **le serveur fait foi** et son verdict REMPLACE celui du client — il ne s'empile jamais avec lui. `VALIDATION-R08`
  - vérifiable : chaque verdict porte sa source ; un verdict serveur sur un champ remplace le verdict client au lieu de s'y ajouter
- **[loi]** **la validation cliente n'est jamais une garantie de sécurité.** Elle sert la récupération de l'utilisateur, pas la protection du système. Aucune règle de ce document ne dispense d'une validation serveur, et aucune interface ne doit laisser croire le contraire. `VALIDATION-R09`
  - vérifiable : toute contrainte appliquée côté client est également appliquée côté serveur
- **[loi]** **le message affiché sous le champ et celui du résumé sont le MÊME objet.** Deux textes pour un même problème divergent dès la première correction, et l'utilisateur qui suit un lien de résumé ne retrouve pas ce qu'il a lu. `VALIDATION-R10`
  - vérifiable : le texte du message local et celui de l'entrée de résumé correspondante sont identiques
- **[préférence]** **un champ peut violer plusieurs contraintes ; l'interface en montre UNE.** Empiler « Champ requis / Format incorrect / Valeur inconnue / Erreur serveur » ne dit pas quoi faire : ça dit que tout est faux. Le verdict retenu est celui de la contrainte la plus fondamentale — une erreur précise et réparable à la fois. `VALIDATION-R11`
  - vérifiable : aucun contrôle n'affiche simultanément plusieurs messages d'erreur
- **[préférence]** **la priorité est déterministe et documentée**, jamais l'ordre d'arrivée des validateurs. Deux exécutions sur les mêmes données donnent le même message. L'ordre retenu par ce système : gravité (erreur avant avertissement), puis source (serveur → métier → schéma → natif), puis, à source native égale, la contrainte la plus structurelle d'abord — le navigateur n'a pas pu lire la valeur, puis elle est absente, puis sa nature est fausse, puis sa forme, puis sa taille, puis son domaine numérique. `VALIDATION-R12`
  - vérifiable : deux exécutions de la validation sur des données identiques produisent le même message
- **[loi]** **un verdict porte sur une valeur ; quand elle change, il cesse de faire autorité — pas de s'afficher.** Un verdict rendu sur une saisie qui n'existe plus ne peut plus rien affirmer : il n'oppose plus rien à la soumission. Mais il **reste lisible** jusqu'à ce que le champ soit re-jugé. Retirer le message au premier caractère retire l'instruction au moment précis où elle sert : quelqu'un qui arrive d'un lien du résumé doit pouvoir lire ce qu'il corrige *pendant* qu'il le corrige. `VALIDATION-R13`
  - vérifiable : après modification d'une valeur, le verdict antérieur n'entre plus dans la décision de soumettre, et son message reste visible tant que le champ n'a pas été re-jugé
- **[loi]** **la disparition visuelle d'une erreur ne vaut pas validité.** Un formulaire se déclare soumissible sur l'état de ses verdicts, jamais sur l'absence de message à l'écran ni sur une classe de présentation. Un verdict `validating` n'est pas un refus : c'est une attente, et elle se dit. `VALIDATION-R14`
  - vérifiable : la décision de soumettre est calculable à partir des seuls verdicts, sans lire le DOM rendu
