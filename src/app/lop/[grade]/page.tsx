import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GradeHub } from "@/components/grade/grade-hub";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getLessonSummaries, getQuizSummaries } from "@/data";
import { GRADES } from "@/lib/labels";
import type { GradeLevel } from "@/types";

type Props = { params: Promise<{ grade: string }> };

export function generateStaticParams() {
  return GRADES.map((grade) => ({ grade: grade.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade } = await params;
  const info = GRADES.find((item) => item.id === grade);
  if (!info) return { title: "Không thấy lớp" };
  return {
    title: `${info.label} — ${info.track}`,
    description: info.blurb,
  };
}

export default async function GradePage({ params }: Props) {
  const { grade } = await params;
  const info = GRADES.find((item) => item.id === grade);
  if (!info) notFound();
  const level = info.id as GradeLevel;
  const lessons = getLessonSummaries().filter((lesson) => lesson.grade === level);
  const quizzes = getQuizSummaries().filter((quiz) => quiz.grade === level);

  return (
    <Shell>
      <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { label: info.label }]} />
      <p className="text-sm font-bold text-[#1482c0]">{info.track}</p>
      <h1 className="mt-1 text-3xl font-bold text-[#153565]">Toán {info.label.replace("Toán ", "lớp ")}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5a6173]">
        {info.blurb} Bên dưới là bài giảng và đề kiểm tra của khối, kèm huy hiệu theo điểm bạn đã làm trên máy này.
      </p>
      <div className="mt-4 flex gap-3 text-sm font-semibold">
        <a href="#bai-giang" className="rounded-full bg-[#e7f3fb] px-3 py-1 text-[#1482c0]">Bài giảng</a>
        <a href="#de-kiem-tra" className="rounded-full bg-[#fff3ef] px-3 py-1 text-[#ff792f]">Đề kiểm tra</a>
      </div>
      <div className="mt-6">
        <GradeHub lessons={lessons} quizzes={quizzes} />
      </div>
    </Shell>
  );
}
