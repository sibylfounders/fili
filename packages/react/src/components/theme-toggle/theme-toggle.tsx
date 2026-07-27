"use client";
// Composant interactif : hooks, contexte ou primitive Radix au niveau module.
// Sans cette directive, une page serveur qui importe le baril @sibyl/react casse
// (createContext évalué dans le graphe RSC).
import * as React from "react";
import "./theme-toggle.css";

export interface ThemeToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "checked" | "onChange"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

/**
 * ThemeToggle — interrupteur clair/sombre (soleil ↔ lune). Le pouce glisse et se
 * comprime au survol/press (langage fluide, port 1:1 de l'atelier). Contrôlé :
 * `checked` (= sombre) + `onCheckedChange`. Nom accessible requis (`aria-label`).
 */
export const ThemeToggle = React.forwardRef<HTMLInputElement, ThemeToggleProps>(
  ({ checked, onCheckedChange, className, ...props }, ref) => (
    <label className={["ds-theme-toggle", className].filter(Boolean).join(" ")}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.currentTarget.checked)}
        {...props}
      />
      <svg className="tr tr-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.3 17.7-1.4 1.4" /><path d="m19.1 4.9-1.4 1.4" />
      </svg>
      <svg className="tr tr-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <span className="knob" aria-hidden="true" />
    </label>
  )
);
ThemeToggle.displayName = "ThemeToggle";
