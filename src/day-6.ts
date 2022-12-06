import fs from "fs";

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  let queue = [];
  let count = 0;
  for (const char of data) {
    queue.push(char);
    count++;
    if (queue.length === 4) {
      let map: { [key: string]: boolean } = {};
      let isDuplicate = false;
      for (const char of queue) {
        isDuplicate = map[char];

        if (isDuplicate) {
          queue.shift();
          break;
        }

        map[char] = true;
      }

      if (!isDuplicate) break;
    }
  }

  return count;
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  let buffer = [];
  let count = 0;
  for (const char of data) {
    buffer.push(char);
    count++;
    if (buffer.length !== 4) continue;

    let map: { [key: string]: boolean } = {};
    let isDuplicate = false;
    for (const char of buffer) {
      isDuplicate = map[char];

      if (isDuplicate) {
        buffer.shift();
        break;
      }

      map[char] = true;
    }

    if (!isDuplicate) break;
  }

  for (const char of data.slice(count)) {
    buffer.push(char);
    count++;
    if (buffer.length !== 14) continue;

    let map: { [key: string]: boolean } = {};
    let isDuplicate = false;
    for (const char of buffer) {
      isDuplicate = map[char];

      if (isDuplicate) {
        buffer.shift();
        break;
      }

      map[char] = true;
    }

    if (!isDuplicate) break;
  }

  return count;
}
