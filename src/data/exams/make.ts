import { tex } from "@/data/tex";
import type {
  ChoiceId,
  DifficultyId,
  ExamFormat,
  ExamType,
  GradeLevel,
  McqQuestion,
  NumericQuestion,
  Question,
  Quiz,
  TopicId,
  TrueFalseQuestion,
} from "@/types";

const CHOICE_IDS: ChoiceId[] = ["A", "B", "C", "D"];

export function mcq(
  id: string,
  prompt: string,
  correct: string,
  wrongs: [string, string, string],
  solution: string,
  slot: number,
): McqQuestion {
  const at = ((slot % 4) + 4) % 4;
  const texts = [...wrongs];
  texts.splice(at, 0, correct);
  const used = new Set<string>();
  for (let index = 0; index < texts.length; index += 1) {
    let next = texts[index];
    let suffix = 2;
    while (used.has(next)) {
      next = `${texts[index]} (${suffix})`;
      suffix += 1;
    }
    used.add(next);
    texts[index] = next;
  }
  return {
    id,
    type: "mcq",
    prompt,
    solution,
    choices: CHOICE_IDS.map((choiceId, index) => ({ id: choiceId, text: texts[index] })),
    correctChoiceId: CHOICE_IDS[at],
  };
}

export function num(id: string, prompt: string, correctValue: number, solution: string): NumericQuestion {
  if (!Number.isInteger(correctValue)) {
    throw new Error(`Đáp số ${id} phải là số nguyên, nhận ${correctValue}`);
  }
  return { id, type: "numeric", prompt, correctValue, solution };
}

export function tf(
  id: string,
  prompt: string,
  statements: { text: string; correct: boolean }[],
  solution: string,
): TrueFalseQuestion {
  if (statements.length !== 4) throw new Error(`${id} cần đúng 4 ý`);
  const ids = ["a", "b", "c", "d"] as const;
  return {
    id,
    type: "true-false",
    prompt,
    solution,
    statements: statements.map((statement, index) => ({
      id: ids[index],
      text: statement.text,
      correct: statement.correct,
    })),
  };
}

export function term(value: number): string {
  return value >= 0 ? `+ ${value}` : `- ${Math.abs(value)}`;
}

export function quiz(input: {
  slug: string;
  title: string;
  summary: string;
  grade: GradeLevel;
  topic: TopicId;
  difficulty: DifficultyId;
  durationMinutes: number;
  lessonSlug: string;
  examType: ExamType;
  examFormat?: ExamFormat;
  questions: Question[];
  videoUrl?: string;
}): Quiz {
  return {
    ...input,
    examFormat: input.examFormat ?? "standard",
  };
}

export function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function reindex(questions: Question[]): Question[] {
  return questions.map((question, index) => ({ ...question, id: `q${index + 1}` }));
}

export { tex };
