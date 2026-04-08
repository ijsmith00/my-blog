"use client";

/**
 * 다크 모드: useSyncExternalStore로 테마를 읽고 localStorage·<html class="dark">와 동기화합니다.
 * Effect 안에서 setState를 쓰지 않아 React 19 ESLint 규칙과 맞춥니다.
 */
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "blog-theme";

type Theme = "light" | "dark";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<Ctx | null>(null);

function applyDom(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onChange: () => void) {
  const onStorage = () => onChange();
  const onPref = () => onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener("blog-theme-change", onStorage);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onPref);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("blog-theme-change", onStorage);
    mq.removeEventListener("change", onPref);
  };
}

function persistAndNotify(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new Event("blog-theme-change"));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    applyDom(theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    persistAndNotify(t);
  }, []);

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    persistAndNotify(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
