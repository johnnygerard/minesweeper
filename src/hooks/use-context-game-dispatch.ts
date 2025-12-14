import { useContext } from "react";
import { GameDispatchContext } from "~/contexts/game-dispatch-context";

export const useContextGameDispatch = () => {
  const context = useContext(GameDispatchContext);
  if (context) return context;
  throw new Error("Context provider not found");
};
