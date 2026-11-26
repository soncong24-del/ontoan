import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-9" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#1482c0" />
        <path
          d="M7 18h5l4 7L25 8"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="leading-tight">
        <span className="block text-base font-bold tracking-tight text-[#153565]">Ôn Toán</span>
        <span className="block text-[11px] font-medium text-[#5a6173]">ontoan.vn</span>
      </span>
    </Link>
  );
}
