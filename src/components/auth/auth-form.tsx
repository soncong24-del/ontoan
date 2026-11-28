"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/tien-do";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, displayName, email }),
    });
    const data = (await response.json()) as { error?: string };
    setPending(false);
    if (!response.ok) {
      setError(data.error ?? "Không thực hiện được.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-4 rounded-3xl border border-[#d0dcf0] bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-[#153565]">{mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản"}</h1>
      <p className="text-sm leading-6 text-[#5a6173]">
        {mode === "login"
          ? "Đăng nhập để bài kiểm tra được lưu vào tài khoản và xem được trên máy khác."
          : "Tên đăng nhập không dấu. Họ tên và email dùng khi đăng ký khóa học."}
      </p>
      {mode === "register" ? (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="ho-ten">Họ và tên</Label>
            <Input id="ho-ten" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
        </>
      ) : null}
      <div className="space-y-1.5">
        <Label htmlFor="ten">Tên đăng nhập</Label>
        <Input id="ten" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="mat-khau">Mật khẩu</Label>
        <Input id="mat-khau" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} required />
      </div>
      {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      <Button type="submit" disabled={pending} className="bg-[#ff792f] text-white hover:bg-[#e56a24]">
        {pending ? "Đang xử lý…" : mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
      </Button>
      <p className="text-sm text-[#5a6173]">
        {mode === "login" ? (
          <Link className="font-semibold text-[#1482c0]" href={`/dang-ky?next=${encodeURIComponent(next)}`}>
            Chưa có tài khoản? Đăng ký
          </Link>
        ) : (
          <Link className="font-semibold text-[#1482c0]" href={`/dang-nhap?next=${encodeURIComponent(next)}`}>
            Đã có tài khoản? Đăng nhập
          </Link>
        )}
      </p>
    </form>
  );
}
