# Ôn Toán (ontoan.vn)

Ứng dụng học toán cho học sinh Việt Nam: bài giảng miễn phí, đề kiểm tra trắc nghiệm chấm ngay, và trang khóa học sẵn sàng cho giai đoạn bán sau.

Cách sắp xếp theo lớp, bài giảng, đề kiểm tra và huy hiệu (Giỏi / Khá / Trung bình / Chưa làm) theo thói quen của các trang luyện đề. Nội dung và giao diện là của Ôn Toán.

## Chạy trên máy

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Lệnh kiểm tra:

```bash
npm run lint
npm run typecheck
npm run build
```

## Các trang

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Trang chủ, chọn lớp, bài và đề nổi bật, khóa sắp mở |
| `/lop/9` … `/lop/12` | Một khối: bài giảng, đề, huy hiệu trên máy này |
| `/bai-giang` | Lọc bài theo lớp, chủ đề, từ khóa (gõ không dấu cũng được) |
| `/bai-giang/[slug]` | Bài học, công thức KaTeX, ví dụ mở lời giải, luyện nhanh |
| `/kiem-tra` | Lọc đề theo lớp, mức độ, thời lượng |
| `/kiem-tra/[slug]` | Làm đề có giờ hoặc không giờ, chấm thang 10, xem lời giải |
| `/kiem-tra/[slug]?lan=<id>` | Xem lại một lần đã nộp (id lưu trên máy) |
| `/tien-do` | Bài đã học và lịch sử làm đề |
| `/khoa-hoc` | Khóa sắp bán, giá VND |
| `/khoa-hoc/[slug]` | Giáo trình và form giữ chỗ |

Tiến độ, lần làm đề và danh sách giữ chỗ nằm trong `localStorage` của trình duyệt. Xóa dữ liệu trang là mất lịch sử trên máy đó.

## Thêm hoặc sửa bài

Nội dung nằm trong `src/data/`, không cần sửa giao diện.

- Bài giảng: một file trong `src/data/lessons/`, rồi thêm vào mảng trong `src/data/lessons/index.ts`.
- Đề: một file trong `src/data/quizzes/`, rồi thêm vào `src/data/quizzes/index.ts`.
- Khóa học: `src/data/courses.ts`.

Chuỗi có công thức LaTeX phải dùng thẻ `tex` (chính là `String.raw`) để JavaScript không nuốt dấu `\`:

```ts
import { tex } from "@/data/tex";

tex`Phương trình $ax^2+bx+c=0$ có $\Delta = b^2-4ac$.`;
```

- Công thức trong câu: `$...$`
- Công thức riêng một dòng: `$$...$$`
- Khối công thức lớn: `{ type: "formula", latex: tex`...` }` — phần `latex` không bọc thêm `$`

Câu trắc nghiệm dùng `mcq`, câu điền số dùng `numeric` trong `src/data/question.ts`. Đáp số chấp nhận cả `4,8` và `4.8`.

Mỗi bài giảng cần `quizSlug` trỏ tới một đề có thật, và mỗi đề cần `lessonSlug` trỏ ngược lại. Ứng dụng kiểm tra mối liên kết này lúc build. Đề nên có 8–10 câu, mỗi câu có lời giải.

Kiểu dữ liệu (`Lesson`, `Quiz`, `Question`, `QuizAttempt`, `Course`, `CourseModule`, `Enrollment`) nằm ở `src/types/index.ts`.

## Đổi kho lưu trữ và thanh toán sau này

Giao diện chỉ gọi `getLearningRepository()` trong `src/lib/storage/index.ts`. Bản hiện tại là `localStorage`. File `src/lib/storage/supabase-repository.ts` là chỗ gắn Supabase hoặc Postgres sau, cùng interface, không phải viết lại trang.

`Enrollment` và `createCheckout()` trong `src/lib/payments/index.ts` dành cho VNPay, MoMo, SePay hoặc Stripe. Hàm này đang từ chối tạo giao dịch. Form giữ chỗ trên trang khóa chỉ lưu máy người dùng.

Đề đang chấm trên trình duyệt để ra điểm ngay. Khi có đề tính điểm chính thức, nên chuyển bước chấm lên máy chủ để đáp án không đi kèm trang.

## Đưa lên GitHub và Netlify, rồi trỏ ontoan.vn

Chưa cần mua máy chủ. Gói miễn phí của Netlify đủ cho giai đoạn bài giảng và đề này. File `netlify.toml` đã khai báo lệnh build và thư mục xuất, nên Netlify không cần cấu hình thêm. Không ghim plugin Next.js: Netlify tự dùng adapter OpenNext cho Next.js 15.

### 1. Đẩy code lên GitHub

Tạo một repo trống trên GitHub, rồi trong thư mục dự án:

```bash
git remote add github https://github.com/<ten-tai-khoan>/<ten-repo>.git
git push -u github main
```

Không commit file `.env`. Không đưa mật khẩu nhà đăng ký tên miền vào git, README hay issue. Nếu mật khẩu đã lộ trong một cuộc hội thoại, hãy đổi lại ở nhà đăng ký.

### 2. Nối Netlify với GitHub

1. Vào [app.netlify.com](https://app.netlify.com) → Add new site → Import an existing project → GitHub.
2. Cho Netlify quyền đọc repo vừa tạo, rồi chọn repo đó.
3. Nhánh production: `main`. Build command `npm run build`, publish directory `.next`. Hai giá trị này đã có trong `netlify.toml`. Nếu ô trên Netlify để trống, Netlify đọc file đó. Không điền `out` hay `public`.
4. Không cần biến môi trường ở giai đoạn này. Deploy site.

Xong bước này, site có địa chỉ dạng `ten-ngau-nhien.netlify.app`. Mỗi lần đẩy lên nhánh `main`, Netlify build lại.

### 3. Gắn ontoan.vn

1. Trong site Netlify, mở Domain management → Add a domain → nhập `ontoan.vn`. Netlify sẽ gợi ý thêm `www.ontoan.vn`.
2. Đặt `ontoan.vn` làm domain chính để `www` chuyển về tên không có www.
3. Giữ DNS ở nhà đăng ký (Mat Bao, Tenten, Nhân Hòa, Inet, PA Việt Nam…). Hầu hết nhà đăng ký `.vn` không có bản ghi ALIAS, nên dùng bản ghi A cho tên gốc:

   | Loại | Tên | Giá trị |
   | --- | --- | --- |
   | A | `@` | `75.2.60.5` |
   | CNAME | `www` | `ten-site-cua-ban.netlify.app` |

   `ten-site-cua-ban.netlify.app` là địa chỉ Netlify hiện ở Site overview, không phải `apex-loadbalancer.netlify.com`.

4. Xóa các bản ghi A và AAAA cũ của `@` nếu còn. Netlify không cấp chứng chỉ khi còn bản ghi AAAA hoặc nhiều bản ghi A.
5. Nếu nhà đăng ký có ALIAS, ANAME hoặc CNAME flattened, có thể trỏ `@` tới `apex-loadbalancer.netlify.com` thay cho bản ghi A. Chỉ chọn một trong hai cách.
6. Đợi DNS, thường vài phút đến vài giờ. Trong Netlify, trạng thái domain chuyển từ chờ DNS sang đã xác minh thì HTTPS tự bật.

Đối chiếu lại đúng số và hostname mà trang Domain management của site đang hiện, vì đó là nguồn mới nhất của Netlify.
