import assert from "assert";
import { join } from "path";
import day4, { part1 } from "../src/day-4";

describe("day 4", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-4.input.simple.txt");
      const sum = part1(path);
      assert.equal(sum, 2);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-4.input.txt");
      const sum = part1(path);
      assert.equal(sum, 605);
    });
  });

  describe("part 2", () => {
    it("should find any overlaps", () => {
      const path = join(__dirname, "./day-4.input.simple.txt");
      const overlaps = day4(path);
      assert.equal(overlaps, 4);
    });

    it("should find any overlaps with actual input", () => {
      const path = join(__dirname, "./day-4.input.txt");
      const overlaps = day4(path);
      assert.notEqual(overlaps, 957);
      assert.notEqual(overlaps, 626);
      assert.equal(overlaps, 914);
    });
  });
});
