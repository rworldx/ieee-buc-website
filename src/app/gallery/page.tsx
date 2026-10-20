import PageHeader from "@/components/layout/PageHeader";
import GalleryWithFilter from "@/components/gallery/GalleryWithFilter";
import { getGallery } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { messages } from "@/lib/i18n";
import { generateMetadata as makeMetadata } from "@/lib/seo";
export async function generateMetadata() {
  const locale = await getLocale();
  const t = messages[locale];
  return makeMetadata({
    title: `${t.gallery} | IEEE BUC`,
    description: t.galleryDescription,
    path: "/gallery",
    locale,
  });
}
export default async function GalleryPage() {
  const locale = await getLocale();
  const t = messages[locale];
  const items = getGallery(locale);
  return (
    <>
      <PageHeader
        label={t.gallery}
        title={t.galleryTitle}
        description={t.galleryDescription}
      />
      <GalleryWithFilter
        items={items}
        categories={["All", ...new Set(items.map((i) => i.category))]}
      />
    </>
  );
}
