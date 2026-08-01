# CADRAGE — Fili Audit, offre « audit d'expérience »

> Version 0.1.1 — 31 juillet 2026
> Complète `CAHIER-FILI-AUDIT.md` (v0.3.0), qui reste le document de référence.
> Ce cadrage règle ce que le cahier laissait ouvert : **quand entre le contexte, dans quel ordre on audite, pour qui on écrit, sous quelle forme on livre.**
> Conforme au MISSING-COMPONENT-PROTOCOL : rien n'est improvisé, les arbitrages non tranchés sont listés au § 11 et bloquent ce qu'ils bloquent.

---

## 1. Ce qui a déclenché ce cadrage

Le 31/07/2026, un audit complet a été mené à la main sur `dev.somlys.com` (PrestaShop, 4 langues, 340 produits) et livré en 34 constats. Aurélien l'a validé comme le niveau d'exigence attendu : « C'est ÇA que j'attends de Fili Audit. Rien de moins. »

**Ce cadrage a un seul but : rendre ce rapport reproductible sans l'humain qui l'a corrigé trois fois.**

Car il faut le dire franchement — le rapport Somlys ne doit pas sa qualité aux sondes. Il la doit à trois reprises d'Aurélien en cours de route :

1. « Tu n'as pas répondu à la question » — l'audit était resté au niveau du mesurable au lieu d'atteindre le vécu.
2. « L'UX est à chier, tu as oublié l'UI » — une couche entière manquait.
3. « Je pensais pas qu'il n'y ait que 3 problèmes » — la restitution masquait la gravité derrière l'urgence.

Ces trois reprises ne sont **pas des observations** — elles ne disent pas quoi chercher. Ce sont des **exigences de forme**, et c'est à ce titre qu'elles deviennent des passes obligatoires (§ 6). Un agent ne se souvient pas d'être exigeant ; une passe qui refuse de se clore, si.

---

## 2. Nature et non-périmètre

**Nature.** Une prestation d'audit qui part d'une URL et rend un dossier transmissible. Elle mesure ce que le site fait subir à ses visiteurs, ce qui l'empêche d'être trouvé, et l'état de son système visuel.

**Deux offres distinctes — arbitré le 31/07.**

| Offre | Périmètre | Descend jusqu'à |
|---|---|---|
| **A — Audit d'expérience** *(objet de ce cadrage)* | principes · langages · fondations · flows | le **système** : échelles d'espacement et de titres, traitements de boutons, palette, parcours |
| **B — Audit de design system** *(cadrage distinct, à venir)* | la chaîne atomique | chaque composant confronté **règle par règle** à sa fiche RULES |

L'offre A ne descend **jamais** à la confrontation composant par composant. C'est ce qui a produit le rapport Somlys, et c'est ce qui le rend tenable en quelques jours.

**Hors périmètre de l'offre A :** la chaîne atomique · le rendu au lecteur d'écran · le parcours clavier de bout en bout · les espaces authentifiés · le code source du dépôt (seul le rendu est observé) · toute appréciation du travail fourni au regard de ce qui a été commandé et payé (§ 9.4).

---

## 3. Le corpus — décision structurante

**Arbitré le 31/07 : le référencement, la fabrication serveur et le budget d'images sont AJOUTÉS au corpus Fili.** Pas un corpus parallèle : une extension du référentiel, avec la même cérémonie de sourçage.

### 3.1 Pourquoi c'était nécessaire

Sur les cinq constats qui portent le rapport Somlys, **un seul** touchait un principe Fili existant (la recherche sans état vide → charge cognitive + voix). Les quatre autres — site de développement ouvert aux moteurs, prix publiés dans les données structurées, pages de marque en `noindex`, produits rattachés à la mauvaise catégorie — étaient **hors référentiel**. Auditer « tous les principes de Fili » les aurait manqués.

### 3.2 Les cinq sujets à créer

| Sujet | Périmètre | Sources |
|---|---|---|
| `indexation` | directives d'exploration, `noindex`, adresse canonique, plan de site, environnements de recette exposés | Google Search Central |
| `donnees-structurees` | balisage, cohérence entre le balisé et le visible, éligibilité aux résultats enrichis | `schema.org`, Google Search Central |
| `multilingue` | `hreflang`, `x-default`, cohérence des déclarations de région | Google Search Central |
| `budget-image` | rapport entre pixels servis et pixels affichés, format, dimensions déclarées, priorité de chargement | web.dev, Core Web Vitals |
| `fabrication-serveur` | temps de génération, cache, regroupement des ressources, versions en fin de support | web.dev, RFC 9111 |

### 3.3 Conséquence à ne pas manquer

**Le corpus Fili sert aussi au mode build.** Ces cinq fiches seront chargées quand on *génère* de l'UI, pas seulement quand on audite. C'est cohérent — un composant généré devrait déjà déclarer ses dimensions d'image — mais c'est une extension du système, pas un module d'audit.

**Arbitrage ouvert (§ 11.1) : leur `type`.** Ni langage, ni fondation visuelle. Candidats : `principe`, ou un cinquième type à créer.

---

## 4. Le contexte — quand il entre

**Arbitré le 31/07 : corpus avant, confrontation après.**

### 4.1 Deux natures de contexte, à ne jamais confondre

- **Contexte marché** — le secteur, les concurrents. *Fourni par l'auditeur*, selon une règle.
- **Contexte produit** — la cible, les personas du site audité, ce que le site doit faire. *Déclaré par l'audité*. C'est un intrant, jamais une orientation de la recherche.

> **Attention au faux ami** : les personas du § 4.1 sont ceux du *site audité*. Les personas du § 5 sont ceux du *rapport*. Rien à voir.

### 4.2 Le moment

| Étape | Ce qui est connu |
|---|---|
| **Avant le relevé** | le secteur, la liste des concurrents à mesurer, la déclaration produit du client |
| **Pendant le relevé** | **rien d'autre.** Les sondes tournent à l'aveugle sur le site audité et sur chaque concurrent, avec les mêmes instruments |
| **Après le relevé** | la confrontation. C'est seulement là que les chiffres deviennent des écarts |

**Loi C1 — le corpus se choisit avant, la confrontation se fait après.** Déclarer le contexte avant le relevé permet de constituer le corpus ; ne confronter qu'après protège du biais de confirmation. Un relevé qui sait déjà ce qu'il doit trouver trouve ce qu'il sait.

### 4.3 Pourquoi le contexte marché n'est pas décoratif

Sur les huit défauts qu'Aurélien avait repérés à l'œil, **six étaient trouvables par sonde seule**. Les deux autres — « la marque ne se présente pas », « il n'y a pas de rappel des catégories » — sont des **absences**. Une sonde compte ce qui est là ; elle ne sait pas ce qui manque.

**Loi C2 — une absence n'existe que comparée.** 214 mots n'est pas un défaut dans l'absolu. C'en est un à côté de 1 500–2 000 chez Beretta et 800–1 000 chez Aigle. Le benchmark est le mécanisme qui remplace l'intuition d'un expert.

**Loi C3 — un benchmark qui confirme tout ce qu'on pensait n'a pas fait son travail.** Sur Somlys, il a révélé que **trois marques sur quatre n'ont pas de titre principal sur leur accueil** — désarmant un argument qu'on s'apprêtait à vendre. La passe 4 ne se clôt que sur au moins un résultat contre-intuitif, ou sur la déclaration explicite qu'il n'y en a pas.

### 4.4 Règle de sélection des concurrents — *proposée, à arbitrer (§ 11.2)*

Trois à cinq sites, mesurés le même jour, avec les mêmes sondes : **au moins deux de même nature** (marque contre marque, revendeur contre revendeur), **au moins un d'une nature différente** (le plancher du marché), **même langue principale**, **même ordre de grandeur de catalogue**. La liste et le motif de chaque choix sont inscrits dans le dossier de preuve.

---

## 5. Les destinataires — quatre projections d'un seul corpus

**Arbitré le 31/07 : les quatre.**

**Loi D1 — un seul relevé, N projections.** Un persona n'est pas un audit différent : c'est un filtre, un ordre, un vocabulaire et une profondeur de preuve. On n'audite jamais le même site quatre fois.

| Persona | Ce qu'il fait des constats | Ordre | Preuve | Sur Somlys |
|---|---|---|---|---|
| **Dirigeant de PME** | décide, fait suivre | lecteur | conséquence commerciale d'abord, règle en dernier et en petit | les 34, classés par gravité + « qui porte quoi » |
| **Prestataire technique** | corrige | doctrine | sélecteur exact, règle sourcée, correction prête à coller | 20 constats |
| **Responsable e-commerce / marketing** | écrit, référence, convertit | lecteur | volume, comparaison marché, effet attendu | 6 constats éditoriaux + 10 de référencement |
| **Équipe design / produit** | possède le système | doctrine | mesures brutes, arbitrages ouverts, cas non couverts | la partie interface + les « à trancher » |

**Loi D2 — un constat n'appartient à personne par nature.** Son destinataire se déduit de ce qu'il faut faire pour le corriger : écrire un texte, changer une valeur, régler un serveur, trancher une intention. C'est cette question — et elle seule — qui alimente le § « qui porte quoi ».

---

## 6. Les sept passes

Chaque passe a un **critère de sortie falsifiable**. Une passe qui ne peut pas le satisfaire ne se clôt pas : elle remonte.

| # | Passe | Ce qu'elle fait | Ne se clôt que si… |
|---|---|---|---|
| **1** | **Cadrage** | déclaration produit du client, corpus de concurrents, sélection des gabarits | le contexte produit est déclaré **ou** explicitement porté comme manquant, et le motif de chaque concurrent est écrit |
| **2** | **Relevé** | les sondes, à l'aveugle, sur l'audité **et** les concurrents | chaque mesure porte l'instrument qui l'a produite et son horodatage |
| **3** | **Épreuve** | rejouer chaque constat sur l'élément visé | **zéro constat sans trace d'outil dans ce run** (§ 8) |
| **4** | **Marché** | confrontation aux concurrents | au moins un résultat contre-intuitif, ou déclaration explicite qu'il n'y en a pas (loi C3) |
| **5** | **Coût d'expérience** | les six familles du § 7 | chaque coût est adossé à une mesure de la passe 2 |
| **6** | **Registres** | classer le constat **et** la solution, séparément (§ 9) | aucune « certitude » sans correction écrite et vérifiable par rejeu |
| **7** | **Projection** | produire les documents par persona (§ 5) | l'échelle de gravité couvre **100 %** des constats, et la sortie « ne s'applique pas ici » a été instruite (§ 10) |

**Les passes 3, 5 et 7 sont les trois reprises d'Aurélien, transformées en règles.** La 3 répond à « ne rien inventer », la 5 à « l'expérience d'abord », la 7 à « il n'y a pas que trois problèmes ».

---

## 7. Le coût d'expérience — la charge psychologique par ses causes

**Loi E1 — la charge psychologique ne se mesure pas ; ses causes, si.** On n'écrit jamais « le site est fatigant ». On écrit ce qui fatigue, avec le chiffre.

| Famille | Ce qu'elle mesure | Relevé Somlys |
|---|---|---|
| **Imprévisibilité** | éléments d'apparence identique aux comportements différents | 20 grandes images sur 29 ne réagissent pas, à côté de 9 identiques qui réagissent |
| **Attente non annoncée** | temps au-delà du seuil, sans annonce | filtre à **1,9 s** par clic, en silence — deux fois le seuil |
| **Coût de décision** | cibles concurrentes pour une même intention | **4 liens** par vignette produit |
| **Trahison** | l'interface répond à côté sans le dire | « tondeuse à gazon » → 1 produit ; jamais d'état vide |
| **Saturation** | procédés d'emphase si répandus qu'ils n'emphasent plus | **75 blocs en capitales** sur la seule page d'accueil |
| **Effort de lecture** | longueur de ligne hors de la zone 45–75 caractères | **41** sur l'accueil, **173** sur la fiche produit |

**Loi E2 — l'imprévisibilité contamine.** Le visiteur qui clique une image inerte n'apprend pas « celle-là n'est pas cliquable » : il apprend « ce site ne répond pas ». Un défaut d'imprévisibilité se pondère au-dessus de sa fréquence.

L'agrégat de ces six familles est le **coût d'expérience**. C'est aussi, seul, le contenu de l'audit gratuit (§ 11.3).

---

## 8. L'épreuve — la passe qui a le plus rapporté

**Loi P1 — aucun chiffre n'entre dans un constat sans un appel d'outil qui l'a produit dans ce run.** Pas de mémoire, pas d'ordre de grandeur plausible, pas de comblement d'un outil en échec. Un chiffre sans trace ne s'écrit pas : on le mesure, ou on écrit « non mesuré ».

Quatre écarts réels, tous rattrapés par cette passe le 31/07 :

| Ce qui avait été écrit | Ce que la vérification a donné |
|---|---|
| 99 textes sous le seuil de contraste | entrées d'un mégamenu en `visibility: hidden` dont l'`offsetParent` n'est pas nul. **Zéro constat tenable.** |
| ~30 contrastes « blanc sur blanc, ratio 1,00 » | signature d'un **fond introuvable**, pas d'un défaut. Sans fond opaque dans la chaîne, le contraste est *indécidable*, pas *fautif*. |
| « le plan de site français est vide » | **599 adresses**, enveloppées en `<![CDATA[…]]>` que le motif de lecture ne captait pas. |
| un volume de texte concurrent cité dans un tableau | **jamais mesuré.** Un seul appel avait été lancé, sur un autre site. L'écart réel était de 4 à 9 fois, pas 7 à 14. |

**Loi P2 — trois filtres de visibilité obligatoires.** Toute sonde de rendu remonte la chaîne d'ancêtres sur `display`, `visibility` et `opacity`, et écarte `[aria-hidden]`, `[hidden]`, `[inert]`. `offsetParent` ne suffit pas.

**Loi P3 — un débordement d'élément n'est pas un défaut de recomposition.** Le signal est `scrollWidth > clientWidth`, jamais la position d'un élément pris isolément. Sur Somlys, 89 éléments « hors cadre » à 320 px — et aucun défaut : c'étaient des diapositives de carrousel.

---

## 9. Les registres — appliqués deux fois

**Loi R1 — les registres du constat et ceux de la solution ne sont pas le même axe.** Un constat certain peut avoir une solution incertaine, et c'est le cas le plus fréquent.

### 9.1 Registres du constat

| Registre | Condition |
|---|---|
| **Avéré** | manquement à une norme opposable, source citée, mesure rejouable |
| **Signalé** | parti pris du référentiel. Ne peut structurellement **jamais** atteindre « avéré » (loi 4.3 du cahier) |
| **Indécidable** | *non couvert* (le référentiel ne dit rien) ou *en attente de déclaration* (il dit, mais il manque une donnée du client) |

### 9.2 Registres de la solution

| Registre | Condition |
|---|---|
| **Certitude** | la correction est **écrite**, et sa réussite se vérifie en **rejouant la même sonde** après coup |
| **Suggestion** | l'effet est attendu mais ne se vérifie pas par rejeu |
| **À trancher** | la solution dépend d'une intention que seul le client connaît |

**Loi R2 — la barre de la certitude est le rejeu, pas la conviction.** « Retirer `outline: none`, ajouter `:focus-visible` » est une certitude : la sonde repassera de 0/40 à 40/40. « Réécrire les fiches produit » est une suggestion, même si personne n'en doute. Une certitude démentie détruit la crédibilité des trente-trois autres constats.

### 9.3 Exemple d'application croisée

Constat 4 de Somlys — le prix publié dans les données structurées d'un site qui n'affiche aucun prix :
**constat avéré** (le balisage est là, c'est vérifiable) · **solution à trancher** (retirer le balisage ou afficher le prix dépend de si c'est le tarif public ou le tarif revendeur — seul le client le sait).

### 9.4 Frontière non négociable

**Loi R3 — un audit mesure un site à un instant donné ; il ne juge pas un prestataire.** Le périmètre du contrat, le budget, le brief et le calendrier ne sont pas connus de l'auditeur. Cette phrase figure dans tous les documents produits, sans exception.

---

## 10. Les deux ordres

**Loi O1 — l'ordre d'examen n'est pas l'ordre de restitution.** Chaque constat porte deux étiquettes : son **sujet de doctrine** et sa **case de restitution**. La projection (passe 7) utilise la seconde.

### 10.1 Ordre d'examen — du plus universel au plus particulier

1. **Principes** — accessibilité, performance perçue, charge cognitive, adaptatif, + les cinq nouveaux sujets du § 3.2
2. **Langages** — interaction, voix, motion, e-motion, geste
3. **Fondations** — couleur, typographie, espacement, grille, bordure, rayon, élévation, iconographie, touch
4. **Flows** — les parcours réels du site audité
5. *Composants — hors offre A (§ 2)*

### 10.2 Ordre de restitution pour le dirigeant — celui qui a fonctionné

I. ce qui empêche d'**être trouvé** · II. ce qui empêche de **comprendre et d'acheter** · III. **l'interface** · IV. **la machine**

Puis : ce qui fonctionne → la comparaison marché → les constats par **gravité** → **qui porte quoi** → par où commencer → les questions qui n'appartiennent qu'au client.

### 10.3 L'échelle de gravité

Elle classe par **ce qu'il en coûte de ne rien faire**, jamais par difficulté de correction.

| Niveau | Définition |
|---|---|
| **1 — Irréversible** | un dommage difficile à réparer si on laisse courir |
| **2 — Grave** | coûte des ventes chaque jour, ou expose juridiquement |
| **3 — À corriger** | dégrade l'expérience et le référencement sans les bloquer |
| **4 — Dette de conception** | ne bloque rien aujourd'hui, rend tout coûteux demain |

**Loi O2 — l'échelle couvre 100 % des constats.** Aucun ne reste hors niveau. C'est le critère de sortie de la passe 7, et la correction directe de la reprise « je pensais pas qu'il n'y ait que 3 problèmes ».

### 10.4 Deux règles d'écriture

**Loi O3 — aucun jugement esthétique.** « Le site est beau » n'est pas vérifiable et dénature l'expertise. La partie interface s'ouvre sur : *« Cette partie ne juge pas le goût. Elle mesure la cohérence. »*

**Loi O4 — le rapport dit d'abord ce qui fonctionne.** Un audit qui ne relève que des défauts n'est pas crédible, et il empêche le client d'entendre le reste.

---

## 11. Arbitrages ouverts — ce qui bloque quoi

| # | Arbitrage | Bloque |
|---|---|---|
| **11.1** | Le `type` des cinq nouveaux sujets (§ 3.2) — `principe`, ou un cinquième type ? | l'écriture des fiches, donc la passe 2 sur tout le volet référencement |
| **11.2** | La règle de sélection des concurrents (§ 4.4 est une **proposition**) | la passe 1 |
| **11.3** | Le contenu exact de l'audit gratuit. Proposition : le coût d'expérience, ses trois plus gros contributeurs, rien d'autre — **et surtout pas le rapport payant tronqué** | la mise en marché, pas la chaîne |
| **11.4** | La mémoire du rescan. `CADRAGE-CONSTATS-CONSOMMATEUR.md` le signale déjà : les registres n'ont **que l'aller** — pas de statut, pas de destinataire, pas d'historique. Bloquant dès le deuxième scan d'un même client | la deuxième prestation, pas la première |
| **11.5** | Le seuil d'agrégation du coût d'expérience : comment six familles deviennent un chiffre défendable | l'audit gratuit |

### 11 bis. Arbitrages rouverts le 31/07 — décisions prises par l'agent, non ratifiées

> **Garde 5 — un agent ne ferme jamais un arbitrage.** Les cinq décisions ci-dessous ont été prises en cours de production de l'audit Somlys **par l'agent, sans arbitrage humain**. Elles sont rouvertes à la demande d'Aurélien le 31/07/2026. Les livrables Somlys les portent, et portent la mention qu'elles sont provisoires.
>
> Ce paragraphe existe aussi comme précédent : une chaîne d'audit produit mécaniquement des micro-décisions qui ressemblent à de l'exécution et qui sont des arbitrages. Les repérer est un travail à part entière.

| # | Arbitrage rouvert | État actuel | Bloque |
|---|---|---|---|
| **11.6** | **La gravité de chaque constat** | attribuée par l'agent — N1=3, N2=12, N3=15, N4=7. Aucune règle ne produit le niveau. | l'opposabilité du classement, et la conclusion dirigeant qui s'y appuie entièrement |
| **11.7** | **Le destinataire de chaque constat** | attribué par l'agent. C'est lui qui fabrique la section « qui porte quoi ». | la passe 7 (projection par persona) et la crédibilité de la répartition |
| **11.8** | **Les poids des six familles du coût d'expérience** | 3·3·3·2·2·2 sur 15, posés à la main. **Touche directement 11.5** : un poids sur 15 est une invitation à sommer. | l'audit gratuit (§ 11.3) et la fermeture de 11.5 |
| **11.9** | **Le contenu de la vue dirigeant** | 4 risques, 6 coûts cachés, 5 chantiers, 3 décisions — rédigés par l'agent, aucun issu d'une mesure. | la reproductibilité de la projection dirigeant sur un autre client |
| **11.10** | **Les deux constantes de l'instrument de contraste par pixels** | « 18 % de couverture d'encre » et « 5e centile », choisies et non dérivées. | l'opposabilité de UI-09 et de tout constat de contraste sur photo |

**Options relevées pour chacun** (à instruire, pas à trancher ici) :

- **11.6** — (a) table de décision dérivée du registre + du domaine + de l'exposition juridique · (b) attribution humaine systématique · (c) attribution agent avec relecture obligatoire avant livraison.
- **11.7** — (a) dérivé mécaniquement de la **nature de la correction** (écrire un texte / changer une valeur / régler un serveur / trancher une intention) · (b) déclaré au cadrage, une fois, par famille de sujet · (c) au cas par cas.
- **11.8** — (a) supprimer les poids, ordonner les familles par la gravité des constats qu'elles agrègent · (b) garder les poids et écrire explicitement pourquoi ils ne se somment jamais · (c) assumer un agrégat borné, ce qui rouvre 11.5 dans l'autre sens.
- **11.9** — (a) gabarit fixe alimenté par les constats de niveau 1 et 2 · (b) rédaction humaine à chaque audit · (c) gabarit + relecture obligatoire.
- **11.10** — (a) calibrer les deux constantes sur un corpus de cas connus · (b) les déclarer et les versionner **dans le constat lui-même** · (c) remonter les deux valeurs brutes (pire absolu et médiane) sans seuil unique.

---

## 12. L'épreuve de reproductibilité

C'est le critère qui décide si cette chaîne est vendable.

> **Rejouer la chaîne sur `dev.somlys.com` en repartant de zéro — une URL, rien d'autre, aucune des observations d'Aurélien.**
> Elle doit **retrouver les 34 constats**, **écarter les quatre faux positifs du § 8**, et **n'en inventer aucun**.

Lecture du résultat :

- **34 retrouvés** → la chaîne tient, on peut vendre.
- **32 retrouvés, les deux manquants étant des absences** → la passe 4 est mal réglée (corpus trop étroit, ou mauvaise nature de concurrents). Ce n'est pas un besoin d'humain.
- **Moins de 30** → le projet n'est pas mûr. Mieux vaut le savoir avant la première facture.
- **Un seul constat inventé** → la passe 3 ne fait pas son travail, et rien d'autre ne compte tant que ce n'est pas corrigé.

**Loi V1 — la chaîne n'a jamais besoin qu'on lui montre où regarder.** Un client paie précisément parce qu'il ne sait pas ce qui ne va pas chez lui. L'humain intervient à l'entrée (la déclaration produit) et à la sortie (les « à trancher »). **Au milieu, personne.**

---

## 13. Ce que ce cadrage ne couvre pas

- L'**offre B** (audit de design system, chaîne atomique) — cadrage distinct.
- Le **modèle économique** : prix, durée, ce qui est inclus.
- L'**implémentation** : quelles sondes, dans quel ordre, avec quel outillage. Le cahier `CAHIER-FILI-AUDIT.md` § 11.4 tient le découpage en lots ; ce document ne le remplace pas.
- La **mémoire inter-scans** (§ 11.4).
- Le **rendu au lecteur d'écran** et le parcours clavier complet, qui restent hors de portée de l'instrumentation actuelle.

---

## Journal

| Date | Décision |
|---|---|
| 31/07/2026 | Contexte : corpus avant, confrontation après (§ 4.2) |
| 31/07/2026 | Référencement, fabrication serveur et budget d'images **ajoutés au corpus Fili**, pas en corpus parallèle (§ 3) |
| 31/07/2026 | Quatre personas de restitution, un seul relevé (§ 5) |
| 31/07/2026 | Formats livrés : **page HTML persistante** et **PDF**. Le relevé JSON rejouable devient un **artefact interne**, pas un livrable client |
| 31/07/2026 | Deux offres distinctes ; la chaîne atomique des composants sort de l'audit clientèle (§ 2) |
| 31/07/2026 | **Cinq arbitrages rouverts** (§ 11 bis) — décisions prises par l'agent pendant la production de l'audit Somlys, non ratifiées. v0.1.1 |
