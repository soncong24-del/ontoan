import type { Metadata } from "next";
import { ExamEditor } from "@/components/admin/exam-editor";
import { Shell } from "@/components/site/shell";
import type { Quiz } from "@/types";

export const metadata: Metadata = { title: "Thêm đề" };

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
