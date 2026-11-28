import { quiz, tex } from "@/data/exams/make";
import type { ChoiceId, McqQuestion, NumericQuestion, Question, Quiz, TrueFalseQuestion } from "@/types";

function mcq(
  id: string,
  prompt: string,
  correct: ChoiceId,
  texts: [string, string, string, string],
  solution: string,
  imageUrl?: string,
): McqQuestion {
  const ids: ChoiceId[] = ["A", "B", "C", "D"];
  return {
    id,
    type: "mcq",
    prompt,
    solution,
    imageUrl,
    choices: ids.map((choiceId, index) => ({ id: choiceId, text: texts[index] })),
    correctChoiceId: correct,
  };
}

function num(id: string, prompt: string, correctValue: number, solution: string, imageUrl?: string): NumericQuestion {
  return { id, type: "numeric", prompt, correctValue, solution, imageUrl };
}

function tf(
  id: string,
  prompt: string,
  statements: [string, string, string, string],
  correct: [boolean, boolean, boolean, boolean],
  solution: string,
  imageUrl?: string,
): TrueFalseQuestion {
  const ids = ["a", "b", "c", "d"] as const;
  return {
    id,
    type: "true-false",
    prompt,
    solution,
    imageUrl,
    statements: ids.map((statementId, index) => ({
      id: statementId,
      text: statements[index],
      correct: correct[index],
    })),
  };
}

const questions: Question[] = [
  mcq(
    "q1",
    tex`Phần I · Câu 1. Trong không gian với hệ trục tọa độ $Oxyz$ cho tam giác $ABC$, với $A(0;2;3)$, $B(4;-2;1)$, $C(-5;1;-3)$. Tìm tọa độ điểm $D$ sao cho tứ giác $ABCD$ là hình bình hành.`,
    "C",
    [
      tex`$D(-9;-5;-1).$`,
      tex`$D(9;-5;1).$`,
      tex`$D(-9;5;-1).$`,
      tex`$D(9;5;1).$`,
    ],
    tex`Với tứ giác $ABCD$ là hình bình hành, trung điểm của $AC$ trùng trung điểm của $BD$, nên $\overrightarrow{D}=\overrightarrow{A}+\overrightarrow{C}-\overrightarrow{B}$.

$D=(0-5-4;\ 2+1-(-2);\ 3-3-1)=(-9;5;-1).$`,
  ),
  mcq(
    "q2",
    tex`Phần I · Câu 2. Bảng dưới đây ghi lại tốc độ của một số chiếc xe ô tô khi đi qua một điểm đo tốc độ. Khoảng biến thiên (đơn vị: km/h) của mẫu số liệu ghép nhóm trên là`,
    "B",
    ["12.", "10.", "6.", "8."],
    tex`Nhóm đầu là $[50;52)$, nhóm cuối là $[58;60)$. Khoảng biến thiên của mẫu ghép nhóm lấy mút phải của nhóm cuối trừ mút trái của nhóm đầu:

$R=60-50=10.$`,
    "/de-1001/bang-toc-do.svg",
  ),
  mcq(
    "q3",
    tex`Phần I · Câu 3. Cho hàm số $y=\dfrac{x-1}{x+2}$. Khẳng định nào sau đây đúng?`,
    "D",
    [
      tex`Hàm số đồng biến trên $\mathbb{R}.$`,
      tex`Hàm số đồng biến trên $\mathbb{R}\setminus\{2\}.$`,
      tex`Hàm số nghịch biến trên $\mathbb{R}\setminus\{2\}.$`,
      tex`Hàm số đồng biến trên các khoảng $(-\infty;-2)$ và $(-2;+\infty).$`,
    ],
    tex`$y=1-\dfrac{3}{x+2}$, nên $y'=\dfrac{3}{(x+2)^2}>0$ với mọi $x\neq -2$. Hàm số đồng biến trên từng khoảng $(-\infty;-2)$ và $(-2;+\infty)$.

Các phương án A, B, C đều không khớp: hàm không xác định tại $x=-2$, không phải tại $x=2$.`,
  ),
  mcq(
    "q4",
    tex`Phần I · Câu 4. Điểm cực tiểu của đồ thị hàm số $y=x^3-3x+3$ là`,
    "B",
    [tex`$A(-1;5).$`, tex`$C(1;1).$`, tex`$D(1;2).$`, tex`$B(5;-1).$`],
    tex`$y'=3x^2-3=3(x-1)(x+1)$.

$y'$ đổi từ âm sang dương tại $x=1$, nên $x=1$ là điểm cực tiểu. $y(1)=1-3+3=1$. Điểm cực tiểu là $(1;1)$.

$x=-1$ là điểm cực đại, $y(-1)=5$.`,
  ),
  mcq(
    "q5",
    tex`Phần I · Câu 5. Đường thẳng nào dưới đây là tiệm cận đứng của đồ thị hàm số $y=\dfrac{2x+1}{x+1}$?`,
    "C",
    [tex`$x=1$`, tex`$y=2$`, tex`$x=-1$`, tex`$y=-1$`],
    tex`Mẫu bằng $0$ khi $x=-1$, tử $-2+1=-1\neq 0$. Tiệm cận đứng là $x=-1$.

$y=2$ là tiệm cận ngang, không phải tiệm cận đứng.`,
  ),
  mcq(
    "q6",
    tex`Phần I · Câu 6. Bảng dưới đây biểu diễn mẫu số liệu ghép nhóm về số tiền (đơn vị: nghìn đồng) mà $65$ khách hàng mua hàng ở một siêu thị mini trong một ngày. Độ lệch chuẩn của mẫu số liệu ghép nhóm trên bằng bao nhiêu? (kết quả làm tròn đến hàng phần trăm).`,
    "D",
    [tex`$136{,}71.$`, tex`$s_x=11{,}7.$`, tex`$s_x=11{,}6.$`, tex`$s_x=11{,}69.$`],
    tex`Giá trị đại diện: $45,55,65,75,85$. Tần số $7,6,19,23,10$, cỡ mẫu $n=65$.

$\bar{x}=\dfrac{7\cdot 45+6\cdot 55+19\cdot 65+23\cdot 75+10\cdot 85}{65}=\dfrac{4455}{65}=68{,}538\ldots$

$s_x=\sqrt{\dfrac{1}{65}\sum n_i(x_i-\bar{x})^2}=\sqrt{136{,}71\ldots}\approx 11{,}692$, làm tròn đến hàng phần trăm là $11{,}69$.

$136{,}71$ là phương sai, chưa khai căn.`,
    "/de-1001/bang-tien.svg",
  ),
  mcq(
    "q7",
    tex`Phần I · Câu 7. Trong không gian với hệ trục tọa độ $Oxyz$, cho hai vectơ $\vec{a}=(4;-1;1)$ và $\vec{b}=2\vec{j}-5\vec{k}$. Tính tọa độ của vectơ $\vec{u}=\vec{a}-\vec{b}.$`,
    "A",
    [
      tex`$\vec{u}=(4;-3;6).$`,
      tex`$\vec{u}=(4;1;-4).$`,
      tex`$\vec{u}=(2;4;1).$`,
      tex`$\vec{u}=(2;-1;6).$`,
    ],
    tex`$\vec{b}=(0;2;-5)$. $\vec{u}=(4-0;\ -1-2;\ 1-(-5))=(4;-3;6).$`,
  ),
  mcq(
    "q8",
    tex`Phần I · Câu 8. Cho hàm số $y=f(x)$ liên tục trên đoạn $[-1;3]$ và có đồ thị như hình bên. Gọi $M$ và $m$ lần lượt là giá trị lớn nhất và nhỏ nhất của hàm số trên đoạn $[-1;3]$. Giá trị của $M-m$ bằng`,
    "A",
    ["2.", "1.", "5.", "3."],
    tex`Trên hình, đồ thị đi qua $(-1;1)$, đạt đỉnh $(0;2)$, chạm trục hoành tại đáy $(2;0)$ rồi lên $(3;1)$.

Giá trị lớn nhất $M=2$, giá trị nhỏ nhất $m=0$, nên $M-m=2$.

Chỗ cần đối chiếu trên ảnh: nếu đáy tại $x=2$ thực sự nằm ở $y=-2$ thì $M-m=4$, không có trong bốn phương án. Bản vẽ trên trang lấy đáy chạm trục hoành.`,
    "/de-1001/do-thi-cau-8.svg",
  ),
  mcq(
    "q9",
    tex`Phần I · Câu 9. Đường cong trong hình bên dưới là đồ thị của hàm số nào dưới đây?`,
    "D",
    [
      tex`$y=\dfrac{-x^2+x}{x-1}.$`,
      tex`$y=\dfrac{x^2-2x+2}{x+1}.$`,
      tex`$y=\dfrac{-x^2-x+1}{x+1}.$`,
      tex`$y=\dfrac{x^2-x+1}{-x+1}.$`,
    ],
    tex`Đồ thị có tiệm cận đứng bên phải trục tung và tiệm cận xiên $y=-x$ đi qua gốc, đồng thời đi qua điểm $(2;-3)$.

$y=\dfrac{x^2-x+1}{1-x}=-x-\dfrac{1}{x-1}$. Tiệm cận đứng $x=1$, tiệm cận xiên $y=-x$, và $y(2)=-3$. Đó là phương án D.

Phương án A rút gọn thành $y=-x$ ($x\neq 1$), chỉ là một đường thẳng. Phương án C có tiệm cận đứng $x=-1$, nằm bên trái trục tung.`,
    "/de-1001/do-thi-cau-9.svg",
  ),
  mcq(
    "q10",
    tex`Phần I · Câu 10. Một loại vi khuẩn được tiêm một loại thuốc kích thích sự sinh sản. Sau $t$ phút, số vi khuẩn được xác định theo công thức $N(t)=1000+30t^2-t^3$ $(0\leq t\leq 30)$. Hỏi sau bao nhiêu giây thì số vi khuẩn lớn nhất?`,
    "C",
    ["1100.", "20.", "1200.", "10."],
    tex`$N'(t)=60t-3t^2=3t(20-t)$. Trên $[0;30]$, $N$ lớn nhất tại $t=20$ (phút), vì $N(20)=5000$, $N(0)=N(30)=1000$.

Câu hỏi in chữ "giây". $20$ phút $=1200$ giây.

Nếu chữ "giây" là lỗi in và ý muốn hỏi số phút, đáp án phải là $20$. Bản chấm trên trang theo đúng chữ đã in: $1200$.`,
  ),
  mcq(
    "q11",
    tex`Phần I · Câu 11. Cho hình tứ diện $ABCD$ có trọng tâm $G$. Mệnh đề nào sau đây sai?`,
    "A",
    [
      tex`$\overrightarrow{AG}=\dfrac{2}{3}\left(\overrightarrow{AB}+\overrightarrow{AC}+\overrightarrow{AD}\right).$`,
      tex`$\overrightarrow{OG}=\dfrac{1}{4}\left(\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}+\overrightarrow{OD}\right).$`,
      tex`$\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}+\overrightarrow{GD}=\vec{0}.$`,
      tex`$\overrightarrow{AG}=\dfrac{1}{4}\left(\overrightarrow{AB}+\overrightarrow{AC}+\overrightarrow{AD}\right).$`,
    ],
    tex`Trọng tâm $G=\dfrac{A+B+C+D}{4}$, nên $\overrightarrow{AG}=\dfrac{1}{4}(\overrightarrow{AB}+\overrightarrow{AC}+\overrightarrow{AD})$.

Phương án A dùng hệ số $\dfrac{2}{3}$ của trọng tâm tam giác, nên sai. B và D đúng theo công thức trọng tâm. C đúng vì tổng bốn vectơ từ $G$ tới các đỉnh bằng $\vec{0}$.`,
  ),
  mcq(
    "q12",
    tex`Phần I · Câu 12. Trong không gian, cho hình hộp $ABCD.A'B'C'D'$. Đẳng thức vectơ nào sau đây là đúng?`,
    "C",
    [
      tex`$\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}=\overrightarrow{A'C}.$`,
      tex`$\overrightarrow{DC}+\overrightarrow{DA}+\overrightarrow{D'D}=\overrightarrow{DB'}.$`,
      tex`$\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}=\overrightarrow{AC'}.$`,
      tex`$\overrightarrow{AB}+\overrightarrow{AC}+\overrightarrow{AD}=\overrightarrow{AC'}.$`,
    ],
    tex`Chọn $A$ làm gốc. Khi đó $C'=\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$, nên $\overrightarrow{AC'}=\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$. Phương án C đúng.

$\overrightarrow{A'C}=\overrightarrow{AB}+\overrightarrow{AD}-\overrightarrow{AA'}$, nên A sai. $\overrightarrow{AC}=\overrightarrow{AB}+\overrightarrow{AD}$, nên vế trái của D bằng $2\overrightarrow{AC}$, không bằng $\overrightarrow{AC'}$.

Với ký hiệu $\overrightarrow{D'D}$ (từ $D'$ tới $D$), vế trái của B bằng $\overrightarrow{AB}-\overrightarrow{AD}-\overrightarrow{AA'}$, khác $\overrightarrow{DB'}$. Nếu đề in $\overrightarrow{DD'}$ thì B cũng đúng; cần chủ đề xem lại chữ trên ảnh.`,
  ),
  tf(
    "q13",
    tex`Phần II · Câu 1. Trong không gian $Oxyz$, cho các điểm $A(4;2;1)$, $B(1;-1;2)$ và $C(4;5;3)$.`,
    [
      tex`Tọa độ điểm $M$ sao cho $\overrightarrow{AB}+\overrightarrow{CM}=\vec{0}$ là $M(7;8;0).$`,
      tex`Điểm $N(a;b;0)$ thuộc mặt phẳng $(Oxy)$ sao cho $A,B,N$ thẳng hàng. Khi đó $a-b=2.$`,
      tex`Độ dài đoạn thẳng $AB$ bằng $\sqrt{19}.$`,
      tex`Trọng tâm của tam giác $ABC$ là $G(3;2;2).$`,
    ],
    [true, true, true, true],
    tex`$\overrightarrow{AB}=(-3;-3;1)$.

a) $\overrightarrow{CM}=-\overrightarrow{AB}=(3;3;-1)$, nên $M=(4+3;\ 5+3;\ 3-1)=(7;8;0)$. Đúng.

b) $\overrightarrow{AN}=k\overrightarrow{AB}$ và tung độ thứ ba bằng $-1$, nên $k=-1$. Suy ra $a-4=3$, $b-2=3$, tức $a=7$, $b=5$, $a-b=2$. Đúng.

c) $AB=\sqrt{9+9+1}=\sqrt{19}$. Đúng.

d) $G=\left(\dfrac{4+1+4}{3};\dfrac{2-1+5}{3};\dfrac{1+2+3}{3}\right)=(3;2;2)$. Đúng.`,
  ),
  tf(
    "q14",
    tex`Phần II · Câu 2. Một hộ kinh doanh ở làng nghề nước mắm ở Hải Giang (Cửa Lò, Nghệ An) muốn xây dựng một bồn chứa dạng hình hộp chữ nhật không nắp, có thể tích $V=64\,\mathrm{m}^3$. Đáy bồn là hình vuông. Chi phí xây dựng được tính dựa trên diện tích bề mặt vật liệu, trong đó chi phí vật liệu cho mặt đáy bồn là $k$ (nghìn đồng/m$^2$) và chi phí vật liệu cho các mặt bên là $\dfrac{k}{4}$ (nghìn đồng/m$^2$).`,
    [
      tex`Tổng diện tích bề mặt vật liệu cần dùng là $x^2+\dfrac{128}{x}$ (m$^2$).`,
      tex`Hàm số biểu diễn tổng chi phí xây dựng $C(x)$ (nghìn đồng) là $kx^2+k\dfrac{256}{x}.$`,
      tex`Nếu gọi $x$ là độ dài cạnh đáy (đơn vị: mét), thì chiều cao $h$ của bồn chứa được biểu diễn là $h=\dfrac{64}{x^2}$ (m).`,
      tex`Để tổng chi phí xây dựng là nhỏ nhất, độ dài cạnh đáy $x$ phải bằng $4$ mét.`,
    ],
    [false, false, true, false],
    tex`Đáy vuông cạnh $x$, thể tích $x^2h=64$, nên $h=\dfrac{64}{x^2}$. Ý c đúng.

Bồn không nắp: diện tích đáy $x^2$, bốn mặt bên $4xh=\dfrac{256}{x}$. Tổng diện tích là $x^2+\dfrac{256}{x}$, không phải $x^2+\dfrac{128}{x}$. Ý a sai.

Chi phí $C(x)=k\cdot x^2+\dfrac{k}{4}\cdot\dfrac{256}{x}=kx^2+\dfrac{64k}{x}$. Ý b ghi $k\dfrac{256}{x}$, sai.

$C'(x)=2kx-\dfrac{64k}{x^2}=0$ cho $x^3=32$, không phải $x=4$. Ý d sai.`,
  ),
  tf(
    "q15",
    tex`Phần II · Câu 3. Cho hàm số $y=f(x)=\dfrac{ax^2+bx+c}{dx+e}$ với $a,b,c,d,e\in\mathbb{R}$ có đồ thị như hình vẽ dưới.`,
    [
      tex`Tổng giá trị cực đại và giá trị cực tiểu của hàm số $y=f(x)$ là $0.$`,
      tex`Hàm số $y=f(x)$ đồng biến trên $(0;+\infty).$`,
      tex`Đồ thị hàm số có tiệm cận xiên là đường thẳng $y=x-1.$`,
      tex`Giá trị lớn nhất của hàm số trên $(-\infty;-1)$ là $2.$`,
    ],
    [false, true, false, false],
    tex`Đồ thị có tiệm cận đứng $x=-1$, tiệm cận xiên đi qua gốc tọa độ và cực trị bên trái tại $y=-2$. Hàm khớp hình là

$$y=x+\dfrac{1}{4(x+1)}=\dfrac{4x^2+4x+1}{4x+4}.$$

$y'=1-\dfrac{1}{4(x+1)^2}$. Cực trị tại $x=-1\pm\dfrac{1}{2}$: giá trị $-2$ và $0$, tổng bằng $-2$, không phải $0$. Ý a sai.

Trên $(0;+\infty)$, $(x+1)^2>1$ nên $y'>0$. Ý b đúng.

Tiệm cận xiên là $y=x$, không phải $y=x-1$. Ý c sai.

Trên $(-\infty;-1)$ giá trị lớn nhất là $-2$, không phải $2$. Ý d sai.

Nhánh bên phải tiệm cận bị khuất một phần trên ảnh; hình trên trang vẽ đủ cả hai nhánh.`,
    "/de-1001/do-thi-phan-ii-cau-3.svg",
  ),
  tf(
    "q16",
    tex`Phần II · Câu 4. Thống kê tổng số giờ có nắng trong tháng 6 tại một trạm quan trắc đặt ở một tỉnh trong các năm từ 2004 đến 2023 được thống kê trong bảng số liệu ghép nhóm như sau.`,
    [
      tex`Khoảng tứ phân vị của mẫu số liệu ghép nhóm là $20{,}13$ (kết quả làm tròn đến hàng phần trăm).`,
      tex`Khoảng biến thiên của mẫu số liệu ghép nhóm là $50.$`,
      tex`Số trung bình của mẫu số liệu ghép nhóm là $120{,}9$ (kết quả làm tròn đến hàng phần trăm).`,
      tex`Độ lệch chuẩn của mẫu số liệu ghép nhóm là $14{,}31$ (kết quả làm tròn đến hàng phần trăm).`,
    ],
    [false, false, false, false],
    tex`Tần số đọc trên ảnh: $2,3,4,8,3,2$, tổng $n=22$. Giá trị đại diện $95,105,115,125,135,145$.

$\bar{x}=\dfrac{2660}{22}=120{,}909\ldots$, làm tròn đến hàng phần trăm là $120{,}91$, không phải $120{,}9$.

$s_x\approx 13{,}70$, không phải $14{,}31$.

Vị trí tứ phân vị $n/4=5{,}5$ và $3n/4=16{,}5$ cho $Q_1=111{,}25$, $Q_3=129{,}375$, khoảng tứ phân vị $18{,}125$, không phải $20{,}13$.

Khoảng biến thiên theo hai mút nhóm là $150-90=60$, không phải $50$.

Cả bốn ý sai với bảng đã đọc. Ảnh hơi mờ ở ô tần số $8$: nếu ô đó là $6$ thì $n=20$ và độ lệch chuẩn đúng khoảng $14{,}31$, nhưng các ý còn lại vẫn không khớp nguyên văn. Cần chủ đề soi lại hàng "Số năm".`,
    "/de-1001/bang-nang.svg",
  ),
  num(
    "q17",
    tex`Phần III · Câu 1. Một máy bay đang bay ở độ cao $10\,\mathrm{km}$ so với mặt đất, thu phát tín hiệu qua một ăng-ten ra đa như hình vẽ. Khi máy bay cách ra đa $16\,\mathrm{km}$, ra đa phát hiện khoảng cách giữa máy bay và ra đa thay đổi với tốc độ $546\,\mathrm{km/h}$. Tìm vận tốc của máy bay (đơn vị km/h, kết quả làm tròn đến hàng đơn vị).`,
    699,
    tex`Đặt $s$ là khoảng cách máy bay tới ra đa, $x$ là khoảng cách ngang. $s^2=x^2+10^2$.

Khi $s=16$, $x=\sqrt{256-100}=\sqrt{156}$. Đạo hàm: $s\dfrac{ds}{dt}=x\dfrac{dx}{dt}$.

Tốc độ bay theo phương ngang

$$|x'|=\dfrac{16\cdot 546}{\sqrt{156}}\approx 699{,}44.$$

Làm tròn đến hàng đơn vị: $699$.`,
    "/de-1001/may-bay.svg",
  ),
  num(
    "q18",
    tex`Phần III · Câu 2. Hàm số $y=(x+1)e^x$ đạt giá trị nhỏ nhất là $-\dfrac{a}{e^b}$ với $a,b\in\mathbb{N}$. Tính $a+b.$`,
    3,
    tex`$y'=e^x+(x+1)e^x=(x+2)e^x$. $y'=0$ tại $x=-2$, và đây là điểm cực tiểu.

$y(-2)=(-1)e^{-2}=-\dfrac{1}{e^2}$, nên $a=1$, $b=2$, $a+b=3$.`,
  ),
  num(
    "q19",
    tex`Phần III · Câu 3. Trong không gian với một hệ trục tọa độ cho trước (đơn vị đo lấy theo kilômét), ra đa phát hiện một chiếc máy bay di chuyển với vận tốc và hướng không đổi từ điểm $M(500;200;8)$ đến điểm $N(800;300;10)$ trong $20$ phút. Nếu máy bay tiếp tục giữ nguyên vận tốc và hướng bay thì sau $5$ phút tiếp theo máy bay ở vị trí có tọa độ là $(x;y;z)$. Tính tổng $x+y+2z.$`,
    1221,
    tex`Vectơ vận tốc mỗi phút là $\dfrac{\overrightarrow{MN}}{20}=\left(15;5;0{,}1\right)$.

Sau thêm $5$ phút kể từ $N$:

$(x;y;z)=(800;300;10)+5(15;5;0{,}1)=(875;325;10{,}5).$

$x+y+2z=875+325+21=1221.$`,
  ),
  num(
    "q20",
    tex`Phần III · Câu 4. Trong không gian $Oxyz$, cho tam giác $ABC$ có $I$ là tâm đường tròn ngoại tiếp. Tính giá trị $OI^2$ biết $A(2;2;-2)$, $B(6;-4;2)$, $C(8;-2;0).$`,
    17,
    tex`Tâm $I$ nằm trong mặt phẳng $ABC$ và cách đều ba đỉnh. Giải hệ

$$|\overrightarrow{IA}|=|\overrightarrow{IB}|=|\overrightarrow{IC}|,\quad \overrightarrow{IA}\cdot[\overrightarrow{AB},\overrightarrow{AC}]=0$$

được $I(4;-1;0)$.

$OI^2=16+1+0=17$. Kiểm tra: $IA^2=IB^2=IC^2=17$.`,
  ),
  num(
    "q21",
    tex`Phần III · Câu 5. Trong không gian với hệ trục tọa độ $Oxyz$, một tấm bảng đồng chất có dạng hình vuông $ABCD$ tâm $O'$ được treo nghiêng bởi $4$ sợi dây $IA,IB,IC,ID$ gắn cố định tại điểm $I(0;0;9)$ như hình vẽ. Biết điểm $O'(0;0;5)$, $A(-\sqrt{2};\sqrt{2};5)$, điểm $D(a;b;c)$ với $a>0$, $c>5$ và góc $\widehat{O'ID}$ đạt giá trị lớn nhất. Gọi $\vec{F_1},\vec{F_2},\vec{F_3},\vec{F_4}$ lần lượt là lực căng của dây $IB,IC,ID,IA$, biết $|\vec{F_1}|=50\,\mathrm{N}$ và $|\vec{F_2}|=40\,\mathrm{N}$. Tính khối lượng $m$ (kg) của tấm bảng (làm tròn kết quả đến hàng đơn vị). Cho gia tốc trọng trường $g=9{,}8\,\mathrm{m/s}^2$ và trọng lượng của tấm bảng được tính bằng công thức $P=mg.$`,
    16,
    tex`Tâm $O'(0;0;5)$ và đỉnh $A(-\sqrt{2};\sqrt{2};5)$ cùng độ cao, khoảng cách tới tâm bằng $2$. Ba đỉnh còn lại của hình vuông nằm ngang là

$B(-\sqrt{2};-\sqrt{2};5)$, $C(\sqrt{2};-\sqrt{2};5)$, $D(\sqrt{2};\sqrt{2};5)$.

Bốn dây tới $I(0;0;9)$ có cùng thành phần đứng của vectơ đơn vị, bằng $\dfrac{2}{\sqrt{5}}$. Cân bằng theo phương ngang cho $T_{ID}=50\,\mathrm{N}$ và $T_{IA}=40\,\mathrm{N}$.

$$mg=\dfrac{2}{\sqrt{5}}(40+50+50+40)=\dfrac{360}{\sqrt{5}}\approx 160{,}997,\quad m\approx 16{,}43.$$

Làm tròn đến hàng đơn vị: $16$.

Câu chữ còn nói $D(a;b;c)$ với $c>5$ và góc $\widehat{O'ID}$ lớn nhất. Với hình vuông nhận $AC$ làm trục quay, góc đó lớn nhất khi tấm bảng nằm ngang, tức $c=5$, sát điều kiện $c>5$. Bản chấm dùng vị trí ngang này. Nếu chủ đề đọc được một vị trí nghiêng khác trên ảnh, có thể sửa đáp số trong trang quản trị.`,
    "/de-1001/tam-bang.svg",
  ),
  num(
    "q22",
    tex`Phần III · Câu 6. Nếu một doanh nghiệp sản xuất $x$ sản phẩm trong một tháng ($x\in\mathbb{N}^*$; $1\leq x\leq 4500$) thì doanh thu nhận được khi bán hết số sản phẩm đó là $F(x)=-0{,}01x^2+300x$ (nghìn đồng), trong khi chi phí sản xuất bình quân cho mỗi sản phẩm là $G(x)=\dfrac{30000}{x}+200$ (nghìn đồng). Giả sử số sản phẩm sản xuất ra luôn được bán hết. Trong một tháng, doanh nghiệp đó cần sản xuất ít nhất bao nhiêu sản phẩm để lợi nhuận thu được lớn hơn $100$ triệu đồng?`,
    1536,
    tex`Tổng chi phí là $xG(x)=30000+200x$ (nghìn đồng). Lợi nhuận

$$P(x)=F(x)-xG(x)=-0{,}01x^2+100x-30000.$$

$100$ triệu đồng $=100\,000$ nghìn đồng. Giải $P(x)>100000$:

$$x^2-10000x+13000000<0.$$

Hai nghiệm là $5000\pm 2000\sqrt{3}$, khoảng $1535{,}90$ và $8464{,}10$. Trong miền $1\leq x\leq 4500$, bất phương trình đúng khi $x\geq 1536$.

Kiểm tra: $P(1535)=99937{,}75<100000$ và $P(1536)=100007{,}04>100000$.`,
  ),
];

export function de1001(): Quiz {
  return quiz({
    slug: "de-12-hoc-ki-1-de-1001",
    title: "Đề thi học kì 1 Toán 12 – Đề 1001",
    summary:
      "Đề học kì 1 Toán 12, mã in trên tờ đề là ĐỀ 1001, đúng form 2025: 12 câu trắc nghiệm, 4 câu đúng/sai và 6 câu trả lời ngắn. Chưa gắn video chữa.",
    grade: "12",
    topic: "giai-tich",
    difficulty: "van-dung-cao",
    durationMinutes: 90,
    lessonSlug: "nguyen-ham-va-tich-phan",
    examType: "hoc-ki-1",
    examFormat: "thpt-2025",
    questions,
  });
}
