import { getSiteInfo, type Event } from "./content";
import { siteUrl } from "./seo";
export function generateOrganizationSchema() {
  const site = getSiteInfo();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.siteName,
    url: siteUrl(),
    logo: `${siteUrl()}/images/logo.png`,
    sameAs: [site.socials.instagram].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      contactType: "General enquiries",
    },
  };
}
export function generateEventSchema(event: Event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate,
    eventAttendanceMode: `https://schema.org/${event.online ? "Online" : "Offline"}EventAttendanceMode`,
    eventStatus: "https://schema.org/EventScheduled",
    location: event.online
      ? {
          "@type": "VirtualLocation",
          url: event.registrationLink || `${siteUrl()}/events/${event.slug}`,
        }
      : {
          "@type": "Place",
          name: event.location,
          address: "Buraimi University College, Al Buraimi, Oman",
        },
    image: new URL(event.image, siteUrl()).href,
    organizer: {
      "@type": "Organization",
      name: "IEEE BUC Student Branch",
      url: siteUrl(),
    },
    ...(event.admission
      ? {
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "OMR",
            url: event.registrationLink,
          },
        }
      : {}),
  };
}
