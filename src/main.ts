import { join } from "path";

for (const day of Array.from({ length: 8 }, (v, i) => i + 1)) {
  const path = join(__dirname, `../__tests__/day-${day}.input.txt`);
  const run = require(`./day-${day}`).default;
  const { part1 } = require(`./day-${day}`);
  console.log(`[DAY ${day}]:`, part1(path), "|", run(path));

  if (day === 7) {
    const {
      part1,
      part1NonRecursive,
      part2NonRecursive,
    } = require(`./day-${day}`);

    console.time(`[DAY ${day}     RECURSIVE PART 1]`);
    part1(path);
    console.timeEnd(`[DAY ${day}     RECURSIVE PART 1]`);
    console.time(`[DAY ${day}     RECURSIVE PART 2]`);
    run(path);
    console.timeEnd(`[DAY ${day}     RECURSIVE PART 2]`);

    console.time(`[DAY ${day} NON-RECURSIVE PART 1]`);
    part1NonRecursive(path);
    console.timeEnd(`[DAY ${day} NON-RECURSIVE PART 1]`);
    console.time(`[DAY ${day} NON-RECURSIVE PART 2]`);
    part2NonRecursive(path);
    console.timeEnd(`[DAY ${day} NON-RECURSIVE PART 2]`);
  }
}
