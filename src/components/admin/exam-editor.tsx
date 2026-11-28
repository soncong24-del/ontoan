"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { RichText } from "@/components/math/rich-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EXAM_TYPES, GRADES, TOPICS } from "@/lib/labels";
import type { ChoiceId, Question, Quiz } from "@/types";

const CHOICES: ChoiceId[] = ["A", "B", "C", "D"];

function blankQuestion(index: number): Question {
  return {
    id: `q${index}`,
    type: "mcq",
    prompt: "",
    solution: "",
    choices: CHOICES.map((id) => ({ id, text: "" })),
    correctChoiceId: "A",
  };
}

export function ExamEditor({
  initial,
  isNew,
  initialPublished = true,
}: {
  initial: Quiz;
  isNew: boolean;
  initialPublished?: boolean;
}) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz>(initial);
  const [published, setPublished] = useState(initialPublished);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  function updateQuestion(index: number, next: Question) {
    setQuiz((current) => ({
      ...current,
      questions: current.questions.map((question, questionIndex) => (questionIndex === index ? next : question)),
    }));
  }

  async function save() {
    setPending(true);
    setError("");
    setMessage("");
    const response = await fetch(isNew ? "/api/admin/exams" : `/api/admin/exams/${quiz.slug}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz, published }),
    });
    const data = (await response.json()) as { error?: string };
    setPending(false);
    if (!response.ok) {
      setError(data.error ?? "Không lưu được.");
      return;
    }
    setMessage("Đã lưu. Học sinh thấy đề này ngay trên trang kiểm tra nếu đang ở trạng thái hiện.");
    if (isNew) router.replace(`/admin/de/${quiz.slug}`);
    router.refresh();
  }

  async function remove() {
    if (!confirm("Ẩn đề này khỏi trang học sinh?")) return;
    await fetch(`/api/admin/exams/${quiz.slug}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  async function upload(index: number, file: File) {
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    const data = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !data.url) {
      setError(data.error ?? "Không tải được ảnh.");
      return;
    }
    updateQuestion(index, { ...quiz.questions[index], imageUrl: data.url });
  }

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm font-semibold text-[#1482c0]">
        ← Danh sách đề
      </Link>
      <h1 className="text-3xl font-bold text-[#153565]">{isNew ? "Thêm đề" : "Sửa đề"}</h1>
      <div className="grid gap-4 rounded-3xl border border-[#d0dcf0] bg-white p-4 md:grid-cols-2">
        <Field label="Tên đề">
          <Input value={quiz.title} onChange={(event) => setQuiz({ ...quiz, title: event.target.value })} />
        </Field>
        <Field label="Mã đề (đường dẫn)">
          <Input
            value={quiz.slug}
            disabled={!isNew}
            onChange={(event) => setQuiz({ ...quiz, slug: event.target.value.trim().toLowerCase() })}
          />
        </Field>
        <Field label="Khối">
          <select className="h-10 rounded-lg border px-3" value={quiz.grade} onChange={(event) => setQuiz({ ...quiz, grade: event.target.value as Quiz["grade"] })}>
            {GRADES.map((grade) => (
              <option key={grade.id} value={grade.id}>{grade.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Loại đề">
          <select className="h-10 rounded-lg border px-3" value={quiz.examType ?? "on-tap"} onChange={(event) => setQuiz({ ...quiz, examType: event.target.value as Quiz["examType"] })}>
            {EXAM_TYPES.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Chủ đề">
          <select className="h-10 rounded-lg border px-3" value={quiz.topic} onChange={(event) => setQuiz({ ...quiz, topic: event.target.value as Quiz["topic"] })}>
            {TOPICS.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Số phút">
          <Input type="number" min={1} value={quiz.durationMinutes} onChange={(event) => setQuiz({ ...quiz, durationMinutes: Number(event.target.value) })} />
        </Field>
        <Field label="Mô tả ngắn" className="md:col-span-2">
          <Textarea value={quiz.summary} onChange={(event) => setQuiz({ ...quiz, summary: event.target.value })} />
        </Field>
        <Field label="Video YouTube của cả đề" className="md:col-span-2">
          <Input
            placeholder="https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
            value={quiz.videoUrl ?? ""}
            onChange={(event) => setQuiz({ ...quiz, videoUrl: event.target.value })}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#153565]">
          <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} />
          Hiện đề cho học sinh
        </label>
      </div>

      {quiz.questions.map((question, index) => (
        <article key={question.id} className="space-y-3 rounded-3xl border border-[#d0dcf0] bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-bold text-[#153565]">Câu {index + 1}</h2>
            <div className="flex gap-2">
              <select
                className="h-10 rounded-lg border px-2 text-sm"
                value={question.type}
                onChange={(event) => updateQuestion(index, changeType(question, event.target.value as Question["type"], index))}
              >
                <option value="mcq">Trắc nghiệm A B C D</option>
                <option value="true-false">Đúng / sai, 4 ý</option>
                <option value="numeric">Trả lời ngắn</option>
              </select>
              <Button variant="outline" onClick={() => setQuiz({ ...quiz, questions: quiz.questions.filter((_, i) => i !== index) })}>
                Xóa câu
              </Button>
            </div>
          </div>
          <Field label="Đề bài (có thể gõ $công thức$)">
            <Textarea value={question.prompt} onChange={(event) => updateQuestion(index, { ...question, prompt: event.target.value })} />
            <Preview text={question.prompt} />
          </Field>
          <Field label="Lời giải">
            <Textarea value={question.solution} onChange={(event) => updateQuestion(index, { ...question, solution: event.target.value })} />
            <Preview text={question.solution} />
          </Field>
          <Field label="Video YouTube của câu này">
            <Input value={question.videoUrl ?? ""} onChange={(event) => updateQuestion(index, { ...question, videoUrl: event.target.value })} />
          </Field>
          <Field label="Ảnh minh họa">
            <Input value={question.imageUrl ?? ""} placeholder="Dán URL hoặc tải file bên dưới" onChange={(event) => updateQuestion(index, { ...question, imageUrl: event.target.value })} />
            <input
              type="file"
              accept="image/*"
              className="mt-2 text-sm"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(index, file);
              }}
            />
            {question.imageUrl ? (
              // Ảnh do giáo viên tải lên, đường dẫn động nên không đi qua trình tối ưu ảnh.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={question.imageUrl} alt="" className="mt-2 max-h-40 rounded-xl" />
            ) : null}
          </Field>
          {question.type === "mcq" ? (
            <div className="space-y-2">
              {question.choices.map((choice) => (
                <label key={choice.id} className="flex items-start gap-2">
                  <input
                    type="radio"
                    name={`dung-${question.id}`}
                    checked={question.correctChoiceId === choice.id}
                    onChange={() => updateQuestion(index, { ...question, correctChoiceId: choice.id })}
                  />
                  <span className="pt-2 font-bold">{choice.id}.</span>
                  <Textarea
                    value={choice.text}
                    onChange={(event) =>
                      updateQuestion(index, {
                        ...question,
                        choices: question.choices.map((item) => (item.id === choice.id ? { ...item, text: event.target.value } : item)),
                      })
                    }
                  />
                </label>
              ))}
            </div>
          ) : null}
          {question.type === "true-false" ? (
            <div className="space-y-2">
              {question.statements.map((statement, statementIndex) => (
                <div key={statement.id} className="grid gap-2 sm:grid-cols-[1fr_auto]">
                  <Textarea
                    value={statement.text}
                    onChange={(event) => {
                      const statements = question.statements.map((item, itemIndex) =>
                        itemIndex === statementIndex ? { ...item, text: event.target.value } : item,
                      );
                      updateQuestion(index, { ...question, statements });
                    }}
                  />
                  <select
                    className="h-10 rounded-lg border px-2"
                    value={statement.correct ? "dung" : "sai"}
                    onChange={(event) => {
                      const statements = question.statements.map((item, itemIndex) =>
                        itemIndex === statementIndex ? { ...item, correct: event.target.value === "dung" } : item,
                      );
                      updateQuestion(index, { ...question, statements });
                    }}
                  >
                    <option value="dung">Đúng</option>
                    <option value="sai">Sai</option>
                  </select>
                </div>
              ))}
            </div>
          ) : null}
          {question.type === "numeric" ? (
            <Field label="Đáp số">
              <Input
                value={String(question.correctValue)}
                onChange={(event) => updateQuestion(index, { ...question, correctValue: Number(event.target.value.replace(",", ".")) })}
              />
            </Field>
          ) : null}
        </article>
      ))}

      <Button
        variant="outline"
        onClick={() => setQuiz({ ...quiz, questions: [...quiz.questions, blankQuestion(quiz.questions.length + 1)] })}
      >
        Thêm câu
      </Button>
      {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      {message ? <p className="text-sm font-medium text-emerald-700">{message}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button disabled={pending} className="bg-[#ff792f] text-white hover:bg-[#e56a24]" onClick={() => void save()}>
          {pending ? "Đang lưu…" : "Lưu đề"}
        </Button>
        {!isNew ? (
          <Button variant="outline" onClick={() => void remove()}>
            Ẩn đề
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={className}>
      <Label className="mb-1">{label}</Label>
      {children}
    </label>
  );
}

function Preview({ text }: { text: string }) {
  if (!text.trim()) return null;
  return (
    <div className="mt-2 rounded-xl bg-[#f4f8fb] px-3 py-2 text-sm">
      <RichText text={text} />
    </div>
  );
}

function changeType(question: Question, type: Question["type"], index: number): Question {
  const base = { id: question.id || `q${index + 1}`, prompt: question.prompt, solution: question.solution, videoUrl: question.videoUrl, imageUrl: question.imageUrl };
  if (type === "mcq") {
    return { ...base, type: "mcq", choices: CHOICES.map((id) => ({ id, text: "" })), correctChoiceId: "A" };
  }
  if (type === "true-false") {
    return {
      ...base,
      type: "true-false",
      statements: (["a", "b", "c", "d"] as const).map((id) => ({ id, text: "", correct: true })),
    };
  }
  return { ...base, type: "numeric", correctValue: 0 };
}
