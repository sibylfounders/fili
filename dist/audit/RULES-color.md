---
sujet: color
nature: foundations
resume: "Ce fichier contient le raisonnement : rôles, registres, redondance, contraste, theming."
selon-contexte: [alert, button, card, elevation, form, input, link]
source: COLOR-UX.md v1.2.0 + COLOR-UI.md v1.2.0
empreinte: sha256:2dcc6214f79cb3ce
regles: {loi: 0, preference: 0, non_qualifie: 24}
---
# RULES — color (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[non qualifié]** la couleur est une **fondation** — pas de variantes propres, pas d'assemblage : une contrainte transversale que tous les composants consomment. Le modèle à axes ne s'applique pas.
- **[non qualifié]** la fondation sépare deux choses qui ne doivent jamais se confondre — c'est la structure de ce fichier :
- **[non qualifié]** la palette se lit en **trois registres étanches** :
- **[non qualifié]** **aucune couleur ne change de registre selon le contexte.** Jamais `primary` ou `accent` pour un état sémantique (guardrail fondateur de DESIGN.md) ; jamais `danger` pour "du rouge décoratif" ; l'inverse aussi — le tone info de l'alert a reçu son propre `info` plutôt que d'emprunter `accent`, alors que les deux sont des bleus.
- **[non qualifié]** **le registre marque tient en trois rôles fonctionnels — `primary`, `secondary`, `accent` — et pas un de plus par simple envie de décor.** Une identité traversée d'une teinte supplémentaire purement décorative (le magenta d'une maquette, sans rôle d'action ni de focus) n'a **pas** de slot, et n'en reçoit pas un : un token naît d'un besoin réel, jamais d'une couleur « à caser » (ce serait la porte ouverte au « primary partout » que le système s'interdit). **Position (1.1.0) : les identités multi-teintes décoratives sortent du périmètre.** Le jour où une teinte de marque supplémentaire porte un vrai rôle fonctionnel récurrent, elle entrera comme rôle nommé (avec son couple on-*), pas comme aplat libre.
- **[non qualifié]** chaque registre a son niveau d'expression — les sémantiques existent en **couple** texte/fond subtil (`danger`/`danger-subtle`), les neutres en **échelle** (primary > secondary > muted pour le texte). Toute nouvelle valeur sémantique fournit son couple complet d'emblée (règle héritée de BUTTON-UI : `_bg`/`_text`/`_fg` dès la création).
- **[non qualifié]** l'information ne repose **jamais sur la couleur seule** — WCAG 1.4.1, la règle d'accessibilité cardinale de cette fondation.
- **[non qualifié]** chaque usage sémantique de la couleur déclare son **canal redondant** : l'icône par tone de l'alert (silhouettes distinctes), le mot "Erreur" de l'input, la coche de l'état sélectionné de la card. Le canal redondant ne se retire pas pour alléger.
- **[non qualifié]** **4.5:1** pour le texte courant (WCAG 1.4.3), **3:1** pour tout état visible et composant d'interface (WCAG 1.4.11) — seuils déjà inscrits dans DESIGN.md, appliqués par quatre recalibrages successifs (accent, danger, warning, border-strong en 1.3.0 ; success en 1.4.0), vérifiés par `tools/test-rendu.js` à chaque régénération.
- **[non qualifié]** le contraste se vérifie **par paire** — un token de texte n'est pas "conforme" dans l'absolu, il l'est *sur un fond donné*. Chaque token de texte de ce système déclare ses fonds d'usage (le mapping vit dans COLOR-UI.md).
- **[non qualifié]** nuance sourcée — WCAG 1.4.11 **exempte le hover** ("l'état hover n'est pas requis pour identifier le composant") ; ce système teste quand même ses couples au hover, par choix : un hover illisible reste un hover raté, même conforme.
- **[non qualifié]** `text-muted` (2.54:1 sur blanc) est **réservé aux métadonnées accessoires** — jamais du texte fonctionnel courant. Précédent journalisé : le compteur de caractères de l'input a dû quitter text-muted (F01).
- **[non qualifié]** les états interactifs sont **tokenisés, pas improvisés** : famille `*-hover` (fond assombri d'un cran pour les fonds pleins, `surface-hover` apparaissant pour les styles sans fond au repos, stroke et ghost), `accent` pour le focus ring — mapping par composant dans les `*-UI.md`.
- **[non qualifié]** l'état **disabled n'a pas de tokens** — dette assumée, désormais documentée *ici* plutôt qu'en marge de BUTTON-UI : WCAG exempte les composants inactifs du contraste minimum (exception explicite de 1.4.3), et aucun consommateur n'a encore de vrai besoin (FORM-UX a même retiré le disabled de la validation). Conditions de sortie de la dette : le jour où un composant documente un état désactivé légitime (traitement asynchrone), créer le couple complet (fond, texte, bordure) en une fois.
- **[non qualifié]** un token = potentiellement N valeurs (une par thème) — c'est la mécanique standard des systèmes à thèmes (Atlassian, Carbon : "impossible d'implémenter un dark mode sans tokens partout"). Ce système n'a qu'un thème ; l'architecture est prête, la décision de produit n'est pas prise.
- **[non qualifié]** **le mode sombre n'est pas couvert — par décision, pas par oubli.** Le jour venu : les rôles ne bougent pas, DESIGN.md gagne une seconde table de valeurs, et les seuils de contraste se re-vérifient intégralement (les ombres et surfaces se repensent aussi, cf. ELEVATION-UX).
- **[non qualifié]** `surface-contrast` n'est **pas** un début de dark mode — c'est un panneau de mise en avant sur page claire (cf. DESIGN.md 1.7.0). Ne pas généraliser son usage en "thème sombre local".
- **[non qualifié]** **contrainte dérivée (dark mode) — un thème sombre ne peut pas avoir un primary sombre.** Les deux seuls textes admis sur `surface-contrast` sont `background` et `on-primary` (paires garanties). Pour qu'un même fond les porte tous deux à 4.5:1, ils doivent tomber du même côté de l'échelle de luminance. En thème clair c'est trivial (les deux valent ~blanc). En thème sombre, `background` devient sombre → `on-primary` doit l'être aussi → **`primary` doit être clair** (un `on-primary` sombre suppose un fond d'action clair). Corollaire démontré : avec un primary sombre, aucun neutre représentable ne tient 4.5:1 à la fois avec un fond quasi-noir et avec le blanc — la fenêtre théorique fait ~8 % d'un cran 8-bit (le meilleur compromis plafonne à 4.50:1 des deux côtés). `surface-contrast` devient alors un panneau *clair* de mise en avant. La table des paires (COLOR-UI) n'est « prête pour N thèmes » qu'assortie de cette règle dérivée — sinon chaque consommateur la redécouvre par l'échec.
- **[non qualifié]** une identité peut vouloir des neutres **teintés** (gris chauds, gris bleutés) accordés à sa marque plutôt que des gris purs. Le système bénit une méthode sûre : **teinter un neutre à luminance WCAG constante**. Le contraste ne dépendant que de la luminance relative, déplacer uniquement la teinte (et la saturation) en gardant la luminance identique ne change **aucun** rapport de contraste — l'opération est gratuite côté accessibilité, et la barrière reste verte par construction.
- **[non qualifié]** mise en œuvre — convertir en OKLCh, fixer L, poser la teinte cible (reprise d'une couleur du thème : surface, accent), puis **recaler L par dichotomie** jusqu'à retrouver la luminance WCAG d'origine (l'aller-retour d'espace introduit une dérive infime, à corriger). C'est une transformation des **valeurs** dans DESIGN.md — aucun nom, aucune règle ne bouge. Vérifiée sur le stress-test 2026-07-17 : les trois thèmes restent conformes après teinte.
- **[non qualifié]** quand l'OS force ses couleurs (mode contraste élevé Windows), les tokens sont **remplacés d'office** — fonds subtils aplatis, la palette disparaît. Règle minimale de ce système : ne jamais neutraliser ce mode (`forced-color-adjust: none` interdit par défaut), et s'appuyer sur ce qui **survit** — la sémantique HTML, les bordures, le texte. C'est une raison de plus pour les canaux redondants : l'icône et le mot restent quand la couleur tombe.
- **[non qualifié]** règle-frontière, aucun consommateur à ce jour (la card interdit le texte dans le media) : du texte posé sur une image **imprévisible** ne peut garantir aucun contraste. Deux issues admises le jour venu : un voile de contraste entre l'image et le texte, ou le texte hors du media. Jamais de texte nu sur image libre.
- **[non qualifié]** **le voile n'est pas un effet, c'est un calcul (méthode bénie, 1.1.0).** L'obligation « voile de contraste » ne se règle pas à l'œil (trop de voile tue l'image, trop peu casse le texte à certains formats seulement). Méthode : (1) échantillonner le **pire pixel** derrière chaque zone de texte (canvas) ; (2) calculer l'alpha de voile minimal pour que le texte tienne 4.5:1 sur ce pixel ; (3) **revérifier à plusieurs formats de viewport** — le cadrage (`background-position`, recadrage responsive) déplace le pire pixel et peut faire passer le voile requis du simple au double. Le cadrage, pas le voile, est souvent le vrai problème : un viewport court peut recadrer une crête claire pile derrière le titre.
- **[non qualifié]** **la couleur s'applique par rôle, jamais par valeur — et un rôle ne porte jamais deux sens.**

## Non couvert — poser la question, ne rien trancher

- Couleur désactivée (disabled) : Un contrôle est désactivé.
- Scrim / voile de superposition : Un fond s'assombrit derrière une modale.
- Couleur de sélection (texte surligné, item sélectionné) : Du texte ou un item est sélectionné.
- Texte sur photo/media : Du texte se pose sur une image imprévisible.
- Dataviz / graphiques : Une palette de graphiques.
- Mode sombre (dark mode) : L'interface passe en thème sombre.
- Contraste élevé forcé (forced-colors / high contrast) : L'OS force ses propres couleurs.
- Impression : Le contenu est imprimé.
- Sémantique divergente entre produits (rouge = danger vs solde négatif) : Un métier détourne le rouge.
