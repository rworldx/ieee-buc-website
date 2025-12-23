import { BookOpen, Users, Briefcase, Award } from 'lucide-react';
import BenefitCard from '../cards/BenefitCard';
import Section from '../layout/Section';

const benefits = [
  {
    icon: BookOpen,
    title: 'Professional Development',
    description: 'Access to IEEE resources, publications, and learning materials to enhance your technical skills.',
  },
  {
    icon: Users,
    title: 'Networking Opportunities',
    description: 'Connect with students, professionals, and industry leaders in the technology field.',
  },
  {
    icon: Briefcase,
    title: 'Career Advancement',
    description: 'Gain practical experience through workshops, competitions, and real-world projects.',
  },
  {
    icon: Award,
    title: 'Recognition & Awards',
    description: 'Earn recognition for your contributions and achievements within the IEEE community.',
  },
];

export default function BenefitsSection() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Join IEEE BUC?</h2>
        <p className="text-xl text-neutral-600">Discover the benefits of being part of our community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.title}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </Section>
  );
}

