import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import MemberCard from "@/components/cards/MemberCard";
import CTABand from "@/components/home/CTABand";
import { getTeam } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { messages } from "@/lib/i18n";
import { generateMetadata as makeMetadata } from "@/lib/seo";
export async function generateMetadata() {
  const locale = await getLocale();
  const t = messages[locale];
  return makeMetadata({
    title: `${t.team} | IEEE BUC`,
    description: t.teamDescription,
    path: "/team",
    locale,
  });
}
export default async function TeamPage() {
  const locale = await getLocale();
  const t = messages[locale];
  const { executive, members } = getTeam();
  return (
    <>
      <PageHeader
        title={t.teamTitle}
        description={t.teamDescription}
        label={t.team}
      />
      <Section>
        <div className="mb-9">
          <h2 className="section-title">{t.executive}</h2>
          <p className="mt-4 text-muted">{t.executiveDescription}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {executive.map((member) => (
            <MemberCard
              key={member.email}
              member={member}
              isExecutive
              locale={locale}
            />
          ))}
        </div>
      </Section>
      <Section className="bg-surface-soft">
        <h2 className="section-title">{t.members}</h2>
        <p className="mt-4 text-muted">{t.membersDescription}</p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} locale={locale} />
          ))}
        </div>
      </Section>
      <CTABand locale={locale} />
    </>
  );
}
