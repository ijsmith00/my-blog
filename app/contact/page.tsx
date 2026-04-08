/**
 * 문의(/contact): 방문자·광고주 연락용 안내. 실제 폼·메일 링크는 여기에 연결합니다.
 */
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Sidebar } from "@/components/Sidebar";
import { getAllCategories, getPopularPosts } from "@/lib/posts";
import { PROFILE, SITE_TITLE } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "문의",
    description: `${SITE_TITLE} 문의·제휴 안내 페이지입니다.`,
    alternates: { canonical: "/contact" },
    openGraph: {
      title: "문의",
      description: `${SITE_TITLE} 문의·제휴 안내 페이지입니다.`,
      url: "/contact",
    },
  };
}

export default function ContactPage() {
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
        <h1 className="mb-6 text-[32px] font-extrabold leading-tight">문의</h1>
        <p className="mb-6">
          제휴·광고·콘텐츠 관련 문의는 아래 이메일로 연락 주시거나, 사용 중인
          폼 서비스(Formspree, Google Forms 등)를 이 페이지에 임베드할 수
          있습니다.
        </p>
        <p>
          예시:{" "}
          <a
            href="mailto:hello@example.com"
            className="text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            hello@example.com
          </a>
        </p>
      </article>
    </TwoColumnLayout>
  );
}
