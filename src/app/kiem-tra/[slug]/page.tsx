import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { JsonLd } from "@/components/seo/json-ld";
import { QuizExperience } from "@/components/quiz/quiz-experience";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getQuizzes } from "@/data";
import { examJsonLd, examMeta, fitDescription, fitTitle, pageMeta } from "@/lib/seo";
import { getPublicQuiz } from "@/lib/server/exams";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getQuizzes().map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getPublicQuiz(slug);
  if (!quiz) {
    return pageMeta({
      title: fitTitle("Không thấy đề thi"),
      description: fitDescription("Đề này không còn trên Ôn Toán. Chọn đề thi học kì hoặc đề thi thử THPT toán lớp 10, 11, 12 miễn phí."),
      path: "/kiem-tra",
      noindex: true,
    });
  }
  return examMeta(quiz);
}

export default async function QuizPage({ params }: Props) {
  await connection();
  const { slug } = await params;
  const quiz = await getPublicQuiz(slug);
  if (!quiz) notFound();

  return (
    <Shell>
      <JsonLd data={examJsonLd(quiz)} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Trang chủ" },
          { href: `/lop/${quiz.grade}`, label: `Toán ${quiz.grade}` },
          { href: "/kiem-tra", label: "Đề kiểm tra" },
          { label: quiz.title },
        ]}
      />
      <p className="mb-4 text-sm">
        <Link href={`/bai-giang/${quiz.lessonSlug}`} className="font-semibold text-[#1482c0]">
          Ôn bài giảng trước khi làm
        </Link>
      </p>
      <QuizExperience quiz={quiz} />
    </Shell>
  );
}
