import { createContext } from "react";
import type { GameStatus } from "~/types/game-status";

export const GameStatusContext = createContext<GameStatus | undefined>(
  undefined,
);
