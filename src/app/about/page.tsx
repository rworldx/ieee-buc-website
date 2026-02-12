import Section from '@/components/layout/Section';
import AboutCard from '@/components/about/AboutCard';
import { ExternalLink, Target, Lightbulb, History, Rocket } from 'lucide-react';

export const metadata = {
  title: 'About Us - IEEE BUC Student Branch',
  description: 'Learn about the IEEE Student Branch at Buraimi University College, our mission, vision, and activities.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <Section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-800">
            About Us
          </h1>
          <p className="text-xl text-neutral-600">
            Empowering the next generation of engineers and technologists at Buraimi University College
          </p>
        </div>
      </Section>

      {/* Mission Section */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <AboutCard title="Our Mission" icon={<Target size={28} className="text-ieee-blue" />}>
            <p>
              To advance students' professional and technical abilities through organised engagement between industry-based technology and academics at the BUC.
            </p>
          </AboutCard>
        </div>
      </Section>

      {/* Vision Section */}
      <Section className="bg-neutral-50">
        <div className="max-w-5xl mx-auto space-y-8">
          <AboutCard title="Our Vision" icon={<Lightbulb size={28} className="text-ieee-blue" />}>
            <p>
              To become a leading IEEE Student Branch, promoting innovation and technical advancement among BUC students.
            </p>
          </AboutCard>
        </div>
      </Section>


      {/* What We Do Section */}
      <Section className="bg-neutral-50">
        <div className="max-w-5xl mx-auto space-y-8">
          <AboutCard title="What We Do" icon={<Rocket size={28} className="text-ieee-blue" />}>
            <div className="space-y-8 mt-4">
              <div>
                <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Technical Workshops</h3>
                <p>
                  Hands-on sessions covering Arduino, Python, web development, machine learning, and more. Our workshops are designed for all skill levels, from beginners to advanced practitioners.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Guest Lectures</h3>
                <p>
                  We invite industry professionals and academics to share their insights and experiences, providing students with real-world perspectives on technology and career development.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Competitions</h3>
                <p>
                  Host and participate in hackathons, coding challenges, and innovation contests that push the boundaries of creativity and technical skill.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Networking Events</h3>
                <p>
                  Connect with IEEE members globally and locally through our events, building relationships that last beyond university.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Community Service</h3>
                <p>
                  Technology outreach and educational initiatives aimed at giving back to our community and inspiring the next generation of engineers.
                </p>
              </div>
            </div>
          </AboutCard>
        </div>
      </Section>

      {/* IEEE Affiliation Section */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <AboutCard
            title="IEEE Global Affiliation"
            icon={<ExternalLink size={28} className="text-ieee-blue" />}
          >
            <p>
              As a recognized IEEE Student Branch, we are connected to the world&apos;s largest technical professional organization dedicated to advancing technology for the benefit of humanity.
            </p>
            <p>
              IEEE membership provides students with unparalleled access to resources, networking opportunities, and professional development tools that support academic excellence and career advancement.
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6">Membership Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-ieee-blue pl-4 py-2">
                  <h4 className="font-semibold text-neutral-800 mb-2">Technical Resources</h4>
                  <p className="text-neutral-600 text-base">
                    Access to IEEE&apos;s vast library of technical publications, journals, and research papers
                  </p>
                </div>

                <div className="border-l-4 border-ieee-blue pl-4 py-2">
                  <h4 className="font-semibold text-neutral-800 mb-2">Global Networking</h4>
                  <p className="text-neutral-600 text-base">
                    Connect with over 400,000 IEEE members worldwide across diverse technical fields
                  </p>
                </div>

                <div className="border-l-4 border-ieee-blue pl-4 py-2">
                  <h4 className="font-semibold text-neutral-800 mb-2">Professional Development</h4>
                  <p className="text-neutral-600 text-base">
                    Career guidance, mentorship programs, and professional skill-building resources
                  </p>
                </div>

                <div className="border-l-4 border-ieee-blue pl-4 py-2">
                  <h4 className="font-semibold text-neutral-800 mb-2">Educational Discounts</h4>
                  <p className="text-neutral-600 text-base">
                    Reduced rates for conferences, publications, and professional learning materials
                  </p>
                </div>

                <div className="border-l-4 border-ieee-blue pl-4 py-2">
                  <h4 className="font-semibold text-neutral-800 mb-2">Recognition Programs</h4>
                  <p className="text-neutral-600 text-base">
                    Awards and honors recognizing outstanding contributions and achievements
                  </p>
                </div>

                <div className="border-l-4 border-ieee-blue pl-4 py-2">
                  <h4 className="font-semibold text-neutral-800 mb-2">Industry Access</h4>
                  <p className="text-neutral-600 text-base">
                    Direct connections to leading technology companies and research institutions
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200">
              <a
                href="https://www.ieee.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-ieee-blue text-white rounded-lg font-semibold hover:bg-ieee-blue-light transition-colors shadow-md"
              >
                Learn More at IEEE.org
                <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
          </AboutCard>
        </div>
      </Section>
    </>
  );
}
