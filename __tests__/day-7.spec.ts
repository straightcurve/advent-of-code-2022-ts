import assert from "assert";
import { join } from "path";
import day7, { part1 } from "../src/day-7";

describe("day 6", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-7.input.simple.txt");
      const count = part1(path);
      assert.equal(count, 95437);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-7.input.txt");
      const count = part1(path);
      assert.equal(count, 1443806);
    });
  });

  describe("part 2", () => {
    it("should find smallest directory with simple input", () => {
      const path = join(__dirname, "./day-7.input.simple.txt");
      const count = day7(path);
      assert.equal(count, 24933642);
    });

    it("should find smallest directory with actual input", () => {
      const path = join(__dirname, "./day-7.input.txt");
      const count = day7(path);
      assert.equal(count, 942298);
    });
  });
});
