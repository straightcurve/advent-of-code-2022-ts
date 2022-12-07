import fs from "fs";

export enum Choice {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
  Count = 3,
}

enum Outcome {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

function getScorePart1(me: Choice, opponent: Choice) {
  let ret = me + 1;

  const diff = me - opponent;
  if (diff === 0) ret += 3;
  else if (diff > 0 || diff === -2) ret += 6;

  return ret;
}

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data.split("\n").map((str) => {
    const split = str.split(" ");
    return getScorePart1(
      split[1].charCodeAt(0) - 88,
      split[0].charCodeAt(0) - 65
    );
  });
  return parsed.reduce((totalScore, score) => totalScore + score, 0);
}

function getScorePart2(outcome: Outcome, opponent: Choice) {
  switch (outcome) {
    case Outcome.Win:
      return outcome + ((opponent + 1) % Choice.Count) + 1;
    case Outcome.Draw:
      return outcome + opponent + 1;
    case Outcome.Lose:
      if (opponent === Choice.Rock) return outcome + Choice.Count;
      return outcome + opponent;
  }
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data
    .split("\n")
    .filter((str) => str.length)
    .map((str) => {
      const split = str.split(" ");
      return getScorePart2(
        (split[1].charCodeAt(0) - 88) * 3,
        split[0].charCodeAt(0) - 65
      );
    });
  return parsed.reduce((totalScore, score) => totalScore + score, 0);
}
