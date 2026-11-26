import { mcq, numeric } from "@/data/question";
import { tex } from "@/data/tex";
import type { Quiz } from "@/types";

const quiz: Quiz = {
  slug: "de-ham-so-bac-hai",
  title: "Kiểm tra: Hàm số bậc hai",
  summary: "Đỉnh, trục đối xứng, chiều biến thiên và giá trị lớn nhất, nhỏ nhất của parabol.",
  grade: "10",
  topic: "dai-so",
  difficulty: "van-dung",
  durationMinutes: 25,
  lessonSlug: "ham-so-bac-hai-khao-sat-do-thi",
  featured: true,
  questions: [
    mcq(
      "q1",
      tex`Parabol $y = -2x^2 + 4x + 1$`,
      [tex`quay bề lõm lên`, tex`quay bề lõm xuống`, tex`có trục đối xứng là Oy`, tex`cắt Oy tại điểm có tung độ $-2$`],
      "B",
      tex`$a = -2 < 0$, parabol quay xuống. Giao Oy là $(0; 1)$, không phải $-2$.`,
    ),
    mcq(
      "q2",
      tex`Tọa độ đỉnh của parabol $y = x^2 - 6x + 5$ là`,
      [tex`$(3; -4)$`, tex`$(-3; -4)$`, tex`$(3; 4)$`, tex`$(6; 5)$`],
      "A",
      tex`Hoành độ đỉnh $x = 6/2 = 3$. Tung độ $y(3) = 9 - 18 + 5 = -4$. Đỉnh là $(3; -4)$.`,
    ),
    mcq(
      "q3",
      tex`Trục đối xứng của $y = 2x^2 + 8x - 1$ là`,
      [tex`$x = -2$`, tex`$x = 2$`, tex`$x = -4$`, tex`$x = 4$`],
      "A",
      tex`$x = -\dfrac{b}{2a} = -\dfrac{8}{4} = -2$.`,
    ),
    mcq(
      "q4",
      tex`Giá trị nhỏ nhất của $y = x^2 - 2x + 4$ trên $\mathbb{R}$ bằng`,
      [tex`$3$`, tex`$4$`, tex`$1$`, tex`$0$`],
      "A",
      tex`$a > 0$, nhỏ nhất tại $x = 1$: $y(1) = 1 - 2 + 4 = 3$.`,
    ),
    numeric(
      "q5",
      tex`Đồ thị $y = x^2 - 5x + 6$ cắt Ox tại hai điểm. Hoành độ giao điểm bên phải bằng bao nhiêu?`,
      3,
      tex`$(x - 2)(x - 3) = 0$. Hai hoành độ là $2$ và $3$. Giao điểm bên phải có hoành độ $3$.`,
    ),
    mcq(
      "q6",
      tex`Hàm số $y = x^2 - 4x + 1$ đồng biến trên khoảng nào?`,
      [tex`$(-\infty; 2]$`, tex`$[2; +\infty)$`, tex`$(-\infty; 4]$`, tex`$\mathbb{R}$`],
      "B",
      tex`$a > 0$ và đỉnh có hoành độ $2$, nên hàm đồng biến trên $[2; +\infty)$.`,
    ),
    mcq(
      "q7",
      tex`Parabol $y = ax^2 + bx + 3$ đi qua $A(1; 2)$ và có đỉnh nằm trên Oy. Khi đó`,
      [tex`$a = -1$`, tex`$a = 1$`, tex`$a = -2$`, tex`$a = 2$`],
      "A",
      tex`Đỉnh trên Oy nên $b = 0$. Thay điểm $(1; 2)$: $a + 3 = 2$, vậy $a = -1$.`,
    ),
    mcq(
      "q8",
      tex`Giá trị lớn nhất của $y = -x^2 + 2x + 3$ bằng`,
      [tex`$4$`, tex`$3$`, tex`$2$`, tex`$1$`],
      "A",
      tex`$a < 0$, lớn nhất tại $x = 1$: $y(1) = -1 + 2 + 3 = 4$.`,
    ),
    mcq(
      "q9",
      tex`Đồ thị $y = x^2 + 2x - 3$ cắt Oy tại điểm`,
      [tex`$(0; -3)$`, tex`$(0; 3)$`, tex`$(0; -2)$`, tex`$(0; 2)$`],
      "A",
      tex`Cho $x = 0$ thì $y = -3$. Giao điểm là $(0; -3)$.`,
    ),
    numeric(
      "q10",
      tex`Với $y = x^2 - 8x + 7$, khoảng cách từ đỉnh tới trục hoành bằng bao nhiêu?`,
      9,
      tex`Hoành độ đỉnh $x = 4$. Tung độ $y(4) = 16 - 32 + 7 = -9$. Khoảng cách tới Ox là $|-9| = 9$.`,
    ),
  ],
};

export default quiz;
