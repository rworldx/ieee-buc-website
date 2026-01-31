import Section from '@/components/layout/Section';
import { Target, Lightbulb } from 'lucide-react';

export default function VisionMissionSection() {
    return (
        <Section className="bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-800">
                        Vision & Mission
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Guiding our journey to empower students through technology and innovation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision Card */}
                    <div className="bg-white rounded-[16px] p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-ieee-blue to-blue-600 rounded-[12px] flex items-center justify-center mb-6">
                            <Target size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800">Our Vision</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            To become a leading IEEE BUC Student Branch, promoting innovation and technical advancement among BUC students.
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-white rounded-[16px] p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-[12px] flex items-center justify-center mb-6">
                            <Lightbulb size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800">Our Mission</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            To advance students' professional and technical abilities through organised engagement between industry-based technology and academics at the BUC.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
