import Link from "next/link";
import { allSlugs, getDoc } from "@/lib/content";
import { Markdown } from "@/components/markdown";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDoc(params.slug);
  if (!doc) {
    return (
      <main className="wrap">
        <p>Document introuvable.</p>
        <p><Link href="/">← Retour</Link></p>
      </main>
    );
  }
  return (
    <main className="wrap">
      <p><Link href="/">← Audit MD</Link></p>
      <Markdown>{doc.body}</Markdown>
    </main>
  );
}
