import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
import { createContext, Dispatch } from "react";

export const GameContext = createContext<
  | {
      game: GameState;
      dispatch: Dispatch<GameAction>;
    }
  | undefined
>(undefined);
