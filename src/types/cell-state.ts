import { AdjacentMines } from "@/types/adjacent-mines";
import { immerable } from "immer";

export class CellState {
  [immerable] = true;
  adjacentMines?: AdjacentMines;
  isFlagged = false;
  isRevealed = false;

  constructor(
    readonly index: number,
    readonly isMined: boolean,
  ) {}
}
