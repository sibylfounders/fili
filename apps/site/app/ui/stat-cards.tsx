"use client";
import * as React from "react";

/* ══════════════════════════════════════════════════════════════════════════
   StatCard + graphes — port fidèle de l'entrée `adacard` d'atelier.html.
   KPI adaptative (compact/regular/expanded via container queries) + trois
   graphes SVG responsives & animés « façon Recharts », réimplémentés sur
   tokens. Le CSS vit dans globals.css (.stat-card / .st-* / .sc-*).
   ══════════════════════════════════════════════════════════════════════════ */

/* ── données ── */
const KPI_VALS = [1420, 1560, 1490, 1720, 1640, 1580, 1810, 1750, 1930, 1880, 2050, 1990, 2180, 2310];
const AREA_MOIS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const AREA_DATA = [32, 40, 36, 52, 47, 61, 55, 68, 63, 79, 73, 88];
const COMP_DATA = [{ b: 38, l: 52 }, { b: 52, l: 48 }, { b: 44, l: 61 }, { b: 65, l: 57 }, { b: 58, l: 71 }, { b: 77, l: 66 }, { b: 70, l: 83 }];
const COMP_SEM = ["S1", "S2", "S3", "S4", "S5", "S6", "S7"];
const PIE_DATA = [
  { l: "Vie", v: 34, c: "var(--primary)" },
  { l: "Santé", v: 23, c: "var(--info)" },
  { l: "Retraite", v: 18, c: "var(--success)" },
  { l: "Habitation", v: 14, c: "var(--warning)" },
  { l: "Auto", v: 11, c: "var(--danger)" },
];

/* ── helpers géométrie (catmull-rom → bézier, identique à atelier) ── */
function scArea(vals: number[], W: number, H: number, pad: number) {
  const n = vals.length,
    mn = Math.min.apply(null, vals),
    mx = Math.max.apply(null, vals),
    rng = mx - mn || 1;
  const pts = vals.map((v, i) => [(i / (n - 1)) * W, H - pad - ((v - mn) / rng) * (H - 2 * pad)] as [number, number]);
  let d = "M" + pts[0][0].toFixed(2) + " " + pts[0][1].toFixed(2);
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6,
      c1y = p1[1] + (p2[1] - p0[1]) / 6,
      c2x = p2[0] - (p3[0] - p1[0]) / 6,
      c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += " C" + c1x.toFixed(2) + " " + c1y.toFixed(2) + " " + c2x.toFixed(2) + " " + c2y.toFixed(2) + " " + p2[0].toFixed(2) + " " + p2[1].toFixed(2);
  }
  return { line: d, area: d + " L" + W + " " + H + " L0 " + H + " Z", pts };
}

function ScGrid({ W, H }: { W: number; H: number }) {
  return (
    <>
      {[0.25, 0.5, 0.75].map((f, i) => (
        <line key={i} className="sc-grid" x1={0} y1={+(H * f).toFixed(1)} x2={W} y2={+(H * f).toFixed(1)} vectorEffect="non-scaling-stroke" />
      ))}
    </>
  );
}

/* ── count-up (respecte prefers-reduced-motion) ── */
function useCountUp(target: number, fmt: (v: number) => string) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      el.textContent = fmt(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (n: number) => {
      const k = Math.min(1, (n - t0) / 850),
        e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(target * e);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, fmt]);
  return ref;
}

const eur = (v: number) => Math.round(v).toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, " ") + " €";

/* ── 1. Carte KPI — adaptative ── */
export function KpiCard() {
  const { line, area } = scArea(KPI_VALS, 100, 40, 3);
  const figRef = useCountUp(48210, eur);
  const det: [string, string][] = [
    ["Nouveaux clients", "312"],
    ["Panier moyen", "154 €"],
    ["Taux de retour", "2,1 %"],
  ];
  return (
    <div className="stk-cell" style={{ width: "100%" }}>
      <article className="stat-card stcard">
        <span className="st-etat" aria-hidden="true" />
        <h4>Revenu net</h4>
        <p className="st-sous">30 derniers jours</p>
        <div className="st-chiffre" ref={figRef}>
          0 €
        </div>
        <span className="st-delta">▲ 6,4 % vs période précédente</span>
        <div className="st-spark scard-spark sc-anim" aria-hidden="true">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="kpiG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--primary)" stopOpacity="0.24" />
                <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
              <clipPath id="kpiClip">
                <rect className="sc-reveal" x="0" y="0" width="100" height="40" />
              </clipPath>
            </defs>
            <g clipPath="url(#kpiClip)">
              <path d={area} fill="url(#kpiG)" />
              <path d={line} fill="none" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
        <div className="st-detail scard-foot">
          <ul>
            {det.map((d, i) => (
              <li key={i}>
                <span>{d[0]}</span>
                <span>{d[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}

/* ── 2. Aire — responsive & animée ── */
export function AreaCard() {
  const W = 100,
    H = 42,
    pad = 4;
  const { line, area, pts } = scArea(AREA_DATA, W, H, pad);
  const last = pts[pts.length - 1];
  return (
    <article className="stat-card sc-chartcard">
      <div className="sc-head">
        <div>
          <h4>Chiffre d'affaires</h4>
          <p className="st-sous">12 derniers mois</p>
        </div>
        <span className="st-delta">▲ 14,2 %</span>
      </div>
      <div className="sc-plot sc-anim">
        <svg className="sc-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="scAreaG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <clipPath id="scAreaClip">
              <rect className="sc-reveal" x="0" y="0" width={W} height={H} />
            </clipPath>
          </defs>
          <ScGrid W={W} H={H} />
          <g clipPath="url(#scAreaClip)">
            <path className="sc-fill" d={area} fill="url(#scAreaG)" />
            <path className="sc-line" d={line} fill="none" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
        <span className="sc-dot" style={{ top: `${((last[1] / H) * 100).toFixed(1)}%` }} aria-hidden="true" />
      </div>
      <div className="sc-xaxis" aria-hidden="true">
        {AREA_MOIS.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </article>
  );
}

/* ── 3. Composé — barres + ligne ── */
export function ComposedCard() {
  const W = 100,
    H = 42,
    pad = 4,
    n = COMP_DATA.length,
    mx = Math.max.apply(null, COMP_DATA.map((d) => Math.max(d.b, d.l))),
    slot = W / n,
    bw = slot * 0.46;
  const bars = COMP_DATA.map((d, i) => {
    const h = (d.b / mx) * (H - 2 * pad),
      x = i * slot + (slot - bw) / 2;
    return { x: +x.toFixed(2), y: +(H - pad - h).toFixed(2), w: +bw.toFixed(2), h: +h.toFixed(2), delay: (i * 0.06).toFixed(2) };
  });
  const lp = COMP_DATA.map((d, i) => [i * slot + slot / 2, H - pad - (d.l / mx) * (H - 2 * pad)] as [number, number]);
  let ld = "M" + lp[0][0].toFixed(2) + " " + lp[0][1].toFixed(2);
  for (let i = 1; i < n; i++) ld += " L" + lp[i][0].toFixed(2) + " " + lp[i][1].toFixed(2);
  return (
    <article className="stat-card sc-chartcard">
      <div className="sc-head">
        <div>
          <h4>Souscriptions vs objectif</h4>
          <p className="st-sous">7 dernières semaines</p>
        </div>
        <span className="st-delta">▲ 9,3 %</span>
      </div>
      <div className="sc-plot sc-anim">
        <svg className="sc-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <ScGrid W={W} H={H} />
          {bars.map((b, i) => (
            <rect key={i} className="sc-bar" x={b.x} y={b.y} width={b.w} height={b.h} rx="1" style={{ animationDelay: `${b.delay}s` }} />
          ))}
          <path className="sc-cline" pathLength={1} d={ld} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="sc-xaxis" aria-hidden="true">
        {COMP_SEM.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
    </article>
  );
}

/* ── 4. Anneau — responsive & animé ── */
export function PieCard() {
  let cum = 0;
  const segs = PIE_DATA.map((d) => {
    const rot = (cum / 100) * 360 - 90;
    cum += d.v;
    return { c: d.c, dash: `${d.v} ${100 - d.v}`, rot: +rot.toFixed(1) };
  });
  return (
    <article className="stat-card sc-donutcard">
      <div className="sc-head">
        <div>
          <h4>Répartition des contrats</h4>
          <p className="st-sous">Par catégorie · 2024</p>
        </div>
      </div>
      <div className="sc-donutwrap sc-anim">
        <div className="sc-donut">
          <svg viewBox="0 0 42 42" aria-hidden="true">
            <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--surface-hover)" strokeWidth="5.5" />
            {segs.map((s, i) => (
              <circle
                key={i}
                className="sc-seg"
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                stroke={s.c}
                strokeWidth="5.5"
                strokeDasharray={s.dash}
                style={{ transform: `rotate(${s.rot}deg)`, transformOrigin: "center" }}
              />
            ))}
          </svg>
          <div className="sc-center">
            <b>12,4k</b>
            <span>assurés</span>
          </div>
        </div>
        <ul className="sc-legend">
          {PIE_DATA.map((d, i) => (
            <li key={i}>
              <span className="sc-sw" style={{ background: d.c }} />
              {d.l}
              <b>{d.v} %</b>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ── extraits de code affichés (identiques à atelier) ── */
export function codeStatKpi() {
  return `{/* Esquisse d'API — non exportée (le pattern doit d'abord exister côté DS-MD). */}\n<StatCard adaptive>\n  {/* compact → regular (≥ 20rem) → expanded (≥ 30rem) : décidé par le conteneur de LA carte */}\n  <StatCard.Header title="Revenu net" period="30 derniers jours" />\n  <StatCard.Figure value="48 210 €" delta="+6,4 %" tone="success" />\n  <StatCard.Sparkline points={points} />\n  <StatCard.Details items={details} />\n</StatCard>`;
}
export function codeArea() {
  return `{/* Recharts — AreaChart responsive & animé (réf. AreaResponsiveContainer). */}\n<ResponsiveContainer width="100%" height={150}>\n  <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>\n    <defs>\n      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">\n        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.28} />\n        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />\n      </linearGradient>\n    </defs>\n    <CartesianGrid stroke="var(--border)" strokeDasharray="2 3" vertical={false} />\n    <XAxis dataKey="mois" tickLine={false} axisLine={false} />\n    <Area type="monotone" dataKey="ca" stroke="var(--primary)" strokeWidth={2}\n          fill="url(#rev)" isAnimationActive animationDuration={900} />\n  </AreaChart>\n</ResponsiveContainer>`;
}
export function codeComposed() {
  return `{/* Recharts — ComposedChart barres + ligne, responsive (réf. ComposedResponsiveContainer). */}\n<ResponsiveContainer width="100%" height={150}>\n  <ComposedChart data={data}>\n    <CartesianGrid stroke="var(--border)" strokeDasharray="2 3" vertical={false} />\n    <XAxis dataKey="semaine" tickLine={false} axisLine={false} />\n    <Bar dataKey="souscriptions" fill="var(--secondary)" radius={[3, 3, 0, 0]} />\n    <Line type="monotone" dataKey="objectif" stroke="var(--primary)" strokeWidth={2} dot={false} />\n  </ComposedChart>\n</ResponsiveContainer>`;
}
export function codePie() {
  return `{/* Recharts — PieChart en anneau, responsive (réf. PieResponsiveContainer). */}\n<ResponsiveContainer width="100%" height={200}>\n  <PieChart>\n    <Pie data={data} dataKey="valeur" nameKey="categorie"\n         innerRadius="62%" outerRadius="88%" paddingAngle={1} isAnimationActive>\n      {data.map((d, i) => <Cell key={i} fill={COULEURS[i % COULEURS.length]} />)}\n    </Pie>\n    <Legend layout="vertical" align="right" verticalAlign="middle" />\n  </PieChart>\n</ResponsiveContainer>`;
}
