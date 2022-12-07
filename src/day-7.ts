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

function indent(size: number) {
  let ret = "";
  while (size--) ret += " ";
  return ret;
}

function printTree(root: Directory) {
  _print(root, 0);

  function _print(node: Directory | File, level: number) {
    const directory = node as Directory;
    if (directory.children) {
      console.log(indent(level * 2), "-", node.name, "(dir)");
      for (const child of directory.children) _print(child, level + 1);
    } else {
      const file = node as File;
      console.log(
        indent(level * 2),
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

function isCommand(s: string) {
  return s.startsWith("$");
}

function parseTree(data: string): Directory {
  const input = data.split("\n").filter((s) => s.length);
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

export type FileNonRecursive = {
  name: string;
  size: number;

  parent: number;
  next: number;
};

export type DirectoryNonRecursive = {
  name: string;

  firstChild: number;
  parent: number;
  next: number;
};

function parseDirectoryOrFileNonRecursive(
  str: string,
  parent: number,
  next: number
): DirectoryNonRecursive | FileNonRecursive {
  const split = str.split(" ");
  if (split[0] === "dir")
    return {
      name: split[1],
      parent,
      firstChild: -1,
      next,
    } as DirectoryNonRecursive;

  return {
    name: split[1],
    parent,
    next,
    size: Number.parseFloat(split[0]),
  } as FileNonRecursive;
}

function getSizeNonRecursive(
  tree: (DirectoryNonRecursive | FileNonRecursive)[],
  node: DirectoryNonRecursive | FileNonRecursive
): number {
  const directory = node as DirectoryNonRecursive;
  if (directory.firstChild === -1) {
    return (node as FileNonRecursive).size;
  }

  let size = 0;
  const startIdx = tree.indexOf(node);
  const stack: { idx: number }[] = [{ idx: startIdx }];
  while (stack.length) {
    let entry = stack.pop() as { idx: number };
    const dir = tree[entry.idx] as DirectoryNonRecursive;
    if (entry.idx !== startIdx && dir.next > -1) stack.push({ idx: dir.next });
    if (dir.firstChild > -1) stack.push({ idx: dir.firstChild });
    else {
      size += (tree[entry.idx] as FileNonRecursive).size;
    }
  }

  return size;
}

function forEachNonRecursive(
  tree: (DirectoryNonRecursive | FileNonRecursive)[],
  fn: (entry: {
    index: number;
    value: DirectoryNonRecursive | FileNonRecursive;
    level: number;
  }) => void
) {
  const stack: { idx: number; level: number }[] = [{ idx: 0, level: 0 }];
  while (stack.length) {
    let entry = stack.pop() as { idx: number; level: number };
    const dir = tree[entry.idx] as DirectoryNonRecursive;

    fn({ index: entry.idx, level: entry.level, value: tree[entry.idx] });

    if (dir.next > -1) stack.push({ idx: dir.next, level: entry.level });

    if (dir.firstChild > -1)
      stack.push({ idx: dir.firstChild, level: entry.level + 1 });
  }
}

function parseTreeNonRecursive(data: string) {
  const input = data.split("\n").filter((s) => s.length);
  const tree: (DirectoryNonRecursive | FileNonRecursive)[] = [
    { name: "/", firstChild: -1, parent: -1, next: -1 },
  ];
  let currentDirectoryIdx!: number;
  let currentDirectory!: DirectoryNonRecursive;
  const changeDirectory = (index: number) => {
    currentDirectory = tree[index] as DirectoryNonRecursive;
    currentDirectoryIdx = index;
  };

  changeDirectory(0);

  for (const line of input) {
    if (isCommand(line)) {
      const parsed = parseCommand(line);
      switch (parsed.type) {
        case "cd": {
          const location = parsed.args[0];
          if (location === "/") {
            changeDirectory(0);
          } else if (location === "..") {
            if (currentDirectory.name === "/") break;

            changeDirectory(currentDirectory.parent);
          } else {
            let prevChild = -1;
            let currentChild = currentDirectory.firstChild;
            let found = false;
            while (!found && currentChild !== -1) {
              found = tree[currentChild].name === location;
              prevChild = currentChild;
              currentChild = tree[currentChild].next;
            }

            if (!found) {
              const newDirectory: DirectoryNonRecursive = {
                name: location,
                parent: currentDirectoryIdx,
                next: currentDirectory.firstChild,
                firstChild: -1,
              };

              currentDirectory.firstChild = tree.length;
              tree.push(newDirectory);
              changeDirectory(tree.length - 1);
            } else {
              changeDirectory(prevChild);
            }
          }

          break;
        }
        case "ls":
          break;
        default:
          break;
      }
    } else {
      const node = parseDirectoryOrFileNonRecursive(
        line,
        currentDirectoryIdx,
        currentDirectory.firstChild
      );

      let currentChild = currentDirectory.firstChild;
      let found = false;
      while (!found && currentChild !== -1) {
        found = tree[currentChild].name === node.name;
        currentChild = tree[currentChild].next;
      }
      if (!found) {
        node.next = currentDirectory.firstChild;
        currentDirectory.firstChild = tree.length;
        tree.push(node);
      }
    }
  }

  return tree;
}

export function part1NonRecursive(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  let totalSize = 0;

  const tree = parseTreeNonRecursive(data);
  forEachNonRecursive(tree, (entry) => {
    const directory = entry.value as DirectoryNonRecursive;
    if (directory.firstChild > -1) {
      const directorySize = getSizeNonRecursive(tree, directory);
      if (directorySize <= 100000) totalSize += directorySize;
    }
  });

  return totalSize;
}

export function part2NonRecursive(path: string) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
  });

  const tree = parseTreeNonRecursive(data);

  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const occupiedSpace = getSizeNonRecursive(tree, tree[0]);
  const availableSpace = totalSpace - occupiedSpace;
  const toFreeUpSpace = requiredSpace - availableSpace;
  const candidates: DirectoryNonRecursive[] = [];
  forEachNonRecursive(tree, (entry) => {
    const directory = entry.value as DirectoryNonRecursive;
    if (directory.firstChild > -1) {
      const directorySize = getSizeNonRecursive(tree, entry.value);
      if (directorySize < toFreeUpSpace) return;

      candidates.push(directory);
    }
  });
  candidates.sort(
    (a, b) => getSizeNonRecursive(tree, a) - getSizeNonRecursive(tree, b)
  );

  return getSizeNonRecursive(tree, candidates[0]);
}
