import Section from '../layout/Section';

const stats = [
  { label: 'Active Members', value: '15+' },
  { label: 'events coming', value: '5+' },
  { label: 'months active', value: '3+' },
  { label: 'workshops', value: '3+' },
];

export default function StatsSection() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-ieee-blue mb-2">
              {stat.value}
            </div>
            <div className="text-neutral-600 text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

