import { BoardState } from "@/types/board-state";
import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
import { GAME_STATUS } from "@/types/game-status";
import { Draft } from "immer";

export const gameReducer = (
  game: Draft<GameState>,
  action: GameAction,
): void => {
  switch (action.type) {
    case "REVEAL": {
      const cell = game.board.cells[action.index];

      if (cell.isMined) {
        cell.isRevealed = true;
        game.status = GAME_STATUS.LOST;
        break;
      }

      game.board.revealSafeCell(cell);
      game.status = game.board.hasWon ? GAME_STATUS.WON : GAME_STATUS.PLAYING;
      break;
    }
    case "TOGGLE_FLAG": {
      const cell = game.board.cells[action.index];

      if (cell.isFlagged) game.board.unflag(cell);
      else game.board.flag(cell);
      break;
    }
    case "RESTART":
      game.status = GAME_STATUS.INITIAL;
      game.board = new BoardState();
      break;
  }
};
