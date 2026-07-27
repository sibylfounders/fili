import Link from "next/link";
import fs from "fs";
import path from "path";
import { Card, CardGroup } from "@sibyl/react";

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

/** Logos réellement déposés — lu une fois au rendu, pas un test par entrée. */
function logosPresents(): Set<string> {
  try {
    return new Set(fs.readdirSync(DOSSIER_LOGOS));
  } catch {
    return new Set();
  }
}

/**
 * Marque de la source — le logo s'il a été déposé dans `public/logos/`, sinon un monogramme.
 * Servi depuis notre domaine, jamais chargé chez son propriétaire : aucune requête tierce,
 * donc aucune adresse IP de visiteur transmise.
 *
 * Pas de `Card.Media` ici : ce composant cadre un visuel en 16/9 ou en carré, alors qu'il
 * s'agit d'une vignette de 40 px alignée sur le titre. Aucun token de fond « gris » n'existe
 * dans le système — surface, surface-hover, surface-inverse, et c'est tout — la vignette se
 * distingue donc par son trait, pas par un aplat inventé.
 */
function Marque({ e, present }: { e: Entree; present: boolean }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-surface">
      {present ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`/logos/${e.logo}`}
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          loading="lazy"
          className="size-8 object-contain"
        />
      ) : (
        <span aria-hidden="true" className="font-label text-sm font-semibold text-text-muted">
          {e.monogramme}
        </span>
      )}
    </span>
  );
}

function CarteSource({ e, present }: { e: Entree; present: boolean }) {
  return (
    <Card.Root>
      <Card.Body>
        <Card.Header>
          <div className="flex min-w-0 items-start gap-sm">
            <Marque e={e} present={present} />
            <div className="min-w-0">
              <Card.Title as="h3">
                <Card.TitleLink href={e.url} target="_blank" rel="noopener noreferrer">
                  {e.nom}
                </Card.TitleLink>
              </Card.Title>
              <p className="m-0 mt-2xs font-label text-xs text-text-muted">
                {e.citations} citation{e.citations > 1 ? "s" : ""} · {e.sujets} sujet
                {e.sujets > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </Card.Header>
        <Card.Description>{e.description}</Card.Description>
      </Card.Body>
    </Card.Root>
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
        <h1 className="m-0 text-h1 font-medium text-text-primary">{d.titre}</h1>
        <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Méthode
        </span>
      </div>

      <p className="mt-md max-w-[70ch] text-base leading-relaxed text-text-secondary">{d.lead}</p>

      <p className="mt-sm font-label text-xs uppercase tracking-wide text-text-muted">
        {d.entrees.length} organisations · {d.total_citations} citations · {d.total_hotes} domaines
        distincts
      </p>

      {d.familles.map((f) => {
        const lot = d.entrees.filter((e) => e.famille === f);
        if (!lot.length) return null;
        return (
          <section key={f} className="mt-xl">
            <h2 className="m-0 mb-md text-h3 font-medium text-text-primary">{f}</h2>
            {/* Une carte entière mène à sa source : mode clickable, cible étendue portée
                par Card.TitleLink — un vrai lien, jamais un gestionnaire de clic. */}
            <CardGroup cols="auto" mode="clickable" separated>
              {lot.map((e) => (
                <CarteSource key={e.nom} e={e} present={presents.has(e.logo)} />
              ))}
            </CardGroup>
          </section>
        );
      })}

      <section className="mt-xl">
        <h2 className="m-0 mb-md text-h3 font-medium text-text-primary">Les logos</h2>
        <Card.Root>
          <Card.Body>
            <Card.Description>
              {poses} logo{poses > 1 ? "s" : ""} sur {d.entrees.length} {poses > 1 ? "sont" : "est"}{" "}
              en place. Les autres affichent un monogramme en attendant leur fichier.
            </Card.Description>
            <Card.Description>
              Ils sont servis depuis notre propre domaine, jamais chargés chez leur
              propriétaire&nbsp;: aucune requête vers un tiers, donc aucune adresse IP de visiteur
              transmise. C&rsquo;est la contrainte que nos audits imposent aux autres, elle vaut
              d&rsquo;abord pour nous.
            </Card.Description>
            <Card.Description>
              Ces marques appartiennent à leurs détenteurs et sont reproduites au seul titre de la
              citation de nos sources. Leur présence n&rsquo;indique ni partenariat, ni approbation,
              ni affiliation.
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </section>

      <p className="mt-lg font-label text-xs text-text-muted">
        Page générée par <code>tools/compile-sources.py</code> à partir des citations réelles des
        fichiers de doctrine. Les chiffres ne sont pas saisis à la main.
      </p>
    </main>
  );
}
