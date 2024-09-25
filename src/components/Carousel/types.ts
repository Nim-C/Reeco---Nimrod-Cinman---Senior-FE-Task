import { LEFT, RIGHT } from "./constants";

export type AvailableScrolls = { [LEFT]: number; [RIGHT]: number };
export type Direction = typeof LEFT | typeof RIGHT;
