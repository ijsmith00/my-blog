/**
 * 같은 카테고리 관련 글 카드 목록 (최대 3, 현재 글 제외).
 */
import Link from "next/link";
import type { Post } from "@/lib/types";

type Props = {
  posts: Post[];
};

export function PostRelatedSection({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto mt-12 w-full max-w-[720px]">
      <h2 className="mb-4 text-[20px] font-semibold text-[#333] dark:text-[#E0E0E0]">
        관련 글
      </h2>
      <ul className="flex flex-col gap-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 transition-colors hover:border-[#2563EB] dark:border-[#2D2D2D] dark:bg-[#1E1E1E] dark:hover:border-[#3B82F6]"
            >
              <p className="mb-1 text-[15px] font-medium text-[#333] dark:text-[#E0E0E0]">
                {p.title}
              </p>
              <p className="mb-1 text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">
                {p.date}
              </p>
              <p className="line-clamp-1 text-[14px] text-[#6B7280] dark:text-[#9CA3AF]">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
