import fs from "fs";

export type Position = { x: number; y: number };

export enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R",
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}

function distancep(p1: Position, p2: Position) {
  return distance(p1.x, p1.y, p2.x, p2.y);
}

function move(line: string, snake: Position[], positions: Set<string>) {
  const split = line.split(" ");
  const direction = split[0] as Direction;
  const steps = Number.parseInt(split[1]);

  for (let i = 0; i < steps; i++) {
    switch (direction) {
      case Direction.Right: {
        snake[0].x++;
        break;
      }
      case Direction.Left: {
        snake[0].x--;
        break;
      }
      case Direction.Up: {
        snake[0].y++;
        break;
      }
      case Direction.Down:
        snake[0].y--;
        break;
    }

    for (let p = 1; p < snake.length; p++)
      if (distancep(snake[p - 1], snake[p]) > 2) {
        const rowSign = Math.sign(snake[p - 1].y - snake[p].y);
        const columnSign = Math.sign(snake[p - 1].x - snake[p].x);
        snake[p].y += 1 * rowSign;
        snake[p].x += 1 * columnSign;
      }

    positions.add(`${snake[snake.length - 1].x}-${snake[snake.length - 1].y}`);
  }
}

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const snake: Position[] = Array.from({ length: 2 }, () => ({ x: 0, y: 0 }));
  const positions = new Set<string>();

  data
    .split("\n")
    .filter((s) => s.length)
    .forEach((line) => move(line, snake, positions));

  return positions.size;
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });
  const snake: Position[] = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }));
  const positions = new Set<string>();

  data
    .split("\n")
    .filter((s) => s.length)
    .forEach((line) => move(line, snake, positions));

  return positions.size;
}

export function display(positions: Set<string>, snake: Position[]) {
  let out = "";

  for (let y = -72; y < 72; y++) {
    for (let x = -72; x < 72; x++) {
      let isPartOfSnake = false;
      for (let p = 0; p < snake.length && !isPartOfSnake; p++) {
        if (p === 0 && snake[p].x === x && snake[p].y === y) {
          out += "H";
          isPartOfSnake = true;
        } else if (
          p === snake.length - 1 &&
          snake[p].x === x &&
          snake[p].y === y
        ) {
          out += "T";
          isPartOfSnake = true;
        } else if (snake[p].x === x && snake[p].y === y) {
          out += p;
          isPartOfSnake = true;
        }
      }

      if (isPartOfSnake) continue;

      if (x === 0 && y === 0) {
        out += "s";
      } else if (x === 0 && y === 0) {
        out += "s";
      } else {
        out += positions.has(`${x}-${y}`) ? "#" : ".";
      }
    }

    out += "\n";
  }

  return out;
}
