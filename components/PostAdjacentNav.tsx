/**
 * 같은 날짜 순서에서 이전·다음 글 링크 (없으면 빈 칸).
 */
import Link from "next/link";
import type { Post } from "@/lib/types";

type Props = {
  prev: Post | null;
  next: Post | null;
};

export function PostAdjacentNav({ prev, next }: Props) {
  return (
    <nav
      className="mx-auto mt-12 flex w-full max-w-[720px] flex-wrap justify-between gap-6 border-t border-[#E5E7EB] pt-8 text-[15px] dark:border-[#2D2D2D]"
      aria-label="이전·다음 글"
    >
      <div className="min-w-0 flex-1">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="block text-[#6B7280] transition-colors hover:text-[#2563EB] dark:text-[#9CA3AF] dark:hover:text-[#3B82F6]"
          >
            <span className="mb-1 block text-[13px]">← 이전 글</span>
            <span className="font-medium text-[#333] dark:text-[#E0E0E0]">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
      <div className="min-w-0 flex-1 text-right">
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="block text-[#6B7280] transition-colors hover:text-[#2563EB] dark:text-[#9CA3AF] dark:hover:text-[#3B82F6]"
          >
            <span className="mb-1 block text-[13px]">다음 글 →</span>
            <span className="font-medium text-[#333] dark:text-[#E0E0E0]">
              {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
