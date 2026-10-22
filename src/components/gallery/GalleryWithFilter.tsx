"use client";
import { useState } from "react";
import Section from "../layout/Section";
import GalleryGrid from "./GalleryGrid";
import type { GalleryItem } from "@/lib/content";
import { useSite } from "../providers/SiteProvider";
import { categoryLabel } from "@/lib/i18n";
import { formatEventDate } from "@/lib/event-utils";
export default function GalleryWithFilter({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: string[];
}) {
  const { locale, t } = useSite();
  const [selected, setSelected] = useState("All");
  const filtered =
    selected === "All" ? items : items.filter((i) => i.category === selected);
  const groups = new Map<string, GalleryItem[]>();
  for (const item of filtered) {
    const key = item.postId || "archive";
    groups.set(key, [...(groups.get(key) || []), item]);
  }
  return (
    <Section>
      <div className="mb-6 flex flex-wrap gap-2" aria-label={t.gallery}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="filter-button"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
          >
            {category === "All" ? t.all : categoryLabel(category, locale)}
          </button>
        ))}
      </div>
      <p className="mb-8 text-sm text-muted" role="status">
        {t.results}: {new Intl.NumberFormat(locale).format(filtered.length)}
      </p>
      <div key={selected} className="space-y-16">
        {Array.from(groups, ([id, media]) => {
          const post = media[0];
          return (
            <section
              key={id}
              aria-labelledby={`post-${id}`}
              className={`border-t border-line pt-8 ${media.length === 1 ? "lg:grid lg:grid-cols-2 lg:items-start lg:gap-12" : ""}`}
            >
              <div className="mb-6 max-w-3xl">
                {post.publishedAt && (
                  <p className="mb-2 text-sm text-muted">
                    {locale === "ar" ? "نُشر في " : "Posted "}
                    <time dateTime={post.publishedAt}>
                      {formatEventDate(post.publishedAt, locale)}
                    </time>
                  </p>
                )}
                <h2 id={`post-${id}`} className="text-2xl font-semibold">
                  {post.postTitle ||
                    (locale === "ar"
                      ? "من أرشيف الفرع"
                      : "From the branch archive")}
                </h2>
                {post.caption && (
                  <p className="mt-3 leading-relaxed text-muted">
                    {post.caption}
                  </p>
                )}
                {post.sourceUrl && (
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link mt-3 min-h-11"
                  >
                    {locale === "ar"
                      ? "المنشور الأصلي على إنستغرام"
                      : "Original Instagram post"}
                  </a>
                )}
              </div>
              <GalleryGrid items={media} />
            </section>
          );
        })}
      </div>
    </Section>
  );
}
