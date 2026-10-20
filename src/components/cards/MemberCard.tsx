import Image from "next/image";
import { Mail, Linkedin, UserRound } from "lucide-react";
import RoleBadge from "../team/RoleBadge";
import type { ExecutiveMember, Member } from "@/lib/content";
import { messages, type Locale } from "@/lib/i18n";
const arabicBios: Record<string, string> = {
  Counselor:
    "المستشارة الأكاديمية للفرع الطلابي لـ IEEE في كلية البريمي الجامعية",
  Chair: "تقود مبادرات الفرع الطلابي لـ IEEE في كلية البريمي الجامعية",
  "Vice Chair": "يدعم أعمال الفرع وتنسيق فعالياته",
  Secretary: "تتولى توثيق أعمال الفرع وتنظيم مراسلاته",
  Webmaster: "يتولى إدارة موقع IEEE BUC وحضوره الرقمي",
  Treasurer: "تتولى إدارة الشؤون المالية والميزانية للفرع",
};
const roles: Record<string, string> = {
  Counselor: "مستشارة الفرع",
  Chair: "رئيسة الفرع",
  "Vice Chair": "نائب الرئيس",
  Secretary: "أمينة السر",
  Webmaster: "مسؤول الموقع",
  Treasurer: "أمينة الصندوق",
  "Software Engineering": "هندسة البرمجيات",
  "Computer Science": "علوم الحاسب",
  "Information System": "نظم المعلومات",
};
export default function MemberCard({
  member,
  isExecutive = false,
  locale = "en",
}: {
  member: ExecutiveMember | Member;
  isExecutive?: boolean;
  locale?: Locale;
}) {
  const t = messages[locale];
  const role = "role" in member ? member.role : member.department || "";
  const avatarColors =
    member.gender === "female"
      ? "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-200"
      : member.gender === "male"
        ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200"
        : "bg-surface-soft text-link";
  return (
    <article
      className={`flex min-w-0 gap-5 rounded-2xl border border-line bg-surface ${isExecutive ? "flex-col p-6" : "items-center p-4"}`}
    >
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium ${avatarColors} ${isExecutive ? "size-20 text-xl" : "size-12 text-sm"}`}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <UserRound
            size={isExecutive ? 40 : 24}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3
          className={`${isExecutive ? "text-xl" : "text-base"} font-semibold leading-snug`}
        >
          <bdi>{member.name}</bdi>
        </h3>
        <div className="mt-2 flex min-w-0 items-center gap-2 text-sm text-link">
          {isExecutive && <RoleBadge role={role} />}
          <p>{locale === "ar" ? roles[role] || role : role}</p>
        </div>
        {isExecutive && "bio" in member && member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {locale === "ar" ? arabicBios[role] || member.bio : member.bio}
          </p>
        )}
        <div className="mt-auto flex gap-2 pt-4">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="icon-button"
              aria-label={`${t.emailPerson} ${member.name}`}
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label={`LinkedIn: ${member.name}`}
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
