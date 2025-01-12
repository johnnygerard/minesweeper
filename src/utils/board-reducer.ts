import { AdjacentMines } from "@/types/adjacent-mines";
import { BoardAction } from "@/types/board-action";
import { BoardState } from "@/types/board-state";
import { getAdjacentCells } from "@/utils/get-adjacent-cells";
import { Draft } from "immer";

// Recursively reveal cells
const reveal = (index: number, draft: Draft<BoardState>): void => {
  const cell = draft.cells[index];
  if (cell.isRevealed || cell.isFlagged) return;

  const adjacentCells = getAdjacentCells(index, draft.rows, draft.columns);

  const adjacentMines = adjacentCells.reduce(
    (acc, index) => acc + (draft.cells[index].isMined ? 1 : 0),
    0,
  );

  cell.isRevealed = true;
  cell.adjacentMines = adjacentMines as AdjacentMines;
  if (adjacentMines === 0)
    adjacentCells.forEach((index) => reveal(index, draft));
};

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

      reveal(action.index, draft);
      break;
    }
    case "TOGGLE_FLAG": {
      const cell = draft.cells[action.index];
      cell.isFlagged = !cell.isFlagged;
      break;
    }
  }
};
