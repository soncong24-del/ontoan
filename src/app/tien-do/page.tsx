import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress/progress-dashboard";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getLessonSummaries, getQuizSummaries } from "@/data";

export const metadata: Metadata = {
  title: "Tiến độ học tập",
  description: "Bài đã học, lịch sử làm đề và huy hiệu trên máy này.",
};

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
