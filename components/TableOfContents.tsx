"use client";

/**
 * 목차: 데스크톱(sticky·IO 하이라이트) / 모바일(접힘·카드).
 * 항목 3개 미만이면 null.
 */
import { useCallback, useEffect, useState } from "react";
import type { TocItem } from "@/lib/types";

type Props = {
  items: TocItem[];
  variant: "desktop" | "mobile";
};

export function TableOfContents({ items, variant }: Props) {
  const [activeId, setActiveId] = useState<string | null>(() =>
    items.length ? items[0].id : null
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length < 3) return;

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -52% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      if (variant === "mobile") setMobileOpen(false);
    },
    [variant]
  );

  if (items.length < 3) return null;

  const list = (
    <ul className="flex flex-col gap-2 text-[14px]">
      {items.map((item) => {
        const active = activeId === item.id;
        const indent = item.level === 3 ? "pl-6" : "pl-2";
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={[
                "block border-l-2 py-1 transition-colors",
                indent,
                active
                  ? "border-[#2563EB] font-medium text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]"
                  : "border-transparent text-[#333] hover:text-[#2563EB] dark:text-[#E0E0E0] dark:hover:text-[#3B82F6]",
              ].join(" ")}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <nav
        className="mb-8 rounded-lg bg-[#F9FAFB] p-4 dark:bg-[#1E1E1E] md:hidden"
        aria-label="목차"
      >
        <button
          type="button"
          className="flex w-full items-center justify-between text-left text-[16px] font-bold text-[#333] dark:text-[#E0E0E0]"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span>
            목차 {mobileOpen ? "▲" : "▼"}
          </span>
        </button>
        {mobileOpen ? <div className="mt-3">{list}</div> : null}
      </nav>
    );
  }

  return (
    <nav
      aria-label="목차"
      className="sticky top-[80px] max-h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <p className="mb-3 text-[16px] font-bold text-[#333] dark:text-[#E0E0E0]">
        목차
      </p>
      {list}
    </nav>
  );
}
