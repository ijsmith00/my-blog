/**
 * 홈페이지(/): 최신 포스트 목록(썸네일·제목·요약·날짜) + 사이드바.
 * 빌드 시 getAllPosts()로 정적 HTML이 생성됩니다.
 */
import type { Metadata } from "next";
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getAllCategories, getPopularPosts } from "@/lib/posts";
import {
  HOME_DESCRIPTION,
  PROFILE,
  SITE_TAGLINE,
  SITE_TITLE,
} from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${SITE_TITLE} - ${SITE_TAGLINE}`,
    description: HOME_DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
      title: `${SITE_TITLE} - ${SITE_TAGLINE}`,
      description: HOME_DESCRIPTION,
      url: "/",
    },
  };
}

export default function HomePage() {
  const posts = getAllPosts();
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
          최신 포스트
        </h1>
        <div className="flex flex-col gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </div>
    </TwoColumnLayout>
  );
}
