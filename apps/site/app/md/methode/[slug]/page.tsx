import Link from "next/link";
import { notFound } from "next/navigation";
import { methodeDoc, methodeIndex } from "@/lib/md";
import { Markdown } from "../../../components/markdown";

export function generateStaticParams() {
  return methodeIndex().map((d) => ({ slug: d.slug }));
}

export default function MethodePage({ params }: { params: { slug: string } }) {
  const doc = methodeDoc(params.slug);
  if (!doc) notFound();
  return (
    <main className="mx-auto max-w-[820px] px-lg py-xl">
      <p className="m-0">
        <Link href="/md/" className="text-sm text-text-secondary no-underline hover:text-text-primary">
          ← Doctrine
        </Link>
      </p>
      <div className="mt-md flex flex-wrap items-baseline gap-sm">
        <h1 className="m-0 text-3xl font-medium text-text-primary">{doc.title}</h1>
        <span className="font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Méthode</span>
      </div>
      <div className="mt-lg">
        <Markdown>{doc.body}</Markdown>
      </div>
    </main>
  );
}
