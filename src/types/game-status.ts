import { immerable } from "immer";

export const enum GAME_STATUS {
  INITIAL = "INITIAL",
  IN_PROGRESS = "IN_PROGRESS",
  LOST = "LOST",
  WON = "WON",
}

export class GameStatus {
  [immerable] = true;
  value: GAME_STATUS = GAME_STATUS.INITIAL;

  get isNotStarted(): boolean {
    return this.value === GAME_STATUS.INITIAL;
  }

  get isInProgress(): boolean {
    return this.value === GAME_STATUS.IN_PROGRESS;
  }

  get isLost(): boolean {
    return this.value === GAME_STATUS.LOST;
  }

  get isWon(): boolean {
    return this.value === GAME_STATUS.WON;
  }

  get isOver(): boolean {
    return this.isLost || this.isWon;
  }
}
