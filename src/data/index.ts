import { getLessons } from "@/data/lessons";
import { getQuizzes } from "@/data/quizzes";
import { correctAnswer, gradeQuiz } from "@/lib/grading";
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
    if (question.type === "true-false") {
      question.statements.forEach((statement) => assertLatexIntact(statement.text, `${label} ${statement.id}`));
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
    if (quiz.examFormat === "thpt-2025") {
      const mcqCount = quiz.questions.filter((question) => question.type === "mcq").length;
      const tfCount = quiz.questions.filter((question) => question.type === "true-false").length;
      const numericCount = quiz.questions.filter((question) => question.type === "numeric").length;
      if (mcqCount !== 12 || tfCount !== 4 || numericCount !== 6) {
        throw new Error(`Đề THPT ${quiz.slug} cần 12 trắc nghiệm, 4 đúng/sai và 6 trả lời ngắn.`);
      }
    } else if (quiz.questions.length < 8 || quiz.questions.length > 12) {
      throw new Error(`Đề ${quiz.slug} cần từ 8 đến 12 câu, hiện có ${quiz.questions.length}.`);
    }
    const ids = new Set<string>();
    for (const question of quiz.questions) {
      if (ids.has(question.id)) throw new Error(`Trùng mã câu ${question.id} trong ${quiz.slug}`);
      ids.add(question.id);
      walkQuestion(question, `${quiz.slug}/${question.id}`);
    }
    const key: Record<string, string> = {};
    for (const question of quiz.questions) key[question.id] = correctAnswer(question);
    const graded = gradeQuiz(quiz, key);
    if (graded.score !== 10) {
      throw new Error(`Đề ${quiz.slug} làm đúng hết nhưng được ${graded.score} điểm, không phải 10.`);
    }
  }

  const expectCount = (grade: "10" | "11" | "12", type: string, count: number) => {
    const found = quizzes.filter((quiz) => quiz.grade === grade && quiz.examType === type).length;
    if (found !== count) throw new Error(`Toán ${grade} loại ${type} có ${found} đề, cần ${count}.`);
  };
  for (const grade of ["10", "11"] as const) {
    expectCount(grade, "giua-ki-1", 2);
    expectCount(grade, "hoc-ki-1", 2);
    expectCount(grade, "giua-ki-2", 2);
    expectCount(grade, "hoc-ki-2", 2);
    expectCount(grade, "on-tap", 1);
    expectCount(grade, "khao-sat", 1);
  }
  expectCount("12", "giua-ki-1", 10);
  expectCount("12", "hoc-ki-1", 11);
  expectCount("12", "giua-ki-2", 10);
  expectCount("12", "hoc-ki-2", 10);
  expectCount("12", "thi-thu-thpt", 10);
}

assertContentIntegrity();

export { getLesson, getLessons, getLessonSummaries } from "@/data/lessons";
export { getQuiz, getQuizzes, getQuizSummaries } from "@/data/quizzes";
export { getCourse, getCourses } from "@/data/courses";
