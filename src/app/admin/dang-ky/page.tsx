import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/site/shell";
import { readDatabase } from "@/lib/server/db";
import { formatDateTime } from "@/lib/format";
import { fitDescription, fitTitle, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: fitTitle("Hồ sơ đăng ký khóa học toán"),
  description: fitDescription("Danh sách học sinh đăng ký khóa ôn thi toán. Trang quản trị của Ôn Toán, không hiển thị trên Google."),
  path: "/admin/dang-ky",
  noindex: true,
});
export const dynamic = "force-dynamic";

export default async function RegistrationsPage() {
  const db = await readDatabase();
  const rows = [...db.registrations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return (
    <Shell>
      <Link href="/admin" className="text-sm font-semibold text-[#1482c0]">
        ← Danh sách đề
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-[#153565]">Hồ sơ đăng ký khóa học</h1>
      <p className="mt-2 text-sm text-[#5a6173]">
        Mỗi hồ sơ cũng được gửi vào form Netlify để email tới soncong24@gmail.com khi thông báo email đã bật.
      </p>
      {rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[#d0dcf0] bg-white px-4 py-8 text-sm text-[#5a6173]">
          Chưa có hồ sơ.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((row) => (
            <li key={row.id} className="rounded-2xl border border-[#d0dcf0] bg-white p-4 text-sm leading-6">
              <p className="font-bold text-[#153565]">{row.hoTen}</p>
              <p>{row.khoaHoc}</p>
              <p>
                {row.dienThoai} · {row.email}
              </p>
              <p>{row.lopTruong}</p>
              {row.ghiChu ? <p>{row.ghiChu}</p> : null}
              <p className="text-[#5a6173]">
                {formatDateTime(row.createdAt)} · tài khoản {row.username}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
