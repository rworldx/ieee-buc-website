import type { Metadata } from "next";
import { localHref, type Locale } from "./i18n";
import { defaultSocialImage } from "./social-preview";
export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_BASE_URL;
  return configured
    ? new URL(configured).origin
    : "https://ieee-buc-website.vercel.app";
}
export function generateMetadata({
  title,
  description,
  path = "",
  image = defaultSocialImage.url,
  locale = "en",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: Locale;
}): Metadata {
  const base = siteUrl();
  const route = path || "/";
  const absolute = new URL(image, base).href;
  const socialImage =
    image === defaultSocialImage.url
      ? { ...defaultSocialImage, url: absolute }
      : { url: absolute, alt: title };
  return {
    metadataBase: new URL(base),
    title,
    description,
    alternates: {
      canonical: localHref(route, locale),
      languages: { en: route, ar: localHref(route, "ar"), "x-default": route },
    },
    openGraph: {
      title,
      description,
      url: localHref(route, locale),
      siteName: "IEEE BUC Student Branch",
      images: [socialImage],
      locale: locale === "ar" ? "ar_OM" : "en_GB",
      alternateLocale: locale === "ar" ? ["en_GB"] : ["ar_OM"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: absolute, alt: socialImage.alt }],
    },
  };
}
export { safeJsonLd } from "./safe-json";
