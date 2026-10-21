import test from "node:test";
import assert from "node:assert/strict";
import { finishDialogExit } from "../src/lib/dialog-exit.ts";

test("hides native dialog before clearing the exit frame and notifying React", () => {
  const calls = [];
  finishDialogExit(
    { close: () => calls.push("hide") },
    { cancel: () => calls.push("cancel") },
    () => calls.push("notify"),
  );
  assert.deepEqual(calls, ["hide", "cancel", "notify"]);
});
