/**
 * 본문 중간에 광고 플레이스홀더를 넣기 위해 마크다운을 대략 절반으로 나눕니다.
 * 빈 줄 기준 블록으로 쪼갠 뒤 앞/뒤 묶음으로 합칩니다. 블록이 하나뿐이면 뒤쪽은 빈 문자열입니다.
 */
export function splitMarkdownAtMiddle(markdown: string): [string, string] {
  const trimmed = markdown.trim();
  const blocks = trimmed.split(/\n\n+/);
  if (blocks.length <= 1) {
    return [trimmed, ""];
  }
  const mid = Math.ceil(blocks.length / 2);
  return [blocks.slice(0, mid).join("\n\n"), blocks.slice(mid).join("\n\n")];
}
