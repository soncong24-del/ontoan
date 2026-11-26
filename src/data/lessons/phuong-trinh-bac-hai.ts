import { mcq } from "@/data/question";
import { tex } from "@/data/tex";
import type { Lesson } from "@/types";

const lesson: Lesson = {
  slug: "phuong-trinh-bac-hai-va-dinh-ly-viet",
  title: "Phương trình bậc hai và định lý Vi-ét",
  summary:
    "Đưa phương trình về dạng chính tắc, tính biệt thức, tìm nghiệm và dùng Vi-ét để tính biểu thức đối xứng mà không cần giải.",
  grade: "9",
  topic: "dai-so",
  durationMinutes: 25,
  featured: true,
  updatedAt: "2026-11-20",
  quizSlug: "de-phuong-trinh-bac-hai",
  objectives: [
    "Nhận ra phương trình bậc hai và hệ số a, b, c.",
    "Dùng biệt thức Δ để biết số nghiệm.",
    "Viết nghiệm bằng công thức nghiệm.",
    "Tính tổng, tích và các biểu thức đối xứng nhờ định lý Vi-ét.",
  ],
  sections: [
    {
      id: "dang-chinh-tac",
      title: "Dạng chính tắc và biệt thức",
      blocks: [
        {
          type: "paragraph",
          text: tex`Phương trình bậc hai ẩn $x$ là phương trình có dạng`,
        },
        {
          type: "formula",
          latex: tex`ax^2+bx+c=0 \quad (a \neq 0).`,
          caption: "a là hệ số bậc hai, b là hệ số bậc nhất, c là hệ số tự do.",
        },
        {
          type: "paragraph",
          text: tex`Nếu phương trình còn lẫn dấu ngoặc hoặc chưa chuyển vế, hãy khai triển rồi gom về một vế. Chỉ tính Δ khi phương trình đã ở dạng chính tắc.`,
        },
        {
          type: "callout",
          tone: "definition",
          title: "Biệt thức",
          body: tex`$$\Delta = b^2 - 4ac.$$ Nếu $\Delta > 0$ thì phương trình có hai nghiệm phân biệt. Nếu $\Delta = 0$ thì có nghiệm kép. Nếu $\Delta < 0$ thì vô nghiệm (trong tập số thực).`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Đừng quên a khác 0",
          body: tex`Khi $a = 0$, phương trình không còn bậc hai. Hãy đưa về phương trình bậc nhất $bx + c = 0$ và xét riêng.`,
        },
      ],
    },
    {
      id: "cong-thuc-nghiem",
      title: "Công thức nghiệm",
      blocks: [
        {
          type: "paragraph",
          text: tex`Khi $\Delta \ge 0$, hai nghiệm (có thể trùng) là`,
        },
        {
          type: "formula",
          latex: tex`x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}.`,
        },
        {
          type: "paragraph",
          text: tex`Nếu $\Delta = 0$ thì công thức gọn lại thành nghiệm kép $x = -\dfrac{b}{2a}$. Nếu b chẵn, đặt $b = 2b'$ rồi dùng $\Delta' = b'^2 - ac$ cho đỡ tính nhầm: $x = \dfrac{-b' \pm \sqrt{\Delta'}}{a}$.`,
        },
        {
          type: "list",
          ordered: true,
          items: [
            tex`Xác định a, b, c.`,
            tex`Tính $\Delta = b^2 - 4ac$.`,
            tex`Kết luận số nghiệm trước khi viết giá trị.`,
            tex`Rút gọn nghiệm, ưu tiên phân số tối giản.`,
          ],
        },
      ],
    },
    {
      id: "dinh-ly-viet",
      title: "Định lý Vi-ét",
      blocks: [
        {
          type: "callout",
          tone: "theorem",
          title: "Vi-ét thuận",
          body: tex`Nếu $x_1, x_2$ là hai nghiệm của $ax^2 + bx + c = 0$ thì $$x_1 + x_2 = -\frac{b}{a}, \quad x_1 x_2 = \frac{c}{a}.$$ Hệ thức chỉ dùng khi phương trình có nghiệm, tức $\Delta \ge 0$.`,
        },
        {
          type: "paragraph",
          text: tex`Ký hiệu $S = x_1 + x_2$ và $P = x_1 x_2$. Các biểu thức hay gặp được đưa về S và P:`,
        },
        {
          type: "list",
          items: [
            tex`$x_1^2 + x_2^2 = S^2 - 2P$.`,
            tex`$x_1^3 + x_2^3 = S^3 - 3SP$.`,
            tex`$\dfrac{1}{x_1} + \dfrac{1}{x_2} = \dfrac{S}{P}$ khi $P \neq 0$.`,
            tex`$(x_1 - x_2)^2 = S^2 - 4P = \dfrac{\Delta}{a^2}$.`,
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Vi-ét đảo",
          body: tex`Nếu hai số $x_1, x_2$ có tổng $S$ và tích $P$ thì chúng là hai nghiệm của phương trình $t^2 - St + P = 0$, với điều kiện $S^2 - 4P \ge 0$.`,
        },
      ],
    },
    {
      id: "vi-du",
      title: "Ví dụ minh họa",
      blocks: [
        {
          type: "example",
          title: "Ví dụ 1. Giải phương trình",
          prompt: tex`Giải $x^2 - 5x + 6 = 0$.`,
          solution: tex`Ta có $a = 1$, $b = -5$, $c = 6$.

$\Delta = (-5)^2 - 4 \cdot 1 \cdot 6 = 25 - 24 = 1 > 0$, nên có hai nghiệm phân biệt.

$x = \dfrac{5 \pm 1}{2}$. Vậy $x_1 = 3$, $x_2 = 2$.

Thử lại bằng Vi-ét: tổng bằng $5 = -b/a$, tích bằng $6 = c/a$.`,
        },
        {
          type: "example",
          title: "Ví dụ 2. Tính biểu thức không giải nghiệm",
          prompt: tex`Gọi $x_1, x_2$ là hai nghiệm của $x^2 - 4x + 1 = 0$. Tính $x_1^2 + x_2^2$.`,
          solution: tex`$\Delta = 16 - 4 = 12 > 0$, phương trình có hai nghiệm.

$S = 4$, $P = 1$.

$x_1^2 + x_2^2 = S^2 - 2P = 16 - 2 = 14$.

Không cần viết $x = 2 \pm \sqrt{3}$.`,
        },
      ],
    },
  ],
  quickCheck: [
    mcq(
      "qc1",
      tex`Phương trình $2x^2 - 3x + 5 = 0$ có bao nhiêu nghiệm thực?`,
      [tex`Hai nghiệm phân biệt`, tex`Một nghiệm kép`, tex`Vô nghiệm`, tex`Vô số nghiệm`],
      "C",
      tex`$\Delta = (-3)^2 - 4 \cdot 2 \cdot 5 = 9 - 40 = -31 < 0$, nên phương trình vô nghiệm thực.`,
    ),
    mcq(
      "qc2",
      tex`Tổng hai nghiệm của $x^2 - 7x + 10 = 0$ bằng`,
      [tex`$7$`, tex`$-7$`, tex`$10$`, tex`$-10$`],
      "A",
      tex`$\Delta = 49 - 40 = 9 > 0$. Theo Vi-ét, $S = -b/a = 7$.`,
    ),
  ],
};

export default lesson;
