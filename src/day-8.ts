import fs from "fs";

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const rows = data.split("\n").filter((s) => s.length);
  const rowCount = rows.length;
  const colCount = rows[0].length;

  let map = Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => 0)
  );

  for (let i = 0; i < rowCount * colCount; i++) {
    const x = Math.floor(i / rowCount);
    const y = i % rowCount;

    const cell = rows[y][x];
    map[y][x] += Number.parseFloat(cell);
  }

  const isVisible = (x: number, y: number) => {
    const cell = map[y][x];

    let blocked = 0;
    let top = 0;
    while (top < y) {
      const isTaller = map[y - top - 1][x] >= cell;
      top++;
      if (isTaller) {
        blocked |= 1 << 1;
        break;
      }
    }

    let bot = 0;
    while (y + bot + 1 < rowCount) {
      const isTaller = map[y + bot + 1][x] >= cell;
      bot++;
      if (isTaller) {
        blocked |= 1 << 2;
        break;
      }
    }

    let left = 0;
    while (left < x) {
      const isTaller = map[y][x - left - 1] >= cell;
      left++;
      if (isTaller) {
        blocked |= 1 << 3;
        break;
      }
    }

    let right = 0;
    while (x + right + 1 < colCount) {
      const isTaller = map[y][x + right + 1] >= cell;
      right++;
      if (isTaller) {
        blocked |= 1 << 4;
        break;
      }
    }

    return blocked !== 30;
  };

  let visibleCount = 0;
  visibleCount += 2 * colCount;
  visibleCount += 2 * (rowCount - 2);

  for (let i = 0; i < rowCount * colCount; i++) {
    const x = Math.floor(i / rowCount);
    const y = i % rowCount;
    if (x === 0 || y === 0 || x === rowCount - 1 || y === rowCount - 1)
      continue;

    if (isVisible(x, y)) visibleCount++;
  }

  return visibleCount;
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const rows = data.split("\n").filter((s) => s.length);
  const rowCount = rows.length;
  const colCount = rows[0].length;

  let map = Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => 0)
  );

  for (let i = 0; i < rowCount * colCount; i++) {
    const x = Math.floor(i / rowCount);
    const y = i % rowCount;

    const cell = rows[y][x];
    map[y][x] += Number.parseFloat(cell);
  }

  const computeScenicScore = (x: number, y: number) => {
    const cell = map[y][x];

    let top = 0;
    while (top < y) {
      const isTaller = map[y - top - 1][x] >= cell;
      top++;
      if (isTaller) break;
    }

    let bot = 0;
    while (y + bot + 1 < rowCount) {
      const isTaller = map[y + bot + 1][x] >= cell;
      bot++;
      if (isTaller) break;
    }

    let left = 0;
    while (left < x) {
      const isTaller = map[y][x - left - 1] >= cell;
      left++;
      if (isTaller) break;
    }

    let right = 0;
    while (x + right + 1 < colCount) {
      const isTaller = map[y][x + right + 1] >= cell;
      right++;
      if (isTaller) break;
    }

    return top * left * bot * right;
  };

  let maxScore = 0;
  for (let i = 0; i < rowCount * colCount; i++) {
    const x = Math.floor(i / rowCount);
    const y = i % rowCount;
    if (x === 0 || y === 0 || x === rowCount - 1 || y === rowCount - 1)
      continue;

    let score = computeScenicScore(x, y);
    if (score > maxScore) maxScore = score;
  }

  return maxScore;
}
