---
sujet: voice
nature: languages
resume: "Ce fichier contient le raisonnement : quelle est la voix du produit, comment le ton s'adapte à l'utilisateur, pourquoi le mot est le canal d'information le plus fiable du système."
selon-contexte: [alert, button, card, color, emotion, form, iconography, input, laws, motion, typography]
source: VOICE-UX.md v1.3.1 + VOICE-UI.md v1.2.0
empreinte: sha256:b030de4474fdcbc5
regles: {loi: 25, preference: 10, non_qualifie: 0}
---
# RULES — voice (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** La voix du produit reste constante d'une surface à l'autre tandis que le ton s'ajuste à l'état de la personne qui lit (routine, erreur, panne, succès, attente, destruction). `VOICE-R02`
  - source : https://styleguide.mailchimp.com/voice-and-tone/
- **[préférence]** Le registre du produit est productif et non expressif : clarté, précision et sobriété, sans humour d'apparat, superlatif marketing ni sur-célébration. `VOICE-R03`
- **[préférence]** Le relèvement de registre ne s'étend jamais à une erreur, à une action destructive ni à une action fréquente ou réflexe : ces cas restent strictement productifs. `VOICE-R06`
- **[loi]** Le texte est le canal d'information de dernier recours du système : toute information portée par la couleur, le mouvement ou la forme reste disponible en mots, car le mot survit à la couleur coupée, au mouvement coupé, à l'icône incomprise et au lecteur d'écran. `VOICE-R07`
  - vérifiable : toute information portée par la couleur, le mouvement ou l'icône dispose d'un équivalent textuel
  - source : https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html
- **[loi]** Le libellé d'un lien ou d'un bouton se comprend hors de son contexte : il nomme la destination ou la conséquence de l'action, jamais une formule générique. `VOICE-R08`
  - vérifiable : aucun libellé de lien ou de bouton réduit à une formule générique (« cliquez ici », « en savoir plus », « OK »)
  - source : https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html
- **[loi]** L'écriture d'interface dit la chose la plus simple qui soit vraie : phrases courtes, voix active, un sujet par phrase, le mot courant plutôt que le mot savant. `VOICE-R09`
  - source : https://www.nngroup.com/articles/plain-language-experts/
- **[loi]** Aucun jargon technique, code d'erreur ni sigle interne n'est exposé à l'utilisateur, et un acronyme inévitable est développé à sa première occurrence. `VOICE-R10`
  - source : https://www.nngroup.com/articles/error-message-guidelines/
- **[loi]** La concision retire les mots vides et jamais l'information nécessaire : elle ne justifie pas de supprimer la cause d'un problème ni le moyen de le corriger. `VOICE-R11`
  - source : https://www.nngroup.com/articles/plain-language-experts/
- **[préférence]** Le système tient une table de correspondance entre l'état de la personne et le ton employé, qui fixe notamment un succès routinier bref et factuel, sans félicitation ni célébration. `VOICE-R12`
- **[loi]** Un message d'erreur ne qualifie jamais la personne : il décrit en texte l'écart constaté et la correction attendue, et le produit prend à son compte les défaillances système. `VOICE-R13`
  - vérifiable : toute erreur détectée est décrite en texte ; aucun message n'emploie de terme qualifiant la personne ou sa saisie (invalide, incorrect, illégal)
  - source : https://www.nngroup.com/articles/error-message-guidelines/
- **[loi]** La voix ne change pas d'un écran à l'autre : ni familiarité soudaine, ni formalisme intermittent. `VOICE-R14`
  - source : https://styleguide.mailchimp.com/voice-and-tone/
- **[loi]** Un concept est désigné par un seul mot dans toute l'interface, et ce mot ne désigne pas un autre concept ailleurs. `VOICE-R15`
  - vérifiable : chaque concept du lexique n'apparaît que sous le mot retenu, à l'exclusion de ses synonymes écartés
  - source : https://www.gov.uk/guidance/content-design/writing-for-gov-uk
- **[loi]** Le niveau de lecture visé reste bas, au service de l'accessibilité cognitive et des personnes non natives ; aucun seuil chiffré n'est fixé à ce jour, et cette absence est une position assumée. `VOICE-R16`
  - source : https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html
- **[loi]** Le texte d'interface s'écrit traduisible : aucune phrase construite par concaténation de fragments à l'exécution, aucune longueur codée en dur, et pas d'idiome ni de jeu de mots qui ne franchisse pas les langues. `VOICE-R17`
  - vérifiable : aucune chaîne d'interface assemblée par concaténation ; les variables passent par des paramètres nommés dans une chaîne complète
  - source : https://www.w3.org/International/articles/article-text-size
- **[loi]** Le mot descriptif porte l'accessibilité non visuelle — texte alternatif utile, nom accessible qui dit l'action, texte de lien signifiant — et le nom accessible d'un contrôle contient le texte visible de son libellé. `VOICE-R18`
  - vérifiable : le nom accessible contient le texte visible du libellé
  - source : https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html
- **[loi]** Le mot porte l'information quand les autres canaux tombent : il l'énonce sans blâmer, dans un vocabulaire constant, la clarté primant sur l'élégance. `VOICE-R20`
  - source : https://www.nngroup.com/articles/error-message-guidelines/

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Message qui blâme l'utilisateur | Honte, abandon, perte de confiance (pic négatif, Peak-End) | Élevée |
| Erreur générique non actionnable (« Une erreur est survenue ») | Utilisateur bloqué sans issue — charge de résolution reportée (Tesler) | Élevée |
| Information portée par le style seul (rouge sans le mot) | Exclusion daltonisme / lecteur d'écran (WCAG 1.4.1) | Critique |
| Texte de lien/bouton non signifiant (« cliquez ici », « OK ») | Navigation lecteur d'écran cassée (WCAG 2.4.4) | Élevée |
| Jargon ou code technique brut exposé | Exclusion des non-experts, incompréhension | Moyenne à élevée |
| Vocabulaire incohérent (un concept, plusieurs mots) | Incertitude, l'utilisateur doute que ce soit la même action | Moyenne |
| Voix qui change de personnalité entre écrans | Produit perçu comme disparate, méfiance | Moyenne |
| Concaténation de fragments / longueur codée en dur | Traduction cassée, texte tronqué | Moyenne (élevée si multilingue) |
| Sur-promesse ou sur-célébration marketing dans l'UI produit | Ton faux, décalage avec le registre productif | Moyenne |

## Non couvert — poser la question, ne rien trancher

- Consentement / mentions : Un consentement ou une mention légale s'affiche.
- Sens de lecture (RTL) : Une langue se lit de droite à gauche.
