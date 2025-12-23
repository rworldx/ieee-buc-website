import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '@/lib/content';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block bg-white rounded-[12px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-ieee-blue text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          {event.type}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-3 group-hover:text-ieee-blue transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center text-sm text-neutral-600 mb-2">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm text-neutral-600 mb-4">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-neutral-600 text-sm line-clamp-2">
          {event.description}
        </p>
      </div>
    </Link>
  );
}

