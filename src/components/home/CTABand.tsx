import Link from 'next/link';
import { Mail } from 'lucide-react';
import Section from '../layout/Section';

export default function CTABand() {
  return (
    <Section className="bg-ieee-blue text-white">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Join IEEE BUC and be part of a community that&apos;s shaping the future of technology.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-ieee-blue rounded-lg font-semibold hover:bg-neutral-100 transition-colors shadow-lg"
        >
          <Mail size={20} className="mr-2" />
          Contact Us
        </Link>
      </div>
    </Section>
  );
}

