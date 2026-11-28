import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress/progress-dashboard";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getLessonSummaries, getQuizSummaries } from "@/data";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Tiến độ ôn thi toán của bạn"),
  description: fitDescription(
    "Xem bài giảng đã học, điểm đề thi học kì và đề thi thử THPT đã làm trên Ôn Toán. Trang này chỉ dành cho tài khoản của bạn.",
  ),
  path: "/tien-do",
  noindex: true,
});

export default function ProgressPage() {
  return (
    <Shell>
      <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { label: "Tiến độ" }]} />
      <h1 className="text-3xl font-bold text-[#153565]">Lịch sử học tập</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5a6173]">
        Dữ liệu đang nằm trên trình duyệt. Khi có tài khoản, cùng một kho dữ liệu sẽ chuyển sang máy chủ mà không đổi các màn hình này.
      </p>
      <div className="mt-6">
        <ProgressDashboard lessons={getLessonSummaries()} quizzes={getQuizSummaries()} />
      </div>
    </Shell>
  );
}
