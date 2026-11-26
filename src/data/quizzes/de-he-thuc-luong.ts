import { mcq, numeric } from "@/data/question";
import { tex } from "@/data/tex";
import type { Quiz } from "@/types";

const quiz: Quiz = {
  slug: "de-he-thuc-luong",
  title: "Kiểm tra: Hệ thức lượng trong tam giác",
  summary: "Tam giác vuông, diện tích, định lý sin và định lý cosin.",
  grade: "10",
  topic: "hinh-hoc",
  difficulty: "van-dung",
  durationMinutes: 25,
  lessonSlug: "he-thuc-luong-trong-tam-giac",
  featured: false,
  questions: [
    mcq(
      "q1",
      tex`Tam giác ABC vuông tại A, AB = 3, AC = 4. Độ dài BC bằng`,
      [tex`$5$`, tex`$7$`, tex`$\sqrt{7}$`, tex`$12$`],
      "A",
      tex`BC là cạnh huyền: $\sqrt{3^2 + 4^2} = 5$.`,
    ),
    mcq(
      "q2",
      tex`Cùng tam giác vuông AB = 3, AC = 4, BC = 5. Giá trị $\sin B$ bằng`,
      [tex`$\dfrac{4}{5}$`, tex`$\dfrac{3}{5}$`, tex`$\dfrac{3}{4}$`, tex`$\dfrac{5}{4}$`],
      "A",
      tex`Góc B đối diện cạnh AC = 4, cạnh huyền bằng 5, nên $\sin B = 4/5$.`,
    ),
    mcq(
      "q3",
      tex`Diện tích tam giác vuông có hai cạnh góc vuông 6 và 8 bằng`,
      [tex`$24$`, tex`$48$`, tex`$20$`, tex`$12$`],
      "A",
      tex`$S = \dfrac{1}{2} \cdot 6 \cdot 8 = 24$.`,
    ),
    mcq(
      "q4",
      tex`Tam giác đều cạnh $2$ có diện tích bằng`,
      [tex`$\sqrt{3}$`, tex`$2\sqrt{3}$`, tex`$\dfrac{\sqrt{3}}{2}$`, tex`$4$`],
      "A",
      tex`$S = \dfrac{a^2 \sqrt{3}}{4} = \dfrac{4\sqrt{3}}{4} = \sqrt{3}$.`,
    ),
    mcq(
      "q5",
      tex`Tam giác có $b = c = 2$ và góc $A = 60^\circ$. Cạnh $a$ bằng`,
      [tex`$2$`, tex`$\sqrt{3}$`, tex`$4$`, tex`$1$`],
      "A",
      tex`$a^2 = 4 + 4 - 2 \cdot 2 \cdot 2 \cdot \cos 60^\circ = 8 - 4 = 4$, nên $a = 2$.`,
    ),
    mcq(
      "q6",
      tex`Trong một tam giác, $a = 6$ và $A = 30^\circ$. Bán kính đường tròn ngoại tiếp bằng`,
      [tex`$6$`, tex`$3$`, tex`$12$`, tex`$4$`],
      "A",
      tex`$\dfrac{a}{\sin A} = 2R$. $\dfrac{6}{1/2} = 12 = 2R$, nên $R = 6$.`,
    ),
    mcq(
      "q7",
      tex`Diện tích tam giác có $b = 4$, $c = 6$ và góc xen giữa $A = 30^\circ$ bằng`,
      [tex`$6$`, tex`$12$`, tex`$3$`, tex`$24$`],
      "A",
      tex`$S = \dfrac{1}{2} \cdot 4 \cdot 6 \cdot \sin 30^\circ = 12 \cdot \dfrac{1}{2} = 6$.`,
    ),
    mcq(
      "q8",
      tex`Tam giác ABC vuông tại A, AB = 5, AC = 12. Giá trị $\cos B$ bằng`,
      [tex`$\dfrac{5}{13}$`, tex`$\dfrac{12}{13}$`, tex`$\dfrac{5}{12}$`, tex`$\dfrac{12}{5}$`],
      "A",
      tex`Cạnh huyền BC = 13. Cạnh kề với góc B là AB = 5, nên $\cos B = 5/13$.`,
    ),
    mcq(
      "q9",
      tex`Tam giác vuông có hai cạnh góc vuông 6 và 8. Đường cao kẻ tới cạnh huyền bằng`,
      [tex`$4{,}8$`, tex`$4$`, tex`$5$`, tex`$3{,}6$`],
      "A",
      tex`Cạnh huyền bằng $10$. Đường cao $h = \dfrac{6 \cdot 8}{10} = 4{,}8$.`,
    ),
    numeric(
      "q10",
      tex`Chu vi tam giác vuông có hai cạnh góc vuông 5 và 12 bằng bao nhiêu?`,
      30,
      tex`Cạnh huyền $\sqrt{25 + 144} = 13$. Chu vi $5 + 12 + 13 = 30$.`,
    ),
  ],
};

export default quiz;
