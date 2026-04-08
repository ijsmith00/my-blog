"use client";

/**
 * 상단 헤더: 로고, 상위 5개 카테고리(글 수 순), 활성 링크, 햄버거·테마.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import type { CategoryWithCount } from "@/lib/types";

type Props = {
  siteTitle: string;
  /** 글 개수 많은 순 상위 5개 */
  categories: CategoryWithCount[];
};

function isCategoryPathActive(pathname: string, categoryName: string): boolean {
  if (!pathname.startsWith("/category/")) return false;
  const rest = pathname.slice("/category/".length);
  try {
    return decodeURIComponent(rest) === categoryName;
  } catch {
    return rest === encodeURIComponent(categoryName);
  }
}

export function Header({ siteTitle, categories }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || buttonRef.current?.contains(t))
        return;
      setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const linkBase =
    "inline-block pb-0.5 text-[15px] transition-colors hover:text-[var(--accent-hover)]";
  const linkInactive = `${linkBase} border-b-2 border-transparent text-[var(--foreground)]`;
  const linkActive = `${linkBase} border-b-2 border-[#2563EB] font-semibold text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]`;

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
        <Link
          href="/"
          className="shrink-0 text-[20px] font-bold leading-none text-[var(--accent)]"
        >
          {siteTitle}
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex"
          aria-label="카테고리"
        >
          {categories.map(({ name: cat }) => {
            const active = isCategoryPathActive(pathname, cat);
            return (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className={active ? linkActive : linkInactive}
              >
                {cat}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <div className="relative md:hidden">
            <button
              ref={buttonRef}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--foreground)] transition hover:bg-black/5 dark:hover:bg-white/10"
              aria-expanded={menuOpen}
              aria-controls="mobile-category-menu"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="text-xl leading-none" aria-hidden>
                ☰
              </span>
            </button>
            {menuOpen && (
              <div
                ref={menuRef}
                id="mobile-category-menu"
                className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 shadow-lg"
                role="menu"
              >
                {categories.map(({ name: cat }) => {
                  const active = isCategoryPathActive(pathname, cat);
                  return (
                    <Link
                      key={cat}
                      href={`/category/${encodeURIComponent(cat)}`}
                      role="menuitem"
                      className={
                        active
                          ? "block border-l-2 border-[#2563EB] bg-[var(--code-bg)] px-4 py-2.5 text-[15px] font-semibold text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]"
                          : "block px-4 py-2.5 text-[15px] text-[var(--foreground)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--accent-hover)]"
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
