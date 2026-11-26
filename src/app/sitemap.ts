import type { MetadataRoute } from "next";
import { getCourses, getLessons, getQuizzes } from "@/data";
import { GRADES } from "@/lib/labels";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ontoan.vn";
  const now = new Date();
  const fixed = ["", "/bai-giang", "/kiem-tra", "/tien-do", "/khoa-hoc"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
  }));
  return [
    ...fixed,
    ...GRADES.map((grade) => ({ url: `${base}/lop/${grade.id}`, lastModified: now })),
    ...getLessons().map((lesson) => ({
      url: `${base}/bai-giang/${lesson.slug}`,
      lastModified: new Date(lesson.updatedAt),
    })),
    ...getQuizzes().map((quiz) => ({ url: `${base}/kiem-tra/${quiz.slug}`, lastModified: now })),
    ...getCourses().map((course) => ({ url: `${base}/khoa-hoc/${course.slug}`, lastModified: now })),
  ];
}
