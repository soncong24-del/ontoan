import { mcq } from "@/data/question";
import { tex } from "@/data/tex";
import type { Lesson } from "@/types";

const lesson: Lesson = {
  slug: "he-thuc-luong-trong-tam-giac",
  title: "Hệ thức lượng trong tam giác",
  summary:
    "Từ tam giác vuông sang định lý sin, định lý cosin và công thức diện tích, đủ để giải tam giác khi biết ba yếu tố thích hợp.",
  grade: "10",
  topic: "hinh-hoc",
  durationMinutes: 30,
  updatedAt: "2026-11-20",
  quizSlug: "de-he-thuc-luong",
  objectives: [
    "Dùng tỉ số lượng giác và định lý Pythagore trong tam giác vuông.",
    "Tính diện tích khi biết hai cạnh và góc xen giữa.",
    "Áp dụng định lý cosin để tìm cạnh hoặc góc.",
    "Dùng định lý sin và hệ thức a / sin A = 2R.",
  ],
  sections: [
    {
      id: "tam-giac-vuong",
      title: "Tam giác vuông",
      blocks: [
        {
          type: "paragraph",
          text: tex`Trong tam giác $ABC$ vuông tại $A$, đặt $BC = a$, $AC = b$, $AB = c$. Cạnh huyền là $a$.`,
        },
        {
          type: "formula",
          latex: tex`a^2 = b^2 + c^2.`,
        },
        {
          type: "list",
          items: [
            tex`$\sin B = \dfrac{b}{a}$, $\cos B = \dfrac{c}{a}$, $\tan B = \dfrac{b}{c}$.`,
            tex`Diện tích $S = \dfrac{1}{2}bc$.`,
            tex`Đường cao kẻ từ A tới cạnh huyền: $h = \dfrac{bc}{a}$.`,
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Bộ ba thường gặp",
          body: tex`3-4-5, 5-12-13 và 8-15-17 là các bộ số Pythagore. Nhân thêm một hệ số dương vẫn được tam giác vuông.`,
        },
      ],
    },
    {
      id: "dien-tich",
      title: "Diện tích tam giác thường",
      blocks: [
        {
          type: "formula",
          latex: tex`S = \frac{1}{2}bc\sin A = \frac{1}{2}ca\sin B = \frac{1}{2}ab\sin C.`,
          caption: "Hai cạnh kèm theo sin của góc xen giữa.",
        },
        {
          type: "paragraph",
          text: tex`Công thức này dùng được cho mọi tam giác, kể cả tam giác tù. Khi góc tù, sin vẫn dương nên diện tích vẫn dương. Đừng gán sin của góc tù bằng một số âm.`,
        },
      ],
    },
    {
      id: "sin-cosin",
      title: "Định lý sin và định lý cosin",
      blocks: [
        {
          type: "callout",
          tone: "theorem",
          title: "Định lý cosin",
          body: tex`$$a^2 = b^2 + c^2 - 2bc\cos A.$$ Khi góc A nhọn, số hạng cuối làm cạnh a ngắn hơn so với “Pythagore”. Khi góc A tù, $\cos A < 0$ nên $-2bc\cos A > 0$ và cạnh đối diện dài ra. Nếu A = 90° thì cos A = 0, thu về Pythagore.`,
        },
        {
          type: "callout",
          tone: "theorem",
          title: "Định lý sin",
          body: tex`$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R,$$ trong đó R là bán kính đường tròn ngoại tiếp.`,
        },
        {
          type: "callout",
          tone: "warning",
          title: "Trường hợp góc đối diện cạnh cho trước",
          body: tex`Biết hai cạnh và một góc không xen giữa có thể cho hai tam giác. Ở các bài trong bài giảng này, dữ kiện được chọn để chỉ còn một kết quả.`,
        },
      ],
    },
    {
      id: "vi-du",
      title: "Ví dụ minh họa",
      blocks: [
        {
          type: "example",
          title: "Ví dụ 1. Tam giác vuông 5-12-13",
          prompt: tex`Tam giác ABC vuông tại A, AB = 5, AC = 12. Tính BC và $\cos B$.`,
          solution: tex`$BC = \sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$.

Góc B kề với cạnh AB = 5 và nhìn cạnh huyền BC = 13, nên $\cos B = \dfrac{5}{13}$.

$\sin B = \dfrac{12}{13}$. Diện tích bằng $\dfrac{1}{2} \cdot 5 \cdot 12 = 30$.`,
        },
        {
          type: "example",
          title: "Ví dụ 2. Dùng định lý cosin",
          prompt: tex`Cho b = c = 2 và góc A = 60°. Tính cạnh a và diện tích.`,
          solution: tex`$a^2 = 2^2 + 2^2 - 2 \cdot 2 \cdot 2 \cdot \cos 60^\circ = 8 - 8 \cdot \dfrac{1}{2} = 4$.

Vậy $a = 2$. Tam giác đều cạnh 2.

$S = \dfrac{1}{2} \cdot 2 \cdot 2 \cdot \sin 60^\circ = 2 \cdot \dfrac{\sqrt{3}}{2} = \sqrt{3}$.`,
        },
      ],
    },
  ],
  quickCheck: [
    mcq(
      "qc1",
      tex`Tam giác vuông có hai cạnh góc vuông 3 và 4. Cạnh huyền bằng`,
      [tex`$5$`, tex`$7$`, tex`$\sqrt{7}$`, tex`$12$`],
      "A",
      tex`$a = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.`,
    ),
    mcq(
      "qc2",
      tex`Diện tích tam giác có hai cạnh 4, 6 và góc xen giữa 30° bằng`,
      [tex`$6$`, tex`$12$`, tex`$3$`, tex`$24$`],
      "A",
      tex`$S = \dfrac{1}{2} \cdot 4 \cdot 6 \cdot \sin 30^\circ = 12 \cdot \dfrac{1}{2} = 6$.`,
    ),
  ],
};

export default lesson;
