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

## Tài khoản học sinh

Học sinh đăng ký tại `/dang-ky` và đăng nhập tại `/dang-nhap`. Khách vẫn làm đề được; kết quả nằm trên máy. Khi đã đăng nhập, bài nộp được lưu vào tài khoản (Netlify Blobs trên site thật, file `.data/` khi chạy local) và hiện ở `/tien-do` trên máy khác.

## Quản trị đề tại `/admin`

Chỉ tài khoản có vai trò quản trị vào được. Trang và API đều kiểm tra vai trò trên máy chủ.

Cách tạo quản trị viên lần đầu:

1. Vào https://ontoan.vn/dang-ky và tạo tài khoản bình thường. Nhớ tên đăng nhập (không dấu).
2. Trên Netlify, mở site `ontoan-vn` → **Project configuration** → **Environment variables**.
3. Thêm biến `ONTOAN_ADMIN_USERNAME` với giá trị đúng tên đăng nhập đó, áp dụng cho Production.
4. Bấm **Trigger deploy** hoặc đẩy một commit để biến có hiệu lực.
5. Đăng nhập lại. Menu sẽ có **Quản trị**. Mở https://ontoan.vn/admin.

Trong quản trị: **Thêm đề**, điền tên, khối, loại đề, số phút, từng câu (trắc nghiệm, đúng/sai 4 ý, hoặc trả lời ngắn), lời giải có `$công thức$`, link YouTube và ảnh. Bấm **Lưu đề**. Học sinh thấy ngay, không cần sửa code. Bỏ chọn **Hiện đề cho học sinh** để ẩn. Đề có sẵn trong code cũng hiện trong danh sách; bấm **Sửa** rồi **Lưu** là bản trên web được dùng thay cho file.

Hồ sơ đăng ký khóa học nằm ở `/admin/dang-ky`.

## Gắn video YouTube vào lời giải

Trong file đề (`src/data`) hoặc trong trang quản trị, dán một trong các dạng:

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

Gắn vào `videoUrl` của cả đề, hoặc `videoUrl` của từng câu. Để trống thì khung video không hiện. Đề mẫu `de-12-giua-ki-1-01` đang gắn một video để xem thử; hãy thay bằng video chữa của giáo viên.

## Đăng ký khóa học và email

Học sinh đã đăng nhập mở một khóa tại `/khoa-hoc` và gửi họ tên, số điện thoại, email, lớp/trường, khóa học, ghi chú. Hồ sơ được lưu trên site.

Để email tới **soncong24@gmail.com** mỗi khi có hồ sơ mới:

1. Netlify → site `ontoan-vn` → **Forms**.
2. Chọn form `dang-ky-khoa-hoc`.
3. **Form notifications** → **Add notification** → **Email notification**.
4. Điền `soncong24@gmail.com` và lưu.

Form được khai báo trong `public/netlify-forms.html` để Netlify nhận diện lúc deploy.

## Đưa lên GitHub và Netlify, rồi trỏ ontoan.vn

Chưa cần mua máy chủ. Gói miễn phí của Netlify đủ cho giai đoạn này. File `netlify.toml` đã khai báo lệnh build `npm run build` và thư mục `.next`.

Không dán mật khẩu nhà đăng ký tên miền vào GitHub. Nếu mật khẩu đã lộ trong cuộc hội thoại, hãy đổi mật khẩu đó trước khi sửa DNS.

### 1. Đưa code lên GitHub

Trong Cursor, bấm nút tạo repo và đăng nhập bằng tài khoản GitHub vừa lập. Đặt tên repo `ontoan`, để nhánh `main`. Xong, mở `https://github.com/<ten-cua-ban>/ontoan` và thấy các thư mục `src` cùng file `netlify.toml`.

### 2. Nối Netlify

1. Vào [app.netlify.com](https://app.netlify.com) bằng cùng tài khoản, hoặc vào User settings → Applications → GitHub và bấm Connect.
2. Add new site → Import an existing project → GitHub.
3. Nếu GitHub hỏi quyền, chọn repo `ontoan` rồi Authorize.
4. Chọn repo `ontoan`, nhánh `main`. Build command để `npm run build`. Publish directory để trống để plugin Next.js tự chọn. Không điền `out` hay `public`. Không thêm biến môi trường.
5. Bấm Deploy. Đợi bản build màu xanh. Site có địa chỉ dạng `ten-ngau-nhien.netlify.app`. Có thể đổi tên site thành `ontoan` trong Site configuration → Site details nếu tên còn trống.

### 3. Gắn ontoan.vn

1. Trong site Netlify: Domain management → Add a domain → nhập `ontoan.vn`. Thêm luôn `www.ontoan.vn` nếu được hỏi. Đặt `ontoan.vn` làm domain chính.
2. Đăng nhập nhà đăng ký nơi mua tên miền, mở mục DNS / Quản lý bản ghi. Xóa bản ghi A và AAAA cũ của tên gốc nếu còn.
3. Tạo đúng hai bản ghi:

   | Loại | Tên | Giá trị |
   | --- | --- | --- |
   | A | `@` | `75.2.60.5` |
   | CNAME | `www` | địa chỉ `....netlify.app` hiện trên Site overview |

4. Đợi từ vài phút đến vài giờ. Khi Netlify báo domain đã xác minh, HTTPS tự bật. Mở `https://ontoan.vn` để kiểm tra.
