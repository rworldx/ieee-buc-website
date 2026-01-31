import Section from '@/components/layout/Section';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import { getSiteInfo } from '@/lib/content';

export const metadata = {
  title: 'Contact Us - IEEE BUC Student Branch',
  description: 'Get in touch with the IEEE Student Branch at Buraimi University College. We would love to hear from you!',
};

export default function ContactPage() {
  const siteInfo = getSiteInfo();

  return (
    <>
      {/* Page Header */}
      <Section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-800">
            Contact Us
          </h1>
          <p className="text-xl text-neutral-600">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </Section>

      {/* Contact Content */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <ContactForm recipientEmail={siteInfo.email} />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

            <div className="space-y-6 mb-8">
              {/* Email */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-ieee-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-ieee-blue" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a href={`mailto:${siteInfo.email}`} className="text-neutral-600 hover:text-ieee-blue transition-colors">
                    {siteInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-ieee-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-ieee-blue" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <a href={`tel:${siteInfo.phone}`} className="text-neutral-600 hover:text-ieee-blue transition-colors">
                    {siteInfo.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-ieee-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-ieee-blue" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg mb-1">Address</h3>
                  <p className="text-neutral-600">{siteInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {siteInfo.socials.instagram && (
                  <a
                    href={siteInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 hover:bg-ieee-blue text-neutral-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {siteInfo.socials.facebook && (
                  <a
                    href={siteInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 hover:bg-ieee-blue text-neutral-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {siteInfo.socials.linkedin && (
                  <a
                    href={siteInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 hover:bg-ieee-blue text-neutral-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {siteInfo.socials.twitter && (
                  <a
                    href={siteInfo.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 hover:bg-ieee-blue text-neutral-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

