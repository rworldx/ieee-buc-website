import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = (path) =>
  JSON.parse(readFileSync(new URL(`../src/content/${path}`, import.meta.url)));
const gallery = read("gallery.json");
const events = read("events.json");
const ar = read("ar/events.json");
test("ten original posts are grouped with bilingual descriptions and publication dates", () => {
  const posts = gallery.filter((item) => item.postId);
  assert.equal(new Set(posts.map((p) => p.postId)).size, 10);
  assert.equal(posts.length, 16);
  assert.equal(new Set(gallery.map((p) => p.id)).size, gallery.length);
  for (const item of posts) {
    for (const key of [
      "titleAr",
      "altAr",
      "postTitleAr",
      "caption",
      "captionAr",
      "publishedAt",
    ])
      assert.ok(item[key], `${item.id}: ${key}`);
    assert.match(item.sourceUrl, /^https:\/\/www\.instagram\.com\/(p|reel)\//);
    for (const path of [item.thumbnail, item.fullSize, item.videoUrl].filter(
      Boolean,
    ))
      assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
  }
});
test("events do not duplicate posts or treat publication dates as sessions", () => {
  assert.equal(events.length, 7);
  assert.equal(new Set(events.map((e) => e.slug)).size, 7);
  const workshop = events.find((e) => e.slug === "cpp-problem-solving-2026");
  assert.equal(workshop.date, "2026-02-24");
  assert.equal(workshop.dateLabel, "Advertised start");
  assert.equal(workshop.gallery.length, 8);
  assert.equal(
    events.find((e) => e.slug === "ice-breaking-2026").date,
    "2026-04-21T11:00:00+04:00",
  );
  for (const event of events) {
    assert.ok(ar[event.slug]?.title);
    for (const path of [event.image, ...(event.gallery || [])])
      assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
  }
});
