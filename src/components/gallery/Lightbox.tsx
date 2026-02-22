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
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-[60] pointer-events-auto"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons - Tablet & Desktop */}
            {items.length > 1 && (
              <>
                <button
                  onClick={onPrevious}
                  className="hidden md:flex absolute left-4 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-20 pointer-events-auto"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={onNext}
                  className="hidden md:flex absolute right-4 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-20 pointer-events-auto"
                >
                  <ChevronRight size={48} />
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
              className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12 pointer-events-none"
            >
              <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                <div className="relative max-w-full max-h-full flex items-center justify-center bg-neutral-900 rounded-lg overflow-hidden shadow-2xl">
                  {currentItem.type === 'video' ? (
                    <video
                      key={currentItem.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="max-w-full max-h-[70vh] md:max-h-[85vh] w-auto h-auto"
                    >
                      <source src={currentItem.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="relative w-[90vw] h-[70vh] md:w-[80vw] md:h-[80vh]">
                      <Image
                        src={currentItem.fullSize || currentItem.thumbnail}
                        alt={currentItem.alt}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Navigation & Info */}
              <div className="mt-4 flex flex-col items-center space-y-4 pointer-events-auto w-full max-w-md">
                <div className="text-center">
                  <p className="text-white text-base md:text-lg font-medium line-clamp-1">{currentItem.title}</p>
                  <p className="text-white/60 text-sm">
                    {currentIndex + 1} / {items.length}
                  </p>
                </div>

                {/* Mobile Navigation Buttons */}
                {items.length > 1 && (
                  <div className="flex items-center space-x-8 md:hidden">
                    <button
                      onClick={onPrevious}
                      className="p-3 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      aria-label="Previous item"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={onNext}
                      className="p-3 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      aria-label="Next item"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

