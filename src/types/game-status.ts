export const GAME_STATUS = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  LOST: "LOST",
  WON: "WON",
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
