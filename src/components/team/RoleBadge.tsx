import {
  BadgeCheck,
  ClipboardPenLine,
  CodeXml,
  GraduationCap,
  Handshake,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

const roleIcons: Record<string, LucideIcon> = {
  Counselor: GraduationCap,
  Chair: BadgeCheck,
  "Vice Chair": Handshake,
  Secretary: ClipboardPenLine,
  Webmaster: CodeXml,
  Treasurer: WalletCards,
};

/** A decorative circular cue paired with the visible role label. */
export default function RoleBadge({
  role,
  className = "text-link",
}: {
  role: string;
  className?: string;
}) {
  const Icon = roleIcons[role] ?? BadgeCheck;

  return (
    <span
      className={`flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-soft ${className}`}
      aria-hidden="true"
    >
      <Icon size={15} strokeWidth={1.9} />
    </span>
  );
}
