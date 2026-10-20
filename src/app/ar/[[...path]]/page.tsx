import { notFound } from "next/navigation";
import Home, { generateMetadata as homeMeta } from "@/app/page";
import About, { generateMetadata as aboutMeta } from "@/app/about/page";
import Events, { generateMetadata as eventsMeta } from "@/app/events/page";
import Gallery, { generateMetadata as galleryMeta } from "@/app/gallery/page";
import Team, { generateMetadata as teamMeta } from "@/app/team/page";
import Contact, { generateMetadata as contactMeta } from "@/app/contact/page";
import EventDetail, {
  generateMetadata as eventMeta,
} from "@/app/events/[slug]/page";
type Props = { params: Promise<{ path?: string[] }> };
const pages = {
  about: About,
  events: Events,
  gallery: Gallery,
  team: Team,
  contact: Contact,
};
const metadata = {
  about: aboutMeta,
  events: eventsMeta,
  gallery: galleryMeta,
  team: teamMeta,
  contact: contactMeta,
};
export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;
  if (!path.length) return homeMeta();
  if (path.length === 2 && path[0] === "events")
    return eventMeta({ params: Promise.resolve({ slug: path[1] }) });
  if (path.length === 1 && Object.hasOwn(metadata, path[0]))
    return metadata[path[0] as keyof typeof metadata]();
  return {};
}
export default async function ArabicPage({ params }: Props) {
  const { path = [] } = await params;
  if (!path.length) return <Home />;
  if (path.length === 2 && path[0] === "events")
    return <EventDetail params={Promise.resolve({ slug: path[1] })} />;
  if (path.length === 1 && Object.hasOwn(pages, path[0])) {
    const Page = pages[path[0] as keyof typeof pages];
    return <Page />;
  }
  notFound();
}
