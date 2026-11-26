import { mcq, numeric } from "@/data/question";
import { tex } from "@/data/tex";
import type { Quiz } from "@/types";

const quiz: Quiz = {
  slug: "de-dao-ham",
  title: "Kiểm tra: Đạo hàm và tiếp tuyến",
  summary: "Quy tắc đạo hàm, hệ số góc tiếp tuyến và cực trị của hàm đa thức.",
  grade: "11",
  topic: "giai-tich",
  difficulty: "van-dung",
  durationMinutes: 30,
  lessonSlug: "dao-ham-va-ung-dung",
  featured: true,
  questions: [
    mcq(
      "q1",
      tex`Đạo hàm của $f(x) = x^3 - 5x + 2$ là`,
      [tex`$3x^2 - 5$`, tex`$3x^2 - 5x$`, tex`$x^2 - 5$`, tex`$3x^2 + 5$`],
      "A",
      tex`$(x^3)' = 3x^2$ và $(-5x)' = -5$. Hằng số biến mất.`,
    ),
    mcq(
      "q2",
      tex`Đạo hàm của $f(x) = \sin x + x^2$ là`,
      [tex`$\cos x + 2x$`, tex`$-\cos x + 2x$`, tex`$\cos x + x$`, tex`$\sin x + 2x$`],
      "A",
      tex`$(\sin x)' = \cos x$ và $(x^2)' = 2x$.`,
    ),
    mcq(
      "q3",
      tex`Hệ số góc của tiếp tuyến đồ thị $y = x^2$ tại điểm có hoành độ $3$ bằng`,
      [tex`$6$`, tex`$9$`, tex`$3$`, tex`$2$`],
      "A",
      tex`$y' = 2x$, nên hệ số góc là $y'(3) = 6$.`,
    ),
    mcq(
      "q4",
      tex`Tiếp tuyến của $y = x^2$ tại điểm có hoành độ $1$ có phương trình`,
      [tex`$y = 2x - 1$`, tex`$y = 2x + 1$`, tex`$y = x - 1$`, tex`$y = 2x$`],
      "A",
      tex`$y'(1) = 2$, $y(1) = 1$. Tiếp tuyến $y = 2(x - 1) + 1 = 2x - 1$.`,
    ),
    numeric(
      "q5",
      tex`Cho $f(x) = x^3 - 3x + 1$. Giá trị $f'(1)$ bằng bao nhiêu?`,
      0,
      tex`$f'(x) = 3x^2 - 3$, nên $f'(1) = 3 - 3 = 0$.`,
    ),
    mcq(
      "q6",
      tex`Hàm số $f(x) = x^3 - 3x$ đạt cực tiểu tại`,
      [tex`$x = 1$`, tex`$x = -1$`, tex`$x = 0$`, tex`$x = 3$`],
      "A",
      tex`$f'(x) = 3(x - 1)(x + 1)$. Dấu $f'$ âm trên $(-1; 1)$ và dương trên $(1; +\infty)$, nên $f'$ đổi từ âm sang dương tại $x = 1$. Đó là điểm cực tiểu. $x = -1$ là cực đại.`,
    ),
    mcq(
      "q7",
      tex`Giá trị nhỏ nhất của $f(x) = x^2 - 4x + 5$ trên $\mathbb{R}$ bằng`,
      [tex`$1$`, tex`$5$`, tex`$0$`, tex`$4$`],
      "A",
      tex`$f'(x) = 2x - 4 = 0$ khi $x = 2$. $f(2) = 4 - 8 + 5 = 1$, và $a > 0$ nên đây là giá trị nhỏ nhất.`,
    ),
    mcq(
      "q8",
      tex`Đạo hàm của $f(x) = (2x + 1)(x - 3)$ là`,
      [tex`$4x - 5$`, tex`$4x - 6$`, tex`$2x - 5$`, tex`$4x + 5$`],
      "A",
      tex`Khai triển: $f(x) = 2x^2 - 5x - 3$. Vậy $f'(x) = 4x - 5$.`,
    ),
    mcq(
      "q9",
      tex`Cho $f(x) = e^x$. Giá trị $f'(0)$ bằng`,
      [tex`$1$`, tex`$0$`, tex`$e$`, tex`$-1$`],
      "A",
      tex`$(e^x)' = e^x$, nên $f'(0) = e^0 = 1$.`,
    ),
    mcq(
      "q10",
      tex`Đạo hàm của $y = \ln x$ trên $(0; +\infty)$ là`,
      [tex`$\dfrac{1}{x}$`, tex`$\dfrac{1}{x^2}$`, tex`$\ln x$`, tex`$e^x$`],
      "A",
      tex`$(\ln x)' = \dfrac{1}{x}$ với $x > 0$.`,
    ),
  ],
};

export default quiz;
