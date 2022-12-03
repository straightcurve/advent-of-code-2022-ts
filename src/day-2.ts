import fs from "fs";

export enum EncodedOutcome {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

export enum EncodedMeChoice {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}

export enum EncodedOpponentChoice {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

function draw(me: EncodedMeChoice, opponent: EncodedOpponentChoice) {
  return (
    (me === EncodedMeChoice.Rock && opponent === EncodedOpponentChoice.Rock) ||
    (me === EncodedMeChoice.Paper && opponent === EncodedOpponentChoice.Paper) ||
    (me === EncodedMeChoice.Scissors && opponent === EncodedOpponentChoice.Scissors)
  );
}

function won(me: EncodedMeChoice, opponent: EncodedOpponentChoice) {
  return (
    (me === EncodedMeChoice.Rock && opponent === EncodedOpponentChoice.Scissors) ||
    (me === EncodedMeChoice.Paper && opponent === EncodedOpponentChoice.Rock) ||
    (me === EncodedMeChoice.Scissors && opponent === EncodedOpponentChoice.Paper)
  );
}

function score(me: EncodedMeChoice, opponent: EncodedOpponentChoice) {
  let ret = 0;
  switch (me) {
    case EncodedMeChoice.Rock:
      ret += 1;
      break;
    case EncodedMeChoice.Paper:
      ret += 2;
      break;
    case EncodedMeChoice.Scissors:
      ret += 3;
      break;
  }

  if (draw(me, opponent)) ret += 3;
  else if (won(me, opponent)) ret += 6;

  return ret;
}

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const parsed = data.split("\n").map((str) => {
    const split = str.split(" ");
    const round = {
      me: split[1] as EncodedMeChoice,
      opponent: split[0] as EncodedOpponentChoice,
      score: 0,
    };
    round.score = score(round.me, round.opponent);
    return round;
  });
  return parsed.reduce((totalScore, round) => totalScore + round.score, 0);
}

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

const outcome: { [key in EncodedOutcome]: Outcome } = {
  [EncodedOutcome.Lose]: Outcome.Lose,
  [EncodedOutcome.Draw]: Outcome.Draw,
  [EncodedOutcome.Win]: Outcome.Win,
};

const opponentChoice: { [key in EncodedOpponentChoice]: Choice } = {
  [EncodedOpponentChoice.Rock]: Choice.Rock,
  [EncodedOpponentChoice.Paper]: Choice.Paper,
  [EncodedOpponentChoice.Scissors]: Choice.Scissors,
};

function getMyScore(outcome: Outcome, opponent: Choice) {
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
      return getMyScore(
        outcome[split[1] as EncodedOutcome],
        opponentChoice[split[0] as EncodedOpponentChoice]
      );
    });
  return parsed.reduce((totalScore, score) => totalScore + score, 0);
}
