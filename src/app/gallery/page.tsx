import Section from '@/components/layout/Section';
import GalleryWithFilter from '@/components/gallery/GalleryWithFilter';
import { getGallery, getGalleryCategories } from '@/lib/content';

export const metadata = {
  title: 'Gallery - IEEE BUC Student Branch',
  description: 'Explore photos and videos from our events and activities at IEEE BUC Student Branch.',
};

export default function GalleryPage() {
  const allItems = getGallery();
  const categories = ['All', ...getGalleryCategories()];

  return (
    <>
      {/* Page Header */}
      <Section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-800">
            Gallery
          </h1>
          <p className="text-xl text-neutral-600">
            Explore photos and videos from our events and activities
          </p>
        </div>
      </Section>

      {/* Gallery with Filter */}
      <GalleryWithFilter items={allItems} categories={categories} />
    </>
  );
}

