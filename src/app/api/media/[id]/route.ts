import { NextResponse } from "next/server";
import { readMedia } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const media = await readMedia(id);
  if (!media) return NextResponse.json({ error: "Không thấy ảnh." }, { status: 404 });
  return new NextResponse(new Uint8Array(media.bytes), {
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
