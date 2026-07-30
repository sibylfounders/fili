import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LienMarkdown } from "./lien-markdown";

/**
 * Rendu markdown de la documentation — typographie sobre pilotée par les tokens (.doc-prose).
 * Les éléments INTERACTIFS générés depuis le Markdown consomment le kit comme le reste du
 * site : les liens passent par `Link` (@fili/react, facture inline + focus v2) via le
 * mapping `components` — plus aucun `<a>` natif stylé localement (2026-07-30).
 */
export function Markdown({ children, className = "doc-prose" }: { children: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: LienMarkdown }}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
