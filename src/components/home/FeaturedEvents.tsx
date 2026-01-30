import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import EventCard from '../cards/EventCard';
import Section from '../layout/Section';
import { getEvents } from '@/lib/content';

export default function FeaturedEvents() {
  const events = getEvents();
  const featured = events.slice(0, 3);

  return (
    <Section className="bg-neutral-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Events</h2>
        <p className="text-xl text-neutral-600">Explore our workshops, seminars, and activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featured.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/events"
          className="inline-flex items-center text-ieee-blue font-semibold hover:text-ieee-blue-light transition-colors text-lg"
        >
          View All Events
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </Section>
  );
}

