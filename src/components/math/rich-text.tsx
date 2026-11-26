import katex from "katex";
import { tokenizeMath } from "@/lib/text";
import { cn } from "@/lib/utils";

function renderLatex(latex: string, displayMode: boolean): string {
  return katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
    trust: false,
  });
}

export function RichText({ text, className }: { text: string; className?: string }) {
  if (!text) return null;
  const segments = tokenizeMath(text);
  const hasBlock = segments.some((segment) => segment.type === "block");
  const Tag = hasBlock ? "div" : "span";

  return (
    <Tag className={cn(hasBlock && "space-y-1", className)}>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          const lines = segment.value.split("\n");
          return (
            <span key={index}>
              {lines.map((line, lineIndex) => (
                <span key={lineIndex}>
                  {lineIndex > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </span>
          );
        }
        const html = renderLatex(segment.value, segment.type === "block");
        if (segment.type === "block") {
          return (
            <span
              key={index}
              className="my-1 block overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </Tag>
  );
}

export function RichParagraphs({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\n{2,}/).filter((part) => part.trim().length > 0);
  return (
    <div className={cn("space-y-3", className)}>
      {parts.map((part, index) => (
        <div key={index} className="leading-7">
          <RichText text={part} />
        </div>
      ))}
    </div>
  );
}
