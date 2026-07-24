"use client";
import * as React from "react";
import { Button, Switch, Select, Divider } from "@sibyl/react";

export default function Atelier() {
  const [on, setOn] = React.useState(true);
  const [choice, setChoice] = React.useState<string | null>(null);
  return (
    <main className="mx-auto max-w-[900px] px-lg py-xl">
      <h1 className="text-3xl font-semibold text-text-primary">Composants</h1>
      <p className="mb-xl text-sm text-text-muted">
        Les vrais composants <code>@sibyl/react</code>. Le ThemeToggle (rail de droite) bascule{" "}
        <code>data-theme</code> : tout suit via les <code>var()</code>.
      </p>
      <div className="grid gap-xl">
        <section>
          <h2 className="mb-md text-lg font-medium text-text-primary">Button</h2>
          <div className="flex gap-md"><Button>Action</Button></div>
        </section>
        <Divider />
        <section>
          <h2 className="mb-md text-lg font-medium text-text-primary">Switch</h2>
          <Switch checked={on} onCheckedChange={setOn} aria-label="Exemple" />
        </section>
        <Divider />
        <section>
          <h2 className="mb-md text-lg font-medium text-text-primary">Select</h2>
          <Select
            options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }]}
            value={choice} onValueChange={setChoice} placeholder="Choisir…" aria-label="Exemple"
          />
        </section>
      </div>
    </main>
  );
}
