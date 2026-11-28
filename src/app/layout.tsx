import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, SHARE_IMAGE, organizationJsonLd } from "@/lib/seo";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/` },
  verification: googleVerification ? { google: googleVerification } : undefined,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    locale: "vi_VN",
    type: "website",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: "Ôn Toán – ôn thi toán miễn phí lớp 10, 11, 12" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE],
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
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main id="noi-dung" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
