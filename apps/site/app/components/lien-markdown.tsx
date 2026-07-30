"use client";
import * as React from "react";
import { Link } from "@fili/react";

/**
 * Lien du rendu Markdown — CLIENT.
 *
 * `react-markdown` produisait des `<a>` natifs : les pages TSX consommaient le kit, mais
 * les liens générés depuis le Markdown lui échappaient (facture locale en CSS, anneau de
 * focus du navigateur — constat rendu du 2026-07-30). Le mapping `components` les fait
 * passer par la VRAIE API publique : `Link` de `@fili/react`, facture `inline` (souligné
 * au repos — LINK-UI), focus v2 de la fondation. Aucune classe recopiée, aucun composant
 * visuel local : ce fichier ne fait que retirer la prop `node` (nœud hast interne de
 * react-markdown, pas un attribut DOM) et déléguer.
 */
export function LienMarkdown({
  node: _node,
  href = "",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) {
  return (
    <Link href={href} context="inline" {...props}>
      {children}
    </Link>
  );
}
