---
sujet: interaction
nature: languages
resume: "Ce langage définit comment un élément communique son **rôle** avant même que son libellé soit"
selon-contexte: [adaptive, border, button, elevation, motion]
source: INTERACTION-UX.md v1.1.0 + INTERACTION-UI.md v1.1.0
empreinte: sha256:0db4d67e205ecc67
regles: {loi: 0, preference: 0, non_qualifie: 33}
---
# RULES — interaction (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** **une interface doit pouvoir être comprise avant d'être lue.** La forme, la structure, la
- **[non qualifié]** ce principe ne remplace jamais le texte accessible. « Reconnaître avant de lire » réduit
- **[non qualifié]** le rôle précède le style. Le composant se choisit d'après ce qui se produit :
- **[non qualifié]** deux éléments qui se ressemblent et réagissent de la même façon doivent promettre le même
- **[non qualifié]** la sémantique native suit l'intention — un bouton reste un bouton, un lien reste un lien, un
- **[non qualifié]** un contrôle manipulable possède une limite et des états perceptibles. Cette présence peut
- **[non qualifié]** une action de faible poids peut être visuellement discrète, mais elle ne devient jamais un
- **[non qualifié]** un champ délimite clairement l'endroit où la valeur sera reçue. Son label, sa bordure, son
- **[non qualifié]** « réceptif » décrit une fonction, pas un effet imposé. Une ombre interne peut soutenir cette
- **[non qualifié]** une Card statique reste calme. Une Card cliquable reçoit une cible réelle et des signaux
- **[non qualifié]** l'ombre indique une relation spatiale ou un changement d'état ; elle ne décore pas. La
- **[non qualifié]** action, navigation, erreur, sélection et focus restent compréhensibles sans perception de la
- **[non qualifié]** repos, hover, focus, active, loading et disabled sont distincts quand ils existent. Le
- **[non qualifié]** le focus clavier est un état à part entière, jamais une imitation du hover. L'active peut
- **[non qualifié]** la matérialité est **proportionnelle au besoin de compréhension**, pas à l'importance
- **[non qualifié]** un effet visuel est conservé seulement s'il répond à une question vérifiable :
- **[non qualifié]** si l'effet ne répond à aucune de ces questions, il est décoratif et ne fait pas partie du
- **[non qualifié]** le système évite le neumorphisme et le glassmorphism comme langage par défaut : ils rendent la
- **[non qualifié]** un même rôle conserve ses signaux essentiels dans tous les contextes. Une action principale
- **[non qualifié]** l'adaptation à l'espace ne change jamais la nature du résultat. `ADAPTIVE-UX.md` peut
- **[non qualifié]** la cohérence ne signifie pas uniformité. Button, Link, Input et Card ont justement des
- **[non qualifié]** le langage reste opérant au clavier, au toucher, au zoom, en contraste forcé, sans hover et
- **[non qualifié]** une icône seule conserve un nom accessible ; un changement d'état conserve un libellé ou un
- **[non qualifié]** l'apparence cohérente accompagne une identification cohérente : un composant ayant la même
- **[non qualifié]** toute nouvelle famille de composants passe ces quatre questions :
