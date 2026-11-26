"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { RichParagraphs, RichText } from "@/components/math/rich-text";
import { getLearningRepository } from "@/lib/storage";
import { useLessonProgressList } from "@/lib/storage/use-learning-store";
import { gradeQuiz } from "@/lib/grading";
import { cn } from "@/lib/utils";
import type { Question, Quiz } from "@/types";

export function LessonCompleteButton({ lessonSlug }: { lessonSlug: string }) {
  const list = useLessonProgressList();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const done = list.some((item) => item.lessonSlug === lessonSlug && item.completedAt);

  function toggle() {
    const repo = getLearningRepository();
    const current = repo.getLessonProgress(lessonSlug);
    repo.saveLessonProgress({
      lessonSlug,
      completedAt: current?.completedAt ? null : new Date().toISOString(),
      quickCheckCorrect: current?.quickCheckCorrect ?? null,
      quickCheckTotal: current?.quickCheckTotal ?? null,
      updatedAt: new Date().toISOString(),
    });
  }

  if (!mounted) {
    return (
      <Button variant="outline" disabled>
        Đang đọc tiến độ…
      </Button>
    );
  }

  return (
    <Button variant={done ? "secondary" : "outline"} onClick={toggle}>
      {done ? "Đã học xong · Bỏ đánh dấu" : "Đánh dấu đã học"}
    </Button>
  );
}

export function LessonToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.75] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  const index = Math.max(0, items.findIndex((item) => item.id === active));
  const width = items.length === 0 ? 0 : Math.round(((index + 1) / items.length) * 100);

  const links = (
    <ol className="space-y-1">
      {items.map((item, itemIndex) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={cn(
              "block rounded-lg px-2 py-1.5 text-sm",
              item.id === active ? "bg-[#e7f3fb] font-semibold text-[#1482c0]" : "text-[#5a6173] hover:bg-[#f4f8fb]",
            )}
          >
            {itemIndex + 1}. {item.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-[#d0dcf0]">
          <div className="h-full bg-[#1482c0]" style={{ width: `${width}%` }} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                item.id === active ? "bg-[#1482c0] text-white" : "bg-white text-[#153565] ring-1 ring-[#d0dcf0]",
              )}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
      <aside className="sticky top-32 hidden h-fit lg:block">
        <p className="text-xs font-bold tracking-wide text-[#5a6173] uppercase">Mục lục</p>
        <div className="mt-2 mb-3 h-1.5 overflow-hidden rounded-full bg-[#d0dcf0]">
          <div className="h-full bg-[#1482c0]" style={{ width: `${width}%` }} />
        </div>
        {links}
      </aside>
    </>
  );
}

export function QuickCheck({ lessonSlug, questions }: { lessonSlug: string; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const pseudoQuiz = useMemo(
    () =>
      ({
        slug: `luyen-${lessonSlug}`,
        title: "Luyện nhanh",
        summary: "",
        grade: "9",
        topic: "dai-so",
        difficulty: "co-ban",
        durationMinutes: 5,
        lessonSlug,
        questions,
      }) satisfies Quiz,
    [lessonSlug, questions],
  );
  const report = checked ? gradeQuiz(pseudoQuiz, answers) : null;

  function submit() {
    const result = gradeQuiz(pseudoQuiz, answers);
    const repo = getLearningRepository();
    const current = repo.getLessonProgress(lessonSlug);
    repo.saveLessonProgress({
      lessonSlug,
      completedAt: current?.completedAt ?? (result.correctCount === result.totalCount ? new Date().toISOString() : null),
      quickCheckCorrect: result.correctCount,
      quickCheckTotal: result.totalCount,
      updatedAt: new Date().toISOString(),
    });
    setChecked(true);
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const result = report?.results.find((item) => item.questionId === question.id);
        return (
          <fieldset key={question.id} className="rounded-2xl border border-[#d0dcf0] bg-white p-4">
            <legend className="px-1 text-sm font-bold text-[#153565]">Câu {index + 1}</legend>
            <div className="mt-2 text-[16px] leading-7">
              <RichText text={question.prompt} />
            </div>
            {question.type === "mcq" ? (
              <div className="mt-3 space-y-2">
                {question.choices.map((choice) => {
                  const selected = answers[question.id] === choice.id;
                  const show = Boolean(result);
                  const correct = show && choice.id === question.correctChoiceId;
                  const wrong = show && selected && !result?.correct;
                  return (
                    <label
                      key={choice.id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2",
                        correct && "border-emerald-400 bg-emerald-50",
                        wrong && "border-rose-400 bg-rose-50",
                        !show && selected && "border-[#1482c0] bg-[#e7f3fb]",
                        !show && !selected && "border-[#d0dcf0]",
                      )}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={choice.id}
                        checked={selected}
                        onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))}
                        className="mt-1"
                        disabled={checked}
                      />
                      <span className="font-bold text-[#153565]">{choice.id}.</span>
                      <RichText text={choice.text} />
                    </label>
                  );
                })}
              </div>
            ) : (
              <input
                className="mt-3 h-10 w-full rounded-lg border border-[#c5d4ea] px-3"
                inputMode="decimal"
                placeholder="Nhập số, ví dụ 4,8"
                value={answers[question.id] ?? ""}
                disabled={checked}
                onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
              />
            )}
            {result ? (
              <div className="mt-3 text-sm leading-6">
                <p className={result.correct ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
                  {result.correct ? "Đúng." : "Chưa đúng."}
                </p>
                <RichParagraphs text={question.solution} className="mt-1" />
              </div>
            ) : null}
          </fieldset>
        );
      })}
      <div className="flex flex-wrap gap-3">
        {!checked ? (
          <Button className="bg-[#ff792f] text-white hover:bg-[#e56a24]" onClick={submit}>
            Kiểm tra câu luyện nhanh
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              setChecked(false);
              setAnswers({});
            }}
          >
            Làm lại
          </Button>
        )}
        {report ? (
          <p className="self-center text-sm font-semibold text-[#153565]">
            {report.correctCount}/{report.totalCount} câu đúng
            {report.correctCount === report.totalCount ? " · Đã đánh dấu học xong" : ""}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function QuizLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={cn(buttonVariants(), "bg-[#ff792f] text-white hover:bg-[#e56a24]")}>
      {label}
    </Link>
  );
}
