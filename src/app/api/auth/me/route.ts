import { NextResponse } from "next/server";
import { getCurrentUser, toPublic } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user: user ? toPublic(user) : null });
  } catch (error) {
    console.error("session read failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ user: null });
  }
}
