import type { Question, QuestionResult, Quiz, TrueFalseQuestion } from "@/types";

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

export function correctAnswer(question: Question): string {
  if (question.type === "mcq") return question.correctChoiceId;
  if (question.type === "numeric") return String(question.correctValue);
  return question.statements.map((statement) => (statement.correct ? "Đ" : "S")).join(",");
}

function parseTrueFalse(raw: string, count: number): boolean[] | null {
  const parts = raw
    .trim()
    .split(/[,;|\s]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length !== count) return null;
  const marks: boolean[] = [];
  for (const part of parts) {
    const token = part.toLowerCase();
    if (token === "đ" || token === "d" || token === "dung" || token === "đúng" || token === "true") {
      marks.push(true);
    } else if (token === "s" || token === "sai" || token === "false") {
      marks.push(false);
    } else {
      return null;
    }
  }
  return marks;
}

/** Đúng 1 ý 0,1; 2 ý 0,25; 3 ý 0,5; 4 ý 1. Đúng quy tắc đề Toán THPT từ 2025. */
export function trueFalsePoints(correctStatements: number): number {
  if (correctStatements <= 0) return 0;
  if (correctStatements === 1) return 0.1;
  if (correctStatements === 2) return 0.25;
  if (correctStatements === 3) return 0.5;
  return 1;
}

function trueFalseMatches(question: TrueFalseQuestion, raw: string): number {
  const marks = parseTrueFalse(raw, question.statements.length);
  if (!marks) return 0;
  return question.statements.reduce(
    (sum, statement, index) => sum + (marks[index] === statement.correct ? 1 : 0),
    0,
  );
}

function numericCorrect(question: Extract<Question, { type: "numeric" }>, raw: string): boolean {
  const value = parseViNumber(raw);
  if (value === null) return false;
  const tolerance = question.tolerance ?? 1e-6;
  return Math.abs(value - question.correctValue) <= tolerance;
}

export function isQuestionCorrect(question: Question, rawAnswer: string | undefined): boolean {
  const raw = (rawAnswer ?? "").trim();
  if (!raw) return false;
  if (question.type === "mcq") return raw === question.correctChoiceId;
  if (question.type === "true-false") return trueFalseMatches(question, raw) === question.statements.length;
  return numericCorrect(question, raw);
}

function roundScore(value: number): number {
  return Math.round(value * 100) / 100;
}

function gradeStandard(quiz: Quiz, answers: Record<string, string>): GradeReport {
  const results = quiz.questions.map((question) => {
    const answer = (answers[question.id] ?? "").trim();
    const correct = isQuestionCorrect(question, answer);
    return {
      questionId: question.id,
      answer,
      correct,
      points: correct ? 1 : 0,
      maxPoints: 1,
    };
  });
  const correctCount = results.filter((result) => result.correct).length;
  const totalCount = quiz.questions.length;
  const score = totalCount === 0 ? 0 : roundScore((correctCount / totalCount) * 10);
  return { score, correctCount, totalCount, results };
}

function gradeThpt(quiz: Quiz, answers: Record<string, string>): GradeReport {
  const results: QuestionResult[] = quiz.questions.map((question) => {
    const answer = (answers[question.id] ?? "").trim();
    if (question.type === "mcq") {
      const correct = answer === question.correctChoiceId;
      return { questionId: question.id, answer, correct, points: correct ? 0.25 : 0, maxPoints: 0.25 };
    }
    if (question.type === "true-false") {
      const matched = trueFalseMatches(question, answer);
      const points = trueFalsePoints(matched);
      return {
        questionId: question.id,
        answer,
        correct: matched === question.statements.length,
        points,
        maxPoints: 1,
      };
    }
    const correct = numericCorrect(question, answer);
    return { questionId: question.id, answer, correct, points: correct ? 0.5 : 0, maxPoints: 0.5 };
  });
  const score = roundScore(results.reduce((sum, result) => sum + (result.points ?? 0), 0));
  const correctCount = results.filter((result) => result.correct).length;
  return { score, correctCount, totalCount: quiz.questions.length, results };
}

export function gradeQuiz(quiz: Quiz, answers: Record<string, string>): GradeReport {
  if (quiz.examFormat === "thpt-2025") return gradeThpt(quiz, answers);
  return gradeStandard(quiz, answers);
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
