---
usage: rédaction du rapport — jamais pendant l'inspection
role: expliquer à un lecteur humain pourquoi un constat compte
lois: 22
---
# Lois UX — la couche pédagogique de l'audit

> Une loi n'est **pas** un critère : elle n'a pas de seuil, on ne la constate pas violée.
> Elle sert au moment de la livraison — elle explique pourquoi un constat compte, elle fait
> autorité, et elle apprend quelque chose au lecteur. L'outil forme par l'usage.
>
> **Comment s'en servir.** Après avoir rédigé un constat, chercher ici un déclencheur qui
> corresponde. S'il y en a un, ajouter une ligne « Pourquoi ça compte » avec la phrase et sa
> source. Au plus **une loi par constat**, et jamais de loi sans constat : une leçon sans
> problème à résoudre ne s'apprend pas.
>
> **Les réserves ne sont pas facultatives.** Une loi mal citée détruit exactement l'autorité
> qu'elle devait donner — et un lecteur averti le verra.

## Charge cognitive (Sweller)  `LAWS-R06`
- **quand la citer** : formulaire long · écran dense · étapes multiples · jargon · notion à retenir
- **à recopier** : Toute charge mentale imposée par la présentation de l'interface au-delà de la tâche elle-même est une charge extrinsèque à supprimer .
- **source** : https://mrbartonmaths.com/resourcesnew/8.%20Research/Explicit%20Instruction/Cognitive%20Load%20during%20problem%20solving.pdf

## Découpage en unités (Miller, 1956)  `LAWS-R08`
- **quand la citer** : texte dense · liste longue · numéro non groupé · formulaire d'un seul bloc
- **à recopier** : L'information longue ou dense se découpe en unités signifiantes — étapes, groupes visuels, segments de nombres et de dates — plutôt que d'être présentée d'un seul bloc.
- **source** : https://labs.la.utexas.edu/gilden/files/2016/04/MagicNumberSeven-Miller1956.pdf
- ⚠️ **réserve** : Ne jamais écrire « 7 ± 2 » : Miller ne prescrit aucune limite d'items. Citer pour le découpage, pas pour un plafond.

## Capacité de la mémoire de travail (Cowan, 2001)  `LAWS-R09`
- **quand la citer** : information à retenir d'un écran à l'autre · code à recopier · récapitulatif absent
- **à recopier** : L'interface n'exige jamais qu'une information soit retenue d'un écran à l'autre : ce qui a déjà été saisi est redonné à voir au moment où il sert, et l'aide nécessaire à une saisie reste visible au lieu de disparaître.
- **source** : https://philpapers.org/rec/COWTMN

## Cécité aux bannières (Nielsen Norman Group)  `LAWS-R11`
- **quand la citer** : message important en zone publicitaire · bandeau ignoré · information en encart
- **à recopier** : Aucune information critique ne prend l'apparence d'un élément décoratif ou promotionnel : ce qui ressemble à une publicité est filtré avant lecture, et le mouvement, qui capte l'attention de force, reste parcimonieux.
- **source** : https://www.nngroup.com/articles/banner-blindness-original-eyetracking/

## Loi de Fitts (1954)  `LAWS-R14`
- **quand la citer** : cible trop petite · cible éloignée · bouton en coin · lien de pied de page
- **à recopier** : Le temps d'atteinte d'une cible croît avec la distance à parcourir et décroît avec la taille de la cible : une action fréquente est grande et placée près de son contexte d'usage, et les bords d'écran comptent comme des cibles de profondeur infinie.
- **source** : https://www.nngroup.com/articles/fitts-law/

## Principe de robustesse (Postel)  `LAWS-R17`
- **quand la citer** : format de saisie strict · téléphone refusé · espaces refusés · IBAN, carte
- **à recopier** : Une saisie est acceptée dans toutes ses formes usuelles — espaces, tirets, parenthèses, casse — puis normalisée en interne .
- **source** : https://design-system.service.gov.uk/patterns/phone-numbers/
- ⚠️ **réserve** : La RFC 9413 (IAB, 2023) retourne le principe côté réseau. En interface, il tient — citer GOV.UK plutôt que les RFC d'origine.

## Paradoxe de l'utilisateur actif (Carroll & Rosson)  `LAWS-R19`
- **quand la citer** : aide préalable · tutoriel bloquant · onboarding imposé · aide non contextuelle
- **à recopier** : L'aide est contextuelle et disponible dans l'action plutôt que préalable : aucune fonction ne suppose la lecture d'une documentation ou le passage par un tutoriel bloquant avant usage.
- **source** : https://www.nngroup.com/articles/paradox-of-the-active-user/

## Changement sur demande (WCAG 3.2.5)  `LAWS-R20`
- **quand la citer** : contenu qui bouge · ouverture automatique · changement sans action · défilement volé
- **à recopier** : Le contenu ne se déplace ni ne change de contexte sans action de la personne, et aucune animation ne verrouille l'interaction .
- **source** : https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html

## Proximité (Gestalt)  `LAWS-R22`
- **quand la citer** : libellé loin de son champ · espacement uniforme · groupes indistincts
- **à recopier** : Les éléments rapprochés sont perçus comme un groupe indépendamment de tout trait : l'espacement porte donc l'information de regroupement, avec un écart plus petit à l'intérieur d'un groupe qu'entre deux groupes.
- **source** : https://www.interaction-design.org/literature/topics/gestalt-principles

## Région commune (Gestalt)  `LAWS-R23`
- **quand la citer** : cadre superflu · trait là où l'espace suffirait · fond qui regroupe à tort
- **à recopier** : Un fond ou un cadre commun regroupe son contenu plus fortement que la proximité seule : un conteneur déclare un groupe et ne s'emploie donc jamais comme simple ornement.
- **source** : https://www.interaction-design.org/literature/topics/gestalt-principles

## Similarité (Gestalt)  `LAWS-R24`
- **quand la citer** : mêmes formes pour des rôles différents · incohérence de traitement
- **à recopier** : Les éléments qui partagent forme, couleur ou taille sont perçus comme appartenant à la même famille : un même rôle reçoit toujours le même traitement visuel, et deux rôles distincts n'en partagent jamais un seul.
- **source** : https://www.interaction-design.org/literature/topics/gestalt-principles

## Effet Von Restorff  `LAWS-R27`
- **quand la citer** : tout est mis en avant · trop d'accents · aucune hiérarchie
- **à recopier** : Un élément qui rompt l'homogénéité de son contexte est mieux mémorisé, et l'effet disparaît dès que la distinction se généralise : l'accent et l'action primaire restent uniques dans leur vue.
- **source** : https://link.springer.com/article/10.3758/BF03214414

## Effet de position sérielle (Glanzer & Cunitz, 1966)  `LAWS-R28`
- **quand la citer** : information clé au milieu d'une liste · ordre des options
- **à recopier** : Dans une liste, les éléments de tête et de queue sont mieux mémorisés que ceux du milieu : les entrées décisives se placent aux extrémités et jamais au centre d'une longue série.
- **source** : https://psychologysorted.blog/wp-content/uploads/2019/07/glanzer-and-cunitz_1966.pdf

## Seuil Doherty (IBM, 1982)  `LAWS-R29`
- **quand la citer** : latence perçue · absence de retour immédiat · animation trop longue
- **à recopier** : Une réponse du système obtenue sous 400 ms maintient la personne dans son flux et une réponse sous 100 ms est perçue comme instantanée : ces deux seuils bornent l'échelle des durées d'animation et de retour du système.
- **source** : https://www.computerhistory.org/collections/catalog/102751398
- ⚠️ **réserve** : Doherty & Thadhani est une étude de productivité, pas une expérience contrôlée ; le seuil de 400 ms est une lecture postérieure. Citer l'ordre de grandeur, pas le chiffre exact.

## Règle du pic-fin (Kahneman)  `LAWS-R31`
- **quand la citer** : fin de parcours abrupte · confirmation sèche · moment d'erreur non réparé
- **à recopier** : Le souvenir d'un parcours est dominé par son moment le plus intense et par sa fin : les messages d'erreur et les messages de clôture reçoivent un soin supérieur au reste — calmes et orientés solution pour les premiers, nets et sans sur-célébration pour les seconds.
- **source** : https://www.nngroup.com/articles/peak-end-rule/

## Réfutation de la règle des trois clics (UIE)  `LAWS-R33`
- **quand la citer** : exigence formulée en nombre de clics · parcours jugé au comptage
- **à recopier** : Aucune exigence du système ne se formule en nombre de clics : la qualité d'un parcours se juge à l'évidence de chaque étape et à sa progression vers le but, pas au décompte des interactions.
- **source** : https://articles.uie.com/three_click_rule/

## Loi de Hick — avec réserve  `LAWS-R12`
- **quand la citer** : plusieurs actions dominantes · trop d'options simultanées
- **à recopier** : Chez nous, une vue porte une action dominante et une seule, et chaque registre de couleur porte un sens unique .
- **source** : https://lawsofux.com/hicks-law/
- ⚠️ **réserve** : Ne pas présenter Hick comme fondant « moins d'options » : prise à la lettre, elle suggère l'inverse (Liu et al., CHI 2020). Citer pour la lisibilité du choix, pas pour son nombre.

## Gradient du but (Kivetz et al., 2006)  `LAWS-R15`
- **quand la citer** : progression truquée · étape gonflée · jauge décorative
- **à recopier** : Toute progression affichée reflète l'avancement réel de la tâche : ni étape gonflée, ni avance offerte, ni jauge qui progresse sans travail accompli.
- **source** : https://journals.sagepub.com/doi/abs/10.1509/jmkr.43.1.39
- ⚠️ **réserve** : L'objection à une progression truquée est éthique, pas empirique — Kivetz et al. montrent que la jauge gonflée accélère la complétion.

## Loi de Tesler  `LAWS-R16`
- **quand la citer** : complexité reportée sur l'utilisateur · champ que le système pourrait déduire
- **à recopier** : La complexité irréductible d'une tâche est absorbée par le système et non reportée sur la personne : normalisation des saisies, valeurs par défaut sensées, messages qui énoncent la cause et la correction.
- **source** : https://lawsofux.com/teslers-law/

## Effet esthétique-utilisabilité  `LAWS-R30`
- **quand la citer** : interface soignée mais pénible · jugement esthétique confondu avec l'usage
- **à recopier** : L'esthétique et l'utilisabilité se vérifient séparément : un jugement esthétique favorable ne clôt jamais une question d'utilisabilité en revue, car le soin visuel gonfle l'utilisabilité perçue et fait sous-déclarer les défauts en test.
- **source** : https://www.nngroup.com/articles/aesthetic-usability-effect/
- ⚠️ **réserve** : Sonderegger & Sauer (2010) montrent que l'esthétique améliore aussi la performance réelle : ne pas réduire l'effet à « le beau paraît utilisable ».

## Effet Ovsiankina (reprise)  `LAWS-R10`
- **quand la citer** : tâche longue sans repère d'avancement
- **à recopier** : La progression d'une tâche longue est rendue visible pour aider la reprise, jamais pour exercer une pression : aucune relance ni aucun message n'a pour seul déclencheur le caractère incomplet d'une tâche.
- **source** : https://www.nature.com/articles/s41599-025-05000-w
- ⚠️ **réserve** : Ne pas citer Zeigarnik : l'effet ne réplique pas (méta-analyse 2025, ratio 0,99). C'est l'effet Ovsiankina — la reprise — qui tient.

## Surcharge de choix  `LAWS-R13`
- **quand la citer** : carte ou alerte surchargée d'actions
- **à recopier** : Le nombre d'actions portées par une carte ou une alerte est plafonné par une règle explicite du composant concerné, et non par un seuil général d'abondance d'options.
- **source** : https://academic.oup.com/jcr/article-abstract/37/3/409/1827647
- ⚠️ **réserve** : Effet moyen quasi nul en méta-analyse (Scheibehenne et al., 2010). Citer comme prudence de conception, jamais comme fait établi.
