import { mcq } from "@/data/question";
import { tex } from "@/data/tex";
import type { Lesson } from "@/types";

const lesson: Lesson = {
  slug: "xac-suat-co-dien",
  title: "Xác suất cổ điển",
  summary:
    "Đếm không gian mẫu, tính xác suất biến cố, biến cố đối, quy tắc cộng và trường hợp rút không hoàn lại.",
  grade: "11",
  topic: "xac-suat",
  durationMinutes: 30,
  updatedAt: "2026-11-20",
  quizSlug: "de-xac-suat",
  objectives: [
    "Mô tả không gian mẫu khi các kết quả đồng khả năng.",
    "Tính P(A) = n(A) / n(Ω) và xác suất biến cố đối.",
    "Dùng quy tắc cộng cho hợp hai biến cố.",
    "Phân biệt rút hoàn lại và không hoàn lại khi đếm tổ hợp.",
  ],
  sections: [
    {
      id: "co-dien",
      title: "Xác suất cổ điển",
      blocks: [
        {
          type: "paragraph",
          text: tex`Khi phép thử có hữu hạn kết quả và các kết quả này cùng khả năng xảy ra, xác suất của biến cố A là`,
        },
        {
          type: "formula",
          latex: tex`P(A) = \frac{n(A)}{n(\Omega)}.`,
          caption: "n(Ω) là số kết quả có thể, n(A) là số kết quả thuận lợi cho A.",
        },
        {
          type: "callout",
          tone: "definition",
          title: "Tổ hợp",
          body: tex`Số cách chọn k phần tử không kể thứ tự từ n phần tử là $$C_n^k = \frac{n!}{k!(n-k)!}.$$ Dùng tổ hợp khi đề không phân biệt thứ tự rút.`,
        },
        {
          type: "paragraph",
          text: tex`Tung một đồng xu cân đối hai lần thì Ω có 4 kết quả: SS, SN, NS, NN. Tung một xúc xắc cân đối thì Ω có 6 kết quả. Tung hai lần, nếu tính thứ tự, Ω có 36 kết quả.`,
        },
      ],
    },
    {
      id: "quy-tac",
      title: "Biến cố đối, hợp và giao",
      blocks: [
        {
          type: "list",
          items: [
            tex`$0 \le P(A) \le 1$. $P(\Omega) = 1$, $P(\varnothing) = 0$.`,
            tex`Biến cố đối: $P(\overline{A}) = 1 - P(A)$.`,
            tex`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`,
            tex`Nếu A và B xung khắc thì $P(A \cap B) = 0$, nên xác suất hợp bằng tổng.`,
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Độc lập",
          body: tex`Hai biến cố độc lập khi $P(A \cap B) = P(A)P(B)$. Tung hai đồng xu riêng biệt là mẫu độc lập. Rút không hoàn lại thì lần sau phụ thuộc lần trước, không được nhân xác suất một cách máy móc nếu chưa điều chỉnh số bi còn lại.`,
        },
      ],
    },
    {
      id: "rut-bi",
      title: "Rút không hoàn lại",
      blocks: [
        {
          type: "paragraph",
          text: tex`Khi rút một lần nhiều viên, hoặc rút lần lượt mà không bỏ lại, hãy đếm bằng tổ hợp trên toàn bộ cách chọn. Tử là số cách chọn thỏa đề, mẫu là số cách chọn bất kỳ.`,
        },
        {
          type: "paragraph",
          text: tex`Ví dụ túi có 4 bi đỏ và 6 bi xanh, rút 2 bi. Số cách rút là $C_{10}^2 = 45$. Số cách rút 2 bi đỏ là $C_4^2 = 6$.`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Đừng cộng xác suất khi biến cố chồng nhau",
          body: tex`“Tổng hai xúc xắc là số chẵn hoặc có một mặt 6” không phải là tổng của hai xác suất, vì có kết quả vừa chẵn vừa có mặt 6. Phải trừ phần giao, hoặc đếm trực tiếp.`,
        },
      ],
    },
    {
      id: "vi-du",
      title: "Ví dụ minh họa",
      blocks: [
        {
          type: "example",
          title: "Ví dụ 1. Tổng hai xúc xắc bằng 7",
          prompt: tex`Tung một xúc xắc cân đối hai lần. Tính xác suất tổng số chấm bằng 7.`,
          solution: tex`Ω có $6 \cdot 6 = 36$ kết quả đồng khả năng.

Các kết quả thuận lợi: $(1,6)$, $(2,5)$, $(3,4)$, $(4,3)$, $(5,2)$, $(6,1)$. Có 6 kết quả.

$P = \dfrac{6}{36} = \dfrac{1}{6}$.`,
        },
        {
          type: "example",
          title: "Ví dụ 2. Rút hai bi đỏ",
          prompt: tex`Túi có 5 bi đỏ và 3 bi xanh. Rút đồng thời 2 bi. Tính xác suất được hai bi đỏ.`,
          solution: tex`$n(\Omega) = C_8^2 = \dfrac{8 \cdot 7}{2} = 28$.

$n(A) = C_5^2 = 10$.

$P(A) = \dfrac{10}{28} = \dfrac{5}{14}$.

Cách khác: $\dfrac{5}{8} \cdot \dfrac{4}{7} = \dfrac{20}{56} = \dfrac{5}{14}$. Nhân có thứ tự cho cùng kết quả vì tử và mẫu cùng được nhân với số thứ tự rút.`,
        },
      ],
    },
  ],
  quickCheck: [
    mcq(
      "qc1",
      tex`Tung một đồng xu cân đối hai lần. Xác suất được hai mặt ngửa là`,
      [tex`$\dfrac{1}{4}$`, tex`$\dfrac{1}{2}$`, tex`$\dfrac{1}{3}$`, tex`$\dfrac{3}{4}$`],
      "A",
      tex`Bốn kết quả SS, SN, NS, NN. Một kết quả thuận lợi, nên $P = 1/4$.`,
    ),
    mcq(
      "qc2",
      tex`Nếu $P(A) = 0{,}3$ thì $P(\overline{A})$ bằng`,
      [tex`$0{,}7$`, tex`$0{,}3$`, tex`$1{,}3$`, tex`$0$`],
      "A",
      tex`$P(\overline{A}) = 1 - 0{,}3 = 0{,}7$.`,
    ),
  ],
};

export default lesson;
