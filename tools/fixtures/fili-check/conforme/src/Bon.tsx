// FIXTURE POSITIVE — consommation conforme : zéro écart attendu.
import * as React from "react";
import { Button, Input, Select, Card } from "@fili/react";

export function Bon({ value, onChange }: { value: string | null; onChange: (v: string) => void }) {
  return (
    <Card.Root mode="static">
      <Card.Body>
        <Input.Root status="default">
          <Input.Wrapper>
            <Input.Input type="email" aria-label="E-mail" />
          </Input.Wrapper>
        </Input.Root>
        <Select options={[{ value: "a", label: "A" }]} value={value} onValueChange={onChange} aria-label="Choix" />
        <Button variant="stroke" tone="neutral">Annuler</Button>
        {/* FILI-MANQUE: date-picker */}
        <p>Champ de date temporaire déclaré (fiche présente).</p>
      </Card.Body>
    </Card.Root>
  );
}
