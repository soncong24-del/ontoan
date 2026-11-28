import { NextResponse } from "next/server";
import { readDatabase, updateDatabase, type StoredAttempt } from "@/lib/server/db";
import { getCurrentUser } from "@/lib/server/session";
import type { QuizAttempt } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ attempts: [] });
  const db = await readDatabase();
  const attempts = db.attempts
    .filter((item) => item.userId === user.id)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  return NextResponse.json({ attempts });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Cần đăng nhập." }, { status: 401 });
  const attempt = (await request.json()) as QuizAttempt;
  if (!attempt?.id || !attempt.quizSlug || !attempt.submittedAt) {
    return NextResponse.json({ error: "Thiếu dữ liệu bài làm." }, { status: 400 });
  }
  const stored: StoredAttempt = { ...attempt, userId: user.id };
  await updateDatabase((data) => {
    data.attempts = [stored, ...data.attempts.filter((item) => item.id !== stored.id)].slice(0, 300);
  });
  return NextResponse.json({ ok: true });
}
