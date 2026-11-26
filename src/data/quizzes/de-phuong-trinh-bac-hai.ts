import { mcq, numeric } from "@/data/question";
import { tex } from "@/data/tex";
import type { Quiz } from "@/types";

const quiz: Quiz = {
  slug: "de-phuong-trinh-bac-hai",
  title: "Kiểm tra: Phương trình bậc hai và Vi-ét",
  summary: "Mười câu về biệt thức, công thức nghiệm và biểu thức đối xứng. Phù hợp ôn thi vào 10.",
  grade: "9",
  topic: "dai-so",
  difficulty: "co-ban",
  durationMinutes: 20,
  lessonSlug: "phuong-trinh-bac-hai-va-dinh-ly-viet",
  featured: true,
  questions: [
    mcq(
      "q1",
      tex`Nghiệm của phương trình $x^2 - 5x + 6 = 0$ là`,
      [tex`$2$ và $3$`, tex`$-2$ và $-3$`, tex`$1$ và $6$`, tex`$-1$ và $-6$`],
      "A",
      tex`$\Delta = 25 - 24 = 1$. $x = \dfrac{5 \pm 1}{2}$, nên hai nghiệm là $3$ và $2$.`,
    ),
    mcq(
      "q2",
      tex`Phương trình $x^2 + 4x + 5 = 0$`,
      [tex`có hai nghiệm phân biệt`, tex`có nghiệm kép`, tex`vô nghiệm`, tex`có vô số nghiệm`],
      "C",
      tex`$\Delta = 16 - 20 = -4 < 0$, nên phương trình vô nghiệm thực.`,
    ),
    mcq(
      "q3",
      tex`Tổng hai nghiệm của $2x^2 - 6x + 1 = 0$ bằng`,
      [tex`$-3$`, tex`$3$`, tex`$\dfrac{1}{2}$`, tex`$6$`],
      "B",
      tex`$\Delta = 36 - 8 = 28 > 0$. Tổng hai nghiệm là $-\dfrac{b}{a} = \dfrac{6}{2} = 3$.`,
    ),
    mcq(
      "q4",
      tex`Tích hai nghiệm của $x^2 + 3x - 4 = 0$ bằng`,
      [tex`$3$`, tex`$-3$`, tex`$4$`, tex`$-4$`],
      "D",
      tex`$\Delta = 9 + 16 = 25 > 0$. Tích hai nghiệm là $\dfrac{c}{a} = -4$.`,
    ),
    numeric(
      "q5",
      tex`Biệt thức $\Delta$ của phương trình $x^2 - 4x + 1 = 0$ bằng bao nhiêu?`,
      12,
      tex`$\Delta = (-4)^2 - 4 \cdot 1 \cdot 1 = 16 - 4 = 12$.`,
    ),
    mcq(
      "q6",
      tex`Gọi $x_1, x_2$ là hai nghiệm của $x^2 - 7x + 10 = 0$. Giá trị $x_1^2 + x_2^2$ bằng`,
      [tex`$29$`, tex`$49$`, tex`$9$`, tex`$39$`],
      "A",
      tex`$S = 7$, $P = 10$. $x_1^2 + x_2^2 = S^2 - 2P = 49 - 20 = 29$.`,
    ),
    mcq(
      "q7",
      tex`Phương trình $x^2 - 2(m + 1)x + m^2 = 0$ có nghiệm kép khi`,
      [tex`$m = -\dfrac{1}{2}$`, tex`$m = \dfrac{1}{2}$`, tex`$m = -1$`, tex`$m = 0$`],
      "A",
      tex`$\Delta = 4(m + 1)^2 - 4m^2 = 4(2m + 1)$. $\Delta = 0$ khi $m = -\dfrac{1}{2}$. Thử lại: phương trình trở thành $\left(x - \dfrac{1}{2}\right)^2 = 0$.`,
    ),
    mcq(
      "q8",
      tex`Hình chữ nhật có chu vi $20$ cm và diện tích $21$ cm$^2$. Chiều dài và chiều rộng là hai nghiệm của phương trình nào?`,
      [
        tex`$x^2 - 10x + 21 = 0$`,
        tex`$x^2 + 10x + 21 = 0$`,
        tex`$x^2 - 20x + 21 = 0$`,
        tex`$x^2 - 10x - 21 = 0$`,
      ],
      "A",
      tex`Chu vi $20$ nên tổng hai kích thước bằng $10$. Tích bằng $21$. Theo Vi-ét đảo, chúng là nghiệm của $t^2 - 10t + 21 = 0$.`,
    ),
    numeric(
      "q9",
      tex`Nghiệm lớn hơn của phương trình $x^2 - 2x - 15 = 0$ bằng bao nhiêu?`,
      5,
      tex`$(x - 5)(x + 3) = 0$, nên nghiệm là $5$ và $-3$. Nghiệm lớn hơn là $5$.`,
    ),
    mcq(
      "q10",
      tex`Nếu $x_1, x_2$ là hai nghiệm của $x^2 - 5x + 3 = 0$ thì $\dfrac{1}{x_1} + \dfrac{1}{x_2}$ bằng`,
      [tex`$\dfrac{5}{3}$`, tex`$\dfrac{3}{5}$`, tex`$5$`, tex`$-\dfrac{5}{3}$`],
      "A",
      tex`$\Delta = 25 - 12 = 13 > 0$ và tích $P = 3 \neq 0$. $\dfrac{1}{x_1} + \dfrac{1}{x_2} = \dfrac{S}{P} = \dfrac{5}{3}$.`,
    ),
  ],
};

export default quiz;
