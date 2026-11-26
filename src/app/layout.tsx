import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ontoan.vn"),
  title: {
    default: "Ôn Toán — Học toán và luyện đề trắc nghiệm online",
    template: "%s · Ôn Toán",
  },
  description:
    "Bài giảng toán có lời giải từng bước và đề kiểm tra trắc nghiệm cho học sinh lớp 9 đến lớp 12. Chấm điểm ngay, ontoan.vn.",
  applicationName: "Ôn Toán",
  keywords: ["ôn toán", "ontoan.vn", "bài giảng toán", "đề kiểm tra toán online", "luyện thi vào 10", "THPT"],
  openGraph: {
    title: "Ôn Toán — Học toán và luyện đề trắc nghiệm online",
    description: "Chọn lớp, học bài giảng, làm đề và xem huy hiệu ngay trên máy bạn.",
    locale: "vi_VN",
    type: "website",
    url: "https://ontoan.vn",
    siteName: "Ôn Toán",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={sans.variable} style={{ colorScheme: "light" }}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
        >
          Đi tới nội dung
        </a>
        <SiteHeader />
        <main id="noi-dung" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
