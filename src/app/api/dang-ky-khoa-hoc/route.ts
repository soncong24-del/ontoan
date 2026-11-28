import { NextResponse } from "next/server";
import { updateDatabase } from "@/lib/server/db";
import { getCurrentUser } from "@/lib/server/session";
import type { CourseRegistration } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Hãy đăng nhập trước khi đăng ký khóa học." }, { status: 401 });
  const body = (await request.json()) as Partial<CourseRegistration>;
  const hoTen = (body.hoTen ?? "").trim();
  const dienThoai = (body.dienThoai ?? "").trim().replace(/\s/g, "");
  const email = (body.email ?? "").trim().toLowerCase();
  const lopTruong = (body.lopTruong ?? "").trim();
  const khoaHoc = (body.khoaHoc ?? "").trim();
  const ghiChu = (body.ghiChu ?? "").trim();
  if (hoTen.length < 2) return NextResponse.json({ error: "Hãy nhập họ tên." }, { status: 400 });
  if (!/^0\d{8,10}$/.test(dienThoai)) {
    return NextResponse.json({ error: "Số điện thoại nên bắt đầu bằng 0 và có 9–11 chữ số." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email chưa đúng định dạng." }, { status: 400 });
  }
  if (lopTruong.length < 2) return NextResponse.json({ error: "Hãy nhập lớp hoặc trường." }, { status: 400 });
  if (!khoaHoc) return NextResponse.json({ error: "Hãy chọn khóa học." }, { status: 400 });
  const entry: CourseRegistration = {
    id: crypto.randomUUID(),
    userId: user.id,
    username: user.username,
    hoTen,
    dienThoai,
    email,
    lopTruong,
    khoaHoc,
    ghiChu,
    createdAt: new Date().toISOString(),
  };
  await updateDatabase((data) => {
    data.registrations.unshift(entry);
    data.registrations = data.registrations.slice(0, 500);
  });
  return NextResponse.json({ ok: true });
}
