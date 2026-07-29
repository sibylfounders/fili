"use client";
import * as React from "react";
import { Button, CardGroup as Kit, CompactButton } from "@fili/react";
import { CARD_IMGS } from "./card-imgs";

/* ══ Démo « Card group » de l'atelier — pilote le VRAI composant du package
   (`CardGroup` de @fili/react, promu le 2026-07-26). Ce fichier ne porte plus que
   les données de démonstration, la traduction des réglages du playground et le
   squelette de chargement. Les actions dogfoodent Button/CompactButton. ══ */

export interface CardState {
  media: "icône" | "image" | "aucun" | string;
  description: boolean;
  buttons: boolean;
  density: "comfortable" | "compact" | string;
  orientation: "défaut" | "inline" | string;
  cols: "1" | "2" | "3" | string;
  separated: boolean;
  mode: "static" | "clickable" | "selectable" | string;
  skeleton: boolean;
}

/* icônes COLORÉES du menu DS-MD (dérogation actée 2026-07-23, cf. .cg-chip) */
const NAV_ICONS: Record<string, string> = {
  couleur: '<circle cx="8.5" cy="9.5" r="5.5" fill="#EE7A66"/><circle cx="15.5" cy="9.5" r="5.5" fill="#31A06E"/><circle cx="12" cy="15.5" r="5.5" fill="#4F46E5"/>',
  motion: '<circle cx="15.5" cy="12" r="6.2" fill="#4F46E5"/><path d="M14 9.4 l4.2 2.6 -4.2 2.6 Z" fill="#FFFFFF"/><rect x="2" y="7.6" width="7" height="2.2" rx="1.1" fill="#F2C744"/><rect x="4.5" y="11.9" width="4.5" height="2.2" rx="1.1" fill="#0891B2"/><rect x="2" y="16.2" width="7" height="2.2" rx="1.1" fill="#bcb9f5"/>',
  ombres: '<rect x="6" y="4" width="15" height="10" rx="2.5" fill="#F2C744"/><rect x="3" y="10" width="15" height="10" rx="2.5" fill="#4F46E5"/><rect x="6.5" y="14" width="8" height="2" rx="1" fill="#FFFFFF"/>',
  adaptive: '<rect x="2" y="5" width="8" height="14" rx="2.5" fill="#bcb9f5" stroke="#4F46E5" stroke-width="1.5"/><rect x="13" y="5" width="9" height="14" rx="2.5" fill="#bcb9f5" stroke="#0891B2" stroke-width="1.5"/><rect x="4" y="8" width="4" height="2" rx="1" fill="#4F46E5"/><rect x="15" y="8" width="5" height="2" rx="1" fill="#0891B2"/><rect x="15" y="12" width="5" height="4" rx="1.5" fill="#F2C744"/>',
};

const DEMOS = [
  { t: "Motion fluide", d: "Entrées posées, sorties au cran inférieur — sans tokens dédiés.", ic: "motion" },
  { t: "Relief comme signal", d: "L'élévation n'apparaît qu'au survol d'une carte cliquable.", ic: "ombres" },
  { t: "Adaptive par conteneur", d: "La carte choisit sa disposition selon SA largeur reçue.", ic: "adaptive" },
  { t: "Thème vivant", d: "Clair/sombre et crans de rayon pilotés par les tokens.", ic: "couleur" },
];

const MORE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>';

const H = (html: string) => ({ __html: html });

/* ── skeleton (miroir de skCardItem) ── */
const Sk = ({ w, h, r, style }: { w: string; h: string; r?: string; style?: React.CSSProperties }) => (
  <span className="sk" style={{ width: w, height: h, borderRadius: r, ...style }} />
);
function SkItem({ s, inline }: { s: CardState; inline: boolean }) {
  const media =
    s.media === "aucun" ? null
      : s.media === "image"
        ? (inline
          ? <Sk w="96px" h="auto" r="6px" style={{ alignSelf: "stretch", minHeight: 64, margin: "8px 0 8px 8px" }} />
          : <span className="sk" style={{ display: "block", width: "calc(100% - 32px)", margin: "16px 16px 0", height: 0, paddingTop: "calc(36.8% - 12px)", boxSizing: "content-box", borderRadius: 6 }} />)
        : (inline ? <Sk w="32px" h="32px" r="var(--radius-md)" /> : null);
  const chipTop = !inline && s.media === "icône" ? <><Sk w="32px" h="32px" r="var(--radius-md)" /><span style={{ height: 8 }} /></> : null;
  const desc = s.description ? <Sk w="92%" h="12px" /> : null;
  const btns = s.buttons ? (
    <div className="sk-row" style={{ padding: inline ? 0 : "12px 16px 0" }}><Sk w="84px" h="28px" r="var(--radius-md)" /><Sk w="92px" h="28px" r="var(--radius-md)" /></div>
  ) : null;
  const body = inline ? (
    <>
      {media}
      <span className="sk-col" style={{ flex: 1, padding: "12px 0" }}><Sk w="45%" h="14px" />{desc}</span>
      {s.buttons ? <div className="sk-row" style={{ marginLeft: "auto", paddingRight: 16 }}><Sk w="84px" h="28px" r="var(--radius-md)" /></div> : null}
    </>
  ) : (
    <>
      {media}
      <div className="cg-head"><span className="sk-col" style={{ width: "100%" }}>{chipTop}<Sk w="55%" h="14px" />{desc}</span></div>
      {btns}
    </>
  );
  return (
    <div className={"cg-card" + (s.media === "image" && inline ? " has-img" : "")} role="listitem" aria-hidden="true">
      <span className="cg-hb" aria-hidden="true" /><span className="cg-hr" aria-hidden="true" />{body}
    </div>
  );
}

export function CardGroup({ s, solo }: { s: CardState; solo?: boolean }) {
  const inline = s.orientation === "inline";
  const cols = (solo ? 1 : inline ? 1 : Number(s.cols)) as 1 | 2 | 3;
  const demos = solo ? [DEMOS[0]] : DEMOS;
  const [choisies, setChoisies] = React.useState<Record<number, boolean>>({});

  if (s.skeleton) {
    const grpCls =
      `cardgrp ${solo || s.separated ? "sep" : "joined"} outlined ${solo ? "solo " : ""}` +
      `${s.density} ${inline ? "inline" : "stacked"}`;
    return (
      <div className={grpCls} style={{ ["--grp-cols" as string]: cols } as React.CSSProperties} aria-busy="true">
        {demos.map((_, i) => <SkItem key={i} s={s} inline={inline} />)}
      </div>
    );
  }

  return (
    <Kit
      cols={cols}
      solo={solo}
      separated={s.separated}
      density={s.density as "spacious" | "comfortable" | "compact"}
      orientation={inline ? "inline" : "stacked"}
      mode={s.mode as "static" | "clickable" | "selectable"}
      label="Cartes de démonstration"
    >
      {demos.map((c, i) => (
        <Kit.Card
          key={i}
          title={c.t}
          description={s.description ? c.d : undefined}
          href={s.mode === "clickable" ? "#" : undefined}
          selected={!!choisies[i]}
          onSelectedChange={(v) => setChoisies((p) => ({ ...p, [i]: v }))}
          icon={s.media === "icône" ? <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={H(NAV_ICONS[c.ic])} /> : undefined}
          media={s.media === "image" ? <img src={CARD_IMGS[i % CARD_IMGS.length]} alt="" loading="lazy" /> : undefined}
          actions={
            s.buttons && s.mode !== "clickable" ? (
              <>
                <Button.Root variant="stroke" tone="neutral" size="sm">Commencer</Button.Root>
                <CompactButton variant="ghost" tone="neutral" size="md" fullRadius aria-label="Plus d'actions">
                  <span dangerouslySetInnerHTML={H(MORE)} />
                </CompactButton>
              </>
            ) : undefined
          }
        />
      ))}
    </Kit>
  );
}

/* ── code affiché (React) ── */
export function codeCardSolo(s: CardState): string {
  return `<CardGroup solo s={{ media: "${s.media}", density: "${s.density}", mode: "${s.mode}"${s.description ? ", description: true" : ""}${s.buttons ? ", buttons: true" : ""} }} />`;
}
export function codeCardGrp(s: CardState): string {
  return `<CardGroup s={{\n  media: "${s.media}", density: "${s.density}",\n  orientation: "${s.orientation}", cols: "${s.cols}", separated: ${s.separated},\n  mode: "${s.mode}", description: ${s.description}, buttons: ${s.buttons}\n}} />`;
}
