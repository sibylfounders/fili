"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Accordion, Nav } from "@fili/react";
import type { NavGroupe } from "@/lib/md";

/**
 * Nav de la section Doctrine — portée dans la colonne de gauche du Shell (#section-nav).
 * Repère <nav> étiqueté + regroupement en Accordion (pattern navigation du DS).
 * Les liens reprennent la facture de Nav.Link mais passent par next/link (navigation client).
 */
const LIEN =
  "block rounded-sm px-sm py-1.5 text-sm no-underline transition-colors duration-fast ease-out " +
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const LIEN_COURANT = "bg-primary-subtle font-medium text-on-primary-subtle";
const LIEN_REPOS = "text-text-secondary hover:bg-surface-hover hover:text-text-primary";

function Lien({
  href, current, children, className = "", embleme,
}: { href: string; current: boolean; children: React.ReactNode; className?: string; embleme?: string }) {
  return (
    <li className="list-none">
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className={`${LIEN} ${current ? LIEN_COURANT : LIEN_REPOS} ${className} flex items-center gap-sm`}
      >
        {embleme ? (
          <span aria-hidden="true" className="shrink-0 [&_svg]:h-4 [&_svg]:w-4" dangerouslySetInnerHTML={{ __html: embleme }} />
        ) : null}
        <span className="min-w-0 truncate">{children}</span>
      </Link>
    </li>
  );
}

const norm = (p: string) => (p.endsWith("/") ? p.slice(0, -1) : p);

export function MdNav({ groupes }: { groupes: NavGroupe[] }) {
  const pathname = norm(usePathname() ?? "");
  const [slot, setSlot] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => setSlot(document.getElementById("section-nav")), []);

  const courant = groupes.find((g) => g.items.some((i) => norm(i.href) === pathname));
  const [ouvert] = React.useState<string[]>(() => (courant ? [courant.label] : ["Fondations"]));

  const arbre = (
    <div className="flex flex-col gap-xs">
      <Nav.Root label="Doctrine">
        <Nav.List>
          <Lien href="/md/" current={pathname === "/md"}>
            Vue d'ensemble
          </Lien>
        </Nav.List>
      </Nav.Root>
      <Accordion.Root defaultOpen={ouvert}>
        {groupes.map((g) => (
          <Accordion.Item key={g.label} value={g.label}>
            <Accordion.Header level={2} className="px-sm">
              <span className="font-label text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                {g.label}
              </span>
            </Accordion.Header>
            <Accordion.Panel className="px-0 pb-sm pt-0">
              <Nav.Root label={g.label}>
                <Nav.List>
                  {g.items.map((i) => (
                    <Lien key={i.href} href={i.href} current={norm(i.href) === pathname} className="pl-sm" embleme={i.embleme}>
                      {i.label}
                    </Lien>
                  ))}
                </Nav.List>
              </Nav.Root>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );

  return slot ? createPortal(arbre, slot) : null;
}
