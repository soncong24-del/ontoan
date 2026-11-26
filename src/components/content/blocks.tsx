import type { ContentBlock } from "@/types";
import { RichParagraphs, RichText } from "@/components/math/rich-text";
import { CALLOUT_LABEL } from "@/lib/labels";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  definition: "border-primary/40 bg-sky-50",
  theorem: "border-[#ff792f]/50 bg-[#fff3ef]",
  note: "border-emerald-300 bg-emerald-50",
  warning: "border-rose-300 bg-rose-50",
};

export function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <div className="text-[17px] leading-8 text-[#1e2f41]">
          <RichText text={block.text} />
        </div>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          className={cn(
            "space-y-2 pl-5 text-[17px] leading-8 text-[#1e2f41]",
            block.ordered ? "list-decimal" : "list-disc",
          )}
        >
          {block.items.map((item, index) => (
            <li key={index}>
              <RichText text={item} />
            </li>
          ))}
        </ListTag>
      );
    }
    case "callout":
      return (
        <aside className={cn("rounded-2xl border px-4 py-3", tones[block.tone])}>
          <p className="text-xs font-semibold tracking-wide text-[#5a6173] uppercase">
            {CALLOUT_LABEL[block.tone]}
          </p>
          <p className="mt-1 font-semibold text-[#153565]">{block.title}</p>
          <div className="mt-2 text-[16px] leading-7 text-[#1e2f41]">
            <RichParagraphs text={block.body} />
          </div>
        </aside>
      );
    case "formula":
      return (
        <figure className="overflow-hidden rounded-2xl border border-[#d0dcf0] bg-white px-4 py-4 text-center shadow-sm">
          <RichText text={`$$${block.latex}$$`} />
          {block.caption ? (
            <figcaption className="mt-2 text-sm text-[#5a6173]">
              <RichText text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case "example":
      return (
        <details className="group rounded-2xl border border-[#d0dcf0] bg-white shadow-sm open:shadow-md">
          <summary className="cursor-pointer list-none px-4 py-4 [&::-webkit-details-marker]:hidden">
            <p className="text-sm font-semibold text-[#1482c0]">{block.title}</p>
            <div className="mt-2 text-[17px] leading-8 text-[#1e2f41]">
              <RichText text={block.prompt} />
            </div>
            <span className="mt-3 inline-flex text-sm font-semibold text-[#ff792f] group-open:hidden">
              Xem lời giải chi tiết
            </span>
            <span className="mt-3 hidden text-sm font-semibold text-[#5a6173] group-open:inline-flex">
              Ẩn lời giải
            </span>
          </summary>
          <div className="border-t border-[#d0dcf0] px-4 py-4 text-[16px] leading-7">
            <RichParagraphs text={block.solution} />
          </div>
        </details>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-[#d0dcf0] bg-white">
          {block.caption ? (
            <p className="border-b border-[#d0dcf0] px-4 py-2 text-sm text-[#5a6173]">{block.caption}</p>
          ) : null}
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead className="bg-[#f4f8fb] text-[#153565]">
              <tr>
                {block.headers.map((header, index) => (
                  <th key={index} className="px-3 py-2 font-semibold">
                    <RichText text={header} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-[#d0dcf0]">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2 align-top">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default: {
      const unreachable: never = block;
      return unreachable;
    }
  }
}
