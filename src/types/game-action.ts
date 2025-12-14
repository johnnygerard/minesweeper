export const enum GAME_ACTION {
  AUTO_FLAG = "AUTO_FLAG",
  AUTO_REVEAL = "AUTO_REVEAL",
  RESTART = "RESTART",
  REVEAL = "REVEAL",
  TOGGLE_FLAG = "TOGGLE_FLAG",
  TOGGLE_QUESTION_MARK = "TOGGLE_QUESTION_MARK",
}

export type GameAction =
  | { type: GAME_ACTION.AUTO_FLAG; index: number }
  | { type: GAME_ACTION.AUTO_REVEAL; index: number }
  | { type: GAME_ACTION.RESTART }
  | { type: GAME_ACTION.REVEAL; index: number }
  | { type: GAME_ACTION.TOGGLE_FLAG; index: number }
  | { type: GAME_ACTION.TOGGLE_QUESTION_MARK; index: number };
