/**
 * Tests du rendu MARKDOWN du site (apps/site/app/components/markdown.tsx) — fermeture du
 * chantier « consommation totale du kit » (2026-07-30) : les éléments interactifs générés
 * depuis le Markdown consomment le kit comme les pages TSX. Verrouillent : les liens
 * Markdown passent par `Link` (@fili/react, facture inline), aucun retour possible à un
 * `<a>` natif stylé localement, et les blocs `<pre>` scrollables portent l'anneau de la
 * fondation Focus/Bordure (tokens `control.focus-*`), jamais celui du navigateur.
 */
import * as React from "react";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Link } from "../link/link";
import { Markdown } from "../../../../../apps/site/app/components/markdown";

const ici = dirname(fileURLToPath(import.meta.url));
const SITE = join(ici, "../../../../../apps/site/app");

describe("Markdown / les liens passent par Link", () => {
  it("un lien Markdown rend l'API publique Link (facture inline) — pas un <a> local", () => {
    render(<Markdown>{"Voir la [doctrine](/md/) du système."}</Markdown>);
    const a = screen.getByRole("link", { name: "doctrine" });
    expect(a).toHaveAttribute("href", "/md/");
    // Même facture que <Link context="inline"> : comparaison au RENDU DE RÉFÉRENCE du kit
    // — le test ne recopie aucune classe, il exige l'égalité avec ce que Link produit.
    const ref = render(<Link href="#ref" context="inline">réf</Link>);
    const refA = ref.getByRole("link", { name: "réf" });
    expect(a.className.length).toBeGreaterThan(0);
    expect(a.className).toBe(refA.className);
  });

  it("préserve href, title et les enfants du lien", () => {
    render(<Markdown>{'Un [texte](/x "infobulle") annoté.'}</Markdown>);
    const a = screen.getByRole("link", { name: "texte" });
    expect(a).toHaveAttribute("href", "/x");
    expect(a).toHaveAttribute("title", "infobulle");
  });

  it("le mapping ne peut pas revenir à un lien natif stylé localement", () => {
    const src = readFileSync(join(SITE, "components/markdown.tsx"), "utf8");
    expect(src).toContain("components={{ a: LienMarkdown }}");
    const lien = readFileSync(join(SITE, "components/lien-markdown.tsx"), "utf8");
    expect(lien).toMatch(/from "@fili\/react"/);
    expect(lien).toContain('context="inline"');
    expect(lien).not.toMatch(/className/); // aucune classe recopiée, aucune facture locale
  });
});

describe("Markdown / blocs de code scrollables", () => {
  it("un bloc de code rend un <pre> réel (focalisable au défilement dans Chromium)", () => {
    const { container } = render(<Markdown>{"```\nconst x = 1;\n```"}</Markdown>);
    expect(container.querySelector("pre code")).not.toBeNull();
  });

  it("le focus des <pre> est la fondation Focus/Bordure — tokenisé, :focus-visible, zéro valeur en dur", () => {
    // jsdom n'applique pas les feuilles de style : la règle se vérifie à la SOURCE ; le
    // résultat calculé est couvert par le harnais verifie-rendu (fixtures + balayage réel).
    const css = readFileSync(join(SITE, "globals.css"), "utf8");
    const regle = css.match(/(^|\n)pre:focus-visible\s*\{[^}]*\}/);
    expect(regle).not.toBeNull();
    expect(regle![0]).toContain("var(--control-focus-width)");
    expect(regle![0]).toContain("var(--control-focus-color)");
    expect(regle![0]).toContain("var(--control-focus-offset)");
    expect(regle![0]).not.toMatch(/#[0-9a-fA-F]|\d+px/); // aucune couleur ni largeur en dur
  });
});
