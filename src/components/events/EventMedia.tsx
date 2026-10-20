"use client";
import GalleryGrid from "../gallery/GalleryGrid";
import { useSite } from "../providers/SiteProvider";
export default function EventMedia({
  images,
  videos,
  eventTitle,
}: {
  images: string[];
  videos: string[];
  eventTitle: string;
}) {
  const { t, locale } = useSite();
  const items = [
    ...videos.map((url, i) => ({
      id: url,
      type: "video" as const,
      thumbnail:
        url.replace("/videos/", "/images/").split("/").slice(0, -1).join("/") +
        `/v${i + 1}.png`,
      videoUrl: url,
      title: `${eventTitle} · ${t.video} ${new Intl.NumberFormat(locale).format(i + 1)}`,
      alt: `${eventTitle} · ${t.video} ${i + 1}`,
      category: "Events",
    })),
    ...images.map((url, i) => ({
      id: url,
      type: "image" as const,
      thumbnail: url,
      fullSize: url,
      title: `${eventTitle} · ${t.image} ${new Intl.NumberFormat(locale).format(i + 1)}`,
      alt: `${eventTitle} · ${t.image} ${i + 1}`,
      category: "Events",
    })),
  ];
  if (!items.length) return null;
  return (
    <section className="mt-16 border-t border-line pt-12">
      <h2 className="mb-8 text-3xl font-semibold">{t.eventMedia}</h2>
      <GalleryGrid items={items} />
    </section>
  );
}
