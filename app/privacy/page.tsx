/**
 * 개인정보처리방침(/privacy): 법적 고지용 플레이스홀더. 실제 서비스 시 내용을 채웁니다.
 */
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Sidebar } from "@/components/Sidebar";
import { getAllCategories, getPopularPosts } from "@/lib/posts";
import { PROFILE, SITE_TITLE } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "개인정보처리방침",
    description: `${SITE_TITLE} 개인정보처리방침 페이지입니다.`,
    alternates: { canonical: "/privacy" },
    openGraph: {
      title: "개인정보처리방침",
      description: `${SITE_TITLE} 개인정보처리방침 페이지입니다.`,
      url: "/privacy",
    },
  };
}

export default function PrivacyPage() {
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
          개인정보처리방침
        </h1>
        <p className="mb-6">
          이 페이지는 샘플 템플릿입니다. 실제 서비스 시 수집하는 항목, 보관 기간,
          제3자 제공, 문의처 등을 명시해 주세요.
        </p>
        <p>
          쿠키·분석 도구·광고 네트워크를 연동할 경우 해당 사업자의 정책도 함께
          안내하는 것이 좋습니다.
        </p>
      </article>
    </TwoColumnLayout>
  );
}
