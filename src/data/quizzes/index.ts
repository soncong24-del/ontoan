import type { Quiz, QuizSummary } from "@/types";
import daoHam from "@/data/quizzes/de-dao-ham";
import hamSo from "@/data/quizzes/de-ham-so-bac-hai";
import heThucLuong from "@/data/quizzes/de-he-thuc-luong";
import phuongTrinh from "@/data/quizzes/de-phuong-trinh-bac-hai";
import tichPhan from "@/data/quizzes/de-tich-phan";
import xacSuat from "@/data/quizzes/de-xac-suat";

const quizzes: Quiz[] = [phuongTrinh, hamSo, daoHam, tichPhan, heThucLuong, xacSuat];

export function getQuizzes(): Quiz[] {
  return quizzes;
}

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.slug === slug);
}

export function getQuizSummaries(): QuizSummary[] {
  return quizzes.map((quiz) => ({
    slug: quiz.slug,
    title: quiz.title,
    summary: quiz.summary,
    grade: quiz.grade,
    topic: quiz.topic,
    difficulty: quiz.difficulty,
    durationMinutes: quiz.durationMinutes,
    questionCount: quiz.questions.length,
    lessonSlug: quiz.lessonSlug,
    featured: quiz.featured,
  }));
}
