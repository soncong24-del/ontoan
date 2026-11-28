import { mcq, num, pad, quiz, tex } from "@/data/exams/make";
import type { ExamType, Question, Quiz } from "@/types";

const TP = "nguyen-ham-va-tich-phan";
const XS = "xac-suat-co-dien";

function gk1(k: number): Question[] {
  const m = k;
  const localMax = 2 * m ** 3;
  const localMin = -localMax;
  return [
    mcq(
      "q1",
      tex`Đạo hàm của $f(x) = x^3 - ${3 * m * m}x$ là`,
      tex`$3x^2 - ${3 * m * m}$`,
      [tex`$3x^2 - ${3 * m * m}x$`, tex`$x^2 - ${m * m}$`, tex`$3x^2 + ${3 * m * m}$`],
      tex`$(x^3)' = 3x^2$ và $(${3 * m * m}x)' = ${3 * m * m}$.

$f'(x) = 3x^2 - ${3 * m * m}$.`,
      k,
    ),
    num(
      "q2",
      tex`Hàm $f(x) = x^3 - ${3 * m * m}x$ có bao nhiêu điểm cực trị?`,
      2,
      tex`$f'(x) = 3(x^2 - ${m * m}) = 3(x - ${m})(x + ${m})$.

Hai nghiệm phân biệt và $f'$ đổi dấu tại mỗi nghiệm, nên có $2$ điểm cực trị.`,
    ),
    num(
      "q3",
      tex`Giá trị cực đại của hàm đó bằng bao nhiêu?`,
      localMax,
      tex`$f'$ dương trên $(-\infty; -${m})$, âm trên $(-${m}; ${m})$.

Cực đại tại $x = -${m}$: $f(-${m}) = -${m ** 3} + ${3 * m ** 3} = ${localMax}$.`,
    ),
    num(
      "q4",
      tex`Giá trị cực tiểu của hàm đó bằng bao nhiêu?`,
      localMin,
      tex`Cực tiểu tại $x = ${m}$: $f(${m}) = ${m ** 3} - ${3 * m ** 3} = ${localMin}$.`,
    ),
    mcq(
      "q5",
      tex`Hàm $f(x) = x^3 - ${3 * m * m}x$ đồng biến trên khoảng nào?`,
      tex`$(-\infty; -${m}]$ và $[${m}; +\infty)$`,
      [
        tex`$(-${m}; ${m})$`,
        tex`chỉ trên $[${m}; +\infty)$`,
        tex`trên cả $\mathbb{R}$`,
      ],
      tex`$f'(x) \ge 0$ khi $x \le -${m}$ hoặc $x \ge ${m}$.

Đó là hai khoảng đồng biến.`,
      k + 1,
    ),
    num(
      "q6",
      tex`$f(0)$ với hàm trên bằng bao nhiêu?`,
      0,
      tex`$f(0) = 0 - 0 = 0$. Đồ thị đi qua gốc tọa độ.`,
    ),
    num(
      "q7",
      tex`Hệ số góc tiếp tuyến của đồ thị hàm trên tại $x = 0$ bằng bao nhiêu?`,
      -3 * m * m,
      tex`$f'(x) = 3x^2 - ${3 * m * m}$, nên $f'(0) = ${-3 * m * m}$.`,
    ),
    num(
      "q8",
      tex`Với $g(x) = x^2 - ${2 * m}x$, hệ số góc tiếp tuyến tại $x = ${m + 1}$ bằng bao nhiêu?`,
      2 * (m + 1) - 2 * m,
      tex`$g'(x) = 2x - ${2 * m}$.

$g'(${m + 1}) = ${2 * (m + 1)} - ${2 * m} = ${2}.`,
    ),
  ];
}

function hk1(k: number): Question[] {
  const upper = k + 1;
  const integral = upper * upper;
  const area = ((k + 2) * (k + 2)) / 2;
  const logAnswer = k;
  const constant = k + 4;
  return [
    num(
      "q1",
      tex`$\log_2 (2^{${logAnswer}})$ bằng bao nhiêu?`,
      logAnswer,
      tex`$\log_2 (2^{${logAnswer}}) = ${logAnswer}$ vì $\log_a (a^t) = t$ với $a = 2 > 0$, $a \ne 1$.`,
    ),
    num(
      "q2",
      tex`Nghiệm của phương trình $2^x = ${2 ** k}$ bằng bao nhiêu?`,
      k,
      tex`$2^x = 2^{${k}}$ nên $x = ${k}$.`,
    ),
    num(
      "q3",
      tex`$\displaystyle\int_0^{${upper}} 2x\,\mathrm{d}x$ bằng bao nhiêu?`,
      integral,
      tex`Nguyên hàm của $2x$ là $x^2$.

$\bigl[${upper}^2\bigr] - 0 = ${integral}$.`,
    ),
    num(
      "q4",
      tex`$\displaystyle\int_0^{${k}} ${2}\,\mathrm{d}x$ bằng bao nhiêu?`,
      2 * k,
      tex`Nguyên hàm của hằng số $2$ là $2x$.

$2 \cdot ${k} - 0 = ${2 * k}$.`,
    ),
    num(
      "q5",
      tex`Nếu $F'(x) = 2x$ và $F(0) = ${constant}$ thì $F(1)$ bằng bao nhiêu?`,
      1 + constant,
      tex`$F(x) = x^2 + C$. Điều kiện $F(0) = C = ${constant}$.

$F(1) = 1 + ${constant} = ${1 + constant}$.`,
    ),
    num(
      "q6",
      tex`$\ln (e^{${k}})$ bằng bao nhiêu?`,
      k,
      tex`$\ln (e^{${k}}) = ${k}$.`,
    ),
    num(
      "q7",
      tex`Diện tích hình phẳng giới hạn bởi $y = x$, trục hoành, $x = 0$ và $x = ${k + 2}$, nhân thêm $2$, bằng bao nhiêu?`,
      (k + 2) * (k + 2),
      tex`Diện tích là $\displaystyle\int_0^{${k + 2}} x\,\mathrm{d}x = \dfrac{${k + 2}^2}{2} = ${area}$.

Nhân thêm $2$ được $${(k + 2) * (k + 2)}.`,
    ),
    mcq(
      "q8",
      tex`Đạo hàm của $\ln x$ trên $(0; +\infty)$ là`,
      tex`$\dfrac{1}{x}$`,
      [tex`$\dfrac{1}{x^2}$`, tex`$\ln x$`, tex`$e^x$`],
      tex`$(\ln x)' = \dfrac{1}{x}$ với $x > 0$.`,
      k,
    ),
  ];
}

function gk2(k: number): Question[] {
  const distance = 3 * k;
  const plane = 9 * k;
  return [
    num(
      "q1",
      tex`Khoảng cách từ $O(0; 0; 0)$ đến $A(${k}; ${2 * k}; ${2 * k})$ bằng bao nhiêu?`,
      distance,
      tex`$OA = \sqrt{${k}^2 + ${2 * k}^2 + ${2 * k}^2} = \sqrt{${k * k + 4 * k * k + 4 * k * k}} = \sqrt{${9 * k * k}} = ${distance}$.`,
    ),
    num(
      "q2",
      tex`Hai lần hoành độ trung điểm của đoạn $OA$ bằng bao nhiêu?`,
      k,
      tex`Trung điểm có hoành độ $\dfrac{0 + ${k}}{2} = \dfrac{${k}}{2}$.

Hai lần hoành độ đó bằng $${k}.`,
    ),
    num(
      "q3",
      tex`Tổng ba tọa độ của điểm $A(${k}; ${2 * k}; ${2 * k})$ bằng bao nhiêu?`,
      5 * k,
      tex`$${k} + ${2 * k} + ${2 * k} = ${5 * k}$.`,
    ),
    num(
      "q4",
      tex`Mặt phẳng $x + 2y + 2z = 0$ nhận giá trị vế trái tại $A$ bằng bao nhiêu?`,
      plane,
      tex`Thay $A$: $${k} + 2 \cdot ${2 * k} + 2 \cdot ${2 * k} = ${plane}$.

Nếu giá trị này khác $0$ thì $A$ không nằm trên mặt phẳng.`,
    ),
    mcq(
      "q5",
      tex`Vectơ $\vec{u} = (1; 2; 2)$ và $\vec{v} = (${k}; ${2 * k}; ${2 * k})$`,
      "cùng phương",
      ["vuông góc", "không cùng phương và không vuông góc", "bằng vectơ không"],
      tex`$\vec{v} = ${k} \cdot (1; 2; 2) = ${k}\vec{u}$ với $${k} \ne 0$.

Hai vectơ cùng phương.`,
      k,
    ),
    num(
      "q6",
      tex`Tích vô hướng $\vec{u} \cdot \vec{v}$ với hai vectơ trên bằng bao nhiêu?`,
      k + 4 * k + 4 * k,
      tex`$(1; 2; 2) \cdot (${k}; ${2 * k}; ${2 * k}) = ${k} + ${4 * k} + ${4 * k} = ${9 * k}$.`,
    ),
    num(
      "q7",
      tex`Khoảng cách từ $B(${k}; 0; 0)$ đến $C(${k}; 3; 4)$ bằng bao nhiêu?`,
      5,
      tex`Hiệu tọa độ là $(0; 3; 4)$.

$\sqrt{0 + 9 + 16} = \sqrt{25} = 5$.`,
    ),
    mcq(
      "q8",
      "Trong không gian Oxyz, vectơ pháp tuyến của mặt phẳng x + 2y + 2z = 0 có thể là",
      "(1; 2; 2)",
      ["(1; 0; 0)", "(0; 1; 0)", "(2; 1; 0)"],
      tex`Mặt phẳng $ax + by + cz + d = 0$ nhận $\vec{n} = (a; b; c)$ làm một vectơ pháp tuyến.

Ở đây $\vec{n} = (1; 2; 2)$.`,
      k + 1,
    ),
  ];
}

function hk2(k: number): Question[] {
  const like = 10;
  const girlLike = 1 + (k % 5);
  const integral = (k + 1) * (k + 1);
  const complement = 100 - 30;
  return [
    num(
      "q1",
      tex`Một nhóm có $${like}$ bạn thích môn Toán, trong đó $${girlLike}$ bạn nữ. Chọn ngẫu nhiên một bạn trong nhóm thích Toán. Xác suất được bạn nữ, tính theo phần trăm làm tròn đến số nguyên gần nhất nếu cần, bằng bao nhiêu khi phân số đã cho ra số nguyên?`,
      girlLike * 10,
      tex`Xác suất có điều kiện $P(\text{nữ} \mid \text{thích Toán}) = \dfrac{${girlLike}}{${like}}$.

Theo phần trăm: $\dfrac{${girlLike}}{${like}} \cdot 100 = ${(girlLike * 100) / like}$.`,
    ),
    num(
      "q2",
      `Nếu xác suất một bạn làm đúng câu này là 30% thì xác suất làm sai, tính theo phần trăm, bằng bao nhiêu?`,
      complement,
      tex`Biến cố đối: $100\% - 30\% = 70\%$.`,
    ),
    num(
      "q3",
      tex`$\displaystyle\int_0^{${k + 1}} 2x\,\mathrm{d}x$ bằng bao nhiêu?`,
      integral,
      tex`$\bigl[x^2\bigr]_0^{${k + 1}} = ${k + 1}^2 = ${integral}$.`,
    ),
    num(
      "q4",
      tex`Biến ngẫu nhiên nhận giá trị $0$ và $${k + 2}$ với xác suất bằng nhau. Hai lần kì vọng bằng bao nhiêu?`,
      k + 2,
      tex`$E(X) = \dfrac{1}{2} \cdot 0 + \dfrac{1}{2} \cdot ${k + 2} = \dfrac{${k + 2}}{2}$.

Hai lần kì vọng bằng $${k + 2}.`,
    ),
    mcq(
      "q5",
      tex`Nếu $P(A) = 0{,}4$, $P(B) = 0{,}5$ và $P(A \cap B) = 0{,}2$ thì $P(A \cup B)$ bằng`,
      "0,7",
      ["0,9", "0,2", "1"],
      tex`$P(A \cup B) = 0{,}4 + 0{,}5 - 0{,}2 = 0{,}7$.`,
      k,
    ),
    num(
      "q6",
      tex`Diện tích hình chữ nhật giới hạn bởi $y = ${k}$, trục hoành và hai đường $x = 0$, $x = 2$ bằng bao nhiêu?`,
      2 * k,
      tex`Hình là hình chữ nhật rộng $2$, cao $${k}.

Diện tích $= 2 \cdot ${k} = ${2 * k}$. Cũng là $\displaystyle\int_0^2 ${k}\,\mathrm{d}x$.`,
    ),
    num(
      "q7",
      tex`Một hộp có $${k + 5}$ bi, trong đó $${k + 1}$ bi đỏ. Rút một bi. Số bi không đỏ bằng bao nhiêu?`,
      4,
      tex`Số bi không đỏ $= ${k + 5} - ${k + 1} = 4$.`,
    ),
    mcq(
      "q8",
      "Nếu A và B độc lập, P(A) = 0,2 và P(B) = 0,5 thì P(A và B) bằng",
      "0,1",
      ["0,7", "0,3", "0,2"],
      tex`Độc lập nên $P(A \cap B) = 0{,}2 \cdot 0{,}5 = 0{,}1$.`,
      k + 1,
    ),
  ];
}

function series(type: ExamType, count: number, builder: (k: number) => Question[], meta: {
  topic: Quiz["topic"];
  lesson: string;
  minutes: number;
  difficulty: Quiz["difficulty"];
  name: string;
  summary: string;
}): Quiz[] {
  return Array.from({ length: count }, (_, offset) => {
    const index = offset + 1;
    return quiz({
      slug: `de-12-${type}-${pad(index)}`,
      title: `${meta.name} - Đề ${pad(index)}`,
      summary: meta.summary,
      grade: "12",
      topic: meta.topic,
      difficulty: meta.difficulty,
      durationMinutes: meta.minutes,
      lessonSlug: meta.lesson,
      examType: type,
      questions: builder(index),
      videoUrl: type === "giua-ki-1" && index === 1 ? "https://www.youtube.com/watch?v=WUvTyaaNkzM" : undefined,
    });
  }).map((item) => {
    if (item.slug === "de-12-giua-ki-1-01") {
      return {
        ...item,
        questions: item.questions.map((question, questionIndex) =>
          questionIndex === 0
            ? { ...question, videoUrl: "https://youtu.be/fNk_zzaMoSs" }
            : question,
        ),
      };
    }
    return item;
  });
}

export function grade12SemesterExams(): Quiz[] {
  return [
    ...series("giua-ki-1", 10, gk1, {
      topic: "giai-tich",
      lesson: TP,
      minutes: 45,
      difficulty: "co-ban",
      name: "Đề giữa kì 1 Toán 12",
      summary: "Khảo sát hàm bậc ba: đạo hàm, cực trị và tiếp tuyến. Dùng như đề giữa kì hoặc khảo sát giữa học kì 1.",
    }),
    ...series("hoc-ki-1", 10, hk1, {
      topic: "giai-tich",
      lesson: TP,
      minutes: 90,
      difficulty: "van-dung",
      name: "Đề học kì 1 Toán 12",
      summary: "Mũ, logarit, nguyên hàm và tích phân xác định theo chương trình học kì 1.",
    }),
    ...series("giua-ki-2", 10, gk2, {
      topic: "hinh-hoc",
      lesson: TP,
      minutes: 45,
      difficulty: "co-ban",
      name: "Đề giữa kì 2 Toán 12",
      summary: "Tọa độ trong không gian Oxyz: khoảng cách, vectơ và mặt phẳng.",
    }),
    ...series("hoc-ki-2", 10, hk2, {
      topic: "xac-suat",
      lesson: XS,
      minutes: 90,
      difficulty: "van-dung",
      name: "Đề học kì 2 Toán 12",
      summary: "Xác suất có điều kiện, kì vọng đơn giản và ứng dụng tích phân.",
    }),
  ];
}
