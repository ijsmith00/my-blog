/**
 * 사이트 전역 설정(제목, 사이드바 프로필, SEO). 하드코딩된 운영 값은 여기만 수정하면 됩니다.
 */
export const SITE_TITLE = "My Blog";

/** JSON-LD `author` 등에 쓰는 운영자 표시 이름 (필요 시 변경) */
export const SITE_AUTHOR_NAME = "BlogName";

/** metadataBase·canonical 생성용 (배포 시 실제 도메인으로 변경) */
export const SITE_URL = "https://myblog.com";

/** title 기본값에 붙는 한 줄 설명 */
export const SITE_TAGLINE = "마크다운으로 쓰는 개인 블로그";

/**
 * 기본 meta description (약 50~160자 권장)
 */
export const SITE_DESCRIPTION =
  "마크다운으로 글을 작성하고 정적으로 배포하는 개인 블로그입니다. 개발·글쓰기·일상 이야기와 최신 포스트를 만나보세요.";

/** 홈(/) 전용 소개 문구 */
export const HOME_DESCRIPTION = SITE_DESCRIPTION;

/** frontmatter의 thumbnail이 비어 있을 때 사용 */
export const DEFAULT_POST_THUMBNAIL = "/thumbnails/markdown.svg";

/** Open Graph / Twitter 기본 이미지 (1200×630 권장, 파일은 추후 추가) */
export const OG_DEFAULT_IMAGE = "/images/og-default.png";

export const PROFILE = {
  name: "블로거",
  bio: "프론트엔드와 독서 이야기를 나눕니다. 광고·제휴 문의는 문의 페이지로 부탁드립니다.",
  avatarSrc: "/avatar.svg",
} as const;
