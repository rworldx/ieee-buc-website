'use client';

import { useState } from 'react';
import Section from '../layout/Section';
import GalleryGrid from './GalleryGrid';
import { GalleryItem } from '@/lib/content';

interface GalleryWithFilterProps {
  items: GalleryItem[];
  categories: string[];
}

export default function GalleryWithFilter({ items, categories }: GalleryWithFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <Section className="bg-white">
      {/* Category Filter */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-ieee-blue text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredItems.length > 0 ? (
        <GalleryGrid items={filteredItems} />
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg">
            No items found in this category.
          </p>
        </div>
      )}
    </Section>
  );
}

