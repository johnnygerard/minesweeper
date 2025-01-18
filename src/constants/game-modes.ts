import { GameMode } from "@/types/game-mode";

export const GAME_MODES: Record<"EASY" | "MEDIUM" | "HARD", GameMode> = {
  EASY: {
    name: "Easy",
    urlPath: "/",
    columns: 9,
    rows: 9,
    mines: 10,
  },
  MEDIUM: {
    name: "Medium",
    urlPath: "/medium",
    columns: 16,
    rows: 16,
    mines: 40,
  },
  HARD: {
    name: "Expert",
    urlPath: "/expert",
    columns: 30,
    rows: 16,
    mines: 99,
  },
};
