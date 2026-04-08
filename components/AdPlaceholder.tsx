/**
 * 실제 광고 스크립트 대신 쓰는 플레이스홀더 박스.
 * 포스트·사이드바 등 레이아웃 위치만 표시합니다.
 */
export function AdPlaceholder({ label = "광고 영역" }: { label?: string }) {
  return (
    <div
      className="flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] text-sm text-[var(--muted-fg)]"
      role="complementary"
      aria-label={label}
    >
      {label}
    </div>
  );
}
