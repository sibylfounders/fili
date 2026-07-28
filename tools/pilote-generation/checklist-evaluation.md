# Checklist d'évaluation de la tranche — SERT UNIQUEMENT À ÉVALUER LES SORTIES APRÈS GÉNÉRATION

> Jamais injectée dans une condition (protocole § 7.1) : l'injecter mélangerait deux variables et rendrait l'écart C3→C4 ininterprétable.

Déterministes :
- aucune action n'est présentée comme un lien : un `<a>`/`Link` qui déclenche une action au lieu de naviguer est une violation (INTERACTION-R07, LINK-R02) ;
- la navigation est portée par un `Link`/`<a href>`, jamais par un `Button` (BUTTON-R02, INTERACTION-R05) ;
- aucune surface statique ne porte de gestionnaire de clic : une `Card` en mode `static` (ou un `div`) avec `onClick` est une violation (INTERACTION-R10, CARD-R22) — critère général d'audit, hors T-001 ;
- contraste, focus visible et cible tactile sont portés par les composants du package : ne pas les recouvrir.

Semi-déterministe (convention de harnais) :
- **au plus un bouton au rang dominant par vue** (BUTTON-R19). Convention : est « dominant » tout `Button` en `style="filled"` + `tone="primary"` — **y compris par défaut** (un `<Button>` sans props est dominant) — ainsi que `SubmitButton`.

Assistés (jugés par un humain en aveugle) :
- l'action attendue du parcours est-elle identifiable en moins de deux secondes, sans lire les libellés ?
- existe-t-il un signal visuel auquel aucun rôle ne répond ?
- la hiérarchie des actions correspond-elle à ce que le parcours est conçu pour provoquer ?
