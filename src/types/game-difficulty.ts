export const GAME_DIFFICULTY = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
} as const;

export type GameDifficulty =
  (typeof GAME_DIFFICULTY)[keyof typeof GAME_DIFFICULTY];
