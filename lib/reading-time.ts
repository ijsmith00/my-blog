/**
 * 마크다운 본문에서 공백 제외 글자 수로 읽는 시간을 계산합니다.
 * 분당 500자 기준, 최소 1분입니다.
 */

function stripMarkdownForCount(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~|]+/g, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReadingTimeMinutes(markdown: string): number {
  const plain = stripMarkdownForCount(markdown);
  if (!plain) return 1;

  const charsNoSpace = plain.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(charsNoSpace / 500));
}

/** UI용: "읽는 시간 N분" (앞 구분점은 메타 줄에서 처리) */
export function formatReadingTimeMinutesLabel(minutes: number): string {
  return `읽는 시간 ${minutes}분`;
}
