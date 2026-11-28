import { NextResponse } from "next/server";
import { storageErrorMessage, updateDatabase } from "@/lib/server/db";
import { createSession, hashPassword, toPublic } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    username?: string;
    password?: string;
    displayName?: string;
    email?: string;
  };
  const username = (body.username ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  const displayName = (body.displayName ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[a-z0-9_]{3,24}$/.test(username)) {
    return NextResponse.json(
      { error: "Tên đăng nhập dài 3–24 ký tự, chỉ gồm chữ thường không dấu, số và dấu gạch dưới." },
      { status: 400 },
    );
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Mật khẩu cần ít nhất 6 ký tự." }, { status: 400 });
  }
  if (displayName.length < 2) {
    return NextResponse.json({ error: "Hãy nhập họ tên." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email chưa đúng định dạng." }, { status: 400 });
  }
  const { salt, hash } = hashPassword(password);
  try {
    const created = await updateDatabase((data) => {
      if (data.users.some((user) => user.username === username)) return null;
      const user = {
        id: crypto.randomUUID(),
        username,
        displayName,
        email,
        passwordHash: hash,
        salt,
        role: "student" as const,
        createdAt: new Date().toISOString(),
      };
      data.users.push(user);
      return user;
    });
    if (!created) {
      return NextResponse.json({ error: "Tên đăng nhập này đã có người dùng." }, { status: 409 });
    }
    await createSession(created);
    return NextResponse.json({ user: toPublic(created) });
  } catch (error) {
    console.error("register failed", storageErrorMessage(error));
    return NextResponse.json(
      { error: `Không tạo được tài khoản. ${storageErrorMessage(error)}` },
      { status: 500 },
    );
  }
}
