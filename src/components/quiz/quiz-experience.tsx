"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Flag } from "lucide-react";
import { QuestionBoundary } from "@/components/quiz/question-boundary";
import { QuizResults } from "@/components/quiz/quiz-results";
import { RichText } from "@/components/math/rich-text";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatClock, pluralMinutes } from "@/lib/format";
import { gradeQuiz } from "@/lib/grading";
import { difficultyLabel, gradeLabel } from "@/lib/labels";
import { getLearningRepository } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { Quiz, QuizAttempt, QuizMode } from "@/types";

export function QuizExperience({ quiz }: { quiz: Quiz }) {
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"intro" | "running" | "results">("intro");
  const [mode, setMode] = useState<QuizMode>("timed");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(quiz.durationMinutes * 60);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [missing, setMissing] = useState(false);
  const submittedRef = useRef(false);
  const answersRef = useRef(answers);
  const flaggedRef = useRef(flagged);
  const startedRef = useRef(startedAt);
  const modeRef = useRef(mode);
  answersRef.current = answers;
  flaggedRef.current = flagged;
  startedRef.current = startedAt;
  modeRef.current = mode;

  const commit = useCallback(
    (submittedBy: "user" | "timer") => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      const currentAnswers = answersRef.current;
      const report = gradeQuiz(quiz, currentAnswers);
      const finished = new Date();
      const started = startedRef.current ? new Date(startedRef.current) : finished;
      const durationSeconds = Math.max(1, Math.round((finished.getTime() - started.getTime()) / 1000));
      const next: QuizAttempt = {
        id: globalThis.crypto?.randomUUID?.() ?? `lan-${Date.now()}`,
        quizSlug: quiz.slug,
        mode: modeRef.current,
        startedAt: started.toISOString(),
        submittedAt: finished.toISOString(),
        durationSeconds,
        submittedBy,
        answers: currentAnswers,
        flagged: flaggedRef.current,
        score: report.score,
        correctCount: report.correctCount,
        totalCount: report.totalCount,
        results: report.results,
      };
      const repo = getLearningRepository();
      repo.saveAttempt(next);
      repo.clearDraft(quiz.slug);
      void fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      setAttempt(next);
      setConfirmOpen(false);
      setPhase("results");
      window.history.replaceState(null, "", `/kiem-tra/${quiz.slug}?lan=${next.id}`);
    },
    [quiz],
  );

  useEffect(() => {
    const repo = getLearningRepository();
    const params = new URLSearchParams(window.location.search);
    const attemptId = params.get("lan");
    let cancelled = false;
    async function boot() {
      if (attemptId) {
        const saved = repo.getAttempt(attemptId);
        if (saved && saved.quizSlug === quiz.slug) {
          setAttempt(saved);
          setPhase("results");
          setReady(true);
          return;
        }
        const response = await fetch("/api/attempts");
        const data = (await response.json()) as { attempts?: QuizAttempt[] };
        const remote = data.attempts?.find((item) => item.id === attemptId && item.quizSlug === quiz.slug);
        if (cancelled) return;
        if (remote) {
          setAttempt(remote);
          setPhase("results");
          setReady(true);
          return;
        }
        setMissing(true);
      }
    const draft = repo.getDraft(quiz.slug);
    if (draft) {
      setMode(draft.mode);
      setAnswers(draft.answers ?? {});
      setFlagged(draft.flagged ?? []);
      setIndex(Math.min(draft.index ?? 0, quiz.questions.length - 1));
      setStartedAt(draft.startedAt);
      const end = draft.endsAt ? Date.parse(draft.endsAt) : null;
      setEndsAt(Number.isNaN(end) ? null : end);
      if (end && !Number.isNaN(end)) {
        setRemaining(Math.max(0, Math.round((end - Date.now()) / 1000)));
      }
      setPhase("running");
    }
      if (!cancelled) setReady(true);
    }
    void boot();
    return () => {
      cancelled = true;
    };
  }, [quiz.slug, quiz.questions.length]);

  useEffect(() => {
    if (phase !== "running" || mode !== "timed" || endsAt === null) return;
    const tick = () => {
      const left = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) commit("timer");
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [phase, mode, endsAt, commit]);

  useEffect(() => {
    if (!ready || phase !== "running" || !startedAt) return;
    getLearningRepository().saveDraft({
      quizSlug: quiz.slug,
      mode,
      startedAt,
      endsAt: endsAt ? new Date(endsAt).toISOString() : null,
      answers,
      flagged,
      index,
    });
  }, [ready, phase, startedAt, endsAt, answers, flagged, index, mode, quiz.slug]);

  useEffect(() => {
    if (phase !== "running") return;
    const onLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [phase]);

  useEffect(() => {
    if (phase !== "running") return;
    document.getElementById("de-cau-hoi")?.focus();
  }, [index, phase]);

  function start(nextMode: QuizMode) {
    const now = new Date();
    const end = nextMode === "timed" ? now.getTime() + quiz.durationMinutes * 60 * 1000 : null;
    submittedRef.current = false;
    setMode(nextMode);
    setStartedAt(now.toISOString());
    setEndsAt(end);
    setRemaining(quiz.durationMinutes * 60);
    setAnswers({});
    setFlagged([]);
    setIndex(0);
    setAttempt(null);
    setMissing(false);
    setPhase("running");
  }

  function retry() {
    submittedRef.current = false;
    setAttempt(null);
    setPhase("intro");
    setAnswers({});
    setFlagged([]);
    setIndex(0);
    window.history.replaceState(null, "", `/kiem-tra/${quiz.slug}`);
  }

  if (!ready) {
    return <p className="text-sm text-[#5a6173]">Đang mở đề…</p>;
  }

  if (phase === "results" && attempt) {
    return <QuizResults quiz={quiz} attempt={attempt} onRetry={retry} />;
  }

  if (phase === "intro") {
    return (
      <section className="rounded-3xl border border-[#d0dcf0] bg-white p-5 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-[#1482c0]">
          {gradeLabel(quiz.grade)} · {difficultyLabel(quiz.difficulty)}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#153565]">{quiz.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#5a6173]">{quiz.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-[#153565]">
          <li className="rounded-full bg-[#f4f8fb] px-3 py-1">{quiz.questions.length} câu</li>
          <li className="rounded-full bg-[#f4f8fb] px-3 py-1">{pluralMinutes(quiz.durationMinutes)}</li>
          <li className="rounded-full bg-[#f4f8fb] px-3 py-1">Thang điểm 10</li>
        </ul>
        {missing ? (
          <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Không thấy lần làm này trên máy bạn. Hãy làm đề mới.
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="bg-[#ff792f] text-white hover:bg-[#e56a24]" onClick={() => start("timed")}>
            Làm bài có tính giờ
          </Button>
          <Button variant="outline" onClick={() => start("practice")}>
            Luyện tập không tính giờ
          </Button>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#5a6173]">
          Có tính giờ sẽ đếm ngược và tự nộp khi hết giờ. Luyện tập vẫn được chấm và lưu kết quả. Bài đang làm được giữ trong phiên trình duyệt này nếu bạn tải lại trang.
        </p>
      </section>
    );
  }

  const question = quiz.questions[index];
  if (!question) {
    return <p className="text-sm text-[#5a6173]">Không thấy câu hỏi này trong đề.</p>;
  }
  const answeredCount = quiz.questions.filter((item) => (answers[item.id] ?? "").trim()).length;
  const blankCount = quiz.questions.length - answeredCount;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
      <section className="rounded-3xl border border-[#d0dcf0] bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6eef7] pb-3">
          <p className="text-sm font-bold text-[#153565]">
            Câu {index + 1}/{quiz.questions.length}
          </p>
          <p
            className={cn(
              "rounded-full px-3 py-1 text-sm font-bold",
              mode === "timed" && remaining < 60 ? "bg-rose-50 text-rose-700" : "bg-[#e7f3fb] text-[#1482c0]",
            )}
            aria-label={mode === "timed" ? `Còn ${formatClock(remaining)}` : "Không tính giờ"}
          >
            {mode === "timed" ? formatClock(remaining) : "Không tính giờ"}
          </p>
        </div>
        <QuestionBoundary key={question.id} label={`câu ${index + 1}`}>
        <h2 id="de-cau-hoi" tabIndex={-1} className="mt-4 text-[18px] leading-8 font-medium text-[#1e2f41] outline-none">
          <RichText text={question.prompt} />
        </h2>
        {question.type === "mcq" ? (
          <fieldset className="mt-4 space-y-2">
            <legend className="sr-only">Chọn một đáp án</legend>
            {question.choices.map((choice) => {
              const selected = answers[question.id] === choice.id;
              return (
                <label
                  key={choice.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3",
                    selected ? "border-[#1482c0] bg-[#e7f3fb]" : "border-[#d0dcf0] hover:bg-[#f4f8fb]",
                  )}
                >
                  <input
                    type="radio"
                    className="mt-1"
                    name={question.id}
                    value={choice.id}
                    checked={selected}
                    onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))}
                  />
                  <span className="font-bold text-[#153565]">{choice.id}.</span>
                  <span className="text-[16px] leading-7">
                    <RichText text={choice.text} />
                  </span>
                </label>
              );
            })}
          </fieldset>
        ) : question.type === "true-false" ? (
          <fieldset className="mt-4 space-y-3">
            <legend className="text-sm font-semibold text-[#153565]">Chọn Đúng hoặc Sai cho từng ý</legend>
            {question.statements.map((statement, statementIndex) => {
              const marks = (answers[question.id] ?? "").split(",");
              const current = marks[statementIndex] ?? "";
              return (
                <div key={statement.id} className="rounded-2xl border border-[#d0dcf0] p-3">
                  <p>
                    <span className="font-bold">{statement.id}.</span> <RichText text={statement.text} />
                  </p>
                  <div className="mt-2 flex gap-3 text-sm">
                    {["Đ", "S"].map((mark) => (
                      <label key={mark} className="inline-flex items-center gap-1">
                        <input
                          type="radio"
                          name={`${question.id}-${statement.id}`}
                          checked={current === mark}
                          onChange={() => {
                            const next = question.statements.map((_, index) => marks[index] ?? "");
                            next[statementIndex] = mark;
                            setAnswers((state) => ({ ...state, [question.id]: next.join(",") }));
                          }}
                        />
                        {mark === "Đ" ? "Đúng" : "Sai"}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </fieldset>
        ) : (
          <div className="mt-4">
            <label htmlFor="dap-so" className="text-sm font-semibold text-[#153565]">
              Đáp số
            </label>
            <Input
              id="dap-so"
              className="mt-2 bg-white"
              inputMode="decimal"
              placeholder="Nhập số. Dấu phẩy hoặc dấu chấm đều được"
              value={answers[question.id] ?? ""}
              onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
            />
          </div>
        )}
        </QuestionBoundary>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>
            Câu trước
          </Button>
          <Button
            variant={flagged.includes(question.id) ? "secondary" : "outline"}
            onClick={() =>
              setFlagged((current) =>
                current.includes(question.id)
                  ? current.filter((id) => id !== question.id)
                  : [...current, question.id],
              )
            }
          >
            <Flag className="size-4" />
            Đánh dấu xem lại
          </Button>
          {index < quiz.questions.length - 1 ? (
            <Button onClick={() => setIndex((value) => Math.min(quiz.questions.length - 1, value + 1))}>
              Câu sau
            </Button>
          ) : (
            <Button className="bg-[#ff792f] text-white hover:bg-[#e56a24]" onClick={() => setConfirmOpen(true)}>
              Nộp bài
            </Button>
          )}
          <button
            type="button"
            className="ml-auto text-sm font-semibold text-[#ff792f]"
            onClick={() => setConfirmOpen(true)}
          >
            Nộp bài ({answeredCount}/{quiz.questions.length})
          </button>
        </div>
      </section>

      <aside className="h-fit rounded-3xl border border-[#d0dcf0] bg-white p-4 lg:sticky lg:top-32">
        <p className="text-sm font-bold text-[#153565]">Phiếu câu</p>
        <p className="mt-1 text-xs text-[#5a6173]">
          {answeredCount} đã làm · {flagged.length} đánh dấu
        </p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {quiz.questions.map((item, itemIndex) => {
            const done = Boolean((answers[item.id] ?? "").trim());
            const marked = flagged.includes(item.id);
            const current = itemIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(itemIndex)}
                aria-label={`Câu ${itemIndex + 1}${done ? ", đã trả lời" : ", chưa trả lời"}${marked ? ", đã đánh dấu" : ""}`}
                className={cn(
                  "relative h-10 rounded-lg text-sm font-bold",
                  current && "ring-2 ring-[#1482c0]",
                  done ? "bg-[#1482c0] text-white" : "bg-[#f4f8fb] text-[#153565]",
                )}
              >
                {itemIndex + 1}
                {marked ? <span className="absolute top-1 right-1 size-1.5 rounded-full bg-[#ff792f]" /> : null}
              </button>
            );
          })}
        </div>
      </aside>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nộp bài?</DialogTitle>
            <DialogDescription>
              {blankCount > 0
                ? `Bạn còn ${blankCount} câu chưa làm. Những câu trống được tính là sai.`
                : "Bạn đã trả lời hết các câu. Hệ thống chấm ngay sau khi nộp."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Làm tiếp
            </Button>
            <Button className="bg-[#ff792f] text-white hover:bg-[#e56a24]" onClick={() => commit("user")}>
              Nộp bài
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
