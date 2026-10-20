import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
import { localHref } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/events",
    "/gallery",
    "/team",
    "/contact",
    ...getEvents().map((e) => `/events/${e.slug}`),
  ];
  return paths.flatMap((path) =>
    (["en", "ar"] as const).map((locale) => ({
      url: `${siteUrl()}${localHref(path, locale)}`,
      alternates: {
        languages: {
          en: `${siteUrl()}${path}`,
          ar: `${siteUrl()}${localHref(path, "ar")}`,
        },
      },
    })),
  );
}
