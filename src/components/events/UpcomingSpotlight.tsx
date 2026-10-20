import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Video } from "lucide-react";
import type { Event } from "@/lib/content";
import { messages, localHref, type Locale } from "@/lib/i18n";
import { formatEventDate, formatEventTime } from "@/lib/event-utils";
export default function UpcomingSpotlight({
  event,
  locale,
}: {
  event: Event;
  locale: Locale;
}) {
  const t = messages[locale];
  return (
    <section
      className="container-custom py-5 md:py-8"
      aria-labelledby="upcoming-title"
    >
      <div className="blue-section grid overflow-hidden rounded-3xl lg:grid-cols-[1.4fr_.75fr]">
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-white/40 px-3 py-1.5">
              {t.nextEvent}
            </span>
            <span>{event.admission}</span>
          </div>
          <h2
            id="upcoming-title"
            className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl"
          >
            {event.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90">
            {event.description}
          </p>
          <div className="mt-7 space-y-3 text-sm">
            <p className="flex items-center gap-3">
              <CalendarDays size={18} aria-hidden="true" />
              <time dateTime={event.date}>
                {formatEventDate(event.date, locale, { weekday: "long" })}
              </time>
            </p>
            <p className="flex items-center gap-3">
              <Clock3 size={18} aria-hidden="true" />
              {formatEventTime(event.date, event.endDate, locale)}
            </p>
            <p className="flex items-center gap-3">
              <Video size={18} aria-hidden="true" />
              {event.location}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localHref(`/events/${event.slug}`, locale)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ieee-blue hover:underline"
            >
              {t.details}
              <ArrowUpRight
                size={18}
                className="directional"
                aria-hidden="true"
              />
            </Link>
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {t.register}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        <Link
          href={localHref(`/events/${event.slug}`, locale)}
          className="relative m-6 mt-0 block aspect-[4/5] self-center overflow-hidden rounded-2xl bg-white lg:ms-0 lg:mt-6"
          aria-label={t.poster}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 1023px) 80vw, 360px"
            className="object-contain"
          />
        </Link>
      </div>
    </section>
  );
}
