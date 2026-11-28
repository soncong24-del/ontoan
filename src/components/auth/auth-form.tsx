"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, type InvalidEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fieldValue(form: HTMLFormElement, id: string, fallback: string): string {
  const node = form.querySelector(`#${id}`);
  if (node instanceof HTMLInputElement && node.value) return node.value;
  return fallback;
}

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

  function rejectShortPassword(event: InvalidEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    if (input.validity.valueMissing || input.validity.tooShort) {
      input.setCustomValidity("Mật khẩu cần tối thiểu 6 ký tự.");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const usernameValue = fieldValue(form, "ten", username).trim().toLowerCase();
    const passwordValue = fieldValue(form, "mat-khau", password);
    const displayNameValue = fieldValue(form, "ho-ten", displayName).trim();
    const emailValue = fieldValue(form, "email", email).trim();
    setError("");
    if (mode === "register" && passwordValue.length < 6) {
      setError("Mật khẩu cần tối thiểu 6 ký tự.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
          displayName: displayNameValue,
          email: emailValue,
        }),
      });
      let data: { error?: string; errorMessage?: string } = {};
      try {
        data = (await response.json()) as { error?: string; errorMessage?: string };
      } catch {
        data = { error: `Máy chủ trả về lỗi ${response.status}.` };
      }
      if (!response.ok) {
        setError(data.error || data.errorMessage || `Không thực hiện được (mã ${response.status}).`);
        return;
      }
      router.push(next);
      router.refresh();
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "";
      setError(message ? `Không gửi được yêu cầu. ${message}` : "Không gửi được yêu cầu. Hãy thử lại.");
    } finally {
      setPending(false);
    }
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
            <Input
              id="ho-ten"
              name="name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              onInput={(event) => setDisplayName(event.currentTarget.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onInput={(event) => setEmail(event.currentTarget.value)}
              autoComplete="email"
            />
          </div>
        </>
      ) : null}
      <div className="space-y-1.5">
        <Label htmlFor="ten">Tên đăng nhập</Label>
        <Input
          id="ten"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onInput={(event) => setUsername(event.currentTarget.value)}
          autoComplete="username"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="mat-khau">Mật khẩu</Label>
        <Input
          id="mat-khau"
          name="password"
          type="password"
          minLength={mode === "register" ? 6 : undefined}
          value={password}
          onChange={(event) => {
            event.currentTarget.setCustomValidity("");
            setPassword(event.target.value);
          }}
          onInput={(event) => {
            event.currentTarget.setCustomValidity("");
            setPassword(event.currentTarget.value);
          }}
          onInvalid={rejectShortPassword}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          aria-describedby="mat-khau-goi-y"
        />
        <p id="mat-khau-goi-y" className="text-sm text-[#5a6173]">
          Tối thiểu 6 ký tự.
        </p>
      </div>
      {error ? (
        <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}
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
