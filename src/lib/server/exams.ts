import { getQuizzes } from "@/data";
import { readDatabase, updateDatabase, type StoredExam } from "@/lib/server/db";
import type { Quiz } from "@/types";

export async function listExamRecords(): Promise<StoredExam[]> {
  try {
    const db = await readDatabase();
    return db.exams ?? [];
  } catch {
    return [];
  }
}

export function mergeExams(stored: StoredExam[], includeHidden = false): Quiz[] {
  const map = new Map(getQuizzes().map((quiz) => [quiz.slug, quiz]));
  for (const record of stored) {
    if (record.hidden) {
      map.delete(record.quiz.slug);
      continue;
    }
    if (!includeHidden && record.published === false) {
      map.delete(record.quiz.slug);
      continue;
    }
    map.set(record.quiz.slug, record.quiz);
  }
  if (includeHidden) {
    for (const record of stored) {
      if (!record.hidden) map.set(record.quiz.slug, record.quiz);
    }
  }
  return [...map.values()];
}

export async function listPublicQuizzes(): Promise<Quiz[]> {
  return mergeExams(await listExamRecords(), false);
}

export async function getPublicQuiz(slug: string): Promise<Quiz | undefined> {
  const quizzes = await listPublicQuizzes();
  return quizzes.find((quiz) => quiz.slug === slug);
}

export async function listAdminQuizzes(): Promise<{ quiz: Quiz; published: boolean; overridden: boolean }[]> {
  const stored = await listExamRecords();
  const builtins = getQuizzes();
  const storedBySlug = new Map(stored.filter((item) => !item.hidden).map((item) => [item.quiz.slug, item]));
  const hidden = new Set(stored.filter((item) => item.hidden).map((item) => item.quiz.slug));
  const rows = builtins
    .filter((quiz) => !hidden.has(quiz.slug))
    .map((quiz) => {
      const override = storedBySlug.get(quiz.slug);
      return {
        quiz: override?.quiz ?? quiz,
        published: override ? override.published : true,
        overridden: Boolean(override),
      };
    });
  for (const record of stored) {
    if (record.hidden) continue;
    if (builtins.some((quiz) => quiz.slug === record.quiz.slug)) continue;
    rows.push({ quiz: record.quiz, published: record.published, overridden: true });
  }
  return rows;
}

export async function saveExam(quiz: Quiz, published: boolean): Promise<void> {
  await updateDatabase((data) => {
    const next: StoredExam = { quiz, published, hidden: false, updatedAt: new Date().toISOString() };
    const index = data.exams.findIndex((item) => item.quiz.slug === quiz.slug);
    if (index >= 0) data.exams[index] = next;
    else data.exams.push(next);
  });
}

export async function hideExam(slug: string): Promise<void> {
  await updateDatabase((data) => {
    const index = data.exams.findIndex((item) => item.quiz.slug === slug);
    const builtin = getQuizzes().some((quiz) => quiz.slug === slug);
    if (index >= 0) {
      data.exams[index] = { ...data.exams[index], hidden: true, published: false, updatedAt: new Date().toISOString() };
      return;
    }
    if (builtin) {
      const quiz = getQuizzes().find((item) => item.slug === slug);
      if (!quiz) return;
      data.exams.push({ quiz, published: false, hidden: true, updatedAt: new Date().toISOString() });
    }
  });
}
