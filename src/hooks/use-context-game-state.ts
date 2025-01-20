import { GameStateContext } from "@/contexts";
import { useContext } from "react";

export const useContextGameState = () => {
  const context = useContext(GameStateContext);
  if (context) return context;
  throw new Error("Context provider not found");
};
