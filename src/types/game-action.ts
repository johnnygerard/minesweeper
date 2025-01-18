import { GameMode } from "@/types/game-mode";

export type GameAction =
  | { type: "REVEAL"; index: number }
  | { type: "SWITCH_MARK"; index: number }
  | { type: "AUTO_FLAG"; index: number }
  | { type: "AUTO_REVEAL"; index: number }
  | { type: "RESTART"; mode: GameMode };
