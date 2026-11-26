import { mcq } from "@/data/question";
import { tex } from "@/data/tex";
import type { Lesson } from "@/types";

const lesson: Lesson = {
  slug: "ham-so-bac-hai-khao-sat-do-thi",
  title: "Hàm số bậc hai và khảo sát đồ thị",
  summary:
    "Đọc parabol từ hệ số a, tìm đỉnh, trục đối xứng, bảng biến thiên và giao điểm với các trục tọa độ.",
  grade: "10",
  topic: "dai-so",
  durationMinutes: 30,
  featured: true,
  updatedAt: "2026-11-20",
  quizSlug: "de-ham-so-bac-hai",
  objectives: [
    "Xác định bề lõm của parabol theo dấu của a.",
    "Tìm tọa độ đỉnh và phương trình trục đối xứng.",
    "Lập bảng biến thiên, nêu giá trị lớn nhất hoặc nhỏ nhất.",
    "Tìm giao điểm của đồ thị với Ox và Oy.",
  ],
  sections: [
    {
      id: "parabol",
      title: "Parabol và bề lõm",
      blocks: [
        {
          type: "paragraph",
          text: tex`Hàm số bậc hai có dạng $y = ax^2 + bx + c$ với $a \neq 0$. Đồ thị là một parabol.`,
        },
        {
          type: "list",
          items: [
            tex`Nếu $a > 0$, parabol quay bề lõm lên trên và có giá trị nhỏ nhất.`,
            tex`Nếu $a < 0$, parabol quay bề lõm xuống dưới và có giá trị lớn nhất.`,
            tex`Hệ số c là tung độ giao điểm với trục tung: điểm $(0; c)$.`,
          ],
        },
        {
          type: "callout",
          tone: "definition",
          title: "Đỉnh và trục đối xứng",
          body: tex`Đỉnh $I\left(-\dfrac{b}{2a};\, -\dfrac{\Delta}{4a}\right)$ với $\Delta = b^2 - 4ac$. Trục đối xứng là đường thẳng $x = -\dfrac{b}{2a}$.`,
        },
      ],
    },
    {
      id: "bien-thien",
      title: "Bảng biến thiên",
      blocks: [
        {
          type: "paragraph",
          text: tex`Với $a > 0$, hàm nghịch biến trên $\left(-\infty; -\dfrac{b}{2a}\right]$ và đồng biến trên $\left[-\dfrac{b}{2a}; +\infty\right)$. Giá trị nhỏ nhất là tung độ đỉnh. Hàm không có giá trị lớn nhất trên $\mathbb{R}$.`,
        },
        {
          type: "paragraph",
          text: tex`Với $a < 0$ thì ngược lại: đồng biến rồi nghịch biến, và tung độ đỉnh là giá trị lớn nhất.`,
        },
        {
          type: "table",
          caption: "Mẫu bảng biến thiên khi a > 0.",
          headers: [tex`$x$`, tex`$-\infty$`, tex`$-\dfrac{b}{2a}$`, tex`$+\infty$`],
          rows: [
            [tex`$y$`, tex`$+\infty$`, tex`$-\dfrac{\Delta}{4a}$`, tex`$+\infty$`],
            ["Chiều biến thiên", "Nghịch biến", "Đỉnh", "Đồng biến"],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Khoảng đồng biến lấy cả đầu mút",
          body: tex`Trên một khoảng đóng có chứa đỉnh, hàm vẫn được xem là đồng biến hoặc nghịch biến theo đúng chiều. Đừng viết khoảng mở rồi bỏ mất đỉnh khi hỏi giá trị lớn nhất.`,
        },
      ],
    },
    {
      id: "giao-diem",
      title: "Giao với trục tọa độ",
      blocks: [
        {
          type: "paragraph",
          text: tex`Giao với Oy: cho $x = 0$, được điểm $(0; c)$.`,
        },
        {
          type: "paragraph",
          text: tex`Giao với Ox: giải $ax^2 + bx + c = 0$. Số giao điểm đúng bằng số nghiệm của phương trình này.`,
        },
        {
          type: "list",
          items: [
            tex`$\Delta > 0$: cắt Ox tại hai điểm phân biệt.`,
            tex`$\Delta = 0$: tiếp xúc Ox tại đỉnh.`,
            tex`$\Delta < 0$: không cắt Ox.`,
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
          title: "Ví dụ 1. Khảo sát nhanh",
          prompt: tex`Cho $y = x^2 - 4x + 3$. Tìm đỉnh, trục đối xứng và giao điểm với Ox.`,
          solution: tex`$a = 1 > 0$, parabol quay lên.

Hoành độ đỉnh: $x = 4/2 = 2$. Tung độ: $y(2) = 4 - 8 + 3 = -1$. Đỉnh $I(2; -1)$.

Trục đối xứng: $x = 2$.

$x^2 - 4x + 3 = 0 \Leftrightarrow (x - 1)(x - 3) = 0$. Đồ thị cắt Ox tại $(1; 0)$ và $(3; 0)$, cắt Oy tại $(0; 3)$.

Giá trị nhỏ nhất trên $\mathbb{R}$ là $-1$, đạt tại $x = 2$.`,
        },
        {
          type: "example",
          title: "Ví dụ 2. Đỉnh nằm trên Oy",
          prompt: tex`Parabol $y = ax^2 + bx + 3$ đi qua $A(1; 2)$ và có đỉnh nằm trên Oy. Tìm a.`,
          solution: tex`Đỉnh nằm trên Oy nên hoành độ đỉnh bằng $0$: $-\dfrac{b}{2a} = 0$. Vì $a \neq 0$ nên $b = 0$.

Đi qua $A(1; 2)$: $a + b + 3 = 2$. Thay $b = 0$ được $a + 3 = 2$, vậy $a = -1$.

Hàm số là $y = -x^2 + 3$. Đỉnh $(0; 3)$ đúng nằm trên Oy.`,
        },
      ],
    },
  ],
  quickCheck: [
    mcq(
      "qc1",
      tex`Parabol $y = -2x^2 + 4x + 1$ có bề lõm`,
      [tex`Quay lên`, tex`Quay xuống`, tex`Trùng trục hoành`, tex`Song song Oy`],
      "B",
      tex`$a = -2 < 0$, nên parabol quay bề lõm xuống dưới.`,
    ),
    mcq(
      "qc2",
      tex`Trục đối xứng của $y = 2x^2 + 8x - 1$ là`,
      [tex`$x = -2$`, tex`$x = 2$`, tex`$x = -4$`, tex`$x = 4$`],
      "A",
      tex`$x = -\dfrac{b}{2a} = -\dfrac{8}{4} = -2$.`,
    ),
  ],
};

export default lesson;
