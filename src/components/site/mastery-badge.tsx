import { masteryLabel, type MasteryId } from "@/lib/mastery";
import { cn } from "@/lib/utils";

const styles: Record<MasteryId, string> = {
  gioi: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  kha: "bg-sky-50 text-[#0b6fa3] ring-sky-200",
  "trung-binh": "bg-amber-50 text-amber-800 ring-amber-200",
  "chua-lam": "bg-slate-100 text-slate-600 ring-slate-200",
};

export function MasteryBadge({ id, className }: { id: MasteryId; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1",
        styles[id],
        className,
      )}
    >
      {masteryLabel(id)}
    </span>
  );
}
