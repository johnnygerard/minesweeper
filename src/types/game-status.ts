import { immerable } from "immer";

const enum GAME_STATUS {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  LOST = "LOST",
  WON = "WON",
}

export class GameStatus {
  [immerable] = true;
  private _value = GAME_STATUS.NOT_STARTED;

  get isNotStarted(): boolean {
    return this._value === GAME_STATUS.NOT_STARTED;
  }

  get isInProgress(): boolean {
    return this._value === GAME_STATUS.IN_PROGRESS;
  }

  set isInProgress(_: true) {
    this._value = GAME_STATUS.IN_PROGRESS;
  }

  get isLost(): boolean {
    return this._value === GAME_STATUS.LOST;
  }

  set isLost(_: true) {
    this._value = GAME_STATUS.LOST;
  }

  get isWon(): boolean {
    return this._value === GAME_STATUS.WON;
  }

  set isWon(_: true) {
    this._value = GAME_STATUS.WON;
  }

  get isOver(): boolean {
    return this.isLost || this.isWon;
  }
}
