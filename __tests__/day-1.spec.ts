import assert from "assert";
import { join } from "path";
import day1 from "../src/day-1";

describe("day 1", () => {
  it("should pass with simple input", () => {
    const path = join(__dirname, "./day-1.input.simple.txt");
    const calories = day1(path);
    assert.equal(calories, 45000);
  });

  it("should pass with actual input", () => {
    const path = join(__dirname, "./day-1.input.txt");
    const calories = day1(path);
    assert.equal(calories, 210406);
  });
});
