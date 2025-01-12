import { AdjacentMines } from "@/types/adjacent-mines";
import { immerable } from "immer";

export class CellState {
  [immerable] = true;
  adjacentMines?: AdjacentMines;
  isFlagged?: boolean;
  isRevealed?: boolean;

  constructor(
    readonly index: number,
    readonly isMined: boolean,
  ) {}
}
