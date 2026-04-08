/**
 * 포스트 상세(/blog/[slug]): 뱃지·메타·본문(H2 광고)·이전/다음·관련 글.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Sidebar } from "@/components/Sidebar";
import { PostMarkdownWithAds } from "@/components/PostMarkdownWithAds";
import { PostReadingMeta } from "@/components/PostReadingMeta";
import { TableOfContents } from "@/components/TableOfContents";
import { PostAdjacentNav } from "@/components/PostAdjacentNav";
import { PostRelatedSection } from "@/components/PostRelatedSection";
import { BlogPostingJsonLd } from "@/components/BlogPostingJsonLd";
import { extractToc } from "@/lib/extract-toc";
import {
  getAdjacentPosts,
  getAllSlugs,
  getAllCategories,
  getPostBySlug,
  getPopularPostsExcluding,
  getRelatedPosts,
} from "@/lib/posts";
import {
  DEFAULT_POST_THUMBNAIL,
  OG_DEFAULT_IMAGE,
  PROFILE,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "글 없음" };

  const published = new Date(post.date);
  const publishedTime = Number.isNaN(published.getTime())
    ? undefined
    : published.toISOString();

  const ogImage =
    post.thumbnail && post.thumbnail !== DEFAULT_POST_THUMBNAIL
      ? post.thumbnail
      : OG_DEFAULT_IMAGE;
  const postUrl = new URL(`/blog/${slug}`, SITE_URL).href;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: SITE_TITLE,
      title: post.title,
      description: post.description,
      url: postUrl,
      images: [{ url: ogImage, alt: post.title }],
      publishedTime,
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const tocItems = extractToc(post.content);
  const categories = getAllCategories();
  const popular = getPopularPostsExcluding(slug, 5);
  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, post.category, 3);
  const postUrl = new URL(`/blog/${slug}`, SITE_URL).href;

  return (
    <>
      <BlogPostingJsonLd
        headline={post.title}
        description={post.description}
        datePublished={post.date}
        url={postUrl}
      />
      <TwoColumnLayout
        sidebar={
          <Sidebar
            popularPosts={popular}
            categories={categories}
            profile={PROFILE}
          />
        }
      >
        <article>
          <header className="mx-auto mb-6 max-w-[720px]">
            <Link
              href={`/category/${encodeURIComponent(post.category)}`}
              className="mb-3 inline-block rounded-full bg-[#2563EB] px-3 py-1 text-[13px] font-medium text-white dark:bg-[#3B82F6]"
            >
              {post.category}
            </Link>
            <h1 className="mb-3 text-[32px] font-extrabold leading-tight text-[#333] dark:text-[#E0E0E0]">
              {post.title}
            </h1>
            <PostReadingMeta date={post.date} content={post.content} />
          </header>

          <div className="mx-auto mb-8 max-w-[720px] overflow-hidden rounded-lg border border-[#E5E7EB] dark:border-[#2D2D2D]">
            <div className="relative aspect-[21/9] w-full max-h-[320px]">
              <Image
                src={post.thumbnail}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
          </div>

          <div className="md:grid md:grid-cols-[minmax(0,1fr)_220px] md:gap-8">
            <div>
              <PostMarkdownWithAds
                content={post.content}
                mobileToc={
                  <TableOfContents variant="mobile" items={tocItems} />
                }
              />
              <PostAdjacentNav prev={prev} next={next} />
              <PostRelatedSection posts={related} />
            </div>
            <div className="hidden md:block">
              <TableOfContents variant="desktop" items={tocItems} />
            </div>
          </div>
        </article>
      </TwoColumnLayout>
    </>
  );
}
