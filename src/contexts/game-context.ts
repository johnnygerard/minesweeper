import { Game } from "@/types/game";
import { createContext } from "react";

export const GameContext = createContext<Game | undefined>(undefined);
