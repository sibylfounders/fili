---
sujet: link
nature: components
resume: "Un lien promet une destination."
selon-contexte: [border, card, emotion, iconography, interaction, motion, voice]
source: LINK-UX.md v1.1.0 + LINK-UI.md v1.1.0
empreinte: sha256:33d4886261f0e2a2
regles: {loi: 0, preference: 0, non_qualifie: 31}
---
# RULES — link (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** utiliser un Link pour conduire vers une autre page, ressource, section ou URL.
- **[non qualifié]** utiliser un Button quand l'activation modifie l'état courant, soumet, crée, supprime, ouvre
- **[non qualifié]** un lien qui ouvre une modale d'action est une mauvaise promesse ; un bouton qui conduit vers
- **[non qualifié]** dans un paragraphe, le lien reste identifiable sans dépendre de la couleur seule. Le
- **[non qualifié]** le libellé garde du sens hors contexte immédiat. « En savoir plus » seul est évité quand
- **[non qualifié]** un lien placé seul peut associer texte et icône directionnelle. Il reste plus léger qu'un
- **[non qualifié]** les liens de navigation identifient la destination courante avec un signal non chromatique
- **[non qualifié]** un téléchargement annonce la nature du fichier et, quand elle est utile, sa taille.
- **[non qualifié]** l'ouverture d'un nouvel onglet reste exceptionnelle et est annoncée dans le libellé ou par
- **[non qualifié]** default, hover, focus, active et visited restent distinguables quand ils s'appliquent.
- **[non qualifié]** `visited` sert surtout aux collections de contenu où se souvenir des pages consultées aide la
- **[non qualifié]** un lien n'a normalement pas d'état disabled. Si la destination n'est pas disponible, le lien
- **[non qualifié]** une icône leading décrit la ressource ; une icône trailing décrit la direction ou la nature
- **[non qualifié]** un lien icône seule conserve une cible tactile suffisante et un nom accessible. Sa forme ne
- **[non qualifié]** une Card cliquable vers un détail contient un vrai Link dont le texte accessible est le titre
- **[non qualifié]** les actions internes à la Card restent hors du lien et conservent leur propre sémantique.
- **[non qualifié]** le texte décrit la destination ou la ressource : « Voir les factures », « Documentation de
- **[non qualifié]** le contexte accessible permet de comprendre la fonction du lien. Plusieurs liens portant le
- **[non qualifié]** ces règles de wording sont la déclinaison locale de `VOICE-UX.md`, cadre unificateur du
- **[non qualifié]** **un Link dit “aller”, un Button dit “faire”.** Le poids visuel ne change jamais cette
- **[non qualifié]** Link n'invoque aucun instrument E-motion : un clic de navigation est une action à haute
