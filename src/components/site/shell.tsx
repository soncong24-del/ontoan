import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 py-8 sm:px-6", className)}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Đường dẫn" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-[#5a6173]">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#1482c0]">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[#153565]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
