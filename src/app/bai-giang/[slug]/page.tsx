import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/content/blocks";
import { LessonCompleteButton, LessonToc, QuickCheck, QuizLink } from "@/components/lesson/lesson-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { Badge } from "@/components/ui/badge";
import { getLesson, getLessons, getQuiz } from "@/data";
import { formatDate, pluralMinutes } from "@/lib/format";
import { gradeLabel, topicLabel } from "@/lib/labels";
import { fitDescription, fitTitle, lessonJsonLd, lessonMeta, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLessons().map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) {
    return pageMeta({
      title: fitTitle("Không thấy bài giảng"),
      description: fitDescription("Bài giảng này không còn trên Ôn Toán. Xem các bài giảng ôn thi toán miễn phí cho lớp 10, 11, 12."),
      path: "/bai-giang",
      noindex: true,
    });
  }
  return lessonMeta(lesson);
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const quiz = getQuiz(lesson.quizSlug);
  const toc = [
    { id: "muc-tieu", title: "Mục tiêu bài học" },
    ...lesson.sections.map((section) => ({ id: section.id, title: section.title })),
    { id: "luyen-nhanh", title: "Luyện nhanh" },
  ];

  return (
    <Shell>
      <JsonLd data={lessonJsonLd(lesson)} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Trang chủ" },
          { href: `/lop/${lesson.grade}`, label: gradeLabel(lesson.grade) },
          { href: "/bai-giang", label: "Bài giảng" },
          { label: lesson.title },
        ]}
      />
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{gradeLabel(lesson.grade)}</Badge>
        <Badge variant="outline">{topicLabel(lesson.topic)}</Badge>
        <Badge variant="outline">{pluralMinutes(lesson.durationMinutes)}</Badge>
      </div>
      <h1 className="mt-3 max-w-3xl text-3xl font-bold text-balance text-[#153565]">{lesson.title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-[#5a6173]">{lesson.summary}</p>
      <p className="mt-2 text-xs text-[#5a6173]">Cập nhật {formatDate(lesson.updatedAt)}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {quiz ? <QuizLink href={`/kiem-tra/${quiz.slug}`} label="Làm đề kiểm tra của bài này" /> : null}
        <LessonCompleteButton lessonSlug={lesson.slug} />
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <LessonToc items={toc} />
        <article className="max-w-3xl">
          <section id="muc-tieu" className="scroll-mt-32">
            <h2 className="text-xl font-bold text-[#153565]">Mục tiêu bài học</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[17px] leading-8">
              {lesson.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </section>
          {lesson.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-10 scroll-mt-32">
              <h2 className="text-xl font-bold text-[#153565]">{section.title}</h2>
              <div className="mt-4">
                <Blocks blocks={section.blocks} />
              </div>
            </section>
          ))}
          <section id="luyen-nhanh" className="mt-10 scroll-mt-32">
            <h2 className="text-xl font-bold text-[#153565]">Luyện nhanh</h2>
            <p className="mt-2 text-sm text-[#5a6173]">Hai câu ngắn trước khi sang đề đầy đủ. Làm đúng hết sẽ được đánh dấu đã học.</p>
            <div className="mt-4">
              <QuickCheck lessonSlug={lesson.slug} questions={lesson.quickCheck} />
            </div>
          </section>
          {quiz ? (
            <div className="mt-8 rounded-3xl bg-[#fff3ef] p-5">
              <p className="font-bold text-[#153565]">Sẵn sàng kiểm tra?</p>
              <p className="mt-1 text-sm text-[#5a6173]">{quiz.title} · {quiz.questions.length} câu · {pluralMinutes(quiz.durationMinutes)}</p>
              <div className="mt-3">
                <QuizLink href={`/kiem-tra/${quiz.slug}`} label="Làm bài kiểm tra" />
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </Shell>
  );
}
