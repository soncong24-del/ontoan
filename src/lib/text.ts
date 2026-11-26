export function foldVietnamese(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export function includesFold(haystack: string, needle: string): boolean {
  const query = foldVietnamese(needle);
  if (!query) return true;
  return foldVietnamese(haystack).includes(query);
}

export type MathSegment =
  | { type: "text"; value: string }
  | { type: "inline"; value: string }
  | { type: "block"; value: string };

const MATH_PATTERN = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;

export function tokenizeMath(input: string): MathSegment[] {
  const segments: MathSegment[] = [];
  const expression = new RegExp(MATH_PATTERN);
  let last = 0;
  for (const match of input.matchAll(expression)) {
    const index = match.index ?? 0;
    if (index > last) {
      segments.push({ type: "text", value: input.slice(last, index) });
    }
    if (match[1] !== undefined) {
      segments.push({ type: "block", value: match[1].trim() });
    } else {
      segments.push({ type: "inline", value: (match[2] ?? "").trim() });
    }
    last = index + match[0].length;
  }
  if (last < input.length) {
    segments.push({ type: "text", value: input.slice(last) });
  }
  return segments;
}

const LATEX_COMMANDS = [
  "dfrac",
  "frac",
  "sqrt",
  "Delta",
  "neq",
  "leq",
  "geq",
  "infty",
  "cdot",
  "quad",
  "displaystyle",
  "mathrm",
  "mathbb",
  "overline",
  "int",
  "sum",
  "lim",
  "pm",
  "times",
  "theta",
  "alpha",
  "beta",
  "pi",
  "sin",
  "cos",
  "tan",
  "ln",
  "left",
  "right",
  "to",
];

function hasNakedCommand(latex: string, command: string): boolean {
  const pattern = new RegExp(`(?<![\\\\a-zA-Z])${command}\\b`);
  return pattern.test(latex);
}

export function assertRawLatex(latex: string, label: string): void {
  for (const command of LATEX_COMMANDS) {
    if (hasNakedCommand(latex, command)) {
      throw new Error(`Công thức thiếu dấu \\ trước "${command}" tại ${label}: ${latex}`);
    }
  }
}

export function assertLatexIntact(source: string, label: string): void {
  for (const segment of tokenizeMath(source)) {
    if (segment.type === "text") continue;
    assertRawLatex(segment.value, label);
  }
}
