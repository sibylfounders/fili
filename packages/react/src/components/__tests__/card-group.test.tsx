/**
 * Tests CardGroup — le pattern COLLECTION après le rétablissement des frontières
 * (2026-07-30) : une seule anatomie de carte (`Card`), la collection assemble et
 * orchestre sans jamais redessiner l'intérieur de ses items.
 * Verrouillent : l'absence de seconde anatomie (l'ex-`CardGroup.Card`), les enfants
 * = vraies Card, la transmission mode/densité par contexte, le balisage liste/cellule,
 * la sélection clavier (portée par la CARTE), les cartes sans cible, le chargement,
 * les régimes joint/séparé, et la composition Media/Actions/TitleLink/TitleCommand.
 */
import * as React from "react";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Card } from "../card/card";
import { CardGroup } from "../card-group/card-group";

const uneCarte = (titre: string, props: React.ComponentProps<typeof Card.Root> = {}) => (
  <Card.Root key={titre} {...props}>
    <Card.Body>
      <Card.Header>
        <Card.Title>{titre}</Card.Title>
      </Card.Header>
      <Card.Description>Description de {titre}.</Card.Description>
    </Card.Body>
  </Card.Root>
);

describe("CardGroup / une seule anatomie de carte", () => {
  it("n'expose plus l'API CardGroup.Card (seconde anatomie supprimée)", () => {
    expect((CardGroup as unknown as Record<string, unknown>).Card).toBeUndefined();
    expect(CardGroup.Root).toBe(CardGroup); // seule sous-entrée : Root (alias de la racine)
    const sousApis = Object.keys(CardGroup).filter((k) => /^[A-Z]/.test(k));
    expect(sousApis).toEqual(["Root"]);
  });

  it("ne rend AUCUNE surface de carte de son cru : autant de .ds-card que d'enfants Card", () => {
    const { container } = render(
      <CardGroup label="Deux cartes">{[uneCarte("Une"), uneCarte("Deux")]}</CardGroup>,
    );
    expect(container.querySelectorAll(".ds-card").length).toBe(2);
    // et rien qui ressemble à l'ancienne anatomie interne du pattern
    expect(container.querySelector(".cg-chip")).toBeNull();
    expect(container.querySelector(".cg-cmd")).toBeNull();
  });

  it("ses enfants sont les VÉRITABLES Card : chaque cellule héberge un Card.Root", () => {
    const { container } = render(
      <CardGroup label="Vraies cartes">{[uneCarte("Une"), uneCarte("Deux")]}</CardGroup>,
    );
    const cellules = container.querySelectorAll(".cg-cell");
    expect(cellules.length).toBe(2);
    for (const c of cellules) expect(c.querySelector(".ds-card")).not.toBeNull();
  });
});

describe("CardGroup / frontière exécutable — enfants directs Card.Root uniquement", () => {
  // React journalise l'erreur de rendu en plus de la propager : on la silencie pour
  // garder la sortie des tests lisible — l'assertion porte sur le THROW, pas sur le log.
  const enSilence = (fn: () => void) => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    try { fn(); } finally { spy.mockRestore(); }
  };

  it("refuse un élément natif (div) avec un message explicite", () => {
    enSilence(() => {
      expect(() =>
        render(<CardGroup label="X">{(<div>intrus</div>) as never}</CardGroup>),
      ).toThrow(/enfants DIRECTS[\s\S]*<div>/);
    });
  });

  it("refuse un contrôle (button) — autre anatomie, même interactif", () => {
    enSilence(() => {
      expect(() =>
        render(<CardGroup label="X">{(<button type="button">non</button>) as never}</CardGroup>),
      ).toThrow(/Card\.Root/);
    });
  });

  it("refuse un composant intermédiaire MÊME s'il rend une Card (la frontière doit être lisible dans l'arbre)", () => {
    const EnveloppeDemo = () => uneCarte("Cachée");
    enSilence(() => {
      expect(() =>
        render(<CardGroup label="X">{(<EnveloppeDemo />) as never}</CardGroup>),
      ).toThrow(/composant intermédiaire|EnveloppeDemo/);
    });
  });

  it("refuse un Fragment et du texte nu", () => {
    enSilence(() => {
      expect(() =>
        render(<CardGroup label="X">{(<>{uneCarte("Une")}</>) as never}</CardGroup>),
      ).toThrow(/Fragment/);
      expect(() =>
        render(<CardGroup label="X">{"du texte" as never}</CardGroup>),
      ).toThrow(/texte/);
    });
  });

  it("accepte les conditions et listes de Card.Root (false/null filtrés par React)", () => {
    const { container } = render(
      <CardGroup label="OK">
        {false}
        {null}
        {[uneCarte("Une"), uneCarte("Deux")]}
      </CardGroup>,
    );
    expect(container.querySelectorAll(".ds-card").length).toBe(2);
  });
});

describe("CardGroup / mode et densité de collection", () => {
  it("transmet mode et densité à TOUTES les cartes par contexte", () => {
    const { container } = render(
      <CardGroup mode="clickable" density="compact" label="Collection">
        {[uneCarte("Une"), uneCarte("Deux"), uneCarte("Trois")]}
      </CardGroup>,
    );
    const cartes = [...container.querySelectorAll(".ds-card")];
    expect(cartes.length).toBe(3);
    for (const c of cartes) {
      expect(c).toHaveAttribute("data-mode", "clickable");
      expect(c).toHaveAttribute("data-density", "compact");
    }
  });

  it("hors collection, Card garde ses propres défauts (static / comfortable)", () => {
    const { container } = render(uneCarte("Seule"));
    const carte = container.querySelector(".ds-card");
    expect(carte).toHaveAttribute("data-mode", "static");
    expect(carte).toHaveAttribute("data-density", "comfortable");
  });
});

describe("CardGroup / balisage liste et cellule", () => {
  it("role=list étiqueté + un listitem par carte — la CELLULE appartient à la collection", () => {
    render(<CardGroup label="Guides">{[uneCarte("Une"), uneCarte("Deux")]}</CardGroup>);
    const liste = screen.getByRole("list", { name: "Guides" });
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
    for (const it_ of items) {
      expect(liste.contains(it_)).toBe(true);
      expect(it_.className).toContain("cg-cell");
    }
  });
});

describe("CardGroup / sélection (portée par la CARTE)", () => {
  it("collection selectable : rôle button + aria-pressed sur chaque carte, bascule au clic", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CardGroup mode="selectable" label="Choix">
        <Card.Root selected={false} onSelectedChange={onChange}>
          <Card.Body>
            <Card.Header>
              <Card.Title>Option A</Card.Title>
            </Card.Header>
          </Card.Body>
        </Card.Root>
      </CardGroup>,
    );
    const carte = screen.getByRole("button");
    expect(carte).toHaveAttribute("aria-pressed", "false");
    await user.click(carte);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("sélection au CLAVIER : Espace et Entrée basculent, sur la carte focalisée", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CardGroup mode="selectable" label="Choix">
        <Card.Root selected={false} onSelectedChange={onChange}>
          <Card.Body>
            <Card.Header>
              <Card.Title>Option A</Card.Title>
            </Card.Header>
          </Card.Body>
        </Card.Root>
      </CardGroup>,
    );
    const carte = screen.getByRole("button");
    expect(carte).toHaveAttribute("tabindex", "0");
    carte.focus();
    await user.keyboard(" ");
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("l'état sélectionné expose aria-pressed=true et la coche non chromatique", () => {
    const { container } = render(
      <CardGroup mode="selectable" label="Choix">
        <Card.Root selected>
          <Card.Body>
            <Card.Header>
              <Card.Title>Option A</Card.Title>
            </Card.Header>
          </Card.Body>
        </Card.Root>
      </CardGroup>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector(".ds-card-check")).not.toBeNull();
  });
});

describe("CardGroup / carte sans cible dans une collection interactive", () => {
  it("une Card mode=static explicite reste statique et sa cellule est ignorée du highlight", () => {
    const { container } = render(
      <CardGroup mode="clickable" label="Règles">
        {[uneCarte("Avec détail"), uneCarte("Sans détail", { mode: "static" })]}
      </CardGroup>,
    );
    const cartes = [...container.querySelectorAll(".ds-card")];
    expect(cartes[0]).toHaveAttribute("data-mode", "clickable");
    expect(cartes[1]).toHaveAttribute("data-mode", "static");
    const cellules = [...container.querySelectorAll(".cg-cell")];
    expect(cellules[0].className).not.toContain("cg-cell--inactive");
    expect(cellules[1].className).toContain("cg-cell--inactive");
  });
});

describe("CardGroup / chargement", () => {
  it("aria-busy vit sur la COLLECTION ; les squelettes des cartes sont aria-hidden", () => {
    const { container } = render(
      <CardGroup loading label="Chargement">
        {[uneCarte("Une", { loading: true }), uneCarte("Deux", { loading: true })]}
      </CardGroup>,
    );
    expect(screen.getByRole("list", { name: "Chargement" })).toHaveAttribute("aria-busy", "true");
    const squelettes = container.querySelectorAll('.ds-card[aria-hidden="true"]');
    expect(squelettes.length).toBe(2);
    expect(container.querySelector(".ds-card-title")).toBeNull(); // aucun contenu réel rendu
  });
});

describe("CardGroup / régimes joint et séparé", () => {
  it("joint par défaut : filets internes rendus, classe joined", () => {
    const { container } = render(
      <CardGroup label="Jointes">{[uneCarte("Une"), uneCarte("Deux")]}</CardGroup>,
    );
    const grp = container.querySelector(".cardgrp");
    expect(grp?.className).toContain("joined");
    expect(grp?.className).not.toContain("sep");
    expect(container.querySelectorAll(".cg-hb").length).toBe(2);
  });

  it("separated : gouttières, classe sep", () => {
    const { container } = render(
      <CardGroup separated label="Séparées">{[uneCarte("Une"), uneCarte("Deux")]}</CardGroup>,
    );
    expect(container.querySelector(".cardgrp")?.className).toContain("sep");
  });

  it("solo : une carte isolée, sans highlight de proximité", () => {
    const { container } = render(
      <CardGroup solo mode="clickable" label="Isolée">{uneCarte("Seule")}</CardGroup>,
    );
    expect(container.querySelector(".cardgrp")?.className).toContain("solo");
    expect(container.querySelector(".cg-hl")).toBeNull();
  });
});

describe("CardGroup / composition avec l'anatomie réelle de Card", () => {
  it("Card.Media, Card.Actions et Card.TitleLink composent dans la collection", () => {
    const { container } = render(
      <CardGroup mode="clickable" separated label="Guides">
        <Card.Root>
          <Card.Media>
            <img src="/visuel.webp" alt="" />
          </Card.Media>
          <Card.Body>
            <Card.Header>
              <Card.Title>
                <Card.TitleLink href="/guides/commencer">Commencer</Card.TitleLink>
              </Card.Title>
            </Card.Header>
            <Card.Description>Installer et brancher le kit.</Card.Description>
          </Card.Body>
          <Card.Actions>
            <button type="button">Aperçu</button>
          </Card.Actions>
        </Card.Root>
      </CardGroup>,
    );
    // la cible étendue est un VRAI lien, rendu par Card (pas par la collection)
    const lien = screen.getByRole("link", { name: "Commencer" });
    expect(lien).toHaveAttribute("href", "/guides/commencer");
    expect(lien.className).toContain("ds-card-title-link");
    expect(container.querySelector(".ds-card-media img")).not.toBeNull();
    expect(container.querySelector(".ds-card-actions")).not.toBeNull();
  });

  it("Card.TitleCommand : la cible étendue-commande est un VRAI bouton (jamais un lien factice)", async () => {
    const user = userEvent.setup();
    const ouvrir = vi.fn();
    render(
      <CardGroup mode="clickable" label="Règles">
        <Card.Root>
          <Card.Body>
            <Card.Header>
              <Card.Title>
                <Card.TitleCommand onClick={ouvrir}>Comprendre la règle</Card.TitleCommand>
              </Card.Title>
            </Card.Header>
          </Card.Body>
        </Card.Root>
      </CardGroup>,
    );
    const cmd = screen.getByRole("button", { name: "Comprendre la règle" });
    expect(cmd.tagName).toBe("BUTTON");
    expect(cmd).toHaveAttribute("type", "button");
    await user.click(cmd);
    expect(ouvrir).toHaveBeenCalledTimes(1);
  });
});

describe("Atelier / les démos consomment directement Card et la vraie frontière du pattern", () => {
  const ici = dirname(fileURLToPath(import.meta.url));
  const atelier = join(ici, "../../../../../apps/site/app/ui");

  it("la démo Card/CardGroup de l'atelier compose l'API publique (Card.Root), sans API locale ni carte intermédiaire", () => {
    const src = readFileSync(join(atelier, "card-group.tsx"), "utf8");
    expect(src).toMatch(/import .*\bCard\b.* from "@fili\/react"/);
    expect(src).toContain("<Card.Root");
    expect(src).not.toContain("CardGroup.Card");
    expect(src).not.toContain("<DemoCard"); // plus aucun composant entre CardGroup et ses cartes
  });

  it("les extraits affichés sont l'API publique copiable (Card.Root / CardGroup), jamais un helper <CardGroup s={{…}} />", () => {
    const src = readFileSync(join(atelier, "card-group.tsx"), "utf8");
    expect(src).not.toMatch(/<CardGroup s=/);
    expect(src).toMatch(/<Card\.Root/); // le générateur d'extraits émet l'anatomie réelle
    const registry = readFileSync(join(atelier, "registry.tsx"), "utf8");
    expect(registry).toContain("CardDemo");
    expect(registry).not.toContain("codeCardSolo");
  });

  it("PREUVE runtime : la démo CardGroup rend des Card.Root directs — la validation du pattern passe", async () => {
    const { CardGroupDemo } = await import("../../../../../apps/site/app/ui/card-group");
    // Si un composant intermédiaire s'était glissé entre CardGroup et ses cartes, le
    // rendu jetterait (frontière exécutable) : le succès EST la preuve.
    const { container } = render(
      <CardGroupDemo s={{ density: "comfortable", cols: "2", separated: true, mode: "clickable", skeleton: false }} />,
    );
    expect(container.querySelectorAll(".ds-card").length).toBe(4);
    expect(container.querySelectorAll('[role="listitem"]').length).toBe(4);
    expect(container.querySelectorAll("a.ds-card-title-link").length).toBe(4);
  });

  it("PREUVE runtime : l'entrée Card reste une vraie Card seule (Card.Root direct, hors collection)", async () => {
    const { CardDemo } = await import("../../../../../apps/site/app/ui/card-group");
    const { container } = render(
      <CardDemo s={{ media: "icône", icone: "au-dessus", adaptive: true, description: true, buttons: false, density: "comfortable", mode: "static", skeleton: false }} />,
    );
    expect(container.querySelectorAll(".ds-card").length).toBe(1);
    expect(container.querySelector('[role="list"]')).toBeNull(); // pas de collection autour
    expect(container.querySelector(".ds-card-icon")).not.toBeNull();
  });
});
