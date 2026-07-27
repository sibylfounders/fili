import Link from "next/link";
import fs from "fs";
import path from "path";

type Entree = {
  nom: string;
  famille: string;
  url: string;
  description: string;
  monogramme: string;
  citations: number;
  sujets: number;
};

type Sources = {
  titre: string;
  lead: string;
  total_citations: number;
  total_hotes: number;
  familles: string[];
  entrees: Entree[];
};

function sources(): Sources {
  const p = path.join(process.cwd(), "content", "doctrine", "sources.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/** Pastille de source — monogramme, jamais un logo distant : voir la note en bas de page. */
function Pastille({ texte }: { texte: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-surface-secondary font-label text-sm font-semibold tracking-wide text-text-secondary"
    >
      {texte}
    </span>
  );
}

function Carte({ e }: { e: Entree }) {
  return (
    <li className="m-0 list-none rounded-lg border border-border-subtle bg-surface p-md">
      <div className="flex items-start gap-sm">
        <Pastille texte={e.monogramme} />
        <div className="min-w-0">
          <h3 className="m-0 text-base font-semibold text-text-primary">
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary no-underline hover:underline"
            >
              {e.nom}
            </a>
          </h3>
          <p className="m-0 mt-2xs font-label text-xs text-text-secondary">
            {e.citations} citation{e.citations > 1 ? "s" : ""} · {e.sujets} sujet
            {e.sujets > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <p className="m-0 mt-sm text-sm leading-relaxed text-text-secondary">{e.description}</p>
    </li>
  );
}

export default function SourcesPage() {
  const d = sources();
  return (
    <main className="mx-auto max-w-[980px] px-lg py-xl">
      <p className="m-0">
        <Link href="/md/" className="text-sm text-text-secondary no-underline hover:text-text-primary">
          ← Doctrine
        </Link>
      </p>

      <div className="mt-md flex flex-wrap items-baseline gap-sm">
        <h1 className="m-0 text-3xl font-medium text-text-primary">{d.titre}</h1>
        <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Méthode
        </span>
      </div>

      <p className="mt-md max-w-[70ch] text-base leading-relaxed text-text-secondary">{d.lead}</p>

      <p className="mt-sm font-label text-xs uppercase tracking-wide text-text-secondary">
        {d.entrees.length} organisations · {d.total_citations} citations · {d.total_hotes} domaines
        distincts
      </p>

      {d.familles.map((f) => {
        const lot = d.entrees.filter((e) => e.famille === f);
        if (!lot.length) return null;
        return (
          <section key={f} className="mt-xl">
            <h2 className="m-0 text-xl font-medium text-text-primary">{f}</h2>
            <ul className="mt-md grid list-none grid-cols-1 gap-md p-0 md:grid-cols-2">
              {lot.map((e) => (
                <Carte key={e.nom} e={e} />
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-xl rounded-lg border border-border-subtle bg-surface-secondary p-md">
        <h2 className="m-0 text-base font-semibold text-text-primary">
          Pourquoi il n&rsquo;y a pas de logos
        </h2>
        <p className="m-0 mt-sm max-w-[70ch] text-sm leading-relaxed text-text-secondary">
          Afficher les logos supposerait de les charger depuis les serveurs de chaque organisation,
          ce qui transmettrait l&rsquo;adresse IP de chaque visiteur à trente-quatre tiers pour un
          bénéfice décoratif. C&rsquo;est exactement le défaut que nos audits signalent chez nos
          clients&nbsp;: nous n&rsquo;allons pas le commettre sur notre propre page de sources. Les
          pastilles sont générées à partir du nom.
        </p>
        <p className="m-0 mt-sm max-w-[70ch] text-sm leading-relaxed text-text-secondary">
          Des logos hébergés localement, sous licence vérifiée, resteraient possibles&nbsp;: ils se
          poseraient dans <code>public/logos/</code> sans changer cette page autrement que par le
          rendu de la pastille.
        </p>
      </section>

      <p className="mt-lg font-label text-xs text-text-secondary">
        Page générée par <code>tools/compile-sources.py</code> à partir des citations réelles des
        fichiers de doctrine. Les chiffres ne sont pas saisis à la main.
      </p>
    </main>
  );
}
