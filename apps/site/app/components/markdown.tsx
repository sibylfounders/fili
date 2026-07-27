import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Rendu markdown de la documentation — typographie sobre pilotée par les tokens (.doc-prose). */
export function Markdown({ children, className = "doc-prose" }: { children: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
