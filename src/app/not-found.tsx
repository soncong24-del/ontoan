import Link from "next/link";
import { Shell } from "@/components/site/shell";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Shell className="py-20">
      <p className="text-sm font-bold text-[#1482c0]">404</p>
      <h1 className="mt-2 text-3xl font-bold text-[#153565]">Không thấy trang này</h1>
      <p className="mt-2 text-sm text-[#5a6173]">Bài giảng hoặc đề có thể đã đổi đường dẫn. Quay về trang chủ để chọn lớp.</p>
      <Link href="/" className={buttonVariants({ className: "mt-6 bg-[#1482c0] text-white" })}>
        Về trang chủ
      </Link>
    </Shell>
  );
}
