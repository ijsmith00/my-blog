/**
 * 마크다운을 H2(##) 기준으로 나눕니다. 첫 덩이는 인트로(선택), 이후는 각각 `##`로 시작하는 섹션입니다.
 */
export function partitionMarkdownByH2(markdown: string): {
  intro: string | null;
  h2Sections: string[];
} {
  const trimmed = markdown.trim();
  if (!trimmed) {
    return { intro: null, h2Sections: [] };
  }

  const parts = trimmed
    .split(/(?=^## (?!#))/m)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { intro: null, h2Sections: [] };
  }

  const first = parts[0];
  if (first.startsWith("##")) {
    return { intro: null, h2Sections: parts };
  }

  return { intro: parts[0], h2Sections: parts.slice(1) };
}
