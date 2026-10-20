"use client";
import { useState } from "react";
import Section from "../layout/Section";
import GalleryGrid from "./GalleryGrid";
import type { GalleryItem } from "@/lib/content";
import { useSite } from "../providers/SiteProvider";
import { categoryLabel } from "@/lib/i18n";
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
      <GalleryGrid key={selected} items={filtered} />
    </Section>
  );
}
