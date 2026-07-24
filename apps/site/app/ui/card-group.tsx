"use client";
import * as React from "react";
import { Button, CompactButton } from "@sibyl/react";
import { CARD_IMGS } from "./card-imgs";

/* ══ Card / Card group — transcription fidèle d'atelier.html (cgParts + wireOneGroup).
   Cartes transparentes (z1) au-dessus d'un highlight de proximité (z0, rect exact),
   filets internes par carte (mode joint), coins hérités du conteneur, sélection/clic,
   densité, orientation, colonnes, skeleton. Les actions dogfoodent Button/CompactButton. ══ */

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

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const MORE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>';

const H = (html: string) => ({ __html: html });

/* ── comportements imperatifs (miroir de wireOneGroup) ── */
export function useCardGroup(ref: React.RefObject<HTMLDivElement | null>, s: CardState, solo?: boolean) {
  const dep = JSON.stringify(s) + (solo ? "|solo" : "");
  React.useLayoutEffect(() => {
    const grp = ref.current;
    if (!grp) return;
    const cards = Array.from(grp.querySelectorAll<HTMLElement>(".cg-card"));
    if (!cards.length) return;
    const cleanups: Array<() => void> = [];
    const effCols = () => getComputedStyle(grp).gridTemplateColumns.split(" ").length;

    const trim = () => {
      const n = effCols();
      const len = cards.length;
      const lastRowStart = (Math.ceil(len / n) - 1) * n;
      cards.forEach((c, i) => {
        c.classList.toggle("no-r", (i + 1) % n === 0);
        c.classList.toggle("no-b", i >= lastRowStart);
        c.classList.toggle("c-tl", i === 0);
        c.classList.toggle("c-tr", i === Math.min(n, len) - 1);
        c.classList.toggle("c-bl", i === lastRowStart);
        c.classList.toggle("c-br", i === len - 1 && (len % n === 0 || n === 1));
      });
    };
    trim();
    const ro = new ResizeObserver(trim);
    ro.observe(grp);
    cleanups.push(() => ro.disconnect());

    if (s.mode === "clickable")
      cards.forEach((c) => {
        const a = c.querySelector<HTMLElement>(".cg-title a");
        if (!a) return;
        const h = (e: Event) => { if (!(e.target as HTMLElement).closest("a")) a.click(); };
        c.addEventListener("click", h);
        cleanups.push(() => c.removeEventListener("click", h));
      });

    if (s.mode === "selectable")
      cards.forEach((c) => {
        const toggle = () => {
          const on = !c.classList.contains("selected");
          c.classList.toggle("selected", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        };
        const onClick = (e: Event) => { if (!(e.target as HTMLElement).closest(".cg-actions")) toggle(); };
        const onKey = (e: KeyboardEvent) => { if ((e.key === " " || e.key === "Enter") && e.target === c) { e.preventDefault(); toggle(); } };
        c.addEventListener("click", onClick);
        c.addEventListener("keydown", onKey as EventListener);
        cleanups.push(() => { c.removeEventListener("click", onClick); c.removeEventListener("keydown", onKey as EventListener); });
      });

    if (grp.dataset.prox === "1") {
      const hl = grp.querySelector<HTMLElement>(".cg-hl");
      if (hl) {
        let visible = false;
        const clearAdj = () => cards.forEach((c) => c.classList.remove("hl-off-b", "hl-off-r"));
        const place = (it: HTMLElement) => {
          hl.classList.toggle("teleport", !visible);
          hl.style.transform = `translate(${it.offsetLeft}px,${it.offsetTop}px)`;
          hl.style.width = it.offsetWidth + "px";
          hl.style.height = it.offsetHeight + "px";
          if (!visible) { void hl.offsetWidth; hl.classList.add("on"); visible = true; }
          const n = effCols();
          const i = Number(it.dataset.i);
          clearAdj();
          it.classList.add("hl-off-b", "hl-off-r");
          if (i % n > 0) cards[i - 1]?.classList.add("hl-off-r");
          if (i - n >= 0) cards[i - n]?.classList.add("hl-off-b");
        };
        const nearest = (e: MouseEvent) => {
          let best: HTMLElement | null = null, bd = Infinity;
          for (const it of cards) {
            if (bd === -1) break;
            const r = it.getBoundingClientRect();
            if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) { best = it; bd = -1; break; }
            const d = Math.hypot(e.clientX - (r.left + r.right) / 2, e.clientY - (r.top + r.bottom) / 2);
            if (d < bd) { bd = d; best = it; }
          }
          return best;
        };
        const onMove = (e: MouseEvent) => { const it = nearest(e); if (it) place(it); };
        const onLeave = () => { hl.classList.remove("on"); visible = false; clearAdj(); };
        grp.addEventListener("mousemove", onMove);
        grp.addEventListener("mouseleave", onLeave);
        cleanups.push(() => { grp.removeEventListener("mousemove", onMove); grp.removeEventListener("mouseleave", onLeave); });
      }
    }
    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}

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
  const ref = React.useRef<HTMLDivElement>(null);
  useCardGroup(ref, s, solo);
  const inline = s.orientation === "inline";
  const target = s.mode === "clickable" || s.mode === "selectable";
  const cols = solo ? 1 : inline ? 1 : Number(s.cols);
  const demos = solo ? [DEMOS[0]] : DEMOS;

  if (s.skeleton) {
    const grpCls = solo
      ? `cardgrp sep outlined solo ${inline ? "inline" : "stacked"}`
      : `cardgrp ${s.separated ? "sep" : "joined"} outlined ${inline ? "inline" : "stacked"}`;
    return (
      <div ref={ref} className={grpCls} style={{ ["--grp-cols" as any]: cols }} data-prox="0" aria-busy="true">
        {demos.map((_, i) => <SkItem key={i} s={s} inline={inline} />)}
      </div>
    );
  }

  const grpCls = solo
    ? `cardgrp sep outlined solo ${s.density} ${inline ? "inline" : "stacked"}`
    : `cardgrp ${s.separated ? "sep" : "joined"} outlined ${s.density} ${inline ? "inline" : "stacked"}`;

  const Item = ({ c, i }: { c: (typeof DEMOS)[number]; i: number }) => {
    const chip = s.media === "icône" ? <span className="cg-chip" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={H(NAV_ICONS[c.ic])} /></span> : null;
    const imgTop = s.media === "image" && !inline ? <span className="cg-media--top" aria-hidden="true"><img src={CARD_IMGS[i % CARD_IMGS.length]} alt="" loading="lazy" /></span> : null;
    const imgSide = s.media === "image" && inline ? <span className="cg-media--side" aria-hidden="true"><img src={CARD_IMGS[i % CARD_IMGS.length]} alt="" loading="lazy" /></span> : null;
    const desc = s.description ? <p className="cg-desc">{c.d}</p> : null;
    const title = s.mode === "clickable" ? <h4 className="cg-title"><a href="#" onClick={(e) => e.preventDefault()}>{c.t}</a></h4> : <h4 className="cg-title">{c.t}</h4>;
    const check = s.mode === "selectable" ? <span className="cg-check" aria-hidden="true" dangerouslySetInnerHTML={H(CHECK)} /> : null;
    const lift = target ? <span className="cg-lift" aria-hidden="true" /> : null;
    const btns = s.buttons && s.mode !== "clickable" ? (
      <div className="cg-actions">
        <Button.Root style="stroke" tone="neutral" size="sm">Commencer</Button.Root>
        <CompactButton style="ghost" tone="neutral" size="md" fullRadius aria-label="Plus d'actions"><span dangerouslySetInnerHTML={H(MORE)} /></CompactButton>
      </div>
    ) : null;
    const modeCls = s.mode === "clickable" ? " cg-card--click" : s.mode === "selectable" ? " cg-card--select" : "";
    const selAttrs = s.mode === "selectable"
      ? ({ role: "button", tabIndex: 0, "aria-pressed": false } as const)
      : ({ role: "listitem" } as const);
    const body = inline ? (
      <div className="cg-inner">{imgSide}{chip}<div className="cg-text">{title}{desc}</div>{btns}</div>
    ) : (
      <>{imgTop}<div className="cg-head">{chip}{title}{desc}</div>{btns}</>
    );
    return (
      <div className={"cg-card" + modeCls + (s.media === "image" && inline ? " has-img" : "")} data-i={i} {...selAttrs}>
        <span className="cg-hb" aria-hidden="true" /><span className="cg-hr" aria-hidden="true" />{lift}{check}{body}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={grpCls}
      style={{ ["--grp-cols" as any]: cols }}
      data-prox={!solo && target ? "1" : "0"}
      role={s.mode === "selectable" ? undefined : "list"}
    >
      {!solo ? <div className="cg-hl" aria-hidden="true" /> : null}
      {demos.map((c, i) => <Item key={i} c={c} i={i} />)}
    </div>
  );
}

/* ── code affiché (React) ── */
export function codeCardSolo(s: CardState): string {
  return `<CardGroup solo s={{ media: "${s.media}", density: "${s.density}", mode: "${s.mode}"${s.description ? ", description: true" : ""}${s.buttons ? ", buttons: true" : ""} }} />`;
}
export function codeCardGrp(s: CardState): string {
  return `<CardGroup s={{\n  media: "${s.media}", density: "${s.density}",\n  orientation: "${s.orientation}", cols: "${s.cols}", separated: ${s.separated},\n  mode: "${s.mode}", description: ${s.description}, buttons: ${s.buttons}\n}} />`;
}
