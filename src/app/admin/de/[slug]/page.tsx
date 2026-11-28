import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamEditor } from "@/components/admin/exam-editor";
import { Shell } from "@/components/site/shell";
import { getQuizzes } from "@/data";
import { listExamRecords } from "@/lib/server/exams";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Sửa đề thi trên Ôn Toán"),
  description: fitDescription("Sửa câu hỏi, đáp án và lời giải đề thi học kì hoặc đề thi thử THPT. Trang quản trị của Ôn Toán."),
  path: "/admin",
  noindex: true,
});
export const dynamic = "force-dynamic";

export default async function EditExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stored = (await listExamRecords()).find((item) => item.quiz.slug === slug && !item.hidden);
  const quiz = stored?.quiz ?? getQuizzes().find((item) => item.slug === slug);
  if (!quiz) notFound();
  return (
    <Shell>
      <ExamEditor initial={quiz} isNew={false} initialPublished={stored?.published ?? true} />
    </Shell>
  );
}
