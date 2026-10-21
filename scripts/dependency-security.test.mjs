import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const lockfile = JSON.parse(
  await readFile(new URL("../package-lock.json", import.meta.url), "utf8"),
);

test("the selector parser includes the upstream complexity fix", () => {
  const installed = lockfile.packages["node_modules/postcss-selector-parser"];

  assert.ok(installed, "postcss-selector-parser must be present in the lockfile");
  assert.match(
    installed.version,
    /^7\.(?:1\.(?:[6-9]|\d{2,})|(?:[2-9]|\d{2,})\.\d+)$|^(?:[8-9]|\d{2,})\.\d+\.\d+$/,
    `expected postcss-selector-parser >= 7.1.6, received ${installed.version}`,
  );
});
