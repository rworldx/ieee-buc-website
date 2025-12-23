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
      <div className={`relative ${isExecutive ? 'w-32 h-32' : 'w-24 h-24'} mx-auto mb-4 rounded-full overflow-hidden bg-neutral-100`}>
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
        />
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
        
        {'email' in member && (
          <div className="flex justify-center space-x-3">
            <a
              href={`mailto:${member.email}`}
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
        )}
      </div>
    </div>
  );
}

