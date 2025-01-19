import { GameContext } from "@/contexts";
import { useContext } from "react";

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context) return context;
  throw new Error("Context provider not found");
};
