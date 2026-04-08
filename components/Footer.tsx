/**
 * 하단 푸터: 사이트명, 한 줄 소개, 링크 행, 저작권.
 */
import Link from "next/link";

type Props = {
  siteTitle: string;
};

const footerLink =
  "no-underline text-[var(--foreground)] transition-colors hover:text-[var(--accent-hover)]";

export function Footer({ siteTitle }: Props) {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--card)] py-[40px] text-center text-[14px] text-[var(--foreground)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4">
        <p className="font-bold text-[var(--accent)]">{siteTitle}</p>
        <p className="text-[var(--muted-fg)]">
          바이브 코딩으로 만든 수익형 블로그
        </p>

        <nav className="text-[var(--foreground)]" aria-label="푸터 링크">
          <Link href="/about" className={footerLink}>
            소개
          </Link>
          {"  ·  "}
          <Link href="/privacy" className={footerLink}>
            개인정보처리방침
          </Link>
          {"  ·  "}
          <Link href="/contact" className={footerLink}>
            문의
          </Link>
        </nav>

        <p className="text-[var(--muted-fg)]">
          © 2025 {siteTitle}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
