import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  Download,
} from "lucide-react";
import Section from "@/components/layout/Section";
import EventMedia from "@/components/events/EventMedia";
import { getEventBySlug } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { messages, localHref, categoryLabel } from "@/lib/i18n";
import { formatEventDate, formatEventTime } from "@/lib/event-utils";
import { generateMetadata as makeMetadata, safeJsonLd } from "@/lib/seo";
import { generateEventSchema } from "@/lib/schema";
import { headers } from "next/headers";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const event = getEventBySlug(slug, locale);
  if (!event) return {};
  return makeMetadata({
    title: `${event.title} | IEEE BUC`,
    description: event.description,
    path: `/events/${event.slug}`,
    image: event.image,
    locale,
  });
}
export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = messages[locale];
  const event = getEventBySlug(slug, locale);
  if (!event) notFound();
  const nonce = (await headers()).get("x-nonce") || undefined;
  const time = formatEventTime(event.date, event.endDate, locale);
  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(generateEventSchema(event)),
        }}
      />
      <section className="bg-surface-soft py-12 md:py-16">
        <div className="container-custom">
          <Link href={localHref("/events", locale)} className="action-link mb-6">
            <ArrowLeft size={17} className="directional" aria-hidden="true" />
            {t.backEvents}
          </Link>
          <div className="mb-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-line bg-surface px-3 py-1.5">
              {categoryLabel(event.type, locale)}
            </span>
            <span className="py-1.5 text-link">
              {event.status === "upcoming" ? t.upcoming : t.past}
            </span>
          </div>
          <h1 className="page-title max-w-5xl">{event.title}</h1>
        </div>
      </section>
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold">{t.eventAbout}</h2>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted">
              {(event.longDescription || event.description)
                .split(/\n\n/)
                .map((p) => (
                  <p key={p}>{p}</p>
                ))}
            </div>
            {event.speakers && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold">{t.speakers}</h2>
                <div className="mt-6 space-y-6">
                  {event.speakers.map((speaker) => (
                    <article
                      key={speaker.name}
                      className="border-b border-line pb-6 last:border-0"
                    >
                      <h3 className="text-xl font-semibold">{speaker.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {speaker.role}
                      </p>
                      <p className="mt-1 text-sm text-link">
                        {speaker.organization}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
          <aside className="rounded-2xl border border-line bg-surface-soft p-6 sm:p-8">
            <dl className="space-y-6">
              {[
                {
                  icon: CalendarDays,
                  label: t.eventDate,
                  value: formatEventDate(event.date, locale, {
                    weekday: "long",
                  }),
                },
                ...(time
                  ? [{ icon: Clock3, label: t.eventTime, value: time }]
                  : []),
                { icon: MapPin, label: t.location, value: event.location },
                ...(event.admission
                  ? [
                      {
                        icon: Ticket,
                        label: t.admission,
                        value: event.admission,
                      },
                    ]
                  : []),
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon
                    size={20}
                    className="mt-1 shrink-0 text-link"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            {event.status === "upcoming" && event.registrationLink ? (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary mt-8 w-full"
              >
                {t.register}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-7 text-sm leading-relaxed text-muted">
                {t.eventEnded}
              </p>
            )}
            {event.status === "upcoming" && event.calendarLink && (
              <a
                href={event.calendarLink}
                className="button-secondary mt-3 w-full"
              >
                <Download size={17} aria-hidden="true" />
                {t.calendar}
              </a>
            )}
          </aside>
        </div>
        <figure className="mt-12">
          <a
            href={event.image}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative mx-auto block overflow-hidden rounded-2xl border border-line bg-surface-soft ${event.imageFit === "contain" ? "aspect-[4/5] max-w-xl" : "aspect-[4/3] md:aspect-[21/9]"}`}
            aria-label={t.poster}
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width:768px) 90vw, 800px"
              className={
                event.imageFit === "contain" ? "object-contain" : "object-cover"
              }
            />
          </a>
          <figcaption className="mt-3 text-center text-sm text-muted">
            {event.imageFit === "contain" && (
              <a
                href={event.image}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                {t.poster}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </figcaption>
        </figure>
        <EventMedia
          images={event.gallery || []}
          videos={event.videos || []}
          eventTitle={event.title}
        />
      </Section>
    </>
  );
}
