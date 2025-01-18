export const GAME_MODES = {
  EASY: {
    rows: 9,
    columns: 9,
    mines: 10,
  },
  MEDIUM: {
    rows: 16,
    columns: 16,
    mines: 40,
  },
  HARD: {
    rows: 16,
    columns: 30,
    mines: 99,
  },
} as const;
