import { createContext } from "react";
import type { Game } from "~/types/game";

export const GameContext = createContext<Game | undefined>(undefined);
