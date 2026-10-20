import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EventCard from "../cards/EventCard";
import Section from "../layout/Section";
import { getPastEvents } from "@/lib/content";
import { messages, localHref, type Locale } from "@/lib/i18n";
export default function FeaturedEvents({ locale = "en" }: { locale?: Locale }) {
  const t = messages[locale];
  const events = getPastEvents(locale).slice(0, 3);
  return (
    <Section className="bg-surface-soft">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-sm text-muted">{t.pastLabel}</p>
          <h2 className="section-title">{t.recent}</h2>
        </div>
        <Link
          href={localHref("/events?status=past", locale)}
          className="action-link"
        >
          {t.allActivities}
          <ArrowUpRight size={18} className="directional" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} locale={locale} />
        ))}
      </div>
    </Section>
  );
}
