import { join } from "path";

for (const day of Array.from({ length: 3 }, (v, i) => i + 1)) {
  const path = join(__dirname, `../__tests__/day-${day}.input.txt`);
  const run = require(`./day-${day}`).default;
  const { part1 } = require(`./day-${day}`);
  console.log(`[DAY ${day}]:`, part1(path), "|", run(path));
}
