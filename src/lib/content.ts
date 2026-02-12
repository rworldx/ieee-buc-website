import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// Schemas
export const EventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  type: z.string(),
  status: z.enum(['upcoming', 'past']),
  description: z.string(),
  longDescription: z.string().optional(),
  location: z.string(),
  image: z.string(),
  gallery: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  registrationLink: z.string().optional(),
});

export const ExecutiveMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  email: z.string().email(),
  photo: z.string(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
});

export const MemberSchema = z.object({
  name: z.string(),
  department: z.string().optional(),
  email: z.string().email().optional(),
  photo: z.string(),
  gender: z.enum(['male', 'female']).optional(),
});

export const GalleryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  type: z.enum(['image', 'video']),
  thumbnail: z.string(),
  fullSize: z.string().optional(),
  videoUrl: z.string().optional(),
  alt: z.string(),
});

export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  content: z.string(),
});

export const SiteInfoSchema = z.object({
  siteName: z.string(),
  description: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  socials: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
  }),
  ieeeLink: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
export type ExecutiveMember = z.infer<typeof ExecutiveMemberSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type SiteInfo = z.infer<typeof SiteInfoSchema>;

// Loaders
const contentDir = path.join(process.cwd(), 'src/content');

export function getEvents(): Event[] {
  const filePath = path.join(contentDir, 'events.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return z.array(EventSchema).parse(data);
}

export function getEventBySlug(slug: string): Event | undefined {
  const events = getEvents();
  return events.find((event) => event.slug === slug);
}

export function getUpcomingEvents(): Event[] {
  const events = getEvents();
  return events.filter((event) => event.status === 'upcoming');
}

export function getPastEvents(): Event[] {
  const events = getEvents();
  return events.filter((event) => event.status === 'past');
}

export function getTeam() {
  const filePath = path.join(contentDir, 'team.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return {
    executive: z.array(ExecutiveMemberSchema).parse(data.executive),
    members: z.array(MemberSchema).parse(data.members || []),
  };
}

export function getGallery(): GalleryItem[] {
  const filePath = path.join(contentDir, 'gallery.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return z.array(GalleryItemSchema).parse(data);
}

export function getGalleryByCategory(category: string): GalleryItem[] {
  const items = getGallery();
  return items.filter((item) => item.category === category);
}

export function getGalleryCategories(): string[] {
  const items = getGallery();
  const categories = new Set(items.map((item) => item.category));
  return Array.from(categories);
}

export function getNews(): NewsItem[] {
  const filePath = path.join(contentDir, 'news.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return z.array(NewsItemSchema).parse(data);
}

export function getSiteInfo(): SiteInfo {
  const filePath = path.join(contentDir, 'site.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return SiteInfoSchema.parse(data);
}

