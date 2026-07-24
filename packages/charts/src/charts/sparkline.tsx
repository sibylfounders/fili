"use client";
import * as React from "react";
import { cn } from "../lib/cn";
import { points, smoothPath } from "../lib/geometry";

export interface SparklineProps {
  data: number[];
  height?: number;
  color?: string;
  fill?: boolean;
  fitParent?: boolean;
  className?: string;
}

/** Mini-courbe decorative (sans axe ni interaction) — viewBox etire, trait constant. */
export function Sparkline({ data, height = 40, color = "var(--primary)", fill = true, fitParent = false, className }: SparklineProps) {
  const uid = React.useId().replace(/:/g, "");
  const gid = `chSpark-${uid}`, cid = `chSparkClip-${uid}`;
  const W = 100, H = height;
  const pts = points(data, W, H, 3);
  const { line, area } = smoothPath(pts, W, H);
  return (
    <div className={cn("ch-spark", className)} style={{ height: fitParent ? "100%" : height }} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.22" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <clipPath id={cid}><rect className="ch-reveal" x="0" y="0" width={W} height={H} /></clipPath>
        </defs>
        <g className="ch-anim" clipPath={`url(#${cid})`}>
          {fill ? <path d={area} fill={`url(#${gid})`} /> : null}
          <path className="ch-line" d={line} style={{ stroke: color }} vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}
