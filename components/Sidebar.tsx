/**
 * 사이드바: 광고, 프로필, 인기글, 카테고리(이름 + 글 개수).
 */
import Link from "next/link";
import Image from "next/image";
import { AdPlaceholder } from "./AdPlaceholder";
import type { CategoryWithCount, Post } from "@/lib/types";

type Props = {
  popularPosts: Post[];
  categories: CategoryWithCount[];
  profile: {
    name: string;
    bio: string;
    avatarSrc: string;
  };
};

export function Sidebar({ popularPosts, categories, profile }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <AdPlaceholder />

      <section className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="mb-3 flex items-center gap-3">
          <Image
            src={profile.avatarSrc}
            alt=""
            width={56}
            height={56}
            className="rounded-full border border-[var(--border)] object-cover"
          />
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {profile.name}
          </h2>
        </div>
        <p className="text-[17px] leading-relaxed text-[var(--foreground)]">
          {profile.bio}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
          인기글 TOP 5
        </h2>
        <ol className="flex flex-col gap-2 text-[17px]">
          {popularPosts.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="flex gap-2 text-[var(--foreground)] hover:text-[var(--accent-hover)]"
              >
                <span className="font-medium text-[var(--accent)]">{i + 1}.</span>
                <span className="line-clamp-2">{p.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">
          카테고리
        </h2>
        <ul className="flex flex-col gap-1 text-[17px]">
          {categories.map(({ name, count }) => (
            <li key={name}>
              <Link
                href={`/category/${encodeURIComponent(name)}`}
                className="text-[var(--foreground)] hover:text-[var(--accent)] dark:hover:text-[#60A5FA]"
              >
                {name}{" "}
                <span className="text-[var(--muted-fg)]">({count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
