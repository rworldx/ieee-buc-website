import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  isUpcoming,
  formatEventDate,
  formatEventTime,
} from "../src/lib/event-utils.ts";
import { messages, localHref } from "../src/lib/i18n.ts";
import { safeJsonLd } from "../src/lib/safe-json.ts";
const events = JSON.parse(
  readFileSync(new URL("../src/content/events.json", import.meta.url)),
);
const arabic = JSON.parse(
  readFileSync(new URL("../src/content/ar/events.json", import.meta.url)),
);
test("event remains upcoming until its Oman end time, then moves to archive", () => {
  const event = events.find((e) => e.slug === "cybersecurity-trends-2026");
  assert.equal(isUpcoming(event, Date.parse("2026-10-27T15:29:59Z")), true);
  assert.equal(isUpcoming(event, Date.parse("2026-10-27T15:30:01Z")), false);
  assert.equal(
    formatEventTime(event.date, event.endDate),
    "6:00 PM – 7:30 PM (Oman time)",
  );
});
test("date-only events never shift day with host timezone", () => {
  assert.equal(formatEventDate("2026-02-15"), "15 February 2026");
  assert.equal(
    isUpcoming({ date: "2026-02-15" }, Date.parse("2026-02-15T19:59:59Z")),
    true,
  );
  assert.equal(
    isUpcoming({ date: "2026-02-15" }, Date.parse("2026-02-15T20:00:00Z")),
    false,
  );
});
test("English and Arabic UI keys and event records stay in parity", () => {
  assert.deepEqual(
    Object.keys(messages.en).sort(),
    Object.keys(messages.ar).sort(),
  );
  for (const e of events) {
    assert.ok(arabic[e.slug]?.title);
    assert.ok(arabic[e.slug]?.description);
    assert.ok(arabic[e.slug]?.longDescription);
  }
  assert.equal(
    localHref("/events?status=past", "ar"),
    "/ar/events?status=past",
  );
  assert.equal(localHref("/", "ar"), "/ar");
});
test("all content media references resolve and event slugs are unique", () => {
  assert.equal(new Set(events.map((e) => e.slug)).size, events.length);
  const gallery = JSON.parse(
    readFileSync(new URL("../src/content/gallery.json", import.meta.url)),
  );
  const walk = (value) => {
    if (typeof value === "string" && /^\/(images|videos)\//.test(value)) {
      assert.ok(
        existsSync(new URL(`../public${value}`, import.meta.url)),
        value,
      );
    } else if (value && typeof value === "object")
      Object.values(value).forEach(walk);
  };
  walk(events);
  walk(gallery);
});
test("JSON-LD cannot close its script element", () => {
  const value = { title: "</script><script>alert(1)</script>" };
  const safe = safeJsonLd(value);
  assert.equal(safe.includes("<"), false);
  assert.deepEqual(JSON.parse(safe), value);
});
test("supplied registration destination and original logos remain intact", () => {
  assert.equal(
    events.find((e) => e.slug === "cybersecurity-trends-2026").registrationLink,
    "https://events.vtools.ieee.org/m/581451",
  );
  for (const [name, hash] of [
    [
      "logo.png",
      "6d7a7b0742b82a7f7d0afd5890419820cc94f41c13e57b0d9c0036c5bb20e6d2",
    ],
    [
      "logo.svg",
      "ce554f5d53813e66cd3f51f2eba909123ca02f21d906149239eae6ff2a155d58",
    ],
  ])
    assert.equal(
      createHash("sha256")
        .update(
          readFileSync(new URL(`../public/images/${name}`, import.meta.url)),
        )
        .digest("hex"),
      hash,
    );
});
