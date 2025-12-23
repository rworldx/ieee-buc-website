import Section from '@/components/layout/Section';
import MemberCard from '@/components/cards/MemberCard';
import { getTeam } from '@/lib/content';

export const metadata = {
  title: 'Our Team - IEEE BUC Student Branch',
  description: 'Meet the executive committee and members of the IEEE Student Branch at Buraimi University College.',
};

export default function TeamPage() {
  const { executive, members } = getTeam();

  return (
    <>
      {/* Page Header */}
      <Section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-800">
            Our Team
          </h1>
          <p className="text-xl text-neutral-600">
            Meet the dedicated students leading IEEE BUC Student Branch
          </p>
        </div>
      </Section>

      {/* Executive Committee */}
      <Section className="bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Executive Committee</h2>
          <p className="text-lg text-neutral-600">Leadership team guiding our branch activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executive.map((member) => (
            <MemberCard key={member.email} member={member} isExecutive={true} />
          ))}
        </div>
      </Section>

      {/* Members Section */}
      {members.length > 0 && (
        <Section className="bg-neutral-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Active Members</h2>
            <p className="text-lg text-neutral-600">Our dedicated community of students</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <MemberCard key={`${member.name}-${index}`} member={member} isExecutive={false} />
            ))}
          </div>
        </Section>
      )}

      {/* Join CTA */}
      <Section className="bg-ieee-blue text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            We&apos;re always looking for passionate students who want to make a difference through technology.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-ieee-blue rounded-lg font-semibold hover:bg-neutral-100 transition-colors shadow-lg"
          >
            Get in Touch
          </a>
        </div>
      </Section>
    </>
  );
}

