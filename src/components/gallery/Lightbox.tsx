"use client";
import { playbackVideoUrl } from "@/lib/video-media";
import { useEffect, useRef } from "react";
import { containDialogTab } from "@/lib/dialog-focus";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useSite } from "../providers/SiteProvider";
export interface MediaItem {
  type: "image" | "video";
  fullSize?: string;
  thumbnail: string;
  videoUrl?: string;
  title: string;
  alt: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  items: MediaItem[];
  onPrevious: () => void;
  onNext: () => void;
}
export default function Lightbox({
  isOpen,
  onClose,
  currentIndex,
  items,
  onPrevious,
  onNext,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t, locale } = useSite();
  const current = items[currentIndex];
  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) videoRef.current?.pause();
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      className="lightbox-dialog"
      aria-labelledby="media-title"
      onCancel={onClose}
      onKeyDown={(e) => {
        containDialogTab(e);
        if (e.target instanceof HTMLVideoElement) return;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (locale === "ar") onNext();
          else onPrevious();
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          if (locale === "ar") onPrevious();
          else onNext();
        }
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-4">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <p className="text-sm text-white/80">{t.mediaViewer}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeMedia}
            className="flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        {isOpen && current && (
          <>
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              {current.type === "video" ? (
                <video
                  ref={videoRef}
                  key={current.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  poster={current.thumbnail}
                  className="max-h-full max-w-full rounded-xl"
                  aria-label={current.title}
                >
                  <source src={playbackVideoUrl(current.videoUrl)} />
                  {t.videoFallback}
                </video>
              ) : (
                <Image
                  key={current.fullSize || current.thumbnail}
                  src={current.fullSize || current.thumbnail}
                  alt={current.alt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3 pb-[env(safe-area-inset-bottom)]">
              <h2
                id="media-title"
                className="max-w-2xl text-center text-base font-medium tracking-normal"
              >
                {current.title}
              </h2>
              <div className="flex items-center gap-6">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label={t.previous}
                    className="flex size-12 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"
                  >
                    <ChevronLeft className="directional" aria-hidden="true" />
                  </button>
                )}
                <p
                  className="text-sm tabular-nums text-white/80"
                  aria-live="polite"
                >
                  {new Intl.NumberFormat(locale).format(currentIndex + 1)} /{" "}
                  {new Intl.NumberFormat(locale).format(items.length)}
                </p>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label={t.next}
                    className="flex size-12 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"
                  >
                    <ChevronRight className="directional" aria-hidden="true" />
                  </button>
                )}
              </div>
              {current.type === "video" && (
                <a
                  href={current.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"
                >
                  {t.original}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
