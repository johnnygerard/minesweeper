import { AdjacentMineCount } from "@/types/adjacent-mine-count";
import { immerable } from "immer";

const enum CELL_STATE {
  INITIAL = "INITIAL",
  FLAGGED = "FLAGGED",
  QUESTION_MARKED = "QUESTION_MARKED",
  REVEALED = "REVEALED",
}

export class Cell {
  [immerable] = true;
  state = CELL_STATE.INITIAL;
  isMined?: boolean;
  adjacentMineCount?: AdjacentMineCount;

  constructor(readonly index: number) {}

  get isInitial(): boolean {
    return this.state === CELL_STATE.INITIAL;
  }

  set isInitial(_: true) {
    this.state = CELL_STATE.INITIAL;
  }

  get isFlagged(): boolean {
    return this.state === CELL_STATE.FLAGGED;
  }

  set isFlagged(_: true) {
    this.state = CELL_STATE.FLAGGED;
  }

  get hasQuestionMark(): boolean {
    return this.state === CELL_STATE.QUESTION_MARKED;
  }

  set hasQuestionMark(_: true) {
    this.state = CELL_STATE.QUESTION_MARKED;
  }

  get isRevealed(): boolean {
    return this.state === CELL_STATE.REVEALED;
  }

  set isRevealed(_: true) {
    this.state = CELL_STATE.REVEALED;
  }
}
