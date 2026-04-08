/**
 * 마크다운 원문에서 H2(##), H3(###)만 추출해 목차(TOC)용 데이터를 만듭니다.
 * rehype-slug와 동일한 slug 규칙을 쓰기 위해 github-slugger로 id를 생성합니다.
 */
import GithubSlugger from "github-slugger";
import type { TocItem } from "./types";

function tocFromLines(
  markdown: string,
  idPrefix: string
): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const h3 = line.match(/^###\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    if (h3) {
      const text = h3[1].trim();
      items.push({
        id: `${idPrefix}${slugger.slug(text)}`,
        text,
        level: 3,
      });
    } else if (h2) {
      const text = h2[1].trim();
      items.push({
        id: `${idPrefix}${slugger.slug(text)}`,
        text,
        level: 2,
      });
    }
  }
  return items;
}

export function extractToc(markdown: string): TocItem[] {
  return tocFromLines(markdown, "");
}

/**
 * 본문을 두 덩이로 나눠 렌더할 때 두 번째 덩이의 제목 id는 rehype-slug의 prefix와 맞춥니다.
 */
export function extractTocFromParts(part1: string, part2: string): TocItem[] {
  const first = tocFromLines(part1, "");
  if (!part2.trim()) return first;
  const second = tocFromLines(part2, "m-");
  return [...first, ...second];
}
