import { GameMode } from "@/types/game-mode";

export const GAME_MODES: Record<"EASY" | "MEDIUM" | "EXPERT", GameMode> = {
  EASY: {
    name: "Easy",
    urlPath: "/",
    columnCount: 9,
    rowCount: 9,
    mineCount: 10,
  },
  MEDIUM: {
    name: "Medium",
    urlPath: "/medium",
    columnCount: 16,
    rowCount: 16,
    mineCount: 40,
  },
  EXPERT: {
    name: "Expert",
    urlPath: "/expert",
    columnCount: 30,
    rowCount: 16,
    mineCount: 99,
  },
};
