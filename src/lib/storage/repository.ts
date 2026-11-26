import type { LessonProgress, QuizAttempt, QuizDraft, WaitlistSignup } from "@/types";

/**
 * Kho dữ liệu học tập của học sinh.
 * Giai đoạn 1 dùng localStorage. Giai đoạn 2 thay bằng Supabase/Postgres
 * mà không đổi các trang gọi `getLearningRepository()`.
 */
export interface LearningRepository {
  listLessonProgress(): LessonProgress[];
  getLessonProgress(lessonSlug: string): LessonProgress | null;
  saveLessonProgress(progress: LessonProgress): void;
  listAttempts(): QuizAttempt[];
  getAttempt(id: string): QuizAttempt | null;
  saveAttempt(attempt: QuizAttempt): void;
  listWaitlist(): WaitlistSignup[];
  saveWaitlist(entry: WaitlistSignup): void;
  getDraft(quizSlug: string): QuizDraft | null;
  saveDraft(draft: QuizDraft): void;
  clearDraft(quizSlug: string): void;
}

export interface WaitlistInput {
  courseSlug: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
}
