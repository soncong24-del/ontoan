import Link from "next/link";
import { RichText } from "@/components/math/rich-text";
import { Shell } from "@/components/site/shell";
import { buttonVariants } from "@/components/ui/button";
import { getCourses, getLessonSummaries, getQuizSummaries } from "@/data";
import { formatVnd, pluralMinutes } from "@/lib/format";
import { GRADES, difficultyLabel, gradeLabel } from "@/lib/labels";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Chọn lớp và làm đề",
    body: "Vào đúng khối, làm trắc nghiệm có tính giờ hoặc luyện không giờ — giống phòng luyện đề online.",
  },
  {
    title: "Xem huy hiệu và câu sai",
    body: "Nộp bài là có điểm trên thang 10, huy hiệu Giỏi / Khá / Trung bình và lời giải từng câu.",
  },
  {
    title: "Học lại chỗ còn hổng",
    body: "Mỗi đề gắn một bài giảng. Mở ví dụ, xem lời giải chi tiết, rồi làm lại đề.",
  },
];

export default function HomePage() {
  const lessons = getLessonSummaries().filter((lesson) => lesson.featured).slice(0, 3);
  const quizzes = getQuizSummaries().filter((quiz) => quiz.featured).slice(0, 3);
  const courses = getCourses();

  return (
    <>
      <section className="border-b border-[#d0dcf0] bg-white/70">
        <Shell className="grid items-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            <p className="text-sm font-bold text-[#1482c0]">ontoan.vn · Miễn phí giai đoạn bài giảng và đề</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-[#153565] sm:text-5xl">
              Học toán và luyện đề trắc nghiệm online
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#5a6173]">
              Ôn Toán soạn bài giảng có công thức rõ và đề kiểm tra chấm điểm ngay cho học sinh lớp 9 đến lớp 12. Chọn lớp, làm bài, xem chỗ sai.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/kiem-tra" className={cn(buttonVariants({ size: "lg" }), "bg-[#ff792f] text-white hover:bg-[#e56a24]")}>
                Làm bài kiểm tra
              </Link>
              <Link href="/bai-giang" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                Học bài giảng
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[#d0dcf0] bg-white p-5 shadow-lg">
            <p className="text-xs font-bold tracking-wide text-[#ff792f] uppercase">Câu mẫu · Toán 9</p>
            <div className="mt-3 text-lg leading-8 font-semibold text-[#153565]">
              <RichText text="Nghiệm của phương trình $x^2 - 5x + 6 = 0$ là" />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                A. 2 và 3
              </li>
              <li className="rounded-xl border border-[#d0dcf0] px-3 py-2">B. −2 và −3</li>
              <li className="rounded-xl border border-[#d0dcf0] px-3 py-2">C. 1 và 6</li>
              <li className="rounded-xl border border-[#d0dcf0] px-3 py-2">D. −1 và −6</li>
            </ul>
            <p className="mt-3 text-sm text-[#5a6173]">
              <RichText text="Δ = 1, nên $x = \dfrac{5 \pm 1}{2}$." />
            </p>
            <Link href="/kiem-tra/de-phuong-trinh-bac-hai" className="mt-4 inline-flex text-sm font-bold text-[#ff792f]">
              Làm đề đầy đủ 10 câu
            </Link>
          </div>
        </Shell>
      </section>

      <Shell>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#153565]">Chọn lớp</h2>
            <p className="mt-1 text-sm text-[#5a6173]">Mỗi lớp có bài giảng và đề kiểm tra, chấm tự động.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {GRADES.map((grade) => (
            <Link
              key={grade.id}
              href={`/lop/${grade.id}`}
              className="rounded-3xl border border-[#d0dcf0] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1482c0]"
            >
              <p className="text-3xl font-bold text-[#1482c0]">{grade.label}</p>
              <p className="mt-1 font-semibold text-[#153565]">{grade.track}</p>
              <p className="mt-2 text-sm leading-6 text-[#5a6173]">{grade.blurb}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl bg-[#153565] p-5 text-white">
              <p className="text-sm font-bold text-[#ffb088]">Bước {index + 1}</p>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">{step.body}</p>
            </article>
          ))}
        </div>

        <section className="mt-12">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-[#153565]">Bài giảng nổi bật</h2>
            <Link href="/bai-giang" className="text-sm font-bold text-[#1482c0]">Xem tất cả</Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {lessons.map((lesson) => (
              <Link key={lesson.slug} href={`/bai-giang/${lesson.slug}`} className="rounded-3xl border border-[#d0dcf0] bg-white p-4 hover:border-[#1482c0]">
                <p className="text-xs font-bold text-[#1482c0]">{gradeLabel(lesson.grade)} · {pluralMinutes(lesson.durationMinutes)}</p>
                <h3 className="mt-2 font-bold text-[#153565]">{lesson.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5a6173]">{lesson.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-[#153565]">Đề kiểm tra nổi bật</h2>
            <Link href="/kiem-tra" className="text-sm font-bold text-[#1482c0]">Xem tất cả</Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {quizzes.map((quiz) => (
              <Link key={quiz.slug} href={`/kiem-tra/${quiz.slug}`} className="rounded-3xl border border-[#ffe0d2] bg-[#fff7f2] p-4 hover:border-[#ff792f]">
                <p className="text-xs font-bold text-[#ff792f]">
                  {gradeLabel(quiz.grade)} · {difficultyLabel(quiz.difficulty)} · {quiz.questionCount} câu
                </p>
                <h3 className="mt-2 font-bold text-[#153565]">{quiz.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5a6173]">{quiz.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl bg-[#fff3ef] p-5 sm:p-8">
          <p className="text-sm font-bold text-[#ff792f]">Khóa học chuyên sâu — Sắp ra mắt</p>
          <h2 className="mt-2 text-2xl font-bold text-[#153565]">Lộ trình có học phí, khi cổng thanh toán mở</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5a6173]">
            Bài giảng và đề hiện miễn phí. Khóa bên dưới đã có giáo trình và giá, chưa bán. Bạn có thể để lại email để nhận tin.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {courses.map((course) => (
              <Link key={course.slug} href={`/khoa-hoc/${course.slug}`} className="rounded-2xl bg-white p-4 shadow-sm">
                <span className="rounded-full bg-[#fff3ef] px-2 py-0.5 text-xs font-bold text-[#ff792f]">Sắp mở bán</span>
                <h3 className="mt-3 font-bold text-[#153565]">{course.title}</h3>
                <p className="mt-2 text-sm text-[#5a6173]">{course.durationLabel}</p>
                <p className="mt-3 text-lg font-bold text-[#153565]">{formatVnd(course.priceVnd)}</p>
              </Link>
            ))}
          </div>
        </section>
      </Shell>
    </>
  );
}
