'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { GalleryItem } from '@/lib/content';
import Lightbox from './Lightbox';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageItems = items.filter((item) => item.type === 'image');

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < imageItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square bg-neutral-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => {
              if (item.type === 'image') {
                const imageIndex = imageItems.findIndex((img) => img.id === item.id);
                openLightbox(imageIndex);
              } else if (item.videoUrl) {
                window.open(item.videoUrl, '_blank');
              }
            }}
          >
            <Image
              src={item.thumbnail}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Video Icon */}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={24} className="text-ieee-blue ml-1" fill="currentColor" />
                </div>
              </div>
            )}

            {/* Title on Hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-medium text-sm">{item.title}</p>
              <p className="text-white/80 text-xs">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={currentIndex}
        images={imageItems}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}

