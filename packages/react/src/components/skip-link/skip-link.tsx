import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * SkipLink — « Aller au contenu » (DS-MD pattern navigation, WCAG 2.4.1). Premier élément focalisable de
 * la page, MASQUÉ visuellement jusqu'au focus, puis visible ; déplace le focus vers le <main> (cible `href`).
 * À placer tout en haut de l'AppShell, avant la nav.
 */
export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}
export function SkipLink({ href = "#main", className, children = "Aller au contenu", ...props }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only",
        "focus:not-sr-only focus:fixed focus:left-md focus:top-md focus:z-sticky",
        "focus:rounded-md focus:border focus:border-border-strong focus:bg-background focus:px-md focus:py-2",
        "focus:text-sm focus:font-medium focus:text-text-primary focus:shadow-overlay",
        "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
SkipLink.displayName = "SkipLink";
