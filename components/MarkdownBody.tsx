/**
 * 마크다운 → React (GFM + rehype-slug). prose 스펙은 포스트 상세 요구사항과 동일합니다.
 */
import type { PluggableList } from "unified";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

type Props = {
  content: string;
  slugPrefix?: string;
};

const proseText = "text-[#333] dark:text-[#E0E0E0]";

const linkClass =
  "text-[#2563EB] no-underline hover:underline dark:text-[#3B82F6] dark:hover:text-[#60A5FA]";

export function MarkdownBody({ content, slugPrefix }: Props) {
  const rehypePlugins: PluggableList = slugPrefix
    ? [[rehypeSlug, { prefix: slugPrefix }]]
    : [rehypeSlug];

  return (
    <div
      className={`md-content mx-auto w-full max-w-[720px] text-[18px] leading-[1.8] ${proseText}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        components={{
          h1: ({ children, ...props }) => (
            <h1
              className={`mb-6 mt-0 scroll-mt-24 text-[32px] font-extrabold leading-tight ${proseText}`}
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className={`mb-6 mt-12 scroll-mt-24 border-b border-[#E5E7EB] pb-2 text-[24px] font-bold leading-snug dark:border-[#2D2D2D] ${proseText}`}
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className={`mb-6 mt-8 scroll-mt-24 text-[20px] font-semibold leading-snug ${proseText}`}
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className={`mb-6 mt-6 scroll-mt-24 text-lg font-semibold ${proseText}`}
              {...props}
            >
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p className={`mb-6 text-[18px] leading-[1.8] ${proseText}`} {...props}>
              {children}
            </p>
          ),
          a: ({ children, ...props }) => (
            <a className={linkClass} {...props}>
              {children}
            </a>
          ),
          ul: ({ children, ...props }) => (
            <ul
              className={`mb-6 list-disc space-y-2 pl-6 marker:text-[#333] dark:marker:text-[#E0E0E0] ${proseText}`}
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className={`mb-6 list-decimal space-y-2 pl-6 marker:text-[#333] dark:marker:text-[#E0E0E0] ${proseText}`}
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-[1.8]" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className={`mb-6 border-l-4 border-[#2563EB] bg-[#F9FAFB] p-4 not-italic dark:bg-[#1E1E1E] ${proseText}`}
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded px-[6px] py-[2px] text-[15px] text-[#333] dark:bg-[#2D2D2D] dark:text-[#E0E0E0] bg-[#F3F4F6]"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="mb-6 overflow-x-auto rounded-lg bg-[#1E1E1E] p-5 text-[16px] leading-relaxed text-[#E0E0E0]"
              {...props}
            >
              {children}
            </pre>
          ),
          hr: () => (
            <hr className="my-10 border-0 border-t border-[#E5E7EB] dark:border-[#2D2D2D]" />
          ),
          img: ({ src, alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === "string" ? src : ""}
              alt={alt ?? ""}
              className="my-6 mx-auto block max-w-full rounded-lg"
              {...props}
            />
          ),
          table: ({ children, ...props }) => (
            <div className="mb-6 overflow-x-auto">
              <table
                className={`w-full border-collapse border border-[#E5E7EB] text-left text-[18px] dark:border-[#2D2D2D] ${proseText}`}
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-3 dark:border-[#2D2D2D] dark:bg-[#1E1E1E]"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-[#E5E7EB] px-3 py-3 dark:border-[#2D2D2D]"
              {...props}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
