import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { QuizCatalog } from "@/components/catalog/quiz-catalog";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { listPublicQuizzes } from "@/lib/server/exams";

export const metadata: Metadata = {
  title: "Đề kiểm tra trực tuyến",
  description: "Đề toán trắc nghiệm lớp 9 đến lớp 12, chấm điểm ngay và có lời giải.",
};
export const dynamic = "force-dynamic";

export default async function QuizzesPage() {
  await connection();
  const quizzes = (await listPublicQuizzes()).map((quiz) => ({
    slug: quiz.slug,
    title: quiz.title,
    summary: quiz.summary,
    grade: quiz.grade,
    topic: quiz.topic,
    difficulty: quiz.difficulty,
    durationMinutes: quiz.durationMinutes,
    questionCount: quiz.questions.length,
    lessonSlug: quiz.lessonSlug,
    featured: quiz.featured,
    examType: quiz.examType,
    examFormat: quiz.examFormat,
  }));
  return (
    <Shell>
      <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { label: "Đề kiểm tra" }]} />
      <h1 className="text-3xl font-bold text-[#153565]">Bài tập và kiểm tra trực tuyến</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5a6173]">
        Lọc theo lớp, mức độ và thời lượng. Làm có tính giờ hoặc luyện không giờ. Nộp bài để xem điểm trên thang 10 và lời giải.
      </p>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-[#5a6173]">Đang mở danh sách đề…</p>}>
          <QuizCatalog quizzes={quizzes} />
        </Suspense>
      </div>
    </Shell>
  );
}
