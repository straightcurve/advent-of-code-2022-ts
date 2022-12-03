import fs from "fs";

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data.split("\n").map(Number.parseFloat);

  let max = 0;
  let current = 0;
  for (const n of parsed) {
    if (Number.isNaN(n)) {
      if (current > max) max = current;

      current = 0;
      continue;
    } else current += n;
  }

  return max;
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data.split("\n").map(Number.parseFloat);

  let maxCalories: number[] = [];
  let current = 0;
  for (const n of parsed) {
    if (Number.isNaN(n)) {
      if (maxCalories.length < 3) maxCalories.push(current);
      else
        for (const m in maxCalories) {
          if (current > maxCalories[m]) {
            maxCalories[m] = current;
            break;
          }
        }

      current = 0;
      maxCalories.sort((a, b) => a - b);
      continue;
    } else current += n;
  }

  return maxCalories
    .sort((a, b) => b - a)
    .reduce((sum, calories) => sum + calories, 0);
}
