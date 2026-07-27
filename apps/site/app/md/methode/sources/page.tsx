import Link from "next/link";
import fs from "fs";
import path from "path";

type Entree = {
  nom: string;
  famille: string;
  url: string;
  description: string;
  monogramme: string;
  logo: string;
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

const DOSSIER_LOGOS = path.join(process.cwd(), "public", "logos");

function sources(): Sources {
  const p = path.join(process.cwd(), "content", "doctrine", "sources.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/** Logos réellement déposés — lu une fois au rendu, pas de test par entrée. */
function logosPresents(): Set<string> {
  try {
    return new Set(fs.readdirSync(DOSSIER_LOGOS));
  } catch {
    return new Set();
  }
}

/**
 * Pastille de source — le logo s'il a été déposé dans `public/logos/`, sinon un monogramme.
 * Les logos sont servis depuis notre propre domaine : aucune requête vers un tiers, donc
 * aucune adresse IP de visiteur transmise. C'est la contrainte que nos audits imposent aux
 * autres, elle vaut d'abord pour nous.
 */
function Pastille({ e, present }: { e: Entree; present: boolean }) {
  if (present) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-surface p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/logos/${e.logo}`}
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-surface-secondary font-label text-sm font-semibold tracking-wide text-text-secondary"
    >
      {e.monogramme}
    </span>
  );
}

function Carte({ e, present }: { e: Entree; present: boolean }) {
  return (
    <li className="m-0 list-none rounded-lg border border-border-subtle bg-surface p-md">
      <div className="flex items-start gap-sm">
        <Pastille e={e} present={present} />
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
  const presents = logosPresents();
  const poses = d.entrees.filter((e) => presents.has(e.logo)).length;

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
                <Carte key={e.nom} e={e} present={presents.has(e.logo)} />
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-xl rounded-lg border border-border-subtle bg-surface-secondary p-md">
        <h2 className="m-0 text-base font-semibold text-text-primary">Les logos</h2>
        <p className="m-0 mt-sm max-w-[70ch] text-sm leading-relaxed text-text-secondary">
          {poses} logo{poses > 1 ? "s" : ""} sur {d.entrees.length} {poses > 1 ? "sont" : "est"}{" "}
          en place. Les autres affichent un monogramme en attendant leur fichier.
        </p>
        <p className="m-0 mt-sm max-w-[70ch] text-sm leading-relaxed text-text-secondary">
          Ils sont servis depuis notre propre domaine, jamais chargés chez leur propriétaire&nbsp;:
          aucune requête vers un tiers, donc aucune adresse IP de visiteur transmise. C&rsquo;est la
          contrainte que nos audits imposent aux autres, elle vaut d&rsquo;abord pour nous.
        </p>
        <p className="m-0 mt-sm max-w-[70ch] text-sm leading-relaxed text-text-secondary">
          Ces marques appartiennent à leurs détenteurs et sont reproduites au seul titre de la
          citation de nos sources. Leur présence n&rsquo;indique ni partenariat, ni approbation, ni
          affiliation.
        </p>
      </section>

      <p className="mt-lg font-label text-xs text-text-secondary">
        Page générée par <code>tools/compile-sources.py</code> à partir des citations réelles des
        fichiers de doctrine. Les chiffres ne sont pas saisis à la main.
      </p>
    </main>
  );
}
