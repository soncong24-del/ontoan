import { NextResponse } from "next/server";
import { readDatabase } from "@/lib/server/db";
import { createSession, toPublic, verifyPassword } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = (body.username ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  const db = await readDatabase();
  const user = db.users.find((item) => item.username === username);
  if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
    return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu." }, { status: 401 });
  }
  await createSession(user);
  return NextResponse.json({ user: toPublic(user) });
}
