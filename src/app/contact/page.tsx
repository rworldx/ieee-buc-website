import { ArrowUpRight, MapPin, Instagram } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import ContactForm from "@/components/forms/ContactForm";
import { getSiteInfo } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { messages } from "@/lib/i18n";
import { generateMetadata as makeMetadata } from "@/lib/seo";
export async function generateMetadata() {
  const locale = await getLocale();
  const t = messages[locale];
  return makeMetadata({
    title: `${t.contact} | IEEE BUC`,
    description: t.contactDescription,
    path: "/contact",
    locale,
  });
}
export default async function ContactPage() {
  const locale = await getLocale();
  const t = messages[locale];
  const site = getSiteInfo();
  return (
    <>
      <PageHeader
        label={t.contact}
        title={t.contactTitle}
        description={t.contactDescription}
      />
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div id="email-branch" className="scroll-mt-28">
            <h2 className="section-title">{t.emailBranch}</h2>
            <p className="mt-6 leading-relaxed text-muted">
              {t.contactDescription}
            </p>
            <a href={`mailto:${site.email}`} className="action-link mt-5">
              <bdi>{site.email}</bdi>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <div className="mt-10 space-y-4 border-t border-line pt-6">
              <p className="flex items-start gap-3 text-sm text-muted">
                <MapPin
                  size={19}
                  className="shrink-0 text-link"
                  aria-hidden="true"
                />
                <span>
                  {t.college}
                  <br />
                  {t.oman}
                </span>
              </p>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                <Instagram size={19} aria-hidden="true" />
                <bdi>@ieee.buc</bdi>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="min-w-0 rounded-3xl border border-line p-6 sm:p-8">
            <ContactForm recipientEmail={site.email} />
          </div>
        </div>
      </Section>
    </>
  );
}
