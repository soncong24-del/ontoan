export type MasteryId = "gioi" | "kha" | "trung-binh" | "chua-lam";

export const MASTERY: { id: MasteryId; label: string; hint: string }[] = [
  { id: "gioi", label: "Giỏi", hint: "Từ 8 điểm" },
  { id: "kha", label: "Khá", hint: "Từ 6,5 điểm" },
  { id: "trung-binh", label: "Trung bình", hint: "Dưới 6,5 điểm" },
  { id: "chua-lam", label: "Chưa làm", hint: "Chưa có lần nộp bài" },
];

export function masteryFromScore(score: number | null): MasteryId {
  if (score === null) return "chua-lam";
  if (score >= 8) return "gioi";
  if (score >= 6.5) return "kha";
  return "trung-binh";
}

export function masteryLabel(id: MasteryId): string {
  return MASTERY.find((item) => item.id === id)?.label ?? id;
}

export function bestScore(scores: number[]): number | null {
  if (scores.length === 0) return null;
  return Math.max(...scores);
}
