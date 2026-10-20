import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import EventsFilter from "@/components/events/EventsFilter";
import { getEvents } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { messages } from "@/lib/i18n";
import { generateMetadata as makeMetadata } from "@/lib/seo";
export async function generateMetadata() {
  const locale = await getLocale();
  const t = messages[locale];
  return makeMetadata({
    title: `${t.events} | IEEE BUC`,
    description: t.eventDescription,
    path: "/events",
    locale,
  });
}
export default async function EventsPage() {
  const locale = await getLocale();
  const t = messages[locale];
  return (
    <>
      <PageHeader
        label={t.events}
        title={t.eventIntro}
        description={t.eventDescription}
      />
      <Suspense>
        <EventsFilter events={getEvents(locale)} />
      </Suspense>
    </>
  );
}
