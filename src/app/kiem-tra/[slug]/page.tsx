import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizExperience } from "@/components/quiz/quiz-experience";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getQuiz, getQuizzes } from "@/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getQuizzes().map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) return { title: "Không thấy đề" };
  return { title: quiz.title, description: quiz.summary };
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) notFound();

  return (
    <Shell>
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
