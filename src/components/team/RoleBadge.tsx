import {
  ClipboardPenLine,
  CodeXml,
  Coins,
  Gavel,
  GraduationCap,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const roleIcons: Record<string, LucideIcon> = {
  Counselor: GraduationCap,
  Chair: Gavel,
  "Vice Chair": UsersRound,
  Secretary: ClipboardPenLine,
  Webmaster: CodeXml,
  Treasurer: Coins,
};

/** A quiet visual cue paired with the visible role label. */
export default function RoleBadge({ role }: { role: string }) {
  const Icon = roleIcons[role] ?? UsersRound;

  return (
    <span
      className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
      aria-hidden="true"
    >
      <Icon size={15} strokeWidth={1.8} />
    </span>
  );
}
