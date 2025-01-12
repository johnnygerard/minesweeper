import { BoardAction } from "@/types/board-action";
import { BoardState } from "@/types/board-state";
import { autoReveal } from "@/utils/auto-reveal";
import { Draft } from "immer";

export const boardReducer = (
  draft: Draft<BoardState>,
  action: BoardAction,
): void => {
  switch (action.type) {
    case "REVEAL": {
      const cell = draft.cells[action.index];

      if (cell.isMined) {
        cell.isRevealed = true;
        return; // TODO: handle game over
      }

      autoReveal(cell, draft);
      break;
    }
    case "TOGGLE_FLAG": {
      const cell = draft.cells[action.index];
      cell.isFlagged = !cell.isFlagged;
      break;
    }
  }
};
