import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { getCourses, getLessons } from "@/data";
import { GRADES } from "@/lib/labels";
import { SITE_URL } from "@/lib/seo";
import { listPublicQuizzes } from "@/lib/server/exams";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const now = new Date();
  const quizzes = await listPublicQuizzes();
  const fixed = ["/", "/bai-giang", "/kiem-tra", "/khoa-hoc"];
  return [
    ...fixed.map((path) => ({
      url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
      lastModified: now,
    })),
    ...GRADES.map((grade) => ({ url: `${SITE_URL}/lop/${grade.id}`, lastModified: now })),
    ...getLessons().map((lesson) => ({
      url: `${SITE_URL}/bai-giang/${lesson.slug}`,
      lastModified: new Date(lesson.updatedAt),
    })),
    ...quizzes.map((quiz) => ({ url: `${SITE_URL}/kiem-tra/${quiz.slug}`, lastModified: now })),
    ...getCourses().map((course) => ({ url: `${SITE_URL}/khoa-hoc/${course.slug}`, lastModified: now })),
  ];
}
