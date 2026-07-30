"use client";
import * as React from "react";
import NextLink from "next/link";
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
 *
 * ROUTAGE (2026-07-30, constat GitHub Pages) : un lien INTERNE compose `next/link` via
 * `Link asChild`. Le routeur préfixe le `basePath` du déploiement — sans lui, un `/md/…`
 * écrit dans une fiche pointait vers la racine du domaine, hors du site. Le défaut ne se
 * voyait pas en local, où le basePath est vide : c'est la publication qui l'a montré.
 *
 * La frontière est celle de l'ADRESSE, pas du composant : une ancre (`#…`), un `mailto:`,
 * un `tel:` ou une URL absolue ne concernent pas le routeur et restent un `<a>` — les faire
 * passer par next/link n'apporterait rien et casserait l'ancre.
 */
const INTERNE = (href: string) => /^\.{0,2}\//.test(href);

export function LienMarkdown({
  node: _node,
  href = "",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) {
  if (INTERNE(href))
    return (
      <Link context="inline" asChild>
        <NextLink href={href} {...props}>
          {children}
        </NextLink>
      </Link>
    );
  return (
    <Link href={href} context="inline" {...props}>
      {children}
    </Link>
  );
}
