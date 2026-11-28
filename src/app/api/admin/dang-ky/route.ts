import { NextResponse } from "next/server";
import { readDatabase } from "@/lib/server/db";
import { requireAdmin } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Không có quyền quản trị." }, { status: 403 });
  const db = await readDatabase();
  return NextResponse.json({
    registrations: [...db.registrations].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
}
