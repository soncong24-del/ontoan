import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { Shell } from "@/components/site/shell";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Đăng ký tài khoản ôn thi toán"),
  description: fitDescription(
    "Tạo tài khoản Ôn Toán miễn phí để lưu điểm đề thi học kì, đề thi thử THPT lớp 10, 11, 12 và xem tiến độ trên máy khác.",
  ),
  path: "/dang-ky",
  noindex: true,
});

export default function RegisterPage() {
  return (
    <Shell>
      <Suspense fallback={<p className="text-sm text-[#5a6173]">Đang mở form…</p>}>
        <AuthForm mode="register" />
      </Suspense>
    </Shell>
  );
}
