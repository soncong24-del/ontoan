"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import { Chip, SearchField } from "@/components/catalog/filters";
import { Badge } from "@/components/ui/badge";
import { useLessonProgressList } from "@/lib/storage/use-learning-store";
import { gradeLabel, GRADES, topicLabel, TOPICS } from "@/lib/labels";
import { pluralMinutes } from "@/lib/format";
import { includesFold } from "@/lib/text";
import type { LessonSummary } from "@/types";

export function LessonCatalog({ lessons }: { lessons: LessonSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const progress = useLessonProgressList();
  const grade = searchParams.get("khoi") ?? "all";
  const topic = searchParams.get("chu-de") ?? "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    return lessons.filter((lesson) => {
      if (grade !== "all" && lesson.grade !== grade) return false;
      if (topic !== "all" && lesson.topic !== topic) return false;
      if (!query.trim()) return true;
      return includesFold(`${lesson.title} ${lesson.summary} ${topicLabel(lesson.topic)}`, query);
    });
  }, [lessons, grade, topic, query]);

  return (
    <div className="space-y-5">
      <SearchField value={query} onChange={setQuery} placeholder="Tìm bài giảng, ví dụ: Vi-ét, tích phân" />
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={grade === "all"} onClick={() => setFilter("khoi", "all")}>Tất cả lớp</Chip>
        {GRADES.map((item) => (
          <Chip key={item.id} active={grade === item.id} onClick={() => setFilter("khoi", item.id)}>
            {item.label}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={topic === "all"} onClick={() => setFilter("chu-de", "all")}>Mọi chủ đề</Chip>
        {TOPICS.map((item) => (
          <Chip key={item.id} active={topic === item.id} onClick={() => setFilter("chu-de", item.id)}>
            {item.label}
          </Chip>
        ))}
      </div>
      <p className="text-sm text-[#5a6173]">{filtered.length} bài giảng</p>
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d0dcf0] bg-white px-4 py-10 text-center">
          <p className="font-semibold text-[#153565]">Không có bài phù hợp</p>
          <p className="mt-1 text-sm text-[#5a6173]">Thử bỏ bớt bộ lọc hoặc đổi từ khóa. Có thể gõ không dấu.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((lesson) => {
            const done = progress.some((item) => item.lessonSlug === lesson.slug && item.completedAt);
            return (
              <Link
                key={lesson.slug}
                href={`/bai-giang/${lesson.slug}`}
                className="flex flex-col rounded-2xl border border-[#d0dcf0] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{gradeLabel(lesson.grade)}</Badge>
                  <Badge variant="outline">{topicLabel(lesson.topic)}</Badge>
                  <span className="ml-auto rounded-full bg-[#f4f8fb] px-2 py-0.5 text-xs font-semibold text-[#153565] ring-1 ring-[#d0dcf0]">
                    {done ? "Đã học" : "Chưa học"}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-[#153565]">{lesson.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5a6173]">{lesson.summary}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#1482c0]">
                  <Clock className="size-4" />
                  {pluralMinutes(lesson.durationMinutes)} đọc
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
