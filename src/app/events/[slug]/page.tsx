import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { getEventBySlug, getEvents } from '@/lib/content';
import { generateEventSchema } from '@/lib/schema';

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

          {/* Gallery Section */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {event.videos && event.videos.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.videos.map((video, index) => (
                  <div key={index} className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                    <video
                      controls
                      playsInline
                      className="w-full h-full"
                      preload="metadata"
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

