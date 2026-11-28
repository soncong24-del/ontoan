"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import { Chip, SearchField } from "@/components/catalog/filters";
import { MasteryBadge } from "@/components/site/mastery-badge";
import { Badge } from "@/components/ui/badge";
import { useQuizAttempts } from "@/lib/storage/use-learning-store";
import { formatScore, pluralMinutes } from "@/lib/format";
import { DIFFICULTIES, difficultyLabel, EXAM_TYPES, examTypeLabel, GRADES, gradeLabel, topicLabel } from "@/lib/labels";
import { bestScore, masteryFromScore } from "@/lib/mastery";
import { includesFold } from "@/lib/text";
import type { QuizSummary } from "@/types";

const DURATIONS = [
  { id: "all", label: "Mọi thời lượng" },
  { id: "20", label: "Đến 20 phút" },
  { id: "30", label: "Đến 30 phút" },
  { id: "31", label: "Trên 30 phút" },
];

export function QuizCatalog({ quizzes }: { quizzes: QuizSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const attempts = useQuizAttempts();
  const grade = searchParams.get("khoi") ?? "all";
  const difficulty = searchParams.get("do-kho") ?? "all";
  const duration = searchParams.get("thoi-luong") ?? "all";
  const examType = searchParams.get("loai") ?? "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    return quizzes.filter((quiz) => {
      if (grade !== "all" && quiz.grade !== grade) return false;
      if (examType !== "all" && quiz.examType !== examType) return false;
      if (difficulty !== "all" && quiz.difficulty !== difficulty) return false;
      if (duration === "20" && quiz.durationMinutes > 20) return false;
      if (duration === "30" && quiz.durationMinutes > 30) return false;
      if (duration === "31" && quiz.durationMinutes <= 30) return false;
      if (!query.trim()) return true;
      return includesFold(`${quiz.title} ${quiz.summary}`, query);
    });
  }, [quizzes, grade, difficulty, duration, examType, query]);

  return (
    <div className="space-y-5">
      <SearchField value={query} onChange={setQuery} placeholder="Tìm đề, ví dụ: đạo hàm, xác suất" />
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={grade === "all"} onClick={() => setFilter("khoi", "all")}>Tất cả lớp</Chip>
        {GRADES.map((item) => (
          <Chip key={item.id} active={grade === item.id} onClick={() => setFilter("khoi", item.id)}>
            {item.label}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={difficulty === "all"} onClick={() => setFilter("do-kho", "all")}>Mọi mức độ</Chip>
        {DIFFICULTIES.map((item) => (
          <Chip key={item.id} active={difficulty === item.id} onClick={() => setFilter("do-kho", item.id)}>
            {item.label}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={examType === "all"} onClick={() => setFilter("loai", "all")}>Mọi loại đề</Chip>
        {EXAM_TYPES.map((item) => (
          <Chip key={item.id} active={examType === item.id} onClick={() => setFilter("loai", item.id)}>
            {item.label}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DURATIONS.map((item) => (
          <Chip key={item.id} active={duration === item.id} onClick={() => setFilter("thoi-luong", item.id)}>
            {item.label}
          </Chip>
        ))}
      </div>
      <p className="text-sm text-[#5a6173]">{filtered.length} đề</p>
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d0dcf0] bg-white px-4 py-10 text-center">
          <p className="font-semibold text-[#153565]">Không có đề phù hợp</p>
          <p className="mt-1 text-sm text-[#5a6173]">Đổi lớp, mức độ hoặc thời lượng để xem đề khác.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((quiz) => {
            const scores = attempts.filter((item) => item.quizSlug === quiz.slug).map((item) => item.score);
            const best = bestScore(scores);
            return (
              <Link
                key={quiz.slug}
                href={`/kiem-tra/${quiz.slug}`}
                className="flex flex-col rounded-2xl border border-[#d0dcf0] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{gradeLabel(quiz.grade)}</Badge>
                  <Badge variant="outline">{difficultyLabel(quiz.difficulty)}</Badge>
                  <Badge variant="outline">{examTypeLabel(quiz.examType)}</Badge>
                  <MasteryBadge id={masteryFromScore(best)} className="ml-auto" />
                </div>
                <h2 className="mt-3 text-lg font-bold text-[#153565]">{quiz.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5a6173]">{quiz.summary}</p>
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#1482c0]">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Clock className="size-4" />
                    {pluralMinutes(quiz.durationMinutes)}
                  </span>
                  <span>{quiz.questionCount} câu</span>
                  <span>{topicLabel(quiz.topic)}</span>
                  {best !== null ? <span className="font-semibold">Cao nhất {formatScore(best)}/10</span> : null}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
