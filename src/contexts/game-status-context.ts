import { GAME_STATUS, GameStatus } from "@/types/game-status";
import { createContext } from "react";

export const GameStatusContext = createContext<GameStatus>(GAME_STATUS.INITIAL);
