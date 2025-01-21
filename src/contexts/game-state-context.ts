import { GameState } from "@/types/game-state";
import { createContext } from "react";

export const GameStateContext = createContext<GameState | undefined>(undefined);
