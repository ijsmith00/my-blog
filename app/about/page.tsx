/**
 * 소개 페이지(/about): 블로그 운영 목적과 프로필 요약.
 */
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Sidebar } from "@/components/Sidebar";
import { getAllCategories, getPopularPosts } from "@/lib/posts";
import { PROFILE, SITE_TITLE } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "소개",
    description: `${SITE_TITLE} 소개 페이지`,
    alternates: { canonical: "/about" },
    openGraph: {
      title: "소개",
      description: `${SITE_TITLE} 소개 페이지`,
      url: "/about",
    },
  };
}

export default function AboutPage() {
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
      <article className="mx-auto max-w-[720px] text-[18px] leading-[1.8] text-[var(--foreground)]">
        <h1 className="mb-6 text-[32px] font-extrabold leading-tight">
          About {SITE_TITLE}
        </h1>
        <p className="mb-6">
          안녕하세요. 이 블로그는 Next.js와 마크다운만으로 운영되는 블로그
          템플릿입니다. 광고 슬롯은 실제 스크립트 대신 플레이스홀더로 표시되어 있어
          원하는 광고 네트워크 코드로 쉽게 교체할 수 있습니다.
        </p>
        <p className="mb-6">
          카테고리별 글은 상단 메뉴와 사이드바에서 이동할 수 있으며, 포스트는{" "}
          <code className="rounded bg-[var(--code-bg)] px-1 text-[16px]">
            /content/posts
          </code>
          의 Markdown 파일로 관리합니다.
        </p>
        <p>
          문의·제휴는{" "}
          <a
            href="/contact"
            className="text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            문의 페이지
          </a>
          를 이용해 주세요.
        </p>
      </article>
    </TwoColumnLayout>
  );
}
