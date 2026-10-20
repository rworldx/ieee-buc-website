# IEEE BUC website audit

Reviewed 19 October 2026. Scope: the local repository and its locally served website, not a verified public deployment. No application source was changed, no messages were sent, and no content was published.

## Overall assessment

This is a good, understandable student-branch brochure website with a working event archive and media gallery. Its component structure and static rendering are appropriate for its size. It needs functional, accessibility, and content corrections before its documentation can credibly claim full accessibility and SEO readiness. A wholesale rewrite is unnecessary.

## Coverage and evidence

| Area | What was checked | Result |
|---|---|---|
| Source | All 41 files under `src`, including 20 components, routes, JSON, CSS, MDX and utilities; root configuration and both guides | Reviewed |
| Pages | Six main pages plus four event-detail URLs | All opened in Chrome; production build generated them |
| Build | `npm run build` | Passed after allowing the Google Fonts download; initial sandbox network failure was environmental |
| Types | `npx tsc --noEmit --incremental false` | Passed |
| Lint | `npm run lint` | Failed: 3 errors, 7 warnings |
| Content | 4 events, 16 gallery entries, 6 executive profiles, 11 member profiles | All events marked past; all profile photo fields empty |
| Asset references | 19 distinct local media paths referenced by JSON | All exist; this is path integrity, not full visual/codec certification |
| Responsive layout | Every content page at 320px; home/events/team/gallery also at 390px and 768px | Events overflow at 320px; other measured page widths did not overflow |
| Browser interactions | All event filters; all gallery filters; image opening; lightbox ArrowRight/Escape; contact invalid submission; mobile menu opening, navigation and Escape behavior | Findings below |
| Metadata | Rendered DOM and generated production HTML | No canonical or Open Graph title on content pages; event titles inherit the generic site title |
| Visual review | Desktop home, About, Team, event detail, mobile contact and drawer; responsive DOM measurements | Qualitative assessment, not a numerical design score |

Not verified: public domain/deployment configuration, external social/account ownership, real email delivery, registration (no current event exposes it), every media file's playback across browsers, real-device touch behavior, full screen-reader/zoom audit, dependency vulnerability scan, Lighthouse/Core Web Vitals or field analytics. No claim of WCAG certification or production security certification is made.

Review references used: imported codebase-onboarding, accessibility, web-design-guidelines and React-performance skills. The imported SEO-audit skill was inspected, but its commercial ranking-research workflow was not applied: this is a repository and technical SEO review, not a search-demand study. Unrelated skills were not run merely to increase the skill count.

## Architecture and data flow

- Next.js 16.1.1 App Router, React 19.2.3, TypeScript strict mode, Tailwind CSS v4, Lucide icons, Framer Motion, React Hook Form and Zod.
- Pages and most presentational components render on the server. Navigation, filters, contact form and media controls use client components.
- `src/content/*.json` → synchronous file loaders in `src/lib/content.ts` → Zod validation → server page → cards or client-side filter/media components.
- Event URLs are generated from `events.json` by `generateStaticParams`; unknown slugs call `notFound()`.
- There is no custom API, database, authentication, membership workflow or message-delivery backend in this repository.
- Content changes require a new build/deployment to update production static pages. “Save and refresh” in the documentation describes development, not deployment.

## Every page

| URL | Content and controls | Assessment |
|---|---|---|
| `/` | Logo hero, Join Us → contact, View Events → events; four stats; vision/mission; first three events; four benefits; contact CTA | Clear introduction, but claims and joining journey need work |
| `/about` | Mission, vision, five activity types, global affiliation, six benefits, IEEE.org link | Clear hierarchy; repetitive copy and very spacious single-purpose sections; rich-text styles inactive |
| `/events` | All/Upcoming/Past buttons, event links, empty state | Filters work; 320px overflow; selection not programmatically exposed |
| `/events/branch-launch-ceremony` | Date/place, cover, description, six photos and three videos | Useful authentic media; paragraphs collapse; generic metadata |
| `/events/ieeextreme-19` | Date/virtual location, cover, description, three images | Useful archive; online event incorrectly marked offline in structured data |
| `/events/counselors-workshop-2025` | Date/virtual location, cover, description, two images | Same detail template and metadata/structured-data issues |
| `/events/authorship-symposium-2025` | Date/virtual location, certificate cover, description, two images | Certificate is heavily cropped by the wide cover treatment |
| `/gallery` | All/Competitions/Workshops/Events buttons; 16 items; shared image/video lightbox | Filter counts verified as 16/3/4/9 respectively; thumbnails inaccessible by keyboard |
| `/team` | Six executive cards, eleven member cards, contact CTA | Clear roles and grouping; all photos are fallback avatars; no committee term/year |
| `/contact` | Name/email/subject/message form; email/phone/address; Instagram | Validation works; fake sent state and placeholder phone require correction |
| `/sitemap.xml`, `/robots.txt` | Generated crawler resources | Present, but local build uses localhost URLs unless base URL is configured |
| Unknown event | `notFound()` branch | Source-reviewed; no custom event-specific recovery screen |

## Every component and its functions

| Component | Responsibility / handlers | Findings |
|---|---|---|
| `layout/Navbar` | Six links; `handleScroll` toggles header shadow; menu toggle state | No current-page indication; 72px header versus 64px main offset; drawer can cover toggle |
| `layout/MobileMenu` | Animated backdrop and right drawer; backdrop/link invokes `onClose` | No Escape, dialog semantics, focus trap, focus restoration or scroll lock; no internal close button |
| `layout/Footer` | Branch identity, five quick links, Instagram, current year | Consistent footer; Gallery absent from quick links; several unused icon imports |
| `layout/Section` | Shared semantic section/container, optional ID/classes | Good reuse; page-specific utility spacing overrides mean not all sections share the same rhythm |
| `home/Hero` | Branch logo, heading, statement and two links | Strong hierarchy; large identity block displaces immediate event/community evidence |
| `home/StatsSection` | Four hardcoded statistics | Upcoming count conflicts with events; age/workshop values lack source/date |
| `home/VisionMissionSection` | Two descriptive cards | Clear grouping; duplicated About copy; icon meaning swapped relative to About; JSX apostrophe lint error |
| `home/FeaturedEvents` | Loads events; `slice(0,3)`; View All link | File order decides featured content; no sort/featured flag or empty fallback |
| `home/BenefitsSection` | Four icon/title/description definitions | Understandable benefits but generic claims |
| `home/CTABand` | Join invitation, Contact Us link | Good visual emphasis; no actual joining instructions |
| `about/AboutCard` | Icon/title and rich-text wrapper | Typography plugin classes do not produce intended styling |
| `cards/BenefitCard` | Non-clickable benefit card with hover lift | Consistent appearance; hover movement can imply clickability |
| `cards/EventCard` | Linked image, type badge, localized date, place and excerpt | Native link works; missing image `sizes`; long accessible link names; no status badge |
| `cards/MemberCard` | Photo/fallback avatar, role/department, optional bio, email and optional LinkedIn | Good link names; tiny icon targets; all photos absent in current data; generic email fallback could misrepresent recipient when used |
| `events/EventsFilter` | Derives upcoming/past arrays; local filter state; empty state | All branches exercised; no selected-state ARIA or URL persistence; narrow overflow |
| `events/EventMedia` | Combines videos first then images; synthesizes video thumbnails; open/previous/next handlers wrap indices | Clickable divs; thumbnail naming depends on array order; duplicates GalleryGrid behavior |
| `gallery/GalleryWithFilter` | Category state, filtering, empty-state branch | All categories exercised; no selected-state ARIA, result announcement or URL persistence |
| `gallery/GalleryGrid` | Thumbnail grid; opens current item; previous/next wrap | Clickable divs cannot receive normal keyboard focus; captions hover-only; no image `sizes` |
| `gallery/Lightbox` | Backdrop/close; previous/next; Escape/arrows; scroll lock; image/video branch | Working arrow/Escape behavior; modal semantics/focus missing; desktop Next unlabeled; MOV sources advertised as MP4 |
| `forms/ContactForm` | Zod validation; `onSubmit` builds encoded mailto; status/reset/timer | Correct field error links and alert roles; false delivery claim; missing autocomplete and explicit required semantics |

## Every utility and generated entry point

| File / function | Behavior / issue |
|---|---|
| `content.ts`: `EventSchema`, `ExecutiveMemberSchema`, `MemberSchema`, `GalleryItemSchema`, `NewsItemSchema`, `SiteInfoSchema` | Runtime validation is valuable. Dates, URLs, nonempty IDs and uniqueness are not validated strongly; media type does not require corresponding media URL. News schema omits the image property present in JSON. |
| `getEvents` | Reads/parses/validates event JSON; failure stops rendering/build rather than silently accepting corrupt data. |
| `getEventBySlug` | Reloads events and finds exact slug. |
| `getUpcomingEvents`, `getPastEvents` | Filter manual status, not actual dates; currently unused by pages. |
| `getTeam` | Validates executive/member arrays; missing members defaults to empty. |
| `getGallery`, `getGalleryByCategory`, `getGalleryCategories` | Reads media; exact category filter; unique categories in insertion order. Category-specific loader is unused; gallery page reads data twice. At current scale this is minor. |
| `getNews` | Reads news JSON, but no page calls it. Old news/award claims are not rendered and should not be mistaken for public site claims. |
| `getSiteInfo` | Supplies contact page; footer and structured data separately hardcode overlapping information. |
| `seo.ts`: `generateMetadata` | Generates canonical, Open Graph and Twitter data, but is not used by pages. |
| `schema.ts`: `generateOrganizationSchema` | Adds organization JSON-LD on home; social URL/email differ from displayed contact information. |
| `generateEventSchema` | Adds JSON-LD on detail pages; treats every location as physical/offline, including virtual events. Identical status ternary is redundant; past events need not use an invented “completed” schema status. |
| Event `generateStaticParams` | Creates four event routes from content. |
| `sitemap()` | Lists main and event URLs; all modification dates use build time, not content modification time. |
| `robots()` | Allows crawling and links sitemap; inherits localhost fallback. |
| `useMDXComponents` | Pass-through MDX component map; About MDX is not imported by the actual About page. |
| `RootLayout`, page functions | Shared header/main/footer, English document language, page metadata; event detail lacks its own metadata generator. |

## Prioritized defects

### 1. High: contact form claims delivery without sending

`src/components/forms/ContactForm.tsx:43` navigates to `mailto:`; lines 46–47 immediately show success and reset fields. The success copy says the message was sent. Opening a draft cannot establish delivery, and a missing/cancelled mail client can leave the user with no message and lost text. The catch branch does not reliably detect those cases.

Use a real delivery integration with server-side validation and appropriate abuse controls, or clearly label the action “Open email draft,” retain input, and explain that the user must send from their email app. The existing implementation is not Formspree despite the README.

### 2. High: keyboard users cannot open gallery or event media

`src/components/gallery/GalleryGrid.tsx:36` and `src/components/events/EventMedia.tsx:60` render clickable divs without keyboard semantics. Replace them with buttons carrying descriptive names. Preserve the existing image presentation and focus ring.

### 3. High: overlays lack focus and close behavior

`src/components/layout/MobileMenu.tsx:26`: drawer has no internal close control; equal stacking levels place it over the header toggle. At 320px the open drawer visually covered the toggle. Escape left `aria-expanded="true"`. Background content remains available to keyboard/assistive technology.

`src/components/gallery/Lightbox.tsx:74`: no named dialog, focus placement/trap/restoration, or inert background. The desktop next button at line 95 has no accessible name, confirmed as an unnamed button in the browser. Its existing Escape and arrow handling is useful and should be retained. Scope arrow handling so it does not steal arrow controls from focused video controls.

### 4. High: visible credibility problems

`src/components/home/StatsSection.tsx:5` says “5+ events coming”; the current dataset and Upcoming filter contain zero. This does not establish whether future events exist elsewhere; it establishes that the website contradicts itself. “3+ months active” and workshop counts are hardcoded without provenance. `src/content/site.json` exposes `+968 XXXX XXXX` as a phone link.

Derive statistics from approved data or publish dated, verified values. Hide unavailable phone information. Keep one source for public contact and social identity.

### 5. Medium: technical SEO is only partly wired

`src/lib/seo.ts:3` is unused. All ten content pages lack canonical and Open Graph title metadata in generated HTML. All four event details inherit the generic root title/description. Wire the helper or framework metadata directly into pages, including event-specific information. No ranking-loss claim is inferred from these omissions.

`src/app/sitemap.ts:5`, `src/app/robots.ts:4`, `src/lib/schema.ts:4`: local build outputs localhost absolute URLs. Validate a production base URL when deploying; production configuration was not inspected.

`src/lib/schema.ts:48`: online events are labeled offline with physical-place data. Organization schema uses a different Instagram handle and contact email from the visible site. Correct these from shared content.

### 6. Medium: responsive filter overflow

`src/components/events/EventsFilter.tsx:29`: fixed horizontal button padding and a non-wrapping inline-flex group exceed narrow space. At 320px, document width measured 326px and group right edge 326.67px. At 390px and 768px the page fit. Allow wrapping or use a compact accessible layout.

### 7. Medium: intended rich-text design is inactive

`src/components/about/AboutCard.tsx:20` uses `prose` and `prose-p:*`, but the installed typography plugin is not registered in `globals.css`. Production CSS contained no `.prose` base rule. About body paragraphs computed to 16px/24px with zero bottom margin, rather than the intended larger/spaced rich text.

Register the plugin or use explicit supported classes. Separately, event `longDescription` includes paragraph breaks but is rendered inside one ordinary `<p>`; normal whitespace collapsing removes those breaks. Render separate paragraphs.

### 8. Medium: media delivery and compatibility need work

`src/components/gallery/Lightbox.tsx:122` labels all files `video/mp4`, while the actual assets are QuickTime MOV containers with `hvc1` markers. One video loaded to readyState 4 in this Chrome session, so this is not a claim that all playback is broken. Browser/device portability remains unverified. Use verified H.264 MP4/WebM sources with correct types; provide captions/transcripts where the audio conveys content.

Three videos total 58,407,346 bytes (about 58.4 MB decimal). Largest is 30,586,429 bytes. All public assets total 78,366,426 bytes; this is repository payload, not initial page download. Several original photos are 3–5 MB. All fill-based images omit tailored `sizes`, and the rendered value defaults to `100vw`; cards can request unnecessarily large variants. Next image optimization and lazy loading already help.

### 9. Medium: accessibility polish is incomplete

- `src/app/layout.tsx:31`: no skip-to-content link; main top padding is 64px while observed header height is 72px.
- `src/components/layout/Navbar.tsx:49`: no active route styling or `aria-current`.
- Both filter components: selected appearance is visual only; use pressed buttons or correct tab semantics, and announce result changes appropriately.
- `src/app/globals.css:28` and animated components: smooth scrolling/transforms have no reduced-motion branch.
- `src/app/globals.css:6`: white text on hover blue `#0080c9` calculates to 4.26:1, below the 4.5:1 requirement for normal-sized text; default blue is 6.52:1. Darken the hover color. Reference: [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- `MemberCard`: icon links have 18px glyphs and no generous padding. Enlarge the targets; do not infer an automatic target-size failure without considering spacing exceptions.
- Contact inputs: add appropriate autocomplete, required/aria-required semantics, and consider allowing textarea resize. Existing labels, field error references and alerts are positives.
- `Lightbox`: early return removes AnimatePresence before exit can animate; this is polish, not a functional blocker.

### 10. Medium: documentation and quality gates are unreliable

README/QUICKSTART describe Formspree, editable About MDX, YouTube video URLs and a missing `.env.local.example`. Actual code uses mailto, hardcoded About JSX and native video sources. Following those instructions can produce no visible change or broken media.

README says Node 18+; installed Next package requires Node >=20.9.0. No test script/test suite or CI workflow was found. Lint errors occur in `about/page.tsx:30`, `VisionMissionSection.tsx:36` and `ContactForm.tsx:43`; warnings are unused icon imports. A successful build does not imply lint passed. Fix the errors and add a focused smoke/accessibility check for critical flows.

## Design and user experience assessment

### Strengths

- Strong, readable headline hierarchy and a restrained white/off-white/blue base suitable for an academic organization.
- Consistent cards, spacing helpers, icons and page headers make the site easy to understand.
- Clear six-item navigation and recognizable links; content is not hidden behind complex UI.
- Authentic ceremony/event media gives the branch tangible evidence of activity.
- Responsive grids, explicit empty states and a shared lightbox are good foundations.
- Native links, labeled fields, error announcements and visible focus styling show accessibility intent.
- Static prerendering, local content and a small number of client components keep the architecture proportionate.
- Zod validation catches malformed content early; TypeScript and production build currently pass.

### Weaknesses and opportunities

- The homepage is dominated by logo/title, generic mission copy and generous space before visitors see actual people and activities. A concise recent-event or community feature would make it more distinctive.
- About repeats the homepage mission/vision and assigns large sections to short paragraphs. Reduce repetition and improve information density without removing readability.
- Join Us leads to a generic inquiry form. Explain membership eligibility, the actual joining steps, expected response and the distinction between IEEE membership and local branch participation.
- Header/footer use a text badge while the hero uses the actual branch logo. A consistent brand treatment would feel more finished.
- Cards mix 12px/16px corners, multiple shadow strengths and hover lifts; consolidate styles. Noninteractive cards do not need button-like hover motion.
- Event cards crop certificates/slides as if they were landscape photos. Use separate photo/document treatments so important information remains visible.
- All seventeen team profiles have generic avatars, short generic bios and no term/year. Approved portraits or initials and specific responsibilities would add character without requiring photos.
- Gallery captions depend on hover; always-visible concise captions would help touch users identify content.
- Events have no explicit latest/featured selection, no detail-page back link and no date/status management workflow. The current small dataset does not justify a complex search system.
- English is the only implemented language (`lang="en"`); there is no Arabic content, locale switch or RTL implementation. Bilingual parity is an unmet requirement if the site is intended to serve both audiences.

## Button/link behavior ledger

| Control family | Destination / behavior | Verification |
|---|---|---|
| Header brand/Home | `/` | Source + rendered link |
| Header About/Events/Gallery/Team/Contact | Matching local route | All destinations opened |
| Mobile menu toggle | Sets open state | Opened; Escape does not close; close icon covered |
| Drawer links/backdrop | Close state; links navigate | Link action exercised; backdrop handler source-reviewed |
| Hero Join Us; home CTA; team CTA | `/contact` | Source + rendered links; contact route opened |
| Hero View Events; View All Events | `/events` | View Events clicked successfully |
| Event cards | Matching `/events/[slug]` | All four destination pages opened |
| All/Upcoming/Past | Client filtering | Exercised; 4/0/4 results |
| Register Now | Optional external link for upcoming events only | No current eligible data; branch source-reviewed, no submission |
| Gallery category buttons | Client filtering | All exercised: 16/3/4/9 |
| Gallery/event thumbnails | Open media at index | Gallery photo and event video exercised; keyboard entry missing |
| Lightbox previous/next | Wrap through active collection | ArrowRight and both desktop buttons exercised; first→last→first wrap verified |
| Lightbox close/Escape | Close and unlock body scroll | Both exercised |
| Video native controls | Browser playback UI | First video loaded; full playback matrix unverified |
| Contact Send Message | Validate then open mailto | Invalid submission exercised; valid path source-reviewed without sending |
| Contact/member email links | Mail client | Destinations source-reviewed; no mail sent |
| Contact phone | `tel:` placeholder | Confirmed placeholder; not dialed |
| Instagram / IEEE.org | External pages | Destinations inspected; account ownership and live availability not verified |
| Conditional member LinkedIn | External profile when supplied | Current values empty; no links rendered |

## Security and maintenance scope

The current custom attack surface is small: local content, no custom server actions/API and no authentication/database. No application analytics or third-party embed integration was found in source. External new-tab links include `noopener noreferrer`. These are positives, not proof that dependencies or hosting are secure.

JSON-LD is inserted with raw `JSON.stringify` in a script. Content is repository-controlled today; if it later becomes untrusted CMS input, escape `<` and validate URLs. Shared contact identity should be centralized. Security headers, deployed environment settings and current dependency advisories require a separate deployment/dependency check; absence of custom header configuration alone does not prove hosting headers are absent.

Keep the simple architecture. Avoid adding a database/CMS solely to repair these issues. A structured content workflow, stronger date/URL validation and a small regression suite address the present risks.

## Recommended sequence

1. Correct the contact behavior, mobile drawer, keyboard media access and lightbox naming/focus.
2. Replace misleading stats/phone information; centralize public identity; document the joining process.
3. Fix event metadata, production URL validation and virtual-event structured data.
4. Repair narrow filter layout, typography, paragraph rendering, contrast and reduced motion.
5. Optimize/transcode media, add responsive image sizes and improve document-image presentation.
6. Update setup/content documentation, resolve lint, add targeted checks, then implement Arabic/RTL if required for launch.

The audit used the [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) as review prompts, adapted to this project's scale. Design judgments above are based on the rendered site and actual user journeys, not on enforcing a preset aesthetic.
