import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { getEventBySlug, getEvents } from '@/lib/content';
import { generateEventSchema } from '@/lib/schema';
import EventMedia from '@/components/events/EventMedia';

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const events = getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const eventSchema = generateEventSchema(event);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-ieee-blue text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            {event.type}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-800">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center text-neutral-600">
              <Calendar size={20} className="mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-neutral-600">
              <MapPin size={20} className="mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Content Section */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-neutral-600 leading-relaxed">
              {event.longDescription || event.description}
            </p>
          </div>

          {/* Registration Button */}
          {event.status === 'upcoming' && event.registrationLink && (
            <div className="mt-8">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-ieee-blue text-white rounded-lg font-semibold hover:bg-ieee-blue-light transition-colors shadow-lg"
              >
                Register Now
                <ExternalLink size={20} className="ml-2" />
              </a>
            </div>
          )}

          {/* Event Media (Gallery & Videos) */}
          <EventMedia
            images={event.gallery || []}
            videos={event.videos || []}
            eventTitle={event.title}
          />
        </div>
      </Section>
    </>
  );
}

