import type { Metadata } from "next";
import { ExamEditor } from "@/components/admin/exam-editor";
import { Shell } from "@/components/site/shell";
import type { Quiz } from "@/types";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Thêm đề thi mới trên Ôn Toán"),
  description: fitDescription("Thêm đề thi học kì hoặc đề thi thử THPT vào thư viện Ôn Toán. Trang quản trị, không dành cho học sinh."),
  path: "/admin/de/moi",
  noindex: true,
});

const blank: Quiz = {
  slug: "",
  title: "",
  summary: "",
  grade: "12",
  topic: "giai-tich",
  difficulty: "van-dung",
  durationMinutes: 45,
  lessonSlug: "nguyen-ham-va-tich-phan",
  examType: "giua-ki-1",
  examFormat: "standard",
  questions: [],
};

export default function NewExamPage() {
  return (
    <Shell>
      <ExamEditor initial={blank} isNew />
    </Shell>
  );
}
