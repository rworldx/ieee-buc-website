"use client";
import { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useSite } from "../providers/SiteProvider";
import { localHref } from "@/lib/i18n";
import MobileMenu from "./MobileMenu";
import Preferences from "./Preferences";
export default function Navbar() {
  const { locale, t } = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/events", label: t.events },
    { href: "/gallery", label: t.gallery },
    { href: "/team", label: t.team },
    { href: "/contact", label: t.contact },
  ].map((link) => ({ ...link, href: localHref(link.href, locale) }));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <nav
        aria-label={t.nav}
        className="container-custom flex h-20 items-center justify-between gap-4"
      >
        <Link
          href={localHref("/", locale)}
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
