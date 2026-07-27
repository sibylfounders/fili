import Link from "next/link";
import { GrilleSujets } from "./grille-sujets";
import { methodeIndex, socleIndex, sujets, sujetsParNature } from "@/lib/md";
import { fiche, nbCas } from "@/lib/doctrine";

function Titre({ children }: { children: React.ReactNode }) {
  return <p className="mt-2xl font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">{children}</p>;
}

function Carte({ href, titre, sous }: { href: string; titre: string; sous: string }) {
  return (
    <Link
      href={href}
      className="block rounded-md border border-border px-md py-3 text-text-primary no-underline transition-colors hover:border-primary"
    >
      <strong className="text-sm font-medium">{titre}</strong>
      <span className="mt-0.5 block text-[13px] text-text-secondary">{sous}</span>
    </Link>
  );
}

export default function DoctrineHome() {
  const groupes = sujetsParNature();
  const fiches = sujets().map((s) => fiche(s.slug));
  const totalCas = fiches.reduce((n, f) => n + (f ? nbCas(f) : 0), 0);

  return (
    <main className="mx-auto max-w-container-default px-lg py-xl">
      <h1 className="m-0 text-h2 font-semibold text-text-primary">Doctrine</h1>
      <p className="mt-sm max-w-[64ch] text-text-secondary">
        Le raisonnement du design system : ce que chaque règle décide, pourquoi, et avec quel niveau de
        confiance. Chaque sujet se lit en quatre volets — l'essentiel, les cas d'usage, les spécifications,
        l'évolution. <strong className="font-medium text-text-primary">{sujets().length} sujets</strong>,{" "}
        <strong className="font-medium text-text-primary">{totalCas} cas d'usage</strong> cartographiés.
      </p>

      <Titre>Méthode</Titre>
      <div className="mt-md grid gap-2 tablet:grid-cols-2">
        {methodeIndex().map((d) => (
          <Carte key={d.slug} href={`/md/methode/${d.slug}/`} titre={d.titre} sous={d.sous} />
        ))}
        <Carte
          href="/md/socle/"
          titre="Socle"
          sous={`Le noyau en trois volets — ${socleIndex().map((d) => d.titre).join(", ")}.`}
        />
        <Carte
          href="/md/methode/sources/"
          titre="Sources"
          sous="34 organisations citées par le corpus, 1337 citations mesurées."
        />
      </div>

      {groupes.map((g) => (
        <section key={g.nature.dossier}>
          <Titre>
            {g.nature.pluriel} ({g.items.length})
          </Titre>
          <GrilleSujets
            label={g.nature.pluriel}
            items={g.items.map((s) => {
              const f = fiche(s.slug);
              return {
                slug: s.slug,
                titre: s.title,
                embleme: f?.embleme,
                meta:
                  (f && nbCas(f) ? `${nbCas(f)} cas` : "—") +
                  (s.meta.version ? ` · v${s.meta.version}` : ""),
              };
            })}
          />
        </section>
      ))}
    </main>
  );
}
