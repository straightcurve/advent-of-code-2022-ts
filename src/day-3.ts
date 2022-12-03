import fs from "fs";

function asciiToPrio(c: string) {
  const big = c.charCodeAt(0) - 65;
  if (big > 25) return big - 31;

  return big + 27;
}

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data.split("\n").map((pRucksack) => {
    const rucksack = {
      compartments: [
        pRucksack.slice(0, pRucksack.length / 2),
        pRucksack.slice(pRucksack.length / 2),
      ],
      sum: 0,
    };
    let both: { [key: string]: boolean } = {};

    for (const fItem of rucksack.compartments[0]) {
      for (const sItem of rucksack.compartments[1]) {
        if (!both[fItem] && fItem === sItem) {
          both[fItem] = true;
          rucksack.sum += asciiToPrio(fItem);
        }
      }
    }

    return rucksack;
  });
  return parsed.reduce((sum, rucksack) => sum + rucksack.sum, 0);
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

      let map: { [key: string]: boolean } = {};
      let maxLen = 0;
      for (const sack of group) if (sack.length > maxLen) maxLen = sack.length;

      for (let i = 0; i < maxLen; i++) {
        if (s0.length <= maxLen) map[`0.${s0[i]}`] = true;
        if (s1.length <= maxLen) map[`1.${s1[i]}`] = true;
        if (s2.length <= maxLen) map[`2.${s2[i]}`] = true;
      }

      let found = false;
      while (!found && maxLen--)
        found = map[`1.${s0[maxLen]}`] && map[`2.${s0[maxLen]}`];

      return asciiToPrio(s0[maxLen]);
    });
  return parsed.reduce((sum, badgePrio) => sum + badgePrio, 0);
}
