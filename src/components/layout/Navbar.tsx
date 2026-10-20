"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useSite } from "../providers/SiteProvider";
import { localHref } from "@/lib/i18n";
import MobileMenu from "./MobileMenu";
import Preferences from "./Preferences";
export default function Navbar() {
  const { locale, t } = useSite();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let floating = false;
    const syncHeader = () => {
      // Hysteresis keeps the header stable near the transition boundary.
      const next = window.scrollY > (floating ? 24 : 64);
      if (next !== floating) {
        floating = next;
        headerRef.current?.setAttribute("data-floating", String(next));
      }
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    return () => window.removeEventListener("scroll", syncHeader);
  }, []);
  const links = useMemo(
    () =>
      [
        { href: "/", label: t.home },
        { href: "/about", label: t.about },
        { href: "/events", label: t.events },
        { href: "/gallery", label: t.gallery },
        { href: "/team", label: t.team },
        { href: "/contact", label: t.contact },
      ].map((link) => ({ ...link, href: localHref(link.href, locale) })),
    [locale, t],
  );

  // Desktop links are visible and Next can prefetch them automatically. The
  // mobile links live in a closed dialog, so they never enter the viewport.
  // Warm the same routes after hydration so a phone tap does not wait for the
  // route payload to begin downloading.
  useEffect(() => {
    for (const link of links) router.prefetch(link.href);
  }, [links, router]);
  return (
    <header ref={headerRef} className="site-header sticky top-0 z-40">
      <nav
        aria-label={t.nav}
        className="container-custom flex h-20 items-center justify-between gap-2"
      >
        <Link
          href={`${localHref("/", locale)}#top`}
          onClick={(event) => {
            if (
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return;
            if (pathname === localHref("/", locale)) {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              });
            }
          }}
          aria-label={`${t.branch} · ${t.home}`}
          className="flex shrink-0 items-center gap-3"
        >
          <BrandLogo />
          <span className="hidden border-s border-line ps-3 text-xs font-medium leading-relaxed min-[1700px]:block">
            {t.college}
            <br />
            {t.branch}
          </span>
        </Link>
        <ul className="hidden items-center gap-5 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" || link.href === "/ar"
                ? pathname === link.href
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center border-b-2 text-sm font-medium transition-colors hover:text-link ${active ? "border-ieee-blue text-link" : "border-transparent text-muted"}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden lg:block">
          <Preferences />
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a
            className="px-2 py-3 text-sm font-semibold"
            href={
              locale === "ar"
                ? pathname.replace(/^\/ar(?=\/|$)/, "") || "/"
                : `/ar${pathname === "/" ? "" : pathname}`
            }
            onClick={(event) => {
              event.currentTarget.href +=
                window.location.search + window.location.hash;
            }}
            aria-label={t.languageLabel}
          >
            {t.language}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="icon-button"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </nav>
      <MobileMenu isOpen={open} onClose={() => setOpen(false)} links={links} />
    </header>
  );
}
