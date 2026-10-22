import {
  BadgeCheck,
  ClipboardPenLine,
  CodeXml,
  GraduationCap,
  Handshake,
  IdCard,
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
  Member: IdCard,
};

/** A decorative circular cue paired with the visible role label. */
export default function RoleBadge({ role }: { role: string }) {
  const Icon = roleIcons[role] ?? BadgeCheck;

  return (
    <span
      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
      aria-hidden="true"
    >
      <Icon size={15} strokeWidth={1.9} />
    </span>
  );
}
