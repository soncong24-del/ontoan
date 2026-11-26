import type { Question, QuestionResult, Quiz } from "@/types";

export interface GradeReport {
  score: number;
  correctCount: number;
  totalCount: number;
  results: QuestionResult[];
}

/** Chấp nhận 4,8 hoặc 4.8, bỏ khoảng trắng. */
export function parseViNumber(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function isQuestionCorrect(question: Question, rawAnswer: string | undefined): boolean {
  const raw = (rawAnswer ?? "").trim();
  if (!raw) return false;
  if (question.type === "mcq") {
    return raw === question.correctChoiceId;
  }
  const value = parseViNumber(raw);
  if (value === null) return false;
  const tolerance = question.tolerance ?? 1e-6;
  return Math.abs(value - question.correctValue) <= tolerance;
}

export function gradeQuiz(quiz: Quiz, answers: Record<string, string>): GradeReport {
  const results = quiz.questions.map((question) => ({
    questionId: question.id,
    answer: (answers[question.id] ?? "").trim(),
    correct: isQuestionCorrect(question, answers[question.id]),
  }));
  const correctCount = results.filter((result) => result.correct).length;
  const totalCount = quiz.questions.length;
  const score =
    totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100) / 10;
  return { score, correctCount, totalCount, results };
}

export function scoreMessage(score: number): string {
  if (score >= 8) {
    return "Bạn làm khá vững. Hãy đọc lời giải các câu sai để khóa nốt chỗ còn hổng.";
  }
  if (score >= 5) {
    return "Bạn đã nắm một phần kiến thức. Xem lời giải từng câu, rồi làm lại đề này.";
  }
  return "Nên học lại bài giảng, làm ví dụ có lời giải, rồi mới làm lại đề.";
}
