import { mcq, numeric } from "@/data/question";
import { tex } from "@/data/tex";
import type { Quiz } from "@/types";

const quiz: Quiz = {
  slug: "de-xac-suat",
  title: "Kiểm tra: Xác suất cổ điển",
  summary: "Đếm kết quả đồng khả năng, biến cố đối, quy tắc cộng và rút bi không hoàn lại.",
  grade: "11",
  topic: "xac-suat",
  difficulty: "co-ban",
  durationMinutes: 20,
  lessonSlug: "xac-suat-co-dien",
  featured: false,
  questions: [
    mcq(
      "q1",
      tex`Tung một đồng xu cân đối hai lần. Xác suất được hai mặt ngửa bằng`,
      [tex`$\dfrac{1}{4}$`, tex`$\dfrac{1}{2}$`, tex`$\dfrac{1}{3}$`, tex`$\dfrac{3}{4}$`],
      "A",
      tex`Có 4 kết quả SS, SN, NS, NN. Đúng một kết quả hai mặt ngửa, nên $P = 1/4$.`,
    ),
    mcq(
      "q2",
      tex`Tung một xúc xắc cân đối một lần. Xác suất ra mặt chẵn bằng`,
      [tex`$\dfrac{1}{2}$`, tex`$\dfrac{1}{6}$`, tex`$\dfrac{1}{3}$`, tex`$\dfrac{2}{3}$`],
      "A",
      tex`Ba mặt chẵn trong sáu mặt: $3/6 = 1/2$.`,
    ),
    mcq(
      "q3",
      tex`Nếu $P(A) = 0{,}3$ thì $P(\overline{A})$ bằng`,
      [tex`$0{,}7$`, tex`$0{,}3$`, tex`$1{,}3$`, tex`$0$`],
      "A",
      tex`$P(\overline{A}) = 1 - P(A) = 0{,}7$.`,
    ),
    numeric(
      "q4",
      tex`Một lớp có 20 bạn, trong đó 8 bạn nữ. Chọn ngẫu nhiên một bạn. Xác suất chọn được bạn nữ, tính theo phần trăm, bằng bao nhiêu?`,
      40,
      tex`$\dfrac{8}{20} = 0{,}4 = 40\%$.`,
    ),
    mcq(
      "q5",
      tex`$C_6^2$ bằng`,
      [tex`$15$`, tex`$30$`, tex`$12$`, tex`$36$`],
      "A",
      tex`$C_6^2 = \dfrac{6 \cdot 5}{2} = 15$.`,
    ),
    mcq(
      "q6",
      tex`Túi có 4 bi đỏ và 6 bi xanh. Rút một bi. Xác suất được bi đỏ bằng`,
      [tex`$\dfrac{2}{5}$`, tex`$\dfrac{4}{6}$`, tex`$\dfrac{1}{4}$`, tex`$\dfrac{3}{5}$`],
      "A",
      tex`$\dfrac{4}{10} = \dfrac{2}{5}$.`,
    ),
    mcq(
      "q7",
      tex`Từ túi 4 bi đỏ và 6 bi xanh, rút đồng thời 2 bi. Xác suất được hai bi đỏ bằng`,
      [tex`$\dfrac{2}{15}$`, tex`$\dfrac{4}{25}$`, tex`$\dfrac{2}{5}$`, tex`$\dfrac{6}{10}$`],
      "A",
      tex`$C_4^2 / C_{10}^2 = 6/45 = 2/15$.`,
    ),
    mcq(
      "q8",
      tex`A và B độc lập, $P(A) = 0{,}4$, $P(B) = 0{,}5$. Khi đó $P(A \cap B)$ bằng`,
      [tex`$0{,}2$`, tex`$0{,}9$`, tex`$0{,}1$`, tex`$0{,}4$`],
      "A",
      tex`Độc lập nên $P(A \cap B) = 0{,}4 \cdot 0{,}5 = 0{,}2$.`,
    ),
    mcq(
      "q9",
      tex`Cho $P(A) = 0{,}5$, $P(B) = 0{,}4$ và $P(A \cap B) = 0{,}1$. Giá trị $P(A \cup B)$ bằng`,
      [tex`$0{,}8$`, tex`$0{,}9$`, tex`$0{,}2$`, tex`$1$`],
      "A",
      tex`$P(A \cup B) = 0{,}5 + 0{,}4 - 0{,}1 = 0{,}8$.`,
    ),
    mcq(
      "q10",
      tex`Tung một xúc xắc cân đối hai lần. Xác suất tổng số chấm bằng 7 là`,
      [tex`$\dfrac{1}{6}$`, tex`$\dfrac{1}{12}$`, tex`$\dfrac{7}{36}$`, tex`$\dfrac{1}{3}$`],
      "A",
      tex`Có 36 kết quả. Sáu kết quả có tổng 7: $(1,6)$, $(2,5)$, $(3,4)$, $(4,3)$, $(5,2)$, $(6,1)$. $P = 6/36 = 1/6$.`,
    ),
  ],
};

export default quiz;
