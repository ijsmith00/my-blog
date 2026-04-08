/**
 * Tailwind CSS v4: 토큰은 주로 app/globals.css 의 @theme 와 CSS 변수로 둡니다.
 * 이 파일은 content 경로 스캔·IDE 연동용입니다.
 */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,tsx,mdx}",
    "./components/**/*.{js,ts,tsx,mdx}",
  ],
} satisfies Config;
