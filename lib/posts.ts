/**
 * /content/posts 의 .md 파일을 읽어 포스트 목록·단일 글·카테고리를 제공합니다.
 * 빌드 타임(fs) 전용 — 외부 DB 없이 SSG로 정적 페이지를 만들 때 사용합니다.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CategoryWithCount, Post, PostFrontmatter } from "./types";
import { DEFAULT_POST_THUMBNAIL } from "./site";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function readPostFile(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const full = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const thumb = typeof fm.thumbnail === "string" ? fm.thumbnail.trim() : "";
  return {
    slug,
    content,
    title: fm.title,
    date: fm.date,
    category: fm.category,
    description: fm.description,
    thumbnail: thumb || DEFAULT_POST_THUMBNAIL,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map(readPostFile);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const file = `${slug}.md`;
  const full = path.join(POSTS_DIR, file);
  if (!fs.existsSync(full)) return null;
  return readPostFile(file);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * 모든 포스트에서 category를 모아 개수를 세고, 글 개수 내림차순(동률이면 이름 순)으로 정렬합니다.
 */
export function getAllCategories(): CategoryWithCount[] {
  const posts = getAllPosts();
  const counts = new Map<string, number>();
  for (const p of posts) {
    const c = p.category?.trim();
    if (!c) continue;
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name, "ko");
    });
}

/** 카테고리 이름만 가나다순 (레거시·간단 목록용) */
export function getCategories(): string[] {
  return getAllCategories()
    .map((c) => c.name)
    .sort((a, b) => a.localeCompare(b, "ko"));
}

/** 특정 카테고리 글만, 날짜 내림차순 */
export function getPostsByCategory(category: string): Post[] {
  return getAllPosts()
    .filter((p) => p.category === category)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/** 사이드바 «인기글»: 조회수 없이 최신 5개로 대체 (필요 시 frontmatter 확장 가능) */
export function getPopularPosts(limit = 5): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getPopularPostsExcluding(
  excludeSlug: string | undefined,
  limit = 5
): Post[] {
  const posts = getAllPosts().filter((p) => p.slug !== excludeSlug);
  return posts.slice(0, limit);
}

/** 날짜 오름차순(오래된 글 → 최신) 기준 이전·다음 글. 이전=더 오래된 글, 다음=더 최신 글. */
export function getAdjacentPosts(currentSlug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const chronological = [...getAllPosts()].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const i = chronological.findIndex((p) => p.slug === currentSlug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? chronological[i - 1] : null,
    next: i < chronological.length - 1 ? chronological[i + 1] : null,
  };
}

/** 같은 카테고리, 현재 글 제외, 최신 순 최대 `limit`개 */
export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}
