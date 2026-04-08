/**
 * 블로그 포스트·목차 등에서 공통으로 쓰는 TypeScript 타입 정의.
 * 마크다운 frontmatter 필드와 앱 내부 Post 모델을 맞춥니다.
 */
export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  description: string;
  thumbnail: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** 카테고리 이름 + 해당 카테고리 글 개수 */
export interface CategoryWithCount {
  name: string;
  count: number;
}
