import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { GRADES } from "@/lib/labels";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-[#d0dcf0] bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3 text-sm leading-6 text-[#5a6173]">
            Học toán và luyện đề trắc nghiệm cho học sinh lớp 9 đến lớp 12. Giai đoạn này miễn phí, tiến độ lưu trên trình duyệt của bạn.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-[#153565]">Luyện tập</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-[#1482c0]" href="/bai-giang">Bài giảng</Link></li>
            <li><Link className="hover:text-[#1482c0]" href="/kiem-tra">Đề kiểm tra</Link></li>
            <li><Link className="hover:text-[#1482c0]" href="/tien-do">Huy hiệu và tiến độ</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-[#153565]">Theo lớp</p>
          <ul className="mt-3 space-y-2 text-sm">
            {GRADES.map((grade) => (
              <li key={grade.id}>
                <Link className="hover:text-[#1482c0]" href={`/lop/${grade.id}`}>
                  {grade.label} — {grade.track}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-[#153565]">Khóa học</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-[#1482c0]" href="/khoa-hoc">Khóa chuyên sâu — sắp mở bán</Link></li>
            <li><Link className="hover:text-[#1482c0]" href="/khoa-hoc/lo-trinh-on-thi-vao-10">Ôn thi vào 10</Link></li>
            <li><Link className="hover:text-[#1482c0]" href="/khoa-hoc/lo-trinh-9-cong-thpt-qg">9+ Toán THPT</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#e6eef7]">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs leading-5 text-[#5a6173] sm:px-6">
          © {new Date().getFullYear()} Ôn Toán · ontoan.vn. Công thức hiển thị bằng KaTeX. Chưa thu học phí ở giai đoạn bài giảng và đề miễn phí.
        </p>
      </div>
    </footer>
  );
}
