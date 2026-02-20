import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-ieee-blue rounded-lg flex items-center justify-center text-white font-bold text-sm">
                IEEE
              </div>
              <h3 className="font-semibold text-lg text-white">BUC Student Branch</h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Advancing technology for humanity through innovation and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-neutral-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/team" className="text-neutral-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">IEEE.org</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/ieee.buc" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2" aria-label="Instagram">
                <Instagram size={20} />
                <span className="text-sm font-medium">@ieee.buc</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>© {currentYear} IEEE Student Branch - Buraimi University College. All rights reserved.</p>
          <p className="mt-2">Designed & Developed by IEEE BUC Webmaster</p>
        </div>
      </div>
    </footer>
  );
}

