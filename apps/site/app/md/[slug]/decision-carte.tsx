"use client";
import * as React from "react";
import { Accordion } from "@sibyl/react";
import type { Decision } from "@/lib/doctrine";

/**
 * Une décision, deux vitesses. Replié : identifiant, étiquette courte, règle — une checklist.
 * Déplié : le problème, les cas, les sources — la preuve. Le dev scanne, l'UX ouvre.
 *
 * Les termes affichés sont COURTS et pour des humains ; le vocabulaire long et exact
 * (« propriété universelle », « parti pris d'identité »…) reste dans le markdown et dans ce
 * que consomment les IA — c'est leur contrat, pas celui du lecteur.
 */
const COURT: Record<Decision["statut"], { label: string; aide: string }> = {
  universelle: { label: "Standard", aide: "Vrai partout. Opposable à n'importe quel produit." },
  identite: { label: "Notre choix", aide: "Notre parti pris, pas une norme. Jamais imposé à quelqu'un d'autre." },
  implementation: { label: "Notre code", aide: "Vrai de notre implémentation, pas du design." },
  methode: { label: "Note", aide: "Note interne. Hors audit." },
};

function Champ({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="mt-md first:mt-0">
      <p className="m-0 mb-1 font-label text-[11px] font-semibold uppercase tracking-wider text-text-muted">{titre}</p>
      {children}
    </div>
  );
}

export function DecisionCarte({ d, regle }: { d: Decision; regle: React.ReactNode }) {
  const c = COURT[d.statut];
  const preuve = !!(d.probleme || d.cas.length || d.sources.length || d.interne);
  return (
    <li id={d.id} className="scroll-mt-[72px] rounded-md border border-border">
      <div className="flex flex-wrap items-baseline gap-sm px-lg pt-md">
        <span className="font-mono text-xs font-semibold text-primary">{d.id}</span>
        {d.couche === "ux" && d.statut !== "methode" && d.cas.length === 0 ? (
          <span
            title="Aucune situation concrète ne l'illustre encore — trou de couverture, pas un défaut de la règle."
            className="rounded-pill border border-dashed border-border px-sm py-0.5 font-label text-[10px] font-semibold uppercase tracking-wider text-text-muted"
          >
            Aucune situation
          </span>
        ) : null}
        <span
          title={c.aide}
          className="rounded-pill border border-border px-sm py-0.5 font-label text-[10px] font-semibold uppercase tracking-wider text-text-secondary"
        >
          {c.label}
        </span>
      </div>
      <p className="m-0 px-lg pb-sm pt-1 text-sm text-text-primary">{d.enonce || null}</p>
      {d.enonce ? null : <div className="px-lg pb-sm pt-1">{regle}</div>}
      {d.mesure ? (
        <p className="m-0 px-lg pb-md font-mono text-[11px] text-text-muted">Vérifiable : {d.mesure}</p>
      ) : null}

      {preuve ? (
        <Accordion className="border-t border-border">
          <Accordion.Item value="preuve">
            <Accordion.Header className="px-lg text-text-secondary">
              Pourquoi, où, et sur quoi ça s'appuie
              <small className="ml-sm font-normal text-text-muted">
                {[d.cas.length ? `${d.cas.length} cas` : null, d.sources.length ? `${d.sources.length} source${d.sources.length > 1 ? "s" : ""}` : "source interne"]
                  .filter(Boolean)
                  .join(" · ")}
              </small>
            </Accordion.Header>
            <Accordion.Panel className="px-lg pb-lg pt-sm">
              {d.enonce ? (
                <Champ titre="Règle complète">
                  <div className="text-sm">{regle}</div>
                </Champ>
              ) : null}

              {d.probleme ? (
                <Champ titre="Pourquoi">
                  <p className="m-0 text-sm text-text-secondary">{d.probleme}</p>
                </Champ>
              ) : null}

              {d.cas.length ? (
                <Champ titre="Cas">
                  <div className="flex flex-wrap gap-2">
                    {d.cas.map((x) => (
                      <span key={x.id} className="rounded-md border border-border bg-surface px-sm py-1 text-xs text-text-secondary">
                        {x.titre}
                      </span>
                    ))}
                  </div>
                </Champ>
              ) : null}

              {d.contre ? (
                <Champ titre="Ce que fait le secteur">
                  <p className="m-0 text-sm text-text-secondary">{d.contre}</p>
                </Champ>
              ) : null}

              <Champ titre="Sources">
                {d.sources.length === 0 && d.interne ? (
                  <p className="m-0 text-sm text-text-secondary">
                    Aucune source externe — c'est une décision maison.
                    {d.confiance ? <span className="text-text-muted"> {d.confiance}</span> : null}
                  </p>
                ) : (
                  <ul className="m-0 flex list-none flex-col gap-1 p-0 text-sm">
                    {d.sources.map((s) => (
                      <li key={s.ref} className="flex flex-wrap items-baseline gap-2">
                        {s.liens.map((l, i) =>
                          l.url ? (
                            <a key={i} href={l.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                              {l.label}
                            </a>
                          ) : (
                            <span key={i} className="text-text-secondary">{l.label}</span>
                          ),
                        )}
                        <span className="text-xs text-text-muted">· {s.confiance}</span>
                      </li>
                    ))}
                    {d.interne ? <li className="text-sm text-text-secondary">· complétée par une décision maison</li> : null}
                  </ul>
                )}
              </Champ>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ) : null}
    </li>
  );
}
