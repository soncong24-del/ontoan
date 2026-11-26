import { emitLearningStore } from "@/lib/storage/events";
import type { LearningRepository } from "@/lib/storage/repository";
import type { LessonProgress, QuizAttempt, QuizDraft, WaitlistSignup } from "@/types";

const KEYS = {
  lessons: "ontoan.lessonProgress.v1",
  attempts: "ontoan.quizAttempts.v1",
  waitlist: "ontoan.waitlist.v1",
} as const;

const ATTEMPT_LIMIT = 50;
const WAITLIST_LIMIT = 100;

function canUseStorage(kind: "local" | "session"): boolean {
  return typeof window !== "undefined" && Boolean(window[kind === "local" ? "localStorage" : "sessionStorage"]);
}

function readArray<T>(key: string): T[] {
  if (!canUseStorage("local")) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, value: T[]): void {
  if (!canUseStorage("local")) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function draftKey(quizSlug: string): string {
  return `ontoan.quizDraft.v1.${quizSlug}`;
}

export function readStorageRaw(kind: keyof typeof KEYS): string {
  if (!canUseStorage("local")) return "";
  return window.localStorage.getItem(KEYS[kind]) ?? "";
}

export function createLocalRepository(): LearningRepository {
  return {
    listLessonProgress() {
      return readArray<LessonProgress>(KEYS.lessons).sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt),
      );
    },
    getLessonProgress(lessonSlug) {
      return this.listLessonProgress().find((item) => item.lessonSlug === lessonSlug) ?? null;
    },
    saveLessonProgress(progress) {
      const next = this.listLessonProgress().filter((item) => item.lessonSlug !== progress.lessonSlug);
      next.unshift(progress);
      writeArray(KEYS.lessons, next);
      emitLearningStore();
    },
    listAttempts() {
      return readArray<QuizAttempt>(KEYS.attempts).sort((a, b) =>
        b.submittedAt.localeCompare(a.submittedAt),
      );
    },
    getAttempt(id) {
      return this.listAttempts().find((item) => item.id === id) ?? null;
    },
    saveAttempt(attempt) {
      const next = [attempt, ...this.listAttempts().filter((item) => item.id !== attempt.id)].slice(
        0,
        ATTEMPT_LIMIT,
      );
      writeArray(KEYS.attempts, next);
      emitLearningStore();
    },
    listWaitlist() {
      return readArray<WaitlistSignup>(KEYS.waitlist).sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
    saveWaitlist(entry) {
      const next = [
        entry,
        ...this.listWaitlist().filter(
          (item) => !(item.courseSlug === entry.courseSlug && item.email.toLowerCase() === entry.email.toLowerCase()),
        ),
      ].slice(0, WAITLIST_LIMIT);
      writeArray(KEYS.waitlist, next);
      emitLearningStore();
    },
    getDraft(quizSlug) {
      if (!canUseStorage("session")) return null;
      try {
        const raw = window.sessionStorage.getItem(draftKey(quizSlug));
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return null;
        return parsed as QuizDraft;
      } catch {
        return null;
      }
    },
    saveDraft(draft) {
      if (!canUseStorage("session")) return;
      window.sessionStorage.setItem(draftKey(draft.quizSlug), JSON.stringify(draft));
    },
    clearDraft(quizSlug) {
      if (!canUseStorage("session")) return;
      window.sessionStorage.removeItem(draftKey(quizSlug));
    },
  };
}
