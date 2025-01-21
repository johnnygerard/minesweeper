import { BoardState } from "@/types/board-state";
import { GAME_STATUS, GameStatus } from "@/types/game-status";
import { immerable } from "immer";

export class GameState {
  [immerable] = true;
  status = new GameStatus();

  constructor(public board: BoardState) {}

  start(): void {
    this.status.value = GAME_STATUS.IN_PROGRESS;
  }

  reset(): void {
    this.status.value = GAME_STATUS.INITIAL;
    this.board = new BoardState(this.board.mode);
  }

  setDefeat(): void {
    this.status.value = GAME_STATUS.LOST;
  }

  setVictory(): void {
    this.status.value = GAME_STATUS.WON;
  }
}
