"use client";

import { Button } from "@/components/ui/button";
import { Shell } from "@/components/site/shell";

export default function ExamError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Shell className="py-16">
      <h1 className="text-3xl font-bold text-[#153565]">Đề này chưa mở được</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-[#5a6173]">
        Trang đề gặp lỗi khi tải. Hãy tải lại. Nếu chỉ một câu bị lỗi, các câu còn lại vẫn làm được sau khi đề mở.
      </p>
      <Button className="mt-6 bg-[#ff792f] text-white hover:bg-[#e56a24]" onClick={reset}>
        Tải lại đề
      </Button>
    </Shell>
  );
}
