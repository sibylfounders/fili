import fs from "fs";
import path from "path";
import Link from "next/link";
import { docsByCategory } from "@/lib/content";
import { Markdown } from "@/components/markdown";

export default function Home() {
  const intro = fs.readFileSync(path.join(process.cwd(), "content", "index.md"), "utf8");
  const { protocoles, regles } = docsByCategory();
  return (
    <main className="wrap">
      <Markdown>{intro}</Markdown>

      <p className="kicker">Protocoles</p>
      <div className="catgrid">
        {protocoles.map((d) => (
          <Link key={d.slug} href={`/docs/${d.slug}/`}>{d.title}</Link>
        ))}
      </div>

      <p className="kicker">Règles condensées ({regles.length})</p>
      <div className="catgrid">
        {regles.map((d) => (
          <Link key={d.slug} href={`/docs/${d.slug}/`}>{d.title}</Link>
        ))}
      </div>
    </main>
  );
}
