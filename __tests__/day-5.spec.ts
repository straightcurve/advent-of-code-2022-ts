import assert from "assert";
import { join } from "path";
import day5, { part1 } from "../src/day-5";

describe("day 5", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-5.input.simple.txt");
      const message = part1(path);
      assert.equal(message, "CMZ");
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-5.input.txt");
      const message = part1(path);
      assert.equal(message, "ZBDRNPMVH");
    });
  });

  describe("part 2", () => {
    it("should keep order when moving multiple elements with simple input", () => {
      const path = join(__dirname, "./day-5.input.simple.txt");
      const message = day5(path);
      assert.equal(message, "MCD");
    });

    it("should keep order when moving multiple elements with actual input", () => {
      const path = join(__dirname, "./day-5.input.txt");
      const message = day5(path);
      assert.equal(message, "WDLPFNNNB");
    });
  });
});
