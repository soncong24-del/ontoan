import { mcq, numeric } from "@/data/question";
import { tex } from "@/data/tex";
import type { Quiz } from "@/types";

const quiz: Quiz = {
  slug: "de-tich-phan",
  title: "Kiểm tra: Nguyên hàm và tích phân",
  summary: "Họ nguyên hàm, điều kiện xác định hằng số, và tích phân xác định mức vận dụng.",
  grade: "12",
  topic: "giai-tich",
  difficulty: "van-dung-cao",
  durationMinutes: 30,
  lessonSlug: "nguyen-ham-va-tich-phan",
  featured: true,
  questions: [
    mcq(
      "q1",
      tex`Họ nguyên hàm của $f(x) = 3x^2 - 2x + 1$ là`,
      [tex`$x^3 - x^2 + x + C$`, tex`$x^3 - x^2 + 1 + C$`, tex`$6x - 2 + C$`, tex`$x^3 - 2x^2 + x + C$`],
      "A",
      tex`Tích phân từng số hạng: $\int 3x^2 = x^3$, $\int -2x = -x^2$, $\int 1 = x$. Thêm hằng số $C$.`,
    ),
    mcq(
      "q2",
      tex`$\displaystyle\int_0^1 2x\,\mathrm{d}x$ bằng`,
      [tex`$1$`, tex`$2$`, tex`$0$`, tex`$\dfrac{1}{2}$`],
      "A",
      tex`Nguyên hàm $x^2$. Kết quả $1^2 - 0^2 = 1$.`,
    ),
    numeric(
      "q3",
      tex`Giá trị của $\displaystyle\int_0^2 3x^2\,\mathrm{d}x$ bằng bao nhiêu?`,
      8,
      tex`Nguyên hàm $x^3$. Ta có $2^3 - 0^3 = 8$.`,
    ),
    mcq(
      "q4",
      tex`$\displaystyle\int \sin x\,\mathrm{d}x$ bằng`,
      [tex`$-\cos x + C$`, tex`$\cos x + C$`, tex`$-\sin x + C$`, tex`$\sin x + C$`],
      "A",
      tex`Đạo hàm của $-\cos x$ là $\sin x$, nên nguyên hàm là $-\cos x + C$.`,
    ),
    mcq(
      "q5",
      tex`$\displaystyle\int_1^e \dfrac{1}{x}\,\mathrm{d}x$ bằng`,
      [tex`$1$`, tex`$e$`, tex`$0$`, tex`$\ln 2$`],
      "A",
      tex`$\ln|x|$ từ $1$ đến $e$: $\ln e - \ln 1 = 1 - 0 = 1$.`,
    ),
    mcq(
      "q6",
      tex`Nếu $F'(x) = 2x$ và $F(1) = 3$ thì`,
      [tex`$F(x) = x^2 + 2$`, tex`$F(x) = x^2 + 3$`, tex`$F(x) = 2x + 1$`, tex`$F(x) = x^2 - 2$`],
      "A",
      tex`$F(x) = x^2 + C$. Điều kiện $F(1) = 1 + C = 3$ cho $C = 2$.`,
    ),
    mcq(
      "q7",
      tex`$\displaystyle\int_0^{\pi/2} \cos x\,\mathrm{d}x$ bằng`,
      [tex`$1$`, tex`$0$`, tex`$\dfrac{\pi}{2}$`, tex`$-1$`],
      "A",
      tex`Nguyên hàm $\sin x$. $\sin\dfrac{\pi}{2} - \sin 0 = 1 - 0 = 1$.`,
    ),
    mcq(
      "q8",
      tex`$\displaystyle\int_0^1 (x + 1)^2\,\mathrm{d}x$ bằng`,
      [tex`$\dfrac{7}{3}$`, tex`$\dfrac{4}{3}$`, tex`$3$`, tex`$\dfrac{1}{3}$`],
      "A",
      tex`$(x + 1)^2 = x^2 + 2x + 1$. Nguyên hàm $\dfrac{x^3}{3} + x^2 + x$. Thay cận $1$: $\dfrac{1}{3} + 1 + 1 = \dfrac{7}{3}$.`,
    ),
    mcq(
      "q9",
      tex`$\displaystyle\int e^{2x}\,\mathrm{d}x$ bằng`,
      [tex`$\dfrac{1}{2}e^{2x} + C$`, tex`$e^{2x} + C$`, tex`$2e^{2x} + C$`, tex`$\dfrac{1}{2}e^{x} + C$`],
      "A",
      tex`Đạo hàm của $e^{2x}$ là $2e^{2x}$, nên phải nhân thêm $\dfrac{1}{2}$ để được đúng hàm dưới dấu tích phân.`,
    ),
    mcq(
      "q10",
      tex`Diện tích hình phẳng giới hạn bởi $y = x$, trục hoành và hai đường $x = 0$, $x = 2$ bằng`,
      [tex`$2$`, tex`$4$`, tex`$1$`, tex`$8$`],
      "A",
      tex`Trên $[0; 2]$, $y = x \ge 0$. Diện tích là $\displaystyle\int_0^2 x\,\mathrm{d}x = \left[\dfrac{x^2}{2}\right]_0^2 = 2$. Đây cũng là diện tích tam giác vuông đáy $2$, cao $2$.`,
    ),
  ],
};

export default quiz;
