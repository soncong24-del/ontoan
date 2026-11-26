"use client";

import Link from "next/link";
import { MasteryBadge } from "@/components/site/mastery-badge";
import { useLessonProgressList, useQuizAttempts } from "@/lib/storage/use-learning-store";
import { pluralMinutes } from "@/lib/format";
import { difficultyLabel, topicLabel } from "@/lib/labels";
import { bestScore, masteryFromScore, MASTERY } from "@/lib/mastery";
import type { LessonSummary, QuizSummary } from "@/types";

export function GradeHub({
  lessons,
  quizzes,
}: {
  lessons: LessonSummary[];
  quizzes: QuizSummary[];
}) {
  const progress = useLessonProgressList();
  const attempts = useQuizAttempts();
  const badges = quizzes.map((quiz) => {
    const scores = attempts.filter((item) => item.quizSlug === quiz.slug).map((item) => item.score);
    return masteryFromScore(bestScore(scores));
  });

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#d0dcf0]">
        <h2 className="text-sm font-bold tracking-wide text-[#5a6173] uppercase">Huy hiệu của bạn</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {MASTERY.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#f4f8fb] px-3 py-2">
              <MasteryBadge id={item.id} />
              <p className="mt-1 text-sm font-bold text-[#153565]">
                {badges.filter((badge) => badge === item.id).length} đề
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#5a6173]">
          Huy hiệu tính theo điểm cao nhất từng đề trên máy này. Bảng xếp hạng cả lớp sẽ gắn khi có tài khoản.
        </p>
      </section>

      <section id="bai-giang">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-[#153565]">Bài giảng</h2>
          <Link href="/bai-giang" className="text-sm font-semibold text-[#1482c0]">
            Tất cả bài
          </Link>
        </div>
        <div className="mt-4 grid gap-3">
          {lessons.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[#d0dcf0] bg-white px-4 py-8 text-sm text-[#5a6173]">
              Khối này chưa có bài giảng. Xem các lớp khác trong thanh trên.
            </p>
          ) : (
            lessons.map((lesson) => {
              const done = progress.some((item) => item.lessonSlug === lesson.slug && item.completedAt);
              return (
                <Link
                  key={lesson.slug}
                  href={`/bai-giang/${lesson.slug}`}
                  className="flex flex-col gap-2 rounded-2xl border border-[#d0dcf0] bg-white p-4 hover:border-[#1482c0] sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#1482c0]">{topicLabel(lesson.topic)}</p>
                    <h3 className="font-bold text-[#153565]">{lesson.title}</h3>
                    <p className="mt-1 text-sm text-[#5a6173]">{pluralMinutes(lesson.durationMinutes)} · có lời giải từng bước</p>
                  </div>
                  <span className="rounded-full bg-[#f4f8fb] px-2 py-0.5 text-xs font-semibold text-[#153565] ring-1 ring-[#d0dcf0]">
                    {done ? "Đã học" : "Chưa học"}
                  </span>
                </Link>
              );
            })
          )}
        </div>
      </section>

      <section id="de-kiem-tra">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-[#153565]">Đề kiểm tra</h2>
          <Link href="/kiem-tra" className="text-sm font-semibold text-[#1482c0]">
            Tất cả đề
          </Link>
        </div>
        <div className="mt-4 grid gap-3">
          {quizzes.map((quiz) => {
            const scores = attempts.filter((item) => item.quizSlug === quiz.slug).map((item) => item.score);
            return (
              <Link
                key={quiz.slug}
                href={`/kiem-tra/${quiz.slug}`}
                className="flex flex-col gap-2 rounded-2xl border border-[#d0dcf0] bg-white p-4 hover:border-[#ff792f] sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#ff792f]">
                    {difficultyLabel(quiz.difficulty)} · {quiz.questionCount} câu · {pluralMinutes(quiz.durationMinutes)}
                  </p>
                  <h3 className="font-bold text-[#153565]">{quiz.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-[#5a6173]">{quiz.summary}</p>
                </div>
                <MasteryBadge id={masteryFromScore(bestScore(scores))} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
