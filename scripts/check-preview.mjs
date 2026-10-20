import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const origin = process.env.PREVIEW_URL || "http://127.0.0.1:3101";
const events = JSON.parse(
  readFileSync(new URL("../src/content/events.json", import.meta.url)),
);
const paths = [
  "/",
  "/about",
  "/events",
  "/gallery",
  "/team",
  "/contact",
  ...events.map((e) => `/events/${e.slug}`),
];
let firstNonce;
let pages = 0;
for (const locale of ["en", "ar"]) {
  for (const path of paths) {
    const route = locale === "ar" ? `/ar${path === "/" ? "" : path}` : path;
    const response = await fetch(new URL(route, origin));
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(`lang="${locale}"`), route);
    assert.match(
      html,
      new RegExp(`dir="${locale === "ar" ? "rtl" : "ltr"}"`),
      route,
    );
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    const csp = response.headers.get("content-security-policy");
    assert.match(csp, /frame-ancestors 'none'/);
    assert.doesNotMatch(csp, /script-src[^;]*'unsafe-(?:inline|eval)'/);
    const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
    assert.ok(nonce);
    if (firstNonce) assert.notEqual(nonce, firstNonce);
    else firstNonce = nonce;
    for (const script of html.matchAll(/<script\b[^>]*>/g)) {
      assert.ok(
        script[0].includes(`nonce="${nonce}"`),
        `${route}: script missing nonce`,
      );
    }
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hrefLang="ar"/i);
    pages++;
  }
}
for (const path of ["/unknown-page", "/ar/unknown-page", "/ar/toString"]) {
  const response = await fetch(new URL(path, origin));
  const html = await response.text();
  assert.ok(
    response.status === 404 ||
      (response.status === 200 && /name="robots" content="noindex"/.test(html)),
    `${path}: must be a nonindexable not-found page`,
  );
  assert.notEqual(response.status, 500, path);
}
for (const path of ["/robots.txt", "/sitemap.xml"]) {
  assert.equal((await fetch(new URL(path, origin))).status, 200, path);
}
console.log(
  `Passed: ${pages} bilingual pages, security headers/nonces, metadata, unknown routes, robots and sitemap.`,
);
