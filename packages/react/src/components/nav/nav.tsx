import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Nav — navigation latérale (DS-MD pattern navigation). Landmark <nav> ÉTIQUETÉ + liste de destinations.
 * Compound : Nav (landmark) / Nav.List (ul) / Nav.Link (li>a). L'état « page courante » est porté par
 * Nav.Link (`current`) : `aria-current="page"` + un signal NON CHROMATIQUE (fond secondary + poids), un
 * seul à la fois. Le regroupement se fait avec le composant Accordion.
 */
export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  /** Étiquette du repère (obligatoire) — distincte si plusieurs nav coexistent. */
  label: string;
}
export function NavRoot({ label, className, children, ...props }: NavProps) {
  return (
    <nav aria-label={label} className={cn(className)} {...props}>
      {children}
    </nav>
  );
}
NavRoot.displayName = "Nav.Root";

export function NavList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("m-0 flex list-none flex-col gap-0.5 p-0", className)} {...props} />;
}
NavList.displayName = "Nav.List";

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
}
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ current, className, children, ...props }, ref) => (
    <li className="list-none">
      <a
        ref={ref}
        aria-current={current ? "page" : undefined}
        className={cn(
          "block rounded-sm px-sm py-1.5 text-sm no-underline transition-colors duration-fast ease-out",
          "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          current
            ? "bg-secondary font-medium text-on-secondary"
            : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </li>
  ),
);
NavLink.displayName = "Nav.Link";

export const Nav = Object.assign(NavRoot, { Root: NavRoot, List: NavList, Link: NavLink });
