import { createContext, type Dispatch } from "react";
import type { GameAction } from "~/types/game-action";

export const GameDispatchContext = createContext<
  Dispatch<GameAction> | undefined
>(undefined);
