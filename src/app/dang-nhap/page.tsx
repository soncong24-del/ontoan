import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { Shell } from "@/components/site/shell";

export const metadata: Metadata = { title: "Đăng nhập" };

export default function LoginPage() {
  return (
    <Shell>
      <Suspense fallback={<p className="text-sm text-[#5a6173]">Đang mở form…</p>}>
        <AuthForm mode="login" />
      </Suspense>
    </Shell>
  );
}
