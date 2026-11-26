"use client";

import { Button } from "@/components/ui/button";
import { Shell } from "@/components/site/shell";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Shell className="py-20">
      <h1 className="text-3xl font-bold text-[#153565]">Trang chưa tải được</h1>
      <p className="mt-2 text-sm text-[#5a6173]">Hãy thử tải lại. Nếu vẫn lỗi, về trang chủ rồi mở lại bài.</p>
      <Button className="mt-6" onClick={reset}>
        Tải lại
      </Button>
    </Shell>
  );
}
