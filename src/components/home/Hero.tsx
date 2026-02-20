import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container-custom text-center">
        <div className="flex justify-center mb-2">
          <Image
            src="/images/logo.png"
            alt="IEEE BUC Logo"
            width={200}
            height={200}
            className="w-48 h-48 md:w-56 md:h-56 object-contain"
            priority
          />
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-800">
          IEEE Student Branch
          <span className="block text-ieee-blue mt-2">Buraimi University College</span>
        </h1>

        <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto">
          Advancing technology for humanity through innovation, collaboration, and professional development.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-ieee-blue text-white rounded-lg font-semibold hover:bg-ieee-blue-light transition-colors shadow-lg hover:shadow-xl"
          >
            Join Us
            <ArrowRight size={20} className="ml-2" />
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-ieee-blue border-2 border-ieee-blue rounded-lg font-semibold hover:bg-ieee-blue hover:text-white transition-colors"
          >
            View Events
          </Link>
        </div>
      </div>
    </section>
  );
}

