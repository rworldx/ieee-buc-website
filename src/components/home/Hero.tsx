import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { messages, localHref, type Locale } from "@/lib/i18n";
export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const t = messages[locale];
  return (
    <section className="overflow-hidden bg-surface">
      <div className="container-custom grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <p className="mb-7 flex items-center gap-3 text-sm font-medium text-link">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-ieee-blue"
            />
            {t.homeLabel}
          </p>
          <h1 className="text-[clamp(2.9rem,5.3vw,5.1rem)] font-semibold leading-[1.05]">
            {t.heroA}
            <span className="mt-2 block text-link">{t.heroB}</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            {t.heroDescription}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={localHref("/events", locale)}
              className="button-primary"
            >
              {t.viewEvents}
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="directional"
              />
            </Link>
            <Link
              href={localHref("/contact#join", locale)}
              className="action-link"
            >
              {t.join}
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="directional"
              />
            </Link>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-muted">
            {t.branch}
            <br />
            <span className="mt-1 inline-block font-medium text-ink">
              {t.college} · {t.oman}
            </span>
          </p>
        </div>
        <figure className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] rounded-ss-[80px] bg-surface-soft md:aspect-[1/1.02]">
            <Image
              src="/images/events/branch-launch/b24343d1-ffd3-4a2b-b21a-141166706cb3.JPG"
              alt={
                locale === "ar"
                  ? "المشاركون في حفل تدشين الفرع الطلابي في كلية البريمي الجامعية"
                  : "Participants at the IEEE BUC Student Branch launch ceremony"
              }
              fill
              sizes="(max-width: 1023px) 90vw, 550px"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="relative -mt-16 ms-6 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:ms-12">
            <p className="text-lg font-semibold tracking-tight">
              {t.heroCaption}
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xs leading-relaxed text-muted">
                {t.heroCaptionSmall}
              </p>
              <Link
                href={localHref("/events/branch-launch-ceremony", locale)}
                className="icon-button"
                aria-label={t.details}
              >
                <ArrowUpRight
                  size={19}
                  className="directional"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
