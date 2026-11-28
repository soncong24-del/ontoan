import type { Metadata } from "next";
import { Suspense } from "react";
import { LessonCatalog } from "@/components/catalog/lesson-catalog";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getLessonSummaries } from "@/data";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Bài giảng ôn thi toán lớp 10, 11, 12"),
  description: fitDescription(
    "Bài giảng ôn thi toán miễn phí cho lớp 10, 11 và 12, có công thức, ví dụ và lời giải từng bước. Học xong làm đề thi học kì.",
  ),
  path: "/bai-giang",
});

export default function LessonsPage() {
  const lessons = getLessonSummaries();
  return (
    <Shell>
      <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { label: "Bài giảng" }]} />
      <h1 className="text-3xl font-bold text-[#153565]">Bài giảng miễn phí</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5a6173]">
        Lọc theo lớp và chủ đề. Mỗi bài có mục tiêu, kiến thức trọng tâm, ví dụ mở được lời giải và phần luyện nhanh.
      </p>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-[#5a6173]">Đang mở danh sách…</p>}>
          <LessonCatalog lessons={lessons} />
        </Suspense>
      </div>
    </Shell>
  );
}
