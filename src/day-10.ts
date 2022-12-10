import { readFileSync } from "fs";

export function part1(path: string) {
  const data = readFileSync(path, {
    encoding: "utf8",
  });

  let x = 1;
  let sum = 0;
  let cycles = 0;

  data
    .split("\n")
    .filter((s) => s.length)
    .forEach((line) => {
      const split = line.split(" ");
      if (split[0] === "noop") {
        cycles++;
        if ((cycles - 20) % 40 === 0) sum += cycles * x;
      } else if (split[0] === "addx") {
        const v = Number.parseInt(split[1]);
        cycles++;
        if ((cycles - 20) % 40 === 0) sum += cycles * x;

        cycles++;
        if ((cycles - 20) % 40 === 0) sum += cycles * x;

        x += v;
      }
    });

  return sum;
}

export default function (path: string) {
  const data = readFileSync(path, {
    encoding: "utf8",
  });

  let x = 1;
  let cycles = 0;
  let row = "";
  let buffer = "";

  const crtWrite = () => {
    if (x > row.length - 2 && x < row.length + 2) row += "#";
    else row += ".";

    if (cycles % 40 === 0) {
      buffer += row + "\n";
      row = "";
    }
  };

  data
    .split("\n")
    .filter((s) => s.length)
    .forEach((line) => {
      const split = line.split(" ");
      switch (split[0]) {
        case "noop": {
          cycles++;
          crtWrite();
          break;
        }
        case "addx": {
          const v = Number.parseInt(split[1]);

          cycles++;
          crtWrite();

          cycles++;
          crtWrite();

          x += v;
          break;
        }
      }
    });

  return buffer.slice(0, buffer.length - 1);
}
