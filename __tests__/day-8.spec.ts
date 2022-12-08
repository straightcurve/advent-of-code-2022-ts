import assert from "assert";
import { join } from "path";
import day8, { part1 } from "../src/day-8";

describe("day 8", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-8.input.simple.txt");
      const count = part1(path);
      assert.equal(count, 21);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-8.input.txt");
      const count = part1(path);
      assert.equal(count, 1782);
    });
  });

  describe("part 2", () => {
    it("should find highest scenic score with simple input", () => {
      const path = join(__dirname, "./day-8.input.simple.txt");
      const score = day8(path);
      assert.equal(score, 8);
    });

    it("should find highest scenic score with actual input", () => {
      const path = join(__dirname, "./day-8.input.txt");
      const score = day8(path);
      assert.equal(score, 474606);
    });
  });
});
