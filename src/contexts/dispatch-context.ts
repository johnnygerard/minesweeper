import { GameAction } from "@/types/game-action";
import { createContext, Dispatch } from "react";

export const DispatchContext = createContext<Dispatch<GameAction>>(() => {
  throw new Error("Context provider not found");
});
