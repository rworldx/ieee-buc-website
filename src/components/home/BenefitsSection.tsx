import Link from "next/link";
import { ArrowUpRight, Code2, Users, Lightbulb } from "lucide-react";
import Section from "../layout/Section";
import { messages, localHref, type Locale } from "@/lib/i18n";
export default function BenefitsSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = messages[locale];
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div>
          <h2 className="section-title max-w-sm">{t.communityTitle}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t.communityDescription}
          </p>
          <Link href={localHref("/about", locale)} className="action-link mt-6">
            {t.communityLink}
            <ArrowUpRight
              size={18}
              className="directional"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div>
          {[
            { icon: Code2, title: t.learn, text: t.learnText },
            { icon: Users, title: t.connect, text: t.connectText },
            { icon: Lightbulb, title: t.contribute, text: t.contributeText },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-5 border-b border-line py-6 first:pt-0 last:border-0"
            >
              <Icon
                size={25}
                className="mt-1 shrink-0 text-link"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
