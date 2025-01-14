import { BoardState } from "@/types/board-state";
import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
import { GAME_STATUS } from "@/types/game-status";
import { Draft } from "immer";

export const gameReducer = (
  draft: Draft<GameState>,
  action: GameAction,
): void => {
  switch (action.type) {
    case "REVEAL": {
      const cell = draft.board.cells[action.index];

      if (cell.isMined) {
        cell.isRevealed = true;
        draft.status = GAME_STATUS.LOST;
        break;
      }

      draft.board.revealSafeCell(cell);
      draft.status = draft.board.hasWon ? GAME_STATUS.WON : GAME_STATUS.PLAYING;
      break;
    }
    case "TOGGLE_FLAG": {
      const cell = draft.board.cells[action.index];

      if (cell.isFlagged) draft.board.unflag(cell);
      else draft.board.flag(cell);
      break;
    }
    case "RESTART":
      draft.status = GAME_STATUS.INITIAL;
      draft.board = new BoardState();
      break;
  }
};
