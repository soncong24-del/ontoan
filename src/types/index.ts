/** Mô hình miền của Ôn Toán. Giai đoạn 2 (bán khóa, ghi danh, thanh toán) dùng lại các kiểu này. */

export type GradeLevel = "9" | "10" | "11" | "12";

export type TopicId = "dai-so" | "giai-tich" | "hinh-hoc" | "xac-suat";

export type DifficultyId = "co-ban" | "van-dung" | "van-dung-cao";

export type CalloutTone = "definition" | "theorem" | "note" | "warning";

export type PaymentProviderId = "vnpay" | "momo" | "sepay" | "stripe";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; tone: CalloutTone; title: string; body: string }
  | { type: "formula"; latex: string; caption?: string }
  | { type: "example"; title: string; prompt: string; solution: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] };

export interface LessonSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export type ChoiceId = "A" | "B" | "C" | "D";

export interface Choice {
  id: ChoiceId;
  text: string;
}

interface QuestionBase {
  id: string;
  prompt: string;
  /** Lời giải từng bước, có thể chứa $...$ và $$...$$. */
  solution: string;
}

export interface McqQuestion extends QuestionBase {
  type: "mcq";
  choices: Choice[];
  correctChoiceId: ChoiceId;
}

export interface NumericQuestion extends QuestionBase {
  type: "numeric";
  correctValue: number;
  /** Sai số tuyệt đối cho phép. Mặc định 1e-6. */
  tolerance?: number;
}

export type Question = McqQuestion | NumericQuestion;

export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  grade: GradeLevel;
  topic: TopicId;
  durationMinutes: number;
  objectives: string[];
  sections: LessonSection[];
  quickCheck: Question[];
  quizSlug: string;
  featured?: boolean;
  updatedAt: string;
}

export interface LessonSummary {
  slug: string;
  title: string;
  summary: string;
  grade: GradeLevel;
  topic: TopicId;
  durationMinutes: number;
  featured?: boolean;
  quizSlug: string;
}

export interface Quiz {
  slug: string;
  title: string;
  summary: string;
  grade: GradeLevel;
  topic: TopicId;
  difficulty: DifficultyId;
  durationMinutes: number;
  lessonSlug: string;
  questions: Question[];
  featured?: boolean;
}

export interface QuizSummary {
  slug: string;
  title: string;
  summary: string;
  grade: GradeLevel;
  topic: TopicId;
  difficulty: DifficultyId;
  durationMinutes: number;
  questionCount: number;
  lessonSlug: string;
  featured?: boolean;
}

export type QuizMode = "timed" | "practice";

export interface QuestionResult {
  questionId: string;
  answer: string;
  correct: boolean;
}

export interface QuizAttempt {
  id: string;
  quizSlug: string;
  mode: QuizMode;
  startedAt: string;
  submittedAt: string;
  durationSeconds: number;
  submittedBy: "user" | "timer";
  answers: Record<string, string>;
  flagged: string[];
  /** Thang điểm 10, làm tròn 1 chữ số thập phân. */
  score: number;
  correctCount: number;
  totalCount: number;
  results: QuestionResult[];
}

export interface QuizDraft {
  quizSlug: string;
  mode: QuizMode;
  startedAt: string;
  endsAt: string | null;
  answers: Record<string, string>;
  flagged: string[];
  index: number;
}

export interface LessonProgress {
  lessonSlug: string;
  completedAt: string | null;
  quickCheckCorrect: number | null;
  quickCheckTotal: number | null;
  updatedAt: string;
}

export interface CourseLessonPreview {
  title: string;
  durationMinutes: number;
}

export interface CourseModule {
  id: string;
  title: string;
  summary: string;
  lessons: CourseLessonPreview[];
}

export type CourseStatus = "coming-soon" | "open";

export interface Course {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  grade: GradeLevel;
  priceVnd: number;
  compareAtVnd?: number;
  status: CourseStatus;
  durationLabel: string;
  level: string;
  outcomes: string[];
  modules: CourseModule[];
  featured?: boolean;
}

export interface WaitlistSignup {
  id: string;
  courseSlug: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
  createdAt: string;
}

/** Ghi danh sau khi thanh toán thành công. Chưa dùng ở giai đoạn 1. */
export interface Enrollment {
  id: string;
  courseSlug: string;
  studentEmail: string;
  status: "pending" | "active" | "expired" | "refunded";
  provider?: PaymentProviderId;
  paymentRef?: string;
  amountVnd: number;
  createdAt: string;
  activatedAt?: string;
}

export interface CheckoutRequest {
  courseSlug: string;
  amountVnd: number;
  studentEmail: string;
  provider: PaymentProviderId;
  returnUrl: string;
}

export interface CheckoutSession {
  provider: PaymentProviderId;
  reference: string;
  redirectUrl: string;
}
