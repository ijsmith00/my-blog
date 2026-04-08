/**
 * 빌드 시 content/posts 기준으로 URL을 모아 /sitemap.xml 을 생성합니다.
 */
import type { MetadataRoute } from "next";
import { getAllPosts, getCategories } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

function baseUrl(): string {
  return SITE_URL.replace(/\/$/, "");
}

function lastModifiedFromDate(dateStr: string, fallback: Date): Date {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const root = baseUrl();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${root}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${root}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const posts = getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${root}/blog/${post.slug}`,
    lastModified: lastModifiedFromDate(post.date, now),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categories = getCategories();
  const categoryEntries: MetadataRoute.Sitemap = categories.map((name) => ({
    url: `${root}/category/${encodeURIComponent(name)}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...postEntries, ...categoryEntries];
}
