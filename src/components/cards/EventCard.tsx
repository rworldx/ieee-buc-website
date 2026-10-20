import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Event } from "@/lib/content";
import { messages, localHref, categoryLabel, type Locale } from "@/lib/i18n";
import { formatEventDate } from "@/lib/event-utils";
export default function EventCard({
  event,
  locale = "en",
  headingLevel = 3,
}: {
  event: Event;
  locale?: Locale;
  headingLevel?: 2 | 3;
}) {
  const t = messages[locale];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-lg">
      <Link
        href={localHref(`/events/${event.slug}`, locale)}
        aria-label={event.title}
        className="relative block aspect-[16/10] overflow-hidden bg-surface-soft"
      >
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(max-width:767px) 90vw, (max-width:1023px) 45vw, 370px"
          className={
            event.imageFit === "contain"
              ? "object-contain p-3"
              : "object-cover transition-transform duration-300 group-hover:scale-[1.025]"
          }
        />
        <span className="absolute start-4 top-4 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
          {categoryLabel(event.type, locale)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
          <time dateTime={event.date}>
            {formatEventDate(event.date, locale)}
          </time>
          {event.status === "upcoming" && (
            <span className="text-link">· {t.upcoming}</span>
          )}
        </div>
        <Heading className="text-xl font-semibold leading-snug">
          <Link
            href={localHref(`/events/${event.slug}`, locale)}
            className="hover:text-link hover:underline"
          >
            {event.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {event.description}
        </p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
          <p className="flex items-center gap-2 text-xs text-muted">
            <MapPin size={15} className="shrink-0" aria-hidden="true" />
            {event.location}
          </p>
          <Link
            href={localHref(`/events/${event.slug}`, locale)}
            className="icon-button"
            aria-label={`${t.details}: ${event.title}`}
          >
            <ArrowUpRight
              size={18}
              className="directional"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
