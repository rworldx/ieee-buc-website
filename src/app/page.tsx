import { headers } from "next/headers";
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTABand from "@/components/home/CTABand";
import UpcomingSpotlight from "@/components/events/UpcomingSpotlight";
import { getUpcomingEvents } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { messages } from "@/lib/i18n";
import { generateMetadata as makeMetadata, safeJsonLd } from "@/lib/seo";
import { generateOrganizationSchema } from "@/lib/schema";
export async function generateMetadata() {
  const locale = await getLocale();
  return makeMetadata({
    title: `${messages[locale].branch} | ${messages[locale].college}`,
    description: messages[locale].heroDescription,
    locale,
  });
}
export default async function HomePage() {
  const locale = await getLocale();
  const next = getUpcomingEvents(locale)[0];
  const nonce = (await headers()).get("x-nonce") || undefined;
  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(generateOrganizationSchema()),
        }}
      />
      <Hero locale={locale} />
      {next && <UpcomingSpotlight event={next} locale={locale} />}
      <StatsSection locale={locale} />
      <BenefitsSection locale={locale} />
      <FeaturedEvents locale={locale} />
      <CTABand locale={locale} />
    </>
  );
}
