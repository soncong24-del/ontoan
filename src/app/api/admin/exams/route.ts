import { NextResponse } from "next/server";
import { listAdminQuizzes, saveExam } from "@/lib/server/exams";
import { requireAdmin } from "@/lib/server/session";
import { validateQuiz } from "@/lib/server/validate-quiz";
import type { Quiz } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Không có quyền quản trị." }, { status: 403 });
  const exams = await listAdminQuizzes();
  return NextResponse.json({
    exams: exams.map((item) => ({
      slug: item.quiz.slug,
      title: item.quiz.title,
      grade: item.quiz.grade,
      examType: item.quiz.examType ?? null,
      published: item.published,
      overridden: item.overridden,
      questionCount: item.quiz.questions.length,
    })),
  });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Không có quyền quản trị." }, { status: 403 });
  const body = (await request.json()) as { quiz?: Quiz; published?: boolean };
  if (!body.quiz) return NextResponse.json({ error: "Thiếu đề." }, { status: 400 });
  const error = validateQuiz(body.quiz);
  if (error) return NextResponse.json({ error }, { status: 400 });
  await saveExam(body.quiz, body.published !== false);
  return NextResponse.json({ ok: true });
}
