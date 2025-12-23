import Section from '@/components/layout/Section';
import EventsFilter from '@/components/events/EventsFilter';
import { getEvents } from '@/lib/content';

export const metadata = {
  title: 'Events - IEEE BUC Student Branch',
  description: 'Explore our workshops, seminars, competitions, and social events at IEEE BUC Student Branch.',
};

export default function EventsPage() {
  const allEvents = getEvents();

  return (
    <>
      {/* Page Header */}
      <Section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-800">
            Events
          </h1>
          <p className="text-xl text-neutral-600">
            Explore our workshops, seminars, competitions, and social events
          </p>
        </div>
      </Section>

      {/* Events List with Filter */}
      <EventsFilter events={allEvents} />
    </>
  );
}

