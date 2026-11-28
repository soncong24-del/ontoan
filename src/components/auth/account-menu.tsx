"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { PublicAccount } from "@/types";

export function AccountMenu() {
  const router = useRouter();
  const [user, setUser] = useState<PublicAccount | null>(null);

  useEffect(() => {
    void fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data: { user: PublicAccount | null }) => setUser(data.user));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  }

  if (!user) {
    return (
      <Link href="/dang-nhap" className="rounded-full px-3 py-2 text-sm font-semibold text-[#153565] hover:bg-[#f4f8fb]">
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link href="/tien-do" className="max-w-32 truncate text-sm font-semibold text-[#153565]">
        {user.displayName}
      </Link>
      {user.role === "admin" ? (
        <Link href="/admin" className="text-sm font-semibold text-[#ff792f]">
          Quản trị
        </Link>
      ) : null}
      <button type="button" onClick={() => void logout()} className="text-sm font-semibold text-[#5a6173]">
        Thoát
      </button>
    </div>
  );
}
