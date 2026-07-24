import Link from "next/link";

export default function UiPage() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex shrink-0 items-center gap-lg border-b border-border bg-background px-lg py-2">
        <Link href="/" className="text-sm font-semibold text-text-primary no-underline">Sibyl DS</Link>
        <nav className="flex items-center gap-md text-sm">
          <Link href="/md" className="text-text-secondary no-underline hover:text-text-primary">Doctrine</Link>
          <Link href="/ui" className="font-semibold text-primary no-underline">Composants</Link>
          <Link href="/audit" className="text-text-secondary no-underline hover:text-text-primary">Audit</Link>
        </nav>
      </div>
      <iframe src="/atelier.html" title="Atelier des composants" className="min-h-0 w-full flex-1 border-0" />
    </div>
  );
}
