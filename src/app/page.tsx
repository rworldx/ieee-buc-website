import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import BenefitsSection from '@/components/home/BenefitsSection';
import CTABand from '@/components/home/CTABand';
import { generateOrganizationSchema } from '@/lib/schema';

export const metadata = {
  title: 'IEEE Student Branch - Buraimi University College',
  description: 'Official website of the IEEE Student Branch at Buraimi University College, Oman. Join us for workshops, events, and networking opportunities.',
};

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <Hero />
      <StatsSection />
      <FeaturedEvents />
      <BenefitsSection />
      <CTABand />
    </>
  );
}
