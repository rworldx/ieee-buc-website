import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { getSiteInfo } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { messages, localHref } from "@/lib/i18n";
export default async function Footer() {
  const site = getSiteInfo();
  const locale = await getLocale();
  const t = messages[locale];
  return (
    <footer className="border-t border-line bg-surface-soft">
      <div className="container-custom py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href={localHref("/", locale)} aria-label={t.home}>
              <BrandLogo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t.footer}
            </p>
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-normal">
              {t.explore}
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-1">
              {[
                [t.about, "/about"],
                [t.events, "/events"],
                [t.gallery, "/gallery"],
                [t.team, "/team"],
                [t.contact, "/contact"],
                [t.join, "/contact#join"],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={localHref(href, locale)}
                    className="inline-flex min-h-11 items-center text-sm text-muted hover:text-link hover:underline"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-normal">
              {t.connected}
            </h2>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                <Instagram size={18} aria-hidden="true" />
                <bdi>@ieee.buc</bdi>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={`mailto:${site.email}`} className="action-link">
                <Mail size={18} aria-hidden="true" />
                {t.emailBranch}
              </a>
              <a
                href={site.ieeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                {t.ieee}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs leading-relaxed text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t.rights}
          </p>
          <p>
            {t.college} · {t.oman}
          </p>
        </div>
      </div>
    </footer>
  );
}
