import Link from "next/link";
import { auditIntro, docsByCategory } from "@/lib/content";
import { Markdown } from "../components/markdown";

export default function AuditHome() {
  const { protocoles, regles } = docsByCategory();
  return (
    <main className="mx-auto max-w-[820px] px-lg py-xl">
      <Markdown>{auditIntro()}</Markdown>
      <p className="mt-xl font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Protocoles</p>
      <div className="mt-md grid gap-2">
        {protocoles.map((d) => (
          <Link key={d.slug} href={`/audit/${d.slug}/`} className="rounded-md border border-border px-md py-3 text-text-primary no-underline">{d.title}</Link>
        ))}
      </div>
      <p className="mt-xl font-label text-xs font-semibold uppercase tracking-wide text-text-secondary">Règles condensées ({regles.length})</p>
      <div className="mt-md grid gap-2">
        {regles.map((d) => (
          <Link key={d.slug} href={`/audit/${d.slug}/`} className="rounded-md border border-border px-md py-3 text-text-primary no-underline">{d.title}</Link>
        ))}
      </div>
    </main>
  );
}
