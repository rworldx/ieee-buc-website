import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  MessagesSquare,
  Trophy,
  Users,
} from "lucide-react";
import Section from "@/components/layout/Section";
import PageHeader from "@/components/layout/PageHeader";
import VisionMissionSection from "@/components/home/VisionMissionSection";
import CTABand from "@/components/home/CTABand";
import { getLocale } from "@/lib/locale";
import { messages } from "@/lib/i18n";
import { generateMetadata as makeMetadata } from "@/lib/seo";
export async function generateMetadata() {
  const locale = await getLocale();
  const t = messages[locale];
  return makeMetadata({
    title: `${t.about} | IEEE BUC`,
    description: t.aboutDescription,
    path: "/about",
    locale,
  });
}
export default async function AboutPage() {
  const locale = await getLocale();
  const t = messages[locale];
  return (
    <>
      <PageHeader
        label={t.about}
        title={t.aboutTitle}
        description={t.aboutDescription}
      />
      <Section>
        <figure className="mb-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[21/9]">
            <Image
              src="/images/events/branch-launch/IMG_3145.jpg"
              alt={t.heroCaption}
              fill
              priority
              sizes="(max-width:768px) 90vw, 1184px"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-4 text-sm text-muted">
            {t.heroCaptionSmall}
          </figcaption>
        </figure>
        <VisionMissionSection locale={locale} />
      </Section>
      <Section className="bg-surface-soft">
        <h2 className="section-title max-w-2xl">{t.activities}</h2>
        <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {[
            { icon: Code2, title: t.workshops, text: t.workshopsText },
            { icon: MessagesSquare, title: t.talks, text: t.talksText },
            { icon: Trophy, title: t.competitions, text: t.competitionsText },
            { icon: Users, title: t.outreach, text: t.outreachText },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-5">
              <Icon
                size={26}
                aria-hidden="true"
                className="mt-1 shrink-0 text-link"
              />
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="max-w-3xl">
          <h2 className="section-title">{t.global}</h2>
          <p className="mt-7 text-lg leading-relaxed text-muted">
            {t.globalText}
          </p>
          <a
            href="https://www.ieee.org"
            target="_blank"
            rel="noopener noreferrer"
            className="action-link mt-6"
          >
            {t.ieee}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </Section>
      <CTABand locale={locale} />
    </>
  );
}
