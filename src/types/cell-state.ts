import { AdjacentMines } from "@/types/adjacent-mines";

export type CellState = {
  readonly index: number;
  readonly isMined: boolean;
  adjacentMines?: AdjacentMines;
  isFlagged?: boolean;
  isRevealed?: boolean;
};
