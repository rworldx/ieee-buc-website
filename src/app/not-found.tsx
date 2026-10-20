import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { messages, localHref } from "@/lib/i18n";
export default async function NotFound() {
  const locale = await getLocale();
  const t = messages[locale];
  return (
    <section className="container-custom py-24 text-center">
      <p className="text-sm font-medium text-link">404</p>
      <h1 className="page-title mt-5">{t.notFound}</h1>
      <p className="mt-5 text-muted">{t.notFoundText}</p>
      <Link href={localHref("/", locale)} className="button-primary mt-8">
        {t.goHome}
      </Link>
    </section>
  );
}
