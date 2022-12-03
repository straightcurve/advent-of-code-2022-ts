import assert from "assert";
import { join } from "path";
import day2 from "../src/day-2";

describe("day 2", () => {
  it("should pass with simple input", () => {
    const path = join(__dirname, "./day-2.input.simple.txt");
    const totalScore = day2(path);
    assert.equal(totalScore, 12);
  });

  it("should pass with actual input", () => {
    const path = join(__dirname, "./day-2.input.txt");
    const totalScore = day2(path);
    assert.equal(totalScore, 13448);
  });
});
