/**
 * 포스트 상세 상단: 작성일 + 읽는 시간 (본문 글자 수, 분당 500자).
 */
import {
  formatReadingTimeMinutesLabel,
  getReadingTimeMinutes,
} from "@/lib/reading-time";

type Props = {
  date: string;
  content: string;
};

export function PostReadingMeta({ date, content }: Props) {
  const minutes = getReadingTimeMinutes(content);

  return (
    <p className="text-[15px] text-[#6B7280] dark:text-[#9CA3AF]">
      <time dateTime={date}>{date}</time>
      <span className="mx-2" aria-hidden>
        ·
      </span>
      <span className="tabular-nums">
        {formatReadingTimeMinutesLabel(minutes)}
      </span>
    </p>
  );
}
