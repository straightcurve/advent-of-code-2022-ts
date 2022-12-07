import fs from "fs";

function parseMessage(input: string, length: number) {
  const buffer = [];
  let count = 0;

  for (const char of input) {
    buffer.push(char);
    count++;
    if (buffer.length !== length) continue;

    let map = Array.from({ length: 58 }, () => false);
    let isDuplicate = false;
    for (const char of buffer) {
      isDuplicate = map[char.charCodeAt(0) - 65];

      if (isDuplicate) {
        buffer.shift();
        break;
      }

      map[char.charCodeAt(0) - 65] = true;
    }

    if (!isDuplicate) break;
  }

  return { count, buffer };
}

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  return parseMessage(data, 4).count;
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  return parseMessage(data, 14).count;
}
