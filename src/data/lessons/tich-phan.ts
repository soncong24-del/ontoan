import { mcq, numeric } from "@/data/question";
import { tex } from "@/data/tex";
import type { Lesson } from "@/types";

const lesson: Lesson = {
  slug: "nguyen-ham-va-tich-phan",
  title: "Nguyên hàm và tích phân",
  summary:
    "Tìm họ nguyên hàm, xác định hằng số bằng một điểm, rồi tính tích phân xác định bằng Newton–Leibniz.",
  grade: "12",
  topic: "giai-tich",
  durationMinutes: 35,
  featured: true,
  updatedAt: "2026-11-20",
  quizSlug: "de-tich-phan",
  objectives: [
    "Viết nguyên hàm của các hàm cơ bản và nhớ hằng số C.",
    "Tìm một nguyên hàm thỏa một điều kiện cho trước.",
    "Tính tích phân xác định bằng định lý Newton–Leibniz.",
    "Đọc tích phân của hàm không âm như diện tích hình phẳng đơn giản.",
  ],
  sections: [
    {
      id: "nguyen-ham",
      title: "Nguyên hàm",
      blocks: [
        {
          type: "callout",
          tone: "definition",
          title: "Nguyên hàm",
          body: tex`Hàm $F$ là một nguyên hàm của $f$ trên khoảng $K$ nếu $F'(x) = f(x)$ với mọi $x$ thuộc $K$. Nếu $F$ là một nguyên hàm thì mọi nguyên hàm đều có dạng $F(x) + C$.`,
        },
        {
          type: "list",
          items: [
            tex`$\displaystyle\int x^n\,\mathrm{d}x = \dfrac{x^{n+1}}{n+1} + C$ với $n \neq -1$.`,
            tex`$\displaystyle\int \dfrac{1}{x}\,\mathrm{d}x = \ln|x| + C$.`,
            tex`$\displaystyle\int e^x\,\mathrm{d}x = e^x + C$, và $\displaystyle\int e^{ax}\,\mathrm{d}x = \dfrac{1}{a}e^{ax} + C$ khi $a \neq 0$.`,
            tex`$\displaystyle\int \cos x\,\mathrm{d}x = \sin x + C$, $\displaystyle\int \sin x\,\mathrm{d}x = -\cos x + C$.`,
          ],
        },
        {
          type: "paragraph",
          text: tex`Tích phân bất định tuyến tính: $\int (\alpha u + \beta v) = \alpha \int u + \beta \int v$. Đừng tích phân từng số hạng rồi quên nhân hệ số.`,
        },
      ],
    },
    {
      id: "hang-so",
      title: "Xác định hằng số",
      blocks: [
        {
          type: "paragraph",
          text: tex`Đề bài thường cho một điểm mà nguyên hàm đi qua, ví dụ $F(1) = 3$. Hãy tìm họ nguyên hàm trước, rồi thay điểm đó để tìm C. Chỉ có một hàm cụ thể sau bước này, không còn viết $+ C$.`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Đạo hàm làm mất hằng số",
          body: tex`Nhiều hàm khác nhau có cùng đạo hàm. Vì vậy câu “tìm nguyên hàm” mà không có thêm điều kiện thì câu trả lời phải có $+ C$.`,
        },
      ],
    },
    {
      id: "newton",
      title: "Tích phân xác định",
      blocks: [
        {
          type: "formula",
          latex: tex`\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a),`,
          caption: "F là một nguyên hàm bất kỳ của f trên đoạn [a; b]. Hằng số C bị trừ đi nên không ảnh hưởng.",
        },
        {
          type: "list",
          items: [
            tex`$\displaystyle\int_a^b f = -\int_b^a f$ và $\displaystyle\int_a^a f = 0$.`,
            tex`Nếu $c$ nằm giữa $a$ và $b$ thì tích phân trên $[a; b]$ bằng tổng hai tích phân trên $[a; c]$ và $[c; b]$.`,
            tex`Nếu $f(x) \ge 0$ trên $[a; b]$ thì tích phân bằng diện tích hình phẳng giới hạn bởi đồ thị, trục hoành và hai đường $x = a$, $x = b$.`,
          ],
        },
      ],
    },
    {
      id: "vi-du",
      title: "Ví dụ minh họa",
      blocks: [
        {
          type: "example",
          title: "Ví dụ 1. Tích phân đa thức",
          prompt: tex`Tính $\displaystyle\int_0^2 (x^2 + 1)\,\mathrm{d}x$.`,
          solution: tex`Một nguyên hàm là $F(x) = \dfrac{x^3}{3} + x$.

$F(2) - F(0) = \dfrac{8}{3} + 2 - 0 = \dfrac{8}{3} + \dfrac{6}{3} = \dfrac{14}{3}$.`,
        },
        {
          type: "example",
          title: "Ví dụ 2. Nguyên hàm đi qua một điểm",
          prompt: tex`Tìm nguyên hàm $F$ của $f(x) = 3x^2 - 4x + 1$ sao cho $F(1) = 2$.`,
          solution: tex`$F(x) = x^3 - 2x^2 + x + C$.

$F(1) = 1 - 2 + 1 + C = 2$, nên $C = 2$.

$F(x) = x^3 - 2x^2 + x + 2$.

Thử đạo hàm: $F'(x) = 3x^2 - 4x + 1 = f(x)$.`,
        },
      ],
    },
  ],
  quickCheck: [
    mcq(
      "qc1",
      tex`Một nguyên hàm của $3x^2$ là`,
      [tex`$x^3$`, tex`$6x$`, tex`$x^3 + x$`, tex`$3x^3$`],
      "A",
      tex`$(x^3)' = 3x^2$. Các phương án khác có đạo hàm khác $3x^2$. Họ đầy đủ là $x^3 + C$, nên $x^3$ là một nguyên hàm.`,
    ),
    numeric(
      "qc2",
      tex`Giá trị của $\displaystyle\int_0^1 2x\,\mathrm{d}x$ bằng bao nhiêu?`,
      1,
      tex`Nguyên hàm $x^2$. Ta có $1^2 - 0^2 = 1$.`,
    ),
  ],
};

export default lesson;
