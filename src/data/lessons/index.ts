import type { Lesson, LessonSummary } from "@/types";
import daoHam from "@/data/lessons/dao-ham";
import hamSo from "@/data/lessons/ham-so-bac-hai";
import heThucLuong from "@/data/lessons/he-thuc-luong";
import phuongTrinh from "@/data/lessons/phuong-trinh-bac-hai";
import tichPhan from "@/data/lessons/tich-phan";
import xacSuat from "@/data/lessons/xac-suat";

const lessons: Lesson[] = [phuongTrinh, hamSo, daoHam, tichPhan, heThucLuong, xacSuat];

export function getLessons(): Lesson[] {
  return lessons;
}

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonSummaries(): LessonSummary[] {
  return lessons.map((lesson) => ({
    slug: lesson.slug,
    title: lesson.title,
    summary: lesson.summary,
    grade: lesson.grade,
    topic: lesson.topic,
    durationMinutes: lesson.durationMinutes,
    featured: lesson.featured,
    quizSlug: lesson.quizSlug,
  }));
}
