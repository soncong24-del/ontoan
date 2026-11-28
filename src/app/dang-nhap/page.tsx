import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { Shell } from "@/components/site/shell";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Đăng nhập tài khoản ôn thi toán"),
  description: fitDescription(
    "Đăng nhập Ôn Toán để lưu bài làm đề thi học kì và đề thi thử THPT, xem lại tiến độ trên máy khác. Bài giảng vẫn miễn phí.",
  ),
  path: "/dang-nhap",
  noindex: true,
});

export default function LoginPage() {
  return (
    <Shell>
      <Suspense fallback={<p className="text-sm text-[#5a6173]">Đang mở form…</p>}>
        <AuthForm mode="login" />
      </Suspense>
    </Shell>
  );
}
