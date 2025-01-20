import { AdjacentMines } from "@/types/adjacent-mines";
import { immerable } from "immer";

export class CellState {
  [immerable] = true;
  adjacentMines?: AdjacentMines;
  isMined?: boolean;
  hasQuestionMark = false;
  isFlagged = false;
  isRevealed = false;

  constructor(readonly index: number) {}

  get cannotFlag(): boolean {
    return this.isRevealed || this.isFlagged;
  }

  get cannotReveal(): boolean {
    return this.isRevealed || this.isFlagged || this.hasQuestionMark;
  }
}
