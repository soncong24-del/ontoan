import { mcq, num, pad, quiz, term, tex, tf } from "@/data/exams/make";
import type { Question, Quiz } from "@/types";

const TP = "nguyen-ham-va-tich-phan";

function partOne(k: number): Question[] {
  const sumRoots = k + 4;
  const product = k + 1;
  const choose = ((k + 5) * (k + 4)) / 2;
  const distance = 3 * k;
  const localMax = 2 * k ** 3;
  const vertex = k + 1;
  const minValue = 1 - vertex * vertex;
  const slope = 2 * k;
  return [
    mcq(
      "p1",
      tex`Phần I · Câu 1. Đạo hàm của $f(x) = x^3 - ${3 * k * k}x$ là`,
      tex`$3x^2 - ${3 * k * k}$`,
      [tex`$x^2 - ${k * k}$`, tex`$3x^2 + ${3 * k * k}$`, tex`$3x^2 - ${k * k}x$`],
      tex`Đạo hàm từng hạng tử: $(x^3)' = 3x^2$ và $(${3 * k * k}x)' = ${3 * k * k}$.

$f'(x) = 3x^2 - ${3 * k * k}$.`,
      k,
    ),
    mcq(
      "p2",
      tex`Phần I · Câu 2. $\displaystyle\int_0^{${k}} 2x\,\mathrm{d}x$ bằng`,
      tex`$${k * k}$`,
      [tex`$${2 * k}$`, tex`$${k * k + k}$`, tex`$${2 * k * k}$`],
      tex`Nguyên hàm của $2x$ là $x^2$.

$\bigl[${k}^2\bigr] - 0 = ${k * k}$.`,
      k + 1,
    ),
    mcq(
      "p3",
      tex`Phần I · Câu 3. $\log_2 (2^{${k}})$ bằng`,
      tex`$${k}$`,
      [tex`$${k + 1}$`, tex`$${2 * k}$`, tex`$1$`],
      tex`$\log_2 (2^{${k}}) = ${k}$.`,
      k + 2,
    ),
    mcq(
      "p4",
      tex`Phần I · Câu 4. Nghiệm của $2^x = ${2 ** k}$ là`,
      tex`$${k}$`,
      [tex`$${k + 1}$`, tex`$${2 ** k}$`, tex`$2$`],
      tex`$2^x = 2^{${k}}$ nên $x = ${k}$.`,
      k + 3,
    ),
    mcq(
      "p5",
      tex`Phần I · Câu 5. Khoảng cách từ $O$ đến $M(${k}; ${2 * k}; ${2 * k})$ bằng`,
      tex`$${distance}$`,
      [tex`$${k}$`, tex`$${5 * k}$`, tex`$${k * k}$`],
      tex`$\sqrt{${k}^2 + (${2 * k})^2 + (${2 * k})^2} = \sqrt{${9 * k * k}} = ${distance}$.`,
      k,
    ),
    mcq(
      "p6",
      tex`Phần I · Câu 6. $C_{${k + 5}}^{2}$ bằng`,
      tex`$${choose}$`,
      [tex`$${choose + k}$`, tex`$${k + 5}$`, tex`$${(k + 5) * (k + 4)}$`],
      tex`$C_n^2 = \dfrac{n(n-1)}{2}$ với $n = ${k + 5}$.

$\dfrac{${k + 5} \cdot ${k + 4}}{2} = ${choose}$.`,
      k + 1,
    ),
    mcq(
      "p7",
      tex`Phần I · Câu 7. Hoành độ đỉnh của $y = x^2 - ${2 * vertex}x + 1$ là`,
      tex`$${vertex}$`,
      [tex`$${vertex + 1}$`, tex`$${2 * vertex}$`, tex`$1$`],
      tex`$x = -\dfrac{b}{2a} = \dfrac{${2 * vertex}}{2} = ${vertex}$.`,
      k + 2,
    ),
    mcq(
      "p8",
      tex`Phần I · Câu 8. Giá trị nhỏ nhất của $y = x^2 - ${2 * vertex}x + 1$ là`,
      tex`$${minValue}$`,
      [tex`$${minValue + 1}$`, tex`$${vertex}$`, tex`$1$`],
      tex`Tại $x = ${vertex}$, $y = ${vertex}^2 - ${2 * vertex} \cdot ${vertex} + 1 = ${minValue}$.

Vì $a > 0$, đây là giá trị nhỏ nhất.`,
      k + 3,
    ),
    mcq(
      "p9",
      tex`Phần I · Câu 9. Giá trị cực đại của $f(x) = x^3 - ${3 * k * k}x$ là`,
      tex`$${localMax}$`,
      [tex`$${-localMax}$`, tex`$${k}$`, tex`$0$`],
      tex`Cực đại tại $x = -${k}$.

$f(-${k}) = -${k ** 3} + ${3 * k ** 3} = ${localMax}$.`,
      k,
    ),
    mcq(
      "p10",
      tex`Phần I · Câu 10. Tổng hai nghiệm của $x^2 - ${sumRoots}x + ${product} = 0$ là`,
      tex`$${sumRoots}$`,
      [tex`$${product}$`, tex`$${-sumRoots}$`, tex`$${sumRoots + product}$`],
      tex`Theo Vi-ét, tổng hai nghiệm bằng $${sumRoots}.

Biệt thức $\Delta = ${sumRoots * sumRoots - 4 * product} > 0$ nên có hai nghiệm.`,
      k + 1,
    ),
    mcq(
      "p11",
      tex`Phần I · Câu 11. Hệ số góc tiếp tuyến của $y = x^2$ tại $x = ${k}$ là`,
      tex`$${slope}$`,
      [tex`$${k}$`, tex`$${k * k}$`, tex`$${slope + 2}$`],
      tex`$y' = 2x$, nên $y'(${k}) = ${slope}$.`,
      k + 2,
    ),
    mcq(
      "p12",
      tex`Phần I · Câu 12. $\ln(e^{${k}})$ bằng`,
      tex`$${k}$`,
      [tex`$e^{${k}}$`, tex`$1$`, tex`$${k + 1}$`],
      tex`$\ln(e^{${k}}) = ${k}$.`,
      k + 3,
    ),
  ];
}

function partTwo(k: number): Question[] {
  const vertex = k + 1;
  return [
    tf(
      "p13",
      tex`Phần II · Câu 1. Cho $f(x) = x^2 - ${2 * vertex}x + ${vertex}$. Xét tính đúng sai của các khẳng định.`,
      [
        { text: tex`$f(0) = ${vertex}$`, correct: true },
        { text: tex`Hoành độ đỉnh bằng $${vertex}$`, correct: true },
        { text: "Parabol quay bề lõm xuống", correct: false },
        { text: tex`Hàm đồng biến trên $(-\infty; ${vertex}]$`, correct: false },
      ],
      tex`$f(0) = ${vertex}$, đúng.

Đỉnh: $x = \dfrac{${2 * vertex}}{2} = ${vertex}$, đúng.

$a = 1 > 0$ nên bề lõm quay lên, ý "quay xuống" sai.

$a > 0$ nên hàm nghịch biến trên $(-\infty; ${vertex}]$ và đồng biến trên $[${vertex}; +\infty)$. Ý đồng biến bên trái đỉnh là sai.`,
    ),
    tf(
      "p14",
      tex`Phần II · Câu 2. Cho $g(x) = x^3 - ${3 * k * k}x$. Xét tính đúng sai.`,
      [
        { text: tex`$g'(x) = 3x^2 - ${3 * k * k}$`, correct: true },
        { text: tex`$g$ có đúng hai điểm cực trị`, correct: true },
        { text: tex`Giá trị cực đại bằng $${2 * k ** 3}$`, correct: true },
        { text: tex`$g$ đồng biến trên cả $\mathbb{R}$`, correct: false },
      ],
      tex`$g'(x) = 3x^2 - ${3 * k * k}$, đúng.

$g'(x) = 3(x - ${k})(x + ${k})$ có hai nghiệm đổi dấu, đúng hai cực trị.

Cực đại $g(-${k}) = ${2 * k ** 3}$, đúng.

Giữa hai điểm cực trị, $g'$ âm nên hàm không đồng biến trên cả $\mathbb{R}$.`,
    ),
    tf(
      "p15",
      tex`Phần II · Câu 3. Túi có $${k + 2}$ bi đỏ và $3$ bi xanh, rút ngẫu nhiên một bi. Xét tính đúng sai.`,
      [
        { text: tex`Số bi trong túi là $${k + 5}$`, correct: true },
        { text: tex`Xác suất rút được bi đỏ là $\dfrac{${k + 2}}{${k + 5}}$`, correct: true },
        { text: "Xác suất rút được bi xanh lớn hơn xác suất rút được bi đỏ", correct: k + 2 < 3 },
        { text: "Phép thử có vô hạn kết quả", correct: false },
      ],
      tex`Tổng bi $${k + 2} + 3 = ${k + 5}$.

Xác suất bi đỏ đúng bằng tỉ số trên.

So sánh $${k + 2}$ và $3$: ${k + 2 < 3 ? "đỏ ít hơn xanh nên ý thứ ba đúng" : "đỏ không ít hơn xanh nên ý thứ ba sai"}.

Số bi hữu hạn nên không thể có vô hạn kết quả.`,
    ),
    tf(
      "p16",
      tex`Phần II · Câu 4. Trong không gian Oxyz, cho $A(${k}; 0; 0)$ và $B(${k}; 3; 4)$. Xét tính đúng sai.`,
      [
        { text: "$AB = 5$", correct: true },
        { text: tex`$A$ và $B$ có cùng hoành độ $${k}$`, correct: true },
        { text: "$AB$ song song với trục $Ox$", correct: false },
        { text: "Trung điểm của $AB$ có tung độ $1{,}5$", correct: true },
      ],
      tex`Hiệu tọa độ $(0; 3; 4)$, độ dài $\sqrt{25} = 5$.

Cả hai điểm có hoành độ $${k}.

$AB$ đổi tung độ và cao độ nên không song song $Ox$.

Tung độ trung điểm $\dfrac{0 + 3}{2} = 1{,}5$.`,
    ),
  ];
}

function partThree(k: number): Question[] {
  const upper = k;
  return [
    num(
      "p17",
      tex`Phần III · Câu 1. Tính $\displaystyle\int_0^{${upper}} 2x\,\mathrm{d}x$.`,
      upper * upper,
      tex`$\bigl[x^2\bigr]_0^{${upper}} = ${upper * upper}$.`,
    ),
    num(
      "p18",
      tex`Phần III · Câu 2. Giá trị cực đại của $f(x) = x^3 - ${3 * k * k}x$.`,
      2 * k ** 3,
      tex`Cực đại tại $x = -${k}$, giá trị $${2 * k ** 3}.`,
    ),
    num(
      "p19",
      tex`Phần III · Câu 3. Tính $C_{${k + 6}}^{2}$.`,
      ((k + 6) * (k + 5)) / 2,
      tex`$\dfrac{${k + 6} \cdot ${k + 5}}{2} = ${((k + 6) * (k + 5)) / 2}$.`,
    ),
    num(
      "p20",
      tex`Phần III · Câu 4. Khoảng cách từ $O$ đến $(${k}; ${2 * k}; ${2 * k})$.`,
      3 * k,
      tex`$\sqrt{${9 * k * k}} = ${3 * k}$.`,
    ),
    num(
      "p21",
      tex`Phần III · Câu 5. Tổng hai nghiệm của $x^2 ${term(-(k + 4))}x + ${k + 1} = 0$.`,
      k + 4,
      tex`Phương trình $x^2 - ${k + 4}x + ${k + 1} = 0$.

Tổng hai nghiệm bằng $${k + 4}. $\Delta = ${(k + 4) ** 2 - 4 * (k + 1)} > 0$.`,
    ),
    num(
      "p22",
      tex`Phần III · Câu 6. Trung bình cộng của $${k}; ${k + 2}; ${k + 4}$.`,
      k + 2,
      tex`Tổng $${3 * k + 6}, chia $3$ được $${k + 2}.`,
    ),
  ];
}

export function thptExams(): Quiz[] {
  return Array.from({ length: 10 }, (_, offset) => {
    const index = offset + 1;
    const questions: Question[] = [...partOne(index), ...partTwo(index), ...partThree(index)];
    return quiz({
      slug: `de-12-thi-thu-thpt-${pad(index)}`,
      title: `Đề thi thử THPT Toán 2025 - Đề ${pad(index)}`,
      summary:
        "Đúng cấu trúc đề tốt nghiệp từ 2025: 12 câu trắc nghiệm (mỗi câu 0,25 điểm), 4 câu đúng/sai (0,1 / 0,25 / 0,5 / 1 điểm), 6 câu trả lời ngắn (mỗi câu 0,5 điểm).",
      grade: "12",
      topic: "giai-tich",
      difficulty: "van-dung-cao",
      durationMinutes: 90,
      lessonSlug: TP,
      examType: "thi-thu-thpt",
      examFormat: "thpt-2025",
      questions,
      videoUrl: index === 1 ? "https://www.youtube.com/watch?v=WUvTyaaNkzM" : undefined,
    });
  });
}
