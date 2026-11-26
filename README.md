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

## Đưa lên Vercel và trỏ ontoan.vn

1. Đẩy repo lên GitHub. Không commit file `.env` và không đưa mật khẩu nhà đăng ký tên miền vào git.
2. Vào [vercel.com](https://vercel.com) → Add New → Project → chọn repo. Framework là Next.js. Giai đoạn này không cần biến môi trường.
3. Deploy. Vercel cho một địa chỉ dạng `ten-du-an.vercel.app`.
4. Trong project, mở Settings → Domains → thêm `ontoan.vn` và `www.ontoan.vn`.
5. Đăng nhập nhà đăng ký nơi mua tên miền. Làm đúng bản ghi DNS mà Vercel đang hiện. Thường gặp:

   | Loại | Tên | Giá trị |
   | --- | --- | --- |
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

6. Đợi DNS, từ vài phút tới vài giờ. Khi Vercel xác minh xong, HTTPS tự bật.

Mật khẩu tên miền chỉ để đăng nhập nhà đăng ký. Không dán mật khẩu vào mã nguồn, README hay issue. Nếu mật khẩu đã lộ trong một cuộc hội thoại, hãy đổi lại ở nhà đăng ký.

Chưa cần mua máy chủ riêng. Gói miễn phí của Vercel đủ cho giai đoạn bài giảng và đề tĩnh này.
