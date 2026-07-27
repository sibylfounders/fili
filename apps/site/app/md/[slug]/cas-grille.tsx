"use client";
import * as React from "react";
import { CardGroup, Modal } from "@sibyl/react";
import { allerAuVolet } from "../doc-tabs";
import type { Cas } from "@/lib/doctrine";

const Html = ({ html, className }: { html: string; className?: string }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

/**
 * Grille des cas d'usage d'une famille — collection de cartes du DS (`CardGroup`, mode clickable,
 * colonnes intrinsèques) ; chaque carte ouvre le détail du cas dans un `Modal`. Une seule modale
 * montée à la fois : la collection porte l'état, pas la carte (« un seul mode par collection »).
 */
export function CasGrille({ famille, cas }: { famille: string; cas: Cas[] }) {
  const [ouvert, setOuvert] = React.useState<Cas | null>(null);
  return (
    <>
      <CardGroup mode="clickable" separated label={`Cas d'usage — ${famille}`}>
        {cas.map((c) => (
          <CardGroup.Card
            key={c.id}
            titleAs="h4"
            title={c.titre}
            onActivate={() => setOuvert(c)}
            description={
              <>
                <span className="mr-1 font-label text-[10px] font-semibold uppercase tracking-wider text-text-muted">Quand</span>
                {c.quand}
              </>
            }
          >
            <span className="mt-sm flex flex-wrap items-center gap-sm">
              <span className="text-xs font-medium text-primary">{c.lien} →</span>
              {c.statut ? (
                <span className="rounded-pill bg-warning-subtle px-sm py-0.5 font-label text-[10px] font-semibold uppercase tracking-wider text-warning">
                  {c.statut}
                </span>
              ) : null}
            </span>
          </CardGroup.Card>
        ))}
      </CardGroup>

      <Modal open={!!ouvert} onClose={() => setOuvert(null)} size="narrow">
        {ouvert ? (
          <>
            {ouvert.visuel ? (
              <Html html={ouvert.visuel} className="shrink-0 overflow-hidden rounded-t-md [&_svg]:block [&_svg]:h-auto [&_svg]:w-full" />
            ) : null}
            <Modal.Header kicker={ouvert.kicker}>{ouvert.titre}</Modal.Header>
            <Modal.Body className="pb-lg">
              {ouvert.blocs.map((b, i) => (
                <div key={i} className={i > 0 ? "mt-md border-t border-border pt-md" : undefined}>
                  <p className="m-0 mb-1 font-label text-xs font-semibold uppercase tracking-wider text-primary">{b.titre}</p>
                  <Html html={b.html} className="doc-prose text-sm [&>p:last-child]:mb-0" />
                </div>
              ))}
              {ouvert.regles.length ? (
                <div className="mt-lg rounded-md border border-border bg-surface p-md">
                  <p className="m-0 mb-sm font-label text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    Règle qui tranche ce cas
                  </p>
                  <div className="flex flex-wrap gap-sm">
                    {ouvert.regles.map((r, i) =>
                      r.id ? (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setOuvert(null);
                            allerAuVolet("regles", r.id);
                          }}
                          className="rounded-md border border-border bg-background px-sm py-1 font-mono text-xs text-primary transition-colors hover:border-primary"
                        >
                          {r.id} →
                        </button>
                      ) : (
                        <span key={i} className="text-xs text-text-secondary">{r.tag}</span>
                      ),
                    )}
                  </div>
                </div>
              ) : null}
            </Modal.Body>
          </>
        ) : null}
      </Modal>
    </>
  );
}
