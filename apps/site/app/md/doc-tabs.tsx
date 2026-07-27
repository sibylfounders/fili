"use client";
import * as React from "react";
import { Tabs } from "@sibyl/react";

/** Demande d'ouvrir un volet et d'aller à une ancre (une règle citée depuis une situation). */
export const EVENEMENT_VOLET = "doctrine:volet";
export function allerAuVolet(volet: string, ancre?: string) {
  window.dispatchEvent(new CustomEvent(EVENEMENT_VOLET, { detail: { volet, ancre } }));
}

/** Volets d'une fiche — Tabs du DS ; les panneaux sont rendus côté serveur et passés en props. */
export function DocTabs({
  items,
  label = "Volets de la fiche",
}: {
  items: { value: string; label: string; content: React.ReactNode }[];
  label?: string;
}) {
  const [value, setValue] = React.useState(items[0]?.value ?? "");

  React.useEffect(() => {
    const onDemande = (e: Event) => {
      const { volet, ancre } = (e as CustomEvent<{ volet: string; ancre?: string }>).detail ?? {};
      if (!items.some((i) => i.value === volet)) return;
      setValue(volet);
      if (!ancre) return;
      // le volet doit être monté avant qu'on puisse viser l'ancre
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const cible = document.getElementById(ancre);
          cible?.scrollIntoView({ block: "center", behavior: "smooth" });
          cible?.classList.add("cible-visee");
          window.setTimeout(() => cible?.classList.remove("cible-visee"), 1600);
        }),
      );
    };
    window.addEventListener(EVENEMENT_VOLET, onDemande);
    return () => window.removeEventListener(EVENEMENT_VOLET, onDemande);
  }, [items]);

  if (items.length === 0) return null;
  return (
    <Tabs.Root value={value} onValueChange={setValue} variant="line" className="gap-xl">
      <Tabs.List label={label}>
        {items.map((i) => (
          <Tabs.Tab key={i.value} value={i.value}>
            {i.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {items.map((i) => (
        <Tabs.Panel key={i.value} value={i.value}>
          {i.content}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
