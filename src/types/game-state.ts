import { BoardState } from "@/types/board-state";
import { GAME_STATUS, GameStatus } from "@/types/game-status";
import { immerable } from "immer";

export class GameState {
  [immerable] = true;
  status: GameStatus = GAME_STATUS.INITIAL;

  constructor(public board: BoardState) {}

  get isNotStarted(): boolean {
    return this.status === GAME_STATUS.INITIAL;
  }

  get isInProgress(): boolean {
    return this.status === GAME_STATUS.IN_PROGRESS;
  }

  get isLost(): boolean {
    return this.status === GAME_STATUS.LOST;
  }

  get isWon(): boolean {
    return this.status === GAME_STATUS.WON;
  }

  get isOver(): boolean {
    return this.isLost || this.isWon;
  }

  start(): void {
    this.status = GAME_STATUS.IN_PROGRESS;
  }

  reset(): void {
    this.status = GAME_STATUS.INITIAL;
    this.board = new BoardState(this.board.mode);
  }

  setDefeat(): void {
    this.status = GAME_STATUS.LOST;
  }

  setVictory(): void {
    this.status = GAME_STATUS.WON;
  }
}
