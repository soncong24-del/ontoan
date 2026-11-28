import { NextResponse } from "next/server";
import { getQuizzes } from "@/data";
import { hideExam, listExamRecords, saveExam } from "@/lib/server/exams";
import { requireAdmin } from "@/lib/server/session";
import type { Quiz } from "@/types";
import { validateQuiz } from "@/lib/server/validate-quiz";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Không có quyền quản trị." }, { status: 403 });
  const { slug } = await params;
  const stored = (await listExamRecords()).find((item) => item.quiz.slug === slug && !item.hidden);
  if (stored) return NextResponse.json({ quiz: stored.quiz, published: stored.published });
  const builtin = getQuizzes().find((quiz) => quiz.slug === slug);
  if (!builtin) return NextResponse.json({ error: "Không thấy đề." }, { status: 404 });
  return NextResponse.json({ quiz: builtin, published: true });
}

export async function PUT(request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Không có quyền quản trị." }, { status: 403 });
  const { slug } = await params;
  const body = (await request.json()) as { quiz?: Quiz; published?: boolean };
  if (!body.quiz) return NextResponse.json({ error: "Thiếu đề." }, { status: 400 });
  body.quiz.slug = slug;
  const error = validateQuiz(body.quiz);
  if (error) return NextResponse.json({ error }, { status: 400 });
  await saveExam(body.quiz, body.published !== false);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Không có quyền quản trị." }, { status: 403 });
  const { slug } = await params;
  await hideExam(slug);
  return NextResponse.json({ ok: true });
}
