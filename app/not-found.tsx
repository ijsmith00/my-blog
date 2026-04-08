/**
 * 존재하지 않는 경로·notFound() 시 표시. 루트 레이아웃의 헤더·푸터 안에서 렌더됩니다.
 */
import Image from "next/image";
import Link from "next/link";
import { getPopularPosts } from "@/lib/posts";

export default function NotFound() {
  const popular = getPopularPosts(3);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[720px] text-center">
        <p className="mb-2 text-[15px] font-medium uppercase tracking-wide text-[var(--muted-fg)]">
          404
        </p>
        <h1 className="mb-4 text-[28px] font-extrabold leading-tight text-[var(--foreground)] sm:text-[32px]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mb-8 text-[17px] leading-relaxed text-[var(--muted-fg)]">
          요청하신 주소가 변경되었거나 삭제되었을 수 있습니다. 홈으로 이동하거나
          아래 글을 둘러보세요.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-8 py-3 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          홈으로 돌아가기
        </Link>
      </div>

      {popular.length > 0 && (
        <section className="mx-auto mt-14 w-full max-w-[720px]">
          <h2 className="mb-4 text-left text-lg font-bold text-[var(--foreground)]">
            최근 인기 글
          </h2>
          <ul className="flex flex-col gap-4">
            {popular.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <div className="relative h-[72px] w-[112px] shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={post.thumbnail}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <time
                      dateTime={post.date}
                      className="mb-1 block text-[14px] text-[var(--muted-fg)]"
                    >
                      {post.date}
                    </time>
                    <span className="line-clamp-2 text-[17px] font-semibold text-[var(--foreground)]">
                      {post.title}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
