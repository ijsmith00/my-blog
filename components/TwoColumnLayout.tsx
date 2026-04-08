/**
 * 데스크톱: 본문 70% + 사이드바 30% (10열 그리드 7:3).
 * 모바일: 세로 스택으로 본문 먼저, 사이드바는 아래로 이동합니다.
 */
export function TwoColumnLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-10 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">{children}</div>
        <aside className="min-w-0 lg:col-span-3">{sidebar}</aside>
      </div>
    </div>
  );
}
