import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamEditor } from "@/components/admin/exam-editor";
import { Shell } from "@/components/site/shell";
import { getQuizzes } from "@/data";
import { listExamRecords } from "@/lib/server/exams";

export const metadata: Metadata = { title: "Sửa đề" };
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
