#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Étape 9 du pipeline — compilation de la doctrine vers la distribution `dist/`.

Généralise à tous les sujets le mécanisme que `genere-flow.js` n'appliquait qu'au flow
« création de compte » dans l'ancien dépôt : extraction MÉCANIQUE depuis la source, avec
version et empreinte SHA-256 pour que la provenance soit vérifiable. Rien n'est rédigé ici.

Deux mots par règle quand elle est qualifiée — **loi** (vraie partout, opposable à un tiers)
ou **préférence** (notre choix, à proposer, jamais à imposer). Une règle non encore annotée
sort en `non qualifié` : c'est un signal, pas un défaut — l'étape 4 dit que le statut
s'annote progressivement, tiré par l'usage des audits.

Usage :
  python3 tools/compile-regles.py <slug>     un sujet
  python3 tools/compile-regles.py --tous     toute la distribution
"""
import hashlib, json, os, re, sys

ICI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD = os.path.join(ICI, "apps/site/content/md")
DOCTRINE = os.path.join(ICI, "apps/site/content/doctrine")
DIST = os.path.join(ICI, "dist")
NATURES = ["principles", "languages", "foundations", "components", "patterns", "flows"]
MOT = {"universelle": "loi", "identite": "préférence", "implementation": "préférence"}


def fichiers(slug):
    for nature in NATURES:
        p = os.path.join(MD, nature, f"{slug.upper()}-UX.md")
        if os.path.exists(p):
            return nature, p, p.replace("-UX.md", "-UI.md")
    return None, None, None


def entete(src):
    """version, chapeau et empreinte d'un fichier source."""
    v = re.search(r"^version:\s*\"?([0-9.]+)\"?", src, re.M)
    chapeau = re.search(r"^> (.+)$", src, re.M)
    txt = (chapeau.group(1) if chapeau else "").strip()
    # première phrase utile, guillemets neutralisés (le YAML du routeur ne tolère pas les crochets ouverts)
    txt = re.sub(r"[\"«»]", "", txt)
    phrase = re.split(r"(?<=[.;])\s", txt)[0]
    if len(phrase) > 200:
        phrase = phrase[:197].rsplit(" ", 1)[0] + "…"
    return (v.group(1) if v else "?", phrase)


def regles_brutes(src, couche):
    """Extraction mécanique des règles non annotées : la ligne RÈGLE, sans plus."""
    out = []
    for m in re.finditer(r"^RÈGLE(?: \[([A-Z0-9-]+)\])? ?: (.+)$", src, re.M):
        if m.group(1):
            continue  # déjà porté par les décisions annotées
        txt = re.sub(r"\s+", " ", m.group(2)).strip()
        if len(txt) < 12 or txt.lower().startswith("table ci-dessous"):
            continue
        out.append({"couche": couche, "texte": txt, "mot": "non qualifié", "id": None,
                    "mesure": "", "contre": "", "url": None})
    return out


def regles_annotees(fiche):
    out = []
    for d in fiche.get("decisions", []):
        if d["statut"] == "methode":
            continue
        p = d.get("principale")
        url = p["liens"][0]["url"] if (p and p["liens"]) else None
        out.append({"couche": d["couche"], "texte": d["enonce"] or d["solution"].split("\n")[0],
                    "mot": MOT[d["statut"]], "id": d["id"], "mesure": d.get("mesure", ""),
                    "contre": d.get("contre", ""), "url": url if MOT[d["statut"]] == "loi" else None})
    return out


def table_risque(src):
    """La table « Risque » d'un sujet : cas, risque principal, sévérité.

    Elle vit dans le markdown sous forme de tableau, rattachée à une note de méthode —
    donc jamais reprise par `regles_annotees`, qui ignore les notes de méthode. Sans elle,
    le paquet d'audit sait dire qu'une règle est violée, mais pas si le constat est
    bloquant ou cosmétique. Elle ne part qu'en mode audit : générer de l'UI n'a pas besoin
    de savoir ce qui se passe quand on se trompe.
    """
    m = re.search(r"^## Risque.*?(?=^## |\Z)", src or "", re.S | re.M)
    if not m:
        return []
    lignes = [l.rstrip() for l in m.group(0).split("\n") if l.startswith("|")]
    return lignes if len(lignes) > 2 else []


def dependances(*sources):
    """Renvois croisés détectés — heuristique, à valider par le routeur (étape 9)."""
    vus = set()
    for s in sources:
        for m in re.finditer(r"\b([A-Z][A-Z0-9-]{2,})-U[XI]\b", s or ""):
            vus.add(m.group(1).lower())
    return sorted(vus)


def compile_sujet(slug, mode="audit"):
    """mode `build` : générer de l'UI conforme — la règle, rien d'autre.
       mode `audit` : confronter une interface — la règle, le critère, la source, le contexte.
       La couche implémentation ne part JAMAIS en audit (étape 9 : « l'implémentation de
       référence n'est jamais un critère d'audit d'hôte »)."""
    nature, pux, pui = fichiers(slug)
    if not pux:
        return None
    sux = open(pux, encoding="utf-8").read()
    sui = open(pui, encoding="utf-8").read() if os.path.exists(pui) else ""
    vux, chapeau = entete(sux)
    vui, _ = entete(sui) if sui else ("—", "")

    pj = os.path.join(DOCTRINE, f"{slug}.json")
    fiche = json.load(open(pj, encoding="utf-8")) if os.path.exists(pj) else {}
    # Les règles annotées d'abord ; celles qui n'ont pas encore d'identifiant suivent en brut.
    # Rien ne disparaît en silence : une règle non qualifiée reste dans le paquet, marquée comme telle.
    regles = regles_annotees(fiche) + regles_brutes(sux, "ux") + regles_brutes(sui, "ui")

    empreinte = hashlib.sha256((sux + sui).encode("utf-8")).hexdigest()[:16]
    deps = [d for d in dependances(sux, sui) if d != slug]
    lois = sum(1 for r in regles if r["mot"] == "loi")
    prefs = sum(1 for r in regles if r["mot"] == "préférence")
    nonq = sum(1 for r in regles if r["mot"] == "non qualifié")

    L = [
        "---",
        f"sujet: {slug}",
        f"nature: {nature}",
        f"resume: \"{chapeau[:220]}\"",
        f"selon-contexte: [{', '.join(deps)}]",
        f"source: {os.path.basename(pux)} v{vux}" + (f" + {os.path.basename(pui)} v{vui}" if sui else ""),
        f"empreinte: sha256:{empreinte}",
        f"regles: {{loi: {lois}, preference: {prefs}, non_qualifie: {nonq}}}",
        "---",
        f"# RULES — {slug} (compilé, mode {mode})",
        "",
        "> Extrait mécaniquement de la doctrine par `tools/compile-regles.py`. Ne pas éditer à la main.",
        ">",
        "> **Étiquettes.** `[loi]` — vrai de tout produit : appliquer, et signaler comme non-conformité.",
        "> `[préférence]` — notre choix, pas une norme : proposer en le disant, jamais imposer dans un",
        "> produit qui n'est pas le nôtre. `[non qualifié]` — statut pas encore tranché : **traiter comme",
        "> une préférence** et remonter la question.",
        "> Ce que ne couvre aucune règle ci-dessous : ne pas trancher, poser la question.",
        "",
    ]
    couches = (("ux", "Règles de design"),) if mode == "audit" else (("ux", "Règles de design"), ("ui", "Consignes d'implémentation"))
    for couche, titre in couches:
        lot = [r for r in regles if r["couche"] == couche]
        if not lot:
            continue
        L += [f"## {titre}", ""]
        for r in lot:
            ref = f" `{r['id']}`" if r["id"] else ""
            L.append(f"- **[{r['mot']}]** {r['texte']}{ref}")
            if mode == "audit":
                if r["mesure"]:
                    L.append(f"  - vérifiable : {r['mesure']}")
                if r["contre"]:
                    L.append(f"  - le secteur : {r['contre'].split('.')[0]}.")
                if r["url"]:
                    L.append(f"  - source : {r['url']}")
        L.append("")

    if mode == "audit":
        risque = table_risque(sux)
        if risque:
            L += ["## Gravité — de quoi dépend la sévérité d'un constat", "",
                  "> À lire avant de classer un constat. Une même règle violée n'a pas le même",
                  "> poids selon le contexte : cette table donne le risque encouru, pas la règle.",
                  ""]
            L += risque
            L.append("")

    ouverts = [c for fam in fiche.get("cas", []) for c in fam["cas"] if c.get("statut")]
    if ouverts:
        L += ["## Non couvert — poser la question, ne rien trancher", ""]
        L += [f"- {c['titre']} : {c['quand']}" for c in ouverts]
        L.append("")

    dossier = os.path.join(DIST, mode)
    os.makedirs(dossier, exist_ok=True)
    texte = "\n".join(L)
    open(os.path.join(dossier, f"RULES-{slug}.md"), "w", encoding="utf-8").write(texte)
    return {"slug": slug, "lois": lois, "prefs": prefs, "nonq": nonq,
            "tokens": len(texte) // 4, "deps": len(deps)}


def tous():
    return sorted(f[:-6].lower() for n in NATURES
                  for f in os.listdir(os.path.join(MD, n)) if f.endswith("-UX.md"))


if __name__ == "__main__":
    cibles = tous() if (len(sys.argv) > 1 and sys.argv[1] == "--tous") else [sys.argv[1]]
    for m in ("build", "audit"):
        res = [r for r in (compile_sujet(s, m) for s in cibles) if r]
        t = sum(r["tokens"] for r in res)
        print(f"mode {m:6} : {len(res)} sujets · ~{t} tokens ({t // max(1, len(res))} par sujet)")
    res = [r for r in (compile_sujet(s, "audit") for s in cibles) if r]
    if len(res) == 1:
        r = res[0]
        print(f"dist/RULES-{r['slug']}.md — {r['lois']} lois, {r['prefs']} préférences, "
              f"{r['nonq']} non qualifiées · ~{r['tokens']} tokens")
    else:
        print(f"{'sujet':22} {'loi':>4} {'préf':>5} {'n.q.':>5} {'tokens':>7} {'liens':>6}")
        for r in sorted(res, key=lambda x: -x["tokens"]):
            print(f"{r['slug']:22} {r['lois']:>4} {r['prefs']:>5} {r['nonq']:>5} {r['tokens']:>7} {r['deps']:>6}")
        t = sum(r["tokens"] for r in res)
        q = sum(r["lois"] + r["prefs"] for r in res)
        n = sum(r["nonq"] for r in res)
        print(f"\n{len(res)} sujets · {q} règles qualifiées · {n} non qualifiées · "
              f"~{t} tokens au total ({t // len(res)} en moyenne par sujet)")
