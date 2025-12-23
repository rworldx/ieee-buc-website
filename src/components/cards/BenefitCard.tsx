import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-white rounded-[12px] p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 bg-ieee-blue/10 rounded-lg flex items-center justify-center mb-4">
        <Icon size={24} className="text-ieee-blue" />
      </div>
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

