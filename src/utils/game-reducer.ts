import { BoardState } from "@/types/board-state";
import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
import { autoReveal } from "@/utils/auto-reveal";
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
        autoReveal(cell, draft.board);
      }

      break;
    }
    case "TOGGLE_FLAG": {
      const cell = draft.board.cells[action.index];
      if (cell.isRevealed || draft.isGameOver) return;

      if (cell.isFlagged) {
        cell.isFlagged = false;
        draft.board.flags--;
      } else if (draft.board.flags < draft.board.mines) {
        cell.isFlagged = true;
        draft.board.flags++;
      }
      break;
    }
    case "RESTART":
      draft.isGameOver = false;
      draft.board = new BoardState();
      break;
  }
};
