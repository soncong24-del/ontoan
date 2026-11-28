import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";
import { getCurrentUser } from "@/lib/server/session";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Quản trị đề ôn thi toán"),
  description: fitDescription(
    "Khu quản trị đề thi học kì và đề thi thử THPT của Ôn Toán. Chỉ tài khoản được cấp quyền mới vào trang này.",
  ),
  path: "/admin",
  noindex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/dang-nhap?next=/admin");
  if (user.role !== "admin") redirect("/?khong-quyen=1");
  return <div className="bg-[#f4f8fb]">{children}</div>;
}
