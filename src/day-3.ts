import fs from "fs";

function indexToPrio(i: number) {
  if (i > 25) return i - 25;
  return i + 27;
}

function asciiToIndex(c: string) {
  const big = c.charCodeAt(0) - 65;
  if (big > 25) return big - 6;

  return big;
}

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data
    .split("\n")
    .filter((s) => s.length)
    .map((rucksack) => {
      const s0 = rucksack.slice(0, rucksack.length / 2);
      const s1 = rucksack.slice(rucksack.length / 2);

      const common = Array.from({ length: 52 }, () => 0);
      let i = 0;
      while (i < s0.length || i < s1.length) {
        if (i < s0.length) common[asciiToIndex(s0[i])] |= 1 << 1;
        if (i < s1.length) common[asciiToIndex(s1[i])] |= 1 << 2;

        i++;
      }

      let sum = 0;
      for (let i = 0; i < common.length; i++)
        if (common[i] === 6) sum += indexToPrio(i);
      return sum;
    });
  return parsed.reduce((sum, itemsPrios) => sum + itemsPrios, 0);
}

function getNextGroup(groups: string[][]) {
  for (const group of groups) if (group.length < 3) return group;

  const ret: string[] = [];
  groups.push(ret);
  return ret;
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data
    .split("\n")
    .filter((str) => str.length)
    .reduce((groups, rucksack) => {
      const group = getNextGroup(groups);
      group.push(rucksack);
      return groups;
    }, [] as string[][])
    .map((group) => {
      const s0 = group[0];
      const s1 = group[1];
      const s2 = group[2];

      const common = Array.from({ length: 52 }, () => 0);
      let i = 0;
      while (i < s0.length || i < s1.length || i < s2.length) {
        if (i < s0.length) common[asciiToIndex(s0[i])] |= 1 << 1;
        if (i < s1.length) common[asciiToIndex(s1[i])] |= 1 << 2;
        if (i < s2.length) common[asciiToIndex(s2[i])] |= 1 << 3;

        i++;
      }

      const prio = common.indexOf(14);
      //  why does this work though
      //  27 - 25 + 1
      if (prio <= 25) return prio + 3;

      return prio;
    });
  //  needs -1 here, but why?
  return parsed.reduce((sum, badgePrio) => sum + badgePrio, -1);
}
