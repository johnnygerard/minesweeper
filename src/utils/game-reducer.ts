import { BoardState } from "@/types/board-state";
import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
import { Draft } from "immer";

export const gameReducer = (
  draft: Draft<GameState>,
  action: GameAction,
): void => {
  switch (action.type) {
    case "REVEAL": {
      const cell = draft.board.cells[action.index];
      if (cell.isRevealed || cell.isFlagged || draft.isGameOver) return;

      if (cell.isMined) {
        cell.isRevealed = true;
        draft.isGameOver = true;
      } else {
        draft.board.autoReveal(cell);
      }

      break;
    }
    case "TOGGLE_FLAG": {
      if (draft.isGameOver) return;
      const cell = draft.board.cells[action.index];
      draft.board.toggleFlag(cell);
      break;
    }
    case "RESTART":
      draft.isGameOver = false;
      draft.board = new BoardState();
      break;
  }
};
