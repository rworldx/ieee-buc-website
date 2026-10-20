"use client";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Sun, Moon, Monitor, Languages } from "lucide-react";
import { useSite } from "../providers/SiteProvider";
type Theme = "light" | "dark" | "auto";
const subscribe = (notify: () => void) => {
  window.addEventListener("storage", notify);
  window.addEventListener("theme-change", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("theme-change", notify);
  };
};
const snapshot = (): Theme => {
  try {
    const v = localStorage.getItem("ieee-theme");
    return v === "light" || v === "dark" ? v : "auto";
  } catch {
    return "auto";
  }
};
export default function Preferences() {
  const { locale, t } = useSite();
  const pathname = usePathname();
  const theme = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "auto" as Theme,
  );
  function change(value: Theme) {
    try {
      localStorage.setItem("ieee-theme", value);
    } catch {}
    document.documentElement.setAttribute(
      "data-theme",
      value === "auto"
        ? matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value,
    );
    window.dispatchEvent(new Event("theme-change"));
  }
  const target =
    locale === "ar"
      ? pathname.replace(/^\/ar(?=\/|$)/, "") || "/"
      : `/ar${pathname === "/" ? "" : pathname}`;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={target}
        hrefLang={locale === "ar" ? "en" : "ar"}
        onClick={(event) => {
          event.currentTarget.href +=
            window.location.search + window.location.hash;
        }}
        aria-label={t.languageLabel}
        className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold hover:text-link"
      >
        <Languages size={17} aria-hidden="true" />
        {t.language}
      </a>
      <fieldset className="flex gap-1 rounded-full border border-line p-1">
        <legend className="sr-only">{t.theme}</legend>
        {(
          [
            { value: "light", icon: Sun, label: t.light },
            { value: "dark", icon: Moon, label: t.dark },
            { value: "auto", icon: Monitor, label: t.auto },
          ] as const
        ).map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={theme === value}
            onClick={() => change(value)}
            className={`flex size-11 items-center justify-center rounded-full transition-colors ${theme === value ? "bg-ieee-blue text-white" : "text-muted hover:bg-surface-soft"}`}
          >
            <Icon size={16} aria-hidden="true" />
          </button>
        ))}
      </fieldset>
    </div>
  );
}
