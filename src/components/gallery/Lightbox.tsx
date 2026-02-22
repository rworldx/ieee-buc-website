'use client';

import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  items: {
    type: 'image' | 'video';
    fullSize?: string;
    thumbnail: string;
    videoUrl?: string;
    title: string;
    alt: string
  }[];
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
}: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrevious();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 z-50"
          />

          {/* Lightbox Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-[60]"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {items.length > 1 && (
              <>
                <button
                  onClick={onPrevious}
                  className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-20"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  onClick={onNext}
                  className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-20"
                  aria-label="Next item"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            {/* Content Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl w-full flex flex-col items-center"
            >
              <div className="relative bg-neutral-900 rounded-lg overflow-hidden max-h-[80vh] aspect-video w-[85vw] flex items-center justify-center">
                {currentItem.type === 'video' ? (
                  <video
                    key={currentItem.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-full"
                  >
                    <source src={currentItem.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={currentItem.fullSize || currentItem.thumbnail}
                    alt={currentItem.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium">{currentItem.title}</p>
                <p className="text-white/60">
                  {currentIndex + 1} / {items.length}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

