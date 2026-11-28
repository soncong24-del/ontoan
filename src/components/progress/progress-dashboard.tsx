"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MasteryBadge } from "@/components/site/mastery-badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDateTime, formatDuration, formatScore } from "@/lib/format";
import { gradeLabel } from "@/lib/labels";
import { bestScore, masteryFromScore } from "@/lib/mastery";
import { useLessonProgressList, useQuizAttempts } from "@/lib/storage/use-learning-store";
import { cn } from "@/lib/utils";
import type { LessonSummary, QuizAttempt, QuizSummary } from "@/types";

export function ProgressDashboard({
  lessons,
  quizzes,
}: {
  lessons: LessonSummary[];
  quizzes: QuizSummary[];
}) {
  const progress = useLessonProgressList();
  const attempts = useQuizAttempts();
  const [mounted, setMounted] = useState(false);
  const [accountAttempts, setAccountAttempts] = useState<QuizAttempt[]>([]);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    void fetch("/api/attempts")
      .then((response) => response.json())
      .then((data: { attempts?: QuizAttempt[] }) => setAccountAttempts(data.attempts ?? []));
  }, []);

  if (!mounted) {
    return <p className="text-sm text-[#5a6173]">Đang đọc tiến độ trên máy bạn…</p>;
  }

  const completed = lessons.filter((lesson) =>
    progress.some((item) => item.lessonSlug === lesson.slug && item.completedAt),
  );
  const scores = attempts.map((item) => item.score);
  const average = scores.length === 0 ? null : Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10;

  return (
    <div className="space-y-8">
      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Bài đã học" value={`${completed.length}/${lessons.length}`} />
        <Stat label="Lần làm đề" value={String(attempts.length)} />
        <Stat label="Điểm trung bình" value={average === null ? "—" : `${formatScore(average)}/10`} />
      </section>

      {completed.length === 0 && attempts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#d0dcf0] bg-white px-5 py-10 text-center">
          <p className="text-lg font-bold text-[#153565]">Chưa có tiến độ trên máy này</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5a6173]">
            Hãy học một bài giảng hoặc nộp một đề. Kết quả nằm trong trình duyệt, chưa cần tài khoản.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/bai-giang" className={cn(buttonVariants(), "bg-[#1482c0] text-white")}>
              Học bài giảng
            </Link>
            <Link href="/kiem-tra" className={cn(buttonVariants(), "bg-[#ff792f] text-white hover:bg-[#e56a24]")}>
              Làm đề
            </Link>
          </div>
        </div>
      ) : null}

      <section>
        <h2 className="text-xl font-bold text-[#153565]">Bài giảng</h2>
        <ul className="mt-3 divide-y divide-[#e6eef7] overflow-hidden rounded-2xl border border-[#d0dcf0] bg-white">
          {lessons.map((lesson) => {
            const item = progress.find((entry) => entry.lessonSlug === lesson.slug);
            return (
              <li key={lesson.slug} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#5a6173]">{gradeLabel(lesson.grade)}</p>
                  <p className="font-semibold text-[#153565]">{lesson.title}</p>
                  {item?.quickCheckTotal ? (
                    <p className="text-xs text-[#5a6173]">
                      Luyện nhanh {item.quickCheckCorrect}/{item.quickCheckTotal}
                    </p>
                  ) : null}
                </div>
                <span className="rounded-full bg-[#f4f8fb] px-2 py-0.5 text-xs font-semibold text-[#153565] ring-1 ring-[#d0dcf0]">
                  {item?.completedAt ? "Đã học" : "Chưa học"}
                </span>
                <Link href={`/bai-giang/${lesson.slug}`} className="text-sm font-semibold text-[#1482c0]">
                  {item?.completedAt ? "Xem lại" : "Học tiếp"}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#153565]">Lịch sử trên tài khoản</h2>
        {accountAttempts.length === 0 ? (
          <p className="mt-3 text-sm text-[#5a6173]">
            Chưa có bài làm nào được lưu vào tài khoản. Hãy đăng nhập rồi nộp một đề. Khách vẫn xem được lịch sử trên máy này ở mục dưới.
          </p>
        ) : (
          <AttemptList attempts={accountAttempts} quizzes={quizzes} />
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#153565]">Lịch sử trên máy này</h2>
        {attempts.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[#d0dcf0] bg-white px-4 py-6 text-sm text-[#5a6173]">
            Chưa nộp đề nào.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {attempts.map((attempt) => {
              const quiz = quizzes.find((item) => item.slug === attempt.quizSlug);
              const related = attempts.filter((item) => item.quizSlug === attempt.quizSlug).map((item) => item.score);
              return (
                <li key={attempt.id} className="rounded-2xl border border-[#d0dcf0] bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#153565]">{quiz?.title ?? attempt.quizSlug}</h3>
                    <MasteryBadge id={masteryFromScore(bestScore(related))} />
                  </div>
                  <p className="mt-1 text-sm text-[#5a6173]">
                    {formatDateTime(attempt.submittedAt)} · {formatScore(attempt.score)}/10 · {attempt.correctCount}/
                    {attempt.totalCount} câu · {formatDuration(attempt.durationSeconds)} ·{" "}
                    {attempt.mode === "timed" ? "Có tính giờ" : "Luyện tập"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                    <Link className="text-[#1482c0]" href={`/kiem-tra/${attempt.quizSlug}?lan=${attempt.id}`}>
                      Xem lời giải
                    </Link>
                    <Link className="text-[#ff792f]" href={`/kiem-tra/${attempt.quizSlug}`}>
                      Làm lại
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function AttemptList({ attempts, quizzes }: { attempts: QuizAttempt[]; quizzes: QuizSummary[] }) {
  return (
    <ul className="mt-3 space-y-3">
      {attempts.map((attempt) => {
        const quiz = quizzes.find((item) => item.slug === attempt.quizSlug);
        return (
          <li key={attempt.id} className="rounded-2xl border border-[#d0dcf0] bg-white p-4">
            <h3 className="font-bold text-[#153565]">{quiz?.title ?? attempt.quizSlug}</h3>
            <p className="mt-1 text-sm text-[#5a6173]">
              {formatDateTime(attempt.submittedAt)} · {formatScore(attempt.score)}/10 · {attempt.correctCount}/
              {attempt.totalCount} câu · {formatDuration(attempt.durationSeconds)}
            </p>
            <Link className="mt-2 inline-block text-sm font-semibold text-[#1482c0]" href={`/kiem-tra/${attempt.quizSlug}?lan=${attempt.id}`}>
              Xem lời giải
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-[#d0dcf0]">
      <p className="text-xs font-semibold text-[#5a6173]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#153565]">{value}</p>
    </div>
  );
}
