"use client";
import { useState } from "react";
import Image from "next/image";
import { Play, Expand } from "lucide-react";
import type { GalleryItem } from "@/lib/content";
import { useSite } from "../providers/SiteProvider";
import { categoryLabel } from "@/lib/i18n";
import Lightbox from "./Lightbox";
export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { locale, t } = useSite();
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <figure key={item.id} className="min-w-0">
            <button
              type="button"
              aria-label={`${t.openMedia}: ${item.title}`}
              onClick={() => {
                setCurrent(index);
                setOpen(true);
              }}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-surface-soft"
            >
              <Image
                src={item.thumbnail}
                alt={item.alt}
                fill
                sizes="(max-width:639px) 90vw, (max-width:1023px) 45vw, 370px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
              />
              <span className="absolute bottom-3 end-3 flex size-10 items-center justify-center rounded-full bg-white text-ieee-blue shadow-sm">
                {item.type === "video" ? (
                  <Play size={19} aria-hidden="true" />
                ) : (
                  <Expand size={18} aria-hidden="true" />
                )}
              </span>
              {item.type === "video" && (
                <span className="absolute start-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800">
                  {t.video}
                </span>
              )}
            </button>
            <figcaption className="py-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs text-muted">
                {categoryLabel(item.category, locale)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <Lightbox
        isOpen={open}
        onClose={() => setOpen(false)}
        currentIndex={current}
        items={items}
        onPrevious={() =>
          setCurrent((i) => (i - 1 + items.length) % items.length)
        }
        onNext={() => setCurrent((i) => (i + 1) % items.length)}
      />
    </>
  );
}
