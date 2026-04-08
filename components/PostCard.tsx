/**
 * 홈·카테고리 목록에서 쓰는 포스트 카드: 썸네일, 제목, 요약, 날짜.
 */
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";

type Props = {
  post: Post;
  /** 첫 카드(히어로 근처) LCP 대응 */
  priority?: boolean;
};

export function PostCard({ post, priority }: Props) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 sm:flex-row sm:gap-6">
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg sm:aspect-[16/10] sm:w-[280px]"
      >
        <Image
          src={post.thumbnail}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 280px"
          priority={priority}
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <time
          dateTime={post.date}
          className="mb-1 text-[15px] text-[var(--muted-fg)]"
        >
          {post.date}
        </time>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mb-2 text-xl font-semibold text-[var(--foreground)] hover:text-[var(--accent-hover)]">
            {post.title}
          </h2>
        </Link>
        <p className="mb-2 text-[17px] leading-relaxed text-[var(--foreground)]">
          {post.description}
        </p>
        <Link
          href={`/category/${encodeURIComponent(post.category)}`}
          className="text-[15px] text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          {post.category}
        </Link>
      </div>
    </article>
  );
}
