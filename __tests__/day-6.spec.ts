import assert from "assert";
import { join } from "path";
import day6, { part1 } from "../src/day-6";

describe("day 6", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-6.input.simple.txt");
      const count = part1(path);
      assert.equal(count, 7);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-6.input.txt");
      const count = part1(path);
      assert.equal(count, 1300);
    });
  });

  describe("part 2", () => {
    it("should find start-of-message marker with simple input", () => {
      const path = join(__dirname, "./day-6.input.simple.txt");
      const count = day6(path);
      assert.equal(count, 19);
    });

    it("should find start-of-message marker with actual input", () => {
      const path = join(__dirname, "./day-6.input.txt");
      const count = day6(path);
      assert.equal(count, 3986);
    });
  });
});
