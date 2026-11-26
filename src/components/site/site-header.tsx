"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GRADES } from "@/lib/labels";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV = [
  { href: "/bai-giang", label: "Bài giảng" },
  { href: "/kiem-tra", label: "Đề kiểm tra" },
  { href: "/tien-do", label: "Tiến độ" },
  { href: "/khoa-hoc", label: "Khóa học" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d0dcf0] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Logo />
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Chính">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-semibold",
                isActive(pathname, item.href)
                  ? "bg-[#e7f3fb] text-[#1482c0]"
                  : "text-[#153565] hover:bg-[#f4f8fb]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/kiem-tra"
            className={cn(buttonVariants({ size: "default" }), "hidden bg-[#ff792f] text-white hover:bg-[#e56a24] sm:inline-flex")}
          >
            Làm đề ngay
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "lg:hidden")}
              aria-label="Mở menu"
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Ôn Toán</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Menu di động">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-semibold text-[#153565] hover:bg-[#f4f8fb]"
                  >
                    {item.label}
                  </Link>
                ))}
                <p className="mt-4 px-3 text-xs font-semibold tracking-wide text-[#5a6173] uppercase">Theo lớp</p>
                {GRADES.map((grade) => (
                  <Link
                    key={grade.id}
                    href={`/lop/${grade.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#153565] hover:bg-[#f4f8fb]"
                  >
                    {grade.label} · {grade.track}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="border-t border-[#e6eef7]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
          {GRADES.map((grade) => {
            const href = `/lop/${grade.id}`;
            const active = pathname === href;
            return (
              <Link
                key={grade.id}
                href={href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-sm font-semibold",
                  active ? "bg-[#1482c0] text-white" : "text-[#153565] hover:bg-[#e7f3fb]",
                )}
              >
                {grade.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
