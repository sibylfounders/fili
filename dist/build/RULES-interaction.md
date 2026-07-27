---
sujet: interaction
nature: languages
resume: "Ce langage définit comment un élément communique son **rôle** avant même que son libellé soit"
selon-contexte: [adaptive, border, button, elevation, motion]
source: INTERACTION-UX.md v1.1.0 + INTERACTION-UI.md v1.1.0
empreinte: sha256:342cae56181eaa03
regles: {loi: 19, preference: 13, non_qualifie: 0}
---
# RULES — interaction (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[préférence]** Une interface se comprend avant d'être lue : la forme, la structure, la position et les états annoncent le rôle d'un élément, et le libellé ne fait que préciser ensuite l'intention. `INTERACTION-R01`
- **[loi]** Le fait de reconnaître un rôle avant de lire ne dispense jamais du texte accessible : aucun pictogramme ambigu ni aucun contrôle dépourvu de nom n'est admis. `INTERACTION-R02`
- **[préférence]** Le système reconnaît six intentions — agir, naviguer, saisir, choisir, consulter, comprendre un état — et le composant se choisit d'après l'intention et le résultat produit, jamais d'après le style souhaité. `INTERACTION-R03`
- **[loi]** Deux éléments qui se ressemblent et réagissent de la même façon promettent le même type de résultat, et deux rôles différents ne sont jamais rendus indiscernables. `INTERACTION-R04`
- **[loi]** La sémantique native suit l'intention : une action est portée par un bouton, une navigation par un lien avec destination, une saisie par un champ, et le style ne transforme jamais l'un en l'autre. `INTERACTION-R05`
- **[loi]** Un contrôle manipulable possède une limite et des états perceptibles ; cette présence peut venir d'un fond, d'une bordure, d'une forme, d'une position ou d'une réaction, et n'exige pas une ombre. `INTERACTION-R06`
- **[loi]** Une action de faible poids peut être visuellement discrète mais ne prend jamais l'apparence d'un lien : la hiérarchie module la présence, elle n'efface pas le rôle. `INTERACTION-R07`
- **[loi]** Une zone de saisie délimite clairement l'endroit où la valeur sera reçue : son label, sa limite, son contenu et son focus la distinguent d'un bouton comme d'une simple surface. `INTERACTION-R08`
- **[préférence]** Le caractère réceptif d'une zone de saisie décrit une fonction et non un effet imposé : une ombre interne peut soutenir cette lecture dans un thème, mais elle n'est ni universelle ni suffisante. `INTERACTION-R09`
- **[loi]** Une surface qui organise du contenu ne promet pas de clic : une surface cliquable reçoit une cible réelle et des signaux d'interaction supplémentaires, une surface statique ne copie jamais l'apparence d'un contrôle. `INTERACTION-R10`
- **[préférence]** L'ombre indique une relation spatiale ou un changement d'état et ne décore jamais ; les niveaux d'élévation et leurs usages restent la propriété de la fondation elevation. `INTERACTION-R11`
- **[loi]** L'action, la navigation, l'erreur, la sélection et le focus restent compréhensibles sans perception de la couleur : le mot, la forme, la bordure, l'icône ou la position fournissent au moins un second canal. `INTERACTION-R12`
- **[loi]** Les états de repos, de survol, de focus, d'activation, de chargement et d'indisponibilité sont distincts lorsqu'ils existent ; le changement d'état confirme ce qui arrive et ne révèle jamais tardivement qu'un élément était interactif. `INTERACTION-R13`
- **[loi]** Le focus clavier est un état à part entière et jamais une imitation du survol ; l'état d'activation peut donner une sensation de pression, mais celle-ci reste subordonnée à la visibilité du focus, au contraste et à la préférence de mouvement réduit. `INTERACTION-R14`
- **[préférence]** La matérialité d'un élément est proportionnelle au besoin de compréhension et jamais à son importance commerciale : elle sert d'abord à distinguer un contrôle, un réceptacle, une surface et une superposition. `INTERACTION-R15`
- **[préférence]** Un effet visuel n'est conservé que s'il répond à une question vérifiable sur l'élément : est-il manipulable, reçoit-il une information, organise-t-il du contenu, appartient-il à une couche temporaire, son état vient-il de changer. `INTERACTION-R16`
- **[préférence]** Un effet qui ne répond à aucune de ces questions est décoratif et ne fait pas partie du langage d'interaction. `INTERACTION-R17`
- **[préférence]** Le neumorphisme et le glassmorphism ne sont pas des langages par défaut du système, parce qu'ils font dépendre la compréhension d'effets fragiles, coûteux et insuffisamment contrastés ; un usage ponctuel hors composant reste possible si l'accessibilité et la performance sont démontrées. `INTERACTION-R18`
- **[loi]** Un même rôle conserve ses signaux essentiels dans tous les contextes : une action principale peut changer de taille ou de disposition, elle reste identifiable comme action. `INTERACTION-R19`
- **[loi]** L'adaptation à l'espace disponible ne change jamais la nature du résultat : elle peut réorganiser, condenser ou révéler progressivement, mais elle ne transforme pas une navigation en action. `INTERACTION-R20`
- **[préférence]** La cohérence n'est pas l'uniformité : les rôles qui font des promesses différentes reçoivent des expressions différentes. `INTERACTION-R21`
- **[loi]** Le langage d'interaction reste opérant au clavier, au toucher, au zoom, en couleurs forcées, sans survol et en mouvement réduit : aucun canal fragile — ombre, vibration, couleur, animation — n'est indispensable à la compréhension ou à l'usage. `INTERACTION-R22`
- **[loi]** Une icône seule conserve un nom accessible, un changement d'état conserve un libellé ou un état exposé programmatiquement, et une cible conserve la sémantique native attendue de son rôle. `INTERACTION-R23`
- **[loi]** Un composant qui remplit la même fonction est nommé et représenté de façon constante dans tout le produit : l'apparence cohérente accompagne une identification cohérente. `INTERACTION-R24`

## Consignes d'implémentation

- **[loi]** La présence au repos précède le retour visuel : le survol confirme une cible déjà reconnaissable et ne sert jamais à révéler une cible qui paraissait statique. `INTERACTION-U01`
- **[préférence]** Les transitions d'état utilisent la durée rapide et la courbe de sortie du système, portent sur des propriétés sobres, et deviennent instantanées sous préférence de mouvement réduit sans que le changement cesse d'être visible. `INTERACTION-U02`
- **[préférence]** L'état d'activation peut réduire un décalage ou une ombre déjà justifiée pour donner une sensation de pression ; il ne crée pas d'ombre de repos nouvelle et ne déplace jamais la mise en page. `INTERACTION-U03`
- **[préférence]** L'indicateur de focus est construit sur la géométrie de largeur et de décalage définie par la fondation de bordure, sa couleur appartient au composant propriétaire, et aucun effet tactile ne le remplace. `INTERACTION-U04`
- **[préférence]** Un contrôle indisponible conserve une forme et un rôle perceptibles : la baisse de contraste ne va jamais jusqu'à faire disparaître la limite qui le distingue du contenu. `INTERACTION-U05`
- **[loi]** En mode de couleurs forcées, les bordures, l'indicateur de focus et la sémantique native survivent même lorsque les fonds, les ombres et les reflets sont neutralisés par le système. `INTERACTION-U06`
- **[loi]** Sous un pointeur incapable de survoler, aucune information ni aucune action n'est masquée : le style de survol n'est qu'un renforcement facultatif. `INTERACTION-U07`
- **[loi]** Une implémentation tactile n'intercepte pas les événements natifs du contrôle et respecte l'annulation du pointeur : l'action se déclenche au relâchement sur la cible, et sortir de la cible avant de relâcher l'annule. `INTERACTION-U08`
