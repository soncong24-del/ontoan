import type { ChoiceId, McqQuestion, NumericQuestion } from "@/types";

export function mcq(
  id: string,
  prompt: string,
  choices: [string, string, string, string],
  correct: ChoiceId,
  solution: string,
): McqQuestion {
  const ids: ChoiceId[] = ["A", "B", "C", "D"];
  return {
    id,
    type: "mcq",
    prompt,
    choices: ids.map((choiceId, index) => ({ id: choiceId, text: choices[index] })),
    correctChoiceId: correct,
    solution,
  };
}

export function numeric(
  id: string,
  prompt: string,
  correctValue: number,
  solution: string,
  tolerance?: number,
): NumericQuestion {
  return {
    id,
    type: "numeric",
    prompt,
    correctValue,
    solution,
    tolerance,
  };
}
