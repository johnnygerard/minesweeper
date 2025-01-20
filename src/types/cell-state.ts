import { AdjacentMines } from "@/types/adjacent-mines";
import { immerable } from "immer";

export class CellState {
  [immerable] = true;
  adjacentMines: AdjacentMines | null = null;
  hasQuestionMark = false;
  isFlagged = false;
  isMined: boolean | null = null;
  isRevealed = false;

  constructor(readonly index: number) {}

  /**
   * @returns True if this cell is in a non-default state, false otherwise.
   */
  get isDirty(): boolean {
    return this.isRevealed || this.isFlagged || this.hasQuestionMark;
  }
}
