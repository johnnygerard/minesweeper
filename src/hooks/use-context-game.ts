import { GameContext } from "@/contexts/game-context";
import { useContext } from "react";

export const useContextGame = () => {
  const context = useContext(GameContext);
  if (context) return context;
  throw new Error("Context provider not found");
};
