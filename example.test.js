import { expect, test } from "vitest";
import { doWork } from "./library-with-side-effect.js";

test("importing a library that calls process.send breaks vitest", () => {
  expect(doWork()).toBe("what a worker");
});