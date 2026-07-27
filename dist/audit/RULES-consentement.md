---
sujet: consentement
nature: flows
resume: "Ce fichier n'est ni un composant ni un pattern d'écran."
selon-contexte: [alert, border, button, color, creation-compte, form, grid, modal, navigation, overlay, performance, radius, spacing]
source: CONSENTEMENT-UX.md v1.1.0 + CONSENTEMENT-UI.md v1.1.0
empreinte: sha256:d2aa2aa1b3ff3be1
regles: {loi: 11, preference: 8, non_qualifie: 0}
---
# RULES — consentement (compilé, mode audit)

> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.
>
> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.
> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un
> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme
> une préférence** et remonter la question.
> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.

## Règles de design

- **[loi]** Un bandeau de consentement ne s'affiche que si le site dépose au moins un traceur soumis à consentement ; l'inventaire des stockages doit être établi avant de concevoir le bandeau. `CONSENTEMENT-R03`
  - vérifiable : inventaire daté des cookies, `localStorage`, `sessionStorage`, `IndexedDB`, service workers et appels à des domaines tiers. S'il ne contient aucun élément soumis à consentement, aucun bandeau n'est conçu.
  - source : https://design-system.service.gov.uk/components/cookie-banner/
- **[loi]** Si le texte du bandeau affirme que le site n'utilise que des traceurs strictement nécessaires, et que l'inventaire le confirme, le bandeau est signalé comme sans objet. `CONSENTEMENT-R05`
  - vérifiable : le texte du bandeau contient une formule d'exemption (« strictement nécessaires », « techniques uniquement », « aucun traceur publicitaire ») **et** l'inventaire de R03 ne relève aucun traceur soumis à consentement.
  - le secteur : la formule peut être inexacte — un site peut se déclarer sobre et charger une régie.
  - source : https://design-system.service.gov.uk/components/cookie-banner/
- **[loi]** Chaque issue proposée doit produire un effet observable et différent ; un choix sans conséquence ne doit pas être présenté comme un choix. `CONSENTEMENT-R06`
  - vérifiable : comparer l'état du stockage et les requêtes réseau après « Accepter » et après « Refuser ». Si les deux états sont identiques, le choix est fictif.
  - source : https://www.edpb.europa.eu/documents/guideline/guidelines-032022-on-deceptive-design-patterns-in-social-media-platform_en
- **[loi]** Le refus doit être atteignable en autant d'actions que l'acceptation, au même niveau de l'interface. `CONSENTEMENT-R07`
  - vérifiable : nombre de clics jusqu'au refus effectif = nombre de clics jusqu'à l'acceptation, et les deux actions sont visibles simultanément sans repli ni défilement.
  - source : https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi
- **[loi]** Les boutons d'acceptation et de refus doivent avoir un traitement visuel strictement identique. `CONSENTEMENT-R08`
  - vérifiable : même classe de style, mêmes dimensions à ±2 px, écart de contraste entre les deux boutons ≤ 0,3:1.
  - le secteur : cette règle arrivait de BUTTON-R76, où elle était formulée comme une exception au modèle style × tone du bouton.
  - source : https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi
- **[loi]** L'absence d'action ne doit jamais être interprétée comme un consentement ; l'état par défaut est le refus. `CONSENTEMENT-R09`
  - vérifiable : aucun dépôt soumis à consentement avant une action explicite sur un bouton d'acceptation.
  - source : https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi
- **[préférence]** Chez nous, les libellés des deux actions nomment la catégorie de traceurs concernée plutôt que d'exprimer un assentiment général. `CONSENTEMENT-R10`
  - le secteur : le DSFR (S4) impose « Tout accepter » et « Tout refuser », plus courts et indépendants du contenu, au prix de la précision.
- **[préférence]** Chez nous, aucun contenu n'est bloqué tant que le visiteur n'a pas répondu au bandeau. `CONSENTEMENT-R11`
  - le secteur : le *cookie wall* n'est pas illégal en soi en France depuis la décision du Conseil d'État du 19 juin 2020, et la CNIL l'apprécie au cas par cas.
- **[loi]** Le bandeau de consentement ne doit pas être fixé à l'écran, afin de ne jamais recouvrir un élément focalisé. `CONSENTEMENT-R12`
  - vérifiable : parcours clavier complet de la page bandeau affiché ; aucun élément focalisé n'est recouvert.
  - source : https://design-system.service.gov.uk/components/cookie-banner/
- **[préférence]** Placer le bandeau en tout premier dans le corps du document, avant le lien d'évitement. `CONSENTEMENT-R13`
- **[préférence]** Chez nous, le choix exprimé est conservé six mois, sans nouvelle sollicitation pendant cette durée, refus compris. `CONSENTEMENT-R14`
  - le secteur : GOV.
- **[préférence]** Après le choix, afficher un message de confirmation en lieu et place du bandeau, énonçant le choix retenu et offrant un lien pour le modifier ainsi qu'un bouton de fermeture. `CONSENTEMENT-R15`
  - vérifiable : le message est annoncé (`role="alert"`), reçoit le focus par programme, et sa fermeture rend le focus à un point stable de la page.
- **[loi]** Un point d'accès permanent, présent sur toutes les pages, doit permettre de modifier ou retirer le choix exprimé. `CONSENTEMENT-R16`
  - vérifiable : un lien ou un bouton dédié est présent dans le pied de page de chaque page, et mène à un écran où le choix courant est visible et modifiable.
  - source : https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi

## Gravité — de quoi dépend la sévérité d'un constat

> À lire avant de classer un constat. Une même règle violée n'a pas le même
> poids selon le contexte : cette table donne le risque encouru, pas la règle.

| Ce que le site dépose | Ce que le pattern exige |
|---|---|
| Rien, ou seulement des traceurs exemptés (choix de langue, thème, panier, authentification, mémorisation du choix lui-même) | Aucun bandeau. Une page d'information suffit. R03, R05 |
| Mesure d'audience limitée au seul éditeur, non recoupée, statistiques anonymisées | Question ouverte : selon les conditions remplies, l'exemption s'applique ou non. Remonter en « à trancher » avec l'inventaire. R04 |
| Publicité, personnalisation, réseaux sociaux, recoupement inter-sites | Bandeau complet : R07 à R16 sans exception |
| Aucun dépôt ne varie selon la réponse | Le choix est fictif : R06 |
