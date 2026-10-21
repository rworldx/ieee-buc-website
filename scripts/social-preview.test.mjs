import test from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { statSync } from "node:fs";
import { defaultSocialImage } from "../src/lib/social-preview.ts";

test("default sharing image is a lightweight 1200 by 630 JPEG with descriptive text", async () => {
  assert.equal(defaultSocialImage.width, 1200);
  assert.equal(defaultSocialImage.height, 630);
  assert.match(defaultSocialImage.alt, /IEEE.*Buraimi/);
  const file = new URL(`../public${defaultSocialImage.url}`, import.meta.url);
  const metadata = await sharp(file.pathname).metadata();
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 630);
  assert.equal(metadata.format, "jpeg");
  assert.ok(statSync(file).size < 300_000);
});
