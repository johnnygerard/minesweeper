export const GAME_STATUS = {
  INITIAL: "INITIAL",
  PLAYING: "PLAYING",
  WON: "WON",
  LOST: "LOST",
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
