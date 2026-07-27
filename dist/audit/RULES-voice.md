---
sujet: voice
nature: languages
resume: "Ce fichier contient le raisonnement : quelle est la voix du produit, comment le ton s'adapte à l'utilisateur, pourquoi le mot est le canal d'information le plus fiable du système."
selon-contexte: [alert, button, card, color, emotion, form, iconography, input, laws, motion, typography]
source: VOICE-UX.md v1.3.1 + VOICE-UI.md v1.2.0
empreinte: sha256:3f3758fc913d13bb
regles: {loi: 0, preference: 0, non_qualifie: 43}
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

- **[non qualifié]** la voix est un **langage de contenu** — pas de variantes visuelles, pas d'assemblage, pas de token de valeur : une grammaire transversale sur tout ce que le produit *dit*. Elle se scinde en deux couches : le **principe de voix** (stable, ce fichier — ce qu'est le produit quand il parle) et le **lexique + les mécaniques** (changeants avec la marque ou le produit, `VOICE-UI.md` — les mots exacts, la casse, les formats). Une voix qui référence des principes survit à un changement de marque ; un texte qui code en dur ses tournures meurt avec lui.
- **[non qualifié]** la voix porte **un quasi-axe** propre aux langages — le **ton varie selon l'état émotionnel de l'utilisateur** (routine, erreur, panne, succès, attente, destruction). C'est la distinction classique **voix vs ton** : la voix est *constante* (la personnalité du produit ne change pas d'un écran à l'autre), le ton s'*ajuste* (on ne parle pas d'un échec de paiement comme d'un succès d'inscription). Le § « Le ton suit l'utilisateur » tient lieu de table d'axes.
- **[non qualifié]** **le registre de ce produit est productif, pas expressif** — reprise littérale de MOTION-UX. Clarté, précision, sobriété ; pas d'humour d'apparat, pas de superlatif marketing, pas de sur-célébration. Le produit parle comme un collègue compétent et calme, pas comme une marque qui vend. Toute exception (surface marketing) se journalise et se cadre à part.
- **[non qualifié]** **distinguer la contrainte du parti pris (1.1.0)** — comme MOTION. Les contraintes (ne jamais blâmer, texte de lien signifiant WCAG 2.4.4, jamais l'information par le style seul, plain language accessible) ne se négocient pas ; le registre « productif, pas expressif » est un **parti pris d'identité paramétrable** — une surface marketing assumée peut relever le registre sans toucher aux contraintes d'accessibilité et d'anti-blâme. **Lecture d'audit (pivot 2026-07-21)** : face à une interface tierce, ce parti pris se lit comme un **paramètre relevable, jamais comme un défaut** — un « Parfait ! » chez un hôte au registre expressif assumé est une *divergence de registre* à signaler à part, pas une non-conformité ; seules les contraintes fondent un constat.
- **[non qualifié]** **`EMOTION-UX.md` est l'unique exception cadrée au registre productif, et ce langage l'autorise explicitement.** Jusqu'ici l'autorisation n'existait que du côté d'E-motion (« Autorité : RULES-voice.md ») sans être réciproquée ici — un agent qui charge Voice sans E-motion n'avait aucun moyen de le savoir. Sur les moments mérités du catalogue d'E-motion (réussite d'un envoi, première fois, cap franchi, sortie d'erreur, vide avec personnalité) — et seulement ceux-là — le microcopy de résolution peut se réchauffer d'un cran : un émoji ponctuel et une formulation plus chaleureuse deviennent possibles (« C'est parti ✈️ » plutôt que « Envoyé »). Voice ne redéfinit pas cette exception, il la borne : E-motion reste gouverné par son propre catalogue fermé et son budget de rareté.
- **[non qualifié]** **l'exception ne s'étend jamais** à une erreur (utilisateur ou système), à une action destructive, ni à une action fréquente ou réflexe — ces cas restent strictement dans le registre productif (bannis : « Oups », emoji, « ! »). Une exception positive et rare n'est pas une porte vers l'expressif généralisé ; hors du catalogue d'E-motion, le § « Le ton suit l'utilisateur » ci-dessous fait seul autorité.
- **[non qualifié]** **la règle cardinale de ce langage** — le texte est le **seul canal d'information qui survit à tout** : à la couleur coupée (daltonisme, forced-colors), au mouvement coupé (reduced-motion), à l'icône non comprise, au lecteur d'écran. Quand COLOR-UX dit « jamais la couleur seule », MOTION-UX « le mouvement n'informe jamais seul », ICONOGRAPHY-UX « jamais le dessin seul » — **le canal redondant qu'ils invoquent tous, c'est le mot.** Ce langage est donc le socle de la redondance de tout le système.
- **[non qualifié]** **le texte de lien et de bouton se suffit hors contexte.** « Cliquez ici », « En savoir plus », « OK » échouent : un lecteur d'écran qui liste les liens de la page, ou un utilisateur qui scanne, ne voit pas le contexte autour. Le libellé dit *où il mène* ou *ce qu'il fait* (WCAG 2.4.4 ; renvoi BUTTON-UX § Wording : « un verbe qui décrit la conséquence bat un label générique »).
- **[non qualifié]** **dire la chose la plus simple qui soit vraie.** Phrases courtes, voix active, un sujet par phrase, le mot courant plutôt que le mot savant. On écrit pour être compris du premier coup, pas pour paraître sérieux.
- **[non qualifié]** **pas de jargon exposé à l'utilisateur.** Les termes techniques, codes d'erreur et sigles internes restent dans les logs et le support ; l'utilisateur lit une phrase humaine. Un acronyme inévitable se développe à sa première occurrence.
- **[non qualifié]** **concision, mais pas au prix de la clarté.** On coupe les mots vides (« veuillez noter que », « afin de pouvoir »), pas l'information nécessaire. La concision sert la lisibilité (LAWS : Cognitive Load) ; elle ne justifie jamais de retirer le *pourquoi* ou le *comment corriger* d'un message.
- **[non qualifié]** **la voix ne change pas, le ton s'ajuste à l'état émotionnel.** Table de correspondance — c'est la structure d'axes de ce langage :
- **[non qualifié]** **ne jamais blâmer l'utilisateur — règle cardinale du ton.** L'erreur est une information, pas un reproche. On décrit l'écart et la correction (« Le format attendu est JJ/MM/AAAA »), on ne qualifie pas l'utilisateur (« saisie invalide », « vous n'avez pas rempli… »). Quand la faute est côté système, le produit la prend à son compte.
- **[non qualifié]** **la voix est constante d'un écran à l'autre.** Pas de familiarité soudaine, pas de formalisme qui va et vient. Un utilisateur reconnaît le produit à sa manière de parler comme à ses couleurs (Gestalt/similarité, LAWS).
- **[non qualifié]** **un concept = un mot, partout.** « Supprimer » ne devient pas « Effacer » puis « Retirer » selon l'écran. Le lexique contrôlé vit dans `VOICE-UI.md` ; le principe est ici — c'est la version écriture des registres étanches de COLOR (une couleur = un sens ; un mot = un sens).
- **[non qualifié]** **le niveau de lecture reste bas par choix.** Plain language sert d'abord l'accessibilité cognitive (WCAG 3.1.5, AAA, vise un niveau collège) et les non-natifs. Aucun niveau chiffré n'est encore fixé pour ce produit — position explicite, pas oubli (cf. À approfondir).
- **[non qualifié]** **écrire pour être traduisible, même monolingue.** Ne jamais **concaténer** des fragments de phrase par du code (l'ordre des mots change d'une langue à l'autre) ; ne pas coder la longueur en dur (certaines langues s'allongent ~30 %) — c'est un renvoi vers `measure` et vers la mécanique de troncature de VOICE-UI. Éviter les idiomes, l'humour et les jeux de mots qui ne franchissent pas les langues.
- **[non qualifié]** **le mot descriptif porte l'accessibilité non visuelle** — texte alternatif utile (pas « image »), `aria-label` qui dit l'action, texte de lien signifiant. C'est la même exigence que la redondance de COLOR, côté lecteur d'écran.
- **[non qualifié]** **le mot est le seul canal qui ne tombe jamais — il porte donc l'information, calmement, sans blâmer, dans un vocabulaire constant.** Voix stable, ton ajusté à l'utilisateur, clarté avant élégance.

## Non couvert — poser la question, ne rien trancher

- Consentement / mentions : Un consentement ou une mention légale s'affiche.
- Sens de lecture (RTL) : Une langue se lit de droite à gauche.
