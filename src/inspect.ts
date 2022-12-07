import { inspect as _inspect } from "util";

export default function inspect(obj: any) {
  return console.log(_inspect(obj, false, 10, true));
}
