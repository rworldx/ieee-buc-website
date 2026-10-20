import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "../layout/Section";
import { messages, localHref, type Locale } from "@/lib/i18n";
export default function CTABand({ locale = "en" }: { locale?: Locale }) {
  const t = messages[locale];
  return (
    <Section>
      <div className="flex flex-col justify-between gap-8 rounded-3xl border border-line bg-surface-soft p-7 sm:p-12 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">{t.ctaTitle}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            {t.ctaText}
          </p>
        </div>
        <Link
          href={localHref("/contact", locale)}
          className="button-primary shrink-0 self-start lg:self-center"
        >
          {t.contact}
          <ArrowUpRight size={18} className="directional" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
