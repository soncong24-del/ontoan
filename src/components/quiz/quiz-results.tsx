"use client";

import Link from "next/link";
import { YoutubeFrame } from "@/components/media/youtube-frame";
import { RichParagraphs, RichText } from "@/components/math/rich-text";
import { MasteryBadge } from "@/components/site/mastery-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatClock, formatDuration, formatNumberVi, formatScore } from "@/lib/format";
import { scoreMessage } from "@/lib/grading";
import { masteryFromScore } from "@/lib/mastery";
import { cn } from "@/lib/utils";
import type { Quiz, QuizAttempt } from "@/types";

export function QuizResults({
  quiz,
  attempt,
  onRetry,
}: {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetry: () => void;
}) {
  const accuracy = attempt.totalCount === 0 ? 0 : Math.round((attempt.correctCount / attempt.totalCount) * 100);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#d0dcf0] bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#1482c0]">Kết quả</p>
            <h1 className="mt-1 text-2xl font-bold text-[#153565]">{quiz.title}</h1>
            <div className="mt-3">
              <MasteryBadge id={masteryFromScore(attempt.score)} />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#153565]">
            {formatScore(attempt.score)}
            <span className="text-lg font-semibold text-[#5a6173]">/10</span>
          </p>
        </div>
        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#f4f8fb] px-4 py-3">
            <dt className="text-xs font-semibold text-[#5a6173]">Số câu đúng</dt>
            <dd className="mt-1 font-bold text-[#153565]">
              {attempt.correctCount}/{attempt.totalCount} · {accuracy}%
            </dd>
          </div>
          <div className="rounded-2xl bg-[#f4f8fb] px-4 py-3">
            <dt className="text-xs font-semibold text-[#5a6173]">Thời gian làm</dt>
            <dd className="mt-1 font-bold text-[#153565]">{formatDuration(attempt.durationSeconds)}</dd>
          </div>
          <div className="rounded-2xl bg-[#f4f8fb] px-4 py-3">
            <dt className="text-xs font-semibold text-[#5a6173]">Cách làm</dt>
            <dd className="mt-1 font-bold text-[#153565]">
              {attempt.mode === "timed" ? "Có tính giờ" : "Luyện tập"}
              {attempt.submittedBy === "timer" ? " · Hết giờ tự nộp" : ""}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-6 text-[#1e2f41]">{scoreMessage(attempt.score)}</p>
        <YoutubeFrame url={quiz.videoUrl} title={`Video chữa ${quiz.title}`} />
        <div className="mt-5 flex flex-wrap gap-3">
          <Button className="bg-[#ff792f] text-white hover:bg-[#e56a24]" onClick={onRetry}>
            Làm lại
          </Button>
          <Link href={`/bai-giang/${quiz.lessonSlug}`} className={buttonVariants({ variant: "outline" })}>
            Xem bài giảng
          </Link>
          <Link href="/kiem-tra" className={buttonVariants({ variant: "ghost" })}>
            Đề khác
          </Link>
        </div>
      </section>

      <ol className="space-y-4">
        {quiz.questions.map((question, index) => {
          const result = attempt.results.find((item) => item.questionId === question.id);
          const correct = Boolean(result?.correct);
          const answer = result?.answer ?? "";
          const flagged = attempt.flagged.includes(question.id);
          return (
            <li
              key={question.id}
              className={cn(
                "rounded-2xl border bg-white p-4 sm:p-5",
                correct ? "border-emerald-300" : "border-rose-300",
              )}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                <span className={correct ? "text-emerald-700" : "text-rose-700"}>
                  Câu {index + 1} · {correct ? "Đúng" : "Sai"}
                </span>
                {flagged ? <span className="text-amber-700">Đã đánh dấu</span> : null}
              </div>
              <div className="mt-2 text-[17px] leading-8">
                <RichText text={question.prompt} />
              </div>
              {question.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={question.imageUrl} alt="" className="mt-3 max-h-64 rounded-xl" />
              ) : null}
              {question.type === "true-false" ? (
                <ul className="mt-3 space-y-2 text-sm">
                  {question.statements.map((statement) => (
                    <li key={statement.id} className="rounded-xl border border-[#d0dcf0] px-3 py-2">
                      <span className="font-bold">{statement.id}.</span> <RichText text={statement.text} />
                      <span className="mt-1 block text-xs font-semibold text-emerald-700">
                        Đáp án: {statement.correct ? "Đúng" : "Sai"}
                      </span>
                    </li>
                  ))}
                  <li>Bạn chọn: {answer || "để trống"}</li>
                </ul>
              ) : null}
              {question.type === "mcq" ? (
                <ul className="mt-3 space-y-2">
                  {question.choices.map((choice) => {
                    const picked = answer === choice.id;
                    const isKey = choice.id === question.correctChoiceId;
                    return (
                      <li
                        key={choice.id}
                        className={cn(
                          "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
                          isKey && "border-emerald-400 bg-emerald-50",
                          picked && !isKey && "border-rose-400 bg-rose-50",
                          !picked && !isKey && "border-[#d0dcf0]",
                        )}
                      >
                        <span className="font-bold">{choice.id}.</span>
                        <RichText text={choice.text} />
                        {isKey ? <span className="ml-auto text-xs font-semibold text-emerald-700">Đáp án</span> : null}
                        {picked && !isKey ? (
                          <span className="ml-auto text-xs font-semibold text-rose-700">Bạn chọn</span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              ) : question.type === "numeric" ? (
                <p className="mt-3 text-sm">
                  Bạn nhập: <strong>{answer || "để trống"}</strong>. Đáp số:{" "}
                  <strong>{formatNumberVi(question.correctValue)}</strong>.
                </p>
              ) : null}
              <div className="mt-4 rounded-xl bg-[#f4f8fb] px-3 py-3 text-sm leading-6">
                <p className="font-semibold text-[#153565]">Lời giải</p>
                <RichParagraphs text={question.solution} className="mt-1" />
                <YoutubeFrame url={question.videoUrl} title={`Video câu ${index + 1}`} />
              </div>
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-[#5a6173]">
        Thời gian hiển thị trên đồng hồ lúc nộp: {formatClock(attempt.durationSeconds)} đã trôi qua.
      </p>
    </div>
  );
}
