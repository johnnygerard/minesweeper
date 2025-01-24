import { GameDispatchContext } from "@/contexts/game-dispatch-context";
import { useContext } from "react";

export const useContextGameDispatch = () => {
  const context = useContext(GameDispatchContext);
  if (context) return context;
  throw new Error("Context provider not found");
};
