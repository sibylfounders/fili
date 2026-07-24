"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { Drawer } from "../drawer";

/**
 * AppLayout — FAÇADE à options du shell applicatif (DS-MD « Shell applicatif »).
 * Contrairement à une API compositionnelle (cf. la primitive AppShell, réutilisable
 * en dessous pour les cas hors presets), tout se pilote par options :
 *   variant ("default" | "docs"), brand, nav, topbar, aside, sidebar repliable.
 *
 * SIDEBAR REPLIABLE :
 *   desktop (≥ breakpoint.desktop) : toggle = rail d'icônes ↔ étendu (variant "docs" : masqué) ;
 *   sous desktop : toggle = ouverture off-canvas via la fondation overlay (Drawer).
 */

export type ShellVariant = "default" | "docs";

export interface AppNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  onSelect?: () => void;
  items?: AppNavItem[]; // sous-niveaux (nav docs)
}
export interface AppNavGroup {
  label?: string;
  items: AppNavItem[];
}

export interface AppTopbar {
  breadcrumb?: React.ReactNode;        // zone début (après le toggle)
  search?: React.ReactNode | boolean;  // zone centre ; true => champ par défaut
  actions?: React.ReactNode;           // zone fin (recherche/cloche/avatar)
}

export interface AppLayoutProps {
  variant?: ShellVariant;
  brand?: React.ReactNode;
  nav?: AppNavGroup[] | AppNavItem[];
  topbar?: AppTopbar;
  aside?: React.ReactNode;
  asideLabel?: string;
  collapsible?: boolean;         // défaut true
  defaultCollapsed?: boolean;
  sidebarFooter?: React.ReactNode;
  boundedContent?: boolean;      // borne la largeur de lecture (défaut : true en "docs")
  className?: string;
  children: React.ReactNode;
}

const IconPanel = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" />
  </svg>
);
const IconSearch = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

function toGroups(nav?: AppNavGroup[] | AppNavItem[]): AppNavGroup[] {
  if (!nav || !Array.isArray(nav) || nav.length === 0) return [];
  return "items" in (nav[0] as AppNavGroup) ? (nav as AppNavGroup[]) : [{ items: nav as AppNavItem[] }];
}

function useMinWidth(px: number) {
  const [ok, setOk] = React.useState(true);
  React.useEffect(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia(`(min-width: ${px}px)`);
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [px]);
  return ok;
}

function NavRow({ item, collapsed, depth = 0, onNavigate }: { item: AppNavItem; collapsed: boolean; depth?: number; onNavigate?: () => void }) {
  const Cmp: any = item.href ? "a" : "button";
  const kids = item.items?.length ? item.items : null;
  return (
    <>
      <Cmp
        {...(item.href ? { href: item.href } : { type: "button" })}
        onClick={() => { item.onSelect?.(); onNavigate?.(); }}
        aria-current={item.active ? "page" : undefined}
        title={collapsed ? item.label : undefined}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-md px-sm py-1.5 text-left text-sm no-underline transition-colors duration-fast ease-out",
          "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          item.active
            ? "bg-secondary font-medium text-on-secondary"
            : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
          collapsed && "justify-center px-0",
          !collapsed && depth > 0 && "ml-3 border-l border-border pl-3 text-[13px]",
        )}
      >
        {item.icon ? (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">{item.icon}</span>
        ) : collapsed ? (
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
        ) : null}
        {!collapsed ? <span className="min-w-0 flex-1 truncate">{item.label}</span> : null}
        {!collapsed && item.badge ? (
          <span className="rounded-full bg-success-subtle px-1.5 py-0.5 text-[10px] font-semibold text-success">{item.badge}</span>
        ) : null}
      </Cmp>
      {kids && !collapsed ? kids.map((c, i) => <NavRow key={i} item={c} collapsed={false} depth={depth + 1} onNavigate={onNavigate} />) : null}
    </>
  );
}

function SidebarBody({ brand, groups, collapsed, footer, onNavigate }: {
  brand?: React.ReactNode; groups: AppNavGroup[]; collapsed: boolean; footer?: React.ReactNode; onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-lg overflow-y-auto p-md">
      {brand ? <div className={cn("flex h-10 items-center", collapsed ? "justify-center" : "px-sm")}>{brand}</div> : null}
      <nav aria-label="Navigation principale" className="flex flex-1 flex-col gap-lg">
        {groups.map((g, gi) => (
          <div key={gi} className="flex flex-col gap-0.5">
            {g.label && !collapsed ? (
              <p className="mb-1 px-sm font-label text-[11px] font-semibold uppercase tracking-wider text-text-muted">{g.label}</p>
            ) : null}
            {g.items.map((it, ii) => <NavRow key={ii} item={it} collapsed={collapsed} onNavigate={onNavigate} />)}
          </div>
        ))}
      </nav>
      {footer && !collapsed ? <div className="mt-auto border-t border-border pt-md">{footer}</div> : null}
    </div>
  );
}

export function AppLayout({
  variant = "default",
  brand,
  nav,
  topbar,
  aside,
  asideLabel = "Panneau",
  collapsible = true,
  defaultCollapsed = false,
  sidebarFooter,
  boundedContent,
  className,
  children,
}: AppLayoutProps) {
  const groups = React.useMemo(() => toGroups(nav), [nav]);
  const [collapsed, setCollapsed] = React.useState(!!defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isDesktop = useMinWidth(1280);
  const docs = variant === "docs";
  const bounded = boundedContent ?? docs;

  const onToggle = () => (isDesktop ? setCollapsed((c) => !c) : setMobileOpen(true));

  // rail d'icônes (variant default) ; masqué (variant docs) quand replié
  const railCollapsed = collapsed && !docs;
  const sidebarWidth = collapsed
    ? docs ? "desktop:hidden" : "desktop:w-16"
    : "desktop:w-rail-nav";

  const searchNode =
    topbar?.search === true ? (
      <button type="button" className="flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-muted transition-colors hover:text-text-secondary">
        {IconSearch}
        <span className="flex-1 text-left">Rechercher{docs ? " la doc" : ""}…</span>
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">⌘K</kbd>
      </button>
    ) : topbar?.search ? (
      topbar.search
    ) : null;

  return (
    <div className={cn("flex min-h-full w-full bg-background text-text-primary", className)}>
      {/* Sidebar desktop */}
      <aside
        aria-label="Navigation"
        className={cn(
          "hidden shrink-0 border-r border-border bg-surface transition-[width] duration-base ease-out",
          "desktop:sticky desktop:top-0 desktop:flex desktop:h-full desktop:max-h-screen desktop:flex-col",
          sidebarWidth,
        )}
      >
        <SidebarBody brand={brand} groups={groups} collapsed={railCollapsed} footer={sidebarFooter} />
      </aside>

      {/* Off-canvas mobile (fondation overlay) */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} side="start" aria-label="Navigation">
        <SidebarBody brand={brand} groups={groups} collapsed={false} footer={sidebarFooter} onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      {/* Colonne de droite : topbar + contenu (+ aside) */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-sm border-b border-border bg-background px-md">
          {collapsible ? (
            <button
              type="button"
              onClick={onToggle}
              aria-label="Basculer le menu"
              aria-expanded={isDesktop ? !collapsed : mobileOpen}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            >
              {IconPanel}
            </button>
          ) : null}
          {topbar?.breadcrumb ? <div className="flex min-w-0 items-center gap-2 text-sm text-text-secondary">{topbar.breadcrumb}</div> : null}
          {searchNode ? (
            <div className="flex flex-1 justify-center px-sm"><div className="w-full max-w-md">{searchNode}</div></div>
          ) : (
            <div className="flex-1" />
          )}
          {topbar?.actions ? <div className="flex shrink-0 items-center gap-1">{topbar.actions}</div> : null}
        </header>

        <div className="flex min-h-0 min-w-0 flex-1">
          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className={cn("px-xl py-xl", bounded && "mx-auto w-full max-w-[880px]")}>{children}</div>
          </main>
          {aside ? (
            <aside aria-label={asideLabel} className="hidden w-rail-tools shrink-0 overflow-y-auto border-l border-border bg-surface desktop:block">
              {aside}
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
