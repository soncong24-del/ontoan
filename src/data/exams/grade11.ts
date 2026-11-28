import { mcq, num, pad, quiz, reindex, tex } from "@/data/exams/make";
import type { ExamType, Question, Quiz } from "@/types";

const DH = "dao-ham-va-ung-dung";
const XS = "xac-suat-co-dien";

function gk1(k: number): Question[] {
  const first = k;
  const diff = 3;
  const n = 6;
  const term = first + (n - 1) * diff;
  const sum = (n / 2) * (2 * first + (n - 1) * diff);
  const opposite = 5 * k;
  const adjacent = 12 * k;
  const hyp = 13 * k;
  return [
    num(
      "q1",
      tex`Cấp số cộng có số hạng đầu $${first}$ và công sai $3$. Số hạng thứ $6$ bằng bao nhiêu?`,
      term,
      tex`Công thức $u_n = u_1 + (n - 1)d$.

$u_6 = ${first} + 5 \cdot 3 = ${term}$.`,
    ),
    num(
      "q2",
      tex`Tổng $6$ số hạng đầu của cấp số cộng đó bằng bao nhiêu?`,
      sum,
      tex`$S_n = \dfrac{n}{2}\bigl(2u_1 + (n - 1)d\bigr)$.

$S_6 = 3 \cdot \bigl(2 \cdot ${first} + 15\bigr) = ${sum}$.`,
    ),
    num(
      "q3",
      tex`Công sai của cấp số cộng $4; ${4 + (k + 1)}; ${4 + 2 * (k + 1)}$ bằng bao nhiêu?`,
      k + 1,
      tex`Công sai bằng hiệu hai số hạng liên tiếp: $${4 + (k + 1)} - 4 = ${k + 1}$.`,
    ),
    mcq(
      "q4",
      "Với mọi góc x, sin²x + cos²x bằng",
      "1",
      ["0", "2", "sin 2x"],
      tex`Đây là hằng đẳng thức lượng giác cơ bản: $\sin^2 x + \cos^2 x = 1$.`,
      k,
    ),
    mcq(
      "q5",
      tex`$\sin 30^\circ$ bằng`,
      tex`$\dfrac{1}{2}$`,
      [tex`$\dfrac{\sqrt{3}}{2}$`, tex`$\dfrac{\sqrt{2}}{2}$`, tex`$1$`],
      tex`Giá trị lượng giác của góc đặc biệt: $\sin 30^\circ = \dfrac{1}{2}$.`,
      k + 1,
    ),
    num(
      "q6",
      tex`Tam giác vuông có hai cạnh góc vuông $${opposite}$ và $${adjacent}$. Cạnh huyền bằng bao nhiêu?`,
      hyp,
      tex`$\sqrt{${opposite}^2 + ${adjacent}^2} = \sqrt{${opposite * opposite} + ${adjacent * adjacent}} = \sqrt{${hyp * hyp}} = ${hyp}$.

Đây là bộ $${k}$ lần của tam giác $5$-$12$-$13$.`,
    ),
    mcq(
      "q7",
      tex`$\cos 60^\circ$ bằng`,
      tex`$\dfrac{1}{2}$`,
      [tex`$\dfrac{\sqrt{3}}{2}$`, tex`$0$`, tex`$\dfrac{\sqrt{2}}{2}$`],
      tex`$\cos 60^\circ = \dfrac{1}{2}$.`,
      k + 2,
    ),
    num(
      "q8",
      tex`Số hạng đầu của cấp số cộng có công sai $${diff}$ và số hạng thứ $4$ bằng $${first + 3 * diff}$ là bao nhiêu?`,
      first,
      tex`$u_4 = u_1 + 3d$ nên $u_1 = u_4 - 3d = ${first + 3 * diff} - ${3 * diff} = ${first}$.`,
    ),
  ];
}

function hk1(k: number): Question[] {
  const first = k;
  const ratio = 2;
  const n = 4;
  const term = first * ratio ** (n - 1);
  const sum = first * (ratio ** n - 1) / (ratio - 1);
  const lead = 2 + (k % 3);
  const limit = lead;
  const hole = k + 1;
  const removable = 2 * hole;
  return [
    num(
      "q1",
      tex`Cấp số nhân có số hạng đầu $${first}$ và công bội $2$. Số hạng thứ $4$ bằng bao nhiêu?`,
      term,
      tex`$u_n = u_1 q^{n-1}$.

$u_4 = ${first} \cdot 2^3 = ${term}$.`,
    ),
    num(
      "q2",
      tex`Tổng $4$ số hạng đầu của cấp số nhân đó bằng bao nhiêu?`,
      sum,
      tex`$S_n = u_1 \dfrac{q^n - 1}{q - 1}$ với $q = 2$.

$S_4 = ${first} \cdot (16 - 1) = ${sum}$.`,
    ),
    num(
      "q3",
      tex`Giới hạn $\lim_{x \to +\infty} \dfrac{${lead}x^2 + 1}{x^2 + ${k}}$ bằng bao nhiêu?`,
      limit,
      tex`Với bậc tử và mẫu bằng nhau, giới hạn bằng tỉ số hệ số cao nhất.

$\dfrac{${lead}}{1} = ${limit}$.`,
    ),
    num(
      "q4",
      tex`$\lim_{x \to ${hole}} \dfrac{x^2 - ${hole * hole}}{x - ${hole}}$ bằng bao nhiêu?`,
      removable,
      tex`Mẫu bằng $0$ khi $x = ${hole}$, nhưng tử cũng bằng $0$.

$x^2 - ${hole * hole} = (x - ${hole})(x + ${hole})$, nên rút gọn còn $x + ${hole}$ khi $x \ne ${hole}$.

Thay $x = ${hole}$ được $${removable}.`,
    ),
    mcq(
      "q5",
      "Hàm số đa thức trên R",
      "liên tục trên R",
      ["chỉ liên tục tại 0", "gián đoạn tại mọi điểm", "không có đạo hàm nên không liên tục"],
      tex`Mọi hàm đa thức liên tục trên $\mathbb{R}$. Liên tục không đòi hỏi phải nói tới đạo hàm trước.`,
      k,
    ),
    num(
      "q6",
      tex`Công bội của cấp số nhân $${first}; ${first * 2}; ${first * 4}$ bằng bao nhiêu?`,
      2,
      tex`Công bội $= \dfrac{${first * 2}}{${first}} = 2$.`,
    ),
    mcq(
      "q7",
      tex`$\lim_{x \to 0} \dfrac{\sin x}{x}$ bằng`,
      "1",
      ["0", "không tồn tại", "sin 0"],
      tex`Đây là giới hạn lượng giác cơ bản: $\lim_{x \to 0} \dfrac{\sin x}{x} = 1$.`,
      k + 1,
    ),
    num(
      "q8",
      tex`Số hạng đầu của cấp số nhân công bội $3$, biết số hạng thứ $3$ bằng $${first * 9}$, là bao nhiêu?`,
      first,
      tex`$u_3 = u_1 \cdot 3^2 = 9u_1$.

$9u_1 = ${first * 9}$ nên $u_1 = ${first}$.`,
    ),
  ];
}

function gk2(k: number): Question[] {
  const cube = k;
  const linear = 2 + k;
  const at = k;
  const derivativeAt = 3 * cube * at * at + linear;
  const quadB = -2 * (k + 2);
  const minAt = k + 2;
  const minValue = minAt * minAt + quadB * minAt + 3;
  return [
    mcq(
      "q1",
      tex`Đạo hàm của $f(x) = ${cube}x^3 + ${linear}x$ là`,
      tex`$${3 * cube}x^2 + ${linear}$`,
      [tex`$${cube}x^2 + ${linear}$`, tex`$${3 * cube}x^2 + ${linear}x$`, tex`$${3 * cube}x + ${linear}$`],
      tex`$(x^3)' = 3x^2$ và $(x)' = 1$.

$f'(x) = ${3 * cube}x^2 + ${linear}$.`,
      k,
    ),
    num(
      "q2",
      tex`Với $f(x) = ${cube}x^3 + ${linear}x$, giá trị $f'(${at})$ bằng bao nhiêu?`,
      derivativeAt,
      tex`$f'(x) = ${3 * cube}x^2 + ${linear}$.

$f'(${at}) = ${3 * cube} \cdot ${at * at} + ${linear} = ${derivativeAt}$.`,
    ),
    num(
      "q3",
      tex`Hệ số góc tiếp tuyến của $y = x^2$ tại điểm có hoành độ $${k + 1}$ bằng bao nhiêu?`,
      2 * (k + 1),
      tex`$y' = 2x$, nên hệ số góc tại $x = ${k + 1}$ là $${2 * (k + 1)}.`,
    ),
    num(
      "q4",
      tex`Hàm $y = x^2 ${quadB}x + 3$ đạt giá trị nhỏ nhất tại hoành độ bằng bao nhiêu?`,
      minAt,
      tex`$y' = 2x ${quadB}$. Cho $y' = 0$ được $x = ${minAt}$.

Vì hệ số của $x^2$ dương, đây là điểm giá trị nhỏ nhất.`,
    ),
    num(
      "q5",
      tex`Giá trị nhỏ nhất đó bằng bao nhiêu?`,
      minValue,
      tex`Thay $x = ${minAt}$ vào hàm: $${minAt}^2 ${quadB < 0 ? "-" : "+"} ${Math.abs(quadB)} \cdot ${minAt} + 3 = ${minValue}$.`,
    ),
    mcq(
      "q6",
      tex`Đạo hàm của $\sin x$ là`,
      tex`$\cos x$`,
      [tex`$-\cos x$`, tex`$-\sin x$`, tex`$\sin x$`],
      tex`$(\sin x)' = \cos x$.`,
      k + 1,
    ),
    num(
      "q7",
      tex`$f(x) = e^x$. Giá trị $f'(0)$ bằng bao nhiêu?`,
      1,
      tex`$(e^x)' = e^x$, nên $f'(0) = e^0 = 1$.`,
    ),
    mcq(
      "q8",
      tex`Hàm $y = x^2 - ${2 * minAt}x$ đồng biến trên`,
      tex`$[${minAt}; +\infty)$`,
      [tex`$(-\infty; ${minAt}]$`, tex`$(-\infty; 0]$`, tex`$\mathbb{R}$`],
      tex`Đỉnh ở $x = ${minAt}$, $a > 0$, nên hàm đồng biến trên $[${minAt}; +\infty)$.`,
      k + 2,
    ),
  ];
}

function hk2(k: number): Question[] {
  const m = k;
  const localMax = 2 * m * m * m;
  const choose = ((k + 5) * (k + 4)) / 2;
  const red = k + 1;
  const blue = 4;
  const both = (red * (red - 1)) / 2;
  const all = ((red + blue) * (red + blue - 1)) / 2;
  return [
    num(
      "q1",
      tex`Hàm $f(x) = x^3 - ${3 * m * m}x$ đạt cực đại tại $x = -${m}$. Giá trị cực đại bằng bao nhiêu?`,
      localMax,
      tex`$f'(x) = 3x^2 - ${3 * m * m} = 3(x - ${m})(x + ${m})$.

$f'$ đổi từ dương sang âm tại $x = -${m}$, nên đó là điểm cực đại.

$f(-${m}) = -${m * m * m} + ${3 * m * m * m} = ${localMax}$.`,
    ),
    num(
      "q2",
      tex`$C_{${k + 5}}^{2}$ bằng bao nhiêu?`,
      choose,
      tex`$\dfrac{${k + 5} \cdot ${k + 4}}{2} = ${choose}$.`,
    ),
    num(
      "q3",
      tex`Túi có $${red}$ bi đỏ và $4$ bi xanh. Số cách rút đồng thời $2$ bi đỏ bằng bao nhiêu?`,
      both,
      tex`Số cách chọn $2$ bi đỏ trong $${red}$ bi là $C_{${red}}^{2} = ${both}$.`,
    ),
    num(
      "q4",
      tex`Cùng túi đó, số cách rút đồng thời $2$ bi bất kì bằng bao nhiêu?`,
      all,
      tex`Tổng số bi là $${red + blue}. $C_{${red + blue}}^{2} = ${all}$.`,
    ),
    mcq(
      "q5",
      "Hai mặt phẳng phân biệt cùng song song với một đường thẳng thì",
      "chưa đủ để kết luận hai mặt đó song song",
      [
        "hai mặt đó luôn song song",
        "hai mặt đó luôn trùng nhau",
        "hai mặt đó luôn vuông góc",
      ],
      tex`Hai mặt có thể cắt nhau và mỗi mặt vẫn chứa một đường song song với đường thẳng đã cho, hoặc cùng song song với đường đó theo những cách khác nhau.

Chỉ riêng dữ kiện này chưa buộc hai mặt song song.`,
      k,
    ),
    num(
      "q6",
      tex`Nếu $P(A) = \dfrac{1}{2}$ và $P(B) = \dfrac{1}{${2 + (k % 3)}}$ và $A, B$ độc lập thì $P(A \cap B)$, viết mẫu số của phân số tối giản khi tử là $1$, là bao nhiêu? Mẫu số cần tìm khi xác suất bằng $1$ trên mẫu đó.`,
      2 * (2 + (k % 3)),
      tex`Độc lập nên $P(A \cap B) = \dfrac{1}{2} \cdot \dfrac{1}{${2 + (k % 3)}} = \dfrac{1}{${2 * (2 + (k % 3))}}$.

Mẫu số là $${2 * (2 + (k % 3))}.`,
    ),
    mcq(
      "q7",
      tex`Hàm $f(x) = x^3 - ${3 * m * m}x$ có bao nhiêu điểm cực trị?`,
      "2",
      ["1", "3", "0"],
      tex`$f'(x) = 3(x - ${m})(x + ${m}) = 0$ có hai nghiệm phân biệt $x = \pm ${m}$, và $f'$ đổi dấu tại cả hai điểm.

Có $2$ điểm cực trị.`,
      k + 1,
    ),
    num(
      "q8",
      tex`Giá trị cực tiểu của hàm ở câu trên bằng bao nhiêu?`,
      -localMax,
      tex`Cực tiểu tại $x = ${m}$: $f(${m}) = ${m * m * m} - ${3 * m * m * m} = ${-localMax}$.`,
    ),
  ];
}

function pack(
  kind: ExamType,
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
    slug: `de-11-${kind}-${pad(index)}`,
    title,
    summary,
    grade: "11",
    topic,
    difficulty,
    durationMinutes: minutes,
    lessonSlug,
    examType: kind,
    questions,
  });
}

export function grade11Exams(): Quiz[] {
  const exams: Quiz[] = [];
  for (const index of [1, 2]) {
    exams.push(
      pack("giua-ki-1", index, gk1(index), "giai-tich", DH, 45, "co-ban", `Đề giữa kì 1 Toán 11 - Đề ${pad(index)}`, "Lượng giác góc đặc biệt và cấp số cộng, chương trình học kì 1 lớp 11."),
      pack("hoc-ki-1", index, hk1(index), "giai-tich", DH, 90, "van-dung", `Đề học kì 1 Toán 11 - Đề ${pad(index)}`, "Cấp số nhân và giới hạn hàm số."),
      pack("giua-ki-2", index, gk2(index), "giai-tich", DH, 45, "co-ban", `Đề giữa kì 2 Toán 11 - Đề ${pad(index)}`, "Đạo hàm của đa thức, tiếp tuyến và cực trị của parabol."),
      pack("hoc-ki-2", index, hk2(index), "xac-suat", XS, 90, "van-dung", `Đề học kì 2 Toán 11 - Đề ${pad(index)}`, "Cực trị hàm bậc ba, tổ hợp và một ý hình học không gian."),
    );
  }
  exams.push(
    pack("on-tap", 1, reindex([...gk1(3).slice(0, 4), ...gk2(3).slice(0, 4)]), "giai-tich", DH, 45, "co-ban", "Đề ôn tập Toán 11 - Đề 01", "Ôn cấp số cộng và đạo hàm trước bài kiểm tra."),
    pack("khao-sat", 1, reindex([...hk1(4).slice(0, 4), ...hk2(3).slice(0, 4)]), "giai-tich", DH, 60, "van-dung-cao", "Đề khảo sát Toán 11 - Đề 01", "Khảo sát giới hạn, cực trị và tổ hợp."),
  );
  return exams;
}
