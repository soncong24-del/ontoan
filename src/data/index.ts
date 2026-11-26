import { getLessons } from "@/data/lessons";
import { getQuizzes } from "@/data/quizzes";
import { assertLatexIntact, assertRawLatex } from "@/lib/text";
import type { ContentBlock, Question } from "@/types";

function walkQuestion(question: Question, label: string) {
  assertLatexIntact(question.prompt, `${label} đề`);
  assertLatexIntact(question.solution, `${label} lời giải`);
  if (question.type === "mcq") {
    if (!question.choices.some((choice) => choice.id === question.correctChoiceId)) {
      throw new Error(`Đáp án không khớp lựa chọn tại ${label}`);
    }
    question.choices.forEach((choice) => assertLatexIntact(choice.text, `${label} ${choice.id}`));
  }
}

function walkBlock(block: ContentBlock, label: string) {
  switch (block.type) {
    case "paragraph":
      assertLatexIntact(block.text, label);
      break;
    case "formula":
      assertRawLatex(block.latex, label);
      if (block.caption) assertLatexIntact(block.caption, label);
      break;
    case "list":
      block.items.forEach((item) => assertLatexIntact(item, label));
      break;
    case "callout":
      assertLatexIntact(block.body, label);
      break;
    case "example":
      assertLatexIntact(block.prompt, label);
      assertLatexIntact(block.solution, label);
      break;
    case "table":
      block.headers.forEach((cell) => assertLatexIntact(cell, label));
      block.rows.flat().forEach((cell) => assertLatexIntact(cell, label));
      break;
    default: {
      const unreachable: never = block;
      return unreachable;
    }
  }
}

function assertContentIntegrity() {
  const lessons = getLessons();
  const quizzes = getQuizzes();
  const lessonSlugs = new Set(lessons.map((lesson) => lesson.slug));
  const quizSlugs = new Set(quizzes.map((quiz) => quiz.slug));

  for (const lesson of lessons) {
    if (!quizSlugs.has(lesson.quizSlug)) {
      throw new Error(`Bài giảng ${lesson.slug} trỏ tới đề không tồn tại: ${lesson.quizSlug}`);
    }
    lesson.objectives.forEach((objective) => assertLatexIntact(objective, lesson.slug));
    lesson.sections.forEach((section) => {
      section.blocks.forEach((block) => walkBlock(block, `${lesson.slug}/${section.id}`));
    });
    lesson.quickCheck.forEach((question) => walkQuestion(question, `${lesson.slug}/${question.id}`));
  }

  for (const quiz of quizzes) {
    if (!lessonSlugs.has(quiz.lessonSlug)) {
      throw new Error(`Đề ${quiz.slug} trỏ tới bài giảng không tồn tại.`);
    }
    if (quiz.questions.length < 8 || quiz.questions.length > 12) {
      throw new Error(`Đề ${quiz.slug} cần từ 8 đến 12 câu, hiện có ${quiz.questions.length}.`);
    }
    const ids = new Set<string>();
    for (const question of quiz.questions) {
      if (ids.has(question.id)) throw new Error(`Trùng mã câu ${question.id} trong ${quiz.slug}`);
      ids.add(question.id);
      walkQuestion(question, `${quiz.slug}/${question.id}`);
    }
  }
}

assertContentIntegrity();

export { getLesson, getLessons, getLessonSummaries } from "@/data/lessons";
export { getQuiz, getQuizzes, getQuizSummaries } from "@/data/quizzes";
export { getCourse, getCourses } from "@/data/courses";
