import { Fragment } from "react";

/* Lightweight prose renderer for blog bodies — supports ## / ### headings,
   > blockquotes, - / * lists, and paragraphs (blank-line separated, single
   newlines become <br>). Faithful to the prototype's editorial article styling. */

function withBreaks(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

export function Prose({ body, className = "prose article__body reveal" }: { body: string; className?: string }) {
  const blocks = body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) return <h3 key={i}>{block.slice(4)}</h3>;
        if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;

        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("> "))) {
          return <blockquote key={i}>{withBreaks(lines.map((l) => l.slice(2)).join("\n"))}</blockquote>;
        }
        if (lines.every((l) => /^[-*]\s/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^[-*]\s/, "")}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{withBreaks(block)}</p>;
      })}
    </div>
  );
}
