import assert from "assert";
import { join } from "path";
import day10, { part1, part2Alternative } from "../src/day-10";

describe("day 10", () => {
  describe("part 1", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-10.input.simple.txt");
      const count = part1(path);
      assert.equal(count, 13140);
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-10.input.txt");
      const count = part1(path);
      assert.equal(count, 14520);
    });
  });

  describe("part 2", () => {
    it("should pass with simple input", () => {
      const path = join(__dirname, "./day-10.input.simple.txt");
      const image = day10(path);
      assert.equal(
        image,
        `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
        `.trim()
      );
    });

    it("should pass with actual input", () => {
      const path = join(__dirname, "./day-10.input.txt");
      const image = day10(path);
      assert.equal(
        image,
        `
###..####.###...##..####.####...##.###..
#..#....#.#..#.#..#....#.#.......#.#..#.
#..#...#..###..#......#..###.....#.###..
###...#...#..#.#.##..#...#.......#.#..#.
#....#....#..#.#..#.#....#....#..#.#..#.
#....####.###...###.####.####..##..###..
      `.trim()
      );
    });
  });
});
