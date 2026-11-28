import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/site/shell";
import { listAdminQuizzes } from "@/lib/server/exams";
import { examTypeLabel, gradeLabel } from "@/lib/labels";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Quản trị đề ôn thi toán"),
  description: fitDescription("Danh sách đề thi học kì và đề thi thử THPT trong khu quản trị Ôn Toán. Chỉ tài khoản được cấp quyền."),
  path: "/admin",
  noindex: true,
});
export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const exams = await listAdminQuizzes();
  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-[#153565]">Quản trị đề</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5a6173]">
            Sửa đề, câu hỏi, đáp án, lời giải và link YouTube. Bấm lưu là học sinh thấy ngay, không cần đăng code lại.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/dang-ky" className="text-sm font-semibold text-[#1482c0]">
            Hồ sơ khóa học
          </Link>
          <Link href="/admin/de/moi" className="rounded-full bg-[#ff792f] px-4 py-2 text-sm font-semibold text-white">
            Thêm đề
          </Link>
        </div>
      </div>
      <ul className="mt-6 divide-y divide-[#e6eef7] overflow-hidden rounded-2xl border border-[#d0dcf0] bg-white">
        {exams.map((item) => (
          <li key={item.quiz.slug} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#5a6173]">
                {gradeLabel(item.quiz.grade)} · {examTypeLabel(item.quiz.examType)} · {item.quiz.questions.length} câu
              </p>
              <p className="font-semibold text-[#153565]">{item.quiz.title}</p>
            </div>
            <span className={item.published ? "text-sm font-semibold text-emerald-700" : "text-sm font-semibold text-[#5a6173]"}>
              {item.published ? "Đang hiện" : "Đang ẩn"}
            </span>
            <Link href={`/admin/de/${item.quiz.slug}`} className="text-sm font-semibold text-[#1482c0]">
              Sửa
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
