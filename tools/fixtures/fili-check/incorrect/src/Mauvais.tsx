// FIXTURE NÉGATIVE — chaque motif ci-dessous DOIT être détecté par fili-check.
import { Button } from "@sibyl/react";
import * as React from "react";

export function Mauvais() {
  const go = () => {};
  return (
    <div>
      {/* contrôle natif sur une ligne */}
      <button onClick={go}>Enregistrer</button>
      {/* contrôle natif sur PLUSIEURS lignes (l'analyse ligne à ligne le ratait) */}
      <input
        type="email"
        placeholder="vous@exemple.fr"
      />
      <select>
        <option>Un</option>
      </select>
      <div onClick={go}>Cliquer ici</div>
      <span role="button" tabIndex={0}>pseudo-bouton</span>
      {/* palette Tailwind brute */}
      <p className="text-gray-500">gris cru</p>
      {/* carte recréée localement */}
      <div className="border rounded-lg shadow-md bg-white p-4">carte maison</div>
      {/* valeur d'axe inventée */}
      <Button variant="filled" tone="magic">Magique</Button>
      {/* FILI-MANQUE: date-picker — aucune fiche .fili/manques/date-picker.md ici */}
    </div>
  );
}
