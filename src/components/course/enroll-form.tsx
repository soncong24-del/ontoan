"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { PublicAccount } from "@/types";

export function EnrollForm({ courseTitle }: { courseTitle: string }) {
  const [user, setUser] = useState<PublicAccount | null | undefined>(undefined);
  const [hoTen, setHoTen] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [email, setEmail] = useState("");
  const [lopTruong, setLopTruong] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    void fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data: { user: PublicAccount | null }) => {
        setUser(data.user);
        if (data.user) {
          setHoTen(data.user.displayName);
          setEmail(data.user.email);
        }
      });
  }, []);

  if (user === undefined) return <p className="text-sm text-[#5a6173]">Đang kiểm tra tài khoản…</p>;
  if (!user) {
    return (
      <div className="rounded-3xl border border-[#d0dcf0] bg-white p-5">
        <h2 className="text-lg font-bold text-[#153565]">Đăng ký khóa học</h2>
        <p className="mt-2 text-sm leading-6 text-[#5a6173]">Hãy đăng nhập để gửi hồ sơ. Khách chưa có tài khoản vẫn học bài giảng và làm đề miễn phí.</p>
        <div className="mt-4 flex gap-3">
          <Link href={`/dang-nhap?next=/khoa-hoc`} className="text-sm font-semibold text-[#1482c0]">Đăng nhập</Link>
          <Link href="/dang-ky" className="text-sm font-semibold text-[#ff792f]">Đăng ký</Link>
        </div>
      </div>
    );
  }
  if (done) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="text-lg font-bold text-emerald-800">Đã gửi hồ sơ đăng ký</h2>
        <p className="mt-2 text-sm leading-6 text-emerald-900">
          Ôn Toán đã nhận thông tin của {hoTen} cho khóa {courseTitle}. Chúng tôi sẽ liên hệ qua số điện thoại hoặc email bạn vừa nhập.
        </p>
      </div>
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const payload = { hoTen, dienThoai, email, lopTruong, khoaHoc: courseTitle, ghiChu };
    const response = await fetch("/api/dang-ky-khoa-hoc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Không gửi được.");
      return;
    }
    const encoded = new URLSearchParams({
      "form-name": "dang-ky-khoa-hoc",
      hoTen,
      dienThoai,
      email,
      lopTruong,
      khoaHoc: courseTitle,
      ghiChu,
    });
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encoded.toString(),
    }).catch(() => undefined);
    setDone(true);
  }

  return (
    <form onSubmit={(event) => void submit(event)} className="space-y-4 rounded-3xl border border-[#d0dcf0] bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-[#153565]">Đăng ký tham gia khóa</h2>
      <p className="text-sm text-[#5a6173]">Hồ sơ gửi về Ôn Toán. Khóa hiện chưa thu tiền trên web.</p>
      <div className="space-y-1.5">
        <Label htmlFor="ho-ten">Họ và tên</Label>
        <Input id="ho-ten" value={hoTen} onChange={(event) => setHoTen(event.target.value)} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sdt">Số điện thoại</Label>
        <Input id="sdt" value={dienThoai} onChange={(event) => setDienThoai(event.target.value)} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email-dk">Email</Label>
        <Input id="email-dk" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="lop">Lớp / trường</Label>
        <Input id="lop" value={lopTruong} onChange={(event) => setLopTruong(event.target.value)} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="khoa">Khóa học muốn đăng ký</Label>
        <Input id="khoa" value={courseTitle} readOnly />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="chu">Ghi chú</Label>
        <Textarea id="chu" value={ghiChu} onChange={(event) => setGhiChu(event.target.value)} />
      </div>
      {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      <Button type="submit" className="bg-[#ff792f] text-white hover:bg-[#e56a24]">
        Gửi hồ sơ
      </Button>
    </form>
  );
}
