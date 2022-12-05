import fs from "fs";

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data
    .split("\n")
    .filter((s) => s.length)
    .map((pIntervals) => {
      const splitIntervals = pIntervals.split(",");
      const intervals = [
        splitIntervals[0].split("-").map(Number.parseFloat),
        splitIntervals[1].split("-").map(Number.parseFloat),
      ];

      if (
        intervals[0][0] <= intervals[1][0] &&
        intervals[0][1] >= intervals[1][1]
      )
        return 1;
      else if (
        intervals[1][0] <= intervals[0][0] &&
        intervals[1][1] >= intervals[0][1]
      )
        return 1;

      return 0 as number;
    });
  return parsed.reduce((sum, score) => sum + score, 0);
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data
    .split("\n")
    .filter((str) => str.length)
    .map((pIntervals) => {
      const splitIntervals = pIntervals.split(",");
      const intervals = [
        splitIntervals[0].split("-").map(Number.parseFloat),
        splitIntervals[1].split("-").map(Number.parseFloat),
      ];

      const sx = intervals[0][0];
      const ex = intervals[0][1];
      const sy = intervals[1][0];
      const ey = intervals[1][1];

      if (ex === sy) return 1;
      if (ex === ey) return 1;
      if (sy >= sx && ex >= sy) return 1;
      if (sx >= sy && ey >= sx) return 1;

      return 0 as number;
    });

  return parsed.reduce((sum, score) => sum + score, 0);
}
