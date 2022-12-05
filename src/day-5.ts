import fs from "fs";

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const stacks: string[][] = [];
  let mode = ParseMode.Value;

  data
    .split("\n")
    .filter((str) => str.length)
    .forEach((stuff) => {
      const parseValue = (str: string) => {
        const value = str.slice(0, 3);
        if (value[0] === "[") return { value: value[1], left: str.slice(3) };
        return { value: null, left: str.slice(3) };
      };

      const parseValues = (str: string) => {
        let left = str;
        let stackIdx = 0;

        while (left.length && left[0] !== "\n") {
          if (!stacks[stackIdx]) stacks[stackIdx] = [];
          const result = parseValue(left);
          if (result.value) stacks[stackIdx].unshift(result.value);
          left = result.left;

          //  consume single whitespace
          left = left.slice(1);
          stackIdx++;
        }
      };

      const parseInstruction = (str: string) => {
        const args = str.split(" ");
        let count = Number.parseFloat(args[1]);
        const from = Number.parseFloat(args[3]) - 1;
        const to = Number.parseFloat(args[5]) - 1;

        while (count--) stacks[to].push(stacks[from].pop() || "__invalid__");
      };

      if (stuff.at(1) === "1") mode = ParseMode.StackNo;
      else if (stuff.at(0) === "m") mode = ParseMode.Instruction;

      switch (mode) {
        case ParseMode.Value: {
          parseValues(stuff);
          break;
        }
        case ParseMode.StackNo: {
          mode = ParseMode.Instruction;
          break;
        }
        case ParseMode.Instruction: {
          parseInstruction(stuff);
          break;
        }
      }
    });

  return stacks.map((stack) => stack.pop()).join("");
}

export enum ParseMode {
  Value,
  StackNo,
  Instruction,
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const stacks: string[][] = [];
  let mode = ParseMode.Value;

  data
    .split("\n")
    .filter((str) => str.length)
    .forEach((stuff) => {
      const parseValue = (str: string) => {
        const value = str.slice(0, 3);
        if (value[0] === "[") return { value: value[1], left: str.slice(3) };
        return { value: null, left: str.slice(3) };
      };

      const parseValues = (str: string) => {
        let left = str;
        let stackIdx = 0;

        while (left.length && left[0] !== "\n") {
          if (!stacks[stackIdx]) stacks[stackIdx] = [];
          const result = parseValue(left);
          if (result.value) stacks[stackIdx].unshift(result.value);
          left = result.left;

          //  consume single whitespace
          left = left.slice(1);
          stackIdx++;
        }
      };

      const parseInstruction = (str: string) => {
        const args = str.split(" ");
        const count = Number.parseFloat(args[1]);
        const from = Number.parseFloat(args[3]) - 1;
        const to = Number.parseFloat(args[5]) - 1;
        const buffer = [];

        let tempCount = count;
        while (tempCount--) buffer.push(stacks[from].pop() || "__invalid__");

        tempCount = count;
        while (tempCount--) stacks[to].push(buffer.pop() || "__invalid__");
      };

      if (stuff.at(1) === "1") mode = ParseMode.StackNo;
      else if (stuff.at(0) === "m") mode = ParseMode.Instruction;

      switch (mode) {
        case ParseMode.Value: {
          parseValues(stuff);
          break;
        }
        case ParseMode.StackNo: {
          mode = ParseMode.Instruction;
          break;
        }
        case ParseMode.Instruction: {
          parseInstruction(stuff);
          break;
        }
      }
    });

  return stacks.map((stack) => stack.pop()).join("");
}
