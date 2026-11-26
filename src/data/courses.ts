import type { Course } from "@/types";

const courses: Course[] = [
  {
    slug: "lo-trinh-on-thi-vao-10",
    title: "Lộ trình Ôn thi vào 10",
    summary:
      "Đi từ đại số lớp 9 đến hình học phẳng, rồi luyện đề tuyển sinh có chữa từng câu. Dành cho học sinh muốn vào trường công lập.",
    audience: "Học sinh lớp 9, kỳ thi tuyển sinh vào 10",
    grade: "9",
    priceVnd: 1_490_000,
    compareAtVnd: 1_990_000,
    status: "coming-soon",
    durationLabel: "36 buổi · 12 tuần",
    level: "Luyện thi",
    featured: true,
    outcomes: [
      "Thành thạo phương trình, hệ phương trình và định lý Vi-ét.",
      "Vẽ và đọc đồ thị hàm số bậc nhất, bậc hai.",
      "Làm chắc đường tròn, tam giác đồng dạng và hệ thức lượng.",
      "Có thói quen chia thời gian khi làm một đề 120 phút.",
    ],
    modules: [
      {
        id: "dai-so",
        title: "Đại số nền tảng",
        summary: "Các dạng chiếm khoảng một nửa đề tuyển sinh.",
        lessons: [
          { title: "Căn thức và biến đổi biểu thức", durationMinutes: 45 },
          { title: "Phương trình bậc hai, định lý Vi-ét", durationMinutes: 50 },
          { title: "Hệ phương trình hai ẩn", durationMinutes: 50 },
          { title: "Bài toán lập phương trình", durationMinutes: 45 },
        ],
      },
      {
        id: "ham-so",
        title: "Hàm số và đồ thị",
        summary: "Đọc giao điểm, hệ số góc và bài toán thực tế ngắn.",
        lessons: [
          { title: "Hàm số bậc nhất", durationMinutes: 40 },
          { title: "Parabol và cực trị trên một đoạn", durationMinutes: 45 },
        ],
      },
      {
        id: "hinh",
        title: "Hình học phẳng",
        summary: "Phần dễ mất điểm nếu chỉ học mẹo, không học chứng minh.",
        lessons: [
          { title: "Tam giác đồng dạng", durationMinutes: 50 },
          { title: "Hệ thức lượng trong tam giác vuông", durationMinutes: 45 },
          { title: "Đường tròn, tiếp tuyến, góc nội tiếp", durationMinutes: 50 },
        ],
      },
      {
        id: "de",
        title: "Luyện đề",
        summary: "Mỗi đề có lời giải viết tay số hóa và video chữa dự kiến.",
        lessons: [
          { title: "Đề thi thử số 1–4", durationMinutes: 120 },
          { title: "Chữa các câu hình còn bỏ trống", durationMinutes: 45 },
        ],
      },
    ],
  },
  {
    slug: "lo-trinh-9-cong-thpt-qg",
    title: "Lộ trình 9+ Toán THPT Quốc gia",
    summary:
      "Ôn có trọng số theo cấu trúc đề tốt nghiệp: hàm số, mũ logarit, tích phân, xác suất, Oxyz và hình không gian. Mục tiêu làm chắc phần vận dụng trước khi đụng vận dụng cao.",
    audience: "Học sinh lớp 12, kỳ thi tốt nghiệp THPT",
    grade: "12",
    priceVnd: 2_490_000,
    compareAtVnd: 3_200_000,
    status: "coming-soon",
    durationLabel: "48 buổi · 16 tuần",
    level: "Luyện thi",
    featured: true,
    outcomes: [
      "Khảo sát hàm số và bài toán tương giao không bị hổng đạo hàm.",
      "Tính nguyên hàm, tích phân và diện tích hình phẳng đúng cận.",
      "Làm xác suất, thống kê và số phức ở mức vận dụng.",
      "Có một bộ đề minh họa đã chấm, kèm sổ lỗi cá nhân.",
    ],
    modules: [
      {
        id: "ham",
        title: "Hàm số và đạo hàm",
        summary: "Nền của khoảng một phần ba câu vận dụng.",
        lessons: [
          { title: "Tính đơn điệu và cực trị", durationMinutes: 50 },
          { title: "Giá trị lớn nhất, nhỏ nhất", durationMinutes: 50 },
          { title: "Tiệm cận và đồ thị", durationMinutes: 45 },
        ],
      },
      {
        id: "tich-phan",
        title: "Nguyên hàm và tích phân",
        summary: "Từ bảng nguyên hàm đến diện tích, thể tích quen thuộc.",
        lessons: [
          { title: "Nguyên hàm từng phần cơ bản", durationMinutes: 45 },
          { title: "Tích phân và ứng dụng diện tích", durationMinutes: 50 },
        ],
      },
      {
        id: "roi-rac",
        title: "Xác suất, thống kê và số phức",
        summary: "Các câu dễ lấy điểm nếu luyện đúng dạng.",
        lessons: [
          { title: "Xác suất có điều kiện mức đề thi", durationMinutes: 45 },
          { title: "Số phức và phương trình bậc hai", durationMinutes: 40 },
        ],
      },
      {
        id: "khong-gian",
        title: "Hình học không gian và Oxyz",
        summary: "Góc, khoảng cách, thể tích và tọa độ.",
        lessons: [
          { title: "Quan hệ song song, vuông góc", durationMinutes: 50 },
          { title: "Tọa độ trong không gian", durationMinutes: 50 },
        ],
      },
      {
        id: "de-thi",
        title: "Đề minh họa",
        summary: "Làm đề trong 90 phút, chữa theo nhóm câu.",
        lessons: [
          { title: "Bốn đề minh họa gần nhất", durationMinutes: 90 },
          { title: "Chữa câu vận dụng cao chọn lọc", durationMinutes: 50 },
        ],
      },
    ],
  },
  {
    slug: "chuyen-de-hinh-hoc-khong-gian",
    title: "Chuyên đề Hình học không gian",
    summary:
      "Khóa ngắn cho học sinh mất gốc hình không gian: từ quan hệ song song, vuông góc đến thể tích và vài bài tọa độ.",
    audience: "Học sinh lớp 11 và 12 muốn gỡ phần hình",
    grade: "12",
    priceVnd: 890_000,
    compareAtVnd: 1_190_000,
    status: "coming-soon",
    durationLabel: "16 buổi · 8 tuần",
    level: "Chuyên đề",
    featured: true,
    outcomes: [
      "Chỉ ra giao tuyến và thiết diện mà không vẽ lan man.",
      "Tính góc giữa đường và mặt, góc giữa hai mặt.",
      "Tính thể tích lăng trụ, chóp bằng tỉ số hoặc đường cao.",
      "Đọc một bài Oxyz ngắn về mặt phẳng và khoảng cách.",
    ],
    modules: [
      {
        id: "song-song",
        title: "Song song và vuông góc",
        summary: "Dựng hình đúng trước khi tính.",
        lessons: [
          { title: "Đường thẳng song song mặt phẳng", durationMinutes: 40 },
          { title: "Hai mặt phẳng vuông góc", durationMinutes: 45 },
          { title: "Góc và khoảng cách", durationMinutes: 50 },
        ],
      },
      {
        id: "the-tich",
        title: "Thể tích khối đa diện",
        summary: "Công thức và cách hạ đường cao.",
        lessons: [
          { title: "Thể tích chóp đều và chóp cụt", durationMinutes: 45 },
          { title: "Tỉ số thể tích", durationMinutes: 40 },
        ],
      },
      {
        id: "oxyz",
        title: "Tọa độ trong không gian",
        summary: "Phần đại số của hình không gian trong đề tốt nghiệp.",
        lessons: [
          { title: "Vectơ pháp tuyến và mặt phẳng", durationMinutes: 45 },
          { title: "Khoảng cách từ điểm tới mặt phẳng", durationMinutes: 40 },
        ],
      },
    ],
  },
];

export function getCourses(): Course[] {
  return courses;
}

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
