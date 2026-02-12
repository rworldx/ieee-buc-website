import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';
import { ExecutiveMember, Member } from '@/lib/content';

interface MemberCardProps {
  member: ExecutiveMember | Member;
  isExecutive?: boolean;
}

export default function MemberCard({ member, isExecutive = false }: MemberCardProps) {
  const regularMember = member as Member;

  return (
    <div className={`bg-white rounded-[12px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${isExecutive ? 'p-6' : 'p-4'}`}>
      <div className={`relative ${isExecutive ? 'w-32 h-32' : 'w-24 h-24'} mx-auto mb-4 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center`}>
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${member.gender === 'female' ? 'bg-pink-50' : 'bg-blue-50'}`}>
            {member.gender === 'female' ? (
              <svg className="w-3/4 h-3/4 text-pink-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            ) : (
              <svg className="w-3/4 h-3/4 text-blue-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            )}
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className={`font-semibold ${isExecutive ? 'text-xl' : 'text-lg'} mb-1`}>
          {member.name}
        </h3>
        <p className="text-ieee-blue font-medium text-sm mb-2">
          {'role' in member ? member.role : regularMember.department}
        </p>

        {'bio' in member && member.bio && isExecutive && (
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
            {member.bio}
          </p>
        )}

        <div className="flex justify-center space-x-3">
          <a
            href={`mailto:${member.email || 'ieee@buc.edu.om'}`}
            className="text-neutral-600 hover:text-ieee-blue transition-colors"
            aria-label={`Email ${member.name}`}
          >
            <Mail size={18} />
          </a>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-ieee-blue transition-colors"
              aria-label={`${member.name} on LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

