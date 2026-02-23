'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import Lightbox from '@/components/gallery/Lightbox';

interface EventMediaProps {
    images: string[];
    videos: string[];
    eventTitle: string;
}

export default function EventMedia({ images, videos, eventTitle }: EventMediaProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Combine images and videos into a unified format for the lightbox, prioritizing videos
    const allMedia = [
        ...videos.map((url, index) => {
            // Use the generated thumbnails (v1.png, v2.png, etc.) based on index
            const thumb = url.replace('/videos/', '/images/').split('/').slice(0, -1).join('/') + `/v${index + 1}.png`;
            return {
                type: 'video' as const,
                thumbnail: thumb,
                videoUrl: url,
                title: `${eventTitle} - Video ${index + 1}`,
                alt: `${eventTitle} video ${index + 1}`,
            };
        }),
        ...images.map((url, index) => ({
            type: 'image' as const,
            thumbnail: url,
            fullSize: url,
            title: `${eventTitle} - Image ${index + 1}`,
            alt: `${eventTitle} gallery image ${index + 1}`,
        })),
    ];

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0));
    };

    if (allMedia.length === 0) return null;

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Gallery & Videos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allMedia.map((item, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square bg-neutral-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={item.thumbnail}
                            alt={item.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                        {/* Video Icon Overlay */}
                        {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                    <Play size={20} className="text-ieee-blue ml-1" fill="currentColor" />
                                </div>
                            </div>
                        )}

                        {/* Hover Indicator */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-ieee-blue/50 rounded-lg transition-colors pointer-events-none" />
                    </div>
                ))}
            </div>

            <Lightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                currentIndex={currentIndex}
                items={allMedia}
                onPrevious={handlePrevious}
                onNext={handleNext}
            />
        </div>
    );
}
