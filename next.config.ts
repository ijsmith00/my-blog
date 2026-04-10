/**
 * Next.js 빌드 설정. 정적 블로그는 기본값으로도 SSG가 가능하며,
 * 이미지 도메인 등을 추가할 때 여기서 확장하면 됩니다.
 */
import type { NextConfig } from "next";

/** apex → www (SITE_URL과 동일 호스트로 통일, 서치 콘솔·canonical과 일치) */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "promptarchitect.kr" }],
        destination: "https://www.promptarchitect.kr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
