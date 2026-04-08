import { SITE_AUTHOR_NAME } from "@/lib/site";

type Props = {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
};

function toIsoDateTime(value: string): string {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toISOString();
}

/**
 * 포스트별 BlogPosting JSON-LD (schema.org).
 * Next.js 권장: 네이티브 script + XSS 완화용 `<` 이스케이프.
 */
export function BlogPostingJsonLd({
  headline,
  description,
  datePublished,
  url,
}: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished: toIsoDateTime(datePublished),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR_NAME,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
