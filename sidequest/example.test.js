import { expect, test } from "vitest";
import { main } from "./app-code.js";

test("importing a library that calls process.send breaks vitest", () => {
  expect(() => main()).not.toThrow("some error")
});