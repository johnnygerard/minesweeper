import { BoardState } from "@/types/board-state";
import { GAME_STATUS, GameStatus } from "@/types/game-status";
import { immerable } from "immer";

export class GameState {
  [immerable] = true;
  status: GameStatus = GAME_STATUS.INITIAL;

  constructor(public board: BoardState) {}

  get isOver(): boolean {
    return this.status === GAME_STATUS.WON || this.status === GAME_STATUS.LOST;
  }
}
