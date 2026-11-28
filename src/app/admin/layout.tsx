import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/dang-nhap?next=/admin");
  if (user.role !== "admin") redirect("/?khong-quyen=1");
  return <div className="bg-[#f4f8fb]">{children}</div>;
}
