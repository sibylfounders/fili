---
sujet: gesture
nature: languages
resume: "Ce langage définit ce qu'un **geste** a le droit de faire."
selon-contexte: [motion, touch]
source: GESTURE-UX.md v1.0.0 + GESTURE-UI.md v1.0.0
empreinte: sha256:42a6248dd566feea
regles: {loi: 14, preference: 11, non_qualifie: 0}
---
# RULES — gesture (compilé, mode build)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un geste ne possède ni forme ni état au repos : il n'est perceptible qu'une fois connu, ce qui impose qu'il soit à la fois annoncé par un indice perceptible et doublé par une alternative simple menant à la même fonction. `GESTURE-R01`
- **[préférence]** Un geste est un raccourci qui accélère une fonction déjà accessible par un autre chemin, et jamais le moyen exclusif de l'atteindre. `GESTURE-R02`
- **[loi]** Toute fonction opérée par un geste multipoint ou à trajectoire est également opérable par un pointeur unique sans trajectoire, sauf lorsque le geste multipoint ou à trajectoire est essentiel. `GESTURE-R03`
- **[loi]** Toute fonction opérée par un glissement est également réalisable par un pointeur unique sans glisser, sauf lorsque le glissement est essentiel ou que la fonction est fournie par l'agent utilisateur sans modification par l'auteur. `GESTURE-R04`
- **[loi]** Toute fonction déclenchée par le mouvement de l'appareil ou de l'utilisateur dispose d'un contrôle d'interface équivalent et d'un moyen de désactiver la réponse au mouvement, sauf lorsque le mouvement passe par une interface prise en charge par l'accessibilité ou qu'il est essentiel à la fonction. `GESTURE-R05`
- **[préférence]** La seule dispense d'alternative est le caractère essentiel du geste, quand le tracé constitue lui-même la donnée ; ce caractère se déclare explicitement au cas par cas et ne se présume jamais. `GESTURE-R06`
- **[loi]** Un geste est annoncé par un indice perceptible au repos — poignée, bord de contenu visible, chevron — ou par une instruction explicite : un geste sans indice ni instruction n'est pas découvrable et sa fonction reste ignorée. `GESTURE-R07`
- **[loi]** Les gestes réservés par la plateforme d'accueil sont respectés et jamais redéfinis : aucun geste applicatif ne se place dans une zone ou une direction dont le système d'exploitation ou l'agent utilisateur conserve la maîtrise. `GESTURE-R08`
- **[préférence]** L'aide au premier usage d'un geste est ponctuelle et non bloquante : elle ne se répète pas à chaque venue et ne s'interpose jamais entre la personne et la fonction. `GESTURE-R09`
- **[loi]** Un geste ne s'engage qu'au-delà d'un seuil franc de distance ou de durée ; en deçà de ce seuil rien ne se produit et le défilement conserve la priorité. `GESTURE-R10`
- **[loi]** L'effet d'un geste n'est acté qu'au franchissement du seuil suivi d'un relâchement dans la zone d'effet ; ramener le pointeur hors de cette zone avant de relâcher annule le geste sans conséquence. `GESTURE-R11`
- **[préférence]** Le retour d'accompagnement pendant le geste est porté par des propriétés composables uniquement et se réduit lorsque l'utilisateur demande moins de mouvement, sans que la fonction du geste en soit jamais retirée. `GESTURE-R12`
- **[loi]** Toute fonction exposée par un geste est également opérable au clavier, sauf lorsque la fonction sous-jacente exige une entrée dépendant du tracé du mouvement et pas seulement de ses extrémités. `GESTURE-R13`
- **[loi]** Les technologies d'assistance capturent les gestes tactiles pour leur propre navigation : toute fonction gestuelle reste donc exposée par un contrôle dont le nom et le rôle sont programmatiquement déterminables, et non par le seul geste brut. `GESTURE-R14`
- **[loi]** L'alternative à pointeur unique et l'alternative sans glisser constituent l'accès principal des personnes à motricité réduite, qui ne peuvent ni tracer un chemin précis ni maintenir un appui : ce ne sont pas des compléments de confort. `GESTURE-R15`

## Consignes d'implémentation

- **[préférence]** Les gestes s'implémentent sur les événements pointeur, qui unifient souris, doigt et stylet en un seul modèle, et non sur des familles d'événements tactiles et souris traitées séparément. `GESTURE-U01`
- **[préférence]** La fonction est portée par un contrôle natif et le geste n'est qu'un raccourci branché par-dessus, de sorte que l'alternative à pointeur unique et l'opérabilité clavier existent par construction et non par rattrapage. `GESTURE-U02`
- **[préférence]** Un geste à trajectoire ne s'engage qu'au-delà d'une distance minimale qui le distingue d'un appui et d'un défilement ; en deçà l'événement revient à l'agent utilisateur, et le sens dominant se fixe au premier franchissement puis se tient jusqu'au relâchement. `GESTURE-U03`
- **[loi]** L'annulation du pointeur par l'agent utilisateur et le relâchement hors de la zone d'effet ramènent l'élément à son état initial sans exécuter la fonction, celle-ci n'étant acquise qu'au franchissement du seuil suivi d'un relâchement dans la zone. `GESTURE-U04`
- **[préférence]** Pendant le geste, seules les propriétés composables de transformation et d'opacité sont animées ; lorsque l'utilisateur demande moins de mouvement, le suivi cède la place à une bascule d'état instantanée sans perte de fonction. `GESTURE-U05`
- **[préférence]** Les contrôles qui portent l'alternative à un geste sont des cibles tactiles de plein droit et respectent la taille confortable et l'espacement minimal du système : une alternative trop petite pour être touchée n'est pas une alternative. `GESTURE-U06`
- **[loi]** L'affordant d'un geste est rendu par des moyens statiques et perceptibles sans interaction préalable : il ne dépend ni d'une animation seule, absente quand l'utilisateur demande moins de mouvement, ni du seul survol, indisponible sur un dispositif qui ne survole pas. `GESTURE-U07`
- **[préférence]** L'aide au premier usage est une surcouche non modale légère, fermée au premier appui et non ré-affichée par défaut : elle ne piège pas le focus et ne conditionne pas l'accès au contenu sous-jacent. `GESTURE-U08`
- **[préférence]** Le régime d'entrée se déclare par les requêtes de média de pointeur et de survol : sous un pointeur de précision limitée, les contrôles-alternatives sont dimensionnés pour le doigt, et sous un dispositif incapable de survoler, aucun affordant de geste ne dépend du survol. `GESTURE-U09`
- **[loi]** Un élément générique rendu gestuel expose un rôle et un nom accessibles et n'intercepte aucun événement clavier ni aucune interaction d'assistance destinés au contrôle natif qui porte la fonction. `GESTURE-U10`
