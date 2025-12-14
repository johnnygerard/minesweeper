import { useContext } from "react";
import { GameContext } from "~/contexts/game-context";

export const useContextGame = () => {
  const context = useContext(GameContext);
  if (context) return context;
  throw new Error("Context provider not found");
};
