import { BoardState } from "@/types/board-state";

export type GameState = {
  isGameOver: boolean;
  board: BoardState;
};
