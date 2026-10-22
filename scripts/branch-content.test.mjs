import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { messages } from "../src/lib/i18n.ts";

test("branch copy offers contact, not open membership recruitment", () => {
  for (const locale of ["en", "ar"]) {
    assert.ok(messages[locale].emailBranch);
    assert.doesNotMatch(
      JSON.stringify(messages[locale]),
      /join the branch|ask about joining|membership|انضم إلى الفرع|الانضمام|عضوية/i,
    );
  }
  for (const file of [
    "components/home/Hero.tsx",
    "components/layout/MobileMenu.tsx",
    "components/layout/Footer.tsx",
    "app/contact/page.tsx",
  ]) {
    const source = readFileSync(
      new URL(`../src/${file}`, import.meta.url),
      "utf8",
    );
    assert.doesNotMatch(source, /#join|membership\/join|t\.join/);
    assert.match(source, /mailto:/);
  }
});

test("Sara is the sole vice chair and Abdullah remains a regular member", () => {
  const team = JSON.parse(
    readFileSync(new URL("../src/content/team.json", import.meta.url)),
  );
  const viceChairs = team.executive.filter(
    (member) => member.role === "Vice Chair",
  );
  assert.equal(viceChairs.length, 1);
  assert.equal(viceChairs[0].name, "Sara Al-balushi");
  assert.equal(viceChairs[0].email, "F2024000243@buc.edu.om");
  assert.equal(
    team.members.find((member) => member.name === "Abdullah Al Farsi")?.email,
    "m201900001@buc.edu.om",
  );
  const names = [...team.executive, ...team.members].map(
    (member) => member.name,
  );
  assert.equal(names.length, 17);
  assert.equal(new Set(names).size, names.length);
});
