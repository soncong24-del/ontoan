"use client";

import { useMemo, useSyncExternalStore } from "react";
import { readStorageRaw } from "@/lib/storage/local-repository";
import { subscribeLearningStore } from "@/lib/storage/events";
import type { LessonProgress, QuizAttempt, WaitlistSignup } from "@/types";

function useRaw(kind: "lessons" | "attempts" | "waitlist"): string {
  return useSyncExternalStore(
    subscribeLearningStore,
    () => readStorageRaw(kind),
    () => "",
  );
}

function parseList<T>(raw: string): T[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function useLessonProgressList(): LessonProgress[] {
  const raw = useRaw("lessons");
  return useMemo(() => parseList<LessonProgress>(raw), [raw]);
}

export function useQuizAttempts(): QuizAttempt[] {
  const raw = useRaw("attempts");
  return useMemo(
    () => parseList<QuizAttempt>(raw).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)),
    [raw],
  );
}

export function useWaitlist(): WaitlistSignup[] {
  const raw = useRaw("waitlist");
  return useMemo(() => parseList<WaitlistSignup>(raw), [raw]);
}
