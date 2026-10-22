import "server-only";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { Locale } from "./i18n";
import { isUpcoming } from "./event-utils";
import arabicEvents from "@/content/ar/events.json";
const safeUrl = z
  .string()
  .url()
  .refine(
    (value) => new URL(value).protocol === "https:",
    "Only HTTPS links are accepted",
  );
const localMedia = z
  .string()
  .regex(/^\/(images|videos)\/[a-zA-Z0-9_./-]+$/)
  .refine((value) => !value.includes(".."), "Invalid media path");
const date = z
  .string()
  .refine(
    (value) =>
      /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value) &&
      Number.isFinite(Date.parse(value)),
    "Invalid date",
  );
export const EventSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date,
  endDate: date.optional(),
  dateLabel: z.string().optional(),
  type: z.string(),
  status: z.enum(["upcoming", "past"]),
  description: z.string(),
  longDescription: z.string().optional(),
  location: z.string(),
  image: localMedia,
  imageFit: z.enum(["contain", "cover"]).optional(),
  online: z.boolean().optional(),
  admission: z.string().optional(),
  calendarLink: safeUrl.optional(),
  gallery: z.array(localMedia).optional(),
  videos: z.array(localMedia).optional(),
  registrationLink: safeUrl.optional(),
  speakers: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
        organization: z.string(),
      }),
    )
    .optional(),
});
const optionalLink = z.union([z.literal(""), safeUrl]).optional();
export const ExecutiveMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  email: z.string().email(),
  photo: z.union([z.literal(""), localMedia]),
  bio: z.string().optional(),
  linkedin: optionalLink,
  gender: z.enum(["male", "female"]).optional(),
});
export const MemberSchema = z.object({
  name: z.string(),
  department: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: optionalLink,
  photo: z.union([z.literal(""), localMedia]),
  gender: z.enum(["male", "female"]).optional(),
});
export const GalleryItemSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    type: z.enum(["image", "video"]),
    thumbnail: localMedia,
    fullSize: localMedia.optional(),
    videoUrl: localMedia.optional(),
    alt: z.string(),
    titleAr: z.string().optional(),
    altAr: z.string().optional(),
    imageFit: z.enum(["contain", "cover"]).optional(),
    postId: z.string().optional(),
    postTitle: z.string().optional(),
    postTitleAr: z.string().optional(),
    publishedAt: date.optional(),
    caption: z.string().optional(),
    captionAr: z.string().optional(),
    sourceUrl: safeUrl.optional(),
  })
  .refine(
    (item) => item.type !== "video" || Boolean(item.videoUrl),
    "Video URL required",
  );
export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  date,
  excerpt: z.string(),
  content: z.string(),
  image: localMedia.optional(),
});
export const SiteInfoSchema = z.object({
  siteName: z.string(),
  description: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  socials: z.object({
    instagram: optionalLink,
    facebook: optionalLink,
    linkedin: optionalLink,
    twitter: optionalLink,
  }),
  ieeeLink: safeUrl,
});
export type Event = z.infer<typeof EventSchema>;
export type ExecutiveMember = z.infer<typeof ExecutiveMemberSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type SiteInfo = z.infer<typeof SiteInfoSchema>;
function read(name: string) {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src/content", name), "utf8"),
  );
}
export function getEvents(locale: Locale = "en"): Event[] {
  const events = z.array(EventSchema).parse(read("events.json"));
  if (new Set(events.map((e) => e.slug)).size !== events.length)
    throw new Error("Event slugs must be unique");
  return events
    .map((event): Event => ({
      ...event,
      ...(locale === "ar"
        ? arabicEvents[event.slug as keyof typeof arabicEvents]
        : {}),
      status: isUpcoming(event) ? "upcoming" : "past",
    }))
    .sort((a, b) =>
      a.status !== b.status
        ? a.status === "upcoming"
          ? -1
          : 1
        : a.status === "upcoming"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date),
    );
}
export function getEventBySlug(slug: string, locale: Locale = "en") {
  return getEvents(locale).find((e) => e.slug === slug);
}
export function getUpcomingEvents(locale: Locale = "en") {
  return getEvents(locale).filter((e) => e.status === "upcoming");
}
export function getPastEvents(locale: Locale = "en") {
  return getEvents(locale).filter((e) => e.status === "past");
}
export function getTeam() {
  const data = read("team.json");
  return {
    executive: z.array(ExecutiveMemberSchema).parse(data.executive),
    members: z.array(MemberSchema).parse(data.members || []),
  };
}
export function getGallery(locale: Locale = "en"): GalleryItem[] {
  return z
    .array(GalleryItemSchema)
    .parse(read("gallery.json"))
    .map((item) =>
      locale === "en"
        ? item
        : {
            ...item,
            title: item.titleAr || translateGallery(item),
            alt: item.altAr || translateGallery(item),
            postTitle: item.postTitleAr || item.postTitle,
            caption: item.captionAr || item.caption,
          },
    );
}
function translateGallery(item: GalleryItem) {
  const index = item.title.match(/\d+$/)?.[0];
  if (item.id.startsWith("branch-launch"))
    return `تدشين الفرع الطلابي · ${item.type === "video" ? "فيديو" : "صورة"} ${index || ""}`;
  if (item.id.startsWith("ieeextreme"))
    return `مسابقة IEEEXtreme 19.0 · ${item.id.endsWith("-2") ? "التحديات" : "لوحة النتائج"}`;
  if (item.id.startsWith("counselors"))
    return `ورشة المستشارين · ${item.id.endsWith("-1") ? "الخطة السنوية" : "الأهداف ومعايير النجاح"}`;
  return `ندوة التأليف · ${item.id.endsWith("-1") ? "شهادة المشاركة" : "اختيار الكلمات المفتاحية"}`;
}
export function getGalleryByCategory(category: string) {
  return getGallery().filter((item) => item.category === category);
}
export function getGalleryCategories() {
  return [...new Set(getGallery().map((item) => item.category))];
}
export function getNews() {
  return z.array(NewsItemSchema).parse(read("news.json"));
}
export function getSiteInfo() {
  return SiteInfoSchema.parse(read("site.json"));
}
