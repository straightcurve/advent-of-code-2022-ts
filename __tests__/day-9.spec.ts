import assert from "assert";
import { join } from "path";
import day9, { part1 } from "../src/day-9";

describe("day 9", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-9.input.simple.txt");
      const count = part1(path);
      assert.equal(count, 13);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-9.input.txt");
      const count = part1(path);
      assert.equal(count, 5779);
    });
  });

  describe("part 2", () => {
    it("should pass with large input", () => {
      const path = join(__dirname, "./day-9.input.large.txt");
      const score = day9(path);
      assert.equal(score, 36);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-9.input.txt");
      const score = day9(path);
      assert.equal(score, 2331);
    });
  });
});
