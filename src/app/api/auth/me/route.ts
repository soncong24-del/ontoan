import { NextResponse } from "next/server";
import { getCurrentUser, toPublic } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user: user ? toPublic(user) : null });
}
