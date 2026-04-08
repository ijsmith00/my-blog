/**
 * 루트 레이아웃: 전역 CSS, SEO 메타, 테마, 헤더/푸터.
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getAllCategories } from "@/lib/posts";
import {
  OG_DEFAULT_IMAGE,
  SITE_DESCRIPTION,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} - ${SITE_TAGLINE}`,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_TITLE,
    title: `${SITE_TITLE} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG_DEFAULT_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navCategories = getAllCategories().slice(0, 5);

  return (
    <html lang="ko-KR" suppressHydrationWarning className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <ScrollProgressBar />
          <ScrollToTopButton />
          <Header siteTitle={SITE_TITLE} categories={navCategories} />
          {children}
          <Footer siteTitle={SITE_TITLE} />
        </ThemeProvider>
      </body>
    </html>
  );
}
