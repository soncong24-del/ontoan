import type { DifficultyId, GradeLevel, TopicId } from "@/types";

export const GRADES: { id: GradeLevel; label: string; track: string; blurb: string }[] = [
  {
    id: "9",
    label: "Toán 9",
    track: "Ôn thi vào 10",
    blurb: "Phương trình, hệ thức lượng và các dạng hay ra trong đề tuyển sinh.",
  },
  {
    id: "10",
    label: "Toán 10",
    track: "Đại số và hình học",
    blurb: "Hàm số bậc hai, phương trình và hệ thức lượng trong tam giác.",
  },
  {
    id: "11",
    label: "Toán 11",
    track: "Giải tích và xác suất",
    blurb: "Đạo hàm, tiếp tuyến, cực trị và xác suất cổ điển.",
  },
  {
    id: "12",
    label: "Toán 12",
    track: "Ôn thi THPT QG",
    blurb: "Nguyên hàm, tích phân và các dạng vận dụng trong đề tốt nghiệp.",
  },
];

export const TOPICS: { id: TopicId; label: string }[] = [
  { id: "dai-so", label: "Đại số" },
  { id: "giai-tich", label: "Giải tích" },
  { id: "hinh-hoc", label: "Hình học" },
  { id: "xac-suat", label: "Xác suất – Thống kê" },
];

export const DIFFICULTIES: { id: DifficultyId; label: string; hint: string }[] = [
  { id: "co-ban", label: "Cơ bản", hint: "Nhận biết và thông hiểu" },
  { id: "van-dung", label: "Vận dụng", hint: "Áp dụng vào bài toán quen" },
  { id: "van-dung-cao", label: "Vận dụng cao", hint: "Cần ghép nhiều ý" },
];

export function gradeLabel(grade: GradeLevel): string {
  return GRADES.find((item) => item.id === grade)?.label ?? `Toán ${grade}`;
}

export function topicLabel(topic: TopicId): string {
  return TOPICS.find((item) => item.id === topic)?.label ?? topic;
}

export function difficultyLabel(difficulty: DifficultyId): string {
  return DIFFICULTIES.find((item) => item.id === difficulty)?.label ?? difficulty;
}

export const CALLOUT_LABEL: Record<string, string> = {
  definition: "Định nghĩa",
  theorem: "Định lý",
  note: "Ghi nhớ",
  warning: "Hay nhầm",
};
