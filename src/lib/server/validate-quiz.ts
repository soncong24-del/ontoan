import type { Quiz } from "@/types";

export function validateQuiz(quiz: Quiz): string | null {
  if (!/^[-a-z0-9]+$/.test(quiz.slug ?? "")) return "Mã đề chỉ gồm chữ thường, số và dấu gạch ngang.";
  if (!quiz.title?.trim()) return "Hãy nhập tên đề.";
  if (!["9", "10", "11", "12"].includes(quiz.grade)) return "Khối chưa đúng.";
  if (!quiz.durationMinutes || quiz.durationMinutes < 1) return "Thời gian làm bài chưa đúng.";
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) return "Đề cần ít nhất một câu.";
  for (const question of quiz.questions) {
    if (!question.prompt?.trim()) return "Có câu chưa có đề bài.";
    if (!question.solution?.trim()) return "Có câu chưa có lời giải.";
    if (question.type === "mcq") {
      if (question.choices?.length !== 4) return "Câu trắc nghiệm cần đúng 4 lựa chọn.";
      if (!question.choices.some((choice) => choice.id === question.correctChoiceId)) {
        return "Hãy chọn đáp án đúng cho câu trắc nghiệm.";
      }
    } else if (question.type === "true-false") {
      if (question.statements?.length !== 4) return "Câu đúng/sai cần đúng 4 ý.";
    } else if (question.type === "numeric") {
      if (!Number.isFinite(question.correctValue)) return "Đáp số chưa phải là số.";
    } else {
      return "Loại câu chưa được hỗ trợ.";
    }
  }
  return null;
}
