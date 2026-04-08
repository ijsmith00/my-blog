/**
 * 카테고리별 포스트 목록(/category/[name]). SSG, 날짜 내림차순, 빈 목록 메시지.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";
import {
  getAllCategories,
  getPostsByCategory,
  getPopularPosts,
} from "@/lib/posts";
import { PROFILE } from "@/lib/site";

type Props = { params: Promise<{ name: string }> };

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ name: c.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const title = `${decoded} 관련 글 모음`;
  const description = `${decoded} 카테고리의 최신 글을 모아놓은 페이지입니다.`;
  const path = `/category/${encodeURIComponent(decoded)}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const category = decodeURIComponent(name);

  const known = new Set(getAllCategories().map((c) => c.name));
  if (!known.has(category)) {
    notFound();
  }

  const posts = getPostsByCategory(category);
  const categories = getAllCategories();
  const popular = getPopularPosts(5);

  return (
    <TwoColumnLayout
      sidebar={
        <Sidebar
          popularPosts={popular}
          categories={categories}
          profile={PROFILE}
        />
      }
    >
      <div>
        <h1 className="mb-8 text-[32px] font-extrabold leading-tight text-[var(--foreground)]">
          📁 {category}
        </h1>
        {posts.length === 0 ? (
          <p className="text-[17px] text-[var(--muted-fg)]">
            아직 글이 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        )}
      </div>
    </TwoColumnLayout>
  );
}
