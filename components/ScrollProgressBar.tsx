"use client";

/**
 * 뷰포트 상단 고정 3px 바 — 스크롤 비율만큼 왼쪽에서 포인트 컬러로 채움.
 */
import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollable = el.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const p = (scrollTop / scrollable) * 100;
      setProgress(Math.min(100, Math.max(0, p)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-[var(--accent)] transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
