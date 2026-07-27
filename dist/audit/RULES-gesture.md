---
sujet: gesture
nature: languages
resume: "Ce langage définit ce qu'un **geste** a le droit de faire."
selon-contexte: [motion, touch]
source: GESTURE-UX.md v1.0.0 + GESTURE-UI.md v1.0.0
empreinte: sha256:42a6248dd566feea
regles: {loi: 14, preference: 11, non_qualifie: 0}
---
# RULES — gesture (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un geste ne possède ni forme ni état au repos : il n'est perceptible qu'une fois connu, ce qui impose qu'il soit à la fois annoncé par un indice perceptible et doublé par une alternative simple menant à la même fonction. `GESTURE-R01`
  - source : https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html
- **[préférence]** Un geste est un raccourci qui accélère une fonction déjà accessible par un autre chemin, et jamais le moyen exclusif de l'atteindre. `GESTURE-R02`
  - vérifiable : aucune fonction du système n'est atteignable exclusivement par un geste
- **[loi]** Toute fonction opérée par un geste multipoint ou à trajectoire est également opérable par un pointeur unique sans trajectoire, sauf lorsque le geste multipoint ou à trajectoire est essentiel. `GESTURE-R03`
  - vérifiable : toute fonction accessible par un geste multipoint ou tracé l'est aussi par une action à pointeur unique sans tracé, hors cas essentiel déclaré
  - source : https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html
- **[loi]** Toute fonction opérée par un glissement est également réalisable par un pointeur unique sans glisser, sauf lorsque le glissement est essentiel ou que la fonction est fournie par l'agent utilisateur sans modification par l'auteur. `GESTURE-R04`
  - vérifiable : toute fonction accessible par glissement l'est aussi par une action à pointeur unique sans glisser, hors cas essentiel déclaré
  - source : https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
- **[loi]** Toute fonction déclenchée par le mouvement de l'appareil ou de l'utilisateur dispose d'un contrôle d'interface équivalent et d'un moyen de désactiver la réponse au mouvement, sauf lorsque le mouvement passe par une interface prise en charge par l'accessibilité ou qu'il est essentiel à la fonction. `GESTURE-R05`
  - vérifiable : toute fonction déclenchée par le mouvement expose un contrôle équivalent à l'écran et un réglage de désactivation
  - source : https://www.w3.org/WAI/WCAG21/Understanding/motion-actuation.html
- **[préférence]** La seule dispense d'alternative est le caractère essentiel du geste, quand le tracé constitue lui-même la donnée ; ce caractère se déclare explicitement au cas par cas et ne se présume jamais. `GESTURE-R06`
  - vérifiable : toute fonction gestuelle livrée sans alternative porte une déclaration écrite de son caractère essentiel
- **[loi]** Un geste est annoncé par un indice perceptible au repos — poignée, bord de contenu visible, chevron — ou par une instruction explicite : un geste sans indice ni instruction n'est pas découvrable et sa fonction reste ignorée. `GESTURE-R07`
  - vérifiable : tout geste non standard porte un indice visuel persistant à l'état de repos ou une instruction textuelle accessible
  - source : https://developer.apple.com/design/human-interface-guidelines/gestures
- **[loi]** Les gestes réservés par la plateforme d'accueil sont respectés et jamais redéfinis : aucun geste applicatif ne se place dans une zone ou une direction dont le système d'exploitation ou l'agent utilisateur conserve la maîtrise. `GESTURE-R08`
  - vérifiable : aucun geste applicatif défini dans une zone d'exclusion ou une direction réservée déclarée par la plateforme
  - source : https://developer.apple.com/design/human-interface-guidelines/gestures
- **[préférence]** L'aide au premier usage d'un geste est ponctuelle et non bloquante : elle ne se répète pas à chaque venue et ne s'interpose jamais entre la personne et la fonction. `GESTURE-R09`
  - vérifiable : l'aide au premier usage s'affiche au plus une fois par utilisateur et se ferme sans conditionner l'accès à la fonction
- **[loi]** Un geste ne s'engage qu'au-delà d'un seuil franc de distance ou de durée ; en deçà de ce seuil rien ne se produit et le défilement conserve la priorité. `GESTURE-R10`
  - vérifiable : sous le seuil, aucun effet n'est déclenché et l'événement est rendu au défilement de l'agent utilisateur
  - source : https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
- **[loi]** L'effet d'un geste n'est acté qu'au franchissement du seuil suivi d'un relâchement dans la zone d'effet ; ramener le pointeur hors de cette zone avant de relâcher annule le geste sans conséquence. `GESTURE-R11`
  - vérifiable : aucun effet exécuté sur l'événement de contact ; sortie de la zone d'effet avant relâchement = annulation sans effet
  - source : https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html
- **[préférence]** Le retour d'accompagnement pendant le geste est porté par des propriétés composables uniquement et se réduit lorsque l'utilisateur demande moins de mouvement, sans que la fonction du geste en soit jamais retirée. `GESTURE-R12`
  - vérifiable : sous prefers-reduced-motion: reduce, le suivi animé est supprimé ou remplacé et la fonction du geste reste atteignable
- **[loi]** Toute fonction exposée par un geste est également opérable au clavier, sauf lorsque la fonction sous-jacente exige une entrée dépendant du tracé du mouvement et pas seulement de ses extrémités. `GESTURE-R13`
  - vérifiable : toute fonction gestuelle est déclenchable au clavier seul, hors cas de tracé essentiel déclaré
  - source : https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html
- **[loi]** Les technologies d'assistance capturent les gestes tactiles pour leur propre navigation : toute fonction gestuelle reste donc exposée par un contrôle dont le nom et le rôle sont programmatiquement déterminables, et non par le seul geste brut. `GESTURE-R14`
  - vérifiable : toute fonction gestuelle est atteignable par un contrôle exposant un nom et un rôle accessibles
  - source : https://www.w3.org/TR/mobile-accessibility-mapping/
- **[loi]** L'alternative à pointeur unique et l'alternative sans glisser constituent l'accès principal des personnes à motricité réduite, qui ne peuvent ni tracer un chemin précis ni maintenir un appui : ce ne sont pas des compléments de confort. `GESTURE-R15`
  - source : https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Cas | Risque principal | Sévérité |
|---|---|---|
| Geste path-based/multipoint sans alternative | Fonction inaccessible (WCAG 2.5.1) | Critique |
| Drag sans alternative sans glisser | Fonction inaccessible en motricité réduite (WCAG 2.5.7) | Critique |
| Motion actuation sans équivalent ni désactivation | Déclenchement involontaire, inaccessible (WCAG 2.5.4) | Élevée |
| Geste caché sans affordant | Fonction découverte par personne | Élevée |
| Geste maison contre un geste système | Conflit, action involontaire | Élevée |
| Pas de seuil (confusion avec le scroll) | Action déclenchée en défilant | Moyenne |
| Retour de geste porté par le mouvement seul | Perte sous reduced-motion / AT | Moyenne |
