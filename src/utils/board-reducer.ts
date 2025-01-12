import { CellProps } from "@/components/cell";
import { AdjacentMines } from "@/types/adjacent-mines";
import { BoardAction } from "@/types/board-action";
import { BoardState } from "@/types/board-state";
import { getAdjacentCells } from "@/utils/get-adjacent-cells";
import { Draft } from "immer";

// Recursively reveal cells
const reveal = (cell: CellProps, draft: Draft<BoardState>): void => {
  if (cell.isRevealed || cell.isFlagged) return;

  const adjacentCells = getAdjacentCells(cell, draft);
  const adjacentMines = adjacentCells.reduce(
    (acc, cell) => acc + (cell.isMined ? 1 : 0),
    0,
  );

  cell.isRevealed = true;
  cell.adjacentMines = adjacentMines as AdjacentMines;
  if (adjacentMines === 0) adjacentCells.forEach((cell) => reveal(cell, draft));
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

      reveal(cell, draft);
      break;
    }
    case "TOGGLE_FLAG": {
      const cell = draft.cells[action.index];
      cell.isFlagged = !cell.isFlagged;
      break;
    }
  }
};
