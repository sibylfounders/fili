"use client";
import * as React from "react";
import { Brand, ThemeToggle, Button, Switch, Select, Divider, Container } from "@sibyl/react";

export default function Atelier() {
  const [dark, setDark] = React.useState(false);
  const [on, setOn] = React.useState(true);
  const [choice, setChoice] = React.useState<string | null>(null);

  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <Container size="wide">
      <div className="min-h-screen py-lg">
        <header className="mb-xl flex items-center justify-between border-b border-border pb-md">
          <Brand.Root>
            <Brand.Text>Atelier — Sibyl UI</Brand.Text>
          </Brand.Root>
          <div className="flex items-center gap-md">
            <span className="text-sm text-text-secondary">Thème sombre</span>
            <ThemeToggle checked={dark} onCheckedChange={setDark} aria-label="Thème sombre" />
          </div>
        </header>

        <p className="mb-xl text-sm text-text-muted">
          Les vrais composants <code>@sibyl/react</code>, montés dans une app Next du monorepo.
          Le ThemeToggle bascule <code>data-theme</code> : tout suit via les <code>var()</code>.
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
              value={choice}
              onValueChange={setChoice}
              placeholder="Choisir…"
              aria-label="Exemple"
            />
          </section>
        </div>
      </div>
    </Container>
  );
}
