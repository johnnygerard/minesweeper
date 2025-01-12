import { AdjacentMines } from "@/types/adjacent-mines";
import { BoardAction } from "@/types/board-action";
import { BoardState } from "@/types/board-state";
import { getAdjacentCells } from "@/utils/get-adjacent-cells";
import { Draft } from "immer";

export const boardReducer = (
  draft: Draft<BoardState>,
  action: BoardAction,
): void => {
  switch (action.type) {
    case "REVEAL": {
      const cell = draft.cells[action.index];

      if (!cell.isMined) {
        cell.adjacentMines = getAdjacentCells(
          action.index,
          draft.rows,
          draft.columns,
        ).reduce(
          (acc, index) => acc + (draft.cells[index].isMined ? 1 : 0),
          0,
        ) as AdjacentMines;
      }

      cell.isRevealed = true;
      break;
    }
    case "TOGGLE_FLAG": {
      const cell = draft.cells[action.index];
      cell.isFlagged = !cell.isFlagged;
      break;
    }
  }
};
