import { NextResponse } from "next/server";
import { saveMedia } from "@/lib/server/db";
import { requireAdmin } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Không có quyền quản trị." }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Chưa chọn ảnh." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Chỉ nhận file ảnh." }, { status: 400 });
  if (file.size > 2_000_000) return NextResponse.json({ error: "Ảnh cần nhỏ hơn 2 MB." }, { status: 400 });
  const id = `${crypto.randomUUID()}${extension(file.type)}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await saveMedia(id, bytes, file.type);
  return NextResponse.json({ url: `/api/media/${id}` });
}

function extension(type: string): string {
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  if (type === "image/gif") return ".gif";
  return ".jpg";
}
