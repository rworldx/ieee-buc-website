import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { playbackVideoUrl } from "../src/lib/video-media.ts";

test("optimized playback files exist without replacing originals", () => {
  for (const id of ["3012", "3026", "3027"]) {
    const original = `/videos/events/branch-launch/IMG_${id}.mp4`;
    const optimized = playbackVideoUrl(original);
    assert.notEqual(optimized, original);
    const oldSize = statSync(
      new URL(`../public${original}`, import.meta.url),
    ).size;
    const newSize = statSync(
      new URL(`../public${optimized}`, import.meta.url),
    ).size;
    assert.ok(newSize < oldSize && newSize < 4_000_000);
  }
  assert.equal(playbackVideoUrl("/other.mp4"), "/other.mp4");
  assert.equal(playbackVideoUrl(), undefined);
});

test("field borders contrast at least 3:1 with adjacent theme surfaces", () => {
  const css = readFileSync(
    new URL("../src/app/globals.css", import.meta.url),
    "utf8",
  );
  const luminance = (hex) =>
    hex
      .match(/[a-f\d]{2}/gi)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  for (const selector of [":root", ':root[data-theme="dark"]']) {
    const block = css.split(`${selector} {`)[1].split("}")[0];
    const value = (name) =>
      block.match(new RegExp(`--${name}: (#[a-f\\d]{6})`))[1];
    const border = luminance(value("field-border"));
    for (const surface of ["surface", "surface-soft", "card"]) {
      const background = luminance(value(surface));
      assert.ok(
        (Math.max(border, background) + 0.05) /
          (Math.min(border, background) + 0.05) >=
          3,
        `${selector} ${surface}`,
      );
    }
  }
});
