export type GameAction =
  | { type: "REVEAL"; index: number }
  | { type: "TOGGLE_FLAG"; index: number }
  | { type: "AUTO_FLAG"; index: number }
  | { type: "RESTART" };
