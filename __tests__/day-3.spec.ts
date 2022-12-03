import assert from "assert";
import { join } from "path";
import day3, { part1 } from "../src/day-3";

describe("day 3", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-3.input.simple.txt");
      const sum = part1(path);
      assert.equal(sum, 157);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-3.input.txt");
      const sum = part1(path);
      assert.equal(sum, 7428);
    });
  });

  describe("part 2", () => {
    it("should find badges", () => {
      const path = join(__dirname, "./day-3.input.simple.txt");
      const sum = day3(path);
      assert.equal(sum, 70);
    });

    it("should find badges with actual input", () => {
      const path = join(__dirname, "./day-3.input.txt");
      const badgePrios = day3(path);
      assert.equal(badgePrios, 2650);
    });
  });
});
