import { getEvents, getTeam } from "@/lib/content";
import { messages, type Locale } from "@/lib/i18n";
export default function StatsSection({ locale = "en" }: { locale?: Locale }) {
  const t = messages[locale];
  const team = getTeam();
  const events = getEvents();
  const stats = [
    [team.executive.length + team.members.length, t.membersCount, true],
    [events.filter((e) => e.status === "past").length, t.pastCount, true],
    [
      events.filter((e) => e.status === "upcoming").length,
      t.upcomingCount,
      true,
    ],
  ] as const;
  return (
    <div className="container-custom">
      <dl className="grid gap-7 border-b border-line py-10 sm:grid-cols-3">
        {stats.map(([value, label, isMinimum]) => (
          <div key={label} className="flex items-center gap-4">
            <dt className="order-2 max-w-36 text-sm leading-relaxed text-muted">
              {label}
            </dt>
            <dd
              dir="ltr"
              className="whitespace-nowrap text-4xl font-semibold tracking-tight text-link tabular-nums"
            >
              {new Intl.NumberFormat(locale).format(value)}
              {isMinimum && (
                <span className="ms-0.5 align-top text-[0.65em] leading-none">
                  +
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
