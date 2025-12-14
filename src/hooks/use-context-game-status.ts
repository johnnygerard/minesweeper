import { useContext } from "react";
import { GameStatusContext } from "~/contexts/game-status-context";

export const useContextGameStatus = () => {
  const context = useContext(GameStatusContext);
  if (context) return context;
  throw new Error("Context provider not found");
};
