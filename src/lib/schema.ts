import { Event } from './content';

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IEEE Student Branch - Buraimi University College',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      'https://instagram.com/ieee_buc',
      'https://facebook.com/ieeebuc',
      'https://linkedin.com/company/ieee-buc',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'ieee@buc.edu.om',
      contactType: 'General Inquiries',
    },
  };
}

export function generateEventSchema(event: Event) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: 'Buraimi University College, Al Buraimi, Oman',
    },
    image: `${baseUrl}${event.image}`,
    organizer: {
      '@type': 'Organization',
      name: 'IEEE BUC Student Branch',
      url: baseUrl,
    },
    eventStatus: event.status === 'upcoming'
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
}

