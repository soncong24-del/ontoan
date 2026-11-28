import { mcq, num, pad, quiz, reindex, term, tex } from "@/data/exams/make";
import type { Question, Quiz } from "@/types";

const HS = "ham-so-bac-hai-khao-sat-do-thi";
const HT = "he-thuc-luong-trong-tam-giac";
const XS = "xac-suat-co-dien";

function gk1(k: number): Question[] {
  const extra = 5 + k;
  const setA = [1, 2, 3, 4, extra];
  const setB = [3, 4, extra, extra + 3];
  const union = new Set([...setA, ...setB]).size;
  const inter = setA.filter((item) => setB.includes(item)).length;
  const coeff = 2 + (k % 3);
  const root = 4 + k;
  const bound = -coeff * root;
  const total = 2 * (5 + k);
  const gap = 2;
  const xValue = (total + gap) / 2;
  const yValue = (total - gap) / 2;
  const span = 4 + k;
  return [
    mcq(
      "q1",
      tex`Cho $A = \{1; 2; 3; 4; ${extra}\}$ và $B = \{3; 4; ${extra}; ${extra + 3}\}$. Số phần tử của $A \cup B$ là`,
      tex`$${union}$`,
      [tex`$${union + 1}$`, tex`$${union - 1}$`, tex`$${inter}$`],
      tex`Liệt kê hợp: các phần tử khác nhau của $A$ và $B$.

$A$ có các số $1, 2, 3, 4, ${extra}$. $B$ thêm $${extra + 3}$ nếu số đó chưa có.

Đếm được $${union}$ phần tử.`,
      k,
    ),
    num(
      "q2",
      tex`Với hai tập ở ý trên, số phần tử của $A \cap B$ bằng bao nhiêu?`,
      inter,
      tex`Phần tử chung của $A$ và $B$ là những số vừa thuộc $A$ vừa thuộc $B$.

Có đúng $${inter}$ số như vậy.`,
    ),
    num(
      "q3",
      tex`Nghiệm của phương trình $${coeff}x ${term(bound)} = 0$ bằng bao nhiêu?`,
      root,
      tex`$${coeff}x ${term(bound)} = 0$ nên $${coeff}x = ${-bound}$.

Vì $${coeff} > 0$, chia hai vế cho $${coeff}$: $x = ${root}$.`,
    ),
    mcq(
      "q4",
      tex`Tập nghiệm của bất phương trình $${coeff}x ${term(bound)} < 0$ là`,
      tex`$x < ${root}$`,
      [tex`$x > ${root}$`, tex`$x < ${-root}$`, tex`$x > ${-root}$`],
      tex`Hệ số của $x$ là $${coeff} > 0$, chia hai vế không đổi chiều bất phương trình.

$${coeff}x < ${-bound}$, nên $x < ${root}$.`,
      k + 1,
    ),
    num(
      "q5",
      tex`Có bao nhiêu số nguyên $x$ thỏa $0 \le x < ${span}$?`,
      span,
      tex`Các số nguyên từ $0$ đến $${span - 1}$ đều thỏa, số $${span}$ thì không vì dấu nhỏ hơn nghiêm ngặt.

Có $${span}$ số: $0, 1, \ldots, ${span - 1}$.`,
    ),
    mcq(
      "q6",
      `Phủ định của mệnh đề "Tồn tại số thực x sao cho x² < 0" là mệnh đề nào?`,
      "Với mọi số thực x, x² ≥ 0",
      [
        "Tồn tại số thực x sao cho x² ≥ 0",
        "Với mọi số thực x, x² < 0",
        "Tồn tại số thực x sao cho x² > 0",
      ],
      tex`Phủ định của "$\exists x, P(x)$" là "$\forall x, \lnot P(x)$".

Ở đây $P(x)$ là $x^2 < 0$, nên phủ định là: với mọi số thực $x$, $x^2 \ge 0$.`,
      k + 2,
    ),
    num(
      "q7",
      tex`Hệ $\begin{cases} x + y = ${total} \\ x - y = ${gap} \end{cases}$ có nghiệm $x$ bằng bao nhiêu?`,
      xValue,
      tex`Cộng vế theo vế: $2x = ${total + gap}$, nên $x = ${xValue}$.

Thay vào $x + y = ${total}$: $${xValue} + y = ${total}$, nên $y = ${yValue}$.

Thử lại $x - y = ${xValue - yValue} = ${gap}$.`,
    ),
    mcq(
      "q8",
      tex`Trong các mệnh đề sau, mệnh đề nào đúng?`,
      "Với mọi số thực x, x² + 1 > 0",
      [
        "Tồn tại số thực x sao cho x² + 1 ≤ 0",
        "Với mọi số thực x, x² < 0",
        "Tồn tại số nguyên x sao cho x² = -1",
      ],
      tex`$x^2 \ge 0$ với mọi số thực $x$, nên $x^2 + 1 \ge 1 > 0$.

Ba mệnh đề còn lại đều sai trên tập số thực.`,
      k + 3,
    ),
  ];
}

function hk1(k: number): Question[] {
  const r1 = 2 + k;
  const r2 = 5 + k;
  const sum = r1 + r2;
  const product = r1 * r2;
  const sumSquares = sum * sum - 2 * product;
  const a = k % 2 === 0 ? 1 : -1;
  const b = -2 * (3 + k);
  const vertex = -b / (2 * a);
  const delta = b * b - 4 * a * 1;
  const extreme = -(delta / (4 * a));
  return [
    num(
      "q1",
      tex`Phương trình $x^2 - ${sum}x + ${product} = 0$ có tổng hai nghiệm bằng bao nhiêu?`,
      sum,
      tex`Đặt $S$ là tổng hai nghiệm. Với phương trình $x^2 - Sx + P = 0$ thì $S$ chính là hệ số đứng trước $x$, đổi dấu.

Ở đây $S = ${sum}$. Có thể kiểm tra hai nghiệm $${r1}$ và $${r2}$.`,
    ),
    num(
      "q2",
      tex`Cùng phương trình trên, tích hai nghiệm bằng bao nhiêu?`,
      product,
      tex`Tích hai nghiệm bằng hệ số tự do vì hệ số của $x^2$ là $1$.

$P = ${product} = ${r1} \cdot ${r2}$.`,
    ),
    num(
      "q3",
      tex`Nếu $x_1, x_2$ là hai nghiệm của phương trình đó thì $x_1^2 + x_2^2$ bằng bao nhiêu?`,
      sumSquares,
      tex`$x_1^2 + x_2^2 = S^2 - 2P$.

$S = ${sum}$, $P = ${product}$, nên giá trị là $${sum}^2 - 2 \cdot ${product} = ${sumSquares}$.`,
    ),
    num(
      "q4",
      tex`Hoành độ đỉnh của parabol $y = ${a}x^2 ${term(b)}x + 1$ bằng bao nhiêu?`,
      vertex,
      tex`Hoành độ đỉnh là $x = -\dfrac{b}{2a}$.

$b = ${b}$, $a = ${a}$, nên $x = ${vertex}$.`,
    ),
    num(
      "q5",
      tex`Giá trị ${a > 0 ? "nhỏ nhất" : "lớn nhất"} của $y = ${a}x^2 ${term(b)}x + 1$ trên $\mathbb{R}$ bằng bao nhiêu?`,
      extreme,
      tex`Vì $a = ${a}$ ${a > 0 ? "dương, parabol có giá trị nhỏ nhất" : "âm, parabol có giá trị lớn nhất"} tại đỉnh.

Giá trị đó là $-\dfrac{\Delta}{4a}$ với $\Delta = ${delta}$, bằng $${extreme}$.`,
    ),
    mcq(
      "q6",
      tex`Parabol $y = ${a}x^2 ${term(b)}x + 1$`,
      a > 0 ? "quay bề lõm lên và có giá trị nhỏ nhất" : "quay bề lõm xuống và có giá trị lớn nhất",
      a > 0
        ? ["quay bề lõm xuống", "không có đỉnh", "luôn âm"]
        : ["quay bề lõm lên", "không có trục đối xứng", "luôn dương"],
      tex`Dấu của hệ số $a = ${a}$ quyết định bề lõm.

${a > 0 ? "a > 0 nên bề lõm quay lên, hàm có giá trị nhỏ nhất." : "a < 0 nên bề lõm quay xuống, hàm có giá trị lớn nhất."}`,
      k,
    ),
    num(
      "q7",
      tex`Nghiệm lớn hơn của $x^2 - ${sum}x + ${product} = 0$ bằng bao nhiêu?`,
      r2,
      tex`Nhẩm được $(x - ${r1})(x - ${r2}) = 0$.

Hai nghiệm là $${r1}$ và $${r2}. Nghiệm lớn hơn là $${r2}.`,
    ),
    mcq(
      "q8",
      tex`Hàm số $y = x^2 - ${2 * (k + 1)}x$ đồng biến trên khoảng nào?`,
      tex`$[${k + 1}; +\infty)$`,
      [tex`$(-\infty; ${k + 1}]$`, tex`$[${k}; +\infty)$`, tex`$\mathbb{R}$`],
      tex`Parabol $a = 1 > 0$, đỉnh có hoành độ $x = ${k + 1}$.

Hàm nghịch biến trên $(-\infty; ${k + 1}]$ và đồng biến trên $[${k + 1}; +\infty)$.`,
      k + 1,
    ),
  ];
}

function gk2(k: number): Question[] {
  const legA = 3 * k;
  const legB = 4 * k;
  const hyp = 5 * k;
  const area = (legA * legB) / 2;
  const perimeter = legA + legB + hyp;
  return [
    num(
      "q1",
      tex`Tam giác vuông có hai cạnh góc vuông $${legA}$ và $${legB}. Cạnh huyền bằng bao nhiêu?`,
      hyp,
      tex`Định lý Pythagore: cạnh huyền $= \sqrt{${legA}^2 + ${legB}^2} = \sqrt{${legA * legA + legB * legB}} = ${hyp}$.

Đây là bộ $${k}$ lần của tam giác $3$-$4$-$5$.`,
    ),
    mcq(
      "q2",
      tex`Trong tam giác vuông đó, sin của góc đối diện cạnh $${legA}$ bằng`,
      tex`$\dfrac{3}{5}$`,
      [tex`$\dfrac{4}{5}$`, tex`$\dfrac{3}{4}$`, tex`$\dfrac{5}{3}$`],
      tex`Sin bằng cạnh đối chia cạnh huyền: $\dfrac{${legA}}{${hyp}} = \dfrac{3}{5}$.`,
      k,
    ),
    num(
      "q3",
      tex`Diện tích tam giác vuông cạnh $${legA}$ và $${legB}$ bằng bao nhiêu?`,
      area,
      tex`$S = \dfrac{1}{2} \cdot ${legA} \cdot ${legB} = ${area}$.`,
    ),
    num(
      "q4",
      tex`Chu vi tam giác vuông đó bằng bao nhiêu?`,
      perimeter,
      tex`Chu vi $= ${legA} + ${legB} + ${hyp} = ${perimeter}$.`,
    ),
    mcq(
      "q5",
      tex`Cos của góc kề với cạnh $${legA}$ (và nhìn cạnh huyền) bằng`,
      tex`$\dfrac{3}{5}$`,
      [tex`$\dfrac{4}{5}$`, tex`$\dfrac{5}{4}$`, tex`$\dfrac{5}{3}$`],
      tex`Góc kề cạnh $${legA}$ có cạnh kề $${legA}$, cạnh huyền $${hyp}.

$\cos = \dfrac{${legA}}{${hyp}} = \dfrac{3}{5}$.`,
      k + 1,
    ),
    num(
      "q6",
      tex`Đường cao kẻ từ đỉnh góc vuông tới cạnh huyền của tam giác trên, nhân với $${hyp}$, bằng bao nhiêu?`,
      legA * legB,
      tex`Đường cao tới cạnh huyền là $h = \dfrac{${legA} \cdot ${legB}}{${hyp}}$.

Đề hỏi $h \cdot ${hyp}$, tức chính tích hai cạnh góc vuông $${legA * legB}.`,
    ),
    mcq(
      "q7",
      `Tam giác có ba cạnh ${legA}, ${legB}, ${hyp} là tam giác`,
      "vuông",
      ["đều", "tù và không vuông", "nhọn và không vuông"],
      tex`$${legA}^2 + ${legB}^2 = ${legA * legA} + ${legB * legB} = ${hyp * hyp} = ${hyp}^2$.

Một góc là góc vuông, nên tam giác vuông.`,
      k + 2,
    ),
    num(
      "q8",
      tex`Trong tam giác vuông cạnh góc vuông $5$ và $12$, cạnh huyền bằng bao nhiêu?`,
      13,
      tex`$\sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$.`,
    ),
  ];
}

function hk2(k: number): Question[] {
  const ux = k;
  const uy = 2;
  const vx = 3;
  const vy = k;
  const dot = ux * vx + uy * vy;
  const data = [k, k + 2, k + 4, k + 6];
  const mean = (data[0] + data[1] + data[2] + data[3]) / 4;
  const red = k + 2;
  const blue = 3;
  const totalBalls = red + blue;
  const ways = ((k + 4) * (k + 3)) / 2;
  const percentGirl = 40;
  return [
    num(
      "q1",
      tex`Cho $\vec{u} = (${ux}; ${uy})$ và $\vec{v} = (${vx}; ${vy})$. Tích vô hướng $\vec{u} \cdot \vec{v}$ bằng bao nhiêu?`,
      dot,
      tex`$\vec{u} \cdot \vec{v} = ${ux} \cdot ${vx} + ${uy} \cdot ${vy} = ${dot}$.`,
    ),
    num(
      "q2",
      tex`Tọa độ tổng $\vec{u} + \vec{v}$ có hoành độ bằng bao nhiêu?`,
      ux + vx,
      tex`Cộng từng tọa độ: hoành độ $${ux} + ${vx} = ${ux + vx}$, tung độ $${uy} + ${vy} = ${uy + vy}.`,
    ),
    num(
      "q3",
      tex`Trung bình cộng của các số $${data.join("; ")}$ bằng bao nhiêu?`,
      mean,
      tex`Tổng bốn số là $${data.reduce((s, v) => s + v, 0)}.

Trung bình cộng bằng tổng chia $4$, được $${mean}.`,
    ),
    mcq(
      "q4",
      tex`Túi có $${red}$ bi đỏ và $3$ bi xanh. Rút ngẫu nhiên một bi. Xác suất được bi đỏ là`,
      tex`$\dfrac{${red}}{${totalBalls}}$`,
      [tex`$\dfrac{${red}}{${totalBalls + 1}}$`, tex`$\dfrac{1}{${totalBalls}}$`, tex`$\dfrac{${red + 1}}{${totalBalls}}$`],
      tex`Số bi là $${totalBalls}. Số bi đỏ là $${red}.

Xác suất cổ điển bằng $\dfrac{${red}}{${totalBalls}}$.`,
      k,
    ),
    num(
      "q5",
      tex`$C_{${k + 4}}^{2}$ bằng bao nhiêu?`,
      ways,
      tex`$C_n^2 = \dfrac{n(n-1)}{2}$ với $n = ${k + 4}$.

$\dfrac{${k + 4} \cdot ${k + 3}}{2} = ${ways}$.`,
    ),
    num(
      "q6",
      `Một lớp có 10 bạn, trong đó 4 bạn nữ. Chọn ngẫu nhiên một bạn. Xác suất chọn được bạn nữ, tính theo phần trăm, bằng bao nhiêu?`,
      percentGirl,
      tex`$\dfrac{4}{10} = 0{,}4 = 40\%$.`,
    ),
    mcq(
      "q7",
      tex`Nếu $P(A) = 0{,}${k % 2 === 0 ? 2 : 3}$ thì $P(\overline{A})$, viết dưới dạng số thập phân với một chữ số sau dấu phẩy, tương ứng phương án nào?`,
      k % 2 === 0 ? "0,8" : "0,7",
      k % 2 === 0 ? ["0,2", "1,2", "0,6"] : ["0,3", "1,3", "0,5"],
      tex`$P(\overline{A}) = 1 - P(A) = ${k % 2 === 0 ? "0{,}8" : "0{,}7"}$.`,
      k + 1,
    ),
    num(
      "q8",
      tex`Độ dài vectơ $\vec{w} = (3; 4)$ bằng bao nhiêu?`,
      5,
      tex`$|\vec{w}| = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.`,
    ),
  ];
}

function pack(
  kind: "giua-ki-1" | "hoc-ki-1" | "giua-ki-2" | "hoc-ki-2" | "on-tap" | "khao-sat",
  index: number,
  questions: Question[],
  topic: Quiz["topic"],
  lessonSlug: string,
  minutes: number,
  difficulty: Quiz["difficulty"],
  title: string,
  summary: string,
): Quiz {
  return quiz({
    slug: `de-10-${kind}-${pad(index)}`,
    title,
    summary,
    grade: "10",
    topic,
    difficulty,
    durationMinutes: minutes,
    lessonSlug,
    examType: kind,
    questions,
  });
}

export function grade10Exams(): Quiz[] {
  const exams: Quiz[] = [];
  for (const index of [1, 2]) {
    exams.push(
      pack(
        "giua-ki-1",
        index,
        gk1(index),
        "dai-so",
        HS,
        45,
        "co-ban",
        `Đề giữa kì 1 Toán 10 - Đề ${pad(index)}`,
        "Mệnh đề, tập hợp và bất phương trình bậc nhất theo chương trình lớp 10, học kì 1.",
      ),
    );
    exams.push(
      pack(
        "hoc-ki-1",
        index,
        hk1(index),
        "dai-so",
        HS,
        90,
        "van-dung",
        `Đề học kì 1 Toán 10 - Đề ${pad(index)}`,
        "Phương trình bậc hai, định lý Vi-ét và hàm số bậc hai.",
      ),
    );
    exams.push(
      pack(
        "giua-ki-2",
        index,
        gk2(index),
        "hinh-hoc",
        HT,
        45,
        "co-ban",
        `Đề giữa kì 2 Toán 10 - Đề ${pad(index)}`,
        "Hệ thức lượng trong tam giác vuông.",
      ),
    );
    exams.push(
      pack(
        "hoc-ki-2",
        index,
        hk2(index),
        "xac-suat",
        XS,
        90,
        "van-dung",
        `Đề học kì 2 Toán 10 - Đề ${pad(index)}`,
        "Vectơ trong mặt phẳng, thống kê mô tả và xác suất cổ điển.",
      ),
    );
  }
  exams.push(
    pack(
      "on-tap",
      1,
      reindex([...gk1(3).slice(0, 4), ...hk1(3).slice(0, 4)]),
      "dai-so",
      HS,
      45,
      "co-ban",
      "Đề ôn tập Toán 10 - Đề 01",
      "Ôn lại tập hợp, bất phương trình và hàm số bậc hai trước các bài kiểm tra.",
    ),
  );
  exams.push(
    pack(
      "khao-sat",
      1,
      reindex([...hk1(4).slice(0, 4), ...hk2(4).slice(0, 4)]),
      "dai-so",
      HS,
      60,
      "van-dung-cao",
      "Đề khảo sát Toán 10 - Đề 01",
      "Khảo sát cuối năm: hàm số bậc hai, vectơ và xác suất.",
    ),
  );
  return exams;
}
