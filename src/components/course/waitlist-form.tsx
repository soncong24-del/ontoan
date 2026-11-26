"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getLearningRepository } from "@/lib/storage";
import { useWaitlist } from "@/lib/storage/use-learning-store";

export function WaitlistForm({ courseSlug, courseTitle }: { courseSlug: string; courseTitle: string }) {
  const entries = useWaitlist();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedName.length < 2) {
      setError("Hãy nhập họ tên.");
      setMessage("");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Email chưa đúng định dạng.");
      setMessage("");
      return;
    }
    if (phone.trim() && !/^0\d{8,10}$/.test(phone.trim().replace(/\s/g, ""))) {
      setError("Số điện thoại nên bắt đầu bằng 0 và có 9 đến 11 chữ số.");
      setMessage("");
      return;
    }
    const existed = entries.some(
      (item) => item.courseSlug === courseSlug && item.email.toLowerCase() === trimmedEmail,
    );
    getLearningRepository().saveWaitlist({
      id: globalThis.crypto?.randomUUID?.() ?? `wl-${Date.now()}`,
      courseSlug,
      name: trimmedName,
      email: trimmedEmail,
      phone: phone.trim() || undefined,
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    });
    setError("");
    setMessage(
      existed
        ? "Đã cập nhật nguyện vọng trên máy này."
        : "Đã lưu đăng ký trên trình duyệt này. Khi mở bán, danh sách sẽ được chuyển lên máy chủ.",
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-[#d0dcf0] bg-white p-5 shadow-sm" id="dang-ky">
      <div>
        <h2 className="text-lg font-bold text-[#153565]">Đăng ký nhận tin mở bán</h2>
        <p className="mt-1 text-sm leading-6 text-[#5a6173]">
          Khóa {courseTitle} đang ở trạng thái sắp mở bán. Form này lưu cục bộ, đúng chỗ sẽ nối API khi có thanh toán.
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="ho-ten">Họ và tên</Label>
        <Input id="ho-ten" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sdt">Số điện thoại (không bắt buộc)</Label>
        <Input id="sdt" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="ghi-chu">Ghi chú</Label>
        <Textarea id="ghi-chu" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Khối lớp, thời gian học mong muốn" />
      </div>
      {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      {message ? <p className="text-sm font-medium text-emerald-700">{message}</p> : null}
      <Button type="submit" className="bg-[#ff792f] text-white hover:bg-[#e56a24]">
        Giữ chỗ nhận thông báo
      </Button>
    </form>
  );
}
