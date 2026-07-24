"use client";
import * as React from "react";
import { cn } from "../lib/cn";
import { Sparkline } from "../charts/sparkline";
import "./widgets.css";

export interface KpiItem {
  label: string;
  value: string;
  delta?: { value: string; tone?: "up" | "down" };
  spark: number[];
  color?: string;
}

export interface KpiGroupProps {
  items: KpiItem[];
  className?: string;
}

/** Bandeau de metriques (facon HeroUI "With KPIs") : libelle, valeur, delta et
    sparkline inline. La grille passe de 1 a N colonnes selon la largeur (container query). */
export function KpiGroup({ items, className }: KpiGroupProps) {
  return (
    <div className={cn("sw-kpis", className)}>
      {items.map((it, i) => {
        const down = it.delta?.tone === "down";
        return (
          <article className="sw-kpi" key={i}>
            <span className="sw-kpi-label">{it.label}</span>
            <div className="sw-kpi-value">{it.value}</div>
            {it.delta ? (
              <span className={cn("sw-delta", down && "is-neg")}>{down ? "▼" : "▲"} {it.delta.value}</span>
            ) : null}
            <div className="sw-kpi-spark">
              <Sparkline data={it.spark} color={it.color ?? "var(--primary)"} fitParent />
            </div>
          </article>
        );
      })}
    </div>
  );
}
