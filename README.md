# IEEE BUC Student Branch website

Next.js App Router website with English and Arabic routes, RTL layout, Light/Dark/Auto appearance, local media, and IEEE branding.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev -- --port 3100
```

Open http://localhost:3100. If Turbopack cannot bind its worker port in a restricted environment, use `npm run build -- --webpack`. For the production preview:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

Set `NEXT_PUBLIC_BASE_URL` to the actual HTTPS website origin **before the production build**. It controls canonical URLs, sharing metadata, robots and sitemap. The local fallback is http://localhost:3100. This site needs a Node.js runtime; it is not a static export because the per-request CSP nonce and locale use request headers.

## Check changes

```sh
npm run lint
npm test
npm run build
npm run test:preview # while the preview runs on port 3101
npm audit --omit=dev
```

Tests cover event timing, locale parity, content/media references, JSON-LD escaping, event registration details and original logo integrity. Browser testing and current dependency review are still required for significant changes.

## Content

- `src/content/events.json`: English event records, local images/videos, HTTPS registration URLs. Upcoming/past status is derived from the event end time, in Oman time.
- `src/content/ar/events.json`: corresponding Arabic event text, keyed by the same ID.
- `src/content/team.json`: existing team profiles. Role translations are in the team component.
- `src/content/gallery.json`: gallery images and MP4 video references; Arabic captions are resolved in `src/lib/content.ts`.
- `src/content/site.json`: branch email and social links.
- `src/lib/i18n.ts`: interface strings for both languages.
- `src/app/about/page.tsx`: About content in both languages. The legacy MDX file is not rendered.

Use local `/images/…` and `/videos/…` paths. Do not insert YouTube page URLs as native video sources. Portrait posters and certificates use `imageFit: "contain"` to avoid cropping their content. Keep the original logo assets unchanged.

## Contact and privacy

The contact form validates inputs and requests an email draft in the visitor's configured mail application. It does **not** send messages or save them to a database. There is no Formspree integration. A direct email link is available as a fallback. No message submission should be claimed without a real delivery service.

The only site preference stored in localStorage is `ieee-theme`. There is no analytics integration or account system.

## Security and hosting

`src/proxy.ts` supplies request-specific nonces and Content Security Policy. `next.config.ts` supplies frame, MIME, referrer, permissions and HSTS headers. Structured data is escaped, local content is validated, and external links are restricted to HTTPS in content schemas. These measures are not a guarantee of complete security.

Use HTTPS, keep dependencies updated, monitor hosting, and review access controls and secrets before deployment. Do not cache HTML across requests in a way that reuses or mismatches CSP nonces. Adding a backend, authentication, uploads or a sending service requires its own validation, authorization, rate limits and abuse protection.

See [IEEE-WEBSITE-AUDIT.md](IEEE-WEBSITE-AUDIT.md) for the original audit and [IMPLEMENTATION-NOTES.md](IMPLEMENTATION-NOTES.md) for changes and verification.

Designed and developed by Rashid Al Ghafri, Webmaster, IEEE BUC Student Branch.
