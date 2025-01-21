import { GameStatus } from "@/types/game-status";
import { createContext } from "react";

export const GameStatusContext = createContext<GameStatus | undefined>(
  undefined,
);
