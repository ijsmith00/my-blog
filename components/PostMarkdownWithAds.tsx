/**
 * H2 기준 광고 삽입: 첫 H2 위 1개, 이후 2개 H2마다 1개, 본문 끝 1개.
 * 모바일 목차는 첫 번째 광고 바로 아래(`mobileToc`)에 둡니다.
 */
import { Fragment, type ReactNode } from "react";
import { AdPlaceholder } from "./AdPlaceholder";
import { MarkdownBody } from "./MarkdownBody";
import { partitionMarkdownByH2 } from "@/lib/markdown-h2";

type Props = {
  content: string;
  /** H2가 있을 때 첫 광고 직후에 렌더 (모바일 접이식 TOC) */
  mobileToc?: ReactNode;
};

export function PostMarkdownWithAds({ content, mobileToc }: Props) {
  const { intro, h2Sections } = partitionMarkdownByH2(content);

  if (h2Sections.length === 0) {
    return (
      <>
        {mobileToc}
        {content.trim() ? <MarkdownBody content={content} /> : null}
        <div className="mx-auto mt-8 w-full max-w-[720px]">
          <AdPlaceholder />
        </div>
      </>
    );
  }

  return (
    <>
      {intro ? <MarkdownBody content={intro} /> : null}
      <div className="mx-auto w-full max-w-[720px]">
        <AdPlaceholder />
      </div>
      {mobileToc}
      {h2Sections.map((block, i) => (
        <Fragment key={i}>
          <MarkdownBody content={block} />
          {i % 2 === 1 ? (
            <div className="mx-auto w-full max-w-[720px]">
              <AdPlaceholder />
            </div>
          ) : null}
        </Fragment>
      ))}
      <div className="mx-auto mt-8 w-full max-w-[720px]">
        <AdPlaceholder />
      </div>
    </>
  );
}