import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getCourses } from "@/data";
import { formatVnd } from "@/lib/format";
import { gradeLabel } from "@/lib/labels";
import { PAYMENT_PROVIDERS } from "@/lib/payments";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Khóa học ôn thi toán sắp mở"),
  description: fitDescription(
    "Khóa học ôn thi toán cho lớp 9, 10, 11, 12 sắp mở. Bài giảng và đề thi học kì, đề thi thử THPT trên ontoan.vn vẫn miễn phí.",
  ),
  path: "/khoa-hoc",
});

export default function CoursesPage() {
  const courses = getCourses();
  return (
    <Shell>
      <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { label: "Khóa học" }]} />
      <p className="text-sm font-bold text-[#ff792f]">Sắp mở bán</p>
      <h1 className="mt-1 text-3xl font-bold text-[#153565]">Khóa học chuyên sâu</h1>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5a6173]">
        Giáo trình và giá đã sẵn. Thanh toán dự kiến qua {PAYMENT_PROVIDERS.map((item) => item.label).join(", ")}. Hiện chỉ nhận nguyện vọng, chưa tạo giao dịch.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <article key={course.slug} className="flex flex-col rounded-3xl border border-[#d0dcf0] bg-white p-5 shadow-sm">
            <span className="w-fit rounded-full bg-[#fff3ef] px-2 py-0.5 text-xs font-bold text-[#ff792f]">Sắp mở bán</span>
            <h2 className="mt-3 text-lg font-bold text-[#153565]">{course.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#5a6173]">{course.summary}</p>
            <p className="mt-3 text-xs font-semibold text-[#1482c0]">
              {gradeLabel(course.grade)} · {course.level} · {course.durationLabel}
            </p>
            <p className="mt-4 text-2xl font-bold text-[#153565]">{formatVnd(course.priceVnd)}</p>
            {course.compareAtVnd ? (
              <p className="text-sm text-[#5a6173] line-through">{formatVnd(course.compareAtVnd)}</p>
            ) : null}
            <Link href={`/khoa-hoc/${course.slug}`} className="mt-4 text-sm font-bold text-[#ff792f]">
              Xem giáo trình và đăng ký
            </Link>
          </article>
        ))}
      </div>
    </Shell>
  );
}
