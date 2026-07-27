---
component: tabs
layer: ux
type: component
version: 1.0.0 # 1.0.0 : première rédaction — besoin réel : les volets d'une fiche de doctrine (essentiel / cas / spécifications) et les bascules courtes d'un atelier. Motif clavier : ARIA APG « Tabs ». Frontière tranchée avec Accordion (exclusif vs multi-ouvert) et Navigation (changer de vue vs changer de page). Cf. packages/react/src/components/tabs/tabs.tsx.
last_updated: 2026-07-26
companion: TABS-UI.md
confidence: mixed # le motif tablist/tab/tabpanel est établi (ARIA APG) ; le critère de choix auto/manuel et le seuil de débordement sont un raisonnement interne convergent avec les systèmes cités.
---

# Tabs — Couche UX (composant)

> Des onglets **découpent un même objet en vues exclusives** : un seul volet visible à la fois, et
> tous les volets décrivent la **même chose** sous des angles différents (les propriétés d'un même
> produit, les états d'une même fiche). Ce n'est **pas** un Accordion (qui peut tout ouvrir à la
> fois) et ce n'est **pas** une navigation (qui change de page). Réutilisable — la fiche de doctrine
> n'est qu'un usage parmi d'autres.

## Nature et périmètre — quand des onglets sont légitimes

RÈGLE : les onglets s'appliquent à un **seul objet** dont les volets sont des **vues alternatives**,
jamais des sujets distincts. Le test : peut-on dire « voici le même [produit/fiche/dossier], vu sous
l'angle A, B, C » ? Si les volets parlent de choses différentes, ce ne sont pas des vues — c'est un
découpage arbitraire qui emprunte la forme visuelle des onglets sans en avoir la sémantique.

RÈGLE : les onglets **mentent** dans quatre cas fréquents — ne pas les utiliser quand :
- le contenu de deux volets doit être **comparé côte à côte** (un onglet masque ce qu'on veut voir
  en même temps que l'autre — l'utilisateur bascule, oublie, rebascule) ;
- le contenu doit être **cherché au clavier** (Cmd+F/Ctrl+F) — un moteur de recherche de page ne
  voit pas le contenu des volets non montés, et même monté-masqué (`hidden`) il reste invisible ;
- il n'y a **qu'un seul volet** — un onglet unique n'est pas un choix, c'est un habillage inutile ;
  supprimer la tablist et afficher le contenu directement ;
- les « volets » sont en réalité des **étapes** d'un parcours (une suite, pas un choix libre) — c'est
  alors un stepper, pas des onglets : l'ordre est imposé, pas la liberté de bascule.

> **Pourquoi** : un onglet promet à l'utilisateur « ce que tu ne vois pas est ailleurs, à un clic »
> — une promesse fausse quand le contenu masqué doit être comparé, cherché, ou n'existe pas
> vraiment comme vue alternative. La forme visuelle (bandeau + volet) ne suffit pas à justifier le
> choix : c'est la relation entre les volets qui décide.

> **Erreur fréquente** : découper un formulaire long en « onglets » pour réduire la longueur perçue
> de la page. Les champs d'un même formulaire ne sont pas des vues exclusives d'un objet — ils sont
> tous nécessaires à la même soumission. Un onglet masque un champ requis dont l'erreur de
> validation devient invisible. Préférer un découpage en sections visibles à la suite (accordion ou
> simple empilement) pour un formulaire long.

## Frontière avec Accordion

RÈGLE : Tabs et Accordion partagent la disclosure ; ils divergent sur l'**exclusivité**. Tabs = **un
seul volet monté à l'écran**, choix exclusif. Accordion = **plusieurs sections peuvent être ouvertes
à la fois**, lisibles à la suite les unes des autres. Si le contenu gagne à être parcouru en
continu (scroll unique, lecture linéaire), c'est un Accordion. Si le contenu doit être **isolé** —
un seul angle affiché, les autres explicitement de côté — c'est Tabs.

RÈGLE : un signe de mauvais choix : l'utilisateur qui ouvre systématiquement tous les onglets un par
un pour tout lire. Si le usage réel converge vers « tout voir », le composant approprié est
l'Accordion (multi-ouvert), pas Tabs.

> **Pourquoi** : l'exclusivité de Tabs a un coût — chaque bascule est une perte de contexte visuel
> (l'ancien volet disparaît). Ce coût ne se justifie que si les vues sont réellement concurrentes
> (regarder l'une OU l'autre), jamais quand elles sont complémentaires (regarder l'une ET l'autre).

## Frontière avec Navigation

RÈGLE : Tabs change de **vue**, pas de **page** — même URL (sauf deep-link explicite, voir plus
bas), pas d'entrée d'historique par bascule, le bouton **Retour** du navigateur ne doit pas défaire
un changement d'onglet. Une navigation (`nav`, pattern NAVIGATION-UX.md) change de **destination** —
autre URL, autre entrée d'historique, le Retour fonctionne.

RÈGLE : si un produit a besoin que chaque volet soit **partageable par URL**, **indexable** ou
**revenable au Retour**, ce n'est plus un choix de vue interne — c'est une navigation qui emprunte
l'apparence visuelle des onglets (le motif `pill`/`line` peut rester, la sémantique change : liens,
pas boutons ; `role="tablist"` disparaît au profit d'une nav étiquetée).

> **Erreur fréquente** : implémenter des onglets qui poussent une entrée d'historique à chaque
> bascule « pour permettre le deep-link ». Le résultat casse le Retour (l'utilisateur clique
> Retour pour quitter la page et se retrouve sur l'onglet précédent) et casse l'attente ARIA (une
> tablist n'est pas un ensemble de destinations). Séparer clairement : bascule de vue interne
> (Tabs, pas d'historique) contre navigation entre destinations (liens, historique normal).

## Nombre d'onglets et débordement

RÈGLE : le nombre d'onglets reste **restreint** — au-delà d'un jeu qui tient sur une seule ligne dans
la largeur disponible, le motif cesse d'être lisible en un coup d'œil (sa promesse : voir toutes les
vues possibles d'emblée). CONFIANCE : non formalisé — seuil numérique précis à remonter (dépend de la
largeur du conteneur, pas d'un compte absolu).

RÈGLE : **jamais d'onglets sur deux lignes.** Un jeu d'onglets qui retombe à la ligne perd
l'exclusivité visuelle (deux rangées suggèrent deux groupes) et casse la navigation clavier
(flèches gauche/droite qui sautent de ligne). Deux issues seulement quand le jeu déborde : le
**défilement horizontal** de la tablist (l'implémentation expose déjà `overflow-x-auto`), ou une
**refonte du contenu** — regrouper des volets connexes, ou remonter d'un cran vers une navigation
si les vues sont en réalité des destinations distinctes.

> **Pourquoi** : la tablist sert de carte de la totalité des vues disponibles. Une carte qui déborde
> sur deux lignes ne peut plus être lue d'un regard — elle échoue à son propre rôle.

## Libellé

RÈGLE : le libellé d'un onglet est **court**, **nominal** — un nom, jamais une phrase complète et
jamais un **verbe d'action**. Un onglet ouvre une vue, il ne déclenche pas une opération : « Général »,
« Facturation », « Historique », pas « Voir la facturation » ni « Cliquez pour l'historique ».

> **Erreur fréquente** : un libellé d'onglet qui commence par un verbe (« Modifier le profil »,
> « Consulter les accès ») fait croire à une action — l'utilisateur s'attend à un effet immédiat
> (soumission, ouverture d'un superposé), pas à un simple changement de vue. Renvoi VOICE pour le
> choix des mots ; la contrainte de nature (nom, pas verbe) est propre à Tabs.

## Onglet courant — jamais la seule couleur

RÈGLE : l'onglet courant se signale par un **canal non chromatique** en plus de la couleur — poids
de texte renforcé et trait porteur (soulignement en variante `line`, contraste de fond en variante
`pill`), jamais la couleur seule (WCAG 1.4.1, renvoi ACCESSIBILITY-UX.md § canaux sensoriels). Le
même principe que l'état courant d'un lien de navigation (LINK-UI.md, NAVIGATION-UX.md).

RÈGLE : `aria-selected` porte l'état programmatique — le canal visuel n'est pas la seule source de
vérité, mais l'un des deux doit toujours être **redondant** avec l'autre.

## Activation automatique vs manuelle

RÈGLE : deux modes d'activation coexistent (ARIA APG) — **automatique** (le volet suit le focus : se
déplacer avec les flèches affiche immédiatement le nouveau volet) et **manuelle** (les flèches ne
déplacent que le focus ; Entrée ou Espace valide l'activation).

RÈGLE : le critère de choix est le **coût de montage du volet**. Si les volets sont déjà en mémoire
ou bon marché à afficher (texte, contenu statique), l'activation **automatique** est le défaut — elle
réduit d'une frappe le trajet clavier et correspond à l'attente la plus commune. Si monter un volet
déclenche un coût réel (requête réseau, calcul, rendu lourd), l'activation **manuelle** évite de
déclencher ce coût à chaque frappe de flèche pendant que l'utilisateur parcourt la liste des onglets.

> **Pourquoi** : en activation automatique, un utilisateur qui balaie les onglets aux flèches pour
> les lire déclenche autant de changements de volet que d'onglets survolés. Si chaque changement a
> un coût (fetch, recalcul), ce balayage devient une rafale de requêtes inutiles — l'activation
> manuelle sépare le déplacement (gratuit) de l'activation (qui a un coût, donc explicite).

## Clavier (ARIA APG « Tabs »)

RÈGLE : la tablist porte `role="tablist"`, chaque onglet `role="tab"`, chaque volet
`role="tabpanel"`. **Un seul onglet** est dans l'ordre de tabulation normal (`tabindex="0"` sur
l'onglet courant, `tabindex="-1"` sur les autres) — Tab entre et sort de la tablist en une seule
étape, jamais un Tab par onglet.

RÈGLE : à l'intérieur de la tablist, les **flèches gauche/droite** déplacent le focus d'onglet en
onglet (avec retour au premier après le dernier) ; **Origine** (Home) va au premier onglet,
**Fin** (End) au dernier. Le comportement d'activation (auto/manuel) détermine si ce déplacement
change aussi le volet affiché.

RÈGLE : le **volet est focalisable** (`tabindex="0"` sur le conteneur du volet) même s'il ne
contient aucun élément interactif — sans quoi Tab depuis l'onglet saute directement au contenu
suivant de la page, et un lecteur d'écran ne peut pas atteindre le volet comme une région. Le
volet référence son onglet via `aria-labelledby`, l'onglet référence son volet via `aria-controls`.

## Volet démonté ou masqué

RÈGLE : par défaut, le volet **non courant est démonté** (retiré du DOM), pas seulement masqué —
l'implémentation le fait tant que `keepMounted` n'est pas explicitement demandé. Démonter simplifie
le DOM et évite qu'un contenu invisible reste interactif ou indexé.

RÈGLE : si un volet contient une **saisie utilisateur** (formulaire, filtre, brouillon) que la
bascule ne doit pas perdre, il doit rester **monté et seulement masqué** (`keepMounted`, `hidden`
plutôt que démontage) — sans quoi changer d'onglet efface silencieusement ce que l'utilisateur avait
commencé à saisir.

> **Erreur fréquente** : démonter par défaut un volet qui contient un formulaire en cours de
> remplissage. L'utilisateur bascule pour vérifier une information dans un autre onglet, revient, et
> découvre son formulaire vide. Le coût de garder le volet monté (mémoire, DOM) est presque toujours
> inférieur au coût d'une saisie perdue.

## Onglet par défaut et deep-link

RÈGLE : sans valeur initiale explicite, **le premier onglet monté prend la main** — un jeu
d'onglets n'a jamais d'état « aucun onglet sélectionné » (contrairement à un Accordion, où tout peut
être fermé). Il existe toujours un volet visible.

RÈGLE : quand un onglet précis doit être atteint depuis l'extérieur de la page (lien externe,
rafraîchissement, partage), c'est un **deep-link** — un paramètre d'URL ou un fragment lu au montage
pour initialiser `value`/`defaultValue`, jamais une entrée d'historique poussée à chaque bascule
(cf. frontière Navigation ci-dessus). Le deep-link positionne l'état initial ; il ne transforme pas
Tabs en navigation à chaque interaction.

## Frontières

RÈGLE : le **survol/repos/courant** relève de `color` (rôles), le **poids et le trait** de
`typography`/`border` ; l'**anneau de focus** de `border` (jamais réinventé par ce composant) ; les
**durées de transition** de `motion` ; le **mot** d'un libellé de `voice` ; le **superposé** qui
recouvre et piège n'est pas un onglet, c'est `overlay` ; le **regroupement multi-ouvert** est
`accordion` ; la **destination changeante avec historique** est `navigation`.

## Sources et niveau de confiance (couche UX)
| Affirmation | Source | Confiance |
|---|---|---|
| `tablist`/`tab`/`tabpanel`, `aria-selected`, `aria-controls`, tabindex mouvant, flèches, Origine/Fin | [ARIA APG — Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | Établi |
| Un seul onglet dans l'ordre de tabulation, volet focalisable | [ARIA APG — Tabs, Keyboard Interaction](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#keyboardinteractionfortabs) | Établi |
| Activation automatique par défaut, manuelle si coût de montage | [ARIA APG — Tabs, Note on tab activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), convergence Material/Carbon | Établi par convergence |
| État courant par canal non chromatique, pas la seule couleur | WCAG 1.4.1 (renvoi ACCESSIBILITY-UX.md) | Établi |
| Tabs ≠ navigation : pas d'entrée d'historique par bascule de vue | Convergence des systèmes (Carbon « Tabs vs. navigation »), NN/g — Tabs Used Right | Établi par convergence |
| Onglets jamais sur deux lignes ; défilement horizontal ou refonte | Convergence des systèmes (Material, Polaris) | Établi par convergence |
| Contenu de volet non cherchable au Cmd+F comme limite structurelle | NN/g — Tabs, Used Right | Cas isolé (une source, raisonnement transposable) |
| Seuil numérique de débordement avant refonte | — | Non formalisé — arbitrage à remonter |

*Toute règle sans source explicite repose sur un raisonnement de mécanisme (cohérence interne, ergonomie).*
