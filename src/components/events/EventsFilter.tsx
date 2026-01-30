'use client';

import { useState } from 'react';
import Section from '../layout/Section';
import EventCard from '../cards/EventCard';
import { Event } from '@/lib/content';

type FilterType = 'all' | 'upcoming' | 'past';

interface EventsFilterProps {
  events: Event[];
}

export default function EventsFilter({ events }: EventsFilterProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'past');

  const displayedEvents =
    filter === 'upcoming' ? upcomingEvents :
      filter === 'past' ? pastEvents :
        events;

  return (
    <Section className="bg-white">
      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-neutral-100 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${filter === 'all'
              ? 'bg-white text-ieee-blue shadow-md'
              : 'text-neutral-600 hover:text-neutral-800'
              }`}
          >
            All Events
          </button>

          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${filter === 'upcoming'
                ? 'bg-white text-ieee-blue shadow-md'
                : 'text-neutral-600 hover:text-neutral-800'
              }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${filter === 'past'
              ? 'bg-white text-ieee-blue shadow-md'
              : 'text-neutral-600 hover:text-neutral-800'
              }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {displayedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg">
            No events found in this category.
          </p>
        </div>
      )}
    </Section>
  );
}

