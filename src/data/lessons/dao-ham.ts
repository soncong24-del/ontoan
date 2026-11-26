import { mcq } from "@/data/question";
import { tex } from "@/data/tex";
import type { Lesson } from "@/types";

const lesson: Lesson = {
  slug: "dao-ham-va-ung-dung",
  title: "Đạo hàm và ứng dụng",
  summary:
    "Tính đạo hàm bằng quy tắc, viết tiếp tuyến và tìm cực trị của hàm đa thức thông qua dấu của đạo hàm.",
  grade: "11",
  topic: "giai-tich",
  durationMinutes: 35,
  featured: true,
  updatedAt: "2026-11-20",
  quizSlug: "de-dao-ham",
  objectives: [
    "Tính đạo hàm của đa thức, tích, thương và một số hàm lượng giác, mũ, lôgarit.",
    "Viết phương trình tiếp tuyến tại một điểm trên đồ thị.",
    "Tìm điểm cực trị bằng cách xét dấu y'.",
    "Đọc giá trị lớn nhất, nhỏ nhất trên một khoảng từ điểm dừng.",
  ],
  sections: [
    {
      id: "quy-tac",
      title: "Quy tắc tính đạo hàm",
      blocks: [
        {
          type: "callout",
          tone: "definition",
          title: "Đạo hàm tại một điểm",
          body: tex`$$f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h},$$ khi giới hạn này tồn tại. Số $f'(x_0)$ là hệ số góc của tiếp tuyến tại điểm có hoành độ $x_0$.`,
        },
        {
          type: "list",
          items: [
            tex`$(c)' = 0$, $(x^n)' = nx^{n-1}$.`,
            tex`$(u + v)' = u' + v'$, $(ku)' = ku'$.`,
            tex`$(uv)' = u'v + uv'$.`,
            tex`$\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$.`,
            tex`$(\sin x)' = \cos x$, $(\cos x)' = -\sin x$.`,
            tex`$(e^x)' = e^x$, $(\ln x)' = \dfrac{1}{x}$ với $x > 0$.`,
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Hàm hợp",
          body: tex`$(f(u))' = f'(u) \cdot u'$. Ví dụ $(\sin 2x)' = 2\cos 2x$ và $(e^{2x})' = 2e^{2x}$.`,
        },
      ],
    },
    {
      id: "tiep-tuyen",
      title: "Tiếp tuyến của đồ thị",
      blocks: [
        {
          type: "paragraph",
          text: tex`Tiếp tuyến của đồ thị $y = f(x)$ tại điểm $M(x_0; f(x_0))$ có phương trình`,
        },
        {
          type: "formula",
          latex: tex`y = f'(x_0)(x - x_0) + f(x_0).`,
        },
        {
          type: "paragraph",
          text: tex`Nếu đề cho hệ số góc k, hãy giải $f'(x_0) = k$ để tìm hoành độ tiếp điểm, rồi thay vào công thức trên. Một giá trị k có thể cho nhiều tiếp điểm.`,
        },
      ],
    },
    {
      id: "cuc-tri",
      title: "Cực trị",
      blocks: [
        {
          type: "paragraph",
          text: tex`Quy trình cho hàm đa thức: tính $f'(x)$, giải $f'(x) = 0$, rồi xét dấu $f'$ trên các khoảng.`,
        },
        {
          type: "list",
          items: [
            tex`Nếu $f'$ đổi từ dương sang âm khi đi qua $x_0$ thì $x_0$ là điểm cực đại.`,
            tex`Nếu $f'$ đổi từ âm sang dương thì $x_0$ là điểm cực tiểu.`,
            tex`Nếu $f'$ không đổi dấu thì $x_0$ không phải cực trị, dù $f'(x_0) = 0$.`,
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Cực trị không phải lúc nào cũng là GTLN, GTNN",
          body: tex`Cực trị là so sánh địa phương. Trên cả $\mathbb{R}$, hàm $y = x^3 - 3x$ có cực đại và cực tiểu nhưng không có giá trị lớn nhất hay nhỏ nhất.`,
        },
      ],
    },
    {
      id: "vi-du",
      title: "Ví dụ minh họa",
      blocks: [
        {
          type: "example",
          title: "Ví dụ 1. Cực trị của hàm bậc ba",
          prompt: tex`Tìm cực trị của $f(x) = x^3 - 3x$.`,
          solution: tex`$f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.

$f'(x) = 0$ khi $x = -1$ hoặc $x = 1$.

Dấu $f'$: dương trên $(-\infty; -1)$, âm trên $(-1; 1)$, dương trên $(1; +\infty)$.

$f'$ đổi từ dương sang âm tại $x = -1$: cực đại $f(-1) = 2$.

$f'$ đổi từ âm sang dương tại $x = 1$: cực tiểu $f(1) = -2$.`,
        },
        {
          type: "example",
          title: "Ví dụ 2. Viết tiếp tuyến",
          prompt: tex`Viết tiếp tuyến của $y = x^2$ tại điểm có hoành độ $1$.`,
          solution: tex`$y' = 2x$, nên $y'(1) = 2$ và $y(1) = 1$.

Phương trình tiếp tuyến: $y = 2(x - 1) + 1 = 2x - 1$.

Tiếp điểm là $(1; 1)$, hệ số góc bằng $2$.`,
        },
      ],
    },
  ],
  quickCheck: [
    mcq(
      "qc1",
      tex`Đạo hàm của $f(x) = x^3 - 5x + 2$ là`,
      [tex`$3x^2 - 5$`, tex`$3x^2 - 5x$`, tex`$x^2 - 5$`, tex`$3x^2 + 5$`],
      "A",
      tex`$(x^3)' = 3x^2$, $(-5x)' = -5$, hằng số có đạo hàm $0$.`,
    ),
    mcq(
      "qc2",
      tex`Hệ số góc tiếp tuyến của $y = x^2$ tại $x = 3$ bằng`,
      [tex`$6$`, tex`$9$`, tex`$3$`, tex`$2$`],
      "A",
      tex`$y' = 2x$, nên $y'(3) = 6$.`,
    ),
  ],
};

export default lesson;
