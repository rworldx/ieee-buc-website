import type { Locale } from "./i18n";
export function eventDate(value: string): Date {
  return new Date(value.length === 10 ? `${value}T12:00:00+04:00` : value);
}
export function formatEventDate(
  value: string,
  locale: Locale = "en",
  options: Intl.DateTimeFormatOptions = {},
): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-OM" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Muscat",
    ...options,
  }).format(eventDate(value));
}
export function isUpcoming(
  event: { date: string; endDate?: string },
  now = Date.now(),
): boolean {
  const end =
    event.endDate ||
    (event.date.length === 10 ? `${event.date}T23:59:59+04:00` : event.date);
  return new Date(end).getTime() >= now;
}
export function formatEventTime(
  start: string,
  end?: string,
  locale: Locale = "en",
): string | null {
  if (start.length === 10) return null;
  const format = new Intl.DateTimeFormat(locale === "ar" ? "ar-OM" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Muscat",
  });
  return `${format.format(new Date(start))}${end ? ` – ${format.format(new Date(end))}` : ""} ${locale === "ar" ? "(بتوقيت عُمان)" : "(Oman time)"}`;
}
