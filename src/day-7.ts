import fs from "fs";

export type ChangeDirectoryCommand = {
  type: "cd";
  args: [location: string];
};

export type ListCommand = {
  type: "ls";
};

export type File = {
  name: string;
  size: number;
  parent: Directory;
};

export type Directory = {
  name: string;
  parent: Directory | null;
  children: (File | Directory)[];
};

function forEach(directory: Directory, fn: (node: Directory | File) => void) {
  return directory.children.forEach((child) => {
    fn(child);

    const childDirectory = child as Directory;
    if (childDirectory.children) forEach(childDirectory, fn);
  });
}

function getSize(node: Directory | File): number {
  const directory = node as Directory;
  if (!directory.children) return (node as File).size;

  return directory.children.reduce((size, child) => {
    const childDirectory = child as Directory;
    if (childDirectory.children) return size + getSize(childDirectory);

    return size + (child as File).size;
  }, 0);
}

function printTree(root: Directory) {
  _print(root, 0);

  function _indent(size: number) {
    let ret = "";
    while (size--) ret += " ";
    return ret;
  }

  function _print(node: Directory | File, level: number) {
    const directory = node as Directory;
    if (directory.children) {
      console.log(_indent(level * 2), "-", node.name, "(dir)");
      for (const child of directory.children) _print(child, level + 1);
    } else {
      const file = node as File;
      console.log(
        _indent(level * 2),
        "-",
        node.name,
        `(file, size=${file.size}`
      );
    }
  }
}

function parseDirectoryOrFile(
  str: string,
  parent: Directory
): Directory | File {
  const split = str.split(" ");
  if (split[0] === "dir")
    return { name: split[1], parent, children: [] } as Directory;

  return { name: split[1], parent, size: Number.parseFloat(split[0]) } as File;
}

function parseCommand(str: string): ChangeDirectoryCommand | ListCommand {
  const split = str.split(" ");
  switch (split[1]) {
    case "cd":
      return {
        type: "cd",
        args: split.slice(2),
      } as ChangeDirectoryCommand;
    case "ls":
      return {
        type: "ls",
      };
    default:
      throw new Error(`unknown command ${split[1]}`);
  }
}

function parseTree(data: string): Directory {
  const input = data.split("\n").filter((s) => s.length);
  const isCommand = (s: string) => s.startsWith("$");
  const tree: Directory = {
    name: "/",
    parent: null,
    children: [],
  };
  let currentDirectory: Directory = tree;

  for (const line of input) {
    if (isCommand(line)) {
      const parsed = parseCommand(line);
      switch (parsed.type) {
        case "cd": {
          const location = parsed.args[0];
          if (location === "/") currentDirectory = tree;
          else if (location === "..") {
            if (currentDirectory.name === "/") break;

            //@ts-ignore
            currentDirectory = currentDirectory.parent;
          } else {
            let i = currentDirectory.children.length;
            let found = false;
            while (!found && i--)
              found = currentDirectory.children[i].name === location;
            if (!found) {
              const newDirectory = {
                name: location,
                children: [],
                parent: currentDirectory,
              };
              currentDirectory.children.push(newDirectory);
              currentDirectory = newDirectory;
            } else currentDirectory = currentDirectory.children[i] as Directory;
          }
          break;
        }
        case "ls":
          break;
        default:
          break;
      }
    } else {
      const node = parseDirectoryOrFile(line, currentDirectory);
      const exists = currentDirectory.children.some(
        (n) => n.name === node.name
      );
      if (!exists) currentDirectory.children.push(node);
    }
  }

  return tree;
}

export function part1(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  let totalSize = 0;

  const tree = parseTree(data);
  forEach(tree, (node) => {
    const directory = node as Directory;
    if (directory.children) {
      const directorySize = getSize(node);
      if (directorySize <= 100000) totalSize += directorySize;
    }
  });

  return totalSize;
}

export default function (path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  const tree = parseTree(data);

  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const occupiedSpace = getSize(tree);
  const availableSpace = totalSpace - occupiedSpace;
  const toFreeUpSpace = requiredSpace - availableSpace;
  const candidates: Directory[] = [];
  forEach(tree, (node) => {
    const directory = node as Directory;
    if (directory.children) {
      const directorySize = getSize(node);
      if (directorySize < toFreeUpSpace) return;

      candidates.push(directory);
    }
  });
  candidates.sort((a, b) => getSize(a) - getSize(b));

  return getSize(candidates[0]);
}
