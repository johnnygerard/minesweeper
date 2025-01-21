import { GameAction } from "@/types/game-action";
import { createContext, Dispatch } from "react";

export const GameDispatchContext = createContext<
  Dispatch<GameAction> | undefined
>(undefined);
