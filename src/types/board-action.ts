export type BoardAction =
  | { type: "REVEAL"; index: number }
  | { type: "TOGGLE_FLAG"; index: number };
